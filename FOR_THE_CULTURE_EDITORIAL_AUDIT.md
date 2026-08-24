# FOR THE CULTURE Editorial / Blog / Search Audit — August 24, 2026

## Finding

The frontend story loader is not the primary failure.

The current build has **two editorial publication paths**:

1. **GitHub Pages path**
   - `scripts/editorial-radar.mjs`
   - generates `public/editorial-feed.json`
   - `.github/workflows/editorial-radar.yml` deploys that feed to GitHub Pages

2. **Vercel/Supabase path**
   - `api/editorial-scan.js` generates stories into Supabase
   - `api/editorial-feed.js` reads published Supabase rows

The current checked-in `public/editorial-feed.json` is valid but empty (`stories: []`). The React frontend correctly tries the static feed and then the API fallback, so an empty feed produces the expected editorial-empty state.

## Root cause

The GitHub Pages editorial workflow was only scheduled every six hours or manually. It did **not** automatically run when the latest website code was pushed.

That means a new site deployment could contain an empty `public/editorial-feed.json` indefinitely until someone manually started the Editorial Radar workflow.

The Vercel/Supabase path cannot rescue a GitHub Pages deployment when its `/api/*` functions are not executing on that host.

## Minimum surgical fix

The editorial workflow now also runs on pushes to `main`, with:

- `paths-ignore: public/editorial-feed.json`
- `paths-ignore: editorial-run-status.json`

This prevents the workflow's own generated-feed commit from triggering an infinite editorial loop.

The existing six-hour schedule and manual workflow trigger remain unchanged.

## Preserved

No redesign or replacement was made to:

- FOR THE CULTURE frontend
- search/feed UI
- story reader
- Gemini editorial generation logic
- source selection
- image enrichment
- Supabase schema
- radio
- beat store
- booking/payment systems
- other Galaxy Fire Studios sections

## Important deployment requirement

The GitHub repository must still contain the required `GEMINI_API_KEY` Actions secret.

After this patch is pushed to `main`, the Editorial Radar should run automatically and populate `public/editorial-feed.json` if eligible source stories are available and Gemini generation succeeds.

The workflow's existing status step will expose source, candidate, Gemini and publication failures.

## Validation performed

JavaScript syntax checks passed for:

- `scripts/editorial-radar.mjs`
- `lib/gemini-editorial.cjs`
- `api/editorial-feed.js`
- `api/editorial-scan.js`
- `api/editorial-status.js`

The workflow YAML was also parsed successfully.

## What remains outside the ZIP

I cannot inspect or change the live GitHub/Vercel environment secrets from the uploaded project archive. If the patched workflow reports `GEMINI_API_KEY` missing, that is a repository configuration issue rather than a code failure.
