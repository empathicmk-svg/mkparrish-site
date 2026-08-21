#!/usr/bin/env node
/**
 * Build MK Parrish's Mercedes-Benz of Smithtown email signature.
 *
 * Usage:
 *   npm run email:signature
 *
 * Output:
 *   public/email/mb-star.svg              source mark
 *   public/email/mb-star.png              the mark the signature hotlinks (2x, transparent)
 *   marketing/email-signature/mk-parrish-signature-platinum.html
 *   marketing/email-signature/mk-parrish-signature-gold.html
 *   marketing/email-signature/preview.html
 *
 * Everything is table-based with inline styles: Outlook's Word engine drops
 * <style> blocks, flexbox, background-image and border-radius, and Gmail strips
 * <style> out of a pasted signature entirely.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const PUBLIC_EMAIL = path.join(ROOT, 'public', 'email');
const OUT = path.join(ROOT, 'marketing', 'email-signature');
fs.mkdirSync(PUBLIC_EMAIL, { recursive: true });
fs.mkdirSync(OUT, { recursive: true });

/* ------------------------------------------------------------------ *
 * The facts. Every link here came from the existing signature.
 * ------------------------------------------------------------------ */
const SITE = 'https://mkparrish.com';

const DATA = {
  name: 'Mary Kate Parrish',
  title: 'Sales & Leasing Consultant',
  store: 'Mercedes-Benz of Smithtown',
  personalUrl: SITE,
  phone: { label: 'Showroom', display: '631.265.2204', href: 'tel:+16312652204' },
  mobile: { label: 'Mobile', display: '347.853.4238', href: 'tel:+13478534238' },
  email: 'mparrish@mbofsmithtown.com',
  address: ['630 Middle Country Road', 'St James, NY 11780'],
  website: { display: 'mbofsmithtown.com', href: 'https://www.mbofsmithtown.com' },
  // The original link carried a placeholder Place ID (0x89e...5e5e) and
  // coordinates out in the Atlantic, so it resolved to open water rather than
  // to the store. A Maps search by name + address always lands on the real
  // listing. Swap in the store's own g.page/r/<id>/review link when you have it.
  review: {
    label: 'Share Your Experience',
    href: 'https://www.google.com/maps/search/?api=1&query=Mercedes-Benz+of+Smithtown+630+Middle+Country+Road+St+James+NY+11780',
  },
};

/* ------------------------------------------------------------------ *
 * Type + colour. Mercedes-Benz sets its own brand in Corporate A/S —
 * no email client can load it, so the stack falls to the closest widely
 * installed neutral grotesques. Wide tracking on near-black is what makes
 * it read as Mercedes rather than the serif it was.
 * ------------------------------------------------------------------ */
const SANS = "'Helvetica Neue', Helvetica, Arial, 'Segoe UI', sans-serif";

const THEMES = {
  platinum: {
    star: ['#FFFFFF', '#C6CCD0'],
    logo: `${SITE}/email/mb-star.png`,
    accent: '#E4E8EA',   // links + numbers
    button: '#DDE1E3',
    name: '#FFFFFF',
  },
  gold: {
    star: ['#F0DFA8', '#B8942C'],
    logo: `${SITE}/email/mb-star-gold.png`,
    accent: '#D4AF37',
    button: '#D4AF37',
    name: '#F3E7C3',
  },
};

const BASE = {
  bg: '#0B0B0C',
  edge: '#26292B',      // 1px frame around the card
  rule: '#33383B',      // dividers
  label: '#7C8286',     // "TELEPHONE", "MOBILE"
  body: '#A7ACAF',      // address
  ink: '#0B0B0C',       // text on the button
};

/* ------------------------------------------------------------------ *
 * The three-pointed star, drawn rather than hotlinked. The original
 * pulled a 220px thumbnail off Wikimedia — an origin that rate-limits
 * hotlinks, can rename a file out from under you, and is not a licence
 * to use the mark. Self-hosting on mkparrish.com fixes the delivery;
 * replacing this file with the dealer's official asset fixes the rest.
 * ------------------------------------------------------------------ */
