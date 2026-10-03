#!/usr/bin/env python3
import json, os, subprocess, sys, time
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
BASE = 'http://127.0.0.1:18086'

def request(path, method='GET', body=None):
    data = json.dumps(body).encode() if body is not None else None
    req = Request(BASE + path, data=data, method=method, headers={'Content-Type': 'application/json'})
    with urlopen(req, timeout=5) as response:
        raw = response.read()
        return response.status, json.loads(raw) if raw else {}

def main():
    checks = []
    proc = subprocess.Popen([sys.executable, 'app/server.py'], cwd=ROOT, env={**os.environ, 'CYBERQUEST_PORT':'18086', 'WAZUH_RECEIVER_TOKEN':'week5-test-token'}, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(.5)
    try:
        status, health = request('/api/health'); checks.append(('health', status == 200 and health.get('status') == 'ok'))
        _, lessons = request('/api/lessons'); checks.append(('8_lessons', len(lessons.get('lessons', [])) == 8))
        _, comics = request('/api/comics'); checks.append(('3_comics_3_panels', len(comics.get('comics', [])) == 3 and all(len(x.get('panels', [])) == 3 for x in comics['comics'])))
        _, scenarios = request('/api/scenarios'); checks.append(('3_scenarios', len(scenarios.get('scenarios', [])) == 3))
        for comic_id in ('C01', 'C02', 'C03'):
            with urlopen(BASE + '/comic/' + comic_id, timeout=5) as response:
                checks.append((comic_id + '_server_reader', response.status == 200 and 'Scene 1 of 3' in response.read().decode()))
        _, run = request('/api/scenarios/SEC-LAB-001/run', 'POST', {'authorization_scope':'isolated_lab','tool_id':'role_permission_check_v1','target':'local-training-app'})
        checks.append(('safe_scenario', run.get('result', {}).get('status') == 'passed' and run.get('result', {}).get('automatic_action_taken') is False))
        try:
            request('/api/scenarios/SEC-LAB-001/run', 'POST', {'authorization_scope':'public','tool_id':'role_permission_check_v1','target':'8.8.8.8'})
            checks.append(('unsafe_scope_rejected', False))
        except HTTPError as error:
            checks.append(('unsafe_scope_rejected', error.code in (400, 403)))
        _, mentor = request('/api/mentor', 'POST', {'question':'What is authorization?'})
        checks.append(('mentor_grounded', bool(mentor.get('sources')) and mentor.get('human_approval_required') is True))
        receiver_alert = {'alert':{'id':'week5-test','agent':{'name':'Ubuntu-Server','ip':'192.168.56.103'},'rule':{'id':'5710','description':'synthetic file event'}}}
        try:
            request('/api/wazuh/receiver', 'POST', receiver_alert)
            checks.append(('receiver_token_required', False))
        except HTTPError as error:
            checks.append(('receiver_token_required', error.code == 403))
        req = Request(BASE + '/api/wazuh/receiver', data=json.dumps({'alert':{'id':'week5-test','agent':{'name':'Ubuntu-Server','ip':'192.168.56.103'},'rule':{'id':'5710','description':'synthetic file event'}}}).encode(), method='POST', headers={'Content-Type':'application/json','X-CyberQuest-Token':'week5-test-token'})
        with urlopen(req, timeout=5) as response: imported=json.loads(response.read())
        checks.append(('receiver_import', imported.get('automatic_action_taken') is False))
        _, readiness = request('/api/lab/readiness'); checks.append(('lab_scope_ready', readiness.get('ready_for_live_test') is True and any(x['status']=='pending' for x in readiness['checks'])))
        _, manifest = request('/api/submission/manifest'); checks.append(('submission_manifest', all(x['exists'] for x in manifest['files'])))
        _, report = request('/api/report'); checks.append(('report_export_data', report.get('project') == 'CyberQuest AI' and report.get('evidence_count', 0) >= 1))
        failed=[name for name,passed in checks if not passed]
        result={'generated_at':time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()),'checks':[{'name':n,'status':'PASS' if p else 'FAIL'} for n,p in checks],'passed':len(checks)-len(failed),'failed':len(failed),'live_wazuh_status':'PENDING_USER_VM_TEST'}
        out=ROOT/'submission'; out.mkdir(exist_ok=True); (out/'week5-final-check.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
        print('WEEK 5 LOCAL FINAL CHECK PASSED' if not failed else 'WEEK 5 LOCAL FINAL CHECK FAILED')
        print(json.dumps(result,indent=2))
        return 1 if failed else 0
    finally:
        proc.terminate(); proc.wait(timeout=3)

if __name__ == '__main__': raise SystemExit(main())
