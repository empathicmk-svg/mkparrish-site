import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Container, CtaBand, Eyebrow, H2, PageHero } from "../components/ui";
import { DOSAGE_FORMS, PROCESS, SERVICES } from "../content/site";

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Capsule, tablet, liquid cap and powder manufacturing, with formulation, sourcing, testing and packaging for supplement brands.",
  alternates: { canonical: "/capabilities" },
};

export default function CapabilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="Full-service supplement manufacturing"
        intro="We take your product from formula to finished, labeled bottle, in the dosage form that suits it."
      />

      <section className="py-20">
        <Container>
          <Eyebrow>Dosage forms</Eyebrow>
          <H2 className="mt-3">What we make</H2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {DOSAGE_FORMS.map((f) => (
              <article key={f.slug} id={f.slug} className="scroll-mt-24 rounded-2xl border border-line bg-white p-7">
                <h3 className="font-display text-2xl font-semibold text-forest">{f.title}</h3>
                <p className="mt-3 leading-relaxed text-stone">{f.body}</p>
                <ul className="mt-5 space-y-2">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-ink">
                      <Check size={16} className="mt-0.5 shrink-0 text-leaf" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-cream py-20">
        <Container>
          <Eyebrow>Services</Eyebrow>
          <H2 className="mt-3">Everything under one roof</H2>
          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.title}>
                <h3 className="font-semibold text-forest">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone">{s.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <Eyebrow>Working with us</Eyebrow>
          <H2 className="mt-3">From inquiry to delivery</H2>
          <ol className="mt-10 space-y-6">
            {PROCESS.map((p) => (
              <li key={p.step} className="grid gap-2 border-b border-line pb-6 sm:grid-cols-[6rem_12rem_1fr]">
                <span className="font-display text-2xl text-leaf">{p.step}</span>
                <h3 className="font-semibold text-forest">{p.title}</h3>
                <p className="text-stone">{p.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
