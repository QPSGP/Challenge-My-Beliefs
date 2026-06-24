# Interactive setup for founder email alerts.
# Creates or updates .env.local — does not commit secrets.

$repoRoot = Split-Path $PSScriptRoot -Parent
Set-Location $repoRoot

$envPath = Join-Path $repoRoot ".env.local"

Write-Host ""
Write-Host "Challenge My Beliefs — email alert setup" -ForegroundColor Cyan
Write-Host "Use the same Resend account as your other project." -ForegroundColor DarkGray
Write-Host ""

$resendKey = Read-Host "Resend API key (starts with re_)"
$notifyEmail = Read-Host "Your inbox for alerts (FOUNDER_NOTIFY_EMAIL)"

if (-not $resendKey.Trim() -or -not $notifyEmail.Trim()) {
  Write-Host "Both values are required." -ForegroundColor Red
  exit 1
}

$lines = @()
if (Test-Path $envPath) {
  $lines = Get-Content $envPath
  $lines = $lines | Where-Object {
    $_ -notmatch '^(RESEND_API_KEY|FOUNDER_NOTIFY_EMAIL)='
  }
}

$lines += "RESEND_API_KEY=$($resendKey.Trim())"
$lines += "FOUNDER_NOTIFY_EMAIL=$($notifyEmail.Trim())"

Set-Content -Path $envPath -Value ($lines -join "`n") -Encoding utf8

Write-Host ""
Write-Host "Wrote .env.local" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Restart npm run dev if it is running"
Write-Host "  2. Open /admin -> Operational tools -> Send test email"
Write-Host "  3. Add the same two variables in Vercel -> Environment Variables -> Redeploy"
Write-Host ""
