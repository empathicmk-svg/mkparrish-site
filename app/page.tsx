import type { Metadata } from "next";
import Link from "next/link";
import LegacyOfferingsRedirect from "@/app/components/LegacyOfferingsRedirect";
import { Marquee } from "@/app/components/ui";
import { STRIPE_AUDIT } from "@/app/lib/config";
import { featuredTestimonials } from "@/app/lib/testimonials";

const HOME_TESTIMONIALS = featuredTestimonials();

export const metadata: Metadata = {
  title: "MK Parrish — Web Design, Development & Marketing",
  description:
    "Conversion websites designed, written, and built fast, plus the marketing that fills them: outbound, full-funnel growth, and social. One senior operator. Start with the $97 audit or book a call.",
};

const MARQUEE_ITEMS = [
  "Website Design",
  "Web Development",
  "The Build · From $6,000",
  "Founding Redesigns",
  "Conversion Copy",
  "The Outbound Engine",
  "Full-Funnel Growth",
  "SEO-Ready Builds",
  "The Social Suite",
  "Managed Hosting",
  "The 48-Hour Audit · $97",
];

const PILLARS = [
  {
    eyebrow: "Build",
    title: "Web design & development",
    text: "Strategy, copy, design, and code handled in one engagement, so the site reads right, loads fast, and is built to turn visitors into booked calls.",
    href: "/studio",
    cta: "Explore web services",
    offers: [
      { name: "The Build", price: "From $6,000", note: "Full custom site, launch-ready in 3–4 weeks" },
      { name: "Founding Redesign", price: "Discounted", note: "A few spots this quarter, in exchange for a testimonial" },
      { name: "The Upkeep", price: "From $300/mo", note: "Hosting, maintenance, updates, and small changes" },
    ],
  },
  {
    eyebrow: "Grow",
    title: "Marketing & growth",
    text: "Once the site converts, the next job is traffic that's actually qualified. Outbound, paid, organic, and lifecycle, run as one motion by the same person who built the pages.",
    href: "/growth",
    cta: "Explore marketing services",
    offers: [
      { name: "The Outbound Engine", price: "From $2,500/mo", note: "Cold email and LinkedIn built to book qualified calls" },
      { name: "Full-Funnel Growth", price: "From $6,500/mo", note: "Acquisition through activation, with a weekly experiment loop" },
      { name: "The Social Suite", price: "From $2,000/mo", note: "Content, graphics, and scheduling, produced and managed" },
    ],
  },
] as const;

const BUILD_STANDARDS = [
  { title: "Fast by default", text: "Modern framework, optimized images, and hosting on a global edge network. Pages load before the visitor has time to leave." },
  { title: "Mobile-first", text: "Designed for the phone first, since that's where most of your traffic reads the page, and then scaled up for desktop." },
  { title: "Copy written in", text: "Positioning and page copy come before layout. No lorem ipsum, and no waiting on a writer to fill the boxes in." },
  { title: "SEO-ready", text: "Clean markup, metadata, sitemaps, and social previews set up at launch, so search engines can read the site from day one." },
  { title: "Measured", text: "Analytics and conversion tracking wired up before launch, so you can see which pages and buttons are bringing in the business." },
  { title: "Yours to keep", text: "You own the code, the domain, and the content. There's no proprietary builder and no lock-in if you move on." },
] as const;

const PROCESS = [
  { step: "01", title: "Audit", text: "Where the current site and funnel lose people, ranked by how much each leak costs you." },
  { step: "02", title: "Strategy & copy", text: "Positioning, page architecture, and the words, agreed before anything gets designed." },
  { step: "03", title: "Design & build", text: "Custom design built on fast, modern infrastructure and tested on every screen size." },
  { step: "04", title: "Launch & grow", text: "Domain, analytics, and tracking go live. Then, if you want it, the marketing that sends traffic." },
] as const;

