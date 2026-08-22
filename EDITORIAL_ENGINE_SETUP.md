# FOR THE CULTURE — Editorial Engine

This phase reuses the existing Galaxy Fire Supabase project. It adds OpenAI only for server-side editorial drafting.

## Environment variables

Keep the existing:
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY

Add:
- OPENAI_API_KEY
- EDITORIAL_MODEL (default: gpt-5-mini)
- EDITORIAL_CRON_SECRET

Never put any of these in a `VITE_` variable.

## Supabase

Run `supabase-editorial.sql` once in the existing Galaxy Fire Supabase SQL editor.

## Endpoints

- `GET /api/editorial-feed` — returns approved/published stories.
- `POST /api/editorial-ingest` — checks the configured source feeds and stores relevant story metadata.
- `POST /api/editorial-draft` with `{ "id": "..." }` — sends one discovered story's metadata to OpenAI and stores a draft.

For POST requests, send `x-editorial-secret` matching `EDITORIAL_CRON_SECRET` when the secret is configured.

## Editorial rule

This system stores source metadata and links, then drafts original FOR THE CULTURE copy from that metadata. It is intentionally not a page scraper or automatic republication system.

## Current sources

The source registry is in `lib/editorial-sources.js`. Sources can be enabled/disabled or replaced without changing the rest of the application.
