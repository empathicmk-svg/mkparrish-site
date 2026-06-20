/**
 * The one and only book-cover renderer. Used by build-epubs.mjs (embedded EPUB
 * cover) and build-covers.mjs (standalone JPG + PDF covers) so every cover —
 * paperback, eBook, and marketing image — is byte-for-byte identical.
 *
 * The design mirrors mkparrish.com: full-bleed near-black field, petal-pink
 * top hairline + radial glows, Bebas Neue display title with the final word in
 * petal pink, a Playfair-italic tagline, and a JetBrains-Mono byline. Rendered
 * at 1600x2560 (KDP/Kindle cover ratio).
 */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function balancedTitleLines(title) {
  const words = title.split(/\s+/).filter(Boolean);
  if (words.length <= 2) return [words];
  const lineCount = words.length > 5 ? 3 : 2;
  const totalChars = words.join('').length;
  const target = Math.ceil(totalChars / lineCount);
  const lines = [];
  let current = [];
  let currentLen = 0;
  for (const word of words) {
    const projected = currentLen + word.length;
    const remainingWords = words.length - lines.flat().length - current.length;
    if (current.length && projected > target && lines.length < lineCount - 1 && remainingWords > 1) {
      lines.push(current);
      current = [word];
      currentLen = word.length;
    } else {
      current.push(word);
      currentLen += word.length;
    }
  }
  if (current.length) lines.push(current);
  return lines;
}

export function coverHtml(displayTitle, subtitle) {
  const lines = balancedTitleLines(displayTitle);
  const longest = Math.max(...lines.map((line) => line.join(' ').length));
  const size = longest > 26 ? 124 : longest > 20 ? 140 : longest > 14 ? 164 : 186;
  const titleHtml = lines.map((line, lineIndex) => {
    const words = line.map((word, wordIndex) => {
      const isFinalWord = lineIndex === lines.length - 1 && wordIndex === line.length - 1;
      return `<span class="word${isFinalWord ? ' accent' : ''}">${esc(word)}</span>`;
    }).join(' ');
    return `<span class="title-line">${words}</span>`;
  }).join('');
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@1,500&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1600px;height:2560px}
.c{width:1600px;height:2560px;background:#0E0E0E;position:relative;display:flex;flex-direction:column;
  justify-content:center;align-items:center;text-align:center;padding:132px 132px;overflow:hidden}
.c::before{content:'';position:absolute;inset:0;background:
  radial-gradient(ellipse 94% 46% at 50% -6%, rgba(242,175,198,0.22), transparent 60%),
  radial-gradient(ellipse 60% 45% at 90% 108%, rgba(199,91,120,0.14), transparent 60%),
  linear-gradient(90deg,rgba(242,175,198,0.08),transparent 18%,transparent 82%,rgba(242,175,198,0.08))}
.c::after{content:'';position:absolute;top:0;left:0;right:0;height:4px;
  background:linear-gradient(90deg,#4A4A4A,#F2AFC6 50%,#FFD6E4)}
.frame{position:absolute;inset:72px 72px;border:1px solid rgba(242,175,198,0.28)}
.frame::before,.frame::after{content:'';position:absolute;left:86px;right:86px;height:1px;
  background:linear-gradient(90deg,transparent,rgba(242,175,198,0.42),transparent)}
.frame::before{top:118px}.frame::after{bottom:118px}
.k{position:relative;font-family:'JetBrains Mono',monospace;font-size:30px;letter-spacing:0.34em;
  text-transform:uppercase;color:#F2AFC6;margin-bottom:64px}
h1{position:relative;font-family:'Bebas Neue',sans-serif;font-weight:400;text-transform:uppercase;
  color:#FAFAF8;font-size:${size}px;line-height:0.88;letter-spacing:0.045em;width:100%;max-width:1320px;
  display:flex;flex-direction:column;align-items:center;gap:0.03em}
.title-line{display:block;text-align:center;white-space:nowrap;max-width:100%}
.word{display:inline}
h1 .accent{color:#F2AFC6}
.heart-mark{position:relative;width:94px;height:94px;margin:48px auto 38px;
  filter:drop-shadow(0 0 34px rgba(242,175,198,0.95)) drop-shadow(0 0 88px rgba(199,91,120,0.5))}
.heart-mark::before{content:'';position:absolute;inset:-76px;border-radius:50%;
  background:radial-gradient(circle,rgba(242,175,198,0.2),rgba(242,175,198,0.07) 34%,transparent 68%);
  z-index:-1}
.heart-mark svg{width:100%;height:100%}
.r{position:relative;width:220px;height:2px;margin:0 auto 36px;
  background:linear-gradient(90deg,transparent,#E0869F,#F2AFC6,#FFD6E4,transparent);
  box-shadow:0 0 28px rgba(242,175,198,0.35)}
.s{position:relative;font-family:'Playfair Display',serif;font-style:italic;font-weight:500;
  font-size:48px;line-height:1.35;color:rgba(242,175,198,0.88);max-width:25ch}
.by{position:absolute;bottom:140px;left:0;right:0;font-family:'JetBrains Mono',monospace;
  font-size:28px;letter-spacing:0.3em;text-transform:uppercase;color:#B0B0B0}
</style></head><body><div class="c">
<div class="frame"></div>
<div class="k">MK Parrish &#183; mkparrish.com</div>
<h1>${titleHtml}</h1>
<div class="heart-mark"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#F2AFC6" stroke="#FAFAF8" stroke-width="0.8"/>
</svg></div><div class="r"></div>
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
