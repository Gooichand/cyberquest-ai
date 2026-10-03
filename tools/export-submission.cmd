@echo off
setlocal
cd /d "%~dp0.."
if not exist submission mkdir submission
if not exist submission\docs mkdir submission\docs
copy /Y README.md submission\README.md >nul
copy /Y PLAN.md submission\PLAN.md >nul
copy /Y docs\FINAL_REPORT.md submission\docs\FINAL_REPORT.md >nul
copy /Y docs\DEMO_SCRIPT.md submission\docs\DEMO_SCRIPT.md >nul
copy /Y docs\SECURITY_TEST_MATRIX.md submission\docs\SECURITY_TEST_MATRIX.md >nul
copy /Y docs\WEEK4.md submission\docs\WEEK4.md >nul
copy /Y docs\WEEK5.md submission\docs\WEEK5.md >nul
copy /Y docs\WEEK6_7.md submission\docs\WEEK6_7.md >nul
copy /Y tools\wazuh_forwarder.py submission\wazuh_forwarder.py >nul
curl -fsS "http://127.0.0.1:8080/api/report?format=markdown" -o submission\cyberquest-evidence-report.md
curl -fsS "http://127.0.0.1:8080/api/submission/manifest" -o submission\submission-manifest.json
if errorlevel 1 (
  echo Start the app first with tools\start-cyberquest.cmd.
  pause
  exit /b 1
)
echo Submission package prepared in submission\
echo Add screenshots and demonstration video after the live Week 5 lab test.
