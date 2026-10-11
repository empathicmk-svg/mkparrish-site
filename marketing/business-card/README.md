# Business card — Avery 8871

A two-sided 3.5 × 2in card:

- **Front** — MK Parrish, WebDev – Marketing Consultant. The site's wordmark
  (Bebas Neue), Playfair italic and DM Sans, with the cursor heart from
  `public/cursor-heart.svg`.
- **Back** — Mary Kate Parrish, Sales & Leasing Consultant, Mercedes-Benz of
  Smithtown, with the star in silver.

| File | Use it for |
| --- | --- |
| `mk-parrish-card-avery-8871.pdf` | The print file. Page 1 is ten fronts, page 2 ten backs. |
| `mk-parrish-card-alignment-test.pdf` | Card outlines only — print on plain paper first to check your printer. |
| `mk-parrish-card-front.png`, `-back.png` | One card per side at 300 dpi, for a preview or a digital card. |

Do not hand-edit the outputs. Change `scripts/build-business-card.mjs` and run:

```bash
npm run business-card
```

The build fetches the three fonts from Google Fonts and embeds them, so it
needs a network connection.

## Printing

1. **Test first.** Print `mk-parrish-card-alignment-test.pdf` on plain paper
   and hold it behind a sheet of 8871 cards against a window. The boxes should
   sit on the card cuts. If they are off by the same amount everywhere, your
   printer is shifting the page — adjust its alignment, not the file.
2. **Print settings** — scale at **100% / Actual size** (never *Fit to page*),
   paper type *Matte* or *Heavyweight / Card stock*, quality *Best*. Feed one
   sheet at a time.
3. **Fronts** — print page 1 only. Let the ink dry for a few minutes.
4. **Backs** — reload the same sheet flipped over, **top edge feeding first
   again**, and print page 2 only. A pencil arrow on a trial sheet is the
   easiest way to learn which way your printer wants it.

The 8871 grid is symmetric left to right (0.75in margins either side), so the
backs land behind the fronts whichever column a card ends up in. Only the top
edge matters.

Nothing is printed within 0.16in of a card edge. Clean Edge cards are die-cut
with no bleed, so any colour run to the edge would show the small drift every
printer has.

## The star

Like the email signature's, this star is drawn by the build script, not the
official Mercedes-Benz artwork, and it is set darker than the email version so
it holds up on white paper. Dealer brand rules usually require the store's
approved logo and sign-off on printed pieces that carry the star — worth a
quick check with the store before a big print run. If you get the brand-kit
star, swap it in for `star()` in the build script.
