#!/usr/bin/env node
/**
 * Renders branded Substack assets that match the mkparrish.com design system.
 * Outputs:
 *   - public/substack/the-margins-avatar.png   (1024×1024 — publication logo/avatar)
 *   - public/substack/the-margins-cover.png    (1456×600 — welcome / header cover)
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
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,500;0,600;1,500&family=DM+Sans:wght@400;600&display=swap" rel="stylesheet">`;

// Shared palette (from app/globals.css)
const VOID = '#080808', PETAL = '#F2AFC6', PEARL = '#F0F0EE', ASH = '#7A7A7A', SMOKE = '#B0B0B0';

const avatar = `<!doctype html><html><head><meta charset="utf-8">${FONTS}
<style>
  *{margin:0;box-sizing:border-box}
  html,body{width:1024px;height:1024px}
  .stage{width:1024px;height:1024px;background:${VOID};position:relative;overflow:hidden;
    display:flex;flex-direction:column;align-items:center;justify-content:center}
  .glow{position:absolute;left:50%;top:38%;width:1100px;height:900px;transform:translate(-50%,-50%);
    background:radial-gradient(ellipse at center, rgba(242,175,198,0.22), transparent 62%);pointer-events:none}
  .eyebrow{font-family:'DM Sans',sans-serif;font-weight:600;font-size:22px;letter-spacing:0.42em;
    text-transform:uppercase;color:${ASH};position:relative;margin-bottom:30px;padding-left:0.42em}
  .word{font-family:'Bebas Neue',sans-serif;font-size:172px;line-height:0.84;letter-spacing:0.02em;
    color:${PEARL};text-align:center;position:relative}
  .word .pink{color:${PETAL};text-shadow:0 0 60px rgba(242,175,198,0.45)}
  .rule{width:104px;height:3px;background:${PETAL};opacity:0.85;margin-top:38px;position:relative}
  .tag{font-family:'Playfair Display',serif;font-style:italic;font-weight:500;font-size:30px;
    color:rgba(242,175,198,0.85);margin-top:34px;position:relative}
</style></head>
<body><div class="stage">
  <div class="glow"></div>
  <div class="eyebrow">Editorial · Private</div>
  <div class="word">THE<br><span class="pink">MARGINS</span></div>
  <div class="rule"></div>
  <div class="tag">by MK Parrish</div>
</div></body></html>`;

const cover = `<!doctype html><html><head><meta charset="utf-8">${FONTS}
<style>
  *{margin:0;box-sizing:border-box}
  html,body{width:1456px;height:600px}
  .stage{width:1456px;height:600px;background:${VOID};position:relative;overflow:hidden;
    display:flex;flex-direction:column;justify-content:center;padding:0 110px}
  .glow{position:absolute;left:20%;top:-10%;width:1200px;height:760px;transform:translateX(-50%);
    background:radial-gradient(ellipse at top, rgba(242,175,198,0.16), transparent 60%);pointer-events:none}
  .eyebrow{font-family:'DM Sans',sans-serif;font-weight:600;font-size:18px;letter-spacing:0.34em;
    text-transform:uppercase;color:${ASH};position:relative;margin-bottom:24px}
  .word{font-family:'Bebas Neue',sans-serif;font-size:158px;line-height:0.84;letter-spacing:0.015em;
    color:${PEARL};position:relative}
  .word .pink{color:${PETAL};text-shadow:0 0 50px rgba(242,175,198,0.4)}
  .tag{font-family:'Playfair Display',serif;font-style:italic;font-weight:500;font-size:30px;
    color:rgba(242,175,198,0.85);margin-top:30px;position:relative;max-width:60ch}
  .sub{font-family:'DM Sans',sans-serif;font-weight:300;font-size:21px;line-height:1.6;color:${SMOKE};
    margin-top:22px;position:relative;max-width:64ch}
</style></head>
<body><div class="stage">
  <div class="glow"></div>
  <div class="eyebrow">The private side of the brand</div>
  <div class="word">THE <span class="pink">MARGINS</span></div>
  <div class="tag">The thinking before the edit.</div>
  <div class="sub">Essays, strategy notes, and the frameworks pulled from real client work — before they get cleaned up for public consumption.</div>
</div></body></html>`;

const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: true });

async function shoot(html, w, h, file) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  const dest = path.join(OUT, file);
  await page.screenshot({ path: dest, type: 'png' });
  await page.close();
  console.log(`  ✓  public/substack/${file} (${(fs.statSync(dest).size / 1024).toFixed(0)}kb)`);
}

await shoot(avatar, 1024, 1024, 'the-margins-avatar.png');
await shoot(cover, 1456, 600, 'the-margins-cover.png');

await browser.close();
console.log('\nSubstack assets written to public/substack/\n');
