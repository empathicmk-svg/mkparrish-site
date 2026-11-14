#!/usr/bin/env node
/**
 * MK (@mk_parrish) × Mercedes-Benz of Smithtown: "The G-Wagon went electric" (G 580).
 *
 * A Reel/TikTok, a five-slide carousel (Instagram carousel or TikTok photo mode),
 * a feed post and two stories from MK's door-sill photo and two walkaround clips of
 * the electric G 580. There are no photos of MK: the instrument cluster reflects the
 * person filming in some frames, so no cockpit video is used and the dash is shown as
 * a still of the center stack only.
 *
 * The clips were shot in HDR (HLG), so they are tone-mapped to SDR in media/g580-*.mp4;
 * a plain conversion washes the colors out. The clips' own audio is dropped for MK's
 * showroom music bed, scored to the cuts.
 *
 * Output: output/mercedes-smithtown/g580/{reels,stories,feed,carousel}/
 * Run:    node marketing/mercedes-smithtown/build-g580.mjs
 */
import { chromium } from 'playwright';
import { execFileSync } from 'child_process';
import path from 'path';
import { work, hero, topbar, sig, cta, endCard, img, render, buildReel, dir, cleanup } from './lib.mjs';
import { beats, say, fitted, over, end, PHONES } from './trend.mjs';
import { cutTimes, scoreReel } from './score.mjs';

const TODAY = ['Call or text MK', '347.853.4238'];
const WALK = 'g580-walk.mp4';
const TAG = 'G 580';

// Scenes are four beats (about 2.4s) at 118 BPM. The walkaround runs door sill, side, rear 3/4, rear; staff are in
// the background from about 9.6s to 11.6s, so the clip is only used from 6.6s (side) and 11.8s (rear).
const REEL = {
  name: '01-g580-went-electric',
  scenes: [
    { clip: WALK, start: 6.6, html: over(say(['The G-Wagon', 'went electric'], { size: 64 })), dur: beats(4) },
    { clip: WALK, start: 11.8, html: over(say(['Spare tire.', 'Still on the back.'])), dur: beats(4), fx: 'zoomin' },
    { html: fitted('g580-sill.jpg', say(['Even the sill', 'says G.']), 480), dur: beats(4), fx: 'wipeleft' },
    { html: fitted('g580-dash.jpg', say(['Step', 'inside.']), 480), dur: beats(4), fx: 'slideleft' },
    { html: fitted('g580-rear.jpg', say(['G 580.', 'Electric.']), 480), dur: beats(4), fx: 'smoothup' },
    { html: fitted('g580-side.jpg', say(['Test drive it', 'with MK.']), 480), dur: beats(4), fx: 'circleopen' },
    { html: end({ kicker: 'Mercedes-Benz of Smithtown', head: 'Drive it<br><em>electric.</em>', sub: PHONES, action: TODAY }), dur: beats(6), still: true, fx: 'fadeblack' },
  ],
};

/** 9:16 story: the whole photo fitted to the width over a blurred copy, one headline and the call-or-text button. */
const story = ({ photo: name, tag, model, head }) => `<div class="frame" style="width:1080px;height:1920px">
  <img class="photo" src="${img(name)}" style="filter:blur(40px) brightness(.5);transform:scale(1.15)">
  <img src="${img(name)}" style="position:absolute;left:0;top:120px;width:1080px;height:1440px;object-fit:cover;-webkit-mask-image:linear-gradient(180deg,transparent 0,#000 9%,#000 88%,transparent 100%);mask-image:linear-gradient(180deg,transparent 0,#000 9%,#000 88%,transparent 100%)">
  <div class="shade" style="background:linear-gradient(180deg, rgba(8,8,8,.5) 0%, rgba(8,8,8,0) 14%, rgba(8,8,8,0) 50%, rgba(8,8,8,.9) 72%, rgba(8,8,8,.97) 100%)"></div>
  ${topbar(250, tag)}
  <div style="position:absolute;left:72px;right:72px;bottom:380px;display:flex;flex-direction:column;gap:22px">
    <div class="kicker">${model}</div>
    <div class="head" style="font-size:150px">${head}</div>
    ${cta(...TODAY)}
  </div>
  ${sig(250)}
</div>`;

const STORIES = [
  ['01-g580-went-electric', story({ photo: 'g580-rear.jpg', tag: TAG, model: 'G 580 · On the floor in St. James', head: 'The G went <em>electric.</em>' })],
  ['02-test-drive-it', hero({
    w: 1080, h: 1920, photo: 'g580-side.jpg', pos: 'center 38%', tag: TAG,
    model: 'Mercedes-Benz of Smithtown', head: 'Test drive<br><em>the electric G.</em>', headSize: 150,
    sub: 'Ask for MK. I’ll hand you the key.', action: TODAY, sigBottom: 250, textBottom: 380, top: 250,
  })],
];

