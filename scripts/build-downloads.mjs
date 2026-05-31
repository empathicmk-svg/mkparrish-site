#!/usr/bin/env node
/**
 * Converts product markdown files into branded, self-contained HTML downloads
 * for Gumroad uploads. Run: node scripts/build-downloads.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

function wrap(title, bodyHtml, opts = {}) {
  const { subtitle = '', accent = '#F2AFC6', isCourse = false } = opts;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} — MK Parrish</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
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
    --petal: ${accent};
    --font-display: 'Bebas Neue', sans-serif;
    --font-serif: 'Playfair Display', serif;
    --font-body: 'DM Sans', sans-serif;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { font-size: 17px; }
  body {
    background: var(--void);
    color: var(--pearl);
    font-family: var(--font-body);
    font-weight: 300;
    line-height: 1.75;
    padding: 0;
  }

  /* Cover */
  .cover {
    background: var(--obsidian);
    border-bottom: 1px solid var(--graphite);
    padding: 80px 48px 64px;
    text-align: center;
  }
  .cover-byline {
    font-family: var(--font-display);
    font-size: 0.85rem;
    letter-spacing: 0.25em;
    color: var(--ash);
    text-transform: uppercase;
    margin-bottom: 24px;
  }
  .cover h1 {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 8vw, 5rem);
    letter-spacing: 0.04em;
    color: var(--pearl);
    line-height: 1;
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  .cover h1 em {
    color: var(--petal);
    font-style: normal;
  }
  .cover .subtitle {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 1.1rem;
    color: var(--smoke);
    max-width: 500px;
    margin: 0 auto 32px;
    line-height: 1.6;
  }
  .cover-rule {
    width: 48px;
    height: 1px;
    background: var(--petal);
    margin: 0 auto;
  }

  /* TOC */
  .toc {
    background: var(--carbon);
    border: 1px solid var(--graphite);
    border-radius: 4px;
    padding: 40px 48px;
    margin: 48px auto;
    max-width: 720px;
  }
  .toc h2 {
    font-family: var(--font-display);
    letter-spacing: 0.15em;
    font-size: 0.9rem;
    color: var(--ash);
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  .toc ol { padding-left: 0; list-style: none; }
  .toc ol li { border-bottom: 1px solid var(--graphite); }
  .toc ol li:last-child { border-bottom: none; }
  .toc ol li a {
    display: block;
    padding: 10px 0;
    color: var(--smoke);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.15s;
  }
  .toc ol li a:hover { color: var(--petal); }
  .toc ol li a .toc-num {
    color: var(--iron);
    margin-right: 10px;
    font-variant-numeric: tabular-nums;
  }

  /* Content */
  .content {
    max-width: 720px;
    margin: 0 auto;
    padding: 48px 24px 96px;
  }

  /* Chapter header */
  .chapter-header {
    border-top: 1px solid var(--graphite);
    padding-top: 64px;
    margin-top: 64px;
    margin-bottom: 40px;
  }
  .chapter-header:first-child { margin-top: 0; border-top: none; }
  .chapter-eyebrow {
    font-family: var(--font-display);
    font-size: 0.75rem;
    letter-spacing: 0.25em;
    color: var(--petal);
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  h1 {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 5vw, 3rem);
    letter-spacing: 0.04em;
    line-height: 1.05;
    color: var(--pearl);
    text-transform: uppercase;
    margin: 0 0 16px;
  }
  h2 {
    font-family: var(--font-serif);
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--pearl);
    margin: 48px 0 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--graphite);
  }
  h3 {
    font-family: var(--font-body);
    font-weight: 500;
    font-size: 0.8rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--petal);
    margin: 36px 0 12px;
  }
  p { margin: 0 0 1.2em; color: var(--smoke); }
  strong { color: var(--pearl); font-weight: 500; }
  em { font-style: italic; }
  a { color: var(--petal); text-decoration: none; }
  a:hover { text-decoration: underline; }

  ul, ol {
    padding-left: 1.5em;
    margin: 0 0 1.5em;
    color: var(--smoke);
  }
  li { margin-bottom: 0.5em; }

  blockquote {
    border-left: 2px solid var(--petal);
    margin: 32px 0;
    padding: 16px 24px;
    background: var(--carbon);
    border-radius: 0 4px 4px 0;
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 1.05rem;
    color: var(--pearl);
    line-height: 1.65;
  }

  pre {
    background: var(--carbon);
    border: 1px solid var(--graphite);
    border-radius: 4px;
    padding: 24px;
    overflow-x: auto;
    margin: 24px 0;
  }
  code {
    font-family: 'Courier New', monospace;
    font-size: 0.88rem;
    color: var(--petal);
    line-height: 1.6;
    white-space: pre;
  }
  p > code {
    background: var(--carbon);
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 0.85em;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 24px 0;
    font-size: 0.9rem;
  }
  th {
    text-align: left;
    padding: 10px 12px;
    border-bottom: 1px solid var(--petal);
    color: var(--pearl);
    font-weight: 500;
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  td {
    padding: 10px 12px;
    border-bottom: 1px solid var(--graphite);
    color: var(--smoke);
    vertical-align: top;
  }
  tr:last-child td { border-bottom: none; }

  hr {
    border: none;
    border-top: 1px solid var(--graphite);
    margin: 40px 0;
  }

  /* Footer */
  .footer {
    border-top: 1px solid var(--graphite);
    padding: 40px 24px;
    text-align: center;
    font-size: 0.8rem;
    color: var(--iron);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .footer a { color: var(--ash); }

  /* Print — preserve the dark site design in the PDF */
  @media print {
    @page { margin: 0; }
    html, body { background: var(--void) !important; color: var(--pearl) !important; }
    h1, h2, h3 { break-after: avoid; }
    blockquote, pre, .toc, figure { break-inside: avoid; }
  }
  *, *::before, *::after { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
</style>
</head>
<body>

<div class="cover">
  <div class="cover-byline">MK Parrish · mkparrish.com</div>
  <h1>${title}</h1>
  ${subtitle ? `<p class="subtitle">${subtitle}</p>` : ''}
  <div class="cover-rule"></div>
</div>

<div class="content">
${bodyHtml}
</div>

<div class="footer">
  <p>© MK Parrish · <a href="https://mkparrish.com">mkparrish.com</a> · All rights reserved</p>
</div>

</body>
</html>`;
}

// ── Build individual file ──────────────────────────────────────────────────────

function buildFile(srcPath, destPath, opts = {}) {
  const raw = fs.readFileSync(srcPath, 'utf8');
  // extract h1 title from first line if present
  const titleMatch = raw.match(/^# (.+)$/m);
  const title = opts.title || (titleMatch ? titleMatch[1] : path.basename(srcPath, '.md'));
  const bodyHtml = md(raw);
  const html = wrap(title, bodyHtml, opts);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, html);
  console.log(`  ✓  ${path.relative(ROOT, destPath)}`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

const EBOOKS = [
  ['ebooks/reinvention-workbook.md',          'ebooks/reinvention-workbook.html'],
  ['ebooks/write-yourself-into-the-room.md',  'ebooks/write-yourself-into-the-room.html'],
  ['ebooks/brand-voice-playbook.md',          'ebooks/brand-voice-playbook.html'],
];

const TEMPLATES = [
  ['templates/the-edit-diy.md',            'templates/the-edit-diy.html'],
  ['templates/before-the-session.md',      'templates/before-the-session.html'],
  ['templates/the-rewrite-playbook.md',    'templates/the-rewrite-playbook.html'],
  ['templates/the-new-chapter-workbook.md','templates/the-new-chapter-workbook.html'],
  ['templates/the-byline-method.md',       'templates/the-byline-method.html'],
  ['templates/the-build-copy-guide.md',    'templates/the-build-copy-guide.html'],
];

console.log('\nBuilding ebooks...');
for (const [src, dest] of EBOOKS) {
  buildFile(
    path.join(ROOT, 'products', src),
    path.join(ROOT, 'public/downloads', dest)
  );
}

console.log('\nBuilding templates...');
for (const [src, dest] of TEMPLATES) {
  buildFile(
    path.join(ROOT, 'products', src),
    path.join(ROOT, 'public/downloads', dest)
  );
}

console.log('\nDone. Files written to public/downloads/\n');
