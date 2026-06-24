#!/usr/bin/env node
/**
 * Builds KDP paperback full-wrap cover files for the product catalog.
 *
 * Output: public/downloads/covers/<slug>-paperback-cover.{pdf,jpg}
 * Run: node scripts/build-paperback-covers.mjs [filter]
 */
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import { COURSE, courseMarkdown } from './lib/course.mjs';
import { coverFields } from './lib/cover.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'public', 'downloads', 'covers');

const TRIM_WIDTH_IN = 6;
const TRIM_HEIGHT_IN = 9;
const BLEED_IN = 0.125;
const DPI = 300;
const CSS_DPI = 96;
const SPINE_PER_PAGE_IN = 0.002252; // KDP black ink, white paper.

const PRODUCTS = [
  { src: 'ebooks/reinvention-workbook.md', slug: 'reinvention-workbook', pdf: 'ebooks/reinvention-workbook.pdf',
    subtitle: 'A guided writing workbook for people in the middle of becoming someone new.' },
  { src: 'ebooks/write-yourself-into-the-room.md', slug: 'write-yourself-into-the-room', pdf: 'ebooks/write-yourself-into-the-room.pdf' },
  { src: 'ebooks/brand-voice-playbook.md', slug: 'brand-voice-playbook', pdf: 'ebooks/brand-voice-playbook.pdf' },
  { src: 'ebooks/the-invisible-bruise.md', slug: 'the-invisible-bruise', pdf: 'ebooks/the-invisible-bruise.pdf' },
  { src: 'ebooks/decoding-angel-numbers.md', slug: 'decoding-angel-numbers', pdf: 'ebooks/decoding-angel-numbers.pdf' },
  { src: 'ebooks/scripture/the-study.md', slug: 'the-study', pdf: 'ebooks/the-study.pdf' },
  { src: 'ebooks/scripture/gospel-and-grind.md', slug: 'gospel-and-grind', pdf: 'ebooks/gospel-and-grind.pdf' },
  { src: 'ebooks/scripture/the-sermon-notes.md', slug: 'the-sermon-notes', pdf: 'ebooks/the-sermon-notes.pdf' },
  { src: 'ebooks/scripture/the-calling-card.md', slug: 'the-calling-card', pdf: 'ebooks/the-calling-card.pdf' },
  { src: 'ebooks/scripture/ministry-monetized.md', slug: 'ministry-monetized', pdf: 'ebooks/ministry-monetized.pdf' },
  { src: 'templates/the-edit-diy.md', slug: 'the-edit-diy', pdf: 'templates/the-edit-diy.pdf' },
  { src: 'templates/before-the-session.md', slug: 'before-the-session', pdf: 'templates/before-the-session.pdf' },
  { src: 'templates/the-rewrite-playbook.md', slug: 'the-rewrite-playbook', pdf: 'templates/the-rewrite-playbook.pdf' },
  { src: 'templates/the-new-chapter-workbook.md', slug: 'the-new-chapter-workbook', pdf: 'templates/the-new-chapter-workbook.pdf' },
  { src: 'templates/the-byline-method.md', slug: 'the-byline-method', pdf: 'templates/the-byline-method.pdf' },
  { src: 'templates/the-build-copy-guide.md', slug: 'the-build-copy-guide', pdf: 'templates/the-build-copy-guide.pdf' },
  { src: 'templates/the-social-strategy-playbook.md', slug: 'the-social-strategy-playbook', pdf: 'templates/the-social-strategy-playbook.pdf' },
  { src: 'templates/the-prompt-vault.md', slug: 'the-prompt-vault', pdf: 'templates/the-prompt-vault.pdf' },
  { raw: courseMarkdown(ROOT), slug: COURSE.slug, title: COURSE.title, subtitle: COURSE.subtitle, pdf: `${COURSE.slug}.pdf` },
  { src: 'lead-magnets/positioning-checklist.md', slug: 'positioning-checklist', pdf: 'positioning-checklist.pdf' },
  { src: 'bundles/the-vault.md', slug: 'the-vault', pdf: 'the-vault.pdf' },
  { src: 'bundles/the-services-vault.md', slug: 'the-services-vault', pdf: 'the-services-vault.pdf' },
];

const esc = (s) => String(s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

function pageCount(pdfPath) {
  const out = execFileSync('pdfinfo', [pdfPath], { encoding: 'utf8' });
  const match = out.match(/^Pages:\s+(\d+)/m);
  if (!match) throw new Error(`Could not read page count for ${pdfPath}`);
  return Number(match[1]);
}

function plainText(src) {
  return src
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/`(.+?)`/g, '$1');
}

