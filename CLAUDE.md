@AGENTS.md

# mkparrish.com

Next.js 16 App Router site for MK Parrish — a growth-strategy consultancy plus a
digital storefront (ebooks, paperbacks, prints, bundles, memberships). Deployed
on Vercel. It is also the home of a set of Node build scripts that generate the
PDFs, EPUBs, covers, and social assets the store sells and markets.

Two things make this repo unusual, and both bite if you assume otherwise:

1. **Next 16 has breaking changes from what you likely know.** Read
   `node_modules/next/dist/docs/` before writing framework code (see `AGENTS.md`).
   Concretely, in this repo: `middleware.ts` is now **`proxy.ts`** exporting a
   `proxy()` function, and dynamic-route `params` is a **Promise** you must
   `await`.
2. **`app/lib/config.ts` is the product database.** Prices, Stripe links, slugs,
   copy, and bundle contents all live in that one file. Most "add a product" or
   "change a price" work is a config edit, not a page edit.

---

## Commands

```bash
npm run dev                 # next dev (Turbopack), http://localhost:3000
npm run build               # next build — the real check before pushing
npm run lint                # eslint (flat config, eslint-config-next)
npm start                   # serve a production build
```

There is **no test suite**. `npm run build` plus `npm run lint` is the whole
verification story — run both before pushing anything that touches `app/`.

**Lint baseline:** `npm run lint` currently exits non-zero with **7 errors and
19 warnings**, all pre-existing. Every error is `react-hooks/set-state-in-effect`
(or a companion memoization error) in `app/desk/*`. Don't treat a red lint run as
proof you broke something — compare against this baseline, and don't let your
change add new problems.

### Asset generation (occasional, not part of the build)

```bash
npm run social:all          # posts + carousels + MP4 reels → scripts/social/out/ (gitignored)
npm run linkedin:carousel   # LinkedIn carousel slides + PDF
npm run lead-magnet         # lead-magnet PDFs
npm run portfolio-pages     # portfolio HTML pages
npm run stripe:books        # create Stripe payment links (--write hits the live API)
```

Other one-off generators live in `scripts/` and run as `node scripts/<name>.mjs`
(covers, EPUBs, print interiors, KDP packages, TikTok videos, picture books).
They are plain ESM Node with Puppeteer/Playwright rendering HTML to PDF/PNG — the
browser is expected to already be installed; the Vercel build sets
`PUPPETEER_SKIP_DOWNLOAD` / `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD` so it never fetches one.

`sales/` is a separate zero-dependency Node CLI toolkit (`node sales/daily.mjs`,
`pipeline.mjs`, `quote.mjs`, `targets.mjs`, `earnings.mjs`) — unrelated to the
website. Its data lives in `sales/data/`, which is gitignored because it can
contain customer names. Keep it that way.

---

## Layout

```
app/                    Next.js App Router — every route is a directory
  lib/config.ts         ★ products, prices, Stripe links, services, contact, socials
  lib/shelf-catalog.ts  derives the browsable store catalog from config.ts
  lib/lead-magnets.ts   free-download offers used by /api/subscribe
  lib/quote-bank.ts     rotating pull-quotes for the site rails
  lib/testimonials.ts   client testimonials
  components/           shared UI (Nav, Footer, LeadCapture, ui.tsx primitives)
  api/subscribe/        lead capture → Resend email + Substack subscribe
  api/stripe-webhook/   checkout.session.completed → delivery + owner notification
  checkout/[slug]/      route handler: slug → Stripe Checkout (or static payment link)
  desk/                 private sales tool, noindex'd via robots.ts
  globals.css           Tailwind v4 theme + the whole design system
  sitemap.ts robots.ts manifest.ts
proxy.ts                Next 16 proxy (was middleware) — host-based rewrite
next.config.ts          security headers, /ipx rewrite, legacy redirects
public/                 static assets, PDFs/EPUBs under downloads/, standalone ipx.html
scripts/                asset generators (ESM Node + Puppeteer/Playwright)
sales/                  standalone sales CLI toolkit
products/               markdown source-of-truth for the catalog copy
content/                Substack, LinkedIn, and social post drafts
marketing/ ebooks/ output/   generated + working marketing artifacts
docs/store-operations.md     runbook: how a sale works, Stripe setup, Lulu fulfillment
.claude/brand-voice-guidelines.md   voice rules for any customer-facing copy
.codex/                 decision/principle knowledge base rendered by /ideals
AUDIT.md                standing conversion audit of the site
```

---

## How the store works

`app/lib/config.ts` exports three product arrays — `EBOOKS`, `SERVICE_EBOOKS`,
`KIDS_BOOKS` — merged into `SHOP_PRODUCTS`. Helpers on the same file
(`getShopProduct`, `productCheckoutHref`, `productDeliveryLinks`,
`isFreeProduct`, `productCover`) are the intended access path; pages should not
re-derive that logic.

Checkout takes one of two paths, and which one depends on the product entry:

- **Static Stripe payment link** — the product has a `stripe:` field pointing at
  `buy.stripe.com/...`. `app/checkout/[slug]/route.ts` just redirects to it.
- **Dynamic Stripe Checkout** — no `stripe:` field, `href: "/checkout/<slug>"`.
  The route handler builds a Checkout Session from the product's `price` string
  (parsed to cents), collecting shipping for `?format=paperback`. If the Stripe
  key is missing, or the key isn't live in production, it falls back to a
  `mailto:` checkout request rather than failing visibly.

