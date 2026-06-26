#!/usr/bin/env node
/**
 * Builds Amazon KDP upload metadata sheets for every current book artifact.
 * Output: output/kdp-upload-info/
 */
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'output', 'kdp-upload-info');
const TITLE_DIR = path.join(OUT, 'titles');
const PUBLIC_OUT = path.join(ROOT, 'public', 'downloads', 'kdp');
const SITE_URL = 'https://www.mkparrish.com';

const DEFAULTS = {
  author: 'MK Parrish',
  language: 'English',
  rights: 'I own the copyright and hold necessary publishing rights',
  primaryMarketplace: 'Amazon.com',
  readingAge: '18+',
  adultContent: 'No',
  lowContent: 'No',
  series: 'None',
  edition: '1',
  paperbackTrim: '6 x 9 in',
  paperbackBleed: 'No bleed',
  paperbackInk: 'Black & white interior',
  paperbackPaper: 'White paper',
  paperbackFinish: 'Matte cover',
  drm: 'No',
};

const sourceLinks = [
  ['KDP metadata guidelines', 'https://kdp.amazon.com/en_US/help/topic/G201097560'],
  ['KDP title and subtitle guidance', 'https://kdp.amazon.com/en_US/help/topic/GW7J4WEKBVU25YEC'],
  ['KDP keyword guidance', 'https://kdp.amazon.com/en_US/help/topic/G201298500'],
  ['KDP category guidance', 'https://kdp.amazon.com/en_US/help/topic/G200652170'],
  ['KDP eBook manuscript formats', 'https://kdp.amazon.com/en_US/help/topic/G200634390'],
  ['KDP paperback submission guidelines', 'https://kdp.amazon.com/en_US/help/topic/G201857950'],
  ['KDP paperback cover guidance', 'https://kdp.amazon.com/en_US/help/topic/G201834190'],
  ['KDP pricing guidance', 'https://kdp.amazon.com/en_US/help/topic/G200641280'],
  ['KDP AI content disclosure', 'https://kdp.amazon.com/en_US/help/topic/G200672390'],
];

