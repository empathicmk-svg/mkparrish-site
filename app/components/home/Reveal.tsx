"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Delay in ms, for staggering a row of cards. */
  delay?: number;
  as?: ElementType;
  className?: string;
};

/**
 * Fades and lifts its children into view once, the first time they scroll on screen.
 * Content is fully visible with no JavaScript or with reduced motion on.
 */
export default function Reveal({ children, delay = 0, as: Tag = "div", className = "" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const id = window.setTimeout(() => setShown(true), 0);
      return () => window.clearTimeout(id);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = { "--mk-delay": `${delay}ms` } as CSSProperties;
  return (
    <Tag ref={ref} style={style} className={`mk-reveal ${shown ? "mk-reveal-in" : ""} ${className}`}>
      {children}
    </Tag>
  );
}
