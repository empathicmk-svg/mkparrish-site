#!/usr/bin/env node
/**
 * MK (@mk_parrish) × Mercedes-Benz of Smithtown — Friday reels.
 *
 * "Friday night vibes" is cut from MK's showroom pan (white AMG GT to her
 * desk), the pink roses on her desk and her "Stay positive. Work hard. Make it
 * happen." desk mat. "POV: Friday at my desk" follows one walk from her desk
 * past the roses and the window out to the AMG GT on the floor. Both use a
 * bow-collar selfie and change scenes on the beat with varied transitions, then
 * each reel gets a night grade, a soft glow, a vignette and drifting pink
 * sparkles. Both end on a weekend test-drive call to action.
 *
 * Output: output/mercedes-smithtown/friday/{friday-night-vibes,friday-at-my-desk}.mp4
 * Run:    node marketing/mercedes-smithtown/build-friday.mjs && node scripts/add-music.mjs
 */
import { chromium } from 'playwright';
import { execFileSync } from 'child_process';
import path from 'path';
import { ROOT, PETAL, PEARL, work, render, buildReel, dir, cleanup } from './lib.mjs';
import { beats, say, still, over, end } from './trend.mjs';

const BOOK = ['Book a weekend test drive', 'mkparrish.com/test-drive'];

const REELS = [{
  name: 'friday-night-vibes',
  scenes: [
    { clip: 'showroom-amg-gt-to-desk.mp4', start: 0.3, html: over(say(['Friday night', 'vibes only'], { size: 70 })), dur: beats(5) },
    { clip: 'showroom-amg-gt-to-desk.mp4', start: 3.3, html: over(say(['Weekend mode', 'activated'])), dur: beats(5), fx: 'slideleft' },
    { clip: 'desk-pink-roses.mp4', start: 0.3, html: over(say(['Pink roses', 'at my desk'])), dur: beats(5), fx: 'circleopen' },
    { clip: 'desk-make-it-happen-pan.mp4', start: 0.3, html: over(say(['Stay positive.', 'Work hard.'])), dur: beats(5), fx: 'smoothup' },
    { clip: 'desk-make-it-happen-pan.mp4', start: 3.8, html: over(say(['Make it', 'happen.'], { size: 70 })), dur: beats(5), fx: 'fadewhite' },
    { html: still('mk-bow-collar-2.jpg', 'center 30%', say(['Your weekend', 'starts with MK'])), dur: beats(4), fx: 'circleopen' },
    { html: end({ kicker: 'Mercedes-Benz of Smithtown', head: 'Friday night<br><em>plans?</em>', action: BOOK }), dur: beats(6), still: true, fx: 'fadeblack' },
  ],
}, {
  name: 'friday-at-my-desk',
  scenes: [
    { clip: 'desk-to-showroom-walk.mp4', start: 0.2, html: over(say(['POV:', 'Friday at my desk'], { size: 70 })), dur: beats(5) },
    { clip: 'desk-to-showroom-walk.mp4', start: 5.6, html: over(say(['Fresh roses', 'for the weekend'])), dur: beats(5), fx: 'zoomin' },
    { clip: 'desk-to-showroom-walk.mp4', start: 8.6, html: over(say(['And the view', 'from my desk?'])), dur: beats(5), fx: 'wipeleft' },
    { clip: 'desk-to-showroom-walk.mp4', start: 12.3, html: over(say(['Yeah.', 'That one.'], { size: 70 })), dur: beats(5), fx: 'fadewhite' },
    { html: still('mk-bow-collar-1.jpg', 'center 30%', say(['Come see me', 'this weekend'])), dur: beats(4), fx: 'circleopen' },
    { html: end({ kicker: 'Saturday test drives', head: 'Make it<br><em>happen.</em>', action: BOOK }), dur: beats(6), still: true, fx: 'fadeblack' },
  ],
}];

// Soft pink and pearl bokeh, taller than the frame so it can drift upward.
let seed = 7;
const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const dots = Array.from({ length: 70 }, () => {
  const r = 3 + rand() ** 3 * 22, c = rand() < 0.65 ? PETAL : PEARL;
  return `<div style="position:absolute;left:${(rand() * 1080).toFixed(0)}px;top:${(rand() * 2400).toFixed(0)}px;width:${(r * 2).toFixed(1)}px;height:${(r * 2).toFixed(1)}px;border-radius:50%;background:radial-gradient(circle,${c} 0%,${c}aa 35%,transparent 70%);opacity:${(0.35 + rand() * 0.6).toFixed(2)}"></div>`;
}).join('');
const SPARKLES = `<div style="width:1080px;height:2400px;position:relative">${dots}</div>`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage();
const outDir = dir('friday');
for (const r of REELS) await buildReel(page, r, work);
const sparkles = path.join(work, 'sparkles.png');
await render(page, SPARKLES, 1080, 2400, sparkles, true);
await browser.close();

// Night grade (cool shadows and highlights, so MK's selfie stays cool), glow,
// vignette, then two sparkle layers drifting at different speeds.
for (const r of REELS) {
  const out = path.join(outDir, `${r.name}.mp4`);
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', path.join(work, `${r.name}.mp4`), '-loop', '1', '-i', sparkles,
    '-filter_complex', [
      '[0:v]colorbalance=bs=0.07:bm=0.03:bh=0.03,curves=all=\'0/0 0.5/0.46 1/1\',split[a][b]',
      '[b]gblur=sigma=28[g]',
      '[a][g]blend=all_mode=screen:all_opacity=0.22,vignette=angle=PI/5[base]',
      '[1:v]format=rgba,colorchannelmixer=aa=0.55,split[s1][s2]',
      '[s2]hflip,scale=1080:2400[s2f]',
      '[base][s1]overlay=x=0:y=\'-t*22\':shortest=1[l1]',
      '[l1][s2f]overlay=x=0:y=\'-420+t*12\':shortest=1,format=yuv420p[v]',
    ].join(';'),
    '-map', '[v]', '-c:v', 'libx264', '-crf', '21', '-preset', 'medium', '-r', '30', '-movflags', '+faststart', out]);
  console.log('  ✓', path.relative(ROOT, out));
}
cleanup();
