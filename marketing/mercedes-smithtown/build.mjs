#!/usr/bin/env node
/**
 * MK × Mercedes-Benz of Smithtown — Instagram / TikTok kit.
 *
 * Renders the feed posts (1080×1350), carousel slides (1080×1350),
 * stories (1080×1920) and TikTok overlays from the showroom photos in
 * ./media, then burns the overlays onto the walkaround clips with ffmpeg.
 *
 * Brand matches mkparrish.com: void/obsidian black, pearl white, smoke grey,
 * petal pink; Bebas Neue / Playfair Display / DM Sans.
 *
 * Output: output/mercedes-smithtown/{feed,carousel,stories,tiktok}/
 * Run:    node marketing/mercedes-smithtown/build.mjs
 */
import { chromium } from 'playwright';
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const HERE  = path.dirname(fileURLToPath(import.meta.url));
const ROOT  = path.join(HERE, '..', '..');
const MEDIA = path.join(HERE, 'media');
const OUT   = path.join(ROOT, 'output', 'mercedes-smithtown');
const FONTS = fs.readFileSync(path.join(ROOT, 'scripts', 'assets', 'fonts-embedded.css'), 'utf8');

// ── Brand ──────────────────────────────────────────────────────────────────────
const VOID  = '#080808';
const PEARL = '#F0F0EE';
const SMOKE = '#B0B0B0';
const ASH   = '#7A7A7A';
const PETAL = '#FFB5D0';
const ROSE  = '#F58CAD';

const HANDLE = '@mk_parrish';
const STORE  = 'Mercedes-Benz of Smithtown';

// Inline as data URIs: Chromium won't load file:// images into a setContent() page.
const dataUri = file => `data:image/jpeg;base64,${fs.readFileSync(file).toString('base64')}`;
const img = name => dataUri(path.join(MEDIA, name));

const ribbon = (size, color = PETAL) => `
  <svg width="${size * 0.66}" height="${size}" viewBox="0 0 40 60" aria-hidden="true">
    <path fill="${color}" d="M20 3c-6.5 0-10 4.6-10 10.4 0 5.6 3.6 11.4 7.6 17.3L6 54.5l7.4 2.5 6.6-15.2 6.6 15.2 7.4-2.5-11.6-23.8c4-5.9 7.6-11.7 7.6-17.3C30 7.6 26.5 3 20 3zm0 5.6c2.7 0 4.2 2 4.2 4.9 0 3-1.8 6.7-4.2 10.3-2.4-3.6-4.2-7.3-4.2-10.3 0-2.9 1.5-4.9 4.2-4.9z"/>
  </svg>`;

const BASE_CSS = `
  ${FONTS}
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { background: transparent; }
  .frame { position: relative; overflow: hidden; background: ${VOID}; color: ${PEARL};
           font-family: 'DM Sans', sans-serif; }
  .photo { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .shade { position: absolute; inset: 0; }
  .kicker { display: flex; align-items: center; gap: 14px; font-weight: 500; font-size: 22px;
            letter-spacing: .28em; text-transform: uppercase; color: ${PETAL}; }
  .head { font-family: 'Bebas Neue', sans-serif; line-height: .88; letter-spacing: .01em; color: ${PEARL}; }
  .head em { font-style: normal; color: ${PETAL}; }
  .sub { font-family: 'Playfair Display', serif; font-style: italic; line-height: 1.3; color: ${PEARL}; }
  .rule { height: 2px; width: 84px; background: ${PETAL}; }
  .sig { position: absolute; left: 72px; right: 72px; display: flex; justify-content: space-between;
         align-items: baseline; font-size: 21px; letter-spacing: .14em; text-transform: uppercase; color: ${SMOKE}; }
  .sig b { font-family: 'Bebas Neue', sans-serif; font-weight: 400; font-size: 34px; letter-spacing: .08em; color: ${PEARL}; margin-right: 12px; }
  .sig .handle { color: ${PETAL}; letter-spacing: .08em; text-transform: none; font-size: 24px; }
`;

