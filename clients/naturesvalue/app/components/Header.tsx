"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, Search, X } from "lucide-react";
import { NAV } from "../content/site";
import Logo from "./Logo";
import { useSite } from "./SiteProvider";
import { btn } from "./styles";

export default function Header() {
  const pathname = usePathname();
  const { openQuote, openSearch } = useSite();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenu(null);
    }
    function onClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setMenu(null);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const closeAll = () => {
    setMenu(null);
    setMobileOpen(false);
  };
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <div className="bg-lime text-forest">
        <p className="mx-auto max-w-6xl px-4 py-2 text-center text-xs font-semibold sm:px-6 sm:text-sm">
          {/* VERIFY: announcement wording and timing with the client */}
          Growing with you: our new North Carolina facility is on the way.{" "}
          <Link href="/about" className="underline underline-offset-2">
            Learn more
          </Link>
        </p>
      </div>
      <header
        className={`sticky top-0 z-40 border-b transition-all ${
          scrolled ? "border-line bg-paper/90 shadow-sm backdrop-blur-md" : "border-transparent bg-paper"
        }`}
      >
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between px-4 transition-all sm:px-6 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          <Link href="/" className="shrink-0" onClick={closeAll}>
            <Logo />
          </Link>

          <nav ref={navRef} aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) =>
              item.items ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => {
                    clearTimeout(hoverTimer.current);
                    setMenu(item.label);
                  }}
                  onMouseLeave={() => {
                    hoverTimer.current = setTimeout(() => setMenu(null), 150);
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={menu === item.label}
                    aria-controls={`menu-${item.label}`}
                    onClick={() => setMenu((m) => (m === item.label ? null : item.label))}
                    className={`flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-sage hover:text-forest ${
                      isActive(item.href) ? "text-forest" : "text-stone"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${menu === item.label ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    id={`menu-${item.label}`}
                    hidden={menu !== item.label}
                    className="absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-3"
                  >
                    <div className="toast grid grid-cols-[11rem_1fr] overflow-hidden rounded-2xl border border-line bg-white shadow-2xl">
                      <div className="bg-forest p-5 text-white">
                        <p className="font-display text-lg font-semibold">{item.label}</p>
                        <p className="mt-1 text-xs text-white/70">{item.blurb}</p>
                        <Link
                          href={item.href}
                          onClick={closeAll}
                          className="mt-6 inline-flex items-center gap-1 text-xs font-semibold text-lime"
                        >
                          Overview <ArrowRight size={12} />
                        </Link>
                      </div>
                      <ul className="grid gap-1 p-3">
                        {item.items.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              onClick={closeAll}
                              aria-current={pathname === sub.href ? "page" : undefined}
                              className="block rounded-xl px-3 py-2 transition-colors hover:bg-sage aria-[current=page]:bg-sage"
                            >
                              <span className="block text-sm font-semibold text-forest">{sub.label}</span>
                              <span className="block text-xs text-stone">{sub.desc}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeAll}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="rounded-full px-3 py-2 text-sm font-medium text-stone transition-colors hover:bg-sage hover:text-forest aria-[current=page]:text-forest"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search the site"
              className="flex items-center gap-2 rounded-full border border-line px-3 py-2 text-sm text-stone transition-colors hover:border-leaf hover:text-forest"
            >
              <Search size={16} aria-hidden="true" />
              <kbd className="hidden text-xs xl:inline">Ctrl K</kbd>
            </button>
            <button type="button" onClick={() => openQuote()} className={`max-lg:hidden ${btn("primary")} py-2.5`}>
              Request a quote
            </button>
            <button
              type="button"
              className="p-2 text-forest lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav
            id="mobile-nav"
            aria-label="Main"
            className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-line bg-paper px-4 pb-8 pt-2 lg:hidden"
          >
            {NAV.map((item) =>
              item.items ? (
                <details key={item.label} className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-lg font-medium text-ink">
                    {item.label}
                    <ChevronDown size={18} className="transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <ul className="pb-4">
                    <li>
                      <Link href={item.href} onClick={closeAll} className="block py-2 pl-3 font-semibold text-leaf">
                        Overview
                      </Link>
                    </li>
                    {item.items.map((sub) => (
                      <li key={sub.href}>
                        <Link href={sub.href} onClick={closeAll} className="block py-2 pl-3 text-stone">
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeAll}
                  className="block border-b border-line py-4 text-lg font-medium text-ink"
                >
                  {item.label}
                </Link>
              ),
            )}
            <button
              type="button"
              onClick={() => {
                closeAll();
                openQuote();
              }}
              className={`mt-6 w-full ${btn("primary")}`}
            >
              Request a quote
            </button>
          </nav>
        )}
      </header>
    </>
  );
}
