import json, os, subprocess, sys, time
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
BASE = 'http://127.0.0.1:18080'

def request(path, method='GET', body=None, headers=None):
    data = json.dumps(body).encode() if body is not None else None
    req = Request(BASE + path, data=data, method=method, headers={'Content-Type':'application/json', **(headers or {})})
    with urlopen(req, timeout=5) as r:
        return r.status, json.loads(r.read())

def test_suite():
    proc = subprocess.Popen([sys.executable, 'app/server.py'], cwd=ROOT, env={**os.environ, 'CYBERQUEST_PORT':'18080', 'WAZUH_RECEIVER_TOKEN':'test-token'}, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    time.sleep(.4)
    try:
        status, health = request('/api/health')
        assert status == 200 and health['status'] == 'ok'
        _, lessons = request('/api/lessons'); assert len(lessons['lessons']) == 8
        _, scenarios = request('/api/scenarios'); assert len(scenarios['scenarios']) == 3
        _, result = request('/api/scenarios/SEC-LAB-001/run', 'POST', {'authorization_scope':'isolated_lab','tool_id':'role_permission_check_v1','target':'local-training-app'})
        assert result['result']['status'] == 'passed' and result['result']['automatic_action_taken'] is False
        evidence_id = result['evidence']['evidence_id']
        _, reviewed = request('/api/evidence/' + evidence_id + '/review', 'POST', {'review_status':'reviewed','review_note':'Week 4 test review'})
        assert reviewed['review_status'] == 'reviewed' and reviewed['review_note'] == 'Week 4 test review'
        alert = {'id':'week4-alert','agent':{'name':'Ubuntu-Server','ip':'192.168.56.103'},'rule':{'id':'5710','description':'synthetic file event'}}
        try:
            request('/api/wazuh/receiver', 'POST', {'alert':alert})
            raise AssertionError('receiver accepted missing token')
        except HTTPError as exc:
            assert exc.code == 403
        _, imported = request('/api/wazuh/receiver', 'POST', {'alert':alert}, {'X-CyberQuest-Token':'test-token'})
        assert imported['human_approval_required'] is True and imported['automatic_action_taken'] is False
        _, report = request('/api/report')
        assert report['evidence_count'] >= 2 and report['pending_reviews'] >= 0
        req = Request(BASE + '/api/report?format=markdown')
        with urlopen(req, timeout=5) as response:
            markdown = response.read().decode()
        assert '# CyberQuest AI Evidence Report' in markdown
        assert (ROOT / 'evidence' / 'cyberquest.db').exists()
        print('CyberQuest Week 4 API tests passed')
    finally:
        proc.terminate(); proc.wait(timeout=3)

if __name__ == '__main__': test_suite()
