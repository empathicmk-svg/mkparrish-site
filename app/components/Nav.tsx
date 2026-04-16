"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CALENDLY_URL } from "@/app/lib/config";

const navLinks = [
  { label: "Career",       href: "/career" },
  { label: "Brand",        href: "/brand" },
  { label: "Presence",     href: "/presence" },
  { label: "Next Chapter", href: "/next-chapter" },
  { label: "The Margins",  href: "/margins" },
  { label: "About",        href: "/about" },
  { label: "Contact",      href: "/contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileNav,  setMobileNav]  = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);
  const [progress,   setProgress]   = useState(0);

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setShowBackTop(y > 500);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (y / total) * 100 : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileNav(false); }, [pathname]);

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
          <Link href="/" className="font-display text-2xl tracking-[0.02em] text-white" style={{ lineHeight: 1 }}>
            MK PARRISH
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={`nav-link font-body text-[0.7rem] font-medium uppercase tracking-[0.15em] transition-colors hover:text-pearl ${
                  isActive(l.href) ? "active text-pearl" : "text-ash"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-primary hidden px-5 py-2.5 font-body text-[0.7rem] font-bold uppercase tracking-[0.2em] text-void sm:inline-flex"
            >
              Book a Call
            </a>
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
        </div>

        {mobileNav && (
          <nav className="border-t border-graphite bg-void/95 px-6 py-6 backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-5">
              <Link href="/" onClick={() => setMobileNav(false)} className="font-body text-sm uppercase tracking-[0.15em] text-ash transition hover:text-pearl">
                Home
              </Link>
              {navLinks.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileNav(false)}
                  className="font-body text-sm uppercase tracking-[0.15em] text-ash transition hover:text-pearl"
                >
                  {l.label}
                </Link>
              ))}
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-2 inline-flex justify-center px-5 py-3 font-body text-[0.7rem] font-bold uppercase tracking-[0.2em] text-void"
              >
                Book a Call
              </a>
            </div>
          </nav>
        )}
      </header>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 z-50 flex h-11 w-11 items-center justify-center border border-petal/30 bg-carbon/90 text-petal backdrop-blur-sm transition-all duration-500 hover:border-petal hover:shadow-[0_0_20px_rgba(242,175,198,0.2)]"
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
