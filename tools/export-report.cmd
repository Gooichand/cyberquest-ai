@echo off
setlocal
where curl >nul 2>&1
if errorlevel 1 (
  echo curl was not found. Use a browser at http://127.0.0.1:8080/api/report?format=markdown
  pause
  exit /b 1
)
curl -fsS "http://127.0.0.1:8080/api/report?format=markdown" -o cyberquest-evidence-report.md
if errorlevel 1 (
  echo Could not reach CyberQuest. Start tools\start-cyberquest.cmd first.
  pause
  exit /b 1
)
echo Report exported to cyberquest-evidence-report.md
