# Founding-Client Website Redesign — Social Kit

A matching set of promo assets for the limited founding-client website-redesign
offer, built in the site's own design system (Bebas Neue / Playfair Display /
DM Sans, black × light-pink × pearl).

## What's here

| Source (HTML)          | Output (in `public/social/founding-redesign/`)      | Size        | Use |
|------------------------|------------------------------------------------------|-------------|-----|
| `onepager.html`        | `founding-redesign-onepager.pdf` / `.png`            | A4          | The one-pager — LinkedIn document post, PDF to share/download, print |
| `social-square.html`   | `founding-redesign-square.png`                       | 1080×1080   | LinkedIn / Instagram / X feed |
| `social-portrait.html` | `founding-redesign-portrait.png`                     | 1080×1350   | LinkedIn / Instagram feed (highest reach) |
| `social-story.html`    | `founding-redesign-story.png`                        | 1080×1920   | Instagram / LinkedIn stories |

`post-copy.md` has ready-to-paste captions for each platform.

Because the outputs live under `public/`, they're also hosted, e.g.
`https://www.mkparrish.com/social/founding-redesign/founding-redesign-onepager.pdf`.

## Regenerating

Fonts are embedded in each HTML as base64 (latin subset) in `fonts.css`, so the
files render identically offline with no network. To rebuild the images/PDF:

```bash
bash marketing/founding-redesign/render.sh
```

It uses the repo's pre-installed Chromium (`chrome-headless-shell`) and writes
all outputs to `public/social/founding-redesign/`.

## Editing

Edit the copy or styling in the `.html` files and re-run `render.sh`. To change
fonts, regenerate `fonts.css` from Google Fonts and re-inline the `@font-face`
block into each HTML (replacing the block that starts with the
"Fonts embedded as base64" comment).
