import type { Metadata } from "next";
import Link from "next/link";
import { BtnGhost } from "@/app/components/ui";

export const metadata: Metadata = {
  title: "Territory Plan for ADP Major Accounts",
  description:
    "How MK Parrish would build a Long Island Major Accounts territory and sell ADP Comprehensive Services to 50–999 employee companies: target segments, prospecting system, discovery, objections and a 90-day plan.",
  alternates: { canonical: "/adp" },
  robots: { index: false, follow: false, nocache: true },
};

// Accent for this page: ADP red, lightened for contrast on the dark background.
// `!` because the site sets an unlayered global color on <p>, which beats layered utilities.
const RED = "text-[#FF6B5E]!";

const offer = [
  {
    stat: "Pay",
    label: "Comprehensive Pay",
    desc: "Payroll administration, tax filing and compliance, audits and reconciliation, handled by ADP specialists. The owner stops being the payroll department.",
  },
  {
    stat: "Benefits",
    label: "Comprehensive Benefits",
    desc: "Benefits administration, open enrollment and carrier invoice reconciliation. The busiest HR week of the year stops landing on the office manager.",
  },
  {
    stat: "HR",
    label: "Comprehensive HR",
    desc: "HR guidance and compliance support for hiring, pay decisions, performance and policy, with access to specialists when a question comes up.",
  },
];

const segments = [
  {
    title: "Builders & trade contractors",
    who: "Long Island Builders Institute members and their subcontractors",
    pain: "Multi-site crews, seasonal hiring, union and prevailing-wage jobs, workers' comp audits and certified-payroll paperwork for public work. Payroll is usually run by an owner's spouse or one overworked office manager.",
    door: "I'm already working with LIBI and its subcontractor network, so I start with warm introductions instead of cold calls.",
  },
  {
    title: "Auto dealer groups",
    who: "Franchise dealerships and multi-rooftop groups across Suffolk and Nassau",
    pain: "Commission and spiff-heavy pay plans, flat-rate technicians, high turnover on the sales floor and in the service lane, and a benefits package that has to compete for talent.",
    door: "I sell at Mercedes-Benz of Smithtown. I know how a dealership's pay plans, managers and payroll calendar work from the inside.",
  },
  {
    title: "Manufacturers & distributors",
    who: "Hauppauge Industrial Park and the Route 110 corridor",
    pain: "Shift differentials, overtime, hourly time tracking, safety compliance and hiring pressure, often on systems that were set up a decade ago.",
    door: "I ran marketing for Atlantic Ultraviolet in Hauppauge, so I know the area's manufacturers and the distributors they sell through.",
  },
];

const engine = [
  ["Map", "Build a ranked list of 50–999 employee companies in the territory by segment, size, growth signals and current provider."],
  ["Research", "AI-assisted account research on every target: recent hiring, new locations, open roles, leadership changes, compliance triggers."],
  ["Reach", "Multi-channel sequences by phone, email, LinkedIn and in person, personalized by segment. My cold outreach has reached reply rates as high as 32%."],
  ["Refer", "Work the referral channels Long Island owners already trust: CPAs, insurance brokers, LIBI, chambers and existing ADP clients."],
];

const discovery = [
  "Who runs payroll today, and how many hours a week does it take them?",
  "What happened the last time you had a payroll, tax or compliance mistake?",
  "How many states, locations or job sites do your people work across?",
  "How did open enrollment go this year, and who carried it?",
  "What's turnover costing you, and is your benefits package helping you hire?",
  "If those hours came back to you, where would you spend them?",
];

const objections = [
  {
    q: "We already have a payroll provider.",
    a: "Most companies do. The question is who carries the work around payroll: tax notices, enrollment, compliance questions, new-hire paperwork. If that's still you, there's room to talk.",
  },
  {
    q: "It costs more than what we pay now.",
    a: "Compare it with what the work costs today: staff hours, penalties, turnover and the owner's own time. Comprehensive Services is priced against that, not against a software license.",
  },
  {
    q: "Switching sounds like a headache.",
    a: "That's the fear that keeps a bad setup in place. I'd lay out the implementation plan, the timeline and who at ADP does what, so the owner can see the switch before they sign.",
  },
];

const plan = [
  {
    phase: "Days 1–30",
    title: "Learn & load",
    items: [
      "Complete ADP sales training and get certified on Comprehensive Services and Workforce Now",
      "Shadow top reps and implementation on live deals to learn the sales motion and the handoff",
      "Map the territory and load a ranked list of target accounts into Salesforce by segment",
      "Turn existing LIBI relationships into the first set of discovery meetings",
      "Agree on weekly activity targets and forecast rhythm with my District Manager",
    ],
  },
  {
    phase: "Days 31–60",
    title: "Build pipeline",
    items: [
      "Run the prospecting system daily across all three segments",
      "Meet CPAs, brokers and associations who refer payroll and HR business",
      "Hold first discovery meetings and demos; qualify hard and log every next step",
      "Build segment one-pagers and short videos for construction, dealers and manufacturers",
      "Find cross-sell openings in existing ADP clients in the territory",
    ],
  },
  {
    phase: "Days 61–90",
    title: "Close & compound",
    items: [
      "Move qualified opportunities through proposal and close with the support of my manager",
      "Turn the first wins into case studies and referral asks within their industry",
      "Review win and loss reasons each week and sharpen the talk track",
      "Commit a forecast for the next quarter built on pipeline I can show, not hope",
    ],
  },
];

