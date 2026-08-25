# FOR THE CULTURE Editorial Scan — Cron-job.org

The editorial scanner is intentionally separate from Paystack. Paystack is only used for purchases.

## Cron-job.org job

- URL: `https://www.galaxyfirestudios.com/api/editorial-scan`
- Method: `GET`
- Schedule: every 15 minutes
- HTTP authentication: **OFF**
- Custom header: `X-Cron-Secret: <the exact value of Vercel CRON_SECRET>`

Cron-job.org supports arbitrary custom headers, so the scheduler does not need to use Basic HTTP authentication. Keep `CRON_SECRET` private.

The endpoint also accepts `Authorization: Bearer <CRON_SECRET>` for manual testing.

## Vercel

Keep `CRON_SECRET` configured for the **Production** environment. There is deliberately no `crons` block in `vercel.json`; Cron-job.org owns the 15-minute schedule.
