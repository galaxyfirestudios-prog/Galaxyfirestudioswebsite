# FOR THE CULTURE — Non-Repetitive Layout, Navigation & Deployment Fix

## Baseline
Built from the previously corrected FOR THE CULTURE compact editorial hub baseline, preserving the working editorial deployment architecture.

## Changes
- Removed the redundant **RADIO** and **BLOG** links from the site's main navigation.
- Kept radio/blog destination sections in the code so the upcoming live radio implementation can be added without reconstructing the site.
- Reduced FOR THE CULTURE internal navigation to **HOME / STORIES / DISCOVER**.
- Removed the internal OPEN RADIO control from the editorial navigation to keep the section focused.
- Prevented the hero story from being repeated in Latest Stories or later editorial modules.
- Reduced Latest Stories to three additional stories beneath the hero.
- Limited New Music to two distinct stories.
- Suppressed the Culture Desk panel when there is no genuinely distinct story available rather than repeating an existing story.
- Kept the editorial source rotation for **The NATIVE, The NATIVE Music, NotJustOk, tooXclusive, Naijaloaded, PUNCH** and other configured sources.
- Restored the editorial workflow's **direct GitHub Pages build and deployment**. This is important because a GitHub Actions commit made with `GITHUB_TOKEN` should not be relied on to trigger a separate push-based deployment workflow.
- The editorial radar therefore scans, updates the static feed, builds the site, and deploys the resulting feed in the same workflow.

## Validation
- `node --check api/editorial-feed.js` passed.
- `node --check scripts/editorial-radar.mjs` passed.
- Main navigation contains no top-level RADIO or BLOG links.
- The archive preserves the working beat-store, studio, services, visuals, booking, shop and editorial assets.

A full Vite build was not run in this environment because the project dependencies are not installed locally and this environment cannot be relied upon for npm registry access.
