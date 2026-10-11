// Self-contained @font-face CSS (Bebas Neue / Playfair Display / DM Sans) with
// the woff2 files inlined as base64 — so Puppeteer renders the exact site fonts
// without depending on the Google Fonts CDN at render time.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const FONT_CSS = readFileSync(join(__dirname, "fonts", "embedded.css"), "utf8");
