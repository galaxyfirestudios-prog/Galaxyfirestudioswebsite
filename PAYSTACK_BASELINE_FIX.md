# PAYSTACK / AVAILABILITY BASELINE FIX

This build uses the uploaded `GalaxyFireStudios-FOR-THE-CULTURE-RADIO-PAYSTACK-FIXED-FULLY-OPTIMIZED.zip`
as its sole baseline.

## Booking payment fix

The booking form previously treated any failure of `/api/check-availability` as a fatal error,
which prevented Paystack from opening. The availability RPC is optional scheduling infrastructure;
Paystack checkout must not be blocked by a temporary availability-service failure.

The frontend now:
- blocks only when the availability endpoint successfully reports the requested slot is unavailable;
- logs a warning and continues to Paystack when the availability service errors or is unavailable;
- retains server-side Paystack verification and amount/currency validation.

Paystack is still lazy-loaded only when checkout begins.

## Supabase availability

The existing `/api/check-availability` route still calls the existing
`check_booking_availability` RPC. If that RPC is restored/configured later, normal availability
blocking resumes automatically. No booking/payment architecture was replaced.

## Production environment

Required Paystack environment variables:
- `PAYSTACK_SECRET_KEY`
- `PAYSTACK_PUBLIC_KEY` (or `VITE_PAYSTACK_PUBLIC_KEY`)

The secret key remains server-side.
