# Email signature — Mercedes-Benz of Smithtown

Silver, per the marque. Two builds of the same signature:

| File | Use it for |
| --- | --- |
| `mk-parrish-signature.html` | Gmail, Outlook, Apple Mail — a full page to open and copy |
| `mk-parrish-signature-crm.html` | Momentum CRM — a bare fragment for its source view |

`preview.html` renders it with the star read off disk, so it looks right before
this branch ships.

Do not hand-edit the HTML — it is generated. Change `scripts/build-email-signature.mjs`
and run:

```bash
npm run email:signature
```

## Install in Gmail / Outlook / Apple Mail

**Gmail** — Settings → See all settings → General → Signature. Open
`mk-parrish-signature.html` in a browser, select all (⌘A), copy, paste into the
signature box, save. Paste into the box itself, not into a compose window.

**Outlook (desktop)** — File → Options → Mail → Signatures → New, then paste the
same way. Outlook re-writes what it is given; check one test send before relying
on it.

**Apple Mail** — create a signature, quit Mail, then replace the body of the new
`.mailsignature` file in `~/Library/Mail/V*/MailData/Signatures/` with the file
contents, keeping the header lines above it.

## Install in Momentum CRM

Use `mk-parrish-signature-crm.html`. It is the same signature with three changes
a CRM editor needs, because these editors (Momentum, VinSolutions and the rest
all wrap TinyMCE or CKEditor) sanitise the HTML on save:

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

Momentum's merge tokens can go straight into the markup if you ever want them —
they are plain text and pass through the build untouched.

## The font

mercedes-benz.com is set in **MB Corpo** — `MB Corpo A Title` for headings,
`MB Corpo S Text` for body. It is licensed through the Mercedes-Benz Font
Service, so it cannot be served from this repo, and that would not help anyway:
Gmail, Outlook and Yahoo all drop `@font-face`, so no email signature anywhere
loads a webfont. Whatever is installed on the reading machine is what renders.

So the stack names the real MB families first and falls through to the nearest
neutral grotesque. Any machine with the dealer brand kit installed — likely
including the showroom's own — renders true MB Corpo; everyone else gets
Helvetica or Arial, which is what the layout was built against.

One catch handled inline: Word reads only the *first* family in a stack and drops
to Times New Roman when it is missing, which would wreck the signature on every
Outlook desktop without the brand kit. `mso-ascii-font-family:Arial` and its two
siblings pin Word to Arial; every other client ignores them.

If the store's IT can install MB Corpo on your machine, the signature picks it up
with no change here.

## The star

The signature loads `https://mkparrish.com/email/mb-star.png`, which is
`public/email/mb-star.png` in this repo — so **the logo stays broken until this
branch is deployed.** Email clients cannot render SVG and cannot see local files,
so the mark has to be a hosted PNG.

### Testing before it merges

The branch has a public Vercel preview, so the star is already live at
`https://mkparrish-site-git-claude-merce-1a7599-empathicmk-svgs-projects.vercel.app/email/mb-star.png`.
To try the signature today, paste it in, then swap `https://mkparrish.com` for
that preview host in the `<img src>` only. Change it back — or just rebuild —
once this merges: the preview host disappears with the branch.

In the CRM there is a second option: most dealer CRMs have an image button in the
signature editor that uploads to their own CDN. Upload `public/email/mb-star.png`
that way and let the editor rewrite the `src` — the signature then works before
this branch ships, and keeps working if mkparrish.com ever moves.

That PNG is drawn by the build script, not an official asset. Mercedes-Benz USA
gives dealers a brand kit; when you have the store's approved star, overwrite
`public/email/mb-star.png` with it at ~140px square and redeploy — no markup
change needed. Dealer-brand rules also normally want the store's own name in the
signature, which is why the store line sits under the mark.

## The review button

It points at MK's Maps share link, `maps.app.goo.gl/gcCgAvQGMnthZ3co8`. Click it
from a test send once to confirm where it lands: a share link opens the store's
listing, from which a customer still has to tap through to write a review. The
Google Business Profile → *Ask for reviews* link (`https://g.page/r/…/review`)
opens the review box directly and is worth swapping in — change
`DATA.review.href` and rebuild.

## What changed from the first draft

- **Wikimedia hotlink → self-hosted PNG.** Wikimedia throttles hotlinks and
  renames files; either one leaves an empty box in every outgoing email.
- **`<div>` layout → tables.** Outlook renders through Word: divs with heights,
  and `background: linear-gradient` for the flourish, all collapse. The dividers
  are now 1px table rows and the flourish is a real centred rule.
- **Button rebuilt.** Word ignores padding on an inline-block `<a>`, so the CTA
  had no shape in Outlook. The email build ships a VML button for Outlook and the
  styled link everywhere else; the CRM build uses a padded cell.
- **Garamond italic → the Mercedes-Benz register.** Garamond is not installed on
  Windows and was falling back to Georgia. See *The font* above.
- **Phone numbers are now `tel:` links** and every `&` is escaped.
- **The review link was broken.** It carried a placeholder Place ID
  (`0x89e81b5e...5e5e`) at coordinates in open water south of the Hamptons.
