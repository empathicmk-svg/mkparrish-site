/**
 * Today tab — shift plans, scripts, and commercial prospecting data.
 *
 * Schedule: Mon/Tue 12–8, Wed off, Thu/Fri 9–5, Sat 8:30–6, Sun 11–4.
 * Times are minutes from midnight so "which block am I in" is a simple compare.
 */

export type Block = {
  from: number;
  to: number;
  label: string;
  power?: boolean;
  todo: string[];
};

export type Shift = {
  day: string;
  mode: string;      // which PULLS set applies
  hours: string;
  headline: string;
  why: string;
  blocks: Block[];
};

const hm = (h: number, m = 0) => h * 60 + m;

export const NAME_KEY = 'mk-desk-name-v1';

export const SHIFTS: Record<number, Shift | null> = {
  // Sunday
  0: {
    day: 'Sunday', mode: 'family', hours: '11:00 – 4:00',
    headline: 'Families are shopping',
    why: 'Couples come in together on Sundays, so both decision-makers are in the room. That is a closing advantage — do not let one of them leave to "talk about it."',
    blocks: [
      { from: hm(11), to: hm(11, 20), label: 'Set the board', todo: [
        'Check Follow-up tab — clear anyone red.',
        'Confirm today\'s appointments by text.',
      ]},
      { from: hm(11, 20), to: hm(15, 30), label: 'Take ups', todo: [
        'Greet every guest fast. Do not let anyone stand unhelped.',
        'Walk the service drive once.',
        'Ask every buyer for a referral before they leave.',
      ]},
      { from: hm(15, 30), to: hm(16), label: 'Reset the week', todo: [
        'Confirm Monday AND Tuesday appointments by text.',
        'Build tomorrow\'s call list from AutoAlert.',
      ]},
    ],
  },
  // Monday
  1: {
    day: 'Monday', mode: 'evening', hours: '12:00 – 8:00',
    headline: 'Your best closing night',
    why: 'You are on the floor exactly when customers are off work. Book people for tonight — 6:00 or 6:30 — not "sometime this week."',
    blocks: [
      { from: hm(12), to: hm(12, 45), label: 'Set the board', todo: [
        'Follow-up tab — clear the reds first.',
        'Pull AutoAlert equity list AND lease maturity 90–120 days out.',
        'Clear overdue tasks in Momentum.',
      ]},
      { from: hm(13), to: hm(14), label: 'POWER HOUR — equity calls', power: true, todo: [
        '25+ dials. Phone in hand, no floor distractions.',
        'Goal: book 1–2 people for 6:00 or 6:30 TONIGHT.',
        'Every "no" gets a follow-up date logged.',
      ]},
      { from: hm(14), to: hm(17, 30), label: 'Floor + service drive', todo: [
        'Take every up.',
        'Walk the service drive once.',
        'Answer internet leads in under 10 minutes.',
      ]},
      { from: hm(17, 30), to: hm(19, 40), label: 'PRIME — appointments show', power: true, todo: [
        'Vehicle pulled up front, clean, fueled, before they arrive.',
        'Demo, work numbers, ASK FOR THE SALE.',
        'Referral ask at every delivery.',
      ]},
      { from: hm(19, 40), to: hm(20), label: 'Close out', todo: [
        'Log every conversation in Momentum — same day.',
        'Confirm tomorrow\'s appointments by text.',
        'Tap Done in Follow-up for everyone you reached.',
      ]},
    ],
  },
  // Tuesday — same shape as Monday
  2: null,
  // Wednesday — off
  3: null,
  // Thursday
  4: {
    day: 'Thursday', mode: 'daytime', hours: '9:00 – 5:00',
    headline: 'Prospecting day — you SET, you do not close',
    why: 'You leave at 5, so you cannot catch after-work traffic. Do not fight it. Today you fill Saturday and work the phone while businesses are open.',
    blocks: [
      { from: hm(9), to: hm(9, 45), label: 'Set the board', todo: [
        'Follow-up tab — clear the reds.',
        'Confirm today\'s appointments.',
      ]},
      { from: hm(9, 45), to: hm(11), label: 'POWER HOUR — COMMERCIAL / SPRINTER', power: true, todo: [
        'Businesses answer the phone right now. This is your Sprinter window.',
        'Work the franchise list below — ask "who is your parent company?"',
        'Also call retirees and self-employed who CAN come by day.',
      ]},
      { from: hm(11), to: hm(14), label: 'Floor + service drive', todo: [
        'Take ups. Walk the drive.',
        'Internet leads under 10 minutes.',
      ]},
      { from: hm(14), to: hm(15), label: 'POWER HOUR — leads & be-backs', power: true, todo: [
        'BOOK EVERYTHING FOR SATURDAY. You are gone at 5.',
        'Re-touch every unsold from the last 7 days with something of value.',
      ]},
      { from: hm(16, 30), to: hm(17), label: 'Load the weekend', todo: [
        'Confirm EVERY Saturday appointment before you walk out.',
      ]},
    ],
  },
  5: null, // Friday — same as Thursday
  // Saturday
  6: {
    day: 'Saturday', mode: 'floor', hours: '8:30 – 6:00',
    headline: 'Floor peak — be up all day',
    why: 'Highest walk-in traffic of your week. Phone down. Every minute on the phone today is a minute someone else takes your up.',
    blocks: [
      { from: hm(8, 30), to: hm(9), label: 'Quick board set', todo: [
        'Confirm today\'s appointments.',
        'Vehicles pulled, clean, fueled.',
      ]},
      { from: hm(9), to: hm(17, 30), label: 'MAXIMIZE UPS', power: true, todo: [
        'Be up. Greet fast, qualify, demo, close.',
        'Two service-drive walks — midday and before it closes.',
        'Referral ask at every single delivery.',
      ]},
      { from: hm(17, 30), to: hm(18), label: 'Close out', todo: [
        'Log everything.',
        'Confirm Sunday AND Monday appointments.',
      ]},
    ],
  },
};

