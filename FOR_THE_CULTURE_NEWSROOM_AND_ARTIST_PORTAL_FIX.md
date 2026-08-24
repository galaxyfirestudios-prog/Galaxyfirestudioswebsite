# FOR THE CULTURE — Newsroom + Artist Portal Surgical Fix

Baseline: `GalaxyFireStudios-FOR-THE-CULTURE-RADIO-FINAL-FAST-ARTIST-PORTAL-NONREPETITIVE-NEW-MUSIC.zip`

## Fixes

1. **Newsroom / editorial generation**
   - Kept the existing RSS → Gemini → `public/editorial-feed.json` architecture.
   - Removed the deprecated `temperature` generation parameter from the Gemini request. Gemini 3.5 Flash-Lite is a current stable model, and current Gemini guidance marks the older sampling parameters as deprecated.
   - No search engine or editorial feed architecture was replaced.
   - The static GitHub Pages feed remains the canonical public feed for the deployed static site.

2. **Artist submission portal sizing**
   - The large submission form is now collapsed by default.
   - FOR THE CULTURE shows a compact submission invitation and a `SUBMIT YOUR MUSIC` button.
   - The full form opens only when the artist requests it.
   - This substantially reduces the vertical footprint of the editorial page while retaining every submission field and the existing email destination.

3. **No-repeat New Music behavior preserved**
   - New Music still excludes the hero and latest-story items.
   - It does not fall back to an already-displayed story merely to fill space.
   - If no distinct music story exists, the section remains empty.

4. **Desktop navigation preserved as previously requested**
   - HOME / STORIES / DISCOVER remain hidden on desktop.
   - Mobile section navigation remains available.

## Deployment note

The GitHub Actions editorial workflow still requires the existing `GEMINI_API_KEY` secret. The artist portal continues to use the existing Resend configuration and sends submissions to `fortheculture184@gmail.com`.
