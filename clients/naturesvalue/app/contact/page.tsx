import type { Metadata } from "next";
import { Container } from "../components/ui";
import { COMPANY, LOCATIONS } from "../content/site";
import QuoteForm from "../components/QuoteForm";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Tell us about your supplement and we'll reply with pricing, minimums and lead times.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="bg-cream py-16 sm:py-20">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-leaf">Request a quote</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-forest sm:text-5xl">
            Let&apos;s talk about your product
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-stone">
            Tell us what you want to make. We&apos;ll review it and reply with pricing, minimum order quantities and
            lead times.
          </p>
          <dl className="mt-10 space-y-6 text-sm">
            {COMPANY.phone && (
              <div>
                <dt className="font-semibold text-forest">Phone</dt>
                <dd className="mt-1">
                  <a href={`tel:${COMPANY.phone}`}>{COMPANY.phone}</a>
                </dd>
              </div>
            )}
            {COMPANY.email && (
              <div>
                <dt className="font-semibold text-forest">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
                </dd>
              </div>
            )}
            {LOCATIONS.map((loc) => (
              <div key={loc.name}>
                <dt className="font-semibold text-forest">{loc.name}</dt>
                <dd className="mt-1 text-stone">{loc.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-3xl border border-line bg-white p-6 shadow-xl shadow-forest/5 sm:p-8">
          <QuoteForm />
        </div>
      </Container>
    </section>
  );
}
