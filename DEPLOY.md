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

| Name | Environments | Notes |
|------|----------------|-------|
| `SUPABASE_URL` | Production, Preview | From Supabase → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Production, Preview | **service_role** key only (server-side) |
| `FOUNDER_KEY` | Production (and Preview if you want) | Optional founder lock |

Redeploy after adding or changing variables.

**Recommended:** Supabase for production ([SUPABASE.md](./SUPABASE.md)). Blob still works as fallback if Supabase is not set.

## 5. Enable saves on Vercel

Vercel cannot write to `data/*.json` on disk. Use **Supabase** (recommended) or **Vercel Blob**.

### Option A — Supabase (recommended)

Follow [SUPABASE.md](./SUPABASE.md): create project → run `supabase/schema.sql` → add env vars → redeploy → `/admin` → import or seed beliefs.

### Option B — Vercel Blob

1. Vercel dashboard → your project **challenge-my-beliefs**
2. **Storage** tab → **Create Database** → choose **Blob**
3. Name it (e.g. `cmb-data`) → **Create** (public or **private** store both work)
4. When asked, **connect to challenge-my-beliefs** (all environments)
5. Vercel adds `BLOB_READ_WRITE_TOKEN` automatically
6. **Redeploy** the latest `main` branch (Deployments → … → Redeploy)

After redeploy, founder **Save belief** works on the live site.

### Verify in the app

Open **Founder** → `/admin`. The **System status** panel shows:

- Blob connected (green on Vercel)
- Beliefs loaded (30/30 for the full benevolent society list)
- Founder key status
- Challenge, revision, and waitlist counts

If beliefs show fewer than 30, click **Load benevolent society beliefs** on the same page.

## 6. Optional: set FOUNDER_KEY

When set, founder API routes accept either the `x-founder-key` header **or** a signed-in session from `/admin` → **Founder access** → **Sign in (7 days)**.

1. Vercel → **Settings** → **Environment Variables** → add `FOUNDER_KEY`
2. Redeploy
3. On `/admin`, enter the same key and click **Sign in (7 days)** (or **Save key** for the legacy browser header)

Optional: set `FOUNDER_SESSION_SECRET` for a separate session signing secret.

## 7. Optional: email alerts (Resend)

Get notified when someone submits a challenge or joins a waitlist.

1. Create a free account at [resend.com](https://resend.com) and create an API key
2. Vercel → **Environment Variables**:
   - `RESEND_API_KEY` — your Resend API key
   - `FOUNDER_NOTIFY_EMAIL` — your inbox (e.g. `you@example.com`)
3. Redeploy
4. `/admin` → **System status** should show **Email alerts: Configured**

Until you verify a custom domain in Resend, the default sender is `onboarding@resend.dev` (fine for testing to your own email).

For local dev, copy `env.example` to `.env.local` and set the same variables.

## 8. What's next (not in MVP)

| Item | Status | Notes |
|------|--------|-------|
| Belief version history | Shipped | Visible on each belief page |
| Community channel | Beta | `/community` + admin signups |
| Social / podcast previews | Shipped | Waitlists + share on beliefs |
| Email alerts + CSV export | Shipped | Resend + `/admin` operational tools |
| Postgres / Supabase | Shipped | [SUPABASE.md](./SUPABASE.md) |
| Founder session sign-in | Shipped | `/admin` → Sign in (7 days) |
| Live podcast / social accounts | Planned | After community beta |
| Web3 timestamps | Future | No token in MVP |

### Local development

No Blob needed. Saves go to `data/beliefs.json` and `data/challenges.json` as before.
