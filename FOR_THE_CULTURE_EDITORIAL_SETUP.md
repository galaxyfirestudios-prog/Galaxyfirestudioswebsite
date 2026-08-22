# FOR THE CULTURE — Live Editorial Fix / Phase 2

This build starts from the working Phase 1 Galaxy Fire site and fixes the FOR THE CULTURE "LATEST STORIES" section.

## What changed

- The LATEST STORIES section now reads only from `/api/editorial-feed`.
- The old hard-coded `visual_02`, `visual_06`, and `visual_12` news cards are removed.
- If live editorial stories exist, their real headline, source, date and feed image are shown.
- If the feed is unavailable or empty, the page shows an honest "EDITORIAL RADAR INITIALIZING" state instead of pretending studio photos are news.
- Images supplied by source feeds are lazy-loaded and decoded asynchronously.
- The editorial API is cached briefly at the edge for faster desktop/mobile delivery.
- Multi-source editorial scanning and automatic publication are included.
- Vercel cron runs the scan daily at 09:00 UTC.
- Up to 5 new stories are published per scan.
- The scan requires the existing Supabase server credentials plus OpenAI and a cron secret.

## Existing Supabase

Reuse the same:
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY

Do not create a second Supabase project.

## New environment variables

- OPENAI_API_KEY
- EDITORIAL_CRON_SECRET (or CRON_SECRET)
- EDITORIAL_MODEL (defaults to gpt-5-mini)
- Optional: EDITORIAL_NATIVE_FEED
- Optional: EDITORIAL_GUARDIAN_FEED

## Database

Run `supabase-editorial.sql` once in the same Supabase project already used by Galaxy Fire.

## Editorial sources

The scanner includes:
- The NATIVE
- PUNCH Entertainment
- PUNCH Interviews
- PUNCH Special Features
- PUNCH Videos
- The Guardian Nigeria

Feed URLs are isolated in `api/editorial-scan.js` so additional approved sources can be added without changing the homepage.

## Automatic publication

The Vercel cron is enabled at:
`0 9 * * *`

The scanner:
1. Reads source RSS metadata.
2. Scores relevance.
3. Skips already-seen source URLs.
4. Generates an original FOR THE CULTURE brief with OpenAI.
5. Stores the source URL and attribution.
6. Publishes the new story.
7. Stops after 5 successful publications per scan.

The system does not copy full source articles.

## Testing

After deployment and environment/database setup, the homepage should show:
- live story cards when published rows exist;
- otherwise "EDITORIAL RADAR INITIALIZING".

A missing backend must never silently fall back to Galaxy Fire photography as if it were current news.

## Deployment diagnostics

Visit `/api/editorial-status` on the production site to see whether Supabase, OpenAI, the editorial table, and the configured RSS sources are reachable. This endpoint never returns secret values.

### Important Vercel Cron detail
Vercel sends the configured `CRON_SECRET` as `Authorization: Bearer <secret>` for cron invocations. The scanner accepts that standard Vercel secret and also accepts `EDITORIAL_CRON_SECRET` for manual calls.
