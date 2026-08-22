-- FOR THE CULTURE Editorial Engine
-- Run this in the EXISTING Galaxy Fire Supabase project.

create table if not exists public.editorial_stories (
  id uuid primary key default gen_random_uuid(),
  source_key text not null,
  source_name text not null,
  source_url text not null unique,
  original_headline text not null,
  source_excerpt text,
  source_published_at timestamptz,
  relevance_score integer not null default 0,
  headline text,
  dek text,
  body text,
  category text,
  tags jsonb not null default '[]'::jsonb,
  status text not null default 'discovered' check (status in ('discovered','draft','approved','published','rejected')),
  ai_model text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists editorial_stories_status_idx on public.editorial_stories(status);
create index if not exists editorial_stories_relevance_idx on public.editorial_stories(relevance_score desc);
create index if not exists editorial_stories_published_idx on public.editorial_stories(published_at desc);

alter table public.editorial_stories enable row level security;

-- The server uses the existing Supabase service-role key for editorial writes.
-- Public readers should only see approved/published stories through the API.
