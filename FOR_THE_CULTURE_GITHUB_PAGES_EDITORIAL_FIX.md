# FOR THE CULTURE — Hosting and Editorial Fix

## Why the previous editorial system showed no stories

The live site is hosted on GitHub Pages. GitHub Pages serves the built Vite files but does **not** execute the project's `/api/*.js` serverless functions.

The previous build therefore requested `/api/editorial-feed` from GitHub Pages and received a 404.

This update fixes that hosting mismatch without requiring you to move the site immediately.

## How this version works

1. GitHub Pages continues to host the website.
2. A GitHub Actions workflow runs the editorial radar every 15 minutes.
3. The workflow securely uses repository secrets for Supabase and OpenAI.
4. The radar reads multiple RSS sources, ranks relevant stories, removes duplicates, asks OpenAI for an original FOR THE CULTURE brief, and stores the published story in the existing Supabase editorial table.
5. The workflow writes the latest 12 published stories to `public/editorial-feed.json`.
6. The workflow deploys the updated static site to GitHub Pages.
7. The browser reads `editorial-feed.json` first, so it no longer depends on a `/api` route that GitHub Pages cannot execute.
8. The existing `/api` functions are retained for a future Vercel/server deployment and for existing Galaxy Fire server integrations.

## Required one-time setup

### A. Supabase migration

Run `supabase-editorial.sql` once in the same Supabase project already used by Galaxy Fire Studios.

### B. GitHub repository secrets

In GitHub:

Settings → Secrets and variables → Actions → New repository secret

Add:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`

Do **not** put the service-role key or OpenAI key in `VITE_` variables, source files, or committed files.

### C. Start the radar

After adding the three secrets:

Actions → FOR THE CULTURE Editorial Radar → Run workflow

The workflow will perform the first scan immediately. After that, the scheduled scan runs every 15 minutes.

The first run may take a little time because it has to fetch the sources, generate the first stories, update Supabase, rebuild the site and deploy it.

## Sources currently monitored

- The NATIVE
- The NATIVE Music
- PUNCH Entertainment
- PUNCH Interviews
- PUNCH Special Features
- PUNCH Videos
- The Guardian Nigeria

## Automatic publication

Automatic publication is ON.

The radar publishes up to 3 strong stories per scan, after relevance, freshness and duplicate checks. It does not copy the source article; it creates an original FOR THE CULTURE brief from the supplied feed metadata and keeps the original source URL.

## Website behavior

FOR THE CULTURE checks the static editorial feed when the page loads and periodically while the tab is visible. The latest deployed feed drives the hero, Latest Stories, New Music, Culture, Events, Artists and other editorial modules.

## Important

The GitHub Pages `/api/editorial-status` URL will still return 404 because GitHub Pages does not run serverless API files. That is no longer required by this version.

To inspect the latest radar run, use the GitHub Actions run log for `FOR THE CULTURE Editorial Radar`.

