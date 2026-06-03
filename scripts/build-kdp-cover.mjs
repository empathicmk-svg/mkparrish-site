#!/usr/bin/env node
import puppeteer from 'puppeteer';
import fs from 'fs';

// KDP 8.5x11 paperback, 32 pages, B&W white paper
// spine = 32 * 0.002252 = 0.072in
const SPINE_IN  = 32 * 0.002252;   // 0.072"
const BLEED_IN  = 0.125;
const BACK_IN   = 8.5;
const FRONT_IN  = 8.5;
const H_IN      = 11 + BLEED_IN * 2;
const W_IN      = BLEED_IN + BACK_IN + SPINE_IN + FRONT_IN + BLEED_IN;

// Base viewport at 96 CSS px/in, then deviceScaleFactor=3.125 → 300 DPI output
const BASE = 96;
const DPI_SCALE = 300 / BASE;

const W_PX = Math.round(W_IN * BASE);
const H_PX = Math.round(H_IN * BASE);

const bldPx  = Math.round(BLEED_IN * BASE);
const bckPx  = Math.round(BACK_IN  * BASE);
const spnPx  = Math.round(SPINE_IN * BASE);
const frnPx  = Math.round(FRONT_IN * BASE);

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,400;1,400&family=DM+Sans:wght@300;400&display=swap" rel="stylesheet">
<style>
  @page { size: ${W_IN}in ${H_IN}in; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: ${W_PX}px; height: ${H_PX}px; overflow: hidden; background: #080808; }

  /* BACK COVER — left zone incl. bleed */
  .back {
    position: absolute;
    left: 0; top: 0;
    width: ${bldPx + bckPx}px;
    height: ${H_PX}px;
    background: #111111;
    padding: ${bldPx + 56}px ${bldPx + 44}px ${bldPx + 44}px ${bldPx + 52}px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .back-top {}
  .back-rule { width: 36px; height: 1px; background: #C75B78; margin-bottom: 18px; }
  .back-quote {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 13px;
    color: #B0B0B0;
    line-height: 1.9;
    border-left: 2px solid #C75B78;
    padding-left: 14px;
    margin-bottom: 22px;
  }
  .back-body {
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    font-size: 9.5px;
    color: #7A7A7A;
    line-height: 1.8;
    margin-bottom: 18px;
  }
  .back-url {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 9px;
    letter-spacing: 0.22em;
    color: #3A3A3A;
    text-transform: uppercase;
  }

  /* SPINE */
  .spine {
    position: absolute;
    left: ${bldPx + bckPx}px; top: 0;
    width: ${spnPx}px;
    height: ${H_PX}px;
    background: #080808;
    border-left: 1px solid #1A1A1A;
    border-right: 1px solid #1A1A1A;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .spine-text {
    writing-mode: vertical-rl;
    text-orientation: mixed;
    transform: rotate(180deg);
    white-space: nowrap;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 7px;
    letter-spacing: 0.12em;
    color: #2C2C2C;
    text-transform: uppercase;
  }

  /* FRONT COVER — right zone incl. bleed */
  .front {
    position: absolute;
    left: ${bldPx + bckPx + spnPx}px; top: 0;
    width: ${frnPx + bldPx}px;
    height: ${H_PX}px;
    background: #080808;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: ${bldPx + 56}px ${bldPx + 56}px ${bldPx + 60}px ${bldPx + 60}px;
    overflow: hidden;
  }
  /* petal glow */
  .glow {
    position: absolute;
    top: -8%; right: -4%;
    width: 62%; height: 68%;
    background: radial-gradient(ellipse at top right, rgba(242,175,198,0.11), transparent 62%);
    pointer-events: none;
  }
  .front-eyebrow {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 9px;
    letter-spacing: 0.35em;
    color: #7A7A7A;
    text-transform: uppercase;
    margin-bottom: 18px;
    position: relative;
  }
  .front-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 72px;
    letter-spacing: 0.035em;
    line-height: 0.9;
    text-transform: uppercase;
    color: #F0F0EE;
    margin-bottom: 22px;
    position: relative;
  }
  .front-title .accent { color: #F2AFC6; }
  .front-rule {
    width: 48px; height: 2px;
    background: #C75B78;
    margin-bottom: 22px;
    position: relative;
  }
  .front-subtitle {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 12.5px;
    color: #B0B0B0;
    line-height: 1.75;
    max-width: 38ch;
    margin-bottom: 52px;
    position: relative;
  }
  .front-byline {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 11px;
    letter-spacing: 0.25em;
    color: #555555;
    text-transform: uppercase;
    position: relative;
  }
</style>
</head>
<body>

<div class="back">
  <div class="back-top">
    <div class="back-rule"></div>
    <div class="back-quote">
      "You don't find yourself.<br>
      You write yourself.<br>
      One honest sentence at a time."
    </div>
    <div class="back-body">
      The Reinvention Workbook is a guided writing practice for people in the middle of
      becoming someone new. Twenty exercises across four parts — the identity audit,
      excavating the old story, voice and narrative, and building the new draft — take
      you through the same process used to help 200+ founders, executives, and creators
      rewrite the story they were handed into one they'd actually sign.
    </div>
    <div class="back-body">
      MK Parrish is a brand voice strategist, ghostwriter, and author of The Margins
      newsletter on Substack. She writes about voice, identity, and the economics of
      language at mkparrish.com.
    </div>
  </div>
  <div class="back-url">mkparrish.com</div>
</div>

<div class="spine">
  <div class="spine-text">The Reinvention Workbook &nbsp;·&nbsp; MK Parrish</div>
</div>

<div class="front">
  <div class="glow"></div>
  <div class="front-eyebrow">MK Parrish</div>
  <div class="front-title">The<br><span class="accent">Reinvention</span><br>Workbook</div>
  <div class="front-rule"></div>
  <div class="front-subtitle">A guided writing workbook for people in the middle of becoming someone new.</div>
  <div class="front-byline">mkparrish.com</div>
</div>

</body>
</html>`;

const BASE_DIR = '/home/user/mkparrish-site/public/downloads/ebooks';
const destPng = `${BASE_DIR}/reinvention-workbook-kdp-cover.png`;
const destPdf = `${BASE_DIR}/reinvention-workbook-kdp-cover.pdf`;

const browser = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  headless: true,
});

const page = await browser.newPage();
await page.setViewport({ width: W_PX, height: H_PX, deviceScaleFactor: DPI_SCALE });
await page.setContent(html, { waitUntil: 'networkidle0', timeout: 30000 });

// PNG — preview / reference
await page.screenshot({ path: destPng, type: 'png', fullPage: false });

// PDF — KDP submission format (PNG→PDF via img2pdf preserves full color fidelity)
const { execSync } = await import('child_process');
execSync(`python3 -c "
import img2pdf, os
layout = img2pdf.get_layout_fun(pagesize=(img2pdf.in_to_pt(${W_IN}), img2pdf.in_to_pt(${H_IN})))
open('${destPdf}','wb').write(img2pdf.convert('${destPng}', layout_fun=layout))
"`);

await browser.close();

const pngMB  = (fs.statSync(destPng).size / 1024 / 1024).toFixed(1);
const pdfMB  = (fs.statSync(destPdf).size / 1024 / 1024).toFixed(1);
console.log(`PNG: ${destPng} (${pngMB} MB)`);
console.log(`PDF: ${destPdf} (${pdfMB} MB)  ← KDP submission file`);
console.log(`Dimensions: ${W_IN.toFixed(3)}" × ${H_IN.toFixed(3)}" (with bleed)`);
console.log(`Spine: ${SPINE_IN.toFixed(4)}"`);
console.log(`PNG px: ${W_PX * DPI_SCALE} × ${H_PX * DPI_SCALE} (300 DPI)`);