// Tuesday mirrors Monday; Friday mirrors Thursday.
SHIFTS[2] = SHIFTS[1] ? { ...SHIFTS[1], day: 'Tuesday' } : null;
SHIFTS[5] = SHIFTS[4] ? { ...SHIFTS[4], day: 'Friday' } : null;

/* ─────────── AutoAlert pull lists ───────────
 * Alert names vary by store configuration, so each entry says what the list
 * *does* as well as what it is usually called — ask your AutoAlert admin to
 * match them up once, then these become saved lists you reuse every shift.
 */
export type Pull = {
  id: string;
  list: string;
  filter: string;
  produces: string;
  target: number;
  source: string;   // maps to a pipeline source
};

/** Standing lists worth building once and saving in AutoAlert. */
export const STANDING_LISTS: { name: string; how: string; why: string }[] = [
  {
    name: 'Equity / Flex — payment neutral',
    how: 'Positive-equity customers whose payment on a newer unit lands within about $50 of today.',
    why: 'Your highest-converting call. The pitch is "newer car, same money" — nobody argues with that.',
  },
  {
    name: 'Lease maturity — 90 to 120 days',
    how: 'Leases ending in the next 90–120 days, sorted soonest first.',
    why: 'Catch them before the mail and before the other store. Pair with the LAP payment waiver.',
  },
  {
    name: 'Service today — with equity',
    how: 'Customers with an RO open today who also carry positive equity.',
    why: 'They are physically on the property. Walk the drive with this list on your phone.',
  },
  {
    name: 'Big repair estimate',
    how: 'Open ROs above roughly $1,500, or any declined major service.',
    why: '"Do not put $3,000 into a car worth $18,000" writes itself. Highest-urgency list you have.',
  },
  {
    name: 'Over-mileage leases',
    how: 'Active leases pacing over their contracted mileage.',
    why: 'They owe money at turn-in and usually do not know yet. Pull-ahead solves their problem.',
  },
  {
    name: 'Contract end / near payoff',
    how: 'Finance contracts within 6 payments of payoff, or already paid off.',
    why: 'Payment-free and used to a payment. Easiest re-entry into a new lease.',
  },
  {
    name: 'Warranty expiring',
    how: 'Factory warranty ending in the next 90 days.',
    why: 'Fear of out-of-warranty repair bills is a real motivator. Trade before it expires.',
  },
  {
    name: 'Conquest / in-market',
    how: 'Non-Mercedes owners in your database showing shopping behaviour.',
    why: 'The $1,500 Upgrade Certificate applies to any brand — free money you can lead with.',
  },
  {
    name: 'Orphan owners',
    how: 'Customers with no active salesperson assigned.',
    why: 'Nobody is working them. As the new person, ask your manager to assign you these.',
  },
  {
    name: 'Commercial / Sprinter owners',
    how: 'Filter your owner base to Sprinter and commercially titled vehicles.',
    why: 'Businesses replace on a cycle and buy in multiples. Confirm Sprinters are in your AutoAlert feed.',
  },
];

