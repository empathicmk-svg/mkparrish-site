#!/usr/bin/env node
/**
 * Generates dramatic branded Instagram post images (1080×1080px @2x).
 * Three distinct visual templates based on the Style column:
 *   BOLD     — Bebas Neue caps, white text, hot pink glow (hip-hop / power)
 *   SCRIPT   — Great Vibes cursive, full petal pink glow (Hollywood / romantic)
 *   EDITORIAL— Playfair italic, pearl with pink glow (philosophy / scripture)
 *
 * Input:  output/mk_bold_posts.csv
 * Output: output/instagram-v2/post-XX-slug.png
 * Run:    node scripts/build-instagram-posts-v2.mjs
 */
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CSV_PATH  = path.join(__dirname, '..', 'output', 'mk_bold_posts.csv');
const OUT       = path.join(__dirname, '..', 'output', 'instagram-v2');
fs.mkdirSync(OUT, { recursive: true });

// ── Brand palette ──────────────────────────────────────────────────────────────
const VOID   = '#080808';
const PETAL  = '#F2AFC6';
const PEARL  = '#F0F0EE';
const SMOKE  = '#B0B0B0';
const ASH    = '#7A7A7A';

// ── Google Fonts ───────────────────────────────────────────────────────────────
const FONTS = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,500;1,700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
`;

// ── CSV parser ─────────────────────────────────────────────────────────────────
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

// ── On-screen text ─────────────────────────────────────────────────────────────
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

// ── Shared signature ───────────────────────────────────────────────────────────
const SIG_CSS = `
  .sig {
    position: absolute;
    bottom: 52px;
    left: 0; right: 0;
    text-align: center;
    font-family: 'Great Vibes', cursive;
    font-size: 34px;
    color: rgba(242,175,198,0.82);
    text-shadow:
      0 0 12px rgba(242,175,198,0.9),
      0 0 28px rgba(242,175,198,0.6),
      0 0 55px rgba(242,175,198,0.35);
    letter-spacing: 0.02em;
    z-index: 10;
  }
`;

// ── BOLD template ──────────────────────────────────────────────────────────────
function boldFontSize(lines) {
  const max = Math.max(...lines.map(l => l.length));
  const n = lines.length;
  if (n === 1 && max < 18) return 130;
  if (n === 1 && max < 26) return 110;
  if (n === 1) return 90;
  if (n === 2 && max < 22) return 96;
  if (n === 2 && max < 30) return 82;
  if (n === 2) return 70;
  if (n === 3 && max < 22) return 78;
  if (n === 3 && max < 32) return 66;
  if (n === 3) return 56;
  if (n === 4) return 52;
  return 46;
}

function buildBold(post) {
  const { lines, attribution } = parseOnScreen(post['On-Screen Text'] || '');
  const fs = boldFontSize(lines);
  const num = String(post['Number'] || '').padStart(2, '0');
  const fmt = (post['Format'] || 'Static').toUpperCase();
  const linesHtml = lines.map(l =>
    `<div class="qline">${esc(l)}</div>`
  ).join('');

  return `<!doctype html><html><head><meta charset="utf-8">${FONTS}
