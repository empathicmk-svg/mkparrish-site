#!/usr/bin/env node
/**
 * MK (@mk_parrish) × Mercedes-Benz of Smithtown — Pink Bow October, volume 2.
 *
 * More feed posts, two carousels ("Know your grille", "Lease ending?"), poll and
 * question stories, and five Reels/TikToks cut from the same showroom photos
 * and walkaround clips. Photo scenes get a slow push-in; scenes cross-fade.
 *
 * Output: output/mercedes-smithtown/vol2/{feed,carousel-grille,carousel-lease,stories,reels}/
 * Run:    node marketing/mercedes-smithtown/build-vol2.mjs
 */
import { chromium } from 'playwright';
import { execFileSync } from 'child_process';
import path from 'path';
import {
  ROOT, MEDIA, VOID, PEARL, SMOKE, PETAL, HANDLE, STORE, work,
  img, ribbon, topbar, sig, cta, hero, endCard, render, dir, cleanup,
} from './lib.mjs';

// ── Templates ──────────────────────────────────────────────────────────────────

/** Photo layer that can zoom into a detail: (ox, oy) is the focus point in %. */
const photo = ({ photo: name, pos = 'center', zoom = 1, ox = 50, oy = 50, style = '' }) =>
  `<img class="photo" src="${img(name)}" style="object-position:${pos};transform:scale(${zoom});transform-origin:${ox}% ${oy}%;${style}">`;

/** Two photos stacked with an OR pill between them. */
function thisOrThat({ w = 1080, h = 1350, top, bottom, kicker, head, action }) {
  const half = Math.round(h / 2);
  const label = (t, s, y) => `<div style="position:absolute;left:56px;${y}" class="head"><span style="font-size:30px;font-family:'DM Sans';font-weight:600;letter-spacing:.24em;color:${PETAL}">${t}</span><br><span style="font-size:76px">${s}</span></div>`;
  return `<div class="frame" style="width:${w}px;height:${h}px">
    <div style="position:absolute;left:0;right:0;top:0;height:${half}px;overflow:hidden">${photo(top)}
      <div class="shade" style="background:linear-gradient(180deg, rgba(8,8,8,.6) 0%, rgba(8,8,8,0) 30%, rgba(8,8,8,0) 60%, rgba(8,8,8,.75) 100%)"></div>
      ${label('THIS', top.label, 'bottom:28px')}</div>
    <div style="position:absolute;left:0;right:0;bottom:0;height:${h - half}px;overflow:hidden">${photo(bottom)}
      <div class="shade" style="background:linear-gradient(180deg, rgba(8,8,8,.75) 0%, rgba(8,8,8,0) 35%, rgba(8,8,8,0) 70%, rgba(8,8,8,.85) 100%)"></div>
      ${label('OR THAT', bottom.label, 'top:28px')}</div>
    <div style="position:absolute;left:0;right:0;top:${half - 3}px;height:6px;background:${PETAL}"></div>
    <div style="position:absolute;right:56px;top:${half - 62}px;width:124px;height:124px;border-radius:50%;background:${VOID};border:4px solid ${PETAL};
                display:flex;align-items:center;justify-content:center" class="head"><span style="font-size:64px;color:${PETAL}">OR</span></div>
    ${topbar()}
    <div style="position:absolute;left:56px;right:56px;bottom:110px;display:flex;flex-direction:column;gap:16px">
      <div class="kicker">${kicker}</div>
      <div class="head" style="font-size:96px">${head}</div>
      ${cta(...action)}
    </div>
    ${sig(48)}
  </div>`;
}

