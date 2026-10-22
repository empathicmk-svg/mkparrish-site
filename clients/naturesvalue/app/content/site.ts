// All copy and company facts live here so the client can review them in one place.
//
// Facts marked VERIFY came from public listings (LinkedIn, Thomasnet, NSF,
// local news) and must be confirmed with Nature's Value before launch.
// Values marked PLACEHOLDER are not known yet and must be supplied.

export const COMPANY = {
  name: "Nature's Value",
  legalName: "Nature's Value, Inc.",
  founded: 1992, // VERIFY
  tagline: "Contract manufacturing for dietary supplement brands",
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

export const NAV = [
  { href: "/capabilities", label: "Capabilities" },
  { href: "/quality", label: "Quality" },
  { href: "/about", label: "About" },
];

export const STATS = [
  { value: "30+", label: "Years manufacturing supplements" }, // VERIFY: from founding year
  { value: "426K", label: "Sq ft North Carolina facility" }, // VERIFY
  { value: "455-2", label: "NSF/ANSI GMP standard" }, // VERIFY: current NSF listing
];

export const DOSAGE_FORMS = [
  {
    slug: "capsules",
    title: "Capsules",
    body: "Two-piece hard capsules in gelatin or vegetarian shells, filled with powders and blends to your formula.",
    points: ["Gelatin and vegetarian shells", "Single and multi-ingredient blends", "Custom fill weights"],
  },
  {
    slug: "tablets",
    title: "Tablets",
    body: "Compressed tablets from simple single-nutrient formulas to complex multivitamins, with coating options.",
    points: ["Multivitamins and minerals", "Film and enteric coating", "Range of shapes and sizes"],
  },
  {
    slug: "liquid-caps",
    title: "Liquid caps",
    body: "Liquid-filled capsules for oils and suspensions that don't suit a powder fill.",
    points: ["Oils and suspensions", "Sealed for shelf stability", "Vegetarian options"], // VERIFY with client
  },
  {
    slug: "powders",
    title: "Powders",
    body: "Blended powders for drink mixes and scoops, packed in tubs, stick packs or bulk.",
    points: ["Drink mixes and blends", "Tubs and stick packs", "Bulk for further processing"], // VERIFY with client
  },
];

export const SERVICES = [
  {
    title: "Formulation",
    body: "Bring a finished formula or a target label claim. Our team works out a formula that runs well on the line and holds up on the shelf.",
  },
  {
    title: "Raw material sourcing",
    body: "Ingredients come from qualified suppliers and are tested for identity before they reach production.",
  },
  {
    title: "Manufacturing",
    body: "Blending, encapsulation and tableting at commercial scale, from first production run to repeat orders.",
  },
  {
    title: "Packaging",
    body: "Bottling, labeling and finished-goods packaging, so product ships ready for retail.",
  },
  {
    title: "Testing",
    body: "In-house quality control checks materials and finished product against specification before release.",
  },
  {
    title: "Regulatory support",
    body: "Documentation that supports your label claims and keeps your retail partners' compliance teams satisfied.",
  },
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

export const ABOUT = {
  intro:
    "Nature's Value has made vitamins and dietary supplements for other brands since 1992. Brands come to us for capacity, consistency, and a team that knows the regulations.", // VERIFY
  growth:
    "We are bringing our headquarters and manufacturing together in one purpose-built facility in Winston-Salem, North Carolina, with manufacturing, testing and laboratory space under one roof.", // VERIFY: timing and wording with client
};
