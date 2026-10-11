#!/usr/bin/env node
/**
 * MK (@mk_parrish) × Mercedes-Benz of Smithtown — volume 3.
 *
 * Evergreen posts that outlast Pink Bow October: commercial and fleet Sprinter
 * vans, custom-ordered 2027 models, showing up for the local community, and MK
 * herself. Feed posts, two carousels ("Built for business", "Build your
 * 2027"), a save-my-number story and six Reels/TikToks.
 *
 * Output: output/mercedes-smithtown/vol3/{feed,carousel-fleet,carousel-build,stories,reels}/
 * Run:    node marketing/mercedes-smithtown/build-vol3.mjs
 */
import { chromium } from 'playwright';
import path from 'path';
import {
  VOID, PEARL, SMOKE, PETAL, HANDLE, STORE, GROUP,
  topbar, sig, cta, photo, hero, endCard, render, buildReel, dir, cleanup,
} from './lib.mjs';

// ── Contact (MK's business card, with her work line) ──────────────────────────────────────────
const CARD = {
  name: 'Mary Kate Parrish',
  title: 'Sales & Leasing Consultant',
  showroom: '631.265.2204',
  work: '631.366.6417',
  email: 'mparrish@mbofsmithtown.com',
  web: 'mbofsmithtown.com',
  address: '630 Middle Country Road · St. James, NY 11780',
};

// ── Topic tags (top-right pill) ────────────────────────────────────────────────
const FLEET = 'Fleet &amp; Commercial';
const BUILD = 'Custom order · 2027';
const LOCAL = 'Community';
const MK = 'Ask for MK';

// A plain line drawing of a high-roof work van (not any brand's artwork).
const van = (w = 620) => `
  <svg width="${w}" height="${Math.round(w * 0.45)}" viewBox="0 0 620 280" fill="none" stroke="${PETAL}" stroke-width="5" stroke-linejoin="round" aria-hidden="true">
    <path d="M24 226 V46 Q24 24 46 24 H404 Q432 24 448 46 L522 132 L574 150 Q596 158 596 184 V226 Z"/>
    <path d="M418 44 H440 L506 128 H418 Z"/>
    <path d="M300 44 V220 M24 132 H300" opacity=".55"/>
    <circle cx="136" cy="228" r="34" fill="${VOID}"/><circle cx="484" cy="228" r="34" fill="${VOID}"/>
    <circle cx="136" cy="228" r="12"/><circle cx="484" cy="228" r="12"/>
  </svg>`;

const monogram = `<div class="head" style="font-size:200px;color:${PETAL};line-height:.8">MK</div>`;
const end = e => endCard({ mark: monogram, ...e });
const reelEnd = e => endCard({ w: 1080, h: 1920, padY: 300, sigBottom: 260, mark: monogram, ...e });

// ── Templates ──────────────────────────────────────────────────────────────────

/** Landscape photo in a band across the top, black copy panel below. */
function bandPost({ w = 1080, h = 1350, band = 0.5, tag, kicker, head, sub, action, fine, ...p }) {
  const bh = Math.round(h * band);
  return `<div class="frame" style="width:${w}px;height:${h}px">
    <div style="position:absolute;left:0;right:0;top:0;height:${bh}px;overflow:hidden">${photo(p)}
      <div class="shade" style="background:linear-gradient(180deg, rgba(8,8,8,.55) 0%, rgba(8,8,8,0) 24%, rgba(8,8,8,0) 70%, ${VOID} 100%)"></div></div>
    ${topbar(56, tag)}
    <div style="position:absolute;top:${bh}px;left:72px;right:72px;bottom:120px;display:flex;flex-direction:column;gap:20px;padding-top:24px">
      <div class="kicker">${kicker}</div>
      <div class="head" style="font-size:118px">${head}</div>
      <div class="sub" style="font-size:32px">${sub}</div>
      ${fine ? `<div style="font-size:18px;line-height:1.5;color:${SMOKE}">${fine}</div>` : ''}
      <div style="margin-top:auto">${cta(...action)}</div>
    </div>
    ${sig(56)}
  </div>`;
}

