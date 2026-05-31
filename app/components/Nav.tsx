"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { PATREON_URL } from "@/app/lib/config";

const workLinks = [
  { label: "All Offerings",       href: "/#offerings" },
  { label: "Web Design & Build",  href: "/studio" },
  { label: "Outbound & Growth",   href: "/growth" },
  { label: "Messaging & Copy",    href: "/brand" },
  { label: "How I Work",          href: "/how-i-work" },
];

const megaServices = [
  { tag: "Websites",     title: "The Build",          price: "From $6,000",    desc: "Conversion website — strategy, copy, design, and build, together.", href: "/#offerings" },
  { tag: "Outbound",     title: "The Outbound Engine", price: "From $2,500/mo", desc: "Cold email + LinkedIn that books qualified calls.", href: "/#offerings" },
  { tag: "Growth",       title: "Full-Funnel Growth", price: "From $6,500/mo", desc: "Demand through activation, run as one motion.", href: "/#offerings" },
  { tag: "Messaging",    title: "The Rewrite",        price: "From $2,500",    desc: "Core messaging overhauled. Results that match the copy.", href: "/#offerings" },
  { tag: "Ghostwriting", title: "The Byline",         price: "From $2,500/mo", desc: "Monthly founder and exec thought leadership.", href: "/#offerings" },
  { tag: "Quick Fix",    title: "The Edit",           price: "From $250",      desc: "One piece of copy, fixed in 48 hours.", href: "/#offerings" },
];

const readLinks = [
  { label: "Writing",      desc: "Poetry, essays & the work that proves the voice", href: "/writing" },
  { label: "The Shelf",    desc: "Ebooks, guides & prints — buy direct",            href: "/shelf" },
  { label: "Quotes",       desc: "Words worth keeping",                             href: "/posts" },
  { label: "The Margins",  desc: "Private membership essays & frameworks",          href: "/margins" },
];