const sig = bottom => `
  <div class="sig" style="bottom:${bottom}px">
    <span><b>MK PARRISH</b>${STORE}</span><span class="handle">${HANDLE}</span>
  </div>`;

// ── Templates ──────────────────────────────────────────────────────────────────

/** Full-bleed photo, dark fade at the bottom, copy stacked over it. */
function hero({ w = 1080, h = 1350, photo, pos = 'center', kicker, head, headSize = 150, sub, fine, sigBottom = 60, textBottom = 150 }) {
  return `<div class="frame" style="width:${w}px;height:${h}px">
    <img class="photo" src="${img(photo)}" style="object-position:${pos}">
    <div class="shade" style="background:linear-gradient(180deg, rgba(8,8,8,.35) 0%, rgba(8,8,8,0) 22%, rgba(8,8,8,0) 42%, rgba(8,8,8,.88) 72%, rgba(8,8,8,.97) 100%)"></div>
    <div style="position:absolute;left:72px;right:72px;bottom:${textBottom}px;display:flex;flex-direction:column;gap:26px">
      ${kicker ? `<div class="kicker">${ribbon(34)}${kicker}</div>` : ''}
      <div class="head" style="font-size:${headSize}px">${head}</div>
      ${sub ? `<div class="sub" style="font-size:38px;max-width:880px">${sub}</div>` : ''}
      ${fine ? `<div style="font-size:21px;letter-spacing:.06em;color:${SMOKE};max-width:860px;line-height:1.45">${fine}</div>` : ''}
    </div>
    ${sig(sigBottom)}
  </div>`;
}

/** Photo on top, petal-pink panel underneath with black copy. */
function pinkPanel({ w = 1080, h = 1350, photo, pos = 'center', split = 0.58, kicker, head, sub, fine }) {
  const ph = Math.round(h * split);
  return `<div class="frame" style="width:${w}px;height:${h}px;background:${PETAL}">
    <img class="photo" src="${img(photo)}" style="height:${ph}px;object-position:${pos}">
    <div style="position:absolute;top:${ph}px;left:0;right:0;bottom:0;padding:56px 72px;display:flex;flex-direction:column;gap:22px;color:${VOID}">
      <div class="kicker" style="color:${VOID}">${ribbon(32, VOID)}${kicker}</div>
      <div class="head" style="font-size:118px;color:${VOID}">${head}</div>
      <div class="sub" style="font-size:34px;color:${VOID}">${sub}</div>
      <div style="margin-top:auto;display:flex;justify-content:space-between;align-items:baseline;font-size:20px;letter-spacing:.14em;text-transform:uppercase">
        <span>${fine}</span><span style="text-transform:none;letter-spacing:.06em;font-size:23px">${HANDLE}</span>
      </div>
    </div>
  </div>`;
}

/** MK intro: B&W portrait left, black copy column right. */
function intro() {
  return `<div class="frame" style="width:1080px;height:1350px">
    <img class="photo" src="${dataUri(path.join(ROOT, 'public', 'author', 'mk-parrish-photo.jpg'))}"
         style="width:520px;filter:grayscale(1) contrast(1.05);object-position:center 20%">
    <div class="shade" style="left:400px;background:linear-gradient(90deg, rgba(8,8,8,0) 0%, ${VOID} 120px)"></div>
    <div style="position:absolute;left:560px;right:64px;top:150px;bottom:90px;display:flex;flex-direction:column;gap:30px">
      <div class="kicker">${ribbon(32)}Smithtown, NY</div>
      <div class="head" style="font-size:132px">Hi, I'm<br><em>MK.</em></div>
      <div class="rule"></div>
      <div class="sub" style="font-size:36px">I sell Mercedes-Benz — and I'd love to hand you the keys to yours.</div>
      <div style="font-size:23px;line-height:1.6;color:${SMOKE}">New &amp; pre-owned · AMG · SUVs<br>Lease-end &amp; trade questions welcome</div>
      <div style="margin-top:auto;font-family:'Bebas Neue';font-size:40px;letter-spacing:.06em;color:${PETAL}">DM ME · ASK FOR MK</div>
      <div style="font-size:21px;letter-spacing:.14em;text-transform:uppercase;color:${SMOKE}">${STORE}<br><span style="color:${PETAL};text-transform:none;letter-spacing:.08em;font-size:24px">${HANDLE}</span></div>
    </div>
  </div>`;
}

