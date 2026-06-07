#!/usr/bin/env node
/**
 * Generates branded Instagram post images (1080×1080px) from the philosophy
 * positivity posts CSV, using the mkparrish.com design system.
 *
 * Output: output/instagram/post-XX-slug.png
 * Run:    node scripts/build-instagram-posts.mjs
 */
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { inlineGoogleFonts } from './lib/inline-fonts.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CSV_PATH = path.join(__dirname, '..', 'output', 'mk_philosophy_positivity_posts.csv');
const OUT = path.join(__dirname, '..', 'output', 'instagram');
fs.mkdirSync(OUT, { recursive: true });

// Brand palette (from app/globals.css)
const VOID   = '#080808';
const PETAL  = '#F2AFC6';
const PEARL  = '#F0F0EE';
const SMOKE  = '#B0B0B0';
const ASH    = '#7A7A7A';

// Inlined as base64 at startup (see Main section) so renders never hit the
// network. FONTS holds the resulting <style> block.
const FONTS_URL = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,500;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500;600&display=swap';
let FONTS = '';

// ── CSV parsing ────────────────────────────────────────────────────────────────

function parseRow(line) {
  const result = [];
  let cur = '', inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQ && line[i + 1] === '"') { cur += '"'; i++; }
      else inQ = !inQ;
    } else if (ch === ',' && !inQ) {
      result.push(cur); cur = '';
    } else {
      cur += ch;
    }
  }
  result.push(cur);
  return result;
}

function parseCSV(text) {
  const lines = text.split('\n').filter(l => l.trim());
  const headers = parseRow(lines[0]).map(h => h.trim());
  return lines.slice(1).filter(l => l.trim()).map(line => {
    const vals = parseRow(line);
    return Object.fromEntries(headers.map((h, i) => [h, (vals[i] || '').trim()]));
  });
}

// ── On-screen text parsing ─────────────────────────────────────────────────────

function parseOnScreen(raw) {
  const parts = raw.split(' / ').map(p => p.trim()).filter(Boolean);
  const attrIdx = parts.findIndex(p => /^[—–-]/.test(p));
  if (attrIdx !== -1) {
    const attr = parts[attrIdx].replace(/^[—–-]\s*/, '').trim();
    return { lines: parts.slice(0, attrIdx), attribution: attr };
  }
  return { lines: parts, attribution: '' };
}

// ── Font sizing ────────────────────────────────────────────────────────────────

function fontSize(lines) {
  const maxLen = Math.max(...lines.map(l => l.length));
  const n = lines.length;
  if (maxLen > 45) return 36;
  if (maxLen > 36) return 44;
  if (n <= 2 && maxLen < 28) return 82;
  if (n <= 2)                return 68;
  if (n === 3 && maxLen < 30) return 62;
  if (n === 3)               return 54;
  return 46;
}

// ── Format accent color / label ───────────────────────────────────────────────

const FORMAT_LABELS = {
  Static:   'Still',
  Reel:     'Reel',
  Carousel: 'Carousel',
};

// ── HTML template ──────────────────────────────────────────────────────────────

