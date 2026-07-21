import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = `file://${path.join(__dirname, 'mk-parrish-ipx-digital-strategist-cv.html')}`;
const outPng = path.join(__dirname, 'mk-parrish-ipx-digital-strategist-cv.png');
const outPdf = path.join(__dirname, 'mk-parrish-ipx-digital-strategist-cv.pdf');

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-lcd-text'],
});
const page = await browser.newPage();
await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
await page.goto(file, { waitUntil: 'networkidle0' });
await page.evaluate(async () => { if (document.fonts) await document.fonts.ready; });

await page.screenshot({ path: outPng });
console.log(`✓ PNG:  ${outPng}`);

await page.pdf({
  path: outPdf,
  format: 'A4',
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});
console.log(`✓ PDF:  ${outPdf}`);

await browser.close();
