#!/usr/bin/env node
/**
 * Turns MK's scheduled photo and carousel posts into short Reels with music.
 *
 * Instagram only plays sound on Reels, and its publishing API can't add a song
 * to a photo post, so each image becomes a 9:16 video: the 4:5 post centred on
 * black with a slow push-in, carousel slides cross-faded in order, and one of
 * MK's own music beds underneath ("showroom" for Mercedes, "soft" for the quote
 * posts and the Pink Bow awareness posts).
 *
 * Output: output/photo-reels/<name>.mp4
 * Run:    node scripts/photo-reels.mjs   (after scripts/audio/make-music-beds.py)
 */
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'output', 'photo-reels');
const BEDS = path.join(ROOT, 'output', 'audio');
const MB = 'output/mercedes-smithtown';
const Q = 'output/instagram-editorial/jpg';

const SINGLE = 7;     // seconds for a one-image post
const SLIDE = 3;      // seconds per carousel slide
const XFADE = 0.35;
/** Every slide of a carousel folder, in order. */
const carousel = dir => fs.readdirSync(path.join(ROOT, dir)).filter(f => f.endsWith('.jpg')).sort().map(f => `${dir}/${f}`);

// name → [images, bed]
const JOBS = {
  // Mercedes-Benz of Smithtown
  'cle-coupe-or-cabriolet': [[`${MB}/feed/04-cle-coupe-or-cabriolet.jpg`], 'showroom'],
  'early-detection': [[`${MB}/vol2/feed/10-early-detection.jpg`], 'soft'],
  'this-or-that-gls-glb': [[`${MB}/vol2/feed/08-this-or-that-suv.jpg`], 'showroom'],
  'fleet-sprinter': [[`${MB}/vol3/feed/14-fleet-sprinter.jpg`], 'showroom'],
  'carousel-know-your-grille': [carousel(`${MB}/vol2/carousel-grille`), 'showroom'],
  'build-your-2027': [[`${MB}/vol3/feed/15-build-your-2027.jpg`], 'showroom'],
  'gls-room-for-everyone': [[`${MB}/feed/05-gls-room-for-everyone.jpg`], 'showroom'],
  'libi-golf-outing': [[`${MB}/vol3/feed/18-libi-golf-outing.jpg`], 'showroom'],
  'meet-the-new-cla': [[`${MB}/vol2/feed/12-meet-the-new-cla.jpg`], 'showroom'],
  'carousel-lease-ending': [carousel(`${MB}/vol2/carousel-lease`), 'showroom'],
  'g63-built-your-way': [[`${MB}/vol3/feed/16-g63-built-your-way.jpg`], 'showroom'],
  'matte-amg-e-class': [[`${MB}/vol2/feed/11-matte-amg-e-class.jpg`], 'showroom'],
  'this-or-that-cla-gle': [[`${MB}/vol2/feed/09-this-or-that-sedan-suv.jpg`], 'showroom'],
  'carousel-built-for-business': [carousel(`${MB}/vol3/carousel-fleet`), 'showroom'],
  'amg-black-white-pink': [[`${MB}/feed/06-amg-black-white-pink.jpg`], 'showroom'],
  'save-my-number': [[`${MB}/vol3/feed/21-save-my-number.jpg`], 'showroom'],
  'wrapped-for-a-reason': [[`${MB}/vol2/feed/13-wrapped-for-a-reason.jpg`], 'soft'],
  'find-me-in-smithtown': [[`${MB}/feed/07-find-me-in-smithtown.jpg`], 'showroom'],
  'proud-to-be-local': [[`${MB}/vol3/feed/17-proud-to-be-local.jpg`], 'showroom'],
  'carousel-build-your-2027': [carousel(`${MB}/vol3/carousel-build`), 'showroom'],
  'amg-gt-coupe': [[`${MB}/vol3/feed/19-amg-gt-coupe.jpg`], 'showroom'],
  'showroom-fit-check': [[`${MB}/vol3/feed/22-showroom-fit-check.jpg`], 'showroom'],
  'gle-fresh-face': [[`${MB}/vol3/feed/20-gle-fresh-face.jpg`], 'showroom'],
  // MK quote posts
  'quote-your-biggest-adventure': [[`${Q}/bold/post-07-your-biggest-adventure.jpg`], 'soft'],
  'quote-the-source': [[`${Q}/philosophy/post-07-the-source.jpg`], 'soft'],
  'quote-the-rewrite': [[`${Q}/fifty/post-07-the-rewrite.jpg`], 'soft'],
  'quote-a-bridge-not-an-end': [[`${Q}/philosophy/post-08-a-bridge-not-an-end.jpg`], 'soft'],
  'quote-the-light-comes-in': [[`${Q}/philosophy/post-09-the-light-comes-in.jpg`], 'soft'],
  'quote-we-can-do-hard-things': [[`${Q}/bold/post-08-we-can-do-hard-things.jpg`], 'soft'],
  'quote-the-night-you-left': [[`${Q}/fifty/post-08-the-night-you-left.jpg`], 'soft'],
  'quote-face-it-first': [[`${Q}/philosophy/post-11-face-it-first.jpg`], 'soft'],
  'quote-absolutely-ridiculous': [[`${Q}/bold/post-10-absolutely-ridiculous.jpg`], 'soft'],
  'quote-what-healing-looks-like': [[`${Q}/fifty/post-10-what-healing-looks-like.jpg`], 'soft'],
  'quote-what-luck-actually-is': [[`${Q}/philosophy/post-14-what-luck-actually-is.jpg`], 'soft'],
  'quote-i-m-possible': [[`${Q}/bold/post-12-i-m-possible.jpg`], 'soft'],
  'quote-one-true-sentence': [[`${Q}/fifty/post-14-one-true-sentence.jpg`], 'soft'],
  'quote-the-way-through': [[`${Q}/philosophy/post-10-the-way-through.jpg`], 'soft'],
  'quote-what-you-seek': [[`${Q}/bold/post-14-what-you-seek.jpg`], 'soft'],
  'quote-the-words-he-gave-you': [[`${Q}/fifty/post-09-the-words-he-gave-you.jpg`], 'soft'],
  // The Parktronic poll story, as a video story so it has sound too (the poll sticker still goes on in the app)
  'story-poll-park-itself': [[`${MB}/parktronic/stories/01-poll-park-itself.jpg`], 'showroom'],
};

