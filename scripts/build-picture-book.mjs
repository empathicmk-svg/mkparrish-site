/*
 * Illustrated picture-book renderer for The Little Rewrites.
 *
 * Unlike the markdown → HTML → PDF pipeline (text-only), these books are
 * built spread-by-spread: each page is a full-bleed original vector
 * illustration (inline SVG) with a short line of story text. Renders:
 *   - public/downloads/ebooks/<slug>.pdf         (square illustrated interior)
 *   - public/downloads/covers/<slug>-cover.jpg   (portrait illustrated cover)
 *
 * Usage: node scripts/build-picture-book.mjs [slug-filter]
 * Needs PUPPETEER_EXECUTABLE_PATH + NODE_EXTRA_CA_CERTS in this sandbox.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const EBOOKS = path.join(ROOT, 'public/downloads/ebooks');
const COVERS = path.join(ROOT, 'public/downloads/covers');

const fontCss = fs.readFileSync(path.join(ROOT, 'marketing/founding-redesign/fonts.css'), 'utf8');

// ── shared palette (grayscale + one warm accent) ─────────────────────────────
const C = {
  ink:'#17181a', slate:'#33373d', steel:'#565c65', ash:'#828a94', silver:'#aeb6bf',
  mist:'#d6dbe0', cloud:'#e9edf1', paper:'#f5f7f8', white:'#ffffff',
  petal:'#F2AFC6', rose:'#E0869F', blush:'#FFE0EC',
};

// ── little reusable illustration pieces ──────────────────────────────────────
// A small child: round head, bob, pink pinafore. Drawn around local origin.
const girl = ({ x = 0, y = 0, s = 1, skin = '#e8d7cf', hair = C.slate, dress = C.rose, face = true } = {}) => `
  <g transform="translate(${x},${y}) scale(${s})">
    <ellipse cx="0" cy="170" rx="70" ry="16" fill="#000" opacity="0.10"/>
    <path d="M-46 60 Q-58 150 -40 168 L40 168 Q58 150 46 60 Z" fill="${dress}"/>
    <path d="M-46 60 Q0 44 46 60 L40 96 Q0 82 -40 96 Z" fill="${dress}" opacity="0.85"/>
    <rect x="-50" y="52" width="100" height="16" rx="8" fill="${dress}"/>
    <circle cx="0" cy="6" r="42" fill="${skin}"/>
    <path d="M-44 4 Q-48 -46 0 -50 Q48 -46 44 4 Q42 -14 26 -18 Q0 -24 -26 -18 Q-42 -14 -44 4 Z" fill="${hair}"/>
    <path d="M-44 4 Q-46 34 -34 44 L-30 8 Z" fill="${hair}"/>
    <path d="M44 4 Q46 34 34 44 L30 8 Z" fill="${hair}"/>
    ${face ? `
    <circle cx="-15" cy="4" r="4.2" fill="${C.ink}"/>
    <circle cx="15" cy="4" r="4.2" fill="${C.ink}"/>
    <path d="M-13 24 Q0 32 13 24" stroke="${C.ink}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <circle cx="-24" cy="16" r="7" fill="${C.petal}" opacity="0.55"/>
    <circle cx="24" cy="16" r="7" fill="${C.petal}" opacity="0.55"/>` : ''}
  </g>`;

const dove = (x, y, s, fill) => `
  <g transform="translate(${x},${y}) scale(${s})">
    <ellipse cx="0" cy="0" rx="34" ry="17" fill="${fill}"/>
    <circle cx="26" cy="-9" r="11" fill="${fill}"/>
    <path d="M32 -12 l14 -3 -10 8 Z" fill="${C.ash}"/>
    <path d="M-6 -6 Q-30 -34 -46 -16 Q-24 -12 -6 4 Z" fill="${fill}" opacity="0.9"/>
    <path d="M-30 6 l-20 8 18 2 Z" fill="${fill}" opacity="0.8"/>
    <circle cx="30" cy="-11" r="2.2" fill="${C.ink}"/>
  </g>`;

const moth = (x, y, s, fill) => `
  <g transform="translate(${x},${y}) scale(${s})">
    <ellipse cx="-16" cy="0" rx="17" ry="24" fill="${fill}" opacity="0.9"/>
    <ellipse cx="16" cy="0" rx="17" ry="24" fill="${fill}" opacity="0.9"/>
    <ellipse cx="-13" cy="18" rx="11" ry="15" fill="${fill}" opacity="0.7"/>
    <ellipse cx="13" cy="18" rx="11" ry="15" fill="${fill}" opacity="0.7"/>
    <rect x="-3" y="-18" width="6" height="40" rx="3" fill="${C.slate}"/>
    <path d="M0 -18 q-8 -14 -16 -16" stroke="${C.slate}" stroke-width="2" fill="none"/>
    <path d="M0 -18 q8 -14 16 -16" stroke="${C.slate}" stroke-width="2" fill="none"/>
  </g>`;

// grain / soft noise overlay so flat fills don't feel sterile
const GRAIN = `
  <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
  <feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.05"/></feComponentTransfer>
  <feComposite operator="over" in2="SourceGraphic"/></filter>`;

// ── the spreads of "The Girl Who Loved Gray" ─────────────────────────────────
const W = 1000, H = 1000;
const svg = (defs, body) => `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><defs>${GRAIN}${defs}</defs>${body}</svg>`;

const grayLoveSpreads = [
  // 1 — TITLE
  { title: true, art: svg(
    `<linearGradient id="t" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${C.cloud}"/><stop offset="0.5" stop-color="${C.mist}"/><stop offset="1" stop-color="${C.silver}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#t)"/>
     <rect x="0" y="0" width="500" height="${H}" fill="${C.ink}" opacity="0.92"/>
     <rect x="500" y="0" width="500" height="${H}" fill="${C.white}"/>
     <circle cx="500" cy="560" r="230" fill="url(#t)"/>
     ${girl({ x: 500, y: 470, s: 1.7, dress: C.petal })}`),
    text: '' },

  // 2 — two colors
  { art: svg('',
    `<rect width="${W}" height="${H}" fill="${C.paper}"/>
     <rect x="70" y="120" width="380" height="620" fill="${C.ink}"/>
     <rect x="550" y="120" width="380" height="620" fill="${C.white}" stroke="${C.mist}" stroke-width="3"/>
     <line x1="500" y1="90" x2="500" y2="770" stroke="${C.slate}" stroke-width="6" stroke-dasharray="2 18" stroke-linecap="round"/>
     <text x="260" y="450" font-family="'Bebas Neue'" font-size="120" fill="${C.white}" text-anchor="middle">YES</text>
     <text x="740" y="450" font-family="'Bebas Neue'" font-size="120" fill="${C.ink}" text-anchor="middle">NO</text>`),
    text: 'They will tell you the world comes in two colors. Black, and white. Yes or no. Good or bad. Pick a side, they say — <em>quickly.</em>' },

  // 3 — the tight line
  { art: svg(
    `<linearGradient id="g3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.cloud}"/><stop offset="1" stop-color="${C.mist}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#g3)"/>
     <rect x="0" y="620" width="500" height="380" fill="${C.ink}" opacity="0.9"/>
     <rect x="500" y="620" width="500" height="380" fill="${C.white}"/>
     <line x1="500" y1="620" x2="500" y2="1000" stroke="${C.slate}" stroke-width="4" stroke-dasharray="2 16"/>
     ${girl({ x: 500, y: 470, s: 1.5, dress: C.rose })}
     <path d="M470 470 q30 -60 -6 -120" stroke="${C.steel}" stroke-width="4" fill="none" opacity="0.5" stroke-dasharray="3 10"/>`),
    text: 'Marlowe tried. She really did. But standing on the hard white line, with the hard black line beside it, something in her felt tight, and small, and not quite true.' },

  // 4 — the fog comes
  { art: svg(
    `<linearGradient id="g4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.silver}"/><stop offset="1" stop-color="${C.cloud}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#g4)"/>
     <path d="M0 700 Q250 660 500 700 T1000 700 V1000 H0 Z" fill="${C.mist}" opacity="0.7"/>
     ${[0.15,0.35,0.55,0.75].map((o,i)=>`<ellipse cx="${180+i*230}" cy="${520+ (i%2)*80}" rx="360" ry="90" fill="${C.white}" opacity="${o}"/>`).join('')}
     ${girl({ x: 500, y: 560, s: 1.4, dress: C.petal })}
     <ellipse cx="500" cy="560" rx="340" ry="120" fill="${C.white}" opacity="0.35"/>`),
    text: 'Then, one gray morning, the fog came. It rolled down the hills like a slow, soft breath and swallowed the sharp edges of everything. Marlowe stepped in, and the fog held her like a secret.' },

  // 5 — hundreds of grays / doves
  { art: svg(
    `<linearGradient id="g5" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.cloud}"/><stop offset="1" stop-color="${C.silver}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#g5)"/>
     <line x1="-20" y1="300" x2="1020" y2="360" stroke="${C.steel}" stroke-width="4"/>
     ${dove(230,300,1.5,C.silver)}${dove(430,318,1.3,C.ash)}${dove(620,332,1.6,C.mist)}${dove(800,348,1.2,C.steel)}
     ${dove(150,690,1.7,C.ash)}${dove(760,720,1.5,C.silver)}
     ${girl({ x: 470, y: 700, s: 1.5, dress: C.rose })}`),
    text: 'In the fog she found gray. Not one gray — <em>hundreds.</em> Dove gray and smoke gray, the gray of old silver, the gray of a pigeon\'s wing catching the light.' },

  // 6 — rain on glass
  { art: svg(
    `<linearGradient id="g6" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.steel}"/><stop offset="1" stop-color="${C.slate}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#g6)"/>
     <rect x="120" y="90" width="760" height="820" rx="10" fill="${C.ash}" opacity="0.35" stroke="${C.mist}" stroke-width="10"/>
     <line x1="500" y1="90" x2="500" y2="910" stroke="${C.mist}" stroke-width="8"/>
     <line x1="120" y1="500" x2="880" y2="500" stroke="${C.mist}" stroke-width="8"/>
     ${Array.from({length:26}).map((_,i)=>`<line x1="${140+i*30}" y1="${120+ (i%5)*20}" x2="${120+i*30}" y2="${880}" stroke="${C.cloud}" stroke-width="2.5" opacity="0.5"/>`).join('')}
     ${Array.from({length:16}).map((_,i)=>`<circle cx="${180+ (i*47)%680}" cy="${180+ (i*90)%660}" r="${5+ (i%3)*3}" fill="${C.cloud}" opacity="0.55"/>`).join('')}
     ${girl({ x: 300, y: 720, s: 1.1, dress: C.petal, face:true })}`),
    text: 'Rain came next, tapping its gray fingers on the glass. The whole street went soft and shining and pewter. She pressed her nose to the window and breathed the cool, wet gray of it.' },

  // 7 — the storm
  { art: svg(
    `<linearGradient id="g7" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.slate}"/><stop offset="0.6" stop-color="${C.steel}"/><stop offset="1" stop-color="${C.silver}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#g7)"/>
     ${[[250,300,150],[480,250,190],[700,320,150],[560,380,120]].map(([cx,cy,r])=>`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.slate}" opacity="0.85"/>`).join('')}
     ${[[250,300,150],[480,250,190],[700,320,150]].map(([cx,cy,r])=>`<circle cx="${cx-40}" cy="${cy-30}" r="${r*0.7}" fill="${C.ash}" opacity="0.5"/>`).join('')}
     <path d="M520 430 l-40 120 55 -20 -30 120 90 -160 -55 20 30 -100 Z" fill="${C.blush}" opacity="0.9"/>
     ${girl({ x: 500, y: 800, s: 1.2, dress: C.rose })}`),
    text: 'A storm stacked its clouds like slate. Not scary — <em>enormous.</em> Alive. Thunder rolled somewhere far and gentle, and the sky was every gray at once.' },

  // 8 — twilight
  { art: svg(
    `<linearGradient id="g8" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.slate}"/><stop offset="0.5" stop-color="${C.ash}"/><stop offset="0.72" stop-color="${C.rose}"/><stop offset="1" stop-color="${C.blush}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#g8)"/>
     ${Array.from({length:20}).map((_,i)=>`<circle cx="${60+ (i*97)%900}" cy="${80+ (i*53)%320}" r="${1.5+ (i%3)}" fill="${C.white}" opacity="${0.5+ (i%4)*0.12}"/>`).join('')}
     <circle cx="760" cy="230" r="46" fill="${C.paper}" opacity="0.9"/>
     <circle cx="742" cy="222" r="46" fill="url(#g8)" opacity="0.5"/>
     <path d="M0 760 Q250 720 500 760 T1000 760 V1000 H0 Z" fill="${C.ink}" opacity="0.85"/>
     ${girl({ x: 500, y: 770, s: 1.15, dress: C.petal, face:false })}`),
    text: 'And at the end of the day she found the best gray of all — twilight. The hour that is neither day nor night, when the world holds its breath between two things and is lovely in both.' },

  // 9 — creatures: stones, moths, elephant
  { art: svg(
    `<linearGradient id="g9" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.cloud}"/><stop offset="1" stop-color="${C.mist}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#g9)"/>
     <path d="M60 560 Q300 520 520 560 Q760 600 940 560 L940 1000 L60 1000 Z" fill="${C.silver}" opacity="0.7"/>
     <g opacity="0.95"><path d="M120 640 q120 -120 300 -60 q40 -70 130 -40 q80 -80 190 10 q60 20 40 120 l-30 130 -40 -10 -6 -80 -60 0 -6 80 -70 0 -8 -80 -70 4 -6 76 -66 0 q-70 -60 -22 -160 Z" fill="${C.steel}"/>
       <circle cx="820" cy="600" r="6" fill="${C.ink}"/><path d="M900 620 q40 20 20 60" stroke="${C.steel}" stroke-width="14" fill="none" stroke-linecap="round"/></g>
     ${[[180,860,26],[250,900,20],[360,880,30],[700,890,24],[790,910,18]].map(([x,y,r])=>`<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r*0.7}" fill="${['#8a9099','#aeb6bf','#6b7178','#c3c9cf'][ (x+r)%4 ]}"/>`).join('')}
     ${moth(250,330,1.1,C.silver)}${moth(470,270,0.9,C.mist)}`),
    text: 'She started finding grays everywhere. Wet river stones. Moth wings. Warm ash. The soft velvet of a rabbit\'s ear. The great slow gray of an elephant, blinking in the sun.' },

  // 10 — grandmother's hair
  { art: svg(
    `<radialGradient id="g10" cx="0.5" cy="0.4" r="0.8"><stop offset="0" stop-color="${C.paper}"/><stop offset="1" stop-color="${C.mist}"/></radialGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#g10)"/>
     <g transform="translate(560,430)">
       <path d="M-150 40 Q-190 -180 0 -200 Q190 -180 150 40 Q120 -20 60 -30 Q0 -40 -60 -30 Q-120 -20 -150 40 Z" fill="${C.silver}"/>
       ${Array.from({length:14}).map((_,i)=>`<path d="M${-150+i*22} 40 Q${-150+i*22} -140 ${-120+i*20} -170" stroke="${['#c3c9cf','#aeb6bf','#d6dbe0'][i%3]}" stroke-width="4" fill="none" opacity="0.8"/>`).join('')}
       <circle cx="0" cy="10" r="86" fill="#e6d6cd"/>
       <circle cx="-30" cy="0" r="5" fill="${C.ink}"/><circle cx="30" cy="0" r="5" fill="${C.ink}"/>
       <path d="M-26 44 Q0 62 26 44" stroke="${C.ink}" stroke-width="4" fill="none" stroke-linecap="round"/>
       <circle cx="-46" cy="22" r="10" fill="${C.petal}" opacity="0.5"/><circle cx="46" cy="22" r="10" fill="${C.petal}" opacity="0.5"/>
     </g>
     ${girl({ x: 470, y: 760, s: 1.0, dress: C.rose })}`),
    text: 'And her grandmother\'s hair — silver and smoke and moonlight, a whole life of grays. Every strand a story that was neither all happy nor all sad.' },

  // 11 — the ribbon revelation
  { art: svg(
    `<linearGradient id="rib" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${C.ink}"/><stop offset="0.5" stop-color="${C.ash}"/><stop offset="1" stop-color="${C.white}"/></linearGradient>
     <linearGradient id="g11" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.cloud}"/><stop offset="1" stop-color="${C.paper}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#g11)"/>
     <path d="M40 520 C 300 380, 700 660, 960 500 L960 600 C 700 760, 300 480, 40 620 Z" fill="url(#rib)"/>
     <text x="70" y="470" font-family="'Bebas Neue'" font-size="52" fill="${C.ink}">BLACK</text>
     <text x="820" y="470" font-family="'Bebas Neue'" font-size="52" fill="${C.slate}">WHITE</text>
     ${girl({ x: 500, y: 800, s: 1.2, dress: C.petal })}`),
    text: 'That was when Marlowe understood. Black and white are only the two far ends of a long, soft ribbon — and everything that matters lives in the gray in between.' },

  // 12 — she stops picking sides
  { art: svg(
    `<linearGradient id="g12" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.mist}"/><stop offset="1" stop-color="${C.cloud}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#g12)"/>
     <path d="M320 300 a180 180 0 1 1 40 300 l0 90" stroke="${C.steel}" stroke-width="46" fill="none" stroke-linecap="round"/>
     <circle cx="360" cy="760" r="30" fill="${C.steel}"/>
     ${girl({ x: 620, y: 720, s: 1.5, dress: C.rose })}`),
    text: 'So she stopped picking sides so quickly. She learned to say, "I\'m not sure yet," and mean it like a door opening — not closing. She learned to love the questions that don\'t have fast answers.' },

  // 13 — closing / go and love it
  { art: svg(
    `<radialGradient id="g13" cx="0.5" cy="0.55" r="0.75"><stop offset="0" stop-color="${C.blush}"/><stop offset="0.4" stop-color="${C.mist}"/><stop offset="1" stop-color="${C.silver}"/></radialGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#g13)"/>
     ${[C.ink,C.slate,C.steel,C.ash,C.silver,C.mist].map((c,i)=>`<circle cx="500" cy="520" r="${300-i*46}" fill="none" stroke="${c}" stroke-width="6" opacity="0.5"/>`).join('')}
     ${dove(230,260,1.2,C.ash)}${dove(760,300,1.1,C.silver)}${moth(300,760,0.9,C.mist)}${moth(720,720,0.8,C.silver)}
     ${girl({ x: 500, y: 640, s: 1.9, dress: C.petal })}`),
    text: 'The world is not black and white, little one — no matter who tells you it is. It is dove and pewter, smoke and silver, storm and twilight. It is gray. And gray is where the whole beautiful truth lives. <em>Go and love it.</em>' },
];

// ── "The Princess Who Rescued Herself" — witty fairytale palette ──────────────
const P = {
  stone:'#6d7178', stoneDark:'#4c5057', stoneLight:'#9aa0a8', mortar:'#3c3f45',
  gold:'#E8C86E', goldDeep:'#C9A24B', night:'#20232b', dusk:'#4a4258',
  grass:'#7d8a6a', grassDark:'#5f6a50', sky:'#bcc6d0', crown:'#E8C86E',
};
const crown = (cx, cy, s = 1, fill = P.gold) => `
  <g transform="translate(${cx},${cy}) scale(${s})">
    <path d="M-34 8 L-34 -18 L-17 -2 L0 -24 L17 -2 L34 -18 L34 8 Z" fill="${fill}" stroke="${P.goldDeep}" stroke-width="2"/>
    <circle cx="-34" cy="-18" r="4" fill="${fill}"/><circle cx="0" cy="-24" r="4" fill="${fill}"/><circle cx="34" cy="-18" r="4" fill="${fill}"/>
    <circle cx="0" cy="0" r="3.4" fill="${P.rose||'#E0869F'}"/>
  </g>`;
const princess = (o = {}) => {
  const { x = 0, y = 0, s = 1, dress = C.rose, face = true } = o;
  return `<g transform="translate(${x},${y}) scale(${s})">${girl({ dress, face })}${crown(0, -46, 1)}</g>`;
};
const tower = (x, y, s = 1, { lit = false } = {}) => `
  <g transform="translate(${x},${y}) scale(${s})">
    <rect x="-90" y="-40" width="180" height="640" fill="${P.stone}"/>
    <rect x="-90" y="-40" width="60" height="640" fill="${P.stoneDark}" opacity="0.5"/>
    ${Array.from({length:7}).map((_,r)=>Array.from({length:3}).map((_,c)=>`<rect x="${-84+c*58+ (r%2?14:0)}" y="${-24+r*90}" width="46" height="70" fill="none" stroke="${P.mortar}" stroke-width="3"/>`).join('')).join('')}
    <rect x="-104" y="-70" width="208" height="34" fill="${P.stoneDark}"/>
    ${[-104,-64,-24,16,56,84].map(bx=>`<rect x="${bx}" y="-104" width="24" height="40" fill="${P.stoneDark}"/>`).join('')}
    <rect x="-34" y="150" width="68" height="96" rx="34" fill="${lit?P.gold:P.night}"/>
    ${lit?`<rect x="-34" y="150" width="68" height="96" rx="34" fill="${P.gold}" opacity="0.5"/><circle cx="0" cy="205" r="40" fill="${P.gold}" opacity="0.25"/>`:''}
  </g>`;
const horse = (x, y, s = 1, fill = C.silver) => `
  <g transform="translate(${x},${y}) scale(${s})">
    <ellipse cx="0" cy="60" rx="52" ry="10" fill="#000" opacity="0.12"/>
    <path d="M-60 0 Q-64 -30 -40 -34 L40 -34 Q64 -30 60 6 Q40 -6 30 -8 L-30 -8 Q-52 -6 -60 0 Z" fill="${fill}"/>
    <rect x="-52" y="-6" width="12" height="52" rx="5" fill="${fill}"/><rect x="-20" y="-6" width="12" height="52" rx="5" fill="${fill}"/>
    <rect x="12" y="-6" width="12" height="52" rx="5" fill="${fill}"/><rect x="44" y="-6" width="12" height="52" rx="5" fill="${fill}"/>
    <path d="M46 -30 Q78 -40 78 -70 Q90 -50 84 -24 Q92 -18 84 -8 L58 -12 Z" fill="${fill}"/>
    <path d="M74 -64 Q86 -66 88 -74" stroke="${fill}" stroke-width="6" fill="none"/>
    <circle cx="80" cy="-40" r="2.6" fill="${C.ink}"/>
    <path d="M-58 -30 Q-70 -50 -58 -60 Q-52 -44 -40 -36 Z" fill="${P.gold}" opacity="0.8"/>
  </g>`;
const sun = (cx, cy, r, fill = P.gold) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>${Array.from({length:12}).map((_,i)=>{const a=i*Math.PI/6;return `<line x1="${cx+Math.cos(a)*(r+10)}" y1="${cy+Math.sin(a)*(r+10)}" x2="${cx+Math.cos(a)*(r+40)}" y2="${cy+Math.sin(a)*(r+40)}" stroke="${fill}" stroke-width="7" stroke-linecap="round" opacity="0.8"/>`}).join('')}`;

const princessSpreads = [
  // 1 TITLE
  { title: true, art: svg(
    `<linearGradient id="pt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.dusk}"/><stop offset="1" stop-color="${P.night}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#pt)"/>
     ${Array.from({length:16}).map((_,i)=>`<circle cx="${60+ (i*93)%900}" cy="${70+ (i*61)%300}" r="${1.4+ (i%3)}" fill="#fff" opacity="0.7"/>`).join('')}
     <circle cx="800" cy="180" r="52" fill="${P.gold}" opacity="0.9"/>
     ${tower(500, 300, 0.9, { lit: true })}
     ${princess({ x: 500, y: 505, s: 1.15, dress: C.petal })}`),
    text: '' },

  // 2 tower + the rule
  { art: svg(
    `<linearGradient id="p2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.sky}"/><stop offset="1" stop-color="${C.cloud}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#p2)"/>
     <path d="M0 820 Q500 780 1000 820 V1000 H0 Z" fill="${P.grass}"/>
     ${tower(500, 220, 1.05, { lit: true })}
     ${princess({ x: 500, y: 470, s: 0.6, dress: C.rose })}`),
    text: 'At the top of a tall grey tower lived a princess named Wren. The tower had one round window, one very heavy door, and exactly one rule for a princess: <em>wait.</em>' },

  // 3 the old story
  { art: svg(
    `<linearGradient id="p3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.cloud}"/><stop offset="1" stop-color="${P.sky}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#p3)"/>
     <path d="M0 780 Q500 740 1000 780 V1000 H0 Z" fill="${P.grassDark}"/>
     <path d="M-20 800 Q400 760 1020 800" stroke="${C.paper}" stroke-width="12" fill="none" opacity="0.7"/>
     ${tower(210, 300, 0.8, { lit: true })}
     ${horse(820, 760, 0.9, C.silver)}
     <path d="M300 500 Q560 470 780 700" stroke="${P.stone}" stroke-width="4" stroke-dasharray="4 14" fill="none" opacity="0.6"/>`),
    text: 'Everyone in the kingdom knew the story, and everyone told it the same way: one day a brave prince will climb the tower, open the door, and set the princess free. So Wren waited. That was, everyone agreed, the whole point of her.' },

  // 4 prince #1
  { art: svg(
    `<linearGradient id="p4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.sky}"/><stop offset="1" stop-color="${C.mist}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#p4)"/>
     <path d="M0 800 Q500 770 1000 800 V1000 H0 Z" fill="${P.grass}"/>
     ${tower(180, 360, 0.72, { lit: true })}
     ${horse(640, 720, 1.1, C.paper)}
     ${girl({ x: 640, y: 610, s: 0.7, dress: P.stoneDark, hair: P.gold })}
     <path d="M700 560 q80 -20 150 20" stroke="${P.stoneDark}" stroke-width="4" fill="none" stroke-dasharray="3 12"/>
     <text x="835" y="560" font-family="'Bebas Neue'" font-size="46" fill="${P.stoneDark}">HMM.</text>`),
    text: 'The first prince rode up on a fine white horse, looked at the heavy locked door, said, "This looks rather <em>difficult</em>," and rode off to find an easier tower.' },

  // 5 prince #2
  { art: svg(
    `<linearGradient id="p5" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.mist}"/><stop offset="1" stop-color="${P.sky}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#p5)"/>
     <path d="M0 810 Q500 785 1000 810 V1000 H0 Z" fill="${P.grassDark}"/>
     ${tower(200, 380, 0.66, { lit: true })}
     <ellipse cx="640" cy="815" rx="120" ry="30" fill="${P.stone}"/>
     ${girl({ x: 620, y: 770, s: 0.66, dress: P.dusk, hair: P.stoneDark, face:false })}
     <text x="700" y="690" font-family="'Bebas Neue'" font-size="54" fill="${P.stoneDark}">ZZZ…</text>`),
    text: 'The second prince stood at the bottom and shouted, "Do not worry — I am here to rescue you!" Then he sat on a rock to rest from all that shouting, fell fast asleep, and by morning had forgotten which tower it was.' },

  // 6 prince #3 never came
  { art: svg(
    `<linearGradient id="p6" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.dusk}"/><stop offset="1" stop-color="${C.steel}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#p6)"/>
     ${Array.from({length:10}).map((_,i)=>`<circle cx="${80+ (i*140)%860}" cy="${90+ (i*70)%240}" r="1.6" fill="#fff" opacity="0.6"/>`).join('')}
     <circle cx="200" cy="180" r="40" fill="${P.gold}" opacity="0.85"/>
     ${tower(500, 120, 1.15, { lit: true })}
     ${girl({ x: 500, y: 300, s: 0.5, dress: C.petal, face:false })}`),
    text: 'The third prince did not come at all. He had heard the tower was very tall. And Wren sat by the round window with her chin in her hands, and something in her that had been quiet a long time finally cleared its throat.' },

  // 7 the thought
  { art: svg(
    `<radialGradient id="p7" cx="0.5" cy="0.4" r="0.7"><stop offset="0" stop-color="${P.gold}" stop-opacity="0.35"/><stop offset="1" stop-color="${C.cloud}"/></radialGradient>`,
    `<rect width="${W}" height="${H}" fill="${C.cloud}"/>
     <circle cx="500" cy="420" r="360" fill="url(#p7)"/>
     ${princess({ x: 500, y: 560, s: 1.9, dress: C.rose })}
     <path d="M640 300 q60 -6 100 30" stroke="${P.goldDeep}" stroke-width="3" fill="none" stroke-dasharray="3 10"/>
     <text x="620" y="270" font-family="'Playfair Display'" font-style="italic" font-size="40" fill="${P.stoneDark}">why wait?</text>`),
    text: '"Why," thought Wren, "am I waiting for someone who keeps <em>not coming?</em>" It was a small thought. But small thoughts, in towers, echo.' },

  // 8 the hinges
  { art: svg(
    `<linearGradient id="p8" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.stoneLight}"/><stop offset="1" stop-color="${P.stone}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#p8)"/>
     <rect x="330" y="140" width="340" height="720" rx="16" fill="${P.mortar}"/>
     <rect x="350" y="160" width="300" height="680" rx="10" fill="${P.stoneDark}"/>
     ${[0,1,2].map(i=>`<rect x="365" y="200" width="80" height="60" y="${200+i*220}" fill="none"/>`).join('')}
     <circle cx="612" cy="500" r="20" fill="${P.gold}"/>
     ${[220,500,780].map(hy=>`<g transform="translate(360,${hy})"><rect x="-6" y="-34" width="34" height="68" rx="6" fill="${P.gold}"/><circle cx="11" cy="0" r="8" fill="${P.goldDeep}"/></g>`).join('')}
     ${princess({ x: 720, y: 620, s: 0.9, dress: C.petal })}
     <path d="M690 560 q-90 -30 -300 -50" stroke="${P.gold}" stroke-width="3" fill="none" stroke-dasharray="3 10" opacity="0.8"/>`),
    text: 'She walked to the door and looked at it properly — the way you look at something you have decided is <em>yours to solve.</em> The lock was on the outside. But the hinges — the hinges were on the <em>inside.</em> Nobody had ever mentioned the hinges.' },

  // 9 tools by moonlight
  { art: svg(
    `<linearGradient id="p9" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.night}"/><stop offset="1" stop-color="${P.dusk}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#p9)"/>
     <circle cx="770" cy="200" r="60" fill="${P.gold}" opacity="0.9"/><circle cx="748" cy="188" r="60" fill="url(#p9)" opacity="0.5"/>
     <rect x="240" y="120" width="300" height="760" rx="14" fill="${P.stoneDark}"/>
     ${[240,470,700].map(hy=>`<rect x="234" y="${hy-30}" width="30" height="60" rx="6" fill="${P.gold}"/>`).join('')}
     ${princess({ x: 620, y: 640, s: 1.0, dress: C.rose })}
     <rect x="120" y="840" width="60" height="14" rx="4" fill="${P.gold}"/>
     <rect x="220" y="820" width="14" height="40" fill="${P.stoneLight}"/><circle cx="227" cy="812" r="12" fill="${P.gold}"/>`),
    text: 'She had no sword. She had a hairpin, a candlestick, and a great deal of time she had planned to spend waiting. She worked at the bottom hinge until her fingers ached, and rested, and worked again. And she found she did not mind the quiet. In the quiet, she could hear herself <em>think.</em>' },

  // 10 the door groans loose
  { art: svg(
    `<linearGradient id="p10" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${P.dusk}"/><stop offset="1" stop-color="${P.gold}" stop-opacity="0.5"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="${P.night}"/>
     <rect x="200" y="120" width="320" height="760" rx="14" fill="${P.stoneDark}" transform="rotate(-7 360 500)"/>
     <path d="M520 200 L720 260 L700 840 L500 880 Z" fill="url(#p10)" opacity="0.4"/>
     ${princess({ x: 420, y: 660, s: 1.0, dress: C.petal })}
     <text x="150" y="300" font-family="'Bebas Neue'" font-size="60" fill="${P.gold}" opacity="0.8">GROAN…</text>`),
    text: 'By the time the moon was high, the bottom hinge came loose with a groan. By the time the birds woke, the top one did too. And Wren pushed — not at the silly lock, she left that exactly where it was — she pushed at the <em>hinged</em> side.' },

  // 11 the door falls open into morning
  { art: svg(
    `<linearGradient id="p11" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.gold}"/><stop offset="0.5" stop-color="${C.blush}"/><stop offset="1" stop-color="${P.sky}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#p11)"/>
     ${sun(500, 250, 70)}
     <path d="M0 760 Q300 700 620 760 T1000 740 V1000 H0 Z" fill="${P.grass}"/>
     <path d="M120 820 Q500 760 900 820" stroke="${P.grassDark}" stroke-width="10" fill="none" opacity="0.6"/>
     ${princess({ x: 500, y: 560, s: 1.5, dress: C.rose })}`),
    text: 'And the great heavy door swung the wrong way entirely — the way nobody ever expected a door to swing — and fell open into the morning. Wren stood at the top of her tower with the wind in her hair and the whole green kingdom spread gold below her. She had not been rescued. She had been <em>paying attention.</em>' },

  // 12 meets the prince
  { art: svg(
    `<linearGradient id="p12" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.sky}"/><stop offset="1" stop-color="${C.cloud}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#p12)"/>
     <path d="M0 800 Q500 770 1000 800 V1000 H0 Z" fill="${P.grass}"/>
     <path d="M-20 830 Q500 790 1020 830" stroke="${P.paper||'#f5f7f8'}" stroke-width="12" fill="none" opacity="0.7"/>
     ${horse(770, 730, 0.8, C.paper)}
     ${girl({ x: 770, y: 650, s: 0.6, dress: P.stoneDark, hair: P.gold, face:true })}
     ${princess({ x: 300, y: 700, s: 1.0, dress: C.petal })}
     <text x="560" y="560" font-family="'Playfair Display'" font-style="italic" font-size="34" fill="${P.stoneDark}">but… who rescued you?</text>`),
    text: 'On the road she met the first prince, very startled to see her walking freely about. "But — who <em>rescued</em> you?" he asked. Wren thought about it. Then she smiled, and told him the truest thing in this whole book.' },

  // 13 "I did." closing
  { art: svg(
    `<radialGradient id="p13" cx="0.5" cy="0.5" r="0.7"><stop offset="0" stop-color="${P.gold}" stop-opacity="0.4"/><stop offset="0.5" stop-color="${C.blush}"/><stop offset="1" stop-color="${P.sky}"/></radialGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#p13)"/>
     ${sun(500, 300, 62)}
     <path d="M0 820 Q500 770 1000 820 V1000 H0 Z" fill="${P.grass}"/>
     ${princess({ x: 500, y: 620, s: 2.0, dress: C.rose })}`),
    text: '"I did," said Wren. And she walked on into her own morning, in no particular hurry, because it was hers now — all of it. The road, the kingdom, the story. Especially the story. She had picked up the pen, and written herself a door.' },
];

// ── "The Boy Who Talked to the Stars" — celestial night palette ──────────────
const N = {
  ink:'#0d1020', indigo:'#161d3a', blue:'#243158', mid:'#3a4a7a', haze:'#5566a0',
  star:'#F2D06B', starDeep:'#d8b24e', starW:'#e6ecfa', sea:'#1a2740', seafoam:'#3d5878',
  sand:'#c9b79a', shirt:'#4bb5b0', roof:'#2a3357',
};
const boy = (o = {}) => {
  const { x = 0, y = 0, s = 1, shirt = N.shirt, hair = '#2a2f45', hands = false } = o;
  return `<g transform="translate(${x},${y}) scale(${s})">
    <ellipse cx="0" cy="168" rx="60" ry="14" fill="#000" opacity="0.14"/>
    <rect x="-30" y="96" width="24" height="72" rx="8" fill="${N.blue}"/><rect x="6" y="96" width="24" height="72" rx="8" fill="${N.blue}"/>
    <path d="M-42 58 Q-46 116 -40 118 L40 118 Q46 116 42 58 Q0 44 -42 58 Z" fill="${shirt}"/>
    ${hands ? `<path d="M-40 60 Q-64 20 -50 -6" stroke="${shirt}" stroke-width="20" fill="none" stroke-linecap="round"/><path d="M40 60 Q64 20 50 -6" stroke="${shirt}" stroke-width="20" fill="none" stroke-linecap="round"/><circle cx="-52" cy="-10" r="12" fill="#e8d7cf"/><circle cx="52" cy="-10" r="12" fill="#e8d7cf"/>` : `<rect x="-52" y="60" width="16" height="52" rx="8" fill="${shirt}"/><rect x="36" y="60" width="16" height="52" rx="8" fill="${shirt}"/>`}
    <circle cx="0" cy="6" r="40" fill="#e8d7cf"/>
    <path d="M-40 0 Q-44 -42 0 -46 Q44 -42 40 0 Q30 -20 0 -22 Q-30 -20 -40 0 Z" fill="${hair}"/>
    <path d="M-40 0 q-2 -20 14 -30 q-6 14 -2 26 Z" fill="${hair}"/>
    <circle cx="-14" cy="4" r="4" fill="${N.ink}"/><circle cx="14" cy="4" r="4" fill="${N.ink}"/>
    <path d="M-12 22 Q0 29 12 22" stroke="${N.ink}" stroke-width="3.2" fill="none" stroke-linecap="round"/>
    <circle cx="-23" cy="15" r="6" fill="${C.petal}" opacity="0.5"/><circle cx="23" cy="15" r="6" fill="${C.petal}" opacity="0.5"/>
  </g>`;
};
// a simple background townsperson silhouette
const boyBlob = (x, y, fill = '#5a6480', s = 1) => `<g transform="translate(${x},${y}) scale(${s})">
  <path d="M-34 40 Q-40 -30 0 -34 Q40 -30 34 40 Z" fill="${fill}"/>
  <circle cx="0" cy="-52" r="24" fill="${fill}"/></g>`;
const starfield = (n, seedy = 1) => Array.from({ length: n }).map((_, i) => {
  const x = (i * 137 * seedy) % 1000, y = (i * 89 * seedy) % 620, r = 1 + (i % 3) * 0.9, o = 0.4 + (i % 5) * 0.12;
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${N.starW}" opacity="${o}"/>`;
}).join('');
const bigstar = (x, y, s = 1, fill = N.star) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M0 -16 L4 -4 16 0 4 4 0 16 -4 4 -16 0 -4 -4 Z" fill="${fill}"/><circle cx="0" cy="0" r="18" fill="${fill}" opacity="0.18"/></g>`;
const constellation = (pts, fill = N.star) => {
  let lines = ''; for (let i = 1; i < pts.length; i++) lines += `<line x1="${pts[i-1][0]}" y1="${pts[i-1][1]}" x2="${pts[i][0]}" y2="${pts[i][1]}" stroke="${N.star}" stroke-width="1.6" opacity="0.5"/>`;
  return lines + pts.map(p => bigstar(p[0], p[1], 0.7, fill)).join('');
};
const boat = (x, y, s = 1, sail = N.starW) => `<g transform="translate(${x},${y}) scale(${s})">
  <path d="M-46 0 Q0 26 46 0 L34 24 Q0 34 -34 24 Z" fill="${N.roof}"/>
  <rect x="-2" y="-56" width="5" height="56" fill="${N.sand}"/>
  <path d="M3 -54 L40 -8 L3 -8 Z" fill="${sail}"/><path d="M-2 -48 L-32 -8 L-2 -8 Z" fill="${sail}" opacity="0.85"/></g>`;

const starSpreads = [
  // 1 TITLE
  { title: true, art: svg(
    `<linearGradient id="s1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${N.ink}"/><stop offset="1" stop-color="${N.indigo}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#s1)"/>${starfield(70)}
     ${constellation([[150,150],[230,210],[330,180],[420,260],[520,220]])}
     ${bigstar(760,180,2.2)}${bigstar(840,300,1.2)}${bigstar(680,120,1)}
     <path d="M0 820 Q500 790 1000 820 V1000 H0 Z" fill="${N.blue}"/>
     ${boy({ x: 500, y: 560, s: 1.15, hands: true })}`),
    text: '' },

  // 2 the boy
  { art: svg(
    `<linearGradient id="s2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${N.haze}"/><stop offset="1" stop-color="${N.mid}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#s2)"/>
     <path d="M0 720 Q500 690 1000 720 V1000 H0 Z" fill="${N.sea}"/>
     ${[130,300,470,640,810].map((bx,i)=>`<g transform="translate(${bx},${560+ (i%2)*20})"><rect x="-40" y="0" width="80" height="150" fill="${N.roof}"/><path d="M-50 0 L0 -46 L50 0 Z" fill="${N.blue}"/><rect x="-14" y="60" width="28" height="40" fill="${N.star}" opacity="0.7"/></g>`).join('')}
     ${boy({ x: 500, y: 640, s: 0.9 })}`),
    text: 'In a kingdom at the edge of the sea lived a boy named Theo, who did not do things the way the other children did.' },

  // 3 the loud square
  { art: svg(
    `<radialGradient id="s3" cx="0.5" cy="0.4" r="0.8"><stop offset="0" stop-color="${N.haze}"/><stop offset="1" stop-color="${N.blue}"/></radialGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#s3)"/>
     ${[[260,420,'#7a6f8f'],[380,400,'#8a7f9f'],[720,420,'#6a7f9a'],[820,400,'#7f8fae']].map(([bx,by,c])=>boyBlob(bx,by,c)).join('')}
     ${Array.from({length:8}).map((_,i)=>`<path d="M${200+i*80} 260 q10 -30 40 -20" stroke="#fff" stroke-width="3" fill="none" opacity="0.4"/>`).join('')}
     <text x="300" y="240" font-family="'Bebas Neue'" font-size="60" fill="#fff" opacity="0.5">CLANG!</text>
     <text x="640" y="300" font-family="'Bebas Neue'" font-size="48" fill="#fff" opacity="0.45">BUY! SELL!</text>
     <g transform="translate(510,720)">${Array.from({length:5}).map((_,i)=>`<ellipse cx="${-40+i*20}" cy="${i*2}" rx="12" ry="9" fill="${['#4c5568','#5c6578','#6c7588','#7c8598','#8c95a8'][i]}"/>`).join('')}</g>
     ${boy({ x: 500, y: 640, s: 0.85, hands: true, shirt: C.rose })}`),
    text: 'When the square grew loud and clanging, Theo pressed his hands over his ears and squeezed his eyes shut until the noise stopped climbing up his skin. And at the edge of it all, he lined up his stones — smallest to largest, dark to light, in a row as straight as a ruler.' },

  // 4 his own world
  { art: svg(
    `<linearGradient id="s4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${N.indigo}"/><stop offset="1" stop-color="${N.blue}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#s4)"/>${starfield(40,2)}
     <circle cx="500" cy="440" r="250" fill="none" stroke="${N.star}" stroke-width="2" opacity="0.3" stroke-dasharray="4 10"/>
     ${constellation([[360,340],[440,300],[520,360],[600,320],[640,420]])}
     ${boy({ x: 500, y: 620, s: 1.05 })}`),
    text: 'The townspeople said he was off in his own world. They were right about one thing. Theo *did* have a world. It was only that nobody had ever thought to ask him what was in it.' },

  // 5 the stars talk
  { art: svg(
    `<linearGradient id="s5" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${N.ink}"/><stop offset="0.7" stop-color="${N.indigo}"/><stop offset="1" stop-color="${N.blue}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#s5)"/>${starfield(90)}
     ${bigstar(300,180,1.8)}${bigstar(700,150,2.4)}${bigstar(520,260,1.3)}${bigstar(180,300,1.1)}${bigstar(820,320,1.4)}
     <path d="M0 780 L280 700 L520 760 L760 690 L1000 770 V1000 H0 Z" fill="${N.blue}"/>
     ${boy({ x: 500, y: 690, s: 0.95, hands: true })}
     <path d="M540 560 Q640 480 700 300" stroke="${N.star}" stroke-width="2" fill="none" stroke-dasharray="2 12" opacity="0.6"/>`),
    text: 'But every night, when the kingdom went dark and quiet and the terrible noise finally stopped, Theo climbed the hill behind his house and looked up. And the stars — the stars *talked* to him. Not in words. In patterns. In the slow, exact turning of the sky.' },

  // 6 he knew them all
  { art: svg(
    `<linearGradient id="s6" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${N.ink}"/><stop offset="1" stop-color="${N.indigo}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#s6)"/>${starfield(80)}
     ${constellation([[120,160],[210,120],[300,190],[210,260],[120,160]])}
     ${constellation([[560,140],[660,180],[760,140],[820,240],[700,300],[600,240],[560,140]],N.starW)}
     ${bigstar(430,340,1.6)}
     ${boy({ x: 500, y: 720, s: 0.8, hands: true })}`),
    text: 'He knew them all — every point of light, where it rose, where it set, which ones traveled together and which stood alone. He knew the sky the way the other children knew each other\'s faces. It never got too loud. It never asked him to hurry. And there, Theo felt the thing he almost never felt in town: he felt like he *fit.*' },

  // 7 the fog trouble
  { art: svg(
    `<linearGradient id="s7" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${N.mid}"/><stop offset="1" stop-color="${N.sea}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#s7)"/>
     <path d="M0 620 Q500 660 1000 620 V1000 H0 Z" fill="${N.sea}"/>
     ${[0.6,0.4,0.28].map((o,i)=>`<ellipse cx="${300+i*220}" cy="${500+i*40}" rx="420" ry="110" fill="${C.silver}" opacity="${o}"/>`).join('')}
     ${boat(240,660,0.9,C.mist)}${boat(720,690,0.8,C.mist)}
     <ellipse cx="500" cy="560" rx="500" ry="150" fill="${C.mist}" opacity="0.4"/>`),
    text: 'Then one autumn, a trouble came. The fishing boats went out and did not come back on time. A fog rolled in off the sea — thick and grey and sudden — and the fishermen, who steered by the coastline, lost the shore entirely and drifted, frightened, in the white.' },

  // 8 the arguing square
  { art: svg(
    `<radialGradient id="s8" cx="0.5" cy="0.45" r="0.8"><stop offset="0" stop-color="${N.haze}"/><stop offset="1" stop-color="${N.blue}"/></radialGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#s8)"/>
     ${[[220,440,'#7a6f8f'],[360,420,'#6a7f9a'],[660,430,'#8a7f9f'],[790,415,'#6f7f9e']].map(([bx,by,c])=>boyBlob(bx,by,c,1.1)).join('')}
     <text x="250" y="250" font-family="'Bebas Neue'" font-size="52" fill="#fff" opacity="0.5">BIGGER BELLS!</text>
     <text x="600" y="320" font-family="'Bebas Neue'" font-size="48" fill="#fff" opacity="0.45">LOUDER!</text>
     ${boy({ x: 510, y: 700, s: 0.8, hands: true, shirt: C.rose })}`),
    text: 'The whole town gathered, and the clever grown-ups argued. Bigger lanterns! Louder bells! Longer ropes! None of it would work in a fog you could not see or hear through. The square got louder and louder — and at the edge, hands over his ears, Theo was listening. Theo was always listening, even when it looked like he was somewhere else.' },

  // 9 Theo stands
  { art: svg(
    `<radialGradient id="s9" cx="0.5" cy="0.55" r="0.7"><stop offset="0" stop-color="${N.star}" stop-opacity="0.25"/><stop offset="1" stop-color="${N.blue}"/></radialGradient>`,
    `<rect width="${W}" height="${H}" fill="${N.blue}"/>
     <circle cx="500" cy="560" r="340" fill="url(#s9)"/>
     ${[[180,460],[300,440],[700,450],[820,440]].map(([bx,by])=>boyBlob(bx,by,'#5a6480',0.9)).join('')}
     ${boy({ x: 500, y: 620, s: 1.25, hands: true })}
     ${bigstar(500,250,1.4)}`),
    text: 'And when there was the smallest gap in the noise, Theo stood up. His heart was pounding. The words wanted to stick behind his teeth. But this was too important — so he pushed them out, one at a time, the way he pushed his stones into a line. "The stars," said Theo. And the whole square turned to look at him.' },

  // 10 the plan
  { art: svg(
    `<linearGradient id="s10" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${N.indigo}"/><stop offset="1" stop-color="${N.sea}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#s10)"/>${starfield(60)}
     ${bigstar(500,180,2.6)}
     <path d="M500 210 L500 640" stroke="${N.star}" stroke-width="2" stroke-dasharray="3 12" opacity="0.7"/>
     <path d="M0 720 Q500 690 1000 720 V1000 H0 Z" fill="${N.sea}"/>
     ${boat(500,700,0.9,N.starW)}`),
    text: '"The fog is low. It sits on the water. But it is thin at the top — if you look straight up, the stars come through. And the stars don\'t move like the land moves. They come back to the same place every night, exactly. When you can\'t see the shore," said Theo, "look up. The sky will bring you home."' },

  // 11 teaching
  { art: svg(
    `<linearGradient id="s11" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${N.ink}"/><stop offset="1" stop-color="${N.blue}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#s11)"/>${starfield(70)}
     ${constellation([[340,180],[440,150],[540,200],[640,160]])}
     <path d="M0 760 Q500 730 1000 760 V1000 H0 Z" fill="${N.indigo}"/>
     ${boy({ x: 340, y: 680, s: 0.9, hands: true })}
     ${[560,660,760].map((bx,i)=>boyBlob(bx,700+ (i%2)*10,'#4a5678',0.75)).join('')}
     <path d="M380 640 q120 -40 240 -20" stroke="${N.star}" stroke-width="2" fill="none" stroke-dasharray="3 10" opacity="0.6"/>`),
    text: 'All that winter, Theo stood on the hill with the fishermen gathered around him, and he taught them the sky. He was patient in a way none of them expected — because the sky had taught him patience first. He never got flustered. He never rushed. And for the first time, the whole town was grateful for exactly the way Theo\'s mind worked.' },

  // 12 boats come home
  { art: svg(
    `<linearGradient id="s12" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${N.indigo}"/><stop offset="0.6" stop-color="${N.mid}"/><stop offset="1" stop-color="${N.sea}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#s12)"/>${starfield(50)}
     ${bigstar(500,150,2.4)}${bigstar(360,220,1)}${bigstar(660,210,1.1)}
     ${[0.3,0.2].map((o,i)=>`<ellipse cx="${350+i*260}" cy="${560}" rx="380" ry="80" fill="${C.silver}" opacity="${o}"/>`).join('')}
     <path d="M0 700 Q500 670 1000 700 V1000 H0 Z" fill="${N.sea}"/>
     ${boat(250,690,0.75,N.starW)}${boat(500,715,0.85,N.starW)}${boat(760,690,0.7,N.starW)}
     ${[250,500,760].map(bx=>`<path d="M${bx} 660 L500 170" stroke="${N.star}" stroke-width="1.4" stroke-dasharray="2 12" opacity="0.5"/>`).join('')}`),
    text: 'When the fog came now, the fishermen tipped their heads back and found Theo\'s stars — and the sky brought every last boat home.' },

  // 13 closing
  { art: svg(
    `<radialGradient id="s13" cx="0.5" cy="0.5" r="0.7"><stop offset="0" stop-color="${N.star}" stop-opacity="0.28"/><stop offset="0.5" stop-color="${N.indigo}"/><stop offset="1" stop-color="${N.ink}"/></radialGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#s13)"/>${starfield(80)}
     ${bigstar(300,220,1.4)}${bigstar(720,200,1.6)}${bigstar(500,120,2)}
     <path d="M0 800 Q500 770 1000 800 V1000 H0 Z" fill="${N.blue}"/>
     ${boy({ x: 430, y: 660, s: 0.95, hands: true })}
     ${boyBlob(650,700,'#4a5678',0.7)}
     <g transform="translate(600,720)">${Array.from({length:4}).map((_,i)=>`<ellipse cx="${i*18}" cy="0" rx="10" ry="7" fill="${['#5c6578','#6c7588','#7c8598','#8c95a8'][i]}"/>`).join('')}</g>`),
    text: 'Theo still sat at the edge, most days, lining up his stones. That did not change, and it did not need to. But now, a few of the braver children came to sit beside him — not to pull him into their game, but to learn his. To go quiet. To look up. If you are a Theo, hold on to this: your mind is not broken. It is tuned to something the world got too busy to hear.' },
];

// ── "The Quietest Kid in the Kingdom" — loud brass vs cool quiet ─────────────
const Q = {
  brass:'#C9922E', amber:'#E0A94A', gold:'#F2CE73', red:'#B5462F', rust:'#8f3a26',
  warm:'#F3E2C0', warmDeep:'#E7C98C', teal:'#3E7C8C', tealDeep:'#2b5c69', cool:'#cfe0e4',
  ink:'#2c2417', stone:'#8a8170',
};
const bell = (x, y, s = 1, { ring = false } = {}) => `<g transform="translate(${x},${y}) scale(${s})">
  <rect x="-8" y="-70" width="16" height="20" rx="4" fill="${Q.rust}"/>
  <path d="M-70 40 Q-70 -50 0 -52 Q70 -50 70 40 Q70 52 56 52 L-56 52 Q-70 52 -70 40 Z" fill="${Q.brass}"/>
  <path d="M-70 40 Q-70 -30 -20 -48 L-24 46 Q-60 46 -70 40 Z" fill="${Q.amber}" opacity="0.6"/>
  <ellipse cx="0" cy="52" rx="70" ry="12" fill="${Q.rust}"/>
  <circle cx="0" cy="60" r="12" fill="${Q.rust}"/>
  ${ring ? `${[90,130,170].map((r,i)=>`<path d="M${-r} 0 A ${r} ${r} 0 0 1 ${-r*0.4} ${-r*0.9}" stroke="${Q.gold}" stroke-width="5" fill="none" opacity="${0.6-i*0.15}"/><path d="M${r} 0 A ${r} ${r} 0 0 0 ${r*0.4} ${-r*0.9}" stroke="${Q.gold}" stroke-width="5" fill="none" opacity="${0.6-i*0.15}"/>`).join('')}` : ''}
</g>`;
const noise = (x, y, txt, size = 50, fill = Q.red) => `<text x="${x}" y="${y}" font-family="'Bebas Neue'" font-size="${size}" fill="${fill}" opacity="0.75" transform="rotate(${(x % 13) - 6} ${x} ${y})">${txt}</text>`;

const quietSpreads = [
  // 1 TITLE
  { title: true, art: svg(
    `<radialGradient id="q1" cx="0.5" cy="0.45" r="0.75"><stop offset="0" stop-color="${Q.warm}"/><stop offset="1" stop-color="${Q.warmDeep}"/></radialGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#q1)"/>
     ${noise(120,180,'CLANG!',54)}${noise(720,160,'BOOM!',60)}${noise(150,760,'HOORAY!',50)}${noise(700,780,'TA-DA!',52)}${noise(430,120,'DRUMS!',40,Q.brass)}
     ${[120,300,700,860].map((bx,i)=>boyBlob(bx,560+ (i%2)*30,'#c9a86e',1)).join('')}
     ${girl({ x: 500, y: 560, s: 1.2, dress: Q.teal, hair: '#2c2f3a' })}
     ${[60,150,240].map((r,i)=>`<circle cx="500" cy="470" r="${r}" fill="none" stroke="${Q.teal}" stroke-width="3" opacity="${0.4-i*0.1}"/>`).join('')}`),
    text: '' },

  // 2 the quietest kid
  { art: svg(
    `<linearGradient id="q2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${Q.warm}"/><stop offset="1" stop-color="${Q.warmDeep}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#q2)"/>
     <path d="M0 780 Q500 750 1000 780 V1000 H0 Z" fill="${Q.brass}" opacity="0.5"/>
     ${girl({ x: 500, y: 560, s: 1.3, dress: Q.teal, hair: '#2c2f3a' })}`),
    text: 'In a kingdom that loved to be loud, there lived a girl named Posy — and Posy was the quietest kid anyone had ever met.' },

  // 3 the loud kingdom
  { art: svg(
    `<radialGradient id="q3" cx="0.5" cy="0.4" r="0.85"><stop offset="0" stop-color="${Q.gold}"/><stop offset="1" stop-color="${Q.amber}"/></radialGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#q3)"/>
     ${noise(90,200,'TRUMPETS!',52)}${noise(600,170,'BANG!',64)}${noise(140,420,'LOUDER!',46)}${noise(680,430,'CHEER!',50)}${noise(340,300,'BOOM!',56,Q.brass)}${noise(760,620,'HOORAY!',44)}
     ${[160,340,540,720,880].map((bx,i)=>boyBlob(bx,720+ (i%2)*20,'#c9a25e',1.2)).join('')}
     ${[220,420,620,820].map((bx,i)=>`<path d="M${bx} 640 q10 -40 40 -30" stroke="${Q.red}" stroke-width="4" fill="none" opacity="0.5"/>`).join('')}`),
    text: 'It was a kingdom of noise, and it was proud of it. There were trumpets at breakfast and drums at lunch, and at every festival a great contest to see who could cheer the very loudest. And Posy — Posy sat at the back, and watched, and said almost nothing at all.' },

  // 4 she listened
  { art: svg(
    `<linearGradient id="q4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${Q.cool}"/><stop offset="1" stop-color="${Q.warm}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#q4)"/>
     ${[120,260,760,880].map((bx,i)=>boyBlob(bx,500+ (i%2)*30,'#d8c290',0.9)).join('')}
     ${girl({ x: 500, y: 600, s: 1.15, dress: Q.teal, hair: '#2c2f3a' })}
     ${[50,110,170,230].map((r,i)=>`<circle cx="500" cy="510" r="${r}" fill="none" stroke="${Q.tealDeep}" stroke-width="2.5" opacity="${0.5-i*0.1}"/>`).join('')}`),
    text: 'While the other children filled the air with words, Posy filled herself with something else. She *listened.* She *noticed.* She collected the quiet things the loud kingdom rushed right past — the way some children collect shells.' },

  // 5 what she noticed
  { art: svg(
    `<linearGradient id="q5" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${Q.cool}"/><stop offset="1" stop-color="${Q.warm}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#q5)"/>
     <line x1="-20" y1="240" x2="1020" y2="290" stroke="${Q.stone}" stroke-width="3"/>
     ${dove(300,240,1.0,Q.stone)}
     <path d="M120 780 Q300 730 480 770" stroke="${Q.teal}" stroke-width="4" fill="none" opacity="0.4"/>
     ${girl({ x: 500, y: 640, s: 1.0, dress: Q.teal, hair: '#2c2f3a' })}
     <text x="120" y="440" font-family="'Playfair Display'" font-style="italic" font-size="30" fill="${Q.tealDeep}">a sparrow, half a beat behind…</text>
     <text x="560" y="520" font-family="'Playfair Display'" font-style="italic" font-size="30" fill="${Q.tealDeep}">the wind, before the rain.</text>`),
    text: 'She heard the sparrow that sang a half-beat behind all the others. She saw which children were laughing and which were only pretending. She knew the sound the wind made just before the rain — and the exact look on her mother\'s face that meant *tired, but don\'t you worry.*' },

  // 6 you never know what she's thinking
  { art: svg(
    `<linearGradient id="q6" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${Q.warm}"/><stop offset="1" stop-color="${Q.warmDeep}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#q6)"/>
     ${[200,340].map((bx,i)=>boyBlob(bx,460,'#c9a25e',1.1)).join('')}
     <text x="150" y="300" font-family="'Playfair Display'" font-style="italic" font-size="30" fill="${Q.rust}">so quiet… you never know…</text>
     ${girl({ x: 640, y: 600, s: 1.1, dress: Q.teal, hair: '#2c2f3a' })}`),
    text: '"She\'s so quiet," the townspeople would say, a little worried. "You never know what she\'s thinking." That was true. They never did. It simply never occurred to them to sit down beside her and find out.' },

  // 7 the Great Bell
  { art: svg(
    `<linearGradient id="q7" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${Q.gold}"/><stop offset="1" stop-color="${Q.amber}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#q7)"/>
     <rect x="380" y="360" width="240" height="560" fill="${Q.warmDeep}"/>
     <path d="M360 360 L500 250 L640 360 Z" fill="${Q.rust}"/>
     <rect x="410" y="400" width="180" height="280" rx="12" fill="${Q.ink}" opacity="0.35"/>
     ${bell(500, 470, 1.4, { ring: true })}`),
    text: 'Now, the loudest thing in all the kingdom was the Great Bell. It hung in the tower at the center of town, and its ring was so enormous, so magnificent, it could be heard in every corner of the land. The whole kingdom loved it. The whole kingdom was, in a way, built around it.' },

  // 8 the bell cracks
  { art: svg(
    `<linearGradient id="q8" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${Q.warmDeep}"/><stop offset="1" stop-color="${Q.stone}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#q8)"/>
     ${bell(500, 380, 2.0)}
     <path d="M430 300 l30 40 -20 30 34 44" stroke="${Q.ink}" stroke-width="4" fill="none"/>
     <text x="250" y="720" font-family="'Bebas Neue'" font-size="80" fill="${Q.ink}" opacity="0.5">THUNK.</text>`),
    text: 'And one grey morning, the Great Bell went silent. The bell-ringer pulled the rope, and instead of the magnificent ring there came only a dull, cracked *thunk.* The bell was broken somewhere deep inside — and no one could tell where. "The crack could be *anywhere,*" said the finest craftsmen. "It would take a year to find."' },

  // 9 the shouting square
  { art: svg(
    `<radialGradient id="q9" cx="0.5" cy="0.4" r="0.85"><stop offset="0" stop-color="${Q.gold}"/><stop offset="1" stop-color="${Q.amber}"/></radialGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#q9)"/>
     ${noise(120,220,'MELT IT!',46)}${noise(640,190,'START OVER!',44)}${noise(300,300,'LOUDER!',52,Q.brass)}${noise(720,340,'NO, YOU!',40)}
     ${[160,340,660,840].map((bx,i)=>boyBlob(bx,600+ (i%2)*20,'#c9a25e',1.15)).join('')}
     ${girl({ x: 500, y: 720, s: 0.7, dress: Q.teal, hair: '#2c2f3a', face:false })}
     <text x="330" y="800" font-family="'Playfair Display'" font-style="italic" font-size="26" fill="${Q.tealDeep}">"I know where the crack is."</text>`),
    text: 'The whole kingdom crowded into the square, everyone shouting suggestions over everyone else — certain, as always, that the answer was *more noise.* And at the very back, a small quiet voice said, "I know where the crack is." Nobody heard it. It was, after all, a very loud square.' },

  // 10 she walks to the front
  { art: svg(
    `<radialGradient id="q10" cx="0.5" cy="0.5" r="0.7"><stop offset="0" stop-color="${Q.warm}"/><stop offset="1" stop-color="${Q.warmDeep}"/></radialGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#q10)"/>
     ${boyBlob(700,520,'#b98f4e',1.6)}
     ${girl({ x: 420, y: 600, s: 1.0, dress: Q.teal, hair: '#2c2f3a' })}
     <path d="M470 560 q90 -20 160 -10" stroke="${Q.tealDeep}" stroke-width="3" fill="none" stroke-dasharray="3 9" opacity="0.6"/>`),
    text: 'So Posy did the bravest thing she had ever done. She walked to the front. She tugged the mayor\'s sleeve. And when he bent down, she said it again, just to him: "I know where the crack is. Because they were all talking," said Posy. "And I was *listening.*"' },

  // 11 the tiny hiss
  { art: svg(
    `<linearGradient id="q11" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${Q.gold}"/><stop offset="1" stop-color="${Q.warmDeep}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#q11)"/>
     ${bell(500, 400, 2.0)}
     <circle cx="430" cy="300" r="16" fill="none" stroke="${Q.red}" stroke-width="4"/>
     <path d="M446 290 q40 -6 70 -30" stroke="${Q.tealDeep}" stroke-width="3" fill="none" stroke-dasharray="3 9"/>
     <circle cx="560" cy="230" r="60" fill="${Q.gold}" opacity="0.4"/>
     <text x="540" y="150" font-family="'Playfair Display'" font-style="italic" font-size="28" fill="${Q.rust}">a little hiss, like a whisper…</text>`),
    text: '"There\'s a tiny sound first — a little hiss, like a whisper — up near the top, on the left side, where the sun hits in the morning. I\'ve heard it for weeks. It\'s been getting louder. That\'s where it\'s breaking. You don\'t have to take the whole bell apart. You just have to look *there.*"' },

  // 12 the bell rings
  { art: svg(
    `<radialGradient id="q12" cx="0.5" cy="0.4" r="0.8"><stop offset="0" stop-color="${Q.gold}"/><stop offset="1" stop-color="${Q.amber}"/></radialGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#q12)"/>
     ${bell(500, 330, 1.5, { ring: true })}
     ${boyBlob(300,720,'#b98f4e',1.3)}
     ${girl({ x: 560, y: 700, s: 0.85, dress: Q.teal, hair: '#2c2f3a' })}`),
    text: 'They climbed the tower, went to the top on the left side where the sun hits — and there, so fine you could barely see it, was a hairline crack, exactly where the quietest kid in the kingdom said it would be. They mended it in a single afternoon. And the mayor crouched down beside Posy. "We kept telling you to be *louder,*" he said. "But the kingdom didn\'t need another loud voice. It needed someone who was finally *listening.*"' },

  // 13 closing
  { art: svg(
    `<radialGradient id="q13" cx="0.5" cy="0.5" r="0.75"><stop offset="0" stop-color="${Q.cool}"/><stop offset="0.6" stop-color="${Q.warm}"/><stop offset="1" stop-color="${Q.warmDeep}"/></radialGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#q13)"/>
     ${[40,100,160,220].map((r,i)=>`<circle cx="500" cy="480" r="${r}" fill="none" stroke="${Q.tealDeep}" stroke-width="2.5" opacity="${0.5-i*0.1}"/>`).join('')}
     ${girl({ x: 500, y: 620, s: 1.4, dress: Q.teal, hair: '#2c2f3a' })}`),
    text: 'From that day on, when something important went wrong, the loudest kingdom in the world learned to do a brand-new thing: it got quiet, and it went and found Posy. Because you cannot hear anything true while you are shouting. If you are a Posy, hold on to this: your quiet is not empty. It is *full.* You are listening — and one day it will matter more than all their noise combined.' },
];

// ── "The One Who Sat Alone" — warm contemporary schoolyard ──────────────────
const Y = {
  sky:'#AEC9D8', skyDeep:'#84A8BE', cloud:'#EAF1F4', grass:'#8AA86A', grassDark:'#65814d',
  wall:'#B4AE9F', wallDark:'#948d7c', stone:'#a39d8f', warm:'#F3EAD6', brick:'#C08457',
  coral:'#E58B6B', marigold:'#E0A94A', leaf:'#6f9a55', bark:'#8a6a4e',
};
const bench = (x, y, s = 1, occupied = 0) => `<g transform="translate(${x},${y}) scale(${s})">
  <rect x="-60" y="-6" width="120" height="14" rx="4" fill="${Y.bark}"/>
  <rect x="-60" y="-26" width="120" height="12" rx="4" fill="${Y.bark}"/>
  <rect x="-52" y="8" width="10" height="26" fill="${Y.bark}"/><rect x="42" y="8" width="10" height="26" fill="${Y.bark}"/>
  ${Array.from({length:occupied}).map((_,i)=>`<g transform="translate(${-36+i*36},-46)"><path d="M-16 26 Q-18 -8 0 -10 Q18 -8 16 26 Z" fill="${['#7f9a6a','#c98f5a','#9a7fae','#6f8fae'][i%4]}"/><circle cx="0" cy="-22" r="13" fill="#e8d7cf"/></g>`).join('')}
</g>`;
const wall = (x, y, w, s = 1) => `<g transform="translate(${x},${y}) scale(${s})">
  <rect x="0" y="0" width="${w}" height="70" fill="${Y.wall}"/>
  <rect x="0" y="0" width="${w}" height="16" fill="${Y.cloud}" opacity="0.4"/>
  ${Array.from({length:Math.ceil(w/70)}).map((_,r)=>Array.from({length:2}).map((_,c)=>`<rect x="${(r*70)+ (c?35:0)+ (c&&r%2?0:0)}" y="${16+c*27}" width="68" height="26" fill="none" stroke="${Y.wallDark}" stroke-width="2.5"/>`).join('')).join('')}
</g>`;
const tree = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})">
  <rect x="-14" y="-40" width="28" height="120" rx="6" fill="${Y.bark}"/>
  <circle cx="0" cy="-90" r="90" fill="${Y.leaf}"/><circle cx="-60" cy="-60" r="56" fill="${Y.leaf}"/><circle cx="60" cy="-64" r="60" fill="${Y.leaf}"/>
  <circle cx="0" cy="-90" r="90" fill="${Y.grassDark}" opacity="0.2"/></g>`;

const aloneSpreads = [
  // 1 TITLE
  { title: true, art: svg(
    `<linearGradient id="y1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${Y.sky}"/><stop offset="1" stop-color="${Y.cloud}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#y1)"/>
     <ellipse cx="240" cy="200" rx="90" ry="40" fill="#fff" opacity="0.7"/><ellipse cx="760" cy="150" rx="70" ry="32" fill="#fff" opacity="0.6"/>
     <path d="M0 760 Q500 720 1000 760 V1000 H0 Z" fill="${Y.grass}"/>
     ${tree(150, 760, 0.9)}
     ${wall(300, 620, 400, 1)}
     ${girl({ x: 500, y: 560, s: 1.0, dress: Y.coral, hair: '#3a2f28' })}`),
    text: '' },

  // 2 everything had its place
  { art: svg(
    `<linearGradient id="y2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${Y.sky}"/><stop offset="1" stop-color="${Y.cloud}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#y2)"/>
     <path d="M0 780 Q500 750 1000 780 V1000 H0 Z" fill="${Y.grass}"/>
     ${tree(780, 780, 1.0)}
     <line x1="120" y1="300" x2="360" y2="330" stroke="${Y.bark}" stroke-width="4"/>
     ${dove(180,300,0.9,Y.stone)}${dove(300,318,0.8,Y.wallDark)}
     ${[160,300,440].map((bx,i)=>`<g transform="translate(${bx},560)"><rect x="-34" y="0" width="68" height="120" fill="${Y.brick}"/><path d="M-44 0 L0 -36 L44 0 Z" fill="${Y.wallDark}"/></g>`).join('')}`),
    text: 'When Juniper moved to the town of Elmsworth, everything there already had its place. The birds had their branches. The shopkeepers had their corners. And the children had their spots in the schoolyard — the same spots they\'d had since they were small, sorted and settled and sure, like books on a well-loved shelf.' },

  // 3 Juniper had no spot
  { art: svg(
    `<linearGradient id="y3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${Y.sky}"/><stop offset="1" stop-color="${Y.cloud}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#y3)"/>
     <path d="M0 800 Q500 770 1000 800 V1000 H0 Z" fill="${Y.grass}"/>
     ${bench(230, 760, 1.0, 3)}${bench(760, 760, 1.0, 3)}
     ${girl({ x: 500, y: 640, s: 0.95, dress: Y.coral, hair: '#3a2f28' })}`),
    text: 'Juniper had no spot. She was brand new. Her clothes were a little different. She said some words in a way that made the other children\'s heads tilt. And on her first morning, she walked into the schoolyard holding her lunch, and looked for somewhere to sit — and every bench was already full of children who had known each other their whole lives.' },

  // 4 sits alone on the wall
  { art: svg(
    `<linearGradient id="y4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${Y.skyDeep}"/><stop offset="1" stop-color="${Y.sky}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#y4)"/>
     <path d="M0 720 Q500 690 1000 720 V1000 H0 Z" fill="${Y.grass}"/>
     ${bench(760, 700, 0.8, 3)}
     ${tree(880, 720, 0.7)}
     ${wall(120, 640, 320, 1.05)}
     ${girl({ x: 250, y: 590, s: 0.9, dress: Y.coral, hair: '#3a2f28', face:true })}`),
    text: 'So Juniper sat alone, on the low stone wall at the very edge of the yard, and ate her lunch, and looked like she didn\'t mind. She minded terribly.' },

  // 5 they weren't cruel
  { art: svg(
    `<linearGradient id="y5" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${Y.sky}"/><stop offset="1" stop-color="${Y.cloud}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#y5)"/>
     <path d="M0 790 Q500 760 1000 790 V1000 H0 Z" fill="${Y.grass}"/>
     ${bench(500, 740, 1.1, 4)}
     ${wall(760, 700, 200, 0.7)}
     ${girl({ x: 830, y: 675, s: 0.5, dress: Y.coral, hair: '#3a2f28', face:false })}`),
    text: 'The children of Elmsworth were not cruel. They didn\'t say mean things or push her. They just... didn\'t make room. It\'s easier not to. When your shelf is already full and settled, it\'s easier to leave the new book on the floor than to shift everything over to fit it in.' },

  // 6 the story she believes
  { art: svg(
    `<radialGradient id="y6" cx="0.5" cy="0.5" r="0.7"><stop offset="0" stop-color="${Y.skyDeep}"/><stop offset="1" stop-color="${Y.wallDark}"/></radialGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#y6)"/>
     ${wall(340, 560, 320, 1.05)}
     ${girl({ x: 500, y: 510, s: 1.1, dress: Y.coral, hair: '#3a2f28', face:false })}
     <text x="250" y="820" font-family="'Playfair Display'" font-style="italic" font-size="30" fill="${Y.cloud}">maybe I'm the kind of person who sits alone…</text>`),
    text: 'And slowly, the story Juniper told about herself began to change shape, the way sad thoughts do, until it became: *maybe there is something wrong with me. Maybe I am the kind of person who sits alone.* That is the most dangerous part of sitting alone. It isn\'t the empty seat. It\'s the story you start to believe about why it\'s empty.' },

  // 7 Cass noticed
  { art: svg(
    `<linearGradient id="y7" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${Y.sky}"/><stop offset="1" stop-color="${Y.cloud}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#y7)"/>
     <path d="M0 790 Q500 760 1000 790 V1000 H0 Z" fill="${Y.grass}"/>
     ${bench(700, 740, 1.0, 3)}
     ${boy({ x: 320, y: 660, s: 0.95, shirt: Y.leaf, hair:'#3a2f28' })}
     ${wall(760, 700, 220, 0.7)}
     ${girl({ x: 850, y: 675, s: 0.5, dress: Y.coral, hair: '#3a2f28', face:false })}
     <path d="M360 600 q120 -20 420 40" stroke="${Y.grassDark}" stroke-width="2.5" fill="none" stroke-dasharray="3 10" opacity="0.5"/>`),
    text: 'Among the children there was a boy named Cass. He was not the bravest or the most popular. But Cass had noticed the new girl on the wall — the first day, and the second, and the third. Because Cass had a secret the others had forgotten: he had been the new kid once, too. And he remembered exactly what the low stone wall felt like.' },

  // 8 one grey Thursday
  { art: svg(
    `<linearGradient id="y8" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${Y.wallDark}"/><stop offset="1" stop-color="${Y.stone}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#y8)"/>
     <ellipse cx="500" cy="220" rx="200" ry="70" fill="${Y.cloud}" opacity="0.5"/>
     <path d="M0 790 Q500 760 1000 790 V1000 H0 Z" fill="${Y.grassDark}"/>
     ${boy({ x: 500, y: 660, s: 1.1, shirt: Y.leaf, hair:'#3a2f28' })}
     ${[3,6].map(i=>`<line x1="${420+i*20}" y1="120" x2="${400+i*20}" y2="300" stroke="${Y.cloud}" stroke-width="2" opacity="0.4"/>`).join('')}`),
    text: 'For a whole week, Cass did nothing, because doing something felt enormous and scary. What if he walked over and she didn\'t want him there? The wall was only a few steps away, but it might as well have been across the sea. And then one grey Thursday, Cass decided that being a little scared was a much smaller thing than letting someone believe they were the kind of person who sits alone.' },

  // 9 he crosses the yard
  { art: svg(
    `<linearGradient id="y9" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${Y.sky}"/><stop offset="1" stop-color="${Y.cloud}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#y9)"/>
     <path d="M0 730 Q500 700 1000 730 V1000 H0 Z" fill="${Y.grass}"/>
     ${wall(150, 650, 360, 1.05)}
     ${girl({ x: 270, y: 600, s: 0.85, dress: Y.coral, hair: '#3a2f28' })}
     ${boy({ x: 460, y: 600, s: 0.85, shirt: Y.leaf, hair:'#3a2f28' })}
     <path d="M700 700 q-120 -60 -220 -70" stroke="${Y.grassDark}" stroke-width="3" fill="none" stroke-dasharray="4 10" opacity="0.5"/>`),
    text: 'So Cass picked up his lunch. He walked across the yard — the whole long, terrifying, ordinary way across the yard — and he sat down on the low stone wall next to Juniper. "This wall\'s better than the benches, honestly," said Cass. "You can see the whole sky from here." "You can," said Juniper, hardly daring to believe it. "I noticed that too."' },

  // 10 the whole magic
  { art: svg(
    `<linearGradient id="y10" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${Y.skyDeep}"/><stop offset="0.6" stop-color="${Y.sky}"/><stop offset="1" stop-color="${Y.cloud}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#y10)"/>
     ${[240,760].map((cx,i)=>`<ellipse cx="${cx}" cy="${180+i*40}" rx="90" ry="38" fill="#fff" opacity="0.6"/>`).join('')}
     <path d="M0 760 Q500 730 1000 760 V1000 H0 Z" fill="${Y.grass}"/>
     ${wall(300, 660, 400, 1.05)}
     ${girl({ x: 430, y: 610, s: 0.8, dress: Y.coral, hair: '#3a2f28' })}
     ${boy({ x: 590, y: 610, s: 0.8, shirt: Y.leaf, hair:'#3a2f28' })}`),
    text: 'And that was all it took. That was the whole magic. One kid, a little scared, choosing to scoot over. They talked about the sky, and then about the strange, interesting words Juniper knew, from a place Cass had never seen. It turns out that once one person decides the lonely kid is worth sitting with, everybody else suddenly wonders why they hadn\'t thought of it first.' },

  // 11 the best spot
  { art: svg(
    `<linearGradient id="y11" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${Y.sky}"/><stop offset="1" stop-color="${Y.cloud}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#y11)"/>
     <path d="M0 760 Q500 730 1000 760 V1000 H0 Z" fill="${Y.grass}"/>
     ${wall(120, 660, 760, 1.05)}
     ${girl({ x: 250, y: 610, s: 0.75, dress: Y.coral, hair: '#3a2f28' })}
     ${boy({ x: 400, y: 610, s: 0.75, shirt: Y.leaf, hair:'#3a2f28' })}
     ${girl({ x: 560, y: 610, s: 0.75, dress: Y.marigold, hair: '#2c2f3a' })}
     ${boy({ x: 720, y: 610, s: 0.75, shirt: Y.skyDeep, hair:'#3a2f28' })}`),
    text: 'Within a month, the low stone wall at the edge of the yard — the loneliest spot in all of Elmsworth — had somehow become the *best* spot. The spot where the most interesting talk happened. And it had happened not because Juniper changed to fit the town, but because one ordinary boy changed the town to fit *her.*' },

  // 12 next year, a new child
  { art: svg(
    `<linearGradient id="y12" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${Y.sky}"/><stop offset="1" stop-color="${Y.cloud}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#y12)"/>
     <path d="M0 740 Q500 710 1000 740 V1000 H0 Z" fill="${Y.grass}"/>
     ${wall(600, 660, 320, 0.9)}
     ${girl({ x: 720, y: 620, s: 0.6, dress: '#9a7fae', hair: '#2c2f3a', face:true })}
     ${girl({ x: 340, y: 620, s: 0.95, dress: Y.coral, hair: '#3a2f28' })}
     <path d="M400 590 q160 -30 300 20" stroke="${Y.grassDark}" stroke-width="3" fill="none" stroke-dasharray="4 10" opacity="0.5"/>`),
    text: 'The next year, another new child arrived — small, unsure, clutching a lunch, heading for the low stone wall. And Juniper did not wait a whole week. She did not wait a single day. She picked up her lunch, walked across the yard, and sat right down. "This wall\'s the best spot in the whole school," Juniper said. "You can see the entire sky from here. Want me to show you?"' },

  // 13 closing
  { art: svg(
    `<linearGradient id="y13" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${Y.skyDeep}"/><stop offset="0.6" stop-color="${Y.sky}"/><stop offset="1" stop-color="${Y.cloud}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#y13)"/>
     ${[220,500,780].map((cx,i)=>`<ellipse cx="${cx}" cy="${160+ (i%2)*50}" rx="86" ry="34" fill="#fff" opacity="0.6"/>`).join('')}
     <path d="M0 770 Q500 740 1000 770 V1000 H0 Z" fill="${Y.grass}"/>
     ${wall(300, 670, 400, 1.05)}
     ${girl({ x: 430, y: 620, s: 0.8, dress: Y.coral, hair: '#3a2f28' })}
     ${girl({ x: 590, y: 620, s: 0.8, dress: '#9a7fae', hair: '#2c2f3a' })}`),
    text: 'Everyone is the new kid sometimes. If that\'s you right now — the empty seat beside you is not proof of anything true about you. It only means the right person hasn\'t scooted over *yet.* And if you\'re the one with a spot, watching someone sit alone: you can end a whole loneliness in about ten steps and one sentence. When you see someone sitting alone, you get to decide who you are. Pick up your lunch. Walk across the yard. Go show them the sky.' },
];

// ── "The Girl Who Found Her Words" — warm parchment storytelling kingdom ─────
const Wl = {
  parch:'#EDE0C4', parchDeep:'#DCC79A', amber:'#D9B26A', gold:'#F0D385',
  plum:'#6E4A6B', plumDeep:'#4d3149', ink:'#3a3040', sage:'#7f9a72', rose:'#c98aa6',
  lantern:'#F2CE73',
};
const bubble = (x, y, s = 1, { caught = false, fill = '#fff' } = {}) => `<g transform="translate(${x},${y}) scale(${s})">
  <path d="M-54 -30 Q-54 -46 -38 -46 L38 -46 Q54 -46 54 -30 L54 14 Q54 30 38 30 L-12 30 L-26 50 L-24 30 L-38 30 Q-54 30 -54 14 Z" fill="${fill}" stroke="${Wl.plum}" stroke-width="2"/>
  ${caught ? `<circle cx="-22" cy="-8" r="5" fill="${Wl.plum}"/><circle cx="-6" cy="-8" r="5" fill="${Wl.plum}"/><circle cx="10" cy="-8" r="5" fill="${Wl.plum}"/><path d="M-22 -8 Q-14 4 -6 -8 Q2 4 10 -8" stroke="${Wl.rose}" stroke-width="2.5" fill="none"/>` : `<circle cx="-18" cy="-8" r="4" fill="${Wl.amber}"/><circle cx="0" cy="-8" r="4" fill="${Wl.amber}"/><circle cx="18" cy="-8" r="4" fill="${Wl.amber}"/>`}
</g>`;
const lantern = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><line x1="0" y1="-40" x2="0" y2="-14" stroke="${Wl.plumDeep}" stroke-width="2"/><path d="M-16 -14 Q-16 24 0 26 Q16 24 16 -14 Z" fill="${Wl.lantern}"/><circle cx="0" cy="6" r="26" fill="${Wl.lantern}" opacity="0.3"/></g>`;

const wordsSpreads = [
  // 1 TITLE
  { title: true, art: svg(
    `<radialGradient id="w1" cx="0.5" cy="0.4" r="0.8"><stop offset="0" stop-color="${Wl.parch}"/><stop offset="1" stop-color="${Wl.parchDeep}"/></radialGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#w1)"/>
     ${lantern(180,150,1.4)}${lantern(820,180,1.2)}${lantern(360,120,1)}${lantern(660,130,1.1)}
     ${bubble(720,430,1.0,{caught:true})}${bubble(230,470,0.9)}
     ${girl({ x: 500, y: 560, s: 1.2, dress: Wl.plum, hair: '#3a2f28' })}`),
    text: '' },

  // 2 words took their time
  { art: svg(
    `<linearGradient id="w2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${Wl.parch}"/><stop offset="1" stop-color="${Wl.parchDeep}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#w2)"/>
     ${lantern(200,160,1.2)}${lantern(800,150,1.2)}
     ${girl({ x: 500, y: 560, s: 1.3, dress: Wl.plum, hair: '#3a2f28' })}
     ${bubble(720,430,1.0,{caught:true})}`),
    text: 'In a kingdom that loved a good story, there lived a girl named Willa, whose words took their time.' },

  // 3 the Great Telling
  { art: svg(
    `<radialGradient id="w3" cx="0.5" cy="0.4" r="0.85"><stop offset="0" stop-color="${Wl.gold}"/><stop offset="1" stop-color="${Wl.amber}"/></radialGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#w3)"/>
     ${[160,300,700,840].map((bx,i)=>lantern(bx,140+ (i%2)*30,1.1)).join('')}
     <rect x="380" y="360" width="240" height="60" rx="8" fill="${Wl.plumDeep}"/>
     ${girl({ x: 500, y: 320, s: 0.7, dress: Wl.rose, hair: '#2c2f3a' })}
     ${bubble(680,300,0.9,{})}
     ${[160,300,540,700,860].map((bx,i)=>boyBlob(bx,720+ (i%2)*20,'#b98f4e',1.2)).join('')}`),
    text: 'It was a kingdom built on stories. Every year it held the Great Telling — a festival where, one by one, the people stood in the square and told a story, and the whole kingdom listened. To stand up and tell your story well was the proudest thing a person could do.' },

  // 4 words catch
  { art: svg(
    `<linearGradient id="w4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${Wl.parch}"/><stop offset="1" stop-color="${Wl.parchDeep}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#w4)"/>
     ${girl({ x: 380, y: 560, s: 1.15, dress: Wl.plum, hair: '#3a2f28' })}
     ${bubble(650,400,1.3,{caught:true})}
     <path d="M430 460 q80 -20 140 -40" stroke="${Wl.plum}" stroke-width="3" fill="none" stroke-dasharray="3 9" opacity="0.5"/>`),
    text: 'Willa loved stories more than anyone. Her head was full of them. But when she tried to say them out loud, her words took their time. The first sound would catch, and c-c-catch, and get stuck somewhere behind her teeth, and she would have to wait, and try again, gently, until it came loose.' },

  // 5 the kingdom rushes
  { art: svg(
    `<linearGradient id="w5" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${Wl.parchDeep}"/><stop offset="1" stop-color="${Wl.amber}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#w5)"/>
     ${girl({ x: 360, y: 600, s: 1.0, dress: Wl.plum, hair: '#3a2f28', face:false })}
     ${[600,720,840].map((bx,i)=>boyBlob(bx,540+ (i%2)*20,'#b98f4e',1.0)).join('')}
     ${bubble(660,360,1.0,{})}
     <text x="560" y="300" font-family="'Playfair Display'" font-style="italic" font-size="28" fill="${Wl.plumDeep}">…hurry up…</text>`),
    text: 'And the kingdom, which loved a good story, was not very good at waiting. People finished her sentences for her. They looked away. Some got a pained, hurrying look, as if her slowness were a splinter they wished someone would pull out.' },

  // 6 she stops talking
  { art: svg(
    `<radialGradient id="w6" cx="0.5" cy="0.5" r="0.7"><stop offset="0" stop-color="${Wl.plum}"/><stop offset="1" stop-color="${Wl.plumDeep}"/></radialGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#w6)"/>
     ${girl({ x: 500, y: 560, s: 1.2, dress: Wl.rose, hair: '#3a2f28', face:false })}
     ${[bubble(230,300,0.8,{}),bubble(760,320,0.8,{caught:true}),bubble(300,720,0.7,{}),bubble(720,700,0.7,{})].join('')}`),
    text: 'So Willa did the saddest thing a girl full of stories can do. She stopped talking. She kept all her stories inside, where they were safe, where nobody could rush them. And everyone decided Willa simply had nothing to say. They were so wrong. Willa had *everything* to say. She just needed a kingdom patient enough to hear it.' },

  // 7 the grey forgetting
  { art: svg(
    `<linearGradient id="w7" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${Wl.parchDeep}"/><stop offset="1" stop-color="${Wl.plumDeep}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#w7)"/>
     <rect x="380" y="360" width="240" height="60" rx="8" fill="${Wl.plumDeep}"/>
     ${girl({ x: 500, y: 320, s: 0.7, dress: Wl.sage, hair: '#2c2f3a', face:false })}
     ${bubble(660,300,1.0,{fill:'#d8d2c4'})}
     <text x="600" y="300" font-family="'Playfair Display'" font-style="italic" font-size="40" fill="${Wl.plumDeep}">…?</text>
     ${[200,340,660,820].map((bx,i)=>boyBlob(bx,720,'#8a7f6a',1.1)).join('')}`),
    text: 'Then a strange trouble came. At the Great Telling, the first teller stood to begin — and could not remember her story. Neither could the next, or the one after. A grey forgetting had settled over the kingdom. All the fast talkers had told their tales so quickly, so carelessly, for so many years, that they had never really *held* them. And now the stories had slipped right through their rushing fingers.' },

  // 8 despair
  { art: svg(
    `<linearGradient id="w8" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${Wl.plumDeep}"/><stop offset="1" stop-color="${Wl.plum}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#w8)"/>
     ${[160,320,500,680,840].map((bx,i)=>boyBlob(bx,560+ (i%2)*20,'#5a4a58',1.1)).join('')}
     ${lantern(220,180,1.0)}${lantern(780,190,1.0)}`),
    text: 'The kingdom was in despair. A Great Telling with nothing to tell! The wonderful day, ruined.' },

  // 9 I remember one
  { art: svg(
    `<radialGradient id="w9" cx="0.5" cy="0.5" r="0.7"><stop offset="0" stop-color="${Wl.gold}" stop-opacity="0.4"/><stop offset="1" stop-color="${Wl.plum}"/></radialGradient>`,
    `<rect width="${W}" height="${H}" fill="${Wl.plum}"/>
     <circle cx="500" cy="520" r="330" fill="url(#w9)"/>
     ${boy({ x: 360, y: 520, s: 0.9, shirt: Wl.sage, hair:'#3a2f28', hands:true })}
     ${girl({ x: 600, y: 620, s: 1.0, dress: Wl.rose, hair: '#3a2f28' })}
     <text x="250" y="300" font-family="'Playfair Display'" font-style="italic" font-size="30" fill="${Wl.gold}">"…let her tell it. However long it takes."</text>`),
    text: 'And at the very back, a quiet voice said, "I remember one." Willa\'s older brother heard. He stood on a bench and shouted, "My sister remembers a story! But you have to *let her tell it.* All the way. However long it takes." The square went quiet. Every face turned to Willa.' },

  // 10 the first word catches
  { art: svg(
    `<radialGradient id="w10" cx="0.5" cy="0.45" r="0.7"><stop offset="0" stop-color="${Wl.gold}"/><stop offset="1" stop-color="${Wl.amber}"/></radialGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#w10)"/>
     ${[140,280,720,860].map((bx,i)=>boyBlob(bx,460+ (i%2)*20,'#b98f4e',0.95)).join('')}
     ${girl({ x: 500, y: 580, s: 1.25, dress: Wl.plum, hair: '#3a2f28' })}
     ${bubble(700,360,1.2,{caught:true})}`),
    text: 'So Willa stood up. And she began. The first word caught, and c-c-caught, and got stuck behind her teeth. And here is the thing that had never happened before in all of Willa\'s life: *nobody rushed her.* Nobody finished it for her. The whole kingdom simply waited — patient and still and leaning in — and let the word come loose in its own time. And it did.' },

  // 11 the most beautiful story
  { art: svg(
    `<radialGradient id="w11" cx="0.5" cy="0.45" r="0.8"><stop offset="0" stop-color="${Wl.gold}"/><stop offset="1" stop-color="${Wl.amber}"/></radialGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#w11)"/>
     ${[bubble(200,220,1.0,{}),bubble(780,240,1.1,{}),bubble(320,360,0.8,{}),bubble(680,380,0.9,{})].join('')}
     ${girl({ x: 500, y: 620, s: 1.2, dress: Wl.plum, hair: '#3a2f28' })}
     ${[140,860].map(bx=>boyBlob(bx,720,'#b98f4e',1.0)).join('')}`),
    text: 'And then the next word. And Willa began to tell the most beautiful story the kingdom had ever heard. Because that was the secret nobody had guessed: all those years she wasn\'t talking, she had been *keeping.* Her words took their time — and so every single one of them had been chosen, and polished, and *meant.* She did not have less to say than the others. She had more. She had been saving it.' },

  // 12 the kingdom roars
  { art: svg(
    `<radialGradient id="w12" cx="0.5" cy="0.4" r="0.85"><stop offset="0" stop-color="${Wl.gold}"/><stop offset="1" stop-color="${Wl.amber}"/></radialGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#w12)"/>
     ${[120,300,700,880].map((bx,i)=>lantern(bx,150+ (i%2)*30,1.2)).join('')}
     ${girl({ x: 500, y: 560, s: 1.2, dress: Wl.plum, hair: '#3a2f28' })}
     ${[60,140,220].map((r,i)=>`<circle cx="500" cy="470" r="${r}" fill="none" stroke="${Wl.rose}" stroke-width="3" opacity="${0.5-i*0.13}"/>`).join('')}
     ${[180,820].map(bx=>boyBlob(bx,720,'#b98f4e',1.1)).join('')}`),
    text: 'When she finished, the square was so quiet you could hear the wind. And then the whole kingdom rose to its feet and roared — the loudest, longest cheer in the history of the Great Telling — for the girl whose words took their time. And every year after, the most honored teller of all, the one the whole kingdom leaned in to hear, was Willa — who was never, ever rushed again.' },

  // 13 closing
  { art: svg(
    `<radialGradient id="w13" cx="0.5" cy="0.5" r="0.75"><stop offset="0" stop-color="${Wl.gold}" stop-opacity="0.5"/><stop offset="0.6" stop-color="${Wl.parch}"/><stop offset="1" stop-color="${Wl.parchDeep}"/></radialGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#w13)"/>
     ${lantern(220,170,1.2)}${lantern(780,180,1.2)}
     ${bubble(720,420,1.1,{caught:false})}
     ${girl({ x: 500, y: 600, s: 1.35, dress: Wl.plum, hair: '#3a2f28' })}`),
    text: 'The world is in a terrible hurry. But if your words take their time — if they catch, and stick, and have to be coaxed out one careful piece at a time — hear this: your voice is not too slow. It is careful. It is chosen. It is worth waiting for. So take all the time you need. The right people will lean in and wait. Take your time. We\'re listening.' },
];

// ── "The Kid with Two Homes" — warm home vs cool home, one heart ─────────────
const HM = {
  warmBg:'#F3DEB0', warm:'#E0A94A', terra:'#C97B54', roofW:'#a85b3e',
  coolBg:'#CBDEE6', cool:'#6A92A8', coolDeep:'#4c7387', roofC:'#3f5f70',
  night:'#2a3350', nightDeep:'#1c2340', sam:'#5f9e7a', rabbit:'#EDE6D8', rabbitDk:'#d6cdb8',
  heart:'#E0869F', heartLt:'#F2AFC6', ink:'#2c2a33',
};
const house = (x, y, s = 1, warm = true) => {
  const wall = warm ? HM.warm : HM.cool, roof = warm ? HM.roofW : HM.roofC, bg = warm ? HM.terra : HM.coolDeep;
  return `<g transform="translate(${x},${y}) scale(${s})">
    <rect x="-90" y="0" width="180" height="150" fill="${wall}"/>
    <path d="M-108 0 L0 -96 L108 0 Z" fill="${roof}"/>
    <rect x="-30" y="60" width="60" height="90" rx="4" fill="${bg}"/>
    <rect x="-70" y="30" width="40" height="40" rx="4" fill="${HM.warmBg}" opacity="${warm?0.9:0}"/><rect x="-70" y="30" width="40" height="40" rx="4" fill="${HM.coolBg}" opacity="${warm?0:0.9}"/>
    <rect x="34" y="30" width="40" height="40" rx="4" fill="${warm?HM.warmBg:HM.coolBg}" opacity="0.9"/>
    <circle cx="16" cy="108" r="4" fill="${HM.warmBg}"/></g>`;
};
const rabbit = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})">
  <ellipse cx="0" cy="0" rx="20" ry="24" fill="${HM.rabbit}"/>
  <ellipse cx="-8" cy="-30" rx="6" ry="20" fill="${HM.rabbit}"/><ellipse cx="8" cy="-30" rx="6" ry="20" fill="${HM.rabbit}"/>
  <ellipse cx="-8" cy="-30" rx="3" ry="12" fill="${HM.rabbitDk}"/><ellipse cx="8" cy="-30" rx="3" ry="12" fill="${HM.rabbitDk}"/>
  <circle cx="-6" cy="-4" r="2.4" fill="${HM.ink}"/><circle cx="6" cy="-4" r="2.4" fill="${HM.ink}"/>
  <path d="M-4 4 Q0 8 4 4" stroke="${HM.ink}" stroke-width="1.6" fill="none"/></g>`;
const bag = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})">
  <rect x="-30" y="-16" width="60" height="50" rx="10" fill="${HM.terra}"/>
  <path d="M-18 -16 Q0 -40 18 -16" stroke="${HM.roofW}" stroke-width="6" fill="none"/>
  <rect x="-30" y="-4" width="60" height="8" fill="${HM.roofW}" opacity="0.5"/></g>`;
const heart = (x, y, s = 1, fill = HM.heart) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M0 14 C-16 0 -22 -12 -12 -20 C-5 -25 0 -18 0 -14 C0 -18 5 -25 12 -20 C22 -12 16 0 0 14 Z" fill="${fill}"/></g>`;

const homesSpreads = [
  // 1 TITLE
  { title: true, art: svg(
    `<linearGradient id="h1" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${HM.warmBg}"/><stop offset="0.5" stop-color="${HM.warmBg}"/><stop offset="0.5" stop-color="${HM.coolBg}"/><stop offset="1" stop-color="${HM.coolBg}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#h1)"/>
     ${house(250, 380, 1.0, true)}${house(760, 380, 1.0, false)}
     ${heart(500, 470, 3.2)}
     ${boy({ x: 500, y: 620, s: 1.0, shirt: HM.sam, hair:'#3a2f28' })}
     ${rabbit(600, 660, 1.0)}`),
    text: '' },

  // 2 two homes
  { art: svg(
    `<linearGradient id="h2" x1="0" y1="0" x2="1" y2="0"><stop offset="0.5" stop-color="${HM.warmBg}"/><stop offset="0.5" stop-color="${HM.coolBg}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#h2)"/>
     ${house(250, 440, 1.05, true)}${house(760, 440, 1.05, false)}
     ${boy({ x: 500, y: 640, s: 1.05, shirt: HM.sam, hair:'#3a2f28' })}
     ${rabbit(600, 690, 0.9)}`),
    text: 'There was once a boy named Sam who had two homes. And for a long time, he thought that meant something was wrong with him.' },

  // 3 the floor moved
  { art: svg(
    `<linearGradient id="h3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${HM.warmBg}"/><stop offset="1" stop-color="${HM.coolBg}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#h3)"/>
     ${house(500, 360, 1.1, true)}
     <path d="M500 520 L250 720 M500 520 L760 720" stroke="${HM.terra}" stroke-width="3" stroke-dasharray="4 12" opacity="0.5"/>
     ${house(250, 620, 0.7, true)}${house(760, 620, 0.7, false)}
     ${boy({ x: 500, y: 760, s: 0.7, shirt: HM.sam, hair:'#3a2f28', face:false })}`),
    text: 'It hadn\'t always been two. Once there had been one house, with both his parents in it, and Sam hadn\'t thought about "home" at all — the way you don\'t think about the floor until it moves. But the floor had moved. Now his mom lived in one house and his dad lived in another. And Sam lived in both.' },

  // 4 packing the bag
  { art: svg(
    `<linearGradient id="h4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${HM.warmBg}"/><stop offset="1" stop-color="${HM.warm}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#h4)"/>
     <rect x="0" y="760" width="1000" height="240" fill="${HM.terra}" opacity="0.3"/>
     ${bag(560, 640, 1.6)}
     ${boy({ x: 380, y: 640, s: 1.0, shirt: HM.sam, hair:'#3a2f28' })}
     ${rabbit(660, 600, 0.9)}`),
    text: 'On Fridays, Sam packed a bag. He got very good at packing that bag, which is a thing no kid should have to be good at. Toothbrush. The soft shirt. And Biscuit — the one stuffed rabbit, who went everywhere, because Biscuit was the only thing that lived in both houses full-time. Like Sam.' },

  // 5 the heavy question
  { art: svg(
    `<radialGradient id="h5" cx="0.5" cy="0.5" r="0.7"><stop offset="0" stop-color="${HM.coolBg}"/><stop offset="1" stop-color="${HM.cool}"/></radialGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#h5)"/>
     ${boy({ x: 500, y: 600, s: 1.2, shirt: HM.sam, hair:'#3a2f28', face:false })}
     <g opacity="0.7">${heart(500, 470, 2.2, HM.coolDeep)}</g>
     <text x="250" y="300" font-family="'Playfair Display'" font-style="italic" font-size="28" fill="${HM.coolDeep}">which one is my real home? …did I do it?</text>`),
    text: 'And every Friday, zipping up that bag, Sam felt the small heavy question press on his chest. *Which one is my real home? Where do I actually belong? And — did I do something, to make the one house turn into two?* He didn\'t say it out loud. Kids often don\'t. But he carried it everywhere, tucked next to Biscuit.' },

  // 6 the night, the whisper
  { art: svg(
    `<linearGradient id="h6" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${HM.night}"/><stop offset="1" stop-color="${HM.nightDeep}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#h6)"/>
     <circle cx="800" cy="180" r="44" fill="${HM.warmBg}" opacity="0.8"/>
     <rect x="150" y="560" width="700" height="40" rx="10" fill="${HM.roofC}"/>
     <ellipse cx="500" cy="540" rx="220" ry="40" fill="${HM.cool}" opacity="0.4"/>
     ${boy({ x: 470, y: 500, s: 0.85, shirt: HM.cool, hair:'#3a2f28', face:false })}
     ${rabbit(600, 520, 0.8)}
     <rect x="120" y="120" width="140" height="200" rx="6" fill="${HM.warm}" opacity="0.25"/>`),
    text: 'One night at his dad\'s house, lying in the bed that was his but in the room that was only half his life, Sam finally let a little of the question leak out. "I don\'t know where home is anymore," he said, very quietly, mostly to Biscuit. But his dad was in the doorway. And his dad heard.' },

  // 7 dad sits
  { art: svg(
    `<linearGradient id="h7" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${HM.nightDeep}"/><stop offset="1" stop-color="${HM.night}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#h7)"/>
     <rect x="120" y="600" width="760" height="40" rx="10" fill="${HM.roofC}"/>
     ${boyBlob(650,560,'#3f5f70',1.6)}
     ${boy({ x: 380, y: 560, s: 0.8, shirt: HM.cool, hair:'#3a2f28' })}
     ${heart(760, 360, 1.6, HM.heartLt)}`),
    text: 'His dad came and sat on the edge of the bed, and he didn\'t rush to fix it — which was the right thing, because some things can\'t be fixed, only understood. For a while he just sat. Then he said, "Can I tell you a secret about homes?"' },

  // 8 you got all of both
  { art: svg(
    `<radialGradient id="h8" cx="0.5" cy="0.45" r="0.75"><stop offset="0" stop-color="${HM.heartLt}" stop-opacity="0.35"/><stop offset="1" stop-color="${HM.night}"/></radialGradient>`,
    `<rect width="${W}" height="${H}" fill="${HM.night}"/><circle cx="500" cy="460" r="320" fill="url(#h8)"/>
     ${heart(320, 420, 2.6, HM.warm)}${heart(680, 420, 2.6, HM.cool)}
     ${heart(500, 470, 3.4, HM.heart)}
     ${boy({ x: 500, y: 660, s: 0.85, shirt: HM.cool, hair:'#3a2f28' })}`),
    text: '"When you were born," his dad said, "your mom and I looked at you, and both of us felt the exact same enormous thing. That never split in two, Sam. It didn\'t divide up when we did. You didn\'t get half of each. You got *all* of both. That\'s not less than other kids have. That\'s *more.*"' },

  // 9 home was never the house
  { art: svg(
    `<radialGradient id="h9" cx="0.5" cy="0.4" r="0.7"><stop offset="0" stop-color="${HM.heartLt}" stop-opacity="0.4"/><stop offset="1" stop-color="${HM.night}"/></radialGradient>`,
    `<rect width="${W}" height="${H}" fill="${HM.nightDeep}"/><circle cx="500" cy="440" r="300" fill="url(#h9)"/>
     ${boy({ x: 500, y: 600, s: 1.5, shirt: HM.cool, hair:'#3a2f28' })}
     ${heart(500, 500, 2.0, HM.heart)}
     <circle cx="500" cy="490" r="70" fill="none" stroke="${HM.heartLt}" stroke-width="3" opacity="0.5"/>`),
    text: '"Here\'s the secret. Home was never the house." He tapped Sam gently, right on the chest, over his heart. "Home is *this.* And you carry it with you, back and forth, every Friday, in that bag with Biscuit. You\'re not a kid who lost his home, Sam. You\'re a kid who\'s big enough to make home in two places. Most people only know how to do it in one."' },

  // 10 it was never about you
  { art: svg(
    `<linearGradient id="h10" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${HM.night}"/><stop offset="1" stop-color="${HM.nightDeep}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#h10)"/>
     ${boyBlob(360,540,'#3f5f70',1.5)}
     ${boy({ x: 620, y: 580, s: 0.9, shirt: HM.cool, hair:'#3a2f28' })}
     ${heart(500, 300, 1.6, HM.heartLt)}${heart(760, 380, 1.1, HM.heartLt)}`),
    text: '"And Sam," his dad added, quieter now, because this part mattered most of all, "the thing that changed between your mom and me — that was grown-up stuff. It was never, ever about you. You didn\'t do it, and you couldn\'t have stopped it. Two homes doesn\'t mean you were too much. It means you were, and are, completely loved. Twice over."' },

  // 11 the question floats away
  { art: svg(
    `<linearGradient id="h11" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${HM.nightDeep}"/><stop offset="1" stop-color="${HM.night}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#h11)"/>
     ${[[500,300,1],[600,220,0.7],[680,150,0.5]].map(([x,y,o])=>`<g opacity="${o}">${heart(x,y,1.4,HM.coolDeep)}</g>`).join('')}
     ${boy({ x: 460, y: 600, s: 1.0, shirt: HM.cool, hair:'#3a2f28' })}
     ${rabbit(580, 620, 0.85)}`),
    text: 'And Sam felt the small heavy question lift off his chest and float away into the dark — and it did not come back to sit on him the same way ever again.' },

  // 12 carrying his home
  { art: svg(
    `<linearGradient id="h12" x1="0" y1="0" x2="1" y2="0"><stop offset="0.5" stop-color="${HM.warmBg}"/><stop offset="0.5" stop-color="${HM.coolBg}"/></linearGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#h12)"/>
     ${house(220, 400, 0.9, true)}${house(790, 400, 0.9, false)}
     ${boy({ x: 500, y: 620, s: 1.05, shirt: HM.sam, hair:'#3a2f28' })}
     ${bag(600, 660, 1.0)}${heart(500, 520, 1.6, HM.heart)}
     <path d="M300 720 Q500 690 700 720" stroke="${HM.terra}" stroke-width="3" fill="none" stroke-dasharray="4 12" opacity="0.5"/>`),
    text: 'He still packed his bag on Fridays. That part didn\'t change. But packing it felt different now. He wasn\'t leaving home to go somewhere else. He was *carrying* his home — the one in his chest, next to Biscuit — from people who loved him, to people who loved him. And that, it turned out, was a fine way to grow up. More than fine. Full.' },

  // 13 closing
  { art: svg(
    `<radialGradient id="h13" cx="0.5" cy="0.5" r="0.75"><stop offset="0" stop-color="${HM.heartLt}" stop-opacity="0.45"/><stop offset="0.5" stop-color="${HM.warmBg}"/><stop offset="1" stop-color="${HM.coolBg}"/></radialGradient>`,
    `<rect width="${W}" height="${H}" fill="url(#h13)"/>
     ${house(210, 380, 0.7, true)}${house(800, 380, 0.7, false)}
     ${heart(500, 470, 4.0)}
     ${boy({ x: 500, y: 660, s: 1.0, shirt: HM.sam, hair:'#3a2f28' })}
     ${rabbit(600, 700, 0.85)}`),
    text: 'A heart is not a house. It doesn\'t crack down the middle when a family changes shape. It stretches. It makes room. It learns to hold two of everything — and that is not a wound. It\'s a superpower. If your family has changed shape: home was never the house. It\'s the love you carry with you. None of it was your fault. And your heart is big enough for all of it. You always were. You always will be.' },
];

const BOOKS = [
  {
    slug: 'the-kid-with-two-homes',
    title: 'The Kid with Two Homes',
    subtitle: 'A story about a heart that\'s big enough for two houses.',
    spreads: homesSpreads,
    coverArt: homesSpreads[0].art,
    grownup: `When a family changes shape, the children feel it first and deepest — the packed bag, the two toothbrushes, and a small heavy question they don't always say out loud: which house is home, and was it my fault? This story is gentle on purpose. It doesn't pretend the two houses become one again, because children can tell when a story is lying to them. It tells a truer, kinder thing instead. When you finish, tell the child beside you: none of this was your fault, you are loved in both homes, and your heart is big enough for all of it.`,
  },
  {
    slug: 'the-girl-who-found-her-words',
    title: 'The Girl Who Found Her Words',
    subtitle: 'A story about a voice that takes its time — and the day everyone finally listened.',
    spreads: wordsSpreads,
    coverArt: wordsSpreads[0].art,
    grownup: `The world is in a hurry, and it will try to finish a child's sentences for them — especially a child whose words catch, and stick, and take their time. This is a story for children who stutter or are shy of speaking, and for everyone who loves one. When you finish, read it again unhurried — the way you'd want someone to wait for Willa — and tell the child beside you the truest thing in it: your words are worth waiting for. Take all the time you need.`,
  },
  {
    slug: 'the-one-who-sat-alone',
    title: 'The One Who Sat Alone',
    subtitle: 'A story about the new kid, the empty seat, and who we get to become.',
    spreads: aloneSpreads,
    coverArt: aloneSpreads[0].art,
    grownup: `Almost every child, at some point, is the one who sits alone — the new kid, the one who looks or sounds different, the one at the edge of the playground trying to look like they don't mind. This story is for that child, and just as much for the ones who get to decide what happens next. When you finish, ask the child beside you the question the whole book is really about: when you see someone sitting alone, who do you want to be?`,
  },
  {
    slug: 'the-quietest-kid-in-the-kingdom',
    title: 'The Quietest Kid in the Kingdom',
    subtitle: 'A story about the loud, brave magic of a quiet heart.',
    spreads: quietSpreads,
    coverArt: quietSpreads[0].art,
    grownup: `The world spends a lot of a child's early years telling them to speak up. Sometimes that's good advice. But the quiet ones aren't empty — they're often the ones noticing what everyone else is too loud to hear. This is a story for shy, introverted, and quiet children, and a gentle correction to the idea that quiet means less. When you finish, tell the quiet child beside you: your quiet is a kind of listening the loud world forgot how to do — and it's a strength, not a problem to fix.`,
  },
  {
    slug: 'the-boy-who-talked-to-the-stars',
    title: 'The Boy Who Talked to the Stars',
    subtitle: 'A story about a mind that works a little differently — and a world that needs it.',
    spreads: starSpreads,
    coverArt: starSpreads[0].art,
    grownup: `Some children experience the world turned up too loud — the lights, the noise, the rush of it climbing up their skin. They line things up. They know everything about one enormous thing. And they light up like a whole city when they find the one place, or person, that finally makes sense. This is a story for autistic and neurodivergent children, and for everyone who loves one. When you finish, don't ask your Theo to come down off the hill. Climb up. Ask them what the stars are saying. They have been waiting for someone to ask.`,
  },
  {
    slug: 'the-girl-who-loved-gray',
    title: 'The Girl Who Loved Gray',
    subtitle: 'A picture book about all the colors between yes and no.',
    spreads: grayLoveSpreads,
    coverArt: grayLoveSpreads[0].art,
  },
  {
    slug: 'the-princess-who-rescued-herself',
    title: 'The Princess Who Rescued Herself',
    subtitle: 'A fairytale about writing your own happily ever after.',
    spreads: princessSpreads,
    coverArt: princessSpreads[0].art,
    grownup: `We give little girls a story early: something is wrong, and a prince will come and fix it. It is a lovely story and a terrible plan. This one keeps the tower and the prince and the happily-ever-after — and quietly hands the pen to the girl. When you finish, ask the small person listening the question the whole book is really about: <em>"What would you do, if the door was locked and nobody was coming?"</em> You may be surprised by how quickly they look for the hinges.`,
  },
];

// ── HTML assembly ────────────────────────────────────────────────────────────
const esc = (s) => s.replace(/&(?!\w+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const story = (t) => esc(t)
  .replace(/&lt;em&gt;/g, '<em>').replace(/&lt;\/em&gt;/g, '</em>')
  .replace(/\*([^*]+)\*/g, '<em>$1</em>');

