# The Authority Carousel Kit — Start Here

Thank you for buying the kit. Everything you need is in this folder.

## What's inside

- **the-authority-carousel-kit.pdf** — the full guide. Read this first.
- **template-teardown.json** — before/after rewrites (highest-converting format).
- **template-steps.json** — a numbered method or framework.
- **template-story.json** — a personal pivot or lesson.
- **example-homepage-rewrite.json** — a complete, shipped carousel to learn from.
- **HOUSE-STYLE.md** — the visual + voice system in one page.
- **prompts.md** — copy-paste prompts to draft a carousel in your voice.

## The 5-minute quick start

1. Install [Node.js](https://nodejs.org) once.
2. Put these JSON files in a folder called `content/linkedin/carousels/` inside the
   MK Parrish site project (or any project that has `scripts/build-linkedin-carousel.mjs`).
3. Duplicate a template, rename it `my-idea.json`, and write your copy into the fields.
4. Build it:

   ```bash
   npm run linkedin:carousel -- content/linkedin/carousels/my-idea.json
   ```

5. Find your PNG slides + a multi-page PDF in `output/linkedin/my-idea/`.
6. Upload the PDF to LinkedIn as a **document post** — it becomes a swipeable carousel.

## The two formatting marks

Inside any text field:

- `{{word}}` → makes a word **petal pink** (one emphasis per slide).
- `**phrase**` → makes body copy **bold**.

That's the whole markup language. Everything else is just writing.

Questions or want it done for you? **mkparrish.com**
