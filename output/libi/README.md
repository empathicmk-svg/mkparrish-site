# Competition Builder Pass: LIBI dinner presentation folder

Everything for the LIBI Membership Dinner (Tuesday, Nov 10, 2026) in one place.

## Show your manager first

| File | What it is |
| --- | --- |
| `manager-one-pager.pdf` (and `.png`) | The whole offer on one page: what changed, what members get, what it costs the store, and approval checkboxes. |
| `previews/page-silver-1-landing.png` | The page a guest sees after scanning. |
| `previews/page-silver-2-scratch.png` | The swipe-to-reveal moment. |
| `previews/page-silver-3-pass.png` | Their pass and Silver certificate, with the share-to-go-Gold prompt. |
| `previews/page-gold-*.png` | The same three screens for a guest who arrives on a colleague's share code (starts at Gold). |

## Use at the dinner

| File | Where it goes |
| --- | --- |
| `phone-lockscreen.png` | Your lock screen. Hold it up: "Scan this, it's your Builder Pass." |
| `ipad-display.png` | Full screen on the iPad at the dinner. Guests scan it with their own phones. |
| `share-card-square.png` | Text or AirDrop it to anyone you meet. |
| `story-9x16.png` | Instagram, LinkedIn and Facebook stories. |
| `og.png` | The preview that shows when the link is texted (already wired into the site). |
| `qr-*.png` / `.svg` | Bare QR codes, one per channel, so each lead shows where it came from. |

The talk track, follow-up schedule and manager text are in `marketing/libi/PLAYBOOK.md`.

## The offer in three lines

1. Every pass carries a **VIP Test Drive Certificate**: a private drive in the Mercedes they choose, redeemed in the showroom by appointment through Dec 31.
2. Every pass has a **share code**. When a colleague activates a pass with it, both certificates go **Gold** (complimentary detail when they come in).
3. No loaner car, no drawing. The Gold reward and an optional dollar bonus are one line each in `app/libi/campaign.ts`; rebuild with `node scripts/libi/build.mjs`.