function interiorHtml(book) {
  const pages = book.spreads.map((sp) => {
    if (sp.title) {
      return `<section class="pg pg--title">
        <div class="art">${sp.art}</div>
        <div class="titleplate">
          <p class="kicker">The Little Rewrites</p>
          <h1>${esc(book.title)}</h1>
          <p class="sub">${esc(book.subtitle)}</p>
          <p class="by">MK Parrish</p>
        </div>
      </section>`;
    }
    return `<section class="pg">
      <div class="art">${sp.art}</div>
      ${sp.text ? `<div class="line"><p>${story(sp.text)}</p></div>` : ''}
    </section>`;
  }).join('\n');

  const defaultNote = `We hand children a black-and-white world early: right and wrong, smart and dumb, winner and loser, us and them. It is faster to think that way, and lonelier, and mostly untrue. This book is a small argument for the gray — for nuance, for "it depends," for holding two true things at once, for the patience to stay in a question a little longer.</p><p>When you finish, look for a gray together. A pigeon. A rain cloud. The soft middle of an argument that isn't all one person's fault. Then say the sentence that undoes a lifetime of hard lines: <em>"Two things can be true at the same time."</em>`;
  const grownup = `<section class="pg pg--note">
    <div class="notewrap">
      <p class="kicker">For the grown-up reading along</p>
      <p>${book.grownup ?? defaultNote}</p>
      <p class="foot">The Little Rewrites · MK Parrish · <span>mkparrish.com</span></p>
    </div>
  </section>`;

  return `<!doctype html><html><head><meta charset="utf-8"/>
  <style>
  ${fontCss}
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{background:#000}
  :root{--ink:${C.ink};--slate:${C.slate};--steel:${C.steel};--ash:${C.ash};--paper:${C.paper};--petal:${C.petal};--rose:${C.rose}}
  .pg{position:relative;width:8in;height:8in;overflow:hidden;page-break-after:always;background:var(--paper)}
  .art,.art svg{position:absolute;inset:0;width:100%;height:100%;display:block}
  .line{position:absolute;left:0;right:0;bottom:0;padding:0.42in 0.62in 0.5in;
    background:linear-gradient(to top, rgba(12,12,14,0.82) 0%, rgba(12,12,14,0.66) 62%, rgba(12,12,14,0) 100%)}
  .line p{font-family:'Playfair Display',Georgia,serif;color:#fff;font-size:19.5pt;line-height:1.42;
    max-width:5.7in;text-shadow:0 1px 12px rgba(0,0,0,0.5)}
  .line em{font-style:italic;color:var(--petal)}
  .pg--title .titleplate{position:absolute;left:0;right:0;bottom:0;padding:0.6in 0.7in 0.7in;
    background:linear-gradient(to top, rgba(12,12,14,0.9), rgba(12,12,14,0))}
  .titleplate .kicker{font-family:'DM Sans',sans-serif;font-weight:700;letter-spacing:0.28em;
    text-transform:uppercase;color:var(--petal);font-size:9pt;margin-bottom:12px}
  .titleplate h1{font-family:'Bebas Neue',sans-serif;color:#fff;font-size:58pt;line-height:0.92;
    text-transform:uppercase;letter-spacing:0.01em}
  .titleplate .sub{font-family:'Playfair Display',serif;font-style:italic;color:#e9edf1;
    font-size:16pt;margin-top:12px}
  .titleplate .by{font-family:'DM Sans',sans-serif;color:var(--ash);letter-spacing:0.22em;
    text-transform:uppercase;font-size:9.5pt;margin-top:16px;font-weight:600}
  .pg--note{background:var(--ink);display:flex;align-items:center;justify-content:center}
  .notewrap{max-width:5.6in;padding:0.6in}
  .notewrap .kicker{font-family:'DM Sans',sans-serif;font-weight:700;letter-spacing:0.26em;
    text-transform:uppercase;color:var(--petal);font-size:9pt;margin-bottom:20px}
  .notewrap p{font-family:'Playfair Display',serif;color:#e9edf1;font-size:14.5pt;line-height:1.62;margin-bottom:16px}
  .notewrap em{color:var(--petal);font-style:italic}
  .notewrap .foot{font-family:'DM Sans',sans-serif;font-size:9pt;letter-spacing:0.16em;
    text-transform:uppercase;color:var(--steel);margin-top:26px}
  .notewrap .foot span{color:var(--petal)}
  </style></head><body>${pages}${grownup}</body></html>`;
}

