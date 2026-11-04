import type { Metadata } from "next";
import Link from "next/link";
import { BtnGhost } from "@/app/components/ui";

export const metadata: Metadata = {
  title: "Selling ADP HRO Comprehensive Services",
  description:
    "How MK Parrish would sell ADP Comprehensive Services on Long Island: where it fits between software and a PEO, the four bundles, the buyers, discovery, objections and a 90-day plan.",
  alternates: { canonical: "/adp" },
  robots: { index: false, follow: false, nocache: true },
};

// Accent for this page: ADP red, lightened for contrast on the dark background.
// `!` because the site sets an unlayered global color on <p>, which beats layered utilities.
const RED = "text-[#FF6B5E]!";

const models = [
  {
    name: "Do it yourself",
    example: "ADP Workforce Now on its own",
    desc: "Great technology, but the client's own staff still does the work: running payroll, answering tax notices, managing enrollment, keeping up with compliance.",
    highlight: false,
  },
  {
    name: "Co-sourced",
    example: "ADP Comprehensive Services",
    desc: "The same Workforce Now platform, with ADP specialists doing the work. The client keeps its own benefit plans, its policies and every decision. It hands off the workload, not control.",
    highlight: true,
  },
  {
    name: "Co-employment",
    example: "A PEO, such as ADP TotalSource",
    desc: "The PEO becomes co-employer and the client joins its pooled benefits. A strong fit for some, but a bigger change than many established companies want.",
    highlight: false,
  },
];

const bundles = [
  {
    name: "Comprehensive Pay",
    does: "Payroll administration, tax filing and compliance, audits and reconciliation, run by ADP specialists. Employees get pay statements and W-2s online.",
    who: "The owner, the controller, and whoever runs payroll today.",
    line: "Payroll should be the most boring thing in your business. Let's make it that.",
  },
  {
    name: "Comprehensive Benefits",
    does: "Benefits administration, open enrollment and carrier invoice reconciliation, with a dedicated Benefits Specialist.",
    who: "The HR leader who loses October and November to open enrollment, and the CFO paying carrier bills nobody has checked.",
    line: "Keep the plans you chose. Hand off the paperwork that comes with them.",
  },
  {
    name: "Comprehensive HR",
    does: "Day-to-day HR guidance and compliance support from an HR Specialist, plus a library of forms and best practices.",
    who: "Companies that have outgrown the office manager but don't want a full HR department, or a one-person HR team that's stretched thin.",
    line: "An HR team on call, without adding headcount.",
  },
  {
    name: "Comprehensive Talent",
    does: "A Talent Consultant who helps source, hire and keep the right people, backed by Workforce Now's recruiting, performance and compensation tools.",
    who: "Growing companies where hiring is the bottleneck: trades, dealerships, manufacturers.",
    line: "Your growth plan is a hiring plan. Let's staff it.",
  },
];

const shared = [
  ["Strategic advisor", "One ADP contact who knows the account and leads regular business reviews."],
  ["Specialists", "Payroll, tax, HR, benefits, talent and open enrollment specialists, matched to the bundles."],
  ["Phone support", "Employees and managers call ADP with their questions, so they stop lining up at the owner's office."],
  ["Workforce Now", "One platform for HR, payroll, time, benefits and talent, with self-service, mobile and reporting."],
];

const buyers = [
  {
    who: "Owner or CEO",
    cares: "Time, risk and growth. Payroll mistakes and compliance letters feel personal.",
    say: "How many hours a week do you or your team spend on this, and what would you do with them back?",
  },
  {
    who: "CFO or controller",
    cares: "Cost, control and clean numbers: tax filings, audits, carrier invoices, headcount costs.",
    say: "Let's price what this work costs today in salaries, penalties and turnover, then compare.",
  },
  {
    who: "HR leader",
    cares: "Relief. Too much administration, not enough time for people and strategy.",
    say: "What would you work on if open enrollment and payroll questions weren't on your desk?",
  },
];

