# Social bulk-upload generator

Turns the Shelf catalog (books, service guides, bundles, the audit, the
membership) into a batch of **highly-stylized, on-brand social posts** plus the
**captions and bulk-upload CSVs** that scheduling tools ingest — so a month of
monetizing content ships in one command.

```bash
npm run social
# or with options:
node scripts/social/generate.mjs --formats=reel,feed --start=2026-07-01
```

Everything lands in `scripts/social/out/` (git-ignored — regenerate any time):

| File | What it is |
| --- | --- |
| `<slug>-reel.png` | 1080×1920 — TikTok / IG Reels / Stories cover |
| `<slug>-feed.png` | 1080×1350 — IG portrait feed / carousel cover |
| `captions.csv` | Master sheet: hook, full caption, hashtags, link, image names |
| `instagram-bulk.csv` | IG/Meta-style schedule (Date, Time, Media, Caption, Link) → feed images |
| `tiktok-bulk.csv` | TikTok-style schedule (short hook + 6 tags + #fyp) → reel images |
| `bulk-schedule.csv` | Generic Date/Time/**Platform**/Media/Caption/Link for any tool |
| `manifest.json` | Machine-readable index of every post + asset |

## Options

- `--formats=reel,feed` — which sizes to render (`reel`, `feed`).
- `--start=YYYY-MM-DD` — first publish date (defaults to next Monday). The
  scheduler fans posts out at **09:00 / 12:30 / 18:00**, 3 per day.

## How to bulk upload

- **Meta Business Suite** (IG + FB): Planner → **Import**, upload
  `instagram-bulk.csv` + the `*-feed.png` files. Captions already include the
  hashtag block; IG links aren't clickable, so the CTA says *"link in bio."*
- **TikTok**: use `tiktok-bulk.csv` with the `*-reel.png` assets (or drop them
  straight into TikTok's web uploader). Put the Stripe link in your bio /
  Linktree and reference it in the caption.
- **Later / Buffer / Metricool / Hootsuite**: import `bulk-schedule.csv` and map
  the columns on upload (Date, Time, Platform, Media File, Caption, Link). Point
  the importer at this folder so it finds the PNGs.
- **Link-in-bio**: every post's destination is in the `link` column of
  `captions.csv` — load them into Linktree/Stan/Beacons in the same order.

## Editing the content

All copy lives in [`catalog.mjs`](./catalog.mjs) — one entry per post. Wrap a
phrase in `*asterisks*` to paint it petal-pink in the headline; use `\n` for
line breaks. Re-run `npm run social` to re-render. Visual styling (fonts,
colors, layout) is in [`template.mjs`](./template.mjs).

> Images are static post/cover art. To turn a reel cover into a moving video,
> drop the PNG into CapCut/Reels as the first frame, or animate the HTML in
> `template.mjs` and capture frames — the layout is already video-safe (1080×1920).
