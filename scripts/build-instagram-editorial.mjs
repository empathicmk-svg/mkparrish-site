#!/usr/bin/env node
/**
 * Generates "editorial" Instagram posts in the magazine-cover format:
 *   • Portrait 1080×1350 (Instagram's 4:5 feed ratio) rendered @2x.
 *   • Pure-void background with a pink category kicker  ( — ON {THEME} ).
 *   • A giant ghost serial number ghosted into the top-right.
 *   • Left-aligned Playfair Display italic quote, white, with the closing
 *     line set in petal pink as the "punchline".
 *   • Optional — AUTHOR attribution, ♡ — MK signature, mkparrish.com kicker.
 *
 * This is the look of the reference card MK supplied ("ON SELF-LOVE / 01").
 *
 * Input:  one or more of the post CSVs in output/ (see SOURCES below).
 * Output: output/instagram-editorial/<source>/post-XX-slug.png
 * Run:    node scripts/build-instagram-editorial.mjs            (all sources)
 *         node scripts/build-instagram-editorial.mjs bold       (one source)
 */
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { inlineGoogleFonts } from './lib/inline-fonts.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_ROOT  = path.join(__dirname, '..', 'output', 'instagram-editorial');

// ── Sources ─────────────────────────────────────────────────────────────────────
// Each post library renders into its own subfolder so the whole catalogue is
// available in the new format. Pass a key as argv[2] to render just one.
const SOURCES = {
  philosophy: 'mk_philosophy_positivity_posts.csv',
  fifty:      'mk_50_posts.csv',
  bold:       'mk_bold_posts.csv',
};

// ── Brand palette (from app/globals.css) ─────────────────────────────────────────
const VOID  = '#070707';
const PETAL = '#F2AFC6';
const PEARL = '#F4F3F1';
const SMOKE = '#9A9A9A';

// ── Fonts ────────────────────────────────────────────────────────────────────────
const FONTS_URL = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500;1,600&family=DM+Sans:wght@400;500;600&display=swap';
let FONTS = '';

// ── CSV parsing ──────────────────────────────────────────────────────────────────
function parseRow(line) {
  const result = [];
  let cur = '', inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQ && line[i + 1] === '"') { cur += '"'; i++; }
      else inQ = !inQ;
    } else if (ch === ',' && !inQ) { result.push(cur); cur = ''; }
    else cur += ch;
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

