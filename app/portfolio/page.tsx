import type { Metadata } from "next";

const featuredDocs = [
  {
    label: "Portfolio PDF",
    title: "MK Parrish Portfolio",
    href: "/downloads/portfolio/MK_Parrish_Portfolio.pdf",
    meta: "Full candidate portfolio",
  },
  {
    label: "One Sheet",
    title: "Portfolio One-Sheet",
    href: "/downloads/portfolio/public/mk-parrish-portfolio-one-sheet.pdf",
    meta: "Public quick-send PDF",
  },
  {
    label: "Writing Pack",
    title: "Writing Portfolio Pack",
    href: "/downloads/portfolio/public/mk-parrish-writing-portfolio-pack.html",
    meta: "Readable microsite document",
  },
  {
    label: "Resume",
    title: "MK Parrish Resume 2026",
    href: "/downloads/portfolio/public/mk-parrish-resume-2026.pdf",
    meta: "Current resume PDF",
  },
];

const vaultDocs = [
  {
    title: "Lead Magnet Index",
    href: "/downloads/portfolio/public/mk-parrish-lead-magnet-index.html",
  },
  {
    title: "Website Leak Map",
    href: "/downloads/portfolio/public/lead-magnets/website-leak-map.html",
  },
  {
    title: "Private Vault Index",
    href: "/downloads/portfolio/protected/vault-index.html",
  },
  {
    title: "Carousel Copy Packs",
    href: "/downloads/portfolio/protected/carousel-copy-packs.zip",
  },
];

const writingSamples = [
  {
    title: "Brand Voice Playbook",
    href: "/downloads/portfolio/public/writing-samples/mk-parrish-brand-voice-playbook.pdf",
  },
  {
    title: "Build Copy Guide",
    href: "/downloads/portfolio/protected/writing-samples/mk-parrish-build-copy-guide.pdf",
  },
  {
    title: "Rewrite Playbook",
    href: "/downloads/portfolio/protected/writing-samples/mk-parrish-rewrite-playbook.pdf",
  },
  {
    title: "Rewrite Checklist",
    href: "/downloads/portfolio/protected/writing-samples/mk-parrish-rewrite-checklist.pdf",
  },
  {
    title: "Margin Notes Vol. III",
    href: "/downloads/portfolio/protected/writing-samples/mk-parrish-margin-notes-vol-iii.pdf",
  },
  {
    title: "Ghostwriting Playbook",
    href: "/downloads/portfolio/protected/writing-samples/mk-parrish-ghostwriting-playbook.epub",
  },
];

export const metadata: Metadata = {
  title: "Portfolio Documents - MK Parrish",
  description: "An unlinked MK Parrish portfolio document microsite for selected PDFs, writing samples, and portfolio files.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PortfolioDocumentsPage() {
  return (
    <main className="bg-void text-pearl">
      <section className="relative overflow-hidden px-6 pb-16 pt-28 md:px-10 md:pt-36">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[55vh] bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.12),transparent_62%)]" />
        <div className="relative mx-auto max-w-[1180px]">
          <p className="font-body text-[0.68rem] font-bold uppercase tracking-[0.32em] text-petal">
            Unlinked document microsite
          </p>
          <h1
            className="mt-5 max-w-4xl font-display text-6xl uppercase leading-[0.88] tracking-[0.02em] text-white md:text-8xl"
            style={{ fontWeight: 400 }}
          >
            Portfolio Documents
          </h1>
          <p className="mt-6 max-w-2xl font-body text-base font-light leading-8 text-smoke md:text-lg">
            A quiet home for MK Parrish portfolio files, writing samples, one-sheets, and working documents. This page is not
            linked from the main navigation.
          </p>
        </div>
      </section>

      <section className="border-y border-graphite bg-obsidian px-6 py-14 md:px-10">
        <div className="mx-auto grid max-w-[1180px] gap-px overflow-hidden border border-graphite bg-graphite md:grid-cols-4">
          {featuredDocs.map((doc) => (
            <a key={doc.href} href={doc.href} className="group bg-void p-6 transition-colors hover:bg-carbon">
              <p className="font-body text-[0.6rem] font-bold uppercase tracking-[0.24em] text-petal">{doc.label}</p>
              <h2
                className="mt-4 font-display text-3xl uppercase leading-none tracking-[0.02em] text-pearl group-hover:text-white"
                style={{ fontWeight: 400 }}
              >
                {doc.title}
              </h2>
              <p className="mt-3 font-body text-sm font-light leading-6 text-ash">{doc.meta}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">Writing samples</p>
            <h2
              className="mt-4 font-display text-5xl uppercase leading-[0.94] tracking-[0.02em] text-pearl"
              style={{ fontWeight: 400 }}
            >
              Selected Proof
            </h2>
            <p className="mt-5 max-w-md font-body text-base font-light leading-8 text-smoke">
              Direct links for samples that need to stay easy to send without turning Portfolio into a public nav item.
            </p>
          </div>

          <div className="divide-y divide-graphite border-y border-graphite">
            {writingSamples.map((sample) => (
              <a
                key={sample.href}
                href={sample.href}
                className="group flex items-center justify-between gap-5 py-5 transition-colors hover:text-petal"
              >
                <span className="font-body text-sm font-semibold uppercase tracking-[0.18em] text-pearl group-hover:text-petal">
                  {sample.title}
                </span>
                <span className="font-display text-2xl leading-none text-petal" style={{ fontWeight: 400 }}>
                  Open
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-obsidian px-6 py-16 md:px-10">
        <div className="mx-auto max-w-[1180px]">
          <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">Vault links</p>
          <div className="mt-8 grid gap-px overflow-hidden border border-graphite bg-graphite md:grid-cols-4">
            {vaultDocs.map((doc) => (
              <a key={doc.href} href={doc.href} className="group bg-void p-6 transition-colors hover:bg-carbon">
                <h3
                  className="font-display text-3xl uppercase leading-none tracking-[0.02em] text-pearl group-hover:text-petal"
                  style={{ fontWeight: 400 }}
                >
                  {doc.title}
                </h3>
                <p className="mt-5 font-body text-[0.65rem] font-bold uppercase tracking-[0.22em] text-ash">
                  Open file
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
