# Galaxy Fire Studios — Automatic Beat Store Workflow

## Adding a new beat

1. Drop the finished MP3 into `public/beats/`.
2. Optional: use a filename such as `beat_7_title_120_c_minor.mp3` so the build can infer BPM/key/mode when embedded metadata is not available.
3. Commit and push with GitHub Desktop.
4. Vercel runs the build and automatically regenerates `public/beats/beat-catalog.json`.
5. The Beat Store loads the generated catalogue and the new beat becomes available for preview/purchase.

## Metadata

The generator preserves the six existing beats' approved titles, keys, BPMs, moods and genres. For new files, it uses filename information where it can and safe defaults otherwise. If you want a new beat to have a polished title/mood/genre, add its filename to `scripts/beat-catalog-metadata.mjs` before deployment.

## Validation

The build rejects missing/empty beat libraries, suspiciously tiny MP3s and excessively long filenames. It also guarantees unique generated beat IDs.

The existing Paystack checkout and Supabase exclusive-sale system remain unchanged.
