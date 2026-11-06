/**
 * TresBelle Aesthetics — single source of truth for site content.
 *
 * Every page reads from this file, so the business can be updated without
 * touching components. Anything marked `// VERIFY` was written without
 * access to the live GlossGenius menu or Instagram profile and must be
 * checked against them before launch. Prices are deliberately left `null`
 * so the site never shows a figure the business hasn't confirmed; a null
 * price renders as "See booking".
 */

export const BOOKING_URL = "https://tresbelle.glossgenius.com/";
export const INSTAGRAM_URL = "https://www.instagram.com/tres.belle.aesthetics/";
export const INSTAGRAM_HANDLE = "@tres.belle.aesthetics";

export type Service = {
  name: string;
  blurb: string;
  /** Minutes. null = not confirmed yet. */
  duration: number | null;
  /** USD, whole dollars. null = not confirmed yet → "See booking". */
  price: number | null;
  /** Renders "from $X" instead of "$X". */
  priceFrom?: boolean;
};

export type ServiceCategory = {
  id: string;
  title: string;
  kicker: string;
  intro: string;
  services: Service[];
};

export const brand = {
  name: "TresBelle",
  legalName: "Très Belle Aesthetics",
  tagline: "Very beautiful. Quietly so.",
  description:
    "Très Belle Aesthetics is a boutique aesthetics studio for natural-looking results: skin first, never overdone, always tailored to you.",
  location: "", // VERIFY: city / neighborhood, e.g. "Oakdale, NY"
  address: "", // VERIFY: street address as listed on GlossGenius
  phone: "", // VERIFY
  email: "", // VERIFY
  hours: [] as { days: string; time: string }[], // VERIFY: e.g. { days: "Tue–Fri", time: "10am – 7pm" }
};

export const nav = [
  { href: "/#services", label: "Services" },
  { href: "/#approach", label: "Approach" },
  { href: "/#visit", label: "Visit" },
  { href: "/policies", label: "Policies" },
];

export const pillars = [
  {
    n: "01",
    title: "Consult first",
    body: "Every first visit starts with a conversation about your face, your goals, and what you don't want changed.",
  },
  {
    n: "02",
    title: "Less, done well",
    body: "Results that read as rested and refreshed rather than altered. We'd rather you come back for more than wish you'd had less.",
  },
  {
    n: "03",
    title: "Skin is the canvas",
    body: "Injectables last longer and look better on healthy skin, so the plan covers home care and in-studio skin treatments too.",
  },
];

// VERIFY: replace with the exact menu, durations and prices from GlossGenius.
export const services: ServiceCategory[] = [
  {
    id: "injectables",
    title: "Injectables",
    kicker: "Refine",
    intro: "Neuromodulators and fillers placed conservatively, with a follow-up included so we can fine-tune.",
    services: [
      { name: "Neuromodulator", blurb: "Softens expression lines across the forehead, frown lines and crow's feet.", duration: null, price: null },
      { name: "Lip Filler", blurb: "Hydration, shape and definition, from a subtle flush to fuller volume.", duration: null, price: null },
      { name: "Dermal Filler", blurb: "Restores lost volume and structure in the cheeks, chin and jawline.", duration: null, price: null },
    ],
  },
  {
    id: "skin",
    title: "Skin",
    kicker: "Restore",
    intro: "Treatments for clearer, brighter, more even skin, and a better base for everything else.",
    services: [
      { name: "Signature Facial", blurb: "A deep cleanse, exfoliation and treatment mask matched to your skin that day.", duration: null, price: null },
      { name: "Chemical Peel", blurb: "Resurfaces dullness, uneven tone and texture. Strength set at consult.", duration: null, price: null },
      { name: "Microneedling", blurb: "Collagen induction for texture, fine lines and acne scarring.", duration: null, price: null },
    ],
  },
  {
    id: "consult",
    title: "Consultations",
    kicker: "Begin",
    intro: "Not sure where to start? Book a consult and leave with a plan, not a sales pitch.",
    services: [
      { name: "New Client Consultation", blurb: "Facial assessment, treatment options, realistic outcomes and a quote.", duration: null, price: null },
    ],
  },
];

// VERIFY: confirm wording against the GlossGenius booking policies.
export const policies = [
  {
    title: "Booking & deposits",
    body: "Appointments are booked online through GlossGenius. A deposit may be required to hold your time and is applied to your service.",
  },
  {
    title: "Cancellations",
    body: "Please give at least 24 hours' notice to cancel or reschedule. Late cancellations and no-shows may forfeit the deposit.",
  },
  {
    title: "Running late",
    body: "We'll always try to fit you in, but arriving more than 15 minutes late may mean a shortened service or rescheduling.",
  },
  {
    title: "Before injectables",
    body: "Please let us know if you are pregnant, nursing, on blood thinners, or have an event within two weeks of your appointment.",
  },
];

export function formatPrice(s: Service): string {
  if (s.price === null) return "See booking";
  return `${s.priceFrom ? "from " : ""}$${s.price.toLocaleString("en-US")}`;
}

export function formatDuration(minutes: number | null): string | null {
  if (minutes === null) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return [h ? `${h} hr` : "", m ? `${m} min` : ""].filter(Boolean).join(" ");
}
