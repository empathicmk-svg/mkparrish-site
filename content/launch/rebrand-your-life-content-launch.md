# Rebrand Your Life Content Launch

## Source links

Facebook reference links provided by MK:

- https://www.facebook.com/share/1AzLJv89xB/?mibextid=wwXIfr
- https://www.facebook.com/share/18PbXcDMas/?mibextid=wwXIfr

Note: Facebook share links may require login or permission access. This launch package uses the accessible MK Parrish brand system in the repo and turns the idea into deployable content assets.

---

## Created Assets

### 1. LinkedIn Carousel: Rebrand Your Life

**Path:** `content/linkedin/carousels/rebrand-your-life.json`

**Angle:** Personal reinvention as a positioning strategy.

**Best platform:** LinkedIn, Instagram carousel, TikTok image carousel.

**Primary CTA:** Visit mkparrish.com.

### 2. LinkedIn Carousel: Website That Sells

**Path:** `content/linkedin/carousels/website-that-sells.json`

**Angle:** Website copy should sell clearly, not just look pretty.

**Best platform:** LinkedIn, Instagram carousel, sales email, services page teaser.

**Primary CTA:** Book a website copy audit.

### 3. Ebook / Workbook: The Rebrand Your Life Content Engine

**Path:** `products/templates/the-rebrand-your-life-content-engine.md`

**Angle:** 30 days of posts, prompts, and offer CTAs for the MK Parrish brand.

**Best use:** Paid digital product, free lead magnet, Patreon bonus, email capture, or bonus with a strategy session.

---

## Build Commands

Run these locally or in the connected build environment:

```bash
npm run linkedin:carousel -- content/linkedin/carousels/rebrand-your-life.json
npm run linkedin:carousel -- content/linkedin/carousels/website-that-sells.json
node scripts/build-downloads.mjs
```

Expected outputs:

```text
output/linkedin/rebrand-your-life/slide-01.png
output/linkedin/rebrand-your-life/rebrand-your-life.pdf
output/linkedin/website-that-sells/slide-01.png
output/linkedin/website-that-sells/website-that-sells.pdf
public/downloads/templates/the-rebrand-your-life-content-engine.html
```

---

## Launch Copy

### LinkedIn Post 1

I do not believe in starting over.

I believe in editing with better standards.

That is the whole idea behind the MK Parrish brand right now. Your story is not the product. The transformation is.

A personal brand is not a performance. It is a pattern.

Same point of view. Same visual world. Same promise. Same standard.

That is how people start to remember you.

I made a new carousel on how to rebrand your life without turning your pain into content soup.

Start here: mkparrish.com

### LinkedIn Post 2

Your website is not a moodboard.

It is a sales conversation.

Pretty helps. Clear sells.

If a stranger lands on your page, they should know three things fast:

1. What you do
2. Who it is for
3. Why it matters now

If your homepage cannot answer those, the design is carrying a strategy problem it was never hired to solve.

I created a new breakdown on website copy that actually sells.

Book a website audit at mkparrish.com

### TikTok Script 1

Here is the difference between oversharing and building a personal brand.

Oversharing says, here is everything that happened to me.

A personal brand says, here is what I learned, what I built, and what someone else can use because I survived it.

Your story matters, but the transformation is what people can understand, trust, and buy from.

That is the whole shift.

Your mess is not the message. The meaning is.

### TikTok Script 2

Your website should not make people decode your value like it is a haunted treasure map.

If your hero section says you help brands unlock their potential through innovative storytelling, I still do not know what you sell.

Say the thing.

I rewrite messy service pages so buyers get it fast.

That is clearer. That is stronger. That is easier to buy.

Pretty is nice. Clear gets paid.

---

## Product Listing Copy

**Title:** The Rebrand Your Life Content Engine

**Subtitle:** 30 days of posts, prompts, and offers for turning your story into a sharper brand.

**Description:**

A practical content workbook for women, creators, consultants, and service professionals who are done trying to turn their entire life into content and want a cleaner system.

Inside, you get four brand pillars, 30 post ideas, caption starters, TikTok hooks, five lead magnet ideas, and a weekly publishing rhythm that points people back to your offers.

This is for the person rebuilding her life and her brand at the same time.

Your story is not the product. The transformation is.

**Suggested price:** $37

---

## Next Best Build

Create a public product page for `the-rebrand-your-life-content-engine` and connect it to Stripe, Gumroad, Ko-fi, or Buy Me a Coffee.

Recommended offer ladder:

1. Free lead magnet: Website Fog Finder
2. $37 product: Rebrand Your Life Content Engine
3. $97 audit: Rewrite Your Story Audit
4. $250 to $500 session: Website or positioning strategy session
5. Monthly retainer: Social Suite or content engine management
