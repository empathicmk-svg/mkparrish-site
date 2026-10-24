import { ArrowRight, CheckCircle2, FlaskConical, Factory, Rocket, ShieldCheck } from "lucide-react";
import { ButtonLink, Card, Container, CtaBand, Eyebrow, H2, TextLink } from "./components/ui";
import { QuoteButton } from "./components/SiteProvider";
import CountUp from "./components/CountUp";
import DosageGrid from "./components/DosageGrid";
import AudienceTabs from "./components/AudienceTabs";
import { FormIcon } from "./components/FormIcon";
import { LOCATIONS, PROCESS, QUALITY, SERVICES, STATS, WHY } from "./content/site";

const MARQUEE = ["Private label", "Custom formulation", "Capsules", "Tablets", "Liquid caps", "Powders", "Packaging", "In-house testing", "cGMP"];
const WHY_ICONS = [Rocket, Factory, FlaskConical, ShieldCheck];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-forest text-white">
        <div aria-hidden="true" className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-leaf/50 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-lime/25 blur-3xl" />
        <Container className="relative grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-lime">
              <span className="h-2 w-2 rounded-full bg-lime" aria-hidden="true" /> Private label &amp; contract manufacturing
            </p>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Your supplement, <span className="text-lime">from idea to shelf.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              Nature&apos;s Value formulates, manufactures, tests and packages capsules, tablets, liquid caps and powders
              for supplement brands, under one cGMP quality system and at the scale you need to grow.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <QuoteButton variant="accent">
                Request a quote <ArrowRight size={16} />
              </QuoteButton>
              <ButtonLink href="/start" variant="outline-light">
                Build your product in 4 steps
              </ButtonLink>
            </div>
          </div>
          <div aria-hidden="true" className="relative hidden h-96 lg:block">
            <div className="absolute inset-8 rounded-[3rem] bg-gradient-to-br from-lime/30 to-leaf/30 backdrop-blur" />
            <div className="float-slow absolute left-4 top-6 rounded-3xl bg-white p-5 shadow-2xl">
              <FormIcon slug="capsules" />
            </div>
            <div className="float-fast absolute right-2 top-24 rounded-3xl bg-white p-5 shadow-2xl">
              <FormIcon slug="tablets" />
            </div>
            <div className="float-fast absolute bottom-4 left-16 rounded-3xl bg-white p-5 shadow-2xl">
              <FormIcon slug="powders" />
            </div>
            <div className="float-slow absolute bottom-16 right-14 rounded-3xl bg-white p-5 shadow-2xl">
              <FormIcon slug="liquid-caps" />
            </div>
          </div>
        </Container>
        <div className="relative overflow-hidden border-t border-white/10 bg-moss/60 py-4" aria-hidden="true">
          <div className="marquee flex w-max gap-10 whitespace-nowrap text-sm font-semibold uppercase tracking-widest text-white/70">
            {[...MARQUEE, ...MARQUEE].map((m, i) => (
              <span key={i} className="flex items-center gap-10">
                {m} <span className="text-lime">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="At a glance" className="border-b border-line bg-paper">
        <Container className="grid grid-cols-2 gap-8 py-12 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div key={s.label} data-reveal style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
              <p className="font-display text-5xl font-semibold text-forest">
                <CountUp value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-sm text-stone">{s.label}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end" data-reveal>
            <div>
              <Eyebrow>Dosage forms</Eyebrow>
              <H2 className="mt-3">Every format, one partner</H2>
            </div>
            <TextLink href="/capabilities">All capabilities</TextLink>
          </div>
          <DosageGrid />
        </Container>
      </section>

      <section className="bg-cream py-20 sm:py-24">
        <Container>
          <div data-reveal>
            <Eyebrow>Why brands choose us</Eyebrow>
            <H2 className="mt-3 max-w-2xl">Turnkey manufacturing that gets you to market</H2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w, i) => {
              const Icon = WHY_ICONS[i];
              return (
                <div
                  key={w.title}
                  data-reveal
                  style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
                  className="rounded-3xl bg-white p-7 transition-transform hover:-translate-y-1"
                >
                  <span className="inline-flex rounded-2xl bg-lime p-3 text-forest">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-forest">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone">{w.body}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end" data-reveal>
            <div>
              <Eyebrow>Services</Eyebrow>
              <H2 className="mt-3">From concept to finished bottle</H2>
            </div>
            <TextLink href="/services">All services</TextLink>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Card key={s.slug} href={`/services/${s.slug}`} title={s.title} body={s.short} delay={(i % 3) * 90} />
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-forest py-20 text-white sm:py-24">
        <div aria-hidden="true" className="absolute -right-32 top-10 h-96 w-96 rounded-full bg-leaf/40 blur-3xl" />
        <Container className="relative">
          <Eyebrow light>Who we serve</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">A partner at every stage of growth</h2>
          <AudienceTabs />
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end" data-reveal>
            <div>
              <Eyebrow>How it works</Eyebrow>
              <H2 className="mt-3">From inquiry to delivery in five steps</H2>
            </div>
            <TextLink href="/process">See the process</TextLink>
          </div>
          <ol className="mt-12 grid gap-6 md:grid-cols-5">
            {PROCESS.map((p, i) => (
              <li
                key={p.step}
                data-reveal
                style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
                className="relative rounded-3xl border border-line p-6"
              >
                <span className="font-display text-4xl font-semibold text-lime [-webkit-text-stroke:1px_var(--color-leaf)]">
                  {p.step}
                </span>
                <h3 className="mt-3 font-semibold text-forest">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">{p.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-cream py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div data-reveal>
            <Eyebrow>Quality</Eyebrow>
            <H2 className="mt-3">Quality you can show your retailers</H2>
            <p className="mt-5 max-w-md leading-relaxed text-stone">
              Every lot is made under cGMP, tested before release and traceable back to its raw materials.
            </p>
            <div className="mt-8">
              <TextLink href="/quality">Our quality system</TextLink>
            </div>
          </div>
          <ul className="space-y-4">
            {QUALITY.slice(0, 4).map((q, i) => (
              <li
                key={q.title}
                data-reveal
                style={{ "--d": `${i * 80}ms` } as React.CSSProperties}
                className="flex gap-3 rounded-2xl bg-white p-5 transition-shadow hover:shadow-lg"
              >
                <CheckCircle2 className="mt-0.5 shrink-0 text-leaf" size={20} aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-forest">{q.title}</h3>
                  <p className="mt-1 text-sm text-stone">{q.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div data-reveal>
            <Eyebrow>Facilities</Eyebrow>
            <H2 className="mt-3">Where we make it</H2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {LOCATIONS.map((loc, i) => (
              <article
                key={loc.name}
                data-reveal
                style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
                className="rounded-3xl border border-line bg-gradient-to-br from-white to-sage p-8"
              >
                <h3 className="font-display text-2xl font-semibold text-forest">{loc.name}</h3>
                <p className="mt-2 text-sm text-stone">{loc.detail}</p>
                <p className="mt-4 text-sm font-medium">{loc.note}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
