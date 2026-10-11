#!/usr/bin/env node
/**
 * Builds a Metricool bulk-scheduling CSV for the Mercedes-Benz of Smithtown kit
 * (Pink Bow October volumes 1 and 2, then volume 3) across Instagram (@mk_parrish), Facebook (MK Parrish) and
 * TikTok (@mk_parrish).
 *
 * Images are JPEGs (Instagram's and TikTok's publishing APIs reject PNG).
 * Media is referenced by its raw.githubusercontent.com URL on main, the same
 * way scripts/build-metricool-csv.mjs does it, so the kit has to be merged to
 * main before importing. Each network gets its own row so captions and calls
 * to action can differ per platform. Stories aren't included: post those by
 * hand so you can add the poll/question stickers.
 *
 * Output: output/mercedes-smithtown/metricool-schedule-<n>.csv (Metricool imports
 *         at most 50 posts per file, so rows are split across files)
 * Run:    node marketing/mercedes-smithtown/schedule.mjs
 *
 * Import: Metricool → Planner → Import CSV, date format DD/MM/YYYY, time HH:MM.
 * Times are read in the brand's Metricool time zone (set it to New York).
 * Rows import as drafts (DRAFT below) so each one can be checked first.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, '..', '..');
const OUT_DIR = path.join(ROOT, 'output', 'mercedes-smithtown');
const ROWS_PER_FILE = 50;
// RAW_REF pins media to a commit instead of main (e.g. when scheduling before a merge).
const RAW = `https://raw.githubusercontent.com/empathicmk-svg/mkparrish-site/${process.env.RAW_REF || 'main'}/output/mercedes-smithtown`;

const DRAFT = 'TRUE';

// ── Hashtags ───────────────────────────────────────────────────────────────────
const TAGS = {
  cause: '#PinkBowOctober #BreastCancerAwarenessMonth #ThinkPink #EarlyDetectionSavesLives',
  store: '#MercedesBenz #MBofSmithtown #CompetitionAutoGroup #Smithtown #LongIsland',
  amg: '#MercedesAMG #AMG',
  fleet: '#MercedesBenzVans #Sprinter #SprinterVan #FleetSales #CommercialVans #SmallBusiness #LongIslandBusiness',
  local: '#ShopLocal #SupportLocal #LongIslandLiving #SuffolkCounty',
};

// ── Posts ──────────────────────────────────────────────────────────────────────
// files: paths under output/mercedes-smithtown, in carousel order.
// ig / fb / tt: caption per network; a missing network isn't posted there.
// ttTitle: TikTok's video title (required by TikTok, max 90 chars).
const POSTS = {
  'think-pink': {
    files: ['feed/01-think-pink.jpg'], alt: 'White Mercedes-AMG GT 4-Door Coupé with a pink bow in the showroom',
    ig: `Every Mercedes-Benz on our floor wears a pink bow this October 🎀\n\nIt's Breast Cancer Awareness Month at Mercedes-Benz of Smithtown. These bows are for every fighter, every survivor, and everyone we carry with us.\n\n👉 Tag a survivor who deserves to see this, and share to your story to spread the pink.\n\n${TAGS.cause} #AMGGT ${TAGS.store}`,
    fb: `Pink bows on every Mercedes-Benz this October 🎀 This one's for every fighter, every survivor, and everyone we've lost. Tag someone who wears pink for a reason, and share this to remind a friend to book a screening.\n\n#PinkBowOctober #BreastCancerAwarenessMonth #MercedesBenz`,
  },
  'reel-matte-amg': {
    ttTitle: 'Matte black AMG walkaround 🖤',
    files: ['tiktok/01-matte-black-amg-glc-coupe.mp4'], alt: 'Walkaround of a matte black Mercedes-AMG GLC Coupé',
    ig: `Matte black AMG — no bow needed… but it's October 🎀 Comment "MATTE" and I'll DM you the details. Follow @mk_parrish for new arrivals.\n\n${TAGS.amg} #GLCCoupe #MatteBlack #MBofSmithtown #LongIslandCars #PinkBowOctober`,
    fb: `Matte black Mercedes-AMG GLC Coupé 🖤 Message me "MATTE" for details — Mercedes-Benz of Smithtown, St. James.`,
    tt: `Walk it with me 🖤 Matte black Mercedes-AMG GLC Coupé at Mercedes-Benz of Smithtown. Comment "MATTE" and I'll send you the details.\n\n${TAGS.amg} #MatteBlack #CarTok #LongIsland #PinkBowOctober`,
  },
  'hi-im-mk': {
    files: ['feed/03-hi-im-mk.jpg'], alt: 'Black-and-white portrait of MK, Mercedes-Benz specialist',
    ig: `Hi, I'm MK 👋 Your Mercedes-Benz specialist at Mercedes-Benz of Smithtown, part of Competition Automotive Group.\n\nNew & Certified Pre-Owned, AMG, SUVs, coupés and cabriolets — plus lease-end and trade-in questions.\n\n👉 Follow @mk_parrish for new arrivals and DM me anytime.\n\n${TAGS.store} #StJamesNY #SuffolkCounty #CarSales`,
    fb: `Hi, I'm MK! I sell Mercedes-Benz at Mercedes-Benz of Smithtown (630 Middle Country Rd, St. James). Shopping, leasing, or just curious what your trade is worth? Message me or come in and ask for MK.`,
  },
  'carousel-pick-your-bow': {
    files: ['carousel/00-cover.jpg', 'carousel/01-slide.jpg', 'carousel/02-slide.jpg', 'carousel/03-slide.jpg', 'carousel/04-slide.jpg', 'carousel/05-slide.jpg', 'carousel/06-end.jpg'],
    alt: 'Five Mercedes-Benz models with pink bows: CLA, AMG E-Class, AMG GLE, AMG GT 4-Door, GLB',
    ig: `Five Mercedes-Benz models, five pink bows 🎀 Which one's going home with you?\n\n1️⃣ The all-new CLA\n2️⃣ AMG E-Class in matte white\n3️⃣ Mercedes-AMG GLE\n4️⃣ AMG GT 4-Door Coupé\n5️⃣ Mercedes-Benz GLB\n\n👉 Comment your number and I'll DM you trim, color and payment options. And every pink bow is a reminder: book your screening.\n\n#PinkBowOctober ${TAGS.amg} #CLA #GLE #GLB ${TAGS.store}`,
    fb: `Pick your bow 🎀 Five Mercedes-Benz models on the floor right now at Mercedes-Benz of Smithtown. Comment 1–5 and I'll message you the details.`,
  },
  'book-the-screening': {
    files: ['feed/02-book-the-screening.jpg'], alt: 'Black Mercedes-Benz GLE with a pink bow above a pink panel reading Book the screening',
    ig: `Reminder from the showroom floor: book the screening. Then book the test drive. In that order 🎀\n\nEarly detection saves lives — ask your doctor what screening is right for you.\n\n👉 Already booked? DM me "PINK" and I'll set up a test drive in any pink-bow Mercedes-Benz on the floor.\n\n${TAGS.cause} #GLE ${TAGS.store}`,
    fb: `Book the screening, then book the test drive 🎀 Early detection saves lives. If you've been putting it off, this is your sign. When you're ready, send me a message and I'll line up a GLE (or anything with a pink bow) for you.`,
  },
  'cle-coupe-or-cabriolet': {
    files: ['feed/04-cle-coupe-or-cabriolet.jpg'], alt: 'Black Mercedes-Benz CLE Coupé and CLE Cabriolet side by side with pink bows',
    ig: `CLE Coupé or CLE Cabriolet? 🖤🖤 Same face, two pink bows, two very different weekends.\n\n👉 Comment COUPÉ or CABRIO — I'll DM the details to everyone who votes.\n\n#CLE #CLECoupe #CLECabriolet #PinkBowOctober ${TAGS.store}`,
    fb: `Settle this for me: CLE Coupé or CLE Cabriolet? 🖤 Comment your pick 👇 Want to sit in both? Message me and I'll have the keys ready.`,
  },
  'reel-top-down': {
    ttTitle: 'Top-down season isn’t over 🍂',
    files: ['tiktok/02-cle-cabriolet-top-down.mp4'], alt: 'Walkaround of a black Mercedes-Benz CLE Cabriolet with cognac leather',
    ig: `Cognac leather. Black paint. Long Island fall 🍂 DM me "CABRIO" to sit in it this week.\n\n#CLECabriolet #Convertible #PinkBowOctober ${TAGS.store}`,
    fb: `The Mercedes-Benz CLE Cabriolet — top-down season edition 🍂 Message me "CABRIO" to book a test drive.`,
    tt: `Top-down season isn't over 🍂 CLE Cabriolet in black with cognac leather. DM "CABRIO" and I'll have it pulled up front.\n\n#MercedesBenz #CLE #Cabriolet #CarTok #LongIsland #Smithtown`,
  },
  'gls-room-for-everyone': {
    files: ['feed/05-gls-room-for-everyone.jpg'], alt: 'White Mercedes-Benz GLS with a pink bow',
    ig: `Seven seats. One pink bow 🎀 For the moms, sisters and best friends who carry everyone.\n\nThe GLS fits the whole crew — kids, carpool, the dog and the Costco run.\n\n👉 DM me "GLS" to book a test drive this week.\n\n#GLS #LuxurySUV #PinkBowOctober #BreastCancerAwarenessMonth ${TAGS.store}`,
    fb: `The Mercedes-Benz GLS — room for everyone 🎀 Wearing pink this October for the women who hold it all together. Message me "GLS" and I'll book your test drive.`,
  },
  'amg-black-white-pink': {
    files: ['feed/06-amg-black-white-pink.jpg'], alt: 'Gloss black Mercedes-AMG GLE with a pink bow',
    ig: `The only palette I trust 🖤🤍🎀\n\nMercedes-AMG GLE — Panamericana grille, gloss black paint, and a pink bow that means something this month.\n\n👉 DM me "AMG" for specs and availability.\n\n${TAGS.amg} #GLE #AMGGLE #PinkBowOctober ${TAGS.store}`,
    fb: `Black. White. Pink. 🖤🤍🎀 Mercedes-AMG GLE, on the floor now at Mercedes-Benz of Smithtown. Message me "AMG" for details.`,
  },
  'find-me-in-smithtown': {
    files: ['feed/07-find-me-in-smithtown.jpg'], alt: 'Black Mercedes-Benz GLE parked under trees outside Mercedes-Benz of Smithtown',
    ig: `Fall drives hit different in a Mercedes-Benz 🍂\n\nFind me at Mercedes-Benz of Smithtown — 630 Middle Country Rd, St. James.\n\n👉 Come in and ask for MK, test drives all week. DM @mk_parrish to lock in a time.\n\n#GLE #StJamesNY #SuffolkCounty #PinkBowOctober ${TAGS.store}`,
    fb: `Find me at Mercedes-Benz of Smithtown, 630 Middle Country Rd, St. James 🍂 Ask for MK when you come in, or message me to book a time. Pink bows on every car all October 🎀`,
  },

  // ── Volume 2 ──
  'reel-every-bow-is-pink': {
    ttTitle: 'Every bow on our floor is pink 🎀',
    files: ['vol2/reels/04-every-bow-is-pink.mp4'], alt: 'Pink bows on Mercedes-Benz cars for Breast Cancer Awareness Month',
    ig: `Every bow on our floor is pink this October 🎀 For every fighter. Every survivor. And everyone we carry with us. Book the screening — then come see me. Share this with someone who needs the reminder.\n\n${TAGS.cause} ${TAGS.store}`,
    fb: `Every bow at Mercedes-Benz of Smithtown is pink this month 🎀 For every fighter, every survivor, and everyone we carry with us. Please book your screening — and share this with someone who needs the nudge.`,
    tt: `Every bow on our floor is pink this October 🎀 For every fighter. Every survivor. And everyone we carry with us. Book the screening 💗\n\n#BreastCancerAwarenessMonth #PinkBowOctober #ThinkPink #MercedesBenz #CarTok`,
  },
  'early-detection': {
    files: ['vol2/feed/10-early-detection.jpg'], alt: 'Pink graphic reading Early detection saves lives',
    ig: `Early detection saves lives 🎀\n\nEvery pink bow on our floor this month is a reminder. Book the screening — for you, your mom, your sister, your best friend. Talk to your doctor about what's right for you.\n\n👉 Share this to your story. Someone needs the nudge.\n\n${TAGS.cause} #MBofSmithtown`,
    fb: `Early detection saves lives 🎀 Every pink bow on our floor this month is a reminder to book the screening. Please share this — someone in your life needs the nudge.`,
  },
  'this-or-that-gls-glb': {
    files: ['vol2/feed/08-this-or-that-suv.jpg'], alt: 'Mercedes-Benz GLS above a Mercedes-Benz GLB, both with pink bows',
    ig: `Big family or easy parking? 🎀 GLS (seven seats) or GLB (compact)? Comment GLS or GLB 👇 I'll DM the details to everyone who votes.\n\n#GLS #GLB #LuxurySUV #ThisOrThat #PinkBowOctober ${TAGS.store}`,
    fb: `GLS or GLB? 🎀 Comment your pick 👇 Both are on the floor now at Mercedes-Benz of Smithtown.`,
  },
  'reel-pick-your-bow': {
    ttTitle: 'Pick your bow 🎀 5 Mercedes-Benz models',
    files: ['vol2/reels/03-pick-your-bow.mp4'], alt: 'Five Mercedes-Benz models with pink bows',
    ig: `Five Mercedes-Benz models, five pink bows 🎀 Which one's going home with you? Comment 1–5 and I'll DM you the details.\n\n#PinkBowOctober #NewCarDay ${TAGS.store}`,
    fb: `Pick your bow 🎀 Five Mercedes-Benz models on the floor at Mercedes-Benz of Smithtown. Comment 1–5 and I'll message you the details.`,
    tt: `Five Mercedes-Benz models, five pink bows 🎀 Which one's going home with you? Comment 1–5.\n\n#MercedesBenz #PinkBowOctober #CarTok #LongIsland #NewCarDay`,
  },
  'carousel-know-your-grille': {
    files: ['vol2/carousel-grille/00-cover.jpg', 'vol2/carousel-grille/01-grille.jpg', 'vol2/carousel-grille/02-grille.jpg', 'vol2/carousel-grille/03-grille.jpg', 'vol2/carousel-grille/04-grille.jpg', 'vol2/carousel-grille/05-end.jpg'],
    alt: 'Close-ups of four Mercedes-Benz grilles: CLA, AMG GLE, GLE, GLS',
    ig: `You can tell a Mercedes-Benz from the front. Can you tell which one? 👀\n\n1️⃣ Star pattern — the all-new CLA\n2️⃣ AMG Panamericana — AMG GLE\n3️⃣ Star grille + chrome — GLE\n4️⃣ Classic chrome bars — GLS\n\n👉 Comment your favorite and save this for your next car.\n\n${TAGS.amg} #Panamericana #CLA #GLE #GLS #PinkBowOctober ${TAGS.store}`,
    fb: `Know your grille 👀 Four Mercedes-Benz faces on the floor right now. Which one's your favorite? Comment 1–4.`,
  },
  'reel-which-amg': {
    ttTitle: 'Which AMG are you? 🏁',
    files: ['vol2/reels/05-which-amg-are-you.mp4'], alt: 'Four Mercedes-AMG models',
    ig: `Which AMG are you? 🏁 1. AMG GT 4-Door Coupé 2. AMG E-Class 3. AMG GLE 4. AMG GLC Coupé. Comment your number — I'll send specs and availability.\n\n${TAGS.amg} #AMGGT #AMGGLE #PinkBowOctober ${TAGS.store}`,
    fb: `Which Mercedes-AMG are you? 🏁 Comment 1–4 and I'll message you specs and availability — all on the floor now in St. James.`,
    tt: `Which AMG are you? 🏁 1. AMG GT 4-Door 2. AMG E-Class 3. AMG GLE 4. AMG GLC Coupé. Comment your number.\n\n#MercedesAMG #AMG #CarTok #LongIslandCars #PinkBowOctober`,
  },
  'matte-amg-e-class': {
    files: ['vol2/feed/11-matte-amg-e-class.jpg'], alt: 'Matte white Mercedes-AMG E-Class with a pink bow',
    ig: `Satin white. Pink bow. 🤍🎀 Mercedes-AMG E-Class in matte white — AMG grille, zero subtlety.\n\n👉 DM me "MATTE" for details.\n\n${TAGS.amg} #EClass #MatteWhite #PinkBowOctober ${TAGS.store}`,
    fb: `Mercedes-AMG E-Class in matte white 🤍🎀 On the floor now in St. James. Message me "MATTE" for details.`,
  },
  'meet-the-new-cla': {
    files: ['vol2/feed/12-meet-the-new-cla.jpg'], alt: 'Silver all-new Mercedes-Benz CLA with a pink bow',
    ig: `Meet the all-new CLA ✨ A grille full of three-pointed stars — and a pink bow on top 🎀\n\n👉 DM me "CLA" to see it in person this week.\n\n#CLA #NewCLA #PinkBowOctober ${TAGS.store}`,
    fb: `The all-new Mercedes-Benz CLA is here ✨ Message me "CLA" and I'll set up a time for you to see it in person.`,
  },
  'reel-this-or-that-suv': {
    ttTitle: 'This or that: Mercedes-Benz SUV edition',
    files: ['vol2/reels/06-this-or-that-suv.mp4'], alt: 'Mercedes-Benz SUVs this-or-that: GLS, GLB, GLE, AMG GLE',
    ig: `This or that: Mercedes-Benz SUV edition 🎀 Round 1: GLS or GLB? Round 2: GLE or AMG GLE? Drop your picks below 👇\n\n#GLS #GLE #GLB #AMGGLE #LuxurySUV #ThisOrThat ${TAGS.store}`,
    fb: `This or that — Mercedes-Benz SUV edition 🎀 GLS or GLB? GLE or AMG GLE? Comment your picks and I'll message you details on both.`,
    tt: `This or that: Mercedes-Benz SUV edition 🎀 GLS or GLB? GLE or AMG GLE? Drop your picks 👇\n\n#MercedesBenz #LuxurySUV #CarTok #ThisOrThat #LongIsland`,
  },
  'carousel-lease-ending': {
    files: ['vol2/carousel-lease/00-cover.jpg', 'vol2/carousel-lease/01-tip.jpg', 'vol2/carousel-lease/02-tip.jpg', 'vol2/carousel-lease/03-tip.jpg', 'vol2/carousel-lease/04-tip.jpg', 'vol2/carousel-lease/05-end.jpg'],
    alt: 'Four tips for Mercedes-Benz drivers whose lease is ending',
    ig: `Lease ending in the next few months? Read this before you hand back the keys 🔑\n\n1. Check your miles\n2. Know your equity\n3. Start 90–120 days out\n4. Ask about current programs\n\n👉 DM me "LEASE" with your model and maturity month and I'll walk you through your options. No pressure.\n\n#LeaseEnd #CarLease #SuffolkCounty ${TAGS.store}`,
    fb: `Lease ending soon? 4 moves to make before you hand back the keys 🔑 Message me "LEASE" with your model and maturity month and I'll walk you through it.`,
  },
  'this-or-that-cla-gle': {
    files: ['vol2/feed/09-this-or-that-sedan-suv.jpg'], alt: 'All-new Mercedes-Benz CLA above a black Mercedes-Benz GLE, both with pink bows',
    ig: `Sedan or SUV? The all-new CLA or the GLE 🎀 Comment CLA or GLE and I'll send you the details.\n\n#CLA #GLE #ThisOrThat #PinkBowOctober ${TAGS.store}`,
    fb: `Sedan or SUV — CLA or GLE? Comment your pick 👇 Pink bows on both this month 🎀`,
  },
  'reel-cabriolet-interior': {
    ttTitle: 'CLE Cabriolet: top down + cognac leather',
    files: ['vol2/reels/07-cabriolet-interior-check.mp4'], alt: 'Mercedes-Benz CLE Cabriolet exterior and cognac leather interior',
    ig: `Top-down check ✅ Cognac leather check ✅ CLE Cabriolet at Mercedes-Benz of Smithtown. DM "CABRIO" and I'll have it pulled up front this week.\n\n#CLECabriolet #Convertible ${TAGS.store}`,
    fb: `Mercedes-Benz CLE Cabriolet — top down, cognac leather, ready for a Long Island fall drive 🍂 Message me "CABRIO" to book a test drive.`,
    tt: `Top-down check ✅ Cognac leather check ✅ CLE Cabriolet. DM "CABRIO" and I'll have it pulled up front.\n\n#MercedesBenz #CLECabriolet #Convertible #CarTok #LongIsland`,
  },
  'wrapped-for-a-reason': {
    files: ['vol2/feed/13-wrapped-for-a-reason.jpg'], alt: 'Close-up of a pink bow on a black Mercedes-Benz GLE',
    ig: `Wrapped for a reason 🎀 This bow is for every fighter, every survivor, and everyone we carry with us.\n\n👉 Tag someone who wears pink for a reason.\n\n${TAGS.cause} #GLE ${TAGS.store}`,
    fb: `Wrapped for a reason 🎀 Every bow on our floor is pink this October — for every fighter and survivor. Tag someone who wears pink for a reason.`,
  },

  // ── Volume 3: fleet, custom 2027 orders, community, MK ──────────────────────
  'fleet-sprinter': {
    files: ['vol3/feed/14-fleet-sprinter.jpg'], alt: 'Your business. Our Sprinter. Fleet and commercial vans from MK at Mercedes-Benz of Smithtown',
    ig: `Your business. Our Sprinter. 🚐\n\nCargo, crew and passenger vans for Long Island businesses, with fleet specials when you're ready to grow. One van or a whole fleet, I'll make it easy.\n\n👉 DM me "FLEET" with your business and what you haul, and I'll send you this month's fleet offers.\n\n${TAGS.fleet} ${TAGS.store}`,
  },
  'carousel-built-for-business': {
    files: ['00-cover', '01-van', '02-van', '03-van', '04-van', '05-end'].map(f => `vol3/carousel-fleet/${f}.jpg`),
    alt: 'Mercedes-Benz Sprinter options: cargo van, crew van, passenger van and fleet specials',
    ig: `Built for business 🚐 Swipe for three ways to put a Mercedes-Benz Sprinter to work:\n\n1️⃣ Cargo Van: tools, stock, ladders (ask me about upfits)\n2️⃣ Crew Van: your crew and their gear, in one van\n3️⃣ Passenger Van: shuttles, teams, tours\n4️⃣ Fleet specials: buying for a business? Ask what's running this month\n\n👉 Save this and DM me "FLEET".\n\n${TAGS.fleet} ${TAGS.store}`,
    tt: `Built for business 🚐 Cargo, crew or passenger: which Sprinter does your business need? DM me "FLEET" for this month's fleet specials.\n\n#Sprinter #MercedesBenzVans #SmallBusiness #FleetSales #LongIsland`,
    ttTitle: 'Which Sprinter does your business need? 🚐',
  },
  'reel-fleet-sprinter': {
    ttTitle: 'Your next work van is a Sprinter 🚐',
    files: ['vol3/reels/12-fleet-sprinter.mp4'], alt: 'Contractors, caterers, florists, plumbers: your next work van is a Mercedes-Benz Sprinter',
    ig: `Contractors. Caterers. Florists. Plumbers. Your next work van is a Sprinter 🚐\n\nOne van or twenty, I'll match you with the right setup and this month's fleet specials. DM me "FLEET".\n\n${TAGS.fleet} ${TAGS.store}`,
    tt: `If you run a business on Long Island, your next work van is a Sprinter 🚐 DM me "FLEET" for this month's fleet specials.\n\n#Sprinter #SmallBusiness #WorkVan #FleetSales #LongIsland #CarTok`,
  },
  'build-your-2027': {
    files: ['vol3/feed/15-build-your-2027.jpg'], alt: 'Mercedes-AMG GLS 63 in the build configurator: build your 2027',
    ig: `Don't settle for the lot ✨\n\nPick the paint, the leather, the wheels, the packages, and I'll place the factory order for your 2027 Mercedes-Benz. You'll get exactly the car you want.\n\n👉 DM me "BUILD" with the model you're dreaming about and I'll send you a build to start from.\n\n#CustomOrder #2027MercedesBenz #BuildYourOwn ${TAGS.amg} ${TAGS.store}`,
  },
  'carousel-build-your-2027': {
    files: ['00-cover', '01-step', '02-step', '03-step', '04-step', '05-end'].map(f => `vol3/carousel-build/${f}.jpg`),
    alt: 'How a custom Mercedes-Benz order works: spec it, order it, track it, drive it home',
    ig: `How a custom order works ✨ Swipe →\n\n1️⃣ Spec it: paint, leather, wheels, packages\n2️⃣ I place the order and keep you posted on timing\n3️⃣ Track it, with updates from me until it arrives in St. James\n4️⃣ Drive it home, exactly how you specced it\n\n👉 Save this and DM me "BUILD".\n\n#CustomOrder #2027MercedesBenz #BuildYourOwn ${TAGS.store}`,
    tt: `How to custom-order your 2027 Mercedes-Benz ✨ Spec it, order it, track it, drive it home. DM me "BUILD" and I'll start yours.\n\n#MercedesBenz #CustomOrder #CarTok #NewCarDay #LongIsland`,
    ttTitle: 'How to custom-order your 2027 Mercedes ✨',
  },
  'reel-build-your-2027': {
    ttTitle: "Don't settle for the lot. Build your 2027 ✨",
    files: ['vol3/reels/11-build-your-2027.mp4'], alt: 'Pick the paint, the leather and the wheels: build your 2027 Mercedes-Benz',
    ig: `Don't settle for the lot. Pick the paint, the leather, the wheels ✨ I'll place the factory order for your 2027 Mercedes-Benz and keep you posted the whole way.\n\nDM me "BUILD" 👇\n\n#CustomOrder #2027MercedesBenz ${TAGS.amg} ${TAGS.store}`,
    tt: `Don't settle for the lot ✨ Build your 2027 Mercedes-Benz exactly how you want it. Comment or DM "BUILD" and I'll start yours.\n\n#MercedesBenz #GWagon #CustomOrder #CarTok #LongIsland`,
  },
  'g63-built-your-way': {
    files: ['vol3/feed/16-g63-built-your-way.jpg'], alt: 'Matte black Mercedes-AMG G 63 in the Mercedes-Benz of Smithtown showroom under the AMG sign',
    ig: `Matte paint. Black wheels. Black everything. 🖤\n\nThe Mercedes-AMG G 63, built your way. Custom-order yours and every detail is your call.\n\n👉 DM me "G" to spec yours.\n\n#GWagon #G63 #GClass #MatteBlack ${TAGS.amg} ${TAGS.store}`,
  },
  'proud-to-be-local': {
    files: ['vol3/feed/17-proud-to-be-local.jpg'], alt: 'Mercedes-Benz of Smithtown GLE at a local street fair',
    ig: `Proud to be local 🤍\n\nYou'll find us out in the neighborhood, not just on the showroom floor. Thank you to everyone who stopped by to say hi and check out the GLE.\n\n👉 Know an event we should be at? Tag them below.\n\n${TAGS.local} ${TAGS.store}`,
  },
  'libi-golf-outing': {
    files: ['vol3/feed/18-libi-golf-outing.jpg'], alt: 'Competition Automotive Group tent and Mercedes-Benz of Smithtown table at the LIBI golf outing',
    ig: `Proud to show up ⛳\n\nThank you to the Long Island Builders Institute for having Competition Automotive Group and Mercedes-Benz of Smithtown out on the course for the LIBI Annual Golf & Softball Outing.\n\nBuilders and contractors: your next work van is a Sprinter. DM me "FLEET" for work-van specials.\n\n#LIBI #LongIslandBuilders ${TAGS.local} #Sprinter ${TAGS.store}`,
  },
  'reel-community': {
    ttTitle: 'Out in the community 🤍',
    files: ['vol3/reels/13-out-in-the-community.mp4'], alt: 'Mercedes-Benz of Smithtown at a street fair and the LIBI golf outing',
    ig: `Out in the community 🤍 From street fairs to the LIBI golf outing, we love showing up for Long Island. Tell me what's happening in your town; we'd love to be there.\n\n${TAGS.local} ${TAGS.store}`,
    tt: `Out in the community with Mercedes-Benz of Smithtown 🤍 What event should we show up to next? Comment below.\n\n#ShopLocal #LongIsland #MercedesBenz #CarTok`,
  },
  'amg-gt-coupe': {
    files: ['vol3/feed/19-amg-gt-coupe.jpg'], alt: 'White Mercedes-AMG GT Coupé on the lot at Mercedes-Benz of Smithtown',
    ig: `Two doors. Zero apologies. 🤍\n\nThe Mercedes-AMG GT Coupé is on the lot in St. James. Come hear it start.\n\n👉 DM me "GT" for details and a test drive.\n\n#AMGGT ${TAGS.amg} ${TAGS.store}`,
  },
  'gle-fresh-face': {
    files: ['vol3/feed/20-gle-fresh-face.jpg'], alt: 'White Mercedes-Benz GLE from the front, star-pattern grille',
    ig: `Fresh face ✨\n\nStar-pattern grille, panoramic roof, and a cabin made for road trips. The Mercedes-Benz GLE.\n\n👉 DM me "GLE" and I'll set up your test drive.\n\n#GLE #MercedesSUV ${TAGS.store}`,
  },
  'save-my-number': {
    files: ['vol3/feed/21-save-my-number.jpg'], alt: 'MK Parrish contact card: showroom, work line and email at Mercedes-Benz of Smithtown',
    ig: `Save my number 📲\n\nWhether it's a new Mercedes-Benz, a Sprinter for your business, a custom 2027 order or a lease that's ending, text me or DM me. I'm here to make it easy.\n\nMary Kate Parrish, Sales & Leasing Consultant\nMercedes-Benz of Smithtown · 630 Middle Country Rd, St. James\n\n${TAGS.store}`,
  },
  'showroom-fit-check': {
    files: ['vol3/feed/22-showroom-fit-check.jpg'], alt: 'MK mirror selfie at the Mercedes-Benz of Smithtown showroom',
    ig: `Showroom fit check 🖤🩶\n\nDressed for the deal. Come say hi at Mercedes-Benz of Smithtown and ask for MK.\n\n👉 Follow @mk_parrish for new arrivals, fleet specials and custom builds.\n\n#OOTD #WomenInAutomotive #CarSales ${TAGS.store}`,
  },
  'reel-glc-walkaround': {
    ttTitle: 'POV: your GLC is ready 🤍',
    files: ['vol3/reels/08-glc-walkaround.mp4'], alt: 'Walkaround of a white Mercedes-Benz GLC 300',
    ig: `POV: your GLC is ready 🤍 Walk it with me, from our lot to your driveway.\n\nDM me "GLC" and I'll set up your test drive.\n\n#GLC #GLC300 #MercedesSUV ${TAGS.store}`,
    tt: `POV: your GLC 300 is ready 🤍 DM me "GLC" for details and a test drive.\n\n#GLC300 #MercedesBenz #CarTok #NewCarDay #LongIsland`,
  },
  'reel-cle-cabriolet-graphite': {
    ttTitle: 'Top down in October? 🍂',
    files: ['vol3/reels/09-cle-cabriolet-graphite.mp4'], alt: 'Dark Mercedes-Benz CLE Cabriolet with cognac leather in the showroom',
    ig: `Top down in October? 🍂 Dark paint, cognac leather, Mercedes-Benz CLE Cabriolet. Come sit in it.\n\nDM me "CABRIO" and I'll have it pulled up front for you.\n\n#CLECabriolet #Convertible ${TAGS.store}`,
    tt: `Top down in October? 🍂 Mercedes-Benz CLE Cabriolet with cognac leather. DM me "CABRIO" to see it in person.\n\n#CLE #Convertible #MercedesBenz #CarTok #LongIsland`,
  },
  'reel-interior-check': {
    ttTitle: 'Mercedes-Benz interior check 🤍',
    files: ['vol3/reels/10-interior-check.mp4'], alt: 'Interior tour of a Mercedes-Benz SUV with light leather and wood trim',
    ig: `Interior check 🤍 Light leather, wood, chrome and that screen. Room for everyone.\n\nDM me "TOUR" and I'll give you the full walkthrough in person.\n\n#MercedesInterior #MercedesSUV ${TAGS.store}`,
    tt: `Mercedes-Benz SUV interior check 🤍 Would you pick this color? DM me "TOUR" for the full walkthrough.\n\n#MercedesBenz #CarInterior #CarTok #LongIsland`,
  },
};

// ── Calendar (New York time) ──────────────────────────────────────────────────
// Pink Bow October runs to the 31st, so the awareness posts land before then.
const CALENDAR = [
  ['2026-10-12', '12:00', 'think-pink'],
  ['2026-10-12', '19:00', 'reel-every-bow-is-pink'],
  ['2026-10-13', '19:00', 'reel-matte-amg'],
  ['2026-10-14', '12:00', 'hi-im-mk'],
  ['2026-10-15', '19:00', 'carousel-pick-your-bow'],
  ['2026-10-16', '12:00', 'book-the-screening'],
  ['2026-10-17', '10:00', 'reel-which-amg'],
  ['2026-10-18', '12:00', 'cle-coupe-or-cabriolet'],
  // reel-top-down opens on a staff member, so the person-free cabriolet reel takes its slot.
  ['2026-10-19', '19:00', 'reel-cabriolet-interior'],
  ['2026-10-20', '12:00', 'early-detection'],
  ['2026-10-21', '19:00', 'this-or-that-gls-glb'],
  ['2026-10-22', '19:00', 'reel-pick-your-bow'],
  ['2026-10-23', '12:00', 'carousel-know-your-grille'],
  ['2026-10-24', '10:00', 'gls-room-for-everyone'],
  ['2026-10-24', '19:00', 'reel-this-or-that-suv'],
  ['2026-10-25', '12:00', 'meet-the-new-cla'],
  ['2026-10-26', '19:00', 'carousel-lease-ending'],
  ['2026-10-27', '12:00', 'matte-amg-e-class'],
  ['2026-10-28', '19:00', 'this-or-that-cla-gle'],
  ['2026-10-29', '12:00', 'amg-black-white-pink'],
  ['2026-10-30', '19:00', 'wrapped-for-a-reason'],
  ['2026-10-31', '12:00', 'find-me-in-smithtown'],
  // Volume 3, one a day at 17:00 so it runs alongside Pink Bow October and carries on after it.
  ['2026-10-21', '17:00', 'fleet-sprinter'],
  ['2026-10-22', '17:00', 'reel-glc-walkaround'],
  ['2026-10-23', '17:00', 'build-your-2027'],
  ['2026-10-24', '17:00', 'libi-golf-outing'],
  ['2026-10-25', '17:00', 'reel-fleet-sprinter'],
  ['2026-10-26', '17:00', 'g63-built-your-way'],
  ['2026-10-27', '17:00', 'reel-cle-cabriolet-graphite'],
  ['2026-10-28', '17:00', 'carousel-built-for-business'],
  ['2026-10-29', '17:00', 'save-my-number'],
  ['2026-10-30', '17:00', 'reel-build-your-2027'],
  ['2026-10-31', '17:00', 'proud-to-be-local'],
  ['2026-11-01', '17:00', 'reel-interior-check'],
  ['2026-11-02', '17:00', 'carousel-build-your-2027'],
  ['2026-11-03', '17:00', 'amg-gt-coupe'],
  ['2026-11-04', '17:00', 'reel-community'],
  ['2026-11-05', '17:00', 'showroom-fit-check'],
  ['2026-11-06', '17:00', 'gle-fresh-face'],
];

// ── CSV ────────────────────────────────────────────────────────────────────────
const MAX_PICTURES = 10;
const NETS = ['Facebook', 'Twitter/X', 'LinkedIn', 'GBP', 'Instagram', 'Pinterest', 'TikTok', 'YouTube', 'Threads', 'Bluesky'];
const HEADERS = [
  'Text', 'Date', 'Time', 'Draft', ...NETS,
  ...Array.from({ length: MAX_PICTURES }, (_, i) => [`Picture Url ${i + 1}`, `Alt text picture ${i + 1}`]).flat(),
  'Brand name (Optional)',
];
const NETWORK_OF = { ig: 'Instagram', fb: 'Facebook', tt: 'TikTok' };

const csvCell = v => /[",\n]/.test(v) ? `"${String(v).replace(/"/g, '""')}"` : String(v);
const ddmmyyyy = iso => iso.split('-').reverse().join('/');

const missing = [];
const rows = [];
for (const [date, time, id] of CALENDAR) {
  const post = POSTS[id];
  if (!post) throw new Error(`Unknown post in calendar: ${id}`);
  for (const f of post.files) if (!fs.existsSync(path.join(ROOT, 'output', 'mercedes-smithtown', f))) missing.push(f);
  for (const key of ['ig', 'fb', 'tt']) {
    if (!post[key]) continue;
    const row = { Text: post[key], Date: ddmmyyyy(date), Time: time, Draft: DRAFT, 'Brand name (Optional)': '' };
    for (const n of NETS) row[n] = n === NETWORK_OF[key] ? 'TRUE' : 'FALSE';
    post.files.forEach((f, i) => {
      row[`Picture Url ${i + 1}`] = `${RAW}/${f}`;
      row[`Alt text picture ${i + 1}`] = i === 0 ? post.alt : '';
    });
    rows.push(HEADERS.map(h => csvCell(row[h] ?? '')).join(','));
  }
}
if (missing.length) throw new Error(`Missing media — run the build scripts first:\n  ${missing.join('\n  ')}`);

// Same calendar as JSON, for scheduling through the Metricool API instead of CSV.
const plan = CALENDAR.map(([date, time, id]) => ({ date, time, id, media: POSTS[id].files.map(f => `${RAW}/${f}`), alt: POSTS[id].alt,
  ig: POSTS[id].ig, tt: POSTS[id].tt, ttTitle: POSTS[id].ttTitle, video: POSTS[id].files[0].endsWith('.mp4') }));
fs.writeFileSync(path.join(OUT_DIR, 'metricool-plan.json'), JSON.stringify(plan, null, 2));

const unscheduled = Object.keys(POSTS).filter(id => !CALENDAR.some(([, , c]) => c === id));
if (unscheduled.length) console.warn(`⚠ Not on the calendar: ${unscheduled.join(', ')}`);

for (const f of fs.readdirSync(OUT_DIR)) if (/^metricool-schedule.*\.csv$/.test(f)) fs.rmSync(path.join(OUT_DIR, f));
for (let i = 0; i * ROWS_PER_FILE < rows.length; i++) {
  const file = path.join(OUT_DIR, `metricool-schedule-${i + 1}.csv`);
  const chunk = rows.slice(i * ROWS_PER_FILE, (i + 1) * ROWS_PER_FILE);
  fs.writeFileSync(file, '\uFEFF' + [HEADERS.join(','), ...chunk].join('\n') + '\n', 'utf-8');
  console.log(`✓ ${path.relative(ROOT, file)}: ${chunk.length} rows`);
}
console.log(`  ${CALENDAR.length} posts, ${CALENDAR[0][0]} → ${CALENDAR.at(-1)[0]}`);
