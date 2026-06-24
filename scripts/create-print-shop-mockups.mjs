import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const COVER_DIR = path.join(ROOT, "public", "downloads", "covers");
const FONT_DIR = path.join(ROOT, "scripts", "assets", "fonts");

const palette = {
  void: "#07070a",
  obsidian: "#0d0d11",
  carbon: "#15151b",
  graphite: "#2a2a31",
  petal: "#f2afc6",
  blush: "#ffd7ed",
  pearl: "#fff7fb",
  smoke: "#b8bbc4",
  iron: "#737782",
};

const prints = [
  {
    slug: "promise-me",
    title: "Promise Me",
    line: "Promise me you will not abandon yourself again.",
    byline: "Original MK Parrish line",
    style: "serif",
  },
  {
    slug: "the-rewrite-print",
    title: "The Rewrite",
    line: "I picked up the pen and felt the world shift.",
    byline: "Original MK Parrish poem",
    style: "serif",
  },
  {
    slug: "selected-lines",
    title: "Selected Lines",
    line: "The page is still yours.",
    byline: "Original MK Parrish line",
    style: "display",
  },
  {
    slug: "live-out-loud-print",
    title: "Live Out Loud",
    line: "I am here to live out loud.",
    byline: "Quote page proof / Emile Zola",
    style: "display",
  },
  {
    slug: "not-afraid-of-storms-print",
    title: "Not Afraid of Storms",
    line: "I am not afraid of storms.",
    byline: "Quote page proof / Louisa May Alcott",
    style: "serif",
  },
  {
    slug: "never-too-late-print",
    title: "Never Too Late",
    line: "It is never too late.",
    byline: "Quote page proof / George Eliot",
    style: "display",
  },
  {
    slug: "custom-quote-print",
    title: "Custom Quote Print",
    line: "Your words here.",
    byline: "Custom proof builder",
    style: "serif",
  },
];

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function wrapWords(text, maxLength) {
  return text.split(" ").reduce((lines, word) => {
    const current = lines[lines.length - 1] ?? "";
    if (`${current} ${word}`.trim().length > maxLength) lines.push(word);
    else lines[lines.length - 1] = `${current} ${word}`.trim();
    return lines;
  }, [""]);
}

function tspans(lines, x, dy) {
  return lines
    .map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : dy}">${escapeXml(line)}</tspan>`)
    .join("");
}

async function fontFace({ family, file, style = "normal", weight = "400" }) {
  const data = await fs.readFile(path.join(FONT_DIR, file));
  return `
@font-face {
  font-family: '${family}';
  font-style: ${style};
  font-weight: ${weight};
  src: url(data:font/truetype;base64,${data.toString("base64")}) format('truetype');
}`;
}

async function fontCss() {
  return [
    await fontFace({ family: "Bebas Neue", file: "BebasNeue.ttf" }),
    await fontFace({ family: "Playfair Display", file: "PlayfairDisplay.ttf", weight: "700" }),
    await fontFace({ family: "Playfair Display", file: "PlayfairItalic.ttf", style: "italic", weight: "700" }),
    await fontFace({ family: "DM Sans", file: "DMSans.ttf", weight: "400" }),
  ].join("\n");
}

function mockupSvg(print, fontCss) {
  const width = 1600;
  const height = 2560;
  const lines = wrapWords(print.line, print.style === "display" ? 13 : 18);
  const isDisplay = print.style === "display";
  const lineHeight = isDisplay ? 152 : 140;
  const fontSize = isDisplay ? 168 : 124;
  const quoteY = Math.round(height / 2 - ((lines.length - 1) * lineHeight + fontSize) / 2 + fontSize * 0.78);
  const titleLines = wrapWords(print.title.toUpperCase(), 12);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeXml(print.title)} print mockup">
  <defs>
    <style><![CDATA[
${fontCss}
    ]]></style>
    <radialGradient id="petalWash" cx="50%" cy="38%" r="62%">
      <stop offset="0" stop-color="${palette.petal}" stop-opacity="0.24"/>
      <stop offset="0.44" stop-color="${palette.petal}" stop-opacity="0.08"/>
      <stop offset="1" stop-color="${palette.void}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="paper" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#141419"/>
      <stop offset="0.48" stop-color="#0e0e12"/>
      <stop offset="1" stop-color="#1a1a20"/>
    </linearGradient>
    <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="34" stdDeviation="44" flood-color="#000000" flood-opacity="0.62"/>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="${palette.void}"/>
  <rect width="100%" height="100%" fill="url(#petalWash)"/>
  <rect x="136" y="150" width="1328" height="2260" fill="url(#paper)" stroke="${palette.graphite}" stroke-width="2" filter="url(#softShadow)"/>
  <rect x="192" y="214" width="1216" height="2132" fill="none" stroke="${palette.petal}" stroke-opacity="0.16" stroke-width="2"/>
  <text x="800" y="330" font-family="'DM Sans', Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="8" text-anchor="middle" fill="${palette.iron}">MK PARRISH PRINT SHOP</text>
  <text x="800" y="560" font-family="'Bebas Neue', 'Arial Narrow', Arial, sans-serif" font-size="132" font-weight="400" letter-spacing="6" text-anchor="middle" fill="${palette.pearl}">
    ${tspans(titleLines, 800, 126)}
  </text>
  <line x1="520" x2="1080" y1="760" y2="760" stroke="${palette.petal}" stroke-width="3" opacity="0.7"/>
  <text x="800" y="${quoteY}" font-family="${isDisplay ? "'Bebas Neue', 'Arial Narrow', Arial, sans-serif" : "'Playfair Display', Georgia, serif"}" font-size="${fontSize}" font-weight="${isDisplay ? 400 : 700}" ${isDisplay ? 'letter-spacing="7"' : 'font-style="italic"'} text-anchor="middle" fill="${isDisplay ? palette.pearl : palette.blush}">
    ${tspans(lines, 800, lineHeight)}
  </text>
  <line x1="600" x2="1000" y1="1780" y2="1780" stroke="${palette.petal}" stroke-width="3" opacity="0.58"/>
  <text x="800" y="1910" font-family="'DM Sans', Arial, sans-serif" font-size="38" font-weight="300" text-anchor="middle" fill="${palette.smoke}">${escapeXml(print.byline)}</text>
  <text x="800" y="2210" font-family="'DM Sans', Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="7" text-anchor="middle" fill="${palette.iron}">5x7 / 8x10 / 11x14 / 16x20</text>
</svg>`;
}

await fs.mkdir(COVER_DIR, { recursive: true });

const embeddedFonts = await fontCss();

for (const print of prints) {
  const svg = mockupSvg(print, embeddedFonts);
  const out = path.join(COVER_DIR, `${print.slug}-cover.jpg`);
  await sharp(Buffer.from(svg)).jpeg({ quality: 92, mozjpeg: true }).toFile(out);
}

console.log(`Generated ${prints.length} print shop mockups in ${COVER_DIR}`);
