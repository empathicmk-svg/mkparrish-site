/**
 * Shared brand, retouch and templates for the MK × Mercedes-Benz of Smithtown
 * social kits (build.mjs, build-vol2.mjs).
 */
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
const PETAL = '#FFB5D0';

const HANDLE = '@mk_parrish';
const STORE  = 'Mercedes-Benz of Smithtown';
const GROUP  = 'Competition Automotive Group';

fs.mkdirSync(OUT, { recursive: true });
const work = fs.mkdtempSync(path.join(OUT, '.work-'));

// ── Retouch ────────────────────────────────────────────────────────────────────
// Lifts colour and contrast and sharpens the paint and chrome without changing
// the scene. Cached per run in the work dir.
const enhanced = new Map();
function enhance(name) {
  if (!enhanced.has(name)) {
    const out = path.join(work, `enh-${name}`);
    execFileSync('convert', [
      path.join(MEDIA, name),
      '-modulate', '103,114,100',
      '-sigmoidal-contrast', '2.6x50%',
      '-unsharp', '0x1.2+0.7+0.02',
      '-quality', '92', out,
    ]);
    enhanced.set(name, out);
  }
  return enhanced.get(name);
}

// Inline as data URIs: Chromium won't load file:// images into a setContent() page.
const dataUri = file => `data:image/jpeg;base64,${fs.readFileSync(file).toString('base64')}`;
const img = name => dataUri(enhance(name));

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
  .vignette { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 42%, rgba(8,8,8,0) 55%, rgba(8,8,8,.45) 100%); }
  .kicker { display: flex; align-items: center; gap: 14px; font-weight: 500; font-size: 22px;
            letter-spacing: .26em; text-transform: uppercase; color: ${PETAL}; }
  .head { font-family: 'Bebas Neue', sans-serif; line-height: .88; letter-spacing: .01em; color: ${PEARL}; }
  .head em { font-style: normal; color: ${PETAL}; }
  .sub { font-family: 'Playfair Display', serif; font-style: italic; line-height: 1.3; color: ${PEARL}; }
  .rule { height: 2px; width: 84px; background: ${PETAL}; }
  .cta { align-self: flex-start; display: inline-flex; align-items: center; gap: 14px; background: ${PETAL}; color: ${VOID};
         font-family: 'Bebas Neue', sans-serif; font-size: 38px; letter-spacing: .06em; padding: 12px 26px 8px; border-radius: 999px; }
  .cta span { font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 22px; letter-spacing: .04em; }
  .topbar { position: absolute; top: 56px; left: 72px; right: 72px; display: flex; justify-content: space-between; align-items: center;
            font-size: 19px; font-weight: 500; letter-spacing: .26em; text-transform: uppercase; color: ${PEARL}; }
  .topbar .pill { display: flex; align-items: center; gap: 10px; color: ${PETAL}; background: rgba(8,8,8,.55);
                  border: 1px solid rgba(255,181,208,.55); padding: 8px 16px 8px 12px; border-radius: 999px; }
  .sig { position: absolute; left: 72px; right: 72px; display: flex; justify-content: space-between;
         align-items: baseline; font-size: 18px; letter-spacing: .16em; text-transform: uppercase; color: ${SMOKE}; }
  .sig b { font-family: 'Bebas Neue', sans-serif; font-weight: 400; font-size: 34px; letter-spacing: .08em; color: ${PEARL}; margin-right: 10px; }
  .sig .handle { color: ${PETAL}; font-size: 24px; letter-spacing: .06em; text-transform: none; }
