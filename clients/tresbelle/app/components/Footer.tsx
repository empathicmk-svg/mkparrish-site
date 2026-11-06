import Link from "next/link";
import { BOOKING_URL, INSTAGRAM_HANDLE, INSTAGRAM_URL, addressLine, brand, mapsUrl, nav } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t hairline">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="display text-6xl">{brand.name}</p>
          <p className="serif-italic mt-3 text-lg text-[var(--color-smoke)]">{brand.tagline}</p>
        </div>
        <div>
          <p className="eyebrow mb-4">Explore</p>
          <ul className="space-y-2 text-[var(--color-smoke)]">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-[var(--color-pearl)]">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Connect</p>
          <ul className="space-y-2 text-[var(--color-smoke)]">
            <li>
              <a href={BOOKING_URL} target="_blank" rel="noopener" className="hover:text-[var(--color-pearl)]">
                Book on GlossGenius
              </a>
            </li>
            <li>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="hover:text-[var(--color-pearl)]">
                Instagram {INSTAGRAM_HANDLE}
              </a>
            </li>
            <li>
              <a href={`tel:+1${brand.phone.replace(/\D/g, "")}`} className="hover:text-[var(--color-pearl)]">
                {brand.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${brand.email}`} className="break-all hover:text-[var(--color-pearl)]">
                {brand.email}
              </a>
            </li>
            <li>
              <a href={mapsUrl} target="_blank" rel="noopener" className="hover:text-[var(--color-pearl)]">
                {addressLine}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-x flex flex-col gap-2 border-t hairline py-6 text-xs text-[var(--color-ash)] sm:flex-row sm:justify-between">
        <p>
          © {year} {brand.legalName}
        </p>
        <p>Results vary. Treatments are performed after consultation.</p>
      </div>
    </footer>
  );
}
