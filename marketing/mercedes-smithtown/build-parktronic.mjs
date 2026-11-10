#!/usr/bin/env node
/**
 * MK (@mk_parrish) × Mercedes-Benz of Smithtown — "It parks itself."
 *
 * One Reel/TikTok of Active Parking Assist with PARKTRONIC steering the car
 * into a space on its own, cut from MK's phone clip with the original sound
 * kept, plus a poll story ("Does your car park itself?") that leaves room for
 * Instagram's poll sticker.
 *
 * Output: output/mercedes-smithtown/parktronic/{reels,stories}/
 * Run:    node marketing/mercedes-smithtown/build-parktronic.mjs
 */
import { chromium } from 'playwright';
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import {
  MEDIA, VOID, PEARL, SMOKE, PETAL, HANDLE, STORE, work, render, dir, cleanup,
} from './lib.mjs';

const CLIP = path.join(MEDIA, 'parktronic-self-park.mp4');
const FEATURE = 'Active Parking Assist with PARKTRONIC';
const FINE = 'Driver must stay attentive and ready to take over. See dealer for availability.';

// ── Templates ──────────────────────────────────────────────────────────────────

/** Transparent caption over the clip, inside the Reels/TikTok safe area. */
function caption({ kicker, head, sub, big = 132, top = false, fine = false }) {
  const where = top ? 'top:250px' : 'bottom:520px';
  const shade = top
    ? 'top:0;height:760px;background:linear-gradient(0deg, rgba(8,8,8,0) 0%, rgba(8,8,8,.8) 55%)'
    : 'bottom:0;height:940px;background:linear-gradient(180deg, rgba(8,8,8,0) 0%, rgba(8,8,8,.85) 60%)';
  return `<div style="width:1080px;height:1920px;position:relative;font-family:'DM Sans'">
    <div style="position:absolute;left:0;right:0;${shade}"></div>
    <div style="position:absolute;left:64px;right:170px;${where};display:flex;flex-direction:column;gap:18px">
      ${kicker ? `<div class="kicker">${kicker}</div>` : ''}
      <div class="head" style="font-size:${big}px">${head}</div>
      ${sub ? `<div class="sub" style="font-size:40px">${sub}</div>` : ''}
    </div>
    ${fine ? `<div style="position:absolute;left:64px;right:170px;bottom:440px;font-size:19px;line-height:1.4;color:${SMOKE}">${FINE}</div>` : ''}
  </div>`;
}

/** Closing card: the question again, then the call to action. */
function closer() {
  return `<div class="frame" style="width:1080px;height:1920px;background:${PETAL};color:${VOID}">
    <div style="position:absolute;left:72px;right:170px;top:0;bottom:430px;display:flex;flex-direction:column;justify-content:center;gap:30px">
      <div class="kicker" style="color:${VOID}">${STORE}</div>
      <div class="head" style="font-size:176px;color:${VOID}">Does yours<br>do <span style="text-decoration:underline;text-decoration-thickness:10px;text-underline-offset:14px">that?</span></div>
      <div class="sub" style="font-size:44px;color:${VOID}">Come try it on a test drive. I’ll let you take your hands off.</div>
      <div class="cta" style="background:${VOID};color:${PETAL};font-size:46px">DM “PARK”<span style="color:${PEARL}">${HANDLE}</span></div>
    </div>
  </div>`;
}

/** Poll story: a still from the clip and the question, with the middle left clear for the poll sticker. */
function pollStory(still) {
  return `<div class="frame" style="width:1080px;height:1920px">
    <img src="data:image/jpeg;base64,${fs.readFileSync(still).toString('base64')}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 40%">
    <div class="shade" style="position:absolute;inset:0;background:linear-gradient(180deg, rgba(8,8,8,.8) 0%, rgba(8,8,8,.35) 34%, rgba(8,8,8,.55) 60%, rgba(8,8,8,.92) 100%)"></div>
    <div style="position:absolute;left:72px;right:72px;top:250px;display:flex;flex-direction:column;gap:22px">
      <div class="kicker">Quick poll · ${FEATURE}</div>
      <div class="head" style="font-size:150px">Does your car<br><em>park itself?</em></div>
    </div>
    <div style="position:absolute;left:72px;right:72px;bottom:250px;display:flex;flex-direction:column;gap:18px">
      <div class="sub" style="font-size:42px">Mine does. New reel on my page — watch the wheel turn by itself.</div>
      <div style="font-size:22px;letter-spacing:.14em;text-transform:uppercase;color:${SMOKE}">
        <b style="font-family:'Bebas Neue';font-weight:400;font-size:34px;letter-spacing:.08em;color:${PEARL};margin-right:8px">MK</b><span style="color:${PETAL};text-transform:none;letter-spacing:.04em">${HANDLE}</span> · ${STORE}
      </div>
    </div>
  </div>`;
}

