"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BENZ } from "./data";

const TABS = [
  { href: "/benz-blonde", label: "Home" },
  { href: "/benz-blonde/shop", label: "The Lineup" },
  { href: "/benz-blonde/trade", label: "Trade Value" },
  { href: "/benz-blonde/lease-end", label: "Lease End" },
  { href: "/benz-blonde/watch", label: "Watch" },
  { href: "/benz-blonde/reviews", label: "Reviews" },
];

export default function BenzNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/benz-blonde" ? pathname === href : pathname.startsWith(href);

  return (
    <header
      className="sticky top-0 z-[8000] border-b transition-colors duration-300"
      style={{
        background: scrolled ? "rgba(8,8,8,0.92)" : "rgba(8,8,8,0.55)",
        backdropFilter: "blur(14px)",
        borderColor: scrolled ? "#2C2C2C" : "rgba(44,44,44,0.5)",
      }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-4 md:px-8">
        <Link href="/benz-blonde" className="group flex flex-col leading-none">
          <span className="font-display text-xl uppercase tracking-[0.06em] text-white transition-colors group-hover:text-petal md:text-2xl">
            The Benz <span className="text-petal">Blonde</span>
          </span>
          <span className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-iron">
            {BENZ.person} · {BENZ.store}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Benz Blonde">
          {TABS.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`font-body text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition-colors ${
                isActive(tab.href) ? "text-petal" : "text-smoke hover:text-pearl"
              }`}
            >
              {tab.label}
            </Link>
          ))}
          <Link
            href="/benz-blonde/book"
            className="btn-primary inline-flex items-center justify-center px-6 py-3 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void"
          >
            Book a Drive
          </Link>
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          className="font-body text-[0.72rem] font-bold uppercase tracking-[0.2em] text-pearl lg:hidden"
          aria-expanded={open}
          aria-controls="benz-mobile-nav"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div
        id="benz-mobile-nav"
        className={`grid overflow-hidden border-t border-graphite bg-void transition-all duration-300 lg:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr] border-t-0"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <div className="overflow-hidden">
          <nav className="flex flex-col px-5 py-4" aria-label="Benz Blonde mobile">
            {TABS.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                onClick={() => setOpen(false)}
                className={`border-b border-graphite/60 py-4 font-body text-sm font-semibold uppercase tracking-[0.16em] ${
                  isActive(tab.href) ? "text-petal" : "text-smoke"
                }`}
              >
                {tab.label}
              </Link>
            ))}
            <Link
              href="/benz-blonde/book"
              onClick={() => setOpen(false)}
              className="btn-primary mt-5 inline-flex items-center justify-center py-4 font-body text-[0.78rem] font-bold uppercase tracking-[0.2em] text-void"
            >
              Book a Drive →
            </Link>
            <a
              href={BENZ.smsHref}
              className="mt-2 inline-flex items-center justify-center py-3 font-body text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ash"
            >
              Or text {BENZ.phone}
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
