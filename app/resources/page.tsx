import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tools & Resources",
  description: "The writing, publishing, design, selling, and website tools MK Parrish actually uses and recommends.",
};

const groups = [
  {
    title: "Build & Sell",
    intro: "The stack behind a fast site, clean checkout, and digital products that do not require a warehouse or a nervous breakdown.",
    tools: [
      {
        name: "Vercel",
        use: "Hosting and deploying modern websites",
        note: "Best for fast, production-ready Next.js sites with simple Git-based publishing.",
        href: "https://vercel.com",
      },
      {
        name: "GitHub",
        use: "Version control and site publishing",
        note: "The source of truth for the site, product files, and every change worth being able to undo.",
        href: "https://github.com",
      },
      {
        name: "Stripe",
        use: "Payments and checkout",
        note: "Direct checkout links for services, subscriptions, and digital products without building a custom cart.",
        href: "https://stripe.com",
      },
    ],
  },
  {
    title: "Write & Design",
    intro: "Tools that help the work look expensive without making the process needlessly precious.",
    tools: [
      {
        name: "Canva",
        use: "Ebooks, workbooks, social assets, and quick design",
        note: "Fast enough for daily work and flexible enough to build products people will actually pay for.",
        href: "https://www.canva.com",
      },
      {
        name: "ChatGPT",
        use: "Research, structure, editing, and production support",
        note: "Useful when it sharpens your thinking. Less useful when it replaces having any.",
        href: "https://chatgpt.com",
      },
      {
        name: "Substack",
        use: "Newsletter, essays, and paid membership",
        note: "The home of The Margins and the simplest bridge between free readers and recurring revenue.",
        href: "https://substack.com",
      },
    ],
  },
  {
    title: "Operate & Grow",
    intro: "Small tools that remove friction from lead capture, delivery, and the awkward part where someone tries to book you.",
    tools: [
      {
        name: "Resend",
        use: "Transactional email delivery",
        note: "Used for sending lead magnets and purchase-related messages from the site.",
        href: "https://resend.com",
      },
      {
        name: "Calendly",
        use: "Scheduling",
        note: "A clean way to move an interested person from browsing to an actual conversation.",
        href: "https://calendly.com",
      },
      {
        name: "Vercel Analytics",
        use: "Privacy-minded site analytics",
        note: "Enough signal to see what people use without turning the website into a surveillance van.",
        href: "https://vercel.com/analytics",
      },
    ],
  },
] as const;

export default function ResourcesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-void pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[65vh] w-[90vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.14),transparent_60%)]" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <p className="font-body text-[0.68rem] font-bold uppercase tracking-[0.32em] text-petal">The useful stack</p>
          <h1 className="mt-5 max-w-5xl font-display text-6xl uppercase leading-[0.88] tracking-[0.01em] text-pearl md:text-8xl lg:text-9xl">
            Tools I use, not tools I was <span className="text-petal">paid to pretend to love.</span>
          </h1>
          <p className="mt-7 max-w-3xl font-serif text-xl italic leading-9 text-smoke md:text-2xl">
            The software behind the site, the shop, The Margins, and the work. Simple enough to run. Serious enough to sell from.
          </p>
        </div>
      </section>

      <section className="bg-obsidian py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] space-y-16 px-6 lg:px-10">
          {groups.map((group) => (
            <div key={group.title}>
              <div className="grid gap-6 border-b border-graphite pb-8 lg:grid-cols-[0.65fr_1.35fr]">
                <h2 className="font-display text-4xl uppercase tracking-[0.02em] text-pearl md:text-5xl">{group.title}</h2>
                <p className="max-w-2xl font-body text-sm font-light leading-7 text-smoke">{group.intro}</p>
              </div>

              <div className="grid gap-px bg-graphite md:grid-cols-3">
                {group.tools.map((tool) => (
                  <a
                    key={tool.name}
                    href={tool.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex min-h-[260px] flex-col bg-void p-7 transition hover:bg-carbon"
                  >
                    <p className="font-body text-[0.6rem] font-bold uppercase tracking-[0.24em] text-petal">{tool.use}</p>
                    <h3 className="mt-4 font-display text-3xl uppercase tracking-[0.02em] text-pearl group-hover:text-petal">{tool.name}</h3>
                    <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">{tool.note}</p>
                    <p className="mt-auto pt-7 font-body text-[0.65rem] font-bold uppercase tracking-[0.18em] text-petal">Visit tool →</p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-void py-16 md:py-20">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-6 lg:grid-cols-[1fr_0.7fr] lg:px-10">
          <div>
            <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">Affiliate disclosure</p>
            <h2 className="mt-4 font-display text-4xl uppercase tracking-[0.02em] text-pearl md:text-5xl">Trust first. Links second.</h2>
            <p className="mt-5 max-w-3xl font-body text-sm font-light leading-7 text-smoke">
              These are currently direct links to tools used in the business. Any future affiliate or referral link will be clearly labeled. Recommendations do not change based on commission, and using an affiliate link will never increase your price.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3">
            <Link
              href="/start"
              className="btn-primary inline-flex justify-center px-6 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void"
            >
              Choose Your Next Step →
            </Link>
            <Link
              href="/shelf"
              className="inline-flex justify-center border border-graphite px-6 py-4 font-body text-[0.68rem] font-bold uppercase tracking-[0.18em] text-ash transition hover:border-petal hover:text-petal"
            >
              Browse The Shelf
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