/** Carousel slide: full photo, numbered tag, short label. */
function slide({ photo, pos = 'center', zoom = 1, n, of, label, note }) {
  return `<div class="frame" style="width:1080px;height:1350px">
    <img class="photo" src="${img(photo)}" style="object-position:${pos};transform:scale(${zoom});transform-origin:center top">
    <div class="shade" style="background:linear-gradient(180deg, rgba(8,8,8,.55) 0%, rgba(8,8,8,0) 20%, rgba(8,8,8,0) 66%, rgba(8,8,8,.92) 100%)"></div>
    <div class="kicker" style="position:absolute;top:64px;left:72px">${ribbon(30)}Pick your bow · ${String(n).padStart(2, '0')}/${String(of).padStart(2, '0')}</div>
    <div style="position:absolute;left:72px;right:72px;bottom:130px;display:flex;align-items:flex-end;gap:30px">
      <div class="head" style="font-size:210px;color:${PETAL};line-height:.8">${String(n).padStart(2, '0')}</div>
      <div style="padding-bottom:12px">
        <div class="head" style="font-size:72px">${label}</div>
        <div class="sub" style="font-size:30px;color:${SMOKE}">${note}</div>
      </div>
    </div>
    ${sig(56)}
  </div>`;
}

/** Solid black end card / CTA. */
function endCard({ w = 1080, h = 1350, kicker, head, sub, cta, padY = 150 }) {
  return `<div class="frame" style="width:${w}px;height:${h}px;background:radial-gradient(ellipse at 50% 38%, #1d1418 0%, ${VOID} 62%)">
    <div style="position:absolute;inset:${padY}px 72px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:34px">
      ${ribbon(150)}
      <div class="kicker">${kicker}</div>
      <div class="head" style="font-size:150px">${head}</div>
      <div class="rule"></div>
      <div class="sub" style="font-size:38px;max-width:820px">${sub}</div>
      <div style="font-family:'Bebas Neue';font-size:46px;letter-spacing:.08em;color:${PETAL}">${cta}</div>
    </div>
    ${sig(padY === 150 ? 60 : 260)}
  </div>`;
}

/** Transparent TikTok overlay: hook at top, MK tag low in the safe zone. */
function tiktokOverlay({ hook, sub }) {
  return `<div style="width:1080px;height:1920px;position:relative;font-family:'DM Sans'">
    <div style="position:absolute;top:210px;left:60px;right:60px;text-align:center">
      <div style="display:inline-block;background:rgba(8,8,8,.78);padding:26px 40px 30px;border-bottom:4px solid ${PETAL}">
        <div class="head" style="font-size:112px">${hook}</div>
        <div class="sub" style="font-size:36px;margin-top:10px">${sub}</div>
      </div>
    </div>
  </div>`;
}
function tiktokTag() {
  return `<div style="width:1080px;height:1920px;position:relative;font-family:'DM Sans'">
    <div style="position:absolute;left:48px;bottom:470px;display:flex;align-items:center;gap:14px;background:rgba(8,8,8,.7);padding:14px 24px 14px 18px;border-left:4px solid ${PETAL}">
      ${ribbon(40)}
      <div><div style="font-family:'Bebas Neue';font-size:40px;letter-spacing:.06em;color:${PEARL};line-height:1">ASK FOR MK</div>
      <div style="font-size:19px;letter-spacing:.14em;text-transform:uppercase;color:${SMOKE}">${STORE}</div></div>
    </div>
  </div>`;
}

