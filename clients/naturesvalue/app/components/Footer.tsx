import Link from "next/link";
import Logo from "./Logo";
import { COMPANY, DOSAGE_FORMS, LOCATIONS, SERVICES } from "../content/site";

const COLUMNS = [
  { title: "Capabilities", links: DOSAGE_FORMS.map((d) => ({ href: `/capabilities/${d.slug}`, label: d.title })) },
  { title: "Services", links: SERVICES.map((s) => ({ href: `/services/${s.slug}`, label: s.title })) },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About us" },
      { href: "/quality", label: "Quality" },
      { href: "/industries", label: "Who we serve" },
      { href: "/process", label: "How it works" },
      { href: "/start", label: "Build your product" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-forest text-white/75">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">{COMPANY.tagline}.</p>
          <ul className="mt-6 space-y-3 text-sm">
            {LOCATIONS.map((loc) => (
              <li key={loc.name}>
                <span className="block font-medium text-white">{loc.name}</span>
                {loc.detail}
              </li>
            ))}
          </ul>
          {COMPANY.phone && (
            <a href={`tel:${COMPANY.phone}`} className="mt-4 block text-sm hover:text-lime">
              {COMPANY.phone}
            </a>
          )}
          {COMPANY.email && (
            <a href={`mailto:${COMPANY.email}`} className="block text-sm hover:text-lime">
              {COMPANY.email}
            </a>
          )}
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-lime">{col.title}</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-white/55 sm:px-6">
          &copy; {new Date().getFullYear()} {COMPANY.legalName} All rights reserved. These statements have not been
          evaluated by the Food and Drug Administration.
        </p>
      </div>
    </footer>
  );
}
