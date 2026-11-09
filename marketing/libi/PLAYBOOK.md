# LIBI Membership Dinner: "Win a Mercedes Weekend"

**Event:** LIBI November General Membership Dinner, Tuesday Nov 10, 2026
**You represent:** Mercedes-Benz of Smithtown and Competition Automotive Group
**Landing page:** https://www.mkparrish.com/libi (it goes live when this PR merges)
**Printables:** `output/libi/`, also online at `mkparrish.com/libi/kit/` (e.g. `/libi/kit/phone-lockscreen.png`, `/libi/kit/table-sign-letter.pdf`). Rebuild with `node scripts/libi/build.mjs`.

---

## The idea in one line

Everyone who scans enters to win a **48-hour Mercedes weekend**, an extended test drive of the car or van they choose. They also get two **member offers they can only use by calling you**: $1,500 off MSRP through Nov 30, and an extra $500 on Sprinter vans for NAHB members. Each entrant gets a share link, and **every friend who enters with it earns them another entry**, so the room recruits for you.

### Why this makes money

| Lever | Why it works on builders |
| --- | --- |
| **The prize is a test drive** | It costs the store a weekend of a demo. The winner usually buys or leases, and the photo of them in it sells for you on social. |
| **$1,500 off by Nov 30** | It's the same LIBI offer from the Sept 29 golf outing, so the deadline is real. Three weeks of urgency for every lead. |
| **+$500 NAHB Sprinter bonus** | LIBI is the local NAHB affiliate, so its members are NAHB members too (confirm eligibility on the NAHB page). Most of them don't know this program exists ([nahb.org/mbvans](https://www.nahb.org/nahb-community/member-benefits/savings/mercedes-benz-incentive)). It stacks on published cash, APR and lease offers. Builders and subs run vans. |
| **Fleet equity check** | One builder can mean 3–10 vehicles. "What's each truck worth today?" opens a fleet conversation without a hard pitch. |
| **Year-end timing** | Business owners shop vehicles in Nov–Dec for tax planning. You mention it; their CPA closes it. Never give tax advice yourself: say "ask your CPA about Section 179." |
| **Share link + "who else needs a car?"** | Builders know people buying cars every week: partners, foremen, and home buyers at closing. Every referral is a warm lead with your name on it. |
| **Whole group in one call** | Their spouse wants a BMW, their kid a Subaru, their foreman a Genesis? You introduce the right colleague and ask your manager about split or referral credit. You stay the LIBI point person for the whole group. |

---

## ✅ Tonight (Nov 9): to-do list

