#!/usr/bin/env node
/**
 * Builds reflowable, KDP-ready EPUB editions of each product, styled to match
 * the print PDFs (Bebas Neue / Playfair Display / DM Sans, black section boxes,
 * petal-pink + black highlighters). Reuses the same markdown parser as
 * build-downloads.mjs so the eBook text matches the paperback exactly. Each
 * cover is rendered from HTML to a Kindle-sized PNG via Puppeteer and embedded.
 *
 * Paperback = the PDFs from build-pdfs.mjs. eBook (Kindle/KDP) = these EPUBs.
 *
 * Run: node scripts/build-epubs.mjs [filter]
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import { COURSE, courseMarkdown } from './lib/course.mjs';
import { coverHtml } from './lib/cover.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const FONTS_DIR = path.join(__dirname, 'assets', 'fonts');
const TMP = path.join(ROOT, '.epub-build');
const PREVIEW = path.join(process.env.HOME, 'Downloads', 'workbook-previews');

// ── Books (mirrors build-downloads.mjs; reinvention carries explicit cover copy
//    because its front matter was lifted out of the markdown) ──────────────────
const BOOKS = [
  { src: 'ebooks/reinvention-workbook.md',           out: 'ebooks/reinvention-workbook.epub',
    subtitle: 'A guided writing workbook for people in the middle of becoming someone new.' },
  { src: 'ebooks/write-yourself-into-the-room.md',    out: 'ebooks/write-yourself-into-the-room.epub' },
  { src: 'ebooks/brand-voice-playbook.md',            out: 'ebooks/brand-voice-playbook.epub' },
  { src: 'ebooks/the-invisible-bruise.md',            out: 'ebooks/the-invisible-bruise.epub' },
  { src: 'ebooks/decoding-angel-numbers.md',          out: 'ebooks/decoding-angel-numbers.epub' },
  { src: 'ebooks/scripture/the-study.md',             out: 'ebooks/the-study.epub' },
  { src: 'ebooks/scripture/gospel-and-grind.md',      out: 'ebooks/gospel-and-grind.epub' },
  { src: 'ebooks/scripture/the-sermon-notes.md',      out: 'ebooks/the-sermon-notes.epub' },
  { src: 'ebooks/scripture/the-calling-card.md',      out: 'ebooks/the-calling-card.epub' },
  { src: 'ebooks/scripture/ministry-monetized.md',    out: 'ebooks/ministry-monetized.epub' },
  { src: 'templates/the-edit-diy.md',                 out: 'templates/the-edit-diy.epub' },
  { src: 'templates/before-the-session.md',           out: 'templates/before-the-session.epub' },
  { src: 'templates/the-rewrite-playbook.md',         out: 'templates/the-rewrite-playbook.epub' },
  { src: 'templates/the-new-chapter-workbook.md',     out: 'templates/the-new-chapter-workbook.epub' },
  { src: 'templates/the-byline-method.md',            out: 'templates/the-byline-method.epub' },
  { src: 'templates/the-build-copy-guide.md',         out: 'templates/the-build-copy-guide.epub' },
  { src: 'templates/the-social-strategy-playbook.md', out: 'templates/the-social-strategy-playbook.epub' },
  { src: 'templates/the-prompt-vault.md',             out: 'templates/the-prompt-vault.epub' },
  { src: 'templates/the-linkedin-bio-fix-kit.md',     out: 'templates/the-linkedin-bio-fix-kit.epub' },
  // Course — assembled from its module files (no single source file).
  { raw: courseMarkdown(ROOT), out: `${COURSE.slug}.epub`, title: COURSE.title, subtitle: COURSE.subtitle },
  // Bundles — the "what's inside" intro ebook for each bundle product.
  { src: 'bundles/the-vault.md',          out: 'the-vault.epub' },
  { src: 'bundles/the-services-vault.md', out: 'the-services-vault.epub' },
];

// ── Markdown → HTML (kept in sync with build-downloads.mjs) ───────────────────
function md(src) {
  return src
    .replace(/&(?!amp;|lt;|gt;|quot;|#)/g, '&amp;')
    .replace(/^\|(.+)\|\n\|[-:| ]+\|\n((?:\|.+\|\n?)+)/gm, (_, head, body) => {
      const th = head.split('|').filter(Boolean).map(c => `<th>${inline(c.trim())}</th>`).join('');
      const rows = body.trim().split('\n').map(row =>
        `<tr>${row.split('|').filter(Boolean).map(c => `<td>${inline(c.trim())}</td>`).join('')}</tr>`).join('\n');
      return `<table><thead><tr>${th}</tr></thead><tbody>${rows}</tbody></table>\n`;
    })
    .replace(/```[\w]*\n([\s\S]*?)```/gm, (_, code) =>
      `<pre><code>${code.replace(/&amp;/g, '&').replace(/</g, '&lt;')}</code></pre>`)
    .replace(/^((?:> .+\n?)+)/gm, block => `<blockquote>${inline(block.replace(/^> ?/gm, '').trim())}</blockquote>\n`)
    .replace(/^---+$/gm, '<hr/>')
    .replace(/^### (.+)$/gm, (_, t) => `<h3>${inline(t)}</h3>`)
    .replace(/^## (.+)$/gm,  (_, t) => `<h2>${inline(t)}</h2>`)
    .replace(/^# (.+)$/gm,   (_, t) => `<h1>${inline(t)}</h1>`)
    .replace(/^((?:[*\-] .+\n?)+)/gm, block =>
      `<ul>${block.trim().split('\n').map(l => `<li>${inline(l.replace(/^[*\-] /, ''))}</li>`).join('')}</ul>\n`)
    .replace(/^((?:\d+\. .+\n?)+)/gm, block =>
      `<ol>${block.trim().split('\n').map(l => `<li>${inline(l.replace(/^\d+\. /, ''))}</li>`).join('')}</ol>\n`)
    .replace(/^(?!<[a-z]|$)(.+)$/gm, (_, line) => `<p>${inline(line)}</p>`);
}
function inline(s) {
  return s
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,     '<em>$1</em>')
    .replace(/`(.+?)`/g,       '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
}
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const xhtmlify = (h) => h.replace(/<(hr|br)\s*>/g, '<$1/>');

// ── Parse front matter the same way build-downloads.mjs does ──────────────────
function parse(raw, opts = {}) {
  const tm = raw.match(/^# (.+)$/m);
  const title = opts.title || (tm ? tm[1] : 'Untitled');
  if (tm) raw = raw.replace(/^# .+$\n?/m, '');
  let subtitle = opts.subtitle || '';
  let lifted = false;
  const atTop = (i) => raw.slice(0, i).trim() === '';
  if (!subtitle) {
    const m = raw.match(/^\s*###\s+(.+?)\s*$/m);
    if (m && atTop(m.index)) { subtitle = m[1]; raw = raw.slice(0, m.index) + raw.slice(m.index + m[0].length); lifted = true; }
  }
  const by = raw.match(/^\s*\*\*By [^*]+?\*\*\s*$/m);
  if (by && atTop(by.index)) { raw = raw.slice(0, by.index) + raw.slice(by.index + by[0].length); lifted = true; }
  const pr = raw.match(/^\s*\*\*(?:Price:\s*)?\$\d+\*\*\s*$/m);
  if (pr && atTop(pr.index)) { raw = raw.slice(0, pr.index) + raw.slice(pr.index + pr[0].length); lifted = true; }
  // Pattern B front matter — strip a leading "**Key:** value" block so the
  // Format/Price/Length/Audience lines don't leak into the eBook body.
  const mb = raw.match(/^(?:[ \t]*\*\*[^*\n]+:\*\*[^\n]*\n?)+/m);
  if (mb && atTop(mb.index)) { raw = raw.slice(0, mb.index) + raw.slice(mb.index + mb[0].length); lifted = true; }
  if (lifted) raw = raw.replace(/^\s*---\s*$\n?/m, '');
  let displayTitle = title;
  if (!subtitle) { const c = title.indexOf(':'); if (c > 0) { displayTitle = title.slice(0, c).trim(); subtitle = title.slice(c + 1).trim(); } }
  return { title, displayTitle, subtitle, body: raw.trim() };
}
function splitSections(body) {
  const re = /^## (.+)$/gm;
  const ms = [...body.matchAll(re)];
  // Strip the trailing "---" that separated this section from the next one —
  // each section is already its own EPUB chapter, so the rule is redundant.
  const trim = (s) => s.trim().replace(/\n*-{3,}\s*$/, '').trim();
  const pre = trim(ms.length ? body.slice(0, ms[0].index) : body);
  const secs = ms.map((m, i) => {
    const s = m.index + m[0].length;
    const e = i + 1 < ms.length ? ms[i + 1].index : body.length;
    return { heading: m[1].trim(), content: trim(body.slice(s, e)) };
  });
  return { pre, secs };
}

// ── Templates ─────────────────────────────────────────────────────────────────
const doc = (title, inner, css = '../style.css') => `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head><meta charset="utf-8"/><title>${esc(title)}</title><link rel="stylesheet" type="text/css" href="${css}"/></head>
<body>
${inner}
</body>
</html>`;

const STYLE = `@font-face{font-family:"Bebas Neue";src:url("fonts/BebasNeue.ttf");font-weight:normal;font-style:normal;}
@font-face{font-family:"Playfair Display";src:url("fonts/PlayfairDisplay.ttf");font-weight:400 900;font-style:normal;}
@font-face{font-family:"Playfair Display";src:url("fonts/PlayfairItalic.ttf");font-weight:400 900;font-style:italic;}
@font-face{font-family:"DM Sans";src:url("fonts/DMSans.ttf");font-weight:100 1000;font-style:normal;}

html,body{margin:0;padding:0;background:#ffffff;color:#232323;font-family:"DM Sans",sans-serif;font-weight:400;line-height:1.7;}
body{padding:1.1em 1em;}

h2.section{background:#0E0E0E;color:#ffffff;font-family:"Bebas Neue",sans-serif;font-weight:normal;
  text-transform:uppercase;letter-spacing:0.04em;line-height:1.04;font-size:1.9em;
  margin:0.2em 0 1.1em;padding:0.66em 0.7em 0.7em;}
h2.section .num{display:block;font-family:"DM Sans",sans-serif;font-weight:700;font-size:0.34em;
  letter-spacing:0.32em;color:#F2AFC6;margin-bottom:0.7em;}
h3{font-family:"Playfair Display",serif;font-style:italic;font-weight:600;font-size:1.3em;
  color:#B23A59;margin:1.6em 0 0.5em;line-height:1.2;}

p{margin:0 0 0.9em;color:#2b2b2b;}
strong{background:#0E0E0E;color:#FAFAF8;font-weight:600;padding:0.04em 0.3em;
  -webkit-box-decoration-break:clone;box-decoration-break:clone;}
em{background:#F2AFC6;color:#1A1008;font-style:italic;padding:0.04em 0.3em;
  -webkit-box-decoration-break:clone;box-decoration-break:clone;}
a{color:#B23A59;text-decoration:none;}
ul,ol{margin:0 0 1.1em;padding-left:1.3em;color:#2b2b2b;}
li{margin-bottom:0.4em;}
li::marker{color:#B23A59;}

blockquote{margin:1.5em 0;padding:0.9em 1.1em;background:#F5F2F0;border-left:3px solid #B23A59;
  font-family:"Playfair Display",serif;font-style:italic;font-size:1.12em;color:#232323;line-height:1.5;}
hr{border:none;border-top:1px solid #e0ddd9;margin:1.8em 0;}
code{font-family:monospace;background:#f0eeec;color:#A8344F;padding:0.1em 0.3em;}

.cover-body{margin:0;padding:0;}
.cover-img{margin:0;padding:0;text-align:center;}
.cover-img img{max-width:100%;}

.title-page{text-align:center;padding-top:24%;}
.tp-kicker{font-family:"DM Sans",sans-serif;font-weight:700;font-size:0.72em;letter-spacing:0.3em;
  text-transform:uppercase;color:#B23A59;margin:0 0 1.4em;}
.title-page h1{font-family:"Bebas Neue",sans-serif;font-weight:normal;text-transform:uppercase;
  font-size:3.1em;line-height:0.96;color:#0E0E0E;margin:0 0 0.5em;}
.tp-sub{font-family:"Playfair Display",serif;font-style:italic;font-size:1.2em;color:#B23A59;
  margin:0 auto 1.8em;max-width:26ch;line-height:1.45;}
.tp-author{font-family:"DM Sans",sans-serif;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;
  font-size:0.78em;color:#666;}

.copyright{font-size:0.82em;color:#777;line-height:1.95;padding-top:30%;}
.copyright strong{background:none;color:#0E0E0E;font-weight:700;padding:0;}`;

// ── Build one EPUB ────────────────────────────────────────────────────────────
async function buildEpub(book, page) {
  // book.raw lets a book be assembled in memory (the course); otherwise read the file.
  const raw = book.raw ?? fs.readFileSync(path.join(ROOT, 'products', book.src), 'utf8');
  const { title, displayTitle, subtitle, body } = parse(raw, book);
  const slug = path.basename(book.out, '.epub');
  const { pre, secs } = splitSections(body);

  const buildDir = path.join(TMP, slug);
  fs.rmSync(buildDir, { recursive: true, force: true });
  fs.mkdirSync(path.join(buildDir, 'OEBPS', 'text'), { recursive: true });
  fs.mkdirSync(path.join(buildDir, 'OEBPS', 'fonts'), { recursive: true });
  fs.mkdirSync(path.join(buildDir, 'META-INF'), { recursive: true });

  // fonts + css
  for (const f of fs.readdirSync(FONTS_DIR)) fs.copyFileSync(path.join(FONTS_DIR, f), path.join(buildDir, 'OEBPS', 'fonts', f));
  fs.writeFileSync(path.join(buildDir, 'OEBPS', 'style.css'), STYLE);

  // cover image
  await page.setViewport({ width: 1600, height: 2560, deviceScaleFactor: 1 });
  // 'load' (not networkidle0): the Google Fonts CDN keep-alive connection keeps
  // the network from ever going idle on a reused page. document.fonts.ready is
  // the reliable signal that the webfonts have actually painted.
  await page.setContent(coverHtml(displayTitle, subtitle), { waitUntil: 'load', timeout: 60000 });
  try { await page.evaluate(() => document.fonts.ready); } catch {}
  await new Promise(r => setTimeout(r, 200));
  const coverPng = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: 1600, height: 2560 } });
  fs.writeFileSync(path.join(buildDir, 'OEBPS', 'cover.png'), coverPng);

  // spine pieces
  const files = []; // {id, href, title, inToc}
  const add = (id, name, titleText, inner, inToc) => {
    fs.writeFileSync(path.join(buildDir, 'OEBPS', 'text', name), doc(titleText, inner));
    files.push({ id, href: `text/${name}`, title: titleText, inToc });
  };

  // cover.xhtml
  fs.writeFileSync(path.join(buildDir, 'OEBPS', 'text', 'cover.xhtml'),
    doc('Cover', `<div class="cover-img"><img src="../cover.png" alt="${esc(title)} cover"/></div>`).replace('<body>', '<body class="cover-body">'));

  // title + copyright
  add('titlepage', 'title.xhtml', 'Title Page',
    `<div class="title-page"><p class="tp-kicker">MK Parrish &#183; mkparrish.com</p>` +
    `<h1>${esc(title)}</h1>` +
    (subtitle ? `<p class="tp-sub">${esc(subtitle)}</p>` : '') +
    `<p class="tp-author">By MK Parrish</p></div>`, false);
  add('copyright', 'copyright.xhtml', 'Copyright',
    `<p class="copyright"><strong>${esc(title.toUpperCase())}</strong><br/>` +
    `Copyright &#169; ${new Date().getFullYear()} MK Parrish. All rights reserved.<br/><br/>` +
    `No part of this publication may be reproduced, distributed, or transmitted in any form ` +
    `or by any means without the prior written permission of the author.<br/><br/>mkparrish.com</p>`, false);

  // optional intro/details block (content before first ## — e.g. Pattern-B metadata)
  if (pre) add('details', 'details.xhtml', 'About', `<div class="details">${xhtmlify(md(pre))}</div>`, false);

  // numbered sections
  secs.forEach((s, i) => {
    const nn = String(i + 1).padStart(2, '0');
    const inner = `<h2 class="section"><span class="num">${nn}</span>${esc(s.heading)}</h2>\n${xhtmlify(md(s.content))}`;
    add(`sec${i + 1}`, `sec${i + 1}.xhtml`, s.heading, inner, true);
  });

  // content.opf
  const modified = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
  const manifestItems = [
    `<item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>`,
    `<item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>`,
    `<item id="css" href="style.css" media-type="text/css"/>`,
    `<item id="cover-image" href="cover.png" media-type="image/png" properties="cover-image"/>`,
    `<item id="cover" href="text/cover.xhtml" media-type="application/xhtml+xml"/>`,
    ...fs.readdirSync(path.join(buildDir, 'OEBPS', 'fonts')).map((f, i) =>
      `<item id="font${i}" href="fonts/${f}" media-type="font/ttf"/>`),
    ...files.map(f => `<item id="${f.id}" href="${f.href}" media-type="application/xhtml+xml"/>`),
  ].join('\n    ');
  const spine = [`<itemref idref="cover"/>`, ...files.map(f => `<itemref idref="${f.id}"/>`)].join('\n    ');
  const opf = `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid" xml:lang="en">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="bookid">urn:uuid:mkparrish-${slug}</dc:identifier>
    <dc:title>${esc(title)}</dc:title>
    <dc:creator>MK Parrish</dc:creator>
    <dc:language>en</dc:language>
    <dc:publisher>MK Parrish</dc:publisher>
    <dc:description>${esc(subtitle || title)}</dc:description>
    <meta property="dcterms:modified">${modified}</meta>
    <meta name="cover" content="cover-image"/>
  </metadata>
  <manifest>
    ${manifestItems}
  </manifest>
  <spine toc="ncx">
    ${spine}
  </spine>
</package>`;
  fs.writeFileSync(path.join(buildDir, 'OEBPS', 'content.opf'), opf);

  // nav.xhtml + toc.ncx (chapters = the numbered sections)
  const chapters = files.filter(f => f.inToc);
  const navList = chapters.map(f => `      <li><a href="${f.href}">${esc(f.title)}</a></li>`).join('\n');
  fs.writeFileSync(path.join(buildDir, 'OEBPS', 'nav.xhtml'), `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="en" lang="en">
<head><meta charset="utf-8"/><title>Contents</title><link rel="stylesheet" type="text/css" href="style.css"/></head>
<body>
  <nav epub:type="toc" id="toc"><h2 class="section"><span class="num">&#8212;</span>Contents</h2>
    <ol>
${navList}
    </ol>
  </nav>
</body>
</html>`);
  const navPoints = chapters.map((f, i) => `    <navPoint id="np${i + 1}" playOrder="${i + 1}">
      <navLabel><text>${esc(f.title)}</text></navLabel>
      <content src="${f.href}"/>
    </navPoint>`).join('\n');
  fs.writeFileSync(path.join(buildDir, 'OEBPS', 'toc.ncx'), `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head><meta name="dtb:uid" content="urn:uuid:mkparrish-${slug}"/></head>
  <docTitle><text>${esc(title)}</text></docTitle>
  <navMap>
${navPoints}
  </navMap>
</ncx>`);

  // container + mimetype
  fs.writeFileSync(path.join(buildDir, 'META-INF', 'container.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles>
</container>`);
  fs.writeFileSync(path.join(buildDir, 'mimetype'), 'application/epub+zip');

  // zip: mimetype first (stored), then the rest (deflated)
  const outPath = path.join(ROOT, 'public', 'downloads', book.out);
  fs.rmSync(outPath, { force: true });
  execSync(`zip -X -0 "${outPath}" mimetype`, { cwd: buildDir, stdio: 'ignore' });
  execSync(`zip -X -rg9 "${outPath}" META-INF OEBPS -x '*.DS_Store'`, { cwd: buildDir, stdio: 'ignore' });

  // drop a copy + the cover image into the preview folder
  fs.mkdirSync(PREVIEW, { recursive: true });
  fs.copyFileSync(outPath, path.join(PREVIEW, path.basename(book.out)));
  fs.writeFileSync(path.join(PREVIEW, `${slug}-cover.png`), coverPng);

  const kb = (fs.statSync(outPath).size / 1024).toFixed(0);
  console.log(`  ✓  ${book.out} (${kb}kb, ${secs.length} chapters)`);
}

// ── Main ──────────────────────────────────────────────────────────────────────
const filter = process.argv[2];
const list = filter ? BOOKS.filter(b => (b.src || b.out).includes(filter)) : BOOKS;

const browser = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors'],
  acceptInsecureCerts: true, headless: true,
});
const page = await browser.newPage();
console.log('\nBuilding EPUBs...');
for (const book of list) {
  try { await buildEpub(book, page); }
  catch (e) { console.error(`  ✗  ${book.out}: ${e.message}`); }
}
await browser.close();
fs.rmSync(TMP, { recursive: true, force: true });
console.log('\nDone. EPUBs written to public/downloads/ (+ copies in ~/Downloads/workbook-previews/)\n');
