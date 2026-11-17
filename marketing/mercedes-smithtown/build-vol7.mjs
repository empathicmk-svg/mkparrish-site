#!/usr/bin/env node
/**
 * MK (@mk_parrish) × Mercedes-Benz of Smithtown — Volume 7, "Code & Chrome".
 *
 * Four Reels/TikToks and two feed posts for MK's niche: the Mercedes consultant
 * who also writes code, writes books and consults brands. The code scenes are
 * real JavaScript, typed out frame by frame (code.mjs). Each reel gets its own
 * soundtrack, scored to its timeline: a key click on every typed character, a
 * chime on every printed line, and a whoosh and hit on every cut, over the
 * 118 BPM showroom bed, so the cuts land on the beat (scripts/audio/mix-timed.py).
 *
 * Output: output/mercedes-smithtown/vol7/{reels,feed}/ plus reels/beat-map.md
 * Run:    node marketing/mercedes-smithtown/build-vol7.mjs
 */
import { chromium } from 'playwright';
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { ROOT, HANDLE, XFADE, work, hero, render, buildReel, dir, cleanup } from './lib.mjs';
import { beats, say, still, over, end } from './trend.mjs';
import { codeClip } from './code.mjs';

const BOOK = ['Book a test drive', 'mkparrish.com/test-drive'];

// `code` scenes are rendered by codeClip first, then used as clip scenes.
const REELS = [{
  name: '01-pov-my-mercedes-girl-codes',
  title: 'POV: your Mercedes girl also writes code',
  scenes: [
    { code: { file: 'mk.js', code: 'const mk = {\n  sells: "Mercedes-Benz",\n  writes: ["code", "books"],\n  consults: "brands",\n};\nmk.find(yourNextBenz);', out: ['<b>✓</b> match found: test drive Saturday'] },
      html: over(say(['POV: your', 'Mercedes girl', 'also writes code'], { size: 56 })), dur: beats(8) },
    { clip: 'showroom-amg-gt-to-desk.mp4', start: 0.3, html: over(say(['So your quote', 'comes with receipts'])), dur: beats(4), fx: 'slideleft' },
    { code: { file: 'quote.js', code: 'for (const fee of quote.fees) {\n  explain(fee);  // out loud\n}', out: ['tax ........... <b>explained</b>', 'doc fee ....... <b>explained</b>', 'surprises ..... <b>0</b>'] },
      html: over(say(['Every line', 'explained'])), dur: beats(8), fx: 'wipeleft' },
    { html: still('mk-bow-collar-1.jpg', 'center 30%', say(['Built different.', 'Ask for MK.'])), dur: beats(4), fx: 'circleopen' },
    { html: end({ kicker: 'Mercedes-Benz of Smithtown', head: 'Your Benz.<br><em>Debugged.</em>', action: BOOK }), dur: beats(6), still: true, fx: 'fadeblack' },
  ],
}, {
  name: '02-lease-math-in-javascript',
  title: 'Dealer translation: lease math in JavaScript',
  scenes: [
    { clip: 'showroom-cle450-pan.mp4', start: 0.2, html: over(say(['Lease math', 'in 20 seconds'], { size: 70 })), dur: beats(4) },
    { code: { file: 'lease.js', typeShare: 0.8, code: '// example numbers, not an offer\nconst msrp = 60000;\nconst residual = msrp * 0.58;  // 34,800\nconst term = 36;               // months\nconst mf = 0.0025;      // money factor' },
      html: over(say(['Step 1:', 'the numbers on your quote'])), dur: beats(9), fx: 'zoomin' },
    { code: { file: 'lease.js', code: 'const dep = (msrp - residual) / term;\nconst rent = (msrp + residual) * mf;\nconst apr = mf * 2400;\nconsole.log(dep + rent, apr);',
      out: ['depreciation  <b>$700.00</b>/mo', 'rent charge   <b>$237.00</b>/mo', 'payment       <b>$937.00</b>/mo + tax, fees', 'APR           <b>≈ 6.0%</b>'] },
      html: over(say(['Step 2:', 'two lines of math'])), dur: beats(11), fx: 'wipeleft' },
    { clip: 'desk-make-it-happen-pan.mp4', start: 0.3, html: over(say(['Money factor x 2400', '≈ your interest rate'])), dur: beats(5), fx: 'slideleft' },
    { html: still('mk-bow-collar-2.jpg', 'center 30%', say(['Send me any quote.', 'I’ll run the math.'])), dur: beats(4), fx: 'circleopen' },
    { html: end({ kicker: 'Dealer translation', head: 'Math, not<br><em>mystery.</em>', action: ['DM “MATH”', HANDLE] }), dur: beats(6), still: true, fx: 'fadeblack' },
  ],
}, {
  name: '03-amg-energy-f1-season',
  title: 'Mercedes is winning in F1 again',
  scenes: [
    { clip: 'matte-amg-walkaround.mp4', start: 0.2, html: over(say(['Mercedes is winning', 'in F1 again'], { size: 66 })), dur: beats(4) },
    { code: { file: 'season.js', code: 'const early2026 = [\n  ["Australia", "Russell"],\n  ["China", "Antonelli"],\n  ["Japan", "Antonelli"],\n];', out: ['wins loaded: <b>3</b>', 'showroom energy: <b>AMG</b>'] },
      html: over(say(['Early 2026', 'scoreboard'])), dur: beats(8), fx: 'zoomin' },
    { clip: 'g-class-2027-walkaround.mp4', start: 1.4, html: over(say(['Same three-pointed star', 'in my showroom'])), dur: beats(4), fx: 'wipeleft' },
    { html: still('amg-gt-front-white.jpg', 'center center', say(['Race weekend?', 'Test drive weekend.'])), dur: beats(4), fx: 'fadewhite' },
    { html: end({ kicker: 'Mercedes-AMG at Mercedes-Benz of Smithtown', head: 'Drive the<br><em>energy.</em>', action: BOOK }), dur: beats(6), still: true, fx: 'fadeblack' },
  ],
}, {
  name: '04-day-in-my-life-code-and-chrome',
  title: 'A day in my life: Mercedes, code, words',
  scenes: [
    { clip: 'walk-in-entrance.mp4', start: 0.3, html: over(say(['A day in my life:', 'Mercedes, code, words'])), dur: beats(4) },
    { clip: 'desk-to-showroom-walk.mp4', start: 8.6, html: over(say(['10 AM', 'walkarounds on the floor'])), dur: beats(4), fx: 'slideleft' },
    { code: { file: 'tracker.js', code: '// lunch-break side quest\nconst leads = await sheet.read();\nleads\n  .filter(l => l.wantsTestDrive)\n  .forEach(textBackToday);', out: ['<b>✓</b> nobody waits for a text back'] },
      html: over(say(['1 PM', 'coding my lead tracker'])), dur: beats(8), fx: 'zoomin' },
    { html: still('delivery-glc-pink-bow.jpg', 'center center', say(['4 PM', 'delivery day'])), dur: beats(4), fx: 'circleopen' },
    { clip: 'desk-pink-roses.mp4', start: 0.3, html: over(say(['8 PM', 'writing the next chapter'])), dur: beats(4), fx: 'smoothup' },
    { html: end({ kicker: 'Mercedes · code · words · strategy', head: 'Built<br><em>different.</em>', action: ['Follow for the next one', HANDLE] }), dur: beats(6), still: true, fx: 'fadeblack' },
  ],
}];

