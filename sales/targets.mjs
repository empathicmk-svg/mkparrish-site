#!/usr/bin/env node
/**
 * targets — Sprinter prospecting engine.
 *
 * IMPORTANT: this does NOT invent businesses. Fake leads waste your time and
 * embarrass you on the phone. What it does is hand you the *qualified brand
 * list* straight out of the August Commercial Vehicles guide, with each brand's
 * OFFICIAL locator URL, so you can pull the real Smithtown-area franchisee in
 * about 30 seconds each — name, address, phone, straight from the source.
 *
 *   node sales/targets.mjs               # today's research batch (5 brands)
 *   node sales/targets.mjs --all         # the full CBSP list
 *   node sales/targets.mjs --segments    # non-franchise angles to work
 *   node sales/targets.mjs --worked mr-rooter
 *
 * Why this list is the goldmine: a franchisee of any of these qualifies for
 * MEDIUM-FLEET cash on a SINGLE van (MY25 Cargo $11,000 vs $8,000 retail;
 * MY26 Cargo $6,000 vs $3,000). Most salespeople never ask "who's your
 * parent company?" — that one question is worth thousands per deal.
 */
import { loadJson, saveJson, today, c, heading, rule, args } from './lib/util.mjs';

// Verbatim from the August 2026 MB Commercial Vehicles Sales Guide, CBSP pages.
const CBSP = [
  { slug: 'mr-rooter',        name: 'Mr. Rooter Plumbing',        parent: 'Neighborly',            can: '30045', url: 'https://www.mrrooter.com/locations/' },
  { slug: 'ben-franklin',     name: 'Benjamin Franklin Plumbing', parent: 'BuyMax/Authority',      can: '26885', url: 'https://www.benjaminfranklinplumbing.com/locations/' },
  { slug: 'one-hour-hvac',    name: 'One Hour Heating & Air',     parent: 'BuyMax/Authority',      can: '26885', url: 'https://www.onehourheatandair.com/locations/' },
  { slug: 'mr-electric',      name: 'Mr. Electric',               parent: 'Neighborly',            can: '30045', url: 'https://mrelectric.com/locations' },
  { slug: 'mr-handyman',      name: 'Mr. Handyman',               parent: 'Neighborly',            can: '30045', url: 'https://www.mrhandyman.com/local-handyman-service/' },
  { slug: 'mr-appliance',     name: 'Mr. Appliance',              parent: 'Neighborly',            can: '30045', url: 'https://www.mrappliance.com/locations/' },
  { slug: 'aire-serv',        name: 'Aire Serv',                  parent: 'Neighborly',            can: '30045', url: 'https://www.aireserv.com/locations/' },
  { slug: 'glass-doctor',     name: 'Glass Doctor',               parent: 'Neighborly',            can: '30045', url: 'https://glassdoctor.com/locations' },
  { slug: 'rainbow',          name: 'Rainbow Restoration',        parent: 'Neighborly',            can: '30045', url: 'https://rainbowrestores.com/locations' },
  { slug: 'grounds-guys',     name: 'The Grounds Guys',           parent: 'Neighborly',            can: '30045', url: 'https://www.groundsguys.com/locations/' },
  { slug: 'junk-king',        name: 'Junk King',                  parent: 'Neighborly',            can: '30045', url: 'https://www.junk-king.com/company/locations' },
  { slug: 'molly-maid',       name: 'Molly Maid',                 parent: 'Neighborly',            can: '30045', url: 'https://www.mollymaid.com/locations/' },
  { slug: 'mosquito-joe',     name: 'Mosquito Joe',               parent: 'Neighborly',            can: '30045', url: 'https://mosquitojoe.com/locations/' },
  { slug: 'five-star-paint',  name: 'Five Star Painting',         parent: 'Neighborly',            can: '30045', url: 'https://www.fivestarpainting.com/our-locations/' },
  { slug: 'window-genie',     name: 'Window Genie',               parent: 'Neighborly',            can: '30045', url: 'https://www.windowgenie.com/locations/' },
  { slug: 'dryer-vent',       name: 'Dryer Vent Wizard',          parent: 'Neighborly',            can: '30045', url: 'https://www.dryerventwizard.com/find-your-wizard' },
  { slug: 'precision-door',   name: 'Precision Garage Door',      parent: 'Neighborly',            can: '30045', url: 'https://www.precisiondoor.net/locations' },
  { slug: 'lawn-pride',       name: 'Lawn Pride',                 parent: 'Neighborly',            can: '30045', url: 'https://lawnpride.com/locations-sitemap/' },
  { slug: 'housemaster',      name: 'HouseMaster Inspections',    parent: 'Neighborly',            can: '30045', url: 'https://housemaster.com/locations' },
  { slug: 'shelf-genie',      name: 'ShelfGenie',                 parent: 'Neighborly',            can: '30045', url: 'https://www.shelfgenie.com/locations/' },
  { slug: 'servpro',          name: 'SERVPRO',                    parent: 'SERVPRO',               can: '30047', url: 'https://www.servpro.com/locations' },
  { slug: 'roto-rooter',      name: 'Roto-Rooter',                parent: 'Roto-Rooter',           can: '30046', url: 'https://www.rotorooter.com/locations/' },
  { slug: 'rheem-pro',        name: 'Rheem Pros',                 parent: 'Rheem',                 can: '28748', url: 'https://www.rheem.com/find-a-pro/' },
  { slug: 'stop-restoration', name: 'STOP Restoration',           parent: 'BuyMax/Authority',      can: '26885', url: 'https://www.stoprestoration.com/locations/' },
  { slug: 'monster-tree',     name: 'Monster Tree Service',       parent: 'BuyMax/Authority',      can: '26885', url: 'https://www.monstertreeservice.com/our-locations/' },
  { slug: 'mosquito-squad',   name: 'Mosquito Squad',             parent: 'BuyMax/Authority',      can: '26885', url: 'https://www.mosquitosquad.com/locations/' },
  { slug: 'cleaning-auth',    name: 'The Cleaning Authority',     parent: 'BuyMax/Authority',      can: '26885', url: 'https://www.thecleaningauthority.com/locations/' },
  { slug: 'asp-pool',         name: "America's Swimming Pool Co", parent: 'BuyMax/Authority',      can: '26885', url: 'https://www.asppoolco.com/locations/' },
  { slug: 'color-world',      name: 'Color World Painting',       parent: 'BuyMax/Authority',      can: '26885', url: 'https://www.colorworldpainting.com/locations/' },
  { slug: 'screenmobile',     name: 'Screenmobile',               parent: 'BuyMax/Authority',      can: '26885', url: 'https://www.screenmobile.com/locations/' },
  { slug: 'woofies',          name: "Woofie's",                   parent: 'BuyMax/Authority',      can: '26885', url: 'https://www.woofies.com/locations/' },
  { slug: 'homewatch',        name: 'Homewatch CareGivers',       parent: 'BuyMax/Authority',      can: '26885', url: 'https://www.homewatchcaregivers.com/locations/' },
  { slug: 'budget-blinds',    name: 'Budget Blinds',              parent: 'Home Franchise Concepts', can: '30044', url: 'https://budgetblinds.com/locations/' },
  { slug: 'kitchen-tuneup',   name: 'Kitchen Tune-Up',            parent: 'Home Franchise Concepts', can: '30044', url: 'https://www.kitchentuneup.com/locations/' },
  { slug: 'bath-tuneup',      name: 'Bath Tune-Up',               parent: 'Home Franchise Concepts', can: '30044', url: 'https://www.bathtune-up.com/locations/' },
  { slug: 'advantaclean',     name: 'AdvantaClean',               parent: 'Home Franchise Concepts', can: '30044', url: 'https://advantaclean.com/location/' },
  { slug: 'two-maids',        name: 'Two Maids',                  parent: 'Home Franchise Concepts', can: '30044', url: 'https://www.twomaidscleaning.com/locations/' },
  { slug: 'premier-garage',   name: 'PremierGarage',              parent: 'Home Franchise Concepts', can: '30044', url: 'https://www.premiergarage.com/near-me/' },
  { slug: 'concrete-craft',   name: 'Concrete Craft',             parent: 'Home Franchise Concepts', can: '30044', url: 'https://www.concretecraft.com/concrete-craft-locations/' },
  { slug: 'tailored-closet',  name: 'The Tailored Closet',        parent: 'Home Franchise Concepts', can: '30044', url: 'https://www.tailoredcloset.com/near-me/' },
  { slug: 'fedex-contractor', name: 'FedEx contractors (ISP)',    parent: 'Contractors',           can: '24209', url: 'https://local.fedex.com/en-us' },
  { slug: 'daikin-dealer',    name: 'Daikin / Goodman / Amana',   parent: 'Daikin',                can: '30112', url: 'https://northamerica-daikin.com/' },
];

