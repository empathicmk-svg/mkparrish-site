/**
 * Assembles the multi-file "Scripture & Strategy" course into one markdown
 * document, shaped to the gold-standard book layout used by every other
 * download. Shared by build-downloads.mjs (→ HTML → PDF) and build-epubs.mjs
 * (→ EPUB) so the paperback and the eBook are built from one source of truth.
 *
 * Heading map (so the course inherits the workbook's visual hierarchy):
 *   # Module N — Title   →  ## …   black-box numbered section
 *   ## Lesson N.x — …     →  ### …  petal-pink Playfair-italic sub-heading
 *   ### Action step       →  **…**  black-highlighter callout label
 * The overview file keeps its own ## sections as the opening numbered sections.
 */
import fs from 'fs';
import path from 'path';

export const COURSE = {
  slug: 'scripture-and-strategy',
  title: 'Scripture & Strategy',
  subtitle: 'A complete faith-based business curriculum — from study practice to sustainable income.',
  meta: 'By MK Parrish · $497',
};

const ORDER = [
  '00-course-overview',
  'module-0-welcome',
  'module-1-source',
  'module-2-calling',
  'module-3-voice',
  'module-4-offer',
  'module-5-pipeline',
  'module-6-engine',
  'module-7-obedience',
];

// Demote a module file one level deep so its title becomes a numbered section,
// its lessons become sub-headings, and its action steps become bold labels.
// Order matters: rewrite the deepest headings first.
function demote(src) {
  return src
    .replace(/^### (.+)$/gm, '**$1**')
    .replace(/^## (.+)$/gm, '### $1')
    .replace(/^# (.+)$/gm, '## $1');
}

export function courseMarkdown(ROOT) {
  const dir = path.join(ROOT, 'products', 'course-scripture-and-strategy');
  const parts = ORDER.map((name, i) => {
    let raw = fs.readFileSync(path.join(dir, `${name}.md`), 'utf8');
    if (i === 0) {
      // Overview: drop the book-title front matter (title, bold tagline, byline,
      // price, divider) and start the body at its first ## section heading.
      const firstH2 = raw.search(/^## /m);
      return (firstH2 >= 0 ? raw.slice(firstH2) : raw).trim();
    }
    return demote(raw).trim();
  });
  return parts.join('\n\n');
}
