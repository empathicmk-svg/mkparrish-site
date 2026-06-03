#!/usr/bin/env node
/**
 * Builds KDP full-wrap paperback covers (PNG + PDF) for 6x9 poetry/starter books.
 * Dark-luxury brand to match mkparrish.com / the Reinvention Workbook.
 * Run: node scripts/build-paperback-covers.mjs
 */
import puppeteer from 'puppeteer';
import fs from 'fs';
import { execSync } from 'child_process';

const OUT = '/home/user/mkparrish-site/public/downloads/ebooks';
const BASE = 96;                 // CSS px per inch
const DPI_SCALE = 300 / BASE;    // → 300 DPI output
const BLEED_IN = 0.125;
const TRIM_W = 6, TRIM_H = 9;    // 6x9
const bldPx = Math.round(BLEED_IN * BASE);
const trmPx = Math.round(TRIM_W * BASE);

// Per-book full-wrap dimensions, computed from the final interior page count.
// KDP white-paper B&W spine = pages × 0.002252". Books under 100 pages may NOT
// carry spine text, so it is omitted below that threshold.
function dims(pages) {
  const SPINE_IN = pages * 0.002252;
  const H_IN = TRIM_H + BLEED_IN * 2;
  const W_IN = BLEED_IN + TRIM_W + SPINE_IN + TRIM_W + BLEED_IN;
  return {
    pages, SPINE_IN, H_IN, W_IN,
    W_PX: Math.round(W_IN * BASE),
    H_PX: Math.round(H_IN * BASE),
    spnPx: Math.round(SPINE_IN * BASE),
    spineText: pages >= 100,
  };
}

// ---- the two books -------------------------------------------------------
const books = [
  {
    file: 'the-rewrite-starter-pack-kdp-cover',
    pages: 26,
    spine: 'The Rewrite Starter Pack',
    eyebrow: 'MK Parrish',
    titleHtml: 'The<br><span class="accent">Rewrite</span>',
    titleSub: 'Starter Pack',
    subtitle: 'A short, guided introduction to rewriting the story you were handed.',
    backQuote: ['You don’t have to', 'burn it all down.', 'You just have to', 'pick up the pen.'],
    backBody: [
      'The Rewrite Starter Pack is the on-ramp — a compact set of guided ' +
      'exercises drawn from the same practice used to help 200+ founders, ' +
      'executives, and creators rewrite the narratives they inherited into ' +
      'ones they’d actually sign. Start small. Start honest. Start here.',
      'MK Parrish is a brand voice strategist, ghostwriter, and author of ' +
      'The Margins on Substack. She writes about voice, identity, and the ' +
      'economics of language at mkparrish.com.',
    ],
  },
  {
    file: 'still-here-still-her-kdp-cover',
    pages: 34,
    spine: 'Still Here, Still Her',
    eyebrow: 'MK Parrish',
    titleHtml: 'Still Here,<br>Still <span class="accent">Her</span>',
    titleSub: 'Poems',
    subtitle: 'Poems on surviving, softening, and staying.',
    backQuote: ['She was still here.', 'And somehow,', 'against everything —', 'still her.'],
    backBody: [
      'Still Here, Still Her is a collection of poems about the quiet work of ' +
      'staying: through loss, reinvention, and the slow becoming of a self you ' +
      'choose. Tender and unflinching, these are poems for anyone who has had ' +
      'to rebuild a life from the inside out.',
      'MK Parrish is a writer, brand voice strategist, and author of The ' +
      'Margins on Substack. She writes about voice, identity, and becoming ' +
      'at mkparrish.com.',
    ],
  },
];

const fonts = `<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">`;