// Non-franchise angles — no CBSP cash, but full retail cash + Section 179 still apply.
const SEGMENTS = [
  ['Trades & contractors', 'Plumbers, electricians, HVAC, GCs, roofers', 'Drive industrial parks and supply houses (Ferguson, Home Depot Pro) at 6–7am when their vans are loading.'],
  ['Last-mile & delivery', 'Amazon DSPs, couriers, local delivery', 'DSPs scale fleets fast and replace on a cycle. Ask for the fleet manager, not the owner.'],
  ['Mobile businesses', 'Pet grooming, mobile medical/dental, repair', 'The van IS the business — highest urgency when one breaks down.'],
  ['Shuttle & passenger', 'Hotels, senior living, churches, airports, camps', 'Passenger Sprinter. Long Island has heavy hospitality + senior living density.'],
  ['Refrigerated', 'Florists, caterers, produce, pharma', 'Reefer upfit adds serious gross. Refrigeration can exceed the 20% upfit cap.'],
  ['Camper & conversion', 'Van-life builders, RV converters', 'High-roof 4x4, loaded. Often cash or single-pay lease buyers.'],
  ['NAHB members', 'Local home builders association', 'Extra $500 Affinity on top of retail. Find your local chapter and go to a meeting.'],
];

const FILE = 'targets-worked.json';
const a = args();
const db = loadJson(FILE, { worked: {} });

