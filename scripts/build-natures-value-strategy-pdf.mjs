// Renders the /natures-value strategy page to a US Letter PDF that keeps the
// site's dark theme and type system, with links pointed at mkparrish.com.
//
//   npx next build && npx next start -p 3123
//   node scripts/build-natures-value-strategy-pdf.mjs [http://localhost:3123]

import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = process.argv[2] || "http://localhost:3123";
const out = path.join(__dirname, "..", "public", "resumes", "natures-value", "mk-parrish-amazon-strategy-natures-value.pdf");

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage({ viewport: { width: 1100, height: 1400 } });
await page.goto(`${base}/natures-value`, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.emulateMedia({ media: "screen" });
await page.evaluate(() => {
  for (const a of document.querySelectorAll("a[href^='/']")) a.href = `https://www.mkparrish.com${a.getAttribute("href")}`;
});
await page.addStyleTag({
  content: `
    @page { size: Letter; margin: 0.35in 0; }
    html, body, .min-h-screen { background: #080808 !important; }
    section { break-inside: avoid-page; }
    section > div > div, li { break-inside: avoid; }
  `,
});
await page.pdf({ path: out, format: "Letter", printBackground: true, scale: 0.72, margin: { top: "0.35in", bottom: "0.35in" } });
await browser.close();
console.log(`✓ ${path.relative(process.cwd(), out)}`);
