import type { Metadata } from "next";
import Section from "@/app/components/Section";
import { BOOKING_URL, policies } from "@/content/site";

export const metadata: Metadata = {
  title: "Policies",
  description: "Booking, cancellation and no-show policies for Tres Belle Wellness & Aesthetics.",
};

export default function PoliciesPage() {
  return (
    <div className="pt-16">
      <Section eyebrow="Good to know" title="Policies" lede="A few things that keep the schedule fair for everyone.">
        <dl className="border-t hairline">
          {policies.map((p) => (
            <div key={p.title} className="reveal grid gap-3 border-b hairline py-8 md:grid-cols-[1fr_2fr] md:gap-12">
              <dt className="serif-italic text-2xl">{p.title}</dt>
              <dd className="max-w-2xl leading-relaxed text-[var(--color-smoke)]">{p.body}</dd>
            </div>
          ))}
        </dl>
        <p className="reveal mt-10 text-sm text-[var(--color-ash)]">
          The policies shown at checkout on{" "}
          <a href={BOOKING_URL} target="_blank" rel="noopener" className="underline underline-offset-4 hover:text-[var(--color-pearl)]">
            GlossGenius
          </a>{" "}
          are the binding version.
        </p>
      </Section>
    </div>
  );
}
