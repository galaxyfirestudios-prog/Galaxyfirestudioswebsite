# Paystack Live Mode Check

## Current status

The Paystack integration is working, but the deployed payment flow has been reported as showing **Test** even though the actual Paystack merchant account is Live and can receive payments.

This is an environment-configuration check, not a reason to replace the working payment architecture.

## Required Vercel Production variables

- `PAYSTACK_PUBLIC_KEY` = the LIVE public key beginning with `pk_live_`
- `PAYSTACK_SECRET_KEY` = the LIVE secret key beginning with `sk_live_`

`PAYSTACK_SECRET_KEY` must remain server-side.

The site reads the public key through `/api/paystack-config`. That endpoint now also returns a safe `mode` field:

- `live` when the public key starts with `pk_live_`
- `test` when it starts with `pk_test_`
- `unknown` for an unrecognized key format

The endpoint never returns `PAYSTACK_SECRET_KEY`.

## Diagnostic

After deployment, open:

`https://www.galaxyfirestudios.com/api/paystack-config`

Do not post the returned key value anywhere. The important field is:

`mode: "live"`

If it says `test`, update the Vercel **Production** `PAYSTACK_PUBLIC_KEY` to the Live public key, redeploy, and check again.

Also verify the server-side `PAYSTACK_SECRET_KEY` is the Live secret key (`sk_live_...`). The public and secret keys must belong to the same Live Paystack environment.

Do not hard-code credentials into the project.
