import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = `file://${path.join(__dirname, 'patreon-banner.html')}`;

// Patreon recommended cover photo: 1600×400 — render @2x → 3200×800
const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-lcd-text', '--font-render-hinting=none'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 400, deviceScaleFactor: 2 });
await page.goto(file, { waitUntil: 'networkidle0' });
await page.screenshot({
  path: path.join(__dirname, 'patreon-banner.png'),
  clip: { x: 0, y: 0, width: 1600, height: 400 },
});
await browser.close();
console.log('✓ Saved: patreon-banner.png (3200×800 @2x, upload to Patreon as cover photo)');
