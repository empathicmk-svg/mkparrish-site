import Link from "next/link";
import { CONTACT } from "@/app/lib/config";

const footerGroups = [
  {
    heading: "Services",
    links: [
      { label: "All Offerings", href: "/services#offerings" },
      { label: "Web Design & Build", href: "/studio" },
      { label: "Outbound & Growth", href: "/growth" },
      { label: "Messaging & Copy", href: "/brand" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "How I Work", href: "/how-i-work" },
      { label: "Rebecoming", href: "/rebecoming" },
      { label: "Shop", href: "/shop" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer-chrome border-t border-petal/25 bg-void" style={{ padding: "clamp(3rem, 6vw, 5rem) 0" }}>
      <div className="mx-auto max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
        <div className="mb-10 grid gap-6 border border-petal/25 bg-carbon/55 p-6 shadow-[0_0_70px_rgba(255,181,208,0.09)] md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.32em] text-petal">
              Rewrite Your Story
            </p>
            <p className="mt-3 max-w-2xl font-serif text-xl italic leading-8 text-pearl md:text-2xl">
              You are not starting over. You are rebecoming, rebuilding, and rewriting the way the work reads.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col xl:flex-row">
            <Link
              href="/shop"
              className="btn-primary justify-center px-5 py-3 font-body text-[0.68rem] font-bold uppercase tracking-[0.18em] text-void"
            >
              Shop the Shelf
            </Link>
            <Link
              href="/book"
              className="btn-ghost justify-center px-5 py-3 font-body text-[0.68rem] font-bold uppercase tracking-[0.18em]"
            >
              Book a Call
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-2xl uppercase tracking-[0.02em] text-pearl">MK Parrish</p>
            <p className="mt-1 font-serif text-base italic text-smoke" style={{ fontWeight: 500 }}>
              Growth strategy, websites, and messaging.
            </p>
            <div className="mt-4 flex flex-col gap-1.5">
              <a href={`mailto:${CONTACT.email}`} className="font-body text-[0.72rem] tracking-[0.08em] text-smoke transition hover:text-petal">
                {CONTACT.email}
              </a>
              <a href={`tel:+1${CONTACT.phone.replace(/\D/g, "")}`} className="font-body text-[0.72rem] tracking-[0.08em] text-smoke transition hover:text-petal">
                {CONTACT.phone}
              </a>
              <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="font-body text-[0.72rem] tracking-[0.08em] text-smoke transition hover:text-petal">
                /in/mkparrish
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-10 gap-y-8">
            {footerGroups.map((group) => (
              <div key={group.heading} className="flex flex-col gap-3">
                <p className="font-body text-[0.6rem] font-bold uppercase tracking-[0.28em] text-petal/70">
                  {group.heading}
                </p>
                {group.links.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="nav-link font-body text-[0.7rem] font-medium uppercase tracking-[0.15em] text-smoke transition hover:text-pearl"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/book"
              className="btn-primary px-5 py-2.5 font-body text-[0.7rem] font-bold uppercase tracking-[0.2em] text-void"
            >
              Book a Call
            </Link>
            <Link
              href="/shop"
              className="btn-ghost px-5 py-2.5 font-body text-[0.7rem] font-bold uppercase tracking-[0.2em]"
            >
              Shop Books
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-graphite pt-8">
          <p className="font-body text-[0.7rem] font-light tracking-[0.1em] text-iron">
            Websites, outbound, and messaging that turn how you&apos;re seen into revenue.
          </p>
          <p className="font-body text-[0.7rem] font-light tracking-[0.06em] text-iron">
            &copy; {new Date().getFullYear()} MK Parrish
          </p>
        </div>
      </div>
    </footer>
  );
}
