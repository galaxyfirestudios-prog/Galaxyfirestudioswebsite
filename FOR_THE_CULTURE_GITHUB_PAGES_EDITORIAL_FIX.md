# FOR THE CULTURE — GitHub Pages Editorial Engine (Corrected)

The live site is hosted on GitHub Pages, so `/api/*.js` files cannot execute there. The editorial system therefore runs in GitHub Actions and writes a static `public/editorial-feed.json` that the website consumes.

## What is different in this corrected build

- The editorial radar runs on every push to `main`, every 15 minutes, and manually from Actions.
- It fetches all configured sources in parallel.
- It ranks stories by relevance and freshness and removes duplicates.
- It uses OpenAI server-side inside GitHub Actions to create the FOR THE CULTURE write-up.
- Supabase is no longer a hard dependency for the public feed. This removes the failure point caused by expecting GitHub Pages to execute Supabase-backed API routes.
- Existing Supabase support can be reconnected later as the newsroom database, but the static feed can now publish independently.
- The website reads `public/editorial-feed.json` first.

## One required secret

In GitHub: **Settings → Secrets and variables → Actions → New repository secret**

Add:

- `OPENAI_API_KEY`

Do not put this key in the website, `VITE_` variables, or committed files.

## First run

After replacing the project in the GitHub repository and pushing to `main`:

1. Open **Actions**.
2. Select **FOR THE CULTURE Editorial Radar**.
3. Click **Run workflow**.
4. Open the run and inspect the `Check editorial run status` step.
5. The workflow will write `public/editorial-feed.json` and deploy GitHub Pages.

The scheduled job then repeats every 15 minutes.

## Sources

- The NATIVE
- The NATIVE Music
- PUNCH Entertainment
- PUNCH Interviews
- PUNCH Special Features
- PUNCH Videos
- The Guardian Nigeria

## Automatic publication

Automatic publication is enabled. Up to three new stories are generated per scan. Stories are filtered for relevance, freshness and duplicates before the AI writes the original FOR THE CULTURE brief. The original source URL remains attached to every story.
