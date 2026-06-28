# Store Operations — MK Parrish

Your plain-English runbook for the shop: how a sale works, the one Stripe setup
step, and how to fulfill a paperback on Lulu. Keep this handy.

---

## How a sale works (what's automatic vs. what you do)

- **Ebooks** → fully automatic. After checkout the buyer is sent to a page that
  auto-downloads both the **PDF and the EPUB**, and they also get an email with
  the same links. Nothing for you to do.
- **Paperbacks** → automatic *except* the printing. The buyer pays and gets a
  "ships in 5–7 days" confirmation; **you place the matching order on Lulu** and
  ship it (see below).
- **Every purchase** emails the buyer and **CCs you (mkp414@icloud.com)** — once
  the Stripe webhook secret is in place (one-time setup, next section).

---

## One-time Stripe setup (turns on your purchase emails)

### A) The webhook (so each sale emails you + the buyer)

1. Go to **dashboard.stripe.com** in **live mode** (not "Test mode").
2. **Developers → Webhooks** (newer dashboards: **Settings → Developers → Webhooks**).
3. Click **+ Add endpoint**.
4. **Endpoint URL:** `https://www.mkparrish.com/api/stripe-webhook`
5. **Select events:** search and check **`checkout.session.completed`**.
6. Click **Add endpoint**.
7. On that endpoint's page, find **Signing secret → Reveal → copy** it (starts with `whsec_`).
8. Go to **vercel.com → mkparrish-site → Settings → Environment Variables**.
9. Add: **Name** `STRIPE_WEBHOOK_SECRET`, **Value** the `whsec_…`, **Environment** Production. Save.
10. **Redeploy:** Deployments tab → top deployment → ⋯ → Redeploy.
11. Test: on the Stripe webhook page, **Send test event → `checkout.session.completed`**. Expect a **200** and a test email.

### B) Backup — Stripe's own email on every sale (30 seconds)

1. **dashboard.stripe.com → Settings (gear) → Personal → Notifications.**
2. Turn **on** email for **"Successful payments."**
3. Confirm the email there is correct, and check **spam** for "Stripe."

---

## Fulfilling a paperback order on Lulu

When a paperback sells, you get the order (Stripe email / dashboard) with the
buyer's **shipping address**. Then:

1. Sign in at **lulu.com** → **Create a Print Book**.
2. Choose the book's settings (see table below). Standard for all titles:
   **6 × 9 in**, **Perfect Bound**, **Black & White** interior, **60# Cream** paper,
   glossy cover. (B&W is fine — the highlights are printed in gray.)
3. Upload the **interior PDF**, then the **cover PDF** (both print-ready — do not
   let Lulu rescale or add margins; bleed is already built in).
4. At checkout, enter the **buyer's shipping address** as the destination (or
   order an author copy and ship it yourself).
5. Before selling a brand-new title, order **one proof copy** first. For an order
   already paid, you can ship straight to the buyer.

Files live at `https://www.mkparrish.com/downloads/print/<slug>-interior.pdf` and
`…-cover.pdf`.

| Book | Pages | Spine | Full cover (W×H) | Slug |
| :--- | :--- | :--- | :--- | :--- |
| REBECOMING: From Fear to Faith | 78 | 0.195 in | 12.445 × 9.25 in | rebecoming |
| Write Yourself Into the Room | 41 | 0.103 in | 12.353 × 9.25 in | write-yourself-into-the-room |
| The Reinvention Workbook | 39 | 0.098 in | 12.348 × 9.25 in | reinvention-workbook |
| The Brand Voice Playbook | 39 | 0.098 in | 12.348 × 9.25 in | brand-voice-playbook |
| The Edit | 39 | 0.098 in | 12.348 × 9.25 in | the-edit-diy |
| Before the Session | 39 | 0.098 in | 12.348 × 9.25 in | before-the-session |
| The Rewrite Playbook | 39 | 0.098 in | 12.348 × 9.25 in | the-rewrite-playbook |
| The New Chapter Workbook | 39 | 0.098 in | 12.348 × 9.25 in | the-new-chapter-workbook |
| The Byline Method | 39 | 0.098 in | 12.348 × 9.25 in | the-byline-method |
| The Build Copy Guide | 39 | 0.098 in | 12.348 × 9.25 in | the-build-copy-guide |
| The Social Strategy Playbook | 39 | 0.098 in | 12.348 × 9.25 in | the-social-strategy-playbook |
| The Prompt Vault | 39 | 0.098 in | 12.348 × 9.25 in | the-prompt-vault |

(Page counts/spines update if a book's text changes; the full spec sheet is at
`/downloads/kdp/lulu-upload-specs.md`.)

---

## Quick reference

- **Store:** mkparrish.com/shop · **Book:** mkparrish.com/rebecoming
- **Print cost (Lulu, 6×9 B&W):** ~$2.80–$3 per copy; ship ~$5 single copy
  (cheaper per unit in bulk). Shipping is baked into your listed prices, so the
  buyer is not charged extra.
- **A portion of every sale** is donated to your local parish (stated on the
  microsite and the book page).
- **Lead-gen popup:** captures email → emails the free first chapter → drives the
  book sale.
