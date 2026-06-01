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
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,400;1,400&family=DM+Sans:wght@300;400&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: ${W_PX}px; height: ${H_PX}px; overflow: hidden; }
  body {
    background: #080808;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    display: flex; align-items: center; justify-content: center;
  }
  /* petal glow top-right */
  .glow {
    position: absolute; top: -6%; right: -8%;
    width: 70%; height: 50%;
    background: radial-gradient(ellipse at top right, rgba(242,175,198,0.13), transparent 62%);
  }
  /* faint bottom carmine wash */
  .glow2 {
    position: absolute; bottom: -10%; left: -10%;
    width: 60%; height: 40%;
    background: radial-gradient(ellipse at bottom left, rgba(199,91,120,0.08), transparent 60%);
  }
  .frame {
    position: relative;
    border: 2px solid #2C2C2C;
    width: 86%; height: 88%;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center;
    padding: 120px 80px;
  }
  /* corner ticks */
  .tick { position: absolute; width: 28px; height: 28px; border-color: #C75B78; }
  .tl { top: -2px; left: -2px; border-top: 2px solid; border-left: 2px solid; }
  .tr { top: -2px; right: -2px; border-top: 2px solid; border-right: 2px solid; }
  .bl { bottom: -2px; left: -2px; border-bottom: 2px solid; border-left: 2px solid; }
  .br { bottom: -2px; right: -2px; border-bottom: 2px solid; border-right: 2px solid; }

  .eyebrow {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 34px; letter-spacing: 0.5em; text-transform: uppercase;
    color: #7A7A7A; margin-bottom: 80px; padding-left: 0.5em;
  }
  .the {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 56px; letter-spacing: 0.55em; text-transform: uppercase;
    color: #7A7A7A; margin-bottom: 18px; padding-left: 0.55em;
  }
  .title {
    font-family: 'Bebas Neue', sans-serif;
    text-transform: uppercase; color: #F0F0EE;
    line-height: 0.84; letter-spacing: 0.02em;
    font-size: 220px;
  }
  .title .accent { color: #F2AFC6; }
  .rule { width: 120px; height: 4px; background: #C75B78; margin: 70px 0; }
  .subtitle {
    font-family: 'Playfair Display', serif; font-style: italic;
    font-size: 46px; color: #B0B0B0; line-height: 1.5;
    max-width: 18ch;
  }
  .dot { color: #F2AFC6; font-size: 60px; margin-top: 80px; }
  .byline {
    position: absolute; bottom: 70px; left: 0; right: 0;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 34px; letter-spacing: 0.42em; text-transform: uppercase;
    color: #4A4A4A;
  }
</style>
</head>
<body>
  <div class="glow"></div>
  <div class="glow2"></div>
  <div class="frame">
    <span class="tick tl"></span><span class="tick tr"></span>
    <span class="tick bl"></span><span class="tick br"></span>

    <div class="eyebrow">MK Parrish</div>
    <div class="the">The</div>
    <div class="title"><span class="accent">Reinvention</span><br/>Workbook</div>
    <div class="rule"></div>
    <div class="subtitle">A guided writing practice for people in the middle of becoming someone new.</div>
    <div class="dot">&#10022;</div>

    <div class="byline">mkparrish.com</div>
  </div>
</body>
</html>`;

const dest = '/home/user/mkparrish-site/public/downloads/ebooks/reinvention-workbook-ebook-cover.png';

const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'], headless: true });
const page = await browser.newPage();
await page.setViewport({ width: W_PX, height: H_PX, deviceScaleFactor: SCALE });
await page.setContent(html, { waitUntil: 'networkidle0', timeout: 30000 });
await page.screenshot({ path: dest, type: 'png' });
await browser.close();

const size = (fs.statSync(dest).size / 1024).toFixed(0);
console.log(`eBook cover: ${dest}`);
console.log(`Dimensions: ${W_PX} x ${H_PX} px (1.6:1, KDP ideal)`);
console.log(`File: ${size} kb`);
