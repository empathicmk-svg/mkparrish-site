#!/usr/bin/env node
/**
 * MK (@mk_parrish) × Mercedes-Benz of Smithtown — "2027 G-Wagon, today".
 *
 * A Reel/TikTok, a story and two feed posts from MK's walkaround of the matte
 * 2027 G-Class on the showroom floor, plus the matte G in the AMG corner and a
 * bow-collar selfie. The reel cuts on the beat with zoom, wipe and flash
 * transitions, then gets a cool showroom grade, a soft glow, a vignette and a
 * chrome light sweep. Everything ends on a come-in-today call to action.
 *
 * Output: output/mercedes-smithtown/gwagon/{reels,stories,feed}/
 * Run:    node marketing/mercedes-smithtown/build-gwagon.mjs && node scripts/add-music.mjs
 */
import { chromium } from 'playwright';
import { execFileSync } from 'child_process';
import path from 'path';
import { ROOT, HANDLE, work, hero, render, buildReel, dir, cleanup } from './lib.mjs';
import { beats, say, still, over, end } from './trend.mjs';

const TODAY = ['Call or text MK', '347.853.4238'];
const MODEL = '2027 Mercedes-Benz G-Class';

const REEL = {
  name: '01-g-wagon-today',
  scenes: [
    { clip: 'g-class-2027-walkaround.mp4', start: 0.1, html: over(say(['The 2027', 'G-Wagon is here'], { size: 70 })), dur: beats(4) },
    { clip: 'g-class-2027-walkaround.mp4', start: 1.4, html: over(say(['Matte.', 'Menacing.'], { size: 70 })), dur: beats(4), fx: 'zoomin' },
    { clip: 'g-class-2027-walkaround.mp4', start: 3.4, html: over(say(['On my floor', 'right now'])), dur: beats(4), fx: 'wipeleft' },
    { html: still('g63-matte-showroom.jpg', '50% center', say(['It won’t', 'wait long.'], { size: 70 })), dur: beats(4), fx: 'fadewhite' },
    { html: still('mk-bow-collar-2.jpg', 'center 30%', say(['Ask for MK.', 'Drive it home today.'])), dur: beats(4), fx: 'circleopen' },
    { html: end({ kicker: MODEL, head: 'Make it yours<br><em>today.</em>', sub: 'Work 631.366.6417 · Cell 347.853.4238', action: TODAY }), dur: beats(6), still: true, fx: 'fadeblack' },
  ],
};

const STORY = hero({
  w: 1080, h: 1920, photo: 'g-class-2027-front.jpg', pos: 'center 40%', tag: 'Available today',
  model: MODEL, head: 'Yours<br><em>today.</em>', headSize: 150,
  sub: 'Matte, on the floor in St. James. Come see it before it’s gone.',
  action: TODAY, sigBottom: 250, textBottom: 380, top: 250,
});

const FEED = [
  ['01-g-wagon-yours-today', hero({ photo: 'g-class-2027-front.jpg', pos: 'center 42%', tag: 'Available today', model: MODEL, head: 'Yours <em>today.</em>', headSize: 150, sub: 'Matte G on my floor right now. Call or text and it’s pulled up front.', action: TODAY })],
  ['02-g-wagon-wont-wait', hero({ photo: 'g-class-2027-showroom.jpg', pos: 'center 55%', tag: 'Ask for MK', model: 'Mercedes-Benz of Smithtown · St. James', head: 'It won’t <em>wait.</em>', headSize: 140, sub: 'The 2027 G-Class. DM “G” or come in today.', action: ['DM “G”', HANDLE] })],
];

// A soft diagonal chrome highlight that sweeps across the frame.
const SWEEP = `<div style="width:700px;height:1920px;background:linear-gradient(105deg,transparent 30%,rgba(255,255,255,.55) 50%,transparent 70%)"></div>`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage();
const reelsDir = dir('gwagon/reels'), storiesDir = dir('gwagon/stories'), feedDir = dir('gwagon/feed');
const story = path.join(storiesDir, '01-g-wagon-yours-today.png');
await render(page, STORY, 1080, 1920, story);
// Instagram's and TikTok's publishing APIs only take JPEG stills.
execFileSync('convert', [story, '-quality', '92', story.replace(/\.png$/, '.jpg')]);
for (const [name, html] of FEED) {
  const file = path.join(feedDir, `${name}.png`);
  await render(page, html, 1080, 1350, file);
  execFileSync('convert', [file, '-quality', '92', file.replace(/\.png$/, '.jpg')]);
}
await buildReel(page, REEL, work);
const sweep = path.join(work, 'sweep.png');
await render(page, SWEEP, 700, 1920, sweep, true);
await browser.close();

// Cool showroom grade, glow and vignette, then the chrome sweep every 4 seconds.
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
