type Props = {
  id?: string;
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

/** Shared section frame: mono eyebrow, Bebas headline, optional serif lede. */
export default function Section({ id, eyebrow, title, lede, children, className = "" }: Props) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={`section-y ${className}`}>
      <div className="container-x">
        <header className="reveal mb-12 grid gap-6 md:mb-16 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <p className="eyebrow mb-4">{eyebrow}</p>
            <h2 id={headingId} className="display text-[clamp(3rem,8vw,6.5rem)]">
              {title}
            </h2>
          </div>
          {lede && <p className="max-w-md text-lg leading-relaxed text-[var(--color-smoke)] md:justify-self-end">{lede}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}
