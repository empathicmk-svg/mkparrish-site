import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "output", "neon-wall-art");
const SVG_DIR = path.join(OUT, "svg");
const PNG_DIR = path.join(OUT, "png");
const JPG_DIR = path.join(OUT, "jpg");
const PUBLIC_DIR = path.join(ROOT, "public", "neon-wall-art");

const palette = {
  pink: "#ff5cac",
  pinkHot: "#ff2f99",
  blush: "#ffd7ed",
  white: "#fff7fb",
  smoke: "#b8bbc4",
  gray: "#737782",
  graphite: "#25262b",
  void: "#07070a",
};

const designs = [
  {
    slug: "stop-being-misread",
    phrase: "Stop being misread.",
    subtitle: "Sharp brand voice neon wall art",
    format: "square",
    lines: ["STOP", "BEING", "MISREAD"],
    category: "quote",
    style: "display",
  },
  {
    slug: "safe-is-invisible",
    phrase: "Safe is invisible.",
    subtitle: "Positioning line in hot pink",
    format: "landscape",
    lines: ["SAFE IS", "INVISIBLE"],
    category: "quote",
    style: "display",
  },
  {
    slug: "voice-is-the-moat",
    phrase: "The voice is the moat.",
    subtitle: "Brand voice wall art",
    format: "square",
    lines: ["THE VOICE", "IS THE", "MOAT"],
    category: "quote",
    style: "display",
  },
  {
    slug: "start-where-it-gets-interesting",
    phrase: "Start where it gets interesting.",
    subtitle: "Copy desk neon statement",
    format: "landscape",
    lines: ["START WHERE", "IT GETS", "INTERESTING"],
    category: "quote",
    style: "display",
  },
  {
    slug: "first-line-one-job",
    phrase: "The first line has one job.",
    subtitle: "Writing-room neon rule",
    format: "landscape",
    lines: ["THE FIRST", "LINE HAS", "ONE JOB"],
    category: "quote",
    style: "display",
  },
  {
    slug: "i-am-the-author",
    phrase: "I am the author. I always have been.",
    subtitle: "Script neon line from The Rewrite",
    format: "portrait",
    lines: ["I am the", "author.", "I always", "have been."],
    category: "quote",
    style: "script",
  },
  {
    slug: "every-scar-a-sentence",
    phrase: "Every scar now a sentence.",
    subtitle: "Poetry line in soft pink",
    format: "square",
    lines: ["Every scar", "now a", "sentence."],
    category: "quote",
    style: "script",
  },
  {
    slug: "she-just-wanted-to-begin",
    phrase: "She just wanted to begin.",
    subtitle: "Glowing pink poetry line",
    format: "portrait",
    lines: ["She just", "wanted", "to begin"],
    category: "quote",
    style: "script",
  },
  {
    slug: "load-bearing-weirdness",
    phrase: "Keep the load-bearing weirdness.",
    subtitle: "A studio rule for memorable voice",
    format: "portrait",
    lines: ["Keep the", "load-bearing", "weirdness."],
    category: "quote",
    style: "script",
  },
  {
    slug: "woman-im-becoming",
    phrase: "The woman I'm becoming is the whole reason I came.",
    subtitle: "Reinvention line in script neon",
    format: "portrait",
    lines: ["The woman", "I'm becoming", "is the whole", "reason", "I came."],
    category: "quote",
    style: "script",
  },
  {
    slug: "your-words-here",
    phrase: "Your words here.",
    subtitle: "Custom phrase preview",
    format: "landscape",
    lines: ["Your words", "here"],
    category: "custom",
    style: "display",
  },
  {
    slug: "custom-neon-phrase",
    phrase: "Custom neon phrase.",
    subtitle: "Online order proof mockup",
    format: "landscape",
    lines: ["Custom", "neon phrase"],
    category: "custom",
    style: "display",
  },
  {
    slug: "choose-your-glow",
    phrase: "Choose your glow.",
    subtitle: "Pink, white, or smoke gray",
    format: "square",
    lines: ["Choose", "your glow"],
    category: "custom",
    style: "display",
  },
  {
    slug: "make-it-yours",
    phrase: "Make it yours.",
    subtitle: "Personalized neon wall art",
    format: "square",
    lines: ["Make it", "yours"],
    category: "custom",
    style: "script",
  },
  {
    slug: "name-date-vow",
    phrase: "Name + date + vow.",
    subtitle: "Wedding, studio, and bedroom neon concept",
    format: "landscape",
    lines: ["Name", "+ date", "+ vow"],
    category: "custom",
    style: "display",
  },
  {
    slug: "approve-the-proof",
    phrase: "Approve the proof.",
    subtitle: "Ordering flow sign mockup",
    format: "square",
    lines: ["Approve", "the proof"],
    category: "custom",
    style: "display",
  },
  {
    slug: "hang-the-feeling",
    phrase: "Hang the feeling.",
    subtitle: "Custom wall art sales phrase",
    format: "landscape",
    lines: ["Hang", "the feeling"],
    category: "custom",
    style: "script",
  },
  {
    slug: "upload-a-line",
    phrase: "Upload a line.",
    subtitle: "Turn a private sentence into wall art",
    format: "square",
    lines: ["Upload", "a line"],
    category: "custom",
    style: "display",
  },
];

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function dims(format) {
  if (format === "portrait") return { width: 1800, height: 2400 };
  if (format === "square") return { width: 2000, height: 2000 };
  return { width: 2400, height: 1600 };
}