<style>
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html, body { width:1080px; height:1080px; overflow:hidden; background:${VOID}; }

  .stage {
    width:1080px; height:1080px;
    background: ${VOID};
    position:relative; overflow:hidden;
    display:flex; flex-direction:column;
    align-items:center; justify-content:center;
    gap:0;
  }

  /* Hot pink glow — more aggressive */
  .glow-main {
    position:absolute; left:50%; top:46%;
    width:1400px; height:1100px;
    transform:translate(-50%,-50%);
    background: radial-gradient(ellipse at center,
      rgba(242,175,198,0.32) 0%,
      rgba(180,60,100,0.12) 30%,
      rgba(100,0,50,0.05) 55%,
      transparent 70%);
    pointer-events:none;
  }
  .glow-hot {
    position:absolute; left:50%; top:44%;
    width:700px; height:600px;
    transform:translate(-50%,-50%);
    background: radial-gradient(ellipse at center,
      rgba(242,175,198,0.18) 0%, transparent 60%);
    pointer-events:none;
  }

  /* Thick pink top rule */
  .rule-top {
    width:80px; height:3px;
    background: ${PETAL};
    box-shadow:
      0 0 8px rgba(242,175,198,0.9),
      0 0 20px rgba(242,175,198,0.7),
      0 0 40px rgba(242,175,198,0.5);
    margin-bottom: 44px;
    position:relative; z-index:2;
  }

  .quote-block {
    position:relative; z-index:2;
    display:flex; flex-direction:column;
    align-items:center; gap:6px;
    text-align:center;
    padding:0 70px;
  }
  .qline {
    font-family:'Bebas Neue', sans-serif;
    font-size:${fs}px;
    line-height:1.08;
    letter-spacing:0.07em;
    text-transform:uppercase;
    color:#FFFFFF;
    text-shadow:
      0 0 18px rgba(242,175,198,1),
      0 0 36px rgba(242,175,198,0.85),
      0 0 70px rgba(242,175,198,0.65),
      0 0 120px rgba(242,175,198,0.45),
      0 0 180px rgba(242,175,198,0.25);
  }

  .rule-mid {
    width:50px; height:2px;
    background:rgba(242,175,198,0.6);
    box-shadow: 0 0 12px rgba(242,175,198,0.6);
    margin:32px 0 20px;
    position:relative; z-index:2;
  }

  .attribution {
    position:relative; z-index:2;
    font-family:'DM Sans', sans-serif;
    font-weight:600;
    font-size:16px;
    letter-spacing:0.38em;
    text-transform:uppercase;
    color:${PETAL};
    text-shadow:
      0 0 8px rgba(242,175,198,0.7),
      0 0 18px rgba(242,175,198,0.5);
    margin-bottom:0;
  }

  /* Format + number badges */
  .badge-fmt {
    position:absolute; top:52px; right:56px;
    font-family:'DM Sans',sans-serif; font-weight:600;
    font-size:11px; letter-spacing:0.35em;
    text-transform:uppercase; color:rgba(242,175,198,0.38);
    z-index:6;
  }
  .badge-num {
    position:absolute; top:52px; left:56px;
    font-family:'Bebas Neue',sans-serif;
    font-size:13px; letter-spacing:0.22em;
    color:rgba(176,176,176,0.25); z-index:6;
  }

  /* Corner accents */
  .c { position:absolute; width:22px; height:22px; }
  .c.tl { top:26px; left:26px; border-top:2px solid rgba(242,175,198,0.45); border-left:2px solid rgba(242,175,198,0.45); }
  .c.tr { top:26px; right:26px; border-top:2px solid rgba(242,175,198,0.45); border-right:2px solid rgba(242,175,198,0.45); }
  .c.bl { bottom:26px; left:26px; border-bottom:2px solid rgba(242,175,198,0.45); border-left:2px solid rgba(242,175,198,0.45); }
  .c.br { bottom:26px; right:26px; border-bottom:2px solid rgba(242,175,198,0.45); border-right:2px solid rgba(242,175,198,0.45); }

  ${SIG_CSS}
</style>
</head><body>
<div class="stage">
  <div class="glow-main"></div>
  <div class="glow-hot"></div>
  <div class="c tl"></div><div class="c tr"></div>
  <div class="c bl"></div><div class="c br"></div>
  <div class="badge-num">No. ${num}</div>
  <div class="badge-fmt">${esc(fmt)}</div>

  <div class="rule-top"></div>
  <div class="quote-block">${linesHtml}</div>
  ${attribution ? `<div class="rule-mid"></div><div class="attribution">${esc(attribution)}</div>` : ''}

  <div class="sig">&#9825; &mdash; MK &nbsp;|&nbsp; mkparrish.com</div>
</div>
</body></html>`;
}

// ── SCRIPT template ────────────────────────────────────────────────────────────
function scriptFontSize(lines) {
  const max = Math.max(...lines.map(l => l.length));
  const n = lines.length;
  if (n === 1 && max < 16) return 110;
  if (n === 1 && max < 24) return 94;
  if (n === 1) return 78;
  if (n === 2 && max < 22) return 88;
  if (n === 2 && max < 32) return 74;
  if (n === 2) return 62;
  if (n === 3 && max < 22) return 72;
  if (n === 3 && max < 32) return 60;
  if (n === 3) return 52;
  if (n === 4 && max < 28) return 52;
  if (n === 4) return 44;
  return 40;
}

function buildScript(post) {
  const { lines, attribution } = parseOnScreen(post['On-Screen Text'] || '');
  const fs = scriptFontSize(lines);
  const num = String(post['Number'] || '').padStart(2, '0');
  const fmt = (post['Format'] || 'Static').toUpperCase();
  const linesHtml = lines.map(l =>
    `<div class="qline">${esc(l)}</div>`
  ).join('');

  return `<!doctype html><html><head><meta charset="utf-8">${FONTS}
