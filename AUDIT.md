# mkparrish.com — Ruthless Conversion Audit

**Auditor persona:** Founder who's scaled 3 SaaS products past $10M ARR. Designer who's studied every pixel of Linear, Superhuman, Vercel, Raycast, Arc.
**Conversion goal:** Strategy call booked (Calendly) or Stripe checkout hit.
**Brutal honesty mode:** ON.

---

## Pass 1 — Designer teardown

The aesthetic is technically competent — sharp corners, Bebas Neue display, noir palette, pink accent. It *looks* like an AI-assisted designer project that read one Dribbble article about "luxury dark mode." But this site is selling **$250 to $10K engagements to revenue leaders**. Aesthetic ≠ conversion. Below is what's actually broken.

## Pass 2 — First-time visitor walkthrough

I'm a VP of Demand Gen at a Series B SaaS. LinkedIn sent me here. I have 40 seconds before I close the tab. Here's what happens, section by section.

---

# 🔴 CRITICAL — Fix before this site sees another dollar of traffic

### C1. Literal `\u2014` escape sequences are rendering as text in the browser

JSX text nodes don't parse JS string escapes. These lines put `\u2014` literal characters on screen:

- `app/page.tsx:468` — Services section: `"Choose a lane or stack them \u2014 each is scoped..."`
- `app/page.tsx:494` — Writing section: `"long-form essays \u2014 I write in your voice..."`
- `app/page.tsx:619` — Pricing section: `"Choose a lane \u2014 or stack them..."`
- Any other JSX text with `\u2014`, `\u2013`, `\u2019` — grep for `\\u` in page.tsx

**Fix:** Replace literal `\u2014` inside JSX with actual em-dash `—` (or `{"\u2014"}` inside `{}`). The `\u...` escapes only work inside JS string literals — which is why `aboutParagraphs[0]` and `serviceItems[0].desc` render correctly while the inline JSX strings do not.

**Why critical:** A visitor reading "Choose a lane \u2014 each is scoped to your stage" thinks they're on a broken demo site. Immediate trust kill.

### C2. Primary CTA text telegraphs "I'm unemployed"

> **"I DO NOT APPLY FOR ROLES. I BUILD LEVERAGE."**

This is positioned as a hero tagline. It reads like something a candidate writes on LinkedIn when they're frustrated with a job search. **A buyer doesn't care whether you apply for roles.** They care if you can deliver the outcome they just scanned the page for.

This line radiates insecurity and gatekeeping where the rest of the page tries to project authority. Remove it or rewrite as a *buyer-facing* claim:

- ❌ "I do not apply for roles. I build leverage."
- ✅ "I don't sell deliverables. I build pipeline you can show your board."
- ✅ "One operator. Strategy and execution under the same roof."

### C3. The $250 audit undercuts your entire price ladder

The jump from **$250 one-time → $2,000/mo → $5,000/mo** is violent, and the $250 anchor poisons the rest of the menu.

- $250 for "ICP review + competitive gap + channel audit + 30-day roadmap + executive PDF + live debrief" is **absurd** for the buyer you're targeting (revenue VPs signing $50K retainers). It signals one of three things: (a) this won't actually be thorough, (b) she's desperate, (c) it's a lead magnet dressed up as a product.
- Revenue leaders don't want a $250 audit — they want to know if you're serious. **Price signals tier.**

**Fix one of two ways:**
1. Kill the $250 SKU entirely. Make it a free 45-min strategy call (gated Calendly). Use it as a pipeline qualifier, not a line item.
2. Raise it to $1,500–$2,500. Reposition as a "Pipeline Diagnostic" that credits back if they upgrade within 30 days.

### C4. You have no identifiable social proof above the fold

Hero shows: $40M+, 3×, 500+, 68%. Then a logo row: Vonage, Mercer, Take-Two, UBS… **no attribution, no link, no "in partnership with" context, no case association.** A cynical buyer assumes these are companies you sent one email to.

The case studies below are also anonymous:
- "Partner-Led Pipeline — Enterprise velocity and win-rate uplift"
- "ABM System That Converts"
- "Executive Demand Engine"

**Zero client names. Zero quotes. Zero faces.** This is the #1 trust gap on the site. On a consulting page, anonymous case studies read as aspirational, not real.

**Fix:** Even one named testimonial with a headshot above the fold will outperform all four of those stat boxes combined. Ask 3 past clients today.

### C5. The `STRIPE_WRITING` link is a placeholder

`app/page.tsx:12` — `const STRIPE_WRITING = "https://buy.stripe.com/YOUR_WRITING_LINK";`

