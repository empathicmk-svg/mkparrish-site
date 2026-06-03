#!/usr/bin/env node
/**
 * Builds The Reinvention Workbook as a richly-styled EPUB 3.
 * - Embeds brand fonts (Bebas Neue, Playfair Display, DM Sans)
 * - Dark-luxury palette matching mkparrish.com (void/obsidian/graphite + petal pink)
 * - Per-chapter XHTML, EPUB3 nav + NCX fallback, styled cover
 * Run: node scripts/build-epub.mjs
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const ROOT   = '/home/user/mkparrish-site';
const OUT     = path.join(ROOT, 'public/downloads/ebooks/reinvention-workbook.epub');
const BUILD   = '/tmp/epub-build';
const FONTS   = '/tmp/fonts';

// ── reset build dir ──────────────────────────────────────────────
execSync(`rm -rf ${BUILD}`);
fs.mkdirSync(path.join(BUILD, 'META-INF'), { recursive: true });
fs.mkdirSync(path.join(BUILD, 'OEBPS/fonts'), { recursive: true });
fs.mkdirSync(path.join(BUILD, 'OEBPS/text'),  { recursive: true });

// ── mimetype ─────────────────────────────────────────────────────
fs.writeFileSync(path.join(BUILD, 'mimetype'), 'application/epub+zip');

// ── container.xml ────────────────────────────────────────────────
fs.writeFileSync(path.join(BUILD, 'META-INF/container.xml'),
`<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`);

// ── fonts ────────────────────────────────────────────────────────
const fontMap = [
  ['BebasNeue.ttf',       'BebasNeue.ttf'],
  ['DMSans.ttf',          'DMSans.ttf'],
  ['PlayfairDisplay.ttf', 'PlayfairDisplay.ttf'],
  ['PlayfairItalic.ttf',  'PlayfairItalic.ttf'],
];
for (const [src, dst] of fontMap) {
  fs.copyFileSync(path.join(FONTS, src), path.join(BUILD, 'OEBPS/fonts', dst));
}

// ── CSS ──────────────────────────────────────────────────────────
const css = `
@font-face {
  font-family: "Bebas Neue";
  src: url("fonts/BebasNeue.ttf");
  font-weight: normal; font-style: normal;
}
@font-face {
  font-family: "Playfair Display";
  src: url("fonts/PlayfairDisplay.ttf");
  font-weight: 400 900; font-style: normal;
}
@font-face {
  font-family: "Playfair Display";
  src: url("fonts/PlayfairItalic.ttf");
  font-weight: 400 900; font-style: italic;
}
@font-face {
  font-family: "DM Sans";
  src: url("fonts/DMSans.ttf");
  font-weight: 100 1000; font-style: normal;
}

/* ── palette ── */
:root {
  --void:#080808; --obsidian:#111111; --carbon:#1A1A1A; --graphite:#2C2C2C;
  --iron:#4A4A4A; --ash:#7A7A7A; --smoke:#B0B0B0; --pearl:#F0F0EE;
  --petal:#F2AFC6; --carmine:#C75B78;
}

html, body {
  margin:0; padding:0;
  background:#080808;
  color:#B0B0B0;
  font-family:"DM Sans", sans-serif;
  font-weight:300;
  line-height:1.75;
}
body { padding:1.4em 1.3em; }

