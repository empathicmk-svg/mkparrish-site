// All copy and company facts live here so the client can review them in one place.
//
// Facts marked VERIFY came from public listings (LinkedIn, Thomasnet, NSF,
// trade press, local news) and must be confirmed with Nature's Value before
// launch. Values marked PLACEHOLDER are not known yet and must be supplied.
// No prices, minimums or lead times are stated anywhere until the client
// gives real numbers.

export const COMPANY = {
  name: "Nature's Value",
  legalName: "Nature's Value, Inc.",
  founded: 1992, // VERIFY
  tagline: "Private label and contract manufacturing for supplement brands",
  phone: "", // PLACEHOLDER: main sales line
  email: "", // PLACEHOLDER: sales inbox, e.g. sales@naturesvalue.com
  url: "https://www.naturesvalue.com",
};

export const LOCATIONS = [
  {
    name: "Long Island, New York",
    detail: "468 Mill Road, Coram, NY 11727", // VERIFY
    note: "Current manufacturing and headquarters", // VERIFY
  },
  {
    name: "Winston-Salem, North Carolina",
    detail: "Whitaker Park", // VERIFY
    note: "New 426,000 sq ft manufacturing, testing and laboratory center", // VERIFY
  },
];

export type Item = {
  slug: string;
  title: string;
  short: string;
  body: string;
  points: string[];
  idealFor?: string[];
};

export const DOSAGE_FORMS: Item[] = [
  {
    slug: "capsules",
    title: "Capsules",
    short: "Gelatin and vegetarian two-piece capsules, filled to your formula.",
    body: "Capsules are the most flexible format for new products: they take single ingredients or complex blends, fill quickly, and are familiar to every shopper. We fill two-piece hard capsules in gelatin or plant-based shells across a range of sizes, with fill weights matched to your label claim.",
    points: ["Gelatin and vegetarian shells", "Single and multi-ingredient blends", "Custom fill weights", "Choice of shell colors"],
    idealFor: ["Herbal and botanical blends", "Probiotics and sensitive ingredients", "Fast launches and line extensions"],
  },
  {
    slug: "tablets",
    title: "Tablets",
    short: "Compressed tablets from single nutrients to full multivitamins, with coating options.",
    body: "Tablets fit the most active ingredients into each serving, which makes them the go-to for multivitamins and high-potency formulas. We compress, coat and finish tablets in a range of shapes and sizes, with coatings that help with swallowing, taste and release.",
    points: ["Multivitamins and minerals", "Film and enteric coating", "Range of shapes and sizes", "High-potency formulas"],
    idealFor: ["Daily multivitamins", "Mineral formulas", "Value-priced retail lines"],
  },
  {
    slug: "liquid-caps",
    title: "Liquid caps",
    short: "Liquid-filled capsules for oils and suspensions.",
    body: "Some ingredients work best as a liquid. Liquid-filled capsules hold oils and suspensions in a sealed shell, giving shoppers an easy-to-swallow format and protecting the fill from air.", // VERIFY: confirm format and options with client
    points: ["Oils and suspensions", "Sealed for shelf stability", "Easy to swallow", "Vegetarian options"], // VERIFY
    idealFor: ["Fat-soluble vitamins", "Omega and oil blends", "Premium product lines"],
  },
  {
    slug: "powders",
    title: "Powders",
    short: "Blended powders for drink mixes and scoops, in tubs, stick packs or bulk.",
    body: "Powders deliver large servings that won't fit in a capsule, and they're the format behind drink mixes, greens and protein blends. We blend to a consistent result and pack in tubs, stick packs or bulk.", // VERIFY: confirm packaging formats with client
    points: ["Drink mixes and blends", "Tubs and stick packs", "Flavored and unflavored", "Bulk for further processing"], // VERIFY
    idealFor: ["Greens and superfood blends", "Sports and hydration mixes", "Large-serving formulas"],
  },
];

