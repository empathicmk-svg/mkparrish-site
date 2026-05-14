"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { PATREON_URL } from "@/app/lib/config";

const workLinks = [
  { label: "Career",       href: "/career" },
  { label: "Brand",        href: "/brand" },
  { label: "Presence",     href: "/presence" },
  { label: "Next Chapter", href: "/next-chapter" },
  { label: "Growth",       href: "/growth" },
  { label: "LinkedIn",     href: "/linkedin" },
];

const megaServices = [
  { tag: "Quick Fix",     title: "The Edit",        price: "From $100",      desc: "One piece of copy rewritten in 48 hours.", href: "/career" },
  { tag: "Power Hour",    title: "The Session",     price: "$250",           desc: "60-min live strategy session with written brief.", href: "/book" },
  { tag: "Most Requested",title: "The Rewrite",     price: "From $1,500",    desc: "Full story overhaul anchored in strategy.", href: "/career" },
  { tag: "Full Reset",    title: "The New Chapter", price: "Custom",         desc: "Brand, website, and positioning from scratch.", href: "/next-chapter" },
  { tag: "Ongoing",       title: "The Byline",      price: "From $1,500/mo", desc: "Monthly ghostwriting under your name.", href: "/presence" },
  { tag: "Full Site",     title: "The Build",       price: "From $3,500",   desc: "Strategy, copy, and design — done together.", href: "/brand" },
];

