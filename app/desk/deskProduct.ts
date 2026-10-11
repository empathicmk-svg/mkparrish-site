/**
 * Product knowledge for a new salesperson.
 *
 * ACCURACY NOTE, stated plainly: the starting prices here are approximate
 * base MSRPs for orientation — "is this a $50k car or a $150k car" — not
 * quoting figures. Real MSRP is per-VIN and options move it by many thousands,
 * so anything typed off a window sticker always wins and is remembered.
 *
 * No photography is bundled: Mercedes product imagery is licensed, and a stale
 * local copy would show the wrong model year. Each class links to its official
 * MBUSA page instead, which is always current and is the right thing to hand a
 * customer anyway.
 */

export type ClassInfo = {
  id: string;
  name: string;
  body: string;
  positioning: string;
  who: string;
  features: string[];
  talkTrack: string;
  crossShop: string[];
  url: string;
};

export const MB_ALL_VEHICLES = 'https://www.mbusa.com/en/all-vehicles';

/** Keyed by the `group` field already on each model. */
export const CLASSES: Record<string, ClassInfo> = {
  CLA: {
    id: 'CLA', name: 'CLA', body: 'Coupe-styled sedan',
    positioning: 'The entry point to the brand — the car that makes someone a Mercedes owner for life.',
    who: 'First-time luxury buyer, 25–40, often a lease. Frequently a conquest from Audi A3 or BMW 2 Series.',
    features: [
      'Frameless doors and the lowest-slung roofline in the lineup — it looks more expensive than it is',
      'MBUX with the "Hey Mercedes" voice assistant',
      'Available 4MATIC all-wheel drive — matters on Long Island in February',
      'PHEV variants available with meaningfully higher incentive cash this month',
      'AMG CLA 35 and 45 S for the buyer who wants real performance in a small package',
    ],
    talkTrack: 'This is the one that gets people into the brand. Lead with the payment, not the price — a CLA lease often lands near what they are paying for a loaded mainstream sedan.',
    crossShop: ['BMW 2 Series Gran Coupe', 'Audi A3', 'Acura Integra'],
    url: 'https://www.mbusa.com/en/vehicles/class/cla/sedan',
  },
  'C-Class': {
    id: 'C-Class', name: 'C-Class', body: 'Sedan',
    positioning: 'The classic Mercedes sedan. The default answer when someone says "I want a Mercedes."',
    who: 'Professional 30–55, first or second luxury car. Heavy BMW 3 Series cross-shop.',
    features: [
      'S-Class-derived interior — huge portrait touchscreen, real materials',
      'Turbo four with 48-volt mild hybrid for smooth, efficient power delivery',
      '4MATIC available',
      'AMG C 43 for performance; C 63 S E Performance is a 671-hp plug-in hybrid',
      'Strong residual values, which is what makes the lease payment work',
    ],
    talkTrack: 'If they are cross-shopping a 3 Series, put them in the driver seat and let the interior do the work. The cabin is where Mercedes wins that comparison.',
    crossShop: ['BMW 3 Series', 'Audi A4', 'Genesis G70'],
    url: 'https://www.mbusa.com/en/vehicles/class/c-class/sedan',
  },
  'E-Class': {
    id: 'E-Class', name: 'E-Class', body: 'Sedan & Wagon',
    positioning: 'The heart of the brand and an August focus model. The car Mercedes builds best.',
    who: 'Established buyer 40–65, often a repeat customer. Wagon buyers are a small, loyal, low-negotiation group.',
    features: [
      'Superscreen dash option spanning the full width of the cabin',
      'Available inline-six with 48-volt hybrid — exceptionally smooth',
      'Rear-axle steering on some configurations for a tighter turning circle',
      'The E 450 All-Terrain wagon is the enthusiast pick and sells itself',
      'MY26 E-Sedan lease residual was enhanced this month — the payment is sharper than last month',
    ],
    talkTrack: 'August focus model with $2,000 MIB. If they are in an older E, the equity call writes itself: same car, newer, similar payment.',
    crossShop: ['BMW 5 Series', 'Audi A6', 'Genesis G80', 'Lexus ES'],
    url: 'https://www.mbusa.com/en/vehicles/class/e-class/sedan',
  },
  CLE: {
    id: 'CLE', name: 'CLE', body: 'Coupe & Cabriolet',
    positioning: 'Replaced both the C and E coupes. The emotional purchase in the lineup.',
    who: 'Empty-nester, second or third car, cash or short lease. Rarely payment-driven.',
    features: [
      'Coupe and true soft-top cabriolet',
      'AIRCAP and AIRSCARF in the cabriolet — top-down driving into November on Long Island',
      '4MATIC available, which is rare in this segment and a real closing point',
      'AMG CLE 53 with an inline-six hybrid',
    ],
    talkTrack: 'Do not sell this on payment. Sell the Saturday morning with the top down. Get them in it — a cabriolet demo drive closes itself.',
    crossShop: ['BMW 4 Series', 'Audi A5', 'Ford Mustang (convertible shoppers)'],
    url: 'https://www.mbusa.com/en/vehicles/class/cle/coupe',
  },
  'S-Class': {
    id: 'S-Class', name: 'S-Class', body: 'Flagship sedan',
    positioning: 'The best car in the world, and the reason the rest of the lineup gets taken seriously.',
    who: 'Business owner, executive, 45+. Maybach buyers are often chauffeur-driven.',
    features: [
      'Rear-axle steering makes a long car park like a C-Class',
      'Rear executive seating with massage, heated armrests, and available rear screens',
      'Digital Light headlamps that project onto the road',
      'S 580e plug-in hybrid for significant electric-only range',
      'Maybach S 580 and S 680 carry very large incentive support this month',
    ],
    talkTrack: 'Never lead with price. Lead with the back seat — sit them in it. Maybach carries the largest incentive cash in the entire guide right now.',
    crossShop: ['BMW 7 Series', 'Audi A8', 'Bentley Flying Spur (Maybach)'],
    url: 'https://www.mbusa.com/en/vehicles/class/s-class/sedan',
  },
  SL: {
    id: 'SL', name: 'AMG SL', body: 'Roadster',
    positioning: 'The heritage halo roadster, now AMG-built with a fabric top and 2+2 seating.',
    who: 'Collector or enthusiast, second/third car, usually cash or single-pay lease.',
    features: [
      'Fabric soft top that operates up to roughly 37 mph',
      'AMG-developed chassis with available rear-axle steering',
      'SL 43 uses an F1-derived electric exhaust-gas turbocharger',
      'SL 55 and 63 are 4MATIC+ with V8 power',
    ],
    talkTrack: 'This is a want, not a need. Do not over-explain. Hand them the keys and be quiet.',
    crossShop: ['Porsche 911 Cabriolet', 'BMW 8 Series Convertible', 'Chevrolet Corvette'],
    url: 'https://www.mbusa.com/en/vehicles/class/sl/roadster',
  },
  'AMG GT': {
    id: 'AMG GT', name: 'AMG GT', body: 'Coupe & 4-Door',
    positioning: 'The purest performance cars Mercedes sells.',
    who: 'Enthusiast who already owns a Mercedes. Very product-knowledge sensitive — they will know more than you at first, so be honest about it.',
    features: [
      'AMG hand-built engines — one engine, one builder, signed',
      '4MATIC+ all-wheel drive with a fully variable rear bias',
      'The 4-Door GT adds usable rear seats and a hatch',
      'Available AMG Track Pace telemetry',
    ],
    talkTrack: 'Do not pretend expertise you do not have. Say "let me get you exact specs" and follow up fast — with this buyer, credibility closes the deal.',
    crossShop: ['Porsche 911', 'BMW M8', 'Audi RS7'],
    url: 'https://www.mbusa.com/en/vehicles/class/amg-gt/coupe',
  },
  GLA: {
    id: 'GLA', name: 'GLA', body: 'Subcompact SUV',
    positioning: 'The lowest point of entry into a Mercedes SUV.',
    who: 'First-time luxury buyer, city driver, or a second household car. Lowest payment in the lineup.',
    features: [
      'Highest seating position relative to footprint — easy to park, easy to see out of',
      '4MATIC available',
      'MBUX with wireless CarPlay and Android Auto',
      'AMG GLA 35 for a hot-hatch feel in an SUV body',
    ],
    talkTrack: 'This is your lowest-payment door opener. Great for the customer who says "I did not think I could afford a Mercedes."',
    crossShop: ['BMW X1', 'Audi Q3', 'Volvo XC40', 'Lexus UX'],
    url: 'https://www.mbusa.com/en/vehicles/class/gla/suv',
  },
  GLB: {
    id: 'GLB', name: 'GLB', body: 'Compact SUV',
    positioning: 'The only Mercedes with an available third row under six figures.',
    who: 'Young family. The third row is the entire pitch.',
    features: [
      'Optional third row — seats up to seven',
      'Boxy roofline means real headroom and cargo height',
      'Sliding second row to trade legroom for cargo',
      '4MATIC available',
    ],
    talkTrack: 'If a family walks in and mentions carpool, this is the car. Nobody cross-shopping an X1 knows a seven-seat Mercedes exists at this price — show them.',
    crossShop: ['BMW X1', 'Audi Q3', 'Acura RDX', 'Volvo XC60'],
    url: 'https://www.mbusa.com/en/vehicles/class/glb/suv',
  },
  GLC: {
    id: 'GLC', name: 'GLC', body: 'SUV & Coupe',
    positioning: 'The best-selling Mercedes globally. Your bread and butter.',
    who: 'Everyone. Widest buyer range in the lineup, which is exactly why it sells.',
    features: [
      'Right-sized: garage-friendly but genuinely usable cargo space',
      '48-volt mild hybrid on the 300 for smooth stop-start',
      'GLC 350e plug-in hybrid with substantial electric range',
      'Coupe body style for a sportier look',
      'AMG GLC 43 and the 671-hp GLC 63 S E Performance',
    ],
    talkTrack: 'Carries 2.49% APR at 24 months this month — the sharpest rate in the guide. If they are financing, lead with the rate, not the price.',
    crossShop: ['BMW X3', 'Audi Q5', 'Lexus NX', 'Genesis GV70'],
    url: 'https://www.mbusa.com/en/vehicles/class/glc/suv',
  },
  GLE: {
    id: 'GLE', name: 'GLE', body: 'SUV & Coupe',
    positioning: 'August focus model and the highest-volume premium SUV in the range.',
    who: 'Family with real money, 40–60. Often a repeat Mercedes buyer trading up from a GLC.',
    features: [
      'Optional third row on the SUV',
      'Available inline-six with 48-volt hybrid — the sweet spot of the lineup',
      'AIRMATIC air suspension with E-ACTIVE BODY CONTROL available',
      'GLE 450e plug-in hybrid',
      'AMG GLE 53 and 63 S',
      'Enhanced lease money factor this month plus $2,000 MIB',
    ],
    talkTrack: 'Your single best equity-call target. GLE owners are loyal, they trade on cycle, and this month has both the enhanced money factor and the 6-payment LAP waiver.',
    crossShop: ['BMW X5', 'Audi Q7', 'Volvo XC90', 'Lexus RX'],
    url: 'https://www.mbusa.com/en/vehicles/class/gle/suv',
  },
  GLS: {
    id: 'GLS', name: 'GLS', body: 'Full-size SUV',
    positioning: 'The S-Class of SUVs. Three rows, no compromise.',
    who: 'Large family or someone who wants the biggest thing on the lot. Maybach GLS is a statement purchase.',
    features: [
      'Genuine adult-usable third row',
      'AIRMATIC air suspension standard',
      'E-ACTIVE BODY CONTROL available — it leans into corners',
      'Maybach GLS 600 with rear executive seating and a refrigerator',
      'Up to $15,000 MIB on Maybach GLS this month',
    ],
    talkTrack: 'Cross-shops Escalade and Navigator constantly. The differentiator is ride quality — take them over rough pavement and say nothing.',
    crossShop: ['BMW X7', 'Cadillac Escalade', 'Lincoln Navigator', 'Range Rover'],
    url: 'https://www.mbusa.com/en/vehicles/class/gls/suv',
  },
  'G-Class': {
    id: 'G-Class', name: 'G-Class', body: 'Icon',
    positioning: 'Forty-plus years unchanged in silhouette. Sells itself; usually allocation-limited.',
    who: 'Buyer who already decided. Your job is availability and paperwork, not persuasion.',
    features: [
      'Three locking differentials — genuinely capable off-road',
      'Hand-assembled body-on-frame construction',
      'The door latch sound is a real selling point, and customers know it',
      'G 580 with EQ Technology is the all-electric version with tank turn',
      'G 580 EQ carries $5,000 MIB this month',
    ],
    talkTrack: 'Do not sell. Take the deposit, be honest about timing, and keep them updated. This customer becomes a referral machine if you treat them well.',
    crossShop: ['Range Rover', 'Lexus LX', 'Rivian R1S (G 580 shoppers)'],
    url: 'https://www.mbusa.com/en/vehicles/class/g-class/suv',
  },
  EQE: {
    id: 'EQE', name: 'EQE', body: 'Electric Sedan & SUV',
    positioning: 'Electric equivalent of the E-Class, in both sedan and SUV bodies.',
    who: 'Tech-forward buyer, often a Tesla cross-shop, usually with home charging.',
    features: [
      'Substantial real-world range — confirm the current EPA figure before quoting it',
      'Available Hyperscreen',
      'One-pedal driving with adjustable regeneration paddles',
      'Rear-axle steering available',
      '$3,500 MIB across the EQ range this month',
    ],
    talkTrack: 'Always ask about home charging first — it decides whether the car works for them. Do not quote range or tax credits from memory; look them up in front of the customer.',
    crossShop: ['Tesla Model S / Model Y', 'BMW i5 / iX', 'Audi Q8 e-tron'],
    url: 'https://www.mbusa.com/en/vehicles/class/eqe/sedan',
  },
  EQS: {
    id: 'EQS', name: 'EQS', body: 'Electric Flagship',
    positioning: 'The electric S-Class. Longest range in the Mercedes lineup.',
    who: 'Early-adopter luxury buyer. Maybach EQS SUV is the halo.',
    features: [
      'The longest range Mercedes offers — verify the current figure before stating it',
      'Hyperscreen across the dash',
      'Rear-axle steering up to 10 degrees',
      'Maybach EQS 680 SUV carries $25,000 MIB this month',
    ],
    talkTrack: 'The quiet is the product. Do a demo drive with the radio off and let them notice it themselves.',
    crossShop: ['Tesla Model S', 'BMW i7', 'Lucid Air', 'Porsche Taycan'],
    url: 'https://www.mbusa.com/en/vehicles/class/eqs/sedan',
  },
  'Sprinter / Vans': {
    id: 'Sprinter / Vans', name: 'Sprinter', body: 'Commercial Van',
    positioning: 'Your least-worked, highest-upside segment. Same 15% commission as a new car, and it counts as a unit.',
    who: 'Business owner or fleet manager. Rational buyer — sells on uptime and total cost, not emotion.',
    features: [
      'Cargo, Crew, Passenger and Cab-Chassis; 144" and 170" wheelbases, standard and extended',
      'Multiple roof heights — a person can stand up inside the high roof',
      'Upfit-ready: shelving, refrigeration, partitions, lift gates',
      'eSprinter for fixed-route local businesses that return to base nightly',
      'Section 179: over 6,000 lbs GVWR, so a large first-year write-off may apply — always send them to their CPA',
    ],
    talkTrack: 'Ask "who is your parent company?" If they franchise under an approved brand, they get fleet-level cash on a single van — thousands more than retail. Almost nobody asks this question.',
    crossShop: ['Ford Transit', 'RAM ProMaster', 'Chevrolet Express'],
    url: 'https://www.mbvans.com/en/sprinter',
  },
};

