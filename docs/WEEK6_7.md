# Week 6–7 — Operational Validation, Backup, and Final Submission

## Week 6 goals

1. Connect the authorized Wazuh lab through the safe forwarder.
2. Validate the Wazuh Server, Ubuntu agent, and Kali test workstation inventory.
3. Prove one controlled alert reaches CyberQuest.
4. Review the evidence in Company Mode.
5. Confirm no automatic action is performed.
6. Create a backup of the project and local evidence database.

## Week 7 goals

1. Run the complete final local and live-lab checklist.
2. Verify persistence after a restart.
3. Export the Markdown evidence report.
4. Create the final submission archive.
5. Add screenshots and demonstration video after they are actually captured.
6. Review the final report for claims, limitations, and evidence accuracy.

## Safe forwarder

`tools/wazuh_forwarder.py` accepts one Wazuh JSON alert, keeps only approved fields, validates all IPs against `192.168.56.0/24`, and sends it to `/api/wazuh/receiver`. It never executes the alert text and never performs remediation.

From the CyberQuest host:

```cmd
set WAZUH_RECEIVER_TOKEN=your-local-lab-token
py tools\wazuh_forwarder.py --alert-file sample-wazuh-alert.json
```

The same script can read standard input:

```cmd
type sample-wazuh-alert.json | py tools\wazuh_forwarder.py
```

Expected safe result fields:

```text
human_approval_required: true
automatic_action_taken: false
review_status: pending
```

## Live-lab evidence procedure

Perform this only on the authorized VirtualBox lab:

1. Start Wazuh Server at `192.168.56.101`.
2. Start Ubuntu Server at `192.168.56.103`.
3. Start Kali at `192.168.56.10`.
4. Confirm the addresses manually on each VM.
5. Confirm Wazuh manager and Ubuntu agent are active.
6. Generate one controlled SSH or file-integrity event.
7. Export one sanitized alert JSON.
8. Run the safe forwarder.
9. Open Company Mode → Reports.
10. Mark the record reviewed with an analyst note.
11. Export the Markdown report.

Do not mark live Wazuh as passed if only the local synthetic alert was tested.

## Backup

Run:

```cmd
tools\backup-cyberquest.cmd
```

This creates a ZIP under `backups\` containing source, documentation, content, and local evidence files. Do not upload the backup publicly if it contains real lab data.

## Final decision labels

Use exactly one label in the final report:

- `READY FOR FINAL CAPTURE` — local and live-lab tests passed; screenshots/video remain.
- `READY FOR SUBMISSION` — final report, screenshots, video, and evidence package are complete.
- `NEEDS FIXES` — any required check failed.

## Complete Weeks 1–7 audit

Run the all-weeks audit from Windows:

```cmd
tools\all-weeks-audit.cmd
```

It tests the local APIs, three comic server routes, safe scenario validation, out-of-scope rejection, mentor grounding, receiver token protection, lab readiness, report generation, forwarder presence, and backup presence. It also counts backend functions, tool functions, frontend functions, endpoint markers, interactive markers, lessons, comics, and scenarios.

Outputs:

```text
submission\WEEKS_1_7_FINAL_QA_REPORT.md
submission\WEEKS_1_7_AUDIT.json
```

## Required honesty rule

The final report must distinguish:

- local automated checks,
- synthetic Wazuh evidence,
- live Wazuh VM evidence,
- screenshots/video captured by the user.