function fontSizeFor(lines, width, height, category, style) {
  const longest = Math.max(...lines.map((line) => line.length));
  const isDisplay = style === "display";
  const widthFactor = isDisplay ? 0.48 : 0.56;
  const widthFit = (width * 0.73) / Math.max(longest * widthFactor, 1);
  const heightFit = (height * (isDisplay ? 0.46 : 0.42)) / Math.max(lines.length * 1.05, 1);
  const max = category === "custom" || isDisplay ? 240 : 205;
  return Math.round(Math.max(88, Math.min(max, widthFit, heightFit)));
}

function tspans(lines, x, lineHeight) {
  return lines
    .map((line, index) => {
      const dy = index === 0 ? 0 : lineHeight;
      return `<tspan x="${x}" dy="${dy}">${escapeXml(line)}</tspan>`;
    })
    .join("");
}

function wrapPlainText(text, maxLength) {
  return text.split(" ").reduce((lines, word) => {
    const current = lines[lines.length - 1] ?? "";
    if (`${current} ${word}`.trim().length > maxLength) lines.push(word);
    else lines[lines.length - 1] = `${current} ${word}`.trim();
    return lines;
  }, [""]);
}

function flowTspans(text, x, maxLength, dy) {
  return wrapPlainText(text, maxLength)
    .map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : dy}">${escapeXml(line)}</tspan>`)
    .join("");
}

function neonText({ lines, width, height, category, style }) {
  const textStyle = style ?? (category === "custom" ? "display" : "script");
  const isDisplay = textStyle === "display";
  const fontSize = fontSizeFor(lines, width, height, category, textStyle);
  const lineHeight = Math.round(fontSize * (isDisplay ? 0.92 : 1.08));
  const x = Math.round(width / 2);
  const blockHeight = lineHeight * (lines.length - 1) + fontSize;
  const y = Math.round(height / 2 - blockHeight / 2 + fontSize * 0.78);
  const family = isDisplay
    ? "'Bebas Neue', 'Anton', 'Arial Narrow', Arial, sans-serif"
    : "'Playfair Display', 'Cormorant Garamond', Georgia, serif";
  const weight = isDisplay ? 700 : 700;
  const text = tspans(lines, x, lineHeight);

  return `
    <g font-family="${family}" font-size="${fontSize}" font-weight="${weight}" ${isDisplay ? "" : 'font-style="italic"'} text-anchor="middle" letter-spacing="${isDisplay ? "8" : "0"}">
      <text x="${x}" y="${y}" fill="none" stroke="${palette.pinkHot}" stroke-width="20" stroke-linejoin="round" opacity="0.28" filter="url(#glowMax)">${text}</text>
      <text x="${x}" y="${y}" fill="none" stroke="${palette.pink}" stroke-width="12" stroke-linejoin="round" opacity="0.55" filter="url(#glowWide)">${text}</text>
      <text x="${x}" y="${y}" fill="none" stroke="${palette.blush}" stroke-width="5" stroke-linejoin="round" opacity="0.92" filter="url(#glowTight)">${text}</text>
      <text x="${x}" y="${y}" fill="${isDisplay ? palette.white : palette.blush}" stroke="${palette.white}" stroke-width="1.5" paint-order="stroke" opacity="0.98">${text}</text>
    </g>`;
}