const products = [
  {
    type: 'Ebook',
    slug: 'reinvention-workbook',
    title: 'The Reinvention Workbook',
    subtitle: 'A guided writing workbook for people in the middle of becoming someone new.',
    price: '$18',
    description: `You are not lost. You are between drafts.

The Reinvention Workbook is a guided writing workbook for the season when you have outgrown a life that still has your name on it. Through identity audits, story excavation, voice prompts, and next-chapter drafting exercises, MK Parrish helps readers move from vague restlessness to specific language they can actually use.

This is not a personality quiz or a five-step reinvention formula. It is a writing practice for people becoming someone new one honest sentence at a time.`,
    keywords: ['reinvention workbook', 'identity audit prompts', 'life transition writing', 'guided journaling exercises', 'personal transformation workbook', 'self discovery writing', 'becoming yourself workbook'],
    categories: ['Self-Help > Personal Transformation', 'Self-Help > Creativity', 'Reference > Writing Skills'],
  },
  {
    type: 'Ebook',
    slug: 'write-yourself-into-the-room',
    title: 'Write Yourself Into the Room',
    subtitle: 'The personal brand writing guide for people tired of sounding like everyone else.',
    price: '$28',
    description: `There is a room you want to be in: the shortlist, the panel, the client roster, the feed where the right people actually read your work.

Write Yourself Into the Room is a practical personal-brand writing guide for people who are tired of sounding generic online. Inside, MK Parrish walks readers through positioning, bio writing, LinkedIn copy, and public voice with templates, examples, and sentence-level exercises.

The promise is simple: stop hiding behind polished vagueness and write yourself so clearly that the room knows why you belong there.`,
    keywords: ['personal brand writing', 'linkedin bio workbook', 'professional bio examples', 'positioning statement guide', 'write better linkedin profile', 'personal branding for founders', 'career pivot storytelling'],
    categories: ['Business & Money > Job Hunting & Careers', 'Business & Money > Marketing & Sales', 'Self-Help > Personal Success'],
  },
  {
    type: 'Ebook',
    slug: 'brand-voice-playbook',
    title: 'The Brand Voice Playbook',
    subtitle: 'Build a brand voice document from scratch.',
    price: '$35',
    description: `Most brands do not have a voice. They have a committee average.

The Brand Voice Playbook is a hands-on guide to building a brand voice document from scratch. MK Parrish walks readers through voice versus tone, tone spectrum mapping, audience language, do-and-do-not vocabulary, platform calibration, and a complete voice-guide structure.

Designed for founders, operators, marketers, and copywriters, this workbook turns brand voice from a vague vibe into a usable system.`,
    keywords: ['brand voice guide', 'tone of voice framework', 'messaging strategy workbook', 'brand style guide', 'copywriting for small business', 'voice and tone guide', 'marketing copy system'],
    categories: ['Business & Money > Marketing & Sales', 'Business & Money > Entrepreneurship', 'Reference > Writing Skills'],
  },
  {
    type: 'Ebook',
    slug: 'the-invisible-bruise',
    title: 'The Invisible Bruise',
    subtitle: 'Surviving emotional abuse, suffering in silence, and rewriting your life.',
    price: '$22',
    description: `Emotional abuse leaves no visible mark. That is part of what makes it so hard to name.

The Invisible Bruise is a compassionate guide for readers who are beginning to understand what happened to them and how to rebuild after it. Through clear language, reflection prompts, and grounded encouragement, MK Parrish helps readers name the patterns, trust their own senses again, and begin writing a life that is no longer arranged around someone else's control.

This book is tender, direct, and written for the person who has gotten very good at being fine.`,
    keywords: ['emotional abuse recovery', 'gaslighting healing workbook', 'invisible abuse survival', 'rebuild after toxic relationship', 'trauma writing prompts', 'silent suffering recovery', 'reclaim your voice'],
    categories: ['Self-Help > Abuse', 'Health, Fitness & Dieting > Mental Health', 'Family & Relationships > Abuse'],
  },
  {
    type: 'Ebook',
    slug: 'decoding-angel-numbers',
    title: `Decoding Angel Numbers`,
    subtitle: `A Skeptic's Guide to Spiritual Curiosity`,
    price: '$14',
    description: `This is not a glossary of magical meanings.

Decoding Angel Numbers is a grounded guide for spiritually curious readers who keep noticing patterns and want a more thoughtful way to engage them. Rather than treating repeating numbers as commands or predictions, MK Parrish frames noticing as a spiritual discipline: a way to pay attention, ask better questions, and practice discernment.

For the reader who is curious but not gullible, skeptical but not closed, this book offers a framework for meaning without surrendering common sense.`,
    keywords: ['angel numbers guide', 'spiritual curiosity', 'numerology skeptic', 'signs and synchronicity', 'pattern noticing practice', 'spiritual discernment', 'meaning of repeating numbers'],
    categories: ['Religion & Spirituality > New Age & Spirituality > Numerology', 'Religion & Spirituality > Spirituality', 'Self-Help > Spiritual'],
  },
  {
    type: 'Ebook',
    slug: 'the-study',
    title: 'The Study',
    subtitle: 'A modern guide to building a Bible study practice that actually sticks - on your own terms.',
    price: '$18',
    description: `The problem was never you. The problem was the method.

The Study is a modern, shame-free guide to building a Bible study practice that fits the life and brain you actually have. MK Parrish offers practical methods for reading, noticing, remembering, and returning to Scripture without performance, guilt, or the pressure to do it perfectly.

For readers who have tried and quit before, this book offers a gentler way back into the text.`,
    keywords: ['bible study practice', 'scripture study guide', 'bible study methods', 'modern bible study workbook', 'spiritual discipline', 'scripture journaling', 'faith study routine'],
    categories: ['Christian Books & Bibles > Bible Study & Reference', 'Christian Books & Bibles > Christian Living > Spiritual Growth', 'Religion & Spirituality > Worship & Devotion'],
  },
  {
    type: 'Ebook',
    slug: 'gospel-and-grind',
    title: 'Gospel & Grind',
    subtitle: `Build a profitable practice grounded in what you believe - without feeling like you're selling your faith.`,
    price: '$28',
    description: `Money is not the opposite of meaning.

Gospel & Grind is a practical guide for faith-based creators and entrepreneurs who want their work, values, and revenue to stop living in separate rooms. MK Parrish helps readers align what they believe with what they sell, build pricing that does not make them flinch, and position their work without manipulation or spiritual performance.

This is a bridge between calling and business, written for people who want integrity and income in the same sentence.`,
    keywords: ['faith based business', 'christian entrepreneur workbook', 'values based positioning', 'monetize ministry ethically', 'profitable practice faith', 'business and calling', 'spiritual entrepreneurship'],
    categories: ['Christian Books & Bibles > Christian Living', 'Business & Money > Entrepreneurship', 'Business & Money > Marketing & Sales'],
  },
  {
    type: 'Ebook',
    slug: 'the-sermon-notes',
    title: 'The Sermon Notes',
    subtitle: 'Turn your personal Bible study into content your audience wants - and that you can charge for.',
    price: '$25',
    description: `You are not out of ideas. You are sitting on a goldmine and calling it a diary.

The Sermon Notes is a practical content system for turning personal Bible study into useful, shareable, audience-building work. MK Parrish walks readers through a pipeline from study to capture to sorting to formatting to distribution, with plug-and-play content formats and a pathway from free posts to paid offers.

It is for creators, ministry leaders, and faith-based writers who want their study life to become a body of work.`,
    keywords: ['sermon notes content', 'bible study content system', 'faith creator content', 'ministry content planning', 'scripture to social media', 'Christian content strategy', 'monetize bible study'],
    categories: ['Christian Books & Bibles > Ministry & Evangelism', 'Christian Books & Bibles > Bible Study & Reference', 'Business & Money > Marketing & Sales'],
  },
  {
    type: 'Ebook',
    slug: 'the-calling-card',
    title: 'The Calling Card',
    subtitle: 'Build a faith-informed brand voice that connects, converts, and stays true to who you are.',
    price: '$35',
    description: `Your voice is not decoration on the brand. It is the brand.

The Calling Card is a faith-informed brand voice workbook for creators, founders, and ministry leaders who want their work to sound like a real person instead of a greeting card or a sales funnel. MK Parrish guides readers through voice dials, audience language, platform calibration, reverence, testimony boundaries, and a one-page calling card they can use before publishing.

It is built for readers who want connection, conversion, and integrity in the same voice.`,
    keywords: ['faith brand voice', 'Christian brand strategy', 'faith based copywriting', 'ministry messaging', 'audience language mapping', 'spiritual business voice', 'calling statement workbook'],
    categories: ['Business & Money > Marketing & Sales', 'Christian Books & Bibles > Christian Living', 'Reference > Writing Skills'],
  },
  {
    type: 'Ebook',
    slug: 'ministry-monetized',
    title: 'Ministry, Monetized',
    subtitle: 'The Launch & Revenue Playbook for Faith-Based Creators',
    price: '$42',
    description: `You have the message. Now you need to make it pay without becoming someone else.

Ministry, Monetized is a launch and revenue playbook for faith-based creators who want sustainable income without manipulation, manufactured urgency, or integrity leaks. MK Parrish walks readers through pre-launch clarity, launch messaging, post-launch review, and revenue architecture that can support the work for years.

This is a practical, honest guide to building revenue around a calling without cheapening the calling itself.`,
    keywords: ['ministry monetization', 'faith based launch plan', 'Christian creator revenue', 'ethical launch strategy', 'faith business templates', 'revenue for creators', 'sell without manipulation'],
    categories: ['Christian Books & Bibles > Ministry & Evangelism', 'Business & Money > Entrepreneurship', 'Business & Money > Marketing & Sales'],
  },
  {
    type: 'Template',
    slug: 'the-edit-diy',
    title: 'The Edit',
    subtitle: 'DIY Edition',
    price: '$22',
    description: `Most writing is not bad. It is just unedited.

The Edit: DIY Edition turns MK Parrish's client copy-editing framework into a self-guided workbook. Readers move through copy audit, brand-voice edit, and line edit passes that sharpen bios, emails, landing pages, LinkedIn posts, and other public-facing writing.

This is not proofreading. It is the layer above: the question of whether the writing is true, specific, voiced, and doing the job it came to do.`,
    keywords: ['copy editing checklist', 'brand voice edit', 'line editing workbook', 'edit your writing', 'copy audit framework', 'improve website copy', 'professional writing self edit'],
    categories: ['Reference > Writing Skills', 'Business & Money > Skills', 'Business & Money > Marketing & Sales'],
  },
  {
    type: 'Template',
    slug: 'before-the-session',
    title: 'Before the Session',
    subtitle: 'The pre-work that turns a strategy session into something you actually use.',
    price: '$18',
    description: `The best strategy sessions start before the call.

Before the Session is a self-guided prep workbook for founders, professionals, and creators who want to arrive at a strategy conversation already clear on the real problem. MK Parrish leads readers through identity, positioning, brand clarity, inner resistance, and goal-setting exercises that make the hour useful before it begins.

Use it before a consulting session, before a brand audit, or anytime you need to think clearly before asking for outside help.`,
    keywords: ['strategy session prep', 'positioning self audit', 'brand clarity workbook', 'consultant prework', 'business goal setting', 'session prep guide', 'identity positioning audit'],
    categories: ['Business & Money > Consulting', 'Business & Money > Entrepreneurship', 'Self-Help > Personal Success'],
  },
  {
    type: 'Template',
    slug: 'the-rewrite-playbook',
    title: 'The Rewrite Playbook',
    subtitle: 'A self-guided LinkedIn and professional story overhaul.',
    price: '$45',
    description: `You are being read right now. The question is whether the page still tells the truth.

The Rewrite Playbook is a self-guided professional story and LinkedIn overhaul for executives, founders, career changers, and anyone whose public bio no longer matches the person they have become. MK Parrish walks readers through story audit, positioning statement, LinkedIn rebuild, and bio rewrites in multiple lengths.

It is for people ready to stop decorating the old story and write the real one straight.`,
    keywords: ['linkedin rewrite workbook', 'professional story audit', 'career pivot narrative', 'positioning statement builder', 'executive bio templates', 'personal brand overhaul', 'profile optimization'],
    categories: ['Business & Money > Job Hunting & Careers', 'Business & Money > Marketing & Sales', 'Self-Help > Personal Success'],
  },
  {
    type: 'Template',
    slug: 'the-new-chapter-workbook',
    title: 'The New Chapter Workbook',
    subtitle: 'The brand and website repositioning framework - run it yourself.',
    price: '$35',
    description: `Your business changed and your website did not.

The New Chapter Workbook is a brand and website repositioning framework for founders and business owners whose current site is selling an old version of the work. MK Parrish guides readers through brand audit, positioning map, website copy architecture, voice reset, and launch checklist.

It is a practical workbook for a pivot, rebrand, relaunch, or return.`,
    keywords: ['brand repositioning workbook', 'website copy audit', 'rebrand strategy guide', 'brand messaging reset', 'launch copy checklist', 'positioning map', 'website relaunch workbook'],
    categories: ['Business & Money > Marketing & Sales', 'Business & Money > Entrepreneurship', 'Computers & Technology > Web Design'],
  },
  {
    type: 'Template',
    slug: 'the-byline-method',
    title: 'The Byline Method',
    subtitle: 'The voice capture and ghostwriting framework.',
    price: '$38',
    description: `Ghostwriting that works does not sound ghostwritten.

The Byline Method documents MK Parrish's voice-capture and ghostwriting framework for founders, executives, writers, and content leads. Readers learn how to interview for voice, calibrate tone across formats, write inside someone else's patterns, and maintain an editorial calendar that keeps the voice consistent.

Use it to ghostwrite for a client or to capture your own best voice and return to it when the blank page gets loud.`,
    keywords: ['ghostwriting framework', 'voice capture interview', 'thought leadership writing', 'founder ghostwriting', 'editorial calendar template', "write in someone's voice", 'executive content system'],
    categories: ['Reference > Writing Skills', 'Business & Money > Marketing & Sales', 'Business & Money > Skills'],
  },
  {
    type: 'Template',
    slug: 'the-build-copy-guide',
    title: 'The Build',
    subtitle: 'Copy Guide',
    price: '$45',
    description: `A beautiful website with weak copy is a beautiful building with no address.

The Build: Copy Guide is a page-by-page website copy framework for founders and business owners writing or briefing a new site. MK Parrish breaks down positioning, homepage structure, services pages, about pages, contact CTAs, and the review process that separates copy that converts from copy that only sounds nice.

It is built for people who need every word on the site to work.`,
    keywords: ['website copy guide', 'homepage copy template', 'service page copy', 'website messaging framework', 'conversion copy workbook', 'founder website copy', 'copywriting for business owners'],
    categories: ['Business & Money > Marketing & Sales', 'Business & Money > Entrepreneurship', 'Computers & Technology > Web Marketing'],
  },
  {
    type: 'Template',
    slug: 'the-social-strategy-playbook',
    title: 'The Social Strategy Playbook',
    subtitle: `A Content System You'll Actually Use`,
    price: '$38',
    description: `Most people do not have a content problem. They have a system problem.

The Social Strategy Playbook is a self-guided content strategy workbook for founders and thought leaders who need a repeatable system instead of relying on inspiration. MK Parrish walks readers through audience clarity, content pillars, platform-calibrated voice, a 30-day content sprint, and a posting system that survives busy weeks.

It is the strategy behind The Social Suite, documented so readers can run it themselves.`,
    keywords: ['content strategy workbook', 'social media content system', 'content pillar framework', '30 day content plan', 'brand voice for social', 'founder content strategy', 'posting system'],
    categories: ['Business & Money > Marketing & Sales > Social Media', 'Business & Money > Marketing & Sales', 'Computers & Technology > Web Marketing'],
  },
  {
    type: 'Course',
    slug: 'scripture-and-strategy',
    title: 'Scripture & Strategy',
    subtitle: 'A complete faith-based business curriculum - from study practice to sustainable income.',
    price: '$497',
    description: `Scripture & Strategy is a faith-based business curriculum for creators, founders, and ministry-minded builders who want study, calling, voice, offers, content, and revenue to work together.

Across eight modules, MK Parrish moves from source and study to calling, voice, offer architecture, content pipeline, revenue engine, and obedience after the launch. The result is a grounded curriculum for building something sustainable without splitting faith from strategy.`,
    keywords: ['faith based business curriculum', 'scripture and strategy', 'Christian creator course', 'build offers from calling', 'faith led marketing', 'sustainable ministry income', 'Christian business framework'],
    categories: ['Christian Books & Bibles > Ministry & Evangelism', 'Business & Money > Entrepreneurship', 'Christian Books & Bibles > Christian Living'],
    pdf: 'public/downloads/scripture-and-strategy.pdf',
    epub: 'public/downloads/scripture-and-strategy.epub',
    coverJpg: 'public/downloads/covers/scripture-and-strategy-cover.jpg',
    coverPdf: 'public/downloads/covers/scripture-and-strategy-cover.pdf',
  },
  {
    type: 'Bundle intro',
    slug: 'the-vault',
    title: 'The Vault',
    subtitle: 'Every framework, every guide, every word - the complete library, in one place.',
    price: '$97',
    description: `The Vault is the complete MK Parrish writing-and-identity library in one self-study map.

This short guide introduces the works inside the library, explains what each one is for, and helps readers choose where to begin depending on the season they are in: reinvention, healing, personal brand writing, brand voice, or spiritual curiosity.

Upload note: this file is best treated as a Kindle-only companion or library guide unless expanded for paperback length.`,
    keywords: ['writing and identity library', 'self study library', 'reinvention writing prompts', 'identity and voice workbooks', 'personal brand and healing', 'creative self discovery', 'writing guides for reinvention'],
    categories: ['Self-Help > Personal Transformation', 'Reference > Writing Skills', 'Self-Help > Creativity'],
    paperbackCandidate: false,
    pdf: 'public/downloads/the-vault.pdf',
    epub: 'public/downloads/the-vault.epub',
    coverJpg: 'public/downloads/covers/the-vault-cover.jpg',
    coverPdf: 'public/downloads/covers/the-vault-cover.pdf',
  },
  {
    type: 'Bundle intro',
    slug: 'the-services-vault',
    title: 'The Services Vault',
    subtitle: 'Every consulting methodology I run with clients - documented as a self-study library.',
    price: '$127',
    description: `The Services Vault is a self-study map to MK Parrish's consulting methodologies.

This short guide introduces the service companion guides inside the library, including website copy, LinkedIn rewrites, content strategy, ghostwriting, copy editing, repositioning, and strategy-session prep. It helps readers choose the right guide for the job in front of them.

Upload note: this file is best treated as a Kindle-only companion or library guide unless expanded for paperback length.`,
    keywords: ['consulting method library', 'DIY service guides', 'copywriting templates', 'brand strategy workbooks', 'website social content systems', 'ghostwriting framework', 'business writing tools'],
    categories: ['Business & Money > Consulting', 'Business & Money > Marketing & Sales', 'Business & Money > Entrepreneurship'],
    paperbackCandidate: false,
    pdf: 'public/downloads/the-services-vault.pdf',
    epub: 'public/downloads/the-services-vault.epub',
    coverJpg: 'public/downloads/covers/the-services-vault-cover.jpg',
    coverPdf: 'public/downloads/covers/the-services-vault-cover.pdf',
  },
];

