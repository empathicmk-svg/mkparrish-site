#!/usr/bin/env node
/**
 * Build MK Parrish LinkedIn carousel PNGs + a multi-page PDF.
 *
 * Usage:
 *   node scripts/build-linkedin-carousel.mjs content/linkedin/carousels/homepage-rewrite.json
 *
 * Output:
 *   output/linkedin/<slug>/slide-01.png ...
 *   output/linkedin/<slug>/<slug>.pdf
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import { inlineGoogleFonts } from './lib/inline-fonts.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const inputArg = process.argv[2];

if (!inputArg) {
  console.error('Pass a carousel JSON file. Example: npm run linkedin:carousel -- content/linkedin/carousels/homepage-rewrite.json');
  process.exit(1);
}

const inputPath = path.resolve(ROOT, inputArg);
if (!fs.existsSync(inputPath)) {
  console.error(`Carousel file not found: ${inputPath}`);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
if (!data.slug || !Array.isArray(data.slides) || data.slides.length < 2) {
  console.error('Carousel JSON requires a slug and at least two slides.');
  process.exit(1);
}

const OUT = path.join(ROOT, 'output', 'linkedin', data.slug);
fs.mkdirSync(OUT, { recursive: true });

const COLORS = {
  void: '#080808',
  obsidian: '#111111',
  pearl: '#F0F0EE',
  white: '#FAFAF8',
  smoke: '#B0B0B0',
  ash: '#7A7A7A',
  petal: '#F2AFC6',
};

const FONT_URL = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,500;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap';
let FONTS = '';
try {
  FONTS = await inlineGoogleFonts(FONT_URL);
} catch (error) {
  console.warn(`Could not inline Google Fonts; using local fallbacks. ${error.message}`);
}

function esc(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Inline syntax: {{pink text}} and **bold text**.
function rich(value = '') {
  return esc(value)
    .replace(/\{\{(.+?)\}\}/g, '<span class="accent">$1</span>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

function lines(values = []) {
  const list = Array.isArray(values) ? values : [values];
  return list.map((line) => `<span>${rich(line)}</span>`).join('');
}

function slideBody(slide) {
  const type = slide.type || 'statement';

  if (type === 'teardown') {
    return `
      <div class="content content-teardown">
        <p class="eyebrow">${rich(slide.eyebrow || '')}</p>
        <div class="section-label">Before</div>
        <p class="before-copy">“${rich(slide.before || '')}”</p>
        <div class="section-label after-label">After</div>
        <h1 class="after-headline ${slide.size || ''}">${lines(slide.after || [])}</h1>
        <p class="takeaway">${rich(slide.takeaway || '')}</p>
      </div>`;
  }

  if (type === 'cta') {
    return `
      <div class="content content-cta">
        <p class="eyebrow">${rich(slide.eyebrow || '')}</p>
        <h1 class="headline ${slide.size || ''}">${lines(slide.title || [])}</h1>
        <p class="body-copy">${rich(slide.body || '')}</p>
        ${slide.cta ? `<div class="cta-button">${rich(slide.cta)}</div>` : ''}
        ${slide.url ? `<p class="cta-url">${rich(slide.url)}</p>` : ''}
      </div>`;
  }

  return `
    <div class="content ${type === 'cover' ? 'content-cover' : ''}">
      <p class="eyebrow">${rich(slide.eyebrow || '')}</p>
      <h1 class="headline ${slide.size || ''}">${lines(slide.title || [])}</h1>
      ${slide.body ? `<p class="body-copy">${rich(slide.body)}</p>` : ''}
    </div>`;
}

function slideHTML(slide, index, total) {
  const counter = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
  const swipe = slide.footer === false ? '' : `<div class="swipe">${rich(slide.footer || (index === total - 1 ? 'VISIT →' : 'SWIPE →'))}</div>`;
  const signature = slide.signature || data.signature || '/in/mkparrish ♡';

  return `
    <section class="stage">
      <div class="grain"></div>
      <div class="glow glow-a"></div>
      <div class="glow glow-b"></div>
      <header>
        <div class="brand">${esc(data.brand || 'MK PARRISH')}</div>
        <div class="counter">${counter}</div>
      </header>
      ${slideBody(slide)}
      <footer>
        ${swipe}
        <div class="signature">${esc(signature)}</div>
      </footer>
    </section>`;
}

const css = `
  @page { size: 1080px 1080px; margin: 0; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: ${COLORS.void}; }
  body { font-family: 'DM Sans', Arial, sans-serif; }
  .stage {
    width: 1080px; height: 1080px; position: relative; overflow: hidden;
    page-break-after: always; break-after: page;
    background:
      radial-gradient(ellipse 74% 68% at 21% 27%, rgba(242,175,198,.085), transparent 70%),
      linear-gradient(135deg, #151012 0%, ${COLORS.void} 58%, #0c0c0c 100%);
    color: ${COLORS.pearl};
  }
  .stage:last-child { page-break-after: auto; break-after: auto; }
  .grain {
    position: absolute; inset: 0; opacity: .032; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitchTiles'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    mix-blend-mode: screen;
  }
  .glow { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }
  .glow-a { width: 470px; height: 470px; left: -190px; top: 130px; background: rgba(242,175,198,.055); }
  .glow-b { width: 360px; height: 360px; right: -180px; bottom: 40px; background: rgba(242,175,198,.028); }
  header { position: absolute; top: 62px; left: 68px; right: 68px; display: flex; justify-content: space-between; z-index: 2; }
  .brand, .counter {
    font-size: 18px; font-weight: 700; letter-spacing: .34em; text-transform: uppercase; color: rgba(242,175,198,.9);
  }
  .counter { color: rgba(240,240,238,.48); }
  .content { position: absolute; z-index: 2; left: 68px; right: 68px; top: 345px; }
  .content-cover { top: 310px; }
  .content-teardown { top: 236px; }
  .content-cta { top: 300px; }
  .eyebrow {
    margin: 0 0 26px; font-size: 17px; font-weight: 700; letter-spacing: .42em; text-transform: uppercase; color: ${COLORS.petal};
  }
  .headline, .after-headline {
    margin: 0; font-family: 'Bebas Neue', 'Arial Narrow', Impact, sans-serif; font-weight: 400;
    font-size: 70px; line-height: .94; letter-spacing: .01em; text-transform: uppercase; color: ${COLORS.white}; max-width: 910px;
  }
  .headline span, .after-headline span { display: block; }
  .headline.small, .after-headline.small { font-size: 59px; }
  .headline.large { font-size: 82px; }
  .accent { color: ${COLORS.petal}; }
  .body-copy {
    margin: 27px 0 0; max-width: 900px; font-size: 25px; line-height: 1.48; font-weight: 400; color: ${COLORS.smoke};
  }
  .body-copy strong { color: ${COLORS.pearl}; font-weight: 700; }
  .section-label {
    margin-top: 18px; font-size: 17px; font-weight: 700; letter-spacing: .42em; text-transform: uppercase; color: ${COLORS.petal};
  }
  .before-copy {
    margin: 18px 0 38px; max-width: 880px; font-family: 'Playfair Display', Georgia, serif; font-size: 28px;
    font-style: italic; line-height: 1.42; color: ${COLORS.smoke};
  }
  .after-label { margin-top: 0; }
  .after-headline { margin-top: 18px; font-size: 56px; max-width: 920px; }
  .takeaway { margin: 28px 0 0; font-size: 23px; line-height: 1.4; color: ${COLORS.smoke}; }
  .takeaway strong { color: ${COLORS.pearl}; }
  .cta-button {
    display: inline-block; margin-top: 36px; padding: 18px 28px 16px; background: ${COLORS.petal}; color: ${COLORS.void};
    font-size: 16px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase;
  }
  .cta-url { margin: 22px 0 0; font-size: 17px; letter-spacing: .13em; text-transform: uppercase; color: ${COLORS.smoke}; }
  footer { position: absolute; z-index: 2; left: 68px; right: 68px; bottom: 58px; display: flex; align-items: flex-end; justify-content: space-between; }
  .swipe {
    padding: 17px 26px 15px; background: ${COLORS.petal}; color: ${COLORS.void}; font-size: 16px; font-weight: 700;
    letter-spacing: .24em; text-transform: uppercase;
  }
  .signature {
    font-family: 'Playfair Display', Georgia, serif; font-style: italic; font-size: 25px; color: rgba(240,240,238,.62);
  }
`;

function documentHTML(slides) {
  return `<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>${css}</style></head><body>${slides.join('')}</body></html>`;
}

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none'],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 2 });

  for (let i = 0; i < data.slides.length; i += 1) {
    const html = documentHTML([slideHTML(data.slides[i], i, data.slides.length)]);
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.screenshot({ path: path.join(OUT, `slide-${String(i + 1).padStart(2, '0')}.png`), type: 'png' });
    console.log(`✓ slide ${i + 1}/${data.slides.length}`);
  }

  const allSlides = data.slides.map((slide, index) => slideHTML(slide, index, data.slides.length));
  await page.setContent(documentHTML(allSlides), { waitUntil: 'networkidle0' });
  await page.emulateMediaType('screen');
  await page.pdf({
    path: path.join(OUT, `${data.slug}.pdf`),
    width: '1080px',
    height: '1080px',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  console.log(`\nLinkedIn carousel built: ${OUT}`);
} finally {
  await browser.close();
}
