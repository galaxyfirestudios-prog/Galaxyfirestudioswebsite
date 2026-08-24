# Galaxy Fire Studios — Paystack & Performance Final Audit

Baseline: `GalaxyFireStudios-FOR-THE-CULTURE-RADIO-FINAL-SMOOTH-PERFORMANCE.zip`

## Paystack fixes

1. Fixed the studio booking verification response mismatch.
   - The frontend was checking `result.verified`.
   - The booking API was returning only `success: true`.
   - The API now returns both `verified: true` and `success: true`.

2. Added authoritative server-side booking price verification.
   - Service prices are defined on the server.
   - Deposit/full-payment amount is calculated on the server.
   - Paystack currency must be NGN.
   - Paystack amount must exactly match the server-calculated amount.
   - The browser's `expectedAmount` is treated only as a consistency check.

3. Prevented duplicate booking creation when the same Paystack reference is received again.

4. Added Paystack error callbacks to booking, equipment store, and beat checkout.

5. Removed the hard-coded Paystack test-key fallback from the frontend.

6. Added a runtime `/api/paystack-config` endpoint as a fallback when a build-time `VITE_PAYSTACK_PUBLIC_KEY` is unavailable.
   - It reads `PAYSTACK_PUBLIC_KEY` first, then `VITE_PAYSTACK_PUBLIC_KEY` from the server environment.

7. Added Paystack currency verification to equipment-store and beat verification routes.

8. Added booking amount validation to the Paystack webhook as a second server-side protection layer.

9. Paystack InlineJS is now loaded only when a customer actually starts checkout.
   - It is no longer downloaded on the initial page load.
   - The loader is shared so multiple checkout flows cannot inject duplicate Paystack scripts.

## Performance fixes

- Paystack is deferred until checkout.
- Beat availability is deferred until the Beat Store approaches the viewport.
- Existing image lazy-loading and async decoding are preserved.
- Existing production Vite minification/sourcemap settings are preserved.
- Existing radio `preload="none"` behavior is preserved so the radio library does not download on initial page load.
- Existing caching rules remain intact.
- No redesign of the working site was performed.

## Validation performed

- Node syntax checks passed for all Paystack/API JavaScript files.
- No hard-coded previous Paystack test key remains in the application source.
- Paystack CDN loading is now demand-driven.
- Booking frontend/API response contract is aligned.
- Server-side booking amount calculation is aligned with the site's displayed prices.

## Deployment requirements

Set these Vercel environment variables:

- `PAYSTACK_SECRET_KEY` — Paystack secret key; server-only.
- `VITE_PAYSTACK_PUBLIC_KEY` — Paystack public key; exposed in the frontend build.

Optional runtime fallback:

- `PAYSTACK_PUBLIC_KEY` — Paystack public key available to `/api/paystack-config`.

Also keep the existing Supabase and Resend variables required by the booking/order notification system.

## Important limitation

A full Vite production build could not be executed in this environment because dependency installation timed out. The source and server JavaScript were syntax-checked, and the payment/API contracts were inspected directly. The final deployment should still run `npm ci` and `npm run build` in GitHub/Vercel as the authoritative production build step.