// ── Reel ───────────────────────────────────────────────────────────────────────
// Captions sit over one continuous take, so the wheel turning on its own is never cut.
const TAKE = 17.6;   // seconds of the clip used, ending as the car settles in the space
const END = 2.8;     // closing card
const XFADE = 0.35;
const CAPTIONS = [
  { from: 0, to: 3.6, html: caption({ kicker: FEATURE, head: 'Hands <em>off.</em><br>Watch the wheel.', big: 150, top: true }) },
  { from: 3.6, to: 8.2, html: caption({ head: 'It’s steering<br><em>by itself.</em>', fine: true }) },
  { from: 8.2, to: 13.0, html: caption({ head: 'Sensors find<br>the <em>space.</em>', sub: 'Cameras and PARKTRONIC sensors guide it in.', fine: true }) },
  { from: 13.0, to: TAKE, html: caption({ head: 'Parked.<br><em>No stress.</em>' }) },
];

async function buildReel(page, out) {
  const pngs = [];
  for (const [i, c] of CAPTIONS.entries()) {
    const png = path.join(work, `park-cap-${i}.png`);
    await render(page, c.html, 1080, 1920, png, true);
    pngs.push(png);
  }
  const endPng = path.join(work, 'park-end.png');
  await render(page, closer(), 1080, 1920, endPng);

  const take = path.join(work, 'park-take.mp4');
  const overlays = CAPTIONS.map((c, i) => {
    const src = i === 0 ? '[g]' : `[o${i - 1}]`;
    const dst = i === CAPTIONS.length - 1 ? '[v]' : `[o${i}]`;
    return `${src}[${i + 1}:v]overlay=enable='between(t,${c.from},${c.to})'${dst}`;
  }).join(';');
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-t', String(TAKE), '-i', CLIP, ...pngs.flatMap(p => ['-i', p]),
    '-filter_complex', `[0:v]eq=contrast=1.08:saturation=1.12:brightness=-0.03:gamma=0.95,unsharp=5:5:0.6,setsar=1[g];${overlays}`,
    '-map', '[v]', '-map', '0:a', '-c:v', 'libx264', '-crf', '23', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-r', '30',
    '-c:a', 'aac', '-b:a', '128k', take]);

  const offset = (TAKE - XFADE).toFixed(3);
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', take, '-loop', '1', '-framerate', '30', '-t', String(END), '-i', endPng,
    '-filter_complex',
    `[1:v]scale=1080:1920,setsar=1,format=yuv420p,fps=30,settb=AVTB[e];[0:v]fps=30,settb=AVTB[t];[t][e]xfade=transition=fade:duration=${XFADE}:offset=${offset}[v];` +
    `[0:a]afade=t=out:st=${TAKE - 1.2}:d=1.2,apad=whole_dur=${TAKE + END - XFADE}[a]`,
    '-map', '[v]', '-map', '[a]', '-c:v', 'libx264', '-crf', '23', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-r', '30',
    '-c:a', 'aac', '-b:a', '128k', '-shortest', '-movflags', '+faststart', out]);
  console.log('  ✓', path.relative(process.cwd(), out));
}

// ── Render ─────────────────────────────────────────────────────────────────────
// CHROMIUM_PATH lets this run where Playwright's own browser build isn't installed.
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage();
fs.mkdirSync(work, { recursive: true });

const reelsDir = dir('parktronic/reels'), storiesDir = dir('parktronic/stories');
await buildReel(page, path.join(reelsDir, '01-it-parks-itself.mp4'));

// The poll story uses a frame from mid-manoeuvre, with the parking screen in view.
const still = path.join(work, 'park-still.jpg');
execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', '9.2', '-i', CLIP, '-frames:v', '1', '-q:v', '2', still]);
const story = path.join(storiesDir, '01-poll-park-itself.png');
await render(page, pollStory(still), 1080, 1920, story);
// Instagram's publishing API only takes JPEG stills.
execFileSync('convert', [story, '-quality', '92', story.replace(/\.png$/, '.jpg')]);

await browser.close();
cleanup();
