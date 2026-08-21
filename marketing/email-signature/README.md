# Email signature — Mercedes-Benz of Smithtown

Two finished signatures, same layout, different metal:

| File | Accent |
| --- | --- |
| `mk-parrish-signature-platinum.html` | Silver / chrome — the Mercedes-Benz house palette |
| `mk-parrish-signature-gold.html` | Gold, closer to the original draft |
| `mk-parrish-signature-crm.html` | Silver, rebuilt for a dealer CRM's editor — see below |

`preview.html` shows both side by side. Open it first, pick one, then install
that file.

Do not hand-edit the HTML — it is generated. Change `scripts/build-email-signature.mjs`
and run:

```bash
npm run email:signature
```

## Install

**Gmail** — Settings → See all settings → General → Signature. Open the chosen
`.html` file in a browser, select all (⌘A), copy, paste into the signature box,
save. Paste into the box itself, not into a compose window.

**Outlook (desktop)** — File → Options → Mail → Signatures → New, then paste the
same way. Outlook re-writes what it is given; check one test send before relying
on it.

**Apple Mail** — create a signature, quit Mail, then replace the body of the new
`.mailsignature` file in `~/Library/Mail/V*/MailData/Signatures/` with the file
contents, keeping the header lines above it.

## Install in Momentum CRM

Use `mk-parrish-signature-crm.html`, not the two above. It is the same silver
signature with three changes a CRM editor needs, because these editors (Momentum,
VinSolutions and the rest all wrap TinyMCE or CKEditor) sanitise the HTML on save:

- **No HTML comments.** The editor strips them, and the Outlook VML button lives
  inside one — it would be thrown away mid-tag. The CTA is a padded table cell
  instead, which Word honours natively, so Outlook still gets a real button.
- **No doctype or `<body>`.** It is a bare fragment; a full document gets
  unwrapped or rejected.
- **Caps typed as caps,** since `text-transform` is one of the first properties
  these editors drop.

Steps:

1. Momentum → your user profile → Email / Signature settings.
2. Switch the editor to source view — the `< >` button, sometimes labelled
   *Source*, *Code*, or *HTML*. Paste the whole file there. **Do not** paste into
   the visual editor; it escapes the markup and you get code as text.
3. Save, then reopen the signature. CRMs rewrite what they store, so confirm the
   layout survived the round trip.
4. Send one test email to yourself and open it on a phone as well as a desktop.

If Momentum has no source view, open `mk-parrish-signature-crm.html` in a browser,
select all, copy, and paste into the visual editor instead — it survives that
route too, just with less predictable results on save.

Momentum's merge tokens can go straight into the markup if you ever want them —
they are plain text and pass through the build untouched.

## The star

The signature loads `https://mkparrish.com/email/mb-star.png`, which is
`public/email/mb-star.png` in this repo — so **the logo stays broken until this
branch is deployed.** Email clients cannot render SVG and cannot see local files,
so the mark has to be a hosted PNG.

In the CRM, there is a second option: most dealer CRMs have an image button in
the signature editor that uploads to their own CDN. Upload `public/email/mb-star.png`
that way and let the editor rewrite the `src` — the signature then works before
this branch ships, and keeps working if mkparrish.com ever moves.

That PNG is drawn by the build script, not an official asset. Mercedes-Benz USA
gives dealers a brand kit; when you have the store's approved star, overwrite
`public/email/mb-star.png` (and `mb-star-gold.png`) with it at ~140px square and
redeploy — no markup change needed. Dealer-brand rules also normally want the
store's own name in the signature, which is why the store line sits under the
mark.

## What changed from the first draft

- **Wikimedia hotlink → self-hosted PNG.** Wikimedia throttles hotlinks and
  renames files; either one leaves an empty box in every outgoing email.
- **`<div>` layout → tables.** Outlook renders through Word: divs with heights,
  and `background: linear-gradient` for the flourish, all collapse. The dividers
  are now 1px table rows and the flourish is a real centred rule.
- **Button rebuilt.** Word ignores padding on an inline-block `<a>`, so the CTA
  had no shape in Outlook. It now ships a VML button for Outlook and the styled
  link everywhere else.
- **Garamond italic → the Mercedes-Benz register.** Garamond is not installed on
  Windows and was falling back to Georgia. Mercedes sets its brand in Corporate
  A/S, which no email client can load, so this uses wide-tracked uppercase in the
  nearest neutral grotesque — that tracking, not a serif, is what reads as
  Mercedes.
- **Phone numbers are now `tel:` links** and every `&` is escaped, including the
  one inside the Maps URL, where a bare `&` can swallow the characters after it.
- **The review link.** The original carried a placeholder Place ID
  (`0x89e81b5e...5e5e`) and coordinates that land in open water south of the
  Hamptons — it did not resolve to the store. It now searches Maps by name and
  address, which always finds the listing. Better still: sign in to the store's
  Google Business Profile → *Ask for reviews*, and paste that
  `https://g.page/r/…/review` link into `DATA.review.href` — it opens the review
  box directly instead of the listing.
