"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BENZ } from "./data";

/**
 * Phone-only action bar. Most of this traffic arrives from a social profile on a
 * phone, so the two things that close deals — text me, book a drive — stay
 * on screen the whole way down the page.
 */
export default function StickyCTA() {
  const pathname = usePathname();
  const onBooking = pathname.startsWith("/benz-blonde/book");

  return (
    <div className="fixed inset-x-0 bottom-0 z-[7000] grid grid-cols-2 border-t border-graphite bg-void/95 backdrop-blur lg:hidden">
      <a
        href={BENZ.smsHref}
        className="flex items-center justify-center gap-2 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-pearl"
      >
        Text MK
      </a>
      <Link
        href={onBooking ? "/benz-blonde/trade" : "/benz-blonde/book"}
        className="btn-primary flex items-center justify-center py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void"
      >
        {onBooking ? "Trade Value" : "Book a Drive"}
      </Link>
    </div>
  );
}
