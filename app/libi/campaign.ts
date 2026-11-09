/**
 * LIBI November General Membership Dinner: the Competition Builder Pass.
 * Every offer, date and contact lives here. Change it here and the page, the
 * API emails and the printed QR cards (after `node scripts/libi/build.mjs`) all follow.
 *
 * Confirm every perk with your sales manager before the event. To add a dollar
 * bonus once it's approved, set PASS.bonus (e.g. "$1,000 Builder Bonus") and it
 * shows on the pass, the page, the emails and the printables.
 */

export const EVENT = {
  name: "LIBI November General Membership Dinner",
  short: "LIBI Membership Dinner",
  date: "Tuesday, November 10, 2026",
  dateShort: "Nov 10",
};

export const PASS = {
  name: "Competition Builder Pass",
  short: "Builder Pass",
  /** Optional manager-approved dollar incentive. Leave empty to show none. */
  bonus: "",
  validThrough: "December 31, 2026",
  validShort: "Dec 31",
};

/** Every pass holder is entered. The prize is an extended weekend test drive. */
export const PRIZE = {
  headline: "Win a Mercedes weekend",
  detail:
    "48 hours in the Mercedes-Benz you choose: a G-Class, an S-Class, an AMG, or a Sprinter for the jobsite.",
  drawDate: "Tuesday, November 17, 2026",
  drawShort: "Nov 17",
};

/** What the pass unlocks. The first line is replaced by PASS.bonus when one is set. */
export const PERKS = [
  {
    title: "VIP builder pricing",
    desc: "Show your pass at any Competition Automotive Group store. I'll work your numbers with management myself.",
  },
  {
    title: "+$500 on Sprinter vans",
    desc: "NAHB members get an extra $500 on any new Mercedes-Benz commercial van, on top of published cash, APR and lease offers.",
  },
  {
    title: "Free fleet equity report",
    desc: "Send me your trucks, vans and leases. I'll tell you what each one is worth today and which ones to replace before year-end.",
  },
  {
    title: "Mercedes weekend drawing",
    desc: `Every pass is entered to win 48 hours in the Mercedes you choose. Drawing ${PRIZE.drawShort}.`,
  },
];

/** Competition Automotive Group. Every lead comes to MK first and she makes the introduction. */
export const STORES = [
  { key: "mb-smithtown", label: "Mercedes-Benz of Smithtown", note: "630 Middle Country Rd, St. James" },
  { key: "sprinter", label: "Sprinter work vans", note: "Cargo, crew, passenger and cab chassis" },
  { key: "amg", label: "Mercedes-AMG", note: "G 63, GT, AMG SUVs" },
  { key: "mb-huntington", label: "Mercedes-Benz of Huntington", note: "Competition Automotive Group" },
  { key: "bmw", label: "Competition BMW of Smithtown", note: "Jericho Tpke, Smithtown" },
  { key: "genesis", label: "Genesis of Smithtown", note: "Middle Country Rd, St. James" },
  { key: "subaru", label: "Competition Subaru of Smithtown", note: "Middle Country Rd, St. James" },
] as const;

export const ROLES = [
  "Builder / developer",
  "Trade / subcontractor",
  "Supplier / manufacturer",
  "Attorney, lender or architect",
  "LIBI staff or guest",
  "Other",
] as const;

export const TIMELINES = ["Now", "1–3 months", "3–6 months", "Lease ends in 2027", "Just looking"] as const;

export const MK = {
  name: "Mary Kate Parrish",
  title: "Sales & Leasing Consultant",
  store: "Mercedes-Benz of Smithtown",
  group: "Competition Automotive Group",
  cell: "+13478534238",
  cellDisplay: "347.853.4238",
  email: "mparrish@mbofsmithtown.com",
  address: "630 Middle Country Road, St. James, NY 11780",
  instagram: "https://www.instagram.com/mk_parrish",
};

export const SITE = "https://www.mkparrish.com";
export const PAGE_PATH = "/libi";

/** The headline perk: the approved bonus if there is one, else VIP pricing. */
export function leadPerk() {
  return PASS.bonus ? { title: PASS.bonus, desc: `Your ${PASS.short} bonus, good through ${PASS.validThrough}.` } : PERKS[0];
}

/** Pass number and share code: first name plus three digits derived from the phone number. */
export function shareCode(name: string, phone: string) {
  const first = (name.trim().split(/\s+/)[0] || "LIBI").replace(/[^a-zA-Z]/g, "").slice(0, 10).toUpperCase() || "LIBI";
  let h = 0;
  for (const ch of `${phone.replace(/\D/g, "")}|${name.trim().toLowerCase()}`) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return `${first}${String(h % 900 + 100)}`;
}

export function cleanRef(value: string | null | undefined) {
  return (value || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 16);
}
