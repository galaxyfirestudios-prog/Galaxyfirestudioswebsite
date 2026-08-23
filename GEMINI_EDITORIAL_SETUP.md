# FOR THE CULTURE — Gemini Editorial Engine Setup

This build uses Google's Gemini Developer API for the FOR THE CULTURE editorial-generation layer while preserving the existing source feeds, relevance scoring, duplicate protection, publication feed, GitHub Actions deployment, Supabase support, internal story reader and website UI. It also enriches stories with source-page images when available and asks Gemini for a longer 4–6 paragraph editorial treatment.

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
- Image lookup is optional and cannot prevent a story from publishing.
- Stories are written as 4–6 short paragraphs of approximately 300–450 words.

## No OpenAI API key is required by this build

The editorial-generation path no longer references `OPENAI_API_KEY`, `openai.com`, or `gpt-5-mini`.
