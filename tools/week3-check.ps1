$ErrorActionPreference = 'Stop'
Write-Host 'CyberQuest AI Week 3 check' -ForegroundColor Cyan
$health = Invoke-RestMethod -Uri 'http://127.0.0.1:8080/api/health'
if ($health.status -ne 'ok') { throw 'Health endpoint did not return ok' }
$lessons = Invoke-RestMethod -Uri 'http://127.0.0.1:8080/api/lessons'
$scenarios = Invoke-RestMethod -Uri 'http://127.0.0.1:8080/api/scenarios'
if ($lessons.lessons.Count -ne 8) { throw 'Expected 8 lessons' }
if ($scenarios.scenarios.Count -ne 3) { throw 'Expected 3 scenarios' }
Write-Host "Health: $($health.status)" -ForegroundColor Green
Write-Host "Lessons: $($lessons.lessons.Count)" -ForegroundColor Green
Write-Host "Scenarios: $($scenarios.scenarios.Count)" -ForegroundColor Green
Write-Host 'Week 3 local check passed.' -ForegroundColor Green
