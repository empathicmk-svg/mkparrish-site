#!/usr/bin/env node
/**
 * MK (@mk_parrish) × Mercedes-Benz of Smithtown — "AMG G 63, red and black".
 *
 * A Reel/TikTok, a story and three feed posts from MK's photos of the matte
 * AMG G 63 in the AMG corner, its carbon-fiber console and red-and-black rear
 * seats, plus her stabilized interior walkaround. No photos of MK: every
 * scene is the car. The reel cuts on the beat, then gets a cool grade, a soft
 * glow, a vignette and a chrome light sweep, and ends on call or text MK or
 * shop it at mbofsmithtown.com.
 *
 * Output: output/mercedes-smithtown/g63/{reels,stories,feed}/
 * Run:    node marketing/mercedes-smithtown/build-g63.mjs && node scripts/add-music.mjs
 */
import { chromium } from 'playwright';
import { execFileSync } from 'child_process';
import path from 'path';
import { ROOT, HANDLE, work, hero, render, buildReel, dir, cleanup } from './lib.mjs';
import { beats, say, still, over, end } from './trend.mjs';

const TODAY = ['Call or text MK', '347.853.4238'];
const MODEL = 'Mercedes-AMG G 63';
const SITE = ['Shop it online', 'mbofsmithtown.com'];
const WALK = 'g63-red-interior-walk.mp4';

// The walkaround skips 7.5–10.5s, where MK's boots are in frame.
const REEL = {
  name: '01-amg-g63-red-and-black',
  scenes: [
    { html: still('g63-matte-amg-corner-tall.jpg', 'center center', say(['Matte black.', 'AMG G 63'], { size: 70 })), dur: beats(4) },
    { clip: WALK, start: 0.1, html: over(say(['Now open', 'the door'])), dur: beats(4), fx: 'zoomin' },
    { clip: WALK, start: 2.4, html: over(say(['Red and black', 'everything'], { size: 70 })), dur: beats(4), fx: 'wipeleft' },
    { clip: WALK, start: 4.8, html: over(say(['V8 biturbo', 'under the hood'])), dur: beats(4), fx: 'fadewhite' },
    { html: still('g63-carbon-console.jpg', 'center 45%', say(['Carbon fiber', 'all the way down'])), dur: beats(4), fx: 'smoothup' },
    { clip: WALK, start: 11.2, html: over(say(['Diamond-stitched', 'red leather'])), dur: beats(4), fx: 'slideleft' },
    { html: still('g63-red-rear-seats.jpg', 'center 55%', say(['Even the back seat', 'hits different'])), dur: beats(4), fx: 'circleopen' },
    { html: end({ kicker: MODEL + ' · Mercedes-Benz of Smithtown', head: 'Make it<br><em>yours.</em>', sub: 'Work 631.366.6417 · Cell 347.853.4238 · mbofsmithtown.com', action: TODAY }), dur: beats(6), still: true, fx: 'fadeblack' },
  ],
};

const STORIES = [
  ['01-amg-g63-in-the-amg-corner', hero({
    w: 1080, h: 1920, photo: 'g63-matte-amg-corner-tall.jpg', pos: 'center center', tag: 'In the showroom',
    model: MODEL, head: 'Matte.<br><em>Menacing.</em>', headSize: 150,
    sub: 'Red and black interior, carbon fiber trim. On the floor in St. James.',
    action: TODAY, sigBottom: 250, textBottom: 380, top: 250,
  })],
];

const FEED = [
  ['01-amg-g63-matte-menacing', hero({ photo: 'g63-matte-amg-corner-post.jpg', pos: 'center center', tag: 'In the showroom', model: MODEL, head: 'Matte. <em>Menacing.</em>', headSize: 140, sub: 'On the floor at Mercedes-Benz of Smithtown. Call or text and it’s pulled up front.', action: TODAY })],
  ['02-amg-g63-carbon-fiber', hero({ photo: 'g63-carbon-console.jpg', pos: 'center 40%', tag: 'Inside the G 63', model: MODEL, head: 'Carbon <em>everything.</em>', headSize: 140, sub: 'Carbon fiber trim from the dash to the console.', action: SITE })],
  ['03-amg-g63-red-and-black', hero({ photo: 'g63-red-rear-seats.jpg', pos: 'center 45%', tag: 'Inside the G 63', model: MODEL, head: 'Red and <em>black.</em>', headSize: 150, sub: 'Diamond-stitched red leather, front and back.', action: TODAY })],
];

// A soft diagonal chrome highlight that sweeps across the frame.
const SWEEP = `<div style="width:700px;height:1920px;background:linear-gradient(105deg,transparent 30%,rgba(255,255,255,.55) 50%,transparent 70%)"></div>`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage();
const reelsDir = dir('g63/reels'), storiesDir = dir('g63/stories'), feedDir = dir('g63/feed');
// Instagram's and TikTok's publishing APIs only take JPEG stills.
for (const [name, html] of STORIES) {
  const file = path.join(storiesDir, `${name}.png`);
  await render(page, html, 1080, 1920, file);
  execFileSync('convert', [file, '-quality', '92', file.replace(/\.png$/, '.jpg')]);
}
for (const [name, html] of FEED) {
  const file = path.join(feedDir, `${name}.png`);
  await render(page, html, 1080, 1350, file);
  execFileSync('convert', [file, '-quality', '92', file.replace(/\.png$/, '.jpg')]);
}
await buildReel(page, REEL, work);
const sweep = path.join(work, 'sweep.png');
await render(page, SWEEP, 700, 1920, sweep, true);
await browser.close();

// Cool grade, glow and vignette, then the chrome sweep every 4 seconds.
const out = path.join(reelsDir, `${REEL.name}.mp4`);
execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', path.join(work, `${REEL.name}.mp4`), '-loop', '1', '-i', sweep,
  '-filter_complex', [
    '[0:v]colorbalance=bs=0.06:bm=0.02:bh=0.03,curves=all=\'0/0 0.5/0.47 1/1\',split[a][b]',
    '[b]gblur=sigma=26[g]',
    '[a][g]blend=all_mode=screen:all_opacity=0.18,vignette=angle=PI/5[base]',
    '[1:v]format=rgba,colorchannelmixer=aa=0.6[s]',
    '[base][s]overlay=x=\'mod(t*1100,4400)-700\':y=0:shortest=1,format=yuv420p[v]',
  ].join(';'),
  '-map', '[v]', '-c:v', 'libx264', '-crf', '21', '-preset', 'medium', '-r', '30', '-movflags', '+faststart', out]);
console.log('  ✓', path.relative(ROOT, out));
cleanup();