/** What to pull for a given shift type. */
export const PULLS: Record<string, Pull[]> = {
  evening: [
    { id: 'eq', list: 'Equity / Flex — payment neutral', filter: 'Positive equity · payment within ~$50 of current',
      produces: 'Appointments for 6:00–7:30 tonight', target: 25, source: 'equity' },
    { id: 'lm', list: 'Lease maturity — 90 to 120 days', filter: 'Maturity 90–120 days · soonest first',
      produces: 'Pull-ahead appointments using the LAP waiver', target: 15, source: 'lease-end' },
    { id: 'rep', list: 'Big repair estimate', filter: 'Open RO over ~$1,500 or declined major service',
      produces: 'Urgent trade conversations', target: 10, source: 'service' },
  ],
  daytime: [
    { id: 'com', list: 'Commercial / Sprinter owners', filter: 'Sprinter + commercially titled, plus your local franchise targets',
      produces: 'Fleet conversations while businesses are open', target: 20, source: 'sprinter' },
    { id: 'day', list: 'Equity — daytime reachable', filter: 'Positive equity · retirees and self-employed',
      produces: 'Appointments you can actually work before 5', target: 20, source: 'equity' },
    { id: 'ce', list: 'Contract end / near payoff', filter: 'Within 6 payments of payoff, or paid off',
      produces: 'Saturday appointments', target: 15, source: 'equity' },
    { id: 'cq', list: 'Conquest / in-market', filter: 'Non-Mercedes owners showing shopping behaviour',
      produces: 'Upgrade Certificate conversations', target: 10, source: 'conquest' },
  ],
  floor: [
    { id: 'svc', list: 'Service today — with equity', filter: 'Open RO today · positive equity',
      produces: 'Face-to-face on the drive, no phone needed', target: 15, source: 'service' },
    { id: 'bb', list: 'Unsold from the last 7 days', filter: 'Your own be-backs from the week',
      produces: 'Second bites while traffic is heavy', target: 10, source: 'floor' },
  ],
  family: [
    { id: 'bb2', list: 'Unsold from the last 14 days', filter: 'Couples and families who came in without both decision-makers',
      produces: 'Sunday visits with everyone present', target: 10, source: 'floor' },
    { id: 'om', list: 'Over-mileage leases', filter: 'Active leases pacing over contracted miles',
      produces: 'Pull-ahead conversations', target: 10, source: 'lease-end' },
  ],
};

export type Script = { id: string; when: string; text: string };

export const SCRIPTS: Script[] = [
  {
    id: 'equity', when: 'AutoAlert equity call',
    text: 'Hi [Name], this is MK at Mercedes-Benz of Smithtown — good news, not a problem. Your [year model] is worth more than most people expect right now, and a lot of our owners are moving into a newer one for close to what they are paying today. I have 5:30 or 6:15 tonight — which is easier?',
  },
  {
    id: 'lease', when: 'Lease maturing in 90–120 days',
    text: 'Hi [Name], MK at Mercedes-Benz of Smithtown. Because you leased with us, Financial Services will waive up to your first 3 payments if we move now — 6 payments if you are in a GLE, GLS, or S-Class. Worth 20 minutes to run your exact numbers? I have 5:30 or 6:15.',
  },
  {
    id: 'conquest', when: 'Owner of a competing brand',
    text: 'Hi [Name], MK at Mercedes-Benz of Smithtown. Since you are currently in a [brand], you qualify for our $1,500 Upgrade Certificate on top of this month\'s incentives — and I can likely land you near your current payment. Worth 20 minutes?',
  },
  {
    id: 'sprinter', when: 'Sprinter / commercial B2B call',
    text: 'Hi, is the owner or fleet manager available? — Quick reason I am calling: if you are a [brand] franchise, you qualify for our fleet pricing on a single Sprinter, not just big fleets. That is thousands more than retail, and Section 179 may let you write off a large chunk before year-end. Worth 15 minutes this week?',
  },
  {
    id: 'service', when: 'Service drive walk-up',
    text: '[Name], while your [model] is in for service — did you know it is worth more than most people expect right now? Give me ten minutes and I will show you a newer one for about the same payment. No pressure, just the numbers.',
  },
  {
    id: 'confirm', when: 'Confirming an appointment, night before',
    text: 'Looking forward to seeing you at [time] tomorrow, [Name]. I will have the [model] pulled up front and ready to drive. Reply YES and I will have everything set. — MK, Mercedes-Benz of Smithtown',
  },
  {
    id: 'referral', when: 'At delivery — never skip this',
    text: '[Name], I am building my business the right way — by taking great care of people like you. Who is the next person you know who would love this same experience? I will take amazing care of them.',
  },
];