function buildHTML(post) {
  const { lines, attribution } = parseOnScreen(post['On-Screen Text'] || '');
  const fs_ = fontSize(lines);
  const num = String(post['Number'] || '').padStart(2, '0');
  const fmt = post['Format'] || 'Static';
  const fmtLabel = FORMAT_LABELS[fmt] || fmt;
  const theme = post['Theme'] || '';

  const linesHTML = lines.map(l => `<span class="qline">${escHtml(l)}</span>`).join('');

  // Slight glow variation per format
  const glowOpacity = fmt === 'Reel' ? 0.22 : fmt === 'Carousel' ? 0.15 : 0.18;

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  ${FONTS}
  <style>
    *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
    html, body { width:1080px; height:1080px; overflow:hidden; background:${VOID}; }

    .stage {
      width:1080px; height:1080px;
      background:${VOID};
      position:relative; overflow:hidden;
      display:flex; flex-direction:column;
      align-items:center; justify-content:center;
    }

    /* Radial glow */
    .glow-center {
      position:absolute; left:50%; top:44%;
      width:1300px; height:1000px;
      transform:translate(-50%,-50%);
      background:radial-gradient(ellipse at center,
        rgba(242,175,198,${glowOpacity}) 0%,
        rgba(242,175,198,0.04) 45%,
        transparent 68%);
      pointer-events:none;
    }
    .glow-floor {
      position:absolute; bottom:-80px; left:50%;
      width:900px; height:400px;
      transform:translateX(-50%);
      background:radial-gradient(ellipse at center,
        rgba(242,175,198,0.06) 0%, transparent 70%);
      pointer-events:none;
    }

    /* Hairline border */
    .frame {
      position:absolute; inset:32px;
      border:1px solid rgba(242,175,198,0.14);
      pointer-events:none;
    }

    /* Corner accents */
    .corner {
      position:absolute; width:18px; height:18px;
      pointer-events:none;
    }
    .corner.tl { top:28px; left:28px;
      border-top:2px solid rgba(242,175,198,0.4);
      border-left:2px solid rgba(242,175,198,0.4); }
    .corner.tr { top:28px; right:28px;
      border-top:2px solid rgba(242,175,198,0.4);
      border-right:2px solid rgba(242,175,198,0.4); }
    .corner.bl { bottom:28px; left:28px;
      border-bottom:2px solid rgba(242,175,198,0.4);
      border-left:2px solid rgba(242,175,198,0.4); }
    .corner.br { bottom:28px; right:28px;
      border-bottom:2px solid rgba(242,175,198,0.4);
      border-right:2px solid rgba(242,175,198,0.4); }

    /* Content block */
    .content {
      position:relative; z-index:2;
      display:flex; flex-direction:column;
      align-items:center; text-align:center;
      padding:0 88px;
      width:100%;
    }

    .rule-top {
      width:44px; height:1px;
      background:linear-gradient(90deg, transparent, rgba(242,175,198,0.6), transparent);
      margin-bottom:46px;
    }

    .quote-block {
      display:flex; flex-direction:column;
      align-items:center; gap:4px;
    }
    .qline {
      display:block;
      font-family:'Playfair Display', serif;
      font-style:italic;
      font-weight:500;
      font-size:${fs_}px;
      line-height:1.35;
      color:${PEARL};
      letter-spacing:0.01em;
      max-width:880px;
    }

    .attribution {
      margin-top:38px;
      font-family:'DM Sans', sans-serif;
      font-weight:400;
      font-size:18px;
      letter-spacing:0.26em;
      text-transform:uppercase;
      color:rgba(242,175,198,0.78);
    }

    .rule-bottom {
      width:32px; height:1px;
      background:linear-gradient(90deg, transparent, rgba(242,175,198,0.45), transparent);
      margin-top:40px;
    }

    /* Signature */
    .sig {
      position:absolute; bottom:52px; right:64px;
      font-family:'Playfair Display', serif;
      font-style:italic;
      font-size:21px;
      color:rgba(242,175,198,0.65);
      letter-spacing:0.04em;
      z-index:6;
    }

    /* Brand URL */
    .brand {
      position:absolute; bottom:54px; left:64px;
      font-family:'DM Sans', sans-serif;
      font-weight:500;
      font-size:12px;
      letter-spacing:0.3em;
      text-transform:uppercase;
      color:rgba(176,176,176,0.32);
      z-index:6;
    }

    /* Number badge */
    .num {
      position:absolute; top:54px; left:60px;
      font-family:'Bebas Neue', sans-serif;
      font-size:12px;
      letter-spacing:0.28em;
      color:rgba(176,176,176,0.28);
      z-index:6;
    }

    /* Format badge */
    .fmt {
      position:absolute; top:54px; right:60px;
      font-family:'DM Sans', sans-serif;
      font-weight:600;
      font-size:11px;
      letter-spacing:0.32em;
      text-transform:uppercase;
      color:rgba(242,175,198,0.38);
      z-index:6;
    }
  </style>
</head>
<body>
<div class="stage">
  <div class="glow-center"></div>
  <div class="glow-floor"></div>
  <div class="frame"></div>
  <div class="corner tl"></div>
  <div class="corner tr"></div>
  <div class="corner bl"></div>
  <div class="corner br"></div>

  <div class="num">No. ${num}</div>
  <div class="fmt">${escHtml(fmtLabel)}</div>

  <div class="content">
    <div class="rule-top"></div>
    <div class="quote-block">${linesHTML}</div>
    ${attribution ? `<div class="attribution">${escHtml(attribution)}</div>` : ''}
    <div class="rule-bottom"></div>
  </div>

  <div class="brand">mkparrish.com</div>
  <div class="sig">&#9825; &mdash; MK</div>
</div>
</body>
</html>`;
}

function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function slugify(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// ── Main ───────────────────────────────────────────────────────────────────────

const csv = fs.readFileSync(CSV_PATH, 'utf-8');
const posts = parseCSV(csv);

console.log(`\nGenerating ${posts.length} Instagram posts...\n`);

// Download + inline the fonts once (cached on disk) so no render touches the net.
FONTS = await inlineGoogleFonts(FONTS_URL);

// Rendering many large (2160²) screenshots in one Chrome instance eventually
// crashes the renderer ("Target closed"). We recycle the browser every
// RESTART_EVERY images and retry any shot that fails on a fresh browser.
const RESTART_EVERY = 8;

function launchBrowser() {
  return puppeteer.launch({
    headless: true,
    // Fonts are inlined as base64, so renders are fully offline. We still accept
    // insecure certs defensively in case any HTML pulls a remote asset.
    acceptInsecureCerts: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      // Containers ship a tiny /dev/shm; without this Chrome crashes mid-run.
      '--disable-dev-shm-usage',
      '--disable-lcd-text',
      '--font-render-hinting=none',
      '--ignore-certificate-errors',
    ],
  });
}

async function closeBrowser(browser) {
  // browser.close() can hang in sandboxed environments — race it with a kill.
  await Promise.race([
    browser.close().catch(() => {}),
    new Promise((r) => setTimeout(() => { try { browser.process()?.kill('SIGKILL'); } catch {} r(); }, 5000)),
  ]);
}

let browser = await launchBrowser();

async function shoot(html, filename) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 2 });
    await page.setContent(html, { waitUntil: 'load', timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);
    await new Promise(r => setTimeout(r, 250));
    const dest = path.join(OUT, filename);
    await page.screenshot({ path: dest, type: 'png' });
    await page.close().catch(() => {});
    const kb = (fs.statSync(dest).size / 1024).toFixed(0);
    console.log(`  ✓  ${filename}  (${kb} kb)`);
  } catch (err) {
    try { await page.close(); } catch {}
    throw err;
  }
}

let sinceRestart = 0;
for (const post of posts) {
  const num = String(post['Number'] || '').padStart(2, '0');
  const slug = slugify(post['Title'] || `post-${num}`);
  const filename = `post-${num}-${slug}.png`;
  const html = buildHTML(post);

  // Proactively recycle the browser to keep renderer memory in check.
  if (sinceRestart >= RESTART_EVERY) {
    await closeBrowser(browser);
    browser = await launchBrowser();
    sinceRestart = 0;
  }

  try {
    await shoot(html, filename);
  } catch (err) {
    // A crash here usually means the renderer died — relaunch and retry once.
    console.log(`  …  retrying ${filename} on a fresh browser (${err.message.split('\n')[0]})`);
    await closeBrowser(browser);
    browser = await launchBrowser();
    sinceRestart = 0;
    await shoot(html, filename);
  }
  sinceRestart++;
}

await closeBrowser(browser);
console.log(`\n✓  All ${posts.length} posts saved to output/instagram/\n`);
process.exit(0);
