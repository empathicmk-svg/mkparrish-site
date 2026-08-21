# Email signature — Mercedes-Benz of Smithtown

Two finished signatures, same layout, different metal:

| File | Accent |
| --- | --- |
| `mk-parrish-signature-platinum.html` | Silver / chrome — the Mercedes-Benz house palette |
| `mk-parrish-signature-gold.html` | Gold, closer to the original draft |

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

## The star

The signature loads `https://mkparrish.com/email/mb-star.png`, which is
`public/email/mb-star.png` in this repo — so **the logo stays broken until this
branch is deployed.** Email clients cannot render SVG and cannot see local files,
so the mark has to be a hosted PNG.

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
