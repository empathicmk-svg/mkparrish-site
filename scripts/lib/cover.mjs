/**
 * The one and only book-cover renderer. Used by build-epubs.mjs (embedded EPUB
 * cover) and build-covers.mjs (standalone JPG + PDF covers) so every cover —
 * paperback, eBook, and marketing image — is byte-for-byte identical.
 *
 * The design mirrors mkparrish.com: full-bleed near-black field, petal-pink
 * top hairline + radial glows, Bebas Neue display title with the final word in
 * petal pink, a Playfair-italic tagline, and a JetBrains-Mono byline. Rendered
 * at 1600×2560 (KDP/Kindle cover ratio).
 */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function coverHtml(displayTitle, subtitle) {
  const words = displayTitle.split(/\s+/);
  const last = words.length > 1 ? words.pop() : '';
  const titleHtml = last
    ? `${esc(words.join(' '))} <span class="accent">${esc(last)}</span>`
    : esc(displayTitle);
  const len = displayTitle.length;
  const size = len > 24 ? 104 : len > 17 ? 128 : 150;
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@1,500&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1600px;height:2560px}
.c{width:1600px;height:2560px;background:#0E0E0E;position:relative;display:flex;flex-direction:column;
  justify-content:center;align-items:center;text-align:center;padding:0 160px;overflow:hidden}
.c::before{content:'';position:absolute;inset:0;background:
  radial-gradient(ellipse 95% 55% at 50% -5%, rgba(242,175,198,0.18), transparent 60%),
  radial-gradient(ellipse 60% 45% at 90% 108%, rgba(199,91,120,0.12), transparent 60%)}
.c::after{content:'';position:absolute;top:0;left:0;right:0;height:4px;
  background:linear-gradient(90deg,#4A4A4A,#F2AFC6 50%,#FFD6E4)}
.k{position:relative;font-family:'JetBrains Mono',monospace;font-size:30px;letter-spacing:0.34em;
  text-transform:uppercase;color:#F2AFC6;margin-bottom:72px}
h1{position:relative;font-family:'Bebas Neue',sans-serif;font-weight:400;text-transform:uppercase;
  color:#FAFAF8;font-size:${size}px;line-height:0.9;letter-spacing:0.02em}
h1 .accent{color:#F2AFC6}
.r{position:relative;width:170px;height:2px;margin:64px 0;
  background:linear-gradient(90deg,transparent,#E0869F,#F2AFC6,#FFD6E4,transparent)}
.s{position:relative;font-family:'Playfair Display',serif;font-style:italic;font-weight:500;
  font-size:50px;line-height:1.4;color:rgba(242,175,198,0.85);max-width:22ch}
.by{position:absolute;bottom:140px;left:0;right:0;font-family:'JetBrains Mono',monospace;
  font-size:28px;letter-spacing:0.3em;text-transform:uppercase;color:#9a9a9a}
</style></head><body><div class="c">
<div class="k">MK Parrish &#183; mkparrish.com</div>
<h1>${titleHtml}</h1><div class="r"></div>
${subtitle ? `<p class="s">${esc(subtitle)}</p>` : ''}
<div class="by">MK Parrish</div>
</div></body></html>`;
}

/**
 * Derive the cover's display title + subtitle from a product's markdown front
 * matter, matching build-epubs.mjs/build-downloads.mjs: lift a leading `###`
 * tagline, else split the `# Title: subtitle` colon. opts.title/opts.subtitle
 * win (used by the course and the reinvention workbook).
 */
export function coverFields(raw, opts = {}) {
  const tm = raw.match(/^# (.+)$/m);
  const title = opts.title || (tm ? tm[1] : 'Untitled');
  const working = tm ? raw.replace(/^# .+$\n?/m, '') : raw;
  let subtitle = opts.subtitle || '';
  if (!subtitle) {
    const m = working.match(/^\s*###\s+(.+?)\s*$/m);
    if (m && working.slice(0, m.index).trim() === '') subtitle = m[1];
  }
  let displayTitle = title;
  if (!subtitle) {
    const c = title.indexOf(':');
    if (c > 0) { displayTitle = title.slice(0, c).trim(); subtitle = title.slice(c + 1).trim(); }
  }
  return { title, displayTitle, subtitle };
}
