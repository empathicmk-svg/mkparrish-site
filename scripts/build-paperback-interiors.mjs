#!/usr/bin/env node
/**
 * Builds KDP 6x9 B&W paperback INTERIOR PDFs for:
 *   - Still Here, Still Her       (poetry collection)
 *   - The Rewrite Starter Pack    (guided writing workbook)
 * Page: 6in x 9in. Generous, KDP-safe margins (inside >= 0.375" min).
 * Run: node scripts/build-paperback-interiors.mjs
 */
import puppeteer from 'puppeteer';
import fs from 'fs';

const OUT = '/home/user/mkparrish-site/public/downloads/ebooks';

// ---------------------------------------------------------------------------
//  STILL HERE, STILL HER — poems
// ---------------------------------------------------------------------------
const sections = [
  {
    num: 'I',
    name: 'Still Here',
    blurb: 'On the days you only had to outlast.',
    poems: [
      { t: 'Inventory', l: [
        'I counted what was left of me one morning:',
        'two hands, still mine. A voice, a little hoarse.',
        'A heart that kept its terrible appointment',
        'and beat, and beat, without my permission.',
        '', 'Turns out that’s a life. Turns out that’s enough',
        'to start from. I had been waiting to feel whole',
        'before I’d call it living. I was already living.',
        'I just hadn’t looked up to take the count.' ] },
      { t: 'Holding Pattern', l: [
        'Some seasons you don’t bloom.',
        'You just refuse to fall.',
        '', 'You keep your roots inside the dark',
        'and call that faith. You let the cold',
        'have the leaves but not the spine.',
        '', 'No one applauds a tree in winter.',
        'And still — come spring — it’s there.' ] },
      { t: 'The Smaller Mercies', l: [
        'A full glass of water. A door that locks.',
        'The particular gold of four o’clock',
        'falling across the floor like it forgave me.',
        '', 'I learned to be grateful in miniature,',
        'to take my healing in the size it came:',
        'a good night’s sleep, a joke that landed,',
        'one whole hour I forgot to be afraid.' ] },
      { t: 'What the Scar Said', l: [
        'I used to hide it. Now I let it show.',
        'It is the only honest line my body wrote',
        'about the year I did not think I’d make.',
        '', 'It does not ask for pity. It just says:',
        'here is where it tore, and here is where',
        'it closed. Both true. Both mine. Still here.' ] },
      { t: 'Outlasting', l: [
        'I did not win. I did not lose. I stayed.',
        'That was the whole achievement of those months —',
        'to be, at the end of each one, not yet gone.',
        '', 'Survival is an unglamorous art.',
        'No medals. No applause. Just the slow',
        'astonishment of waking up again',
        'and choosing, one more time, the harder yes.' ] },
      { t: 'Anchor', l: [
        'When everything was moving I found one',
        'fixed thing — my own name, said out loud,',
        'in my own voice, into the empty room.',
        '', 'Mary Kate. Still here. Still her.',
        'I held to it like rope. The storm',
        'did what storms do. The name did not let go.' ] },
      { t: 'Three a.m.', l: [
        'The hour with no witnesses. The hour',
        'the mind invents its worst and calls it true.',
        'I learned to wait it out. To not believe',
        'the things that only ever come at three.',
        '', 'Morning is also true, I’d tell myself.',
        'Morning has a vote. Just hold until the vote.' ] },
      { t: 'Proof of Life', l: [
        'Here is the evidence: I am writing this.',
        'Which means I rose. Which means I made the coffee.',
        'Which means the worst night did not get the last word.',
        '', 'File it under proof. Keep it somewhere close.',
        'On the next bad night, you’ll want the record',
        'that says: you’ve done this. You came back before.' ] },
    ],
  },
  {
    num: 'II',
    name: 'Still Softening',
    blurb: 'On letting the hard parts become tender again.',
    poems: [
      { t: 'Thaw', l: [
        'I armored up to get through it.',
        'That was wisdom, then. The trouble is',
        'the armor doesn’t know when it’s over.',
        '', 'So now I’m teaching it. Now I’m saying:',
        'you can set it down. You can be soft',
        'in a safe room. You can let the warmth',
        'reach all the way in. The war is done.' ] },
      { t: 'Tenderness Is Not Weakness', l: [
        'It takes more muscle to stay open',
        'than to close. Any wall can hold a line.',
        'It is the door that does the braver thing.',
        '', 'I want to be a door. I want to swing wide',
        'for the right people and shut, kindly,',
        'on the wrong ones — and call both love.' ] },
      { t: 'Forgiving the Earlier Me', l: [
        'She did the best she could with what she knew,',
        'which wasn’t much, which was the whole of it.',
        'I will not stand above her and keep score.',
        '', 'I lean back through the years and take her hand.',
        'You got us here, I tell her. Look. We made it.',
        'You can rest now. I’ve got the pen from here.' ] },
      { t: 'Soft Mornings', l: [
        'I stopped waking like a soldier.',
        'No more bracing at the alarm.',
        '', 'Now I let the light arrive first,',
        'let the day make its small case',
        'before I answer. Coffee. Quiet.',
        'The radical idea that I am allowed',
        'to begin gently. That I always was.' ] },
      { t: 'The Apology I Stopped Making', l: [
        'I used to start each sentence small —',
        'sorry for the space, sorry for the ask,',
        'sorry for arriving with a need.',
        '', 'I’m unlearning the reflex. I take up room.',
        'I let my wanting be a normal thing.',
        'I save my sorry for when I’ve earned it.' ] },
      { t: 'Soften, She Said', l: [
        'Not collapse. Not surrender. Soften.',
        'The way a fist becomes a hand again',
        'and remembers it was made for holding.',
        '', 'I had forgotten. My whole body',
        'had been a fist for years. Soften, she said.',
        'And slowly, finger by finger, I did.' ] },
      { t: 'Permission Slip', l: [
        'I wrote one out, in my own hand, to me:',
        'permitted to rest. Permitted to be wrong.',
        'Permitted to change my mind in public.',
        '', 'I signed it. No one else was going to.',
        'That was the lesson, in the end — the slip',
        'I kept waiting for was mine to write.' ] },
      { t: 'Unclench', l: [
        'My jaw. My shoulders. The grip behind my eyes.',
        'I carried the bracing long past the need.',
        'The body is loyal; it keeps the old orders.',
        '', 'So I give new ones now, soft and on purpose:',
        'you’re safe, you can lower your hands, you can breathe.',
        'And slowly the old soldier stands down.' ] },
    ],
  },
  {
    num: 'III',
    name: 'Still Her',
    blurb: 'On becoming the woman you were writing toward.',
    poems: [
      { t: 'The Author', l: [
        'For years I read my life like it was given —',
        'a script I had to honor, not revise.',
        'Then someone asked: who told you that? And no one had.',
        '', 'I had been holding the pen the entire time.',
        'I just hadn’t dared to use it. So I did.',
        'I crossed a line out. The sky did not fall.',
        'I wrote a better one. And kept on writing.' ] },
      { t: 'Becoming', l: [
        'I am not who I was. Good.',
        'I am not yet who I’ll be. Also good.',
        '', 'I live in the long middle of the verb,',
        'in the -ing of it, the ongoing make.',
        'Becoming is not a place you arrive.',
        'It’s the only honest place to live.' ] },
      { t: 'My Own Name', l: [
        'I gave it back to myself like a gift',
        'I’d been keeping for someone more deserving',
        'and finally understood: she was me.',
        '', 'I say it now without apology.',
        'It is not borrowed. It is not on loan.',
        'It is the ground I’m building the rest on.' ] },
      { t: 'Walking In', l: [
        'The rooms I used to wait outside of —',
        'I walk into them now. I don’t knock twice.',
        'I don’t rehearse the right to be there.',
        '', 'I belong because I decided to belong,',
        'which, it turns out, was always the only',
        'permission that was ever going to come.' ] },
      { t: 'Rewriting', l: [
        'Every scar a sentence. Every stumble, a turn.',
        'Every bridge I crossed and watched quietly burn',
        'just smoke making room for a wider sky —',
        'for the life that was restless, waiting, inside.',
        '', 'I am building a world from the ground of my name,',
        'and the woman I’m becoming is why I came.' ] },
      { t: 'The Woman in the Glass', l: [
        'We have an understanding now, the two of us.',
        'I no longer flinch. I no longer audit.',
        'I meet her eyes and something settles.',
        '', 'You again, I say. Good. Stay.',
        'She used to be a stranger I apologized to.',
        'Now she is the one I’m building everything for.' ] },
      { t: 'Signature', l: [
        'There is a version of the story I’d sign',
        'and a version I kept signing out of habit.',
        'I can tell them apart now. That’s the whole skill.',
        '', 'I only put my name to what is true.',
        'Everything else I leave unsigned, undone —',
        'a draft I’m free to never write again.' ] },
      { t: 'Reintroduction', l: [
        'Hello. I don’t think we’ve properly met.',
        'I’m the one she was becoming the whole time,',
        'the one the hard years were quietly making.',
        '', 'I’m late, I know. But I’m here now. For good.',
        'Still here, against the odds. And — finally —',
        'unmistakably, unapologetically, her.' ] },
    ],
  },
];