<style>
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html, body { width:1080px; height:1080px; overflow:hidden; background:${VOID}; }

  .stage {
    width:1080px; height:1080px;
    background: radial-gradient(ellipse at 50% 42%,
      rgba(80,10,35,0.6) 0%,
      rgba(20,5,10,0.4) 45%,
      ${VOID} 72%);
    position:relative; overflow:hidden;
    display:flex; flex-direction:column;
    align-items:center; justify-content:center;
  }

  /* Warm halo glow */
  .glow-main {
    position:absolute; left:50%; top:44%;
    width:1300px; height:1000px;
    transform:translate(-50%,-50%);
    background: radial-gradient(ellipse at center,
      rgba(242,175,198,0.38) 0%,
      rgba(242,175,198,0.15) 30%,
      rgba(242,175,198,0.04) 55%,
      transparent 68%);
    pointer-events:none;
  }
  .glow-soft {
    position:absolute; left:50%; top:50%;
    width:900px; height:700px;
    transform:translate(-50%,-50%);
    background: radial-gradient(ellipse at center,
      rgba(242,175,198,0.12) 0%, transparent 55%);
    pointer-events:none;
  }

  .content {
    position:relative; z-index:2;
    display:flex; flex-direction:column;
    align-items:center; text-align:center;
    padding:0 80px;
    width:100%;
  }

  /* Decorative flourish line */
  .flourish {
    width:120px; height:1px;
    background: linear-gradient(90deg,
      transparent, rgba(242,175,198,0.7), rgba(242,175,198,0.9),
      rgba(242,175,198,0.7), transparent);
    box-shadow: 0 0 6px rgba(242,175,198,0.5);
    margin-bottom: 48px;
  }
  .flourish-bot {
    width:80px; height:1px;
    background: linear-gradient(90deg,
      transparent, rgba(242,175,198,0.6), transparent);
    margin-top: 36px;
  }

  .quote-block {
    display:flex; flex-direction:column;
    align-items:center; gap:2px;
  }
  .qline {
    font-family:'Great Vibes', cursive;
    font-size:${fs}px;
    line-height:1.4;
    color:${PETAL};
    text-shadow:
      0 0 12px rgba(242,175,198,1),
      0 0 28px rgba(242,175,198,0.9),
      0 0 55px rgba(242,175,198,0.7),
      0 0 90px rgba(242,175,198,0.5),
      0 0 140px rgba(242,175,198,0.3),
      0 0 200px rgba(242,175,198,0.15);
  }

  .attribution {
    margin-top: 30px;
    font-family:'Playfair Display', serif;
    font-style: italic;
    font-size: 18px;
    letter-spacing: 0.18em;
    color: rgba(242,175,198,0.75);
    text-shadow:
      0 0 8px rgba(242,175,198,0.5),
      0 0 18px rgba(242,175,198,0.3);
  }

  /* Badges */
  .badge-fmt {
    position:absolute; top:52px; right:56px;
    font-family:'DM Sans',sans-serif; font-weight:600;
    font-size:11px; letter-spacing:0.35em;
    text-transform:uppercase; color:rgba(242,175,198,0.35); z-index:6;
  }
  .badge-num {
    position:absolute; top:52px; left:56px;
    font-family:'DM Sans',sans-serif; font-weight:300;
    font-size:12px; letter-spacing:0.22em;
    color:rgba(176,176,176,0.22); z-index:6;
  }

  /* Corner accents */
  .c { position:absolute; width:20px; height:20px; }
  .c.tl { top:28px; left:28px; border-top:1px solid rgba(242,175,198,0.38); border-left:1px solid rgba(242,175,198,0.38); }
  .c.tr { top:28px; right:28px; border-top:1px solid rgba(242,175,198,0.38); border-right:1px solid rgba(242,175,198,0.38); }
  .c.bl { bottom:28px; left:28px; border-bottom:1px solid rgba(242,175,198,0.38); border-left:1px solid rgba(242,175,198,0.38); }
  .c.br { bottom:28px; right:28px; border-bottom:1px solid rgba(242,175,198,0.38); border-right:1px solid rgba(242,175,198,0.38); }

  ${SIG_CSS}
