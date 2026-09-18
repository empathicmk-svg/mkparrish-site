/**
 * The Benz Blonde — microsite content.
 *
 * Everything an owner would want to change month to month lives here: handles,
 * store details, the lineup, the FAQ, the content engine, the review wall.
 * Pages read from this file, so updating a payment window or adding a review is
 * a one-line edit, not a page rewrite.
 */

// ── Who / where ───────────────────────────────────────────────────────────────
export const BENZ = {
  brand: "The Benz Blonde",
  person: "MK Parrish",
  store: "Mercedes-Benz of Smithtown",
  area: "Long Island · Nassau, Suffolk, Queens & NYC",
  // Site-wide contact, mirrored from app/lib/config.ts so the microsite can be
  // pointed at a dealership line without touching the main site.
  phone: "347.853.4238",
  phoneHref: "tel:+13478534238",
  smsHref: "sms:+13478534238",
  email: "mkp414@icloud.com",
  hours: [
    { day: "Monday", hours: "12:00 – 8:00" },
    { day: "Tuesday", hours: "12:00 – 8:00" },
    { day: "Wednesday", hours: "By appointment" },
    { day: "Thursday", hours: "9:00 – 5:00" },
    { day: "Friday", hours: "9:00 – 5:00" },
    { day: "Saturday", hours: "8:30 – 6:00" },
    { day: "Sunday", hours: "11:00 – 4:00" },
  ],
} as const;

// ── Social ────────────────────────────────────────────────────────────────────
// TODO(MK): swap these for the live handles. Set `live: false` on anything not
// running yet and it is hidden everywhere instead of shipping a dead link.
export const SOCIAL = [
  { name: "Instagram", handle: "@thebenzblonde", href: "https://instagram.com/thebenzblonde", live: true, blurb: "Walkarounds, delivery days, and the parts of this job nobody films." },
  { name: "TikTok", handle: "@thebenzblonde", href: "https://tiktok.com/@thebenzblonde", live: true, blurb: "60-second answers to the questions people are too embarrassed to ask a dealer." },
  { name: "YouTube", handle: "@thebenzblonde", href: "https://youtube.com/@thebenzblonde", live: true, blurb: "Full model comparisons and the lease-vs-finance math, shown on paper." },
  { name: "LinkedIn", handle: "MK Parrish", href: "https://www.linkedin.com/in/mkparrish", live: true, blurb: "Fleet, Sprinter, and Section 179 for business owners." },
] as const;

export const SOCIAL_LIVE = SOCIAL.filter((s) => s.live);

// ── The lineup ────────────────────────────────────────────────────────────────
// No invented pricing. Payments move every month with incentives, money factor,
// and residual — so every card sells the conversation, not a number that will be
// wrong by the time someone reads it.
export type Model = {
  slug: string;
  name: string;
  body: string;
  headline: string;
  who: string;
  notes: string[];
};

