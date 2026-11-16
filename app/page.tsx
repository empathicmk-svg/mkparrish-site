import type { Metadata } from "next";
import Link from "next/link";
import LegacyOfferingsRedirect from "@/app/components/LegacyOfferingsRedirect";
import { Marquee } from "@/app/components/ui";
import InlineLeadCapture from "@/app/components/InlineLeadCapture";
import HeroStage from "@/app/components/home/HeroStage";
import Reveal from "@/app/components/home/Reveal";
import Showcase from "@/app/components/home/Showcase";
import Concierge from "@/app/components/home/Concierge";
import Estimators from "@/app/components/home/Estimators";
import ContentWall from "@/app/components/home/ContentWall";
import ContactDock from "@/app/components/home/ContactDock";
import NeonQuotes from "@/app/components/home/NeonQuotes";
import PromoRail from "@/app/components/home/PromoRail";
import { MotifField, Ornament } from "@/app/components/home/Motifs";
import { BRAND, CTA } from "@/app/lib/brand";
import { CONTACT, SOCIALS, STRIPE_AUDIT } from "@/app/lib/config";
import { featuredTestimonials } from "@/app/lib/testimonials";

const HOME_TESTIMONIALS = featuredTestimonials();

export const metadata: Metadata = {
  title: { absolute: "MK Parrish · Luxury Concierge for Cars, Code, Content & Creative" },
  description:
    "The Four C's, one concierge: Mercedes-Benz at Smithtown, websites engineered to convert, content and growth that get finished, and brand and copy people remember. Book your concierge call.",
};

const DIGITS = CONTACT.phone.replace(/\D/g, "");
const TEL = `tel:+1${DIGITS}`;
const SMS = `sms:+1${DIGITS}`;

const MARQUEE_ITEMS = [
  "MK Parrish",
  "Luxury Concierge",
  "Cars",
  "Code",
  "Content",
  "Creative",
  "Mercedes-Benz of Smithtown",
  "Websites Engineered to Convert",
  "Reels, Social & Growth",
  "Brand, Voice & Books",
  "The 48-Hour Audit · $97",
];

const ONE_PERSON = [
  { title: "One concierge, start to finish", text: "The person you meet on the first call is the person who does the work. No account managers, no juniors, no telephone game." },
  { title: "Four C's, one desk", text: "The car, the code, the content and the creative come from the same desk, so nothing gets lost between a brief and a build." },
  { title: "Straight answers", text: "Numbers explained before you sign, scopes agreed before work starts, and plain answers when the answer is no." },
  { title: "Yours to keep", text: "You own the code, the domain, the content and the keys. There is no proprietary builder and no lock-in." },
] as const;

const BUILD_STANDARDS = [
  { title: "Fast by default", text: "Modern framework, optimized images and a global edge network. Pages load before the visitor has time to leave." },
  { title: "Mobile-first", text: "Designed for the phone first, since that's where most of your traffic reads the page, then scaled up for desktop." },
  { title: "Copy written in", text: "Positioning and page copy come before layout. No lorem ipsum, and no waiting on a writer to fill the boxes in." },
  { title: "SEO-ready", text: "Clean markup, metadata, sitemaps and social previews set up at launch, so search engines can read the site from day one." },
  { title: "Measured", text: "Analytics and conversion tracking wired up before launch, so you can see which pages and buttons bring in the business." },
  { title: "Interactive", text: "Calculators, configurators and forms that let a visitor do something on the page instead of just reading it." },
] as const;

