# Week 5 — Final QA, Live-Lab Readiness, and Submission

## Completed in code

- `GET /api/lab/readiness` checks the expected authorized VirtualBox inventory without probing the network.
- `POST /api/lab/check` accepts observed inventory values and marks configuration checks pass/fail/pending.
- `GET /api/submission/manifest` verifies required project files and explicitly tracks pending live evidence.
- `tools/week5-final-check.py` runs the complete local API, safety, comic-route, persistence, and report checks.
- `tools/week5-final-check.cmd` runs the final check from Windows.
- `tools/export-submission.cmd` creates a local `submission/` folder with reports, manifest, and documentation copies.

## Authorized lab inventory

| Component | Expected address | Purpose |
|---|---:|---|
| Wazuh Server | `192.168.56.101` | Manager and evidence source |
| Kali Linux | `192.168.56.10` | Authorized test workstation |
| Ubuntu Server | `192.168.56.103` | Authorized monitored agent |

The app validates that these addresses belong to `192.168.56.0/24`. It does not scan, attack, or automatically connect to any VM.

## Windows final check

From the repository root:

```cmd
tools\week5-final-check.cmd
```

Expected final line:

```text
WEEK 5 LOCAL FINAL CHECK PASSED
```

## Final package

After the local check passes:

```cmd
tools\export-submission.cmd
```

The generated `submission/` folder contains the current report, manifest, project documentation, and a clear pending-evidence checklist. Add screenshots and the demonstration video only after the live-lab verification is complete.

## Live-lab rule

A local check cannot prove that the user's Wazuh VM delivered an alert. The final report must label live Wazuh evidence as `PASS` only after the authorized VM produces a sanitized alert that is imported and reviewed in Company Mode.
