# FOR THE CULTURE — Editorial Feed / GitHub Pages Deployment Fix

## What was fixed

The editorial radar successfully generated and committed the feed, but the separate GitHub Pages deployment workflow depended on a second workflow being triggered by the bot commit.

This is unreliable because commits made with the repository's `GITHUB_TOKEN` do not create new workflow runs for most workflow-triggered events. The editorial workflow therefore now performs the Pages build and deployment itself after it successfully publishes a changed `public/editorial-feed.json`.

## New publication chain

1. Collect editorial candidates.
2. Generate up to four FOR THE CULTURE stories in one Gemini request.
3. Preserve the previous feed when a scan produces no stories or Gemini is temporarily unavailable.
4. Synchronize with the latest `main` branch and safely commit the feed.
5. Build the website from that same checkout.
6. Verify `dist/editorial-feed.json` contains at least one published story before uploading the Pages artifact.
7. Upload the artifact with `actions/upload-pages-artifact@v4`.
8. Deploy it with `actions/deploy-pages@v4`.

The workflow therefore no longer relies on a separate push-triggered Pages workflow to notice the bot's feed commit.

## Expected successful run

When four stories are generated, the workflow should show:

- `published: 4`
- `feedStories: 4` or more
- `selectedForGemini: 4`
- `geminiRequests: 1`
- `Feed validation OK: ...`
- `Pages artifact contains ... editorial stories.`
- `Deploy editorial update to GitHub Pages`

The website should then load the same static `editorial-feed.json` that was verified inside the Pages artifact.