/** The commercial call, start to finish. Shown on the Sprinter card. */
export const COMMERCIAL_SCRIPTS: { id: string; when: string; text: string }[] = [
  {
    id: 'gate', when: '1 · Getting past whoever answers',
    text: 'Hi — I am trying to reach whoever handles the vans. Is that the owner, or do you have a fleet manager? … Great, is he/she around? I will only need about two minutes.',
  },
  {
    id: 'qualify', when: '2 · The question that pays — ask it early',
    text: 'Before I take your time — are you an independent shop, or do you franchise under a national brand? … The reason I ask is that franchisees qualify for fleet-level pricing on a single van, not just big fleets. It is thousands more than retail and most owners have no idea it exists.',
  },
  {
    id: 'open', when: '3 · The opener once you have the owner',
    text: 'I am MK at Mercedes-Benz of Smithtown. Two quick reasons to talk: we are carrying real inventory on Sprinter cargo right now, so no ordering and no waiting. And a Sprinter is over 6,000 pounds, so Section 179 may let you write off a large part of it this tax year. Worth fifteen minutes to see if the numbers work?',
  },
  {
    id: '179', when: '4 · Section 179 — the urgency, said honestly',
    text: 'I am not your accountant and I would never pretend to be. What I can tell you is the van qualifies by weight, and business owners who buy before year-end often deduct a significant portion in the same year. Ask your CPA what that is worth to you — if the answer is what it usually is, buying in August instead of January is real money.',
  },
  {
    id: 'ford', when: '5 · "We run Transits / ProMasters"',
    text: 'Most of the shops I talk to do. The two things owners tell me they notice are uptime and how long the van lasts before it starts costing them. What does downtime actually cost you on a working day? … That is the number worth comparing, not the sticker.',
  },
  {
    id: 'notnow', when: '6 · "Not right now"',
    text: 'Understood, and I am not going to push. When does your replacement cycle usually come up? … Then let me do this: I will check in a few weeks before that, and if anything changes on incentives I will let you know rather than let you miss it. Fair?',
  },
  {
    id: 'upfit', when: '7 · Sizing the deal — ask these',
    text: 'How many vans are you running? · How long do you keep one? · What is on the inside — shelving, partition, ladder rack, refrigeration? · Does the crew need to stand up in it? · Roughly how many miles a year? · Do you buy, finance, or lease them?',
  },
  {
    id: 'vm', when: '8 · Voicemail — you will leave a lot',
    text: 'Hi, this is MK at Mercedes-Benz of Smithtown, 631-... . Calling about Sprinter cargo vans — we have inventory on the ground and there is a Section 179 angle worth knowing before year-end. If you franchise under a national brand there is also fleet pricing available on a single van. Two minutes is all I need. Thanks.',
  },
  {
    id: 'close', when: '9 · Closing for the appointment',
    text: 'Here is what I would suggest — come see one. Ten minutes, no numbers, just stand in it and see if the size works for your crew. I am here Thursday and Friday until five, or Saturday. Which is easier?',
  },
];

