import type { Metadata } from "next";
import { Container, CtaBand, Eyebrow, H2, PageHero } from "../components/ui";
import CountUp from "../components/CountUp";
import { ABOUT, COMPANY, LOCATIONS, STATS, WHY } from "../content/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `${COMPANY.name} has manufactured vitamins and dietary supplements for other brands since ${COMPANY.founded}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={`Making supplements since ${COMPANY.founded}`}
        intro={ABOUT.intro}
        trail={[{ href: "/about", label: "About us" }]}
      />
      <section className="border-b border-line">
        <Container className="grid grid-cols-2 gap-8 py-12 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-display text-5xl font-semibold text-forest">
                <CountUp value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-sm text-stone">{s.label}</p>
            </div>
          ))}
        </Container>
      </section>
      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div data-reveal>
            <Eyebrow>What&apos;s next</Eyebrow>
            <H2 className="mt-3">Growing in North Carolina</H2>
            <p className="mt-5 leading-relaxed text-stone">{ABOUT.growth}</p>
          </div>
          <div className="space-y-5">
            {LOCATIONS.map((loc, i) => (
              <article
                key={loc.name}
                data-reveal
                style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
                className="rounded-3xl border border-line bg-gradient-to-br from-white to-sage p-7"
              >
                <h3 className="font-display text-2xl font-semibold text-forest">{loc.name}</h3>
                <p className="mt-2 text-sm text-stone">{loc.detail}</p>
                <p className="mt-4 text-sm font-medium">{loc.note}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-cream py-20">
        <Container>
          <H2>What we stand for</H2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w, i) => (
              <div key={w.title} data-reveal style={{ "--d": `${i * 90}ms` } as React.CSSProperties} className="rounded-3xl bg-white p-7">
                <h3 className="font-display text-xl font-semibold text-forest">{w.title}</h3>
                <p className="mt-2 text-sm text-stone">{w.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