// Sectioned mobile menu
const mobileSections: { label: string; links: { label: string; href: string }[] }[] = [
  {
    label: "Work",
    links: [
      { label: "All Offerings",      href: "/#offerings" },
      { label: "Web Design & Build", href: "/studio" },
      { label: "Outbound & Growth",  href: "/growth" },
      { label: "Messaging & Copy",   href: "/brand" },
      { label: "How I Work",         href: "/how-i-work" },
    ],
  },
  {
    label: "Read",
    links: [
      { label: "Writing",     href: "/writing" },
      { label: "The Shelf",   href: "/shelf" },
      { label: "Quotes",      href: "/posts" },
      { label: "The Margins", href: "/margins" },
    ],
  },
  {
    label: "More",
    links: [
      { label: "Shop",    href: "/shelf" },
      { label: "About",   href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled,        setScrolled]        = useState(false);
  const [mobileNav,       setMobileNav]       = useState(false);
  const [mobileServices,  setMobileServices]  = useState(false);
  const [showBackTop,     setShowBackTop]     = useState(false);
  const [showMargins,     setShowMargins]     = useState(false);
  const [progress,        setProgress]        = useState(0);
  const [workOpen,        setWorkOpen]        = useState(false);
  const [servicesOpen,    setServicesOpen]    = useState(false);
  const [readOpen,        setReadOpen]        = useState(false);

  const workRef     = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const readRef     = useRef<HTMLDivElement>(null);

  const closeAllDropdowns = () => {
    setWorkOpen(false);
    setServicesOpen(false);
    setReadOpen(false);
  };

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
      if (workRef.current && !workRef.current.contains(e.target as Node)) setWorkOpen(false);
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
      if (readRef.current && !readRef.current.contains(e.target as Node)) setReadOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Esc key closes everything
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileNav(false);
        setMobileServices(false);
        closeAllDropdowns();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Body scroll lock when mobile menus are open
  useEffect(() => {
    if (mobileNav || mobileServices) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNav, mobileServices]);

  // Close everything on route change
  useEffect(() => {
    setMobileNav(false);
    setMobileServices(false);
    closeAllDropdowns();
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
          <nav className="ml-8 hidden min-w-0 flex-1 items-center justify-end gap-5 md:flex lg:gap-7">

            {/* Work dropdown */}
            <div
              ref={workRef}
              className="relative"
              onMouseEnter={() => { closeAllDropdowns(); setWorkOpen(true); }}
              onMouseLeave={() => setWorkOpen(false)}
            >
              <button
                onClick={() => { const next = !workOpen; closeAllDropdowns(); setWorkOpen(next); }}
                aria-expanded={workOpen}
                aria-haspopup="true"
                className={`nav-link flex items-center gap-1 whitespace-nowrap font-body text-[0.62rem] font-medium uppercase tracking-[0.12em] transition-colors hover:text-pearl focus:outline-none focus-visible:text-pearl ${
                  workOpen ? "text-pearl" : "text-ash"
                }`}
              >
                Work
                <span
                  className="transition-transform duration-200"
                  style={{ transform: workOpen ? "rotate(180deg)" : "rotate(0deg)", fontSize: "0.5rem" }}
                  aria-hidden
                >
                  ▾
                </span>
              </button>
              <div
                role="menu"
                className={`absolute left-0 top-full z-50 min-w-[200px] border border-graphite bg-void/97 py-2 backdrop-blur-xl transition-all duration-200 ${
                  workOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-2"
                }`}
              >
                {workLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    role="menuitem"
                    className={`block px-5 py-2.5 font-body text-[0.62rem] font-medium uppercase tracking-[0.12em] transition-colors hover:bg-carbon hover:text-pearl ${
                      isActive(l.href) ? "text-petal" : "text-ash"
                    }`}
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
              onMouseEnter={() => { closeAllDropdowns(); setServicesOpen(true); }}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                onClick={() => { const next = !servicesOpen; closeAllDropdowns(); setServicesOpen(next); }}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                className={`nav-link flex items-center gap-1 whitespace-nowrap font-body text-[0.62rem] font-medium uppercase tracking-[0.12em] transition-colors hover:text-pearl focus:outline-none focus-visible:text-pearl ${
                  servicesOpen ? "text-pearl" : "text-ash"
                }`}
              >
                Services
                <span
                  className="transition-transform duration-200"
                  style={{ transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)", fontSize: "0.5rem" }}
                  aria-hidden
                >
                  ▾
                </span>
              </button>
              <div className={`mega-menu-panel${servicesOpen ? " open" : ""}`} role="menu">
                {megaServices.map((s) => (
                  <Link key={s.title} href={s.href} className="mega-service-card" role="menuitem">
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

            {/* Read dropdown */}
            <div
              ref={readRef}
              className="relative"
              onMouseEnter={() => { closeAllDropdowns(); setReadOpen(true); }}
              onMouseLeave={() => setReadOpen(false)}
            >
              <button
                onClick={() => { const next = !readOpen; closeAllDropdowns(); setReadOpen(next); }}
                aria-expanded={readOpen}
                aria-haspopup="true"
                className={`nav-link flex items-center gap-1 whitespace-nowrap font-body text-[0.62rem] font-medium uppercase tracking-[0.12em] transition-colors hover:text-pearl focus:outline-none focus-visible:text-pearl ${
                  readOpen ? "text-pearl" : "text-ash"
                }`}
              >
                Read
                <span
                  className="transition-transform duration-200"
                  style={{ transform: readOpen ? "rotate(180deg)" : "rotate(0deg)", fontSize: "0.5rem" }}
                  aria-hidden
                >
                  ▾
                </span>
              </button>
              <div
                role="menu"
                className={`absolute left-0 top-full z-50 min-w-[280px] border border-graphite bg-void/97 py-2 backdrop-blur-xl transition-all duration-200 ${
                  readOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-2"
                }`}
              >
                {readLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    role="menuitem"
                    className={`block px-5 py-3 transition-colors hover:bg-carbon group ${
                      isActive(l.href) ? "" : ""
                    }`}
                  >
                    <p className={`font-body text-[0.65rem] font-bold uppercase tracking-[0.15em] ${
                      isActive(l.href) ? "text-petal" : "text-pearl"
                    } group-hover:text-petal transition-colors`}>
                      {l.label}
                    </p>
                    <p className="mt-0.5 font-body text-[0.65rem] text-iron font-light">{l.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/about"
              className={`nav-link whitespace-nowrap font-body text-[0.62rem] font-medium uppercase tracking-[0.12em] transition-colors hover:text-pearl focus:outline-none focus-visible:text-pearl ${
                isActive("/about") ? "active text-pearl" : "text-ash"
              }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`nav-link whitespace-nowrap font-body text-[0.62rem] font-medium uppercase tracking-[0.12em] transition-colors hover:text-pearl focus:outline-none focus-visible:text-pearl ${
                isActive("/contact") ? "active text-pearl" : "text-ash"
              }`}
            >
              Contact
            </Link>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/shelf"
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
            aria-label={mobileNav ? "Close menu" : "Open menu"}
            aria-expanded={mobileNav}
          >
            <span className={`block h-px w-6 bg-pearl transition-all duration-300 ${mobileNav ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-pearl transition-all duration-300 ${mobileNav ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-pearl transition-all duration-300 ${mobileNav ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>

        {/* Mobile full-screen overlay — sectioned */}
        <div
          className={`fixed inset-0 z-40 flex flex-col bg-void/[0.98] backdrop-blur-xl transition-all duration-500 md:hidden ${
            mobileNav ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-full"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", top: 0 }}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-graphite">
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

          <div className="overflow-y-auto flex-1 px-6 py-6 pb-32">

            {/* Featured: Services prompt */}
            <button
              onClick={() => { setMobileNav(false); setMobileServices(true); }}
              className="w-full text-left border border-graphite bg-carbon p-5 mb-8 flex items-center justify-between group"
              style={{
                opacity: mobileNav ? 1 : 0,
                transform: mobileNav ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.4s var(--ease-luxury) 50ms, transform 0.4s var(--ease-luxury) 50ms`,
              }}
            >
              <div>
                <p className="font-body text-[0.55rem] font-bold uppercase tracking-[0.25em] text-petal mb-1">All Services</p>
                <p className="font-display text-xl uppercase tracking-[0.02em] text-pearl leading-tight">Browse Services & Pricing</p>
              </div>
              <span className="text-petal text-xl">→</span>
            </button>

            {mobileSections.map((section, sectionIdx) => (
              <div
                key={section.label}
                className="mb-8"
                style={{
                  opacity: mobileNav ? 1 : 0,
                  transform: mobileNav ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.4s var(--ease-luxury) ${100 + sectionIdx * 80}ms, transform 0.4s var(--ease-luxury) ${100 + sectionIdx * 80}ms`,
                }}
              >
                <p className="font-body text-[0.55rem] font-bold uppercase tracking-[0.3em] text-petal mb-3 pb-2 border-b border-graphite">
                  {section.label}
                </p>
                <div className="flex flex-col gap-0">
                  {section.links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setMobileNav(false)}
                      className={`py-3 font-display text-2xl uppercase tracking-[0.02em] transition-colors hover:text-petal ${
                        isActive(l.href) ? "text-petal" : "text-pearl"
                      }`}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div
              className="mt-4 flex flex-col gap-3"
              style={{
                opacity: mobileNav ? 1 : 0,
                transition: `opacity 0.4s var(--ease-luxury) 400ms`,
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
                href="/shelf"
                onClick={() => setMobileNav(false)}
                className="btn-ghost inline-flex justify-center px-5 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em]"
              >
                Shop
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile dedicated Services panel */}
        <div
          className={`fixed inset-0 z-40 flex flex-col bg-void/[0.98] backdrop-blur-xl transition-all duration-500 md:hidden ${
            mobileServices ? "opacity-100 pointer-events-auto translate-x-0" : "opacity-0 pointer-events-none translate-x-full"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", top: 0 }}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-graphite">
            <button
              onClick={() => { setMobileServices(false); setMobileNav(true); }}
              className="flex items-center gap-2 font-body text-[0.62rem] font-bold uppercase tracking-[0.15em] text-ash hover:text-pearl"
              aria-label="Back to menu"
            >
              ← Menu
            </button>
            <p className="font-display text-base uppercase tracking-[0.08em] text-pearl">Services</p>
            <button
              onClick={() => setMobileServices(false)}
              className="flex flex-col gap-1.5"
              aria-label="Close"
            >
              <span className="block h-px w-6 bg-pearl translate-y-[7px] rotate-45" />
              <span className="block h-px w-6 bg-pearl opacity-0" />
              <span className="block h-px w-6 bg-pearl -translate-y-[7px] -rotate-45" />
            </button>
          </div>

          <div className="overflow-y-auto flex-1 px-6 py-6 pb-32">
            <p className="font-serif italic text-petal/80 text-lg mb-6">Pick the gap your company is trying to close.</p>
            <div className="flex flex-col gap-3">
              {megaServices.map((s, i) => (
                <Link
                  key={s.title}
                  href={s.href}
                  onClick={() => setMobileServices(false)}
                  className="border border-graphite bg-obsidian p-5 hover:bg-carbon hover:border-petal/40 transition-all"
                  style={{
                    opacity: mobileServices ? 1 : 0,
                    transform: mobileServices ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.4s var(--ease-luxury) ${i * 50}ms, transform 0.4s var(--ease-luxury) ${i * 50}ms`,
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-body text-[0.55rem] font-bold uppercase tracking-[0.25em] text-iron mb-1">{s.tag}</p>
                      <p className="font-display text-xl uppercase tracking-[0.02em] text-pearl leading-tight">{s.title}</p>
                      <p className="mt-1.5 font-body text-[0.75rem] font-light leading-5 text-smoke">{s.desc}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-display text-base text-petal whitespace-nowrap">{s.price}</p>
                      <span className="block mt-2 text-petal text-lg">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href="/book"
              onClick={() => setMobileServices(false)}
              className="btn-primary mt-6 inline-flex w-full justify-center px-5 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
            >
              Book a Free Strategy Call →
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile bottom navigation bar */}
      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        <Link href="/" className={`mobile-bottom-nav-item${pathname === "/" ? " active" : ""}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          Home
        </Link>
        <button
          onClick={() => setMobileServices(!mobileServices)}
          className={`mobile-bottom-nav-item${mobileServices ? " active" : ""}`}
          aria-label="Services"
          aria-expanded={mobileServices}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
          </svg>
          Services
        </button>
        <Link href="/shelf" className={`mobile-bottom-nav-item${isActive("/shelf") ? " active" : ""}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          Shop
        </Link>
        <button
          onClick={() => setMobileNav(!mobileNav)}
          className={`mobile-bottom-nav-item${mobileNav ? " active" : ""}`}
          aria-label="Menu"
          aria-expanded={mobileNav}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="3" y1="6"  x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          Menu
        </button>
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
