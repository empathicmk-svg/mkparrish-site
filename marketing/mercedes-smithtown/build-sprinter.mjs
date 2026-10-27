#!/usr/bin/env node
/**
 * MK (@mk_parrish) × Mercedes-Benz of Smithtown — "Sprinter 15, customized".
 *
 * A Reel/TikTok, two stories and five feed posts from MK's stabilized walkaround
 * of the black 15-passenger Sprinter on the lot and full-frame High Quality
 * Custom Design upfit interiors (straightened from screen photos), plus a
 * bow-collar selfie. The reel cuts on the beat with zoom, wipe and
 * flash transitions, then gets a cool grade, a soft glow, a vignette and a
 * chrome light sweep. Everything ends on a call-or-text-today call to action.
 *
 * Output: output/mercedes-smithtown/sprinter/{reels,stories,feed}/
 * Run:    node marketing/mercedes-smithtown/build-sprinter.mjs && node scripts/add-music.mjs
 */
import { chromium } from 'playwright';
import { execFileSync } from 'child_process';
import path from 'path';
import { ROOT, HANDLE, work, hero, render, buildReel, dir, cleanup } from './lib.mjs';
import { beats, say, still, over, end } from './trend.mjs';

const TODAY = ['Call or text MK', '347.853.4238'];
const MODEL = 'Mercedes-Benz Sprinter · 15-passenger';
const OUTSIDE = 'sprinter-15-exterior-walk.mp4', INSIDE = 'sprinter-15-interior-walk.mp4';

const UPFIT = 'Upfits by High Quality Custom Design';

const REEL = {
  name: '01-sprinter-15-customized',
  scenes: [
    { clip: OUTSIDE, start: 12.4, html: over(say(['The Sprinter 15', 'customized'], { size: 70 })), dur: beats(4) },
    { html: still('sprinter-upfit-e2-tall.jpg', 'center center', say(['Built', 'your way.'], { size: 70 })), dur: beats(4), fx: 'fadewhite' },
    { html: still('sprinter-upfit-d2-tall.jpg', 'center center', say(['Starlight', 'ceilings'])), dur: beats(4), fx: 'zoomin' },
    { html: still('sprinter-upfit-d5-tall.jpg', 'center center', say(['Powered', 'captain chairs'])), dur: beats(4), fx: 'wipeleft' },
    { html: still('sprinter-upfit-d9-tall.jpg', 'center center', say(['First class,', 'every ride.'])), dur: beats(4), fx: 'smoothup' },
    { html: still('sprinter-upfit-d8-tall.jpg', 'center center', say(['TV, tables,', 'lounge seating'])), dur: beats(4), fx: 'slideleft' },
    { html: still('sprinter-upfit-e3-tall.jpg', 'center center', say(['Our latest', 'upfit'])), dur: beats(4), fx: 'circleopen' },
    { clip: INSIDE, start: 9.4, html: over(say(['Or 15 seats', 'for the whole crew'])), dur: beats(4), fx: 'zoomin' },
    { html: still('mk-bow-collar-2.jpg', 'center 30%', say(['Ask for MK.', 'I’ll build it with you.'])), dur: beats(4), fx: 'circleopen' },
    { html: end({ kicker: UPFIT, head: 'Customize<br><em>your Sprinter.</em>', sub: 'Work 631.366.6417 · Cell 347.853.4238', action: TODAY }), dur: beats(6), still: true, fx: 'fadeblack' },
  ],
};

const STORIES = [
  ['01-sprinter-15-room-for-15', hero({
    w: 1080, h: 1920, photo: 'sprinter-15-front.jpg', pos: 'center 30%', tag: 'Available today',
    model: MODEL, head: 'Room for<br><em>15.</em>', headSize: 150,
    sub: 'Customized and on the lot in St. James. Come see it today.',
    action: TODAY, sigBottom: 250, textBottom: 380, top: 250,
  })],
  ['02-sprinter-make-it-yours', hero({
    w: 1080, h: 1920, photo: 'sprinter-upfit-d2-tall.jpg', pos: 'center center', tag: 'Custom upfits',
    model: UPFIT, head: 'Make it<br><em>yours.</em>', headSize: 150,
    sub: 'Captain chairs, starlight ceilings, TVs and tables. Built your way.',
    action: TODAY, sigBottom: 250, textBottom: 380, top: 250,
  })],
];

const FEED = [
  ['01-sprinter-15-room-for-15', hero({ photo: 'sprinter-15-quarter.jpg', pos: 'center 35%', tag: 'Available today', model: MODEL, head: 'Room for <em>15.</em>', headSize: 150, sub: 'Customized Sprinter on the lot right now. Call or text and it’s pulled up front.', action: TODAY })],
  ['02-sprinter-15-bring-everyone', hero({ photo: 'sprinter-15-rows.jpg', pos: 'center 40%', tag: 'Ask for MK', model: 'Mercedes-Benz of Smithtown · St. James', head: 'Bring <em>everyone.</em>', headSize: 140, sub: 'Teams, shuttles, churches, families. DM “SPRINTER” or come in today.', action: ['DM “SPRINTER”', HANDLE] })],
  ['03-sprinter-make-it-yours', hero({ photo: 'sprinter-upfit-d2-post.jpg', pos: 'center center', tag: 'Custom upfits', model: UPFIT, head: 'Make it <em>yours.</em>', headSize: 150, sub: 'Starlight ceilings, captain chairs and a TV partition. Built your way.', action: TODAY })],
  ['04-sprinter-first-class', hero({ photo: 'sprinter-upfit-d9-post.jpg', pos: 'center center', tag: 'Custom upfits', model: UPFIT, head: 'First class, <em>every ride.</em>', headSize: 120, sub: 'Powered captain chairs and custom finishes for corporate or private travel.', action: TODAY })],
  ['05-sprinter-latest-upfit', hero({ photo: 'sprinter-upfit-e2-post.jpg', pos: 'center center', tag: 'Our latest upfit', model: UPFIT, head: 'Built <em>your way.</em>', headSize: 140, sub: 'Our most recent Sprinter upfit. Tell me how you’d build yours.', action: ['DM “SPRINTER”', HANDLE] })],
];

// A soft diagonal chrome highlight that sweeps across the frame.
const SWEEP = `<div style="width:700px;height:1920px;background:linear-gradient(105deg,transparent 30%,rgba(255,255,255,.55) 50%,transparent 70%)"></div>`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage();
const reelsDir = dir('sprinter/reels'), storiesDir = dir('sprinter/stories'), feedDir = dir('sprinter/feed');
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
