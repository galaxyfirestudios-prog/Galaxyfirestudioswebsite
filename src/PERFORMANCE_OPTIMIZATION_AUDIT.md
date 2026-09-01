# Galaxy Fire Studios — Performance Optimization Pass

Date: 2026-08-24

## Goal
Optimize the existing Galaxy Fire Studios / FOR THE CULTURE site for fast first load and smooth scrolling on desktop and mobile without redesigning or removing working features.

## Changes made

1. **Removed unused high-resolution image duplicates**
   - The app imports the WebP versions of the studio and photography assets.
   - Unused original JPG/PNG source copies were removed from the deployed project.
   - Unused large `image_28.jpeg` and `image_29.jpeg` files were removed.
   - Duplicate `public/imports` copies were removed.
   - The 29 photography images already used by the UI remain as optimized WebP assets.

2. **Improved font loading**
   - Google Fonts were moved from CSS `@import` to `<link>` tags in `index.html`.
   - Added `preconnect` for Google Fonts origins so the browser can establish connections earlier.

3. **Reduced first-paint rendering work**
   - Added `content-visibility: auto` to large below-the-fold sections.
   - Added intrinsic size hints to avoid unnecessary layout work while those sections are deferred.
   - Existing hero priority and lazy image loading were preserved.

4. **Improved static asset caching on Vercel**
   - Immutable Vite assets receive one-year browser/CDN caching.
   - Images receive long-lived caching with stale-while-revalidate.
   - Radio MP3s receive long-lived caching.
   - Editorial feed receives a short cache window with stale-while-revalidate so publishing remains responsive.

5. **Reduced unnecessary radio metadata requests**
   - `radio-config.json` and `radio-playlist.json` are now cacheable instead of being forced through a timestamped cache-busting request on every page load.
   - Radio audio remains `preload="none"`, so the full radio library is not downloaded during initial page load.

6. **Preserved existing media behavior**
   - Hero image remains high priority.
   - Below-fold studio, gallery, promotional, store and editorial images remain lazy-loaded.
   - Editorial reader hero image remains eager only when a story is actually opened.
   - Beat previews remain lazy/on-demand through the existing audio player.

## What was deliberately NOT changed

- FOR THE CULTURE editorial architecture
- Search engine
- Gemini editorial pipeline
- Supabase integration
- Radio playlist/audio content
- Beat store
- Paystack/payment routes
- Booking system
- Existing visual design
- Existing navigation
- Existing image composition/cropping

## Validation

- `vercel.json` parses successfully.
- `public/editorial-feed.json` parses successfully.
- Radio config/playlist paths remain present.
- Existing optimized WebP photography assets remain present.

A complete production Vite build could not be executed in the sandbox because the dependency installation did not complete within the available execution window. No application architecture was changed in a way that depends on a new package.

## Expected result

The most important improvement is not the raw repository size; it is the **initial browser workload**. The site already uses compact WebP images for the active visual assets and lazy loading for below-fold media. The optimization pass further reduces duplicate deployment files, defers rendering of large sections, improves CDN/browser caching, and prevents the radio library from being fetched on initial page load.
