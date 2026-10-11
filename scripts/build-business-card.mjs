/**
 * MK Parrish business card — two-sided, printed 10-up on Avery 8871.
 *
 *   npm run business-card
 *
 * Writes:
 *   marketing/business-card/mk-parrish-card-avery-8871.pdf   page 1 fronts, page 2 backs
 *   marketing/business-card/mk-parrish-card-alignment-test.pdf  outlines only, for plain paper
 *   marketing/business-card/mk-parrish-card-front.png        one card at 300 dpi
 *   marketing/business-card/mk-parrish-card-back.png
 *
 * Front is MK's own brand — the site's wordmark, type and heart. Back is the
 * Mercedes-Benz of Smithtown card, in silver.
 *
 * Designed for white matte stock on an inkjet: a white ground, ink only where
 * it carries information, and nothing within 0.15in of a card edge. Clean
 * Edge sheets are die-cut, not bled, so any fill that ran to the edge would
 * show the few hundredths of an inch every printer drifts by.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'marketing', 'business-card');
fs.mkdirSync(OUT, { recursive: true });

/* ------------------------------------------------------------------ *
 * The facts.
 * ------------------------------------------------------------------ */
const MK = {
  wordmark: 'MK Parrish',
  title: 'WebDev – Marketing Consultant',
  rows: [
    { label: 'Cell', text: '347.853.4238' },
    { label: 'Email', text: 'mkp414@icloud.com' },
    { label: 'Web', text: 'https://mkparrish.com' },
    { label: 'LinkedIn', text: 'linkedin.com/in/mkparrish' },
  ],
};

const MB = {
  name: 'Mary Kate Parrish',
  title: 'Sales & Leasing Consultant',
  store: 'Mercedes-Benz of Smithtown',
  rows: [
    { label: 'Office', text: '631.336.6417' },
    { label: 'Email', text: 'mparrish@mbofsmithtown.com' },
  ],
  address: '630 Middle Country Road · St James, NY 11780',
  web: 'mbofsmithtown.com',
};

/* ------------------------------------------------------------------ *
 * Brand — lifted from app/globals.css so the card matches the site.
 * Petal is too pale to read as type on white paper, so it only ever fills
 * the hearts; lipstick carries the pink in text.
 * ------------------------------------------------------------------ */
const C = {
  ink: '#111111',      // obsidian
  graphite: '#2C2C2C',
  iron: '#4A4A4A',
  ash: '#7A7A7A',
  heart: '#F2AFC6',    // the cursor heart, public/cursor-heart.svg
  lipstick: '#B43259',
  rule: '#D9D9D6',
  // Silver has to be darker on paper than on the black email card, or the
  // star disappears into white stock.
  silver: ['#B9C0C4', '#6A7277'],
};

const FONTS =
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,500;0,600;1,400;1,500&family=DM+Sans:wght@400;500;600&display=swap';
const DISPLAY = "'Bebas Neue', Impact, sans-serif";
const SERIF = "'Playfair Display', Georgia, serif";
const SANS = "'DM Sans', 'Helvetica Neue', Arial, sans-serif";

/* ------------------------------------------------------------------ *
 * Avery 8871 (same grid as 5371 / 8371): Letter, 2 across by 5 down,
 * 3.5 x 2in cards butted edge to edge, 0.75in side and 0.5in top margins.
 * The grid is symmetric left-right, so the backs line up behind the
 * fronts whichever column a card lands in when the sheet is flipped.
 * ------------------------------------------------------------------ */
const SHEET = { w: 8.5, h: 11 };
const CARD = { w: 3.5, h: 2 };
const GRID = { cols: 2, rows: 5, left: 0.75, top: 0.5 };
const SAFE = 0.16; // inches kept clear inside every card edge

const heart = (size, fill = C.heart, stroke = C.ink) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" style="display:block"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="${fill}" stroke="${stroke}" stroke-width="1.4" stroke-linejoin="round"/></svg>`;

// Same construction as the email signature's star, in print silver.
function star(size) {
  const c = 100;
  const ring = 84;
  const weight = 10;
  const tip = ring - weight / 2 - 1;
  const hub = 9;
  const spokes = [90, 210, 330]
    .map((deg) => {
      const r = (deg * Math.PI) / 180;
      const tx = c + tip * Math.cos(r);
      const ty = c - tip * Math.sin(r);
      const px = hub * Math.cos(r + Math.PI / 2);
      const py = -hub * Math.sin(r + Math.PI / 2);
      return `M ${c + px} ${c + py} L ${tx} ${ty} L ${c - px} ${c - py} Z`;
    })
    .join(' ');
  return `<svg width="${size}" height="${size}" viewBox="0 0 200 200" role="img" aria-label="Mercedes-Benz" style="display:block">
  <defs><linearGradient id="silver" x1="0" y1="0" x2="0.35" y2="1">
    <stop offset="0" stop-color="${C.silver[0]}"/><stop offset="1" stop-color="${C.silver[1]}"/>
  </linearGradient></defs>
  <circle cx="100" cy="100" r="${ring}" fill="none" stroke="url(#silver)" stroke-width="${weight}"/>
  <path d="${spokes}" fill="url(#silver)"/>
</svg>`;
}

