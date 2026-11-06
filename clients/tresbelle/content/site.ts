/**
 * TresBelle — single source of truth for site content.
 *
 * Every page reads from this file, so the business can be updated without
 * touching components. Data below was taken from the public GlossGenius
 * booking page (tresbelle.glossgenius.com) on 2026-11-06.
 *
 * Prices: TresBelle hides most prices on GlossGenius, so the site does too.
 * A `null` price renders as "See booking"; only prices that GlossGenius
 * shows publicly are listed here.
 */

export const BOOKING_URL = "https://tresbelle.glossgenius.com/";
export const INSTAGRAM_URL = "https://www.instagram.com/tres.belle.aesthetics/";
export const INSTAGRAM_HANDLE = "@tres.belle.aesthetics";

export type Service = {
  name: string;
  blurb: string;
  /** Minutes. null = not published. */
  duration: number | null;
  /** USD, whole dollars. null = hidden on GlossGenius → "See booking". */
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
  legalName: "Tres Belle Wellness & Aesthetics",
  tagline: "When you look good, you feel good.",
  description:
    "Tres Belle Wellness & Aesthetics in Oakdale, NY: neurotoxins, fillers, skin rejuvenation and IV therapy from nurse practitioners, with an honest assessment at every visit.",
  location: "Oakdale, NY",
  address: {
    street: "1551 Montauk Hwy., Suite B",
    locality: "Oakdale",
    region: "NY",
    postalCode: "11769",
  },
  phone: "(631) 445-2266",
  email: "tresbelle.wellness3@gmail.com",
  /** Display rows; `schema` feeds JSON-LD openingHours. */
  hours: [
    { days: "Monday", time: "9:30am – 1pm", schema: "Mo 09:30-13:00" },
    { days: "Tuesday", time: "6pm – 8pm", schema: "Tu 18:00-20:00" },
    { days: "Wednesday", time: "6pm – 8pm", schema: "We 18:00-20:00" },
    { days: "Thursday", time: "8am – 1pm", schema: "Th 08:00-13:00" },
    { days: "Friday", time: "9am – 4:30pm", schema: "Fr 09:00-16:30" },
    { days: "Saturday", time: "8am – 1pm", schema: "Sa 08:00-13:00" },
    { days: "Sunday", time: "Closed", schema: null },
  ],
};

export const addressLine = `${brand.address.street}, ${brand.address.locality}, ${brand.address.region} ${brand.address.postalCode}`;
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${brand.legalName}, ${addressLine}`)}`;

export const nav = [
  { href: "/about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#visit", label: "Visit" },
  { href: "/policies", label: "Policies" },
];

export const team = [
  { name: "Deborah Roth", credential: "NP", role: "Nurse Practitioner" },
  { name: "Tracey Joost-Morea", credential: "NP", role: "Nurse Practitioner" },
  { name: "Julia Dimitri", credential: "RN", role: "Registered Nurse" },
  { name: "Kassia Gonzalez", credential: null, role: "Aesthetics" },
];

/** About copy. `mission` is TresBelle's own wording from GlossGenius. */
export const about = {
  mission:
    "We are committed to providing you with an honest assessment and trusted expertise toward achieving the best results for a younger looking you.",
  signoff: "When you look good, you feel good!",
  story: [
    "Tres Belle Wellness & Aesthetics is a clinician-led studio on Montauk Highway in Oakdale. Our injectors are nurse practitioners and registered nurses, so every treatment is planned and performed with clinical care.",
    "We keep the menu focused: neurotoxins and fillers, collagen-building skin treatments, and IV therapy. Every visit starts with an honest conversation about what will help, and what you don't need.",
  ],
  facts: [
    { value: "4", label: "Licensed providers" },
    { value: "15", label: "Treatments offered" },
    { value: "6", label: "Days a week" },
  ],
};

export const firstVisit = [
  { n: "01", title: "Book online", body: "Choose a treatment or a consultation on GlossGenius. A card on file holds your appointment." },
  { n: "02", title: "Consult", body: "We talk through your goals, review your health history, and recommend only what makes sense for you." },
  { n: "03", title: "Treat", body: "Your provider performs the treatment. Most visits take under an hour." },
  { n: "04", title: "Follow up", body: "Neurotoxin clients can book a touch-up visit two weeks later to fine-tune results." },
];

export const faqs = [
  {
    q: "How do I book?",
    a: "Online through our GlossGenius booking page, any time. You can choose your treatment, your provider and a time that suits you.",
  },
  {
    q: "I'm new to injectables. Where should I start?",
    a: "Book a consultation. It's a short visit where we assess your goals and give you an honest recommendation and a plan.",
  },
  {
    q: "Who performs the treatments?",
    a: "Our team of nurse practitioners and a registered nurse. You can see each provider and their availability when you book.",
  },
  {
    q: "How long does Botox last?",
    a: "Results from Botox, Xeomin and Dysport typically last about 3 to 4 months. A touch-up visit is available two weeks after treatment.",
  },
  {
    q: "Why don't you list every price?",
    a: "Many treatments are priced to your individual plan, such as the number of units or syringes. Current pricing is on our booking page, and we can go over costs with you at your consultation.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Please give at least 24 hours' notice. Late cancellations and no-shows incur a $50 nonrefundable fee charged to the card on file.",
  },
  {
    q: "Do you have a birthday offer?",
    a: "Yes. Enjoy $25 off your next treatment for your birthday.",
  },
];

