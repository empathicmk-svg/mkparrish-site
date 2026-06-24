// ─────────────────────────────────────────────────────────────────────────────
// Animated MP4 reel generator (1080×1920, H.264) for TikTok / IG Reels.
//
//   node scripts/social/generate-video.mjs [--fps=30] [--seconds=5] [--start=...]
//
// How it works: the video template's CSS animations are `paused` with `fill:both`,
// so we scrub each frame by setting Web-Animations `currentTime`, screenshot it,
// then encode the frames to MP4 with the bundled ffmpeg-static binary (a silent
// AAC track is added for platform compatibility).
//
// Writes scripts/social/out/videos/ :  <slug>.mp4  +  videos.csv
// ─────────────────────────────────────────────────────────────────────────────

import { mkdir, writeFile, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import puppeteer from "puppeteer";
import ffmpegPath from "ffmpeg-static";
import { POSTS } from "./catalog.mjs";
import { renderVideo, VIDEO } from "./template-video.mjs";
import { csvRow, ttCaption, scheduler, nextMonday } from "./util.mjs";

const run = promisify(execFile);
const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "out", "videos");
const TMP = join(__dirname, "out", ".frames");

const args = Object.fromEntries(process.argv.slice(2).map((a) => {
  const [k, v] = a.replace(/^--/, "").split("=");
  return [k, v ?? true];
}));
const FPS = Number(args.fps) || VIDEO.fps;
const DURATION = (Number(args.seconds) || VIDEO.durationMs / 1000) * 1000;
const slot = scheduler(args.start ? new Date(String(args.start)) : nextMonday());
const FRAMES = Math.round((DURATION / 1000) * FPS);

async function main() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"], headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: VIDEO.w, height: VIDEO.h, deviceScaleFactor: 1 });

  const rows = [];

  for (let p = 0; p < POSTS.length; p++) {
    const post = POSTS[p];
    await rm(TMP, { recursive: true, force: true });
    await mkdir(TMP, { recursive: true });

    await page.setContent(renderVideo(post), { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);

    for (let f = 0; f < FRAMES; f++) {
      const t = (f / (FRAMES - 1)) * DURATION;
      await page.evaluate((time) => {
        for (const a of document.getAnimations()) {
          try { a.currentTime = time; } catch { /* finished */ }
        }
      }, t);
      await page.screenshot({ path: join(TMP, `f${String(f).padStart(4, "0")}.png`), type: "png" });
    }

    const mp4 = join(OUT, `${post.slug}.mp4`);
    await run(ffmpegPath, [
      "-y",
      "-framerate", String(FPS),
      "-i", join(TMP, "f%04d.png"),
      "-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=44100",
      "-shortest",
      "-c:v", "libx264", "-pix_fmt", "yuv420p", "-profile:v", "high", "-level", "4.0",
      "-c:a", "aac", "-b:a", "128k",
      "-movflags", "+faststart",
      "-r", String(FPS),
      mp4,
    ]);
    console.log(`  ✓ ${post.slug}.mp4  (${FRAMES} frames @ ${FPS}fps)`);

    const s = slot(p);
    rows.push(csvRow([s.date, s.time, `${post.slug}.mp4`, ttCaption(post), post.link]));
  }

  await browser.close();
  await rm(TMP, { recursive: true, force: true });

  const header = ["Date", "Time", "Video File", "Caption", "Link"];
  await writeFile(join(OUT, "videos.csv"), [csvRow(header), ...rows].join("\n"));
  console.log(`\n✅ ${POSTS.length} reels → scripts/social/out/videos/`);
}

main().catch((e) => { console.error(e); process.exit(1); });
