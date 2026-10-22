import type { Metadata } from "next";
import { Container, CtaBand, Eyebrow, H2, PageHero } from "../components/ui";
import { ABOUT, COMPANY, LOCATIONS } from "../content/site";

export const metadata: Metadata = {
  title: "About",
  description: `${COMPANY.name} has manufactured vitamins and dietary supplements for other brands since ${COMPANY.founded}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About" title={`Making supplements since ${COMPANY.founded}`} intro={ABOUT.intro} />
      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>What&apos;s next</Eyebrow>
            <H2 className="mt-3">Growing in North Carolina</H2>
            <p className="mt-5 leading-relaxed text-stone">{ABOUT.growth}</p>
          </div>
          <div className="space-y-5">
            {LOCATIONS.map((loc) => (
              <article key={loc.name} className="rounded-2xl border border-line p-7">
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
