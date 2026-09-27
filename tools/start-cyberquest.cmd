@echo off
setlocal
cd /d "%~dp0.."
where py >nul 2>&1
if errorlevel 1 (
  echo Python launcher ^(py^) was not found. Install Python 3.10+ and enable PATH.
  pause
  exit /b 1
)
echo Starting CyberQuest AI at http://127.0.0.1:8080
start "CyberQuest Browser" http://127.0.0.1:8080
py app\server.py