function html(b, d) {
  const { W_IN, H_IN, W_PX, H_PX, spnPx } = d;
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">${fonts}
<style>
  @page { size: ${W_IN}in ${H_IN}in; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: ${W_PX}px; height: ${H_PX}px; overflow: hidden; background: #080808; }

  /* BACK COVER */
  .back {
    position: absolute; left: 0; top: 0;
    width: ${bldPx + trmPx}px; height: ${H_PX}px;
    background: #111111;
    padding: ${bldPx + 48}px ${bldPx + 40}px ${bldPx + 40}px ${bldPx + 48}px;
    display: flex; flex-direction: column; justify-content: space-between;
  }
  .back-rule { width: 34px; height: 1px; background: #C75B78; margin-bottom: 16px; }
  .back-quote {
    font-family: 'Playfair Display', serif; font-style: italic;
    font-size: 15px; color: #C8C8C6; line-height: 1.85;
    border-left: 2px solid #C75B78; padding-left: 14px; margin-bottom: 24px;
  }
  .back-body {
    font-family: 'DM Sans', sans-serif; font-weight: 300;
    font-size: 10px; color: #8A8A8A; line-height: 1.85; margin-bottom: 14px;
  }
  .back-url {
    font-family: 'DM Sans', sans-serif; font-weight: 500;
    font-size: 9px; letter-spacing: 0.3em; color: #4A4A4A; text-transform: uppercase;
  }

  /* SPINE */
  .spine {
    position: absolute; left: ${bldPx + trmPx}px; top: 0;
    width: ${spnPx}px; height: ${H_PX}px; background: #080808;
    display: flex; align-items: center; justify-content: center; overflow: hidden;
  }
  .spine-text {
    writing-mode: vertical-rl; text-orientation: mixed; transform: rotate(180deg);
    white-space: nowrap; font-family: 'Bebas Neue', sans-serif;
    font-size: 9px; letter-spacing: 0.14em; color: #6A6A6A; text-transform: uppercase;
  }

  /* FRONT COVER */
  .front {
    position: absolute; left: ${bldPx + trmPx + spnPx}px; top: 0;
    width: ${trmPx + bldPx}px; height: ${H_PX}px;
    background:
      radial-gradient(ellipse at 82% 10%, rgba(242,175,198,0.16), transparent 55%),
      radial-gradient(ellipse at 12% 102%, rgba(199,91,120,0.13), transparent 58%),
      linear-gradient(160deg, #0C0C0C 0%, #080808 55%, #050505 100%);
    display: flex; flex-direction: column;
    padding: ${bldPx + 60}px ${bldPx + 50}px ${bldPx + 52}px ${bldPx + 54}px;
  }
  .front-edge { position: absolute; inset: ${bldPx + 26}px; border: 1px solid rgba(124,124,124,0.22); }
  .front-eyebrow {
    font-family: 'DM Sans', sans-serif; font-weight: 500;
    font-size: 11px; letter-spacing: 0.4em; color: #B0B0B0;
    text-transform: uppercase; display: flex; align-items: center; gap: 14px;
    position: relative; z-index: 2;
  }
  .front-eyebrow .bar { width: 30px; height: 2px; background: #C75B78; }
  .title-wrap { margin-top: auto; margin-bottom: auto; position: relative; z-index: 2; }
  .front-title {
    font-family: 'Bebas Neue', sans-serif; text-transform: uppercase;
    font-size: 78px; line-height: 0.86; letter-spacing: 0.01em; color: #F0F0EE;
  }
  .front-title .accent { color: #F2AFC6; }
  .front-sub {
    font-family: 'Bebas Neue', sans-serif; text-transform: uppercase;
    font-size: 22px; letter-spacing: 0.34em; color: #9A9A9A; margin-top: 18px;
  }
  .front-rule { width: 56px; height: 2px; background: #C75B78; margin: 26px 0; }
  .front-subtitle {
    font-family: 'Playfair Display', serif; font-style: italic;
    font-size: 16px; color: #C0C0BE; line-height: 1.6; max-width: 30ch;
  }
  .front-byline {
    font-family: 'DM Sans', sans-serif; font-weight: 500;
    font-size: 11px; letter-spacing: 0.34em; color: #6A6A6A;
    text-transform: uppercase; position: relative; z-index: 2;
  }
</style></head>
<body>
  <div class="back">
    <div>
      <div class="back-rule"></div>
      <div class="back-quote">${b.backQuote.join('<br>')}</div>
      ${b.backBody.map(p => `<div class="back-body">${p}</div>`).join('')}
    </div>
    <div class="back-url">mkparrish.com</div>
  </div>

  <div class="spine">${d.spineText ? `<div class="spine-text">${b.spine} &nbsp;·&nbsp; MK Parrish</div>` : ''}</div>

  <div class="front">
    <div class="front-edge"></div>
    <div class="front-eyebrow"><span class="bar"></span>${b.eyebrow}</div>
    <div class="title-wrap">
      <div class="front-title">${b.titleHtml}</div>
      <div class="front-sub">${b.titleSub}</div>
      <div class="front-rule"></div>
      <div class="front-subtitle">${b.subtitle}</div>
    </div>
    <div class="front-byline">mkparrish.com</div>
  </div>
</body></html>`;
}

const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'], headless: true });
for (const b of books) {
  const d = dims(b.pages);
  const page = await browser.newPage();
  await page.setViewport({ width: d.W_PX, height: d.H_PX, deviceScaleFactor: DPI_SCALE });
  await page.setContent(html(b, d), { waitUntil: 'networkidle0', timeout: 30000 });
  const png = `${OUT}/${b.file}.png`;
  const pdf = `${OUT}/${b.file}.pdf`;
  await page.screenshot({ path: png, type: 'png', fullPage: false });
  await page.close();
  execSync(`python3 -c "import img2pdf; layout=img2pdf.get_layout_fun(pagesize=(img2pdf.in_to_pt(${d.W_IN}),img2pdf.in_to_pt(${d.H_IN}))); open('${pdf}','wb').write(img2pdf.convert('${png}',layout_fun=layout))"`);
  const mb = (fs.statSync(pdf).size / 1024 / 1024).toFixed(1);
  console.log(`${b.file}: ${b.pages}pp — wrap ${d.W_IN.toFixed(3)}"×${d.H_IN.toFixed(3)}", spine ${d.SPINE_IN.toFixed(4)}"${d.spineText ? '' : ' (no spine text)'} — PDF ${mb} MB`);
}
await browser.close();
console.log(`\nAll covers 6x9, 300 DPI, 0.125" bleed. Spine width matches final interior page count.`);
