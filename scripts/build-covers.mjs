#!/usr/bin/env node
/**
 * Renders a standalone book cover for every product as both a JPG (KDP/Gumroad
 * thumbnail, social) and a single-page PDF (print/marketing). Uses the shared
 * cover renderer in lib/cover.mjs, so these covers are identical to the cover
 * embedded in each EPUB and consistent with the black cover panel on page one
 * of each PDF.
 *
 * Output: public/downloads/covers/<slug>-cover.{jpg,pdf}
 * Run: node scripts/build-covers.mjs [filter]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import { COURSE, courseMarkdown } from './lib/course.mjs';
import { coverHtml, coverFields } from './lib/cover.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'public', 'downloads', 'covers');

// Every product, mirroring build-epubs.mjs. The reinvention workbook and the
// course carry explicit cover copy (their taglines aren't in the body).
const PRODUCTS = [
  { src: 'ebooks/reinvention-workbook.md',           slug: 'reinvention-workbook',
    subtitle: 'A guided writing workbook for people in the middle of becoming someone new.' },
  { src: 'ebooks/write-yourself-into-the-room.md',    slug: 'write-yourself-into-the-room' },
  { src: 'ebooks/brand-voice-playbook.md',            slug: 'brand-voice-playbook' },
  { src: 'ebooks/the-invisible-bruise.md',            slug: 'the-invisible-bruise' },
  { src: 'ebooks/decoding-angel-numbers.md',          slug: 'decoding-angel-numbers' },
  { src: 'ebooks/scripture/the-study.md',             slug: 'the-study' },
  { src: 'ebooks/scripture/gospel-and-grind.md',      slug: 'gospel-and-grind' },
  { src: 'ebooks/scripture/the-sermon-notes.md',      slug: 'the-sermon-notes' },
  { src: 'ebooks/scripture/the-calling-card.md',      slug: 'the-calling-card' },
  { src: 'ebooks/scripture/ministry-monetized.md',    slug: 'ministry-monetized' },
  { src: 'templates/the-edit-diy.md',                 slug: 'the-edit-diy' },
  { src: 'templates/before-the-session.md',           slug: 'before-the-session' },
  { src: 'templates/the-rewrite-playbook.md',         slug: 'the-rewrite-playbook' },
  { src: 'templates/the-new-chapter-workbook.md',     slug: 'the-new-chapter-workbook' },
  { src: 'templates/the-byline-method.md',            slug: 'the-byline-method' },
  { src: 'templates/the-build-copy-guide.md',         slug: 'the-build-copy-guide' },
  { src: 'templates/the-social-strategy-playbook.md', slug: 'the-social-strategy-playbook' },
  { raw: courseMarkdown(ROOT), slug: COURSE.slug, title: COURSE.title, subtitle: COURSE.subtitle },
  { src: 'lead-magnets/positioning-checklist.md', slug: 'positioning-checklist' },
  { src: 'bundles/the-vault.md',                  slug: 'the-vault' },
  { src: 'bundles/the-services-vault.md',         slug: 'the-services-vault' },
];

const filter = process.argv[2];
const list = filter ? PRODUCTS.filter(p => p.slug.includes(filter) || (p.src || '').includes(filter)) : PRODUCTS;

fs.mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors'],
  acceptInsecureCerts: true, headless: true,
});
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 2560, deviceScaleFactor: 1 });

console.log('\nBuilding covers...');
for (const product of list) {
  const raw = product.raw ?? fs.readFileSync(path.join(ROOT, 'products', product.src), 'utf8');
  const { displayTitle, subtitle } = coverFields(raw, product);

  // 'load' + document.fonts.ready: the Google Fonts CDN keep-alive never lets
  // the network go idle, so fonts.ready is the reliable "painted" signal.
  await page.setContent(coverHtml(displayTitle, subtitle), { waitUntil: 'load', timeout: 60000 });
  try { await page.evaluate(() => document.fonts.ready); } catch {}
  await new Promise(r => setTimeout(r, 200));

  const jpgPath = path.join(OUT, `${product.slug}-cover.jpg`);
  const pdfPath = path.join(OUT, `${product.slug}-cover.pdf`);
  await page.screenshot({ path: jpgPath, type: 'jpeg', quality: 92, clip: { x: 0, y: 0, width: 1600, height: 2560 } });
  // Render the PDF against the same (screen) styles the JPG used, so the two match.
  await page.emulateMediaType('screen');
  await page.pdf({ path: pdfPath, width: '1600px', height: '2560px', printBackground: true, pageRanges: '1', margin: { top: 0, right: 0, bottom: 0, left: 0 } });

  const kb = (fs.statSync(jpgPath).size / 1024).toFixed(0);
  console.log(`  ✓  covers/${product.slug}-cover.{jpg,pdf}  (jpg ${kb}kb)`);
}

await browser.close();
console.log(`\nDone. ${list.length} covers written to public/downloads/covers/\n`);
