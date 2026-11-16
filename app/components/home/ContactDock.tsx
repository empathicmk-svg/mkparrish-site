"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/** A small floating bar (call, text, book) that appears once the hero has scrolled away. */
export default function ContactDock({ phone, tel, sms }: { phone: string; tel: string; sms: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setShow(window.scrollY > window.innerHeight * 0.8));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className={`mk-dock ${show ? "mk-dock-on" : ""}`} role="complementary" aria-label="Contact MK" aria-hidden={!show}>
      <a href={tel} tabIndex={show ? 0 : -1} className="mk-dock-btn">
        Call
      </a>
      <a href={sms} tabIndex={show ? 0 : -1} className="mk-dock-btn">
        Text
      </a>
      <Link href="/test-drive" tabIndex={show ? 0 : -1} className="mk-dock-btn">
        Test drive
      </Link>
      <Link href="/book" tabIndex={show ? 0 : -1} className="mk-dock-btn mk-dock-primary">
        Book
      </Link>
      <span className="sr-only">{phone}</span>
    </div>
  );
}