const segments = [
  {
    title: "Builders & trade contractors",
    who: "Long Island Builders Institute members and their subcontractors",
    pain: "Multi-site crews, seasonal hiring, union and prevailing-wage jobs, workers' comp audits and certified-payroll paperwork for public work. Payroll is often run by the owner's family or one overworked office manager.",
    fit: "Comprehensive Pay + HR first; Talent for crews they can't hire fast enough.",
    door: "I'm already working with LIBI and its subcontractor network, so I start with warm introductions.",
  },
  {
    title: "Auto dealer groups",
    who: "Franchise dealerships and multi-rooftop groups across Suffolk and Nassau",
    pain: "Commission and spiff-heavy pay plans, flat-rate technicians, high turnover on the sales floor and in the service lane, and benefits that have to compete for talent.",
    fit: "Comprehensive Pay + Benefits; Talent for the turnover.",
    door: "I sell at Mercedes-Benz of Smithtown. I know a dealership's pay plans, managers and payroll calendar from the inside.",
  },
  {
    title: "Manufacturers & distributors",
    who: "Hauppauge Industrial Park and the Route 110 corridor",
    pain: "Shift differentials, overtime, hourly time tracking, safety compliance and hiring pressure, often on systems set up a decade ago.",
    fit: "Comprehensive Pay + HR; Benefits at renewal time.",
    door: "I ran marketing for Atlantic Ultraviolet in Hauppauge and know the area's manufacturers and their distributors.",
  },
];

const engine = [
  ["Map", "Rank target companies in the territory by segment, headcount, growth signals and current provider."],
  ["Research", "AI-assisted research on every account: hiring, new locations, leadership changes, benefits renewal dates, compliance triggers."],
  ["Reach", "Multi-channel sequences by phone, email, LinkedIn and in person, personalized by segment and buyer. My cold outreach has reached reply rates as high as 32%."],
  ["Refer", "Work the channels owners already trust: CPAs, benefits brokers, LIBI, chambers, and ADP colleagues with clients ready for more."],
];

const discovery = [
  ["Pay", "Who runs payroll today, and how many hours a week does it take?"],
  ["Pay", "When did you last get a tax notice or make a payroll correction, and what did it cost to fix?"],
  ["Benefits", "How did open enrollment go this year, and who carried it?"],
  ["Benefits", "Who checks your carrier invoices against who's actually enrolled?"],
  ["HR", "Where do managers go with an HR question today?"],
  ["Talent", "How many open roles do you have, and what is each empty seat costing you?"],
  ["All", "If that work came off your team's desks, what would they do instead?"],
];

const objections = [
  {
    q: "We already have a payroll provider.",
    a: "Most companies do. The question is who does the work around it: tax notices, enrollment, compliance questions, new-hire paperwork. If that's still your team, there's something to talk about.",
  },
  {
    q: "Why not just join a PEO?",
    a: "Sometimes that's the right answer, and ADP has one. But if you want to keep your own benefit plans, your carriers and your policies, with no co-employment, Comprehensive Services gives you the support without the trade-off.",
  },
  {
    q: "I don't want to lose control.",
    a: "You don't. You keep every decision, and you see everything in Workforce Now. ADP's specialists do the work, and your strategic advisor reviews it with you regularly.",
  },
  {
    q: "It costs more than what we pay now.",
    a: "Compare it with what the work costs today: staff hours, penalties, overpaid carrier invoices, turnover and the owner's own time. Comprehensive Services is priced against that, not against a software license.",
  },
  {
    q: "Switching sounds like a headache.",
    a: "That fear keeps a bad setup in place. I'd lay out the implementation plan, the timeline and who at ADP does what, so the client can see the switch before they sign.",
  },
];

const plan = [
  {
    phase: "Days 1–30",
    title: "Learn & load",
    items: [
      "Complete ADP sales training and get certified on all four Comprehensive Services bundles and Workforce Now",
      "Shadow top Comprehensive Services sellers, strategic advisors and implementation on live deals",
      "Learn when to hand off to TotalSource or Workforce Now colleagues, so every lead stays with ADP",
      "Map the territory and load ranked target accounts into Salesforce by segment and buyer",
      "Turn existing LIBI relationships into the first discovery meetings",
    ],
  },
  {
    phase: "Days 31–60",
    title: "Build pipeline",
    items: [
      "Run the prospecting system daily across all three segments",
      "Meet CPAs and benefits brokers who see payroll and HR pain first",
      "Hold discovery meetings and demos; build a cost-of-the-work case for every qualified deal",
      "Create segment one-pagers and short videos for builders, dealers and manufacturers",
      "Find cross-sell openings with ADP clients in the territory who are ready for more support",
    ],
  },
  {
    phase: "Days 61–90",
    title: "Close & compound",
    items: [
      "Move qualified opportunities through proposal and close with my manager",
      "Turn first wins into case studies and referral asks within each industry",
      "Review win and loss reasons weekly and sharpen the talk track",
      "Commit a next-quarter forecast built on pipeline I can show",
    ],
  },
];

