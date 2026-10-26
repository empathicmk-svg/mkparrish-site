#!/usr/bin/env node
/**
 * MK (@mk_parrish) × Mercedes-Benz of Smithtown — "Sprinter 15, customized".
 *
 * A Reel/TikTok, a story and two feed posts from MK's walkaround of the black
 * 15-passenger Sprinter on the lot: the outside, the cockpit and the rows of
 * seats, plus a bow-collar selfie. The reel cuts on the beat with zoom, wipe and
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

const REEL = {
  name: '01-sprinter-15-customized',
  scenes: [
    { clip: OUTSIDE, start: 0.1, html: over(say(['The Sprinter 15', 'customized'], { size: 70 })), dur: beats(4) },
    { clip: OUTSIDE, start: 5.6, html: over(say(['Gloss black.', 'Built to move.'], { size: 70 })), dur: beats(4), fx: 'zoomin' },
    { clip: INSIDE, start: 3.0, html: over(say(['Mercedes-Benz', 'up front'])), dur: beats(4), fx: 'wipeleft' },
    { clip: INSIDE, start: 9.4, html: over(say(['15 seats.', 'Room for everyone.'])), dur: beats(4), fx: 'fadewhite' },
    { clip: INSIDE, start: 12.4, html: over(say(['Your team. Your clients.', 'Your crew.'])), dur: beats(4), fx: 'smoothup' },
    { clip: OUTSIDE, start: 12.6, html: over(say(['Ready to work', 'today.'], { size: 70 })), dur: beats(4), fx: 'zoomin' },
    { html: still('mk-bow-collar-2.jpg', 'center 30%', say(['Ask for MK.', 'I’ll get you rolling.'])), dur: beats(4), fx: 'circleopen' },
    { html: end({ kicker: MODEL, head: 'Built for<br><em>your crew.</em>', sub: 'Work 631.366.6417 · Cell 347.853.4238', action: TODAY }), dur: beats(6), still: true, fx: 'fadeblack' },
  ],
};

const STORY = hero({
  w: 1080, h: 1920, photo: 'sprinter-15-front.jpg', pos: 'center 30%', tag: 'Available today',
  model: MODEL, head: 'Room for<br><em>15.</em>', headSize: 150,
  sub: 'Customized and on the lot in St. James. Come see it today.',
  action: TODAY, sigBottom: 250, textBottom: 380, top: 250,
});

const FEED = [
  ['01-sprinter-15-room-for-15', hero({ photo: 'sprinter-15-quarter.jpg', pos: 'center 35%', tag: 'Available today', model: MODEL, head: 'Room for <em>15.</em>', headSize: 150, sub: 'Customized Sprinter on the lot right now. Call or text and it’s pulled up front.', action: TODAY })],
  ['02-sprinter-15-bring-everyone', hero({ photo: 'sprinter-15-rows.jpg', pos: 'center 40%', tag: 'Ask for MK', model: 'Mercedes-Benz of Smithtown · St. James', head: 'Bring <em>everyone.</em>', headSize: 140, sub: 'Teams, shuttles, churches, families. DM “SPRINTER” or come in today.', action: ['DM “SPRINTER”', HANDLE] })],
];

// A soft diagonal chrome highlight that sweeps across the frame.
const SWEEP = `<div style="width:700px;height:1920px;background:linear-gradient(105deg,transparent 30%,rgba(255,255,255,.55) 50%,transparent 70%)"></div>`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage();
const reelsDir = dir('sprinter/reels'), storiesDir = dir('sprinter/stories'), feedDir = dir('sprinter/feed');
const story = path.join(storiesDir, '01-sprinter-15-room-for-15.png');
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