function rel(...parts) {
  return path.join(...parts);
}

function pathsFor(product) {
  const base = product.type === 'Template'
    ? rel('public/downloads/templates', product.slug)
    : rel('public/downloads/ebooks', product.slug);
  return {
    pdf: product.pdf || `${base}.pdf`,
    epub: product.epub || `${base}.epub`,
    coverJpg: product.coverJpg || `public/downloads/covers/${product.slug}-cover.jpg`,
    coverPdf: product.coverPdf || `public/downloads/covers/${product.slug}-cover.pdf`,
  };
}

function exists(relPath) {
  return fs.existsSync(path.join(ROOT, relPath));
}

function pageCount(relPath) {
  if (!exists(relPath)) return '';
  try {
    const info = execFileSync('pdfinfo', [path.join(ROOT, relPath)], { encoding: 'utf8' });
    return info.match(/^Pages:\s+(\d+)/m)?.[1] || '';
  } catch {
    return '';
  }
}

function csvCell(value) {
  return `"${String(value ?? '').replace(/"/g, '""').replace(/\n/g, ' ').trim()}"`;
}

function cleanRel(relPath) {
  return relPath.split(path.sep).join('/');
}

function assetRef(relPath, mode = 'repo') {
  const cleaned = cleanRel(relPath);
  if (mode === 'site') {
    return `${SITE_URL}/${cleaned.replace(/^public\//, '')}`;
  }
  return cleaned;
}