function backCopy(raw) {
  const cleaned = raw
    .replace(/^# .+$/m, '')
    .replace(/^\s*###\s+.+$/m, '')
    .replace(/^\s*\*\*By [^*]+?\*\*\s*$/m, '')
    .replace(/^\s*\*\*(?:Price:\s*)?\$\d[\d,]*(?:\.\d{2})?\*\*\s*$/m, '')
    .replace(/^## Copyright[\s\S]*?(?=^## )/m, '')
    .replace(/^\s*---+\s*$/gm, '')
    .trim();
  const paragraphs = cleaned
    .split(/\n{2,}/)
    .map((p) => plainText(p.replace(/^## .+$/gm, '').replace(/^> ?/gm, '').trim()))
    .filter((p) => p
      && !/^\$/.test(p)
      && !/^website:/i.test(p)
      && !/^copyright/i.test(p)
      && !/^\d+\./m.test(p)
      && !/^\*\*/.test(p));
  return paragraphs.slice(0, 2).join('\n\n');
}

function titleHtml(title) {
  const words = title.split(/\s+/).filter(Boolean);
  const last = words.pop();
  const lead = words.join(' ');
  return `${lead ? `<span>${esc(lead)}</span> ` : ''}<span class="accent">${esc(last || title)}</span>`;
}

function coverHtml(fields, copy, count) {
  const spinePages = count % 2 ? count + 1 : count;
  const spineIn = spinePages * SPINE_PER_PAGE_IN;
  const widthIn = (BLEED_IN * 2) + (TRIM_WIDTH_IN * 2) + spineIn;
  const heightIn = TRIM_HEIGHT_IN + (BLEED_IN * 2);
  const px = (inches) => Math.round(inches * CSS_DPI);
  const spineText = spinePages >= 80;

  return {
    widthIn,
    heightIn,
    widthPx: px(widthIn),
    heightPx: px(heightIn),
    html: `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@1,500;1,700&family=DM+Sans:wght@400;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${px(widthIn)}px;height:${px(heightIn)}px;overflow:hidden}
body{background:#0E0E0E;color:#FAFAF8}
.wrap{position:relative;width:100%;height:100%;background:#0E0E0E;overflow:hidden}
.wrap::before{content:'';position:absolute;inset:0;background:
  radial-gradient(ellipse 68% 48% at 75% 10%,rgba(242,175,198,.22),transparent 58%),
  radial-gradient(ellipse 50% 42% at 4% 95%,rgba(199,91,120,.16),transparent 62%),
  linear-gradient(90deg,rgba(242,175,198,.08),transparent 18%,transparent 82%,rgba(242,175,198,.08))}
.wrap::after{content:'';position:absolute;left:0;right:0;top:0;height:${px(0.018)}px;background:linear-gradient(90deg,#4A4A4A,#F2AFC6 50%,#FFD6E4)}
.panel{position:absolute;top:${px(BLEED_IN)}px;height:${px(TRIM_HEIGHT_IN)}px}
.back{left:${px(BLEED_IN)}px;width:${px(TRIM_WIDTH_IN)}px;padding:${px(0.7)}px ${px(0.55)}px}
.spine{left:${px(BLEED_IN + TRIM_WIDTH_IN)}px;width:${px(spineIn)}px;border-left:1px solid rgba(242,175,198,.28);border-right:1px solid rgba(242,175,198,.28)}
.front{left:${px(BLEED_IN + TRIM_WIDTH_IN + spineIn)}px;width:${px(TRIM_WIDTH_IN)}px;display:flex;align-items:center;justify-content:center;text-align:center;padding:${px(0.62)}px}
.frame{position:absolute;inset:${px(0.23)}px;border:1px solid rgba(242,175,198,.28)}
.kicker,.by,.meta{font-family:'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:.32em;color:#F2AFC6}
.front .kicker{font-size:${px(0.11)}px;margin-bottom:${px(0.34)}px}
h1{font-family:'Bebas Neue',sans-serif;font-weight:400;text-transform:uppercase;letter-spacing:.045em;line-height:.9;font-size:${fields.displayTitle.length > 18 ? px(0.55) : px(0.68)}px}
h1 .accent{color:#F2AFC6}
.heart{width:${px(0.34)}px;height:${px(0.34)}px;margin:${px(0.22)}px auto ${px(0.15)}px;color:#F2AFC6;filter:drop-shadow(0 0 ${px(0.11)}px rgba(242,175,198,.95)) drop-shadow(0 0 ${px(0.28)}px rgba(199,91,120,.5))}
.heart svg{width:100%;height:100%}
.rule{width:${px(0.82)}px;height:${px(0.008)}px;margin:0 auto ${px(0.2)}px;background:linear-gradient(90deg,transparent,#E0869F,#F2AFC6,#FFD6E4,transparent);box-shadow:0 0 ${px(0.11)}px rgba(242,175,198,.35)}
.subtitle{font-family:'Playfair Display',serif;font-style:italic;font-weight:500;color:rgba(242,175,198,.9);font-size:${px(0.2)}px;line-height:1.35;max-width:24ch;margin:0 auto}
.by{position:absolute;left:0;right:0;bottom:${px(0.5)}px;text-align:center;color:#B0B0B0;font-size:${px(0.095)}px}
.back .eyebrow{font-family:'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:.28em;color:#F2AFC6;font-size:${px(0.105)}px;margin-bottom:${px(0.35)}px}
.back h2{font-family:'Bebas Neue',sans-serif;font-weight:400;text-transform:uppercase;letter-spacing:.045em;line-height:.96;color:#FAFAF8;font-size:${px(0.4)}px;margin-bottom:${px(0.25)}px}
.back p{font-family:'DM Sans',sans-serif;font-size:${px(0.135)}px;line-height:1.55;color:#D4D0D0;max-width:42ch;margin-bottom:${px(0.16)}px}
.back .site{position:absolute;left:${px(0.55)}px;bottom:${px(0.62)}px;font-family:'JetBrains Mono',monospace;text-transform:uppercase;letter-spacing:.22em;color:#F2AFC6;font-size:${px(0.09)}px}
.barcode{position:absolute;right:${px(0.46)}px;bottom:${px(0.46)}px;width:${px(1.9)}px;height:${px(1.2)}px;background:#fff;border-radius:${px(0.02)}px}
.spine .spine-title{display:${spineText ? 'flex' : 'none'};position:absolute;inset:${px(0.24)}px 0;align-items:center;justify-content:center;writing-mode:vertical-rl;transform:rotate(180deg);font-family:'Bebas Neue',sans-serif;font-size:${Math.max(9, Math.min(24, px(spineIn * 0.42)))}px;letter-spacing:.08em;text-transform:uppercase;color:#F2AFC6}
</style></head><body><div class="wrap">
  <div class="panel back">
    <div class="eyebrow">MK Parrish</div>
    <h2>${esc(fields.displayTitle)}</h2>
    ${copy.split(/\n{2,}/).map((p) => `<p>${esc(p)}</p>`).join('')}
    <div class="site">mkparrish.com</div>
    <div class="barcode"></div>
  </div>
  <div class="panel spine"><div class="spine-title">${esc(fields.displayTitle)}</div></div>
  <div class="panel front">
    <div class="frame"></div>
    <div>
      <div class="kicker">MK Parrish &#183; mkparrish.com</div>
      <h1>${titleHtml(fields.displayTitle)}</h1>
      <div class="heart"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" stroke="#FAFAF8" stroke-width=".8"/></svg></div>
      <div class="rule"></div>
      ${fields.subtitle ? `<p class="subtitle">${esc(fields.subtitle)}</p>` : ''}
    </div>
    <div class="by">MK Parrish</div>
  </div>
</div></body></html>`,
  };
}

const filter = process.argv[2];
const list = filter ? PRODUCTS.filter((p) => p.slug.includes(filter) || (p.src || '').includes(filter)) : PRODUCTS;

fs.mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors'],
  acceptInsecureCerts: true,
  headless: true,
});
const page = await browser.newPage();

console.log('\nBuilding paperback covers...');
for (const product of list) {
  const pdfPath = path.join(ROOT, 'public', 'downloads', product.pdf);
  if (!fs.existsSync(pdfPath)) {
    console.warn(`  x  missing manuscript PDF: public/downloads/${product.pdf}`);
    continue;
  }
  const raw = product.raw ?? fs.readFileSync(path.join(ROOT, 'products', product.src), 'utf8');
  const fields = coverFields(raw, product);
  const count = pageCount(pdfPath);
  const cover = coverHtml(fields, backCopy(raw), count);
  await page.setViewport({ width: cover.widthPx, height: cover.heightPx, deviceScaleFactor: DPI / CSS_DPI });
  await page.setContent(cover.html, { waitUntil: 'load', timeout: 60000 });
  try { await page.evaluate(() => document.fonts.ready); } catch {}
  await new Promise((r) => setTimeout(r, 200));

  const jpgPath = path.join(OUT, `${product.slug}-paperback-cover.jpg`);
  const pdfOut = path.join(OUT, `${product.slug}-paperback-cover.pdf`);
  await page.screenshot({ path: jpgPath, type: 'jpeg', quality: 95, clip: { x: 0, y: 0, width: cover.widthPx, height: cover.heightPx } });
  await page.pdf({
    path: pdfOut,
    width: `${cover.widthIn}in`,
    height: `${cover.heightIn}in`,
    pageRanges: '1',
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    printBackground: true,
  });
  console.log(`  ✓  covers/${product.slug}-paperback-cover.{pdf,jpg} (${count} pages)`);
}

await browser.close();
console.log('\nDone. Paperback cover wraps written to public/downloads/covers/\n');