const kpis = [
  ["Conversations", "Owner and executive conversations held each week, by segment"],
  ["First meetings", "Discovery meetings booked and held, and the source of each"],
  ["Qualified pipeline", "New opportunities added, with dollar value and expected close date"],
  ["Stage movement", "Deals that moved forward, stalled or were lost, and why"],
  ["Referral partners", "CPAs, brokers and associations active and sending introductions"],
  ["Forecast accuracy", "Committed versus closed, so leadership can plan on my number"],
];

const fit = [
  {
    from: "Mercedes-Benz of Smithtown",
    to: "Full-cycle consultative sales of a premium, technical product: prospecting, discovery, financing, negotiation and close. I opened a new channel by calling service customers before their appointments.",
  },
  {
    from: "MK Parrish · LIBI",
    to: "I source, pitch, price and close every client myself, and I'm working with Long Island's builders and subcontractors, ADP's 50–999 employee buyers.",
  },
  {
    from: "Mercer · HR buyer",
    to: "Worked with CHROs and Fortune 50 HR leaders across 50+ executive networks. I know how the HR buyer thinks and what they're measured on.",
  },
  {
    from: "Ericsson · Deal reviews",
    to: "Deal-stage reviews raised enterprise win rates 15% and cut sales cycles 30%; a Salesforce bundle cross-sell lifted pipeline 25% and ACV 20% on the way to $200M+ influenced revenue.",
  },
  {
    from: "DEFY Media · Enterprise closes",
    to: "Closed multimillion-dollar partnerships with Sony, Warner Bros. and Google, and managed a book of 150+ accounts for retention and expansion.",
  },
];

const eyebrow = "font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em]";
const h2 = "font-serif text-3xl italic text-pearl md:text-4xl";
const body = "font-body text-[0.95rem] font-light leading-7 text-smoke";

