#!/usr/bin/env node
/**
 * MK (@mkeezieee) × Mercedes-Benz of Smithtown — Instagram / Facebook / TikTok kit.
 *
 * Pink Bow October: every car on the floor wears a pink bow for Breast Cancer
 * Awareness Month, so every post ties its bow back to the cause, names the
 * Mercedes-Benz model, and ends on a clear call to action.
 *
 * Renders the feed posts (1080×1350, Instagram + Facebook), carousel slides
 * (1080×1350), stories (1080×1920, IG/FB stories) and Reels/TikTok overlays
 * from the showroom photos in ./media. Photos and clips get a light retouch
 * (contrast, colour, sharpening) before the overlays go on.
 *
 * Brand matches mkparrish.com: void/obsidian black, pearl white, smoke grey,
 * petal pink; Bebas Neue / Playfair Display / DM Sans.
 *
 * Output: output/mercedes-smithtown/{feed,carousel,stories,tiktok}/
 * Run:    node marketing/mercedes-smithtown/build.mjs
 */
import { chromium } from 'playwright';
import { execFileSync } from 'child_process';
import path from 'path';
import {
  ROOT, MEDIA, HANDLE, work, endCard, hero, intro, pinkPanel, slide,
  tiktokOverlay, tiktokTag, render, dir, cleanup,
} from './lib.mjs';

// ── The kit ────────────────────────────────────────────────────────────────────
const FEED = [
  ['01-think-pink', hero({
    photo: 'amg-gt-front-white.jpg', pos: 'center 62%',
    model: 'Mercedes-AMG GT 4-Door Coupé',
    head: 'Think <em>pink.</em>',
    sub: 'Every Mercedes-Benz on our floor wears a pink bow this October — for every fighter, every survivor, and everyone we carry with us.',
    action: ['Tag a survivor', '& share the pink'],
  })],
  ['02-book-the-screening', pinkPanel({
    photo: 'suv-black-front.jpg', pos: 'center 42%',
    model: 'Mercedes-Benz GLE · Pink Bow October',
    head: 'Book the screening.',
    sub: 'Then book the test drive. In that order.',
    action: ['DM “PINK”', HANDLE],
  })],
  ['03-hi-im-mk', intro()],
  ['04-cle-coupe-or-cabriolet', pinkPanel({
    dark: true, split: 0.58,
    photo: 'cle-black-pair.jpg', pos: '50% 62%',
    model: 'Mercedes-Benz CLE Coupé &amp; Cabriolet',
    head: 'Two bows. One <em>decision.</em>',
    sub: 'Coupé or Cabriolet? Two pink bows, two very different weekends.',
    action: ['Comment COUPÉ or CABRIO', ''],
  })],
  ['05-gls-room-for-everyone', hero({
    photo: 'gls-white-front.jpg', pos: 'center 60%',
    model: 'Mercedes-Benz GLS · 7 seats',
    head: 'Room for<br><em>everyone.</em>',
    sub: 'Seven seats and a pink bow — for the moms, sisters and best friends who carry everyone.',
    action: ['DM “GLS”', 'to book a test drive'],
  })],
  ['06-amg-black-white-pink', hero({
    photo: 'amg-suv-black-front.jpg', pos: 'center 60%',
    model: 'Mercedes-AMG GLE',
    head: 'Black. White.<br><em>Pink.</em>',
    sub: 'AMG Panamericana grille, gloss black paint, and a pink bow that means something this month.',
    action: ['DM “AMG”', HANDLE],
  })],
  ['07-find-me-in-smithtown', hero({
    photo: 'suv-black-outdoor.jpg', pos: '78% center',
    model: 'Mercedes-Benz GLE · St. James, NY',
    head: 'Find me in<br><em>Smithtown.</em>',
    sub: '630 Middle Country Rd, St. James. Fall drives hit different in a Mercedes-Benz.',
    action: ['Ask for MK', 'test drives all week'],
  })],
];

const CAROUSEL_ITEMS = [
  { photo: 'sedan-silver-stars.jpg', pos: 'center 60%', label: 'The all-new CLA', note: 'A star-pattern grille — and a pink bow on top.' },
  { photo: 'amg-matte-white-front.jpg', pos: 'center 60%', label: 'AMG E-Class · matte', note: 'Satin white, AMG grille, zero subtlety.' },
  { photo: 'amg-suv-black-front.jpg', pos: 'center 62%', label: 'Mercedes-AMG GLE', note: 'The one that turns heads at every light.' },
  { photo: 'amg-white-profile-pair.jpg', pos: '30% center', label: 'AMG GT 4-Door Coupé', note: 'Four doors. Still an AMG GT.' },
  { photo: 'suv-silver-front.jpg', pos: 'center top', zoom: 1.5, label: 'Mercedes-Benz GLB', note: 'Room for the kids, the dog and the Costco run.' },
];
const CAROUSEL = [
  ['00-cover', hero({
    photo: 'sedan-silver-daylight.jpg', pos: 'center 55%',
    model: 'Swipe → comment your number',
    head: 'Pick your <em>bow.</em>',
    sub: 'Five Mercedes-Benz models, five pink bows. Which one’s going home with you?',
    action: ['Comment 1–5', 'I’ll DM you details'],
  })],
  ...CAROUSEL_ITEMS.map((s, i) => [`${String(i + 1).padStart(2, '0')}-slide`, slide({ ...s, n: i + 1, of: CAROUSEL_ITEMS.length })]),
  ['06-end', endCard({
    kicker: 'Pink Bow October',
    head: 'Which one’s <em>yours?</em>',
    sub: 'Comment the number and I’ll DM you trim, color and payment options. Every pink bow is a reminder: book your screening.',
    action: ['DM “PINK”', HANDLE],
  })],
];

