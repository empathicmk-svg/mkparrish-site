"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { quoteAt } from "@/app/lib/quote-bank";

// ─────────────────────────────────────────────────────────────────────────────
// Hooks
// ─────────────────────────────────────────────────────────────────────────────

export function useReveal() {
  const ref  = useRef<HTMLDivElement>(null);
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

// ─────────────────────────────────────────────────────────────────────────────
// Layout wrappers
// ─────────────────────────────────────────────────────────────────────────────

export function RevealSection({
  children,
  id,
  bg = "obsidian",
  num,
  className = "",
  spacing = "normal",
}: {
  children: ReactNode;
  id?: string;
  bg?: "void" | "obsidian" | "carbon";
  num?: string;
  className?: string;
  spacing?: "normal" | "compact";
}) {
  const { ref, cls } = useReveal();
  const bgColor =
    bg === "void" ? "#080808" : bg === "carbon" ? "#1A1A1A" : "#111111";
  const sectionPadding =
    spacing === "compact" ? "clamp(3.5rem, 6vw, 5.5rem) 0" : "clamp(5rem, 10vw, 9rem) 0";
  return (
    <section
      ref={ref}
      id={id}
      className={`${cls} relative ${className}`}
      style={{
        background: bgColor,
        padding: sectionPadding,
        scrollMarginTop: "4.5rem",
      }}
    >
      <div className="mx-auto max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
        {num && (
          <p
            className={`font-mono text-xs tracking-[0.2em] text-iron ${
              spacing === "compact" ? "mb-5 md:mb-6" : "mb-8"
            }`}
          >
            {num}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

export function QuoteDivider({ index }: { index: number }) {
  const q = quoteAt(index);
  const { ref, cls } = useReveal();
  return (
    <div ref={ref} className={`${cls} bg-obsidian`} style={{ padding: "clamp(3rem, 6vw, 5rem) 0" }}>
      <div className="mx-auto max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
        <div className="relative border-l-2 border-petal pl-6 md:pl-10">
          <span className="absolute -left-4 -top-8 select-none font-serif text-[8rem] leading-none text-petal/[0.12]">&ldquo;</span>
          <blockquote className="font-serif text-xl italic leading-relaxed text-smoke md:text-2xl" style={{ fontWeight: 600 }}>
            {q.text}
          </blockquote>
          <p className="mt-4 font-body text-[0.7rem] font-bold uppercase tracking-[0.3em] text-ash">
            {q.author}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Typography
// ─────────────────────────────────────────────────────────────────────────────

export function Eyebrow({ children, pink = false }: { children: ReactNode; pink?: boolean }) {
  return (
    <p className={`mb-4 font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] ${pink ? "text-petal" : "text-ash"}`}>
      {children}
    </p>
  );
}

export function H1({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-display uppercase tracking-[0.02em] text-white" style={{ fontSize: "clamp(3.5rem, 10vw, 10rem)", lineHeight: "0.88" }}>
      {children}
    </h1>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display uppercase tracking-[0.02em] text-white" style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", lineHeight: "0.92" }}>
      {children}
    </h2>
  );
}

export function H3Script({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-serif text-2xl italic text-pearl md:text-3xl lg:text-4xl" style={{ fontWeight: 700, lineHeight: 1.15 }}>
      {children}
    </h3>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Buttons and links
// ─────────────────────────────────────────────────────────────────────────────

export function BtnPrimary({ href, children, target }: { href: string; children: ReactNode; target?: string }) {
  const external = href.startsWith("http");
  const t = target ?? (external ? "_blank" : undefined);
  return (
    <a
      href={href}
      target={t}
      rel={t === "_blank" ? "noreferrer" : undefined}
      className="btn-primary inline-flex items-center justify-center px-7 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
    >
      {children}
    </a>
  );
}

export function BtnGhost({ href, children, target }: { href: string; children: ReactNode; target?: string }) {
  const external = href.startsWith("http");
  const t = target ?? (external ? "_blank" : undefined);
  return (
    <a
      href={href}
      target={t}
      rel={t === "_blank" ? "noreferrer" : undefined}
      className="btn-ghost inline-flex items-center justify-center px-7 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em]"
    >
      {children}
    </a>
  );
}

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group/arrow inline-flex items-center gap-2 font-body text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-petal transition-colors hover:text-blush"
    >
      {children}
      <span className="transition-transform duration-300 group-hover/arrow:translate-x-1">&rarr;</span>
    </a>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Marquee
// ─────────────────────────────────────────────────────────────────────────────

const DEFAULT_MARQUEE_ITEMS = [
  "Web Design", "The Build", "Outbound", "Appointment Setting", "Full-Funnel Growth",
  "The Rewrite", "The Byline", "Brand Messaging", "Ghostwriting", "Positioning",
  "The Shelf", "The Margins",
];

export function Marquee({ items = DEFAULT_MARQUEE_ITEMS }: { items?: string[] }) {
  return (
    <div className="overflow-hidden border-y border-graphite bg-void py-4">
      <div className="marquee-track flex w-max items-center gap-0">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-6 px-6">
            <span className="font-display text-lg uppercase tracking-[0.02em] text-iron">{item}</span>
            <span className="text-petal/60">&middot;</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ Accordion
// ─────────────────────────────────────────────────────────────────────────────

export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-px bg-graphite">
      {items.map((item, i) => (
        <div key={i} className="bg-carbon">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between px-6 py-5 text-left font-body text-base font-medium text-pearl transition-colors hover:text-petal"
          >
            {item.q}
            <span
              className={`ml-4 font-display text-2xl text-petal transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}
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

// ─────────────────────────────────────────────────────────────────────────────
// Service card (shared across pages)
// ─────────────────────────────────────────────────────────────────────────────

export function ServiceCard({
  tag,
  title,
  price,
  desc,
  perks,
  cta,
  href,
  highlight = false,
}: {
  tag: string;
  title: string;
  price: string;
  desc: string;
  perks: string[];
  cta: string;
  href: string;
  highlight?: boolean;
}) {
  const external = href.startsWith("http");
  return (
    <article
      className={`service-card group/card relative isolate flex min-h-full flex-col overflow-visible border p-6 transition-all duration-300 md:p-7 ${
        highlight
          ? "border-petal/35 bg-carbon shadow-[0_0_70px_rgba(255,181,208,0.12)]"
          : "border-graphite/80 bg-obsidian"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      {highlight && <div className="absolute inset-x-0 top-0 h-px bg-petal" />}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-petal to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,181,208,0.09),transparent_65%)]" />
      </div>
      <p className="font-body text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-iron">{tag}</p>
      <h3 className="mt-3 font-display text-2xl uppercase tracking-[0.02em] text-pearl md:text-3xl">{title}</h3>
      <p className="mt-1.5 font-display text-3xl text-white md:text-4xl">{price}</p>
      <p className="mt-4 font-body text-sm font-light leading-6 text-smoke">{desc}</p>
      <ul className="mt-5 flex-1 space-y-2.5">
        {perks.map((p) => (
          <li key={p} className="flex gap-3 font-body text-sm font-light leading-6 text-smoke">
            <span className="mt-2 h-1 w-1 flex-shrink-0 bg-petal" />
            {p}
          </li>
        ))}
      </ul>
      <div className="mt-7">
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          className={`flex w-full items-center justify-center py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
            highlight ? "btn-primary text-void" : "btn-ghost"
          }`}
        >
          {cta}
        </a>
        {!href.startsWith("/book") && !href.includes("calendly") && (
          <a
            href="/book"
            className="mt-2 flex w-full items-center justify-center py-2.5 font-body text-[0.7rem] font-medium uppercase tracking-[0.15em] text-ash transition hover:text-petal"
          >
            Or book a call first &rarr;
          </a>
        )}
      </div>
    </article>
  );
}
