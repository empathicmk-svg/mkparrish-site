#!/usr/bin/env node
/**
 * Builds social header / banner images in the mkparrish.com dark-luxury brand.
 *   - Substack publication header (1600 x 400)
 *   - LinkedIn personal banner   (1584 x 396)
 * Each in two flavors: "minimal" (just the hook + site) and "worded" (adds copy).
 * Hero line: "rewrite your story ♡"  ·  Output: JPEG, 2x for crispness.
 * Run: node scripts/build-headers.mjs
 */
import puppeteer from 'puppeteer';
import fs from 'fs';

const OUT = '/home/user/mkparrish-site/public/downloads/social';
fs.mkdirSync(OUT, { recursive: true });

// ---- shared CSS ----------------------------------------------------------
const css = (W, H, heroSize, padX) => `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: ${W}px; height: ${H}px; overflow: hidden; }
  body {
    position: relative;
    font-family: 'DM Sans', sans-serif;
    background:
      radial-gradient(ellipse at 88% 6%, rgba(242,175,198,0.18), transparent 52%),
      radial-gradient(ellipse at 6% 108%, rgba(199,91,120,0.16), transparent 55%),
      linear-gradient(115deg, #0C0C0C 0%, #080808 50%, #050505 100%);
    display: flex; flex-direction: column;
    justify-content: center;
    padding: 0 ${padX}px;
  }
  .edge { position: absolute; inset: 26px; border: 1px solid rgba(124,124,124,0.22); pointer-events: none; }
  .eyebrow {
    font-family: 'DM Sans', sans-serif; font-weight: 500;
    font-size: ${Math.round(heroSize*0.16)}px; letter-spacing: 0.42em;
    text-transform: uppercase; color: #B0B0B0;
    display: flex; align-items: center; gap: 22px; margin-bottom: 26px;
  }
  .eyebrow .bar { width: 52px; height: 2px; background: #C75B78; }
  .hero {
    font-family: 'Playfair Display', serif; font-style: italic; font-weight: 500;
    font-size: ${heroSize}px; line-height: 1.0; letter-spacing: 0.01em;
    color: #F0F0EE;
  }
  .hero .accent { color: #F2AFC6; }
  .hero .heart { color: #F2AFC6; font-style: normal; margin-left: 0.12em; }
  .words {
    font-family: 'DM Sans', sans-serif; font-weight: 300;
    font-size: ${Math.round(heroSize*0.2)}px; letter-spacing: 0.04em;
    color: #9A9A9A; margin-top: 30px; max-width: 46ch; line-height: 1.5;
  }
  .rule { width: ${Math.round(heroSize*1.0)}px; height: 2px; background: #C75B78; margin: 34px 0 0; }
  .url {
    font-family: 'DM Sans', sans-serif; font-weight: 500;
    font-size: ${Math.round(heroSize*0.17)}px; letter-spacing: 0.4em;
    text-transform: uppercase; color: #7A7A7A; margin-top: 26px;
  }
`;

const fonts = `<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">`;

const heroLine = `<div class="hero">rewrite your <span class="accent">story</span> <span class="heart">&#10084;</span></div>`;

function makeHtml({ W, H, heroSize, padX, worded }) {
  const eyebrow = worded
    ? `<div class="eyebrow"><span class="bar"></span>MK Parrish &middot; Brand Voice Strategist</div>`
    : '';
  const words = worded
    ? `<div class="words">Brand voice, ghostwriting &amp; the economics of language &mdash; for people in the middle of becoming someone new.</div>`
    : '';
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
${fonts}<style>${css(W, H, heroSize, padX)}</style></head>
<body>
  <div class="edge"></div>
  ${eyebrow}
  ${heroLine}
  ${words}
  <div class="rule"></div>
  <div class="url">mkparrish.com</div>
</body></html>`;
}

const jobs = [
  { name: 'substack-header-minimal', W: 1600, H: 400, heroSize: 96,  padX: 110, worded: false },
  { name: 'substack-header-words',   W: 1600, H: 400, heroSize: 80,  padX: 110, worded: true  },
  { name: 'linkedin-banner-minimal', W: 1584, H: 396, heroSize: 92,  padX: 96,  worded: false },
  { name: 'linkedin-banner-words',   W: 1584, H: 396, heroSize: 76,  padX: 96,  worded: true  },
];

const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'], headless: true });
for (const job of jobs) {
  const page = await browser.newPage();
  await page.setViewport({ width: job.W, height: job.H, deviceScaleFactor: 2 });
  await page.setContent(makeHtml(job), { waitUntil: 'networkidle0', timeout: 30000 });
  const dest = `${OUT}/${job.name}.jpg`;
  await page.screenshot({ path: dest, type: 'jpeg', quality: 95 });
  await page.close();
  const kb = (fs.statSync(dest).size / 1024).toFixed(0);
  console.log(`${job.name}: ${job.W}x${job.H} (2x) — ${kb} kb`);
}
await browser.close();
console.log(`\nAll headers written to ${OUT}`);
