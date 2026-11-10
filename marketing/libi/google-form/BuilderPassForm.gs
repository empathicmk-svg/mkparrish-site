/**
 * Competition Builder Pass · LIBI lead form (Google Forms + Apps Script)
 *
 * Run ONCE from Mary Kate's WORK Google account (mparrish@mbofsmithtown.com):
 *   1. Go to https://script.google.com → New project. Delete the sample code.
 *   2. Paste this whole file. Click Save.
 *   3. Choose the function `setup` in the toolbar and click Run. Approve the permissions
 *      (Forms, Sheets, send email as you, run triggers).
 *   4. The log (and an email to you) lists the form link and one link per QR channel.
 *
 * What it builds, all owned by the work account:
 *   - the Google Form (consent and privacy language included),
 *   - a Google Sheet that stores every response,
 *   - an on-submit trigger that emails MK each lead (scored HOT / WARM / NURTURE) and
 *     emails the guest their Builder Pass with a personal share link.
 *
 * Data minimisation: the form never asks for a driver's license number, date of birth,
 * Social Security number, income or credit information. Do not add those questions.
 */

const CONFIG = {
  ownerName: 'Mary Kate Parrish',
  ownerTitle: 'Sales & Leasing Consultant',
  store: 'Mercedes-Benz of Smithtown',
  group: 'Competition Automotive Group',
  address: '630 Middle Country Road, St. James, NY 11780',
  cellDisplay: '347.853.4238',
  cellTel: '+13478534238',
  notifyEmail: 'mparrish@mbofsmithtown.com',
  validThrough: 'December 31, 2026',
  formTitle: 'Competition Builder Pass · LIBI Members',
  sources: ['ipad', 'phone', 'text', 'social', 'followup'],
  stores: [
    'Mercedes-Benz of Smithtown',
    'Mercedes-Benz of Huntington',
    'Sprinter work vans',
    'Mercedes-AMG',
    'Competition BMW of Smithtown',
    'Genesis of Smithtown',
    'Competition Subaru of Smithtown',
  ],
  roles: ['Builder / developer', 'Trade / subcontractor', 'Supplier / manufacturer', 'Attorney, lender or architect', 'LIBI staff or guest', 'Other'],
  timelines: ['Now', '1–3 months', '3–6 months', 'Lease ends in 2027', 'Just looking'],
};

// Question titles. The submit handler finds answers by these exact titles.
const Q = {
  name: 'First and last name',
  phone: 'Mobile number',
  email: 'Email (we send your pass here)',
  company: 'Company',
  role: 'Your role',
  stores: 'Stores you are interested in',
  timeline: 'When might you be in the market?',
  trade: 'Do you have a vehicle to trade or a lease ending?',
  refCode: "Colleague's pass code (optional)",
  terms: 'Terms and privacy',
  textConsent: 'Text messages (optional)',
  source: 'Event code (filled in for you)',
};

const TERMS_CHOICE = 'I have read the privacy notice and certificate terms above.';
const TEXT_CHOICE =
  'Yes, Mary Kate Parrish and Competition Automotive Group may text me at the mobile number above about my Builder Pass, ' +
  'certificate and vehicle offers. Consent is not a condition of any purchase. Message and data rates may apply. ' +
  'Reply STOP to opt out or HELP for help.';