`app/api/stripe-webhook/route.ts` maps Stripe payment-link IDs (`plink_...`) back
to slugs so the delivery email knows which files to send. **A new static payment
link must be added to those maps** (`EBOOK_LINKS`, `PAPERBACK_LINKS`,
`PRINT_LINKS`) or the buyer gets a generic notification.

Free products set `free: true` and a `download:` path; `/checkout/<slug>`
redirects straight to the file. Delivery links assume a PDF at `download:` with a
sibling `.epub` — bundles ship as a single `.zip`.

`docs/store-operations.md` is the human-facing runbook (Stripe webhook setup,
Lulu paperback specs per title). Update it when fulfillment mechanics change.

### Adding or changing a product

1. Add the entry to the right array in `app/lib/config.ts` (slug, title,
   subtitle, price, tag, features, desc, `download`, `href`).
2. Put the deliverable under `public/downloads/…` and a cover at
   `/downloads/covers/<slug>-cover.jpg` (or set `cover:` explicitly; see
   `COVER_SLUG_OVERRIDES` in `shelf-catalog.ts` when the filename differs).
3. If it uses a static payment link, register the `plink_` ID in the webhook maps.
4. Add the route to `app/sitemap.ts` if it needs its own indexed page.
5. Not launched yet? Add the slug to `COMING_SOON_SLUGS` instead of shipping a
   dead buy button.

---

## Conventions

**Routing.** One directory per route under `app/`. Pages are Server Components by
default; only 16 files carry `"use client"` — keep it that way and push
interactivity into a small client component rather than converting a page.
Dynamic routes take `params: Promise<{ slug: string }>` and `await` it, in both
`generateMetadata` and the component. Retired routes stay alive: `app/shelf/`
redirects to `/shop` in the page, and `next.config.ts` handles `/theshelf/*` and
`/booking`. Don't delete old paths — redirect them.

**Imports.** Absolute via the `@/*` path alias (`@/app/lib/config`,
`@/app/components/Nav`). No relative `../../` climbing.

**Styling.** Tailwind v4 (`@import "tailwindcss"` in `app/globals.css`, no
tailwind.config file — the palette is an `@theme inline` block). Use the named
brand tokens — `void`, `obsidian`, `carbon`, `graphite`, `iron`, `ash`, `smoke`,
`pearl`, `blush`, `petal`, `rose`, `carmine`, `lipstick` — and the font families
`font-display` (Bebas Neue), `font-serif` (Playfair Display), `font-body` (DM
Sans), `font-mono` (JetBrains Mono). Fonts load via `<link>` in `layout.tsx`, not
`next/font`. The global reset forces `border-radius: 0` on everything; anything
round has to override it deliberately (see the AuthorGlow block). Reach for the
shared primitives in `app/components/ui.tsx` (`RevealSection`, `Marquee`,
`QuoteDivider`, `useReveal`) before writing new section scaffolding.

**Metadata.** Every page exports its own `metadata` (or `generateMetadata`). The
root layout sets the `%s — MK Parrish` title template, `metadataBase`, and the
OG/Twitter defaults.

**Security headers.** The CSP in `next.config.ts` is an explicit allowlist. Any
new third-party script, frame, font, or fetch target must be added to the right
directive there or it will be blocked in production.

**Comments.** The codebase comments *why*, not *what* — usually a short block
explaining a non-obvious product or platform decision (why `/ipx` is a raw HTML
file, why `npm ci` and not `npm install`, why a legacy alias still exists). Match
that register: explain the constraint, skip the narration.

**Copy.** Customer-facing text follows `.claude/brand-voice-guidelines.md`:
declarative, economical, specific, no hedging, no filler, claims backed by
numbers. Write punctuation as real characters in JSX text — a `—`-style
escape is not parsed in a JSX text node and renders on screen literally (a bug
`AUDIT.md` caught on the home page).

---

## Environment variables

Set in Vercel, never committed (`.env*` is gitignored):

| Variable | Used by | Effect if missing |
| --- | --- | --- |
| `STRIPE_SECRET_KEY` (or `STRIPE_API_KEY`) | `/checkout/[slug]` | falls back to a `mailto:` checkout request |
| `STRIPE_WEBHOOK_SECRET` | `/api/stripe-webhook` | purchase/delivery emails don't fire |
| `RESEND_API_KEY` | `/api/subscribe`, webhook | lead email skipped, direct download link returned |
| `LEAD_FROM_EMAIL`, `LEAD_NOTIFY_EMAIL` | both routes | defaults in code |
| `NEXT_PUBLIC_SITE_URL` | both routes | defaults to `https://www.mkparrish.com` |
| `NEXT_PUBLIC_GOOGLE_BOOKING_URL` | `CustomBooking` | renders the in-house booking form instead of the Google embed |

Both API routes are `runtime = "nodejs"` and `dynamic = "force-dynamic"`. The
subscribe route already implements origin checks, a honeypot field, body-size
limits, per-IP rate limiting, and duplicate suppression — extend that pattern
rather than adding an unguarded endpoint.

---

## Working in a web session

`.claude/hooks/session-start.sh` runs on session start in the remote
environment: `npm ci` (falling back to `npm install` only when the lockfile is
out of sync — plain `npm install` was rewriting `package-lock.json` and dirtying
the tree), then a best-effort Substack MCP setup. Dependencies are already
installed by the time you start; don't reinstall.

Commit messages in this repo are short imperative sentences describing the
outcome, sentence case, no prefix tags — e.g. *"Fix Save PDF silent failure and
add a vertical revenue strategy"*, *"Publish the IPX case study at /ipx and ship
the one-pager as a PDF"*. PR numbers get appended by the merge, not by you.
