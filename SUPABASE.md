# Supabase setup

Supabase gives you **Postgres** in the cloud. When configured, the app uses it instead of JSON files (local) or Vercel Blob (production).

## Why use it

- One database for beliefs, challenges, revisions, and waitlist
- Safer concurrent edits than overwriting JSON files
- Easier queries and reporting as the site grows
- Foundation for community accounts later

## Step 1 — Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign in
2. **New project**
3. Choose an organization, name (e.g. `challenge-my-beliefs`), database password, and region
4. Wait for the project to finish provisioning (~2 minutes)

## Step 2 — Create database tables

**Easy way (recommended):** After Vercel redeploys with Supabase attached:

1. Open **Founder** → `/admin`
2. Click **Setup database and load beliefs** (green button)

That creates all tables and loads the 30 beliefs automatically using `POSTGRES_URL` from Vercel.

**Manual way (if the button fails):**

1. Supabase → **SQL Editor** → **New query**
2. Copy the full contents of [`supabase/schema.sql`](./supabase/schema.sql)
3. Click **Run**
4. Return to `/admin` → **Load benevolent society beliefs**

## Step 3 — Copy API credentials

1. Supabase → **Project Settings** → **API**
2. Copy:
   - **Project URL** → `SUPABASE_URL`
   - **service_role** key (under Project API keys) → `SUPABASE_SERVICE_ROLE_KEY`

**Important:** Use the **service_role** key only on the server (Vercel env vars). Never put it in the browser or commit it to git.

## Step 4 — Add environment variables

### Vercel Marketplace integration

If you connected Supabase through **Vercel → Storage / Integrations → Supabase**, Vercel usually sets:

| Vercel injects | Used for |
|----------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` or `SUPABASE_URL` | Project URL |
| `SUPABASE_SECRET_KEY` or `SUPABASE_SERVICE_ROLE_KEY` | Server writes (required) |

The app reads both naming conventions. **Redeploy** after connecting.

You still must run [`supabase/schema.sql`](./supabase/schema.sql) once in the Supabase **SQL Editor** (tables are not created automatically).

### Local (optional)

Create or edit `.env.local`:

```env
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

Restart `npm run dev`.

### Vercel (production)

1. Vercel → **challenge-my-beliefs** → **Settings** → **Environment Variables**
2. Add both variables for **Production** (and Preview if you want)
3. **Deployments** → latest → **Redeploy**

Supabase takes priority over Vercel Blob when both are set.

## Step 5 — Load your data

After redeploy:

1. Open **Founder** → `/admin`
2. **System status** should show **Persistence: Supabase (Postgres)**
3. If you had data in Blob/JSON, click **Migrate to Supabase**
4. If beliefs are short, click **Load benevolent society beliefs**

The app also auto-seeds the 30 bundled beliefs if the database is empty or stale.

## Verify

- `/admin` → beliefs count **30 / 30**
- `/beliefs` → full list visible
- Edit a belief → save works; **Version history** updates

## Troubleshooting

| Problem | Fix |
|--------|-----|
| `relation "beliefs" does not exist` | Run `supabase/schema.sql` in SQL Editor |
| Saves fail on Vercel | Confirm env vars and redeploy |
| Still shows Blob | Remove duplicate storage confusion: Supabase wins when both are set; check env vars on this deployment |
| `Invalid API key` | Copy **service_role**, not anon key |

## Blob vs Supabase

| | Blob | Supabase |
|---|------|----------|
| Good for | Quick MVP | Long-term production |
| Query data | Load whole JSON file | SQL |
| You can use both during transition | Yes — migrate once, then rely on Supabase |

See also: [DEPLOY.md](./DEPLOY.md), [DATABASE.md](./DATABASE.md)
