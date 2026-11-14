import { ArrowRight, Check } from "lucide-react";
import { Card, Container, CtaBand, Eyebrow, H2, PageHero } from "./ui";
import { QuoteButton } from "./SiteProvider";
import { WHY, type Item } from "../content/site";
import { FormIcon } from "./FormIcon";

// Shared layout for every capability, service and industry page.
export default function ItemDetail({
  item,
  section,
  base,
  siblings,
  dosageForm,
}: {
  item: Item;
  section: string;
  base: string;
  siblings: Item[];
  dosageForm?: boolean;
}) {
  const prefill = dosageForm ? { dosageForm: item.title } : { details: `I'm interested in ${item.title.toLowerCase()}.\n\n` };
  return (
    <>
      <PageHero
        eyebrow={section}
        title={item.title}
        intro={item.short}
        trail={[
          { href: base, label: section },
          { href: `${base}/${item.slug}`, label: item.title },
        ]}
      >
        <QuoteButton variant="accent" prefill={prefill}>
          Get a quote <ArrowRight size={16} />
        </QuoteButton>
      </PageHero>

      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div data-reveal>
            <Eyebrow>Overview</Eyebrow>
            <p className="mt-4 text-lg leading-relaxed text-ink">{item.body}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {item.points.map((p) => (
                <li key={p} className="flex items-start gap-3 rounded-2xl bg-sage px-5 py-4 font-medium text-forest">
                  <Check size={18} className="mt-0.5 shrink-0 text-leaf" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <aside data-reveal style={{ "--d": "120ms" } as React.CSSProperties} className="space-y-5">
            {dosageForm && (
              <div className="flex items-center justify-center rounded-3xl bg-gradient-to-br from-lime/50 to-sage p-10">
                <FormIcon slug={item.slug} large />
              </div>
            )}
            {item.idealFor && (
              <div className="rounded-3xl bg-forest p-7 text-white">
                <h2 className="font-display text-xl font-semibold">Ideal for</h2>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  {item.idealFor.map((x) => (
                    <li key={x} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden="true" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="rounded-3xl border border-line p-7">
              <h2 className="font-display text-xl font-semibold text-forest">Why Nature&apos;s Value</h2>
              <ul className="mt-4 space-y-3">
                {WHY.map((w) => (
                  <li key={w.title} className="text-sm">
                    <span className="font-semibold text-forest">{w.title}.</span>{" "}
                    <span className="text-stone">{w.body}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </section>

      <section className="bg-cream py-20">
        <Container>
          <H2>More {section.toLowerCase()}</H2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {siblings
              .filter((s) => s.slug !== item.slug)
              .slice(0, 3)
              .map((s, i) => (
                <Card key={s.slug} href={`${base}/${s.slug}`} title={s.title} body={s.short} delay={i * 90} />
              ))}
          </div>
        </Container>
      </section>

      <CtaBand title={`Ready to talk ${item.title.toLowerCase()}?`} prefill={prefill} />
    </>
  );
}
