import Section from "@/app/components/Section";
import ServiceMenu from "@/app/components/ServiceMenu";
import { BOOKING_URL, INSTAGRAM_HANDLE, INSTAGRAM_URL, addressLine, brand, mapsUrl, pillars, team } from "@/content/site";

const marquee = ["Botox", "Filler", "Lip Flip", "Sculptra", "Microneedling", "Kybella", "IV Therapy", "Peels"];

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: brand.legalName,
    description: brand.description,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    telephone: brand.phone,
    email: brand.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: brand.address.street,
      addressLocality: brand.address.locality,
      addressRegion: brand.address.region,
      postalCode: brand.address.postalCode,
      addressCountry: "US",
    },
    openingHours: brand.hours.flatMap((h) => (h.schema ? [h.schema] : [])),
    sameAs: [INSTAGRAM_URL, BOOKING_URL],
  };
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static, server-built object: no user input reaches this string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }}
      />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-28 md:items-center md:pb-0">
        <Monogram />
        <div className="container-x relative">
          <p className="eyebrow reveal mb-6">{brand.location} · Wellness &amp; Aesthetics</p>
          <h1 className="display reveal text-[clamp(5rem,19vw,17rem)]">
            Tres <span className="gold-text">Belle</span>
          </h1>
          <p className="serif-italic reveal mt-6 max-w-xl text-[clamp(1.35rem,2.6vw,2rem)] leading-snug text-[var(--color-blush)]">
            {brand.tagline}
          </p>
          <p className="reveal mt-5 max-w-lg text-lg leading-relaxed text-[var(--color-smoke)]">
            Neurotoxins, fillers, skin rejuvenation and IV therapy from nurse practitioners who give you an honest assessment.
          </p>
          <div className="reveal mt-10 flex flex-col gap-3 sm:flex-row">
            <a href={BOOKING_URL} target="_blank" rel="noopener" className="btn btn-primary">
              Book an appointment <span aria-hidden>→</span>
            </a>
            <a href="#services" className="btn btn-ghost">
              View the menu
            </a>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────── */}
      <div className="overflow-hidden border-y hairline py-5" aria-hidden>
        <div className="marquee-track">
          {[...marquee, ...marquee, ...marquee, ...marquee].map((m, i) => (
            <span key={i} className="display flex items-center gap-10 px-5 text-4xl text-[var(--color-smoke)]">
              {m} <span className="text-[var(--color-petal)]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <Section
        id="services"
        eyebrow="The Menu"
        title={
          <>
            Services, <span className="serif-italic text-[0.62em] text-[var(--color-petal)]">considered</span>
          </>
        }
        lede="Not sure where to start? Book a consultation. Live pricing and availability are always on our booking page."
      >
        <ServiceMenu />
        <div className="reveal mt-16 flex justify-center">
          <a href={BOOKING_URL} target="_blank" rel="noopener" className="btn btn-primary">
            See availability on GlossGenius
          </a>
        </div>
      </Section>

      {/* ── APPROACH ─────────────────────────────────────────── */}
      <Section
        id="approach"
        eyebrow="Our Approach"
        title={
          <>
            Honest, <span className="gold-text">expert</span> care
          </>
        }
        className="border-t hairline bg-[var(--color-void)]"
      >
        <ol className="grid gap-px bg-[rgba(217,195,160,0.18)] md:grid-cols-3">
          {pillars.map((p) => (
            <li key={p.n} className="reveal bg-[var(--color-void)] p-8 md:p-10">
              <span className="display text-7xl text-[var(--color-graphite)]">{p.n}</span>
              <h3 className="serif-italic mt-6 text-3xl">{p.title}</h3>
              <p className="mt-4 leading-relaxed text-[var(--color-smoke)]">{p.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── TEAM ─────────────────────────────────────────────── */}
      <Section id="team" eyebrow="Your providers" title={<>The <span className="serif-italic text-[0.62em] text-[var(--color-petal)]">team</span></>} lede="Licensed nurse practitioners and nurses. Choose your provider when you book.">
        <ul className="grid gap-px bg-[rgba(217,195,160,0.18)] sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <li key={m.name} className="reveal bg-[var(--color-obsidian)] p-8">
              <p className="display text-4xl">{m.name}</p>
              <p className="eyebrow mt-3">
                {m.credential ? `${m.credential} · ` : ""}
                {m.role}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── INSTAGRAM ────────────────────────────────────────── */}
      <section className="section-y border-t hairline">
        <div className="container-x reveal text-center">
          <p className="eyebrow mb-6">Follow along</p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener"
            className="display inline-block text-[clamp(2.6rem,9vw,8rem)] transition-colors hover:text-[var(--color-petal)]"
          >
            {INSTAGRAM_HANDLE}
          </a>
          <p className="mx-auto mt-6 max-w-md text-[var(--color-smoke)]">
            Before-and-afters, new treatments and openings are posted on Instagram first.
          </p>
        </div>
      </section>

      {/* ── VISIT / CTA ──────────────────────────────────────── */}
      <section id="visit" aria-labelledby="visit-title" className="section-y border-t hairline bg-[var(--color-carbon)]">
        <div className="container-x grid gap-12 md:grid-cols-2 md:items-end">
          <div className="reveal">
            <p className="eyebrow mb-4">Visit</p>
            <h2 id="visit-title" className="display text-[clamp(3rem,8vw,6.5rem)]">
              Your first <span className="serif-italic text-[0.62em] text-[var(--color-petal)]">appointment</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--color-smoke)]">
              Book online in under a minute. New to injectables? Choose a consultation and we&apos;ll give you
              an honest assessment and a plan.
            </p>
          </div>
          <div className="reveal space-y-6 md:justify-self-end">
            <address className="not-italic">
              <a href={mapsUrl} target="_blank" rel="noopener" className="font-mono text-sm text-[var(--color-champagne)] hover:underline">
                {addressLine}
              </a>
              <br />
              <a href={`tel:+1${brand.phone.replace(/\D/g, "")}`} className="font-mono text-sm hover:text-[var(--color-champagne)]">
                {brand.phone}
              </a>
            </address>
            <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-1 font-mono text-sm">
              {brand.hours.map((h) => (
                <div key={h.days} className="contents">
                  <dt className="text-[var(--color-ash)]">{h.days}</dt>
                  <dd className={h.schema ? "" : "text-[var(--color-ash)]"}>{h.time}</dd>
                </div>
              ))}
            </dl>
            <p className="text-xs text-[var(--color-ash)]">Hours are by appointment and can change; booking shows live availability.</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={BOOKING_URL} target="_blank" rel="noopener" className="btn btn-primary">
                Book now <span aria-hidden>→</span>
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="btn btn-ghost">
                Message on Instagram
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/** Decorative rotating text ring + TB monogram, pure SVG. */
function Monogram() {
  return (
    <div aria-hidden className="pointer-events-none absolute -right-[22vw] top-[6%] w-[min(78vw,640px)] opacity-30 md:-right-[10vw] md:top-[58%] md:-translate-y-1/2 md:opacity-40">
      <svg viewBox="0 0 400 400" className="w-full">
        <defs>
          <path id="tb-circle" d="M200,200 m-170,0 a170,170 0 1,1 340,0 a170,170 0 1,1 -340,0" />
          <linearGradient id="tb-gold" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#d9c3a0" />
            <stop offset="0.55" stopColor="#f6dcd5" />
            <stop offset="1" stopColor="#b89766" />
          </linearGradient>
        </defs>
        <g className="monogram-ring" style={{ transformOrigin: "200px 200px" }}>
          <text fill="#857c74" style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.42em" }}>
            <textPath href="#tb-circle">TRES BELLE ✦ WELLNESS ✦ AESTHETICS ✦ OAKDALE NY ✦</textPath>
          </text>
        </g>
        <circle cx="200" cy="200" r="132" fill="none" stroke="url(#tb-gold)" strokeOpacity="0.35" />
        <text x="200" y="238" textAnchor="middle" fill="url(#tb-gold)" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: 120 }}>
          tb
        </text>
      </svg>
    </div>
  );
}
