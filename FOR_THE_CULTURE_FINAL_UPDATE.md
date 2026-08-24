# FOR THE CULTURE — Final Surgical Update & Performance Pass

Baseline: the latest working `GalaxyFireStudios-FOR-THE-CULTURE-RADIO-OPTIMIZED-PERFORMANCE.zip` supplied by the user.

## Changes made

1. **NEW MUSIC**
   - Kept the existing editorial feed/search architecture.
   - Fixed the New Music panel so music stories are classified from category/headline/dek and can still populate the panel when the newest music story is also used by the hero/latest module.
   - Changed the panel label to reflect that it is the Culture Radar's music feed rather than promising that every item is unique.

2. **Desktop FOR THE CULTURE navigation**
   - Hidden HOME / STORIES / DISCOVER navigation on desktop so the desktop experience is a continuous scroll.
   - Mobile section navigation remains available.

3. **Artist Music Submission Portal**
   - Added a native FOR THE CULTURE artist submission portal.
   - Artists can request RADIO consideration, BLOG/EDITORIAL consideration, or BOTH.
   - Captures artist name, email, phone, country, city, genre, song title, release date, links, bio and song description.
   - Supports a direct audio upload up to 2 MB and artwork up to 700 KB; larger/full-quality songs can be supplied through a streaming/download link.
   - Submissions are emailed to **fortheculture184@gmail.com** through the existing Resend configuration.
   - Submissions remain manually reviewed; nothing is automatically published or added to radio.

4. **Performance**
   - Editorial static feed and live API are requested concurrently instead of making multiple duplicate static requests sequentially.
   - Editorial feed uses normal browser/CDN caching rather than a timestamp cache-buster and `no-store`.
   - Existing lazy-loading/content-visibility behavior was preserved.
   - No radio library is preloaded by this change.
   - No existing payment, booking, beat store, radio or editorial backend was replaced.

## Deployment requirement

The artist portal requires the existing Vercel environment variables:
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`

No new secret is required. The destination address is intentionally fixed to `fortheculture184@gmail.com`.

## Validation

- Source and API files were inspected directly from the supplied ZIP.
- No production dependency was added.
- A full Vite production build could not be run in this sandbox because dependencies are not installed in the supplied project and network package installation is unavailable here. The source changes were kept dependency-free.
