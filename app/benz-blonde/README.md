# The Benz Blonde — microsite

A self-contained brand at `/benz-blonde`. It shares the main site's Tailwind
theme (same colors, same four fonts, loaded once in the root layout) and nothing
else: its own nav, footer, signup popup, sticky mobile bar, metadata, and lead
pipeline.

## How the separation works

`app/components/SiteChrome.tsx` lists `/benz-blonde` in `BARE_ROUTES`, so the
main site's `Nav`, `Footer`, `LeadCapture`, `MonetizationDrawer`, and
`SiteQuoteRail` do not render here. Two navs would fight; two lead popups would
both fire on the same visitor.

`app/benz-blonde/layout.tsx` then supplies the microsite's own chrome and sets
`title: { absolute: ... }` so pages are not suffixed with "— MK Parrish".

## Files

| File | What it is |
|---|---|
| `data.ts` | **Everything you will want to edit.** Handles, hours, phone, the model lineup, FAQ, reviews, referral copy, content series. |
| `layout.tsx` | Chrome, metadata, JSON-LD (`Person` + `AutoDealer`) |
| `parts.tsx` | Section, headings, cards, accordion — microsite-local, tighter rhythm than the main site's `ui.tsx` |
| `LeadForm.tsx` | One form, seven intents. Pages pass the fields that matter for that conversation. |
| `BenzPopup.tsx` | The signup popup and the 9-question list it delivers |
| `BenzNav.tsx` / `BenzFooter.tsx` / `StickyCTA.tsx` | Chrome |
| `page.tsx` + `shop/` `trade/` `lease-end/` `watch/` `reviews/` `book/` | The seven pages |

## Where leads go

Every form posts to `app/api/benz-lead/route.ts`, which:

1. emails **you** at `BENZ_NOTIFY_EMAIL` (falls back to `LEAD_NOTIFY_EMAIL`,
   then `mkp414@icloud.com`) with the lead, tap-to-call buttons, and the page it
   came from;
2. emails **the customer** a short confirmation with your text number;
3. rejects honeypot hits, rate-limits by IP, and de-dupes the same person
   submitting the same intent twice in ten minutes.

It uses the same `RESEND_API_KEY` the existing `/api/subscribe` route uses. With
no key set, forms still succeed and the lead is logged — nothing errors in front
of a customer, but **nothing reaches your inbox either**, so confirm the key is
set in the Vercel project before pointing traffic here.

`source` tags tell you which page produced the lead: `benz-trade`, `benz-book`,
`benz-lease-end`, `benz-shop`, `benz-referral`, `benz-home`,
`benz-watch-question`, `popup:/benz-blonde/...`.

## Before launch — one thing only you can do

**Reviews.** `REVIEWS` in `data.ts` is intentionally empty — no invented
customers. Until you paste real ones in, the Reviews page renders the
standards-and-referral layout instead. Add entries and the review wall replaces
it automatically.

### Already wired up

- **Contact.** `BENZ` in `data.ts` carries the work line (631.366.6417) as the
  primary — it takes the texts, same as `/test-drive` — with the cell as a
  secondary and `mparrish@mbofsmithtown.com` as the email. Change them in one
  place and every tap-to-text link, confirmation email, and the JSON-LD follow.
- **Social.** `SOCIAL` points Instagram and TikTok at `@mk_parrish`, the same
  accounts `/links` links to. YouTube and LinkedIn are staged with
  `live: false`, so they are hidden from the nav, footer, home page, and Watch
  page until there is something on them. Flip the flag when there is.

## Deliberately not here

- **No payment or price figures anywhere.** Incentives, money factor, and
  residuals move monthly; a number hard-coded in a page is a false claim by the
  time someone reads it. Every model card drives to a text instead — which is
  also a better lead than a price shopper.
- **No live inventory feed.** If the store exposes a feed later, `MODELS` in
  `data.ts` is the seam to replace.

## Content

`marketing/benz-blonde/CONTENT-PLAYBOOK.md` — positioning, the six repeatable
formats, a 30-day calendar, hooks, bio strategy, and the four metrics worth
tracking.