if (a.worked) {
  const t = CBSP.find((x) => x.slug === a.worked);
  if (!t) { console.error(c.red(`No brand "${a.worked}". Run --all to see slugs.`)); process.exit(1); }
  db.worked[t.slug] = today();
  saveJson(FILE, db);
  console.log(`${c.green('✓')} marked ${c.bold(t.name)} researched ${today()}`);
  process.exit(0);
}

if (a.segments) {
  console.log(heading('Non-franchise Sprinter angles'));
  console.log(c.dim('No CBSP cash, but full retail cash + Section 179 still close these.\n'));
  for (const [name, who, how] of SEGMENTS) {
    console.log(`${c.bold(name)}`);
    console.log(`  ${c.dim(who)}`);
    console.log(`  ${c.cyan('→')} ${how}\n`);
  }
  process.exit(0);
}

const pending = CBSP.filter((t) => !db.worked[t.slug]);
const batch = a.all ? CBSP : pending.slice(0, 5);

console.log(heading(a.all ? `CBSP qualified brands (${CBSP.length})` : `Today's research batch — ${batch.length} brands`));
console.log(c.dim(`${Object.keys(db.worked).length}/${CBSP.length} researched · ${pending.length} to go\n`));

if (!batch.length) {
  console.log(c.green('Full list researched. Re-run with --all to refresh, or work --segments.'));
  process.exit(0);
}

for (const t of batch) {
  const done = db.worked[t.slug];
  console.log(`${done ? c.green('✓') : '○'} ${c.bold(t.name)}  ${c.dim('CAN ' + t.can + ' · ' + t.parent)}`);
  console.log(`  ${c.cyan(t.url)}`);
  if (done) console.log(c.dim(`  researched ${done}`));
  console.log('');
}

console.log(rule());
console.log(c.bold('THE 30-SECOND WORKFLOW'));
console.log(`  1. Open the locator, set it to ${c.bold('Smithtown / Suffolk County NY')}.`);
console.log('  2. Copy the real business name + phone into your CRM (never here).');
console.log('  3. Call and ask for the owner or fleet manager.');
console.log('  4. Confirm the parent company — that\'s what unlocks the CAN.');
console.log(`  5. Log it:  ${c.dim('node sales/targets.mjs --worked ' + batch[0].slug)}`);
console.log(rule());
console.log(c.yellow('  Verify every CAN with your Commercial/Fleet manager before quoting fleet cash.'));
