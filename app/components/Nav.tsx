"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import AuthorGlow from "@/app/components/AuthorGlow";

type NavLinkItem = {
  label: string;
  href: string;
};

const workLinks: NavLinkItem[] = [
  { label: "All Offerings", href: "/services#offerings" },
  { label: "Founding Redesign Offer", href: "/redesign" },
  { label: "Web Design & Build", href: "/studio" },
  { label: "Outbound & Growth", href: "/growth" },
  { label: "Messaging & Copy", href: "/brand" },
  { label: "Positioning Audit", href: "/audit" },
  { label: "How I Work", href: "/how-i-work" },
  { label: "Client Results", href: "/testimonials" },
];

const megaServices = [
  {
    tag: "Websites",
    title: "The Build",
    price: "From $6,000",
    desc: "Conversion website strategy, copy, design, and build handled together.",
    href: "/services#offerings",
  },
  {
    tag: "Outbound",
    title: "The Outbound Engine",
    price: "From $2,500/mo",
    desc: "Cold email and LinkedIn systems built to book qualified calls.",
    href: "/services#offerings",
  },
  {
    tag: "Growth",
    title: "Full-Funnel Growth",
    price: "From $6,500/mo",
    desc: "Demand, conversion, and activation run as one revenue motion.",
    href: "/services#offerings",
  },
  {
    tag: "Messaging",
    title: "The Rewrite",
    price: "From $2,500",
    desc: "Core positioning and copy rebuilt so buyers understand the value faster.",
    href: "/services#offerings",
  },
  {
    tag: "Thought Leadership",
    title: "The Byline",
    price: "From $2,500/mo",
    desc: "Founder and executive content shaped into a consistent point of view.",
    href: "/services#offerings",
  },
  {
    tag: "Quick Fix",
    title: "The Edit",
    price: "From $250",
    desc: "One high-value piece of copy tightened, clarified, and improved.",
    href: "/services#offerings",
  },
] as const;

