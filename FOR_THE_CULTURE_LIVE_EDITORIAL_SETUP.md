# FOR THE CULTURE Editorial Engine — GitHub Pages Setup

This build uses GitHub Actions for the editorial backend because GitHub Pages is static hosting and cannot execute `/api/*.js` server functions.

Required GitHub Actions secret: `GEMINI_API_KEY`.

The existing Galaxy Fire Supabase backend is not required for the public editorial feed in this version. The feed is generated into `public/editorial-feed.json` and deployed with the site.

Run the **FOR THE CULTURE Editorial Radar** workflow manually once after the first push. It will then run every 6 hours automatically.
