# Challenge My Beliefs

A public platform for publishing beliefs, inviting evidence-based challenges, and recording whether each belief stays **unchanged**, becomes **refined**, or **changes** under the weight of stronger evidence.

**Repository:** https://github.com/QPSGP/Challenge-My-Beliefs

## Founding rule

A belief changes only when stronger evidence, grounded in objective reality and interpreted with contextual honesty, shows the original belief is incorrect.

## Features

- Public belief list with explicit order (#1 = lead belief)
- Belief detail pages with challenge submission
- Founder admin: add, edit, reorder, delete beliefs; record rulings; review challenges
- JSON file storage for local MVP (`data/beliefs.json`, `data/challenges.json`)

## Auto deploy (Cursor → GitHub → Vercel)

After each Cursor **agent** run, a project hook can commit and push to GitHub; Vercel redeploys from `main` automatically.

- Hook config: `.cursor/hooks.json`
- Sync script: `scripts/git-sync.ps1`
- Full setup: [DEPLOY.md](./DEPLOY.md)
- Manual push: `npm run sync`

Disable auto push: `$env:CURSOR_AUTO_GIT_PUSH = "0"`

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

### Optional founder key

Copy `env.example` to `.env` and set `FOUNDER_KEY` to lock down founder API routes in production.

## Routes

| Path | Purpose |
|------|---------|
| `/` | Home + lead belief spotlight |
| `/beliefs` | All beliefs in order |
| `/beliefs/[id]` | Belief detail + challenges |
| `/about` | Manifesto and process |
| `/admin` | Founder tools |

## Scripts

```bash
npm run dev    # development
npm run build  # production build
npm run start  # run production build
npm run lint   # ESLint
```

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS

## Data

Beliefs and challenges are stored as JSON under `data/`. This works for local development; use a database before deploying to serverless hosting.