1. **Merge the PR** so `mkparrish.com/libi` is live, then open it on your phone and submit one test entry. The lead email should reach both of your inboxes within a minute. (The site's email service is already set up on Vercel.)
2. **Print** (Staples, or at home on heavy cardstock):
   - `output/libi/table-sign-letter.pdf`: 2–4 copies for 8.5x11 acrylic stands (about $5 each at Staples).
   - `output/libi/handout-cards-10up-letter.pdf`: 5–10 sheets (50–100 cards). Avery 8371/5371 business-card stock works, or cut cardstock.
3. **Set your lock screen** to `output/libi/phone-lockscreen.png`. When someone asks for your card, hold up your phone: "Scan this, you're entered."
4. **Text your sales manager first thing tomorrow** (copy-paste):
   > "Morning! I'm at the LIBI dinner tonight. Can I confirm two things: (1) the $1,500-off-MSRP LIBI offer from the golf outing is still good through 11/30, and (2) I can give one winner a 48-hour weekend test drive from our demo fleet, with the drawing on 11/17? I'm capturing leads with a QR code that sends everything to me."

   If either answer changes, update `app/libi/campaign.ts` (one place) and rebuild the printables. The page updates on deploy.
5. **Optional:** ask the LIBI office whether you can put `output/libi/slide-16x9.png` on the room screen during announcements, or announce the drawing from the podium (30 seconds is enough; script below).

---

## 🎤 At the dinner

**Opener (10 seconds, no pitch):**
> "Hi, I'm MK from Mercedes-Benz of Smithtown. We're giving one LIBI member a Mercedes for the weekend. Want in? Just scan this."

**When they ask what's in it for them:**
> "Two things you get either way: $1,500 off any new car through the end of the month, and if you run vans, NAHB members get another $500 on a Sprinter. Most people in this room don't know that one."

**The fleet question. This one is worth thousands:**
> "How many vehicles does your company run? Most builders I talk to are sitting on equity in trucks they could swap before year-end. I'll run the numbers for free, no visit needed."

**The referral ask, as they finish entering:**
> "Your confirmation screen has a share link. Every person who enters with it gets you another entry. Send it to your foreman, your partner, whoever."

**30-second podium version (if offered):**
> "Good evening, I'm Mary Kate Parrish with Mercedes-Benz of Smithtown and Competition Automotive Group, a Long Island family business for over 65 years. One person in this room is going to drive a Mercedes for a weekend. A G-Class, an AMG, or a Sprinter for the jobsite. Scan the code on your table to enter. Every LIBI member also gets $1,500 off any new vehicle through November 30. Drawing's next Tuesday. Thank you!"

**Placement:** a sign on every table you can reach, one at the registration/check-in table, and one at the bar. People scan while they wait.

**On-the-spot rule:** for anyone who mentions a lease ending, a truck problem, or "my wife wants...", write a ⭐ on the back of their business card. Call those people first tomorrow.

---

## 📲 Every lead arrives like this

Subject: `🔥 HOT LIBI lead: Pat Builder (Acme Homes)`. HOT means they're buying now or soon, have a trade, want vans, or referred someone. It's followed by WARM and NURTURE. The email has **Call** and **Text them** buttons. The text is pre-written:

> "Hi Pat, it's MK from Mercedes-Benz of Smithtown. Great meeting you at LIBI tonight! You're entered for the Mercedes weekend (drawing Nov 17). Your $1,500 LIBI offer is good through Nov 30. Save my number!"

**Send that text to every lead before you go to sleep tonight.** Speed is the whole game.

If the room's signal is bad, the page has a backup. It opens a pre-written text to your work line with every detail filled in, so no lead gets lost. Every entry is also saved in the Vercel logs (search `LIBI_LEAD`).

The `src` on each lead shows which QR they scanned: `table`, `card`, `phone`, `slide`, `followup`, or `share` for a friend's link. That tells you what worked for next time.

---

## 📅 Follow-up sequence (matches your 1-2-4-7-14-21-30 cadence)

| When | Channel | Message |
| --- | --- | --- |
| **Nov 10, same night** | Text | The pre-written text above. |
| **Nov 11 (Day 1)** | Call HOT leads, text the rest | "Following up from LIBI. Want me to run your fleet equity check? Text me the year, model and mileage of each vehicle and I'll send you numbers today." |
| **Nov 13 (Day 3)** | Email | Subject: *"The $500 most LIBI members don't know about."* Explain the NAHB Sprinter program, mention that year-end is when owners line up purchases ("talk to your CPA about timing"), and close with "reply with your vans and I'll price them." |
| **Nov 17 (Day 7): DRAWING** | Text everyone + LinkedIn/IG | Run `node scripts/libi/draw.mjs entries.txt --draw` and screen-record it. To everyone else: "Congrats to [winner]! You didn't win, but your $1,500 is still good for 13 more days. Want to see what it does on a GLE or a Sprinter?" |
| **Nov 20** | Text | Weekend invite: "I'm holding two test-drive slots Saturday for LIBI members. Want one? I'll have it pulled up." Link `mkparrish.com/test-drive`. |
| **Nov 24 (Thanksgiving week)** | Text | "Grateful to have met so many LIBI members this month. Quick reminder: the $1,500 ends Monday." |
| **Nov 28–30** | Call + text | Last call. "Your LIBI $1,500 ends tonight. If you're even 50/50, let me lock in the numbers and you can decide next week." (Confirm with your manager how to honor a locked quote.) |
| **Dec 1–20** | Email | Year-end fleet push: "Vans in service by Dec 31." Bring the NAHB $500 and fleet incentives, and say "ask your CPA." |
| **January** | LIBI Annual Dinner | Come back as the known "LIBI car person" with the winner's story. |

---

## 🏗️ The bigger play: Builder Closing Partner program (pitch it in follow-ups)

Builders hand over keys to new homeowners every month, and **new homeowners buy cars**. Offer any LIBI builder who wants it:

- A co-branded **"Welcome Home" card** for their closing gift bag: a QR code to a VIP test drive with you, using the `?ref=` code you give them.
- Their buyers get VIP treatment, and the builder looks generous at no cost to them.
- The builder gets credit for every buyer who comes in (ask your manager what referral thank-you is allowed).

One builder closing 30 homes a year is 30 warm introductions a year. Five builders is a pipeline. To make a builder their own code, use any short word (e.g. `?ref=ACMEHOMES`). It shows up as "Came from share code" on every lead.

---

## Changing anything

| What | Where |
| --- | --- |
| Prize, offer amounts, dates, stores, phone numbers | `app/libi/campaign.ts` |
| The page | `app/libi/page.tsx`, `app/libi/LibiForm.tsx` |
| Lead emails (to you and to the entrant) | `app/api/libi/route.ts` |
| Where leads go | Vercel env `LIBI_NOTIFY_EMAILS` (comma-separated). Default: your `LEAD_NOTIFY_EMAIL` inbox + `mparrish@mbofsmithtown.com` |
| QR codes and printables | `node scripts/libi/build.mjs` → `output/libi/` |
| Drawing tally | `node scripts/libi/draw.mjs entries.txt [--draw]` |

**Compliance notes:** the drawing has no purchase requirement, is open to adults 21+ with a license and insurance, and has one winner. That's printed on the page and in the confirmation email. The prize value stays far below New York's $5,000 threshold, so no registration is required. The consent checkbox covers texting, and you honor STOP right away. Get your manager's OK on any offer before it goes out.
