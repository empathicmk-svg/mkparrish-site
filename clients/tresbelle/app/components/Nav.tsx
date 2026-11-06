"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BOOKING_URL, brand, nav } from "@/content/site";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Links close the drawer via onClick; Escape closes it here.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open ? "border-b hairline bg-[rgba(18,16,15,0.86)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <Link href="/" className="flex items-baseline gap-2" aria-label={`${brand.legalName}, home`}>
          <span className="display text-[2rem] tracking-[0.06em]">{brand.name}</span>
          <span className="eyebrow hidden sm:inline">Aesthetics</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="eyebrow !text-[var(--color-smoke)] transition-colors hover:!text-[var(--color-pearl)]">
              {item.label}
            </Link>
          ))}
          <a href={BOOKING_URL} target="_blank" rel="noopener" className="btn btn-primary !min-h-[40px]">
            Book
          </a>
        </nav>

        <button
          type="button"
          className="relative -mr-2 flex h-11 w-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden className={`absolute h-px w-6 bg-current transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[5px]"}`} />
          <span aria-hidden className={`absolute h-px w-6 bg-current transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[5px]"}`} />
        </button>
      </div>

      <div id="mobile-menu" hidden={!open} className="md:hidden">
        <nav aria-label="Mobile" className="container-x flex h-[calc(100dvh-72px)] flex-col justify-between pb-10 pt-6">
          <ul className="flex flex-col gap-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="display block py-2 text-6xl" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href={BOOKING_URL} target="_blank" rel="noopener" className="btn btn-primary w-full">
            Book an appointment
          </a>
        </nav>
      </div>
    </header>
  );
}
