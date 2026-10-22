import Link from "next/link";
import Logo from "./Logo";
import { COMPANY, LOCATIONS, NAV } from "../content/site";

export default function Footer() {
  return (
    <footer className="bg-forest text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">{COMPANY.tagline}.</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-white">Company</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {[...NAV, { href: "/contact", label: "Contact" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-white">Facilities</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {LOCATIONS.map((loc) => (
              <li key={loc.name}>
                <span className="block text-white">{loc.name}</span>
                {loc.detail}
              </li>
            ))}
          </ul>
          {COMPANY.phone && (
            <a href={`tel:${COMPANY.phone}`} className="mt-4 block text-sm hover:text-white">
              {COMPANY.phone}
            </a>
          )}
          {COMPANY.email && (
            <a href={`mailto:${COMPANY.email}`} className="block text-sm hover:text-white">
              {COMPANY.email}
            </a>
          )}
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-white/60 sm:px-6">
          &copy; {new Date().getFullYear()} {COMPANY.legalName} All rights reserved. These statements have not been
          evaluated by the Food and Drug Administration.
        </p>
      </div>
    </footer>
  );
}