This is live in production. Clicking "Buy a Single Piece" sends the user to a Stripe 404.

### C6. Pricing tier names drift across the site

The same SKUs have **different names in different sections**, making the offer ladder feel sloppy:

| Pricing section | Contact section aside | Stripe button |
|---|---|---|
| Marketing Audit — $250 | Revenue Leak Audit — $250 | "Buy the Audit" |
| Pipeline Acceleration — $2,000/mo | Pipeline Acceleration — $2K/mo | "Start the Retainer" |
| Fractional Head of Growth — $5,000/mo | Embedded Growth Partner — $5K/mo | "Let's Talk" |

Pick one name per SKU. Use it everywhere.

---

# 🟠 HIGH IMPACT — Every one of these is costing you bookings

### H1. The navigation has 8 items and half of them compete for the same click

Services, Writing, Work, Thinking, About, FAQ, Contact, + Book a Call button.

"Writing" and "Services" are the same thing (writing is one of the six services). "Thinking" is a content shelf no buyer clicks. "About" and "Thinking" and "FAQ" all push down the one thing that matters: Book a Call.

**Recommended nav:** Services · Work · Pricing · About → **Book a Call** (primary). Fold Thinking/Writing into Services or kill them.

### H2. Philosophical quote dividers are conversion speed bumps

You have a `<QuoteDivider>` **between nearly every section** — Marcus Aurelius, Camus, Nietzsche, Simone de Beauvoir, Oscar Wilde, etc. Nine quote breaks on the page.

A buyer scrolling to evaluate "can she build me pipeline" does not need to pause and read Aristotle. These make the site feel like a personal blog, not a revenue service. They also push Contact/Pricing/Case Studies further below the fold.

**Fix:** Keep ONE (at most) as a signature touch, probably near the bottom. Delete the other eight. You'll save ~1,500px of scroll between hero and pricing.

### H3. "Writer first. Strategist always." is repeated four times

Hero, writing section eyebrow, writing section repeat, about section subtitle. When you repeat your tagline four times on one page, it starts to feel like you're convincing yourself. Once is a tagline. Four times is anxiety.

Keep the hero instance. Delete the others.

### H4. The services grid reads like a capabilities checklist, not an outcome menu

Six cards titled: COPYWRITING & GHOSTWRITING · DEMAND GENERATION · ABM STRATEGY · FRACTIONAL GROWTH LEADERSHIP · BRAND VOICE & MESSAGING · SALES ENABLEMENT.

These are categories, not offers. A buyer doesn't wake up thinking "I need Sales Enablement." They think "our reps keep losing at the buying-committee stage." Rewrite the titles to match the pain:

- ❌ "Sales Enablement" → ✅ "When reps keep losing at buying committee"
- ❌ "Demand Generation" → ✅ "When your pipeline dried up last quarter"
- ❌ "Brand Voice & Messaging" → ✅ "When your copy sounds like everyone else's"

Pain-triggered copy converts 2–3× better than capability-triggered copy.

### H5. Case studies bury the metric and headline the setup

Current hierarchy inside each case card: badge metric → subtitle → **title → bullets → outcome box**. The big $12M+ / 3.2× / 68% number is there but the *outcome paragraph* — the part a buyer actually wants — is the last thing on the card in a smaller gray font.

**Fix card hierarchy:**
1. Client name (or industry + stage if anonymized: "Series B cybersecurity")
2. One-sentence outcome in a large serif pull quote
3. Metric badge
4. Bullets collapsed behind "See how" toggle

Also: a card titled "ABM System That Converts" with no client, no date, no industry, and no link to a full case page is indistinguishable from marketing copy. Add *one* link per card to a full case page — even if it's a modal with more detail.

### H6. The pricing page buries the anchor

Reading order on the pricing cards is: tag → title → price → description → bullets → CTA. By the time a buyer sees the $2K/mo price, they've already read the tag and title, and they're evaluating whether to keep reading. The price should lead.

Also — the CTA underneath each card ("Or schedule a call first →") competes with the primary Stripe button. You're telling buyers "don't buy yet." Pick one path per tier:

