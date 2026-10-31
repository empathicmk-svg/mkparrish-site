"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Microsite-local layout primitives. Deliberately not imported from
 * app/components/ui.tsx: the main site's section rhythm is built for long-form
 * editorial pages, and a car page needs tighter blocks and a different heading
 * scale. Same tokens, different meter.
 */

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    function check() {
      if (!el) return;
      if (el.getBoundingClientRect().top < window.innerHeight + 200) {
        setHidden(false);
        window.removeEventListener("scroll", check);
      }
    }
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);
  return { ref, cls: hidden ? "reveal reveal-hidden" : "reveal visible" };
}

export function Section({
  children,
  id,
  bg = "obsidian",
  className = "",
  tight = false,
}: {
  children: ReactNode;
  id?: string;
  bg?: "void" | "obsidian" | "carbon";
  className?: string;
  tight?: boolean;
}) {
  const { ref, cls } = useReveal();
  const bgColor = bg === "void" ? "#080808" : bg === "carbon" ? "#1A1A1A" : "#111111";
  return (
    <section
      ref={ref}
      id={id}
      className={`${cls} relative ${className}`}
      style={{
        background: bgColor,
        padding: tight ? "clamp(3rem, 6vw, 4.5rem) 0" : "clamp(4rem, 8vw, 7rem) 0",
        scrollMarginTop: "5rem",
      }}
    >
      <div className="mx-auto max-w-[1300px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
        {children}
      </div>
    </section>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">{children}</p>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2
      className="font-display uppercase tracking-[0.02em] text-white"
      style={{ fontSize: "clamp(2.1rem, 5.5vw, 4.2rem)", lineHeight: 0.94 }}
    >
      {children}
    </h2>
  );
}

export function Lede({ children }: { children: ReactNode }) {
  return (
    <p className="mt-5 max-w-[62ch] font-body text-base font-light leading-8 text-smoke md:text-lg">{children}</p>
  );
}

export function Pull({ children, by }: { children: ReactNode; by?: string }) {
  return (
    <div className="relative border-l-2 border-petal pl-6 md:pl-9">
      <p className="font-serif text-xl italic leading-relaxed text-pearl md:text-2xl" style={{ fontWeight: 600 }}>
        {children}
      </p>
      {by && <p className="mt-3 font-body text-[0.65rem] font-bold uppercase tracking-[0.28em] text-ash">{by}</p>}
    </div>
  );
}

export function Card({ children, glow = false }: { children: ReactNode; glow?: boolean }) {
  return (
    <div
      className={`relative flex h-full flex-col border p-6 transition-all duration-300 md:p-7 ${
        glow
          ? "border-petal/35 bg-carbon shadow-[0_0_70px_rgba(255,181,208,0.1)]"
          : "border-graphite/80 bg-obsidian hover:border-graphite"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      {glow && <div className="absolute inset-x-0 top-0 h-px bg-petal" />}
      {children}
    </div>
  );
}

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-px bg-graphite">
      {items.map((item, i) => (
        <div key={item.q} className="bg-carbon">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-body text-base font-medium text-pearl transition-colors hover:text-petal"
            aria-expanded={open === i}
          >
            {item.q}
            <span
              className={`font-display text-2xl text-petal transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              +
            </span>
          </button>
          <div
            className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <div className="overflow-hidden">
              <p className="px-6 pb-6 font-body text-sm font-light leading-7 text-smoke">{item.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