const FEED = [
  ['01-test-drive-the-electric-g', hero({
    photo: 'g580-side.jpg', pos: 'center 36%', tag: TAG, model: 'Mercedes-Benz of Smithtown',
    head: 'Test drive the <em>electric G.</em>', headSize: 130, sub: 'Ask for MK. I’ll hand you the key.', action: TODAY,
  })],
];

// Five 4:5 slides for an Instagram carousel or a TikTok photo post.
const slide = (n, opts) => hero({ tag: `${TAG} · ${n}/5`, ...opts });
const CAROUSEL = [
  ['01', slide(1, { photo: 'g580-side.jpg', pos: 'center 40%', model: 'G-Class', head: 'The G-Wagon went <em>electric.</em>', headSize: 120, sub: 'Swipe for a closer look →' })],
  ['02', slide(2, { photo: 'g580-sill.jpg', pos: 'center 55%', model: 'G-Class', head: 'Even the sill <em>says G.</em>', headSize: 130, sub: 'The lit door sill, in the showroom in St. James.' })],
  ['03', slide(3, { photo: 'g580-rear.jpg', pos: 'center 45%', model: 'G 580', head: 'Spare tire. <em>Still there.</em>', headSize: 130, sub: 'The G 580 badge, the boxy shape and the rear-mounted spare.' })],
  ['04', slide(4, { photo: 'g580-dash.jpg', pos: 'center 55%', model: 'G-Class', head: 'Step <em>inside.</em>', headSize: 150, sub: 'Round air vents under the wide display.' })],
  ['05', endCard({ kicker: 'Mercedes-Benz of Smithtown', head: 'Drive it<br><em>electric.</em>', sub: PHONES, action: TODAY, mark: '' })],
];

// A soft diagonal chrome highlight that sweeps across the frame.
const SWEEP = `<div style="width:700px;height:1920px;background:linear-gradient(105deg,transparent 30%,rgba(255,255,255,.55) 50%,transparent 70%)"></div>`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage();
const reelsDir = dir('g580/reels'), storiesDir = dir('g580/stories');
const feedDir = dir('g580/feed'), carouselDir = dir('g580/carousel');

// Instagram's and TikTok's publishing APIs only take JPEG stills.
const jpeg = file => execFileSync('convert', [file, '-quality', '92', file.replace(/\.png$/, '.jpg')]);
for (const [name, html] of STORIES) {
  const file = path.join(storiesDir, `${name}.png`);
  await render(page, html, 1080, 1920, file);
  jpeg(file);
}
for (const [name, html] of FEED) {
  const file = path.join(feedDir, `${name}.png`);
  await render(page, html, 1080, 1350, file);
  jpeg(file);
}
for (const [n, html] of CAROUSEL) {
  const file = path.join(carouselDir, `slide-${n}.png`);
  await render(page, html, 1080, 1350, file);
  jpeg(file);
}

await buildReel(page, REEL, work);
const sweep = path.join(work, 'sweep.png');
await render(page, SWEEP, 700, 1920, sweep, true);
await browser.close();

// Cool grade, glow and vignette, then the chrome sweep, then the scored soundtrack.
const graded = path.join(work, `${REEL.name}-graded.mp4`);
execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', path.join(work, `${REEL.name}.mp4`), '-loop', '1', '-i', sweep,
  '-filter_complex', [
    '[0:v]colorbalance=bs=0.06:bm=0.02:bh=0.03,curves=all=\'0/0 0.5/0.47 1/1\',split[a][b]',
    '[b]gblur=sigma=26[g]',
    '[a][g]blend=all_mode=screen:all_opacity=0.18,vignette=angle=PI/5[base]',
    '[1:v]format=rgba,colorchannelmixer=aa=0.6[s]',
    '[base][s]overlay=x=\'mod(t*1100,4400)-700\':y=0:shortest=1,format=yuv420p[v]',
  ].join(';'),
  '-map', '[v]', '-c:v', 'libx264', '-crf', '21', '-preset', 'medium', '-r', '30', '-movflags', '+faststart', graded]);
scoreReel(graded, path.join(reelsDir, `${REEL.name}.mp4`), { cuts: cutTimes(REEL.scenes) });
console.log('  cuts at', cutTimes(REEL.scenes).map(t => `${t.toFixed(2)}s`).join(', '));
cleanup();