export const MODELS: Model[] = [
  {
    slug: "gle",
    name: "GLE",
    body: "Midsize SUV",
    headline: "The one most people actually end up in.",
    who: "Families who want room without driving something that feels like a bus. The volume seller for a reason.",
    notes: [
      "Two rows standard, third row available",
      "Over 6,000 lbs GVWR on most builds — ask me about Section 179 if it is a business buy",
      "Lease pull-ahead support is usually strongest here",
    ],
  },
  {
    slug: "glc",
    name: "GLC",
    body: "Compact SUV",
    headline: "Garage-friendly, still unmistakably a Benz.",
    who: "First Mercedes buyers, commuters, and anyone parking in Manhattan or a tight Long Island driveway.",
    notes: [
      "Easiest step up from a loaded Honda or Toyota",
      "Coupe body available if you want it to look like it costs more",
      "Strong lease residuals — usually the lowest payment in the SUV line",
    ],
  },
  {
    slug: "c-class",
    name: "C-Class",
    body: "Sedan",
    headline: "The entry point that never feels like the entry point.",
    who: "Drivers who want the badge and the interior without SUV money.",
    notes: [
      "Best-in-class cabin tech for the price",
      "AMG variants available if you want the noise",
      "Popular first lease — low payment, easy exit in 36 months",
    ],
  },
  {
    slug: "e-class",
    name: "E-Class",
    body: "Executive sedan",
    headline: "What the S-Class was ten years ago.",
    who: "Commuters doing real highway miles who want the quiet and the driver assists.",
    notes: [
      "4MATIC all-wheel drive for Northeast winters",
      "The long-haul comfort pick — LIE, Southern State, Midtown Tunnel",
      "Wagon and coupe bodies available on request",
    ],
  },
  {
    slug: "s-class",
    name: "S-Class",
    body: "Flagship sedan",
    headline: "The reason the rest of the lineup exists.",
    who: "Buyers who are done comparing and want the best seat in the building.",
    notes: [
      "Rear-seat package turns it into a car you get driven in",
      "Deepest lease support of the sedan line in most months",
      "Allocation is limited — tell me early if this is the one",
    ],
  },
  {
    slug: "gla-glb",
    name: "GLA & GLB",
    body: "Subcompact SUV",
    headline: "The lowest door into the brand.",
    who: "Students, first-time luxury buyers, and anyone who needs a third row in a small footprint (GLB).",
    notes: [
      "GLB seats seven in a compact body — nothing else does this",
      "Typically the lowest monthly payment in the entire lineup",
      "Great lease-return car: high demand used, so equity tends to show up early",
    ],
  },
  {
    slug: "eqe-eqs",
    name: "EQE & EQS",
    body: "Electric",
    headline: "Electric without the science project.",
    who: "Anyone with a driveway, a commute under 250 miles, and a tax appetite.",
    notes: [
      "Lease structures often capture EV credits that a purchase cannot",
      "I will map your actual commute against real-world range before you drive it",
      "Home charger conversation happens before delivery, not after",
    ],
  },
  {
    slug: "g-class",
    name: "G-Class",
    body: "Icon",
    headline: "Nobody cross-shops a G-Wagon.",
    who: "You already know. The question is allocation and timing, not comparison.",
    notes: [
      "Allocation-driven — get on the list early",
      "AMG G 63 and G 550 builds both available",
      "I will tell you honestly where you sit in the queue",
    ],
  },
  {
    slug: "sprinter",
    name: "Sprinter",
    body: "Commercial van",
    headline: "The one that pays for itself.",
    who: "Contractors, mobile businesses, delivery fleets, and franchise owners.",
    notes: [
      "Over 6,000 lbs — Section 179 may let you write off a large part of it this tax year",
      "Real cargo inventory on the ground, so no ordering and no waiting",
      "Fleet pricing available on a single van if you franchise under a national brand",
    ],
  },
  {
    slug: "amg",
    name: "AMG",
    body: "Performance",
    headline: "Hand-built engines, the whole line.",
    who: "Enthusiasts who want the C 63, E 63, GT, or an AMG version of the SUV they were already buying.",
    notes: [
      "Almost every model has an AMG variant — you do not have to give up practicality",
      "Build slots move fast; spec early",
      "Track-day and Driving Academy access comes with ownership",
    ],
  },
  {
    slug: "cpo",
    name: "Certified Pre-Owned",
    body: "Used, warrantied",
    headline: "The smartest money in the store.",
    who: "Buyers who want an S-Class budget to buy an S-Class, one model year back.",
    notes: [
      "Factory-backed warranty — not a third-party service contract",
      "165-point inspection and a real reconditioning standard",
      "CPO lease and finance rates are often better than standard used rates",
    ],
  },
];

// ── The offer / how she works ────────────────────────────────────────────────
export const PROMISES = [
  {
    num: "01",
    title: "One number, first time",
    body: "You get the real out-the-door figure before you drive anywhere. No four-square, no 'come in and we will see what we can do.'",
  },
  {
    num: "02",
    title: "Your trade, appraised honestly",
    body: "I tell you what the car is actually worth to us, and what it is worth to someone else. If you should sell it privately, I will say so.",
  },
  {
    num: "03",
    title: "The car is ready before you are",
    body: "Pulled up front, clean, fueled, plates ready. Your appointment starts with a drive, not a wait at a desk.",
  },
  {
    num: "04",
    title: "Nobody hands you off",
    body: "I am your person through the deal, the delivery, the first service visit, and the next car three years from now.",
  },
];

// ── Why people call ───────────────────────────────────────────────────────────
export const LANES = [
  {
    slug: "trade",
    href: "/benz-blonde/trade",
    kicker: "Most people are sitting on money",
    title: "What is my car worth?",
    body: "Used values have not normalized. A lot of owners have thousands in equity and no idea. I will run your exact VIN and tell you the number — even if the answer is 'keep it.'",
    cta: "Get my number →",
  },
  {
    slug: "lease-end",
    href: "/benz-blonde/lease-end",
    kicker: "Do not wait for the last payment",
    title: "My lease is ending",
    body: "Mercedes-Benz Financial Services will often waive your remaining payments to get you into a newer one early. Six months out is the sweet spot. Three months out you have lost leverage.",
    cta: "Check my pull-ahead →",
  },
  {
    slug: "shop",
    href: "/benz-blonde/shop",
    kicker: "Start here if you are not sure",
    title: "Which one is right for me?",
    body: "Eleven ways into this brand and most people only know two of them. Tell me your driveway, your commute, and your budget and I will narrow it to two cars.",
    cta: "See the lineup →",
  },
  {
    slug: "book",
    href: "/benz-blonde/book",
    kicker: "Twenty minutes, no desk",
    title: "I just want to drive one",
    body: "Pick a time. The car is out front, warm, and plated when you arrive. If you love it we talk numbers. If you do not, you leave — and I will still answer your texts.",
    cta: "Book a drive →",
  },
];

// ── Reviews ───────────────────────────────────────────────────────────────────
// TODO(MK): paste real reviews here as they come in (Google, DealerRater, text
// screenshots you have permission to use). The page renders a referral-first
// layout while this is empty — it never shows an empty shelf.
export type Review = {
  name: string;
  location: string;
  vehicle: string;
  quote: string;
  source: string;
};

export const REVIEWS: Review[] = [];