/**
 * Approximate base MSRP, US, model year 2026 — ORIENTATION ONLY.
 * Options routinely add $5k–$20k. Always replace with the window sticker.
 */
export const APPROX_MSRP: Record<string, number> = {
  cla250c: 46000, cla250c4: 48000, 'cla250+e': 52000, cla350e4: 56000, cla35c4: 59000, cla45c4s: 68000,
  c300w: 50000, c300w4: 52000, c43w4: 65000, c63w4se: 88000,
  e350w: 64000, e350w4: 66000, e450w4: 72000, e53ew4: 92000, e450s4: 76000, e53es4: 95000,
  cle300c4: 60000, cle450c4: 70000, cle53c4: 82000, cle300a4: 67000, cle450a4: 77000, cle53a4: 89000,
  s500v4: 125000, s580v4: 140000, s580ev4: 135000, s63ev4: 190000, s580z4: 200000, s680z4: 250000,
  sl43r: 110000, sl55r4: 140000, sl63r4: 185000, sl63er4: 205000, sl680z4: 225000,
  gt43c4: 105000, gt53c4: 120000, gt63c4: 150000, gt63c4se: 200000,
  amggt43: 105000, amggt55: 140000, amggt63: 180000, amggt63e: 210000, amggt63x: 200000,
  gla250w: 43000, gla250w4: 45000, gla35w4: 52000,
  glb250w: 45000, glb250w4: 47000, glb35w4: 55000,
  glc300w: 50000, glc300w4: 52000, glc350e4: 61000, glc43w4: 66000, glc63w4e: 85000,
  glc300c4: 56000, glc43c4: 70000, glc63c4e: 89000,
  gle350w: 63000, gle350w4: 65000, gle450w4: 72000, gle450e4: 75000, gle580w4: 92000,
  gle53w4: 95000, gle63w4s: 130000, gle450c4: 83000, gle53c4: 100000, gle63c4s: 135000,
  gls450w4: 88000, gls580w4: 108000, gls63w4: 140000, gls600z4: 180000,
  g550w4: 150000, g63w4: 190000, g580w4e: 165000,
  eqe320v: 76000, eqe320v4: 79000, amgeqev4: 110000,
  eqe320x: 79000, eqe320x4: 82000, amgeqex4: 115000,
  eqs450v: 105000, eqs450v4: 108000, eqs580v4: 127000,
  eqs400x4: 105000, eqs550x4: 128000, eqs680z4: 185000,
  spr2500_144: 56000, spr2500_170: 58000, spr2500_170e: 60000, spr_worker: 52000,
  spr3500_144: 62000, spr3500_170: 64000, spr3500_170e: 66000,
  sprcrew_144: 60000, sprcrew_170: 62000,
  sprpass_144: 68000, sprpass_170: 70000,
  esprinter144: 61458, esprinter170: 64000,
};
