import Link from "next/link";
import { BENZ, SOCIAL_LIVE } from "./data";

const COLUMNS = [
  {
    title: "Start here",
    links: [
      { href: "/benz-blonde/shop", label: "The Lineup" },
      { href: "/benz-blonde/book", label: "Book a Drive" },
      { href: "/benz-blonde/trade", label: "What's My Car Worth" },
      { href: "/benz-blonde/lease-end", label: "Lease Ending" },
    ],
  },
  {
    title: "More",
    links: [
      { href: "/benz-blonde/watch", label: "Watch & Follow" },
      { href: "/benz-blonde/reviews", label: "Reviews & Referrals" },
      { href: "/benz-blonde#faq", label: "Questions" },
      { href: "/", label: "MK Parrish (main site)" },
    ],
  },
];

export default function BenzFooter() {
  return (
    <footer className="border-t border-graphite bg-void">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl uppercase leading-none tracking-[0.04em] text-white">
              The Benz <span className="text-petal">Blonde</span>
            </p>
            <p className="mt-3 font-serif text-base italic leading-7 text-smoke">
              {BENZ.person} at {BENZ.store}.<br />
              {BENZ.area}.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <a href={BENZ.smsHref} className="font-display text-2xl uppercase tracking-[0.04em] text-petal transition-colors hover:text-blush">
                Text {BENZ.phone}
              </a>
              <a href={`mailto:${BENZ.email}`} className="font-body text-sm text-smoke transition-colors hover:text-petal">
                {BENZ.email}
              </a>
            </div>
            {SOCIAL_LIVE.length > 0 && (
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
                {SOCIAL_LIVE.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-body text-[0.7rem] font-bold uppercase tracking-[0.2em] text-ash transition-colors hover:text-petal"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.28em] text-petal">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="font-body text-sm font-light text-smoke transition-colors hover:text-pearl">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-graphite pt-7">
          <p className="font-mono text-[0.62rem] uppercase leading-5 tracking-[0.14em] text-iron">
            The Benz Blonde is the personal page of {BENZ.person}, a sales professional at {BENZ.store}. It is not an
            official page of Mercedes-Benz USA or the dealership. Vehicle availability, incentives, and financing terms
            change monthly and are subject to credit approval and dealer confirmation — nothing here is an offer or a
            quote. Text or call for current numbers.
          </p>
        </div>
      </div>
    </footer>
  );
}
