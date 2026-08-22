# FOR THE CULTURE Editorial Reader + Multi-Story Update

## What changed

This update preserves the existing FOR THE CULTURE editorial engine and adds two fixes:

1. **Internal FOR THE CULTURE story reader**
   - Clicking a story no longer sends the reader directly to the source publication.
   - The generated headline, dek, body, image, category, source and date now open inside a full-screen FOR THE CULTURE editorial reader panel.
   - The original source remains available as a separate **READ THE ORIGINAL SOURCE ↗** link, which opens in a new tab.
   - The reader can be closed with the X button, by clicking the backdrop, or by pressing Escape.
   - The same reader behavior is used by the hero, latest stories, radio, new music, culture, video, events and artist story cards.

2. **More reliable multi-story publication**
   - The radar still targets up to 3 new stories per scan.
   - It now considers up to 12 new candidates per scan instead of stopping after only 6 candidates.
   - Gemini generation retries transient 429/5xx/network/timeout failures once before marking a candidate as failed.
   - The GitHub workflow remains on the working non-fast-forward synchronization fix.

## Publishing behavior

The workflow continues to run on its existing schedule and manual workflow trigger. Existing `GEMINI_API_KEY` configuration is unchanged.

No existing Galaxy Fire Studio sections, beat store, radio UI, visual gallery, payments or other site functionality were intentionally removed.
