# FOR THE CULTURE — Gemini Editorial Engine Setup

This build replaces the OpenAI editorial-generation layer with Google's Gemini Developer API while preserving the existing FOR THE CULTURE source feeds, relevance scoring, duplicate protection, publication feed, GitHub Actions deployment, Supabase support, and website UI.

## Required GitHub Secret

In the GitHub repository:

**Settings → Secrets and variables → Actions → New repository secret**

Create exactly:

`GEMINI_API_KEY`

Do not put the key in the website code, any `VITE_` variable, `.env` committed to Git, or `public/`.

## Model

The workflow uses:

`gemini-3.7-flash`

The Gemini Developer API currently lists Gemini 3.7 Flash as available on its Free Tier with free input/output tokens, subject to Google's rate limits. See Google's official pricing and rate-limit documentation before increasing scan frequency.

## First test

1. Replace the existing project files with this build.
2. Commit/push to the `main` branch.
3. Open **GitHub → Actions → FOR THE CULTURE Editorial Radar**.
4. Click **Run workflow**.
5. Open **Run FOR THE CULTURE editorial radar**.
6. Confirm the summary reports candidates and `published` greater than 0.
7. Confirm `public/editorial-feed.json` now contains stories.
8. Confirm the deployed FOR THE CULTURE homepage displays the stories.

## What the workflow now reports

- `gemini_configured` instead of `openai_configured` in `editorial-run-status.json`.
- Gemini HTTP errors are preserved in the failure output, without exposing the API key.

## No OpenAI API key is required by this build

The editorial-generation path no longer references `OPENAI_API_KEY`, `openai.com`, or `gpt-5-mini`.

## Multi-story editorial publishing
The editorial radar now sends the selected candidates to Gemini as one structured batch request. This reduces free-tier rate-limit pressure and allows up to 5 new stories per scan. If the batch request fails, the engine falls back to individual story generation.

## FOR THE CULTURE internal reader
Editorial cards now open an in-site FOR THE CULTURE reader. The original source is retained as an attribution link inside the reader and opens in a new tab; visitors no longer leave the platform merely by clicking a story card.

## Live radio now-playing
The site reads `public/radio-now-playing.json` every 30 seconds. To connect real station metadata, add these GitHub repository Variables under Settings -> Secrets and variables -> Actions -> Variables:
- `RADIO_NOW_PLAYING_URL` — JSON endpoint from the radio provider containing current-track metadata.
- `RADIO_STREAM_URL` — direct stream URL, if the metadata endpoint does not provide one.
- `RADIO_SHOW_NAME` — optional station/show name fallback.

The metadata updater understands common AzuraCast-style and simple JSON payloads and writes normalized `artist`, `title`, `artwork_url`, `stream_url`, `show`, and `dj` fields to `public/radio-now-playing.json`.
