#!/usr/bin/env node
/**
 * Neon quote posts from MK's own books and poems (scripts/neon-quotes.mjs).
 *
 * Each quote is a neon sign on a dark brick wall: white tubes, the key line in
 * hot pink, a pink tube frame and a soft pink wash that grows as the sign
 * lights. For every quote it renders:
 *   • feed/NN-slug.jpg     1080×1350 (rendered @2x) for the Instagram feed
 *   • stills/NN-slug.jpg   1080×1920, fully lit, for a cover or photo post
 *   • reels/NN-slug.mp4    1080×1920, ~8.5s: the frame strikes, each line
 *                          flickers on with a zap, the pink line stutters
 *                          once, then the sign hums over MK's "soft" bed
 * plus posts.json and CAPTIONS.md with the captions, links and hashtags.
 *
 * Typefaces match mkparrish.com: the quote glows in Playfair Display italic,
 * the name is Bebas Neue and the small print is DM Sans.
 *
 * Run:  PUPPETEER_EXECUTABLE_PATH=/path/to/chrome node scripts/build-neon-quotes.mjs [slug ...] [--no-video]
 * Needs ffmpeg, numpy (for scripts/audio/mix-timed.py) and output/audio/soft.wav.
 */
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import { inlineGoogleFonts } from './lib/inline-fonts.mjs';
import { NEON_QUOTES } from './neon-quotes.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'output', 'neon-quotes');
const FPS = 30;

const args = process.argv.slice(2);
const withVideo = !args.includes('--no-video');
const only = args.filter((a) => !a.startsWith('--'));

// ── Typeface ─────────────────────────────────────────────────────────────────
// The website's own fonts (app/globals.css): Playfair Display italic for the
// quote, Bebas Neue for the name, DM Sans for the small print.
const FONTS = await inlineGoogleFonts('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@1,500;1,600&family=DM+Sans:wght@500;600&display=swap');
const SERIF = "'Playfair Display', Georgia, serif";
const DISPLAY = "'Bebas Neue', Impact, sans-serif";
const BODY = "'DM Sans', system-ui, sans-serif";

// ── Template ─────────────────────────────────────────────────────────────────
const FORMATS = {
  reel: { w: 1080, h: 1920, frame: 64, pad: 120, size: 118, maxH: 880, kicker: 250, foot: 330, from: 26 },
  feed: { w: 1080, h: 1350, frame: 48, pad: 120, size: 104, maxH: 660, kicker: 120, foot: 112, from: 24 },
};
const BRICK = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='168' height='76'><g fill='none' stroke='%23ffffff' stroke-width='2'><path d='M0 1H168M0 39H168M1 1V39M85 39V76'/></g></svg>\")";
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** state: { frame: tube frame lit?, lit: how many lines are lit, pinkOff: pink lines dark for a stutter } */
function html(q, format, state) {
  const f = FORMATS[format];
  const glow = state.frame ? 0.06 + 0.16 * (state.lit / q.lines.length) : 0.012;
  const lines = q.lines
    .map((text, i) => {
      const pink = q.pink.includes(i);
      const on = i < state.lit && !(pink && state.pinkOff);
      return `<div class="l${on ? ` on ${pink ? 'p' : 'w'}` : ''}">${esc(text)}</div>`;
    })
    .join('');
  return `<!doctype html><html><head><meta charset="utf-8">${FONTS}<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${f.w}px;height:${f.h}px;overflow:hidden;background:#07050a}
.wall,.brick,.wash,.vig{position:absolute;inset:0}
.wall{background:linear-gradient(180deg,#0b080e 0%,#07050a 55%,#040305 100%)}
.brick{opacity:.06;background-image:${BRICK};background-size:168px 76px}
.wash{background:radial-gradient(ellipse 62% 42% at 50% 47%,rgba(255,45,149,${glow.toFixed(3)}) 0%,rgba(255,45,149,${(glow * 0.35).toFixed(3)}) 45%,transparent 75%)}
.vig{background:radial-gradient(ellipse at center,transparent 50%,rgba(0,0,0,.72) 100%)}
.frame{position:absolute;inset:${f.frame}px;border-radius:46px;border:5px solid rgba(255,255,255,.06)}
.frame.on{border-color:#ffd3ea;box-shadow:0 0 3px #fff,0 0 12px #ff5fb0,0 0 30px #ff2d95,0 0 64px rgba(255,45,149,.6),inset 0 0 12px #ff5fb0,inset 0 0 34px rgba(255,45,149,.45)}
.kicker{position:absolute;top:${f.kicker}px;left:0;right:0;text-align:center;font:400 36px/1 ${DISPLAY};letter-spacing:.3em;color:#8a8a8a}
.stage{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0 ${f.pad}px}
.q{width:100%;display:flex;flex-direction:column;align-items:center}
.l{white-space:nowrap;font-family:${SERIF};font-style:italic;font-weight:600;font-size:${f.size}px;line-height:1.2;color:rgba(255,255,255,.085);text-shadow:0 0 1px rgba(255,255,255,.1)}
.l.on.w{color:#ffffff;text-shadow:0 0 2px #fff,0 0 7px #fff,0 0 16px rgba(255,240,248,.9),0 0 34px rgba(255,190,225,.55),0 0 70px rgba(255,95,176,.35)}
.l.on.p{color:#ff8fca;text-shadow:0 0 2px #ffe0f0,0 0 6px #ff6fbc,0 0 14px #ff2d95,0 0 28px #ff2d95,0 0 54px #ff1f8e,0 0 110px rgba(255,31,142,.85)}
.from{margin-top:1.3em;font:600 ${f.from}px/1 ${BODY};letter-spacing:.34em;text-transform:uppercase;color:rgba(242,175,198,${state.frame ? 0.9 : 0.25})}
.foot{position:absolute;bottom:${f.foot}px;left:0;right:0;display:flex;flex-direction:column;align-items:center;gap:22px}
.heart{font:600 50px/1 ${BODY};color:rgba(255,255,255,.08)}
.heart.on{color:#ffe2f1;text-shadow:0 0 4px #fff,0 0 12px #ff5fb0,0 0 28px #ff2d95,0 0 54px #ff2d95}
.handle{font:600 21px/1 ${BODY};letter-spacing:.32em;text-transform:uppercase;color:#6c6c6c}
</style></head><body>
<div class="wall"></div><div class="brick"></div><div class="wash"></div><div class="vig"></div>
<div class="frame${state.frame ? ' on' : ''}"></div>
<div class="kicker">MK Parrish</div>
<div class="stage"><div class="q">${lines}</div><div class="from">— ${esc(q.from)}</div></div>
<div class="foot"><div class="heart${state.frame ? ' on' : ''}">♡</div><div class="handle">@mk_parrish · mkparrish.com</div></div>
</body></html>`;
}