const FEED = [
  ['01-money-factor-decoded', hero({ photo: 'cle-graphite-front.jpg', pos: 'center 45%', tag: 'Dealer translation', model: 'Money factor x 2400 = your APR',
    head: 'Your rate, <em>decoded.</em>', headSize: 130, sub: 'A money factor of 0.0025 is about a 6.0% APR. Send me any lease quote and I’ll run the math with you.', action: ['DM “MATH”', HANDLE] })],
  ['02-mercedes-code-words', hero({ photo: 'mk-black-dress-2.jpg', pos: 'center 25%', tag: 'Hi, I’m MK', model: 'Mercedes-Benz of Smithtown',
    head: 'Mercedes. Code. <em>Words.</em>', headSize: 120, sub: 'I sell Mercedes-Benz, write code and books, and help brands with strategy. Follow for where those meet.', action: ['Follow', HANDLE] })],
];

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage();
const reelsDir = dir('vol7/reels'), feedDir = dir('vol7/feed');

for (const [name, html] of FEED) {
  const file = path.join(feedDir, `${name}.png`);
  await render(page, html, 1080, 1350, file);
  execFileSync('convert', [file, '-quality', '92', file.replace(/\.png$/, '.jpg')]);
}

const beatMap = ['# Volume 7 beat map', '',
  'Each reel is cut on the 118 BPM grid and already has its own soundtrack.',
  'To use a trending sound instead, add it in the app, turn the original audio down to 0,',
  'and drag the sound so its drop lands on the first cut below.', ''];

for (const r of REELS) {
  // Render the code animations, then treat them as ordinary clip scenes.
  const cues = { keys: [], outs: [], cuts: [], duck: [] };
  let offset = 0;
  for (const [i, s] of r.scenes.entries()) {
    if (i > 0) cues.cuts.push(+offset.toFixed(3));
    if (s.code) {
      const { clip, keys, outs } = await codeClip(page, { name: `${r.name}-code${i}`, dur: s.dur, ...s.code });
      Object.assign(s, { clip, start: 0 });
      cues.keys.push(...keys.map(t => +(offset + t).toFixed(3)));
      cues.outs.push(...outs.map(t => +(offset + t).toFixed(3)));
      if (keys.length) cues.duck.push([+(offset + 0.15).toFixed(3), +(offset + keys.at(-1) + 0.12).toFixed(3)]);
    }
    offset += s.dur - XFADE;
  }
  await buildReel(page, r, work);

  // Score it to its own timeline and mux, levelled to about -16 LUFS.
  const silent = path.join(work, `${r.name}.mp4`);
  const duration = parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', silent]).toString());
  const cueFile = path.join(work, `${r.name}.cues.json`);
  const wav = path.join(work, `${r.name}.wav`);
  fs.writeFileSync(cueFile, JSON.stringify({ duration, bed: path.join(ROOT, 'output', 'audio', 'showroom.wav'), ...cues }));
  execFileSync('python3', [path.join(ROOT, 'scripts', 'audio', 'mix-timed.py'), cueFile, wav]);
  const out = path.join(reelsDir, `${r.name}.mp4`);
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', silent, '-i', wav,
    '-filter_complex', '[1:a]loudnorm=I=-16:TP=-1.5:LRA=11,aresample=44100[a]',
    '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k', '-shortest', '-movflags', '+faststart', out]);
  console.log('  ♪', path.relative(ROOT, out), `${duration.toFixed(1)}s, ${cues.keys.length} keys, ${cues.cuts.length} cuts`);

  beatMap.push(`## ${r.title} (\`${r.name}.mp4\`, ${duration.toFixed(1)}s)`, '',
    `- Cuts at: ${cues.cuts.map(t => `${t.toFixed(2)}s`).join(', ')}`,
    `- First cut: **${cues.cuts[0].toFixed(2)}s**. Set a trending sound's drop here.`, '');
}
await browser.close();
fs.writeFileSync(path.join(reelsDir, 'beat-map.md'), beatMap.join('\n'));
cleanup();