function paperbackStatus(product, pages) {
  if (product.paperbackCandidate === false) return 'Not recommended until expanded to 24+ pages';
  if (!pages) return 'Missing PDF';
  return Number(pages) >= 24 ? 'Ready as 6 x 9 no-bleed interior' : 'Not ready: under 24 pages';
}

function aiDisclosure() {
  return [
    'Review and answer truthfully in KDP.',
    'Safe default for the current generated files: disclose AI-generated text and interior artwork/images where Codex-generated text, SVG visuals, or generated cover/interior assets remain in the uploaded book.',
    'If you replace those sections with entirely human-created text/art before upload and use AI only for editing, follow KDP guidance for AI-assisted content.',
  ].join(' ');
}

function uploadNotes(product, pages, paths) {
  const notes = [];
  notes.push('Use the EPUB for Kindle eBook upload.');
  if (Number(pages) >= 24 && product.paperbackCandidate !== false) {
    notes.push('Use the PDF as the paperback manuscript: 6 x 9 in, no bleed.');
  } else {
    notes.push('Do not use the PDF for paperback until expanded to at least 24 pages.');
  }
  notes.push('The JPG cover is ready for Kindle eBook cover upload.');
  notes.push('For paperback cover upload, use KDP Cover Creator with the front JPG or create a full wrap PDF from KDP cover template after final page count.');
  if (!exists(paths.coverJpg)) notes.push('Front cover JPG is missing and should be generated before upload.');
  return notes;
}