function SectionHead({ kicker, children, sub }: { kicker: string; children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">{kicker}</p>
      <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-[0.02em] text-pearl md:text-6xl lg:text-7xl">{children}</h2>
      {sub && (
        <p className="mt-5 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "60ch" }}>
          {sub}
        </p>
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <LegacyOfferingsRedirect />

      <HeroStage phone={CONTACT.phone} phoneHref={TEL} />

      <Marquee items={MARQUEE_ITEMS} />

      <PromoRail />

      {/* ── NEON QUOTES ── */}
      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_center,#1f1218_0%,#0b0b0b_65%)] py-16 md:py-24">
        <div className="mk-brick pointer-events-none absolute inset-0" aria-hidden="true" />
        <MotifField
          items={[
            { kind: "heart", x: 6, y: 18, size: 34, pink: true },
            { kind: "cross", x: 90, y: 14, size: 40 },
            { kind: "anchor", x: 8, y: 72, size: 40 },
            { kind: "heart", x: 88, y: 70, size: 28, pink: true },
          ]}
        />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <p className="text-center font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">Words that light up</p>
          </Reveal>
          <NeonQuotes />
        </div>
      </section>

      {/* ── THREE LANES ── */}
      <section className="relative overflow-hidden bg-obsidian py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#111111_0%,#1a1a1a_55%,#241219_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(242,175,198,0.10),transparent_55%)]" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <SectionHead kicker="The Four C's" sub="Point at a lane to open it. Start with one; the other three are a conversation away.">
              Cars. Code. Content. <span className="text-petal">Creative.</span>
            </SectionHead>
          </Reveal>
          <Reveal delay={120}>
            <Showcase />
          </Reveal>
        </div>
      </section>

      <div className="bg-void py-6"><Ornament /></div>

      {/* ── CONCIERGE ── */}
      <section id="concierge" className="relative scroll-mt-20 overflow-hidden bg-void py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#080808_0%,#1d1d1d_50%,#2a1720_100%)]" />
        <MotifField items={[{ kind: "cross", x: 93, y: 8, size: 42 }, { kind: "heart", x: 80, y: 16, size: 24, pink: true }]} />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <SectionHead kicker="Your concierge" sub="Choose a C, tell me a little, and I'll reply personally, usually within one business day.">
              What can I <span className="text-petal">handle for you?</span>
            </SectionHead>
          </Reveal>
          <Reveal delay={120}>
            <Concierge email={CONTACT.email} phoneHref={TEL} />
          </Reveal>
        </div>
      </section>

      {/* ── TOOLS ── */}
      <section className="relative overflow-hidden bg-obsidian py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(242,175,198,0.08),transparent_55%)]" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <SectionHead kicker="Run your own numbers" sub="Two quick tools: what a Mercedes could cost each month, and what a project could start at. No sign-up.">
              Know the number <span className="text-petal">before the call.</span>
            </SectionHead>
          </Reveal>
          <Reveal delay={120}>
            <Estimators />
          </Reveal>
        </div>
      </section>

      <div className="bg-void py-6"><Ornament /></div>

      {/* ── CONTENT ── */}
      <section className="relative overflow-hidden bg-void py-16 md:py-24">
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <SectionHead kicker="Content" sub="Showroom reels, quote cards and poems. Tap any tile to see where it lives.">
              Seen on the <span className="text-petal">feed.</span>
            </SectionHead>
          </Reveal>
          <ContentWall />
        </div>
      </section>

      {/* ── ONE PERSON, NOT AN AGENCY ── */}
      <section className="relative overflow-hidden bg-obsidian py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.07),transparent_55%)]" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <SectionHead kicker="Why a concierge" sub="Global brands and small businesses get the same thing: one senior person who owns the outcome.">
              Not an agency. <span className="text-petal">Your concierge.</span>
            </SectionHead>
          </Reveal>
          <div className="grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-4">
            {ONE_PERSON.map((item, i) => (
              <Reveal key={item.title} delay={i * 90} className="h-full">
                <article className="h-full bg-void p-7 md:p-8">
                  <span className="font-display text-3xl text-petal/60">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-display text-3xl uppercase leading-none tracking-[0.02em] text-pearl">{item.title}</h3>
                  <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUILD STANDARDS ── */}
      <section className="relative overflow-hidden bg-void py-16 md:py-24">
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <SectionHead kicker="Every Code build ships with">
              Built to perform, <span className="text-petal">not just to look good.</span>
            </SectionHead>
          </Reveal>
          <div className="grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-3">
            {BUILD_STANDARDS.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 90} className="h-full">
                <article className="h-full bg-obsidian p-7 md:p-8">
                  <span className="font-display text-3xl text-petal/60">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.02em] text-pearl">{item.title}</h3>
                  <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">{item.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-void py-6"><Ornament /></div>

      {/* ── CLIENT TESTIMONIALS ── */}
      <section className="relative overflow-hidden bg-obsidian py-16 md:py-24">
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <SectionHead kicker="In their words">
              Founders on <span className="text-petal">the work.</span>
            </SectionHead>
            <Link href="/testimonials" className="mb-10 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-petal transition hover:text-blush">
              Read all client results →
            </Link>
          </div>
          <div className="grid gap-px bg-graphite lg:grid-cols-2">
            {HOME_TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 100} className="h-full">
                <figure className="relative flex h-full flex-col justify-between bg-void p-8 md:p-10">
                  <div className="absolute inset-x-0 top-0 h-px bg-petal" />
                  <span className="select-none font-serif text-6xl leading-none text-petal/25">&ldquo;</span>
                  <blockquote className="mt-2 font-serif text-lg italic leading-8 text-pearl md:text-xl">{t.quote}</blockquote>
                  <figcaption className="mt-8 border-t border-graphite pt-6">
                    <p className="font-display text-2xl uppercase tracking-[0.02em] text-white">{t.name}</p>
                    <p className="mt-1 font-body text-sm font-light text-petal">
                      {t.role}, {t.company}
                    </p>
                    <p className="mt-2 font-body text-[0.62rem] font-bold uppercase tracking-[0.22em] text-iron">{t.service}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUNDING REDESIGN + $97 AUDIT ── */}
      <section className="relative overflow-hidden border-y border-petal/25 py-14 md:py-20 gradient-pink-grey-soft">
        <div className="relative mx-auto grid max-w-[1400px] gap-10 px-6 lg:grid-cols-2 lg:px-10">
          <Reveal>
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">Limited · A few founding clients · This quarter</p>
            <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-[0.02em] text-pearl md:text-5xl">
              Your site, rebuilt to <span className="text-petal">earn its keep.</span>
            </h2>
            <p className="mt-5 max-w-xl font-body text-base font-light leading-8 text-smoke">
              A small number of full redesigns this quarter at a discounted rate, in exchange for a testimonial. Audited, rebuilt fast and mobile-first, and hands-on from start to finish.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/redesign" className="btn-primary inline-flex justify-center px-6 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void">
                See the Offer →
              </Link>
              <Link href="/book" className="inline-flex justify-center border border-graphite px-6 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-ash transition hover:border-petal hover:text-petal">
                Book a Fit Call
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">Start here · Async · No call required</p>
            <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-[0.02em] text-white md:text-5xl">
              The 48-Hour Positioning Audit: <span className="text-petal text-glow">$97.</span>
            </h2>
            <p className="mt-5 max-w-xl font-body text-base font-light leading-8 text-smoke">
              Send your website, LinkedIn and one offer page. Within 48 hours you get a Loom teardown, a written scorecard, three rewritten headlines and your three highest-priority fixes.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href={STRIPE_AUDIT} target="_blank" rel="noreferrer" className="btn-primary inline-flex justify-center px-6 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void">
                {CTA.audit}
              </Link>
              <Link href="/audit" className="inline-flex justify-center border border-graphite bg-void/40 px-6 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-pearl transition hover:border-petal hover:text-petal">
                How it works
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FOLLOW + LEAD CAPTURE ── */}
      <section id="follow" className="relative scroll-mt-20 overflow-hidden bg-void py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#080808_0%,#1d1d1d_50%,#2a1720_100%)]" />
        <MotifField items={[{ kind: "anchor", x: 92, y: 12, size: 38 }, { kind: "heart", x: 46, y: 86, size: 26, pink: true }]} />
        <div className="relative mx-auto grid max-w-[1400px] gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <Reveal>
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">Follow along</p>
            <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-[0.02em] text-pearl md:text-6xl">
              See it <span className="text-petal">before you ask.</span>
            </h2>
            <p className="mt-5 max-w-md font-body text-base font-light leading-8 text-smoke">
              New cars, showroom reels, quotes and writing go up on these accounts first.
            </p>
            <ul className="mt-7 grid gap-px bg-graphite sm:grid-cols-2">
              {SOCIALS.map((s) => (
                <li key={s.label} className="bg-obsidian">
                  <a href={s.href} target="_blank" rel="noreferrer" className="flex h-full flex-col px-5 py-4 transition hover:bg-carbon">
                    <span className="font-display text-2xl uppercase tracking-[0.02em] text-pearl">{s.label}</span>
                    <span className="font-body text-xs font-light text-petal">{s.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <InlineLeadCapture source="home-mk-parrish" />
          </Reveal>
        </div>
      </section>

      <div className="bg-void py-6"><Ornament /></div>

      {/* ── CLOSING CTA ── */}
      <section className="relative overflow-hidden py-20 md:py-28 gradient-pink-grey">
        <div className="relative mx-auto max-w-[1400px] px-6 text-center lg:px-10">
          <Reveal>
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">Ready when you are</p>
            <h2 className="mx-auto mt-5 max-w-4xl font-display text-5xl uppercase leading-[0.92] tracking-[0.02em] text-white md:text-7xl">
              The Four C&apos;s. <span className="text-petal text-glow">One concierge.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-serif text-lg italic leading-8 text-smoke md:text-xl">
              {BRAND.line} Tell me what you need and I&apos;ll tell you where I&apos;d start.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/test-drive" className="btn-primary inline-flex justify-center px-8 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void">
                {CTA.testDrive} →
              </Link>
              <Link href="/book" className="inline-flex justify-center border border-petal/60 bg-void/30 px-8 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-petal transition hover:bg-petal/5">
                {CTA.concierge}
              </Link>
              <a href={TEL} className="inline-flex justify-center border border-graphite bg-void/30 px-8 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-pearl transition hover:border-petal hover:text-petal">
                Call or text {CONTACT.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <ContactDock phone={CONTACT.phone} tel={TEL} sms={SMS} />
    </>
  );
}