function starSvg([light, dark]) {
  const c = 100;
  const ring = 84;          // ring centreline radius
  const ringWeight = 11;
  const tip = ring - ringWeight / 2 - 1;
  const hub = 9;            // half-width of a spoke where it meets the centre

  const spokes = [90, 210, 330].map((deg) => {
    const rad = (deg * Math.PI) / 180;
    // SVG y grows downward, so negate the sine to point the first spoke up.
    const tx = c + tip * Math.cos(rad);
    const ty = c - tip * Math.sin(rad);
    const px = hub * Math.cos(rad + Math.PI / 2);
    const py = -hub * Math.sin(rad + Math.PI / 2);
    return `M ${c + px} ${c + py} L ${tx} ${ty} L ${c - px} ${c - py} Z`;
  }).join(' ');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200" role="img" aria-label="Mercedes-Benz">
  <defs>
    <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${light}"/>
      <stop offset="1" stop-color="${dark}"/>
    </linearGradient>
  </defs>
  <circle cx="${c}" cy="${c}" r="${ring}" fill="none" stroke="url(#chrome)" stroke-width="${ringWeight}"/>
  <path d="${spokes}" fill="url(#chrome)"/>
</svg>`;
}

/* ------------------------------------------------------------------ *
 * Signature markup
 * ------------------------------------------------------------------ */
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// Attribute values need the same treatment: a bare & in a query string is an
// unterminated entity, and some clients will eat the characters after it.
const attr = (s) => esc(s).replace(/"/g, '&quot;');

/** A full-bleed hairline. Empty table cells collapse in Outlook without the
 *  zero font-size/line-height pair and a hard space. */
function rule(color = BASE.rule, top = 0, bottom = 0) {
  return `        <tr>
          <td style="padding:${top}px 0 ${bottom}px 0;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;">
              <tr><td height="1" bgcolor="${color}" style="height:1px;line-height:1px;font-size:0;mso-line-height-rule:exactly;">&nbsp;</td></tr>
            </table>
          </td>
        </tr>`;
}

function contactRow({ label, display, href }, theme, { last = false, caps = (v) => v } = {}) {
  const pad = last ? 0 : 9;
  return `              <tr>
                <td align="left" style="font-family:${SANS};font-size:10px;line-height:14px;mso-line-height-rule:exactly;letter-spacing:1.6px;color:${BASE.label};text-transform:uppercase;padding:0 12px ${pad}px 0;white-space:nowrap;">${esc(caps(label))}</td>
                <td align="right" style="font-family:${SANS};font-size:12px;line-height:14px;mso-line-height-rule:exactly;letter-spacing:0.6px;padding:0 0 ${pad}px 0;">
                  <a href="${attr(href)}" style="color:${theme.accent};text-decoration:none;font-weight:600;">${esc(display)}</a>
                </td>
              </tr>`;
}

/**
 * Build the signature.
 *
 * `crm` targets a dealer CRM's signature editor (Momentum, VinSolutions and
 * friends all wrap TinyMCE or CKEditor) rather than Gmail/Outlook directly.
 * Those editors sanitise on save, which changes what is safe to ship:
 *   - HTML comments are stripped, and the Outlook VML button lives inside one,
 *     so the CTA becomes a padded table cell instead — Word honours padding on
 *     a <td>, so it survives Outlook without any conditional markup.
 *   - text-transform is often dropped, so the caps are typed as caps.
 *   - the outer table takes a width attribute as well as the CSS, since some
 *     editors rewrite the style attribute and keep the attribute.
 */
function signature(theme, { crm = false } = {}) {
  const caps = (v) => (crm ? String(v).toUpperCase() : v);
  const note = crm ? '' : `<!-- MK Parrish · Mercedes-Benz of Smithtown · built by scripts/build-email-signature.mjs — edit that, not this -->
`;
  const msoOpen = crm ? '' : `<!--[if mso]>
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr><td>
<![endif]-->
`;
  const msoClose = crm ? '' : `
<!--[if mso]>
</td></tr></table>
<![endif]-->`;
  const comment = (text) => (crm ? '' : `
        <!-- ${text} -->`);

  const button = crm
    ? `            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;">
              <tr>
                <td align="center" bgcolor="${theme.button}" style="background-color:${theme.button};padding:13px 28px;">
                  <a href="${attr(DATA.review.href)}" style="font-family:${SANS};font-size:11px;line-height:14px;letter-spacing:2px;font-weight:700;color:${BASE.ink};text-decoration:none;display:inline-block;">${esc(DATA.review.label.toUpperCase())}</a>
                </td>
              </tr>
            </table>`
    : `            <!--[if mso]>
            <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${attr(DATA.review.href)}" style="height:40px;v-text-anchor:middle;width:232px;" arcsize="0%" stroke="f" fillcolor="${theme.button}">
              <w:anchorlock/>
              <center style="color:${BASE.ink};font-family:Arial,sans-serif;font-size:11px;font-weight:bold;letter-spacing:2px;">${esc(DATA.review.label.toUpperCase())}</center>
            </v:roundrect>
            <![endif]-->
            <!--[if !mso]><!-- -->
            <a href="${attr(DATA.review.href)}" style="display:inline-block;font-family:${SANS};font-size:11px;line-height:14px;letter-spacing:2px;font-weight:700;color:${BASE.ink};background-color:${theme.button};padding:13px 28px;text-decoration:none;text-transform:uppercase;">${esc(DATA.review.label)}</a>
            <!--<![endif]-->`;

  return `${note}${msoOpen}<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:100%;max-width:600px;border-collapse:collapse;background-color:${BASE.bg};border:1px solid ${BASE.edge};">
  <tr>
    <td align="center" bgcolor="${BASE.bg}" style="padding:36px 40px 34px 40px;background-color:${BASE.bg};">

      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;">
${comment('Marque')}
        <tr>
          <td align="center" style="padding:0 0 14px 0;">
            <img src="${attr(theme.logo)}" width="46" height="46" alt="Mercedes-Benz" style="display:block;width:46px;height:46px;border:0;outline:none;text-decoration:none;">
          </td>
        </tr>
        <tr>
          <td align="center" style="font-family:${SANS};font-size:11px;line-height:16px;mso-line-height-rule:exactly;letter-spacing:4px;color:${BASE.body};text-transform:uppercase;padding:0 0 22px 0;">${esc(caps(DATA.store))}</td>
        </tr>
${comment('Short centred rule: the original used a CSS gradient, which Outlook and Gmail both drop, leaving a gap where the flourish should be.')}
        <tr>
          <td align="center" style="padding:0 0 22px 0;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="56" style="width:56px;border-collapse:collapse;">
              <tr><td height="1" bgcolor="${theme.accent}" style="height:1px;line-height:1px;font-size:0;mso-line-height-rule:exactly;">&nbsp;</td></tr>
            </table>
          </td>
        </tr>
${comment('Name')}
        <tr>
          <td align="center" style="font-family:${SANS};font-size:21px;line-height:26px;mso-line-height-rule:exactly;letter-spacing:5px;padding:0 0 9px 0;">
            <a href="${attr(DATA.personalUrl)}" style="color:${theme.name};text-decoration:none;font-weight:400;text-transform:uppercase;">${esc(caps(DATA.name))}</a>
          </td>
        </tr>
        <tr>
          <td align="center" style="font-family:${SANS};font-size:11px;line-height:16px;mso-line-height-rule:exactly;letter-spacing:2.4px;color:${BASE.label};text-transform:uppercase;padding:0 0 24px 0;">${esc(caps(DATA.title))}</td>
        </tr>

${rule(BASE.rule, 0, 20)}
${comment('Reach')}
        <tr>
          <td>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;">
${contactRow(DATA.phone, theme, { caps })}
${contactRow(DATA.mobile, theme, { caps })}
${contactRow({ label: 'Email', display: DATA.email, href: `mailto:${DATA.email}` }, theme, { caps, last: true })}
            </table>
          </td>
        </tr>

${rule(BASE.rule, 20, 20)}
${comment('Where')}
        <tr>
          <td align="center" style="font-family:${SANS};font-size:11px;line-height:19px;mso-line-height-rule:exactly;letter-spacing:1.4px;color:${BASE.body};text-transform:uppercase;padding:0 0 12px 0;">${DATA.address.map((line) => esc(caps(line))).join('<br>')}</td>
        </tr>
        <tr>
          <td align="center" style="font-family:${SANS};font-size:11px;line-height:16px;mso-line-height-rule:exactly;letter-spacing:1.8px;padding:0 0 26px 0;">
            <a href="${attr(DATA.website.href)}" style="color:${theme.accent};text-decoration:none;font-weight:600;text-transform:uppercase;">${esc(caps(DATA.website.display))}</a>
          </td>
        </tr>
${comment("Review CTA. Outlook ignores padding on an inline-block <a>, so it gets a VML button and every other client gets the real one.")}
        <tr>
          <td align="center">
${button}
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>${msoClose}`;
}

function page(title, body, bg = '#FFFFFF') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only">
<title>${esc(title)}</title>
</head>
<body style="margin:0;padding:24px;background-color:${bg};">
${body}
</body>
</html>`;
}

