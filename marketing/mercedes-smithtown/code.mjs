/**
 * Animated code scenes for the "Code & Chrome" reels (build-vol7.mjs).
 *
 * An editor window in the brand colors types out a short JavaScript snippet,
 * then prints its output. It's rendered frame by frame in Chromium, so the time
 * of every keystroke and printed line is known exactly and the soundtrack can
 * click on each one (scripts/audio/mix-timed.py).
 */
import { execFileSync } from 'child_process';
import path from 'path';
import { VOID, PEARL, SMOKE, PETAL, BASE_CSS, work } from './lib.mjs';

const FPS = 30;

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Runs in the page: a tiny JS highlighter that can draw any prefix of the code.
// Wrapped in a function because setContent keeps the same window, so top-level
// consts from the previous scene would otherwise clash and leave its code on screen.
const HIGHLIGHT = `(() => {
const KW = /^(const|let|var|return|new|function|for|of|if|else|await|async|true|false)\\b/;
const RULES = [
  ['com', /^\\/\\/[^\\n]*/], ['str', /^"[^"\\n]*"?/], ['num', /^\\d[\\d.]*/],
  ['kw', KW], ['fn', /^[A-Za-z_$][\\w$]*(?=\\()/], ['id', /^[A-Za-z_$][\\w$]*/],
  ['nl', /^\\n/], ['p', /^[^\\w\\s"]/], ['sp', /^[ \\t]+/], ['p', /^[\\s\\S]/],
];
function tokenize(src) {
  const out = [];
  while (src) {
    for (const [cls, re] of RULES) {
      const m = src.match(re);
      if (m) { out.push([cls, m[0]]); src = src.slice(m[0].length); break; }
    }
  }
  return out;
}
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const TOKENS = tokenize(window.CODE);
window.show = (n, outLines, cursor) => {
  let html = '', left = n;
  for (const [cls, text] of TOKENS) {
    if (left <= 0) break;
    const part = text.slice(0, left);
    left -= part.length;
    html += cls === 'nl' ? '\\n' : '<span class="' + cls + '">' + esc(part) + '</span>';
  }
  const lines = html.split('\\n');
  document.getElementById('code').innerHTML = lines
    .map((l, i) => '<div class="ln"><i>' + (i + 1) + '</i><span>' + l + (i === lines.length - 1 && cursor ? '<b class="cur"></b>' : '') + '</span></div>')
    .join('');
  document.getElementById('out').innerHTML = window.OUT.slice(0, outLines).map(l => '<div>' + l + '</div>').join('');
  document.getElementById('run').style.opacity = outLines > 0 ? 1 : 0;
};
})();`;

