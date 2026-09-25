# CyberQuest AI — Week 1 API Contract

Base URL: `http://127.0.0.1:8080`

## Health

`GET /api/health`

Returns:

```json
{"status":"ok","service":"cyberquest-ai","mode":"local-first"}
```

## Content

- `GET /api/lessons` → `{ "lessons": [...] }`
- `GET /api/comics` → `{ "comics": [...] }`
- `GET /api/scenarios` → `{ "scenarios": [...] }`
- `GET /api/progress` → local progress state
- `POST /api/progress` → replaces the allowed progress arrays

## Scenario execution

`POST /api/scenarios/{scenario_id}/run`

Required body:

```json
{
  "authorization_scope": "isolated_lab",
  "tool_id": "role_permission_check_v1",
  "target": "local-training-app"
}
```

A successful result contains:

```json
{
  "result": {
    "test_id": "TC-AC-001",
    "expected": "denied",
    "observed": "denied",
    "status": "passed",
    "human_approval_required": true,
    "automatic_action_taken": false
  },
  "evidence": {"evidence_id":"EV-..."}
}
```

The API rejects unknown scenario IDs, wrong tool IDs, non-lab scope, and non-local targets.

## Mentor

`POST /api/mentor`

```json
{"question":"What is authorization?"}
```

Response fields:

```text
answer
evidence
uncertainty
sources
human_approval_required
automatic_action_taken
```

## Wazuh evidence import

`POST /api/evidence/import`

The body must be a sanitized JSON object with an agent or event IP from `192.168.56.0/24` or loopback. Public addresses are rejected. The endpoint stores an evidence record and never executes a remediation action.

## Agent communication contract

Agents communicate with structured messages rather than free-form commands:

```json
{
  "task_id":"task-001",
  "scenario_id":"SEC-LAB-001",
  "agent":"verification_agent",
  "action":"run_predefined_check",
  "tool_id":"role_permission_check_v1",
  "authorization_scope":"isolated_lab",
  "expected_outcome":"unauthorized_request_denied",
  "requires_approval":false
}
```

The policy gate must validate every field before a tool is considered.