export const pillars = [
  {
    n: "01",
    title: "An honest assessment",
    body: "Every plan starts with a straight answer about what will help, what won't, and what you don't need.",
  },
  {
    n: "02",
    title: "Clinical expertise",
    body: "Treatments are performed by nurse practitioners and nurses, so results are safe and natural-looking.",
  },
  {
    n: "03",
    title: "Look good, feel good",
    body: "From wrinkle relaxers to IV therapy, the goal is the same: a refreshed, younger-looking you who feels it too.",
  },
];

export const services: ServiceCategory[] = [
  {
    id: "neurotoxins",
    title: "Neurotoxins",
    kicker: "Smooth",
    intro: "Botox, Xeomin and Dysport to soften expression lines, plus targeted treatments for the lip and for excessive sweating.",
    services: [
      { name: "Botox / Xeomin / Dysport", blurb: "Smooths wrinkles. Results last about 3–4 months.", duration: 20, price: null },
      {
        name: "Lip Flip",
        blurb: "A small dose relaxes the upper-lip muscle so the lip curls outward, looking fuller and more defined.",
        duration: 15,
        price: null,
      },
      { name: "Tox Touch-Up", blurb: "A follow-up visit two weeks after your neurotoxin treatment.", duration: 10, price: null },
      {
        name: "Hyperhidrosis Treatment",
        blurb: "Neurotoxin calms the sweat glands to reduce excessive sweating.",
        duration: 45,
        price: null,
      },
    ],
  },
  {
    id: "injectables",
    title: "Fillers & Injectables",
    kicker: "Restore",
    intro: "Volume, structure and contour, placed with a conservative hand.",
    services: [
      { name: "Dermal Filler", blurb: "Restores volume and definition in the lips, cheeks, chin and jawline.", duration: 45, price: null },
      { name: "Sculptra", blurb: "A collagen stimulator that rebuilds volume gradually for a natural result.", duration: 75, price: null },
      {
        name: "Kybella",
        blurb: "The only FDA-approved injectable that permanently destroys fat cells under the chin to refine your profile.",
        duration: 30,
        price: null,
      },
      { name: "Plasma Injections", blurb: "Your own plasma, used to rejuvenate skin.", duration: 40, price: 350 },
    ],
  },
  {
    id: "skin",
    title: "Skin Rejuvenation",
    kicker: "Renew",
    intro: "Collagen-building treatments for texture, tone, fine lines and scarring.",
    services: [
      {
        name: "Microneedling",
        blurb: "Collagen induction therapy to tighten and lift skin, and to treat fine lines, hyperpigmentation, acne and stretch marks.",
        duration: 60,
        price: null,
      },
      {
        name: "Hydra Needle Facial",
        blurb: "Microneedling combined with a custom cocktail of rejuvenating products matched to your skin concerns.",
        duration: 60,
        price: null,
      },
      {
        name: "Stem Cell Microchanneling",
        blurb: "Stem cell serum delivered through micro-channels to address acne scars, uneven tone, pigmentation, fine lines and more.",
        duration: 80,
        price: 400,
        priceFrom: true,
      },
      {
        name: "Fibroblast",
        blurb: "A non-surgical treatment that stimulates collagen and elastin to tighten skin and soften wrinkles.",
        duration: 75,
        price: 350,
        priceFrom: true,
      },
      { name: "Chemical Peel", blurb: "Resurfaces dullness, uneven tone and texture.", duration: 20, price: null },
    ],
  },
  {
    id: "wellness",
    title: "Wellness & Consults",
    kicker: "Begin",
    intro: "Hydration and nutrients from the inside, and a no-pressure place to start.",
    services: [
      { name: "IV Therapy", blurb: "Hydration and nutrient infusions to help you feel your best.", duration: 45, price: null },
      { name: "Consultation", blurb: "An honest assessment of your goals and a treatment plan that fits them.", duration: 15, price: null },
    ],
  },
];

export const policies = [
  {
    title: "Booking",
    body: "Appointments are booked online through GlossGenius. A credit card is required to hold your appointment.",
  },
  {
    title: "Cancellations",
    body: "Please give at least 24 hours' notice if you need to cancel. Your appointment and well-being matter to us, and we understand unexpected delays happen.",
  },
  {
    title: "Late cancellations & no-shows",
    body: "Cancelling less than 24 hours before your appointment, or missing it without cancelling, incurs a $50 nonrefundable fee charged to the card on file.",
  },
  {
    title: "Birthday treat",
    body: "Happy birthday! Enjoy $25 off your next treatment.",
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