const rows = (list, labelWidth) =>
  list
    .map(
      ({ label, text }) => `<div class="row"><span class="label" style="width:${labelWidth}">${label}</span><span>${text}</span></div>`,
    )
    .join('');

/* ------------------------------------------------------------------ *
 * The two faces. Sizes are in points and inches so they mean the same
 * thing on paper as they do here.
 * ------------------------------------------------------------------ */
const STYLE = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .card { position: relative; width: ${CARD.w}in; height: ${CARD.h}in; background: #fff; overflow: hidden; color: ${C.ink}; }
  .safe { position: absolute; inset: ${SAFE}in; }
  .row { display: flex; align-items: baseline; font: 400 7.4pt/1.62 ${SANS}; color: ${C.graphite}; letter-spacing: 0.01em; white-space: nowrap; }
  .label { flex: none; font: 600 5.2pt/1 ${SANS}; letter-spacing: 0.16em; text-transform: uppercase; color: ${C.ash}; }

  /* Front */
  .front .wordmark { display: flex; align-items: flex-start; gap: 0.05in; }
  .front .wordmark h1 { font: 400 30pt/0.86 ${DISPLAY}; letter-spacing: 0.02em; text-transform: uppercase; }
  .front .wordmark svg { margin-top: 0.02in; }
  .front .title { margin-top: 0.07in; font: italic 500 9.2pt/1.2 ${SERIF}; color: ${C.lipstick}; }
  .front .rule { margin-top: 0.1in; width: 0.55in; height: 1.2pt; background: ${C.heart}; }
  .front .contact { position: absolute; left: 0; bottom: 0; }
  .front .trail { position: absolute; right: 0; bottom: 0.02in; display: flex; align-items: flex-end; gap: 0.045in; }

  /* Back */
  .back .mark { position: absolute; left: 0; top: 0; bottom: 0; width: 0.86in; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.1in; }
  .back .divider { position: absolute; left: 0.98in; top: 0.06in; bottom: 0.06in; width: 0.6pt; background: ${C.rule}; }
  .back .text { position: absolute; left: 1.12in; right: 0; top: 0; bottom: 0; display: flex; flex-direction: column; justify-content: center; }
  .back h2 { font: 500 13.5pt/1.1 ${SERIF}; letter-spacing: 0.005em; }
  .back .title { margin-top: 0.035in; font: 500 5.6pt/1.3 ${SANS}; letter-spacing: 0.2em; text-transform: uppercase; color: ${C.iron}; }
  .back .store { margin-top: 0.02in; font: 600 6pt/1.3 ${SANS}; letter-spacing: 0.2em; text-transform: uppercase; color: ${C.ink}; }
  .back .hr { margin: 0.09in 0 0.07in; height: 0.6pt; background: ${C.rule}; }
  .back .row { font-size: 7.2pt; }
  .back .foot { margin-top: 0.05in; font: 400 6.1pt/1.5 ${SANS}; color: ${C.iron}; letter-spacing: 0.02em; white-space: nowrap; }
`;

const front = () => `
<div class="card front"><div class="safe">
  <div class="wordmark"><h1>${MK.wordmark}</h1>${heart('0.15in')}</div>
  <p class="title">${MK.title}</p>
  <div class="rule"></div>
  <div class="contact">${rows(MK.rows, '0.5in')}</div>
  <div class="trail">${heart('0.09in')}${heart('0.13in')}${heart('0.19in')}</div>
</div></div>`;

const back = () => `
<div class="card back"><div class="safe">
  <div class="mark">${star('0.66in')}${heart('0.11in')}</div>
  <div class="divider"></div>
  <div class="text">
    <h2>${MB.name}</h2>
    <p class="title">${MB.title}</p>
    <p class="store">${MB.store}</p>
    <div class="hr"></div>
    ${rows(MB.rows, '0.4in')}
    <p class="foot">${MB.address}<br>${MB.web}</p>
  </div>
</div></div>`;

/* ------------------------------------------------------------------ *
 * Fonts are fetched here and inlined, so the headless browser never has to
 * reach Google itself and the PDF embeds exactly these faces.
 *
 * No User-Agent on purpose: that gets Google's static TrueType file per
 * weight instead of the variable woff2 a browser is sent. Chromium embeds
 * variable fonts in a PDF as Type 3 outlines, which some printer drivers
 * rasterise; static TrueType embeds as TrueType.
 * ------------------------------------------------------------------ */
async function inlineFonts() {
  const css = await (await fetch(FONTS)).text();
  const blocks = css.match(/@font-face\s*{[^}]*}/g);
  if (!blocks?.length) throw new Error('No @font-face blocks in the Google Fonts response');
  const out = [];
  for (const block of blocks) {
    const url = block.match(/url\((https:[^)]+\.ttf)\)/)?.[1];
    if (!url) throw new Error(`Expected a static .ttf from Google Fonts, got:\n${block}`);
    const font = Buffer.from(await (await fetch(url)).arrayBuffer()).toString('base64');
    out.push(block.replace(url, `data:font/ttf;base64,${font}`));
  }
  return out.join('\n');
}
const FONT_FACES = await inlineFonts();

const doc = (body, extraStyle = '') => `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>${FONT_FACES}${STYLE}${extraStyle}</style></head><body>${body}</body></html>`;

/* ------------------------------------------------------------------ *
 * Sheets.
 * ------------------------------------------------------------------ */
const SHEET_STYLE = `
  @page { size: ${SHEET.w}in ${SHEET.h}in; margin: 0; }
  html, body { background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .sheet { position: relative; width: ${SHEET.w}in; height: ${SHEET.h}in; page-break-after: always; overflow: hidden; }
  .sheet:last-child { page-break-after: auto; }
  .slot { position: absolute; width: ${CARD.w}in; height: ${CARD.h}in; }
  .outline { border: 0.5pt solid #9A9A9A; }
  .note { position: absolute; left: ${GRID.left}in; right: ${GRID.left}in; font: 400 7pt/1.4 ${SANS}; color: #9A9A9A; }
`;

const slots = (inner) => {
  let html = '';
  for (let r = 0; r < GRID.rows; r++) {
    for (let c = 0; c < GRID.cols; c++) {
      const left = GRID.left + c * CARD.w;
      const top = GRID.top + r * CARD.h;
      html += `<div class="slot" style="left:${left}in;top:${top}in">${inner}</div>`;
    }
  }
  return html;
};

const printSheets = doc(
  `<div class="sheet">${slots(front())}</div><div class="sheet">${slots(back())}</div>`,
  SHEET_STYLE,
);

const alignmentSheet = doc(
  `<div class="sheet">
    <p class="note" style="top:0.18in">Avery 8871 alignment test — print on plain paper at 100% / Actual size, then hold it behind a card sheet against a window. The boxes should sit on the card cuts.</p>
    ${slots('<div class="slot outline" style="position:static"></div>')}
  </div>`,
  SHEET_STYLE,
);

/* ------------------------------------------------------------------ *
 * Render.
 * ------------------------------------------------------------------ */
const sandboxArgs = process.getuid?.() === 0 ? ['--no-sandbox'] : [];
const browser = await puppeteer.launch({ headless: true, args: ['--disable-lcd-text', ...sandboxArgs] });

async function load(page, html) {
  // Everything is inlined, so there is no network to wait on.
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  // Faces load lazily, so ask for each one rather than trusting fonts.ready —
  // a silent fallback to Impact or Georgia would still produce a PDF.
  const missing = await page.evaluate(async () => {
    const families = ['Bebas Neue', 'Playfair Display', 'DM Sans'];
    const loaded = await Promise.all(families.map((f) => document.fonts.load(`12px "${f}"`)));
    return families.filter((_, i) => !loaded[i].length);
  });
  if (missing.length) throw new Error(`Fonts failed to load: ${missing.join(', ')}`);
}

try {
  const p = await browser.newPage();

  await load(p, printSheets);
  await p.pdf({ path: path.join(OUT, 'mk-parrish-card-avery-8871.pdf'), width: `${SHEET.w}in`, height: `${SHEET.h}in`, printBackground: true, preferCSSPageSize: true });
  console.log('✓ marketing/business-card/mk-parrish-card-avery-8871.pdf');

  await load(p, alignmentSheet);
  await p.pdf({ path: path.join(OUT, 'mk-parrish-card-alignment-test.pdf'), width: `${SHEET.w}in`, height: `${SHEET.h}in`, printBackground: true, preferCSSPageSize: true });
  console.log('✓ marketing/business-card/mk-parrish-card-alignment-test.pdf');

  // One card per face at 300 dpi: 3.5in x 2in -> 1050 x 600.
  const scale = 300 / 96;
  for (const [name, face] of [['front', front], ['back', back]]) {
    await p.setViewport({ width: CARD.w * 96, height: CARD.h * 96, deviceScaleFactor: scale });
    await load(p, doc(face()));
    await (await p.$('.card')).screenshot({ path: path.join(OUT, `mk-parrish-card-${name}.png`) });
    console.log(`✓ marketing/business-card/mk-parrish-card-${name}.png`);
  }
} finally {
  await browser.close();
}
