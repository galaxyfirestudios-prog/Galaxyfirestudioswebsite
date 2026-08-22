# FOR THE CULTURE — Live Editorial Radar

This version is tuned for a fast, continuously refreshed editorial homepage.

## Editorial cadence

- The Vercel production cron is configured for **every 15 minutes**.
- The homepage checks the editorial feed every **5 minutes while the browser tab is visible**.
- The feed API is CDN-cached for 60 seconds with stale-while-revalidate, so visitors do not trigger expensive database work.
- The scanner fetches all configured sources in parallel, ranks by relevance + freshness, de-duplicates, then publishes the strongest new stories.
- Automatic publication remains enabled.

### Vercel plan note

Vercel currently limits Hobby cron jobs to once per day; Pro/Enterprise support per-minute schedules. If this project is on Hobby, the `*/15 * * * *` schedule will need a Pro/Enterprise plan (or an external/Supabase scheduler) before deployment. Do not put secrets in the browser.

## Required server environment

Existing Galaxy Fire infrastructure:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

New editorial configuration:

- `OPENAI_API_KEY`
- `EDITORIAL_MODEL` (default: `gpt-5-mini`)
- `EDITORIAL_CRON_SECRET`

Optional source tuning:

- `EDITORIAL_NATIVE_FEED`
- `EDITORIAL_NATIVE_MUSIC_FEED`
- `EDITORIAL_GUARDIAN_FEED`
- `EDITORIAL_SOURCE_ITEMS` (default 18)
- `EDITORIAL_MAX_STORIES_PER_SCAN` (default 3)
- `EDITORIAL_MAX_AGE_HOURS` (default 96)

## Database

Run `supabase-editorial.sql` once in the existing Galaxy Fire Supabase project. The scanner uses the existing service-role connection and does not create a second Supabase project.

## What the homepage does

FOR THE CULTURE content is driven by the editorial feed rather than the old Galaxy Fire photography. The hero, latest stories, music, culture, radio editorial promo, video/story, events, and artists/creators panels consume live published editorial records.

The navigation tabs smoothly scroll to their actual platform sections and update their active state as the visitor moves through the page.

## Performance behavior

- Editorial processing happens server-side.
- Browser polling is visibility-aware and runs every five minutes.
- Editorial API responses are cached at the edge for one minute.
- Below-the-fold editorial sections use `content-visibility:auto`.
- Story images are lazy-loaded except for the hero image.
- Mobile uses the same responsive content model rather than loading a second page.
