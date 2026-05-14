import type { Metadata } from "next";
import {
  RevealSection,
  QuoteDivider,
  Eyebrow,
  H1,
  H2,
  H3Script,
  BtnPrimary,
  BtnGhost,
  ArrowLink,
} from "@/app/components/ui";
import { PATREON_URL } from "@/app/lib/config";

export const metadata: Metadata = {
  title: "Writing — MK Parrish",
  description:
    "Essays on personal branding, marketing strategy, and the specific ways professionals undermine themselves with the words they choose. Sharp, practical, and written for people who are done being misread.",
};

export default function WritingPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[80vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[65vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.13),transparent_65%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <Eyebrow>The Work</Eyebrow>
          <div className="mt-4">
            <H1>Writing</H1>
          </div>
          <p className="mt-6 font-serif text-xl italic text-petal/80 md:text-2xl" style={{ fontWeight: 500 }}>
            Strategy essays for people who are done being misread.
          </p>
          <p className="mt-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "60ch" }}>
            Long-form thinking on personal branding, marketing strategy, and the specific ways smart professionals undermine themselves with the language they choose.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <BtnPrimary href={PATREON_URL}>Read More in The Margins</BtnPrimary>
            <BtnGhost href="/margins">About The Margins</BtnGhost>
          </div>
        </div>
      </section>

      {/* ── ESSAY 01 ─────────────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="01">
        <div className="grid gap-16 lg:grid-cols-[280px_1fr]">

          {/* Sticky sidebar */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Essay</Eyebrow>
            <H2>The LinkedIn<br />Positioning<br />Problem</H2>
            <p className="mt-5 font-body text-sm font-light leading-7 text-iron" style={{ maxWidth: "28ch" }}>
              On why your profile is a record of the past and a pitch for the wrong future — and how to fix it.
            </p>
            <div className="mt-6 flex flex-col gap-1">
              <p className="font-body text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-iron">Category</p>
              <p className="font-body text-[0.7rem] text-ash">Personal Branding</p>
            </div>
            <div className="mt-8">
              <ArrowLink href={PATREON_URL}>More in The Margins</ArrowLink>
            </div>
          </div>

          {/* Essay body */}
          <div className="relative">
            <span
              aria-hidden
              className="pointer-events-none absolute -left-2 -top-8 select-none font-display leading-none text-petal/[0.06] uppercase"
              style={{ fontSize: "clamp(5rem, 12vw, 9rem)" }}
            >
              01
            </span>

            <div className="space-y-7 font-body text-base font-light leading-8 text-smoke relative" style={{ maxWidth: "68ch" }}>

              <p className="font-body text-lg font-light leading-8 text-pearl" style={{ maxWidth: "60ch" }}>
                Your LinkedIn profile is the most important piece of copy you will ever write, and most people treat it like a résumé they update every three years when they panic about being between jobs.
              </p>

              <p>
                Here is the result: a profile that is a record of the past. A document built for the career you were trying to get five years ago, by a version of you who had not yet done the work that makes you worth hiring now. The language is stale. The positioning is vague. The headline is a job title rather than a claim. And the about section, if it exists at all, reads like it was written by someone who just wanted to get it over with.
              </p>

              <p>
                This is not a small problem. It is a revenue problem. It is the reason people who are doing serious work are still being offered roles two levels below their actual capability. It is the reason founders who have built real things are still struggling to attract the quality of clients their track record should command. The words people encounter when they look you up are making a decision about you before you get to make one yourself.
              </p>

              <div
                className="border-l-2 border-petal/40 pl-8 my-10"
                style={{ maxWidth: "56ch" }}
              >
                <p className="font-serif italic text-pearl text-lg leading-[1.75]" style={{ fontWeight: 500 }}>
                  The most common LinkedIn mistake is not bad writing. It is writing for the person you were when you wrote it, rather than the person you need to be readable as right now.
                </p>
              </div>

              <p>
                LinkedIn positioning has three layers, and most profiles only address one of them. The first layer is what you do — your title, your function, your industry. This is the layer everyone fills in. It is also the least interesting and the least differentiating. Every VP of Marketing at a SaaS company has a headline that says they are a VP of Marketing at a SaaS company. It tells the reader your category. It tells them nothing about why you specifically are worth their time.
              </p>

              <p>
                The second layer is how you do it — your method, your lens, your particular approach to the work. This is where most profiles drop off. People are trained to be modest about claiming a specific methodology, afraid of being wrong or of being held to something too specific. The result is language like &ldquo;results-driven&rdquo; and &ldquo;collaborative approach&rdquo; and &ldquo;passion for growth&rdquo; — phrases that have been rendered meaningless by repetition. They signal nothing. They cost you nothing. They also earn you nothing.
              </p>

              <p>
                The third layer — and the one almost no one addresses — is why it matters. The transformation. The before and after. What is different in the world because of how you do what you do? This is the layer that creates emotional resonance. This is the layer that makes someone think: I need to talk to this person. Not because you said you were results-driven, but because you described a specific problem that they have been living with and named, precisely, what you do to it.
              </p>

              <div
                className="bg-carbon border border-graphite p-8 my-10"
                style={{ position: "relative" }}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-petal/40 to-transparent" />
                <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-petal mb-4">The fix</p>
                <div className="space-y-3 font-body text-sm font-light leading-7 text-smoke">
                  <p><span className="text-pearl font-medium">Layer one:</span> State your category clearly. Not your job title — your function in the world. What problem do you solve?</p>
                  <p><span className="text-pearl font-medium">Layer two:</span> Claim your method. Not vaguely. Specifically. Name the way you work that is different from how everyone else in your category works.</p>
                  <p><span className="text-pearl font-medium">Layer three:</span> Name the transformation. What does a client, a team, a company look like after you have done your work? Not in metrics. In reality. What is actually different?</p>
                </div>
              </div>

              <p>
                There is a fourth layer that shows up when you get all three right: authority. Not performed confidence. Real authority — the kind that comes through when someone reads your profile and thinks: this person knows exactly what they do and why it matters and who it is for. That is a rare thing to encounter on LinkedIn. It is also immediately recognizable when you do.
              </p>

              <p>
                The profiles that get inbound are not the most impressive profiles. They are the clearest. The ones that make the reader feel like the profile was written for them. That is not an accident or a personality trait. It is a craft skill. And it is learnable.
              </p>

              <p>
                Your profile is not your résumé. It is your opening argument. The first sentence in a conversation that decides whether there is a second one. Write it accordingly.
              </p>

            </div>

            <div className="mt-12 border-t border-graphite pt-8">
              <p className="mb-6 font-body text-sm font-light leading-7 text-smoke" style={{ maxWidth: "52ch" }}>
                This is the thinking behind The Rewrite. Want the full audit of your LinkedIn, bio, and positioning — with a rewrite built around all three layers? Start here.
              </p>
              <div className="flex flex-wrap gap-4">
                <BtnPrimary href="/book">Book a Strategy Call</BtnPrimary>
                <ArrowLink href="/career">The Career Rewrite</ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={2} />

      {/* ── ESSAY 02 ─────────────────────────────────────────────── */}
      <RevealSection bg="void" num="02">
        <div className="grid gap-16 lg:grid-cols-[280px_1fr]">

          {/* Sticky sidebar */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Essay</Eyebrow>
            <H2>Your<br />Homepage<br />Is a Sales<br />Tool</H2>
            <p className="mt-5 font-body text-sm font-light leading-7 text-iron" style={{ maxWidth: "28ch" }}>
              On conversion copy, the decision already made before you speak, and what &ldquo;good design&rdquo; cannot fix.
            </p>
            <div className="mt-6 flex flex-col gap-1">
              <p className="font-body text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-iron">Category</p>
              <p className="font-body text-[0.7rem] text-ash">Marketing Strategy</p>
            </div>
            <div className="mt-8">
              <ArrowLink href={PATREON_URL}>More in The Margins</ArrowLink>
            </div>
          </div>

          {/* Essay body */}
          <div className="relative">
            <span
              aria-hidden
              className="pointer-events-none absolute -left-2 -top-8 select-none font-display leading-none text-petal/[0.06] uppercase"
              style={{ fontSize: "clamp(5rem, 12vw, 9rem)" }}
            >
              02
            </span>

            <div className="space-y-7 font-body text-base font-light leading-8 text-smoke relative" style={{ maxWidth: "68ch" }}>

              <p className="font-body text-lg font-light leading-8 text-pearl" style={{ maxWidth: "60ch" }}>
                Most business owners treat their homepage like a brochure. A place to describe what they do, list their services, and hope that the right person is convinced enough to reach out. This is the wrong model, and it is costing you clients you never see leave.
              </p>

              <p>
                By the time someone lands on your homepage, a decision is already in progress. They found you somehow — a referral, a LinkedIn post, a Google search, a piece of content that landed in front of them at the right moment. They arrived because something created enough interest to get them there. Your homepage does not have to create interest from nothing. It has to confirm interest and convert it.
              </p>

              <p>
                The distinction matters. Brochure copy tries to explain. Conversion copy tries to confirm. Explaining assumes the reader needs to be taught what you do. Confirming assumes the reader already suspects you might be the right person and needs to see that suspicion validated. The language is different. The structure is different. The relationship between you and the reader is different.
              </p>

              <div
                className="border-l-2 border-petal/40 pl-8 my-10"
                style={{ maxWidth: "56ch" }}
              >
                <p className="font-serif italic text-pearl text-lg leading-[1.75]" style={{ fontWeight: 500 }}>
                  Conversion copy does not explain what you do. It names the problem so precisely that the reader thinks you have been inside their head, and then it makes it obvious that you are the specific solution to that specific problem.
                </p>
              </div>

              <p>
                The first principle of homepage copy is: lead with the problem, not the solution. Most homepages open with the solution — &ldquo;We build brands that convert&rdquo; — which is a claim that means nothing without context. The reader does not yet feel the weight of the problem. They have not had the moment of recognition that makes your solution feel urgent rather than optional. You are answering a question they have not yet been asked.
              </p>

              <p>
                The homepage that converts opens with the problem in the reader&apos;s language. Not your language — their language. The language they use when they are lying awake at 2am thinking about the thing that is not working. The language they use when they are venting to a colleague. The specific, frustrated, human language of the problem before it gets cleaned up into professional terms. When a reader sees their own problem described in their own words, they lean forward. Something shifts. They are no longer browsing. They are reading.
              </p>

              <p>
                The second principle is: your about section is not about you. It is about the reader&apos;s future. Every sentence that begins with &ldquo;I have fifteen years of experience in&rdquo; or &ldquo;Our team is passionate about&rdquo; is a sentence spent on you rather than on them. The reader does not care about your experience except insofar as it predicts an outcome for them. Restructure the about section around the transformation: this is what you will have, experience, or be able to do after working with me that you cannot do now.
              </p>

              <div
                className="bg-carbon border border-graphite p-8 my-10"
                style={{ position: "relative" }}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-petal/40 to-transparent" />
                <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-petal mb-4">The five questions your homepage must answer</p>
                <ol className="space-y-3 font-body text-sm font-light leading-7 text-smoke list-none">
                  {[
                    ["01", "What problem do I solve?", "Named in the reader's language, not yours."],
                    ["02", "Who is this for?", "Specific enough to make the right person feel seen and the wrong person self-select out."],
                    ["03", "Why you?", "Your specific credibility — not a list of skills, but a proof of result."],
                    ["04", "What happens next?", "A single clear action the reader can take right now."],
                    ["05", "What is the risk of not acting?", "Named quietly, without manipulation. The status quo has a cost. Say it."],
                  ].map(([num, q, a]) => (
                    <li key={num} className="flex gap-4">
                      <span className="font-mono text-[0.65rem] text-petal mt-1 flex-shrink-0">{num}</span>
                      <span>
                        <span className="text-pearl font-medium">{q}</span>
                        <span className="block mt-0.5 text-smoke">{a}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <p>
                The third principle — and the one that is consistently the most overlooked — is that good design cannot fix bad copy. This is a hard truth for founders and brand builders who have invested significantly in visual identity. The site looks beautiful. The photography is considered. The color palette is distinctive and on-brand. And the homepage is still not converting.
              </p>

              <p>
                Design creates credibility and signals positioning. It sets the emotional register of the experience. But design is not the argument. Copy is the argument. The words tell the reader why they should care, why they should stay, why they should act. A beautiful site with weak copy is a beautiful argument for nothing. The design gets someone to give you five more seconds. What you do with those five seconds is entirely a copy problem.
              </p>

              <p>
                The fourth principle: your CTA is not a button. It is a commitment. Most CTAs are designed to minimize friction — &ldquo;Learn more,&rdquo; &ldquo;Get started,&rdquo; &ldquo;Reach out.&rdquo; The instinct is right: low friction lowers the barrier to clicking. But it also lowers the perceived value of what is on the other side. A CTA that names a specific outcome — &ldquo;Book a 30-minute positioning session&rdquo; — tells the reader exactly what they are getting and creates a small, real commitment. Readers who click a specific CTA are more serious than readers who click a vague one. You want fewer, better conversions, not more meaningless clicks.
              </p>

              <p>
                The homepage that converts is not the one with the best design, the most convincing claims, or the longest client list. It is the one that makes the right reader feel, in the first thirty seconds, that you understand exactly where they are and know exactly where they need to go. That is a copy problem. It is also a positioning problem. And it is, in the end, a question of whether you know who you are for and have the courage to say so clearly enough that the wrong people leave.
              </p>

              <p>
                Most homepages are designed to never offend anyone. They are also, as a result, compelling to no one. Clarity is a choice. Make it.
              </p>

            </div>

            <div className="mt-12 border-t border-graphite pt-8">
              <p className="mb-6 font-body text-sm font-light leading-7 text-smoke" style={{ maxWidth: "52ch" }}>
                This is the thinking behind every site I build. If your homepage is converting at less than it should — or you are not sure what &ldquo;should&rdquo; even means for your site — start with a strategy call.
              </p>
              <div className="flex flex-wrap gap-4">
                <BtnPrimary href="/book">Book a Strategy Call</BtnPrimary>
                <ArrowLink href="/brand">The Brand Rewrite</ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={8} />

      {/* ── THE MARGINS CTA ──────────────────────────────────────── */}
      <RevealSection bg="void">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Eyebrow>Read more</Eyebrow>
            <H2>
              The thinking{" "}
              <span className="text-petal">goes deeper.</span>
            </H2>
            <H3Script>The Margins is where the unedited strategy lives.</H3Script>
            <div className="mt-8 space-y-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "56ch" }}>
              <p>
                The public essays are the surface. Inside The Margins: the frameworks pulled directly from client work before they are cleaned up, the positioning post-mortems, the detailed teardowns of what is actually working in brand and content strategy right now.
              </p>
              <p>
                For founders, executives, and marketers who are done with generic content advice and want the specific, tested thinking behind real client results.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <BtnPrimary href={PATREON_URL}>Join The Margins</BtnPrimary>
              <ArrowLink href="/margins">See membership tiers</ArrowLink>
            </div>
          </div>

          {/* Tier preview */}
          <div className="flex flex-col gap-px">
            {[
              { name: "The Brief",    price: "$5/mo",  desc: "Weekly strategy essays and thinking-out-loud pieces that never go to the public feed.", highlight: false },
              { name: "The Retainer", price: "$15/mo", desc: "Everything plus raw frameworks pulled from active client work, with the context that makes them actually useful.", highlight: true },
              { name: "The Partner",  price: "$50/mo", desc: "Full access, monthly live Q&A, direct message access, and priority feedback on your own copy.", highlight: false },
            ].map((t) => (
              <div
                key={t.name}
                className={`relative p-8 transition-all duration-300 hover:-translate-y-px ${t.highlight ? "bg-carbon" : "bg-obsidian"}`}
                style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                {t.highlight && <div className="absolute inset-x-0 top-0 h-px bg-petal" />}
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-display text-xl uppercase tracking-[0.02em] text-pearl">{t.name}</p>
                  <p className={`font-display text-2xl ${t.highlight ? "text-petal" : "text-white"}`}>{t.price}</p>
                </div>
                <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">{t.desc}</p>
              </div>
            ))}
            <a
              href={PATREON_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-px flex w-full items-center justify-center py-5 font-body text-[0.8rem] font-bold uppercase tracking-[0.2em] text-void"
            >
              Join The Margins →
            </a>
          </div>
        </div>
      </RevealSection>
    </>
  );
}
