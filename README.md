# Challenge My Beliefs

A public platform for publishing beliefs, inviting evidence-based challenges, and recording whether each belief stays **unchanged**, becomes **refined**, or **changes** under the weight of stronger evidence.

**Live site:** https://challenge-my-beliefs.vercel.app  
**Repository:** https://github.com/QPSGP/Challenge-My-Beliefs

## Founding rule

A belief changes only when stronger evidence, grounded in objective reality and interpreted with contextual honesty, shows the original belief is incorrect.

## Features

- 30 beliefs for a unified benevolent society (core ten + extended list by category)
- Public belief list with explicit order (#1 = lead belief)
- Category browse (`/categories`) and belief version history
- Belief detail pages with structured challenge submission
- Founder admin: add, edit, reorder, delete beliefs; record rulings; review challenges
- Planned channels: social, podcast, community (waitlist + roadmap)
- **Local dev:** JSON under `data/`
- **Production:** Supabase Postgres (recommended) or Vercel Blob

## Production checklist

1. **Supabase (recommended)** — Create project, run `supabase/schema.sql`, add env vars → [SUPABASE.md](./SUPABASE.md)
2. **Or Vercel Blob** — Storage → Create Blob → connect → redeploy ([DEPLOY.md](./DEPLOY.md))
3. **FOUNDER_KEY** (optional) — Vercel env var; enter same key in `/admin`
4. **Beliefs loaded** — `/admin` system status should show 30/30

## Auto deploy (Cursor → GitHub → Vercel)

- Hook config: `.cursor/hooks.json`
- Sync script: `scripts/git-sync.ps1`
- Manual push: `npm run sync`
- Full setup: [DEPLOY.md](./DEPLOY.md)

Disable auto push: `$env:CURSOR_AUTO_GIT_PUSH = "0"`

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

Copy `env.example` to `.env` and optionally set `FOUNDER_KEY`.

## Routes

| Path | Purpose |
|------|---------|
| `/` | Home, lead belief, core ten, categories |
| `/beliefs` | Full belief list |
| `/beliefs/[id]` | Belief detail, history, challenges |
| `/categories` | Category index |
| `/categories/[slug]` | Beliefs in one category |
| `/channels` | Social, podcast, community plans |
| `/channels/[slug]` | Channel detail + waitlist |
| `/roadmap` | What is built vs planned |
| `/about` | Manifesto and process |
| `/admin` | Founder tools + system status |

## Scripts

```bash
npm run dev    # development
npm run build  # production build
npm run start  # run production build
npm run lint   # ESLint
npm run sync   # commit + push to GitHub
```

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Vercel Blob (production persistence fallback)
- Supabase Postgres (recommended production persistence)