// portrait cover: reuse title art in a 5:8 frame with a title plate
function coverHtml(book) {
  return `<!doctype html><html><head><meta charset="utf-8"/><style>
  ${fontCss}
  *{margin:0;padding:0;box-sizing:border-box}
  .cov{position:relative;width:1600px;height:2560px;overflow:hidden;background:${C.mist}}
  .cov .art,.cov .art svg{position:absolute;inset:0;width:100%;height:100%}
  .plate{position:absolute;left:0;right:0;top:0;padding:150px 120px 130px;text-align:center;
    background:linear-gradient(to bottom, rgba(10,10,12,0.82) 0%, rgba(10,10,12,0.6) 55%, rgba(10,10,12,0) 100%)}
  .plate .k{font-family:'DM Sans',sans-serif;font-weight:700;letter-spacing:0.3em;text-transform:uppercase;color:${C.petal};font-size:34px;margin-bottom:30px}
  .plate h1{font-family:'Bebas Neue',sans-serif;text-transform:uppercase;color:#fff;font-size:172px;line-height:0.86;letter-spacing:0.01em;text-shadow:0 2px 30px rgba(0,0,0,0.5)}
  .band{position:absolute;left:0;right:0;bottom:0;padding:150px 120px 140px;text-align:center;
    background:linear-gradient(to top, rgba(10,10,12,0.82) 0%, rgba(10,10,12,0.55) 55%, rgba(10,10,12,0) 100%)}
  .band .s{font-family:'Playfair Display',serif;font-style:italic;color:${C.cloud};font-size:52px;line-height:1.3;margin-bottom:40px;text-shadow:0 1px 20px rgba(0,0,0,0.6)}
  .band .by{font-family:'DM Sans',sans-serif;font-weight:600;letter-spacing:0.28em;text-transform:uppercase;color:${C.silver};font-size:34px}
  </style></head><body>
    <div class="cov">
      <div class="art">${book.coverArt}</div>
      <div class="plate"><p class="k">The Little Rewrites</p><h1>${esc(book.title)}</h1></div>
      <div class="band"><p class="s">${esc(book.subtitle)}</p><p class="by">MK Parrish</p></div>
    </div>
  </body></html>`;
}

