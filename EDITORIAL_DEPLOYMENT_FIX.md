# FOR THE CULTURE Editorial Deployment Fix

## Why this update exists

The editorial radar can successfully generate and commit `public/editorial-feed.json`, but a push made by GitHub Actions using `GITHUB_TOKEN` must not be treated as a reliable trigger for a second push-based Pages workflow. That can leave the repository updated while the live site still serves an older build.

## What is changed

The editorial workflow now:

1. Runs the existing multi-source, single-batch Gemini radar.
2. Preserves the last known-good feed when a scan fails or Gemini is quota-limited.
3. Validates the feed before publishing.
4. Commits a changed feed to `main` when needed.
5. Builds the website in the same workflow from the current workspace.
6. Uploads that build as a GitHub Pages artifact.
7. Deploys the artifact directly to GitHub Pages on every successful editorial run, even when the feed did not change during that particular scan.

This removes the stale-live-site gap between feed generation and website deployment.

## Existing editorial behavior preserved

- Up to 4 stories per scan.
- One Gemini request for the selected batch.
- Longer 300–450 word original stories.
- RSS / `og:image` / Twitter image discovery.
- Internal FOR THE CULTURE story reader.
- Source attribution and original-source link inside the reader.
- Six-hour scheduled scans plus manual workflow dispatch.