const enc = ['-c:v', 'libx264', '-crf', '21', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-r', '30'];

/** One image → a 1080×1920 segment with a slow push-in, the post centred on black. */
function segment(img, dur, out) {
  const frames = Math.round(dur * 30);
  const full = /story/.test(img);   // stories are already 9:16
  const [w, h] = full ? [1080, 1920] : [1080, 1350];
  const vf = `scale=${w * 2}:${h * 2}:force_original_aspect_ratio=increase,crop=${w * 2}:${h * 2},` +
    `zoompan=z='1+0.04*on/${frames}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=${w}x${h}:fps=30,` +
    (full ? '' : `pad=1080:1920:0:(1920-${h})/2:color=0x080808,`) + 'setsar=1';
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-loop', '1', '-framerate', '30', '-t', String(dur), '-i', path.join(ROOT, img),
    '-vf', vf, '-frames:v', String(frames), ...enc, out]);
}

fs.mkdirSync(OUT, { recursive: true });
const tmp = fs.mkdtempSync(path.join(OUT, '.work-'));
for (const [name, [imgs, bed]] of Object.entries(JOBS)) {
  for (const i of imgs) if (!fs.existsSync(path.join(ROOT, i))) throw new Error(`Missing ${i}`);
  const dur = imgs.length === 1 ? SINGLE : SLIDE;
  const segs = imgs.map((img, i) => { const s = path.join(tmp, `${name}-${i}.mp4`); segment(img, dur, s); return s; });
  const total = imgs.length === 1 ? SINGLE : imgs.length * SLIDE - (imgs.length - 1) * XFADE;
  let chain = '', prev = '[0:v]';
  segs.slice(0, -1).forEach((_, i) => {
    const o = i === segs.length - 2 ? '[v]' : `[x${i}]`;
    chain += `${prev}[${i + 1}:v]xfade=transition=fade:duration=${XFADE}:offset=${((i + 1) * (SLIDE - XFADE)).toFixed(3)}${o};`;
    prev = o;
  });
  if (segs.length === 1) chain = '[0:v]null[v];';
  const a = segs.length;
  chain += `[${a}:a]atrim=0:${total.toFixed(3)},afade=t=in:d=0.05,afade=t=out:st=${(total - 1).toFixed(3)}:d=1,loudnorm=I=-16:TP=-1.5:LRA=11,aresample=44100[a]`;
  execFileSync('ffmpeg', ['-v', 'error', '-y', ...segs.flatMap(s => ['-i', s]), '-i', path.join(BEDS, `${bed}.wav`),
    '-filter_complex', chain, '-map', '[v]', '-map', '[a]', ...enc, '-c:a', 'aac', '-b:a', '160k', '-shortest', '-movflags', '+faststart',
    path.join(OUT, `${name}.mp4`)]);
  console.log(`  ♪ output/photo-reels/${name}.mp4  ${total.toFixed(1)}s  (${bed})`);
}
fs.rmSync(tmp, { recursive: true, force: true });
