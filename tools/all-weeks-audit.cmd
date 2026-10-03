@echo off
setlocal
cd /d "%~dp0.."
py tools\all-weeks-audit.py
if errorlevel 1 (
  echo Weeks 1-7 audit found failures. Read submission\WEEKS_1_7_FINAL_QA_REPORT.md.
  pause
  exit /b 1
)
echo Weeks 1-7 audit completed. Read submission\WEEKS_1_7_FINAL_QA_REPORT.md.
