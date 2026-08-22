#!/usr/bin/env node
/**
 * Build MK Parrish's Mercedes-Benz of Smithtown email signature.
 *
 * Usage:
 *   npm run email:signature
 *
 * Output:
 *   public/email/mb-star.{svg,png}        the three-pointed star
 *   public/email/mk-heart.{svg,png}       MK's heart, from the site cursor
 *   public/email/review-qr.png            scan-to-review code for the Maps link
 *   marketing/email-signature/mk-parrish-signature.html      Gmail / Outlook
 *   marketing/email-signature/mk-parrish-signature-crm.html  Momentum CRM
 *   marketing/email-signature/mk-parrish-signature.pdf      the handoff sheet
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
import QRCode from 'qrcode';

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
const QR_FILE = 'review-qr.png';

const DATA = {
  name: 'Mary Kate Parrish',
  title: 'Sales & Leasing Consultant',
  store: 'Mercedes-Benz of Smithtown',
  personalUrl: SITE,
  phone: { label: 'Showroom', display: '631.265.2204', href: 'tel:+16312652204' },
  mobile: { label: 'Mobile', display: '347.853.4238', href: 'tel:+13478534238' },
  email: 'marykateparrish.parrish@mbofsmithtown.com',
  address: ['630 Middle Country Road', 'St James, NY 11780'],
  website: { display: 'mbofsmithtown.com', href: 'https://www.mbofsmithtown.com' },
  // MK's own share link out of the Maps app. The first draft's link carried a
  // placeholder Place ID (0x89e...5e5e) at coordinates in open water south of
  // the Hamptons, so it never resolved to the store.
  review: {
    label: 'Share Your Experience',
    href: 'https://maps.app.goo.gl/gcCgAvQGMnthZ3co8?g_st=ic',
  },
};

/* ------------------------------------------------------------------ *
 * Type.
 *
 * mercedes-benz.com and mbusa.com set headlines in MB Corpo A Title — a
 * SERIF — over body copy in MB Corpo S Text, a grotesque. Both are licensed
 * through the Mercedes-Benz Font Service, so neither can be served from this
 * repo, and that would not help anyway: Gmail, Outlook and Yahoo all drop
 * @font-face, so no email signature anywhere loads a webfont.
 *
 * Naming the real families first still pays — any machine with the dealer
 * brand kit installed, likely including the showroom's own, renders true MB
 * Corpo. Everything else falls through: Georgia for the serif headline, since
 * it is the one serif installed on every Mac and Windows machine, then Proxima
 * Nova for the text — a humanist geometric, far closer to MB Corpo S than
 * Helvetica is, and installed on plenty of design machines — and finally
 * Helvetica/Arial.
 * ------------------------------------------------------------------ */
const TITLE_FONT = "'MB Corpo A Title', 'MB Corpo A Title Web', 'MB Corpo A Title Cond', 'Corporate A', Georgia, 'Times New Roman', serif";
const TEXT_FONT = "'MB Corpo S Text', 'MB Corpo S Text Web', 'MBCorpo Text', 'Corporate S', 'Proxima Nova', 'Helvetica Neue', Helvetica, Arial, sans-serif";

// Word reads only the first family in a stack and drops to Times New Roman
// when it is missing, so naming MB Corpo first would wreck the signature on
// every Outlook desktop without the brand kit. These Word-only properties pin
// it to a matching installed face; every other client ignores them.
const mso = (family) => `mso-ascii-font-family:${family};mso-hansi-font-family:${family};mso-bidi-font-family:${family};`;
const MSO_FONT = mso('Arial');
const MSO_TITLE = mso('Georgia');

/* ------------------------------------------------------------------ *
 * Colour. Silver, per the marque — the gold variant was dropped once MK
 * picked this one; it is in the history if it is ever wanted back.
 * ------------------------------------------------------------------ */
const THEME = {
  star: ['#FFFFFF', '#C6CCD0'],
  logo: `${SITE}/email/mb-star.png`,
  heart: `${SITE}/email/mk-heart.png`,
  qr: `${SITE}/email/${QR_FILE}`,
  accent: '#E4E8EA',   // links + numbers
  button: '#DDE1E3',
  name: '#FFFFFF',
};

// mkparrish.com's own palette, for the heart.
const BRAND = { petal: '#F2AFC6' };

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
 * MK's heart, lifted from public/cursor-heart.svg — the cursor on
 * mkparrish.com. That one is petal pink outlined in near-black, which
 * disappears against this card, so the email copy keeps the fill and drops
 * the outline.
 * ------------------------------------------------------------------ */
