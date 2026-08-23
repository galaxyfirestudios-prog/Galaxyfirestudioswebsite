# FOR THE CULTURE — Gemini Editorial Engine Setup

This build uses Google's Gemini Developer API for the FOR THE CULTURE editorial-generation layer while preserving the existing source feeds, relevance scoring, duplicate protection, publication feed, GitHub Actions deployment, Supabase support, internal story reader and website UI. It also enriches stories with source-page images when available and asks Gemini for longer 4–6 paragraph editorial treatments.

The editorial radar now sends the selected candidates to Gemini in ONE batched generation request and can publish up to 4 stories from that response. This is deliberately designed to reduce Gemini free-tier request consumption and prevent the old one-request-per-story behaviour from exhausting the quota.

## Required GitHub Secret

In the GitHub repository:

**Settings → Secrets and variables → Actions → New repository secret**

Create exactly:

`GEMINI_API_KEY`

Do not put the key in the website code, any `VITE_` variable, `.env` committed to Git, or `public/`.

## Model

The workflow uses:

`gemini-3.5-flash-lite`

The Gemini Developer API currently lists Gemini 3.7 Flash as available on its Free Tier with free input/output tokens, subject to Google's rate limits. See Google's official pricing and rate-limit documentation before increasing scan frequency.

## Quota-safe schedule

The GitHub editorial workflow runs automatically every 6 hours instead of every 15 minutes or on every code push. A manual **Run workflow** is still available for testing. A normal scan uses one Gemini generation request for up to four stories. A 429 response is recorded as a failure and is not retried, because retrying a quota-exhausted request cannot restore the daily allowance.

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
- Image lookup is optional and cannot prevent a story from publishing.
- Stories are written as 4–6 short paragraphs of approximately 300–450 words.
- Up to 4 stories are generated from one Gemini batch request per scan.
- The run status reports `generation_mode`, `selected_for_gemini`, and `gemini_requests_this_run` so quota behaviour is visible.

## No OpenAI API key is required by this build

The editorial-generation path no longer references `OPENAI_API_KEY`, `openai.com`, or `gpt-5-mini`.
