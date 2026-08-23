# FOR THE CULTURE — Batch Editorial / Quota-Safe Update

## What this version does

- Collects multiple fresh candidates from the existing editorial sources.
- Selects up to 4 candidates per scan using source-balanced selection.
- Sends the selected candidates to Gemini in **one structured-output request**.
- Expects a `stories` array with `source_index` on every generated story.
- Publishes every valid returned story independently.
- Preserves already-published stories if Gemini is unavailable or quota-limited.
- Does not retry Gemini 429 quota errors.
- Image lookup is non-fatal and continues through RSS image, `og:image`, and Twitter image metadata.
- The optional API scanner uses the same batch-generation strategy rather than a hidden one-story-per-request loop.

## Model

The default workflow model is `gemini-3.5-flash-lite`, a current GA Flash-Lite model intended for cost-efficient/high-volume work. The GitHub workflow explicitly sets this model so an older default cannot silently override it.

`GEMINI_API_KEY` remains a GitHub Actions secret and is never bundled into the public website.

## Scheduling

The editorial workflow is scheduled every 6 hours and can also be started manually. It is not triggered by ordinary website code pushes.

## Expected manual-run output

A successful run with four suitable candidates should report approximately:

- `published: 4`
- `selectedForGemini: 4`
- `geminiRequests: 1`
- `generationMode: single-batch`

Fewer than four stories is valid if fewer candidates are new/suitable or Gemini returns fewer valid stories. A 429 should produce `published: 0` for that run rather than pretending a story was generated.
