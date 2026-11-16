# MK Parrish · Luxury Concierge: brand and CTA playbook

The site's copy lives in `app/lib/brand.ts`. Change a line there and the homepage, concierge, hero and promotions all update together.

## The name and the line

- **Name:** MK Parrish
- **Descriptor:** Luxury Concierge
- **The Four C's:** Cars. Code. Content. Creative. Always in that order, always with periods.
- **Promise:** One concierge for the car, the code, the content and the creative.
- **Short form:** The Four C's, one concierge.

**Why "Code" and not "Coding":** "Code" is one syllable and a noun, like the other three C's. The set reads as a brand ("Cars. Code. Content. Creative.") rather than a list of services. "The Four C's" also borrows the language of diamonds (cut, color, clarity, carat), which signals luxury without saying it.

## The four lanes

| C | Tagline | What it covers | CTA | Goes to |
|---|---|---|---|---|
| Cars | Mercedes-Benz, handled with a straight answer. | Sales, leases, trade-ins and test drives at Mercedes-Benz of Smithtown | Reserve a test drive | `/test-drive` |
| Code | Websites engineered to convert. | Custom sites, redesigns, hosting and upkeep | Start your build | `/studio` |
| Content | Reels, posts and growth that get finished. | Social, short-form video, outbound and full-funnel growth | Grow your audience | `/growth` |
| Creative | Brand, voice and words people remember. | Positioning, messaging, copy, the audit, books and poems | Sharpen your brand | `/brand` |

## The CTA library

Use these exact words, so every page asks the same way.

| Use | CTA |
|---|---|
| Main ask, anywhere | **Book your concierge call** |
| Cars | **Reserve a test drive** |
| Code | **Start your build** |
| Creative entry offer | **Get the $97 audit** |
| Phone | **Call or text MK** |
| Lead magnet | **Get the free checklist** |
| Social | **Follow the feed** |

Rules:
- Start with a verb, keep it to five words or fewer, and say what happens next.
- Use one main CTA per section, plus at most one quieter secondary.
- Make the phone number tappable everywhere, as `tel:` and `sms:` links.

## Promotions (rotating rail on the homepage)

| Lane | Promotion | Button |
|---|---|---|
| Cars | Test drives any day at Mercedes-Benz of Smithtown. Ask for MK. | Reserve |
| Code | Founding Redesign: a few full site rebuilds this quarter, discounted. | Claim a spot |
| Creative | The 48-Hour Positioning Audit: $97, no call required. | Get the audit |
| Content | Free: the 12-point Positioning Checklist I run before client work. | Get it free |

## Ready-to-use lines

**Bios**
- Instagram / TikTok: `MK Parrish · Luxury Concierge 🖤 Cars. Code. Content. Creative. Mercedes-Benz of Smithtown · Call or text 347.853.4238`
- LinkedIn headline: `Luxury Concierge for Cars, Code, Content & Creative | Mercedes-Benz of Smithtown | Websites, growth and brand voice`
- YouTube (@mk.parrish): `The Four C's, one concierge: cars, code, content and creative. New videos from the showroom and the studio.`

**Email signature:** `MK Parrish · Luxury Concierge · Cars. Code. Content. Creative. · 347.853.4238 · mkparrish.com`

**Post sign-offs:** `Your concierge for the Four C's. Call or text MK.` / `Ask for MK.`

**Hooks**
- "One concierge. Four C's. Zero handoffs."
- "The car, the code, the content and the creative, from one desk."
- "Not an agency. Your concierge."

## Visual motifs

Thin white crosses, neon pink hearts and thin anchors (`app/components/home/Motifs.tsx`) appear as floating accents, the cross · heart · anchor divider between sections, and the frame of the neon quote sign. Keep them sparse: two to four per section at most, and never over body text.

## Quotes

The neon sign rotates MK's own lines, word for word from her books and poems (`NEON_LINES` in `app/lib/brand.ts`). Add new lines there, with the book or poem they come from.