/** Typographic post on black with a pink outline headline. */
function typeCard({ w = 1080, h = 1350, tag, kicker, head, sub, fine, action, art }) {
  return `<div class="frame" style="width:${w}px;height:${h}px;background:radial-gradient(ellipse at 80% 10%, #24161c 0%, ${VOID} 60%)">
    ${topbar(56, tag)}
    ${art ? `<div style="position:absolute;left:80px;top:230px;opacity:.9">${art}</div>` : ''}
    <div style="position:absolute;left:80px;right:80px;top:170px;bottom:130px;display:flex;flex-direction:column;gap:30px">
      <div class="kicker">${kicker}</div>
      <div class="head" style="font-size:190px;margin-top:auto">${head}</div>
      <div class="rule"></div>
      <div class="sub" style="font-size:40px;max-width:880px">${sub}</div>
      ${fine ? `<div style="font-size:24px;line-height:1.6;color:${SMOKE};max-width:880px">${fine}</div>` : ''}
      ${action ? cta(...action) : ''}
    </div>
    ${sig(56)}
  </div>`;
}

/** Numbered carousel slide over a photo, or over black when there's no photo. */
function stepSlide({ series, tag, n, of, title, body, art, ...p }) {
  const bg = p.photo
    ? `${photo(p)}<div class="vignette"></div>
       <div class="shade" style="background:linear-gradient(180deg, rgba(8,8,8,.6) 0%, rgba(8,8,8,0) 18%, rgba(8,8,8,.15) 40%, rgba(8,8,8,.9) 70%, rgba(8,8,8,.97) 100%)"></div>`
    : '';
  const pad = String(n).padStart(2, '0'), total = String(of).padStart(2, '0');
  return `<div class="frame" style="width:1080px;height:1350px;${p.photo ? '' : `background:radial-gradient(ellipse at 20% 0%, #24161c 0%, ${VOID} 65%)`}">
    ${bg}
    ${art ? `<div style="position:absolute;left:80px;top:190px;opacity:.9">${art}</div>` : ''}
    <div class="topbar"><span>${series} · ${pad}/${total}</span><span class="pill">${tag}</span></div>
    <div style="position:absolute;left:80px;right:80px;bottom:140px;display:flex;flex-direction:column;gap:22px">
      <div class="head" style="font-size:220px;color:${PETAL};line-height:.8">${pad}</div>
      <div class="head" style="font-size:110px">${title}</div>
      <div class="rule"></div>
      <div style="font-size:34px;line-height:1.5;color:${PEARL};max-width:900px">${body}</div>
    </div>
    ${sig(56)}
  </div>`;
}

/** MK's business card, in the kit's brand. */
function contactCard({ w = 1080, h = 1350 }) {
  const row = (k, v) => `<div style="display:flex;justify-content:space-between;align-items:baseline;padding:22px 0;border-bottom:1px solid rgba(240,240,238,.14)">
    <span style="font-size:20px;letter-spacing:.24em;text-transform:uppercase;color:${SMOKE}">${k}</span>
    <span style="font-size:${v.length > 20 ? 30 : 38}px;font-weight:600;color:${PEARL}">${v}</span></div>`;
  return `<div class="frame" style="width:${w}px;height:${h}px;background:radial-gradient(ellipse at 50% 0%, #24161c 0%, ${VOID} 60%)">
    ${topbar(h > 1400 ? 150 : 56, MK)}
    <div style="position:absolute;left:84px;right:84px;top:${h > 1400 ? 330 : 190}px;bottom:${h > 1400 ? 360 : 130}px;display:flex;flex-direction:column;gap:26px">
      <div class="kicker">Save my number</div>
      <div class="head" style="font-size:150px">Mary Kate<br><em>Parrish.</em></div>
      <div class="sub" style="font-size:34px">${CARD.title} · ${STORE}</div>
      <div style="margin-top:auto">
        ${row('Showroom', CARD.showroom)}${row('Work', CARD.work)}${row('Email', CARD.email)}
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        ${cta('Text me', 'or DM ' + HANDLE)}
        <span style="font-size:18px;letter-spacing:.16em;text-transform:uppercase;color:${SMOKE};text-align:right;line-height:1.6">${CARD.web}<br>St. James, NY</span>
      </div>
    </div>
    ${sig(h > 1400 ? 260 : 56)}
  </div>`;
}

// Reel scenes, 1080×1920, text inside the Reels/TikTok safe area.
function reelPhoto({ kicker, head, sub, big = 128, ...p }) {
  return `<div class="frame" style="width:1080px;height:1920px">
    ${photo(p)}
    <div class="vignette"></div>
    <div class="shade" style="background:linear-gradient(180deg, rgba(8,8,8,.55) 0%, rgba(8,8,8,0) 18%, rgba(8,8,8,0) 50%, rgba(8,8,8,.88) 78%, rgba(8,8,8,.95) 100%)"></div>
    <div style="position:absolute;left:64px;right:170px;bottom:520px;display:flex;flex-direction:column;gap:18px">
      ${kicker ? `<div class="kicker">${kicker}</div>` : ''}
      <div class="head" style="font-size:${big}px">${head}</div>
      ${sub ? `<div class="sub" style="font-size:38px">${sub}</div>` : ''}
    </div>
    <div style="position:absolute;left:64px;bottom:430px;font-size:22px;letter-spacing:.14em;text-transform:uppercase;color:${SMOKE}">
      <b style="font-family:'Bebas Neue';font-weight:400;font-size:34px;letter-spacing:.08em;color:${PEARL};margin-right:8px">MK</b><span style="color:${PETAL};text-transform:none;letter-spacing:.04em">${HANDLE}</span> · ${STORE}
    </div>
  </div>`;
}
function reelType({ kicker, head, sub, big = 170, pink = true }) {
  const bg = pink ? PETAL : VOID, fg = pink ? VOID : PEARL;
  return `<div class="frame" style="width:1080px;height:1920px;background:${bg};color:${fg}">
    <div style="position:absolute;left:72px;right:170px;top:0;bottom:430px;display:flex;flex-direction:column;justify-content:center;gap:28px">
      <div class="kicker" style="color:${pink ? VOID : PETAL}">${kicker}</div>
      <div class="head" style="font-size:${big}px;color:${fg}">${head}</div>
      <div class="sub" style="font-size:42px;color:${fg}">${sub}</div>
    </div>
  </div>`;
}
function clipOverlay({ kicker, head, sub }) {
  return `<div style="width:1080px;height:1920px;position:relative">
    <div style="position:absolute;left:0;right:0;bottom:0;height:900px;background:linear-gradient(180deg, rgba(8,8,8,0) 0%, rgba(8,8,8,.85) 60%)"></div>
    <div style="position:absolute;left:64px;right:170px;bottom:520px;display:flex;flex-direction:column;gap:18px">
      ${kicker ? `<div class="kicker">${kicker}</div>` : ''}
      <div class="head" style="font-size:120px">${head}</div>
      ${sub ? `<div class="sub" style="font-size:38px">${sub}</div>` : ''}
    </div>
  </div>`;
}

// ── Photos ─────────────────────────────────────────────────────────────────────
const P = {
  config: { photo: 'gls63-configurator.jpg', pos: 'center 38%' },
  g63: { photo: 'g63-matte-showroom.jpg', pos: '48% center' },
  gt: { photo: 'amg-gt-coupe-lot.jpg', pos: 'center 62%' },
  gleWhite: { photo: 'gle-white-front.jpg', pos: 'center 58%' },
  gleFair: { photo: 'gle-street-fair.jpg', pos: 'center 72%' },
  libi: { photo: 'libi-golf-tent.jpg', pos: 'center 62%' },
  coupon: { photo: 'libi-coupon.jpg', pos: 'center 55%' },
  fit: { photo: 'mk-fit-check.jpg', pos: '55% 20%' },
  cleInt: { photo: 'cle-cognac-interior.jpg', pos: 'center 60%' },
  cleFront: { photo: 'cle-graphite-front.jpg', pos: 'center 50%' },
  suvInt: { photo: 'suv-interior-white.jpg', pos: 'center 55%' },
};

// ── The kit ────────────────────────────────────────────────────────────────────
const FEED = [
  ['14-fleet-sprinter', typeCard({
    tag: FLEET, kicker: 'Mercedes-Benz Sprinter · Commercial &amp; Fleet',
    head: 'Your business.<br><em>Our Sprinter.</em>',
    sub: 'Cargo, crew and passenger vans for Long Island businesses — with fleet specials when you’re ready to grow.',
    fine: 'One van or a whole fleet: DM “FLEET” with your business and what you haul, and I’ll send this month’s fleet offers.',
    action: ['DM “FLEET”', HANDLE],
  })],
  ['15-build-your-2027', bandPost({
    ...P.config, band: 0.46, tag: BUILD,
    kicker: 'Custom factory order · 2027 models',
    head: 'Don’t settle<br>for <em>the lot.</em>',
    sub: 'Pick the paint, the leather, the wheels, the packages. I’ll place the factory order for your 2027 Mercedes-Benz.',
    action: ['DM “BUILD”', HANDLE],
  })],
  ['16-g63-built-your-way', hero({
    ...P.g63, tag: BUILD,
    model: 'Mercedes-AMG G 63 · Matte black',
    head: 'Built<br><em>your way.</em>',
    sub: 'Matte paint, black wheels, black everything. Custom-order yours — every detail is your call.',
    action: ['DM “G”', 'to spec yours'],
  })],
  ['17-proud-to-be-local', hero({
    ...P.gleFair, tag: LOCAL,
    model: 'Mercedes-Benz GLE · Out in the community',
    head: 'Proud to be<br><em>local.</em>',
    sub: 'You’ll find us out in the neighborhood, not just on the showroom floor. Thank you to everyone who stopped by.',
    action: ['Say hi', 'at the next one'],
  })],
  ['18-libi-golf-outing', bandPost({
    ...P.libi, band: 0.48, tag: LOCAL,
    kicker: 'LIBI Annual Golf &amp; Softball Outing',
    head: 'Proud to<br><em>show up.</em>',
    sub: `Thank you to the Long Island Builders Institute for having ${GROUP} and ${STORE} out on the course.`,
    action: ['Builders: DM “FLEET”', 'for work-van specials'],
  })],
  ['19-amg-gt-coupe', hero({
    ...P.gt,
    tag: 'Mercedes-AMG',
    model: 'Mercedes-AMG GT Coupé',
    head: 'Two doors.<br><em>Zero apologies.</em>',
    sub: 'On the lot in St. James. Come hear it start.',
    action: ['DM “GT”', HANDLE],
  })],
  ['20-gle-fresh-face', hero({
    ...P.gleWhite, tag: 'New arrivals',
    model: 'Mercedes-Benz GLE',
    head: 'Fresh<br><em>face.</em>',
    sub: 'Star-pattern grille, panoramic roof, and a cabin made for road trips.',
    action: ['DM “GLE”', HANDLE],
  })],
  ['21-save-my-number', contactCard({})],
  ['22-showroom-fit-check', hero({
    ...P.fit, tag: MK,
    model: 'Your Mercedes-Benz specialist',
    head: 'Showroom<br><em>fit check.</em>',
    sub: 'Dressed for the deal. Come say hi — ask for MK.',
    action: ['Ask for MK', HANDLE],
  })],
  // Not scheduled: confirm the offer can be promoted publicly first.
  ['23-libi-coupon', bandPost({
    ...P.coupon, band: 0.44, tag: LOCAL,
    kicker: 'LIBI Golf &amp; Softball Outing · Sept 29',
    head: 'Got the<br><em>coupon?</em>',
    sub: 'Bring it in for $1,500 off MSRP on any new car. Ask for me and I’ll make sure it’s applied.',
    fine: 'Coupon from the LIBI Annual Golf &amp; Softball Outing. See coupon for expiration; see dealer for details.',
    action: ['Ask for MK', HANDLE],
  })],
];

const VANS = [
  { title: 'Cargo Van', body: 'Room for tools, stock and ladders. Ask me about upfits — shelving, racks and partitions.' },
  { title: 'Crew Van', body: 'Seats for your crew and space for their gear, in one van.' },
  { title: 'Passenger Van', body: 'Shuttles, teams, tours and hotel runs — moved in comfort.' },
  { title: 'Fleet specials', body: 'Buying for a business? Ask what fleet pricing and commercial programs are running this month.' },
];
const CAROUSEL_FLEET = [
  ['00-cover', typeCard({
    tag: FLEET, kicker: 'Swipe → Mercedes-Benz Sprinter', art: van(560),
    head: 'Built for<br><em>business.</em>',
    sub: 'Three ways to put a Sprinter to work — and how to get fleet pricing.',
    action: ['Save this', 'for your business'],
  })],
  ...VANS.map((v, i) => [`${String(i + 1).padStart(2, '0')}-van`, stepSlide({ ...v, art: van(), series: 'Built for business', tag: FLEET, n: i + 1, of: VANS.length })]),
  ['05-end', end({
    kicker: 'Fleet &amp; Commercial',
    head: 'DM me <em>“FLEET.”</em>',
    sub: 'Tell me your business and what you haul. I’ll match you with the right Sprinter and this month’s fleet offers.',
    action: ['DM “FLEET”', HANDLE],
  })],
];

const STEPS = [
  { ...P.cleInt, title: 'Spec it', body: 'Paint, leather, wheels, packages. We build it together — online or at my desk.' },
  { ...P.g63, pos: '48% center', title: 'I place the order', body: 'I submit your build and keep you posted on timing.' },
  { ...P.gt, title: 'Track it', body: 'Updates from me, from order to arrival in St. James.' },
  { ...P.gleWhite, title: 'Drive it home', body: 'Exactly how you specced it. I’ll walk you through every feature at delivery.' },
];
const CAROUSEL_BUILD = [
  ['00-cover', bandPost({
    ...P.config, band: 0.46, tag: BUILD,
    kicker: 'Swipe → how a custom order works',
    head: 'Build your<br><em>2027.</em>',
    sub: 'The Mercedes-Benz you actually want, not just the one on the lot.',
    action: ['Save this', 'for your next car'],
  })],
  ...STEPS.map((s, i) => [`${String(i + 1).padStart(2, '0')}-step`, stepSlide({ ...s, series: 'Build your 2027', tag: BUILD, n: i + 1, of: STEPS.length })]),
  ['05-end', end({
    kicker: 'Custom order · 2027 models',
    head: 'DM me <em>“BUILD.”</em>',
    sub: 'Tell me the model you’re dreaming about and I’ll send you a build to start from.',
    action: ['DM “BUILD”', HANDLE],
  })],
];

const STORIES = [
  ['05-save-my-number', contactCard({ h: 1920 })],
];

const REELS = [
  {
    name: '08-glc-walkaround',
    scenes: [
      { clip: 'glc-white-walkaround.mp4', start: 0.3, html: clipOverlay({ kicker: 'Mercedes-Benz GLC 300', head: 'POV: your GLC<br>is <em>ready.</em>' }), dur: 3.2 },
      { clip: 'glc-white-walkaround.mp4', start: 4.5, html: clipOverlay({ head: 'Walk it <em>with me.</em>' }), dur: 3.0 },
      { clip: 'glc-white-walkaround.mp4', start: 15.0, html: clipOverlay({ kicker: 'Mercedes-Benz of Smithtown', head: 'From <em>our lot</em><br>to your driveway.' }), dur: 3.6 },
      { html: reelEnd({ kicker: 'Mercedes-Benz GLC', head: 'DM me <em>“GLC.”</em>', sub: 'I’ll send you the details and set up your test drive.', action: ['DM “GLC”', HANDLE] }), dur: 2.8, still: true },
    ],
  },
  {
    name: '09-cle-cabriolet-graphite',
    scenes: [
      { clip: 'cle-graphite-walkaround.mp4', start: 7.5, html: clipOverlay({ kicker: 'Mercedes-Benz CLE Cabriolet', head: 'Top down in<br><em>October?</em>' }), dur: 3.0 },
      { clip: 'cle-graphite-walkaround.mp4', start: 12.0, html: clipOverlay({ head: 'Dark paint.<br><em>Cognac</em> leather.' }), dur: 3.0 },
      { clip: 'cle-graphite-walkaround.mp4', start: 17.2, html: clipOverlay({ head: 'Come sit <em>in it.</em>' }), dur: 2.8 },
      { html: reelEnd({ kicker: 'CLE Cabriolet', head: 'DM me <em>“CABRIO.”</em>', sub: 'I’ll have it pulled up front for you.', action: ['DM “CABRIO”', HANDLE] }), dur: 2.8, still: true },
    ],
  },
  {
    name: '10-interior-check',
    scenes: [
      { clip: 'suv-interior-tour.mp4', start: 0.3, html: clipOverlay({ kicker: 'Mercedes-Benz SUV', head: 'Interior <em>check.</em>' }), dur: 3.4 },
      { clip: 'suv-interior-tour.mp4', start: 5.0, html: clipOverlay({ head: 'Wood, chrome<br>and <em>that screen.</em>' }), dur: 3.0 },
      { clip: 'suv-interior-tour.mp4', start: 10.0, html: clipOverlay({ head: 'Room for<br><em>everyone.</em>' }), dur: 3.0 },
      { html: reelEnd({ kicker: 'Interior tours', head: 'DM me <em>“TOUR.”</em>', sub: 'I’ll give you the full walkthrough in person.', action: ['DM “TOUR”', HANDLE] }), dur: 2.8, still: true },
    ],
  },
  {
    name: '11-build-your-2027',
    scenes: [
      { html: reelPhoto({ ...P.config, pos: '82% center', kicker: 'Custom order · 2027 models', head: 'Don’t settle for <em>the lot.</em>', big: 150 }), dur: 2.6 },
      { html: reelPhoto({ ...P.g63, head: 'Pick the <em>paint.</em>', big: 160 }), dur: 1.9 },
      { html: reelPhoto({ ...P.cleInt, head: 'Pick the <em>leather.</em>', big: 160 }), dur: 1.9 },
      { html: reelPhoto({ ...P.gt, head: 'Pick the <em>wheels.</em>', big: 160 }), dur: 1.9 },
      { html: reelType({ kicker: 'Mercedes-Benz of Smithtown', head: 'Build your 2027.', sub: 'I’ll place the factory order and keep you posted the whole way.' }), dur: 2.8, still: true },
      { html: reelEnd({ kicker: 'Custom order', head: 'DM me <em>“BUILD.”</em>', sub: 'Tell me the model and I’ll send a build to start from.', action: ['DM “BUILD”', HANDLE] }), dur: 2.8, still: true },
    ],
  },
  {
    name: '12-fleet-sprinter',
    scenes: [
      { html: reelType({ pink: false, kicker: 'Long Island business owners', head: 'Contractors.<br>Caterers.<br>Florists.<br><em>Plumbers.</em>', sub: '', big: 150 }), dur: 2.6, still: true },
      { html: reelType({ kicker: 'Mercedes-Benz Sprinter', head: 'Your next work van.', sub: 'Cargo, crew and passenger vans, built for the job.' }), dur: 2.6, still: true },
      { html: reelType({ pink: false, kicker: 'Fleet &amp; Commercial', head: 'Fleet <em>specials.</em>', sub: 'One van or twenty — ask me what’s running this month.' }), dur: 2.6, still: true },
      { html: reelEnd({ kicker: 'Fleet &amp; Commercial', head: 'DM me <em>“FLEET.”</em>', sub: 'Tell me your business and what you haul.', action: ['DM “FLEET”', HANDLE] }), dur: 2.8, still: true },
    ],
  },
  {
    name: '13-out-in-the-community',
    scenes: [
      { clip: 'gle-street-fair-clip.mp4', start: 0, html: clipOverlay({ kicker: STORE, head: 'Out in the<br><em>community.</em>' }), dur: 2.2 },
      { html: reelPhoto({ ...P.gleFair, head: 'Proud to be <em>local.</em>', big: 150 }), dur: 2.2 },
      { html: reelPhoto({ ...P.libi, pos: '60% center', kicker: 'LIBI Golf &amp; Softball Outing', head: 'On the <em>course.</em>', big: 150 }), dur: 2.4 },
      { html: reelEnd({ kicker: GROUP, head: 'See you at the <em>next one.</em>', sub: 'Tell me what’s happening in your town — we love to show up.', action: ['Ask for MK', HANDLE] }), dur: 2.8, still: true },
    ],
  },
];

// ── Render ─────────────────────────────────────────────────────────────────────
// CHROMIUM_PATH lets this run where Playwright's own browser build isn't installed.
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage();

const feedDir = dir('vol3/feed'), fleetDir = dir('vol3/carousel-fleet'), buildDir = dir('vol3/carousel-build'),
      storiesDir = dir('vol3/stories'), reelsDir = dir('vol3/reels');
for (const [name, html] of FEED) await render(page, html, 1080, 1350, path.join(feedDir, `${name}.png`));
for (const [name, html] of CAROUSEL_FLEET) await render(page, html, 1080, 1350, path.join(fleetDir, `${name}.png`));
for (const [name, html] of CAROUSEL_BUILD) await render(page, html, 1080, 1350, path.join(buildDir, `${name}.png`));
for (const [name, html] of STORIES) await render(page, html, 1080, 1920, path.join(storiesDir, `${name}.png`));
for (const r of REELS) await buildReel(page, r, reelsDir);

await browser.close();
cleanup();
