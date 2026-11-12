#!/usr/bin/env node
/**
 * MK (@mk_parrish) × Mercedes-Benz of Smithtown — Sprinter delivery for
 * Beatrice and Vertieres Legacy LLC.
 *
 * A Reel/TikTok, two stories and a three-slide feed carousel built from the
 * delivery: the welcome sign, the cockpit, an HD still of the seat rows, and
 * HD stills and a clip from the earlier Sprinter walkaround. There are no photos of MK. The reel gets the
 * Sprinter set's cool grade, glow, vignette and chrome sweep, and a soundtrack
 * scored to its cuts (score.mjs).
 *
 * Output: output/mercedes-smithtown/delivery-sprinter/{reels,stories,feed}/
 * Run:    node marketing/mercedes-smithtown/build-delivery-sprinter.mjs
 */
import { chromium } from 'playwright';
import { execFileSync } from 'child_process';
import path from 'path';
import { work, hero, photo, topbar, sig, render, buildReel, dir, cleanup } from './lib.mjs';
import { beats, say, still, lifted, over, end } from './trend.mjs';
import { cutTimes, scoreReel } from './score.mjs';

const TODAY = ['Call or text MK', '347.853.4238'];
const MODEL = 'Mercedes-Benz Sprinter · 15-passenger';
const WHO = 'Beatrice & Vertieres Legacy LLC';

const REEL = {
  name: '01-sprinter-delivery-day',
  scenes: [
    { html: still('sprinter-hd-front.jpg', 'center 30%', say(['Delivery day:', 'a Sprinter for the team'], { size: 64 })), dur: beats(4) },
    { html: lifted('sprinter-delivery-sign.jpg', 'center top', say(['Welcome to the', 'Mercedes-Benz family'])), dur: beats(5), fx: 'fadewhite' },
    { html: still('sprinter-hd-delivery-rows.jpg', 'center 40%', say(['Room for', 'the whole team'], { size: 66 })), dur: beats(5), fx: 'zoomin' },
    { html: still('sprinter-delivery-cockpit.jpg', 'center 40%', say(['Ready for', 'the road ahead'])), dur: beats(4), fx: 'wipeleft' },
    { clip: 'sprinter-15-exterior-walk.mp4', start: 5.6, html: over(say(['The best', 'or nothing'], { size: 70 })), dur: beats(4), fx: 'slideleft' },
    { html: end({ kicker: 'Delivered by Mercedes-Benz of Smithtown', head: 'Congratulations,<br><em>Beatrice.</em>', sub: 'Vertieres Legacy LLC · Welcome to the family', action: TODAY }), dur: beats(6), still: true, fx: 'fadeblack' },
  ],
};

const STORY_TEXT = { w: 1080, h: 1920, headSize: 140, sigBottom: 250, textBottom: 380, top: 250 };
const STORIES = [
  ['01-welcome-to-the-family', hero({ ...STORY_TEXT, photo: 'sprinter-delivery-sign-tall.jpg', pos: 'center top', tag: 'Delivery day',
    model: WHO, head: 'Welcome to the<br><em>family.</em>', sub: 'Here’s to the road ahead, and to delivering the best or nothing.', action: TODAY })],
  ['02-room-for-the-whole-team', hero({ ...STORY_TEXT, photo: 'sprinter-hd-delivery-rows.jpg', pos: 'center 40%', tag: 'Just delivered',
    model: MODEL, head: 'Room for the<br><em>whole team.</em>', sub: 'Delivered today to Vertieres Legacy LLC. Your fleet or passenger van is next.', action: TODAY })],
];

// Carousel slide 1 lets the sign speak for itself: the photo, full bleed, with a quiet caption line.
const signSlide = `<div class="frame" style="width:1080px;height:1350px">
  ${photo({ photo: 'sprinter-delivery-sign-post.jpg', pos: 'center top' })}
  <div class="shade" style="background:linear-gradient(180deg, rgba(8,8,8,.45) 0%, rgba(8,8,8,0) 14%, rgba(8,8,8,0) 72%, rgba(8,8,8,.88) 100%)"></div>
  ${topbar(56, 'Delivery day')}
  <div class="kicker" style="position:absolute;left:72px;right:72px;bottom:118px">Congratulations, ${WHO}</div>
  ${sig(56)}
</div>`;

const FEED = [
  ['01-congratulations-sign', signSlide],
  ['02-delivered', hero({ photo: 'sprinter-hd-front.jpg', pos: 'center 45%', tag: 'Just delivered', model: MODEL,
    head: '<em>Delivered.</em>', headSize: 150, sub: 'A Mercedes-Benz Sprinter for Beatrice and Vertieres Legacy LLC. Welcome to the Mercedes-Benz family.' })],
  ['03-the-road-ahead', hero({ photo: 'sprinter-delivery-cockpit.jpg', pos: 'center 45%', tag: 'Mercedes-Benz of Smithtown', model: 'Your delivery day is next',
    head: 'The road <em>ahead.</em>', headSize: 140, sub: 'Fleet, shuttle or passenger van: I’ll find the right Sprinter for your business.', action: TODAY })],
];

// The Sprinter set's chrome highlight, swept across the frame every 4 seconds.
const SWEEP = `<div style="width:700px;height:1920px;background:linear-gradient(105deg,transparent 30%,rgba(255,255,255,.55) 50%,transparent 70%)"></div>`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage();
const reelsDir = dir('delivery-sprinter/reels'), storiesDir = dir('delivery-sprinter/stories'), feedDir = dir('delivery-sprinter/feed');

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
