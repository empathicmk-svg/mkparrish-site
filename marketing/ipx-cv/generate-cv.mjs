import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlFile = `file://${path.join(__dirname, 'mk-parrish-ipx-digital-strategist-cv.html')}`;
const outPng = path.join(__dirname, 'mk-parrish-ipx-digital-strategist-cv.png');
const outPdf = path.join(__dirname, 'mk-parrish-ipx-digital-strategist-cv.pdf');

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-lcd-text'],
});

// ── 1. Render the design to a crisp 2x PNG ──────────────────────────
const page = await browser.newPage();
await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
await page.goto(htmlFile, { waitUntil: 'networkidle0' });
await page.evaluate(async () => { if (document.fonts) await document.fonts.ready; });
await page.screenshot({ path: outPng });
console.log(`✓ PNG:  ${outPng}`);

// ── 2. Embed that PNG full-bleed into an A4 PDF ─────────────────────
// (Rasterizing the approved preview guarantees the PDF matches it exactly —
//  no print-media / font-embedding surprises on a dark, design-heavy page.)
const b64 = readFileSync(outPng).toString('base64');
const pdfPage = await browser.newPage();
await pdfPage.setContent(
  `<!doctype html><html><head><style>
     @page{ size:A4; margin:0; }
     html,body{ margin:0; padding:0; }
     img{ display:block; width:210mm; height:297mm; }
   </style></head>
   <body><img src="data:image/png;base64,${b64}"></body></html>`,
  { waitUntil: 'networkidle0' }
);
await pdfPage.pdf({
  path: outPdf,
  format: 'A4',
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});
console.log(`✓ PDF:  ${outPdf}`);

await browser.close();