const STORIES = [
  ['01-think-pink-story', hero({
    w: 1080, h: 1920, photo: 'sedan-silver-stars.jpg', pos: 'center 55%',
    model: 'The all-new Mercedes-Benz CLA',
    head: 'Think <em>pink.</em>', headSize: 170,
    sub: 'Pink bows all October at Mercedes-Benz of Smithtown. Book your screening — then come see me.',
    action: ['DM “PINK”', HANDLE],
    top: 230, textBottom: 400, sigBottom: 320,
  })],
  ['02-dm-me-story', endCard({
    w: 1080, h: 1920, padY: 300, sigBottom: 260,
    kicker: 'Test drives this week',
    head: 'DM me <em>“pink.”</em>',
    sub: 'Pick your Mercedes-Benz and I’ll have your pink bow waiting.',
    action: ['Ask for MK', HANDLE],
  })],
];

const TIKTOK = [
  {
    name: '01-matte-black-amg-glc-coupe', clip: 'matte-amg-walkaround.mp4',
    model: 'Mercedes-AMG GLC Coupé', hook: 'Matte black <em>AMG.</em>', sub: 'Walk it with me.',
    action: ['Comment “MATTE”', 'for details'],
    end: { kicker: 'Mercedes-AMG · Pink Bow October', head: 'Want the <em>keys?</em>', sub: 'Comment “MATTE” and I’ll send you the details.', action: ['Ask for MK', HANDLE] },
  },
  {
    name: '02-cle-cabriolet-top-down', clip: 'cabriolet-walkaround.mp4',
    model: 'Mercedes-Benz CLE Cabriolet', hook: 'Top-down season<br><em>isn’t over.</em>', sub: 'Cognac leather. Black paint. Long Island fall.',
    action: ['DM “CABRIO”', 'to sit in it'],
    end: { kicker: 'CLE Cabriolet · Pink Bow October', head: 'Sit in it <em>this week.</em>', sub: 'DM me and I’ll have it pulled up front.', action: ['DM “CABRIO”', HANDLE] },
  },
];

// ── Render ─────────────────────────────────────────────────────────────────────

const browser = await chromium.launch();
const page = await browser.newPage();

const feedDir = dir('feed'), carouselDir = dir('carousel'), storiesDir = dir('stories'), tiktokDir = dir('tiktok');
for (const [name, html] of FEED) await render(page, html, 1080, 1350, path.join(feedDir, `${name}.png`));
for (const [name, html] of CAROUSEL) await render(page, html, 1080, 1350, path.join(carouselDir, `${name}.png`));
for (const [name, html] of STORIES) await render(page, html, 1080, 1920, path.join(storiesDir, `${name}.png`));

for (const t of TIKTOK) {
  const hookPng = path.join(work, `${t.name}-hook.png`);
  const tagPng = path.join(work, `${t.name}-tag.png`);
  const endPng = path.join(work, `${t.name}-end.png`);
  await render(page, tiktokOverlay(t), 1080, 1920, hookPng, true);
  await render(page, tiktokTag(t.action), 1080, 1920, tagPng, true);
  await render(page, endCard({ w: 1080, h: 1920, padY: 300, sigBottom: 260, ...t.end }), 1080, 1920, endPng);

  // Retouched clip with the hook for the first 3.5s and the MK tag after it, then a 3s end card.
  const out = path.join(tiktokDir, `${t.name}.mp4`);
  execFileSync('ffmpeg', [
    '-v', 'error', '-y',
    '-i', path.join(MEDIA, t.clip), '-i', hookPng, '-i', tagPng,
    '-loop', '1', '-t', '3', '-framerate', '30', '-i', endPng,
    '-filter_complex',
    '[0:v]eq=contrast=1.07:saturation=1.15:brightness=0.01,unsharp=5:5:0.6[g];' +
    '[g][1:v]overlay=enable=\'lt(t,3.5)\'[a];[a][2:v]overlay=enable=\'gte(t,3.5)\',fps=30,format=yuv420p,setsar=1[clip];' +
    '[3:v]fps=30,format=yuv420p,setsar=1[end];[clip][end]concat=n=2:v=1:a=0[v]',
    '-map', '[v]', '-c:v', 'libx264', '-crf', '24', '-preset', 'medium', '-movflags', '+faststart', out,
  ]);
  console.log('  ✓', path.relative(ROOT, out));
}

await browser.close();
cleanup();
