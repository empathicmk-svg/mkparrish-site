import { ArrowRight, CheckCircle2, FlaskConical, Factory, ShieldCheck } from "lucide-react";
import { ButtonLink, Container, CtaBand, Eyebrow, H2, TextLink } from "./components/ui";
import { DOSAGE_FORMS, LOCATIONS, PROCESS, QUALITY, STATS } from "./content/site";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-cream">
        <div aria-hidden="true" className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-sage" />
        <div aria-hidden="true" className="absolute -right-10 top-40 h-56 w-56 rounded-full bg-leaf/15" />
        <Container className="relative py-20 sm:py-28">
          <Eyebrow>Supplement contract manufacturing</Eyebrow>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[1.05] tracking-tight text-forest sm:text-6xl">
            Your formula, made right, batch after batch.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone">
            Nature&apos;s Value manufactures capsules, tablets, liquid caps and powders for supplement brands, under cGMP
            and with in-house testing, at the scale you need to grow.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/contact">
              Request a quote <ArrowRight size={16} />
            </ButtonLink>
            <ButtonLink href="/capabilities" variant="ghost">
              See capabilities
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section aria-label="At a glance" className="border-y border-line bg-paper">
        <Container className="grid gap-8 py-10 sm:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-display text-4xl font-semibold text-forest">{s.value}</p>
              <p className="mt-1 text-sm text-stone">{s.label}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow>Dosage forms</Eyebrow>
              <H2 className="mt-3">What we make</H2>
            </div>
            <TextLink href="/capabilities">All capabilities</TextLink>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DOSAGE_FORMS.map((f) => (
              <article key={f.slug} className="rounded-2xl border border-line bg-white p-6">
                <h3 className="font-display text-xl font-semibold text-forest">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone">{f.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-forest py-20 text-white sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sage">Why brands choose us</p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              One partner from formula to finished bottle.
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-white/75">
              Formulation, sourcing, manufacturing, testing and packaging under one quality system, so there&apos;s one
              team accountable for your product.
            </p>
          </div>
          <ul className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
            {[
              { icon: Factory, t: "Capacity to grow", d: "Commercial-scale lines for first runs and repeat orders alike." },
              { icon: FlaskConical, t: "Tested in house", d: "Materials and finished goods are checked against spec before release." },
              { icon: ShieldCheck, t: "Built for compliance", d: "cGMP production with the documentation retailers ask for." },
            ].map(({ icon: Icon, t, d }) => (
              <li key={t} className="flex gap-4">
                <Icon className="mt-1 shrink-0 text-sage" size={22} aria-hidden="true" />
                <div>
                  <h3 className="font-semibold">{t}</h3>
                  <p className="mt-1 text-sm text-white/70">{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <Eyebrow>How it works</Eyebrow>
          <H2 className="mt-3">From inquiry to delivery</H2>
          <ol className="mt-10 grid gap-6 md:grid-cols-5">
            {PROCESS.map((p) => (
              <li key={p.step} className="border-t-2 border-leaf pt-5">
                <span className="text-sm font-semibold text-leaf">{p.step}</span>
                <h3 className="mt-2 font-semibold text-forest">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">{p.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-cream py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
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
            {QUALITY.slice(0, 4).map((q) => (
              <li key={q.title} className="flex gap-3 rounded-xl bg-white p-5">
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
          <Eyebrow>Facilities</Eyebrow>
          <H2 className="mt-3">Where we make it</H2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {LOCATIONS.map((loc) => (
              <article key={loc.name} className="rounded-2xl border border-line p-7">
                <h3 className="font-display text-2xl font-semibold text-forest">{loc.name}</h3>
                <p className="mt-2 text-sm text-stone">{loc.detail}</p>
                <p className="mt-4 text-sm font-medium text-ink">{loc.note}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
