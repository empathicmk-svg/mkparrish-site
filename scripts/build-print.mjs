#!/usr/bin/env node
/**
 * Builds Lulu-ready print files for the paperback editions:
 *   public/downloads/print/<slug>-interior.pdf   (clean 6x9 book block)
 *   public/downloads/print/<slug>-cover.pdf       (wraparound: back + spine + front)
 *
 * The interior is a real book interior: half-title, title page, copyright page,
 * then chapters (each ## starts a new page). No screen-cover panel. Back-matter
 * "Notes" pages are auto-added so every title clears Lulu's perfect-bind minimum
 * (a longer book like the memoir needs none). The wraparound cover spine is
 * computed from the actual final interior page count.
 *
 * Run: node scripts/build-print.mjs [filter]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import { inlineGoogleFonts } from './lib/inline-fonts.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'public', 'downloads', 'print');
const COVERS = path.join(ROOT, 'public', 'downloads', 'covers');

const FONTS = await inlineGoogleFonts(
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap'
);

const SPINE_PER_PAGE = 0.0025; // Lulu 60# cream uncoated, inches per page
const TRIM_W = 6, TRIM_H = 9, BLEED = 0.125;
const MIN_PAGES = 38; // comfortably above Lulu's 32-page perfect-bind floor
const YEAR = new Date().getFullYear();

const BOOKS = [
  { slug: 'rebecoming', src: 'ebooks/rebecoming.md',
    blurb: 'A luminous, present-tense memoir about fear, faith, and the courage to walk through a door you were told was not for you. In thirteen chapters, MK Parrish moves from a rainy set of church steps to a roomful of women who became the great loves of her life, and takes apart, gently, the lie that any of it was ever off-limits to you. A book about losing your fear without losing yourself, and becoming the latest model of the person you always were.' },
  { slug: 'still-here-still-hers', src: 'ebooks/still-here-still-hers.md',
    blurb: 'For the woman who is not healed yet, but is tired of abandoning herself while she waits. A raw essay collection about grief, heartbreak, father loss, body shame, and the private work of rebuilding when your life does not look the way you thought it would. This is the in-between book: recognition from the floor, before the comeback becomes clean.' },
  { slug: 'street-smarts', src: 'ebooks/street-smarts.md',
    blurb: 'A father, a daughter, and an education that came too late. Built from 1,109 text messages and the eleven months that finally gave MK a father after twenty-five years of silence, Street Smarts is a raw memoir about grief, survival, and the strange lessons love gives you after it is already gone.' },
  { slug: 'the-meantime', src: 'ebooks/the-meantime.md',
    blurb: 'You are not behind. You are becoming. A reflective memoir for anyone measuring their life against a clock they never chose to wind. Weaving Stoic philosophy, Kierkegaard, Nietzsche, Frankl, and Rilke together with the research on the social clock, comparison, and impermanence, The Meantime takes apart the myth of falling behind and rebuilds it into peace: the quiet, strategic patience of a life that is temporary, already moving, and — in a time that is not the clock\'s time — falling into place.' },
  { slug: 'the-redesign-playbook', src: 'templates/the-redesign-playbook.md',
    blurb: 'Your website is not a brochure. It is your hardest-working salesperson. The Redesign Playbook is the self-guided system behind MK Parrish\'s website work: audit a slow, dated, or off-brand site across performance, clarity, mobile, and conversion, then rebuild it in the right order — message first, structure second, design third, speed last. Includes the four-part audit, the page architecture, the mobile-first and conversion principles, and a full launch checklist for a site that finally earns its keep.' },
  { slug: 'make-my-own-light', src: 'ebooks/make-my-own-light.md',
    blurb: 'Poems from the dark, and the turning toward. Make My Own Light is a compact collection about grief, fear, faith, father loss, and the stubborn decision to keep breathing. For anyone reading in the dark and reaching for the first honest flame.' },
  { slug: 'write-yourself-into-the-room', src: 'ebooks/write-yourself-into-the-room.md',
    blurb: 'You were always qualified for the room. You just were not legible yet. A complete, example-rich guide to positioning, bios, and the voice that makes the right people stop and read, so you stop sounding like everyone else and start sounding like the only option. Includes a three-layer positioning framework, before-and-after bio templates, a LinkedIn audit, and a thirty-day plan.' },
  { slug: 'reinvention-workbook', src: 'ebooks/reinvention-workbook.md',
    blurb: 'You are not lost. You are between drafts. Thirty guided writing exercises for the gap between the person you were and the one arriving, an honest, unhurried practice for becoming someone new, one true sentence at a time. Audit the old story, find your voice, and write the new draft forward.' },
  { slug: 'brand-voice-playbook', src: 'ebooks/brand-voice-playbook.md',
    blurb: 'Most brands sound like a committee average. Yours will not. A roll-up-your-sleeves playbook for building a brand voice document from scratch: voice foundation, tone mapping, vocabulary, voice capture, two complete worked examples, team rollout, and a fill-in template, so your brand sounds like one specific, recognizable person no matter who is holding the keyboard.' },
  { slug: 'the-invisible-bruise', src: 'ebooks/the-invisible-bruise.md',
    blurb: 'Emotional abuse leaves no visible mark. The Invisible Bruise names what happened with tenderness and precision, then helps the reader begin trusting her own reality again. A healing guide for the person who became very good at being fine, and is ready to write a life no longer arranged around someone else\'s control.' },
  { slug: 'decoding-angel-numbers', src: 'ebooks/decoding-angel-numbers.md',
    blurb: 'A skeptic\'s guide to spiritual curiosity. Decoding Angel Numbers is not a magical glossary; it is a grounded practice of attention, discernment, and meaning-making for readers who keep noticing patterns and want to stay curious without surrendering their common sense.' },
  { slug: 'the-linkedin-bio-fix-kit', src: 'templates/the-linkedin-bio-fix-kit.md',
    blurb: 'Fix the first thing everyone reads about you, in fifteen minutes. Three headline formulas, a fill-in About template, fifteen swipe-file opening lines, a banned-words list, and a fast checklist, so your LinkedIn finally sounds like the person doing the work.' },
  { slug: 'the-edit-diy', src: 'templates/the-edit-diy.md',
    blurb: 'The same eye MK brings to client copy, translated into a framework you can run yourself. A copy audit checklist, word-level edits for brand-voice alignment, and the line-edit method used in real client work, for bios, emails, LinkedIn, and landing pages.' },
  { slug: 'before-the-session', src: 'templates/before-the-session.md',
    blurb: 'The pre-work that turns a strategy session into something you actually use. An identity and positioning self-audit, the brand-clarity questions that change how you see yourself, and a goal-setting framework, so you arrive ready instead of figuring it out out loud.' },
  { slug: 'the-rewrite-playbook', src: 'templates/the-rewrite-playbook.md',
    blurb: 'The Rewrite service, packaged as a self-guided overhaul. A full story audit for your career and pivot narrative, every LinkedIn section covered, bio templates with real examples, and a positioning-statement builder, for the executive, founder, or career-changer ready to do the work.' },
  { slug: 'the-new-chapter-workbook', src: 'templates/the-new-chapter-workbook.md',
    blurb: 'What it looks like to reposition a brand from the inside out. A brand audit and positioning map, page-by-page website copy architecture, a voice and messaging framework, and a full launch checklist, for a complete and intentional reset.' },
  { slug: 'the-byline-method', src: 'templates/the-byline-method.md',
    blurb: 'The voice-capture and ghostwriting framework, documented for the first time. The interview questions used with every client, a tone-calibration guide across formats, and a writing-in-voice method, for writers, content leads, and founders who write as someone else.' },
  { slug: 'the-build-copy-guide', src: 'templates/the-build-copy-guide.md',
    blurb: 'The website copy framework behind The Build. Page-by-page architecture for home, about, services, and contact, headline and subheadline formulas, a CTA guide that converts without pressure, and a pre-launch review checklist, so every word on the site does work.' },
  { slug: 'the-social-strategy-playbook', src: 'templates/the-social-strategy-playbook.md',
    blurb: 'Build a content strategy you will actually use. A content-pillar framework tied to real authority, brand-voice calibration for each platform, a thirty-day sprint template, and a posting system that does not depend on inspiration, the method behind The Social Suite.' },
  { slug: 'the-prompt-vault', src: 'templates/the-prompt-vault.md',
    blurb: 'Stop shipping the average of the internet. Forty-plus copy-paste prompts for positioning, bios, website copy, content, and email, the voice-capture prompt that makes AI sound like you, and edit prompts that kill the dead giveaways of AI, engineered so the machine drafts in your voice.' },
];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const inline = (s) => esc(s)
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/\*(.+?)\*/g, '<em>$1</em>')
  .replace(/`(.+?)`/g, '<code>$1</code>');

