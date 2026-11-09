/**
 * LIBI November General Membership Dinner campaign: every offer, date and
 * contact in one place. Change a prize or deadline here and the page, the
 * API emails and the printed QR cards all follow.
 *
 * Before the event, confirm each offer with your sales manager. The member
 * offer repeats the $1,500-off-MSRP coupon handed out at the LIBI Golf &
 * Softball Outing (Sept 29, 2026), which runs through Nov 30, 2026.
 */

export const EVENT = {
  name: "LIBI November General Membership Dinner",
  short: "LIBI Membership Dinner",
  date: "Tuesday, November 10, 2026",
  dateShort: "Nov 10",
};

/** The grand prize: an extended weekend test drive, which costs the store little and usually sells a car. */
export const PRIZE = {
  headline: "Win a Mercedes weekend",
  detail:
    "48 hours behind the wheel of the Mercedes-Benz you choose: a G-Class, an S-Class, an AMG, or a Sprinter for the jobsite. Pick it up Friday, bring it back Sunday.",
  drawDate: "Tuesday, November 17, 2026",
  drawShort: "Nov 17",
};

/** Every entrant gets these, win or not. */
export const MEMBER_OFFER = {
  headline: "$1,500 off MSRP",
  sub: "on any new vehicle, for LIBI members",
  expires: "November 30, 2026",
  expiresShort: "Nov 30",
  expiresIso: "2026-11-30T23:59:59-05:00",
};

export const PERKS = [
  {
    title: "$1,500 off MSRP",
    desc: `LIBI member pricing on any new vehicle, good through ${MEMBER_OFFER.expires}.`,
  },
  {
    title: "+$500 on Sprinter vans",
    desc: "NAHB members get an extra $500 on any new Mercedes-Benz commercial van, on top of published cash, APR and lease offers.",
  },
  {
    title: "Free fleet equity check",
    desc: "Send me your trucks, vans and leases. I'll tell you what each one is worth today and which ones to replace before Dec 31.",
  },
];

/** Competition Automotive Group stores. Every lead comes to MK first and she makes the introduction. */
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

export const TIMELINES = ["Now", "1–3 months", "3–6 months", "Lease ends in 2027", "Just entering"] as const;

export const MK = {
  name: "Mary Kate Parrish",
  title: "Sales & Leasing Consultant",
  store: "Mercedes-Benz of Smithtown",
  group: "Competition Automotive Group",
  work: "+16313666417",
  workDisplay: "631.366.6417",
  cell: "+13478534238",
  cellDisplay: "347.853.4238",
  email: "mparrish@mbofsmithtown.com",
  address: "630 Middle Country Road, St. James, NY 11780",
  instagram: "https://www.instagram.com/mk_parrish",
};

export const SITE = "https://www.mkparrish.com";
export const PAGE_PATH = "/libi";

/** A short, friendly share code for an entrant: first name plus three digits from their phone number. */
export function shareCode(name: string, phone: string) {
  const first = (name.trim().split(/\s+/)[0] || "LIBI").replace(/[^a-zA-Z]/g, "").slice(0, 10).toUpperCase() || "LIBI";
  let h = 0;
  for (const ch of `${phone.replace(/\D/g, "")}|${name.trim().toLowerCase()}`) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return `${first}${String(h % 900 + 100)}`;
}

export function cleanRef(value: string | null | undefined) {
  return (value || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 16);
}