/** Typographic post on petal pink, no photo. */
function typePost({ w = 1080, h = 1350, kicker, head, sub, fine }) {
  return `<div class="frame" style="width:${w}px;height:${h}px;background:${PETAL};color:${VOID}">
    <div style="position:absolute;right:-40px;top:120px;opacity:.16">${ribbon(760, VOID)}</div>
    <div style="position:absolute;left:80px;right:80px;top:110px;bottom:110px;display:flex;flex-direction:column;gap:30px">
      <div class="kicker" style="color:${VOID}">${ribbon(32, VOID)}${kicker}</div>
      <div class="head" style="font-size:200px;color:${VOID};margin-top:auto">${head}</div>
      <div class="sub" style="font-size:40px;color:${VOID};max-width:860px">${sub}</div>
      <div style="height:2px;background:${VOID};width:120px"></div>
      <div style="font-size:22px;line-height:1.6;letter-spacing:.06em">${fine}</div>
      <div style="display:flex;justify-content:space-between;font-size:18px;letter-spacing:.16em;text-transform:uppercase">
        <span><b style="font-family:'Bebas Neue';font-weight:400;font-size:32px;letter-spacing:.08em;margin-right:10px">MK</b>${HANDLE}</span><span>${STORE}</span>
      </div>
    </div>
  </div>`;
}

/** Detail slide: zoomed photo with a numbered caption. */
function detailSlide({ n, of, title, note, ...p }) {
  return `<div class="frame" style="width:1080px;height:1350px">
    ${photo(p)}
    <div class="vignette"></div>
    <div class="shade" style="background:linear-gradient(180deg, rgba(8,8,8,.6) 0%, rgba(8,8,8,0) 18%, rgba(8,8,8,0) 58%, rgba(8,8,8,.94) 100%)"></div>
    <div class="topbar"><span>Know your grille · ${String(n).padStart(2, '0')}/${String(of).padStart(2, '0')}</span><span class="pill">${ribbon(24)}Pink Bow October</span></div>
    <div style="position:absolute;left:72px;right:72px;bottom:130px;display:flex;flex-direction:column;gap:14px">
      <div class="kicker">Mercedes-Benz</div>
      <div class="head" style="font-size:96px">${title}</div>
      <div class="sub" style="font-size:32px;color:${SMOKE};max-width:900px">${note}</div>
    </div>
    ${sig(56)}
  </div>`;
}

/** Text slide over a dark, blurred photo. */
function tipSlide({ n, of, title, body, ...p }) {
  return `<div class="frame" style="width:1080px;height:1350px">
    ${photo({ ...p, style: 'filter:blur(14px) brightness(.38) saturate(.8)' })}
    <div class="topbar"><span>Lease ending? · ${String(n).padStart(2, '0')}/${String(of).padStart(2, '0')}</span><span class="pill">${ribbon(24)}Pink Bow October</span></div>
    <div style="position:absolute;left:80px;right:80px;top:220px;bottom:150px;display:flex;flex-direction:column;gap:30px;justify-content:center">
      <div class="head" style="font-size:240px;color:${PETAL};line-height:.8">${String(n - 1).padStart(2, '0')}</div>
      <div class="head" style="font-size:112px">${title}</div>
      <div class="rule"></div>
      <div style="font-size:36px;line-height:1.5;color:${PEARL};max-width:880px">${body}</div>
    </div>
    ${sig(56)}
  </div>`;
}

/** Story with two photos and room in the middle for a poll sticker. */
function pollStory({ top, bottom, kicker, head }) {
  return `<div class="frame" style="width:1080px;height:1920px">
    <div style="position:absolute;left:0;right:0;top:0;height:780px;overflow:hidden">${photo(top)}
      <div class="shade" style="background:linear-gradient(180deg, rgba(8,8,8,.55) 0%, rgba(8,8,8,0) 30%)"></div>
      <div class="head" style="position:absolute;left:56px;bottom:30px;font-size:72px;text-shadow:0 2px 18px rgba(0,0,0,.6)">${top.label}</div></div>
    <div style="position:absolute;left:0;right:0;bottom:0;height:780px;overflow:hidden">${photo(bottom)}
      <div class="shade" style="background:linear-gradient(0deg, rgba(8,8,8,.7) 0%, rgba(8,8,8,0) 40%)"></div>
      <div class="head" style="position:absolute;left:56px;top:30px;font-size:72px;text-shadow:0 2px 18px rgba(0,0,0,.6)">${bottom.label}</div></div>
    <div style="position:absolute;left:0;right:0;top:780px;height:360px;background:${VOID};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;text-align:center">
      <div class="kicker">${ribbon(28)}${kicker}</div>
      <div class="head" style="font-size:84px">${head}</div>
      <div style="font-size:20px;letter-spacing:.2em;color:${SMOKE};text-transform:uppercase">↓ poll sticker here ↓</div>
    </div>
    ${topbar(150)}
    ${sig(80)}
  </div>`;
}