function bodyHtml(md) {
  const lines = md.split('\n');
  let out = '';
  let para = [];
  let list = null;
  const flushPara = () => { if (para.length) { out += `<p>${inline(para.join(' '))}</p>\n`; para = []; } };
  const flushList = () => { if (list) { out += `</${list}>\n`; list = null; } };
  for (let raw of lines) {
    const line = raw.replace(/\s+$/, '');
    if (/^## /.test(line)) { flushPara(); flushList(); out += `<h2 class="chap">${inline(line.slice(3))}</h2>\n`; continue; }
    if (/^### /.test(line)) { flushPara(); flushList(); out += `<h3>${inline(line.slice(4))}</h3>\n`; continue; }
    if (/^#### /.test(line)) { flushPara(); flushList(); out += `<h4>${inline(line.slice(5))}</h4>\n`; continue; }
    if (/^> /.test(line)) { flushPara(); flushList(); out += `<blockquote>${inline(line.slice(2))}</blockquote>\n`; continue; }
    if (/^[-*] /.test(line)) { flushPara(); if (list !== 'ul') { flushList(); out += '<ul>\n'; list = 'ul'; } out += `<li>${inline(line.slice(2))}</li>\n`; continue; }
    if (/^\d+\. /.test(line)) { flushPara(); if (list !== 'ol') { flushList(); out += '<ol>\n'; list = 'ol'; } out += `<li>${inline(line.replace(/^\d+\.\s/, ''))}</li>\n`; continue; }
    if (/^\s*---+\s*$/.test(line)) { flushPara(); flushList(); out += '<hr>\n'; continue; }
    if (line.trim() === '') { flushPara(); flushList(); continue; }
    if (/^\|/.test(line)) { continue; }
    para.push(line.trim());
  }
  flushPara(); flushList();
  return out;
}

function notesPages(n) {
  if (n <= 0) return '';
  const lines = Array.from({ length: 20 }, () => '<div class="nl"></div>').join('');
  let out = `<h2 class="chap">Notes</h2><div class="notes">${lines}</div>`;
  for (let i = 1; i < n; i++) out += `<div class="notespage"><div class="notes">${lines}</div></div>`;
  return out;
}

function interiorHtml(title, subtitle, toc, body, notes) {
  return `<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>
@page { size: ${TRIM_W}in ${TRIM_H}in; margin: 0.8in 0.65in 0.8in 0.8in; }
*{box-sizing:border-box;}
html,body{margin:0;padding:0;}
body{font-family:'DM Sans',sans-serif;font-size:11.5pt;line-height:1.62;color:#161616;}
p{margin:0;text-align:justify;text-indent:1.3em;orphans:2;widows:2;}
h2.chap + p,h3 + p,blockquote + p,hr + p{text-indent:0;}
.halftitle{height:7.4in;display:flex;align-items:center;justify-content:center;text-align:center;}
.halftitle h1{font-family:'Bebas Neue',sans-serif;font-weight:400;text-transform:uppercase;font-size:30pt;letter-spacing:0.04em;color:#0E0E0E;margin:0;}
.titlepage{break-before:page;height:7.4in;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;}
.titlepage h1{font-family:'Bebas Neue',sans-serif;font-weight:400;text-transform:uppercase;font-size:48pt;line-height:0.95;letter-spacing:0.02em;margin:0;color:#0E0E0E;}
.titlepage .sub{font-family:'Playfair Display',serif;font-style:italic;font-size:15pt;color:#7a2540;margin-top:0.28in;max-width:4in;}
.titlepage .by{font-family:'DM Sans',sans-serif;font-size:11pt;letter-spacing:0.18em;text-transform:uppercase;margin-top:0.55in;color:#444;}
.copyright{break-before:page;height:7.4in;display:flex;flex-direction:column;justify-content:flex-end;font-size:8.5pt;color:#444;line-height:1.6;}
.copyright p{text-indent:0;text-align:left;}
h2.chap{break-before:page;font-family:'Bebas Neue',sans-serif;font-weight:400;text-transform:uppercase;font-size:26pt;letter-spacing:0.03em;color:#0E0E0E;margin:0 0 0.3in;padding-top:1.5in;line-height:1;}
h3{font-family:'Playfair Display',serif;font-style:italic;font-weight:600;font-size:14pt;color:#7a2540;margin:0.26in 0 0.07in;}
h4{font-family:'DM Sans',sans-serif;font-weight:600;font-size:11.5pt;margin:0.18in 0 0.04in;}
blockquote{margin:0.2in 0.3in;font-family:'Playfair Display',serif;font-style:italic;font-size:12.5pt;color:#333;border-left:2px solid #c9879b;padding-left:0.2in;}
blockquote p{text-indent:0;}
ul,ol{margin:0.12in 0 0.12in 0.32in;padding:0;}
li{margin:0.05in 0;}
code{font-family:'DM Sans',monospace;font-size:0.9em;}
hr{border:none;text-align:center;margin:0.22in 0;}
hr:after{content:'\\2766';color:#c9879b;font-size:13pt;}
strong{background:#0E0E0E;color:#FAFAF8;font-weight:600;padding:0.02em 0.2em;-webkit-box-decoration-break:clone;box-decoration-break:clone;}
em{background:#E7E7E7;color:#1A1008;font-style:italic;padding:0.02em 0.18em;-webkit-box-decoration-break:clone;box-decoration-break:clone;}
blockquote em{background:none;color:inherit;padding:0;}
.toc{break-before:page;padding-top:1.1in;}
.toc h1{font-family:'Bebas Neue',sans-serif;font-weight:400;text-transform:uppercase;font-size:26pt;letter-spacing:0.04em;color:#0E0E0E;margin:0 0 0.32in;}
.toc ol{list-style:none;margin:0;padding:0;border-top:1px solid #cfcfcf;}
.toc li{border-bottom:1px solid #e3e3e3;padding:0.11in 0.02in;font-family:'DM Sans',sans-serif;font-size:11pt;color:#222;text-indent:0;text-align:left;}
.toc .n{color:#B23A59;font-family:'DM Sans',sans-serif;font-weight:600;font-size:9pt;margin-right:0.3in;letter-spacing:0.05em;}
.notespage{break-before:page;}
.notes{margin-top:0.2in;}
.nl{border-bottom:1px solid #d9d9d9;height:0.34in;}
</style></head><body>
<div class="halftitle"><h1>${esc(title)}</h1></div>
<div class="titlepage"><h1>${esc(title)}</h1>${subtitle ? `<div class="sub">${esc(subtitle)}</div>` : ''}<div class="by">MK Parrish</div></div>
<div class="copyright">
<p>Copyright &copy; ${YEAR} MK Parrish. All rights reserved.</p>
<p>No part of this book may be reproduced in any form without written permission from the author, except brief quotations in a review.</p>
<p>mkparrish.com</p>
<p>First edition, ${YEAR}.</p>
</div>
${toc && toc.length ? `<div class="toc"><h1>Contents</h1><ol>${toc.map((t, i) => `<li><span class="n">${String(i + 1).padStart(2, '0')}</span>${esc(t)}</li>`).join('')}</ol></div>` : ''}
${body}
${notesPages(notes)}
</body></html>`;
}

function coverHtml(slug, title, blurb, spine) {
  const fullW = (BLEED + TRIM_W + spine + TRIM_W + BLEED).toFixed(3);
  const fullH = (TRIM_H + BLEED * 2).toFixed(3);
  const jpg = fs.readFileSync(path.join(COVERS, slug + '-cover.jpg')).toString('base64');
  const frontImg = `data:image/jpeg;base64,${jpg}`;
  return `<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>
@page { size: ${fullW}in ${fullH}in; margin:0; }
*{box-sizing:border-box;margin:0;padding:0;}
html,body{width:${fullW}in;height:${fullH}in;}
.wrap{width:${fullW}in;height:${fullH}in;background:#0E0E0E;display:flex;}
.back{width:${(BLEED + TRIM_W).toFixed(3)}in;height:100%;padding:${(BLEED + 0.55).toFixed(3)}in 0.55in 0.6in ${(BLEED + 0.55).toFixed(3)}in;display:flex;flex-direction:column;}
.spine{width:${spine}in;height:100%;background:#0E0E0E;}
.front{width:${(TRIM_W + BLEED).toFixed(3)}in;height:100%;background-image:url('${frontImg}');background-size:cover;background-position:center;}
.bk-top{flex:0 0 auto;font-family:'Bebas Neue',sans-serif;color:#F2AFC6;text-transform:uppercase;letter-spacing:0.16em;font-size:11pt;}
.bk-blurb{flex:1 1 auto;display:flex;align-items:center;}
.bk-blurb p{font-family:'Playfair Display',serif;color:#FAFAF8;font-size:11.5pt;line-height:1.55;}
.bk-foot{flex:0 0 auto;}
.bk-title{font-family:'Bebas Neue',sans-serif;color:#FAFAF8;text-transform:uppercase;font-size:17pt;letter-spacing:0.03em;line-height:1;}
.bk-by{font-family:'DM Sans',sans-serif;color:#B0B0B0;font-size:9pt;letter-spacing:0.18em;text-transform:uppercase;margin-top:0.08in;}
.bk-site{font-family:'DM Sans',sans-serif;color:#F2AFC6;font-size:8.5pt;letter-spacing:0.14em;text-transform:uppercase;margin-top:0.16in;}
.rule{width:0.7in;height:2px;background:#F2AFC6;margin:0.14in 0;}
</style></head><body>
<div class="wrap">
  <div class="back">
    <div class="bk-top">MK Parrish &#183; mkparrish.com</div>
    <div class="bk-blurb"><p>${esc(blurb)}</p></div>
    <div class="bk-foot">
      <div class="rule"></div>
      <div class="bk-title">${esc(title)}</div>
      <div class="bk-by">MK Parrish</div>
      <div class="bk-site">mkparrish.com</div>
    </div>
  </div>
  <div class="spine"></div>
  <div class="front"></div>
</div>
</body></html>`;
}

const pageCount = (pdfPath) => {
  const d = fs.readFileSync(pdfPath).toString('latin1');
  const m = [...d.matchAll(/\/Count\s+(\d+)/g)].map(x => +x[1]);
  return m.length ? Math.max(...m) : 0;
};

async function renderInterior(browser, html, dest) {
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'load', timeout: 60000 });
  try { await page.evaluate(() => document.fonts.ready); } catch {}
  await page.pdf({ path: dest, width: `${TRIM_W}in`, height: `${TRIM_H}in`, printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await page.close();
  return pageCount(dest);
}

fs.mkdirSync(OUT, { recursive: true });
const filter = process.argv[2];
const list = filter ? BOOKS.filter(b => b.slug.includes(filter)) : BOOKS;

const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: true });

console.log('\nBuilding print files...');
for (const book of list) {
  const raw = fs.readFileSync(path.join(ROOT, 'products', book.src), 'utf8');
  const title = (raw.match(/^# (.+)$/m) || [, 'Untitled'])[1];
  const subtitle = (raw.match(/^### (.+)$/m) || [, ''])[1];
  let body = raw
    .replace(/^# .+$/m, '')
    .replace(/^### .+$/m, '')
    .replace(/^\*\*By .+\*\*$/m, '')
    .replace(/^\*\*\$.+\*\*$/m, '');
  const bHtml = bodyHtml(body);
  const chapters = [...body.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
  const interiorPath = path.join(OUT, `${book.slug}-interior.pdf`);

  // Pass 1: no notes, count the content pages.
  let pages = await renderInterior(browser, interiorHtml(title, subtitle, chapters, bHtml, 0), interiorPath);
  // Pass 2: add back-matter notes pages if needed to clear the print minimum.
  let added = 0;
  if (pages < MIN_PAGES) {
    added = MIN_PAGES - pages;
    pages = await renderInterior(browser, interiorHtml(title, subtitle, chapters, bHtml, added), interiorPath);
  }

  const spine = Math.max(0.06, +(pages * SPINE_PER_PAGE).toFixed(3));
  const cpage = await browser.newPage();
  await cpage.setContent(coverHtml(book.slug, title, book.blurb, spine), { waitUntil: 'load', timeout: 60000 });
  try { await cpage.evaluate(() => document.fonts.ready); } catch {}
  await new Promise(r => setTimeout(r, 150));
  const coverPath = path.join(OUT, `${book.slug}-cover.pdf`);
  const fullW = (BLEED + TRIM_W + spine + TRIM_W + BLEED).toFixed(3);
  const fullH = (TRIM_H + BLEED * 2).toFixed(3);
  await cpage.pdf({ path: coverPath, width: `${fullW}in`, height: `${fullH}in`, printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await cpage.close();

  console.log(`  ✓  ${book.slug}: interior ${pages}pp${added ? ` (+${added} notes)` : ''}, spine ${spine}in, cover ${fullW}x${fullH}in`);
}

await browser.close();
console.log(`\nDone. Print files in public/downloads/print/\n`);
