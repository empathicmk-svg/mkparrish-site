import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { QuoteButton } from "./SiteProvider";
import { btn, type ButtonVariant } from "./styles";
import type { QuotePrefill } from "./QuoteForm";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${light ? "text-lime" : "text-leaf"}`}>{children}</p>
  );
}

export function H2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`font-display text-3xl font-semibold tracking-tight text-forest sm:text-4xl ${className}`}>
      {children}
    </h2>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
}) {
  return (
    <Link href={href} className={btn(variant)}>
      {children}
    </Link>
  );
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-1.5 text-sm font-semibold text-forest">
      {children}
      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

export function Breadcrumbs({ trail }: { trail: { href: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-xs text-white/60">
        <li>
          <Link href="/" className="hover:text-white">
            Home
          </Link>
        </li>
        {trail.map((t, i) => (
          <li key={t.href} className="flex items-center gap-1">
            <ChevronRight size={12} aria-hidden="true" />
            {i === trail.length - 1 ? (
              <span aria-current="page" className="text-white">
                {t.label}
              </span>
            ) : (
              <Link href={t.href} className="hover:text-white">
                {t.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  trail,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  trail?: { href: string; label: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-forest text-white">
      <div aria-hidden="true" className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-leaf/40 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-lime/20 blur-3xl" />
      <Container className="relative py-16 sm:py-20">
        {trail && (
          <div className="mb-6">
            <Breadcrumbs trail={trail} />
          </div>
        )}
        <Eyebrow light>{eyebrow}</Eyebrow>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{intro}</p>
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </Container>
    </section>
  );
}

export function Card({
  href,
  title,
  body,
  delay = 0,
}: {
  href: string;
  title: string;
  body: string;
  delay?: number;
}) {
  return (
    <Link
      href={href}
      data-reveal
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
      className="group flex flex-col rounded-2xl border border-line bg-white p-7 transition-all hover:-translate-y-1 hover:border-leaf hover:shadow-xl hover:shadow-leaf/10"
    >
      <h3 className="font-display text-xl font-semibold text-forest">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-stone">{body}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-leaf">
        Learn more <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export function CtaBand({
  title = "Have a product ready to make?",
  prefill,
}: {
  title?: string;
  prefill?: QuotePrefill;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-moss to-leaf">
      <div aria-hidden="true" className="absolute -right-10 -top-20 h-64 w-64 rounded-full bg-lime/30 blur-2xl" />
      <Container className="relative flex flex-col items-start justify-between gap-6 py-16 md:flex-row md:items-center">
        <div>
          <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
          <p className="mt-2 text-white/85">Send us the details and we&apos;ll come back with pricing and lead times.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <QuoteButton variant="accent" prefill={prefill}>
            Request a quote <ArrowRight size={16} />
          </QuoteButton>
          <ButtonLink href="/start" variant="outline-light">
            Build your product
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