/** Story with a photo on top and room for a question sticker below. */
function askStory({ kicker, head, sub, ...p }) {
  return `<div class="frame" style="width:1080px;height:1920px;background:radial-gradient(ellipse at 50% 70%, #24161c 0%, ${VOID} 70%)">
    <div style="position:absolute;left:0;right:0;top:0;height:900px;overflow:hidden">${photo(p)}
      <div class="shade" style="background:linear-gradient(180deg, rgba(8,8,8,.5) 0%, rgba(8,8,8,0) 25%, rgba(8,8,8,0) 60%, ${VOID} 100%)"></div></div>
    ${topbar(150)}
    <div style="position:absolute;left:72px;right:72px;top:860px;display:flex;flex-direction:column;gap:22px">
      <div class="kicker">${ribbon(28)}${kicker}</div>
      <div class="head" style="font-size:132px">${head}</div>
      <div class="sub" style="font-size:36px">${sub}</div>
      <div style="margin-top:40px;height:300px;border:2px dashed rgba(255,181,208,.5);border-radius:28px;display:flex;align-items:center;justify-content:center;
                  font-size:20px;letter-spacing:.2em;color:${SMOKE};text-transform:uppercase">question sticker here</div>
    </div>
    ${sig(80)}
  </div>`;
}

// Reel scenes, 1080×1920. Text stays inside the TikTok/Reels safe area
// (clear of the top bar, the right-hand buttons and the bottom caption).
function reelPhoto({ kicker, head, sub, big = 128, ...p }) {
  return `<div class="frame" style="width:1080px;height:1920px">
    ${photo(p)}
    <div class="vignette"></div>
    <div class="shade" style="background:linear-gradient(180deg, rgba(8,8,8,.55) 0%, rgba(8,8,8,0) 18%, rgba(8,8,8,0) 50%, rgba(8,8,8,.88) 78%, rgba(8,8,8,.95) 100%)"></div>
    <div style="position:absolute;left:64px;right:170px;bottom:520px;display:flex;flex-direction:column;gap:18px">
      ${kicker ? `<div class="kicker">${ribbon(30)}${kicker}</div>` : ''}
      <div class="head" style="font-size:${big}px">${head}</div>
      ${sub ? `<div class="sub" style="font-size:38px">${sub}</div>` : ''}
    </div>
    <div style="position:absolute;left:64px;bottom:430px;font-size:22px;letter-spacing:.14em;text-transform:uppercase;color:${SMOKE}">
      <b style="font-family:'Bebas Neue';font-weight:400;font-size:34px;letter-spacing:.08em;color:${PEARL};margin-right:8px">MK</b><span style="color:${PETAL};text-transform:none;letter-spacing:.04em">${HANDLE}</span> · ${STORE}
    </div>
  </div>`;
}
function reelType({ kicker, head, sub }) {
  return `<div class="frame" style="width:1080px;height:1920px;background:${PETAL};color:${VOID}">
    <div style="position:absolute;right:-60px;top:260px;opacity:.14">${ribbon(900, VOID)}</div>
    <div style="position:absolute;left:72px;right:170px;top:0;bottom:430px;display:flex;flex-direction:column;justify-content:center;gap:28px">
      <div class="kicker" style="color:${VOID}">${ribbon(32, VOID)}${kicker}</div>
      <div class="head" style="font-size:170px;color:${VOID}">${head}</div>
      <div class="sub" style="font-size:42px;color:${VOID}">${sub}</div>
    </div>
  </div>`;
}
function clipOverlay({ kicker, head, sub }) {
  return `<div style="width:1080px;height:1920px;position:relative">
    <div style="position:absolute;left:0;right:0;bottom:0;height:900px;background:linear-gradient(180deg, rgba(8,8,8,0) 0%, rgba(8,8,8,.85) 60%)"></div>
    <div style="position:absolute;left:64px;right:170px;bottom:520px;display:flex;flex-direction:column;gap:18px">
      <div class="kicker">${ribbon(30)}${kicker}</div>
      <div class="head" style="font-size:120px">${head}</div>
      ${sub ? `<div class="sub" style="font-size:38px">${sub}</div>` : ''}
    </div>
  </div>`;
}
const reelEnd = e => endCard({ w: 1080, h: 1920, padY: 300, sigBottom: 260, ...e });

