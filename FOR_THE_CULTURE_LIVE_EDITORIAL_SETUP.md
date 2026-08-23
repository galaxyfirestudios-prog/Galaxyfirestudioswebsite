# FOR THE CULTURE Editorial Engine — GitHub Pages Setup

This build uses GitHub Actions for the editorial backend because GitHub Pages is static hosting and cannot execute `/api/*.js` server functions.

Required GitHub Actions secret: `GEMINI_API_KEY`.

The existing Galaxy Fire Supabase backend is not required for the public editorial feed in this version. The feed is generated into `public/editorial-feed.json` and deployed with the site.

Run the **FOR THE CULTURE Editorial Radar** workflow manually once after the first push. It will then run every 6 hours automatically.


## Feed safety

The editorial workflow validates the feed before committing it and then hands deployment back to the normal GitHub Pages workflow, which builds from the remote `main` branch. If Gemini is temporarily unavailable, the last successful feed is preserved. The homepage also continues past a valid-but-empty static feed and checks the retained API endpoint before showing the empty state.
