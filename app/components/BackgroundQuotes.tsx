"use client";

import { useEffect, useState } from "react";
import { BACKGROUND_QUOTES } from "@/app/lib/brand";

/**
 * Ambient quotes that drift behind every page. A fixed layer that never takes a
 * click: each quote fades in large and faint, holds, then gives way to the next.
 * With reduced motion on, the cycling stops and the first quote stays still.
 */
export default function BackgroundQuotes() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % BACKGROUND_QUOTES.length), 9000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="site-bgq pointer-events-none fixed inset-0 z-[3] flex items-center justify-center overflow-hidden px-6 text-center"
    >
      <p key={i} className="site-bgq-line font-serif italic">
        {BACKGROUND_QUOTES[i]}
      </p>
    </div>
  );
}