export default function HomePage() {
  return (
    <>
      <LegacyOfferingsRedirect />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-void pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[70vh] w-[90vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.16),transparent_60%)]" />
          <div className="absolute bottom-0 right-0 h-[40vh] w-[50vw] bg-[radial-gradient(ellipse_at_bottom_right,rgba(217,79,124,0.08),transparent_60%)]" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="font-body text-[0.68rem] font-bold uppercase tracking-[0.32em] text-petal">
            Web design · Development · Marketing
          </p>
          <h1 className="mt-5 max-w-5xl font-display text-6xl uppercase leading-[0.88] tracking-[0.01em] text-pearl md:text-8xl lg:text-9xl">
            Websites that sell. <span className="text-petal text-glow">Marketing that fills them.</span>
          </h1>
          <p className="mt-7 max-w-3xl font-serif text-xl italic leading-9 text-smoke md:text-2xl">
            I design, write, and build fast conversion websites for B2B companies and service businesses, then run the marketing that sends qualified people to them. One senior operator handles both.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/book" className="btn-primary inline-flex justify-center px-7 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void">
              Book a Call →
            </Link>
            <Link href="/redesign" className="inline-flex justify-center border border-petal/60 px-7 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-petal transition hover:border-petal hover:bg-petal/5">
              Founding Redesign Offer
            </Link>
            <Link href="/audit" className="inline-flex justify-center border border-graphite px-7 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-ash transition hover:border-petal hover:text-petal">
              Start with the $97 Audit
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {["Custom sites in 3–4 weeks", "Mobile-first & SEO-ready", "Outbound & full-funnel growth", "$97 async entry point"].map((t) => (
              <div key={t} className="flex items-center gap-3">
                <span className="h-1 w-1 bg-petal" />
                <span className="font-body text-xs font-light text-smoke">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <Marquee items={MARQUEE_ITEMS} />

      {/* ── TWO PILLARS: BUILD + GROW ── */}
      <section id="offerings" className="relative overflow-hidden bg-obsidian py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(242,175,198,0.07),transparent_55%)]" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-10 max-w-3xl">
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">What I do</p>
            <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-[0.02em] text-pearl md:text-6xl">
              Build the site.<br /><span className="text-petal">Then bring the buyers.</span>
            </h2>
            <p className="mt-5 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "60ch" }}>
              Most companies hire one shop for the website and another for the marketing, and the handoff is where the leads go missing. I do both, so the pages and the campaigns are built to work together.
            </p>
          </div>
          <div className="grid gap-px bg-graphite lg:grid-cols-2">
            {PILLARS.map((pillar) => (
              <article key={pillar.title} className="relative flex flex-col bg-void p-7 md:p-10">
                <div className="gradient-rule absolute inset-x-0 top-0" />
                <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.28em] text-petal">{pillar.eyebrow}</p>
                <h3 className="mt-4 font-display text-4xl uppercase tracking-[0.02em] text-pearl md:text-5xl">{pillar.title}</h3>
                <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{pillar.text}</p>
                <ul className="mt-7 divide-y divide-graphite border-y border-graphite">
                  {pillar.offers.map((offer) => (
                    <li key={offer.name} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
                      <div>
                        <p className="font-display text-2xl uppercase tracking-[0.02em] text-white">{offer.name}</p>
                        <p className="mt-1 font-body text-xs font-light leading-6 text-smoke">{offer.note}</p>
                      </div>
                      <span className="font-display text-xl text-petal">{offer.price}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <Link href={pillar.href} className="btn-primary inline-flex w-full justify-center px-5 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void">
                    {pillar.cta} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-6 font-body text-sm font-light text-smoke">
            Need the messaging fixed first?{" "}
            <Link href="/brand" className="text-petal underline underline-offset-4 transition hover:text-blush">
              The Rewrite
            </Link>{" "}
            rebuilds your positioning and core copy. You can also{" "}
            <Link href="/services#offerings" className="text-petal underline underline-offset-4 transition hover:text-blush">
              see every service and price
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── FEATURED: Founding-client website redesigns ── */}
      <section className="relative overflow-hidden border-y border-petal/25 py-12 md:py-16 gradient-pink-grey-soft">
        <div className="relative mx-auto grid max-w-[1400px] items-center gap-8 px-6 lg:grid-cols-[1.35fr_0.65fr] lg:px-10">
          <div>
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">
              Limited · A few founding clients · This quarter
            </p>
            <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-[0.02em] text-pearl md:text-5xl lg:text-6xl">
              Your site, rebuilt to <span className="text-petal">earn its keep.</span>
            </h2>
            <p className="mt-5 max-w-2xl font-body text-base font-light leading-8 text-smoke">
              Is your site slow, clunky on mobile, or no longer sounding like your business? I&apos;m taking on a small number of founding clients this quarter for full redesigns: audited, rebuilt fast and mobile-first, and hands-on from start to finish. The rate is discounted in exchange for a testimonial.
            </p>
            <div className="mt-7 flex flex-wrap gap-6">
              {["Full site audit", "Fast, mobile-first rebuild", "Direct collaboration"].map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <span className="h-1 w-1 bg-petal" />
                  <span className="font-body text-xs font-light text-smoke">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/redesign" className="btn-primary inline-flex w-full justify-center px-6 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void">
              See the Offer →
            </Link>
            <Link href="/book" className="inline-flex w-full justify-center border border-graphite px-6 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-ash transition hover:border-petal hover:text-petal">
              Book a Fit Call
            </Link>
          </div>
        </div>
      </section>

      {/* ── BUILD STANDARDS ── */}
      <section className="relative overflow-hidden bg-void py-16 md:py-24">
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-10 max-w-3xl">
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">Every site ships with</p>
            <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-[0.02em] text-pearl md:text-6xl">
              Built to perform,<br /><span className="text-petal">not just to look good.</span>
            </h2>
          </div>
          <div className="grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-3">
            {BUILD_STANDARDS.map((item, i) => (
              <article key={item.title} className="bg-obsidian p-7 md:p-8">
                <span className="font-display text-3xl text-petal/60">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.02em] text-pearl">{item.title}</h3>
                <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="relative overflow-hidden bg-obsidian py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(242,175,198,0.08),transparent_55%)]" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">How it works</p>
              <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-[0.02em] text-pearl md:text-6xl">
                From leaky to <span className="text-petal">launched.</span>
              </h2>
            </div>
            <Link href="/how-i-work" className="font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-petal transition hover:text-blush">
              More on how I work →
            </Link>
          </div>
          <ol className="grid gap-px bg-graphite md:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p) => (
              <li key={p.step} className="bg-void p-7 md:p-8">
                <span className="font-display text-5xl text-petal">{p.step}</span>
                <h3 className="mt-4 font-display text-3xl uppercase tracking-[0.02em] text-pearl">{p.title}</h3>
                <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── PROOF / CLIENT TESTIMONIALS ── */}
      <section className="relative overflow-hidden bg-void py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.06),transparent_55%)]" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">In their words</p>
              <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-[0.02em] text-pearl md:text-6xl">
                Founders on <span className="text-petal">the work.</span>
              </h2>
            </div>
            <Link href="/testimonials" className="font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-petal transition hover:text-blush">
              Read all client results →
            </Link>
          </div>
          <div className="grid gap-px bg-graphite lg:grid-cols-2">
            {HOME_TESTIMONIALS.map((t) => (
              <figure key={t.name} className="relative flex flex-col justify-between bg-obsidian p-8 md:p-10">
                <div className="absolute inset-x-0 top-0 h-px bg-petal" />
                <span className="select-none font-serif text-6xl leading-none text-petal/25">&ldquo;</span>
                <blockquote className="mt-2 font-serif text-lg italic leading-8 text-pearl md:text-xl">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 border-t border-graphite pt-6">
                  <p className="font-display text-2xl uppercase tracking-[0.02em] text-white">{t.name}</p>
                  <p className="mt-1 font-body text-sm font-light text-petal">{t.role}, {t.company}</p>
                  <p className="mt-2 font-body text-[0.62rem] font-bold uppercase tracking-[0.22em] text-iron">{t.service}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── $97 AUDIT TRIPWIRE ── */}
      <section className="relative overflow-hidden border-y border-petal/25 py-14 md:py-20 gradient-pink-grey">
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_0.6fr]">
            <div>
              <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">Start here · Async · No call required</p>
              <h2 className="mt-4 font-display text-5xl uppercase leading-[0.92] tracking-[0.02em] text-white md:text-7xl">
                The 48-Hour Positioning Audit — <span className="text-petal text-glow">$97.</span>
              </h2>
              <p className="mt-5 max-w-2xl font-body text-base font-light leading-8 text-smoke">
                Send your website, LinkedIn, and one offer page. Within 48 hours you get a Loom teardown, a written scorecard, three rewritten headlines, and your three highest-priority fixes. It&apos;s the cheapest way to find out what&apos;s costing you the click before you spend on a rebuild or a campaign.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href={STRIPE_AUDIT} target="_blank" rel="noreferrer" className="btn-primary inline-flex w-full justify-center px-6 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void">
                Get the Audit — $97
              </Link>
              <Link href="/audit" className="inline-flex w-full justify-center border border-graphite bg-void/40 px-6 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-pearl transition hover:border-petal hover:text-petal">
                How it works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ALSO FROM MK: books + writing, kept secondary ── */}
      <section className="bg-obsidian py-10 md:py-12">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-6 md:flex-row md:items-center md:justify-between lg:px-10">
          <div className="max-w-2xl">
            <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.28em] text-iron">Also from MK</p>
            <p className="mt-2 font-body text-sm font-light leading-7 text-smoke">
              Prefer to do it yourself? The playbooks behind the client work, plus <em>Rebecoming</em> and the rest of the books, are in the shop.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <Link href="/shop" className="font-body text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ash transition hover:text-petal">
              Books & Guides →
            </Link>
            <Link href="/rebecoming" className="font-body text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ash transition hover:text-petal">
              Rebecoming →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="relative overflow-hidden py-20 md:py-28 gradient-pink-grey">
        <div className="relative mx-auto max-w-[1400px] px-6 text-center lg:px-10">
          <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">Ready when you are</p>
          <h2 className="mx-auto mt-5 max-w-4xl font-display text-5xl uppercase leading-[0.92] tracking-[0.02em] text-white md:text-7xl">
            Turn how you&apos;re seen <span className="text-petal text-glow">into revenue.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-serif text-lg italic leading-8 text-smoke md:text-xl">
            Tell me what the site needs to do and where the leads should come from. I&apos;ll tell you what I&apos;d build first.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/book" className="btn-primary inline-flex justify-center px-8 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void">
              Book a Call →
            </Link>
            <Link href="/redesign" className="inline-flex justify-center border border-petal/60 bg-void/30 px-8 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-petal transition hover:bg-petal/5">
              Founding Redesign Offer
            </Link>
            <Link href="/audit" className="inline-flex justify-center border border-graphite bg-void/30 px-8 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-pearl transition hover:border-petal hover:text-petal">
              $97 Audit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
