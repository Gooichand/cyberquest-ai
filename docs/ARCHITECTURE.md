# CyberQuest AI — Week 1 Architecture

## Decision

Use a local-first modular monolith for the MVP rather than many microservices. This keeps the free project reproducible and makes the policy gate visible in one place. The API, content loader, scenario validator, evidence writer, and static frontend are separated by module responsibilities even though they run as one Python process.

## Components

| Component | Responsibility | Week 1 implementation |
|---|---|---|
| Student/Company UI | Learning, scenarios, evidence, mentor | `app/public/` |
| API foundation | Routing and validation | `app/server.py` |
| Learning service | Lessons and progress | `content/lessons/`, `/api/lessons`, `/api/progress` |
| Comic service | Narrative chapters | `content/comics/`, `/api/comics` |
| Scenario service | Allowlisted lab templates | `content/scenarios/`, `/api/scenarios` |
| Verification service | Expected versus observed | `run_scenario()` |
| Evidence service | IDs, timestamps, sanitized records | `evidence/`, `/api/evidence` |
| RAG service | Local document retrieval and grounded answer | `content/knowledge/`, `/api/mentor` |
| Wazuh adapter | Lab-IP validation and sanitized import | `/api/evidence/import` |

## Data flow

1. The user chooses a lesson or registered scenario.
2. The frontend sends a structured request.
3. The backend checks authorization scope, target, tool ID, and scenario ID.
4. A predefined validator produces an observed result.
5. The backend compares expected and observed values.
6. An evidence record is written with an ID and timestamp.
7. Nova may explain the evidence using local knowledge and cites filenames.
8. Human approval remains required for response actions.

## Free deployment modes

- Local laptop: `python3 app/server.py` and browser at `127.0.0.1:8080`.
- Kali lab: bind to `192.168.56.10` only after the local test passes.
- Wazuh lab: keep the existing sanitized receiver as a separate boundary and import only approved evidence.

## Extension points

The Week 2/3 roadmap can replace the standard-library server with FastAPI, add SQLite tables, connect the real receiver, and add an optional Ollama adapter without changing the content and scenario contracts.