/** Franchise brands whose local owners qualify for fleet-level cash on ONE van. */
export const SPRINTER_BRANDS = [
  { name: 'Mr. Rooter Plumbing', parent: 'Neighborly', url: 'https://www.mrrooter.com/locations/' },
  { name: 'Benjamin Franklin Plumbing', parent: 'Authority Brands', url: 'https://www.benjaminfranklinplumbing.com/locations/' },
  { name: 'One Hour Heating & Air', parent: 'Authority Brands', url: 'https://www.onehourheatandair.com/locations/' },
  { name: 'Mr. Electric', parent: 'Neighborly', url: 'https://mrelectric.com/locations' },
  { name: 'Mr. Handyman', parent: 'Neighborly', url: 'https://www.mrhandyman.com/local-handyman-service/' },
  { name: 'Mr. Appliance', parent: 'Neighborly', url: 'https://www.mrappliance.com/locations/' },
  { name: 'Aire Serv', parent: 'Neighborly', url: 'https://www.aireserv.com/locations/' },
  { name: 'Glass Doctor', parent: 'Neighborly', url: 'https://glassdoctor.com/locations' },
  { name: 'Rainbow Restoration', parent: 'Neighborly', url: 'https://rainbowrestores.com/locations' },
  { name: 'The Grounds Guys', parent: 'Neighborly', url: 'https://www.groundsguys.com/locations/' },
  { name: 'Junk King', parent: 'Neighborly', url: 'https://www.junk-king.com/company/locations' },
  { name: 'Molly Maid', parent: 'Neighborly', url: 'https://www.mollymaid.com/locations/' },
  { name: 'Mosquito Joe', parent: 'Neighborly', url: 'https://mosquitojoe.com/locations/' },
  { name: 'Five Star Painting', parent: 'Neighborly', url: 'https://www.fivestarpainting.com/our-locations/' },
  { name: 'Window Genie', parent: 'Neighborly', url: 'https://www.windowgenie.com/locations/' },
  { name: 'Precision Garage Door', parent: 'Neighborly', url: 'https://www.precisiondoor.net/locations' },
  { name: 'SERVPRO', parent: 'SERVPRO', url: 'https://www.servpro.com/locations' },
  { name: 'Roto-Rooter', parent: 'Roto-Rooter', url: 'https://www.rotorooter.com/locations/' },
  { name: 'STOP Restoration', parent: 'Authority Brands', url: 'https://www.stoprestoration.com/locations/' },
  { name: 'Monster Tree Service', parent: 'Authority Brands', url: 'https://www.monstertreeservice.com/our-locations/' },
  { name: 'Mosquito Squad', parent: 'Authority Brands', url: 'https://www.mosquitosquad.com/locations/' },
  { name: 'The Cleaning Authority', parent: 'Authority Brands', url: 'https://www.thecleaningauthority.com/locations/' },
  { name: 'Budget Blinds', parent: 'Home Franchise Concepts', url: 'https://budgetblinds.com/locations/' },
  { name: 'Kitchen Tune-Up', parent: 'Home Franchise Concepts', url: 'https://www.kitchentuneup.com/locations/' },
  { name: 'AdvantaClean', parent: 'Home Franchise Concepts', url: 'https://advantaclean.com/location/' },
  { name: 'Two Maids', parent: 'Home Franchise Concepts', url: 'https://www.twomaidscleaning.com/locations/' },
  { name: 'Rheem Pros', parent: 'Rheem', url: 'https://www.rheem.com/find-a-pro/' },
  { name: 'FedEx contractors (ISP)', parent: 'Contractors', url: 'https://local.fedex.com/en-us' },
];

/** Working days left this month, honouring Wednesday off. */
export function shiftsLeftInMonth(d = new Date()) {
  const cur = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const month = cur.getMonth();
  let n = 0;
  while (cur.getMonth() === month) {
    if (SHIFTS[cur.getDay()]) n++;
    cur.setDate(cur.getDate() + 1);
  }
  return n;
}

export function currentBlock(shift: Shift, now = new Date()) {
  const mins = now.getHours() * 60 + now.getMinutes();
  return shift.blocks.find((b) => mins >= b.from && mins < b.to) ?? null;
}

export const fmtTime = (mins: number) => {
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h}:${String(m).padStart(2, '0')}`;
};

export function greeting(now = new Date()) {
  const h = now.getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}
