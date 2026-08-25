# FOR THE CULTURE Editorial Scan — Cron-job.org

The editorial scanner is already coded into the website. The external cron-job.org job still needs to be created after this build is deployed.

## Cron-job.org job

- Job name: `Galaxy Fire Studios Editorial Scan`
- URL: `https://www.galaxyfirestudios.com/api/editorial-scan`
- Method: `GET`
- Schedule: every 15 minutes
- Cron expression (if requested): `*/15 * * * *`
- Timezone: `Africa/Lagos`
- Authentication mode: use a custom HTTP header, not Basic HTTP authentication
- Header name: `X-Cron-Secret`
- Header value: the exact Production `CRON_SECRET` stored in Vercel

The endpoint also accepts `Authorization: Bearer <CRON_SECRET>` for manual testing.

## Vercel

Keep `CRON_SECRET` configured for the **Production** environment. Do not put the secret in `vercel.json`, source code, the URL, or the public frontend.

There is deliberately no `crons` block in `vercel.json`; cron-job.org owns the 15-minute schedule.

## First test after deployment

Run the endpoint manually with the exact Production secret:

`curl.exe -i -H "X-Cron-Secret: YOUR_ACTUAL_PRODUCTION_SECRET" https://www.galaxyfirestudios.com/api/editorial-scan`

Do not paste the real secret into chat.

Expected result: HTTP 200 with the editorial scan JSON. HTTP 401 means the supplied secret does not exactly match the Production `CRON_SECRET`.
