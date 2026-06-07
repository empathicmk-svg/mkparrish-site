#!/usr/bin/env node
/**
 * Renders each branded HTML download file to a print-quality PDF.
 * Run: node scripts/build-pdfs.mjs
 */
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const FILES = [
  // ebooks
  ['public/downloads/ebooks/reinvention-workbook.html',          'public/downloads/ebooks/reinvention-workbook.pdf'],
  ['public/downloads/ebooks/write-yourself-into-the-room.html',  'public/downloads/ebooks/write-yourself-into-the-room.pdf'],
  ['public/downloads/ebooks/brand-voice-playbook.html',          'public/downloads/ebooks/brand-voice-playbook.pdf'],
  ['public/downloads/ebooks/the-invisible-bruise.html',          'public/downloads/ebooks/the-invisible-bruise.pdf'],
  ['public/downloads/ebooks/decoding-angel-numbers.html',        'public/downloads/ebooks/decoding-angel-numbers.pdf'],
  ['public/downloads/ebooks/the-study.html',                     'public/downloads/ebooks/the-study.pdf'],
  ['public/downloads/ebooks/gospel-and-grind.html',              'public/downloads/ebooks/gospel-and-grind.pdf'],
  ['public/downloads/ebooks/the-sermon-notes.html',              'public/downloads/ebooks/the-sermon-notes.pdf'],
  ['public/downloads/ebooks/the-calling-card.html',              'public/downloads/ebooks/the-calling-card.pdf'],
  ['public/downloads/ebooks/ministry-monetized.html',            'public/downloads/ebooks/ministry-monetized.pdf'],
  // templates
  ['public/downloads/templates/the-edit-diy.html',               'public/downloads/templates/the-edit-diy.pdf'],
  ['public/downloads/templates/before-the-session.html',         'public/downloads/templates/before-the-session.pdf'],
  ['public/downloads/templates/the-rewrite-playbook.html',       'public/downloads/templates/the-rewrite-playbook.pdf'],
  ['public/downloads/templates/the-new-chapter-workbook.html',   'public/downloads/templates/the-new-chapter-workbook.pdf'],
  ['public/downloads/templates/the-byline-method.html',          'public/downloads/templates/the-byline-method.pdf'],
  ['public/downloads/templates/the-build-copy-guide.html',       'public/downloads/templates/the-build-copy-guide.pdf'],
  ['public/downloads/templates/the-social-strategy-playbook.html', 'public/downloads/templates/the-social-strategy-playbook.pdf'],
  // course
  ['public/downloads/scripture-and-strategy.html',               'public/downloads/scripture-and-strategy.pdf'],
];

const browser = await puppeteer.launch({
  // --ignore-certificate-errors lets the Google Fonts stylesheet load even when a
  // network proxy presents an untrusted cert (otherwise fonts silently fall back
  // to system defaults and the PDF loses its branding). Harmless off-proxy.
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors'],
  acceptInsecureCerts: true,
  headless: true,
});

// Give web fonts a beat to finish loading before each PDF is rendered.
async function waitForFonts(page) {
  try { await page.evaluate(() => document.fonts.ready); } catch {}
}

// Optional CLI filter: `node scripts/build-pdfs.mjs reinvention` renders only
// files whose source path contains the argument. No argument renders all.
const only = process.argv[2];
const TARGETS = only ? FILES.filter(([s]) => s.includes(only)) : FILES;
for (const [src, dest] of TARGETS) {
  const srcPath  = path.join(ROOT, src);
  const destPath = path.join(ROOT, dest);
  if (!fs.existsSync(srcPath)) { console.warn(`  ✗  missing: ${src}`); continue; }

  const page = await browser.newPage();
  await page.goto(`file://${srcPath}`, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.pdf({
    path: destPath,
    format: 'Letter',
    margin: { top: '0.6in', right: '0.65in', bottom: '0.6in', left: '0.65in' },
    printBackground: true,
  });
  await page.close();
  const size = (fs.statSync(destPath).size / 1024).toFixed(0);
  console.log(`  ✓  ${dest} (${size}kb)`);
}

await browser.close();
console.log('\nAll PDFs written to public/downloads/\n');