// ── Referral program ──────────────────────────────────────────────────────────
export const REFERRAL = {
  headline: "Send me someone. I take care of both of you.",
  body:
    "Most of my business comes from people who already bought from me. That is not an accident — it is the whole plan. If you send me a friend, a coworker, or your brother-in-law who keeps asking about your car, they get the same straight deal you got, and I take care of you when it lands.",
  steps: [
    "Text me their name and what they are driving now.",
    "I reach out on your behalf — no cold-call energy, no pressure.",
    "They get the real number first, same as you did.",
    "When it delivers, I take care of you. Ask me how; I will be specific.",
  ],
};

// ── FAQ ───────────────────────────────────────────────────────────────────────
export const FAQ_ITEMS = [
  {
    q: "Should I lease or finance?",
    a: "Depends on three things: your annual mileage, how long you keep cars, and whether the car is a business expense. If you drive under 12,000 a year and like a new car every three years, leasing almost always wins. If you drive 20,000 a year and keep cars to 150,000 miles, financing wins and it is not close. I will show you both on paper before you decide — the math is not a secret.",
  },
  {
    q: "I still owe more than my car is worth. Am I stuck?",
    a: "Usually not. Negative equity can often be rolled or offset by current incentives, especially if you are moving into something with strong lease support. The honest answer depends on the gap. Send me your payoff and I will tell you whether it works this month or whether you are better off waiting six.",
  },
  {
    q: "My credit is not perfect. Is it worth coming in?",
    a: "Yes, and you should tell me up front rather than hoping it does not come up. Mercedes-Benz Financial Services is one lender; we work with several. Knowing your situation early means I structure the deal around it instead of getting surprised at the desk with you sitting there.",
  },
  {
    q: "I am not local. Can I still buy from you?",
    a: "All the time. Out-of-state and out-of-area buyers are a real part of my business. We do the deal by phone and email, you sign remotely or in person, and I can arrange delivery. Nothing about the process requires you to sit in a showroom for four hours.",
  },
  {
    q: "What is Section 179 and does my business qualify?",
    a: "It is a federal deduction that can let a business write off a large portion of a qualifying vehicle in the year it is placed in service. Vehicles over 6,000 lbs GVWR — Sprinter, GLE, GLS, G-Class — are the usual candidates. I am not your accountant and I will not pretend to be, but I know which vehicles qualify and I will get you the specs your accountant needs.",
  },
  {
    q: "How early should I start on a lease that is ending?",
    a: "Six months out. That is when pull-ahead programs have the most room and you still have every option. At three months you are negotiating from a deadline. At one month you are taking what is available.",
  },
  {
    q: "Is a Certified Pre-Owned actually different from a used car?",
    a: "Yes. CPO is factory-backed — a real warranty from Mercedes-Benz, a 165-point inspection, and a reconditioning standard the store has to meet. It is not a third-party service contract with a sticker on it. For a lot of buyers it is the smartest money in the building.",
  },
  {
    q: "Do you actually answer your phone?",
    a: "Text is fastest. I am on the floor most days and I will answer between customers. If I miss you, you will hear back the same day — including on my day off, which is Wednesday.",
  },
];

// ── Content engine (the Watch tab) ────────────────────────────────────────────
// The recurring series. Each one is a format, not a one-off video — that is what
// makes a following instead of a spike.
export const SERIES = [
  {
    name: "Dealer Translation",
    cadence: "Weekly",
    hook: "What they said vs. what it means",
    body: "Money factor, acquisition fee, residual, doc fee, 'we're giving you $500 over book.' One term per episode, explained in sixty seconds, with the version of the sentence you should say back.",
  },
  {
    name: "Under Your Payment",
    cadence: "Weekly",
    hook: "You told me your budget. Here are three.",
    body: "One payment number, three real ways into the brand at it. Lease, finance, and CPO side by side. Comments become the next episode.",
  },
  {
    name: "Delivery Day",
    cadence: "Every delivery",
    hook: "The bow, the keys, the face",
    body: "Thirty seconds, no script, permission asked every time. This is the one that converts — people do not buy a car, they buy the feeling of that clip.",
  },
  {
    name: "Ask the Blonde",
    cadence: "Whenever the question is good",
    hook: "Reply-to-comment video",
    body: "Answer real comments on camera. Fastest trust-per-minute format there is, and it costs nothing to produce.",
  },
  {
    name: "Equity Check",
    cadence: "Monthly",
    hook: "You are sitting on money and you do not know it",
    body: "A live look at what specific model years are worth right now. Ends with the only CTA that matters: send me your VIN.",
  },
  {
    name: "The Walkaround",
    cadence: "New arrivals",
    hook: "The three things nobody points out",
    body: "Not a spec read. The one feature that sells the car, the one that disappoints people, and who it is actually for.",
  },
];

export const CONTENT_RULES = [
  "Hook in the first 1.5 seconds or nothing else matters.",
  "One idea per video. The second idea is tomorrow's video.",
  "Say the number. Vague content builds nothing.",
  "Every video ends with a reason to text, not a reason to 'link in bio.'",
  "Film vertical, always. Reformat later.",
  "Post the ugly one. The polished one that never ships is worth zero.",
];
