# The Codex: Business Decision-Making Framework

This directory contains a structured knowledge base of strategic decision-making principles, business examples, and real-world trade-offs. The Codex is designed to:

1. **Explain how to think** about building repeatable, scalable business operations
2. **Show real examples** of decisions made in actual situations (Atlantic UV, Vonage, US localization)
3. **Surface principles** that work across different contexts and scales
4. **Make reasoning transparent** so other projects can learn from and build on these patterns

## Files

### decisions.json
Structured array of 6 core decisions made when building the Atlantic UV and broader Vonage commercial models:
1. Define ICP / narrow your market
2. Build channel instead of hiring
3. Price tiers to incentivize growth
4. Rebuild demand around compounding channels
5. Instrument everything before scaling
6. Put direct motion on key accounts

Each decision includes:
- `title`: The decision framed as a principle
- `decision`: The specific choice made
- `problem`: What made the decision necessary
- `approach`: What was built or changed
- `cost`: The trade-off or risk accepted

### examples.json
Three real business cases with full context:
1. **Atlantic UV**: Building a distributor-driven GTM from scratch ($50K → $175K budget)
2. **Vonage**: Running a $2M channel budget like a P&L
3. **US Localization**: Repositioning to match buyer behavior (change meaning, not words)

Each example includes:
- `role`: The job and scope
- `problem`: The business challenge
- `approach`: What was built/changed
- `decision`: The key strategic choice
- `outcome`: What resulted
- `metrics`: Measurable results
- `narrative`: 2-3 paragraph story connecting it all

### principles.json
Six meta-level principles extracted from across all decisions and examples:
1. Listen before you build
2. Invest in visibility first
3. Accept calculated risk early
4. Focus beats breadth
5. Defend what compounds against quarterly pressure
6. Change meaning, not words

Each principle includes:
- `title`: The principle name
- `short`: One-sentence summary
- `narrative`: 2-3 paragraphs explaining when and why it matters

## Usage

### In the /ideals Portfolio
The Codex section renders all three layers (decisions, examples, principles) as a cohesive "how I think" framework integrated into the portfolio page. See `app/ideals/microsite.json` for rendering logic.

### In Other Projects
The decision and principle frameworks can be referenced by:
- Product workbooks that teach business decision-making
- Course modules on scaling from product to GTM
- Case study libraries for prospective partners
- Internal playbooks for repeating what works

## Why This Exists

Marketing, business development, and channel management are fundamentally about decision-making under uncertainty. This Codex makes those decisions and their reasoning visible, repeatable, and transferable—so teams can:
1. Understand *why* certain programs get funded or cut
2. See patterns across different contexts
3. Defend decisions with confidence
4. Avoid repeating mistakes
5. Scale what works

## Authorship

Written from first-person experience at Atlantic UV (distributor channel builder) and Vonage (channel marketer). Real metrics. Real trade-offs. Real decisions.
