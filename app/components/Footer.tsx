import Link from "next/link";
import { PATREON_URL, CONTACT } from "@/app/lib/config";

const footerLinks = [
  { label: "Career",       href: "/career" },
  { label: "Brand",        href: "/brand" },
  { label: "Presence",     href: "/presence" },
  { label: "Next Chapter", href: "/next-chapter" },
  { label: "The Shelf",    href: "/shelf" },
  { label: "The Margins",  href: "/margins" },
  { label: "About",        href: "/about" },
  { label: "Contact",      href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-graphite bg-void" style={{ padding: "clamp(3rem, 6vw, 5rem) 0" }}>
      <div className="mx-auto max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-2xl uppercase tracking-[0.02em] text-pearl">MK Parrish</p>
            <p className="mt-1 font-serif text-base italic text-smoke" style={{ fontWeight: 500 }}>
              Rewrite Your Story
            </p>
            <div className="mt-4 flex flex-col gap-1.5">
              <a href={`mailto:${CONTACT.email}`} className="font-body text-[0.7rem] tracking-[0.08em] text-iron transition hover:text-petal">
                {CONTACT.email}
              </a>
              <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="font-body text-[0.7rem] tracking-[0.08em] text-iron transition hover:text-petal">
                /in/mkparrish
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {footerLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="nav-link font-body text-[0.7rem] font-medium uppercase tracking-[0.15em] text-iron transition hover:text-pearl"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/book"
              className="btn-primary px-5 py-2.5 font-body text-[0.7rem] font-bold uppercase tracking-[0.2em] text-void"
            >
              Book a Call
            </Link>
            <a
              href={PATREON_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost px-5 py-2.5 font-body text-[0.7rem] font-bold uppercase tracking-[0.2em]"
            >
              The Margins
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-graphite pt-8">
          <p className="font-body text-[0.7rem] font-light tracking-[0.1em] text-iron">
            Words, strategy, and reinvention for people ready to stop being misread.
          </p>
          <p className="font-body text-[0.7rem] font-light tracking-[0.06em] text-iron">
            &copy; {new Date().getFullYear()} MK Parrish
          </p>
        </div>
      </div>
    </footer>
  );
}
