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

const MIRAGE: string[][] = [
  [
    "‘Wake up,’ the world said —",
    "and the curtain of bliss she had mistaken for a veil",
    "fell clean from her face.",
  ],
  [
    "Above her, a spider stood sentinel,",
    "pinning its deadly web in place —",
    "and caught in the silk, a girl",
    "who thought she knew.",
    "She choked on the words she once carried",
    "like gospel, like grace.",
  ],
  [
    "The girl who had begun to dream",
    "now stood still and watched each scene",
    "unspool without her —",
    "a puppet waiting on the string,",
    "lungs full and breathless all the same,",
    "unable to move,",
    "unable to claim",
    "the control,",
    "the power,",
    "the feeling of freedom —",
    "that old country she remembered",
    "like a half-heard name.",
  ],
  [
    "Self-worth.",
    "Accomplishment.",
    "An identity that held.",
  ],
  [
    "Instead: a hollow.",
    "A gaping hole where the story fell.",
    "A never-ending forest with no clearing,",
    "a novel no one opened, no one telling.",
  ],
  [
    "She stood there in the limbo of it,",
    "still as driftwood, dense as stone —",
    "once a girl with fire in the margins,",
    "now a life that felt like someone else’s loan.",
  ],
  [
    "How does a woman who wanted everything",
    "end up owing herself nothing?",
    "How does the one who dreamed the loudest",
    "become the one afraid of her own voice?",
  ],
  [
    "She wanted to rewrite the ending —",
    "to scratch out every line of silence,",
    "laugh at the version of herself",
    "who waited to be chosen,",
    "and shout her own name",
    "into the open air",
    "with the kind of confidence",
    "that needs no permission,",
    "no applause,",
    "no net below.",
  ],
  [
    "She just wanted to begin.",
  ],
];

export const metadata: Metadata = {
  title: "Writing — MK Parrish",
  description:
    "Poetry, memoir, ghostwriting, and brand copy from one voice. The proof that the person who rewrites your story actually writes — plus essays on brand voice and the economics of language.",
};