// ── render ───────────────────────────────────────────────────────────────────
const filter = process.argv[2];
const list = filter ? BOOKS.filter((b) => b.slug.includes(filter)) : BOOKS;

fs.mkdirSync(EBOOKS, { recursive: true });
fs.mkdirSync(COVERS, { recursive: true });

const browser = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors'],
  acceptInsecureCerts: true, headless: true,
});

console.log('\nBuilding picture books...');
for (const book of list) {
  const page = await browser.newPage();

  // interior PDF (square)
  await page.setContent(interiorHtml(book), { waitUntil: 'load', timeout: 60000 });
  try { await page.evaluate(() => document.fonts.ready); } catch {}
  await new Promise((r) => setTimeout(r, 250));
  const pdfPath = path.join(EBOOKS, `${book.slug}.pdf`);
  await page.pdf({ path: pdfPath, width: '8in', height: '8in', printBackground: true, pageRanges: '' });

  // portrait cover JPG (5:8)
  await page.setViewport({ width: 1600, height: 2560, deviceScaleFactor: 1 });
  await page.setContent(coverHtml(book), { waitUntil: 'load', timeout: 60000 });
  try { await page.evaluate(() => document.fonts.ready); } catch {}
  await new Promise((r) => setTimeout(r, 250));
  const jpgPath = path.join(COVERS, `${book.slug}-cover.jpg`);
  await page.screenshot({ path: jpgPath, type: 'jpeg', quality: 92, clip: { x: 0, y: 0, width: 1600, height: 2560 } });

  if (process.env.PNG) {
    await page.setViewport({ width: 900, height: 900, deviceScaleFactor: 1 });
    await page.setContent(interiorHtml(book), { waitUntil: 'load', timeout: 60000 });
    try { await page.evaluate(() => document.fonts.ready); } catch {}
    await new Promise((r) => setTimeout(r, 250));
    const handles = await page.$$('.pg');
    for (const idx of String(process.env.PNG).split(',').map(Number)) {
      const h = handles[idx];
      if (h) { await h.screenshot({ path: `/tmp/claude-0/-home-user-mkparrish-site/01810c12-d5be-56d0-a628-eab5487e6178/scratchpad/gray-${idx}.png`, type: 'png' }); }
    }
  }

  const kb = Math.round(fs.statSync(pdfPath).size / 1024);
  console.log(`  ✓  ${book.slug}: ${book.spreads.length} spreads + note → ebooks/${book.slug}.pdf (${kb}kb) + cover`);
  await page.close();
}

await browser.close();
console.log('\nDone.\n');