// ── The kit ────────────────────────────────────────────────────────────────────
const FEED = [
  ['01-think-pink', hero({
    photo: 'amg-gt-front-white.jpg', pos: 'center 62%',
    kicker: 'October · Breast Cancer Awareness Month',
    head: 'Think <em>pink.</em>',
    sub: 'Every bow on our showroom floor is pink this month — for the women fighting, and the ones who won.',
  })],
  ['02-book-the-screening', pinkPanel({
    photo: 'suv-black-front.jpg', pos: 'center 42%',
    kicker: 'A reminder from the showroom',
    head: 'Book the screening.',
    sub: 'Then book the test drive. In that order.',
    fine: 'Early detection saves lives',
  })],
  ['03-hi-im-mk', intro()],
  ['04-two-bows-one-decision', hero({
    photo: 'cle-black-pair.jpg', pos: '50% center',
    kicker: 'Coupé or cabriolet?',
    head: 'Two bows.<br>One <em>decision.</em>',
    sub: 'Come sit in both. I’ll have the keys ready.',
  })],
  ['05-room-for-everyone', hero({
    photo: 'gls-white-front.jpg', pos: 'center 60%',
    kicker: 'Wrapped &amp; ready',
    head: 'Room for<br><em>everyone.</em>',
    sub: 'Three rows, one pink bow, and a whole family’s next chapter.',
  })],
  ['06-black-white-pink', hero({
    photo: 'amg-suv-black-front.jpg', pos: 'center 60%',
    kicker: 'The only palette I trust',
    head: 'Black. White.<br><em>Pink.</em>',
    sub: 'Gloss black AMG, showroom white, and a bow that means something this month.',
  })],
  ['07-find-me-in-smithtown', hero({
    photo: 'suv-black-outdoor.jpg', pos: '78% center',
    kicker: 'Smithtown, Long Island',
    head: 'Find me in<br><em>Smithtown.</em>',
    sub: 'Fall drives hit different in a Benz. Come take one.',
  })],
];

const CAROUSEL_ITEMS = [
  { photo: 'sedan-silver-stars.jpg', pos: 'center 60%', label: 'Silver &amp; starry', note: 'That grille is all three-pointed stars.' },
  { photo: 'amg-matte-white-front.jpg', pos: 'center 60%', label: 'Matte white AMG', note: 'Satin finish. Zero subtlety.' },
  { photo: 'amg-suv-black-front.jpg', pos: 'center 62%', label: 'Gloss black AMG', note: 'The one that turns heads at the light.' },
  { photo: 'amg-white-profile-pair.jpg', pos: '30% center', label: 'White on white', note: 'Two AMGs, two bows, one lucky driveway.' },
  { photo: 'suv-silver-front.jpg', pos: 'center top', zoom: 1.5, label: 'Silver SUV', note: 'Room for the kids, the dog and the Costco run.' },
];
const CAROUSEL = [
  ['00-cover', hero({
    photo: 'sedan-silver-daylight.jpg', pos: 'center 55%',
    kicker: 'Swipe → comment your number',
    head: 'Pick your <em>bow.</em>',
    sub: 'Five cars on my floor right now. Which one’s going home with you?',
  })],
  ...CAROUSEL_ITEMS.map((s, i) => [`${String(i + 1).padStart(2, '0')}-slide`, slide({ ...s, n: i + 1, of: CAROUSEL_ITEMS.length })]),
  ['06-end', endCard({
    kicker: 'Mercedes-Benz of Smithtown',
    head: 'Which one’s <em>yours?</em>',
    sub: 'Comment the number and I’ll DM you the details — trim, color, payment options.',
    cta: 'Ask for MK',
  })],
];