`;

const topbar = (top = 56) => `
  <div class="topbar" style="top:${top}px">
    <span style="text-shadow:0 1px 8px rgba(0,0,0,.6)">${STORE}</span>
    <span class="pill">${ribbon(24)}Pink Bow October</span>
  </div>`;

const sig = bottom => `
  <div class="sig" style="bottom:${bottom}px">
    <span><b>MK</b><span class="handle">${HANDLE}</span></span><span>${GROUP}</span>
  </div>`;

const cta = (big, small = '') => `<div class="cta">${big}${small ? `<span>${small}</span>` : ''}</div>`;

// ── Templates ──────────────────────────────────────────────────────────────────

/** Full-bleed photo, dark fade at the bottom, model + copy + CTA over it. */
function hero({ w = 1080, h = 1350, photo, pos = 'center', model, head, headSize = 140, sub, action, sigBottom = 56, textBottom = 120, top = 56 }) {
  return `<div class="frame" style="width:${w}px;height:${h}px">
    <img class="photo" src="${img(photo)}" style="object-position:${pos}">
    <div class="vignette"></div>
    <div class="shade" style="background:linear-gradient(180deg, rgba(8,8,8,.5) 0%, rgba(8,8,8,0) 16%, rgba(8,8,8,0) 42%, rgba(8,8,8,.86) 68%, rgba(8,8,8,.97) 100%)"></div>
    ${topbar(top)}
    <div style="position:absolute;left:72px;right:72px;bottom:${textBottom}px;display:flex;flex-direction:column;gap:22px">
      <div class="kicker">${model}</div>
      <div class="head" style="font-size:${headSize}px">${head}</div>
      ${sub ? `<div class="sub" style="font-size:34px;max-width:900px">${sub}</div>` : ''}
      ${action ? cta(...action) : ''}
    </div>
    ${sig(sigBottom)}
  </div>`;
}

/** Photo on top, petal-pink panel underneath with black copy. */
function pinkPanel({ w = 1080, h = 1350, photo, pos = 'center', split = 0.56, model, head, sub, action, dark = false }) {
  const ph = Math.round(h * split);
  const bg = dark ? VOID : PETAL, fg = dark ? PEARL : VOID, accent = dark ? PETAL : VOID;
  return `<div class="frame" style="width:${w}px;height:${h}px;background:${bg}">
    <img class="photo" src="${img(photo)}" style="height:${ph}px;object-position:${pos}">
    <div class="shade" style="height:${ph}px;background:linear-gradient(180deg, rgba(8,8,8,.5) 0%, rgba(8,8,8,0) 22%)"></div>
    ${topbar()}
    <div style="position:absolute;top:${ph}px;left:0;right:0;bottom:0;padding:50px 72px 48px;display:flex;flex-direction:column;gap:20px;color:${fg}">
      <div class="kicker" style="color:${accent}">${ribbon(30, accent)}${model}</div>
      <div class="head" style="font-size:112px;color:${fg}">${head}</div>
      <div class="sub" style="font-size:32px;color:${fg}">${sub}</div>
      <div style="margin-top:auto;display:flex;justify-content:space-between;align-items:center">
        <div class="cta" style="background:${dark ? PETAL : VOID};color:${dark ? VOID : PETAL}">${action[0]}<span style="color:${dark ? VOID : PEARL}">${action[1]}</span></div>
        <span style="color:${dark ? SMOKE : VOID};font-size:17px;letter-spacing:.16em;text-transform:uppercase">${GROUP}</span>
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
    <div style="position:absolute;left:560px;right:64px;top:120px;bottom:80px;display:flex;flex-direction:column;gap:28px">
      <div class="kicker">${ribbon(32)}Pink Bow October</div>
      <div class="head" style="font-size:128px">Hi, I'm<br><em>MK.</em></div>
      <div class="rule"></div>
      <div class="sub" style="font-size:34px">Your Mercedes-Benz specialist at ${STORE}.</div>
      <div style="font-size:22px;line-height:1.7;color:${SMOKE}">New &amp; Certified Pre-Owned<br>AMG · SUVs · Coupés &amp; Cabriolets<br>Lease-end &amp; trade-in questions</div>
      <div style="margin-top:auto">${cta('DM me', HANDLE)}</div>
      <div style="font-size:18px;letter-spacing:.16em;text-transform:uppercase;color:${SMOKE};line-height:1.6">${STORE}<br>${GROUP}</div>
    </div>
  </div>`;
}

/** Carousel slide: full photo, numbered tag, model + one line. */
function slide({ photo, pos = 'center', zoom = 1, n, of, label, note }) {
  return `<div class="frame" style="width:1080px;height:1350px">
    <img class="photo" src="${img(photo)}" style="object-position:${pos};transform:scale(${zoom});transform-origin:center top">
    <div class="vignette"></div>
    <div class="shade" style="background:linear-gradient(180deg, rgba(8,8,8,.55) 0%, rgba(8,8,8,0) 18%, rgba(8,8,8,0) 62%, rgba(8,8,8,.93) 100%)"></div>
    <div class="topbar"><span>Pick your bow · ${String(n).padStart(2, '0')}/${String(of).padStart(2, '0')}</span><span class="pill">${ribbon(24)}Pink Bow October</span></div>
    <div style="position:absolute;left:72px;right:72px;bottom:130px;display:flex;align-items:flex-end;gap:30px">
      <div class="head" style="font-size:210px;color:${PETAL};line-height:.8">${String(n).padStart(2, '0')}</div>
      <div style="padding-bottom:12px">
        <div class="kicker" style="font-size:19px;margin-bottom:8px">Mercedes-Benz</div>
        <div class="head" style="font-size:72px">${label}</div>
        <div class="sub" style="font-size:29px;color:${SMOKE}">${note}</div>
      </div>
    </div>
    ${sig(56)}
  </div>`;
}

/** Solid black end card / CTA. */
function endCard({ w = 1080, h = 1350, kicker, head, sub, action, padY = 150, sigBottom = 56 }) {
  return `<div class="frame" style="width:${w}px;height:${h}px;background:radial-gradient(ellipse at 50% 38%, #24161c 0%, ${VOID} 62%)">
    <div style="position:absolute;inset:${padY}px 72px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:32px">
      ${ribbon(150)}
      <div class="kicker">${kicker}</div>
      <div class="head" style="font-size:146px">${head}</div>
      <div class="rule"></div>
      <div class="sub" style="font-size:36px;max-width:840px">${sub}</div>
      <div class="cta" style="align-self:center">${action[0]}<span>${action[1]}</span></div>
      <div style="font-size:19px;letter-spacing:.18em;text-transform:uppercase;color:${SMOKE};line-height:1.7">${STORE}<br>630 Middle Country Rd · St. James, NY</div>
    </div>
    ${sig(sigBottom)}
  </div>`;
}

/** Transparent Reels/TikTok overlay: hook at top. */
function tiktokOverlay({ model, hook, sub }) {
  return `<div style="width:1080px;height:1920px;position:relative;font-family:'DM Sans'">
    <div style="position:absolute;top:200px;left:60px;right:60px;text-align:center">
      <div style="display:inline-block;background:rgba(8,8,8,.8);padding:24px 40px 30px;border-bottom:4px solid ${PETAL}">
        <div class="kicker" style="justify-content:center;font-size:21px;margin-bottom:10px">${ribbon(26)}${model}</div>
        <div class="head" style="font-size:108px">${hook}</div>
        <div class="sub" style="font-size:34px;margin-top:10px">${sub}</div>
      </div>
    </div>
  </div>`;
}
/** Transparent Reels/TikTok overlay: MK tag + CTA low in the safe zone. */
function tiktokTag(action) {
  return `<div style="width:1080px;height:1920px;position:relative;font-family:'DM Sans'">
    <div style="position:absolute;left:48px;bottom:460px;display:flex;flex-direction:column;gap:12px;align-items:flex-start">
      <div style="display:flex;align-items:center;gap:14px;background:rgba(8,8,8,.75);padding:14px 24px 14px 18px;border-left:4px solid ${PETAL}">
        ${ribbon(40)}
        <div><div style="font-family:'Bebas Neue';font-size:40px;letter-spacing:.06em;color:${PEARL};line-height:1">ASK FOR MK · <span style="color:${PETAL}">${HANDLE}</span></div>
        <div style="font-size:18px;letter-spacing:.14em;text-transform:uppercase;color:${SMOKE}">${STORE}</div></div>
      </div>
      <div class="cta" style="font-size:34px">${action[0]}<span>${action[1]}</span></div>
    </div>
  </div>`;
}

// ── Render ─────────────────────────────────────────────────────────────────────
async function render(page, html, w, h, file, transparent = false) {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${BASE_CSS}</style></head><body>${html}</body></html>`, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: file, omitBackground: transparent, clip: { x: 0, y: 0, width: w, height: h } });
  console.log('  ✓', path.relative(ROOT, file));
}

const dir = d => { const p = path.join(OUT, d); fs.rmSync(p, { recursive: true, force: true }); fs.mkdirSync(p, { recursive: true }); return p; };

const cleanup = () => fs.rmSync(work, { recursive: true, force: true });

export {
  ROOT, MEDIA, OUT, VOID, PEARL, SMOKE, PETAL, HANDLE, STORE, GROUP, work,
  enhance, dataUri, img, ribbon, BASE_CSS, topbar, sig, cta,
  hero, pinkPanel, intro, slide, endCard, tiktokOverlay, tiktokTag,
  render, dir, cleanup,
};
