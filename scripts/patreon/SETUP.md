# Patreon Setup Guide — The Margins by MK Parrish

Follow these steps exactly. Takes about 30 minutes total.

---

## Step 1 — Create Your Patreon Creator Account

1. Go to **patreon.com** → click **Get Started**
2. Choose **Create on Patreon** (not "Support a Creator")
3. Sign up with your email or connect Google/Apple
4. When asked what you create: select **Writing**
5. Page name: `MK Parrish`
6. Page URL: `patreon.com/MKParrish` *(claim this exact slug)*

---

## Step 2 — Upload the Cover Image

1. Open `public/patreon-banner.html` in Chrome
2. Set browser zoom to **100%** (Cmd/Ctrl + 0)
3. Open DevTools → toggle device toolbar (Cmd/Ctrl + Shift + M)
4. Set custom size to exactly **1600 × 400**
5. Take a full-page screenshot (DevTools → three-dot menu → "Capture screenshot")
6. On Patreon → **Edit Page** → **Cover Image** → upload the screenshot

---

## Step 3 — Add Your Profile Photo

Upload a high-quality headshot or brand photo. Square crop, min 400×400px.

---

## Step 4 — Fill In Page Copy

Open `public/patreon-content-kit.html` in your browser. Section 1 has all the copy ready to paste.

**About section (short bio — appears under your name):**
```
Copywriter. Ghostwriter. Brand strategist. I write for founders, executives,
and women in the middle of reinvention — bios, LinkedIn, long-form, brand voice.
The Margins is where I share the work behind the work: essays, frameworks,
and raw drafts that never reach the public feed.
```

**Full about section:** copy from the content kit, Section 1, "Full About / Bio Section"

---

## Step 5 — Create Your Three Membership Tiers

Go to **Edit Page** → **Tiers** → **Add a Tier** for each:

### Tier 1: Soft Cover — $5/month
- **Name:** Soft Cover
- **Price:** $5
- **Description:**
  ```
  Weekly essays and strategy notes that never go to the public feed.
  The thinking behind the work — positioning, voice, reinvention —
  written for people who are paying attention.
  ```
- **Benefits:** Add one benefit: "Weekly member-only essays"

### Tier 2: Marked Up — $12/month
- **Name:** Marked Up
- **Price:** $12
- **Description:**
  ```
  Everything in Soft Cover, plus raw frameworks pulled directly from client work.
  The exact tools used on real projects — before they get cleaned up and published.
  ```
- **Benefits:**
  - Weekly member-only essays
  - Raw client frameworks + process docs

### Tier 3: First Edition — $28/month
- **Name:** First Edition
- **Price:** $28
- **Description:**
  ```
  Full access to everything. Monthly live Q&A, direct message access,
  and priority feedback on your own copy. For the person who wants
  real-time access, not just content.
  ```
- **Benefits:**
  - Everything in Marked Up
  - Monthly live Q&A session
  - Direct message access
  - Priority copy feedback

---

## Step 6 — Create Post Collections (Optional but Recommended)

Go to **Posts** → **Collections** → create these 7 collections:

| Collection Name | Description |
|---|---|
| Make Money Writing | Turning writing skills into income — platforms, positioning, pricing. |
| Ghostwriting Notes | Inside process: how I take someone else's voice and make it shareable. |
| Learn To Code | Why I added web skills and how you can too — no CS degree required. |
| Website As Revenue | Making your site do the selling so you don't have to. |
| Marked-Up Drafts | Raw drafts and annotated rewrites from real client projects. |
| Offers And Positioning | How to name, price, and describe what you do. |
| The Working Archive | Reference posts — frameworks and systems worth returning to. |

---

## Step 7 — Get Your Creator Access Token

This is required to run the automation script.

1. Go to **patreon.com/portal/registration/register-clients**
2. Click **Create Client**
3. Fill in:
   - **App Name:** MK Parrish Site Integration
   - **Description:** Private automation for post scheduling
   - **App Category:** Web
   - **Redirect URIs:** `https://www.mkparrish.com` *(any valid URL works)*
4. Click **Create Client**
5. On the client detail page, scroll to **Creator's Access Token** — copy it

---

## Step 8 — Configure the Environment

In the root of this project, open `.env.local` and add:

```
PATREON_ACCESS_TOKEN=your_token_here
```

If `.env.local` doesn't exist, create it. This file is already in `.gitignore` — it will never be committed.

---

## Step 9 — Customize Your Page + Tiers (Playwright Browser Agent)

This script opens a real browser, signs you in, and automatically fills in your page copy and tier descriptions. No API token needed — it uses your browser session.

```bash
cd /path/to/mkparrish-site
npx playwright install chromium   # first time only
node scripts/patreon/customize-page.mjs
```

**What it does:**
- Opens patreon.com in a visible Chrome window
- Prompts you to sign in manually if you aren't already (press Enter when done)
- Fills in your page headline, tagline, and About copy
- Updates all three tier names, prices, and descriptions
- Saves screenshots to `./patreon-agent-output/` after each step

**Session persistence:** Your login is saved in `./patreon-user-data/` — subsequent runs won't need you to sign in again.

**If a step fails:** Patreon sometimes changes button labels. Check the screenshot in `patreon-agent-output/` to see where it stopped, adjust the label strings in the `clickFirstVisible` calls, and rerun.

---

## Step 10 — Run a Dry Run for Posts

```bash
cd /path/to/mkparrish-site
DRY_RUN=true node scripts/patreon/post-all.mjs
```

This prints everything that would be posted without making any API calls.
Verify the output looks correct — all 26 posts (1 welcome + 25 essays) should appear.

---

## Step 11 — Post Everything

When the dry run looks right:

```bash
node scripts/patreon/post-all.mjs
```

The script will:
- Find your campaign ID automatically
- Match your tier names (Soft Cover, Marked Up, First Edition) automatically
- Post the welcome post first (public, pinned)
- Post all 25 essays with the correct tier access
- Wait 2 seconds between each post to avoid rate limits
- Print a summary when done

Total runtime: approximately 2 minutes.

---

## Step 12 — After the Script Runs

Back in Patreon:

1. Find the **Welcome to The Margins** post → click the three-dot menu → **Pin to top**
2. Go through the 25 posts and assign them to the correct **Collections** (the script sets tier access but not collections — that's a Patreon UI limitation)
3. Review the **About** page copy one more time
4. Hit **Publish Page** if it's still in draft mode

---

## Troubleshooting

**"Campaign not found"**
Your token doesn't have campaign-level access. Re-check Step 7 — make sure you copied the **Creator's Access Token**, not the client secret.

**"Tier not found: Soft Cover"**
The script matches by exact name. Make sure your tiers are named exactly: `Soft Cover`, `Marked Up`, `First Edition` (capitalization matters).

**"401 Unauthorized"**
Token is wrong or expired. Regenerate it in the Patreon developer portal.

**Posts appear but have wrong access**
Delete the incorrectly-set posts from Patreon, fix the tier names to match exactly, and re-run.

---

## Files Reference

| File | Purpose |
|---|---|
| `scripts/patreon/customize-page.mjs` | Playwright browser agent — fills in page copy and tier descriptions |
| `scripts/patreon/post-all.mjs` | API script — posts all 26 posts via Patreon API v2 |
| `public/patreon-content-kit.html` | All page copy, tier descriptions, and post content |
| `public/patreon-banner.html` | Cover image (1600×400) — screenshot and upload |
| `.env.local` | Your Patreon access token — never committed to git |
| `patreon-agent-output/` | Screenshots saved by customize-page.mjs — gitignored |
| `patreon-user-data/` | Persistent browser session — gitignored |
