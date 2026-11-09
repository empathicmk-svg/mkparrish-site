# LIBI Membership Dinner: the Competition Builder Pass

**Event:** LIBI November General Membership Dinner, Tuesday Nov 10, 2026
**Brand:** Competition Automotive Group (Mercedes-Benz of Smithtown, Mercedes-Benz of Huntington, Competition BMW, Genesis of Smithtown, Competition Subaru), with MK Parrish as the LIBI contact
**Landing page:** https://www.mkparrish.com/libi (it goes live when the PR merges)
**Distribution:** digital only. No printed signs or cards: QR codes on your phone's lock screen, the room's screen, a square QR card you text or AirDrop, and a story image for social. Files are in `output/libi/` (rebuild with `node scripts/libi/build.mjs`).
**For your manager:** `output/libi/manager-one-pager.pdf` is the whole offer on one page, with approval checkboxes.
**Contact on every asset:** MK's cell, 347.853.4238

---

## The idea in one line

Every LIBI member scans, fills in 30 seconds of info, and **swipes to reveal their own Competition Builder Pass** on their phone. It's a personal pass in Competition's colors (dark navy and white), with their name and pass number, valid at all five Competition stores through Dec 31. Every pass carries a **VIP Test Drive Certificate**: a private, by-appointment drive in the Mercedes they choose, redeemed in the showroom. Each pass also has a share code. When a colleague activates a pass with it, **both certificates upgrade to Gold** (a complimentary detail when they come in), so the room recruits for you.

**Scan · Swipe · Share** is the whole pitch.

### Why a certificate instead of the Mercedes weekend

The weekend drawing asked management for a demo car off the lot for 48 hours and a sweepstakes to run. The certificate asks for neither:

- **Nothing leaves the lot overnight.** It's a normal accompanied test drive, booked ahead.
- **It's a coupon, not a drawing.** Everyone gets one, so there's no winner to pick and no sweepstakes rules.
- **It gets them in the door.** It can only be redeemed in the showroom, and their current vehicle is on the lot to appraise while they drive.
- **Sharing has a real payoff.** The Gold upgrade is yours and your manager's to set in one line (`GOLD.reward` in `app/libi/campaign.ts`).

### What the pass unlocks

