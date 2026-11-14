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

- `/` home
- `/capabilities` plus a page per dosage form (`/capabilities/capsules`, ...)
- `/services` plus a page per service (`/services/private-label`, ...)
- `/industries` plus a page per audience (`/industries/emerging-brands`, ...)
- `/quality`, `/about`, `/process`, `/faq`, `/contact`
- `/start`: a four-step product builder that prefills the quote form
- `sitemap.xml`, `robots.txt`, Organization and FAQ structured data

Detail pages are generated from the lists in `app/content/site.ts`, so adding an
entry there adds its page, nav link, footer link, search entry and sitemap URL.

## Interactive features

- Dropdown menus on desktop, an accordion menu on mobile, header that shrinks on scroll
- Quote popup on every "Request a quote" button, prefilled from where it was opened
- Site search popup: Ctrl/Cmd+K, `/`, or the header search button
- "Quick look" popups on the home page dosage-form cards
- Lead popup offering a free formula review: after 30 seconds or on exit intent
  (desktop), once per visitor every 14 days, never on `/contact` or `/start`
- Tabs, animated counters, scroll-in animations, searchable FAQ, back-to-top button
- All popups use native `<dialog>` (focus trap, Esc to close), and every
  animation is off for visitors who set reduced motion

## Editing content

All copy and company facts live in `app/content/site.ts`.

- `// VERIFY` facts came from public listings (LinkedIn, Thomasnet, NSF, local
  news) and must be confirmed with the client before launch.
- `// PLACEHOLDER` values (phone, sales email) are blank until supplied; the
  site hides them while empty.
- The logo in `app/components/Logo.tsx` is a placeholder wordmark.
- Brand colors are placeholders too: swap the values in the `@theme` block at
  the top of `app/globals.css` for the client's official palette.
- The announcement bar text in `app/components/Header.tsx` is marked VERIFY.

## Quote form

Submissions are POSTed as JSON to `QUOTE_WEBHOOK_URL` (Zapier/Make hook, CRM
intake endpoint or email relay). In development without it, requests are logged
to the console. In production without it, the form shows an error rather than
silently dropping leads, so set it before launch.

## Deploy on Vercel

Create a new Vercel project from this repo with **Root Directory** set to
`clients/naturesvalue`, add `QUOTE_WEBHOOK_URL`, then attach the
`naturesvalue.com` domain.

## Client preview

Set `SITE_PREVIEW=1` on a review deployment. It blocks search engines
(`robots.txt` and `noindex`), shows a "Preview for review" banner, and tells
anyone using the quote form that it isn't connected yet. Leave it unset for the
real launch.