const HEART_PATH = 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';

function heartSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" role="img" aria-label="MK Parrish">
  <path d="${HEART_PATH}" fill="${BRAND.petal}"/>
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

/** One 44px flourish rule, vertically centred beside the heart. */
function hairline(theme) {
  return `<td width="44" valign="middle" style="width:44px;padding:0;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="44" style="width:44px;border-collapse:collapse;">
                    <tr><td height="1" bgcolor="${theme.accent}" style="height:1px;line-height:1px;font-size:0;mso-line-height-rule:exactly;">&nbsp;</td></tr>
                  </table>
                </td>`;
}

function contactRow({ label, display, href }, theme, { last = false, caps = (v) => v } = {}) {
  const pad = last ? 0 : 9;
  const size = display.length > 24 ? 11 : 12;
  return `              <tr>
                <td align="left" style="font-family:${TEXT_FONT};${MSO_FONT}font-size:10px;line-height:14px;mso-line-height-rule:exactly;letter-spacing:1.6px;color:${BASE.label};text-transform:uppercase;padding:0 12px ${pad}px 0;white-space:nowrap;">${esc(caps(label))}</td>
                <td align="right" style="font-family:${TEXT_FONT};${MSO_FONT}font-size:${size}px;line-height:14px;mso-line-height-rule:exactly;letter-spacing:0.6px;padding:0 0 ${pad}px 0;">
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
                  <a href="${attr(DATA.review.href)}" style="font-family:${TEXT_FONT};${MSO_FONT}font-size:11px;line-height:14px;letter-spacing:2px;font-weight:700;color:${BASE.ink};text-decoration:none;display:inline-block;">${esc(DATA.review.label.toUpperCase())}</a>
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
            <a href="${attr(DATA.review.href)}" style="display:inline-block;font-family:${TEXT_FONT};${MSO_FONT}font-size:11px;line-height:14px;letter-spacing:2px;font-weight:700;color:${BASE.ink};background-color:${theme.button};padding:13px 28px;text-decoration:none;text-transform:uppercase;">${esc(DATA.review.label)}</a>
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
          <td align="center" style="font-family:${TEXT_FONT};${MSO_FONT}font-size:11px;line-height:16px;mso-line-height-rule:exactly;letter-spacing:4px;color:${BASE.body};text-transform:uppercase;padding:0 0 22px 0;">${esc(caps(DATA.store))}</td>
        </tr>
${comment('Short centred rule: the original used a CSS gradient, which Outlook and Gmail both drop, leaving a gap where the flourish should be.')}
        <tr>
          <td align="center" style="padding:0 0 20px 0;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;">
              <tr>
                ${hairline(theme)}
                <td style="padding:0 12px;line-height:0;font-size:0;">
                  <img src="${attr(theme.heart)}" width="15" height="15" alt="" style="display:block;width:15px;height:15px;border:0;outline:none;">
                </td>
                ${hairline(theme)}
              </tr>
            </table>
          </td>
        </tr>
${comment('Name')}
        <tr>
          <td align="center" style="font-family:${TITLE_FONT};${MSO_TITLE}font-size:30px;line-height:36px;mso-line-height-rule:exactly;letter-spacing:0.4px;padding:0 0 10px 0;">
            <a href="${attr(DATA.personalUrl)}" style="color:${theme.name};text-decoration:none;font-weight:700;">${esc(DATA.name)}</a>
          </td>
        </tr>
        <tr>
          <td align="center" style="font-family:${TEXT_FONT};${MSO_FONT}font-size:11px;line-height:16px;mso-line-height-rule:exactly;letter-spacing:2.4px;color:${BASE.label};text-transform:uppercase;padding:0 0 24px 0;">${esc(caps(DATA.title))}</td>
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
          <td align="center" style="font-family:${TEXT_FONT};${MSO_FONT}font-size:11px;line-height:19px;mso-line-height-rule:exactly;letter-spacing:1.4px;color:${BASE.body};text-transform:uppercase;padding:0 0 12px 0;">${DATA.address.map((line) => esc(caps(line))).join('<br>')}</td>
        </tr>
        <tr>
          <td align="center" style="font-family:${TEXT_FONT};${MSO_FONT}font-size:11px;line-height:16px;mso-line-height-rule:exactly;letter-spacing:1.8px;padding:0 0 26px 0;">
            <a href="${attr(DATA.website.href)}" style="color:${theme.accent};text-decoration:none;font-weight:600;text-transform:uppercase;">${esc(caps(DATA.website.display))}</a>
          </td>
        </tr>
${comment("Review CTA. Outlook ignores padding on an inline-block <a>, so it gets a VML button and every other client gets the real one.")}
        <tr>
          <td align="center">
${button}
          </td>
        </tr>
${comment('Scan-to-review QR. The tile is white because the code has to be dark-on-light to scan.')}
        <tr>
          <td align="center" style="padding:22px 0 0 0;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="border-collapse:collapse;">
              <tr>
                <td align="center" bgcolor="#FFFFFF" style="background-color:#FFFFFF;padding:7px;line-height:0;font-size:0;">
                  <img src="${attr(theme.qr)}" width="78" height="78" alt="Scan to review Mercedes-Benz of Smithtown on Google" style="display:block;width:78px;height:78px;border:0;outline:none;">
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="font-family:${TEXT_FONT};${MSO_FONT}font-size:9px;line-height:14px;mso-line-height-rule:exactly;letter-spacing:1.8px;color:${BASE.label};text-transform:uppercase;padding:9px 0 0 0;">${esc(caps('Scan to review on Google'))}</td>
        </tr>

      </table>

    </td>
  </tr>
</table>${msoClose}`;
}

