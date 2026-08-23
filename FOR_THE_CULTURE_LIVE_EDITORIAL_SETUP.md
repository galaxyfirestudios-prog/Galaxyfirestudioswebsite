# FOR THE CULTURE Editorial Engine — GitHub Pages Setup

This build uses GitHub Actions for the editorial backend because GitHub Pages is static hosting and cannot execute `/api/*.js` server functions.

Required GitHub Actions secret: `GEMINI_API_KEY`.

The existing Galaxy Fire Supabase backend is not required for the public editorial feed in this version. The feed is generated into `public/editorial-feed.json`. The editorial workflow now builds and deploys the GitHub Pages site directly after the scan so the live site cannot remain on an older build when the feed commit succeeds.

Run the **FOR THE CULTURE Editorial Radar** workflow manually once after the first push. It will then run every 6 hours automatically.


## Feed safety

The editorial workflow validates the feed before committing it and then builds and deploys the current workspace directly to GitHub Pages. This avoids relying on a second push-triggered workflow after a `GITHUB_TOKEN` commit. If Gemini is temporarily unavailable, the last successful feed is preserved. The homepage also continues past a valid-but-empty static feed and checks the retained API endpoint before showing the empty state.
