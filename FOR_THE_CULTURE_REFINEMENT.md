# FOR THE CULTURE — Editorial Layout Refinement

This revision keeps the working editorial radar and makes the front-end editorial presentation intentionally less repetitive and more selective.

## Layout changes
- Reduced the section navigation to **HOME / STORIES / DISCOVER**.
- The hero owns the newest story; **LATEST STORIES never repeats the hero**.
- LATEST STORIES now shows up to three additional stories rather than four repeated/near-repeated cards.
- NEW MUSIC only uses music stories that are not already visible in the hero or latest-stories area, and is limited to two compact rows.
- CULTURE DESK only appears when a genuinely distinct culture/creative story exists; it no longer falls back to reusing an already-visible story merely to fill the panel.
- The right-hand THE IDEA panel carries brand/editorial meaning rather than another story.
- MORE FROM THE CULTURE only appears when additional unused stories actually exist.
- The section is intentionally allowed to become smaller when there is not enough distinct content instead of manufacturing filler.
- The latest-story grid is three columns on desktop so the available space is used cleanly without an empty fourth card.

## Editorial uniqueness
- A story is considered already used by source URL/id/headline before it is allowed into another FOR THE CULTURE module.
- The hero is explicitly included in the used-story set so it cannot leak into MUSIC, CULTURE DESK or MORE FROM THE CULTURE.
- This keeps the same headline/image from appearing in multiple panels on the same visit.

## Editorial sources
The radar includes:
- The NATIVE
- The NATIVE Music
- NotJustOk
- tooXclusive
- Naijaloaded
- PUNCH Entertainment
- PUNCH Interviews
- PUNCH Special Features
- PUNCH Videos
- The Guardian Nigeria

The engine continues to deduplicate by normalized source URL and similar headline before sending candidates to the editorial model.

## Source rotation
The source-balanced candidate selector now rotates its starting source every six-hour editorial window. This prevents the same publication from repeatedly occupying the first slots while preserving the existing one-batch Gemini generation and quota-safe workflow.