// ── The kit ────────────────────────────────────────────────────────────────────
const P = {
  cla: { photo: 'sedan-silver-stars.jpg', pos: 'center 60%' },
  claDay: { photo: 'sedan-silver-daylight.jpg', pos: 'center 55%' },
  amgE: { photo: 'amg-matte-white-front.jpg', pos: 'center 60%' },
  amgGle: { photo: 'amg-suv-black-front.jpg', pos: 'center 62%' },
  amgGt: { photo: 'amg-gt-front-white.jpg', pos: 'center 62%' },
  amgGtSide: { photo: 'amg-white-profile-pair.jpg', pos: '28% center' },
  gle: { photo: 'suv-black-front.jpg', pos: 'center 45%' },
  gleOut: { photo: 'suv-black-outdoor.jpg', pos: '78% center' },
  gls: { photo: 'gls-white-front.jpg', pos: 'center 60%' },
  glb: { photo: 'suv-silver-front.jpg', pos: 'center top', zoom: 1.5, ox: 50, oy: 0 },
  cle: { photo: 'cle-black-pair.jpg', pos: '30% center' },
};

const FEED = [
  ['08-this-or-that-suv', thisOrThat({
    top: { ...P.gls, pos: 'center 62%', label: 'GLS · 7 seats' },
    bottom: { ...P.glb, label: 'GLB · compact' },
    kicker: 'This or that · SUV edition', head: 'Big family or<br>easy parking?',
    action: ['Comment GLS or GLB', ''],
  })],
  ['09-this-or-that-sedan-suv', thisOrThat({
    top: { ...P.cla, pos: 'center 64%', label: 'The all-new CLA' },
    bottom: { ...P.gle, pos: 'center 55%', label: 'GLE' },
    kicker: 'This or that · Pink Bow October', head: 'Sedan or<br>SUV?',
    action: ['Comment CLA or GLE', ''],
  })],
  ['10-early-detection', typePost({
    kicker: 'Breast Cancer Awareness Month',
    head: 'Early detection saves lives.',
    sub: 'Every pink bow on our floor this month is a reminder. Book the screening — for you, your mom, your sister, your best friend.',
    fine: 'Talk to your doctor about the screening that’s right for you.<br>Share this with someone who needs the nudge 🎀',
  })],
  ['11-matte-amg-e-class', hero({
    ...P.amgE,
    model: 'Mercedes-AMG E-Class · Matte white',
    head: 'Satin white.<br><em>Pink bow.</em>',
    sub: 'AMG grille, matte paint, zero subtlety. On the floor now in St. James.',
    action: ['DM “MATTE”', HANDLE],
  })],
  ['12-meet-the-new-cla', hero({
    ...P.claDay,
    model: 'The all-new Mercedes-Benz CLA',
    head: 'Meet the<br><em>new CLA.</em>',
    sub: 'A grille full of three-pointed stars — and a pink bow on top.',
    action: ['DM “CLA”', 'to see it in person'],
  })],
  ['13-wrapped-for-a-reason', hero({
    ...P.gle, zoom: 1.9, ox: 46, oy: 26,
    model: 'Mercedes-Benz GLE · Pink Bow October',
    head: 'Wrapped for<br><em>a reason.</em>',
    sub: 'This bow is for every fighter, every survivor, and everyone we carry with us.',
    action: ['Share the pink', 'tag someone'],
  })],
];