</style>
</head><body>
<div class="stage">
  <div class="glow-main"></div>
  <div class="glow-soft"></div>
  <div class="c tl"></div><div class="c tr"></div>
  <div class="c bl"></div><div class="c br"></div>
  <div class="badge-num">No. ${num}</div>
  <div class="badge-fmt">${esc(fmt)}</div>

  <div class="content">
    <div class="flourish"></div>
    <div class="quote-block">${linesHtml}</div>
    ${attribution ? `<div class="attribution">${esc(attribution)}</div>` : ''}
    <div class="flourish-bot"></div>
  </div>

  <div class="sig">&#9825; &mdash; MK &nbsp;|&nbsp; mkparrish.com</div>
</div>
</body></html>`;
}

// ── EDITORIAL template ─────────────────────────────────────────────────────────
function editorialFontSize(lines) {
  const max = Math.max(...lines.map(l => l.length));
  const n = lines.length;
  if (max > 45) return 38;
  if (max > 38) return 46;
  if (n <= 2 && max < 28) return 80;
  if (n <= 2 && max < 38) return 68;
  if (n <= 2) return 58;
  if (n === 3 && max < 28) return 64;
  if (n === 3 && max < 38) return 55;
  if (n === 3) return 48;
  if (n === 4 && max < 24) return 54;
  if (n === 4) return 46;
  return 40;
}

function buildEditorial(post) {
  const { lines, attribution } = parseOnScreen(post['On-Screen Text'] || '');
  const fs = editorialFontSize(lines);
  const num = String(post['Number'] || '').padStart(2, '0');
  const fmt = (post['Format'] || 'Static').toUpperCase();
  const linesHtml = lines.map(l =>
    `<div class="qline">${esc(l)}</div>`
  ).join('');

  return `<!doctype html><html><head><meta charset="utf-8">${FONTS}
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

  .glow-main {
    position:absolute; left:50%; top:44%;
    width:1250px; height:980px;
    transform:translate(-50%,-50%);
    background: radial-gradient(ellipse at center,
      rgba(242,175,198,0.22) 0%,
      rgba(242,175,198,0.08) 38%,
      rgba(242,175,198,0.02) 58%,
      transparent 70%);
    pointer-events:none;
  }
  .glow-floor {
    position:absolute; bottom:-60px; left:50%;
    width:800px; height:350px;
    transform:translateX(-50%);
    background: radial-gradient(ellipse at center,
      rgba(242,175,198,0.07) 0%, transparent 65%);
    pointer-events:none;
  }

  /* Hairline border */
  .frame { position:absolute; inset:30px; border:1px solid rgba(242,175,198,0.13); pointer-events:none; }

  .content {
    position:relative; z-index:2;
    display:flex; flex-direction:column;
    align-items:center; text-align:center;
    padding:0 90px; width:100%;
  }

  /* Diamond accent */
  .diamond {
    width:8px; height:8px;
    background:${PETAL};
    transform:rotate(45deg);
    box-shadow:
      0 0 6px rgba(242,175,198,0.9),
      0 0 14px rgba(242,175,198,0.6);
    margin-bottom:14px;
  }
  .rule-top {
    width:52px; height:1px;
    background:linear-gradient(90deg, transparent, rgba(242,175,198,0.65), transparent);
    margin-bottom:42px;
    margin-top:6px;
  }

  .quote-block {
    display:flex; flex-direction:column;
    align-items:center; gap:4px;
  }
  .qline {
    font-family:'Playfair Display', serif;
    font-style:italic;
    font-weight:500;
    font-size:${fs}px;
    line-height:1.36;
    color:${PEARL};
    text-shadow:
      0 0 10px rgba(242,175,198,0.55),
      0 0 24px rgba(242,175,198,0.38),
      0 0 50px rgba(242,175,198,0.22),
      0 0 90px rgba(242,175,198,0.12);
    max-width:900px;
  }

  .rule-mid {
    width:40px; height:1px;
    background:rgba(242,175,198,0.5);
    margin: 34px 0 20px;
    box-shadow: 0 0 8px rgba(242,175,198,0.4);
  }

  .attribution {
    font-family:'DM Sans', sans-serif;
    font-weight:400;
    font-size:17px;
    letter-spacing:0.28em;
    text-transform:uppercase;
    color:rgba(242,175,198,0.78);
    text-shadow:
      0 0 6px rgba(242,175,198,0.5),
      0 0 14px rgba(242,175,198,0.3);
  }

  .rule-bot {
    width:32px; height:1px;
    background:linear-gradient(90deg,transparent,rgba(242,175,198,0.4),transparent);
    margin-top:40px;
  }

  /* Badges */
  .badge-fmt {
    position:absolute; top:50px; right:56px;
    font-family:'DM Sans',sans-serif; font-weight:600;
    font-size:11px; letter-spacing:0.32em;
    text-transform:uppercase; color:rgba(242,175,198,0.36); z-index:6;
  }
  .badge-num {
    position:absolute; top:50px; left:56px;
    font-family:'Bebas Neue',sans-serif;
    font-size:12px; letter-spacing:0.24em;
    color:rgba(176,176,176,0.24); z-index:6;
  }

  /* Corner accents */
  .c { position:absolute; width:20px; height:20px; }
  .c.tl { top:26px; left:26px; border-top:1px solid rgba(242,175,198,0.35); border-left:1px solid rgba(242,175,198,0.35); }
  .c.tr { top:26px; right:26px; border-top:1px solid rgba(242,175,198,0.35); border-right:1px solid rgba(242,175,198,0.35); }
  .c.bl { bottom:26px; left:26px; border-bottom:1px solid rgba(242,175,198,0.35); border-left:1px solid rgba(242,175,198,0.35); }
  .c.br { bottom:26px; right:26px; border-bottom:1px solid rgba(242,175,198,0.35); border-right:1px solid rgba(242,175,198,0.35); }

  ${SIG_CSS}
