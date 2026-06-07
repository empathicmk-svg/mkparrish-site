/**
 * Inline Google Fonts as base64 data URIs so Puppeteer renders never touch the
 * network. This makes image generation fast and crash-resistant: no per-page
 * font fetch (~5s each over a proxy), no TLS-cert stalls, no flaky "Target
 * closed" crashes from slow network teardown.
 *
 * Pass the same Google Fonts css2 URL the scripts already use; get back a
 * self-contained <style> block to drop into the HTML <head> in place of the
 * <link> tags. Downloaded fonts are cached on disk so repeat runs are instant.
 */
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __dirname  = path.dirname(fileURLToPath(import.meta.url));
const CACHE_DIR  = path.join(__dirname, '..', '..', 'output', '.font-cache');

// A real browser UA so Google serves modern woff2 files.
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`${res.status} fetching ${url}`);
  return res.text();
}

async function fetchBuffer(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`${res.status} fetching ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

/**
 * @param {string} css2Url  e.g. https://fonts.googleapis.com/css2?family=...
 * @returns {Promise<string>} a <style> block with @font-face data: URIs
 */
export async function inlineGoogleFonts(css2Url) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });

  const key       = crypto.createHash('md5').update(css2Url).digest('hex').slice(0, 12);
  const cachePath = path.join(CACHE_DIR, `${key}.css`);

  if (fs.existsSync(cachePath)) {
    return `<style>\n${fs.readFileSync(cachePath, 'utf-8')}\n</style>`;
  }

  let css = await fetchText(css2Url);

  // Replace every remote gstatic url(...) with an inlined base64 data URI.
  const urls = [...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map(m => m[1]);
  const seen = new Map();
  for (const url of urls) {
    if (seen.has(url)) continue;
    const buf  = await fetchBuffer(url);
    const data = `data:font/woff2;base64,${buf.toString('base64')}`;
    seen.set(url, data);
  }
  for (const [url, data] of seen) {
    css = css.split(url).join(data);
  }

  fs.writeFileSync(cachePath, css);
  return `<style>\n${css}\n</style>`;
}