const mobileSections: { label: string; links: NavLinkItem[] }[] = [
  {
    label: "Work",
    links: workLinks,
  },
  {
    label: "More",
    links: [
      { label: "Rebecoming", href: "/rebecoming" },
      { label: "Shop", href: "/shop" },
      { label: "Cosmos", href: "/cosmos" },
      { label: "Client Results", href: "/testimonials" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);
  const [progress, setProgress] = useState(0);
  const [workOpen, setWorkOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const showBackTopButton = showBackTop && pathname !== "/services";

  const workRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  const closeAllDropdowns = () => {
    setWorkOpen(false);
    setServicesOpen(false);
  };

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setShowBackTop(y > 500);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (y / total) * 100 : 0);
      setWorkOpen(false);
      setServicesOpen(false);
    };

    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (workRef.current && !workRef.current.contains(e.target as Node)) setWorkOpen(false);
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

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

  useEffect(() => {
    document.body.style.overflow = mobileNav || mobileServices ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNav, mobileServices]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMobileNav(false);
      setMobileServices(false);
      closeAllDropdowns();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.replace("#offerings", ""));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[900] border-b border-petal/15 transition-all duration-300 ${
          scrolled
            ? "bg-void/[0.94] shadow-[0_12px_50px_rgba(0,0,0,0.4),0_0_28px_rgba(255,181,208,0.08)] backdrop-blur-[14px]"
            : "bg-void/[0.82] backdrop-blur-[14px]"
        }`}
      >
        <div
          className="absolute bottom-0 left-0 h-px bg-petal transition-none"
          style={{ width: `${progress}%`, opacity: progress > 0 ? 0.7 : 0 }}
        />

        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 lg:px-8 2xl:px-10">
          <div className="flex items-center gap-3">
            <AuthorGlow size={40} ring={2} className="hidden sm:inline-block" />
            <Link
              href="/"
              className="font-display text-2xl tracking-[0.02em] text-white"
              style={{ lineHeight: 1 }}
            >
              MK PARRISH
            </Link>
          </div>

          <nav className="ml-5 hidden min-w-0 flex-1 items-center justify-end gap-3 lg:flex xl:gap-5 2xl:gap-7">
            <div
              ref={servicesRef}
              className="mega-menu order-first"
              onMouseEnter={() => {
                closeAllDropdowns();
                setServicesOpen(true);
              }}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                onClick={() => {
                  const next = !servicesOpen;
                  closeAllDropdowns();
                  setServicesOpen(next);
                }}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                className={`nav-link flex items-center gap-1 whitespace-nowrap font-body text-[0.58rem] font-medium uppercase tracking-[0.1em] transition-colors hover:text-pearl focus:outline-none focus-visible:text-pearl xl:text-[0.62rem] xl:tracking-[0.12em] ${
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
                    <p className="mb-1 font-body text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-iron">
                      {s.tag}
                    </p>
                    <p className="font-display text-lg uppercase leading-tight tracking-[0.02em] text-pearl">
                      {s.title}
                    </p>
                    <p className="mt-1 font-display text-sm text-petal">{s.price}</p>
                    <p className="mt-1.5 font-body text-[0.7rem] font-light leading-5 text-smoke">{s.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div
              ref={workRef}
              className="relative"
              onMouseEnter={() => {
                closeAllDropdowns();
                setWorkOpen(true);
              }}
              onMouseLeave={() => setWorkOpen(false)}
            >
              <button
                onClick={() => {
                  const next = !workOpen;
                  closeAllDropdowns();
                  setWorkOpen(next);
                }}
                aria-expanded={workOpen}
                aria-haspopup="true"
                className={`nav-link flex items-center gap-1 whitespace-nowrap font-body text-[0.58rem] font-medium uppercase tracking-[0.1em] transition-colors hover:text-pearl focus:outline-none focus-visible:text-pearl xl:text-[0.62rem] xl:tracking-[0.12em] ${
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
                className={`absolute left-0 top-full z-50 min-w-[220px] border border-graphite bg-void/97 py-2 backdrop-blur-xl transition-all duration-200 ${
                  workOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
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

            <Link
              href="/rebecoming"
              className={`nav-link whitespace-nowrap font-body text-[0.58rem] font-medium uppercase tracking-[0.1em] transition-colors hover:text-pearl focus:outline-none focus-visible:text-pearl xl:text-[0.62rem] xl:tracking-[0.12em] ${
                isActive("/rebecoming") ? "active text-pearl" : "text-ash"
              }`}
            >
              Rebecoming
            </Link>

            <Link
              href="/shop"
              className={`nav-link whitespace-nowrap font-body text-[0.58rem] font-medium uppercase tracking-[0.1em] transition-colors hover:text-pearl focus:outline-none focus-visible:text-pearl xl:text-[0.62rem] xl:tracking-[0.12em] ${
                isActive("/shop") ? "active text-pearl" : "text-ash"
              }`}
            >
              Shop
            </Link>

            <Link
              href="/cosmos"
              className={`nav-link whitespace-nowrap font-body text-[0.58rem] font-medium uppercase tracking-[0.1em] transition-colors hover:text-pearl focus:outline-none focus-visible:text-pearl xl:text-[0.62rem] xl:tracking-[0.12em] ${
                isActive("/cosmos") ? "active text-pearl" : "text-ash"
              }`}
            >
              Cosmos
            </Link>

            <Link
              href="/about"
              className={`nav-link whitespace-nowrap font-body text-[0.58rem] font-medium uppercase tracking-[0.1em] transition-colors hover:text-pearl focus:outline-none focus-visible:text-pearl xl:text-[0.62rem] xl:tracking-[0.12em] ${
                isActive("/about") ? "active text-pearl" : "text-ash"
              }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`nav-link whitespace-nowrap font-body text-[0.58rem] font-medium uppercase tracking-[0.1em] transition-colors hover:text-pearl focus:outline-none focus-visible:text-pearl xl:text-[0.62rem] xl:tracking-[0.12em] ${
                isActive("/contact") ? "active text-pearl" : "text-ash"
              }`}
            >
              Contact
            </Link>
          </nav>

          <div className="hidden items-center gap-3 2xl:flex">
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

          <button
            onClick={() => setMobileNav(!mobileNav)}
            className="flex flex-col gap-1.5 lg:hidden"
            aria-label={mobileNav ? "Close menu" : "Open menu"}
            aria-expanded={mobileNav}
          >
            <span className={`block h-px w-6 bg-pearl transition-all duration-300 ${mobileNav ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-pearl transition-all duration-300 ${mobileNav ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-pearl transition-all duration-300 ${mobileNav ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </button>
        </div>

        <div
          className={`fixed inset-0 z-40 flex flex-col bg-void/[0.98] backdrop-blur-xl transition-all duration-500 lg:hidden ${
            mobileNav ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", top: 0 }}
        >
          <div className="flex items-center justify-between border-b border-graphite px-6 py-4">
            <Link
              href="/"
              onClick={() => setMobileNav(false)}
              className="font-display text-2xl tracking-[0.02em] text-white"
              style={{ lineHeight: 1 }}
            >
              MK PARRISH
            </Link>
            <button onClick={() => setMobileNav(false)} className="flex flex-col gap-1.5" aria-label="Close menu">
              <span className="block h-px w-6 translate-y-[7px] rotate-45 bg-pearl" />
              <span className="block h-px w-6 bg-pearl opacity-0" />
              <span className="block h-px w-6 -translate-y-[7px] -rotate-45 bg-pearl" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
            <button
              onClick={() => {
                setMobileNav(false);
                setMobileServices(true);
              }}
              className="group mb-8 flex w-full items-center justify-between border border-graphite bg-carbon p-5 text-left"
            >
              <div>
                <p className="mb-1 font-body text-[0.55rem] font-bold uppercase tracking-[0.25em] text-petal">All Services</p>
                <p className="font-display text-xl uppercase leading-tight tracking-[0.02em] text-pearl">Browse Services & Pricing</p>
              </div>
              <span className="text-xl text-petal">→</span>
            </button>

            {mobileSections.map((section) => (
              <div key={section.label} className="mb-8">
                <p className="mb-3 border-b border-graphite pb-2 font-body text-[0.55rem] font-bold uppercase tracking-[0.3em] text-petal">
                  {section.label}
                </p>
                <div className="flex flex-col gap-0">
                  {section.links.map((l) => (
                    <Link
                      key={`${section.label}-${l.label}`}
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

            <div className="flex flex-col gap-3">
              <Link
                href="/shop"
                onClick={() => setMobileNav(false)}
                className="btn-ghost inline-flex w-full justify-center px-5 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em]"
              >
                Shop
              </Link>
              <Link
                href="/book"
                onClick={() => setMobileNav(false)}
                className="btn-primary inline-flex w-full justify-center px-5 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
              >
                Book a Call
              </Link>
            </div>
          </div>
        </div>

        <div
          className={`fixed inset-0 z-40 flex flex-col bg-void/[0.98] backdrop-blur-xl transition-all duration-500 lg:hidden ${
            mobileServices ? "pointer-events-auto translate-x-0 opacity-100" : "pointer-events-none translate-x-full opacity-0"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", top: 0 }}
        >
          <div className="flex items-center justify-between border-b border-graphite px-6 py-4">
            <button
              onClick={() => {
                setMobileServices(false);
                setMobileNav(true);
              }}
              className="flex items-center gap-2 font-body text-[0.62rem] font-bold uppercase tracking-[0.15em] text-ash hover:text-pearl"
              aria-label="Back to menu"
            >
              ← Menu
            </button>
            <p className="font-display text-base uppercase tracking-[0.08em] text-pearl">Services</p>
            <button onClick={() => setMobileServices(false)} className="flex flex-col gap-1.5" aria-label="Close">
              <span className="block h-px w-6 translate-y-[7px] rotate-45 bg-pearl" />
              <span className="block h-px w-6 bg-pearl opacity-0" />
              <span className="block h-px w-6 -translate-y-[7px] -rotate-45 bg-pearl" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
            <p className="mb-6 font-serif text-lg italic text-petal/80">Pick the business gap you need to close.</p>
            <div className="flex flex-col gap-3">
              {megaServices.map((s) => (
                <Link
                  key={s.title}
                  href={s.href}
                  onClick={() => setMobileServices(false)}
                  className="border border-graphite bg-obsidian p-5 transition-all hover:border-petal/40 hover:bg-carbon"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="mb-1 font-body text-[0.55rem] font-bold uppercase tracking-[0.25em] text-iron">{s.tag}</p>
                      <p className="font-display text-xl uppercase leading-tight tracking-[0.02em] text-pearl">{s.title}</p>
                      <p className="mt-1.5 font-body text-[0.75rem] font-light leading-5 text-smoke">{s.desc}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="whitespace-nowrap font-display text-base text-petal">{s.price}</p>
                      <span className="mt-2 block text-lg text-petal">→</span>
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
        <Link href="/shop" className={`mobile-bottom-nav-item${isActive("/shop") ? " active" : ""}`}>
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
            <line x1="3" y1="6" x2="21" y2="6" />
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

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-24 right-6 z-50 flex h-11 w-11 items-center justify-center border border-petal/30 bg-carbon/90 text-petal backdrop-blur-sm transition-all duration-500 hover:border-petal hover:shadow-[0_0_20px_rgba(242,175,198,0.2)] md:bottom-8 md:right-8"
        style={{
          opacity: showBackTopButton ? 1 : 0,
          transform: showBackTopButton ? "translateY(0)" : "translateY(10px)",
          pointerEvents: showBackTopButton ? "auto" : "none",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        aria-label="Back to top"
      >
        <span className="font-display text-base leading-none" style={{ fontSize: "1.1rem" }}>↑</span>
      </button>
    </>
  );
}