function mockupSvg(design) {
  const { width, height } = dims(design.format);
  const panelPad = Math.round(Math.min(width, height) * 0.09);
  const panelX = panelPad;
  const panelY = panelPad;
  const panelW = width - panelPad * 2;
  const panelH = height - panelPad * 2;
  const lineY = panelY + panelH - Math.round(panelH * 0.12);
  const categoryLabel = design.category === "custom" ? "CUSTOM ORDER MOCKUP" : "QUOTE WALL ART";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeXml(design.phrase)} neon wall art mockup">
  <defs>
    <linearGradient id="wall" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#121216"/>
      <stop offset="0.48" stop-color="#1d1d23"/>
      <stop offset="1" stop-color="#0a0a0d"/>
    </linearGradient>
    <radialGradient id="pinkWash" cx="50%" cy="44%" r="58%">
      <stop offset="0" stop-color="${palette.pink}" stop-opacity="0.25"/>
      <stop offset="0.46" stop-color="${palette.pinkHot}" stop-opacity="0.12"/>
      <stop offset="1" stop-color="${palette.void}" stop-opacity="0"/>
    </radialGradient>
    <filter id="noise" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer>
        <feFuncA type="table" tableValues="0 0.12"/>
      </feComponentTransfer>
    </filter>
    <filter id="glowMax" x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="35" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="glowWide" x="-70%" y="-70%" width="240%" height="240%">
      <feGaussianBlur stdDeviation="18" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <filter id="glowTight" x="-55%" y="-55%" width="210%" height="210%">
      <feGaussianBlur stdDeviation="5" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#wall)"/>
  <rect width="100%" height="100%" filter="url(#noise)" opacity="0.35"/>
  <rect width="100%" height="100%" fill="url(#pinkWash)"/>
  <g opacity="0.2">
    ${Array.from({ length: 16 }, (_, i) => {
      const y = Math.round((height / 16) * i);
      return `<line x1="0" x2="${width}" y1="${y}" y2="${y}" stroke="${palette.gray}" stroke-width="1"/>`;
    }).join("")}
  </g>
  <rect x="${panelX}" y="${panelY}" width="${panelW}" height="${panelH}" rx="34" fill="#09090c" opacity="0.58" stroke="${palette.gray}" stroke-opacity="0.28" stroke-width="2"/>
  <rect x="${panelX + 18}" y="${panelY + 18}" width="${panelW - 36}" height="${panelH - 36}" rx="24" fill="none" stroke="${palette.white}" stroke-opacity="0.08" stroke-width="2"/>
  <circle cx="${panelX + 48}" cy="${panelY + 48}" r="12" fill="${palette.smoke}" opacity="0.42"/>
  <circle cx="${panelX + panelW - 48}" cy="${panelY + 48}" r="12" fill="${palette.smoke}" opacity="0.42"/>
  <circle cx="${panelX + 48}" cy="${panelY + panelH - 48}" r="12" fill="${palette.smoke}" opacity="0.42"/>
  <circle cx="${panelX + panelW - 48}" cy="${panelY + panelH - 48}" r="12" fill="${palette.smoke}" opacity="0.42"/>
  ${neonText({ lines: design.lines, width, height, category: design.category, style: design.style })}
  <line x1="${Math.round(width * 0.24)}" x2="${Math.round(width * 0.76)}" y1="${lineY}" y2="${lineY}" stroke="${palette.pink}" stroke-width="3" opacity="0.65" filter="url(#glowTight)"/>
  <text x="${Math.round(width / 2)}" y="${lineY + 58}" font-family="'DM Sans', Arial, sans-serif" font-size="34" font-weight="700" text-anchor="middle" letter-spacing="8" fill="${palette.smoke}" opacity="0.82">${escapeXml(categoryLabel)}</text>
  <text x="${Math.round(width / 2)}" y="${lineY + 112}" font-family="'DM Sans', Arial, sans-serif" font-size="36" font-weight="300" text-anchor="middle" fill="${palette.white}" opacity="0.76">${escapeXml(design.subtitle)}</text>
