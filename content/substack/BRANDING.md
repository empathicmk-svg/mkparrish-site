# Rebrand the Substack: "mags" → "The Margins"

Your Substack currently shows up as **"mags."** This guide renames it to **The Margins** and styles it to match mkparrish.com. Substack has no API, so these are manual settings — but they take about 5 minutes, and the brand assets are pre-made and ready to upload.

## Ready-to-upload assets (in `public/substack/`)

| File | Use in Substack | Size |
| --- | --- | --- |
| `the-margins-avatar.png` | **Publication logo / avatar** (shown as a circle) | 1024×1024 |
| `the-margins-cover.png` | **Welcome / cover image** and social share image | 1456×600 |

Both are generated from the site's real fonts (Bebas Neue + Playfair Display) and palette, so they're an exact visual match. Re-generate any time with `node scripts/build-substack-assets.mjs`.

---

## Step 1 — Rename the publication

**Settings → General → Publication details**

- **Name:** `The Margins`
- **Short description / tagline:** `The private side of the brand — essays, strategy notes, and the thinking before the edit.`
- **Subdomain/URL:** leave as `mkparrishthemargins.substack.com` (don't change it — your site links point there). The display name and the URL are independent, so renaming to "The Margins" won't break any links.

## Step 2 — Upload the brand assets

**Settings → General → Logo & branding**

- **Logo:** upload `the-margins-avatar.png`
- **Cover photo / welcome image:** upload `the-margins-cover.png`

## Step 3 — Match the colors

**Settings → Website → Theme** (or Design)

- **Accent color:** `#C75B78` (the site's "carmine")
  - *Why not the lighter pink?* Substack puts **white text on the accent color** for buttons. The signature petal `#F2AFC6` is too light for that — white text on it is unreadable. Carmine is the same rose family, on-brand, and passes contrast. The petal pink still shows up everywhere in the logo and cover art.
- If Substack offers a **dark theme**, turn it on — it's the closest match to the site's void-black background. If not, the white reading theme is fine; the dark cover art carries the brand at the top of every page.

## Step 4 — Typeface

Substack only allows its built-in typefaces (no Bebas Neue / custom fonts). For the closest editorial feel:

- Choose the **serif** reading option if available — it echoes the site's Playfair Display headers.
- Otherwise keep the default; the logo and cover do the brand-identity work.

## Step 5 — About page

**Settings → About** — paste:

> **The Margins** is the private editorial side of MK Parrish.
>
> The public work is already edited. Positioned. Chosen carefully for what it includes and what it leaves out. The Margins is what happens before any of that — raw strategy notes from real engagements, half-built frameworks that ended up running full client projects, and the thinking that doesn't fit neatly into a public feed.
>
> No algorithm decides what gets published here. Specific, honest, and not performing expertise for an audience — just sharing the work with people who want to see inside it.
>
> Free to read. Paid members get the full archive, weekly frameworks, and direct access.

## Step 6 — Confirm pricing (from the monetization plan)

**Settings → Payments**

- Monthly: **$9** · Annual: **$90** · Founding Member: **$300/yr**

---

Once the name reads **The Margins** and the logo/cover are uploaded, the publication will match the site. Everything the website links to (`mkparrishthemargins.substack.com`) keeps working unchanged.
