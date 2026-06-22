# Database migration path

The MVP stores data as JSON:

| Data | Local file | Vercel Blob path |
|------|------------|------------------|
| Beliefs | `data/beliefs.json` | `cmb/beliefs.json` |
| Challenges | `data/challenges.json` | `cmb/challenges.json` |
| Belief revisions | `data/belief-revisions.json` | `cmb/belief-revisions.json` |
| Channel waitlist | `data/waitlist.json` | `cmb/waitlist.json` |

This works for launch. Before heavy traffic or complex queries, move to **Postgres** (Supabase or Vercel Postgres).

## Recommended next step: Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Add tables:

```sql
create table beliefs (
  id text primary key,
  title text not null,
  statement text not null,
  category text not null,
  confidence text not null,
  evidence jsonb not null default '[]',
  disproof text not null default '',
  outcome text not null default 'unchanged',
  ruling_note text not null default '',
  sort_order int not null,
  updated_at timestamptz not null default now()
);

create table challenges (
  id text primary key,
  belief_id text not null references beliefs(id) on delete cascade,
  challenger_name text not null,
  argument text not null,
  evidence text not null,
  context text not null,
  sources text not null default '',
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table belief_revisions (
  id text primary key,
  belief_id text not null references beliefs(id) on delete cascade,
  kind text not null,
  snapshot jsonb not null,
  created_at timestamptz not null default now()
);

create table channel_waitlist (
  id text primary key,
  channel text not null,
  email text not null,
  created_at timestamptz not null default now(),
  unique (channel, email)
);
```

3. Set env vars in Vercel:

| Name | Purpose |
|------|---------|
| `DATABASE_URL` | Postgres connection string |
| `SUPABASE_URL` | Optional, if using Supabase client |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side writes only |

4. Replace `src/lib/persistence.ts` reads/writes with a `src/lib/db/` layer while keeping the same `store.ts` API.

## Migration script (manual)

1. Export current live data from `/api/beliefs` and founder dashboard
2. Insert rows into Postgres in belief order (`sort_order`)
3. Point production env at the database
4. Keep Blob as backup until verified

## What stays out of MVP

- **Web3 / on-chain timestamps** — optional integrity layer later; no token
- **Full user accounts** — founder key today; proper auth when community launches

See also: [DEPLOY.md](./DEPLOY.md) for Blob setup and [README.md](./README.md) for routes.
