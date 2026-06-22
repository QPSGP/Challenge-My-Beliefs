# Database

## Current storage (automatic)

The app picks a backend in this order:

1. **Supabase** — if `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` are set → [SUPABASE.md](./SUPABASE.md)
2. **Vercel Blob** — if `BLOB_READ_WRITE_TOKEN` is set → [DEPLOY.md](./DEPLOY.md)
3. **Local JSON** — `data/*.json` for development

No code changes needed when switching — only environment variables.

## Schema

SQL lives in [`supabase/schema.sql`](./supabase/schema.sql):

| Table | Purpose |
|-------|---------|
| `beliefs` | Public belief list (`sort_order` = display rank) |
| `challenges` | Submitted challenges |
| `belief_revisions` | Version history snapshots |
| `channel_waitlist` | Social / podcast / community signups |

## Migration from JSON/Blob

1. Complete [SUPABASE.md](./SUPABASE.md) steps 1–4
2. Redeploy Vercel
3. `/admin` → **Migrate to Supabase**

Or founder **Load benevolent society beliefs** to seed only beliefs.

## Code layout

| Path | Role |
|------|------|
| `src/lib/persistence.ts` | Routes reads/writes to Supabase, Blob, or files |
| `src/lib/supabase/client.ts` | Server Supabase client (service role) |
| `src/lib/supabase/storage.ts` | Postgres CRUD |
| `src/lib/store.ts` | App logic (unchanged API) |

## Future

- Public read policies in Supabase (optional direct client reads)
- Founder auth via Supabase Auth instead of shared key
- Web3 timestamps remain optional; no token in MVP
