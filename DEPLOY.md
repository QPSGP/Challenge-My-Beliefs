# Deploy pipeline: Cursor → GitHub → Vercel

## Flow

```
Cursor agent finishes
    → stop hook runs scripts/git-sync.ps1
    → git commit + push to GitHub (main)
    → Vercel detects push and deploys
    → Live site updates
```

## 1. Vercel ↔ GitHub (one-time)

You already imported the repo. Confirm in the Vercel dashboard:

1. Open project **challenge-my-beliefs**
2. **Settings** → **Git**
3. **Connected Git Repository** should show `QPSGP/Challenge-My-Beliefs`
4. **Production Branch** should be `main`
5. **Deploy Hooks** / automatic deployments should be **enabled**

Every push to `main` triggers a new production deployment (usually 1–3 minutes).

Production URL: https://challenge-my-beliefs.vercel.app

## 2. Cursor auto push (this repo)

File: `.cursor/hooks.json`

When a Cursor **agent** finishes a turn, the `stop` hook runs `scripts/git-sync.ps1`, which:

- Stages all changes
- Commits with message `chore: auto-sync from Cursor (timestamp)`
- Pushes to `origin` on the current branch

### Enable hooks in Cursor

1. Open **Cursor Settings** → **Hooks** (or search “Hooks”)
2. Confirm project hooks are loaded from `.cursor/hooks.json`
3. If hooks do not run, restart Cursor

### Manual sync (same script)

```powershell
npm run sync
```

### Opt out of auto push

Set in PowerShell before using Cursor, or in `.env.local` (not committed):

```powershell
$env:CURSOR_AUTO_GIT_PUSH = "0"
```

### Optional git identity overrides

```powershell
$env:GIT_USER_NAME = "Your Name"
$env:GIT_USER_EMAIL = "you@example.com"
```

### Logs

Hook output is appended to `.cursor/git-sync.log` (gitignored).

## 3. GitHub authentication

`git push` must work without a password prompt. Options:

- **Git Credential Manager** (usual on Windows after first successful push)
- **SSH remote**: change `origin` to `git@github.com:QPSGP/Challenge-My-Beliefs.git`

Test:

```powershell
git push origin main
```

## 4. Vercel environment variables

In Vercel → **Settings** → **Environment Variables**:

| Name | Environments |
|------|----------------|
| `FOUNDER_KEY` | Production (and Preview if you want) |

Redeploy after adding or changing variables.

## 5. Data on Vercel

JSON files in `data/` are read from the repo on deploy. **Writes** (challenges, founder edits) still need a database before they persist on the live site.