const GRILLES = [
  { ...P.cla, zoom: 2.1, ox: 56, oy: 62, title: 'Star pattern', note: 'The all-new CLA: a closed grille covered in three-pointed stars.' },
  { ...P.amgGle, zoom: 1.9, ox: 51, oy: 72, title: 'AMG Panamericana', note: 'Vertical chrome bars from the racetrack. You’ll know it in your mirror.' },
  { ...P.gle, zoom: 1.9, ox: 51, oy: 60, title: 'Star grille + chrome', note: 'GLE: stars, chrome bars and the big three-pointed star front and center.' },
  { ...P.gls, zoom: 1.9, ox: 49, oy: 58, title: 'Classic chrome bars', note: 'GLS: upright, horizontal chrome — flagship SUV presence.' },
];
const CAROUSEL_GRILLE = [
  ['00-cover', hero({
    ...P.amgGt, zoom: 1.9, ox: 53, oy: 66,
    model: 'Swipe → four Mercedes-Benz grilles',
    head: 'Know your <em>grille.</em>',
    sub: 'You can tell a Mercedes-Benz from the front. Can you tell which one?',
    action: ['Save this', 'for your next car'],
  })],
  ...GRILLES.map((g, i) => [`${String(i + 1).padStart(2, '0')}-grille`, detailSlide({ ...g, n: i + 1, of: GRILLES.length })]),
  ['05-end', endCard({
    kicker: 'Pink Bow October',
    head: 'Which grille <em>gets you?</em>',
    sub: 'Comment your favorite and I’ll show you the car in person — pink bow included.',
    action: ['Comment 1–4', HANDLE],
  })],
];

const TIPS = [
  { ...P.gleOut, title: 'Check your miles', body: 'Over or under your allowance, it changes your best move. Know the number before you call anyone.' },
  { ...P.amgGle, title: 'Know your equity', body: 'Your Mercedes-Benz may be worth more than your payoff. That gap can work for you on the next one.' },
  { ...P.gls, title: 'Start 90–120 days out', body: 'More time means more options — and no rushed decisions in your last month.' },
  { ...P.cla, title: 'Ask about current programs', body: 'Mercedes-Benz Financial Services sometimes offers lease-end and loyalty programs. Ask me what applies to you right now.' },
];
const CAROUSEL_LEASE = [
  ['00-cover', hero({
    ...P.amgGtSide,
    model: 'Swipe → 4 moves before your lease ends',
    head: 'Lease ending<br><em>soon?</em>',
    sub: 'Read this before you hand back the keys.',
    action: ['Save this', 'you’ll need it'],
  })],
  ...TIPS.map((t, i) => [`${String(i + 1).padStart(2, '0')}-tip`, tipSlide({ ...t, n: i + 2, of: TIPS.length + 2 })]),
  ['05-end', endCard({
    kicker: 'Lease-end questions welcome',
    head: 'DM me <em>“LEASE.”</em>',
    sub: 'Send your model and maturity month and I’ll walk you through your options — no pressure.',
    action: ['DM “LEASE”', HANDLE],
  })],
];

const STORIES = [
  ['03-poll-which-bow', pollStory({
    top: { ...P.gls, pos: 'center 58%', label: 'GLS' },
    bottom: { ...P.amgGt, pos: 'center 58%', label: 'AMG GT 4-Door' },
    kicker: 'Pink Bow October', head: 'Which bow goes<br>home first?',
  })],
  ['04-ask-mk', askStory({
    ...P.gle, pos: 'center 40%',
    kicker: 'Ask MK', head: 'Ask me <em>anything.</em>',
    sub: 'Leasing, trade-ins, AMG, which SUV fits your family — drop it below.',
  })],
];

