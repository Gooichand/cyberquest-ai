@echo off
setlocal
cd /d "%~dp0.."
py tools\week5-final-check.py
if errorlevel 1 (
  echo Week 5 local final check failed. Review submission\week5-final-check.json.
  pause
  exit /b 1
)
echo Week 5 local final check passed.
