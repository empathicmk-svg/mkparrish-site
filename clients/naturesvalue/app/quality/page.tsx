import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { Container, CtaBand, PageHero } from "../components/ui";
import { QUALITY } from "../content/site";

export const metadata: Metadata = {
  title: "Quality",
  description:
    "cGMP manufacturing, raw material and finished product testing, and full batch traceability for every supplement lot.",
  alternates: { canonical: "/quality" },
};

export default function QualityPage() {
  return (
    <>
      <PageHero
        eyebrow="Quality"
        title="Quality built into every batch"
        intro="Your brand's name is on the label, so we test what goes in, check what comes out, and keep the records to prove it."
        trail={[{ href: "/quality", label: "Quality" }]}
      />
      <section className="py-20">
        <Container className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {QUALITY.map((q, i) => (
            <article
              key={q.title}
              data-reveal
              style={{ "--d": `${(i % 3) * 90}ms` } as React.CSSProperties}
              className="rounded-3xl border border-line bg-white p-7 transition-all hover:-translate-y-1 hover:border-leaf hover:shadow-xl"
            >
              <span className="inline-flex rounded-2xl bg-lime p-3 text-forest">
                <ShieldCheck size={22} aria-hidden="true" />
              </span>
              <h2 className="mt-5 font-display text-xl font-semibold text-forest">{q.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-stone">{q.body}</p>
            </article>
          ))}
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