const anchorPoem = { t: 'The Rewrite', l: [
  'I picked up the pen and I felt the world shift,',
  'the weight of a lifetime becoming a gift.',
  'Every scar now a sentence, every stumble a turn,',
  'every bridge that I crossed and watched quietly burn',
  'just smoke making room for the sky opening wide,',
  'for the story that’s been living restless inside.',
  '', 'I am the author. I always have been.',
  'I just had to believe in the plot I was in.',
  '', 'So I write myself boldly into what’s new,',
  'into rooms full of wonder I’m finally walking into.',
  'I am building a life from the ground of my name',
  'and the woman I’m becoming is the whole reason I came.' ] };

// ---------------------------------------------------------------------------
//  Shared interior CSS (6x9)
// ---------------------------------------------------------------------------
const interiorCSS = `
  @page { size: 6in 9in; margin: 0.7in 0.55in 0.65in 0.7in; }
  :root {
    --ink:#111; --sub:#555; --rule:#CCC; --accent:#C75B78;
    --fn:'Bebas Neue',sans-serif; --fs:'Playfair Display',serif; --fb:'DM Sans',sans-serif;
  }
  *,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
  html { font-size: 11pt; }
  body { background:#fff; color:var(--ink); font-family:var(--fb); line-height:1.7; }
  .page { break-after: page; }
  .center { display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; min-height:7.4in; }
  .bottom { display:flex; flex-direction:column; justify-content:flex-end; min-height:7.4in; }

  .half-title { font-family:var(--fn); font-size:24pt; letter-spacing:0.22em; text-transform:uppercase; color:var(--ink); }
  .tp-eyebrow { font-family:var(--fb); font-weight:500; font-size:9pt; letter-spacing:0.4em; text-transform:uppercase; color:var(--sub); margin-bottom:0.5in; }
  .tp-title { font-family:var(--fn); font-size:46pt; line-height:0.92; letter-spacing:0.03em; text-transform:uppercase; color:var(--ink); }
  .tp-title .accent { color:var(--accent); }
  .tp-rule { width:54pt; height:2pt; background:var(--accent); margin:20pt auto; }
  .tp-sub { font-family:var(--fs); font-style:italic; font-size:13pt; color:var(--sub); }
  .tp-author { font-family:var(--fb); font-weight:500; font-size:10pt; letter-spacing:0.32em; text-transform:uppercase; color:var(--ink); margin-top:0.6in; }

  .copy p { font-size:8.5pt; color:var(--sub); line-height:1.9; }
  .epigraph { font-family:var(--fs); font-style:italic; font-size:13pt; color:var(--ink); line-height:1.8; max-width:4in; }
  .epigraph .attr { display:block; font-style:normal; font-family:var(--fb); font-size:8.5pt; letter-spacing:0.2em; text-transform:uppercase; color:var(--sub); margin-top:14pt; }

  .sec-num { font-family:var(--fn); font-size:60pt; color:var(--accent); line-height:1; }
  .sec-name { font-family:var(--fn); font-size:26pt; letter-spacing:0.16em; text-transform:uppercase; margin-top:8pt; }
  .sec-rule { width:46pt; height:2pt; background:var(--accent); margin:18pt auto; }
  .sec-blurb { font-family:var(--fs); font-style:italic; font-size:12pt; color:var(--sub); }

  .poem { padding-top:0.5in; }
  .poem-title { font-family:var(--fn); font-size:20pt; letter-spacing:0.08em; text-transform:uppercase; color:var(--ink); margin-bottom:6pt; }
  .poem-accent { width:30pt; height:1.5pt; background:var(--accent); margin-bottom:20pt; }
  .poem-body { font-family:var(--fs); font-size:12pt; line-height:1.85; color:var(--ink); }
  .poem-body .blank { display:block; height:9pt; }
  .colophon { font-family:var(--fb); font-weight:300; font-size:9.5pt; color:var(--sub); line-height:1.8; }
  .colophon .name { font-family:var(--fn); font-size:14pt; letter-spacing:0.14em; text-transform:uppercase; color:var(--ink); display:block; margin-bottom:10pt; }
`;

