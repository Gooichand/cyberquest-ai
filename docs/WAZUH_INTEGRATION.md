# Wazuh Integration Runbook

CyberQuest AI accepts **sanitized** Wazuh JSON through the local evidence endpoint. The MVP never executes alert-derived commands and never performs automatic remediation.

## Local test

Start the app:

```bash
python3 app/server.py
```

Post a lab alert:

```bash
curl -sS -X POST http://127.0.0.1:8080/api/evidence/import \\
  -H 'Content-Type: application/json' \\
  --data-binary @sample-wazuh-alert.json | jq .
```

Expected safety fields:

```json
{
  "human_approval_required": true,
  "automatic_action_taken": false
}
```

## Authorized lab alert example

The importer allows only addresses in `192.168.56.0/24` or loopback. It rejects public addresses, missing lab addresses, malformed JSON, and unknown scenario actions.

## Connecting the existing receiver

Keep the existing Wazuh-to-local-RAG receiver as the boundary. After manual alert analysis is verified, configure Wazuh to send one selected rule to the receiver. Then transform the receiver output into the CyberQuest evidence schema. Start with one rule and one alert. Do not connect every alert initially.

## Evidence fields

The application records an evidence ID, timestamp, sanitized alert, authorization scope, human approval requirement, and automatic-action status. Importing an alert is not proof that the endpoint is compromised; it is an observation to be reviewed.