// ── Rendering ────────────────────────────────────────────────────────────────
const browser = await puppeteer.launch({
  headless: true,
  executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none'],
});

/** Renders one state and returns its PNG path. Lines shrink together until every one fits. */
async function shoot(q, format, state, file, scale = 1) {
  const f = FORMATS[format];
  const page = await browser.newPage();
  await page.setViewport({ width: f.w, height: f.h, deviceScaleFactor: scale });
  await page.setContent(html(q, format, state), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate((maxH) => {
    const q = document.querySelector('.q');
    const lines = [...q.querySelectorAll('.l')];
    let size = parseFloat(getComputedStyle(lines[0]).fontSize);
    while (size > 40 && (lines.some((l) => l.scrollWidth > q.clientWidth) || q.scrollHeight > maxH)) {
      size -= 2;
      lines.forEach((l) => { l.style.fontSize = `${size}px`; });
    }
  }, f.maxH);
  await page.screenshot({ path: file, type: 'png' });
  await page.close();
  return file;
}

const ff = (...a) => execFileSync('ffmpeg', ['-v', 'error', '-y', ...a]);

/** Builds the flicker-on timeline: [stateIndex, seconds][] plus zap times and when the hum starts. */
function timeline(n) {
  const seq = [];
  const zaps = [];
  let t = 0;
  const hold = (s, d) => { seq.push([s, d]); t += d; };
  const strike = (from, to, rest) => {
    zaps.push(t); hold(to, 0.05); hold(from, 0.05);
    zaps.push(t); hold(to, 0.04); hold(from, 0.09);
    zaps.push(t); hold(to, rest);
  };
  hold(0, 0.5);
  strike(0, 1, 0.45);
  const humFrom = t;
  for (let k = 1; k <= n; k++) strike(k, k + 1, 0.42);
  hold(n + 1, 1.6);
  const full = n + 1;
  const stutter = n + 2;
  zaps.push(t); hold(stutter, 0.06); hold(full, 0.05); hold(stutter, 0.05);
  zaps.push(t); hold(full, 3.0);
  return { seq, zaps, humFrom, duration: t };
}

async function buildReel(q, name, tmp) {
  const n = q.lines.length;
  const states = [{ frame: false, lit: 0 }];
  for (let k = 0; k <= n; k++) states.push({ frame: true, lit: k });
  states.push({ frame: true, lit: n, pinkOff: true });
  const pngs = [];
  for (const [i, s] of states.entries()) pngs.push(await shoot(q, 'reel', s, path.join(tmp, `${name}-s${i}.png`)));

  const { seq, zaps, humFrom, duration } = timeline(n);
  const list = seq.map(([s, d]) => `file '${pngs[s]}'\nduration ${d.toFixed(3)}`).join('\n') + `\nfile '${pngs[seq.at(-1)[0]]}'\n`;
  const listFile = path.join(tmp, `${name}.txt`);
  fs.writeFileSync(listFile, list);
  const frames = Math.round(duration * FPS);
  const silent = path.join(tmp, `${name}-v.mp4`);
  ff('-f', 'concat', '-safe', '0', '-i', listFile,
    '-vf', `fps=${FPS},scale=2160:3840:flags=lanczos,zoompan=z='1+0.035*on/${frames}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1080x1920:fps=${FPS},format=yuv420p`,
    '-frames:v', String(frames), '-c:v', 'libx264', '-crf', '20', '-preset', 'medium', silent);

  const cues = { duration, bed: path.join(ROOT, 'output', 'audio', 'soft.wav'), zaps, hum: [[humFrom, duration]] };
  const cueFile = path.join(tmp, `${name}.json`);
  const wav = path.join(tmp, `${name}.wav`);
  fs.writeFileSync(cueFile, JSON.stringify(cues));
  execFileSync('python3', [path.join(ROOT, 'scripts', 'audio', 'mix-timed.py'), cueFile, wav]);

  const out = path.join(OUT, 'reels', `${name}.mp4`);
  ff('-i', silent, '-i', wav, '-map', '0:v', '-map', '1:a', '-c:v', 'copy',
    '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11,aresample=44100', '-c:a', 'aac', '-b:a', '160k', '-shortest', '-movflags', '+faststart', out);
  return { out, duration };
}

// ── Main ─────────────────────────────────────────────────────────────────────
for (const d of ['reels', 'stills', 'feed']) fs.mkdirSync(path.join(OUT, d), { recursive: true });
const tmp = fs.mkdtempSync(path.join(OUT, '.work-'));

const posts = [];
for (const [i, q] of NEON_QUOTES.entries()) {
  const name = `${String(i + 1).padStart(2, '0')}-${q.slug}`;
  const lit = { frame: true, lit: q.lines.length };
  if (!only.length || only.includes(q.slug)) {
    const feedPng = await shoot(q, 'feed', lit, path.join(tmp, `${name}-feed.png`), 2);
    ff('-i', feedPng, '-q:v', '2', path.join(OUT, 'feed', `${name}.jpg`));
    const stillPng = await shoot(q, 'reel', lit, path.join(tmp, `${name}-still.png`), 1);
    ff('-i', stillPng, '-q:v', '2', path.join(OUT, 'stills', `${name}.jpg`));
    let reel = '';
    if (withVideo) {
      const r = await buildReel(q, name, tmp);
      reel = ` + reel ${r.duration.toFixed(1)}s`;
    }
    console.log(`  ✦ ${name}: feed + still${reel}`);
  }
  posts.push({
    n: i + 1,
    name,
    ...q,
    text: `${q.caption}\n\n${q.cta}\n${q.tags.map((t) => `#${t}`).join(' ')}`,
    alt: `${q.lines.join(' ')} — ${q.from}`,
    files: { reel: `reels/${name}.mp4`, still: `stills/${name}.jpg`, feed: `feed/${name}.jpg` },
  });
}
await browser.close();
fs.rmSync(tmp, { recursive: true, force: true });

fs.writeFileSync(path.join(OUT, 'posts.json'), JSON.stringify(posts, null, 2) + '\n');
fs.writeFileSync(
  path.join(OUT, 'CAPTIONS.md'),
  `# Neon quote set\n\nQuotes from MK's own books and poems, copied word for word. Built by \`scripts/build-neon-quotes.mjs\` from \`scripts/neon-quotes.mjs\`.\n\n` +
    posts.map((p) => `## ${String(p.n).padStart(2, '0')}. ${p.title}\n\n> ${p.lines.join(' / ')}\n\nSource: ${p.source}\n\n\`\`\`\n${p.text}\n\`\`\`\n`).join('\n'),
);
console.log(`\n✓ ${posts.length} posts in output/neon-quotes/`);
