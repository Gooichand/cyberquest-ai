# CyberQuest AI — Week 1 Threat Model and Architecture

## Scope

The MVP operates on local content and an authorized VirtualBox/Wazuh lab. Targets are registered scenario resources only. Public websites, third-party systems, production infrastructure, and arbitrary addresses are out of scope.

## Trust boundaries

```text
Student / Instructor UI
        |
        v
Local API and policy gate
        |
  +-----+----------+
  |                |
  v                v
Content/RAG     Scenario validator
  |                |
  v                v
Nova response   Evidence record
        |
        v
Optional sanitized Wazuh alert
```

The language model is not a security boundary. The API validates scenario IDs, tool IDs, target names, authorization scope, and result formats before recording evidence.

## Assets

- Lesson and comic content
- Source and provenance metadata
- Scenario definitions and expected outcomes
- Sanitized Wazuh alerts
- Evidence records and progress state
- Student and instructor decisions

## Threats and controls

| Threat | Example | Control | Week 1 status |
|---|---|---|---|
| Scope expansion | Request targets a public IP | Allowlist `isolated_lab` and private lab subnet | Implemented |
| Arbitrary execution | AI proposes a shell command | No command-execution API; tool IDs only | Implemented |
| Prompt injection | Alert says “ignore previous rules” | Treat alert as data; RAG safety scenario | Implemented |
| Unsupported AI claim | Model says defense passed | Deterministic expected/observed assertion | Implemented |
| Sensitive alert data | Password or token in JSON | Sanitized import schema and redaction boundary | Implemented |
| Autonomous remediation | Delete file or block address | `automatic_action_taken=false`; human approval | Implemented |
| Source confusion | Unversioned document is retrieved | Source filename and category in RAG notes | Implemented |
| Resource exhaustion | Very large request body | Local MVP limits scope and accepts small JSON only | Documented |

## Safe isolation guidance

For live lab work, keep Wazuh, Kali, and Ubuntu on the same Host-only Adapter. Disable Bridged Adapter for training targets. Use NAT only temporarily for package installation, then verify the exercise route and outbound connectivity before testing.

## Residual risks

VirtualBox isolation is not an air gap. The host, hypervisor, kernel, and downloaded software remain part of the trust model. The MVP is educational and must not be treated as a production security control.
