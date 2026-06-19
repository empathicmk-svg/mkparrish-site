#!/usr/bin/env node
/**
 * Converts product markdown files into branded, self-contained HTML downloads
 * for Gumroad uploads. Run: node scripts/build-downloads.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { COURSE, courseMarkdown } from './lib/course.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// ── Markdown → HTML ──────────────────────────────────────────────────────────

function md(src) {
  let html = src
    // escape stray html
    .replace(/&(?!amp;|lt;|gt;|quot;|#)/g, '&amp;')
    // tables
    .replace(/^\|(.+)\|\n\|[-:| ]+\|\n((?:\|.+\|\n?)+)/gm, (_, head, body) => {
      const th = head.split('|').filter(Boolean).map(c => `<th>${inline(c.trim())}</th>`).join('');
      const rows = body.trim().split('\n').map(row =>
        `<tr>${row.split('|').filter(Boolean).map(c => `<td>${inline(c.trim())}</td>`).join('')}</tr>`
      ).join('\n');
      return `<table><thead><tr>${th}</tr></thead><tbody>${rows}</tbody></table>\n`;
    })
    // fenced code blocks
    .replace(/```[\w]*\n([\s\S]*?)```/gm, (_, code) =>
      `<pre><code>${code.replace(/&amp;/g, '&').replace(/</g, '&lt;')}</code></pre>`)
    // blockquotes
    .replace(/^((?:> .+\n?)+)/gm, block => {
      const inner = block.replace(/^> ?/gm, '').trim();
      return `<blockquote>${inline(inner)}</blockquote>\n`;
    })
    // hr
    .replace(/^---+$/gm, '<hr>')
    // headings
    .replace(/^### (.+)$/gm, (_, t) => `<h3>${inline(t)}</h3>`)
    .replace(/^## (.+)$/gm,  (_, t) => `<h2>${inline(t)}</h2>`)
    .replace(/^# (.+)$/gm,   (_, t) => `<h1>${inline(t)}</h1>`)
    // unordered lists
    .replace(/^((?:[*\-] .+\n?)+)/gm, block => {
      const items = block.trim().split('\n').map(l =>
        `<li>${inline(l.replace(/^[*\-] /, ''))}</li>`).join('');
      return `<ul>${items}</ul>\n`;
    })
    // ordered lists
    .replace(/^((?:\d+\. .+\n?)+)/gm, block => {
      const items = block.trim().split('\n').map(l =>
        `<li>${inline(l.replace(/^\d+\. /, ''))}</li>`).join('');
      return `<ol>${items}</ol>\n`;
    })
    // paragraphs (lines not already wrapped)
    .replace(/^(?!<[a-z]|$)(.+)$/gm, (_, line) => `<p>${inline(line)}</p>`);

  return html;
}

function inline(s) {
  return s
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,     '<em>$1</em>')
    .replace(/`(.+?)`/g,       '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
}

// ── HTML template ─────────────────────────────────────────────────────────────
// Mirrors the live site (mkparrish.com): Bebas Neue / Playfair Display / DM Sans
// / JetBrains Mono on black × pink × white × grey, with pink-gradient rules,
// text-glow, an outlined display word, mono section numbers, and a grain overlay.

function wrap(title, bodyHtml, opts = {}) {
  const { subtitle = '', kicker = 'MK Parrish · mkparrish.com', meta = '', accent = '#F2AFC6', isCourse = false } = opts;

  // Split a "Title: subtitle" headline so the cover gets a punchy display line
  // plus an italic serif descender, the way the live hero is set.
  let coverTitle = title;
  let coverSub = subtitle;
  const colon = title.indexOf(':');
  if (!coverSub && colon > 0) {
    coverTitle = title.slice(0, colon).trim();
    coverSub = title.slice(colon + 1).trim();
  }
  // Outline the final word of the cover title (the site's hero treatment).
  const words = coverTitle.split(' ');
  const lastWord = words.length > 1 ? words.pop() : '';
  const coverTitleHtml = lastWord
    ? `<span class="grad">${words.join(' ')}</span> <span class="outline">${lastWord}</span>`
    : `<span class="grad">${coverTitle}</span>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} — MK Parrish</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,600;1,800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root {
    --void: #080808;
    --obsidian: #111111;
    --carbon: #1A1A1A;
    --graphite: #2C2C2C;
    --iron: #4A4A4A;
    --ash: #7A7A7A;
    --smoke: #B0B0B0;
    --pearl: #F0F0EE;
    --white: #FAFAF8;
    --blush: #FFD6E4;
    --petal: ${accent};
    --rose: #E0869F;
    --carmine: #C75B78;
    --font-display: 'Bebas Neue', Impact, sans-serif;
    --font-serif: 'Playfair Display', Georgia, serif;
    --font-body: 'DM Sans', system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
    /* Reusable gray → pink gradients */
    --grad-pink: linear-gradient(120deg, var(--rose), var(--petal) 55%, var(--blush));
    --grad-rule: linear-gradient(90deg, transparent, var(--petal), transparent);
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { font-size: 17px; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
  body {
    background:
      radial-gradient(ellipse 80% 40% at 50% 0%, rgba(242,175,198,0.06), transparent 60%),
      radial-gradient(ellipse 60% 50% at 100% 100%, rgba(199,91,120,0.05), transparent 55%),
      linear-gradient(180deg, var(--obsidian) 0%, var(--void) 38%);
    background-attachment: fixed;
    color: var(--pearl);
    font-family: var(--font-body);
    font-weight: 300;
    line-height: 1.78;
    position: relative;
  }
  /* Grain overlay — the site's signature texture */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 240px 240px;
    opacity: 0.03;
    pointer-events: none;
    z-index: 9998;
    mix-blend-mode: screen;
  }
  ::selection { background: var(--petal); color: var(--void); }

  /* ── COVER ─────────────────────────────────────────── */
  .cover {
    position: relative;
    background: var(--obsidian);
    border-bottom: 1px solid var(--graphite);
    padding: 104px 48px 84px;
    text-align: center;
    overflow: hidden;
  }
  .cover::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 90% 70% at 50% -10%, rgba(242,175,198,0.20) 0%, transparent 62%),
      radial-gradient(ellipse 50% 50% at 88% 108%, rgba(199,91,120,0.12) 0%, transparent 60%),
      linear-gradient(160deg, rgba(176,176,176,0.06), transparent 45%);
    pointer-events: none;
  }
  /* Thin gray→pink gradient hairline across the very top */
  .cover::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, var(--iron), var(--petal) 50%, var(--blush));
    opacity: 0.7;
  }
  .cover > * { position: relative; z-index: 1; }
  .cover-kicker {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.32em;
    color: var(--petal);
    text-transform: uppercase;
    margin-bottom: 30px;
  }
  .cover h1 {
    font-family: var(--font-display);
    font-size: clamp(2.6rem, 7.5vw, 4.6rem);
    letter-spacing: 0.04em;
    line-height: 0.92;
    text-transform: uppercase;
    margin-bottom: 22px;
    color: var(--white);
  }
  /* Soft gray→white→pink gradient fill on the lead words */
  .cover h1 .grad {
    background: linear-gradient(135deg, var(--pearl) 0%, var(--pearl) 50%, var(--blush) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: var(--pearl);
    filter: drop-shadow(0 0 16px rgba(242,175,198,0.14));
  }
  .cover h1 .outline {
    -webkit-text-stroke: 1px rgba(242,175,198,0.5);
    -webkit-text-fill-color: transparent;
    color: transparent;
  }
  /* Subtitle — matches the live site tagline: Playfair italic, petal */
  .cover .subtitle {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 500;
    font-size: clamp(1.15rem, 2.4vw, 1.5rem);
    color: rgba(242, 175, 198, 0.8);
    max-width: 560px;
    margin: 0 auto 28px;
    line-height: 1.5;
  }
  .cover-rule {
    width: 90px;
    height: 1px;
    margin: 0 auto;
    background: linear-gradient(90deg, transparent, var(--rose), var(--petal), var(--blush), transparent);
  }
  .cover-meta {
    margin-top: 30px;
    font-family: var(--font-mono);
    font-size: 0.66rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--iron);
  }

  /* ── CONTENT ───────────────────────────────────────── */
  .content {
    max-width: 720px;
    margin: 0 auto;
    padding: 64px 24px 96px;
    counter-reset: section;
  }

  h1 {
    font-family: var(--font-display);
    font-size: clamp(1.9rem, 5vw, 3rem);
    letter-spacing: 0.03em;
    line-height: 1.04;
    color: var(--pearl);
    text-transform: uppercase;
    margin: 0 0 18px;
  }

  /* Section headings get an editorial mono counter, like the site's section numbers */
  h2 {
    counter-increment: section;
    font-family: var(--font-display);
    font-size: clamp(1.4rem, 3.3vw, 1.95rem);
    font-weight: 400;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--pearl);
    margin: 68px 0 20px;
    padding-bottom: 14px;
    border-bottom: 1px solid var(--graphite);
    position: relative;
  }
  h2::before {
    content: counter(section, decimal-leading-zero);
    display: block;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.25em;
    margin-bottom: 14px;
    background: linear-gradient(90deg, var(--rose), var(--petal));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: var(--petal);
  }
  h2::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 88px;
    height: 1px;
    background: linear-gradient(90deg, var(--petal), rgba(242,175,198,0));
  }
  /* Sub-section labels — live-site accent: Playfair italic, petal */
  h3 {
    font-family: var(--font-serif);
    font-style: italic;
    font-weight: 600;
    font-size: 1.3rem;
    letter-spacing: 0;
    text-transform: none;
    color: var(--petal);
    margin: 40px 0 12px;
  }
  p { margin: 0 0 1.25em; color: var(--smoke); }
  strong { color: var(--pearl); font-weight: 500; }
  /* Emphasis — live-site accent: Playfair italic, petal */
  em { font-family: var(--font-serif); font-style: italic; color: var(--petal); }
  a { color: var(--petal); text-decoration: none; }
  a:hover { color: var(--blush); text-decoration: underline; }

  ul, ol { padding-left: 1.4em; margin: 0 0 1.6em; color: var(--smoke); }
  li { margin-bottom: 0.55em; padding-left: 0.35em; }
  ul li::marker { color: var(--petal); }
  ol li::marker { color: var(--petal); font-family: var(--font-mono); font-size: 0.85em; }

  blockquote {
    position: relative;
    border-left: 2px solid var(--petal);
    margin: 40px 0;
    padding: 26px 30px 26px 40px;
    background: linear-gradient(110deg, rgba(242,175,198,0.10), rgba(176,176,176,0.04) 55%, transparent 90%);
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 1.08rem;
    color: rgba(242, 175, 198, 0.9);
    line-height: 1.6;
  }
  blockquote::before {
    content: '\\201C';
    position: absolute;
    top: 0.08em;
    left: 0.14em;
    font-family: var(--font-serif);
    font-size: 3rem;
    line-height: 1;
    color: rgba(242,175,198,0.22);
    pointer-events: none;
  }

  pre {
    background: var(--carbon);
    border: 1px solid var(--graphite);
    padding: 24px;
    overflow-x: auto;
    margin: 24px 0;
  }
  code { font-family: var(--font-mono); font-size: 0.86rem; color: var(--petal); white-space: pre; }
  p > code, li > code {
    background: var(--carbon);
    padding: 2px 6px;
    font-size: 0.82em;
  }

  table { width: 100%; border-collapse: collapse; margin: 28px 0; font-size: 0.9rem; }
  thead tr { background: linear-gradient(90deg, rgba(242,175,198,0.12), rgba(176,176,176,0.04) 70%, transparent); }
  th {
    text-align: left;
    padding: 12px 14px;
    border-bottom: 1px solid var(--petal);
    color: var(--white);
    font-family: var(--font-mono);
    font-weight: 500;
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  td { padding: 12px 14px; border-bottom: 1px solid var(--graphite); color: var(--smoke); vertical-align: top; }
  tr:last-child td { border-bottom: none; }

  hr {
    border: none;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--iron) 25%, var(--petal) 50%, var(--iron) 75%, transparent);
    opacity: 0.6;
    margin: 52px 0;
  }

  /* ── FOOTER ────────────────────────────────────────── */
  .footer {
    border-top: 1px solid var(--graphite);
    padding: 48px 24px;
    text-align: center;
    background: var(--obsidian);
  }
  .footer-logo {
    font-family: var(--font-display);
    font-size: 2.5rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--white);
    margin-bottom: 16px;
  }
  .footer-legal {
    font-family: var(--font-mono);
    font-size: 0.64rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--iron);
  }
  .footer-legal a { color: var(--ash); }

  /* ═══════════════════════════════════════════════════════════════
     PRINT EDITION — light, publisher-style layout for the PDF.
     The screen stays dark; the printed book inverts to a white page
     with black header boxes and pink/white titles.
     ═══════════════════════════════════════════════════════════════ */
  @media print {
    @page { margin: 0; }

    html, body {
      background: #ffffff !important;
      color: #232323 !important;
    }
    body::before { display: none !important; }   /* no grain in print */

    /* ── COVER: a full-page black panel on a white sheet ── */
    .cover {
      min-height: 100vh;
      display: flex;
      background: #ffffff !important;
      border-bottom: none;
      padding: 0;
      break-after: page;
    }
    .cover::before, .cover::after { display: none !important; }
    /* The panel fills the printable page and centres the title block,
       instead of floating as a thin band in the middle of the sheet. */
    .cover-inner {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 80px 52px;
      background: #0E0E0E;
      border: 1px solid rgba(242, 175, 198, 0.45);
    }
    .cover-kicker { color: var(--petal); }
    .cover h1 { color: #ffffff; font-size: clamp(3rem, 8vw, 4rem); }
    /* Solid fills only. background-clip:text and text-stroke rasterise as
       opaque boxes / vanish entirely in print — that is what turned the old
       title into a white rectangle. Keep the white + pink two-tone with
       plain fills so it renders identically everywhere. */
    .cover h1 .grad {
      background: none;
      -webkit-background-clip: border-box; background-clip: border-box;
      -webkit-text-fill-color: #ffffff; color: #ffffff;
      filter: none;
    }
    .cover h1 .outline {
      -webkit-text-stroke: 0;
      -webkit-text-fill-color: var(--petal); color: var(--petal);
    }
    .cover .subtitle { color: var(--petal); }
    .cover-meta { color: #B0B0B0; }

    /* ── BODY: black text on white ── */
    .content { padding-top: 64px; color: #232323; }
    p { color: #2b2b2b; }
    /* Black highlighter — strong emphasis & labels ("Instructions:", names) */
    strong {
      background: #0E0E0E;
      color: #FAFAF8;
      font-weight: 600;
      padding: 0.05em 0.34em;
      -webkit-box-decoration-break: clone;
      box-decoration-break: clone;
    }
    a { color: #B23A59; }
    ul li::marker, ol li::marker { color: #B23A59; }

    /* ── SECTION HEADERS: black boxes, pink number + white title ── */
    h2 {
      background: #0E0E0E;
      color: #ffffff;
      padding: 24px 30px;
      margin: 40px 0 42px;
      border: none;
      break-before: page;          /* every Part / section starts a fresh page */
    }
    /* …except the first section, which follows the cover (and any intro/metadata
       block) on page 2 instead of forcing a near-empty page before it. */
    .content h2:first-of-type { break-before: auto; }
    h2::before {
      background: none;
      -webkit-text-fill-color: var(--petal);
      color: var(--petal);
      margin-bottom: 10px;
    }
    h2::after { display: none; }

    /* Exercise titles — pink, with extra breathing room above each */
    h3 { color: #B23A59; margin: 58px 0 18px; }
    /* Petal-pink highlighter — emphasis & labels ("Example:", key words) */
    em {
      background: var(--petal);
      color: #1A1008;
      font-style: italic;
      padding: 0.05em 0.34em;
      -webkit-box-decoration-break: clone;
      box-decoration-break: clone;
    }

    /* ── PULL QUOTES: soft panel, pink rule + mark, dark text ── */
    blockquote {
      background: #F5F2F0;
      border-left: 3px solid #B23A59;
      color: #232323;
    }
    blockquote::before { color: rgba(178, 58, 89, 0.3); }

    /* ── TABLES: black header band ── */
    thead tr { background: #0E0E0E; }
    th { color: #ffffff; border-bottom: 1px solid #0E0E0E; }
    td { color: #2b2b2b; border-bottom: 1px solid #e3e3e3; }

    /* ── CODE: light chip ── */
    pre { background: #f3f3f1; border: 1px solid #e3e3e3; }
    pre code { color: #A8344F; }
    p > code, li > code { background: #f0eeec; color: #A8344F; }

    hr {
      background: linear-gradient(90deg, transparent, #cfcfcf 25%, #B23A59 50%, #cfcfcf 75%, transparent);
      opacity: 1;
    }
    /* The markdown "---" separators always sit just before a section heading,
       and every section already starts a fresh page — so a rule landing right
       before a heading is redundant and can strand alone on a near-empty page.
       Hide those; keep any genuine in-content rule (one not followed by H2). */
    hr:has(+ h2) { display: none; }

    /* ── FOOTER: white page, black signature ── */
    .footer { background: #ffffff; border-top: 1px solid #dddddd; }
    .footer-logo { color: #0A0A0A; }
    .footer-legal { color: #8a8a8a; }
    .footer-legal a { color: #B23A59; }

    /* ── PAGINATION — natural flow; just avoid bad breaks ── */
    h1, h2, h3 { break-after: avoid-page; break-inside: avoid; }
    p, li { orphans: 3; widows: 3; }
    h2, h3, li, tr, blockquote, pre, table, figure, img { break-inside: avoid; }
    ul, ol { break-before: avoid-page; }
    .footer { break-before: avoid-page; }
  }
  *, *::before, *::after { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
</style>
</head>
<body>

<div class="cover">
  <div class="cover-inner">
    <div class="cover-kicker">${kicker}</div>
    <h1>${coverTitleHtml}</h1>
    ${coverSub ? `<p class="subtitle">${coverSub}</p>` : ''}
    <div class="cover-rule"></div>
    ${meta ? `<div class="cover-meta">${meta}</div>` : ''}
  </div>
</div>

<div class="content">
${bodyHtml}
</div>

<div class="footer">
  <div class="footer-logo">MK Parrish</div>
  <p class="footer-legal">© MK Parrish · <a href="https://mkparrish.com">mkparrish.com</a> · All rights reserved</p>
</div>

</body>
</html>`;
}

// ── Build individual file ──────────────────────────────────────────────────────

function buildFile(srcPath, destPath, opts = {}) {
  let raw = fs.readFileSync(srcPath, 'utf8');
  // Pull the title from the first H1, then drop that line from the body so the
  // cover carries the title instead of repeating it as the first heading.
  const titleMatch = raw.match(/^# (.+)$/m);
  const title = opts.title || (titleMatch ? titleMatch[1] : path.basename(srcPath, '.md'));
  if (titleMatch) raw = raw.replace(/^# .+$\n?/m, '');

  // Lift the cover front matter (subtitle + author/price) out of the body so it
  // rides on the cover, the way the Reinvention Workbook does — unless the caller
  // supplied it via opts. Only the block at the very top of the file is touched,
  // so section dividers and emphasis deeper in the document are left alone.
  let { subtitle = '', meta = '' } = opts;
  let lifted = false;
  const atTop = (i) => raw.slice(0, i).trim() === '';
  if (!subtitle) {
    const m = raw.match(/^\s*###\s+(.+?)\s*$/m);
    if (m && atTop(m.index)) {
      subtitle = m[1];
      raw = raw.slice(0, m.index) + raw.slice(m.index + m[0].length);
      lifted = true;
    }
  }
  if (!meta) {
    const bits = [];
    const by = raw.match(/^\s*\*\*By ([^*]+?)\*\*\s*$/m);
    if (by && atTop(by.index)) {
      bits.push('By ' + by[1].trim());
      raw = raw.slice(0, by.index) + raw.slice(by.index + by[0].length);
      lifted = true;
    }
    const price = raw.match(/^\s*\*\*(?:Price:\s*)?(\$\d+)\*\*\s*$/m);
    if (price && atTop(price.index)) {
      bits.push(price[1]);
      raw = raw.slice(0, price.index) + raw.slice(price.index + price[0].length);
      lifted = true;
    }
    // Pattern B front matter — a leading block of "**Key:** value" lines
    // (Format / Price / Length / Audience). Pull the price for the cover meta
    // and strip the whole block so it doesn't leak into the body as gray text.
    if (!bits.length) {
      const metaBlock = raw.match(/^(?:[ \t]*\*\*[^*\n]+:\*\*[^\n]*\n?)+/m);
      if (metaBlock && atTop(metaBlock.index)) {
        const priceM = metaBlock[0].match(/\$\d[\d,]*/);
        if (priceM) bits.push('By MK Parrish', priceM[0]);
        raw = raw.slice(0, metaBlock.index) + raw.slice(metaBlock.index + metaBlock[0].length);
        lifted = true;
      }
    }
    if (bits.length) meta = bits.join(' · ');
  }
  // Remove the horizontal rule that used to divide the front matter from the body.
  if (lifted) raw = raw.replace(/^\s*---\s*$\n?/m, '');

  const bodyHtml = md(raw);
  const html = wrap(title, bodyHtml, { ...opts, subtitle, meta });
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, html);
  console.log(`  ✓  ${path.relative(ROOT, destPath)}`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

const EBOOKS = [
  ['ebooks/reinvention-workbook.md',          'ebooks/reinvention-workbook.html', {
    subtitle: 'A guided writing workbook for people in the middle of becoming someone new.',
    meta:     'By MK Parrish · $18',
  }],
  ['ebooks/write-yourself-into-the-room.md',  'ebooks/write-yourself-into-the-room.html'],
  ['ebooks/brand-voice-playbook.md',          'ebooks/brand-voice-playbook.html'],
  ['ebooks/the-invisible-bruise.md',          'ebooks/the-invisible-bruise.html'],
  ['ebooks/decoding-angel-numbers.md',        'ebooks/decoding-angel-numbers.html'],
  ['ebooks/scripture/the-study.md',           'ebooks/the-study.html'],
  ['ebooks/scripture/gospel-and-grind.md',    'ebooks/gospel-and-grind.html'],
  ['ebooks/scripture/the-sermon-notes.md',    'ebooks/the-sermon-notes.html'],
  ['ebooks/scripture/the-calling-card.md',    'ebooks/the-calling-card.html'],
  ['ebooks/scripture/ministry-monetized.md',  'ebooks/ministry-monetized.html'],
];

// Free lead magnets (the email-capture checklist, etc.) — flat in /downloads.
const LEAD_MAGNETS = [
  ['lead-magnets/positioning-checklist.md', 'positioning-checklist.html', { kicker: 'MK Parrish · Free Resource' }],
];

// Product bundles (The Vault, The Services Vault) — the "what's inside" intro
// ebook that anchors each bundle. Flat in /downloads.
const BUNDLES = [
  ['bundles/the-vault.md',          'the-vault.html'],
  ['bundles/the-services-vault.md', 'the-services-vault.html'],
];

const TEMPLATES = [
  ['templates/the-edit-diy.md',            'templates/the-edit-diy.html'],
  ['templates/before-the-session.md',      'templates/before-the-session.html'],
  ['templates/the-rewrite-playbook.md',    'templates/the-rewrite-playbook.html'],
  ['templates/the-new-chapter-workbook.md','templates/the-new-chapter-workbook.html'],
  ['templates/the-byline-method.md',       'templates/the-byline-method.html'],
  ['templates/the-build-copy-guide.md',    'templates/the-build-copy-guide.html'],
  ['templates/the-social-strategy-playbook.md', 'templates/the-social-strategy-playbook.html'],
];

// Optional CLI filter: `node scripts/build-downloads.mjs reinvention` builds
// only files whose source path contains the argument. No argument builds all.
const only = process.argv[2];
const pick = (list) => (only ? list.filter(([s]) => s.includes(only)) : list);

console.log('\nBuilding ebooks...');
for (const [src, dest, opts] of pick(EBOOKS)) {
  buildFile(
    path.join(ROOT, 'products', src),
    path.join(ROOT, 'public/downloads', dest),
    opts
  );
}

console.log('\nBuilding lead magnets...');
for (const [src, dest, opts] of pick(LEAD_MAGNETS)) {
  buildFile(
    path.join(ROOT, 'products', src),
    path.join(ROOT, 'public/downloads', dest),
    opts
  );
}

console.log('\nBuilding bundles...');
for (const [src, dest, opts] of pick(BUNDLES)) {
  buildFile(
    path.join(ROOT, 'products', src),
    path.join(ROOT, 'public/downloads', dest),
    opts
  );
}

console.log('\nBuilding templates...');
for (const [src, dest, opts] of pick(TEMPLATES)) {
  buildFile(
    path.join(ROOT, 'products', src),
    path.join(ROOT, 'public/downloads', dest),
    opts
  );
}

// Course — assembled from its module files into one gold-standard document.
if (!only || COURSE.slug.includes(only) || only === 'course') {
  console.log('\nBuilding course...');
  const html = wrap(COURSE.title, md(courseMarkdown(ROOT)), {
    subtitle: COURSE.subtitle, meta: COURSE.meta, isCourse: true,
  });
  const dest = path.join(ROOT, 'public/downloads', `${COURSE.slug}.html`);
  fs.writeFileSync(dest, html);
  console.log(`  ✓  ${path.relative(ROOT, dest)}`);
}

console.log('\nDone. Files written to public/downloads/\n');