/**
 * A one-page handoff sheet: the signature as it renders, plus what to do with
 * it. Printed from the same markup the clients get, so the sheet cannot drift
 * from the files.
 */
function printSheet(html) {
  const step = (n, text) => `<tr>
      <td valign="top" style="font-family:${TEXT_FONT};font-size:10px;line-height:17px;color:#9AA0A4;padding:0 10px 6px 0;white-space:nowrap;">${n}</td>
      <td valign="top" style="font-family:${TEXT_FONT};font-size:11px;line-height:17px;color:#2A2D2F;padding:0 0 6px 0;">${text}</td>
    </tr>`;

  return `<div style="max-width:600px;margin:0 auto;">
  <p style="font-family:${TITLE_FONT};font-size:22px;line-height:28px;color:#111;margin:0 0 4px 0;">Email signature</p>
  <p style="font-family:${TEXT_FONT};font-size:11px;line-height:17px;letter-spacing:1.4px;text-transform:uppercase;color:#8A9095;margin:0 0 16px 0;">${esc(DATA.name)} · ${esc(DATA.store)}</p>
  ${html}
  <p style="font-family:${TEXT_FONT};font-size:11px;line-height:17px;letter-spacing:1.6px;text-transform:uppercase;color:#8A9095;margin:16px 0 8px 0;">Installing it</p>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">
    ${step('01', 'Gmail, Outlook or Apple Mail: open <b>mk-parrish-signature.html</b>, select all, copy, paste into the signature box.')}
    ${step('02', 'Momentum CRM: paste <b>mk-parrish-signature-crm.html</b> into the editor&rsquo;s source view (the <b>&lt; &gt;</b> button), not the visual editor.')}
    ${step('03', 'Save, reopen the signature to confirm it survived, then send one test to yourself and open it on a phone as well as a desktop.')}
    ${step('04', 'The star, heart and QR load from mkparrish.com/email/ and appear once that deploys. In the CRM you can upload all three through the editor&rsquo;s own image button instead.')}
  </table>
  <p style="font-family:${TEXT_FONT};font-size:10px;line-height:16px;color:#9AA0A4;margin:10px 0 0 0;">Generated by <b>npm run email:signature</b> — edit scripts/build-email-signature.mjs, never the HTML.</p>
</div>`;
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
fs.writeFileSync(path.join(PUBLIC_EMAIL, 'mb-star.svg'), `${starSvg(THEME.star)}\n`);
fs.writeFileSync(path.join(PUBLIC_EMAIL, 'mk-heart.svg'), `${heartSvg()}\n`);

// Dark modules on white: inverted codes defeat a good share of scanners, which
// is why the card gives the QR its own light tile rather than dropping it onto
// the black.
await QRCode.toFile(path.join(PUBLIC_EMAIL, QR_FILE), DATA.review.href, {
  type: 'png',
  width: 480,
  margin: 1,
  errorCorrectionLevel: 'M',
  color: { dark: '#0B0B0CFF', light: '#FFFFFFFF' },
});
console.log(`✓ public/email/${QR_FILE}`);

// Chromium refuses to run sandboxed as root, which is how CI containers run.
const sandboxArgs = process.getuid?.() === 0 ? ['--no-sandbox'] : [];
const browser = await puppeteer.launch({ headless: true, args: ['--disable-lcd-text', ...sandboxArgs] });
try {
  const p = await browser.newPage();
  // 3x so the 46px mark stays sharp on retina and on Outlook's own scaling.
  await p.setViewport({ width: 200, height: 200, deviceScaleFactor: 3 });
  await p.setContent(`<body style="margin:0">${starSvg(THEME.star)}</body>`, { waitUntil: 'load' });
  await p.screenshot({ path: path.join(PUBLIC_EMAIL, 'mb-star.png'), omitBackground: true });
  console.log('✓ public/email/mb-star.png');

  await p.setViewport({ width: 24, height: 24, deviceScaleFactor: 8 });
  await p.setContent(`<body style="margin:0">${heartSvg()}</body>`, { waitUntil: 'load' });
  await p.screenshot({ path: path.join(PUBLIC_EMAIL, 'mk-heart.png'), omitBackground: true });
  console.log('✓ public/email/mk-heart.png');
} finally {
  await browser.close();
}

// Gmail, Outlook, Apple Mail: a full document to open, select all and copy.
const emailHtml = signature(THEME);
fs.writeFileSync(
  path.join(OUT, 'mk-parrish-signature.html'),
  `${page(`${DATA.name} — ${DATA.store}`, emailHtml)}\n`,
);
console.log('✓ marketing/email-signature/mk-parrish-signature.html');

// Momentum CRM (and the other dealer CRMs) paste into a WYSIWYG editor, not
// into Gmail's signature box: it wants a bare fragment with no doctype, and it
// sanitises comments away on save.
fs.writeFileSync(
  path.join(OUT, 'mk-parrish-signature-crm.html'),
  `${signature(THEME, { crm: true })}\n`,
);
console.log('✓ marketing/email-signature/mk-parrish-signature-crm.html');

// The PDF and the preview both read the marks off disk, so they render before
// the branch ships.
const dataUri = (file) =>
  `data:image/png;base64,${fs.readFileSync(path.join(PUBLIC_EMAIL, file)).toString('base64')}`;

// setContent leaves the document on about:blank, where file:// images are
// blocked, so the marks go in as data URIs. Only the PDF does this — email
// clients drop data URIs, which is why the real signature hotlinks them.
const localised = (html) =>
  html
    .replace(`${SITE}/email/mb-star.png`, dataUri('mb-star.png'))
    .replace(`${SITE}/email/mk-heart.png`, dataUri('mk-heart.png'))
    .replace(`${SITE}/email/${QR_FILE}`, dataUri(QR_FILE));

{
  const b = await puppeteer.launch({ headless: true, args: ['--disable-lcd-text', '--allow-file-access-from-files', ...sandboxArgs] });
  try {
    const p = await b.newPage();
    await p.setContent(
      page('Email signature', printSheet(localised(emailHtml))).replace(
        'style="margin:0;padding:24px;background-color:#FFFFFF;"',
        'style="margin:0;padding:0;background-color:#FFFFFF;-webkit-print-color-adjust:exact;print-color-adjust:exact;"',
      ),
      { waitUntil: 'networkidle0' },
    );
    await p.pdf({
      path: path.join(OUT, 'mk-parrish-signature.pdf'),
      format: 'Letter',
      printBackground: true,
      margin: { top: '0.45in', bottom: '0.45in', left: '0.9in', right: '0.9in' },
    });
    console.log('✓ marketing/email-signature/mk-parrish-signature.pdf');
  } finally {
    await b.close();
  }
}


fs.writeFileSync(
  path.join(OUT, 'preview.html'),
  `${page('Signature preview', `<p style="font-family:${TEXT_FONT};${MSO_FONT}font-size:12px;line-height:20px;color:#6B7073;max-width:600px;margin:0 auto 32px auto;">Open mk-parrish-signature.html on its own, select all, copy, paste into Gmail or Outlook. Momentum takes mk-parrish-signature-crm.html instead, pasted into its source view. The mark below is read off disk; in the real files it loads from mkparrish.com/email/, which needs this branch deployed.</p><div style="margin:0 auto;max-width:600px;">${localised(emailHtml)}</div>`, '#F4F5F6')}\n`,
);
console.log('✓ marketing/email-signature/preview.html');
