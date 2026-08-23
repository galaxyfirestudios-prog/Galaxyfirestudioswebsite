# FOR THE CULTURE — Compact Editorial Hub Update

This update is built from the supplied last-working deployment baseline.

## Design change

The FOR THE CULTURE homepage has been simplified so the platform communicates the same editorial purpose with fewer repeated panels.

### Preserved
- Existing editorial feed and story reader.
- Live/static feed fallback behavior.
- Existing story image handling and source attribution.
- Existing Galaxy Fire site, beat store, payments, booking, visuals and radio infrastructure.
- Existing internal story reader behavior.

### Simplified
- The FOR THE CULTURE section navigation is now: HOME / STORIES / MUSIC / CULTURE / DISCOVER.
- RADIO remains available as a direct OPEN RADIO action instead of occupying a permanent navigation tab.
- Latest Stories and the radio connection now live in one editorial hub.
- New Music and Culture are combined into one Culture Desk.
- Video, Events and Artists/Creators are combined into one Discover hub.
- The previous separate radio promo and repeated Culture/Latest/Video/Event/Artist panel treatment has been removed.
- The manifesto remains as a compact closing statement rather than another content-heavy panel.

## Editorial principle

No placeholder section was added merely to fill space. Where the feed can supply distinct information, it is shown. Where it cannot, the existing honest empty-state behavior remains.

## Verification

The updated `src/App.tsx` was transpiled with TypeScript's TSX parser successfully. A full Vite production build could not be run in the isolated working container because the Vite package was not available locally and package installation could not complete within the environment.