</style>
</head><body>
<div class="stage">
  <div class="glow-main"></div>
  <div class="glow-floor"></div>
  <div class="frame"></div>
  <div class="c tl"></div><div class="c tr"></div>
  <div class="c bl"></div><div class="c br"></div>
  <div class="badge-num">No. ${num}</div>
  <div class="badge-fmt">${esc(fmt)}</div>

  <div class="content">
    <div class="diamond"></div>
    <div class="rule-top"></div>
    <div class="quote-block">${linesHtml}</div>
    ${attribution ? `<div class="rule-mid"></div><div class="attribution">${esc(attribution)}</div>` : ''}
    <div class="rule-bot"></div>
  </div>

  <div class="sig">&#9825; &mdash; MK &nbsp;|&nbsp; mkparrish.com</div>
</div>
</body></html>`;
}

// ── Router ─────────────────────────────────────────────────────────────────────
function buildHTML(post) {
  const style = (post['Style'] || 'EDITORIAL').toUpperCase();
  if (style === 'BOLD')   return buildBold(post);
  if (style === 'SCRIPT') return buildScript(post);
  return buildEditorial(post);
}

// ── Main ───────────────────────────────────────────────────────────────────────
const csv   = fs.readFileSync(CSV_PATH, 'utf-8');
const posts = parseCSV(csv);

console.log(`\nGenerating ${posts.length} Instagram posts (bold redesign)...\n`);

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-lcd-text', '--font-render-hinting=none'],
});

async function shoot(html, filename) {
  const page = await browser.newPage();
  // 1080×1080 at 2× = 2160×2160 actual output — crisp on any screen
  await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 350));
  const dest = path.join(OUT, filename);
  await page.screenshot({ path: dest, type: 'png' });
  await page.close();
  const kb = (fs.statSync(dest).size / 1024).toFixed(0);
  console.log(`  ✓  ${filename}  (${kb} kb)`);
}

for (const post of posts) {
  const num      = String(post['Number'] || '').padStart(2, '0');
  const title    = slug(post['Title'] || `post-${num}`);
  const style    = (post['Style'] || 'editorial').toLowerCase();
  const filename = `post-${num}-${style}-${title}.png`;
  const html     = buildHTML(post);
  await shoot(html, filename);
}

await browser.close();
console.log(`\n✓  All ${posts.length} posts saved to output/instagram-v2/\n`);
