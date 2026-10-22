# Nature's Value website rebuild

Standalone Next.js 16 site for Nature's Value, Inc., a contract manufacturer of
dietary supplements. It is a separate app from mkparrish-site and is excluded
from that project's TypeScript and ESLint runs.

## Run locally

```bash
cd clients/naturesvalue
npm install
npm run dev
```

## Pages

`/` home, `/capabilities`, `/quality`, `/about`, `/contact` (quote request form),
plus `sitemap.xml` and `robots.txt`.

## Editing content

All copy and company facts live in `app/content/site.ts`.

- `// VERIFY` facts came from public listings (LinkedIn, Thomasnet, NSF, local
  news) and must be confirmed with the client before launch.
- `// PLACEHOLDER` values (phone, sales email) are blank until supplied; the
  site hides them while empty.
- The logo in `app/components/Logo.tsx` is a placeholder wordmark.

## Quote form

Submissions are POSTed as JSON to `QUOTE_WEBHOOK_URL` (Zapier/Make hook, CRM
intake endpoint or email relay). In development without it, requests are logged
to the console. In production without it, the form shows an error rather than
silently dropping leads, so set it before launch.

## Deploy on Vercel

Create a new Vercel project from this repo with **Root Directory** set to
`clients/naturesvalue`, add `QUOTE_WEBHOOK_URL`, then attach the
`naturesvalue.com` domain.