// ── On-screen text ───────────────────────────────────────────────────────────────
// Splits the " / " separated quote into lines and peels off a trailing
// "— author" attribution when present.
function parseOnScreen(raw) {
  const parts = raw.split(' / ').map(p => p.trim()).filter(Boolean);
  const idx = parts.findIndex(p => /^[—–-]/.test(p));
  if (idx !== -1) {
    return { lines: parts.slice(0, idx), attribution: parts[idx].replace(/^[—–-]\s*/, '').trim() };
  }
  return { lines: parts, attribution: '' };
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function slug(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// ── Quote sizing ─────────────────────────────────────────────────────────────────
// Left-aligned quote wants to fill ~952px of usable width. Scale on the longest
// line and the line count so 1–5 line quotes all sit nicely in the portrait.
function quoteFontSize(lines) {
  const max = Math.max(...lines.map(l => l.length));
  const n = lines.length;
  if (max > 34) return n >= 4 ? 56 : 64;
  if (max > 28) return n >= 4 ? 66 : 78;
  if (max > 22) return n >= 5 ? 70 : 90;
  if (max > 16) return n >= 5 ? 84 : 104;
  return n >= 4 ? 96 : 116;
}

// ── Template ─────────────────────────────────────────────────────────────────────
function buildHTML(post) {
  const { lines, attribution } = parseOnScreen(post['On-Screen Text'] || '');
  const fsz   = quoteFontSize(lines);
  const num   = String(post['Number'] || '').padStart(2, '0');
  const theme = (post['Theme'] || '').toUpperCase();

  // The last line carries the petal-pink "punchline" treatment.
  const linesHTML = lines.map((l, i) =>
    `<div class="qline${i === lines.length - 1 ? ' accent' : ''}">${esc(l)}</div>`
  ).join('');

  return `<!doctype html><html><head><meta charset="utf-8">${FONTS}
<style>
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html, body { width:1080px; height:1350px; overflow:hidden; background:${VOID}; }

  .stage {
    width:1080px; height:1350px;
    background:${VOID};
    position:relative; overflow:hidden;
    padding:88px 72px;
    display:flex; flex-direction:column;
  }

  /* Soft pink wash behind the quote so the page never reads as flat black */
  .glow {
    position:absolute; left:8%; top:46%;
    width:1100px; height:760px;
    transform:translateY(-50%);
    background:radial-gradient(ellipse at center,
      rgba(242,175,198,0.10) 0%,
      rgba(242,175,198,0.03) 42%,
      transparent 70%);
    pointer-events:none; z-index:0;
  }

  /* Category kicker — pink tick + spaced caps label */
  .kicker {
    position:relative; z-index:3;
    display:flex; align-items:center; gap:22px;
  }
  .kicker .tick {
    width:46px; height:2px; background:${PETAL};
    box-shadow:0 0 8px rgba(242,175,198,0.7);
  }
  .kicker .label {
    font-family:'DM Sans', sans-serif; font-weight:600;
    font-size:22px; letter-spacing:0.42em;
    text-transform:uppercase; color:${SMOKE};
  }

  /* Ghost serial number, top-right */
  .ghost-num {
    position:absolute; top:118px; right:40px;
    z-index:1;
    font-family:'Playfair Display', serif; font-weight:500;
    font-size:440px; line-height:0.8;
    color:transparent;
    -webkit-text-stroke:2px rgba(242,175,198,0.10);
    user-select:none; pointer-events:none;
  }

  /* Quote — left aligned, vertically centred in the frame */
  .quote {
    position:relative; z-index:3;
    flex:1; display:flex; flex-direction:column;
    justify-content:center;
  }
  .qline {
    font-family:'Playfair Display', serif;
    font-style:italic; font-weight:500;
    font-size:${fsz}px; line-height:1.18;
    color:${PEARL};
    text-shadow:0 0 26px rgba(242,175,198,0.16);
  }
  .qline.accent {
    color:${PETAL};
    text-shadow:
      0 0 18px rgba(242,175,198,0.45),
      0 0 44px rgba(242,175,198,0.25);
  }

  .attribution {
    margin-top:30px;
    font-family:'DM Sans', sans-serif; font-weight:500;
    font-size:22px; letter-spacing:0.30em;
    text-transform:uppercase; color:rgba(242,175,198,0.80);
  }

  /* Pink rule under the quote */
  .rule {
    margin-top:46px;
    width:168px; height:3px; background:${PETAL};
    box-shadow:0 0 10px rgba(242,175,198,0.6);
  }

  /* Footer row */
  .footer {
    position:relative; z-index:3;
    display:flex; align-items:flex-end; justify-content:space-between;
  }
  .sig {
    font-family:'Playfair Display', serif; font-style:italic;
    font-size:34px; color:rgba(244,243,241,0.62);
    letter-spacing:0.02em;
  }
  .brand {
    font-family:'DM Sans', sans-serif; font-weight:600;
    font-size:18px; letter-spacing:0.34em;
    text-transform:uppercase; color:rgba(154,154,154,0.55);
  }
</style>
</head><body>
<div class="stage">
  <div class="glow"></div>
  <div class="ghost-num">${esc(num)}</div>

  <div class="kicker">
    <span class="tick"></span>
    <span class="label">${theme ? '— ' + esc(theme) : '— MKPARRISH'}</span>
  </div>

  <div class="quote">
    <div>${linesHTML}</div>
    ${attribution ? `<div class="attribution">— ${esc(attribution)}</div>` : ''}
    <div class="rule"></div>
  </div>

  <div class="footer">
    <div class="sig">&#9825; &mdash; MK</div>
    <div class="brand">mkparrish.com</div>
  </div>
</div>
</body></html>`;
}

// ── Browser plumbing (matches build-instagram-posts*.mjs) ────────────────────────
function launchBrowser() {
  return puppeteer.launch({
    headless: true,
    acceptInsecureCerts: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-lcd-text',
      '--font-render-hinting=none',
      '--ignore-certificate-errors',
    ],
  });
}
async function closeBrowser(browser) {
  await Promise.race([
    browser.close().catch(() => {}),
    new Promise((r) => setTimeout(() => { try { browser.process()?.kill('SIGKILL'); } catch {} r(); }, 5000)),
  ]);
}

// ── Main ─────────────────────────────────────────────────────────────────────────
const only = process.argv[2];
const entries = Object.entries(SOURCES).filter(([k]) => !only || k === only);
if (only && entries.length === 0) {
  console.error(`Unknown source "${only}". Options: ${Object.keys(SOURCES).join(', ')}`);
  process.exit(1);
}

FONTS = await inlineGoogleFonts(FONTS_URL);

const RESTART_EVERY = 8;
let browser = await launchBrowser();
let sinceRestart = 0;

async function shoot(html, dest) {
  const page = await browser.newPage();
  try {
    await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 2 });
    await page.setContent(html, { waitUntil: 'load', timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);
    await new Promise(r => setTimeout(r, 300));
    await page.screenshot({ path: dest, type: 'png' });
    await page.close().catch(() => {});
    const kb = (fs.statSync(dest).size / 1024).toFixed(0);
    console.log(`  ✓  ${path.basename(dest)}  (${kb} kb)`);
  } catch (err) {
    try { await page.close(); } catch {}
    throw err;
  }
}

let total = 0;
for (const [key, file] of entries) {
  const csvPath = path.join(__dirname, '..', 'output', file);
  if (!fs.existsSync(csvPath)) { console.log(`  …  skipping ${key} (missing ${file})`); continue; }
  const outDir = path.join(OUT_ROOT, key);
  fs.mkdirSync(outDir, { recursive: true });

  const posts = parseCSV(fs.readFileSync(csvPath, 'utf-8'));
  console.log(`\n${key} — generating ${posts.length} posts → output/instagram-editorial/${key}/\n`);

  for (const post of posts) {
    const num      = String(post['Number'] || '').padStart(2, '0');
    const title    = slug(post['Title'] || `post-${num}`);
    const dest     = path.join(outDir, `post-${num}-${title}.png`);
    const html     = buildHTML(post);

    if (sinceRestart >= RESTART_EVERY) {
      await closeBrowser(browser); browser = await launchBrowser(); sinceRestart = 0;
    }
    try {
      await shoot(html, dest);
    } catch (err) {
      console.log(`  …  retrying ${path.basename(dest)} on a fresh browser (${err.message.split('\n')[0]})`);
      await closeBrowser(browser); browser = await launchBrowser(); sinceRestart = 0;
      await shoot(html, dest);
    }
    sinceRestart++; total++;
  }
}

await closeBrowser(browser);
console.log(`\n✓  ${total} posts saved under output/instagram-editorial/\n`);
process.exit(0);
