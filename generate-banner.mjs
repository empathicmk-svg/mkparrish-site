import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = `file://${path.join(__dirname, 'linkedin-banner.html')}`;

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1584, height: 396, deviceScaleFactor: 2 });
await page.goto(file, { waitUntil: 'networkidle0' });
await page.screenshot({
  path: path.join(__dirname, 'linkedin-banner.png'),
  clip: { x: 0, y: 0, width: 1584, height: 396 },
});
await browser.close();
console.log('✓ Saved: linkedin-banner.png (3168×792 @2x)');
