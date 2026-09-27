# CyberQuest AI — Windows Demonstration Script

## Preparation

Open PowerShell in the cloned repository:

```powershell
cd "$HOME\Desktop\cyberquest-ai"
py app\server.py
```

Open `http://127.0.0.1:8080` in the browser. Keep the server terminal visible for the final health check.

## Narration and actions

### Scene 1 — Mission

“CyberQuest AI is a free local-first cybersecurity learning and defensive analysis platform. It teaches through the cycle learn, simulate, defend, validate, and learn from evidence.”

Show the Student dashboard.

### Scene 2 — Learn

“Each module explains the same idea twice: once for a beginner and once for a technical learner. The checkpoint answer is stored as local progress.”

Open Learn, choose a lesson, and reveal the answer.

### Scene 3 — Comic

“The comic mode gives the lesson a story. The student follows Byte, Shield, and Nova, then bridges the story into an approved lab check.”

Open Comic library and enter a chapter.

### Scene 4 — Cyber lab

“The lab never accepts arbitrary commands or public targets. It runs a registered scenario with a registered tool and compares expected versus observed behavior.”

Run The Unlocked Door and show `passed`.

### Scene 5 — Company mode

“Company mode separates evidence from interpretation. A sanitized Wazuh alert can be imported only from the authorized private lab range.”

Switch to Company mode, open Reports, and import `sample-wazuh-alert.json`.

### Scene 6 — Human review

“An alert is not automatically remediated. Human approval is required, and the evidence record can be marked reviewed by an instructor or analyst.”

Click Mark reviewed.

### Scene 7 — Safety

“The platform records uncertainty, source files, and automatic-action status. It is designed to support defenders, not replace human judgment.”

Show the evidence JSON and `automatic_action_taken: false`.

## Closing

“CyberQuest AI is a reproducible education and defensive-security foundation. Its next environment-specific step is connecting the approved Wazuh receiver in the isolated VirtualBox lab.”