</svg>`;
}

function customizerSvg() {
  const width = 2400;
  const height = 1600;
  const steps = [
    ["01", "Pick a line", "Quote, vow, name, lyric-length phrase."],
    ["02", "Choose the glow", "Pink, soft white, smoke gray, or mixed."],
    ["03", "Approve proof", "A digital mockup before production."],
    ["04", "Hang it", "Made as wall art, not a generic sign."],
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Custom neon wall art online ordering flow">
  <defs>
    <linearGradient id="wall" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#101014"/>
      <stop offset="1" stop-color="#050507"/>
    </linearGradient>
    <filter id="pinkGlow" x="-70%" y="-70%" width="240%" height="240%">
      <feGaussianBlur stdDeviation="18" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="whiteGlow" x="-70%" y="-70%" width="240%" height="240%">
      <feGaussianBlur stdDeviation="10" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="100%" height="100%" fill="url(#wall)"/>
  <rect x="130" y="120" width="2140" height="1360" rx="42" fill="#0b0b0f" stroke="${palette.gray}" stroke-opacity="0.3" stroke-width="2"/>
  <text x="1200" y="300" font-family="'Bebas Neue', 'Arial Narrow', Arial, sans-serif" font-size="156" font-weight="700" text-anchor="middle" letter-spacing="10" fill="${palette.blush}" filter="url(#pinkGlow)">CUSTOM NEON</text>
  <text x="1200" y="410" font-family="'Playfair Display', Georgia, serif" font-size="86" font-weight="700" text-anchor="middle" fill="${palette.white}" filter="url(#whiteGlow)">your words, made luminous</text>
  <g transform="translate(270 590)">
    ${steps.map((step, index) => {
      const x = index * 470;
      return `
        <g transform="translate(${x} 0)">
          <rect width="390" height="520" rx="28" fill="#15151b" stroke="${palette.gray}" stroke-opacity="0.38"/>
          <circle cx="70" cy="78" r="34" fill="none" stroke="${palette.pink}" stroke-width="5" filter="url(#pinkGlow)"/>
          <text x="70" y="90" font-family="'JetBrains Mono', monospace" font-size="28" font-weight="700" text-anchor="middle" fill="${palette.white}">${step[0]}</text>
          <text x="42" y="178" font-family="'Bebas Neue', 'Arial Narrow', Arial, sans-serif" font-size="56" font-weight="700" letter-spacing="3" fill="${palette.blush}">${flowTspans(step[1], 42, 13, 62)}</text>
          <text x="42" y="312" font-family="'DM Sans', Arial, sans-serif" font-size="34" font-weight="300" fill="${palette.smoke}">${flowTspans(step[2], 42, 23, 48)}</text>
          <line x1="42" x2="348" y1="440" y2="440" stroke="${index % 2 ? palette.white : palette.pink}" stroke-width="4" opacity="0.8" filter="${index % 2 ? "url(#whiteGlow)" : "url(#pinkGlow)"}"/>
        </g>`;
    }).join("")}
  </g>
  <text x="1200" y="1350" font-family="'DM Sans', Arial, sans-serif" font-size="42" font-weight="700" text-anchor="middle" letter-spacing="8" fill="${palette.smoke}">PINK · WHITE · SMOKE GRAY</text>
</svg>`;
}

async function writeDesign(design) {
  const svg = mockupSvg(design);
  const svgPath = path.join(SVG_DIR, `${design.slug}.svg`);
  const pngPath = path.join(PNG_DIR, `${design.slug}.png`);
  const jpgPath = path.join(JPG_DIR, `${design.slug}.jpg`);
  const publicJpgPath = path.join(PUBLIC_DIR, `${design.slug}.jpg`);
  await fs.writeFile(svgPath, svg);
  await sharp(Buffer.from(svg)).png().toFile(pngPath);
  await sharp(Buffer.from(svg)).jpeg({ quality: 92, mozjpeg: true }).toFile(jpgPath);
  await sharp(Buffer.from(svg)).jpeg({ quality: 88, mozjpeg: true }).toFile(publicJpgPath);
  return {
    ...design,
    svgPath,
    pngPath,
    jpgPath,
    publicJpgPath,
    ...dims(design.format),
  };
}