export default function WritingPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[85vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[65vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.13),transparent_65%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <Eyebrow>The Craft</Eyebrow>
          <div className="mt-4">
            <H1>
              The person<br />
              who writes<br />
              <span className="text-petal">your story</span><br />
              actually writes.
            </H1>
          </div>
          <p className="mt-8 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "58ch" }}>
            Most brand strategists never write a word of their own. I do — poetry, memoir, ghostwritten executive content, and brand copy, all from the same voice. What you see here is what you get when you hire me.
          </p>
          <div className="mt-10 flex flex-wrap gap-6">
            {["200+ clients rewritten", "Poetry published", "Ghostwriting, brand copy, memoir"].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="h-1 w-1 bg-petal" />
                <span className="font-body text-xs font-light text-smoke">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <BtnPrimary href="/book">Work With Me</BtnPrimary>
            <BtnGhost href="/shelf">Shop the Writing</BtnGhost>
          </div>
        </div>
      </section>

      {/* ── WHY THIS MATTERS ─────────────────────────────────────── */}
      <RevealSection bg="obsidian">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow>Why the writing matters</Eyebrow>
            <H2>
              Voice is not{" "}
              <span className="text-petal">a strategy.</span>
            </H2>
            <H3Script>It&apos;s a practice.</H3Script>
          </div>
          <div className="space-y-6 font-body text-base font-light leading-8 text-smoke">
            <p>
              The reason my clients say their copy finally sounds like them is not because I follow a framework. It&apos;s because I write constantly — poems, essays, memoir, brand voice documents, ghostwritten columns — and that practice is what makes my ear for language precise enough to work with someone else&apos;s.
            </p>
            <p>
              You cannot fake that kind of attunement. You develop it by doing the work privately, for years, before anyone pays you to do it for them.
            </p>
            <p>
              What you see on this page is the proof of practice. The same voice that writes your LinkedIn profile writes its own poetry. That is not incidental. That is the whole thing.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-px bg-graphite sm:grid-cols-2 lg:grid-cols-4">
          {[
            { type: "Poetry", desc: "Published and performed. The core of the voice — where economy of language and emotional precision meet.", link: "#mirage", cta: "Read Mirage →" },
            { type: "Memoir", desc: "Long-form essays and raw narrative inside The Margins — the writing that never goes to a public feed.", link: PATREON_URL, cta: "Read in The Margins →" },
            { type: "Brand Copy", desc: "Bios, LinkedIn profiles, website copy, and positioning statements for 200+ founders and executives.", link: "/shop/write-yourself-into-the-room", cta: "Get the guide →" },
            { type: "Ghostwriting", desc: "Executive voice capture and ongoing content for founders who write under their own name.", link: "/shop/the-byline-method", cta: "See the method →" },
          ].map((item) => (
            <div key={item.type} className="flex flex-col bg-obsidian p-8">
              <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-iron">Writing Type</p>
              <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.02em] text-pearl">{item.type}</h3>
              <p className="mt-4 flex-1 font-body text-sm font-light leading-7 text-smoke">{item.desc}</p>
              <a href={item.link} className="mt-6 font-body text-xs font-bold uppercase tracking-[0.2em] text-petal/60 transition-colors hover:text-petal">{item.cta}</a>
            </div>
          ))}
        </div>
      </RevealSection>

      {/* ── FEATURED POEM: MIRAGE ────────────────────────────────── */}
      <RevealSection bg="void" num="01" id="mirage">
        <div className="grid gap-16 lg:grid-cols-[280px_1fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Featured Poem</Eyebrow>
            <H2>Mirage</H2>
            <p className="mt-5 font-body text-sm font-light leading-7 text-iron" style={{ maxWidth: "28ch" }}>
              On waking up mid-life, losing yourself, and the long climb back to choosing to begin.
            </p>
            <p className="mt-4 font-body text-xs font-light leading-6 text-iron" style={{ maxWidth: "28ch" }}>
              Shared by thousands of women navigating identity transitions, career pivots, and reinvention. It is what the brand voice work is actually about.
            </p>
            <div className="mt-8 space-y-3">
              <BtnPrimary href="/shelf">Shop the Writing</BtnPrimary>
              <div className="pt-1">
                <ArrowLink href={PATREON_URL}>More in The Margins</ArrowLink>
              </div>
            </div>
          </div>

          <div className="relative border-l-2 border-petal/30 pl-8 md:pl-14">
            <span aria-hidden className="pointer-events-none absolute -left-5 -top-10 select-none font-serif leading-none text-petal/[0.08]" style={{ fontSize: "clamp(6rem,14vw,11rem)" }}>
              &ldquo;
            </span>
            <div className="space-y-8">
              {MIRAGE.map((stanza, si) => (
                <div key={si} className="space-y-1">
                  {stanza.map((line, li) => (
                    <p key={li} className="font-serif italic text-pearl" style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.9, fontWeight: 500 }}>
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>
            <p className="mt-12 font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-ash">— Mirage, MK Parrish</p>
            <div className="mt-10 border-t border-graphite pt-8">
              <p className="mb-2 font-body text-xs font-bold uppercase tracking-[0.2em] text-ash">What this means for your brand</p>
              <p className="mb-6 font-body text-sm font-light leading-7 text-smoke" style={{ maxWidth: "52ch" }}>
                The writers who rewrite your story best are the ones who have done the work themselves. Not borrowed a framework. Not templated the feeling. Done it — and survived it — in their own life. That is what you are hiring.
              </p>
              <div className="flex flex-wrap gap-4">
                <BtnPrimary href="/book">Book a Strategy Call</BtnPrimary>
                <ArrowLink href="/shop/the-rewrite-playbook">Get the Rewrite Playbook</ArrowLink>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      <QuoteDivider index={5} />

      {/* ── THE COMMERCIAL TRANSLATION ───────────────────────────── */}
      <RevealSection bg="obsidian" num="02">
        <Eyebrow>The commercial translation</Eyebrow>
        <H2>
          Poetry that{" "}
          <span className="text-petal">pays for itself.</span>
        </H2>
        <p className="mt-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "58ch" }}>
          Every skill in the writing above shows up directly in client work. This is not creative indulgence. It is how you build the kind of language precision that actually changes what someone&apos;s copy does for them.
        </p>

        <div className="mt-12 space-y-px bg-graphite">
          {[
            { skill: "Economy of language", poem: "Developed writing lines like: “She just wanted to begin.”", client: "Translates to bios and headlines that say everything in six words instead of sixty." },
            { skill: "Emotional precision", poem: "Writing about loss, identity, and reinvention from the inside — not as an observer.", client: "Makes brand copy feel true instead of marketed. Readers recognize themselves in it." },
            { skill: "Voice capture", poem: "Years of developing a distinct, unmistakable personal voice in multiple formats.", client: "Enables ghostwriting that sounds like the principal — not like a hired writer." },
            { skill: "Narrative architecture", poem: "Structuring long-form poems that build, turn, and land — across hundreds of lines.", client: "Builds LinkedIn profiles, about pages, and pitch narratives that actually move people." },
          ].map((row) => (
            <div key={row.skill} className="grid gap-6 bg-obsidian p-8 lg:grid-cols-[200px_1fr_1fr]">
              <p className="font-display text-xl uppercase tracking-[0.02em] text-pearl self-start pt-0.5">{row.skill}</p>
              <div>
                <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.2em] text-iron mb-2">In the writing</p>
                <p className="font-body text-sm font-light leading-7 text-smoke">{row.poem}</p>
              </div>
              <div>
                <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.2em] text-petal/60 mb-2">In client work</p>
                <p className="font-body text-sm font-light leading-7 text-smoke">{row.client}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <BtnPrimary href="/book">Book a Strategy Call</BtnPrimary>
          <BtnGhost href="/shelf">Shop the Writing</BtnGhost>
        </div>
      </RevealSection>

      <QuoteDivider index={3} />

      {/* ── ESSAY 01 ─────────────────────────────────────────────── */}
      <RevealSection bg="obsidian" num="01">
        <div className="grid gap-16 lg:grid-cols-[280px_1fr]">

          {/* Sticky sidebar */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Essay</Eyebrow>
            <H2>What AI<br />Can&apos;t Write<br />For You</H2>
            <p className="mt-5 font-body text-sm font-light leading-7 text-iron" style={{ maxWidth: "28ch" }}>
              On generic output, the specific thing that makes copy land, and what AI is actually good at — versus what it makes everyone sound like.
            </p>
            <div className="mt-6 flex flex-col gap-1">
              <p className="font-body text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-iron">Category</p>
              <p className="font-body text-[0.7rem] text-ash">Brand Voice &amp; Differentiation</p>
            </div>
            <div className="mt-6 flex flex-col gap-1">
              <p className="font-body text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-iron">Read time</p>
              <p className="font-body text-[0.7rem] text-ash">~8 minutes</p>
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
                Every founder, executive, and creator I work with has access to the same tools I do. They have ChatGPT, Claude, Gemini, and three more in beta they signed up for last week. And yet — they are still hiring writers. Specifically, they are still hiring writers who cost more than they did two years ago.
              </p>

              <p>
                The reason is not what the AI companies would like you to think it is. It is not that humans &ldquo;edit better&rdquo; or &ldquo;add the human touch&rdquo; or any of the other vague hedges thrown around by the consultancies trying to sell you the prompt-engineering certification. The reason is simpler and more structural: AI is a compression engine. It does not invent. It averages. And averages, when applied to brand voice, produce exactly the thing you are trying to avoid.
              </p>

              <p>
                Run the same prompt through the same model twice with two different companies&apos; positioning briefs. You will get two outputs that are remarkable for how similar they are. Both will be confident. Both will be readable. Both will include the words &ldquo;empower,&rdquo; &ldquo;seamless,&rdquo; &ldquo;reimagine,&rdquo; and the construction &ldquo;we don&apos;t just X — we Y.&rdquo; Both will sound exactly like the rest of the internet. That is not a bug. That is what the model was built to do. It surveys the corpus of existing writing and produces a confident average of it, which is by definition the most generic thing it is capable of producing.
              </p>

              <div
                className="border-l-2 border-petal/40 pl-8 my-10"
                style={{ maxWidth: "56ch" }}
              >
                <p className="font-serif italic text-pearl text-lg leading-[1.75]" style={{ fontWeight: 500 }}>
                  AI does not write badly. AI writes confidently average. In a market where everyone has access to the same confidently average, the only competitive advantage left is voice that doesn&apos;t average.
                </p>
              </div>

              <p>
                There is one thing AI cannot do, and it is the thing that actually makes copy convert: it cannot have a specific, defensible point of view. Voice is not adjective selection. Voice is the residue of someone with an opinion making decisions on the page. What they include. What they refuse to say. The specific examples they reach for. The metaphors they use that no one else would. The arguments they are willing to make that other people in their category quietly avoid because the avoidance is more comfortable. None of this can be generated. It can only be observed in a writer and captured.
              </p>

              <p>
                This is why your &ldquo;AI-assisted&rdquo; thought leadership reads like everyone else&apos;s. It is not because the model is bad. It is because the model has no skin in any of the arguments it is making. It will not pick a side because it does not have a side. It will hedge every claim because hedging is the safest path through the data it was trained on. What you are getting back is the literary equivalent of an executive who agrees with whichever board member spoke last.
              </p>

              <h3 className="font-display text-2xl uppercase tracking-[0.02em] text-pearl mt-12 mb-2">What AI Is Actually Good At</h3>

              <p>
                I want to be precise here, because the framing of &ldquo;AI versus humans&rdquo; is mostly false. AI is genuinely useful for a specific set of tasks in the writing process. It is excellent at first-draft scaffolding when you already know what you want to say and need to get something on the page to react to. It is excellent at light editing — finding repetition, smoothing transitions, catching the third instance of a word you have already used twice. It is excellent at format conversion: turning a long essay into a LinkedIn post, an email sequence, a tweet thread.
              </p>

              <p>
                What AI is not good at — and what no amount of prompt engineering will make it good at — is generating the specific point of view that makes a piece of copy worth reading in the first place. The argument. The opinion. The thing your reader has not heard before, or has heard before but never heard said this clearly. That is upstream of the writing. That is the strategic work that has to happen first, and that work has nothing to do with the model.
              </p>

              <div
                className="bg-carbon border border-graphite p-8 my-10"
                style={{ position: "relative" }}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-petal/40 to-transparent" />
                <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-petal mb-4">The three things AI cannot do for your brand</p>
                <ol className="space-y-3 font-body text-sm font-light leading-7 text-smoke list-none">
                  {[
                    ["01", "Pick a fight", "Identify the conventional wisdom in your category that is wrong, and stake your positioning on the opposite. AI is statistically incapable of disagreeing with the consensus, because the consensus is the training data."],
                    ["02", "Sound like a person", "Capture the specific cadence, vocabulary, and metaphor patterns of a real human voice — yours, your founder's, your brand's. AI can produce a passable imitation but it loses the load-bearing weirdness that makes voice memorable."],
                    ["03", "Know what to leave out", "Identify the 80% of the brief that should not be on the page so the 20% that should can actually breathe. AI defaults to comprehensiveness. Comprehensive copy does not convert."],
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
                The market is correcting toward this faster than most founders realize. The companies that built their content engines around AI in 2023 are already seeing diminishing returns. Their LinkedIn posts get the same engagement as a quiet day. Their newsletters get unsubscribes at the rate of the very generic content they are now indistinguishable from. The advantage they thought they were buying — &ldquo;produce 10x more content for 1/10th the cost&rdquo; — turned out to be an advantage in producing the kind of content that has no advantage.
              </p>

              <p>
                The brands winning attention right now are the ones with a writer or an editor at the top of the funnel making specific, opinionated choices. Sometimes that writer is the founder. Sometimes that writer is a ghostwriter who has spent enough time inside the founder&apos;s head to think the way they think. Either way, the bottleneck is the same: someone with a position has to decide what to say. AI can help with everything after that. It cannot do that part.
              </p>

              <p>
                If your content strategy assumes that AI will eventually be able to do the upstream work — that with the right prompts, the right context window, the right fine-tuning, you will get something that has a real point of view — you are misreading what these models are. They are very fast averagers. The future where averagers replace specific, opinionated humans is not the future. It is just a slightly faster version of the present, with more content and less to read.
              </p>

              <p>
                You still need someone to decide what is worth saying. That has always been the actual job.
              </p>

            </div>

            <div className="mt-12 border-t border-graphite pt-8">
              <p className="mb-6 font-body text-sm font-light leading-7 text-smoke" style={{ maxWidth: "52ch" }}>
                Working with a brand voice that doesn&apos;t average means working with a writer who has spent time inside how you think. That&apos;s the work I do. Start with a strategy call.
              </p>
              <div className="flex flex-wrap gap-4">
                <BtnPrimary href="/book">Book a Strategy Call</BtnPrimary>
                <ArrowLink href="/brand">The Brand Rewrite</ArrowLink>
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
            <H2>The<br />Conversion<br />Math Founders<br />Avoid</H2>
            <p className="mt-5 font-body text-sm font-light leading-7 text-iron" style={{ maxWidth: "28ch" }}>
              On the actual dollar cost of weak copy, why most founders underinvest in language, and how the math changes the conversation.
            </p>
            <div className="mt-6 flex flex-col gap-1">
              <p className="font-body text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-iron">Category</p>
              <p className="font-body text-[0.7rem] text-ash">Marketing Economics</p>
            </div>
            <div className="mt-6 flex flex-col gap-1">
              <p className="font-body text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-iron">Read time</p>
              <p className="font-body text-[0.7rem] text-ash">~9 minutes</p>
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
                When a founder hesitates to spend $5,000 on a brand rewrite, the hesitation is almost always framed as a budget question. It is not a budget question. It is a math question — and most founders avoid the math because the math is uncomfortable.
              </p>

              <p>
                Here is the math. Take your average client value. Multiply it by your typical sales cycle conversion rate from website visitor to closed deal. Then ask: what happens if the copy on your homepage moves that conversion rate from 1.2% to 1.5%? It is a small absolute change. It is also, if you are running any meaningful traffic, the difference between a single mid-size client per quarter and two of them. Annualize it and the number is rarely under six figures.
              </p>

              <p>
                Now apply the same math to your sales page. Your founder bio that&apos;s on every pitch deck. Your LinkedIn profile that every prospect opens before they take the meeting. Your cold email subject lines. The copy that runs your business is not a creative line item. It is the friction coefficient on every revenue motion you have. And friction compounds.
              </p>

              <div
                className="border-l-2 border-petal/40 pl-8 my-10"
                style={{ maxWidth: "56ch" }}
              >
                <p className="font-serif italic text-pearl text-lg leading-[1.75]" style={{ fontWeight: 500 }}>
                  Copy is not a cost center. Copy is the multiplier that sits underneath every other marketing dollar you spend. Bad copy doesn&apos;t just fail to convert — it actively reduces the ROI of every ad, every post, every introduction you receive.
                </p>
              </div>

              <p>
                The founders who avoid this math are usually the same founders who will spend $40,000 on a quarterly ad budget without flinching. They will pay an agency $15,000 a month to manage that budget. They will hire a sales rep at $120,000 base. And then they will send all of that traffic to a homepage they wrote on a Tuesday in the back of a Lyft, three years ago, when they were a different company.
              </p>

              <p>
                The asymmetry is staggering. You are paying for the audience. You are paying for the funnel. You are paying for the people. The single piece that sits between every prospect and every conversion — the words on the page — is the cheapest and most-neglected component of the entire stack. And it is the only one with a multiplier effect on everything else.
              </p>

              <h3 className="font-display text-2xl uppercase tracking-[0.02em] text-pearl mt-12 mb-2">The Hidden Costs No One Tracks</h3>

              <p>
                The visible cost of bad copy is the conversion rate you can see in your analytics. The hidden cost — which is significantly larger — shows up in places you are not measuring.
              </p>

              <p>
                Bad copy raises your sales cycle length. Prospects who arrive uncertain about what you actually do take longer to qualify, ask more clarifying questions, and require more sales touches before they close. Each additional touch costs you about 20-40 minutes of senior time and reduces your sales team&apos;s capacity for high-value work. Run the per-deal cost out and the difference between a 5-touch cycle and a 7-touch cycle, across your annual deal volume, is rarely under a quarter of someone&apos;s salary.
              </p>

              <p>
                Bad copy raises your customer acquisition cost across every channel. When your landing pages do not pre-qualify visitors, your sales pipeline fills with unqualified leads who waste demo slots and inflate your CAC numbers. Your CFO sees the CAC and tells the CMO to cut spend. The CMO cuts spend and pipeline shrinks. The shrinkage gets attributed to &ldquo;the channel&rdquo; — but the channel was fine. The copy was sending the wrong people through.
              </p>

              <p>
                Bad copy raises your pricing ceiling. The most underdiscussed effect of weak positioning is that it caps what you can charge. When your homepage describes you in the same generic terms as the rest of your category, you are commoditized by default — and commodities compete on price. Sharp positioning creates premium permission. The same exact service, with copy that frames it as distinct and considered, sells for 30-60% more without changing the deliverables. I have seen this play out across enough engagements to stop being surprised by it.
              </p>

              <div
                className="bg-carbon border border-graphite p-8 my-10"
                style={{ position: "relative" }}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-petal/40 to-transparent" />
                <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.25em] text-petal mb-4">The conversion math, quickly</p>
                <div className="space-y-3 font-body text-sm font-light leading-7 text-smoke">
                  <p><span className="text-pearl font-medium">Step 1.</span> Pull your annual visitor count for the page you&apos;re evaluating.</p>
                  <p><span className="text-pearl font-medium">Step 2.</span> Apply your current visitor-to-customer conversion rate.</p>
                  <p><span className="text-pearl font-medium">Step 3.</span> Multiply by average customer LTV.</p>
                  <p><span className="text-pearl font-medium">Step 4.</span> Now model the same numbers with the conversion rate increased by 25%. (This is a conservative estimate for what a real rewrite produces.)</p>
                  <p><span className="text-pearl font-medium">Step 5.</span> Subtract. The number you see is what the current copy is costing you per year.</p>
                </div>
              </div>

              <p>
                A handful of founders run this math and decide it is still not worth investing in. They are usually running businesses where the copy is in fact already strong, or where the bottleneck is somewhere else entirely. Most of the time, the math produces a number that makes the typical fee for a serious rewrite look comically inexpensive. Spending $5,000-$15,000 to recover an annual $60,000-$400,000 leak is not a budget decision. It is the most obvious ROI move on the list.
              </p>

              <p>
                The reason founders avoid this math is not financial. It is psychological. Copy feels subjective. It feels like the kind of thing a smart founder should already be able to do. Spending money on a writer feels like admitting that the version of the company you have personally written into existence is not landing. That is uncomfortable. The math, on the other hand, is not uncomfortable. The math is just the math.
              </p>

              <p>
                If you have not run it on your business yet, run it. If you have run it and the answer is bigger than you thought, that is the answer.
              </p>

            </div>

            <div className="mt-12 border-t border-graphite pt-8">
              <p className="mb-6 font-body text-sm font-light leading-7 text-smoke" style={{ maxWidth: "52ch" }}>
                Every strategy call starts with a quick audit of where the language is leaking. If the math is interesting, we keep going. If it&apos;s not, you saved a meeting.
              </p>
              <div className="flex flex-wrap gap-4">
                <BtnPrimary href="/book">Book a Strategy Call</BtnPrimary>
                <ArrowLink href="/growth">Revenue Systems</ArrowLink>
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