const mobileAllLinks = [
  { label: "Home",         href: "/" },
  { label: "Career",       href: "/career" },
  { label: "Brand",        href: "/brand" },
  { label: "Presence",     href: "/presence" },
  { label: "Next Chapter", href: "/next-chapter" },
  { label: "Growth",       href: "/growth" },
  { label: "LinkedIn",     href: "/linkedin" },
  { label: "About",        href: "/about" },
  { label: "Writing",      href: "/writing" },
  { label: "Shop",         href: "/shop" },
  { label: "The Margins",  href: "/margins" },
  { label: "Contact",      href: "/contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileNav,    setMobileNav]    = useState(false);
  const [showBackTop,  setShowBackTop]  = useState(false);
  const [showMargins,  setShowMargins]  = useState(false);
  const [progress,     setProgress]     = useState(0);
  const [workOpen,     setWorkOpen]     = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const workRef     = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setShowBackTop(y > 500);
      setShowMargins(y > 300);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (y / total) * 100 : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (workRef.current && !workRef.current.contains(e.target as Node)) {
        setWorkOpen(false);
      }
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileNav(false);
    setWorkOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-graphite bg-void/[0.92] backdrop-blur-[12px]"
            : "bg-void/75 backdrop-blur-[12px]"
        }`}
      >
        {/* Scroll progress bar */}
        <div
          className="absolute bottom-0 left-0 h-px bg-petal transition-none"
          style={{ width: `${progress}%`, opacity: progress > 0 ? 0.7 : 0 }}
        />

        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-10">
          <Link
            href="/"
            className="font-display text-2xl tracking-[0.02em] text-white"
            style={{ lineHeight: 1 }}
          >
            MK PARRISH
          </Link>

          {/* Desktop nav */}
          <nav className="ml-8 hidden min-w-0 flex-1 items-center justify-end gap-6 md:flex lg:gap-8">

            {/* Work dropdown */}
            <div
              ref={workRef}
              className="relative"
              onMouseEnter={() => setWorkOpen(true)}
              onMouseLeave={() => setWorkOpen(false)}
            >
              <button
                onClick={() => setWorkOpen(!workOpen)}
                className={`nav-link flex items-center gap-1 whitespace-nowrap font-body text-[0.62rem] font-medium uppercase tracking-[0.12em] transition-colors hover:text-pearl ${
                  workOpen ? "text-pearl" : "text-ash"
                }`}
              >
                Work
                <span
                  className="transition-transform duration-200"
                  style={{ transform: workOpen ? "rotate(180deg)" : "rotate(0deg)", fontSize: "0.5rem" }}
                >
                  ▾
                </span>
              </button>
              <div
                className={`absolute left-0 top-full z-50 min-w-[180px] border border-graphite bg-void/97 py-2 backdrop-blur-xl transition-all duration-200 ${
                  workOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-2"
                }`}
              >
                {workLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="block px-5 py-2.5 font-body text-[0.62rem] font-medium uppercase tracking-[0.12em] text-ash transition-colors hover:bg-carbon hover:text-pearl"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Services mega-dropdown */}
            <div
              ref={servicesRef}
              className="mega-menu"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className={`nav-link flex items-center gap-1 whitespace-nowrap font-body text-[0.62rem] font-medium uppercase tracking-[0.12em] transition-colors hover:text-pearl ${
                  servicesOpen ? "text-pearl" : "text-ash"
                }`}
              >
                Services
                <span
                  className="transition-transform duration-200"
                  style={{ transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)", fontSize: "0.5rem" }}
                >
                  ▾
                </span>
              </button>
              <div className={`mega-menu-panel${servicesOpen ? " open" : ""}`}>
                {megaServices.map((s) => (
                  <Link key={s.title} href={s.href} className="mega-service-card">
                    <p className="font-body text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-iron mb-1">
                      {s.tag}
                    </p>
                    <p className="font-display text-lg uppercase tracking-[0.02em] text-pearl leading-tight">
                      {s.title}
                    </p>
                    <p className="mt-1 font-display text-sm text-petal">{s.price}</p>
                    <p className="mt-1.5 font-body text-[0.7rem] font-light leading-5 text-smoke">{s.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/writing"
              className={`nav-link whitespace-nowrap font-body text-[0.62rem] font-medium uppercase tracking-[0.12em] transition-colors hover:text-pearl ${
                isActive("/writing") ? "active text-pearl" : "text-ash"
              }`}
            >
              Content
            </Link>

            <Link
              href="/about"
              className={`nav-link whitespace-nowrap font-body text-[0.62rem] font-medium uppercase tracking-[0.12em] transition-colors hover:text-pearl ${
                isActive("/about") ? "active text-pearl" : "text-ash"
              }`}
            >
              About
            </Link>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/shop"
              className="btn-ghost px-4 py-2 font-body text-[0.65rem] font-bold uppercase tracking-[0.18em]"
            >
              Shop
            </Link>
            <Link
              href="/book"
              className="btn-primary px-5 py-2.5 font-body text-[0.7rem] font-bold uppercase tracking-[0.2em] text-void"
            >
              Book a Call
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileNav(!mobileNav)}
            className="flex flex-col gap-1.5 md:hidden"
            aria-label="Menu"
          >
            <span className={`block h-px w-6 bg-pearl transition-all duration-300 ${mobileNav ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-pearl transition-all duration-300 ${mobileNav ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-pearl transition-all duration-300 ${mobileNav ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>

        {/* Mobile full-screen overlay — slides from top */}
        <div
          className={`fixed inset-0 z-40 flex flex-col bg-void/[0.98] backdrop-blur-xl transition-all duration-500 md:hidden ${
            mobileNav ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-full"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", top: 0 }}
        >
          {/* Header row inside overlay */}
          <div className="flex items-center justify-between px-6 py-4">
            <Link
              href="/"
              onClick={() => setMobileNav(false)}
              className="font-display text-2xl tracking-[0.02em] text-white"
              style={{ lineHeight: 1 }}
            >
              MK PARRISH
            </Link>
            <button
              onClick={() => setMobileNav(false)}
              className="flex flex-col gap-1.5"
              aria-label="Close menu"
            >
              <span className="block h-px w-6 bg-pearl translate-y-[7px] rotate-45" />
              <span className="block h-px w-6 bg-pearl opacity-0" />
              <span className="block h-px w-6 bg-pearl -translate-y-[7px] -rotate-45" />
            </button>
          </div>

          <div className="overflow-y-auto flex-1 px-6 py-8">
            <div className="flex flex-col gap-0">
              {mobileAllLinks.map((l, i) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileNav(false)}
                  className="border-b border-graphite py-5 font-display text-4xl uppercase tracking-[0.02em] text-pearl transition-colors hover:text-petal"
                  style={{
                    opacity: mobileNav ? 1 : 0,
                    transform: mobileNav ? "translateY(0)" : "translateY(24px)",
                    transition: `opacity 0.4s var(--ease-luxury) ${i * 45}ms, transform 0.4s var(--ease-luxury) ${i * 45}ms`,
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div
              className="mt-8 flex flex-col gap-3"
              style={{
                opacity: mobileNav ? 1 : 0,
                transition: `opacity 0.4s var(--ease-luxury) ${mobileAllLinks.length * 45 + 50}ms`,
              }}
            >
              <Link
                href="/book"
                onClick={() => setMobileNav(false)}
                className="btn-primary inline-flex justify-center px-5 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
              >
                Book a Call
              </Link>
              <Link
                href="/shop"
                onClick={() => setMobileNav(false)}
                className="btn-ghost inline-flex justify-center px-5 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em]"
              >
                Shop
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile bottom navigation bar */}
      <nav className="mobile-bottom-nav">
        <Link href="/" className={`mobile-bottom-nav-item${pathname === "/" ? " active" : ""}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          Home
        </Link>
        <button
          onClick={() => setMobileNav(!mobileNav)}
          className={`mobile-bottom-nav-item${mobileNav ? " active" : ""}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="9" cy="12" r="1" fill="currentColor" />
            <circle cx="15" cy="12" r="1" fill="currentColor" />
            <rect x="3" y="3" width="18" height="18" rx="2" />
          </svg>
          Services
        </button>
        <Link href="/shop" className={`mobile-bottom-nav-item${isActive("/shop") ? " active" : ""}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          Shop
        </Link>
        <Link href="/about" className={`mobile-bottom-nav-item${isActive("/about") ? " active" : ""}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
          About
        </Link>
        <Link href="/book" className="mobile-bottom-nav-book">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          Book
        </Link>
      </nav>

      {/* Floating Margins pill */}
      <a
        href={PATREON_URL}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 btn-primary whitespace-nowrap px-6 py-3 font-body text-[0.7rem] font-bold uppercase tracking-[0.2em] text-void shadow-[0_0_40px_rgba(242,175,198,0.25)] md:bottom-8"
        style={{
          opacity: showMargins ? 1 : 0,
          transform: showMargins
            ? "translateX(-50%) translateY(0)"
            : "translateX(-50%) translateY(16px)",
          pointerEvents: showMargins ? "auto" : "none",
          transition: "opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
        aria-label="Join The Margins on Patreon"
      >
        Enter The Margins →
      </a>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-24 right-6 z-50 flex h-11 w-11 items-center justify-center border border-petal/30 bg-carbon/90 text-petal backdrop-blur-sm transition-all duration-500 hover:border-petal hover:shadow-[0_0_20px_rgba(242,175,198,0.2)] md:bottom-8 md:right-8"
        style={{
          opacity: showBackTop ? 1 : 0,
          transform: showBackTop ? "translateY(0)" : "translateY(10px)",
          pointerEvents: showBackTop ? "auto" : "none",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        aria-label="Back to top"
      >
        <span className="font-display text-base leading-none" style={{ fontSize: "1.1rem" }}>↑</span>
      </button>
    </>
  );
}
