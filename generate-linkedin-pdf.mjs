import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = `file://${path.join(__dirname, 'linkedin-capabilities.html')}`;
const outPng = path.join(__dirname, 'public', 'linkedin-capabilities.png');
const outPdf = path.join(__dirname, 'public', 'linkedin-capabilities.pdf');

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-lcd-text'],
});
const page = await browser.newPage();
// A4 at 96dpi = 794 × 1123px; render @2x
await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
await page.goto(file, { waitUntil: 'networkidle0' });

// PNG preview
await page.screenshot({ path: outPng, fullPage: true });
console.log(`✓ Saved PNG:  ${outPng}`);

// Print-quality PDF (A4, no margins — CSS @page handles it)
await page.pdf({
  path: outPdf,
  format: 'A4',
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});
console.log(`✓ Saved PDF:  ${outPdf}`);
console.log('Upload public/linkedin-capabilities.pdf to host it at /linkedin-capabilities.pdf');

await browser.close();