function setup() {
  const form = FormApp.create(CONFIG.formTitle);
  form
    .setDescription(
      `For LIBI members and guests. Your pass gets VIP builder pricing at all five ${CONFIG.group} stores, ` +
        `+$500 on Mercedes-Benz Sprinter vans for NAHB members (current program terms apply), a free fleet equity report, ` +
        `and a VIP Test Drive Certificate: a private, by-appointment drive in the Mercedes you choose. Valid through ${CONFIG.validThrough}.\n\n` +
        `Your pass and certificate arrive by email within a minute.`
    )
    .setConfirmationMessage(
      `Your Builder Pass is on its way to your email. Share the link in that email with a colleague: when they activate a pass with your code, ` +
        `you both go Gold (a complimentary detail during your drive). Questions? Call or text ${CONFIG.ownerName} at ${CONFIG.cellDisplay}.`
    )
    .setCollectEmail(false)
    .setAllowResponseEdits(false)
    .setLimitOneResponsePerUser(false)
    .setShowLinkToRespondAgain(false)
    .setProgressBar(false);
  // Guests are outside the dealership's Google domain, so the form must not require sign-in.
  try { form.setRequireLogin(false); } catch (err) { /* setting only exists on Workspace accounts */ }

  const phonePattern = '^\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$';
  form.addTextItem().setTitle(Q.name).setRequired(true);
  form.addTextItem().setTitle(Q.phone).setHelpText('10 digits, e.g. 631-555-0123').setRequired(true)
    .setValidation(FormApp.createTextValidation().requireTextMatchesPattern(phonePattern).setHelpText('Please enter a 10-digit mobile number.').build());
  form.addTextItem().setTitle(Q.email).setRequired(true)
    .setValidation(FormApp.createTextValidation().requireTextIsEmail().setHelpText('Please enter a valid email address.').build());
  form.addTextItem().setTitle(Q.company);
  form.addMultipleChoiceItem().setTitle(Q.role).setChoiceValues(CONFIG.roles);
  form.addCheckboxItem().setTitle(Q.stores).setChoiceValues(CONFIG.stores);
  form.addMultipleChoiceItem().setTitle(Q.timeline).setChoiceValues(CONFIG.timelines);
  form.addMultipleChoiceItem().setTitle(Q.trade).setChoiceValues(['Yes', 'No']);
  form.addTextItem().setTitle(Q.refCode).setHelpText('If a colleague sent you their pass, enter their code and you both go Gold.');

  form.addSectionHeaderItem().setTitle('Privacy notice and certificate terms').setHelpText(
    `Who collects this: ${CONFIG.ownerName}, ${CONFIG.store}, ${CONFIG.group}, ${CONFIG.address}.\n` +
      `What we use it for: to send your Builder Pass, to arrange your test drive, and to contact you about vehicles and offers from ` +
      `${CONFIG.group} stores. We do not sell your information. It is shared only within ${CONFIG.group} to serve your request.\n` +
      `Your choices: unsubscribe from any email, reply STOP to any text, or ask us to delete your information by emailing ${CONFIG.notifyEmail}.\n` +
      `Certificate terms: one per person; by appointment through ${CONFIG.validThrough}; accompanied drive; valid driver's license required at the dealership; ` +
      `subject to vehicle availability. No purchase necessary. No cash value; not transferable. Pricing reviews and incentives are subject to dealer ` +
      `confirmation, current manufacturer/NAHB program terms, residency and credit approval.`
  );
  form.addCheckboxItem().setTitle(Q.terms).setChoiceValues([TERMS_CHOICE]).setRequired(true);
  form.addCheckboxItem().setTitle(Q.textConsent).setChoiceValues([TEXT_CHOICE]);
  form.addTextItem().setTitle(Q.source).setHelpText('Leave as is.');

  // Responses go to a Sheet in the work Drive.
  const ss = SpreadsheetApp.create('Builder Pass LIBI responses');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  ScriptApp.getProjectTriggers().forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('onLibiSubmit').forForm(form).onFormSubmit().create();

  const props = PropertiesService.getScriptProperties();
  props.setProperty('FORM_ID', form.getId());

  const links = CONFIG.sources.map((src) => [src, prefill_(form, Q.source, src)]);
  const lines = [
    `Form (edit): ${form.getEditUrl()}`,
    `Form (public): ${form.getPublishedUrl()}`,
    `Responses sheet: ${ss.getUrl()}`,
    '',
    'QR links, one per channel:',
    ...links.map(([src, url]) => `  ${src}: ${url}`),
  ];
  Logger.log(lines.join('\n'));
  MailApp.sendEmail({ to: CONFIG.notifyEmail, subject: 'Builder Pass Google Form is live: links for the QR codes', body: lines.join('\n') });
}

