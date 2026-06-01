#!/usr/bin/env node
/**
 * New LinkedIn personal cover photo (1584 x 396), mkparrish.com brand.
 * Right-weighted layout so the profile avatar (lower-left) never overlaps copy.
 * Run: node scripts/build-linkedin-cover.mjs
 */
import puppeteer from 'puppeteer';
import fs from 'fs';

const W = 1584, H = 396;
const dest = '/home/user/mkparrish-site/public/downloads/social/linkedin-cover.jpg';

const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: ${W}px; height: ${H}px; overflow: hidden; }
  body {
    position: relative; font-family: 'DM Sans', sans-serif;
    background:
      radial-gradient(ellipse at 92% 8%, rgba(242,175,198,0.20), transparent 50%),
      radial-gradient(ellipse at 60% 120%, rgba(199,91,120,0.16), transparent 55%),
      linear-gradient(105deg, #060606 0%, #0B0B0B 46%, #080808 100%);
  }
  .edge { position: absolute; inset: 24px; border: 1px solid rgba(124,124,124,0.20); }

  /* faint oversized monogram, lower-left zone (sits behind avatar area, decorative) */
  .mono {
    position: absolute; left: 36px; bottom: -54px;
    font-family: 'Playfair Display', serif; font-style: italic; font-weight: 500;
    font-size: 300px; line-height: 1; color: rgba(242,175,198,0.05);
    user-select: none;
  }

  /* content — right-weighted */
  .content {
    position: absolute; top: 0; right: 90px; height: 100%;
    display: flex; flex-direction: column; justify-content: center; align-items: flex-end;
    text-align: right; max-width: 60%;
  }
  .eyebrow {
    font-family: 'DM Sans', sans-serif; font-weight: 500;
    font-size: 17px; letter-spacing: 0.4em; text-transform: uppercase;
    color: #B0B0B0; display: flex; align-items: center; gap: 18px;
  }
  .eyebrow .bar { width: 46px; height: 2px; background: #C75B78; }
  .headline {
    font-family: 'Playfair Display', serif; font-weight: 500;
    font-size: 62px; line-height: 1.04; color: #F0F0EE; margin-top: 22px;
  }
  .headline .accent { font-style: italic; color: #F2AFC6; }
  .strip {
    font-family: 'DM Sans', sans-serif; font-weight: 300;
    font-size: 19px; letter-spacing: 0.06em; color: #9A9A9A; margin-top: 22px;
  }
  .strip b { color: #C8C8C6; font-weight: 500; }
  .url {
    font-family: 'DM Sans', sans-serif; font-weight: 500;
    font-size: 16px; letter-spacing: 0.34em; text-transform: uppercase;
    color: #7A7A7A; margin-top: 24px;
    display: flex; align-items: center; gap: 14px;
  }
  .url .dot { color: #F2AFC6; }
</style></head>
<body>
  <div class="edge"></div>
  <div class="mono">mk</div>
  <div class="content">
    <div class="eyebrow"><span class="bar"></span>MK Parrish &middot; The Margins</div>
    <div class="headline">Make it sound like <span class="accent">you.</span></div>
    <div class="strip"><b>Brand voice</b> &nbsp;·&nbsp; <b>Ghostwriting</b> &nbsp;·&nbsp; <b>The economics of language</b></div>
    <div class="url">mkparrish.com <span class="dot">&#10084;</span></div>
  </div>
</body></html>`;

const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'], headless: true });
const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: 'networkidle0', timeout: 30000 });
await page.screenshot({ path: dest, type: 'jpeg', quality: 95 });
await browser.close();

const kb = (fs.statSync(dest).size / 1024).toFixed(0);
console.log(`LinkedIn cover: ${dest}`);
console.log(`${W}x${H} (2x render) — ${kb} kb`);
