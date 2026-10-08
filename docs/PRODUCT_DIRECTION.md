# CyberQuest AI — Product Direction and Audit Response

## Decision

The attached audit describes an **Academic Opportunity Digital Twin** using Stytch, Hugging Face, and Google Places. That is a different product from CyberQuest AI. CyberQuest remains a local-first cybersecurity education and authorized-lab evidence platform.

We adopt the audit's strongest cross-cutting practices without changing the mission:

- one clear loop: **Learn → Simulate → Defend → Validate**;
- explainable AI outputs with evidence, uncertainty, and human approval;
- server-side authentication and role enforcement;
- privacy-aware storage and explicit local-lab scope;
- accessible list-first interfaces with reduced-motion support;
- resilient loading, empty, failure, and model-unavailable states;
- automated tests, dependency checks, secret scanning, and reproducible builds.

## CyberQuest product loop

| Stage | CyberQuest behavior | Evidence produced |
|---|---|---|
| Learn | Lesson, comic scene, or Nova explanation | Completion and quiz result |
| Simulate | Allowlisted deterministic training validation | Validation result and scope |
| Defend | Read-only Wazuh/Ollama explanation | Sanitized alert, sources, uncertainty |
| Validate | Human reviews evidence and confirms the result | Review note and report entry |

Every future feature must strengthen at least one transition in this loop. Generic maps, unrelated opportunity discovery, autonomous attack agents, and automatic remediation are out of scope.

## Role and trust model

- **Student:** curriculum, comic archive, mentor guidance, and safe local validations.
- **Company:** student surfaces plus evidence review and reporting.
- **Admin:** content governance, role policy, and safety posture.
- **Human approval:** required for every remediation recommendation; the platform never deletes, blocks, exploits, or changes systems automatically.

Role decisions are made server-side from the authenticated account policy. The browser may adapt its presentation, but it is not the authorization boundary.

## Audit-aligned implementation priorities

### P0 — implemented or in progress

1. Secure server-side session and role middleware.
2. Body-size limits and security headers, including a report-only CSP.
3. Evidence-grounded, deterministic fallbacks when local AI is unavailable.
4. A focused information architecture instead of unrelated feature collection.
5. Tests for curriculum depth, role gates, and the preserved FastAPI receiver.

### P1 — next product work

1. Add first-class evidence citations to every mentor and alert explanation.
2. Add explicit data controls: export, delete, clear local progress, and revoke session.
3. Add a visible “Why this result?” panel to AI-ranked evidence.
4. Add designed offline, partial-results, retry, and model-unavailable states.
5. Add an accessible command palette and full keyboard review flow.

### P2 — selective visual polish

The existing Cyber City visual system is the single spatial language. Any future 3D work must be progressive enhancement: content and controls remain usable with WebGL disabled, reduced motion enabled, or a low-power device.

## Deliberately not added

- Stytch: the current project already uses the configured Manus OAuth session infrastructure; adding a second identity provider would increase risk without improving the cybersecurity mission.
- Google Places: CyberQuest is not an opportunity or campus-discovery product.
- Hugging Face hosted inference: the requirement is free, local-first operation; Ollama remains the preferred local model route.
- Autonomous attack or remediation agents: prohibited by the safety contract.

## Definition of done for the next release

- A new learner understands the purpose and starts the first checkpoint in under one minute.
- Every AI explanation identifies source material, uncertainty, and the human decision boundary.
- Safe-lab actions are allowlisted, deterministic, local, and non-destructive.
- The application remains usable with JavaScript delays, local-model failure, keyboard-only navigation, reduced motion, and mobile widths.
- No secrets are committed; security checks run in GitHub Actions.
- README, threat model, API contract, setup, and evidence instructions remain synchronized with the implementation.