/** On every submission: score the lead, email MK, email the guest their pass. */
function onLibiSubmit(e) {
  const form = e.source;
  const a = {};
  e.response.getItemResponses().forEach((r) => { a[r.getItem().getTitle()] = r.getResponse(); });
  const name = String(a[Q.name] || '').trim();
  const phone = String(a[Q.phone] || '').replace(/\D/g, '').slice(-10);
  const email = String(a[Q.email] || '').trim();
  const stores = [].concat(a[Q.stores] || []);
  const ref = String(a[Q.refCode] || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 16);
  const textOk = [].concat(a[Q.textConsent] || []).length > 0;
  const code = shareCode_(name, phone);
  const gold = Boolean(ref && ref !== code);
  const level = gold ? 'Gold' : 'Silver';
  const heat = heat_(a[Q.timeline], a[Q.trade], stores, ref);
  const shareUrl = prefill_(form, Q.refCode, code, Q.source, 'share');
  const first = esc_(name.split(/\s+/)[0] || 'there');

  // Lead email to MK.
  const rows = [
    ['Name', name], ['Mobile', phone], ['Email', email], ['Company', a[Q.company]], ['Role', a[Q.role]],
    ['Stores', stores.join(', ')], ['Timeline', a[Q.timeline]], ['Trade / lease ending', a[Q.trade]],
    ['Pass', `${code} · ${level}`], ['Came from code', ref || '—'], ['QR channel', a[Q.source] || 'direct'],
    ['Text consent', textOk ? 'YES (express written consent on form)' : 'NO: do not text; call or email only'],
  ];
  const textBody = `Hi ${name.split(/\s+/)[0] || ''}, it's MK from Mercedes-Benz of Smithtown. Great meeting you at LIBI! Your Builder Pass is ${code}, ` +
    `good at all five Competition stores through Dec 31, with your ${level} Test Drive Certificate. Which Mercedes should I have ready, and what day works?`;
  const smsLink = `sms:+1${phone}?&body=${encodeURIComponent(textBody)}`;
  const mkHtml =
    `<div style="font-family:Arial,sans-serif;max-width:560px">` +
    `<h2 style="margin:0 0 8px">${heat === 'HOT' ? '🔥 ' : ''}${heat} Builder Pass lead: ${esc_(name)}</h2>` +
    `<table style="border-collapse:collapse;width:100%">${rows.map(([k, v]) => `<tr><td style="padding:4px 8px;color:#555">${k}</td><td style="padding:4px 8px"><b>${esc_(v || '—')}</b></td></tr>`).join('')}</table>` +
    `<p><a href="tel:+1${phone}">Call</a>${textOk ? ` · <a href="${smsLink}">Text them (pre-written)</a>` : ''}</p>` +
    (gold ? `<p>Arrived on <b>${esc_(ref)}</b>'s code: upgrade that pass holder to Gold too.</p>` : '') +
    `</div>`;
  MailApp.sendEmail({
    to: CONFIG.notifyEmail,
    subject: `${heat === 'HOT' ? '🔥 ' : ''}${heat} Builder Pass lead: ${name}${a[Q.company] ? ` (${a[Q.company]})` : ''}`,
    htmlBody: mkHtml,
    body: rows.map(([k, v]) => `${k}: ${v || '—'}`).join('\n'),
  });

  // The guest's pass. Requested by the guest, so it's a transactional message; it still carries contact details and an opt-out line.
  if (email) {
    const html =
      `<div style="font-family:Arial,sans-serif;max-width:560px;color:#0E1B33">` +
      `<div style="background:#06142E;color:#fff;padding:22px;border-radius:12px">` +
      `<div style="font-size:12px;letter-spacing:3px;color:#5EB0FF">COMPETITION AUTOMOTIVE GROUP · LIBI</div>` +
      `<div style="font-size:26px;font-weight:bold;letter-spacing:3px;margin-top:10px">BUILDER PASS</div>` +
      `<div style="font-size:12px;letter-spacing:2px;margin-top:4px">${level.toUpperCase()} · TEST DRIVE CERTIFICATE</div>` +
      `<div style="margin-top:16px;font-size:14px">${esc_(name)} &nbsp; · &nbsp; Pass <b>${code}</b> &nbsp; · &nbsp; Valid thru Dec 31</div></div>` +
      `<p>Hi ${first}, your pass is live. Show pass <b>${code}</b> at any ${CONFIG.group} store:</p>` +
      `<ul><li>VIP builder pricing at all five stores</li><li>+$500 on Mercedes-Benz Sprinter vans for NAHB members (current program terms)</li>` +
      `<li>A free fleet equity report on your trucks and vans</li><li><b>${level} VIP Test Drive Certificate</b>: a private drive in the Mercedes you choose, by appointment` +
      `${gold ? ', plus a complimentary detail while you drive' : ''}</li></ul>` +
      `<p><b>Share your code and go Gold.</b> Send this link to a colleague. When they activate a pass with it, you both get a complimentary detail during your drive:<br>` +
      `<a href="${shareUrl}">${shareUrl}</a></p>` +
      `<p>Book your drive: call or text ${CONFIG.ownerName}, <a href="tel:${CONFIG.cellTel}">${CONFIG.cellDisplay}</a>.</p>` +
      `<p style="font-size:11px;color:#666">${CONFIG.ownerName} · ${CONFIG.ownerTitle} · ${CONFIG.store} · ${CONFIG.address}. ` +
      `One certificate per person, by appointment through ${CONFIG.validThrough}; valid driver's license required; subject to availability. No purchase necessary. ` +
      `Pricing and incentives subject to dealer confirmation, program terms, residency and credit approval. To stop emails or have your information deleted, reply "unsubscribe" or "delete".</p></div>`;
    MailApp.sendEmail({ to: email, replyTo: CONFIG.notifyEmail, name: `${CONFIG.ownerName} · ${CONFIG.store}`, subject: `Your Competition Builder Pass: ${code}`, htmlBody: html });
  }
}

/** Same pass number as the Builder Pass page: first name + 3 digits from the phone. */
function shareCode_(name, phone) {
  const first = ((String(name).trim().split(/\s+/)[0] || 'LIBI').replace(/[^a-zA-Z]/g, '').slice(0, 10).toUpperCase()) || 'LIBI';
  let h = 0;
  for (const ch of `${String(phone).replace(/\D/g, '')}|${String(name).trim().toLowerCase()}`) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return `${first}${(h % 900) + 100}`;
}

function heat_(timeline, trade, stores, ref) {
  if (timeline === 'Now' || timeline === '1–3 months' || trade === 'Yes' || stores.indexOf('Sprinter work vans') >= 0 || ref) return 'HOT';
  if (timeline === '3–6 months' || timeline === 'Lease ends in 2027') return 'WARM';
  return 'NURTURE';
}

/** A pre-filled link: pairs of (question title, value). */
function prefill_(form, ...pairs) {
  const resp = form.createResponse();
  for (let i = 0; i < pairs.length; i += 2) {
    const item = form.getItems().find((it) => it.getTitle() === pairs[i]);
    if (item) resp.withItemResponse(item.asTextItem().createResponse(pairs[i + 1]));
  }
  return resp.toPrefilledUrl();
}

function esc_(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