async function makeContactSheet(rendered) {
  const thumbW = 480;
  const thumbH = 480;
  const cols = 4;
  const gap = 26;
  const labelH = 90;
  const rows = Math.ceil(rendered.length / cols);
  const width = cols * thumbW + (cols + 1) * gap;
  const height = rows * (thumbH + labelH) + (rows + 1) * gap + 120;
  const composites = [];

  for (let index = 0; index < rendered.length; index += 1) {
    const item = rendered[index];
    const col = index % cols;
    const row = Math.floor(index / cols);
    const left = gap + col * (thumbW + gap);
    const top = gap + 80 + row * (thumbH + labelH + gap);
    const image = await sharp(item.pngPath)
      .resize(thumbW, thumbH, { fit: "contain", background: "#07070aff" })
      .png()
      .toBuffer();
    composites.push({ input: image, left, top });

    const labelSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${thumbW}" height="${labelH}">
      <rect width="100%" height="100%" fill="#101014"/>
      <text x="20" y="36" font-family="Arial, sans-serif" font-size="24" font-weight="700" fill="${palette.blush}">${escapeXml(item.phrase)}</text>
      <text x="20" y="70" font-family="Arial, sans-serif" font-size="20" fill="${palette.smoke}">${escapeXml(item.category.toUpperCase())} · ${item.format}</text>
    </svg>`;
    composites.push({ input: Buffer.from(labelSvg), left, top: top + thumbH });
  }

  const titleSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="90">
    <rect width="100%" height="100%" fill="#07070a"/>
    <text x="${gap}" y="54" font-family="Arial, sans-serif" font-size="44" font-weight="700" fill="${palette.blush}">MK Parrish neon wall art mockups</text>
    <text x="${width - gap}" y="54" text-anchor="end" font-family="Arial, sans-serif" font-size="26" fill="${palette.smoke}">${rendered.length} concepts · pink white gray</text>
  </svg>`;
  composites.push({ input: Buffer.from(titleSvg), left: 0, top: 0 });

  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: "#07070aff",
    },
  })
    .composite(composites)
    .png()
    .toFile(path.join(OUT, "contact-sheet.png"));
  await sharp(path.join(OUT, "contact-sheet.png"))
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(path.join(OUT, "contact-sheet.jpg"));
  await sharp(path.join(OUT, "contact-sheet.png"))
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(PUBLIC_DIR, "contact-sheet.jpg"));
}

