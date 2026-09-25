import json, subprocess, sys, time
from pathlib import Path
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
BASE = 'http://127.0.0.1:18080'

def request(path, method='GET', body=None):
    data = json.dumps(body).encode() if body is not None else None
    req = Request(BASE + path, data=data, method=method, headers={'Content-Type':'application/json'})
    with urlopen(req, timeout=5) as r:
        return r.status, json.loads(r.read())

def test_suite():
    proc = subprocess.Popen([sys.executable, 'app/server.py'], cwd=ROOT, env={**__import__('os').environ, 'CYBERQUEST_PORT':'18080'}, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    time.sleep(.4)
    try:
        status, health = request('/api/health')
        assert status == 200 and health['status'] == 'ok'
        _, scenarios = request('/api/scenarios')
        assert len(scenarios['scenarios']) == 3
        _, result = request('/api/scenarios/SEC-LAB-001/run', 'POST', {'authorization_scope':'isolated_lab','tool_id':'role_permission_check_v1','target':'local-training-app'})
        assert result['result']['status'] == 'passed'
        assert result['result']['automatic_action_taken'] is False
        try:
            request('/api/scenarios/SEC-LAB-001/run', 'POST', {'authorization_scope':'public','tool_id':'role_permission_check_v1'})
            raise AssertionError('unsafe scope was accepted')
        except Exception as exc:
            assert 'HTTP Error 403' in str(exc)
        _, mentor = request('/api/mentor', 'POST', {'question':'What is authorization?'})
        assert mentor['sources'] and mentor['human_approval_required'] is True
        print('CyberQuest API tests passed')
    finally:
        proc.terminate(); proc.wait(timeout=3)

if __name__ == '__main__': test_suite()