export const SERVICES: Item[] = [
  {
    slug: "private-label",
    title: "Private label",
    short: "Put your brand on proven formulas and get to shelf fast.",
    body: "Private label is the quickest way to launch. Start from an established formula, add your brand, and we handle manufacturing and packaging. It's a low-risk way to test a market or fill out a product line.",
    points: ["Start from proven formulas", "Your brand on the label", "Fewer development steps", "Room to customize later"],
  },
  {
    slug: "custom-formulation",
    title: "Custom formulation",
    short: "A formula built around your idea, made to run well and last on the shelf.",
    body: "Bring a concept, a target label or a finished formula. Our team works out a formula that hits your claims, runs well on the line and holds up on the shelf, then refines it with you until it's right.",
    points: ["Concept-to-formula development", "Ingredient selection and dosing", "Manufacturability review", "Stability considerations"],
  },
  {
    slug: "manufacturing",
    title: "Contract manufacturing",
    short: "Commercial-scale blending, encapsulation and tableting.",
    body: "Blending, encapsulation and tableting at commercial scale, from your first production run to repeat orders. One quality system covers every step, so there is one team accountable for your product.",
    points: ["Capsules, tablets, liquid caps, powders", "First runs and repeat orders", "One quality system", "Scheduled reorders"],
  },
  {
    slug: "packaging",
    title: "Packaging and labeling",
    short: "Bottling, labeling and finishing, so product ships retail-ready.",
    body: "We fill, cap, seal and label your product, then pack it for shipment, so it arrives ready for the shelf or your fulfillment partner.",
    points: ["Bottle filling and capping", "Induction sealing", "Labeling", "Case packing"], // VERIFY with client
  },
  {
    slug: "testing",
    title: "Testing and lab services",
    short: "In-house testing of materials and finished product.",
    body: "Quality control checks raw materials before they reach production, and finished product before it ships. You get the results with every lot.",
    points: ["Raw material identity testing", "Finished product testing", "Certificates of analysis", "Retention samples"],
  },
  {
    slug: "regulatory",
    title: "Regulatory support",
    short: "Documentation that keeps your label claims and retailers covered.",
    body: "We supply the documentation behind your product, from batch records to certificates of analysis, so your label claims are supported and your retail partners' compliance teams have what they need.",
    points: ["Label review support", "Batch documentation", "Retailer compliance paperwork", "Audit support"],
  },
];

export const INDUSTRIES: Item[] = [
  {
    slug: "emerging-brands",
    title: "Emerging brands",
    short: "Launching your first product? We'll walk you through every step.",
    body: "Your first product has a lot riding on it. We help you choose a format, settle the formula, and plan the first run, so you launch with a product you're proud of and a partner who can grow with you.",
    points: ["Guidance from first call to first run", "Private label or custom formula", "Help choosing format and packaging", "A partner who scales with you"],
  },
  {
    slug: "established-brands",
    title: "Established brands",
    short: "Capacity, consistency and a second source you can rely on.",
    body: "When volumes grow, you need a manufacturer who delivers the same product every time, on schedule. We add capacity for growing lines and work as a dependable second source.",
    points: ["Commercial-scale capacity", "Consistent lot-to-lot quality", "Scheduled reorders", "Line extensions"],
  },
  {
    slug: "retailers",
    title: "Retailers and store brands",
    short: "Store-brand supplements made to your specifications.",
    body: "Retailers and distributors trust us with store-brand supplements made to their specification, with the documentation their compliance teams expect.",
    points: ["Made to your specification", "Retail-ready packaging", "Compliance documentation", "Range-wide programs"],
  },
  {
    slug: "practitioners",
    title: "Practitioners and clinics",
    short: "Professional-line supplements for your patients and clients.",
    body: "Health practitioners use us to create their own professional line, so patients get a formula their practitioner chose, under the practice's own name.",
    points: ["Your own professional line", "Formulas chosen by you", "Smaller, focused ranges", "Simple reordering"],
  },
];

export const NAV = [
  {
    label: "Capabilities",
    href: "/capabilities",
    blurb: "Dosage forms we make",
    items: DOSAGE_FORMS.map((d) => ({ href: `/capabilities/${d.slug}`, label: d.title, desc: d.short })),
  },
  {
    label: "Services",
    href: "/services",
    blurb: "From formula to finished bottle",
    items: SERVICES.map((s) => ({ href: `/services/${s.slug}`, label: s.title, desc: s.short })),
  },
  {
    label: "Who we serve",
    href: "/industries",
    blurb: "Partners at every stage",
    items: INDUSTRIES.map((i) => ({ href: `/industries/${i.slug}`, label: i.title, desc: i.short })),
  },
  { label: "Quality", href: "/quality" },
  {
    label: "Company",
    href: "/about",
    blurb: "Who we are",
    items: [
      { href: "/about", label: "About us", desc: "Making supplements since 1992." }, // VERIFY year
      { href: "/process", label: "How it works", desc: "Five steps from inquiry to delivery." },
      { href: "/faq", label: "FAQ", desc: "Answers to the questions brands ask most." },
      { href: "/contact", label: "Contact", desc: "Talk to our team about your product." },
    ],
  },
];

export const STATS = [
  { value: 30, suffix: "+", label: "Years manufacturing supplements" }, // VERIFY: from founding year
  { value: 426, suffix: "K", label: "Sq ft North Carolina facility" }, // VERIFY
  { value: 4, suffix: "", label: "Dosage forms under one roof" },
  { value: 1, suffix: "", label: "Quality system, start to finish" },
];

