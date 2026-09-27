$ErrorActionPreference = 'Stop'
Set-Location (Join-Path $PSScriptRoot '..')
if (-not (Get-Command py -ErrorAction SilentlyContinue)) { throw 'Python launcher py was not found. Install Python 3.10+.' }
if ($env:WAZUH_RECEIVER_TOKEN) { Write-Host 'Wazuh receiver token enabled for this process.' -ForegroundColor Yellow }
Start-Process 'http://127.0.0.1:8080'
py app\server.py