/* ------------------------------------------------------------------ *
 * Write
 * ------------------------------------------------------------------ */
const svg = starSvg(THEMES.platinum.star);
fs.writeFileSync(path.join(PUBLIC_EMAIL, 'mb-star.svg'), `${svg}\n`);
fs.writeFileSync(path.join(PUBLIC_EMAIL, 'mb-star-gold.svg'), `${starSvg(THEMES.gold.star)}\n`);

// Chromium refuses to run sandboxed as root, which is how CI containers run.
const sandboxArgs = process.getuid?.() === 0 ? ['--no-sandbox'] : [];
const browser = await puppeteer.launch({ headless: true, args: ['--disable-lcd-text', ...sandboxArgs] });
try {
  for (const [name, theme] of Object.entries(THEMES)) {
    const file = name === 'platinum' ? 'mb-star.png' : 'mb-star-gold.png';
    const p = await browser.newPage();
    // 3x so the 46px mark stays sharp on retina and on Outlook's own scaling.
    await p.setViewport({ width: 200, height: 200, deviceScaleFactor: 3 });
    await p.setContent(`<body style="margin:0">${starSvg(theme.star)}</body>`, { waitUntil: 'load' });
    await p.screenshot({ path: path.join(PUBLIC_EMAIL, file), omitBackground: true });
    await p.close();
    console.log(`✓ public/email/${file}`);
  }
} finally {
  await browser.close();
}

