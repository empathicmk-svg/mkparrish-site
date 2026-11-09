# LIBI Membership Dinner: the Competition Builder Pass

**Event:** LIBI November General Membership Dinner, Tuesday Nov 10, 2026
**Brand:** Competition Automotive Group (Mercedes-Benz of Smithtown, Mercedes-Benz of Huntington, Competition BMW, Genesis of Smithtown, Competition Subaru), with MK Parrish as the LIBI contact
**Landing page:** https://www.mkparrish.com/libi (it goes live when the PR merges)
**Distribution:** digital only. No printed signs or cards: QR codes on your phone's lock screen, the room's screen, a square QR card you text or AirDrop, and a story image for social. Files are in `output/libi/` (rebuild with `node scripts/libi/build.mjs`).
**Contact on every asset:** MK's cell, 347.853.4238

---

## The idea in one line

Every LIBI member scans, fills in 30 seconds of info, and **scratches off their own Competition Builder Pass**. It's a personal pass in Competition's own colors (black, white, steel blue and silver), with their name and pass number. It's valid at all five Competition stores through Dec 31, and every pass is entered to win a **48-hour Mercedes weekend**. Each pass comes with a share link, and every person who gets a pass through it adds a drawing entry for the sharer, so the room recruits for you.

**Scan · Scratch · Save** is the whole pitch.

### What the pass unlocks

