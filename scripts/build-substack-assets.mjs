#!/usr/bin/env node
/**
 * Renders branded Substack assets that match the mkparrish.com design system.
 * Substack allows no custom CSS/JS/fonts — the logo + cover images are the only
 * place the real brand can live, so these bake in the petal-pink palette, the
 * signature gradient ring, the glowing ♡, and the live-site fonts.
 *
 * Outputs:
 *   - public/substack/the-margins-avatar.png   (1024×1024 — publication logo/avatar, shown as a circle)
 *   - public/substack/the-margins-cover.png    (1456×600 — welcome / header / social cover)
 * Run: node scripts/build-substack-assets.mjs
 */
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'public', 'substack');
fs.mkdirSync(OUT, { recursive: true });

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,500;0,600;1,500&family=DM+Sans:wght@300;400;600&display=swap" rel="stylesheet">`;

// Palette + signature gradient (from app/globals.css)
const VOID = '#080808', PETAL = '#F2AFC6', BLUSH = '#FFD6E4', WHITE = '#FAFAF8',
      ROSE = '#E0869F', CARMINE = '#C75B78', PEARL = '#F0F0EE', ASH = '#7A7A7A', SMOKE = '#B0B0B0';
const RING = `conic-gradient(from 210deg, ${PETAL}, ${BLUSH}, ${WHITE}, ${ROSE}, ${CARMINE}, ${PETAL})`;
const BAR  = `linear-gradient(90deg, ${PETAL}, ${BLUSH} 35%, ${ROSE} 70%, ${CARMINE})`;

// Glowing petal heart (same path as the site's cursor / AuthorGlow ♡)
const heart = (size, glow = 0.72) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true"
     style="filter:drop-shadow(0 0 ${Math.round(size * 0.30)}px rgba(242,175,198,${glow}))">
     <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
       fill="${PETAL}"/></svg>`;

// ── AVATAR — square crop of the cover (single-line wordmark + ♡) ─────────────
const avatar = `<!doctype html><html><head><meta charset="utf-8">${FONTS}
<style>
  *{margin:0;box-sizing:border-box}
  html,body{width:1024px;height:1024px}
  .stage{width:1024px;height:1024px;background:${VOID};position:relative;overflow:hidden;
    display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
  .glow{position:absolute;left:50%;top:46%;width:1180px;height:1000px;transform:translate(-50%,-50%);
    background:radial-gradient(ellipse at center, rgba(242,175,198,0.20), transparent 60%);pointer-events:none}
  .eyebrow{font-family:'DM Sans',sans-serif;font-weight:600;font-size:22px;letter-spacing:0.34em;
    text-transform:uppercase;color:${ASH};position:relative;margin-bottom:38px}
  .row{display:flex;align-items:center;gap:26px;white-space:nowrap;position:relative}
  .word{font-family:'Bebas Neue',sans-serif;font-size:134px;line-height:0.82;letter-spacing:0.02em;color:${PEARL}}
  .word .pink{color:${PETAL};text-shadow:0 0 64px rgba(242,175,198,0.5)}
  .rule{width:320px;height:5px;background:${BAR};border-radius:3px;margin-top:42px;position:relative}
  .tag{font-family:'Playfair Display',serif;font-style:italic;font-weight:500;font-size:36px;
    color:rgba(242,175,198,0.92);margin-top:30px;position:relative}
</style></head>
<body><div class="stage">
  <div class="glow"></div>
  <div class="eyebrow">The private side of the brand</div>
  <div class="row"><div class="word">THE <span class="pink">MARGINS</span></div>${heart(94)}</div>
  <div class="rule"></div>
  <div class="tag">The thinking before the edit.</div>
</div></body></html>`;

// ── COVER — editorial header (void + petal gradient + glowing ♡) ─────────────
const cover = `<!doctype html><html><head><meta charset="utf-8">${FONTS}
<style>
  *{margin:0;box-sizing:border-box}
  html,body{width:1456px;height:600px}
  .stage{width:1456px;height:600px;background:${VOID};position:relative;overflow:hidden;
    display:flex;flex-direction:column;justify-content:center;padding:0 112px}
  .glow{position:absolute;left:14%;top:-16%;width:1300px;height:820px;transform:translateX(-50%);
    background:radial-gradient(ellipse at top, rgba(242,175,198,0.18), transparent 60%);pointer-events:none}
  .arc{position:absolute;right:-220px;top:50%;transform:translateY(-50%);width:620px;height:620px;
    border-radius:50%;background:${RING};opacity:0.16;filter:blur(2px)}
  .row{display:flex;align-items:center;gap:30px;position:relative}
  .eyebrow{font-family:'DM Sans',sans-serif;font-weight:600;font-size:18px;letter-spacing:0.34em;
    text-transform:uppercase;color:${ASH};margin-bottom:26px;position:relative}
  .word{font-family:'Bebas Neue',sans-serif;font-size:160px;line-height:0.82;letter-spacing:0.015em;color:${PEARL}}
  .word .pink{color:${PETAL};text-shadow:0 0 56px rgba(242,175,198,0.42)}
  .rule{width:300px;height:5px;background:${BAR};border-radius:3px;margin:30px 0 0;position:relative}
  .tag{font-family:'Playfair Display',serif;font-style:italic;font-weight:500;font-size:33px;
    color:rgba(242,175,198,0.92);margin-top:26px;position:relative}
  .sub{font-family:'DM Sans',sans-serif;font-weight:300;font-size:21px;line-height:1.6;color:${SMOKE};
    margin-top:18px;position:relative;max-width:62ch}
</style></head>
<body><div class="stage">
  <div class="glow"></div><div class="arc"></div>
  <div class="eyebrow">The private side of the brand</div>
  <div class="row"><div class="word">THE <span class="pink">MARGINS</span></div>${heart(96)}</div>
  <div class="rule"></div>
  <div class="tag">The thinking before the edit.</div>
  <div class="sub">Essays, strategy notes, and the frameworks pulled from real client work — before they get cleaned up for public consumption.</div>
</div></body></html>`;

const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: true });

async function shoot(html, w, h, file) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.evaluate(async () => { await document.fonts.ready; });
  await new Promise(r => setTimeout(r, 250));
  const dest = path.join(OUT, file);
  await page.screenshot({ path: dest, type: 'png' });
  await page.close();
  console.log(`  ✓  public/substack/${file} (${(fs.statSync(dest).size / 1024).toFixed(0)}kb)`);
}

await shoot(avatar, 1024, 1024, 'the-margins-avatar.png');
await shoot(cover, 1456, 600, 'the-margins-cover.png');

await browser.close();
console.log('\nSubstack assets written to public/substack/\n');