const kpis = [
  ["Conversations", "Owner, CFO and HR-leader conversations each week, by segment"],
  ["First meetings", "Discovery meetings booked and held, and where each came from"],
  ["Qualified pipeline", "New opportunities by bundle, with value and expected close date"],
  ["Stage movement", "Deals that moved forward, stalled or were lost, and why"],
  ["Referral partners", "CPAs, brokers and associations active and sending introductions"],
  ["Forecast accuracy", "Committed versus closed, so leadership can plan on my number"],
];

const fit = [
  {
    from: "Mercer · HR & benefits buyer",
    to: "Worked with CHROs and Fortune 50 HR leaders across 50+ executive networks. I speak payroll, benefits and compliance with HR, and cost and risk with finance.",
  },
  {
    from: "Mercedes-Benz of Smithtown",
    to: "I run the full consultative cycle and sell on the value of what's included, not the sticker price. That's the Comprehensive Services sale. I also opened a new channel by calling service customers before their appointments.",
  },
  {
    from: "MK Parrish · LIBI",
    to: "I source, pitch, price and close every client myself, and I'm working with Long Island's builders and subcontractors, who have exactly the payroll and HR load Comprehensive Services takes on.",
  },
  {
    from: "Ericsson · Deal reviews & cross-sell",
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
const label = `font-body text-[0.65rem] font-semibold uppercase tracking-[0.25em] ${RED}`;

export default function AdpPage() {
  return (
    <div className="min-h-screen bg-void">
      <div className="h-1.5 bg-[#D0271D]" aria-hidden="true" />
      <header className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 pt-6">
        <Link href="/" className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-pearl">
          ← MK Parrish
        </Link>
        <span className="text-right font-body text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-pearl/70">
          Prepared for ADP HRO Comprehensive Services
        </span>
      </header>

      <section className="mx-auto max-w-5xl px-4 pb-16 pt-16 md:pt-24">
        <p className={`${eyebrow} ${RED}`}>Sales plan · Account Executive, HRO Comprehensive Services</p>
        <h1
          className="mt-4 font-display uppercase text-pearl"
          style={{ fontSize: "clamp(3.2rem, 11vw, 7.5rem)", lineHeight: 0.88 }}
        >
          You keep control. <span className={RED}>ADP carries the work.</span>
        </h1>
        <p className="mt-6 max-w-2xl font-serif text-xl italic text-smoke md:text-2xl">
          How I&apos;d sell ADP Comprehensive Services on Long Island: what it is, who buys it, how I&apos;d find them, and what I&apos;d say
          when they push back.
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
        <h2 className={h2} style={{ fontWeight: 700, lineHeight: 1.15 }}>
          Where Comprehensive Services fits.
        </h2>
        <p className={`mt-3 max-w-3xl ${body}`}>
          A growing company has three ways to handle payroll, benefits and HR. Comprehensive Services is the middle one, and for many
          established companies it&apos;s the one nobody has explained to them yet.
        </p>
        <div className="mt-8 grid gap-px bg-graphite md:grid-cols-3">
          {models.map((m) => (
            <div key={m.name} className={`p-7 ${m.highlight ? "bg-[#1d0f0e] ring-1 ring-[#D0271D]" : "bg-obsidian"}`}>
              <p className={label}>{m.example}</p>
              <h3 className="mt-2 font-display text-4xl uppercase tracking-[0.02em] text-pearl">{m.name}</h3>
              <p className="mt-3 font-body text-sm font-light leading-6 text-smoke">{m.desc}</p>
            </div>
          ))}
        </div>
        <p className={`mt-6 max-w-3xl ${body}`}>
          I&apos;d sell Comprehensive Services where it fits, and bring in my Workforce Now or TotalSource colleagues when it doesn&apos;t.
          Either way, the client stays with ADP.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className={h2} style={{ fontWeight: 700, lineHeight: 1.15 }}>
          The four bundles, the way I&apos;d sell them.
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {bundles.map((b) => (
            <div key={b.name} className="border border-graphite bg-obsidian p-6">
              <h3 className="font-display text-3xl uppercase tracking-[0.02em] text-pearl">{b.name}</h3>
              <p className={`mt-4 ${label}`}>What ADP does</p>
              <p className="mt-1 font-body text-sm font-light leading-6 text-smoke">{b.does}</p>
              <p className={`mt-4 ${label}`}>Who feels the pain</p>
              <p className="mt-1 font-body text-sm font-light leading-6 text-smoke">{b.who}</p>
              <p className="mt-5 border-l-2 border-[#D0271D] pl-3 font-serif text-lg italic text-pearl">&ldquo;{b.line}&rdquo;</p>
            </div>
          ))}
        </div>
        <p className={`mt-10 ${eyebrow} text-ash`}>Included in every bundle</p>
        <div className="mt-4 grid gap-px bg-graphite md:grid-cols-4">
          {shared.map(([k, v]) => (
            <div key={k} className="bg-obsidian p-6">
              <h3 className="font-display text-2xl uppercase tracking-[0.02em] text-pearl">{k}</h3>
              <p className="mt-2 font-body text-sm font-light leading-6 text-smoke">{v}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <p className={`${eyebrow} text-ash`}>Three buyers, three conversations</p>
        <div className="mt-6 grid gap-px bg-graphite md:grid-cols-3">
          {buyers.map((b) => (
            <div key={b.who} className="bg-obsidian p-7">
              <h3 className="font-display text-3xl uppercase tracking-[0.02em] text-pearl">{b.who}</h3>
              <p className={`mt-4 ${label}`}>What they care about</p>
              <p className="mt-1 font-body text-sm font-light leading-6 text-smoke">{b.cares}</p>
              <p className={`mt-4 ${label}`}>What I&apos;d ask</p>
              <p className="mt-1 font-serif text-lg italic leading-7 text-pearl">{b.say}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className={h2} style={{ fontWeight: 700, lineHeight: 1.15 }}>
          Where I&apos;d start on Long Island.
        </h2>
        <p className={`mt-3 max-w-3xl ${body}`}>
          Three segments of growing, established employers with complex payroll and HR, where I already have a way in.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {segments.map((s, i) => (
            <div key={s.title} className="border border-graphite bg-obsidian p-6">
              <p className={`font-mono text-xs ${RED}`}>{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 font-display text-3xl uppercase tracking-[0.02em] text-pearl">{s.title}</h3>
              <p className="mt-1 font-body text-xs uppercase tracking-[0.12em] text-ash">{s.who}</p>
              <p className={`mt-4 ${label}`}>The pain</p>
              <p className="mt-1 font-body text-sm font-light leading-6 text-smoke">{s.pain}</p>
              <p className={`mt-4 ${label}`}>Lead bundles</p>
              <p className="mt-1 font-body text-sm font-light leading-6 text-smoke">{s.fit}</p>
              <p className={`mt-4 ${label}`}>My way in</p>
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
          Every touch goes into Salesforce. Every opportunity has a next step and a date. I&apos;d review pipeline weekly with my manager,
          the same deal-review habit that raised win rates 15% at Ericsson.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className={h2} style={{ fontWeight: 700, lineHeight: 1.15 }}>
          The questions I&apos;d open with.
        </h2>
        <p className={`mt-3 max-w-3xl ${body}`}>
          Discovery comes before the demo. Each question puts a cost on work the client carries today, and points to the bundle that takes it
          off their plate.
        </p>
        <ol className="mt-8 grid gap-6 md:grid-cols-2">
          {discovery.map(([tag, q]) => (
            <li key={q} className="border-t border-graphite pt-5">
              <p className={label}>{tag}</p>
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
              <p className={label}>{p.phase}</p>
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
          A sales plan is only worth something once it&apos;s on the calendar.
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
