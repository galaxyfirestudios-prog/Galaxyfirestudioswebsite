# FOR THE CULTURE RADIO — Automatic Music Workflow

## New workflow

From this build onward, the radio playlist is generated automatically during every production build.

1. Put new `.mp3` files directly in `public/radio/`.
2. Optionally put matching artwork in `public/radio/art/` using the same filename stem.
3. Commit and push with GitHub Desktop.
4. Vercel runs `npm run build`.
5. `scripts/generate-radio-playlist.mjs` scans the MP3 library and regenerates `public/radio-playlist.json`.
6. The deployed radio loads the generated playlist automatically.

You no longer need to manually edit `public/radio-playlist.json`.

## Metadata

The generator first preserves metadata already stored for existing tracks. For new files it reads common ID3 tags (artist, title, album, genre, year) when available.

If usable ID3 artist/title tags are absent, the generator falls back to the filename. A filename such as:

`artist-name - song-title.mp3`

becomes a reasonable artist/title pair.

Matching artwork is detected in `public/radio/art/`. Supported artwork extensions are `.jpg`, `.jpeg`, `.png`, and `.webp`. If no matching artwork exists, the station artwork is used.

## Validation and safety

The build fails rather than publishing a broken radio library when:

- no MP3 files exist;
- an MP3 is suspiciously small (under 1 KB);
- a filename is longer than 180 characters.

This prevents the filename/path problem that previously blocked Git commits.

The generator also removes playlist entries for MP3s that no longer exist, prevents duplicate source paths, and appends newly discovered tracks in a deterministic alphabetical order.

## Audio optimization

The build does **not** transcode or recompress music. That is intentional: Vercel builds stay fast and the original audio quality is preserved.

The browser radio player now:

- loads playlist data with a retry path;
- uses metadata-first audio preloading instead of aggressively preloading a large MP3;
- advances after an audio error;
- recovers from a stalled/waiting track after 15 seconds when the browser has not received enough future data;
- keeps the current track position when pausing and resuming.

## Recommended file practice

Use reasonably short, web-safe filenames. For example:

`artist-name - song-title.mp3`

Avoid extremely long filenames and unnecessary punctuation.

For the best automatic metadata results, make sure the MP3 contains ID3 artist/title tags.


## Adaptive radio loudness normalization

The browser radio player now includes **Auto Loudness** by default. It uses the Web Audio API to monitor the playing track's short-term RMS level, gradually adjusts playback gain toward a consistent target, and uses a gentle safety limiter to reduce audible jumps and prevent clipping. This is designed to make differently mastered songs feel much closer in loudness, similar in goal to consumer streaming loudness normalization.

The listener can switch **AUTO LOUDNESS ON/OFF** in the radio player. The user's normal volume control remains independent. The normalizer deliberately changes gain slowly and ignores near-silence so intros, pauses, and outros do not cause sudden pumping.

For an external live stream URL, the player keeps native HTML audio playback if Web Audio cannot be used safely (for example, missing cross-origin permissions), so the normalization feature cannot break the stream.