// Reels: each scene is a photo (slow push-in), a clip segment or a card.
const REELS = [
  {
    name: '03-pick-your-bow',
    scenes: [
      { html: reelPhoto({ ...P.claDay, kicker: 'Pink Bow October', head: 'Pick your<br><em>bow.</em>', sub: 'Five on the floor. One goes home with you.', big: 170 }), dur: 2.4 },
      { html: reelPhoto({ ...P.cla, kicker: '01', head: 'The all-new CLA' }), dur: 1.7 },
      { html: reelPhoto({ ...P.amgE, kicker: '02', head: 'AMG E-Class · matte' }), dur: 1.7 },
      { html: reelPhoto({ ...P.amgGle, kicker: '03', head: 'Mercedes-AMG GLE' }), dur: 1.7 },
      { html: reelPhoto({ ...P.amgGtSide, kicker: '04', head: 'AMG GT 4-Door Coupé' }), dur: 1.7 },
      { html: reelPhoto({ ...P.gls, kicker: '05', head: 'Mercedes-Benz GLS' }), dur: 1.7 },
      { html: reelEnd({ kicker: 'Pink Bow October', head: 'Comment your <em>number.</em>', sub: 'I’ll DM you trim, color and payment options.', action: ['Comment 1–5', HANDLE] }), dur: 2.8, still: true },
    ],
  },
  {
    name: '04-every-bow-is-pink',
    scenes: [
      { html: reelPhoto({ ...P.gle, zoom: 1.9, ox: 46, oy: 26, kicker: 'Mercedes-Benz of Smithtown', head: 'Every bow on our floor is <em>pink.</em>', big: 140 }), dur: 2.6 },
      { html: reelPhoto({ ...P.gls, head: 'For every <em>fighter.</em>', big: 150 }), dur: 2.0 },
      { html: reelPhoto({ ...P.amgGt, head: 'Every <em>survivor.</em>', big: 150 }), dur: 2.0 },
      { html: reelPhoto({ ...P.cle, head: 'And everyone we <em>carry with us.</em>', big: 140 }), dur: 2.4 },
      { html: reelType({ kicker: 'Breast Cancer Awareness Month', head: 'Book the screening.', sub: 'Then come see me for the test drive. In that order. 🎀' }), dur: 3.0, still: true },
      { html: reelEnd({ kicker: 'Pink Bow October', head: 'Share the <em>pink.</em>', sub: 'Send this to someone who needs the reminder.', action: ['Ask for MK', HANDLE] }), dur: 2.6, still: true },
    ],
  },
  {
    name: '05-which-amg-are-you',
    scenes: [
      { html: reelPhoto({ ...P.amgGt, kicker: 'Mercedes-AMG', head: 'Which AMG<br>are <em>you?</em>', big: 170 }), dur: 2.4 },
      { html: reelPhoto({ ...P.amgGtSide, kicker: '01', head: 'AMG GT 4-Door Coupé', sub: 'Four doors. Still an AMG GT.' }), dur: 2.0 },
      { html: reelPhoto({ ...P.amgE, kicker: '02', head: 'AMG E-Class', sub: 'Matte white, AMG grille.' }), dur: 2.0 },
      { html: reelPhoto({ ...P.amgGle, kicker: '03', head: 'AMG GLE', sub: 'The SUV that turns heads.' }), dur: 2.0 },
      { clip: 'matte-amg-walkaround.mp4', start: 13, html: clipOverlay({ kicker: '04', head: 'AMG GLC Coupé', sub: 'Matte black. Enough said.' }), dur: 3.0 },
      { html: reelEnd({ kicker: 'Mercedes-AMG · Pink Bow October', head: 'Comment your <em>AMG.</em>', sub: 'I’ll send you specs and availability.', action: ['Comment 1–4', HANDLE] }), dur: 2.8, still: true },
    ],
  },
  {
    name: '06-this-or-that-suv',
    scenes: [
      { html: reelType({ kicker: 'Mercedes-Benz SUVs', head: 'This or that?', sub: 'Comment your picks. Round by round. 👇' }), dur: 2.2, still: true },
      { html: reelPhoto({ ...P.gls, kicker: 'Round 1 · This', head: 'GLS', sub: 'Seven seats, flagship presence.', big: 200 }), dur: 1.8 },
      { html: reelPhoto({ ...P.glb, kicker: 'Round 1 · Or that', head: 'GLB', sub: 'Compact, easy to park.', big: 200 }), dur: 1.8 },
      { html: reelPhoto({ ...P.gle, kicker: 'Round 2 · This', head: 'GLE', sub: 'Star grille, gloss black.', big: 200 }), dur: 1.8 },
      { html: reelPhoto({ ...P.amgGle, kicker: 'Round 2 · Or that', head: 'AMG GLE', sub: 'Panamericana grille. More everything.', big: 200 }), dur: 1.8 },
      { html: reelEnd({ kicker: 'Pink Bow October', head: 'Drop your <em>picks.</em>', sub: 'Comment like “GLS + AMG GLE” and I’ll DM you both.', action: ['Ask for MK', HANDLE] }), dur: 2.8, still: true },
    ],
  },
  {
    name: '07-cabriolet-interior-check',
    scenes: [
      { clip: 'cabriolet-walkaround.mp4', start: 10, html: clipOverlay({ kicker: 'Mercedes-Benz CLE Cabriolet', head: 'Top-down<br><em>check.</em>' }), dur: 3.2 },
      { clip: 'cabriolet-walkaround.mp4', start: 15.5, html: clipOverlay({ kicker: 'Interior', head: 'Cognac <em>leather.</em>', sub: 'Long Island fall, sorted.' }), dur: 4.0 },
      { html: reelEnd({ kicker: 'CLE Cabriolet · Pink Bow October', head: 'Sit in it <em>this week.</em>', sub: 'DM me and I’ll have it pulled up front.', action: ['DM “CABRIO”', HANDLE] }), dur: 2.8, still: true },
    ],
  },
];