| Perk | Why it works on builders |
| --- | --- |
| **VIP builder pricing at all five stores** | You work their numbers with management yourself. It's a status perk, not a coupon, and every redemption runs through you. |
| **+$500 on Sprinter vans** | LIBI is the local NAHB affiliate, so its members are NAHB members, and NAHB members get an extra $500 on any new Mercedes-Benz commercial van, on top of published offers ([NAHB program page](https://www.nahb.org/nahb-community/member-benefits/savings/mercedes-benz-incentive)). Most of the room doesn't know about it. |
| **Free fleet equity report** | One builder can mean 3–10 vehicles. "What's every truck worth today?" opens a fleet conversation without a pitch. |
| **VIP Test Drive Certificate** | A private drive in the model they choose, pulled up and ready, with a written appraisal of their trade or fleet. It costs the store a normal test drive and it books a showroom appointment. |
| **Gold upgrade for sharing** | When a colleague activates a pass with their code, both go Gold: a complimentary detail on the vehicle they arrive in. Someone who arrives through a share link starts at Gold. |
| **Optional dollar bonus** | If your manager approves one (e.g. "$1,000 Builder Bonus"), set `PASS.bonus` in `app/libi/campaign.ts` and run the build. It then shows on the pass, the page, the emails and every printable. |

### Why it works

- **People keep it.** A revealed pass with their name on it gets saved to their camera roll (the "Save my pass" button). A business card gets thrown away.
- **One person for the whole group.** You're the LIBI contact for all five stores. Whatever their spouse, kids or foreman wants, you make the introduction. Ask your manager about split or referral credit.
- **Year-end.** Business owners line up vehicle purchases in Nov–Dec. You mention the timing, and their CPA decides. Never give tax advice yourself: say "ask your CPA about Section 179."

---

## ✅ Tonight (Nov 9)

1. **Get your manager's yes first.** Send `output/libi/manager-one-pager.pdf`. If they change the Gold reward or add a dollar bonus, it's one line each in `app/libi/campaign.ts`, then `node scripts/libi/build.mjs`.
1. **Merge the PR.** Then open `mkparrish.com/libi` on your phone, unlock a pass for yourself, and swipe to reveal it. The lead email should reach both of your inboxes within a minute. Email is already set up on the live site.
2. **Set your lock screen** to `phone-lockscreen.png`. When someone asks for your card, hold up your phone: "Scan this, it's your Builder Pass."
3. **Save `share-card-square.png` to your photos.** Text or AirDrop it to anyone you talk to; they scan it right off their own phone or tap the link.
4. **Text your sales manager with the one-pager attached:**
   > "Morning! For the LIBI dinner tonight I have a 'Competition Builder Pass' for members. No loaner and no drawing: every pass has a VIP Test Drive Certificate they redeem in the showroom by appointment, plus the VIP pricing review, the NAHB $500 Sprinter bonus and a fleet equity report. If they share their code and bring in a colleague, both get a complimentary detail when they come in. One-pager attached. OK to run it? And can we add a dollar Builder Bonus through 12/31?"
5. **Bring the iPad.** Open `ipad-display.png` full screen (brightness up, auto-lock off) and stand it at your seat or the registration table. Guests scan it with their own phones.

---

## 🎤 At the dinner

**Opener (10 seconds):**
> "Hi, I'm MK with Competition Automotive Group. We made LIBI members a Builder Pass. Scan this, swipe to reveal it, and it's yours. It works at all five of our stores."

**When they ask what it does:**
> "It gets you VIP builder pricing. I work your numbers with management myself. If you run vans, NAHB members get another $500 on a Sprinter, and most people in this room don't know that. And your pass has a certificate on it: pick any Mercedes, I'll have it pulled up for a private drive."

**The fleet question. This one is worth thousands:**
> "How many vehicles does your company run? I'll do a free equity report on all of them. Most builders are sitting on equity they could use before year-end."

**The pass-it-on ask, as they finish:**
> "Your pass has a share code. When someone activates a pass with it, you both go Gold: we detail your car while you take your drive. Send it to your foreman, your partner, whoever."

**30-second podium version (if offered):**
> "Good evening, I'm Mary Kate Parrish with Competition Automotive Group: Mercedes-Benz, BMW, Genesis and Subaru, a Long Island family business for over 65 years. Tonight every LIBI member gets a Builder Pass. Scan the code on my iPad and swipe to reveal it. It's VIP builder pricing at all five of our stores, and every pass comes with a private drive in the Mercedes you choose. Share your code with a colleague and you both go Gold. Thank you!"

**How the QR reaches people (no printing):**
- **Your phone:** the lock screen is the QR. Hold it up mid-conversation.
- **AirDrop or text:** send the square QR card to everyone you meet, so they can scan it later or pass it to a partner.
- **Your iPad:** the QR full screen at your seat or the registration table.
- **Social:** post the story image to Instagram, LinkedIn and Facebook tonight, tagged with LIBI.

**On the spot:** if someone mentions a lease ending, a truck problem, or "my wife wants...", star their contact in your phone and call them first tomorrow.

---

## 📲 Every lead arrives like this

Subject: `🔥 HOT Builder Pass lead: Pat Builder (Acme Homes)`. HOT means they're buying now or soon, have a trade, want vans, or referred someone. It's followed by WARM and NURTURE. The email shows their certificate level, and when someone comes in on a share code it tells you whose certificate to upgrade to Gold, so you can text them the good news. The email has **Call** and **Text them** buttons, and the text is pre-written:

> "Hi Pat, it's MK from Mercedes-Benz of Smithtown. Great meeting you at LIBI tonight! Your Competition Builder Pass is PAT396, good at all five Competition stores through Dec 31, and it includes your Silver Test Drive Certificate. Which Mercedes should I have pulled up for you, and what day works? Save my number!"

**Send that text to every lead before you go to sleep tomorrow.** Speed is the whole game.

The entrant also gets an email that looks like their pass, with their pass number, their certificate, the perks, and their share link. If the room's signal is bad, the page has a backup: a pre-written text to your cell (347.853.4238) with every detail filled in, so no lead gets lost. Every pass is also saved in the Vercel logs (search `LIBI_LEAD`).

The `src` on each lead shows which QR they scanned: `phone` (lock screen), `ipad`, `text` (QR card you sent), `social`, `followup`, or `share` for a friend's link.

---

## 📅 Follow-up sequence (matches your 1-2-4-7-14-21-30 cadence)

| When | Channel | Message |
| --- | --- | --- |
| **Nov 10, same night** | Text | The pre-written text above. |
| **Nov 11 (Day 1)** | Call HOT leads, text the rest | "Following up from LIBI. Want your free fleet equity report? Text me the year, model and mileage of each vehicle and I'll send numbers today." |
| **Nov 13 (Day 3)** | Email | Subject: *"The $500 most LIBI members don't know about."* Cover the NAHB Sprinter program and year-end timing ("talk to your CPA"), then: "reply with your vans and I'll price them." |
| **Nov 17 (Day 7): Gold day** | Text everyone | Run `node scripts/libi/upgrades.mjs entries.txt` to see who is Gold. To Gold holders: "Your certificate went Gold: we'll detail your car while you drive. What day works?" To Silver: "One share gets you to Gold. Here's your link again." |
| **Nov 20** | Text | "I'm holding two test-drive slots Saturday for Builder Pass holders. Want one? I'll have it pulled up." Link `mkparrish.com/test-drive`. |
| **Nov 24 (Thanksgiving week)** | Text | "Grateful to have met so many LIBI members this month. Your pass is good through Dec 31. Whenever you're ready, I'm here." |
| **Dec 1–20** | Email + call | Year-end fleet push: "Vans in service by Dec 31." Cover the NAHB $500 and fleet incentives, and say "ask your CPA." |
| **Dec 28–31** | Text | "Last week for your Builder Pass. If you're even 50/50, let me lock in the numbers." |
| **January** | LIBI Annual Dinner | Come back as the LIBI car person, with a customer story and a 2027 pass. |

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
| Pass name, bonus, valid-through date, perks, the certificate (`CERT`), the Gold reward (`GOLD`), stores, phone numbers | `app/libi/campaign.ts` |
| The page, the swipe-to-reveal pass and the certificate coupon | `app/libi/page.tsx`, `app/libi/LibiForm.tsx`, `app/libi/BuilderPass.tsx` |
| The flow-line art (the page and the images both use it) | `app/libi/flowLines.js` |
| Lead emails (to you and to the entrant) | `app/api/libi/route.ts` |
| Where leads go | Vercel env `LIBI_NOTIFY_EMAILS` (comma-separated). Default: your `LEAD_NOTIFY_EMAIL` inbox + `mparrish@mbofsmithtown.com` |
| QR codes, images and the manager one-pager | `node scripts/libi/build.mjs` → `output/libi/` and `public/libi/kit/` |
| Who has gone Gold | `node scripts/libi/upgrades.mjs entries.txt` |

**Compliance notes:** there is no drawing and no prize, so there's nothing to register. The certificate has no purchase requirement and no cash value, is one per person, isn't transferable, and needs a valid driver's license for the drive. That's printed on the page and in the pass email. The consent checkbox covers texting, and you honor STOP right away. Get your manager's OK on the pricing wording, the Gold reward and any bonus before it goes out. Share codes aren't checked against a database, so confirm a Gold upgrade against your lead emails (or `upgrades.mjs`) when someone redeems.

**Brand colors:** dark navy (`#06142E` to `#1B3F7A`) and white, with a bright blue accent (`#5EB0FF`) and gold (`#F2C14E`) for the Gold certificate. They live in `--color-cag-*` in `app/globals.css`, `CAG` in `app/libi/BuilderPass.tsx`, and the top of `scripts/libi/build.mjs`. Montserrat stands in for the logo type. If marketing gives you the official hex codes or the logo file, swap them in those three places and rebuild.
