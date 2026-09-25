# CyberQuest AI — Week 1 Requirements

## Product objective

CyberQuest AI is a free, local-first learning and defensive security platform. It teaches cybersecurity through comic narratives, controlled simulations, evidence-grounded explanations, and independently verified results.

## Users

| User | Needs | Week 1 foundation |
|---|---|---|
| Student | Simple concepts, comics, quizzes, safe scenarios | Eight-module curriculum and three comic chapters |
| Instructor | Safe scope, repeatable exercises, reviewable evidence | Allowlisted scenario definitions and validation contract |
| Company analyst | Wazuh evidence, grounded explanations, audit trail | Evidence import schema and read-only safety posture |
| Administrator/researcher | Policies, provenance, evaluation | Threat model, source metadata, and API contract |

## Functional requirements

1. The application exposes Student and Company modes.
2. The curriculum contains eight progressive modules.
3. Each learning module has a simple explanation, technical explanation, quiz checkpoint, answer, and source.
4. Comic chapters use Byte, Shield, Nova, and Cyber City.
5. Every lab scenario has an ID, learning objective, authorized target, allowlisted tool, expected outcome, and difficulty.
6. The API can list lessons, comics, scenarios, evidence, and progress.
7. The API can run only registered scenarios inside `isolated_lab`.
8. The API can import sanitized Wazuh alerts from the private lab network.
9. Mentor responses contain evidence, uncertainty, sources, human approval, and automatic-action status.
10. Validation status is calculated by deterministic code from expected and observed values.
11. Evidence records have an ID, timestamp, scope, scenario or alert data, and limitations.

## Non-functional requirements

- No paid API or cloud dependency is required for the MVP.
- No arbitrary shell-command endpoint exists.
- Public or non-lab IP addresses are rejected by the alert importer.
- High-impact actions require human approval.
- The platform must be understandable to a school student and useful to a technical learner.
- Content must preserve source provenance.
- The MVP must run on a normal Linux machine with Python 3.10+.

## Week 1 acceptance criteria

- [x] Requirements are documented.
- [x] Eight lessons are present.
- [x] Three comic chapters are present.
- [x] Three scenario templates are allowlisted.
- [x] Threat model and architecture are documented.
- [x] RAG-ready documents include sources and categories.
- [x] Agent message contract is documented.
- [x] API foundation exposes the Week 1 routes.
- [x] Safety and validation behavior is testable without live Wazuh.
