"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Progressive scroll reveal. Elements with `.reveal` are visible by default;
 * only once this runs do we add `.js` to <html> and animate them in, so
 * no-JS visitors and crawlers always see the full page.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)"));

    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    nodes.forEach((n) => io.observe(n));
    root.classList.add("js");
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