// ── Render ─────────────────────────────────────────────────────────────────────
const XFADE = 0.35;
const enc = ['-c:v', 'libx264', '-crf', '23', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-r', '30'];

/** Turn one scene into a 1080×1920 mp4 segment. */
async function scene(page, s, file) {
  const png = file.replace(/\.mp4$/, '.png');
  if (s.clip) {
    await render(page, s.html, 1080, 1920, png, true);
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', String(s.start), '-t', String(s.dur), '-i', path.join(MEDIA, s.clip), '-i', png,
      '-filter_complex', '[0:v]eq=contrast=1.07:saturation=1.15:brightness=0.01,unsharp=5:5:0.6[g];[g][1:v]overlay,setsar=1[v]',
      '-map', '[v]', '-an', ...enc, file]);
    return;
  }
  await render(page, s.html, 1080, 1920, png);
  const frames = Math.round(s.dur * 30);
  // Upscale before zoompan so the slow push-in doesn't jitter.
  const motion = s.still
    ? 'scale=1080:1920'
    : `scale=2160:3840,zoompan=z='1+0.07*on/${frames}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1080x1920:fps=30`;
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-loop', '1', '-framerate', '30', '-t', String(s.dur), '-i', png,
    '-vf', `${motion},setsar=1`, '-frames:v', String(frames), ...enc, file]);
}

const browser = await chromium.launch();
const page = await browser.newPage();

const feedDir = dir('vol2/feed'), grilleDir = dir('vol2/carousel-grille'), leaseDir = dir('vol2/carousel-lease'),
      storiesDir = dir('vol2/stories'), reelsDir = dir('vol2/reels');
for (const [name, html] of FEED) await render(page, html, 1080, 1350, path.join(feedDir, `${name}.png`));
for (const [name, html] of CAROUSEL_GRILLE) await render(page, html, 1080, 1350, path.join(grilleDir, `${name}.png`));
for (const [name, html] of CAROUSEL_LEASE) await render(page, html, 1080, 1350, path.join(leaseDir, `${name}.png`));
for (const [name, html] of STORIES) await render(page, html, 1080, 1920, path.join(storiesDir, `${name}.png`));

for (const r of REELS) {
  const segs = [];
  for (const [i, s] of r.scenes.entries()) {
    const seg = path.join(work, `${r.name}-${i}.mp4`);
    await scene(page, s, seg);
    segs.push(seg);
  }
  // Cross-fade the segments into one reel.
  let chain = '', prev = '[0:v]', offset = 0;
  r.scenes.slice(0, -1).forEach((s, i) => {
    offset += s.dur - XFADE;
    const out = i === r.scenes.length - 2 ? '[v]' : `[x${i}]`;
    chain += `${prev}[${i + 1}:v]xfade=transition=fade:duration=${XFADE}:offset=${offset.toFixed(3)}${out};`;
    prev = out;
  });
  const out = path.join(reelsDir, `${r.name}.mp4`);
  execFileSync('ffmpeg', ['-v', 'error', '-y', ...segs.flatMap(s => ['-i', s]),
    '-filter_complex', chain.slice(0, -1), '-map', '[v]', ...enc, '-movflags', '+faststart', out]);
  console.log('  ✓', path.relative(ROOT, out));
}

await browser.close();
cleanup();
