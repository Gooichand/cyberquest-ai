# Week 4 — Integration, Persistence, and Packaging

## Completed in this phase

- Evidence and progress are persisted in SQLite at `evidence/cyberquest.db`.
- Existing JSON evidence remains exportable for inspection and backward compatibility.
- Instructor review writes `review_status`, `review_note`, and `reviewed_at`.
- JSON evidence report is available at `GET /api/report`.
- Markdown evidence report is available at `GET /api/report?format=markdown`.
- The local Wazuh bridge accepts sanitized alerts at `POST /api/wazuh/receiver`.
- The bridge accepts a wrapper body such as `{ "alert": { ... } }`.
- If `WAZUH_RECEIVER_TOKEN` is set, the bridge requires `X-CyberQuest-Token`.
- Windows launch scripts are available in `tools/`.

## Receiver example

Start the app with an optional token:

```cmd
set WAZUH_RECEIVER_TOKEN=replace-with-a-local-lab-token
py app\server.py
```

Send a sanitized alert from the authorized receiver:

```cmd
curl -X POST http://127.0.0.1:8080/api/wazuh/receiver ^
  -H "Content-Type: application/json" ^
  -H "X-CyberQuest-Token: replace-with-a-local-lab-token" ^
  --data-binary @sample-wazuh-alert.json
```

The receiver validates the private lab network before storing anything. It does not execute a command or remediate an endpoint.

## Report export

Open these URLs while the server is running:

```text
http://127.0.0.1:8080/api/report
http://127.0.0.1:8080/api/report?format=markdown
```

The Markdown endpoint downloads `cyberquest-evidence-report.md`.

## Windows startup

Double-click `tools\start-cyberquest.cmd`, or run:

```cmd
tools\start-cyberquest.cmd
```

The script opens the browser after starting the local server.