/* ── display + headings ── */
.eyebrow {
  font-family:"Bebas Neue", sans-serif;
  font-size:0.78em; letter-spacing:0.32em; text-transform:uppercase;
  color:#F2AFC6; margin:0 0 0.6em;
}
h1.display {
  font-family:"Bebas Neue", sans-serif;
  font-weight:normal; text-transform:uppercase;
  color:#F0F0EE; line-height:0.92; letter-spacing:0.03em;
  font-size:3.4em; margin:0 0 0.3em;
}
h1.display .accent { color:#F2AFC6; }

h2.chapter {
  font-family:"Bebas Neue", sans-serif;
  font-weight:normal; text-transform:uppercase;
  color:#F0F0EE; letter-spacing:0.04em; line-height:1;
  font-size:2.5em; margin:0 0 0.15em;
  padding-bottom:0.25em;
  border-bottom:2px solid #C75B78;
}
h2.section {
  font-family:"Playfair Display", serif;
  font-weight:700; color:#F0F0EE;
  font-size:1.5em; margin:1.4em 0 0.5em;
}
h3.exercise {
  font-family:"DM Sans", sans-serif;
  font-weight:500; font-size:0.82em; letter-spacing:0.18em;
  text-transform:uppercase; color:#F2AFC6;
  margin:1.6em 0 0.5em;
}

p { margin:0 0 0.85em; color:#B0B0B0; }
strong { color:#F0F0EE; font-weight:600; }
em { font-style:italic; color:#F0F0EE; }
.note { color:#7A7A7A; font-style:italic; font-size:0.95em; }

ul, ol { color:#B0B0B0; margin:0 0 1em; padding-left:1.3em; }
li { margin-bottom:0.35em; }

/* ── instruction lead-in ── */
.instr-tag {
  font-family:"Bebas Neue", sans-serif;
  font-size:0.72em; letter-spacing:0.22em; text-transform:uppercase;
  color:#C75B78; display:block; margin-bottom:0.2em;
}

/* ── pullquote ── */
blockquote {
  margin:1.4em 0; padding:1em 1.2em;
  background:#1A1A1A;
  border-left:3px solid #F2AFC6;
  font-family:"Playfair Display", serif;
  font-style:italic; font-size:1.18em;
  color:#F0F0EE; line-height:1.55;
}

/* ── example card ── */
.example {
  background:#111111;
  border:1px solid #2C2C2C;
  border-radius:4px;
  padding:0.85em 1em;
  margin:0.6em 0 1em;
  font-size:0.95em;
}
.example .label {
  font-family:"Bebas Neue", sans-serif;
  font-size:0.7em; letter-spacing:0.25em; text-transform:uppercase;
  color:#7A7A7A; display:block; margin-bottom:0.35em;
}

/* ── response prompt ── */
.response {
  border:1px dashed #4A4A4A;
  border-radius:4px;
  background:#0E0E0E;
  padding:1em 1.1em;
  margin:0.7em 0 1.4em;
  min-height:5em;
}
.response .label {
  font-family:"Bebas Neue", sans-serif;
  font-size:0.7em; letter-spacing:0.28em; text-transform:uppercase;
  color:#4A4A4A; display:block;
  border-bottom:1px solid #2C2C2C;
  padding-bottom:0.45em; margin-bottom:0.5em;
}
.response .ghost { color:#2C2C2C; font-style:italic; font-size:0.9em; }

/* ── part opener ── */
.part-opener {
  text-align:center; padding:3.5em 0;
}
.part-num {
  font-family:"Bebas Neue", sans-serif;
  font-size:6em; line-height:1; color:#1F1F1F;
  letter-spacing:0.05em;
}
.part-opener .eyebrow { text-align:center; }
.part-opener h2.chapter { border:none; display:inline-block; }
.rule {
  width:48px; height:2px; background:#C75B78;
  margin:1.2em auto;
}

/* ── cover ── */
.cover-body { padding:0; margin:0; background:#080808; }
.cover {
  background:#080808; text-align:center;
  height:100vh; box-sizing:border-box;
  padding:8% 8%;
  display:flex; flex-direction:column;
  align-items:center; justify-content:center;
}
.cover-frame {
  border:1px solid #2C2C2C;
  padding:3.2em 1.6em 2.8em;
  width:100%; box-sizing:border-box;
  position:relative;
}
.cover-eyebrow {
  font-family:"Bebas Neue", sans-serif;
  font-size:0.95em; letter-spacing:0.45em; text-transform:uppercase;
  color:#7A7A7A; margin:0 0 1.8em;
}
.cover-title {
  font-family:"Bebas Neue", sans-serif;
  font-weight:normal; text-transform:uppercase;
  color:#F0F0EE; line-height:0.86; letter-spacing:0.02em;
  font-size:4.2em; margin:0;
}
.cover-title .accent { color:#F2AFC6; }
.cover-the {
  display:block; font-size:0.42em; letter-spacing:0.5em;
  color:#7A7A7A; margin-bottom:0.25em;
}
.cover-rule {
  width:54px; height:2px; background:#C75B78;
  margin:1.6em auto;
}
.cover-sub {
  font-family:"Playfair Display", serif; font-style:italic;
  color:#B0B0B0; font-size:1.1em; line-height:1.6;
  max-width:24ch; margin:0 auto;
}
.cover-byline {
  font-family:"Bebas Neue", sans-serif;
  letter-spacing:0.4em; text-transform:uppercase;
  color:#4A4A4A; font-size:0.82em; margin-top:2.6em;
}
.cover-dot {
  color:#F2AFC6; font-size:1.4em; line-height:1; margin:1.4em 0 0;
}

/* ── title / copyright / closing ── */
.center { text-align:center; }
.title-page { text-align:center; padding-top:18%; }
.byline {
  font-family:"Bebas Neue", sans-serif;
  letter-spacing:0.25em; text-transform:uppercase;
  color:#7A7A7A; font-size:0.95em; margin-top:1.5em;
}
.copyright { font-size:0.82em; color:#7A7A7A; line-height:2; }
.closing { text-align:center; padding-top:2em; }
.closing .final-line {
  font-family:"Playfair Display", serif; font-style:italic;
  font-size:1.4em; color:#F0F0EE; line-height:1.6; margin:1em 0;
}
hr.divider { border:none; border-top:1px solid #2C2C2C; margin:2em 0; }
`;
fs.writeFileSync(path.join(BUILD, 'OEBPS/style.css'), css);

// ── XHTML helpers ────────────────────────────────────────────────
const doc = (title, body, bodyClass='') => `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
  <meta charset="utf-8"/>
  <title>${title}</title>
  <link rel="stylesheet" type="text/css" href="../style.css"/>
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''}>
${body}
</body>
</html>`;

const response = (label, ghost='') => `<div class="response">
  <span class="label">${label}</span>
  ${ghost ? `<p class="ghost">${ghost}</p>` : ''}
</div>`;

const files = []; // {id, href, title, scribe}

function addPage(id, filename, title, body, bodyClass='') {
  fs.writeFileSync(path.join(BUILD, 'OEBPS/text', filename), doc(title, body, bodyClass));
  files.push({ id, href: `text/${filename}`, title });
}

// ── COVER ────────────────────────────────────────────────────────
addPage('cover', 'cover.xhtml', 'Cover', `
<div class="cover">
  <div class="cover-frame">
    <p class="cover-eyebrow">MK Parrish</p>
    <h1 class="cover-title">
      <span class="cover-the">The</span>
      <span class="accent">Reinvention</span><br/>Workbook
    </h1>
    <div class="cover-rule"></div>
    <p class="cover-sub">A guided writing practice for people in the middle of becoming someone new.</p>
    <p class="cover-dot">&#10022;</p>
    <p class="cover-byline">mkparrish.com</p>
  </div>
</div>`, 'cover-body');

// ── TITLE PAGE ───────────────────────────────────────────────────
addPage('titlepage', 'title.xhtml', 'Title Page', `
<div class="title-page">
  <p class="eyebrow">A Guided Writing Practice</p>
  <h1 class="display">The<br/><span class="accent">Reinvention</span><br/>Workbook</h1>
  <div class="rule"></div>
  <p class="byline">MK Parrish</p>
</div>`);

// ── COPYRIGHT ────────────────────────────────────────────────────
addPage('copyright', 'copyright.xhtml', 'Copyright', `
<div style="padding-top:30%;">
  <p class="copyright">
    <strong>THE REINVENTION WORKBOOK</strong><br/>
    Copyright &#169; 2024 MK Parrish. All rights reserved.<br/><br/>
    No part of this publication may be reproduced, distributed, or transmitted in any
    form or by any means without the prior written permission of the author.<br/><br/>
    mkparrish.com
  </p>
</div>`);

// ── INTRO ────────────────────────────────────────────────────────
addPage('intro', 'intro.xhtml', 'How to Use This Workbook', `
<p class="eyebrow">Before You Begin</p>
<h2 class="chapter">How to Use<br/>This Workbook</h2>
<p>You're not lost. You're between drafts.</p>
<p>That restless, ungrounded feeling &#8212; like you've outgrown a life that still has your name on it &#8212; isn't a breakdown. It's a manuscript in revision. Something is being rewritten, and the discomfort is just the gap between the old version and the one that hasn't fully arrived yet.</p>
<p>This workbook is for that gap. It won't hand you a five-step plan or a personality quiz that flattens you into a color. Reinvention isn't a system. It's a writing practice. You become someone new the same way you write anything true &#8212; draft, cut, revise, keep the line that surprised you.</p>
<p>Twenty exercises follow, in four parts. Do them in order or out of it. Each prompt has instructions, a few questions, and &#8212; where it helps &#8212; an example so you know the depth I'm asking for. The examples are mine or composites. Don't copy them. Let them set the floor, then go past it.</p>
<blockquote>You don't find yourself. You write yourself. One honest sentence at a time.</blockquote>
<p>Set aside the urge to do this perfectly. The mess is the point. Begin.</p>`);

// ── EXERCISE DATA ────────────────────────────────────────────────
const parts = [
  {
    num: 'I', roman: 'One', title: 'The Identity Audit',
    intro: `Before you build the new, take inventory of the old. You can't revise a draft you've never read closely.`,
    exercises: [
      { n:1, t:'The Inventory',
        instr:`List ten roles, labels, or identities you currently carry &#8212; job titles, relationships, the descriptions you reach for at parties. Next to each, write one word: <em>keep</em>, <em>cut</em>, or <em>unsure</em>.`,
        ex:`Marketing manager &#8212; unsure &#183; Reliable one &#8212; cut &#183; Daughter &#8212; keep &#183; "Not creative" &#8212; cut`,
        after:`The <em>cut</em> and <em>unsure</em> lines are your real material. Circle them.` },
      { n:2, t:'On Loan vs. Owned',
        instr:`Take three labels from Exercise 1. For each, write a sentence answering: <em>did I choose this, or was it handed to me?</em> Be honest about the inherited ones.`,
        ex:`"'Reliable one' was handed to me at about age nine, when being the easy kid kept the house calm. I've been paying interest on it ever since."` },
      { n:3, t:'The Costume Test',
        instr:`Describe a version of yourself you perform that doesn't match how you feel inside. Write it in third person, like a character. What does she wear, say, withhold? Then write one sentence on what it costs you to keep her up.` },
      { n:4, t:'The Energy Map',
        instr:`Make two columns. Left: everything in your week that drains you. Right: everything that returns you to yourself. Don't moralize the lists. Just look at the imbalance.` },
      { n:5, t:`The Eulogy You'd Hate`,
        instr:`Write the two-sentence summary of your life that would be true if nothing changed from today. The version that makes your stomach drop a little. This isn't despair &#8212; it's a compass. The drop tells you which direction is wrong.`,
        ex:`"She kept everyone comfortable and herself postponed. She was, by every external measure, fine."` },
    ],
  },
  {
    num: 'II', roman: 'Two', title: 'Excavating the Old Story',
    intro: `You've been narrating yourself for years. Some of that narration is true. Some of it was installed by people who needed you to stay a certain shape.`,
    exercises: [
      { n:6, t:'The Story You Tell About Yourself',
        instr:`Write your origin story the way you usually tell it. One paragraph. Then read it back and underline every sentence that sounds like a limitation stated as a fact. ("I've never been good with money." "I'm just not a leader.")` },
      { n:7, t:'Find the Author',
        instr:`Take three underlined limitations from Exercise 6. For each, write whose voice it is. A parent? A teacher? An ex? An era of your life? You'll often find the belief isn't yours.`,
        ex:`"'I'm not creative' is my third-grade teacher's voice, who graded coloring inside the lines. I have been believing a woman who is no longer alive about a skill she never tested."` },
      { n:8, t:'The Greatest Hits of Being Misread',
        instr:`List three times someone got you completely wrong &#8212; underestimated you, mislabeled you, decided who you were before you spoke. For each, write the truer version.` },
      { n:9, t:'What You Quit Believing',
        instr:`Write about something you used to be certain of that you no longer are. A belief, an ambition, a person, a version of the future. Just describe the shift. Reinvention is partly the art of letting a belief die without dying with it.` },
      { n:10, t:'The Permission Slip',
        instr:`Write a permission slip to yourself, signed, for the thing you keep waiting for someone else to authorize. "I give myself permission to ___." Then answer: who did you think had to sign this instead of you?`,
        quote:`Most of us are waiting for a permission that was never going to come from the outside. You are the only signature that was ever required.` },
    ],
  },
  {
    num: 'III', roman: 'Three', title: 'Voice &amp; Narrative',
    intro: `You can't become someone new in a voice that belongs to your old self. This part is about how you sound &#8212; to yourself, on the page, out loud.`,
    exercises: [
      { n:11, t:'Your Unedited Voice',
        instr:`Set a timer for five minutes. Write about your day with zero editing. Read it back and highlight the three phrases that sound most like <em>you</em> and least like a LinkedIn post. That's your raw voice. We're going to keep it.` },
      { n:12, t:`The Words That Aren't Yours`,
        instr:`List words and phrases you use because they sound professional, safe, or expected &#8212; but that you secretly hate. ("Circle back." "I'm passionate about.") Cross them out. Write what you'd say instead if you trusted yourself.` },
      { n:13, t:'Describe Yourself Without the R&#233;sum&#233;',
        instr:`Introduce yourself in three sentences without mentioning your job, your accomplishments, or anyone you're related to. Who are you when the credentials are off the table? That difficulty is the assignment.` },
      { n:14, t:'The Letter From the Future You',
        instr:`Write a letter to yourself from the version of you two years into the reinvention &#8212; the one who already made it through this gap. What does she want you to stop apologizing for? Let her be kind and a little impatient.`,
        ex:`"Dear you &#8212; stop drafting the email seventeen times. She presses send. That's the whole difference between us. Also: you were right about the thing you talked yourself out of. Go back to it."` },
      { n:15, t:'Your One Sentence',
        instr:`Reinvention needs a thesis. Write the single sentence that captures who you're becoming. Not a job title. A stance. Revise it ten times. The tenth one is usually the real one.`,
        ex:`Draft 1: "I want to be a writer who helps people." Draft 10: "I help people rewrite the story they were handed into one they'd actually sign."` },
      { n:16, t:'The Anti-Mission Statement',
        instr:`Write down everything you're <em>not</em> doing anymore. The relationships, the apologies, the shrinking, the roles. Naming what you're leaving behind is as defining as naming what you're walking toward.` },
    ],
  },
  {
    num: 'IV', roman: 'Four', title: 'Building the New Draft',
    intro: `You've audited the old and found your voice. Now you write forward.`,
    exercises: [
      { n:17, t:'The Reinvention Inventory, Revisited',
        instr:`Return to your <em>cut</em> and <em>unsure</em> list from Exercise 1. For each one you're ready to cut, write the small first action that begins the cut. Not the dramatic gesture &#8212; the quiet first move.` },
      { n:18, t:'One Brave Sentence a Day',
        instr:`For the next seven days, write one true sentence each morning that the old you wouldn't have written. By day seven, read them in order. You'll see a person changing in real time.`,
        ex:`"I'm allowed to want more." / "I told her no and survived it." / "My work is good even when no one claps." / "I'm not behind. I'm rerouting."`,
        days:true },
      { n:19, t:'The Identity Rehearsal',
        instr:`Pick one trait of the person you're becoming. Spend one full day acting as if it's already settled fact, then write what happened. We rehearse the new self into existence before we believe in it &#8212; belief is the last thing to arrive, not the first.` },
      { n:20, t:'The Closing Manifesto',
        instr:`Using everything in this workbook &#8212; your one sentence, your anti-mission, your true lines, your future self's letter &#8212; write a one-page manifesto for who you are now. Present tense. No hedging. Read it out loud.`,
        quote:`You were never broken. You were a first draft. And the best thing about a draft is that it was always meant to be revised.` },
    ],
  },
];

// ── build part-opener + exercise pages ───────────────────────────
parts.forEach((part, pi) => {
  // part opener
  addPage(`part${pi+1}`, `part${pi+1}.xhtml`, `Part ${part.num} — ${part.title}`, `
<div class="part-opener">
  <div class="part-num">${part.num}</div>
  <p class="eyebrow">Part ${part.roman}</p>
  <h2 class="chapter">${part.title}</h2>
  <div class="rule"></div>
  <p style="max-width:34ch; margin:0 auto; color:#B0B0B0;">${part.intro}</p>
</div>`);

  // exercises grouped per part into one file each (keeps nav clean)
  let body = `<p class="eyebrow">Part ${part.roman} &#183; ${part.title}</p>`;
  part.exercises.forEach((ex) => {
    body += `\n<h3 class="exercise">Exercise ${ex.n} &#8212; ${ex.t}</h3>\n`;
    body += `<p><span class="instr-tag">Instructions</span>${ex.instr}</p>\n`;
    if (ex.ex) body += `<div class="example"><span class="label">Example</span>${ex.ex}</div>\n`;
    if (ex.after) body += `<p>${ex.after}</p>\n`;
    if (ex.quote) body += `<blockquote>${ex.quote}</blockquote>\n`;
    if (ex.days) {
      for (let d=1; d<=7; d++) body += response(`Day ${d}`);
    } else {
      body += response('Your response', 'Write here&#8230;');
    }
  });
  addPage(`ex-part${pi+1}`, `exercises${pi+1}.xhtml`, `Part ${part.num} — Exercises`, body);
});

// ── CLOSING ──────────────────────────────────────────────────────
addPage('closing', 'closing.xhtml', 'Keep Going', `
<p class="eyebrow">After the Work</p>
<h2 class="chapter">Keep Going</h2>
<p>Reinvention isn't a weekend. It's a practice, and practices need company.</p>
<p>If the excavation in Parts One and Two opened something tender &#8212; especially if the old story was written by someone who hurt you &#8212; read <strong>The Invisible Bruise</strong>, which sits with that wound directly.</p>
<p>If you're ready to take your new voice public &#8212; into your bio, your brand, the rooms you want to be in &#8212; <strong>Write Yourself Into the Room</strong> is the next step.</p>
<p>Find more writing, essays, and tools at <strong>mkparrish.com</strong>.</p>
<hr class="divider"/>
<div class="closing">
  <p class="final-line">You picked up the pen.<br/>That was always the hardest part.</p>
  <p class="byline">&#8212; MK Parrish</p>
  <p style="color:#4A4A4A; font-size:0.85em;">mkparrish.com</p>
</div>`);

// ── NAV (EPUB3) ──────────────────────────────────────────────────
const navItems = files
  .filter(f => !['cover','titlepage','copyright'].includes(f.id))
  .map(f => `<li><a href="${f.href}">${f.title}</a></li>`)
  .join('\n      ');
fs.writeFileSync(path.join(BUILD, 'OEBPS/nav.xhtml'),
`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="en" lang="en">
<head><meta charset="utf-8"/><title>Contents</title><link rel="stylesheet" type="text/css" href="style.css"/></head>
<body>
  <nav epub:type="toc" id="toc">
    <h2 class="section">Contents</h2>
    <ol>
      ${navItems}
    </ol>
  </nav>
</body>
</html>`);

// ── NCX (EPUB2 fallback) ─────────────────────────────────────────
const navPoints = files.map((f, i) =>
`    <navPoint id="np${i+1}" playOrder="${i+1}">
      <navLabel><text>${f.title}</text></navLabel>
      <content src="${f.href}"/>
    </navPoint>`).join('\n');
fs.writeFileSync(path.join(BUILD, 'OEBPS/toc.ncx'),
`<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid" content="urn:uuid:mkparrish-reinvention-workbook"/>
  </head>
  <docTitle><text>The Reinvention Workbook</text></docTitle>
  <navMap>
${navPoints}
  </navMap>
</ncx>`);

// ── OPF ──────────────────────────────────────────────────────────
const manifestItems = files.map(f =>
  `    <item id="${f.id}" href="${f.href}" media-type="application/xhtml+xml"/>`).join('\n');
const spineItems = files.map(f => `    <itemref idref="${f.id}"/>`).join('\n');

fs.writeFileSync(path.join(BUILD, 'OEBPS/content.opf'),
`<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid" xml:lang="en">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="bookid">urn:uuid:mkparrish-reinvention-workbook</dc:identifier>
    <dc:title>The Reinvention Workbook</dc:title>
    <dc:creator>MK Parrish</dc:creator>
    <dc:language>en</dc:language>
    <dc:publisher>MK Parrish</dc:publisher>
    <dc:description>A guided writing workbook for people in the middle of becoming someone new.</dc:description>
    <meta property="dcterms:modified">2024-01-01T00:00:00Z</meta>
  </metadata>
  <manifest>
    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
    <item id="css" href="style.css" media-type="text/css"/>
    <item id="f-bebas" href="fonts/BebasNeue.ttf" media-type="font/ttf"/>
    <item id="f-dmsans" href="fonts/DMSans.ttf" media-type="font/ttf"/>
    <item id="f-playfair" href="fonts/PlayfairDisplay.ttf" media-type="font/ttf"/>
    <item id="f-playfair-i" href="fonts/PlayfairItalic.ttf" media-type="font/ttf"/>
${manifestItems}
  </manifest>
  <spine toc="ncx">
${spineItems}
  </spine>
</package>`);

// ── ZIP (mimetype first, stored) ─────────────────────────────────
execSync(`rm -f ${OUT}`);
execSync(`cd ${BUILD} && zip -X -0 -q ${OUT} mimetype && zip -X -9 -rq ${OUT} META-INF OEBPS`);

const size = (fs.statSync(OUT).size / 1024).toFixed(0);
console.log(`EPUB built: ${OUT}`);
console.log(`Pages/sections: ${files.length}  Size: ${size}kb`);
