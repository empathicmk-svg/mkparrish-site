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

const BOOKS = [
  {
    slug: 'the-girl-who-loved-gray',
    title: 'The Girl Who Loved Gray',
    subtitle: 'A picture book about all the colors between yes and no.',
    spreads: grayLoveSpreads,
    coverArt: grayLoveSpreads[0].art,
  },
];

// ── HTML assembly ────────────────────────────────────────────────────────────
const esc = (s) => s.replace(/&(?!\w+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const story = (t) => esc(t).replace(/&lt;em&gt;/g, '<em>').replace(/&lt;\/em&gt;/g, '</em>');

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

  const grownup = `<section class="pg pg--note">
    <div class="notewrap">
      <p class="kicker">For the grown-up reading along</p>
      <p>We hand children a black-and-white world early: right and wrong, smart and dumb, winner and loser, us and them. It is faster to think that way, and lonelier, and mostly untrue. This book is a small argument for the gray — for nuance, for "it depends," for holding two true things at once, for the patience to stay in a question a little longer.</p>
      <p>When you finish, look for a gray together. A pigeon. A rain cloud. The soft middle of an argument that isn't all one person's fault. Then say the sentence that undoes a lifetime of hard lines: <em>"Two things can be true at the same time."</em></p>
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
