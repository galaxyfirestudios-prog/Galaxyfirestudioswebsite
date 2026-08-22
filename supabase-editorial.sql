-- FOR THE CULTURE editorial database
create table if not exists public.editorial_stories (
  id uuid primary key default gen_random_uuid(),
  source_name text not null,
  source_url text not null unique,
  source_title text,
  source_excerpt text,
  image_url text,
  source_published_at timestamptz,
  relevance_score integer default 0,
  headline text not null,
  dek text,
  body text,
  category text default 'CULTURE',
  status text not null default 'published',
  published_at timestamptz default now(),
  created_at timestamptz default now()
);

create index if not exists editorial_stories_status_published_idx
  on public.editorial_stories(status, published_at desc);

alter table public.editorial_stories enable row level security;

drop policy if exists "public can read published editorial stories" on public.editorial_stories;
create policy "public can read published editorial stories"
  on public.editorial_stories for select
  using (status = 'published');

-- Server uses the existing SUPABASE_SERVICE_ROLE_KEY to insert/update.
