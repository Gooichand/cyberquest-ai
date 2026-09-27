# CyberQuest AI — Final Technical Report Outline

## Abstract

CyberQuest AI is a free local-first cybersecurity learning and defensive-analysis platform. It combines comic-based education, allowlisted cyber-range scenarios, retrieval-ready knowledge, structured agent messages, and independently validated evidence.

## Problem

Students need a practical way to understand both attacker thinking and defender discipline without targeting real systems. Analysts need explanations that preserve evidence, uncertainty, and human approval.

## Solution

The application provides Student and Company modes. Student mode uses eight curriculum modules and three comic chapters. Company mode imports sanitized Wazuh alerts, stores evidence, retrieves local notes, and exposes a review workflow.

## Quantum-AI connection

The project uses quantum security as a research track rather than claiming unsupported quantum advantage. It separates post-quantum cryptography from quantum machine learning and requires a classical baseline, synthetic-data disclosure, reproducible parameters, and explicit limitations for any simulated QML comparison.

## Architecture

The local API validates scope, scenario ID, tool ID, target, and structured request fields. The scenario validator calculates pass/fail from expected and observed values. The evidence service stores IDs and timestamps. The RAG mentor returns sources and uncertainty. The model is advisory and is not the security boundary.

## Results

The Week 1 foundation contains eight lessons, three comics, three scenarios, a RAG provenance manifest, a threat model, an API contract, and a Wazuh import boundary. Week 2 adds interactive checkpoints, comic scene playback, progress persistence, Company Mode, and human review. Week 3 adds the security test matrix, demonstration script, and report materials.

## Safety and ethics

The MVP does not scan public systems, execute arbitrary shell commands, delete files, block addresses, or perform autonomous remediation. Evidence records explicitly use `automatic_action_taken=false` and `human_approval_required=true`. It is intended for authorized local training environments only.

## Limitations

VirtualBox Host-only networking is not an air gap. The current Wazuh connection requires the user's live lab. The RAG assistant is not proof of correctness. Simulated quantum results cannot demonstrate quantum advantage. These limitations must appear in the final presentation and report.

## Reproducibility

```powershell
cd "$HOME\Desktop\cyberquest-ai"
py tests\test_server.py
py app\server.py
```

Open `http://127.0.0.1:8080` and follow `docs/DEMO_SCRIPT.md`.
