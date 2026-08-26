# FOR THE CULTURE — Single Destination Update

## Baseline
This update is based on the uploaded working Galaxy Fire Studios ZIP:
`GalaxyFireStudios-FOR-THE-CULTURE-AUTO-RADIO-BEAT-STORE-LOUDNESS-CRON-PAYSTACK-LIVE.zip`

## Change made
FOR THE CULTURE and FOR THE CULTURE LIVE RADIO are now treated as one public destination.

- The main Galaxy Fire Studios navigation keeps a single **FOR THE CULTURE** link.
- The separate **RADIO** navigation item was removed.
- Clicking **FOR THE CULTURE**:
  - closes the mobile menu;
  - canonicalizes the URL to `#culture`;
  - scrolls directly to the FOR THE CULTURE platform;
  - opens the radio player;
  - makes a user-gesture playback request so supported mobile browsers can start audio.
- The footer now uses the same single FOR THE CULTURE destination.
- Existing `#radio` deep links are kept compatible and redirected to the canonical `#culture` destination.
- Direct page loads with `#culture` or legacy `#radio` still land on FOR THE CULTURE and open the player.

## Important mobile-browser behavior
A direct URL opened from another app/browser cannot legally carry a user's audio gesture into the new page. Mobile browsers may therefore block audible autoplay on a fresh page load. The FOR THE CULTURE navigation click itself is a user gesture, so the new navigation path explicitly attempts playback from that gesture.

## Intentionally preserved
No changes were made to the existing radio playlist, loudness-normalization engine, Paystack logic, beat store, editorial feed, cron/API code, or other Galaxy Fire Studios sections.
