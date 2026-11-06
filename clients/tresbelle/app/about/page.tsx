import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/app/components/Section";
import FirstVisit from "@/app/components/FirstVisit";
import { BOOKING_URL, about, addressLine, brand, mapsUrl, pillars, team } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${brand.legalName}: a clinician-led aesthetics studio in ${brand.location} run by nurse practitioners.`,
};

export default function AboutPage() {
  return (
    <>
      {/* ── INTRO ───────────────────────────────────────────── */}
      <section className="pb-16 pt-36 md:pt-44">
        <div className="container-x">
          <p className="eyebrow reveal mb-6">About us</p>
          <h1 className="display reveal text-[clamp(4rem,13vw,11rem)]">
            Honest care, <span className="gold-text">beautiful</span> results
          </h1>
          <blockquote className="reveal mt-10 max-w-3xl border-l-2 border-[var(--color-petal)] pl-6">
            <p className="serif-italic text-[clamp(1.4rem,2.6vw,2.1rem)] leading-snug text-[var(--color-blush)]">
              &ldquo;{about.mission}&rdquo;
            </p>
            <footer className="eyebrow mt-4">{about.signoff}</footer>
          </blockquote>
        </div>
      </section>

      {/* ── STORY + FACTS ───────────────────────────────────── */}
      <section className="section-y border-t hairline">
        <div className="container-x grid gap-12 md:grid-cols-[3fr_2fr] md:gap-20">
          <div className="space-y-6">
            {about.story.map((para) => (
              <p key={para.slice(0, 24)} className="reveal text-lg leading-relaxed text-[var(--color-smoke)] md:text-xl">
                {para}
              </p>
            ))}
          </div>
          <dl className="grid grid-cols-3 gap-6 self-start md:grid-cols-1 md:gap-10">
            {about.facts.map((f) => (
              <div key={f.label} className="reveal flex flex-col-reverse">
                <dt className="eyebrow mt-2">{f.label}</dt>
                <dd className="display gold-text text-6xl md:text-8xl">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── VALUES ──────────────────────────────────────────── */}
      <Section eyebrow="What we believe" title="Our values" className="border-t hairline bg-[var(--color-void)]">
        <ol className="grid gap-px bg-[rgba(217,195,160,0.18)] md:grid-cols-3">
          {pillars.map((p) => (
            <li key={p.n} className="reveal bg-[var(--color-void)] p-8 md:p-10">
              <span className="display text-7xl text-[var(--color-graphite)]">{p.n}</span>
              <h3 className="serif-italic mt-6 text-3xl">{p.title}</h3>
              <p className="mt-4 leading-relaxed text-[var(--color-smoke)]">{p.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── TEAM ────────────────────────────────────────────── */}
      <Section
        eyebrow="Your providers"
        title={
          <>
            Meet the <span className="serif-italic text-[0.62em] text-[var(--color-petal)]">team</span>
          </>
        }
        lede="Choose your provider when you book online."
        className="border-t hairline"
      >
        <ul className="grid gap-px bg-[rgba(217,195,160,0.18)] sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <li key={m.name} className="reveal bg-[var(--color-obsidian)] p-8">
              <span aria-hidden className="serif-italic flex h-16 w-16 items-center justify-center rounded-full border border-[var(--color-champagne)] text-2xl text-[var(--color-champagne)]">
                {m.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </span>
              <p className="display mt-6 text-4xl">{m.name}</p>
              <p className="eyebrow mt-3">
                {m.credential ? `${m.credential} · ` : ""}
                {m.role}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ── FIRST VISIT ─────────────────────────────────────── */}
      <Section eyebrow="New here?" title="Your first visit" className="border-t hairline">
        <FirstVisit />
      </Section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="section-y border-t hairline bg-[var(--color-carbon)]">
        <div className="container-x reveal text-center">
          <p className="eyebrow mb-6">{addressLine}</p>
          <h2 className="display text-[clamp(3rem,8vw,6.5rem)]">
            Come see <span className="serif-italic text-[0.62em] text-[var(--color-petal)]">us</span>
          </h2>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={BOOKING_URL} target="_blank" rel="noopener" className="btn btn-primary">
              Book an appointment <span aria-hidden>→</span>
            </a>
            <a href={mapsUrl} target="_blank" rel="noopener" className="btn btn-ghost">
              Get directions
            </a>
            <Link href="/#services" className="btn btn-ghost">
              View the menu
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