function poemHtml(p) {
  const body = p.l.map(line => line === '' ? '<span class="blank"></span>' : line).join('<br>');
  return `<div class="page poem"><div class="poem-title">${p.t}</div><div class="poem-accent"></div><div class="poem-body">${body}</div></div>`;
}

function buildPoetry() {
  let html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
  <style>${interiorCSS}</style></head><body>`;

  // half title
  html += `<div class="page"><div class="center"><div class="half-title">Still Here, Still Her</div></div></div>`;
  // title page
  html += `<div class="page"><div class="center">
    <div class="tp-eyebrow">MK Parrish</div>
    <div class="tp-title">Still Here,<br>Still <span class="accent">Her</span></div>
    <div class="tp-rule"></div>
    <div class="tp-sub">Poems on surviving, softening, and staying.</div>
    <div class="tp-author">MK Parrish</div>
  </div></div>`;
  // copyright
  html += `<div class="page"><div class="bottom copy">
    <p><strong>Still Here, Still Her</strong></p>
    <p>Copyright © ${new Date().getFullYear()} MK Parrish. All rights reserved.</p>
    <p>No part of this book may be reproduced in any form without written permission from the author, except brief quotations in a review.</p>
    <p>mkparrish.com</p>
    <p>First edition.</p>
  </div></div>`;
  // dedication / epigraph
  html += `<div class="page"><div class="center"><div class="epigraph">For the woman who stayed —<br>and became.<span class="attr">— MK</span></div></div></div>`;

  // sections + poems
  for (const sec of sections) {
    html += `<div class="page"><div class="center">
      <div class="sec-num">${sec.num}</div>
      <div class="sec-name">${sec.name}</div>
      <div class="sec-rule"></div>
      <div class="sec-blurb">${sec.blurb}</div>
    </div></div>`;
    for (const p of sec.poems) html += poemHtml(p);
  }

  // anchor poem as coda
  html += `<div class="page"><div class="center">
      <div class="sec-name">Coda</div>
      <div class="sec-rule"></div>
      <div class="sec-blurb">The poem it all began with.</div>
    </div></div>`;
  html += poemHtml(anchorPoem);

  // about the author
  html += `<div class="page"><div class="bottom"><div class="colophon">
    <span class="name">About the Author</span>
    MK Parrish is a writer, brand voice strategist, and author of The Margins on Substack.
    She writes about voice, identity, and the slow work of becoming. She lives in the
    long middle of the verb, and she is still — against everything — her.
    <br><br>mkparrish.com · The Margins on Substack
  </div></div></div>`;

  html += `</body></html>`;
  return html;
}

// ---------------------------------------------------------------------------
//  THE REWRITE STARTER PACK — workbook
// ---------------------------------------------------------------------------
const exercises = [
  { n: '01', t: 'The Inherited Line', prompt:
    'Write down one sentence about yourself that you did not choose — something you were told, early and often, until it felt like fact. (“I’m not a creative person.” “I’m the responsible one.” “I’m too much.”)',
    follow: 'Whose voice is it, really? Write it in their words first. Then in yours.' },
  { n: '02', t: 'Consider the Source', prompt:
    'Take the line from Exercise 01. Who benefited from you believing it? Be specific. Sometimes the answer is a person; sometimes it’s an old version of you that needed the story to stay safe.',
    follow: 'What did believing it protect you from? What did it cost?' },
  { n: '03', t: 'The Evidence Against', prompt:
    'List three moments from your life that quietly contradict the inherited line. Small counts. The time you did the brave thing. The time you were, in fact, exactly enough.',
    follow: 'If these are true — and they are — what does that make the original line?' },
  { n: '04', t: 'Name It Plainly', prompt:
    'In one honest sentence, write the truer version. Not aspirational. Not a affirmation you don’t believe yet. Just the most accurate thing you can stand behind today.',
    follow: 'Read it out loud, in your own voice. Notice what your body does.' },
  { n: '05', t: 'The Room You Wait Outside Of', prompt:
    'Describe a room — literal or figurative — you’ve been waiting for permission to enter. The role. The relationship. The version of your work you keep almost starting.',
    follow: 'What would you do first if you simply decided you belonged in it?' },
  { n: '06', t: 'Write Yourself In', prompt:
    'Write a short paragraph in the present tense, as the person who already lives in that room. Not “I want to.” “I do.” Make it specific enough to be a little uncomfortable.',
    follow: 'This is the first paragraph of the rewrite. Date it. You’ll want to remember when you began.' },
  { n: '07', t: 'The Voice You’d Use', prompt:
    'Read your paragraph from Exercise 06 out loud. Does it sound like you — or like someone performing a more impressive person? Cross out every word that isn’t yours. Rewrite it in the voice you actually speak in.',
    follow: 'The rewrite isn’t about sounding new. It’s about finally sounding true.' },
  { n: '08', t: 'One Small Proof', prompt:
    'Choose one concrete action — small, doable this week — that a person living the new line would take. Not the whole reinvention. One honest step that makes the rewrite real in the world.',
    follow: 'Write it as a commitment with a date. Then keep it. Proof beats intention every time.' },
];

const workbookCSS = `
  @page { size: 6in 9in; margin: 0.7in 0.55in 0.65in 0.7in; }
  :root { --ink:#111; --sub:#555; --rule:#CCC; --accent:#C75B78;
    --fn:'Bebas Neue',sans-serif; --fs:'Playfair Display',serif; --fb:'DM Sans',sans-serif; }
  *,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
  html { font-size: 11pt; }
  body { background:#fff; color:var(--ink); font-family:var(--fb); line-height:1.6; }
  .page { break-after: page; }
  .center { display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; min-height:7.4in; }
  .bottom { display:flex; flex-direction:column; justify-content:flex-end; min-height:7.4in; }

  .half-title { font-family:var(--fn); font-size:22pt; letter-spacing:0.2em; text-transform:uppercase; }
  .tp-eyebrow { font-family:var(--fb); font-weight:500; font-size:9pt; letter-spacing:0.4em; text-transform:uppercase; color:var(--sub); margin-bottom:0.5in; }
  .tp-title { font-family:var(--fn); font-size:44pt; line-height:0.92; letter-spacing:0.03em; text-transform:uppercase; }
  .tp-title .accent { color:var(--accent); }
  .tp-sub2 { font-family:var(--fn); font-size:16pt; letter-spacing:0.3em; text-transform:uppercase; color:var(--sub); margin-top:10pt; }
  .tp-rule { width:54pt; height:2pt; background:var(--accent); margin:20pt auto; }
  .tp-sub { font-family:var(--fs); font-style:italic; font-size:13pt; color:var(--sub); }
  .tp-author { font-family:var(--fb); font-weight:500; font-size:10pt; letter-spacing:0.32em; text-transform:uppercase; margin-top:0.6in; }
  .copy p { font-size:8.5pt; color:var(--sub); line-height:1.9; }

  .intro { padding-top:0.3in; }
  .intro h2 { font-family:var(--fn); font-size:22pt; letter-spacing:0.1em; text-transform:uppercase; border-bottom:1.5pt solid var(--ink); padding-bottom:8pt; margin-bottom:18pt; }
  .intro p { font-family:var(--fs); font-size:11.5pt; line-height:1.8; margin-bottom:12pt; color:var(--ink); }
  .intro .lead { font-style:italic; color:var(--sub); }

  .ex { padding-top:0.3in; }
  .ex-num { font-family:var(--fn); font-size:13pt; letter-spacing:0.2em; color:var(--accent); }
  .ex-title { font-family:var(--fn); font-size:24pt; letter-spacing:0.06em; text-transform:uppercase; margin:4pt 0 14pt; }
  .ex-rule { width:40pt; height:2pt; background:var(--accent); margin-bottom:16pt; }
  .ex-prompt { font-family:var(--fs); font-size:12pt; line-height:1.75; margin-bottom:14pt; }
  .ex-follow { font-family:var(--fb); font-weight:500; font-size:9.5pt; line-height:1.6; color:var(--sub); border-left:2pt solid var(--accent); padding-left:12pt; margin-bottom:18pt; }
  .lines { margin-top:6pt; }
  .line { border-bottom:0.75pt solid var(--rule); height:0.42in; }
  .notes-h { font-family:var(--fn); font-size:18pt; letter-spacing:0.14em; text-transform:uppercase; border-bottom:1.5pt solid var(--ink); padding-bottom:6pt; margin-bottom:16pt; }
`;

function lines(n) { return `<div class="lines">${'<div class="line"></div>'.repeat(n)}</div>`; }

function buildWorkbook() {
  let html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
  <style>${workbookCSS}</style></head><body>`;

  html += `<div class="page"><div class="center"><div class="half-title">The Rewrite Starter Pack</div></div></div>`;
  html += `<div class="page"><div class="center">
    <div class="tp-eyebrow">MK Parrish</div>
    <div class="tp-title">The<br><span class="accent">Rewrite</span></div>
    <div class="tp-sub2">Starter Pack</div>
    <div class="tp-rule"></div>
    <div class="tp-sub">A short, guided introduction to rewriting the story you were handed.</div>
    <div class="tp-author">MK Parrish</div>
  </div></div>`;
  html += `<div class="page"><div class="bottom copy">
    <p><strong>The Rewrite Starter Pack</strong></p>
    <p>Copyright © ${new Date().getFullYear()} MK Parrish. All rights reserved.</p>
    <p>No part of this book may be reproduced in any form without written permission from the author, except brief quotations in a review.</p>
    <p>mkparrish.com</p>
    <p>First edition.</p>
  </div></div>`;

  // intro
  html += `<div class="page intro">
    <h2>Start Here</h2>
    <p class="lead">You don’t have to burn it all down. You just have to pick up the pen.</p>
    <p>Most of us are walking around inside a story we never agreed to. It was handed to us — by a family, a job, a hard season — and we mistook it for the truth because we heard it so many times.</p>
    <p>This Starter Pack is the on-ramp. Six short exercises, drawn from the same practice I’ve used with founders, executives, and creators, to help you find the inherited lines, question the source, and write the first honest paragraph of something truer.</p>
    <p>Go slowly. Be honest. There are no wrong answers — only more accurate ones. When you’re ready for the full process, the complete work waits in <em>The Reinvention Workbook</em>.</p>
  </div>`;

  html += `<div class="page intro">
    <h2>Before You Begin</h2>
    <p>Three things to keep close as you work:</p>
    <p><strong>One — privacy is the point.</strong> No one reads these pages but you. Write the version you’d never say out loud. That’s where the truth is hiding.</p>
    <p><strong>Two — small is allowed.</strong> You don’t have to overhaul your life by the last page. A single honest sentence is a complete and worthy result.</p>
    <p><strong>Three — come back.</strong> A rewrite is a practice, not an event. Pencil is encouraged. So is changing your mind.</p>
  </div>`;

  // exercises — each exercise gets a prompt page + a lined response page
  for (const ex of exercises) {
    html += `<div class="page ex">
      <div class="ex-num">Exercise ${ex.n}</div>
      <div class="ex-title">${ex.t}</div>
      <div class="ex-rule"></div>
      <div class="ex-prompt">${ex.prompt}</div>
      <div class="ex-follow">${ex.follow}</div>
      ${lines(5)}
    </div>`;
    html += `<div class="page ex"><div class="notes-h">Your Rewrite</div>${lines(13)}</div>`;
  }

  // closing + notes
  html += `<div class="page intro">
    <h2>Keep Going</h2>
    <p>You just did the bravest part — you looked. The rewrite isn’t a single sitting; it’s a practice. Come back to these pages. Cross things out. Write truer lines on top of them.</p>
    <p class="lead">You are the author. You always have been.</p>
  </div>`;
  html += `<div class="page ex"><div class="notes-h">Notes</div>${lines(13)}</div>`;
  html += `<div class="page ex"><div class="notes-h">Notes</div>${lines(13)}</div>`;
  html += `<div class="page ex"><div class="notes-h">Notes</div>${lines(13)}</div>`;
  html += `<div class="page"><div class="bottom copy">
    <p style="font-family:var(--fn);font-size:13pt;letter-spacing:0.14em;text-transform:uppercase;color:var(--ink);">MK Parrish</p>
    <p>MK Parrish is a brand voice strategist, ghostwriter, and author of The Margins on Substack. She writes about voice, identity, and the economics of language at mkparrish.com.</p>
  </div></div>`;

  html += `</body></html>`;
  return html;
}

// ---------------------------------------------------------------------------
//  Render
// ---------------------------------------------------------------------------
export { buildPoetry, buildWorkbook };

const jobs = [
  { html: buildPoetry(),  out: 'still-here-still-her-kdp-interior' },
  { html: buildWorkbook(), out: 'the-rewrite-starter-pack-kdp-interior' },
];

const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'], headless: true });
for (const j of jobs) {
  const page = await browser.newPage();
  await page.setContent(j.html, { waitUntil: 'networkidle0', timeout: 30000 });
  const pdf = `${OUT}/${j.out}.pdf`;
  await page.pdf({ path: pdf, width: '6in', height: '9in', printBackground: true,
                   margin: { top: 0, right: 0, bottom: 0, left: 0 }, preferCSSPageSize: true });
  await page.close();
  const kb = (fs.statSync(pdf).size / 1024).toFixed(0);
  const pages = (j.html.match(/class="page/g) || []).length;
  console.log(`${j.out}.pdf (${kb} kb) — ${pages} pages`);
}
await browser.close();
console.log('\nInterior PDFs: 6x9, B&W. Verify final page count for spine width.');
