/** Full SQL for Supabase SQL Editor — kept in sync with supabase/schema.sql */
export const SETUP_SQL = `-- Challenge My Beliefs — paste in Supabase SQL Editor and click Run

create table if not exists public.beliefs (
  id text primary key,
  title text not null,
  statement text not null,
  category text not null default 'Uncategorized',
  confidence text not null default 'Medium',
  evidence jsonb not null default '[]'::jsonb,
  disproof text not null default '',
  outcome text not null default 'unchanged',
  ruling_note text not null default '',
  sort_order integer not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.challenges (
  id text primary key,
  belief_id text not null references public.beliefs (id) on delete cascade,
  challenger_name text not null,
  argument text not null,
  evidence text not null,
  context text not null,
  sources text not null default '',
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists public.belief_revisions (
  id text primary key,
  belief_id text not null references public.beliefs (id) on delete cascade,
  kind text not null,
  snapshot jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.channel_waitlist (
  id text primary key,
  channel text not null,
  email text not null,
  created_at timestamptz not null default now(),
  unique (channel, email)
);

create index if not exists beliefs_sort_order_idx on public.beliefs (sort_order);
create index if not exists challenges_belief_id_idx on public.challenges (belief_id);
create index if not exists challenges_created_at_idx on public.challenges (created_at desc);
create index if not exists belief_revisions_belief_id_idx on public.belief_revisions (belief_id);
create index if not exists belief_revisions_created_at_idx on public.belief_revisions (created_at desc);

alter table public.beliefs enable row level security;
alter table public.challenges enable row level security;
alter table public.belief_revisions enable row level security;
alter table public.channel_waitlist enable row level security;

notify pgrst, 'reload schema';
`;
