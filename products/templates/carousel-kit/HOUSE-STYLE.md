# MK Parrish LinkedIn Post System

This is the canonical visual and narrative system for every MK Parrish LinkedIn carousel.

## Master look

- 1080 × 1080 square pages
- Near-black editorial background with a restrained blush-pink glow
- MK PARRISH at top left and page count at top right
- Bebas Neue uppercase headlines
- DM Sans body copy
- Playfair Display italic signature
- Pearl white, smoke grey, and petal pink only
- Left-aligned content with generous negative space
- Pink `SWIPE →` block at bottom left
- `/in/mkparrish ♡` at bottom right
- No rounded cards, stock icons, gradients that overpower the copy, or generic Canva decoration

## Default seven-slide story

1. **Cover:** Strong promise, sharp tension, concise setup
2. **Problem:** Name what the audience is getting wrong
3. **Evidence 01:** Before/after, example, or first proof point
4. **Evidence 02:** Second example or step
5. **Evidence 03:** Third example or step
6. **Principle:** Distill the lesson into a memorable rule
7. **CTA:** Give the reader one specific next move

The number of slides may change when the idea requires it, but the visual hierarchy and narrative rhythm stay consistent.

## Voice rules

- Clear over clever, but never bland
- Specific outcomes instead of adjectives
- One idea per slide
- Headlines should sound like MK, not a corporate content team
- Keep body copy conversational and decisive
- Avoid em dashes, jargon fog, and artificial inspiration
- Use pink emphasis sparingly, only on the word carrying the tension

## Build a carousel

Create or duplicate a JSON file in `content/linkedin/carousels/` and run:

```bash
npm run linkedin:carousel -- content/linkedin/carousels/homepage-rewrite.json
```

The generator creates:

- Individual PNG slides in `output/linkedin/<slug>/`
- A LinkedIn-ready multi-page PDF in the same folder

## Inline formatting

Inside JSON copy:

- `{{word}}` makes a word petal pink
- `**phrase**` makes body copy bold

The source of truth for the template is `scripts/build-linkedin-carousel.mjs`.
