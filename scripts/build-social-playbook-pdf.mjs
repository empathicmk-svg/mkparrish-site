#!/usr/bin/env node
/**
 * Generates The Social Strategy Playbook PDF
 * Output: public/downloads/templates/the-social-strategy-playbook.pdf
 * Run:    node scripts/build-social-playbook-pdf.mjs
 */
import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, '..', 'public', 'downloads', 'templates');
fs.mkdirSync(OUT_DIR, { recursive: true });
const OUT = path.join(OUT_DIR, 'the-social-strategy-playbook.pdf');

const FONTS = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital,wght@0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
`;

const VOID   = '#080808';
const PETAL  = '#F2AFC6';
const PEARL  = '#F0F0EE';
const SMOKE  = '#B0B0B0';
const ASH    = '#7A7A7A';
const GRAPH  = '#1A1A1A';
const CARBON = '#111111';

const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  ${FONTS}
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    html, body {
      background: ${VOID};
      color: ${PEARL};
      font-family: 'DM Sans', sans-serif;
      font-size: 10pt;
      line-height: 1.7;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* ── Layout ── */
    .page {
      width: 100%;
      max-width: 760px;
      margin: 0 auto;
      padding: 64px 64px;
    }

    /* ── Cover ── */
    .cover {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 80px 64px;
      background: ${VOID};
      position: relative;
      page-break-after: always;
    }
    .cover-glow {
      position: absolute;
      top: -100px; left: 50%;
      transform: translateX(-50%);
      width: 900px; height: 700px;
      background: radial-gradient(ellipse at center,
        rgba(242,175,198,0.18) 0%,
        rgba(242,175,198,0.04) 40%,
        transparent 65%);
      pointer-events: none;
    }
    .cover-eyebrow {
      font-family: 'DM Sans', sans-serif;
      font-size: 9pt;
      font-weight: 600;
      letter-spacing: 0.38em;
      text-transform: uppercase;
      color: ${ASH};
      position: relative;
    }
    .cover-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 80pt;
      line-height: 0.88;
      letter-spacing: 0.02em;
      color: ${PEARL};
      position: relative;
    }
    .cover-title .pink {
      color: ${PETAL};
      text-shadow: 0 0 40px rgba(242,175,198,0.5);
    }
    .cover-rule {
      width: 64px; height: 3px;
      background: ${PETAL};
      margin: 32px 0;
      position: relative;
    }
    .cover-subtitle {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 15pt;
      color: rgba(242,175,198,0.85);
      max-width: 46ch;
      line-height: 1.5;
      position: relative;
    }
    .cover-desc {
      font-family: 'DM Sans', sans-serif;
      font-weight: 300;
      font-size: 10pt;
      color: ${SMOKE};
      max-width: 58ch;
      line-height: 1.8;
      margin-top: 20px;
      position: relative;
    }
    .cover-footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      position: relative;
    }
    .cover-brand {
      font-family: 'DM Sans', sans-serif;
      font-size: 8pt;
      font-weight: 500;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: rgba(176,176,176,0.35);
    }
    .cover-sig {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 13pt;
      color: rgba(242,175,198,0.65);
    }

    /* ── Section pages ── */
    .section {
      padding: 64px 64px 48px;
      page-break-before: always;
    }

    .section-num {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 9pt;
      letter-spacing: 0.36em;
      color: rgba(242,175,198,0.4);
      margin-bottom: 8px;
    }
    .section-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 36pt;
      line-height: 0.92;
      letter-spacing: 0.02em;
      color: ${PEARL};
      margin-bottom: 6px;
    }
    .section-title .pink { color: ${PETAL}; }
    .section-rule {
      width: 36px; height: 2px;
      background: ${PETAL};
      margin: 20px 0 28px;
      opacity: 0.7;
    }
    .section-intro {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 12pt;
      color: rgba(242,175,198,0.8);
      max-width: 54ch;
      line-height: 1.6;
      margin-bottom: 32px;
    }

    /* ── Body text ── */
    p {
      font-family: 'DM Sans', sans-serif;
      font-weight: 300;
      font-size: 10pt;
      color: ${SMOKE};
      line-height: 1.85;
      max-width: 66ch;
      margin-bottom: 16px;
    }
    p strong {
      font-weight: 600;
      color: ${PEARL};
    }

    /* ── Callout blocks ── */
    .callout {
      border-left: 2px solid ${PETAL};
      padding: 16px 20px;
      margin: 24px 0;
      background: rgba(242,175,198,0.04);
    }
    .callout p {
      margin: 0;
      color: rgba(242,175,198,0.85);
      font-style: italic;
    }

    /* ── Sub-headers ── */
    h3 {
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      font-size: 10pt;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      color: ${PETAL};
      margin: 32px 0 10px;
    }
    h4 {
      font-family: 'Playfair Display', serif;
      font-size: 13pt;
      font-weight: 500;
      color: ${PEARL};
      margin: 24px 0 8px;
    }

    /* ── Lists ── */
    ul, ol {
      padding-left: 0;
      margin: 12px 0 20px;
      list-style: none;
    }
    li {
      font-family: 'DM Sans', sans-serif;
      font-weight: 300;
      font-size: 10pt;
      color: ${SMOKE};
      line-height: 1.8;
      padding-left: 18px;
      position: relative;
      margin-bottom: 6px;
      max-width: 66ch;
    }
    li::before {
      content: '';
      position: absolute;
      left: 0; top: 10px;
      width: 5px; height: 5px;
      background: ${PETAL};
      opacity: 0.7;
    }
    ol { counter-reset: item; }
    ol li { counter-increment: item; }
    ol li::before {
      content: counter(item);
      font-family: 'Bebas Neue', sans-serif;
      font-size: 9pt;
      letter-spacing: 0.1em;
      color: ${PETAL};
      background: none;
      width: auto; height: auto;
      top: 1px; left: 0;
    }

    /* ── Grid boxes ── */
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2px;
      margin: 24px 0;
    }
    .grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 2px;
      margin: 24px 0;
    }
    .box {
      background: ${CARBON};
      padding: 20px;
    }
    .box-label {
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      font-size: 8pt;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: ${PETAL};
      margin-bottom: 8px;
      display: block;
    }
    .box p {
      font-size: 9pt;
      margin: 0;
      color: ${SMOKE};
      max-width: none;
    }
    .box h4 {
      font-size: 11pt;
      margin: 0 0 6px;
    }
    .box ul { margin: 8px 0 0; }
    .box li { font-size: 9pt; max-width: none; }

    /* ── Worksheet / fill-in ── */
    .worksheet {
      background: ${CARBON};
      border: 1px solid rgba(242,175,198,0.12);
      padding: 28px 28px;
      margin: 24px 0;
    }
    .worksheet h4 {
      margin-top: 0;
    }
    .fill-line {
      border-bottom: 1px solid rgba(176,176,176,0.15);
      min-height: 28px;
      margin: 10px 0;
    }
    .fill-label {
      font-family: 'DM Sans', sans-serif;
      font-size: 8pt;
      font-weight: 500;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: ${ASH};
      margin-bottom: 4px;
      display: block;
    }

    /* ── Calendar grid ── */
    .cal-week {
      display: grid;
      grid-template-columns: 60px repeat(7, 1fr);
      gap: 1px;
      margin: 4px 0;
    }
    .cal-header {
      font-family: 'DM Sans', sans-serif;
      font-size: 7pt;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: ${ASH};
      padding: 6px 4px;
      text-align: center;
      background: ${CARBON};
    }
    .cal-week-label {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 9pt;
      letter-spacing: 0.1em;
      color: ${PETAL};
      background: rgba(242,175,198,0.06);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .cal-cell {
      background: ${CARBON};
      padding: 6px 5px;
      min-height: 48px;
      font-family: 'DM Sans', sans-serif;
      font-size: 7.5pt;
      font-weight: 300;
      color: ${SMOKE};
      line-height: 1.4;
    }
    .cal-cell.pink-bg {
      background: rgba(242,175,198,0.06);
    }
    .cal-cell strong {
      display: block;
      font-size: 7pt;
      font-weight: 600;
      color: ${PETAL};
      margin-bottom: 2px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    /* ── Hook table ── */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    th {
      font-family: 'DM Sans', sans-serif;
      font-size: 8pt;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: ${PETAL};
      text-align: left;
      padding: 10px 12px;
      background: ${CARBON};
      border-bottom: 1px solid rgba(242,175,198,0.15);
    }
    td {
      font-family: 'DM Sans', sans-serif;
      font-size: 9pt;
      font-weight: 300;
      color: ${SMOKE};
      padding: 10px 12px;
      background: rgba(255,255,255,0.02);
      border-bottom: 1px solid rgba(255,255,255,0.04);
      vertical-align: top;
      line-height: 1.6;
    }
    td:first-child {
      color: ${PEARL};
      font-weight: 500;
      width: 28%;
    }

    /* ── Final page ── */
    .final {
      page-break-before: always;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 80px 64px;
      position: relative;
    }
    .final-glow {
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      width: 700px; height: 500px;
      background: radial-gradient(ellipse at center,
        rgba(242,175,198,0.14) 0%, transparent 65%);
      pointer-events: none;
    }
    .final-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 48pt;
      color: ${PEARL};
      letter-spacing: 0.04em;
      position: relative;
    }
    .final-rule {
      width: 48px; height: 2px;
      background: ${PETAL};
      margin: 24px auto;
      position: relative;
    }
    .final-quote {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: 14pt;
      color: rgba(242,175,198,0.82);
      max-width: 46ch;
      line-height: 1.6;
      position: relative;
    }
    .final-sig {
      margin-top: 32px;
      font-family: 'DM Sans', sans-serif;
      font-size: 9pt;
      font-weight: 400;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      color: ${ASH};
      position: relative;
    }
    .final-url {
      margin-top: 8px;
      font-family: 'DM Sans', sans-serif;
      font-size: 8pt;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: rgba(176,176,176,0.3);
      position: relative;
    }

    /* ── Page numbers (footer) ── */
    .page-footer {
      margin-top: 48px;
      padding-top: 16px;
      border-top: 1px solid rgba(255,255,255,0.06);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .page-footer span {
      font-family: 'DM Sans', sans-serif;
      font-size: 7.5pt;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: rgba(176,176,176,0.25);
    }
  </style>
</head>
<body>

<!-- ═══════════════════════════════════════════ COVER ══ -->
<div class="cover">
  <div class="cover-glow"></div>

  <div class="cover-eyebrow">MK Parrish · DIY Consulting Frameworks</div>

  <div>
    <div class="cover-title">THE SOCIAL<br><span class="pink">STRATEGY</span><br>PLAYBOOK</div>
    <div class="cover-rule"></div>
    <div class="cover-subtitle">Build a content strategy you'll actually use — the self-guided framework behind The Social Suite.</div>
    <div class="cover-desc">For founders and thought leaders who know they need to show up online — and finally want a repeatable system for it. The exact content strategy framework behind The Social Suite, documented for self-study.</div>
  </div>

  <div class="cover-footer">
    <div class="cover-brand">mkparrish.com</div>
    <div class="cover-sig">♡ — MK</div>
  </div>
</div>

<!-- ═══════════════════════════════════════════ INTRO ══ -->
<div class="section">
  <div class="section-num">00 · Introduction</div>
  <div class="section-title">HOW TO USE <span class="pink">THIS</span></div>
  <div class="section-rule"></div>
  <div class="section-intro">This isn't a content calendar. It's a strategy system.</div>

  <p>Most content advice tells you <strong>what</strong> to post. This playbook tells you <strong>why</strong> — and builds the infrastructure around that why so you're never staring at a blank screen again.</p>

  <p>The Social Suite is my done-for-you content strategy service. This playbook is the self-guided version: the same method, documented step by step, designed for the person who wants to run the process themselves.</p>

  <p>Work through it in order. Don't skip Part 1. The content pillars are the foundation — everything else builds on them. If you try to jump to the 30-day sprint without knowing your pillars, you'll produce content that looks fine but doesn't <em>work</em>.</p>

  <div class="callout"><p>"Strategy is deciding what you're willing to say no to. Content strategy is the same thing."</p></div>

  <h3>What's inside</h3>
  <ul>
    <li><strong>Part 1:</strong> Content Pillar Framework — what to say and why it builds authority</li>
    <li><strong>Part 2:</strong> Brand Voice Calibration — how to show up on Instagram, LinkedIn, and TikTok without sounding like three different people</li>
    <li><strong>Part 3:</strong> The 30-Day Content Sprint — a structured system for showing up consistently</li>
    <li><strong>Part 4:</strong> Templates — captions, hooks, post structures, and a posting system that doesn't depend on inspiration</li>
  </ul>

  <h3>Before you start</h3>
  <p>Set aside 90 minutes to work through Parts 1 and 2. You'll need a notes doc open and a willingness to be honest about what you actually want to be known for. The rest of the playbook follows from that clarity.</p>

  <div class="page-footer">
    <span>The Social Strategy Playbook · mkparrish.com</span>
    <span>Introduction</span>
  </div>
</div>

<!-- ══════════════════════════════════════ PART 1 ══ -->
<div class="section">
  <div class="section-num">01 · Content Pillars</div>
  <div class="section-title">WHAT YOU <span class="pink">STAND FOR</span></div>
  <div class="section-rule"></div>
  <div class="section-intro">Content pillars are the 3–5 topics you return to consistently. They're how you become known for something.</div>

  <p>Most people post randomly and wonder why their audience doesn't grow. The answer is almost always the same: there's no through-line. No reason for someone to follow you beyond what you just posted.</p>

  <p>Content pillars fix that. They create a coherent identity in the feed — and they make content creation dramatically easier because you're never deciding <em>what</em> to post, only <em>which pillar</em> you're drawing from today.</p>

  <h3>The three types of pillars</h3>
  <div class="grid-3">
    <div class="box">
      <span class="box-label">Authority</span>
      <h4>What you know</h4>
      <p>Your professional expertise. The thing people should hire you for. This builds credibility and positions you as the go-to.</p>
    </div>
    <div class="box">
      <span class="box-label">Perspective</span>
      <h4>What you believe</h4>
      <p>Your point of view on your industry. Hot takes, contrarian positions, things you'd say on stage. This builds loyalty.</p>
    </div>
    <div class="box">
      <span class="box-label">Story</span>
      <h4>Who you are</h4>
      <p>Behind the work. Values, process, life. This builds trust and makes you a person, not just a service provider.</p>
    </div>
  </div>

  <p>Every strong content strategy has at least one pillar from each type. You don't need to post equally across all three — but you need all three represented over time.</p>

  <h3>Identifying your pillars</h3>
  <p>Start here: <strong>What are the three questions people should come to you to answer?</strong> Not the questions they do ask — the questions they should. These become your authority pillars.</p>
  <p>Then: <strong>What do most people in your industry get wrong?</strong> Your answer becomes a perspective pillar.</p>
  <p>Finally: <strong>What's the behind-the-scenes of your work that would genuinely surprise people?</strong> That's your story pillar.</p>

  <h3>Pillar identification worksheet</h3>
  <div class="worksheet">
    <h4>Your Three Core Pillars</h4>
    <p style="font-size:9pt; margin-bottom:20px; color:${ASH};">Write a one-sentence definition for each pillar. The test: could you name 10 posts you could make from this pillar today?</p>

    <span class="fill-label">Pillar 1 — Authority (What you know)</span>
    <div class="fill-line"></div>
    <div class="fill-line"></div>
    <p style="font-size:8pt; color:${ASH}; margin: 4px 0 20px;">Example: "The real cost breakdown behind launching a website — what agencies don't tell you"</p>

    <span class="fill-label">Pillar 2 — Perspective (What you believe)</span>
    <div class="fill-line"></div>
    <div class="fill-line"></div>
    <p style="font-size:8pt; color:${ASH}; margin: 4px 0 20px;">Example: "Most founders don't have a visibility problem — they have a clarity problem"</p>

    <span class="fill-label">Pillar 3 — Story (Who you are)</span>
    <div class="fill-line"></div>
    <div class="fill-line"></div>
    <p style="font-size:8pt; color:${ASH}; margin: 4px 0 0;">Example: "What building a business actually looks like when you're doing it without a roadmap"</p>
  </div>

  <h3>Pillar ratio</h3>
  <p>A useful starting ratio: <strong>50% Authority · 30% Perspective · 20% Story.</strong> This positions you as the expert while making you human. Adjust as you find what resonates — but don't drop below 20% on any type for more than two weeks running.</p>

  <div class="callout"><p>The test for a good pillar: you should be able to name 10 posts from it in under five minutes. If you can't, the pillar is too broad or too vague.</p></div>

  <h3>What pillars are not</h3>
  <p>Pillars are not topics. "Marketing" is not a pillar — it's a category. "Why most small business marketing fails before it starts" is a pillar. The difference is specificity and point of view. Bland pillars produce bland content. Sharp pillars produce content that gets saved and shared.</p>

  <div class="page-footer">
    <span>The Social Strategy Playbook · mkparrish.com</span>
    <span>Part 01 · Content Pillars</span>
  </div>
</div>

<!-- ══════════════════════════════════════ PART 2 ══ -->
<div class="section">
  <div class="section-num">02 · Brand Voice</div>
  <div class="section-title">HOW YOU <span class="pink">SOUND</span></div>
  <div class="section-rule"></div>
  <div class="section-intro">Your voice is the same everywhere. The format changes. The tone adapts. The voice stays.</div>

  <p>The biggest mistake founders make on social is treating each platform as a separate identity. They're professional on LinkedIn, casual on Instagram, and trying to be "authentic" on TikTok — and none of it feels like the same person.</p>

  <p>Brand voice isn't about picking an adjective list. It's about having a clear enough point of view that it comes through no matter the format.</p>

  <h3>Define your through-line first</h3>
  <div class="worksheet">
    <h4>Your Core Voice Statement</h4>
    <p style="font-size:9pt; margin-bottom:20px; color:${ASH};">Complete this sentence: "I want people to feel _____ after consuming my content, because I believe _____."</p>
    <span class="fill-label">I want people to feel...</span>
    <div class="fill-line"></div>
    <span class="fill-label" style="margin-top:16px;">Because I believe...</span>
    <div class="fill-line"></div>
    <div class="fill-line"></div>
  </div>

  <p>That statement is your filter. Every piece of content you create should pass through it. If a post doesn't make someone feel that thing or reinforce that belief — it's off-brand, even if it performs.</p>

  <h3>Platform calibration</h3>

  <h4>Instagram</h4>
  <p>Instagram is a visual-first platform where the image earns the stop and the caption earns the follow. Your voice here should be <strong>intimate and considered</strong> — like talking to one person, not broadcasting to a crowd.</p>
  <div class="grid-2">
    <div class="box">
      <span class="box-label">Caption structure</span>
      <ul>
        <li>Line 1: The hook (make it impossible to scroll past)</li>
        <li>Lines 2–5: The story or the point</li>
        <li>Line 6–7: The pull — what they should take away</li>
        <li>Line 8: CTA (save this, share this, tell me)</li>
      </ul>
    </div>
    <div class="box">
      <span class="box-label">Voice notes</span>
      <ul>
        <li>Short sentences. White space is your friend.</li>
        <li>First-person, present tense</li>
        <li>No jargon — clarity over credential-signaling</li>
        <li>End with a question or an invitation</li>
      </ul>
    </div>
  </div>

  <h4>LinkedIn</h4>
  <p>LinkedIn rewards expertise and <strong>professional storytelling</strong>. The algorithm favors posts that get comments — so write in a way that opens a conversation, not closes one.</p>
  <div class="grid-2">
    <div class="box">
      <span class="box-label">Post structure</span>
      <ul>
        <li>Line 1: A bold, specific claim</li>
        <li>Lines 2–8: Three points or one story</li>
        <li>The turn: what this means for the reader</li>
        <li>Close: one direct question</li>
      </ul>
    </div>
    <div class="box">
      <span class="box-label">Voice notes</span>
      <ul>
        <li>More formal than Instagram, less formal than you think</li>
        <li>Data or named experience as credibility anchors</li>
        <li>Avoid empty affirmations — be specific</li>
        <li>Use line breaks aggressively for readability</li>
      </ul>
    </div>
  </div>

  <h4>TikTok</h4>
  <p>TikTok is hook-first, always. The first 2 seconds determine everything. Your voice here should be <strong>direct and unpolished-in-a-deliberate-way</strong> — production value is less important than clarity and energy.</p>
  <div class="grid-2">
    <div class="box">
      <span class="box-label">Video structure</span>
      <ul>
        <li>0–2s: The hook (state the value immediately)</li>
        <li>3–15s: The setup or problem</li>
        <li>15–45s: The content / the answer</li>
        <li>Last 5s: CTA (follow, save, part 2)</li>
      </ul>
    </div>
    <div class="box">
      <span class="box-label">Voice notes</span>
      <ul>
        <li>Talk to the camera like a person, not a presenter</li>
        <li>Speed is energy — don't be slow</li>
        <li>Controversial-but-true performs best</li>
        <li>Captions matter — not everyone watches with sound</li>
      </ul>
    </div>
  </div>

  <h3>The platform translation test</h3>
  <p>Take one idea from your content pillars. Write it as an Instagram caption, a LinkedIn post, and a TikTok hook. If all three feel like the same person said them — just in different contexts — your voice is calibrated. If they feel like three different brands, go back to your core voice statement.</p>

  <div class="worksheet">
    <h4>Translation Exercise</h4>
    <p style="font-size:9pt; margin-bottom:20px; color:${ASH};">Pick one idea from your pillars. Write it for each platform below.</p>
    <span class="fill-label">The core idea:</span>
    <div class="fill-line"></div>
    <span class="fill-label" style="margin-top:16px;">Instagram caption hook (first line only):</span>
    <div class="fill-line"></div>
    <span class="fill-label" style="margin-top:16px;">LinkedIn opening line:</span>
    <div class="fill-line"></div>
    <span class="fill-label" style="margin-top:16px;">TikTok 2-second hook (what you'd say out loud first):</span>
    <div class="fill-line"></div>
  </div>

  <div class="page-footer">
    <span>The Social Strategy Playbook · mkparrish.com</span>
    <span>Part 02 · Brand Voice</span>
  </div>
</div>

<!-- ══════════════════════════════════════ PART 3 ══ -->
<div class="section">
  <div class="section-num">03 · The 30-Day Sprint</div>
  <div class="section-title">THE <span class="pink">SYSTEM</span></div>
  <div class="section-rule"></div>
  <div class="section-intro">Consistency isn't a personality trait. It's a system. This is the system.</div>

  <p>The sprint is designed to get you from zero to a functioning content rhythm in 30 days. Not perfect content — <em>consistent</em> content. Perfect content that never ships is worth nothing.</p>

  <p>Each week has a focus. Work the focus, not the perfection.</p>

  <h3>Before you start: the audit (day 0)</h3>
  <p>Before Week 1, spend 20 minutes doing a quick audit. Pull up your current profiles and answer honestly:</p>
  <ul>
    <li>Does my bio clearly state who I help and how?</li>
    <li>Does my last 9 posts reflect my pillars?</li>
    <li>Is there a consistent visual identity?</li>
    <li>What post got the most engagement — and why?</li>
  </ul>
  <p>Don't fix everything. Just note it. The sprint will address most of it naturally.</p>

  <div class="grid-2" style="margin-top:28px;">
    <div class="box">
      <span class="box-label">Week 1 · Foundation</span>
      <h4>Set the stage</h4>
      <ul>
        <li>Finalize your 3 pillars</li>
        <li>Rewrite your bio on each active platform</li>
        <li>Plan 12 posts (4 per pillar)</li>
        <li>Write and schedule the first 4</li>
        <li>Engage: 15 min/day responding to others in your space</li>
      </ul>
    </div>
    <div class="box">
      <span class="box-label">Week 2 · Creation</span>
      <h4>Build the bank</h4>
      <ul>
        <li>Batch-create 8 pieces of content in one session</li>
        <li>Use the caption structure from Part 2</li>
        <li>Schedule them across the week</li>
        <li>Note what you find easiest to write — that's signal</li>
        <li>Engage: 15 min/day, focus on comments</li>
      </ul>
    </div>
    <div class="box">
      <span class="box-label">Week 3 · Momentum</span>
      <h4>Publish and listen</h4>
      <ul>
        <li>Post daily (or your target cadence)</li>
        <li>Reply to every comment within 2 hours</li>
        <li>Reshare one piece on a second platform</li>
        <li>Identify your top-performing post so far</li>
        <li>Write a follow-up or expansion of that post</li>
      </ul>
    </div>
    <div class="box">
      <span class="box-label">Week 4 · Review</span>
      <h4>Iterate and lock in</h4>
      <ul>
        <li>Review analytics: reach, saves, new follows</li>
        <li>Identify which pillar performed best</li>
        <li>Double down on that format or angle next month</li>
        <li>Build your Month 2 content plan</li>
        <li>Set your sustainable weekly posting target</li>
      </ul>
    </div>
  </div>

  <h3>Daily content calendar — 30 days</h3>
  <p style="font-size:9pt; color:${ASH}; margin-bottom:16px;">A = Authority · P = Perspective · S = Story · R = Repurpose/Engage</p>

  <!-- Calendar header -->
  <div class="cal-week">
    <div class="cal-header"></div>
    <div class="cal-header">Mon</div>
    <div class="cal-header">Tue</div>
    <div class="cal-header">Wed</div>
    <div class="cal-header">Thu</div>
    <div class="cal-header">Fri</div>
    <div class="cal-header">Sat</div>
    <div class="cal-header">Sun</div>
  </div>
  <!-- Week 1 -->
  <div class="cal-week">
    <div class="cal-cell cal-week-label">WK 1</div>
    <div class="cal-cell pink-bg"><strong>A</strong>Bio rewrite + intro post</div>
    <div class="cal-cell"><strong>P</strong>Your controversial take</div>
    <div class="cal-cell pink-bg"><strong>A</strong>How-to or framework</div>
    <div class="cal-cell"><strong>S</strong>Behind the work</div>
    <div class="cal-cell pink-bg"><strong>A</strong>FAQ you always answer</div>
    <div class="cal-cell"><strong>R</strong>Engage + reshare</div>
    <div class="cal-cell">Rest / plan</div>
  </div>
  <!-- Week 2 -->
  <div class="cal-week">
    <div class="cal-cell cal-week-label">WK 2</div>
    <div class="cal-cell pink-bg"><strong>P</strong>What others get wrong</div>
    <div class="cal-cell"><strong>A</strong>Mini case study</div>
    <div class="cal-cell pink-bg"><strong>S</strong>Why you started</div>
    <div class="cal-cell"><strong>A</strong>Step-by-step tip</div>
    <div class="cal-cell pink-bg"><strong>P</strong>Industry myth-bust</div>
    <div class="cal-cell"><strong>R</strong>Repurpose top post</div>
    <div class="cal-cell">Rest / batch</div>
  </div>
  <!-- Week 3 -->
  <div class="cal-week">
    <div class="cal-cell cal-week-label">WK 3</div>
    <div class="cal-cell pink-bg"><strong>A</strong>Lesson learned</div>
    <div class="cal-cell"><strong>S</strong>A real moment</div>
    <div class="cal-cell pink-bg"><strong>P</strong>Unpopular truth</div>
    <div class="cal-cell"><strong>A</strong>Resource or tool you use</div>
    <div class="cal-cell pink-bg"><strong>S</strong>What's working now</div>
    <div class="cal-cell"><strong>R</strong>Engage · thank followers</div>
    <div class="cal-cell">Rest / review</div>
  </div>
  <!-- Week 4 -->
  <div class="cal-week">
    <div class="cal-cell cal-week-label">WK 4</div>
    <div class="cal-cell pink-bg"><strong>A</strong>Your signature framework</div>
    <div class="cal-cell"><strong>P</strong>What I'd do differently</div>
    <div class="cal-cell pink-bg"><strong>S</strong>Month-end reflection</div>
    <div class="cal-cell"><strong>A</strong>Top question answered</div>
    <div class="cal-cell pink-bg"><strong>P</strong>What's next / teaser</div>
    <div class="cal-cell"><strong>R</strong>Analytics review</div>
    <div class="cal-cell">Plan Month 2</div>
  </div>

  <div class="callout" style="margin-top:28px;"><p>The goal of the sprint is not 30 perfect posts. It's learning what resonates for your specific audience and building a habit. Imperfect content that ships is always worth more than perfect content that doesn't.</p></div>

  <div class="page-footer">
    <span>The Social Strategy Playbook · mkparrish.com</span>
    <span>Part 03 · The 30-Day Sprint</span>
  </div>
</div>

<!-- ══════════════════════════════════════ PART 4 ══ -->
<div class="section">
  <div class="section-num">04 · Templates</div>
  <div class="section-title">THE <span class="pink">TOOLKIT</span></div>
  <div class="section-rule"></div>
  <div class="section-intro">Use these when you're blank. Adapt them until they sound like you. Then throw them away.</div>

  <h3>TikTok &amp; Reel hook formulas</h3>
  <table>
    <tr>
      <th>Hook type</th>
      <th>Formula</th>
      <th>Example</th>
    </tr>
    <tr>
      <td>The Myth-Bust</td>
      <td>[Common belief] is a lie. Here's what's actually true.</td>
      <td>"Posting every day is a lie. Here's what actually grows your account."</td>
    </tr>
    <tr>
      <td>The Number</td>
      <td>[Number] things [audience] doesn't know about [topic].</td>
      <td>"3 things founders don't know about personal branding until it's too late."</td>
    </tr>
    <tr>
      <td>The Warning</td>
      <td>If you're doing [X], stop. Here's why.</td>
      <td>"If you're posting without a content strategy, stop. Here's why it's hurting you."</td>
    </tr>
    <tr>
      <td>The POV</td>
      <td>POV: You finally [desirable outcome].</td>
      <td>"POV: You finally have a content strategy that doesn't make you want to quit."</td>
    </tr>
    <tr>
      <td>The Result</td>
      <td>I [did X] for [time period]. Here's what happened.</td>
      <td>"I posted every day for 90 days. Here's what actually changed."</td>
    </tr>
    <tr>
      <td>The Direct Ask</td>
      <td>Watch this if you [situation].</td>
      <td>"Watch this if you're a founder who hates creating content but knows you have to."</td>
    </tr>
  </table>

  <h3>Instagram caption templates</h3>

  <h4>Template A — The Teaching Post</h4>
  <div class="box" style="margin-bottom:12px;">
    <p style="font-family: 'DM Sans'; font-size:9pt; color:${SMOKE}; margin:0; max-width:none; line-height:1.8;">
      [Bold, specific claim as first line]<br><br>
      Here's what most people miss:<br><br>
      — [Point 1]<br>
      — [Point 2]<br>
      — [Point 3]<br><br>
      The thing is, [insight that connects the points].<br><br>
      [One sentence summary of the takeaway].<br><br>
      Save this if it helped. And tell me — [question that invites response].
    </p>
  </div>

  <h4>Template B — The Story Post</h4>
  <div class="box" style="margin-bottom:12px;">
    <p style="font-family: 'DM Sans'; font-size:9pt; color:${SMOKE}; margin:0; max-width:none; line-height:1.8;">
      [Set the scene — one specific moment, not a summary]<br><br>
      [What happened / what you were thinking]<br><br>
      [The turn — what changed or what you realized]<br><br>
      [What this means for your audience — bridge from your story to their life]<br><br>
      [CTA — question, invitation, or next step]
    </p>
  </div>

  <h4>Template C — The Perspective Post</h4>
  <div class="box" style="margin-bottom:24px;">
    <p style="font-family: 'DM Sans'; font-size:9pt; color:${SMOKE}; margin:0; max-width:none; line-height:1.8;">
      Controversial take: [your position in one direct sentence]<br><br>
      [Acknowledge the common counterargument]<br><br>
      But here's what I've actually seen: [evidence, example, or observation]<br><br>
      [Your conclusion — land the argument]<br><br>
      Agree? Disagree? [Invite the conversation]
    </p>
  </div>

  <h3>LinkedIn post structures</h3>
  <div class="grid-2">
    <div class="box">
      <span class="box-label">The Insight Post</span>
      <p>[Bold claim — one sentence]</p>
      <p>Here's why:</p>
      <p>1. [Reason with brief explanation]<br>
         2. [Reason with brief explanation]<br>
         3. [Reason with brief explanation]</p>
      <p>The bottom line: [one-sentence summary]</p>
      <p>What's your experience with this?</p>
    </div>
    <div class="box">
      <span class="box-label">The Story Post</span>
      <p>[Specific moment that led to the insight]</p>
      <p>[What happened — keep it tight]</p>
      <p>[What you learned]</p>
      <p>This changed how I [relevant professional action].</p>
      <p>[Question for the audience]</p>
    </div>
  </div>

  <h3>The posting system</h3>
  <p>Inspiration is not a posting strategy. Here's the actual system:</p>
  <ol>
    <li><strong>Batch once a week.</strong> Set 60–90 minutes on one day to write the week's content. Don't create day-to-day.</li>
    <li><strong>Keep an idea file.</strong> When something sparks — a client question, a frustration, something you explained well in an email — add it to a running note. This is your content inventory.</li>
    <li><strong>Use your pillars as constraints.</strong> When you sit down to batch, pick one from each pillar. Three posts, three directions. Done.</li>
    <li><strong>Schedule, don't post live.</strong> Use Later, Buffer, or even Meta's native scheduler. Live posting creates unnecessary pressure and inconsistency.</li>
    <li><strong>Engagement is non-negotiable.</strong> Spend 15 minutes after posting responding to comments and engaging with other accounts in your space. The algorithm rewards it. More importantly, it builds real relationships.</li>
  </ol>

  <div class="callout"><p>The two questions that make every piece of content better: "So what?" and "Who specifically is this for?" Answer both before you publish anything.</p></div>

  <div class="page-footer">
    <span>The Social Strategy Playbook · mkparrish.com</span>
    <span>Part 04 · Templates</span>
  </div>
</div>

<!-- ══════════════════════════════════════ FINAL ══ -->
<div class="final">
  <div class="final-glow"></div>
  <div class="final-title">GO BUILD</div>
  <div class="final-rule"></div>
  <div class="final-quote">The strategy is only as good as the work you put behind it. You have everything you need. Now show up.</div>
  <div class="final-sig">♡ — MK Parrish</div>
  <div class="final-url">mkparrish.com · @mkeezieee</div>
</div>

</body>
</html>`;

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-lcd-text'],
});

const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 500));

await page.pdf({
  path: OUT,
  format: 'Letter',
  printBackground: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
});

await browser.close();

const kb = (fs.statSync(OUT).size / 1024).toFixed(0);
console.log(`\n✓  The Social Strategy Playbook PDF generated`);
console.log(`   ${OUT}`);
console.log(`   ${kb} kb\n`);