const page = ({ file, cmd }) => `
<div style="width:1080px;height:1920px;position:relative;background:${VOID};overflow:hidden">
  <div style="position:absolute;inset:0;background:radial-gradient(900px 700px at 80% 38%, rgba(255,181,208,.16), transparent 70%),radial-gradient(700px 600px at 10% 80%, rgba(240,240,238,.06), transparent 70%)"></div>
  <div style="position:absolute;inset:0;opacity:.07;background-image:linear-gradient(${PEARL} 1px, transparent 1px),linear-gradient(90deg, ${PEARL} 1px, transparent 1px);background-size:60px 60px"></div>
  <div class="win">
    <div class="bar">
      <span class="dot" style="background:${PETAL}"></span><span class="dot"></span><span class="dot"></span>
      <span class="file">${esc(file)}</span><span class="lang">JS</span>
    </div>
    <div id="code"></div>
    <div id="run"><div class="cmd">$ ${esc(cmd)}</div><div id="out"></div></div>
  </div>
</div>
<style>
  .win { position:absolute; left:40px; right:40px; top:610px; background:rgba(20,20,20,.94); border:1px solid rgba(255,181,208,.35);
         border-radius:22px; box-shadow:0 30px 90px rgba(0,0,0,.6), 0 0 60px rgba(255,181,208,.12); overflow:hidden }
  .bar { display:flex; align-items:center; gap:12px; height:66px; padding:0 26px; background:#121212; border-bottom:1px solid #262626 }
  .dot { width:16px; height:16px; border-radius:50%; background:#3a3a3a }
  .file { margin-left:18px; font:500 24px 'DM Sans'; color:${SMOKE}; letter-spacing:.02em }
  .lang { margin-left:auto; font:700 18px 'DM Sans'; color:${VOID}; background:${PETAL}; padding:3px 10px; border-radius:6px; letter-spacing:.08em }
  #code { padding:26px 24px 18px 12px; font:400 34px/1.55 'DejaVu Sans Mono', monospace; color:${PEARL}; white-space:pre; min-height:120px }
  .ln { display:flex } .ln i { width:54px; flex:none; text-align:right; padding-right:20px; color:#4a4a4a; font-style:normal }
  .kw { color:${PETAL}; font-weight:700 } .str { color:#F9D3E2 } .num { color:#FFFFFF; font-weight:700 }
  .com { color:${SMOKE}; font-style:italic } .fn { color:#FFD9E7 } .id { color:${PEARL} } .p { color:#8d8d8d }
  .cur { display:inline-block; width:17px; height:36px; margin-left:2px; vertical-align:-6px; background:${PETAL} }
  #run { opacity:0; border-top:1px solid #262626; padding:20px 30px 28px; font:400 31px/1.55 'DejaVu Sans Mono', monospace }
  .cmd { color:${SMOKE} } #out { color:${PEARL}; white-space:pre } #out b { color:${PETAL}; font-weight:700 }
</style>`;

/**
 * Render a typing animation to an mp4 that lasts `dur` seconds.
 * `out` lines may contain <b>…</b> for pink highlights.
 * Returns the clip's absolute path plus the keystroke and output times (seconds from its start).
 */
export async function codeClip(browserPage, { name, file, code, out = [], cmd = `node ${file}`, dur, typeShare = 0.55 }) {
  const chars = [...code];
  // Newlines count as a short pause, like a person reaching for the next line.
  const units = chars.reduce((s, c) => s + (c === '\n' ? 4 : 1), 0);
  const typeEnd = dur * typeShare;
  const t0 = 0.25;
  const step = (typeEnd - t0) / units;
  const at = [];
  let clock = t0;
  for (const c of chars) {
    clock += c === '\n' ? step * 4 : step;
    at.push(clock);
  }
  const outGap = Math.min(0.32, (dur - typeEnd - 0.6) / Math.max(1, out.length));
  const outAt = out.map((_, i) => typeEnd + 0.2 + i * outGap);

  await browserPage.setViewportSize({ width: 1080, height: 1920 });
  await browserPage.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${BASE_CSS}</style></head><body>${page({ file, cmd })}
    <script>window.CODE = ${JSON.stringify(code)}; window.OUT = ${JSON.stringify(out)};${HIGHLIGHT}</script></body></html>`, { waitUntil: 'load' });
  await browserPage.evaluate(() => document.fonts.ready);

  const frames = Math.ceil(dur * FPS) + 2;
  const keys = [];
  let shown = 0;
  for (let f = 0; f < frames; f++) {
    const t = f / FPS;
    const n = at.filter(x => x <= t).length;
    // One click per frame that reveals a visible character.
    if (n > shown && chars.slice(shown, n).some(c => c.trim())) keys.push(+t.toFixed(3));
    shown = n;
    const outs = outAt.filter(x => x <= t).length;
    const typing = n < chars.length;
    const cursor = typing || Math.floor(t * 2) % 2 === 0;
    await browserPage.evaluate(([a, b, c]) => window.show(a, b, c), [n, outs, cursor]);
    await browserPage.screenshot({ path: path.join(work, `${name}-f${String(f).padStart(4, '0')}.png`), clip: { x: 0, y: 0, width: 1080, height: 1920 } });
  }
  const clip = path.join(work, `${name}.mp4`);
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-framerate', String(FPS), '-i', path.join(work, `${name}-f%04d.png`),
    '-c:v', 'libx264', '-crf', '18', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-r', String(FPS), clip]);
  return { clip, keys, outs: outAt.map(x => +x.toFixed(3)) };
}