const STORIES = [
  ['01-think-pink-story', hero({
    w: 1080, h: 1920, photo: 'sedan-silver-stars.jpg', pos: 'center 55%',
    kicker: 'Breast Cancer Awareness Month',
    head: 'Think <em>pink.</em>', headSize: 170,
    sub: 'Pink bows all October. Book your screening — then come see me.',
    textBottom: 420, sigBottom: 330,
  })],
  ['02-dm-me-story', endCard({
    w: 1080, h: 1920, padY: 330,
    kicker: 'Test drives this week',
    head: 'DM me <em>“pink.”</em>',
    sub: 'I’ll set up a test drive and have your bow waiting.',
    cta: 'MK · Mercedes-Benz of Smithtown',
  })],
];

const TIKTOK = [
  {
    name: '01-matte-black-amg', clip: 'matte-amg-walkaround.mp4',
    hook: 'Matte black <em>AMG.</em>', sub: 'Walk it with me.',
    end: { kicker: 'Mercedes-Benz of Smithtown', head: 'Want the <em>keys?</em>', sub: 'Comment “matte” and I’ll send you the details.', cta: 'Ask for MK' },
  },
  {
    name: '02-top-down-season', clip: 'cabriolet-walkaround.mp4',
    hook: 'Top-down season<br><em>isn’t over.</em>', sub: 'Cognac leather. Black paint. Long Island fall.',
    end: { kicker: 'Mercedes-Benz of Smithtown', head: 'Sit in it <em>this week.</em>', sub: 'DM me and I’ll have it pulled up front.', cta: 'Ask for MK' },
  },
];

// ── Render ─────────────────────────────────────────────────────────────────────
async function render(page, html, w, h, file, transparent = false) {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${BASE_CSS}</style></head><body>${html}</body></html>`, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: file, omitBackground: transparent, clip: { x: 0, y: 0, width: w, height: h } });
  console.log('  ✓', path.relative(ROOT, file));
}

const dir = d => { const p = path.join(OUT, d); fs.mkdirSync(p, { recursive: true }); return p; };

const browser = await chromium.launch();
const page = await browser.newPage();

for (const [name, html] of FEED) await render(page, html, 1080, 1350, path.join(dir('feed'), `${name}.png`));
for (const [name, html] of CAROUSEL) await render(page, html, 1080, 1350, path.join(dir('carousel'), `${name}.png`));
for (const [name, html] of STORIES) await render(page, html, 1080, 1920, path.join(dir('stories'), `${name}.png`));

const work = fs.mkdtempSync(path.join(OUT, '.work-'));
for (const t of TIKTOK) {
  const hookPng = path.join(work, `${t.name}-hook.png`);
  const tagPng = path.join(work, `${t.name}-tag.png`);
  const endPng = path.join(work, `${t.name}-end.png`);
  await render(page, tiktokOverlay(t), 1080, 1920, hookPng, true);
  await render(page, tiktokTag(), 1080, 1920, tagPng, true);
  await render(page, endCard({ w: 1080, h: 1920, padY: 330, ...t.end }), 1080, 1920, endPng);

  // Clip with hook for the first 3.5s and the MK tag after it, then a 3s end card.
  const out = path.join(dir('tiktok'), `${t.name}.mp4`);
  execFileSync('ffmpeg', [
    '-v', 'error', '-y',
    '-i', path.join(MEDIA, t.clip), '-i', hookPng, '-i', tagPng,
    '-loop', '1', '-t', '3', '-framerate', '30', '-i', endPng,
    '-filter_complex',
    '[0:v][1:v]overlay=enable=\'lt(t,3.5)\'[a];[a][2:v]overlay=enable=\'gte(t,3.5)\',fps=30,format=yuv420p,setsar=1[clip];' +
    '[3:v]fps=30,format=yuv420p,setsar=1[end];[clip][end]concat=n=2:v=1:a=0[v]',
    '-map', '[v]', '-c:v', 'libx264', '-crf', '24', '-preset', 'medium', '-movflags', '+faststart', out,
  ]);
  console.log('  ✓', path.relative(ROOT, out));
}
fs.rmSync(work, { recursive: true, force: true });

await browser.close();
