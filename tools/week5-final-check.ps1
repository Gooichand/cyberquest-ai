$ErrorActionPreference = 'Stop'
Set-Location (Join-Path $PSScriptRoot '..')
py tools\week5-final-check.py
if ($LASTEXITCODE -ne 0) { throw 'Week 5 local final check failed. Review submission\week5-final-check.json.' }
Write-Host 'Week 5 local final check passed.' -ForegroundColor Green