function sheet(product, mode = 'repo') {
  const p = pathsFor(product);
  const pages = pageCount(p.pdf);
  const status = paperbackStatus(product, pages);
  const missing = Object.entries(p).filter(([, v]) => !exists(v)).map(([k, v]) => `${k}: ${v}`);
  const notes = uploadNotes(product, pages, p);

  return `# ${product.title}

## KDP Book Details

- Format: Kindle eBook + ${product.paperbackCandidate === false ? 'paperback not recommended yet' : 'paperback candidate'}
- Language: ${DEFAULTS.language}
- Title: ${product.title}
- Subtitle: ${product.subtitle || ''}
- Series: ${DEFAULTS.series}
- Edition number: ${DEFAULTS.edition}
- Author: ${DEFAULTS.author}
- Contributors: None
- Description:

${product.description}

- Publishing rights: ${DEFAULTS.rights}
- Primary audience / reading age: ${DEFAULTS.readingAge}
- Adult content: ${DEFAULTS.adultContent}
- Low-content book: ${DEFAULTS.lowContent}

## Keywords

${product.keywords.map((kw, i) => `${i + 1}. ${kw}`).join('\n')}

## Suggested Categories

${product.categories.map((cat, i) => `${i + 1}. ${cat}`).join('\n')}

## Kindle eBook Upload

- Manuscript EPUB: ${assetRef(p.epub, mode)}
- Cover image JPG: ${assetRef(p.coverJpg, mode)}
- DRM: ${DEFAULTS.drm}
- Current direct-store price / pricing anchor: ${product.price}
- KDP pricing note: Set final Kindle and paperback prices inside KDP after it calculates marketplace requirements, delivery costs, and print cost.

## Paperback Upload

- Paperback status: ${status}
- Manuscript PDF: ${assetRef(p.pdf, mode)}
- PDF page count: ${pages || 'unknown'}
- Trim size: ${DEFAULTS.paperbackTrim}
- Bleed setting: ${DEFAULTS.paperbackBleed}
- Interior: ${DEFAULTS.paperbackInk}
- Paper: ${DEFAULTS.paperbackPaper}
- Cover finish: ${DEFAULTS.paperbackFinish}
- Front-cover PDF/JPG available: ${assetRef(p.coverPdf, mode)} and ${assetRef(p.coverJpg, mode)}
- Paperback cover note: KDP print upload needs a full wrap cover PDF or Cover Creator. The current cover files are front-cover assets, not final full-wrap paperback covers.

## AI Content Disclosure

${aiDisclosure()}

## Upload Notes

${notes.map((note) => `- ${note}`).join('\n')}
${missing.length ? `\n## Missing Assets\n\n${missing.map((m) => `- ${m}`).join('\n')}\n` : ''}
`;
}

function masterRows(mode = 'repo') {
  const headers = [
    'slug', 'type', 'title', 'subtitle', 'author', 'description', 'keyword_1', 'keyword_2', 'keyword_3',
    'keyword_4', 'keyword_5', 'keyword_6', 'keyword_7', 'category_1', 'category_2', 'category_3',
    'kindle_epub', 'ebook_cover_jpg', 'paperback_pdf', 'paperback_page_count', 'paperback_status',
    'paperback_trim', 'paperback_bleed', 'paperback_cover_note', 'direct_store_price_anchor', 'ai_disclosure_note',
  ];
  const rows = [headers.map(csvCell).join(',')];

  for (const product of products) {
    const p = pathsFor(product);
    const pages = pageCount(p.pdf);
    rows.push([
      product.slug,
      product.type,
      product.title,
      product.subtitle || '',
      DEFAULTS.author,
      product.description,
      ...product.keywords,
      ...product.categories,
      assetRef(p.epub, mode),
      assetRef(p.coverJpg, mode),
      assetRef(p.pdf, mode),
      pages,
      paperbackStatus(product, pages),
      DEFAULTS.paperbackTrim,
      DEFAULTS.paperbackBleed,
      'Use KDP Cover Creator with front JPG or create full wrap PDF from final page count/template.',
      product.price,
      aiDisclosure(),
    ].map(csvCell).join(','));
  }

  return rows.join('\n') + '\n';
}

function readme(mode = 'repo') {
  const pathNote = mode === 'site'
    ? 'The public copies use live site URLs for downloadable assets.'
    : 'The local artifact copies use repo-relative paths for downloadable assets.';

  return `# Amazon KDP Upload Info

Generated for the current MK Parrish ebook/template/course assets.

## What is included

- \`kdp-upload-master.csv\`: one-row-per-title metadata tracker.
- \`titles/*.md\`: copy/paste upload sheet for each KDP title.
- Kindle eBook assets point to EPUB files.
- Paperback manuscript assets point to 6 x 9 no-bleed PDFs when the title is long enough for print.
- ${pathNote}

## Important upload notes

- Use the same title/subtitle for Kindle and paperback versions so KDP can link them.
- KDP allows up to seven keyword fields; these sheets provide seven short phrases per title.
- KDP lets authors select three categories during setup; category labels can shift in the KDP UI, so use these as category searches/targets and choose the closest accurate match.
- EPUB files should be checked in Kindle Previewer before upload.
- Paperback PDFs are formatted as 6 x 9 in, no-bleed interiors.
- Paperback cover upload needs a full wrap cover PDF or KDP Cover Creator. The existing cover JPG/PDF files are front-cover assets.
- Prices are listed as direct-store anchors, not guaranteed KDP list prices. Set final Kindle and paperback prices in KDP after Amazon calculates marketplace, delivery, and print-cost requirements.
- Review the AI disclosure field honestly before upload. The current generated files contain Codex-assisted/generated text and vector visual elements, so the safest default is to disclose AI-generated text and/or images where that material remains.

## Official KDP references used

${sourceLinks.map(([label, url]) => `- [${label}](${url})`).join('\n')}
`;
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(TITLE_DIR, { recursive: true });

fs.rmSync(PUBLIC_OUT, { recursive: true, force: true });
fs.mkdirSync(PUBLIC_OUT, { recursive: true });

fs.writeFileSync(path.join(OUT, 'README.md'), readme('repo'));
fs.writeFileSync(path.join(OUT, 'kdp-upload-master.csv'), masterRows('repo'));
fs.writeFileSync(path.join(PUBLIC_OUT, 'README.md'), readme('site'));
fs.writeFileSync(path.join(PUBLIC_OUT, 'kdp-upload-master.csv'), masterRows('site'));

for (const product of products) {
  fs.writeFileSync(path.join(TITLE_DIR, `${product.slug}.md`), sheet(product, 'repo'));
  fs.writeFileSync(path.join(PUBLIC_OUT, `${product.slug}-kdp-upload-info.md`), sheet(product, 'site'));
}

console.log(`Wrote ${products.length} KDP upload sheets to ${path.relative(ROOT, OUT)} and ${path.relative(ROOT, PUBLIC_OUT)}`);
