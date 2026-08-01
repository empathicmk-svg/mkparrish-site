# Sales Toolkit — 15 units, August 2026

Zero dependencies. Plain Node. Run from the repo root.

```bash
node sales/daily.mjs        # ← run this when you clock in
```

## The four tools

| Command | What it does |
|---|---|
| `node sales/daily.mjs` | Today's shift blocks + pace to 15 + who's overdue |
| `node sales/pipeline.mjs due` | Exactly who to call right now |
| `node sales/quote.mjs` | Ballpark a lease/finance payment on the phone |
| `node sales/targets.mjs` | Sprinter prospecting — qualified CBSP brands |

---

### daily.mjs

Knows your schedule (Mon/Tue 12–8, Thu/Fri 9–5, Sat 8:30–6, Sun 11–4, Wed off)
and prints the right playbook for that shift — evening appointment engine,
daytime commercial block, floor peak, or family day.

```bash
node sales/daily.mjs
node sales/daily.mjs --day thu     # preview another shift
```

### pipeline.mjs

Follow-up engine. Cadence is day 1, 2, 4, 7, 14, 21, 30 — keyed off **touches
completed**, so a prospect you never called goes red instead of quietly aging
out.

```bash
node sales/pipeline.mjs add --name "Dana R." --source equity --vehicle "GLE 350"
node sales/pipeline.mjs due
node sales/pipeline.mjs touch 1 --note "left vm, sent walkaround video"
node sales/pipeline.mjs appt 1 --when "Tue 6:15p"
node sales/pipeline.mjs sold 1
node sales/pipeline.mjs list --all
```

Sources: `equity` `lease-end` `conquest` `floor` `internet` `service` `referral` `sprinter`

**Names only.** Phone numbers, addresses, and deal details belong in Momentum —
not in a git repo.

### quote.mjs

August money factors and residuals baked in (tiers A1–T2).

```bash
node sales/quote.mjs --list
node sales/quote.mjs --model glc300 --msrp 52000 --term 24
node sales/quote.mjs --model gle350 --msrp 68000 --term 36 --down 3000
node sales/quote.mjs --model gle350 --msrp 68000 --finance 3.99 --term 60
```

The killer flag — solve backward from a payment:

```bash
node sales/quote.mjs --model glc300 --msrp 52000 --term 24 --target 499
#   → Sell at $44,293 · Discount needed $7,707 (14.8% off MSRP)
```

That tells you instantly whether an advertised payment is reachable on a
specific unit, before you walk to the desk.

**Estimate only.** Pre-tax, pre-fee. NetStar and the desk are the source of
truth on every contract.

### targets.mjs

The Sprinter goldmine. A franchisee of any listed brand qualifies for
**Medium-Fleet cash on a single van** — MY25 Cargo $11,000 vs $8,000 retail;
MY26 Cargo $6,000 vs $3,000. Most salespeople never ask "who's your parent
company?"

```bash
node sales/targets.mjs              # 5 fresh brands to research today
node sales/targets.mjs --all        # all 42
node sales/targets.mjs --segments   # non-franchise angles
node sales/targets.mjs --worked mr-rooter
```

**It does not invent leads.** It gives you the qualified brand list with each
brand's official locator URL — you pull the real local franchisee, with a real
phone number, from the source. Made-up prospects waste shifts.

---

## Daily rhythm

```bash
# clock in
node sales/daily.mjs

# power hour
node sales/pipeline.mjs due
node sales/pipeline.mjs touch 3 --note "..."

# Thu/Fri commercial block
node sales/targets.mjs

# on the phone
node sales/quote.mjs --model gle350 --msrp 68000 --term 24 --target 699

# closing out
node sales/pipeline.mjs appt 3 --when "Sat 11a"
```

See `AI-PLAYBOOK.md` for prompt templates that plug into these.

## Data

`sales/data/*.json` — local only, gitignored. Names only, no PII.
Edit `config.json` to change your schedule, goal, or cadence.
