param(
    [switch]$HookMode
)

# Opt out: set CURSOR_AUTO_GIT_PUSH=0 in your environment or .env.local
if ($env:CURSOR_AUTO_GIT_PUSH -eq "0" -or $env:CURSOR_AUTO_GIT_PUSH -eq "false") {
    exit 0
}

if ($HookMode) {
    $null = [Console]::In.ReadToEnd()
}

$repoRoot = Split-Path $PSScriptRoot -Parent
Set-Location $repoRoot

function Write-SyncLog {
    param([string]$Message)
    $line = "[git-sync] $Message"
    Write-Host $line
    Add-Content -Path (Join-Path $repoRoot ".cursor/git-sync.log") -Value $line -ErrorAction SilentlyContinue
}

$changes = git status --porcelain 2>&1
if (-not $changes) {
    Write-SyncLog "No changes to commit."
    exit 0
}

git add -A
if ($LASTEXITCODE -ne 0) {
    Write-SyncLog "git add failed."
    exit 1
}

$timestamp = (Get-Date).ToUniversalTime().ToString("yyyy-MM-dd HH:mm") + " UTC"
$message = "chore: auto-sync from Cursor ($timestamp)"

# Use -c so we do not depend on global git config being set
$gitUser = if ($env:GIT_USER_NAME) { $env:GIT_USER_NAME } else { "QPSGP" }
$gitEmail = if ($env:GIT_USER_EMAIL) { $env:GIT_USER_EMAIL } else { "richard@richardleeweatherman.com" }

git -c "user.name=$gitUser" -c "user.email=$gitEmail" commit -m $message
if ($LASTEXITCODE -ne 0) {
    Write-SyncLog "Nothing committed (or commit failed)."
    exit 0
}

$branch = git rev-parse --abbrev-ref HEAD 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-SyncLog "Could not detect branch."
    exit 1
}

git push origin $branch
if ($LASTEXITCODE -ne 0) {
    Write-SyncLog "git push failed. Check GitHub credentials."
    exit 1
}

Write-SyncLog "Pushed to origin/$branch. Vercel will deploy if GitHub is connected."
exit 0
