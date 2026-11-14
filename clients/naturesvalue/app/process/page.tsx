import type { Metadata } from "next";
import { Container, CtaBand, PageHero } from "../components/ui";
import { PROCESS } from "../content/site";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Five steps from your first inquiry to finished product delivered, with one team accountable throughout.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="From inquiry to delivery"
        intro="A clear, five-step process with one team accountable for your product from first call to final shipment."
        trail={[{ href: "/process", label: "How it works" }]}
      />
      <section className="py-20">
        <Container>
          <ol className="relative space-y-8 border-l-2 border-sage pl-8 sm:pl-12">
            {PROCESS.map((p, i) => (
              <li key={p.step} data-reveal style={{ "--d": `${i * 60}ms` } as React.CSSProperties} className="relative">
                <span className="absolute -left-[3.05rem] top-1 flex h-10 w-10 items-center justify-center rounded-full bg-lime text-sm font-bold text-forest ring-8 ring-paper sm:-left-[4.05rem]">
                  {p.step}
                </span>
                <div className="rounded-3xl border border-line bg-white p-7 transition-shadow hover:shadow-xl">
                  <h2 className="font-display text-2xl font-semibold text-forest">{p.title}</h2>
                  <p className="mt-2 leading-relaxed text-stone">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