- Self-serve tier: primary Stripe, no "schedule a call" escape
- Enterprise tier: primary Calendly, no Stripe (you're not taking $5K/mo via a Stripe Payment Link without a scoping call)

### H7. No mobile viewport verification in this conversation — and the hero will break

Hero `font-size: clamp(5rem, 16vw, 18rem)`. At 375px viewport, that's **60px minimum**. "WORDS THAT MOVE PIPELINE" wraps in unpredictable ways — "MOVE" is on its own line by design, but "WORDS THAT" might wrap to two lines on small screens, making the headline eat 6–7 lines of vertical space before the stats grid even starts.

**Verify on 375px / 390px / 414px viewports.** Fix the `clamp()` minimum to something closer to 3.5rem.

Also: the 4-column stats grid becomes 2×2 on mobile via `sm:grid-cols-4`, but there's no check that the numbers fit at 47vw width. "$40M+" in Bebas Neue 4xl might overflow horizontally.

### H8. The marquee appears twice on the same page

One after the hero, one after pricing. It's the same 12 words in a loop. Second instance adds nothing and pads scroll height by ~80px. Delete one.

### H9. Philosophical principles section is ego, not sales

"Pipeline is the product. Brand creates perceived value. Clarity converts."

These read like they belong in your LinkedIn pinned post, not on a sales page. They tell the buyer what *you* believe. They don't tell the buyer what *they* get.

**Option A:** Delete the section entirely. Scroll depth to contact shortens by ~700px.
**Option B:** Convert to "How I work" with tangible process (Week 1: diagnostic. Week 2: ICP rebuild. Week 3: message stack. etc.).

### H10. CTAs lack urgency or specificity

Every primary CTA is "Book a Strategy Call." Every secondary is "Explore Services." No friction reducer. No expectation-setter.

Examples of stronger CTA copy:
- "Book a 30-min pipeline teardown" (tells them the duration + what they'll get)
- "See what I'd audit on your site" (makes it about them)
- "Get a loom review of your funnel — free" (reduces commitment friction)

### H11. SEO title is a job title, not a search intent

`<title>MK Parrish — Growth Marketing, ABM & Fractional CMO</title>`

Buyers google "fractional CMO for B2B SaaS" or "demand gen consultant NYC" — not "MK Parrish." The title tag should be built around what a buyer types into Google.

**Better:** `Fractional CMO & Demand Gen Consultant — MK Parrish`

---

# 🟡 NICE TO HAVE — Polish after the above ships

### N1. FAQ uses HTML accordions — verify keyboard accessibility and no focus traps

### N2. Grain overlay `body::before` is at `opacity: 0.028` — invisible on most monitors. Either raise to 0.04–0.05 or remove. Right now you're serving a texture nobody sees.

### N3. The "Final impression" pull quote at the bottom of Contact is beautiful but buries the contact info on mobile (it stacks below the email/LinkedIn/phone block). Swap stacking order on mobile.

### N4. Footer has "Growth marketer + strategist + writer" — this contradicts the hero positioning of "Writer first. Strategist always." Align.

### N5. Phone number `347.853.4238` displayed with periods. Use hyphens or parens — periods get auto-linked as URLs by some email clients and copy/paste awkwardly.

### N6. Email is `mkp414@icloud.com`. A personal iCloud address is a tiny but real trust signal issue for enterprise buyers doing $10K+ deals. Consider `hello@mkparrish.com` or `mk@mkparrish.com`.

### N7. The pink glow gradient in the hero is pretty. It's also 60vh tall and adds nothing above the stats. Shorten to 40vh or shift it behind the headline instead of over it.

### N8. The "Also available à la carte" list of 12 service names is a wall of text. Buyers scan, they don't read grids of 12. Reduce to 6 or delete.

### N9. Featured Writing cards link nowhere. If the essays exist, link them. If they don't, delete the section — an essay titled "Pipeline, Prestige, and the Psychology of Value" with no href is just decoration.

### N10. The H3Script (Playfair italic) subtitles pattern after each H2 is used 7+ times and starts to feel like a tic. Vary the page rhythm — not every section needs a Bebas headline + Playfair italic subtitle.

### N11. No analytics setup detected in `app/layout.tsx`. You're deploying a sales site with no idea which sections people bounce from. Add Vercel Analytics (free, one line) or Plausible.

### N12. No OpenGraph image. Link previews in LinkedIn/Slack/iMessage will be naked.

---

# Summary — ship order

1. **Hour 1:** Fix C1 (`\u2014` rendering), C5 (STRIPE_WRITING placeholder), C2 (remove "I don't apply for roles"), C6 (unify SKU names).
2. **Hour 2–4:** H1 (nav), H2 (delete 8 of 9 quote dividers), H3 (de-dupe tagline), H7 (mobile hero verify), H8 (delete second marquee).
3. **Day 2:** C3 (rethink $250 SKU), C4 (get 1 named testimonial), H4 (pain-driven service titles), H5 (case study hierarchy), H6 (pricing card cleanup).
4. **Week 1:** Everything under Nice to Have + analytics + OG image.

**If you fix only 3 things:** C1, C2, C4 (real names on testimonials). Those are the bleeders.
