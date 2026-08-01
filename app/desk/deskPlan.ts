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
    day: 'Sunday', hours: '11:00 – 4:00',
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
    day: 'Monday', hours: '12:00 – 8:00',
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
    day: 'Thursday', hours: '9:00 – 5:00',
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
    day: 'Saturday', hours: '8:30 – 6:00',
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
