#!/usr/bin/env node
/**
 * Builds the Kindle/KDP eBook cover (front only).
 * KDP ideal: 2560 x 1600 px (H x W), 1.6:1 ratio, RGB.
 * Matches mkparrish.com dark-luxury design.
 * Run: node scripts/build-ebook-cover.mjs
 */
import puppeteer from 'puppeteer';
import fs from 'fs';

const W_PX = 1600;
const H_PX = 2560;
const SCALE = 1; // already at target px

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: ${W_PX}px; height: ${H_PX}px; overflow: hidden; }
  body {
    background:
      radial-gradient(ellipse at 78% 8%, rgba(242,175,198,0.14), transparent 55%),
      radial-gradient(ellipse at 15% 100%, rgba(199,91,120,0.12), transparent 55%),
      linear-gradient(180deg, #0B0B0B 0%, #080808 55%, #050505 100%);
    font-family: 'DM Sans', sans-serif;
    position: relative;
  }
  /* thin inset hairline frame */
  .edge {
    position: absolute; inset: 56px;
    border: 1px solid rgba(124,124,124,0.28);
  }
  /* content stack, top-anchored editorial layout */
  .wrap {
    position: absolute; inset: 56px;
    padding: 150px 130px;
    display: flex; flex-direction: column;
  }
  .top-meta {
    display: flex; align-items: center; gap: 28px;
    font-family: 'DM Sans', sans-serif; font-weight: 500;
    font-size: 28px; letter-spacing: 0.42em; text-transform: uppercase;
    color: #B0B0B0;
  }
  .top-meta .bar { width: 64px; height: 2px; background: #C75B78; }

  .title-block { margin-top: 150px; }
  .kicker {
    font-family: 'Playfair Display', serif; font-style: italic; font-weight: 400;
    font-size: 72px; color: #F2AFC6; margin-bottom: 6px; letter-spacing: 0.01em;
  }
  .title {
    font-family: 'Bebas Neue', sans-serif;
    color: #F0F0EE; text-transform: uppercase;
    line-height: 0.84; letter-spacing: 0.005em;
    font-size: 186px;
    white-space: nowrap;
  }
  .title .pink { color: #F2AFC6; }

  .midrule {
    margin-top: 90px;
    width: 200px; height: 3px; background: #C75B78;
  }
  .subtitle {
    margin-top: 60px;
    font-family: 'Playfair Display', serif; font-style: italic; font-weight: 400;
    font-size: 50px; color: #C8C8C6; line-height: 1.5;
    max-width: 24ch;
  }

  .footer {
    margin-top: auto;
    display: flex; align-items: flex-end; justify-content: space-between;
  }
  .footer .author {
    font-family: 'Playfair Display', serif; font-weight: 500;
    font-size: 46px; color: #F0F0EE; letter-spacing: 0.01em;
  }
  .footer .url {
    font-family: 'DM Sans', sans-serif; font-weight: 400;
    font-size: 26px; letter-spacing: 0.34em; text-transform: uppercase;
    color: #7A7A7A;
  }
</style>
</head>
<body>
  <div class="edge"></div>
  <div class="wrap">
    <div class="top-meta"><span class="bar"></span>A Guided Writing Practice</div>

    <div class="title-block">
      <div class="kicker">The</div>
      <div class="title">Re<span class="pink">invention</span><br/>Workbook</div>
      <div class="midrule"></div>
      <div class="subtitle">For people in the middle of becoming someone new.</div>
    </div>

    <div class="footer">
      <div class="author">MK Parrish</div>
      <div class="url">mkparrish.com</div>
    </div>
  </div>
</body>
</html>`;

const dest = '/home/user/mkparrish-site/public/downloads/ebooks/reinvention-workbook-ebook-cover.jpg';

const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'], headless: true });
const page = await browser.newPage();
await page.setViewport({ width: W_PX, height: H_PX, deviceScaleFactor: SCALE });
await page.setContent(html, { waitUntil: 'networkidle0', timeout: 30000 });
await page.screenshot({ path: dest, type: 'jpeg', quality: 95 });
await browser.close();

const size = (fs.statSync(dest).size / 1024).toFixed(0);
console.log(`eBook cover: ${dest}`);
console.log(`Dimensions: ${W_PX} x ${H_PX} px (1.6:1, KDP ideal)`);
console.log(`File: ${size} kb`);