const built = {};
for (const [name, theme] of Object.entries(THEMES)) {
  const html = signature(theme);
  built[name] = html;
  const file = `mk-parrish-signature-${name}.html`;
  fs.writeFileSync(path.join(OUT, file), `${page(`${DATA.name} — ${DATA.store}`, html)}\n`);
  console.log(`✓ marketing/email-signature/${file}`);
}

// Momentum CRM (and the other dealer CRMs) paste into a WYSIWYG editor, not
// into Gmail's signature box: it wants a bare fragment with no doctype, and it
// sanitises comments away on save. Silver only — that is the one in use.
const crmFragment = signature(THEMES.platinum, { crm: true });
fs.writeFileSync(path.join(OUT, 'mk-parrish-signature-crm.html'), `${crmFragment}\n`);
console.log('✓ marketing/email-signature/mk-parrish-signature-crm.html');

const localised = (html) => html.replace(new RegExp(`${SITE}/email/`, 'g'), '../../public/email/');

const previewBody = Object.entries(built).map(([name, html]) => `<div style="margin:0 auto 48px auto;max-width:600px;">
  <p style="font-family:${SANS};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#6B7073;margin:0 0 12px 0;">${name}</p>
  ${localised(html)}
</div>`).join('\n');

fs.writeFileSync(
  path.join(OUT, 'preview.html'),
  `${page('Signature preview', `<p style="font-family:${SANS};font-size:12px;line-height:20px;color:#6B7073;max-width:600px;margin:0 auto 32px auto;">Pick one, open that file on its own, select all, copy, paste into Gmail or Outlook. The mark below is read off disk; in the real files it loads from mkparrish.com/email/, which needs this branch deployed.</p>${previewBody}`, '#F4F5F6')}\n`,
);
console.log('✓ marketing/email-signature/preview.html');
