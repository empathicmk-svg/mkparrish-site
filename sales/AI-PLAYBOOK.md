# The AI Edge

Not a trick — leverage. Every one of these is work you'd do anyway, done in a
tenth the time. The salesperson who sends eight personalized follow-ups in the
time it takes everyone else to send one wins the month.

**Two rules before anything else:**

1. **Never paste customer PII into a chat window.** No full names, phone
   numbers, addresses, SSNs, credit tiers, or deal jackets. Use "the customer,"
   "a GLE owner," "a plumbing contractor." You get the same output without
   putting the store on the wrong side of privacy law or your DMS agreement.
2. **AI drafts, you verify.** Never let a model state a payment, rate, residual,
   or program rule to a customer without checking it against NetStar or the
   desk. A hallucinated number in a text message is a promise you have to eat.

---

## 1. The morning triage

> Here are my follow-ups due today, as an anonymized list — source, days since
> first contact, vehicle of interest, and my last note. Rank them by likelihood
> of setting an appointment today, and give me a one-line opener for each.
> Flag anyone I should stop chasing.

**Why it works:** you stop working the list top-to-bottom and start working it
by probability. Same 40 touches, more appointments.

## 2. Objection rehearsal (do this before the call, not after)

> Roleplay as a skeptical customer whose MY23 GLE lease matures in 90 days.
> You've gotten mailers from two other MB stores. Push back hard on payment and
> on why you should come in now instead of waiting. I'll practice — after each
> of my responses, rate it and tell me what a top performer would have said.

**Why it works:** you get 20 reps on the objection before it costs you a live
deal. Run it once per shift on whatever objection killed you last.

## 3. The follow-up that isn't "just checking in"

> Write three short follow-up texts to a customer who drove a GLC 300 on
> Saturday and said the payment was ~$80/month too high. Each should lead with
> something of value — a specific alternative structure, a different trim, or a
> reason to act this month. Under 40 words. No exclamation points. Don't state
> any specific payment figure; leave a blank I fill in from the desk.

**Why it works:** most follow-up dies because it has no reason to exist. This
gives every touch a payload.

## 4. Commercial research compression

> I'm calling the owner of a local SERVPRO franchise about a Sprinter 2500.
> Give me: the three ways a restoration business actually uses a cargo van, the
> two objections they'll raise about switching from a Transit, and the questions
> I should ask to size their fleet and replacement cycle. Be specific to the
> trade.

**Why it works:** B2B buyers can tell in ten seconds whether you understand
their business. This is how you sound like you've sold to their trade before.

## 5. The walkaround video script

> 45-second walkaround script for a GLE 350 for a customer who cares about
> third-row space and towing. Conversational, no jargon, ends with two specific
> appointment times.

**Why it works:** video follow-up massively outperforms text. The bottleneck is
knowing what to say — remove it and you'll actually send them.

## 6. Weekly self-review

> Here's my week: touches, conversations, appointments set, appointments shown,
> units. [numbers]. Where is my funnel actually leaking, and what one change
> next week fixes it? Don't be encouraging — be accurate.

**Why it works:** the number you're worst at is the one you avoid looking at.

---

## Wiring it into the tools

```bash
# Pipe your due list straight into a triage prompt
node sales/pipeline.mjs due | pbcopy      # macOS
node sales/pipeline.mjs due | clip        # Windows
```

Then paste under prompt #1. The pipeline stores names only — no phone numbers —
so this stays clean by design.

## What NOT to automate

- **The call itself.** Voice cloning and AI dialers for personal outreach are a
  legal minefield (TCPA, NY consent rules) and will end your license faster than
  they'll make you money.
- **Fake reviews or fabricated urgency.** "Someone else is looking at this car"
  when nobody is — customers verify, and it costs you the referral tree.
- **Anything that touches customer data outside approved dealer systems.**
  If it isn't in the CRM, it doesn't exist. If it leaves the CRM, that's a
  problem.

The edge is speed and preparation, not deception. Deception doesn't scale —
a referral pipeline does.
