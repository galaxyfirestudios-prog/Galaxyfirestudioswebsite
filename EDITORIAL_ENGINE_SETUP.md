# FOR THE CULTURE — Automated Editorial Engine

This update is built on the supplied Phase 1 site. It reuses the existing Galaxy Fire Supabase backend and adds an OpenAI server-side editorial layer.

## 1. Existing Supabase
Run `supabase-editorial.sql` once in the existing Galaxy Fire Supabase project's SQL Editor. Do not create a second Supabase project.

## 2. Vercel environment variables
Keep the existing Galaxy Fire variables. Add:

- `OPENAI_API_KEY` — server-side OpenAI API key; never prefix with `VITE_`.
- `EDITORIAL_CRON_SECRET` — a long random secret used to protect the scan.
- `CRON_SECRET` — use the same value; Vercel Cron supplies it automatically in the Authorization header.
- `EDITORIAL_MODEL` — defaults to `gpt-5-mini` if omitted.
- `EDITORIAL_MIN_SCORE` — defaults to `16`.
- `EDITORIAL_MAX_PER_RUN` — defaults to `5`.

The existing `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are reused.

## 3. Automatic publication
Automatic publication is intentionally enabled in the scanner. Every qualifying story is generated from RSS/feed metadata and published as a short original FOR THE CULTURE brief with source attribution and a link to the original publication. The system does not copy full article text or source images.

The Vercel cron runs daily at 09:00 UTC in the supplied configuration. The scanner is capped at 5 publications per run by default so the launch period can be observed without flooding the site.

## 4. Test the scanner manually
After deployment and after the SQL migration has been run, call:

`GET /api/editorial-scan`

with header:

`Authorization: Bearer YOUR_EDITORIAL_CRON_SECRET`

The response reports sources checked, stories fetched, relevant stories, publications and errors.

## 5. Editorial philosophy
The engine is designed to discover African music, culture, art, fashion, film, creative-industry and event stories. It uses source metadata only, creates an original brief, retains attribution and the original URL, and avoids known blocked categories.

Automatic publishing is enabled for this launch experiment as requested. Monitor the feed for several days and adjust the source list, relevance threshold, model or publication cap as needed.
