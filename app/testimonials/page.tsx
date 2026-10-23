import type { Metadata } from "next";
import {
  RevealSection, QuoteDivider, Eyebrow, H1, H2, H3Script,
  BtnPrimary, ArrowLink,
} from "@/app/components/ui";
import { STRIPE_AUDIT } from "@/app/lib/config";
import { TESTIMONIALS, featuredTestimonials } from "@/app/lib/testimonials";

export const metadata: Metadata = {
  title: "Client Testimonials & Results",
  description:
    "What founders and operators say after working with MK Parrish — website redesigns, positioning, messaging, and growth. Featuring Elaview, EVU, and more.",
  alternates: { canonical: "/testimonials" },
  openGraph: {
    title: "Client Testimonials & Results — MK Parrish",
    description:
      "Founders and operators on the positioning, websites, and messaging that turned how they're seen into revenue.",
    url: "https://www.mkparrish.com/testimonials",
    images: ["/og/default.png"],
  },
  twitter: { card: "summary_large_image", images: ["/og/default.png"] },
};

const STATS = [
  { value: "48hr", label: "Audit turnaround" },
  { value: "35+", label: "Books & guides shipped" },
  { value: "1", label: "Senior operator, start to finish" },
] as const;

const featured = featuredTestimonials();
const rest = TESTIMONIALS.filter((t) => !t.featured);

export default function TestimonialsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative flex min-h-[70vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[65vh] w-[85vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.15),transparent_62%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <Eyebrow pink>Client results · In their words</Eyebrow>
          <div className="mt-4">
            <H1>The<br /><span className="text-petal text-glow">Receipts</span></H1>
          </div>
          <p className="mt-6 max-w-2xl font-serif text-xl italic leading-9 text-smoke md:text-2xl">
            Positioning, websites, and messaging that turned how they&apos;re seen into revenue. Here&apos;s what that sounded like from their side of the table.
          </p>
          <div className="mt-10 grid gap-px bg-graphite sm:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.label} className="bg-obsidian p-7">
                <p className="font-display text-5xl text-petal">{s.value}</p>
                <p className="mt-2 font-body text-xs font-light uppercase tracking-[0.18em] text-ash">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED ── */}
      <RevealSection bg="obsidian" num="01">
        <Eyebrow>Featured</Eyebrow>
        <H2>Founders on<br /><span className="text-petal">the work.</span></H2>
        <div className="mt-12 grid gap-px bg-graphite lg:grid-cols-2">
          {featured.map((t) => (
            <figure key={t.name} className="relative flex flex-col justify-between bg-carbon p-8 md:p-10">
              <div className="absolute inset-x-0 top-0 h-px bg-petal" />
              <span className="select-none font-serif text-6xl leading-none text-petal/25">&ldquo;</span>
              <blockquote className="mt-2 font-serif text-lg italic leading-8 text-pearl md:text-xl">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 border-t border-graphite pt-6">
                <p className="font-display text-2xl uppercase tracking-[0.02em] text-white">{t.name}</p>
                <p className="mt-1 font-body text-sm font-light text-petal">
                  {t.role}, {t.company}
                </p>
                <p className="mt-2 font-body text-[0.65rem] font-bold uppercase tracking-[0.22em] text-iron">
                  {t.service}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </RevealSection>

      <QuoteDivider index={9} />

      {/* ── MORE ── */}
      <RevealSection bg="void" num="02">
        <Eyebrow>More words</Eyebrow>
        <H2>From the{" "}<span className="text-petal">last few engagements.</span></H2>
        <div className="mt-12 grid gap-px bg-graphite md:grid-cols-2 lg:grid-cols-3">
          {rest.map((t) => (
            <figure key={`${t.name}-${t.service}`} className="flex flex-col justify-between bg-obsidian p-7">
              <blockquote className="font-body text-sm font-light leading-7 text-smoke">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-graphite pt-5">
                <p className="font-display text-lg uppercase tracking-[0.02em] text-pearl">{t.name}</p>
                <p className="mt-1 font-body text-xs font-light text-ash">{t.role}, {t.company}</p>
                <p className="mt-2 font-body text-[0.6rem] font-bold uppercase tracking-[0.2em] text-petal/70">{t.service}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </RevealSection>

      {/* ── CTA ── */}
      <RevealSection bg="obsidian">
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Your turn</Eyebrow>
          <H3Script>Start with the smallest, fastest yes — and find out what&apos;s costing you the click.</H3Script>
          <div className="flex flex-wrap items-center gap-5">
            <BtnPrimary href={STRIPE_AUDIT}>Start with the $97 Audit</BtnPrimary>
            <ArrowLink href="/book">Or book a call</ArrowLink>
          </div>
        </div>
      </RevealSection>
    </>
  );
}
