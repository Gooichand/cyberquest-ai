# CyberQuest AI

**Comic-based ethical hacking, defense, and AI-agent training platform.**

CyberQuest AI is a completely free, local-first MVP for teaching cybersecurity through:

> **Learn → Simulate → Defend → Validate → Learn from evidence**

It includes two views in one application:

- **Student mode:** comic lessons, quizzes, safe simulations, and progress.
- **Company mode:** scenario control, Wazuh-style evidence, RAG explanations, validation results, and audit posture.

## Safety scope

All scenarios are deterministic and local. The application does **not** execute arbitrary shell commands, scan public systems, exploit third-party targets, delete files, block IPs, or apply autonomous remediation. Security results are produced by independent validation code, not by an LLM claim.

## Free stack

- Python 3.10+ standard-library HTTP server
- Vanilla HTML/CSS/JavaScript frontend
- Local JSON/Markdown content
- Optional Ollama integration point for local RAG
- Existing Wazuh and VirtualBox lab can be connected later through an approved receiver

No paid API, cloud database, or subscription is required for the MVP.

## Run locally

```bash
cd cyberquest-ai
python3 app/server.py
```

Open http://127.0.0.1:8080.

Optional Ollama settings:

```bash
export OLLAMA_URL=http://127.0.0.1:11434
export OLLAMA_MODEL=llama3.2:3b
```

The app remains usable without an LLM and keeps structured, evidence-grounded mentor responses.

## API

- `GET /api/health`
- `GET /api/lessons`
- `GET /api/comics`
- `GET /api/scenarios`
- `POST /api/scenarios/{id}/run`
- `POST /api/mentor`
- `GET /api/evidence`
- `GET /api/progress`
- `POST /api/progress`
- `POST /api/evidence/import`

## Week 1 foundation complete

Week 1 now includes the requirements specification, threat model, modular architecture, eight-module curriculum, three comic chapters, three scenario templates, RAG provenance manifest, structured agent contract, local progress storage, safe Wazuh evidence import, and an API contract. See `docs/REQUIREMENTS.md`, `docs/THREAT_MODEL.md`, `docs/ARCHITECTURE.md`, and `docs/API_CONTRACT.md`.

## MVP scenarios

1. **The Unlocked Door** — access-control role assertions.
2. **The Changed File** — safe file-integrity evidence simulation.
3. **Trust the Evidence** — prompt-injection and RAG safety validation.

## Safety design

- Registered scenario IDs and tool IDs only
- `isolated_lab` authorization scope required
- No arbitrary command execution endpoint
- Human approval is required for response actions
- `automatic_action_taken` is always false in the MVP
- Independent verification compares expected versus observed values
- Prompt-injection text is treated as untrusted alert data

## Three-week delivery plan

- **Week 1:** content, scenarios, RAG-ready knowledge base, API foundation.
- **Week 2:** polished student/company UI, scenario execution, evidence and mentor flow.
- **Week 3:** tests, Wazuh evidence adapter, safety evaluation, screenshots, report, and showcase video.
