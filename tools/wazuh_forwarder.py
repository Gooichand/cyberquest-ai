#!/usr/bin/env python3
"""Defensive Wazuh forwarder for the authorized private lab only.

Reads one Wazuh alert JSON file or stdin, removes sensitive/unneeded fields,
validates 192.168.56.0/24 scope, and POSTs to CyberQuest. It never executes
alert content and never performs remediation.
"""
import argparse, ipaddress, json, os, sys
from urllib.request import Request, urlopen

ALLOWED = ipaddress.ip_network('192.168.56.0/24')

def sanitize(alert):
    if not isinstance(alert, dict): raise ValueError('alert_must_be_object')
    agent, data = alert.get('agent') or {}, alert.get('data') or {}
    addresses = [str(x) for x in (agent.get('ip'), data.get('srcip'), data.get('dstip')) if x]
    if not addresses: raise ValueError('no_lab_ip_found')
    for value in addresses:
        try: address = ipaddress.ip_address(value)
        except ValueError: raise ValueError('invalid_ip:' + value)
        if address not in ALLOWED and not address.is_loopback: raise ValueError('out_of_scope_ip:' + value)
    return {'id': alert.get('id'), 'timestamp': alert.get('timestamp'), 'rule': {k:(alert.get('rule') or {}).get(k) for k in ('id','level','description','groups')}, 'agent': {k:(alert.get('agent') or {}).get(k) for k in ('id','name','ip')}, 'location': alert.get('location'), 'syscheck': {'path': (alert.get('syscheck') or {}).get('path')}, 'data': {k:(alert.get('data') or {}).get(k) for k in ('srcip','dstip','dstuser')}}

def main():
    parser=argparse.ArgumentParser(description='Forward one sanitized authorized-lab Wazuh alert to CyberQuest')
    parser.add_argument('--alert-file', help='JSON alert file; stdin is used when omitted')
    parser.add_argument('--endpoint', default=os.getenv('CYBERQUEST_RECEIVER_URL','http://127.0.0.1:8080/api/wazuh/receiver'))
    args=parser.parse_args()
    raw=open(args.alert_file, encoding='utf-8').read() if args.alert_file else sys.stdin.read()
    try: safe=sanitize(json.loads(raw))
    except (json.JSONDecodeError, OSError, ValueError) as exc:
        print(json.dumps({'status':'rejected','error':str(exc)})); return 2
    payload=json.dumps({'alert':safe}).encode()
    headers={'Content-Type':'application/json'}
    if os.getenv('WAZUH_RECEIVER_TOKEN'): headers['X-CyberQuest-Token']=os.environ['WAZUH_RECEIVER_TOKEN']
    try:
        request=Request(args.endpoint,data=payload,method='POST',headers=headers)
        with urlopen(request,timeout=10) as response: result=json.loads(response.read())
    except Exception as exc:
        print(json.dumps({'status':'delivery_failed','error':str(exc)})); return 3
    print(json.dumps({'status':'delivered','receiver_response':result},indent=2)); return 0

if __name__ == '__main__': raise SystemExit(main())
