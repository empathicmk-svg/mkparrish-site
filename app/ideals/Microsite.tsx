"use client";

// Self-contained iDeals-styled portfolio microsite.
// The markup, styles (with embedded Inter + Fraunces fonts), and the animation
// engine live in microsite.json so this route renders byte-for-byte the same page
// that was designed and reviewed as a standalone artifact. Editing content means
// editing microsite.json (html/css/js).

import { useEffect } from "react";
import content from "./microsite.json";

let booted = false;

export default function Microsite() {
  useEffect(() => {
    if (booted) return;
    booted = true;
    const s = document.createElement("script");
    s.textContent = content.js;
    document.body.appendChild(s);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: content.css }} />
      <div dangerouslySetInnerHTML={{ __html: content.html }} />
    </>
  );
}