export const PROCESS = [
  { step: "01", title: "Inquiry", body: "Tell us about the product, the dosage form and the volumes you expect." },
  { step: "02", title: "Formula review", body: "We review the formula, confirm ingredients and suggest any changes that help it run." },
  { step: "03", title: "Quote", body: "You get pricing for your volumes, with minimum order quantities and lead times." },
  { step: "04", title: "Production", body: "Materials are tested, the batch is made, and finished goods are checked before release." },
  { step: "05", title: "Delivery", body: "Finished product ships with its documentation, and we schedule your reorders." },
];

export const QUALITY = [
  {
    title: "cGMP manufacturing",
    body: "Production follows FDA current Good Manufacturing Practice for dietary supplements (21 CFR Part 111).",
  },
  {
    title: "Third-party GMP listing",
    body: "Our Coram facility is listed by NSF under NSF/ANSI 455-2, the GMP standard for dietary supplements.", // VERIFY
  },
  {
    title: "Incoming material testing",
    body: "Every raw material is checked for identity, and for purity and strength where required, before it is released to production.",
  },
  {
    title: "Finished product release",
    body: "Each batch is tested against its specification and reviewed by quality assurance before it ships.",
  },
  {
    title: "Batch records and traceability",
    body: "Complete batch records tie every lot back to the materials and equipment used to make it.",
  },
  {
    title: "Retention samples",
    body: "Samples of each lot are retained so any question about a shipment can be answered from the product itself.",
  },
];

export const WHY = [
  { title: "Concept to shelf", body: "Formulation, sourcing, manufacturing, testing and packaging with one partner." },
  { title: "Speed to market", body: "Private label formulas and a clear process get your product launched sooner." },
  { title: "Built to scale", body: "Commercial capacity for first runs today and much bigger orders tomorrow." },
  { title: "Quality on record", body: "cGMP production, tested lots and full batch records with every shipment." },
];

export const FAQ = [
  {
    q: "What's the difference between private label and custom formulation?",
    a: "Private label puts your brand on one of our established formulas, which is the fastest route to market. Custom formulation builds a formula around your idea. Many brands launch with private label and add custom products later.",
  },
  {
    q: "What are your minimum order quantities?",
    a: "Minimums depend on the dosage form, formula and packaging. Tell us about your product and we'll include minimums in your quote.", // PLACEHOLDER: replace with real MOQs if the client publishes them
  },
  {
    q: "How long does it take to get my product made?",
    a: "Lead time depends on whether the formula is ready, ingredient availability and your packaging. Your quote includes a timeline for your project.", // PLACEHOLDER
  },
  {
    q: "Can I bring my own formula?",
    a: "Yes. Send it with your inquiry and we'll review it for ingredients, dosing and how well it will run in production.",
  },
  {
    q: "Which dosage forms do you make?",
    a: "Capsules, tablets, liquid caps and powders. If you're not sure which suits your product, we'll help you decide.",
  },
  {
    q: "How do you make sure every batch is right?",
    a: "We test raw materials before production and finished product before release, keep complete batch records for every lot, and retain samples of each shipment.",
  },
  {
    q: "Do you handle packaging and labels?",
    a: "Yes. We fill, seal and label your product and pack it for shipment, so it arrives ready for retail or your fulfillment partner.",
  },
  {
    q: "Where is your manufacturing?",
    a: "We manufacture in Coram, New York, and are consolidating into a new facility in Winston-Salem, North Carolina.", // VERIFY
  },
];

export const ABOUT = {
  intro:
    "Nature's Value has made vitamins and dietary supplements for other brands since 1992. Brands come to us for capacity, consistency, and a team that knows the regulations.", // VERIFY
  growth:
    "We are bringing our headquarters and manufacturing together in one purpose-built facility in Winston-Salem, North Carolina, with manufacturing, testing and laboratory space under one roof.", // VERIFY: timing and wording with client
};

// Every page, for the site search and sitemap.
export const PAGES = [
  { href: "/", label: "Home", group: "Site" },
  { href: "/capabilities", label: "Capabilities", group: "Site" },
  ...DOSAGE_FORMS.map((d) => ({ href: `/capabilities/${d.slug}`, label: d.title, group: "Capabilities" })),
  { href: "/services", label: "Services", group: "Site" },
  ...SERVICES.map((s) => ({ href: `/services/${s.slug}`, label: s.title, group: "Services" })),
  { href: "/industries", label: "Who we serve", group: "Site" },
  ...INDUSTRIES.map((i) => ({ href: `/industries/${i.slug}`, label: i.title, group: "Who we serve" })),
  { href: "/quality", label: "Quality", group: "Site" },
  { href: "/about", label: "About us", group: "Company" },
  { href: "/process", label: "How it works", group: "Company" },
  { href: "/start", label: "Build your product", group: "Company" },
  { href: "/faq", label: "FAQ", group: "Company" },
  { href: "/contact", label: "Request a quote", group: "Company" },
];