async function makeGallery(rendered) {
  const cards = rendered.map((item) => {
    const png = `png/${item.slug}.png`;
    const svg = `svg/${item.slug}.svg`;
    return `<article>
      <img src="${png}" alt="${escapeXml(item.phrase)}">
      <div>
        <p>${escapeXml(item.category)} / ${escapeXml(item.format)}</p>
        <h2>${escapeXml(item.phrase)}</h2>
        <a href="${png}">PNG</a>
        <a href="${svg}">SVG</a>
      </div>
    </article>`;
  }).join("\n");

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>MK Parrish Neon Wall Art Mockups</title>
  <style>
    body { margin: 0; background: #07070a; color: #fff7fb; font-family: Arial, sans-serif; }
    header { padding: 48px 28px 18px; max-width: 1260px; margin: auto; }
    h1 { margin: 0; font-size: 44px; text-transform: uppercase; letter-spacing: 0.04em; }
    header p { color: #b8bbc4; font-size: 18px; }
    main { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 18px; max-width: 1260px; margin: auto; padding: 28px; }
    article { background: #121216; border: 1px solid #34343a; }
    img { width: 100%; aspect-ratio: 1 / 1; object-fit: cover; display: block; background: #0b0b0f; }
    div { padding: 18px; }
    h2 { margin: 8px 0 16px; font-size: 22px; line-height: 1.15; }
    p { margin: 0; color: #ff9bcb; font-size: 12px; text-transform: uppercase; letter-spacing: 0.16em; }
    a { display: inline-block; margin-right: 12px; color: #ffd7ed; font-weight: 700; text-decoration: none; }
  </style>
</head>
<body>
  <header>
    <h1>Neon wall art mockups</h1>
    <p>Editable SVG masters and PNG proofs in glowing pink, white, and smoke gray.</p>
  </header>
  <main>${cards}</main>
</body>
</html>`;
  await fs.writeFile(path.join(OUT, "index.html"), html);
}

async function makeReadme(rendered) {
  const quoteCount = rendered.filter((item) => item.category === "quote").length;
  const customCount = rendered.filter((item) => item.category === "custom").length;
  const lines = [
    "# Neon wall art mockups",
    "",
    `Generated ${rendered.length} neon wall-art concepts: ${quoteCount} quote pieces and ${customCount} customization/order phrase pieces.`,
    "",
    "- `png/` contains sell-sheet/product-preview PNGs.",
    "- `svg/` contains editable vector masters with exact phrase text.",
    "- `contact-sheet.png` previews the full batch.",
    "- `index.html` is a local gallery for browsing the set.",
    "",
    "Palette: glowing pink, soft white, smoke gray, black/graphite wall.",
    "",
    "Suggested product flow copy:",
    "",
    "1. Pick a quote, vow, name, or short private line.",
    "2. Choose glow color: pink, soft white, smoke gray, or mixed.",
    "3. Approve the digital proof.",
    "4. Produce and ship the finished wall art.",
  ];
  await fs.writeFile(path.join(OUT, "README.md"), `${lines.join("\n")}\n`);
}

async function makeManifest(rendered) {
  const manifest = {
    generatedAt: new Date().toISOString(),
    designs: rendered.map((item) => ({
      slug: item.slug,
      phrase: item.phrase,
      subtitle: item.subtitle ?? "Custom neon wall art",
      category: item.category,
      style: item.style ?? (item.category === "custom" ? "display" : "script"),
      format: item.format,
      width: item.width ?? 2400,
      height: item.height ?? 1600,
      image: `/neon-wall-art/${item.slug}.jpg`,
    })),
  };
  const json = `${JSON.stringify(manifest, null, 2)}\n`;
  await fs.writeFile(path.join(OUT, "manifest.json"), json);
  await fs.writeFile(path.join(PUBLIC_DIR, "manifest.json"), json);
}

await fs.rm(OUT, { recursive: true, force: true });
await fs.rm(PUBLIC_DIR, { recursive: true, force: true });
await fs.mkdir(SVG_DIR, { recursive: true });
await fs.mkdir(PNG_DIR, { recursive: true });
await fs.mkdir(JPG_DIR, { recursive: true });
await fs.mkdir(PUBLIC_DIR, { recursive: true });

const rendered = [];
for (const design of designs) {
  rendered.push(await writeDesign(design));
}

const flowSvgPath = path.join(SVG_DIR, "customizer-ordering-flow.svg");
const flowPngPath = path.join(PNG_DIR, "customizer-ordering-flow.png");
const flowJpgPath = path.join(JPG_DIR, "customizer-ordering-flow.jpg");
const flowPublicJpgPath = path.join(PUBLIC_DIR, "customizer-ordering-flow.jpg");
const flowSvg = customizerSvg();
await fs.writeFile(flowSvgPath, flowSvg);
await sharp(Buffer.from(flowSvg)).png().toFile(flowPngPath);
await sharp(Buffer.from(flowSvg)).jpeg({ quality: 92, mozjpeg: true }).toFile(flowJpgPath);
await sharp(Buffer.from(flowSvg)).jpeg({ quality: 88, mozjpeg: true }).toFile(flowPublicJpgPath);
rendered.push({
  slug: "customizer-ordering-flow",
  phrase: "Custom neon ordering flow",
  subtitle: "Pick a line, choose the glow, approve the proof, hang it",
  category: "custom",
  format: "landscape",
  width: 2400,
  height: 1600,
  svgPath: flowSvgPath,
  pngPath: flowPngPath,
  jpgPath: flowJpgPath,
  publicJpgPath: flowPublicJpgPath,
});

await makeContactSheet(rendered);
await makeGallery(rendered);
await makeReadme(rendered);
await makeManifest(rendered);

console.log(`Generated ${rendered.length} neon wall art mockups in ${OUT}`);
console.log(`Copied site-ready JPGs to ${PUBLIC_DIR}`);
