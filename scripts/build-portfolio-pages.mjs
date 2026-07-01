#!/usr/bin/env node
/**
 * Renders portfolio/vault Markdown files in public/downloads/portfolio to
 * readable static HTML pages. The raw .md files stay available, but nav links
 * should point at these .html siblings so the browser opens a polished page.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PORTFOLIO_ROOT = path.join(ROOT, "public", "downloads", "portfolio");

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return entry.isFile() && entry.name.endsWith(".md") ? [full] : [];
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function inline(value) {
  return escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\[(.+?)\]\((.+?)\)/g, (_, label, href) => {
      const nextHref = href.endsWith(".md") ? href.replace(/\.md$/, ".html") : href;
      return `<a href="${nextHref}">${label}</a>`;
    });
}

function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let list = null;
  let paragraph = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push(`<p>${inline(paragraph.join(" "))}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!list) return;
    blocks.push(`<${list.type}>${list.items.map((item) => `<li>${inline(item)}</li>`).join("")}</${list.type}>`);
    list = null;
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    if (trimmed.startsWith("# ")) {
      flushParagraph();
      flushList();
      blocks.push(`<h1>${inline(trimmed.slice(2))}</h1>`);
      continue;
    }

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push(`<h2>${inline(trimmed.slice(3))}</h2>`);
      continue;
    }

    if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push(`<h3>${inline(trimmed.slice(4))}</h3>`);
      continue;
    }

    const bullet = trimmed.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      flushParagraph();
      if (!list || list.type !== "ul") {
        flushList();
        list = { type: "ul", items: [] };
      }
      list.items.push(bullet[1]);
      continue;
    }

    const numbered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (numbered) {
      flushParagraph();
      if (!list || list.type !== "ol") {
        flushList();
        list = { type: "ol", items: [] };
      }
      list.items.push(numbered[1]);
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();
  return blocks.join("\n");
}

function pageTemplate(title, body) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)} - MK Parrish</title>
  <style>
    :root {
      --void: #080808;
      --obsidian: #111111;
      --carbon: #1a1a1a;
      --graphite: #2c2c2c;
      --iron: #5f5f5f;
      --smoke: #b0b0b0;
      --pearl: #f0f0ee;
      --petal: #f2afc6;
      --blush: #ffd6e4;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background:
        radial-gradient(ellipse 80% 48% at 50% 0%, rgba(242, 175, 198, 0.12), transparent 65%),
        linear-gradient(180deg, var(--obsidian), var(--void) 42%);
      color: var(--pearl);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      line-height: 1.7;
    }
    main {
      width: min(760px, calc(100vw - 40px));
      margin: 0 auto;
      padding: 72px 0 96px;
    }
    .kicker {
      color: var(--petal);
      font-size: 0.7rem;
      font-weight: 800;
      letter-spacing: 0.28em;
      text-transform: uppercase;
    }
    article {
      margin-top: 24px;
      border: 1px solid var(--graphite);
      background: rgba(17, 17, 17, 0.86);
      padding: clamp(24px, 5vw, 48px);
      box-shadow: 0 30px 90px rgba(0, 0, 0, 0.38);
    }
    h1, h2, h3 {
      margin: 0;
      text-transform: uppercase;
      line-height: 0.98;
      letter-spacing: 0.04em;
      font-family: Impact, "Arial Narrow", sans-serif;
      font-weight: 400;
    }
    h1 { font-size: clamp(2.6rem, 10vw, 5rem); }
    h2 {
      margin-top: 44px;
      border-top: 1px solid var(--graphite);
      padding-top: 28px;
      color: var(--petal);
      font-size: clamp(1.7rem, 6vw, 2.8rem);
    }
    h3 {
      margin-top: 28px;
      color: var(--blush);
      font-size: 1.4rem;
    }
    p, li {
      color: var(--smoke);
      font-size: 1rem;
    }
    p { margin: 18px 0 0; }
    ul, ol { margin: 18px 0 0; padding-left: 1.35rem; }
    li { margin: 8px 0; }
    strong { color: var(--pearl); }
    em { color: var(--petal); }
    code {
      border: 1px solid var(--graphite);
      background: var(--carbon);
      color: var(--petal);
      padding: 0.1em 0.35em;
      font-size: 0.9em;
    }
    a { color: var(--petal); text-decoration: none; }
    a:hover { color: var(--blush); text-decoration: underline; }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 32px;
    }
    .button {
      display: inline-flex;
      border: 1px solid var(--petal);
      padding: 12px 16px;
      color: var(--void);
      background: var(--petal);
      font-size: 0.72rem;
      font-weight: 800;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }
    .ghost {
      background: transparent;
      color: var(--pearl);
      border-color: var(--graphite);
    }
  </style>
</head>
<body>
  <main>
    <div class="kicker">MK Parrish Portfolio File</div>
    <article>
      ${body}
      <div class="actions">
        <a class="button" href="/contact">Contact MK</a>
        <a class="button ghost" href="/shop">Browse the Shop</a>
      </div>
    </article>
  </main>
</body>
</html>`;
}

fs.mkdirSync(PORTFOLIO_ROOT, { recursive: true });

for (const file of walk(PORTFOLIO_ROOT)) {
  const markdown = fs.readFileSync(file, "utf8");
  const title = markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? path.basename(file, ".md");
  const html = pageTemplate(title, markdownToHtml(markdown));
  const dest = file.replace(/\.md$/, ".html");
  fs.writeFileSync(dest, html);
  console.log(`  ok ${path.relative(ROOT, dest)}`);
}