| Perk | Why it works on builders |
| --- | --- |
| **VIP builder pricing at all five stores** | You work their numbers with management yourself. It's a status perk, not a coupon, and every redemption runs through you. |
| **+$500 on Sprinter vans** | LIBI is the local NAHB affiliate, so its members are NAHB members, and NAHB members get an extra $500 on any new Mercedes-Benz commercial van, on top of published offers ([NAHB program page](https://www.nahb.org/nahb-community/member-benefits/savings/mercedes-benz-incentive)). Most of the room doesn't know about it. |
| **Free fleet equity report** | One builder can mean 3–10 vehicles. "What's every truck worth today?" opens a fleet conversation without a pitch. |
| **Mercedes weekend drawing** | The prize is an extended test drive that costs the store a weekend of a demo car, and winners usually buy. |
| **Optional dollar bonus** | If your manager approves one (e.g. "$1,000 Builder Bonus"), set `PASS.bonus` in `app/libi/campaign.ts` and run the build. It then shows on the pass, the page, the emails and every printable. |

### Why it works

- **People keep it.** A scratched pass with their name on it gets saved to their camera roll (the "Save my pass" button). A business card gets thrown away.
- **One person for the whole group.** You're the LIBI contact for all five stores. Whatever their spouse, kids or foreman wants, you make the introduction. Ask your manager about split or referral credit.
- **Year-end.** Business owners line up vehicle purchases in Nov–Dec. You mention the timing, and their CPA decides. Never give tax advice yourself: say "ask your CPA about Section 179."

---

## ✅ Tonight (Nov 9)

1. **Merge the PR.** Then open `mkparrish.com/libi` on your phone, unlock a pass for yourself, and scratch it. The lead email should reach both of your inboxes within a minute. Email is already set up on the live site.
2. **Set your lock screen** to `phone-lockscreen.png`. When someone asks for your card, hold up your phone: "Scan this, it's your Builder Pass."
3. **Save `share-card-square.png` to your photos.** Text or AirDrop it to anyone you talk to; they scan it right off their own phone or tap the link.
4. **Text your sales manager first thing tomorrow:**
   > "Morning! I'm at the LIBI dinner tonight with a 'Competition Builder Pass': VIP pricing review at all five stores, the NAHB $500 Sprinter bonus, a free fleet equity report, and one winner gets a 48-hour weekend test drive (drawing 11/17). Is the weekend loaner OK? And can we add a dollar Builder Bonus for pass holders through 12/31?"
5. **Optional:** ask the LIBI office to put `slide-16x9.png` on the room screen during announcements.

---

## 🎤 At the dinner

**Opener (10 seconds):**
> "Hi, I'm MK with Competition Automotive Group. We made LIBI members a Builder Pass. Scan this, scratch it, and it's yours. It works at all five of our stores."

**When they ask what it does:**
> "It gets you VIP builder pricing. I work your numbers with management myself. If you run vans, NAHB members get another $500 on a Sprinter, and most people in this room don't know that. Plus every pass is in the drawing for a Mercedes weekend."

**The fleet question. This one is worth thousands:**
> "How many vehicles does your company run? I'll do a free equity report on all of them. Most builders are sitting on equity they could use before year-end."

**The pass-it-on ask, as they finish:**
> "Your pass has a share link. Everyone who gets a pass through it adds an entry for you. Send it to your foreman, your partner, whoever."

**30-second podium version (if offered):**
> "Good evening, I'm Mary Kate Parrish with Competition Automotive Group: Mercedes-Benz, BMW, Genesis and Subaru, a Long Island family business for over 65 years. Tonight every LIBI member gets a Builder Pass. Scan the code on the screen and scratch it off. It's VIP builder pricing at all five of our stores, and one of you is going to drive a Mercedes for a weekend. Drawing's next Tuesday. Thank you!"

**How the QR reaches people (no printing):**
- **Your phone:** the lock screen is the QR. Hold it up mid-conversation.
- **AirDrop or text:** send the square QR card to everyone you meet, so they can scan it later or pass it to a partner.
- **The room's screen:** ask the LIBI office to show the slide during announcements.
- **Social:** post the story image to Instagram, LinkedIn and Facebook tonight, tagged with LIBI.

**On the spot:** if someone mentions a lease ending, a truck problem, or "my wife wants...", star their contact in your phone and call them first tomorrow.

---

## 📲 Every lead arrives like this

Subject: `🔥 HOT Builder Pass lead: Pat Builder (Acme Homes)`. HOT means they're buying now or soon, have a trade, want vans, or referred someone. It's followed by WARM and NURTURE. The email has **Call** and **Text them** buttons, and the text is pre-written:

> "Hi Pat, it's MK from Mercedes-Benz of Smithtown. Great meeting you at LIBI tonight! Your Competition Builder Pass is PAT396, good at all five Competition stores through Dec 31, and you're in the Mercedes weekend drawing (Nov 17). Save my number!"

**Send that text to every lead before you go to sleep tomorrow.** Speed is the whole game.

The entrant also gets an email that looks like their pass, with their pass number, the perks, and their share link. If the room's signal is bad, the page has a backup: a pre-written text to your cell (347.853.4238) with every detail filled in, so no lead gets lost. Every pass is also saved in the Vercel logs (search `LIBI_LEAD`).

The `src` on each lead shows which QR they scanned: `phone` (lock screen), `slide`, `text` (QR card you sent), `social`, `followup`, or `share` for a friend's link.

---

## 📅 Follow-up sequence (matches your 1-2-4-7-14-21-30 cadence)

| When | Channel | Message |
| --- | --- | --- |
| **Nov 10, same night** | Text | The pre-written text above. |
| **Nov 11 (Day 1)** | Call HOT leads, text the rest | "Following up from LIBI. Want your free fleet equity report? Text me the year, model and mileage of each vehicle and I'll send numbers today." |
| **Nov 13 (Day 3)** | Email | Subject: *"The $500 most LIBI members don't know about."* Cover the NAHB Sprinter program and year-end timing ("talk to your CPA"), then: "reply with your vans and I'll price them." |
| **Nov 17 (Day 7): DRAWING** | Text everyone + LinkedIn/IG | Run `node scripts/libi/draw.mjs entries.txt --draw` and screen-record it. To everyone else: "Congrats to [winner]! Your Builder Pass is still live through Dec 31. Want to put it to work on a GLE or a Sprinter?" |
| **Nov 20** | Text | "I'm holding two test-drive slots Saturday for Builder Pass holders. Want one? I'll have it pulled up." Link `mkparrish.com/test-drive`. |
| **Nov 24 (Thanksgiving week)** | Text | "Grateful to have met so many LIBI members this month. Your pass is good through Dec 31. Whenever you're ready, I'm here." |
| **Dec 1–20** | Email + call | Year-end fleet push: "Vans in service by Dec 31." Cover the NAHB $500 and fleet incentives, and say "ask your CPA." |
| **Dec 28–31** | Text | "Last week for your Builder Pass. If you're even 50/50, let me lock in the numbers." |
| **January** | LIBI Annual Dinner | Come back as the LIBI car person, with the winner's story and a 2027 pass. |

---

## 🏗️ The bigger play: Builder Closing Partner program (pitch it in follow-ups)

Builders hand over keys every month, and **new homeowners buy cars**. Offer any LIBI builder their own pass link for closing gift bags:

- Give each builder a code, e.g. `mkparrish.com/libi?ref=ACMEHOMES`. Every buyer who scans gets a Builder Pass, and the lead shows "Came from pass link: ACMEHOMES."
- Buyers get VIP treatment, and the builder looks generous at no cost to them.
- Ask your manager what referral thank-you is allowed for builders who send buyers.

One builder closing 30 homes a year is 30 warm introductions a year. Five builders is a pipeline.

---

## Changing anything

| What | Where |
| --- | --- |
| Pass name, bonus, valid-through date, perks, prize, stores, phone numbers | `app/libi/campaign.ts` |
| The page and the scratch-off pass | `app/libi/page.tsx`, `app/libi/LibiForm.tsx`, `app/libi/BuilderPass.tsx` |
| The flow-line art (the page and the images both use it) | `app/libi/flowLines.js` |
| Lead emails (to you and to the entrant) | `app/api/libi/route.ts` |
| Where leads go | Vercel env `LIBI_NOTIFY_EMAILS` (comma-separated). Default: your `LEAD_NOTIFY_EMAIL` inbox + `mparrish@mbofsmithtown.com` |
| QR codes and images | `node scripts/libi/build.mjs` → `output/libi/` and `public/libi/kit/` |
| Drawing tally | `node scripts/libi/draw.mjs entries.txt [--draw]` |

**Compliance notes:** the drawing has no purchase requirement, is open to adults 21+ with a license and insurance, and has one winner. That's printed on the page and in the pass email. The prize value stays far below New York's $5,000 threshold, so no registration is required. The consent checkbox covers texting, and you honor STOP right away. Get your manager's OK on any pricing or bonus before it goes out.

**Brand colors:** black, white, steel blue (`#7D96A8`) and silver (`#A9ADB1`), taken from the Competition Automotive Group Facebook header: a white COMPETITION over a steel-blue AUTOMOTIVE GROUP, with a silver swoosh that the silver flow lines echo. They live in `--color-cag-*` in `app/globals.css`, `CAG` in `app/libi/BuilderPass.tsx`, and the top of `scripts/libi/build.mjs`. Montserrat stands in for the logo type. If marketing gives you the official hex codes or the logo file, swap them in those three places and rebuild.
