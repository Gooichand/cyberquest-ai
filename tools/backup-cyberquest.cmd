@echo off
setlocal
cd /d "%~dp0.."
py tools\backup-cyberquest.py
if errorlevel 1 (
  echo Backup failed.
  pause
  exit /b 1
)
echo Backup completed in backups\