export default function AdpPage() {
  return (
    <div className="min-h-screen bg-void">
      <div className="h-1.5 bg-[#D0271D]" aria-hidden="true" />
      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 pt-6">
        <Link href="/" className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-pearl">
          ← MK Parrish
        </Link>
        <span className="font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-pearl/70">
          Prepared for ADP Major Accounts
        </span>
      </header>

      <section className="mx-auto max-w-5xl px-4 pb-16 pt-16 md:pt-24">
        <p className={`${eyebrow} ${RED}`}>Territory plan · Sales Representative, Major Accounts</p>
        <h1
          className="mt-4 font-display uppercase text-pearl"
          style={{ fontSize: "clamp(3.2rem, 11vw, 7.5rem)", lineHeight: 0.88 }}
        >
          Give Long Island owners <span className={RED}>their week back</span>.
        </h1>
        <p className="mt-6 max-w-2xl font-serif text-xl italic text-smoke md:text-2xl">
          How I&apos;d build a Major Accounts territory from relationships I already have, and sell ADP Comprehensive Services the way owners
          buy: starting with their time, their risk and their people.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="/resumes/adp/mk-parrish-resume-adp-signature.pdf"
            className="inline-flex items-center justify-center bg-[#D0271D] px-7 py-4 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#A81F17]"
          >
            Resume · Signature
          </a>
          <BtnGhost href="/resumes/adp/mk-parrish-resume-adp-classic.pdf">Resume · Classic</BtnGhost>
          <BtnGhost href="/resumes/adp/mk-parrish-cover-letter-adp.pdf">Cover letter</BtnGhost>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <p className={`${eyebrow} text-ash`}>What I&apos;m selling</p>
        <div className="mt-6 grid gap-px bg-graphite md:grid-cols-3">
          {offer.map((o) => (
            <div key={o.label} className="bg-obsidian p-7">
              <p className={`font-display text-6xl ${RED}`}>{o.stat}</p>
              <h2 className="mt-2 font-display text-2xl uppercase tracking-[0.02em] text-pearl">{o.label}</h2>
              <p className="mt-3 font-body text-sm font-light leading-6 text-smoke">{o.desc}</p>
            </div>
          ))}
        </div>
        <p className={`mt-6 max-w-3xl ${body}`}>
          All three run on ADP Workforce Now, with specialists behind it. That&apos;s the pitch in one line: the owner gets the technology
          and the people who run it. Comprehensive Services shouldn&apos;t be sold against the cheapest payroll provider; it should be sold
          against the hours, risk and turnover the owner is carrying today.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className={h2} style={{ fontWeight: 700, lineHeight: 1.15 }}>
          Where I&apos;d start on Long Island.
        </h2>
        <p className={`mt-3 max-w-3xl ${body}`}>
          Three segments full of 50–999 employee companies with complex payroll, where I already have a way in.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {segments.map((s, i) => (
            <div key={s.title} className="border border-graphite bg-obsidian p-6">
              <p className={`font-mono text-xs ${RED}`}>{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 font-display text-3xl uppercase tracking-[0.02em] text-pearl">{s.title}</h3>
              <p className="mt-1 font-body text-xs uppercase tracking-[0.12em] text-ash">{s.who}</p>
              <p className={`mt-4 font-body text-[0.65rem] font-semibold uppercase tracking-[0.25em] ${RED}`}>The pain</p>
              <p className="mt-1 font-body text-sm font-light leading-6 text-smoke">{s.pain}</p>
              <p className={`mt-4 font-body text-[0.65rem] font-semibold uppercase tracking-[0.25em] ${RED}`}>My way in</p>
              <p className="mt-1 font-body text-sm font-light leading-6 text-smoke">{s.door}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <p className={`${eyebrow} text-ash`}>How I hunt</p>
        <div className="mt-6 grid gap-px bg-graphite md:grid-cols-4">
          {engine.map(([k, v]) => (
            <div key={k} className="bg-obsidian p-6">
              <p className="font-display text-4xl uppercase text-pearl">{k}</p>
              <p className="mt-2 font-body text-sm font-light leading-6 text-smoke">{v}</p>
            </div>
          ))}
        </div>
        <p className={`mt-6 max-w-3xl ${body}`}>
          Every touch goes into Salesforce. Every opportunity has a next step and a date. I&apos;d review the pipeline weekly with my
          manager, the same deal-review habit that raised win rates 15% at Ericsson.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className={h2} style={{ fontWeight: 700, lineHeight: 1.15 }}>
          The questions I&apos;d open with.
        </h2>
        <p className={`mt-3 max-w-3xl ${body}`}>
          Discovery comes before the demo. These questions put a cost on the work the owner is carrying, so the price of Comprehensive Services
          has something to be compared with.
        </p>
        <ol className="mt-8 grid gap-6 md:grid-cols-2">
          {discovery.map((q, i) => (
            <li key={q} className="border-t border-graphite pt-5">
              <p className={`font-mono text-xs ${RED}`}>{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-2 font-serif text-xl italic text-pearl">{q}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <p className={`${eyebrow} text-ash`}>Objections I expect</p>
        <div className="mt-6 divide-y divide-graphite border-y border-graphite">
          {objections.map((o) => (
            <div key={o.q} className="grid gap-2 py-6 md:grid-cols-[18rem_1fr] md:gap-8">
              <p className="font-serif text-xl italic text-pearl">&ldquo;{o.q}&rdquo;</p>
              <p className={body}>{o.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className={h2} style={{ fontWeight: 700, lineHeight: 1.15 }}>
          My first 90 days.
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {plan.map((p) => (
            <div key={p.phase} className="border border-graphite bg-obsidian p-6">
              <p className={`font-body text-[0.65rem] font-semibold uppercase tracking-[0.25em] ${RED}`}>{p.phase}</p>
              <h3 className="mt-2 font-display text-3xl uppercase text-pearl">{p.title}</h3>
              <ul className="mt-4 space-y-3">
                {p.items.map((item) => (
                  <li key={item} className="font-body text-sm font-light leading-6 text-smoke">
                    <span className={RED}>— </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <p className={`${eyebrow} text-ash`}>What I&apos;d report every week</p>
        <div className="mt-6 grid gap-px bg-graphite md:grid-cols-3">
          {kpis.map(([k, v]) => (
            <div key={k} className="bg-obsidian p-6">
              <h3 className="font-display text-2xl uppercase tracking-[0.02em] text-pearl">{k}</h3>
              <p className="mt-2 font-body text-sm font-light leading-6 text-smoke">{v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <p className={`${eyebrow} text-ash`}>Why me</p>
        <div className="mt-6 divide-y divide-graphite border-y border-graphite">
          {fit.map((f) => (
            <div key={f.from} className="grid gap-2 py-6 md:grid-cols-[16rem_1fr] md:gap-8">
              <p className={`font-display text-xl uppercase tracking-[0.03em] ${RED}`}>{f.from}</p>
              <p className={body}>{f.to}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20 pt-12 text-center">
        <p className="font-serif text-2xl italic text-pearl md:text-3xl" style={{ fontWeight: 600 }}>
          A territory plan is only worth something once it&apos;s on the calendar.
        </p>
        <p className="mt-6 font-display text-4xl uppercase tracking-[0.04em] text-pearl">Mary Kate Parrish</p>
        <p className="mt-2 font-body text-sm text-smoke">
          <a href="mailto:mkp414@icloud.com" className="underline underline-offset-4 hover:text-pearl">
            mkp414@icloud.com
          </a>
          {" · "}
          <a href="tel:+13478534238" className="underline underline-offset-4 hover:text-pearl">
            (347) 853-4238
          </a>
          {" · "}
          <a href="https://linkedin.com/in/mkparrish" className="underline underline-offset-4 hover:text-pearl">
            linkedin.com/in/mkparrish
          </a>
        </p>
      </section>
    </div>
  );
}
