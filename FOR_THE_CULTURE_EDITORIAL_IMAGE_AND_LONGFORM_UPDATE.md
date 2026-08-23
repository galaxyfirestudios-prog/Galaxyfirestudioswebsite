# FOR THE CULTURE — Editorial Images + Longer Story Update

This update is built directly on the INTERNAL READER MULTI-STORY version supplied as the last working baseline.

## What is preserved

- Existing Galaxy Fire Studios website structure and sections.
- FOR THE CULTURE tabs and internal story reader.
- GitHub Pages deployment architecture.
- GitHub Actions editorial radar.
- Gemini editorial-generation layer.
- Multiple editorial sources and duplicate protection.
- Automatic publication schedule.
- Existing beat store, booking, payments, visuals, radio UI and other site functionality.

## Editorial images

The editorial engine now tries image sources in this order:

1. Image supplied by the source RSS/Atom feed.
2. The article page's `og:image` metadata.
3. The article page's Twitter image metadata.

Image discovery is optional. If an image cannot be found, the story still publishes; image lookup failure cannot stop the editorial story from being generated.

The public website uses the editorial image supplied in the feed and includes a branded visual fallback if an external image fails to load in the visitor's browser.

## Longer original stories

Gemini is now asked for:

- A factual original headline.
- A one-sentence dek.
- 4–6 short paragraphs.
- Approximately 300–450 words.
- Clear source attribution where appropriate.
- No copied wording or invented facts.

Gemini output capacity was increased to support the longer editorial format.

## Multi-story behavior

The scan can now publish up to 4 new stories per run by default. Candidate selection is source-balanced so the engine does not unnecessarily fill a scan with stories from only one publication when relevant candidates exist elsewhere.

The workflow still runs every 15 minutes, on pushes to `main`, and manually through GitHub Actions.

## Reliability protection

- Gemini transient 429/5xx/network/timeout failures are retried.
- Image lookup failures are non-fatal.
- Existing published stories remain in `public/editorial-feed.json` when a scan finds no new stories.
- The GitHub feed commit step keeps the existing non-fast-forward synchronization protection.

## Important credential rule

`GEMINI_API_KEY` remains a GitHub Actions repository secret. It is never placed in the public website bundle, `public/`, the ZIP archive, or source code.
