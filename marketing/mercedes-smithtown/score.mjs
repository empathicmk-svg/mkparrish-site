/**
 * Gives a finished silent reel a soundtrack scored to its own cuts
 * (scripts/audio/mix-timed.py): the 118 BPM showroom bed with a whoosh and a
 * hit on every cut, levelled to about -16 LUFS. Extra cues (keystrokes,
 * chimes, ducking) can be passed in, as Volume 7's code scenes do.
 */
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { ROOT, XFADE, work } from './lib.mjs';

/** Start time of every scene after the first, i.e. where each cut lands. */
export const cutTimes = scenes => {
  const cuts = [];
  let offset = 0;
  for (const s of scenes.slice(0, -1)) {
    offset += s.dur - XFADE;
    cuts.push(+offset.toFixed(3));
  }
  return cuts;
};

export function scoreReel(silent, out, cues = {}) {
  const name = path.basename(out, '.mp4');
  const duration = parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', silent]).toString());
  const cueFile = path.join(work, `${name}.cues.json`);
  const wav = path.join(work, `${name}.wav`);
  fs.writeFileSync(cueFile, JSON.stringify({ duration, bed: path.join(ROOT, 'output', 'audio', 'showroom.wav'), ...cues }));
  execFileSync('python3', [path.join(ROOT, 'scripts', 'audio', 'mix-timed.py'), cueFile, wav]);
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', silent, '-i', wav,
    '-filter_complex', '[1:a]loudnorm=I=-16:TP=-1.5:LRA=11,aresample=44100[a]',
    '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k', '-shortest', '-movflags', '+faststart', out]);
  console.log('  ♪', path.relative(ROOT, out), `${duration.toFixed(1)}s`);
  return duration;
}
