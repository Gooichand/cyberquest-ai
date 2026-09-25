# Week 2 — Interactive Experience and Company Review

## Completed in this slice

- Interactive lesson checkpoint with answer reveal and local progress persistence.
- Comic chapter scene playback with dialogue and narration.
- Student dashboard progress reflects completed lessons and comics.
- Company Mode evidence center now shows pending/reviewed status.
- Instructor/analyst review action updates evidence status and note.
- Sanitized Wazuh evidence import remains restricted to the private lab subnet.
- New overview API reports lesson, scenario, evidence, and pending-review counts.

## Run on Windows

```powershell
cd "$HOME\Desktop\cyberquest-ai"
py app\server.py
```

Open `http://127.0.0.1:8080`, switch between Student and Company modes, and use the sidebar.

## Suggested demo flow

1. Student mode → Learn → open a lesson → reveal the checkpoint answer.
2. Student mode → Comic library → open a chapter and review all scenes.
3. Cyber lab → run The Unlocked Door.
4. Company mode → Reports → import `sample-wazuh-alert.json`.
5. Click Mark reviewed on an evidence record.
6. Confirm the record changes from pending to reviewed.

## Scope boundary

The review action only changes the local evidence record. It does not block an IP, delete a file, change Wazuh, or execute a response.
