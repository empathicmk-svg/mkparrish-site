#!/usr/bin/env node
/**
 * MK Parrish — Patreon Automation Script
 *
 * Posts all 25 Margins essays to Patreon with correct tier locks,
 * creates the welcome post, and logs progress.
 *
 * Prerequisites:
 *   1. Patreon creator account exists at patreon.com/MKParrish
 *   2. Three tiers created: Soft Cover ($5), Marked Up ($12), First Edition ($28)
 *   3. Creator Access Token in .env.local as PATREON_ACCESS_TOKEN
 *
 * Run:
 *   node scripts/patreon/post-all.mjs
 *
 * Or dry-run (no real API calls):
 *   DRY_RUN=true node scripts/patreon/post-all.mjs
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// ── Load .env.local ───────────────────────────────────────────────────────────
const __dir = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dir, "../../.env.local");
try {
  const env = readFileSync(envPath, "utf8");
  for (const line of env.split("\n")) {
    const [k, ...v] = line.split("=");
    if (k && !k.startsWith("#")) process.env[k.trim()] = v.join("=").trim();
  }
} catch {
  // .env.local not required if token is already in environment
}

const TOKEN = process.env.PATREON_ACCESS_TOKEN;
const DRY_RUN = process.env.DRY_RUN === "true";

if (!TOKEN && !DRY_RUN) {
  console.error("\n❌  PATREON_ACCESS_TOKEN not set.");
  console.error("    Add it to .env.local or export it before running.\n");
  process.exit(1);
}

// ── API helpers ───────────────────────────────────────────────────────────────
const BASE = "https://www.patreon.com/api/oauth2/v2";

async function api(path, opts = {}) {
  if (DRY_RUN) {
    console.log(`  [DRY RUN] ${opts.method || "GET"} ${path}`);
    return {};
  }
  const res = await fetch(`${BASE}${path}`, {
    ...opts,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      ...opts.headers,
    },
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`Patreon API ${res.status}: ${JSON.stringify(body)}`);
  return body;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ── Step 1: Get campaign ID ───────────────────────────────────────────────────
async function getCampaign() {
  console.log("\n🔍  Fetching campaign info...");
  const data = await api("/campaigns?fields[campaign]=creation_name,is_charged_upfront");
  if (DRY_RUN) return { id: "DRY_CAMPAIGN_ID" };
  const campaign = data?.data?.[0];
  if (!campaign) throw new Error("No campaign found. Make sure your creator account is set up.");
  console.log(`✓   Campaign: ${campaign.attributes?.creation_name} (${campaign.id})`);
  return campaign;
}

// ── Step 2: Get tier IDs ──────────────────────────────────────────────────────
async function getTiers(campaignId) {
  console.log("\n🔍  Fetching tiers...");
  const data = await api(`/campaigns/${campaignId}/tiers?fields[tier]=title,amount_cents`);
  if (DRY_RUN) {
    return {
      soft:   "DRY_TIER_SOFT",
      marked: "DRY_TIER_MARKED",
      first:  "DRY_TIER_FIRST",
      all:    ["DRY_TIER_SOFT", "DRY_TIER_MARKED", "DRY_TIER_FIRST"],
    };
  }

  const tiers = data?.data || [];
  if (tiers.length === 0) {
    throw new Error(
      "No tiers found.\n" +
      "Create these tiers on Patreon first:\n" +
      "  · Soft Cover — $5/mo\n" +
      "  · Marked Up  — $12/mo\n" +
      "  · First Edition — $28/mo"
    );
  }

  const find = (name) =>
    tiers.find((t) => t.attributes?.title?.toLowerCase().includes(name.toLowerCase()))?.id;

  const soft   = find("Soft Cover");
  const marked = find("Marked Up");
  const first  = find("First Edition");

  console.log(`✓   Tiers found:`);
  tiers.forEach((t) => console.log(`      ${t.attributes?.title} ($${t.attributes?.amount_cents / 100}/mo) → ${t.id}`));

  if (!soft || !marked || !first) {
    throw new Error(
      `Could not match all tiers. Found: ${tiers.map((t) => t.attributes?.title).join(", ")}\n` +
      `Expected tier names containing: "Soft Cover", "Marked Up", "First Edition"`
    );
  }

  return { soft, marked, first, all: [soft, marked, first] };
}

// ── Step 3: Create a post ─────────────────────────────────────────────────────
async function createPost(campaignId, tierIds, post) {
  const relationships = {
    campaign: { data: { type: "campaign", id: campaignId } },
    ...(tierIds.length > 0 && {
      tiers: { data: tierIds.map((id) => ({ type: "tier", id })) },
    }),
  };

  const body = {
    data: {
      type: "post",
      attributes: {
        title:        post.title,
        content:      post.content,
        is_paid:      post.tier !== "public",
        post_type:    "text_only",
        published_at: new Date().toISOString(),
      },
      relationships,
    },
  };

  const result = await api("/posts", {
    method: "POST",
    body: JSON.stringify(body),
  });

  return DRY_RUN
    ? { id: `dry-${post.num}` }
    : result?.data;
}

// ── Post content ──────────────────────────────────────────────────────────────
// Each post: { num, tier, collections, sitetie, title, content, exercise, cta? }
// tier: "soft" | "marked" | "first" | "public"

const WELCOME = {
  num: "00",
  tier: "public",
  collections: [],
  title: "Welcome To The Margins.",
  content: `You are not here by accident.

You ended up here because something in the public work landed — a sentence, a piece, a post — and you wanted more of it. Or you want to build something similar and you are trying to understand how the thinking works before it gets turned into language.

Either way, this is the right room.

The Margins is where I put what does not belong in a public post. The strategy notes. The frameworks I build during client work. The essays I write before they get edited for an audience that needs things cleaner than I do.

There are three ways to be here.

Soft Cover ($5/mo) — The weekly dispatch. Essays and thinking before the polish. For people who want to be in the room, not just reading the transcript.

Marked Up ($12/mo) — Everything in Soft Cover plus the raw frameworks: templates, intake questions, offer documents, checklists, and before-and-afters from real work.

First Edition ($28/mo) — The full room. Marked Up plus a monthly live Q&A, direct message access, and priority feedback on your own copy. The closest thing to working with me directly.

Here is what you will not find here: confessional content. Manufactured vulnerability. Motivational content. Generic advice that could apply to anyone.

Here is what you will find: practical thinking about writing, positioning, ghostwriting, building services, coding, digital products, and becoming the kind of person whose work is easy to trust.

New posts go up weekly. Collections are organized by topic. Start wherever the problem is most urgent.

Thank you for being here. The work is worth it — and so are you.

— MK`,
};

const POSTS = [
  {
    num: "01", tier: "soft",
    title: "How To Make Money Ghostwriting Without Sounding Like Everyone Else",
    content: `The easiest way to start ghostwriting is also the easiest way to become forgettable: copy the format everyone else is using.

You have seen it. The same LinkedIn opening line. The same lesson in three bullets. The same fake confession ending in a tidy business moral. It works for some people because they already have distribution. It does not work for a new ghostwriter trying to prove they can think.

Ghostwriting is not typing someone else's ideas faster than they can. It is learning how they see the world, then turning that into language people can recognize.

If you want to make money with it, start smaller and sharper.

Pick one client type:
— founders with a quiet but valuable point of view
— executives who sound stiff online but are clear in conversation
— consultants who have expertise but no repeatable content system
— creators who have too many ideas and no editorial structure

Then build one clear offer:

I will turn one recorded call into four LinkedIn posts.

That is a real service. It has a clear input, a clear output, and a clear reason to buy.

Do not sell "content." Sell relief. Sell consistency. Sell the ability to sound like yourself without sitting in front of a blank document every morning.

——

Exercise: Write down three people you already know who have expertise but weak public language. For each one, write the sentence they should be known for.

——

From the site: If your own public language is the problem, The Edit is the small fix — one piece of copy rewritten in 48 hours. The Byline is the ongoing system. Both start at mkparrish.com.`,
  },
  {
    num: "02", tier: "marked",
    title: "The First Ghostwriting Offer I Would Sell",
    content: `If I were starting from zero as a ghostwriter, I would not begin with a monthly retainer.

Retainers sound attractive because they promise steady income, but they are harder to sell when you have no proof. A client has to trust your taste, your process, your consistency, your confidentiality, and your ability to sound like them. That is a lot to ask from one cold pitch.

I would sell a small diagnostic offer first.

Name: The Voice Audit

Deliverable: One short document that reviews a client's LinkedIn profile, last five posts, bio, and website about section.

What it includes:
— what sounds clear
— what sounds generic
— where their strongest ideas are hiding
— three sample post angles
— one rewritten bio or headline

Price: $150 to $500, depending on your experience and the client.

Why it works: It gives the client value before asking them to commit to ongoing writing. It also lets you hear how they think, see what they need, and decide whether you want the deeper work.

The goal of a starter offer is not to make you rich in one sale. The goal is to create proof, trust, and a natural next step.

Your next step: "If you want, I can turn this into a four-week ghostwriting sprint."

——

Exercise: Draft your own Voice Audit outline. Keep it to one page. If you cannot explain the offer simply, it is not ready to sell.`,
  },
  {
    num: "03", tier: "soft",
    title: "Ghostwriting Is A Listening Business",
    content: `People think ghostwriting is about sounding smart.

It is more often about hearing what someone meant before they knew how to say it.

The best ghostwriters are not just good sentence makers. They are pattern readers. They notice the phrase a client repeats three times in a call. They catch the moment when the client's voice gets less polished and more true. They know the difference between a borrowed opinion and a lived one.

That is where the money is.

Anyone can write a post that says, "Here are five leadership lessons." Fewer people can help a founder say the thing only they could say, in a way that still makes sense to the market.

If you want to practice, stop asking, "What should I write?"

Ask better questions:
— What are you tired of explaining?
— What do your best clients misunderstand before they hire you?
— What advice do you give for free because it feels obvious to you?
— What do people compliment you for that you dismiss?
— What do you believe that your industry keeps making too complicated?

Those answers are raw material.

Ghostwriting gets paid when raw material becomes reputation.

——

Exercise: Interview a friend for 20 minutes. Do not write anything during the call except phrases they repeat naturally. Afterward, turn the best phrase into a post opening.`,
  },
  {
    num: "04", tier: "marked",
    title: "How To Price Your First Writing Services",
    content: `Most new writers underprice because they price the typing.

A client is not paying for the typing.

They are paying for the thinking, the decision-making, the clarity, the reduction of embarrassment, the saved time, and the chance that better language creates better opportunities.

Start with scope.

One small copy asset (headline, short bio, tagline, about section, one sales email):
Starter range: $100 to $500

One focused strategy and copy project (profile rewrite, landing page, offer page, founder bio, homepage):
Starter range: $750 to $2,500

Ongoing ghostwriting (weekly LinkedIn posts, newsletter, essays, editorial calendar):
Starter range: $1,000 to $3,500 per month

The range depends on proof, speed, client stakes, and how much strategy you own.

Do not price from fear. Price from the cost of the problem.

A weak homepage can lose deals. A vague LinkedIn profile can lose interviews. A stiff founder story can make a strong company look smaller than it is.

If the writing affects money, trust, reputation, or decisions, it is not "just words."

——

Exercise: Choose one service and write three prices: minimum, comfortable, and slightly scary. Your sellable price is usually between comfortable and slightly scary.`,
  },
  {
    num: "05", tier: "marked",
    title: "The Website Copy Audit You Can Sell This Week",
    content: `A website audit is one of the cleanest entry-level services for a writer or marketer because the problem is visible.

You do not have to convince someone their website exists. You have to show them where it is failing to make the case.

Offer: The One-Page Website Copy Audit

Best for: Founders, consultants, coaches, service providers, creators, and small businesses.

What you review:
— homepage headline
— subheadline
— offer clarity
— proof
— calls to action
— about section
— service descriptions
— contact flow

Deliverable: A 5 to 8 page marked-up document with notes, screenshots, and rewritten examples.

Price: $250 to $900, depending on depth.

The pitch: "Your site has about 10 seconds to tell people what you do, why it matters, and what to do next. I will show you where that is currently unclear and rewrite the highest-leverage sections."

The key is not to roast the site. Nobody pays you to make them feel stupid. They pay you to see what they could not see from inside the business.

——

Exercise: Audit your own homepage first. If the headline does not tell a stranger what you help people do, fix that before selling the service to anyone else.`,
  },
  {
    num: "06", tier: "soft",
    title: "Learning To Code As A Writer: Start Here",
    content: `Writers do not need to become full-time engineers to benefit from learning code.

You need enough code to stop being afraid of the machine.

Start with the web:
1. HTML tells the page what the content is.
2. CSS tells the page how it looks.
3. JavaScript tells the page what it can do.

That is enough to begin.

If you are a writer, HTML will make sense first because it is structure. Headings, paragraphs, links, sections, lists. It is the document underneath the design.

CSS will feel like taste meeting logic. Space, type, color, layout, rhythm.

JavaScript will feel stranger because it deals with behavior. Clicks, state, forms, filters, changing text.

Do not begin by trying to build a giant app.

Build these five things:
— a personal landing page
— a services page
— a newsletter signup page
— a simple pricing table
— a before-and-after copy portfolio

Those projects teach real skills and produce assets you can use.

The money angle is simple: a writer who can understand websites can sell better website copy, collaborate better with designers, and build small products without waiting for permission.

——

Exercise: Create one HTML page with your name, what you do, three services, and one contact link. Ugly is allowed. Blank is the only problem.`,
  },
  {
    num: "07", tier: "soft",
    title: "Coding Gives Writers A Better Bullshit Detector",
    content: `One of the best reasons for writers to learn code is not to become a developer.

It is to stop being vague about digital work.

Once you understand the basics of a website, you start hearing client requests differently.

"We need better content" might mean the homepage does not explain the offer.
"The site is not converting" might mean the call to action is buried.
"We need a full rebrand" might mean the product page is confusing.
"Nobody understands what we do" might mean the navigation is organized around internal language instead of customer language.

Code teaches structure. Writing gives that structure meaning.

That combination is valuable because most online businesses do not have a writing problem or a tech problem. They have a translation problem. The business knows what it means. The customer cannot see it quickly enough.

If you can read the page, understand the layout, and rewrite the language, you are more useful than someone who only comments on vibe.

Learning code also makes you harder to intimidate. You can look at a website and understand which problems are copy, which are design, and which are actual development work.

——

Exercise: Open a service business website and identify three things: what is copy, what is design, and what is functionality. Do not rewrite yet. Just label the problem correctly.`,
  },
  {
    num: "08", tier: "marked",
    title: "The Writer's Tech Stack For Making Money Online",
    content: `You do not need a complicated stack to make money online.

You need a place to be understood, a way to collect interest, a way to sell, and a reason for people to come back.

Minimum stack:
— Website: your main argument
— Email list: your owned audience
— Payment link: the buy button
— Calendar: the conversation bridge
— Patreon or membership: recurring relationship
— Simple CRM: the follow-up system
— Writing archive: the proof library

The mistake is building the stack before the offer.

Start with this sentence: "I help [specific person] get [specific result] through [specific service]."

Then build only what supports that.

For a ghostwriter:
— Website: "I turn founder ideas into essays, LinkedIn posts, and newsletters."
— Email list: weekly notes on voice and positioning
— Payment link: audit or starter package
— Calendar: discovery call
— Patreon: behind-the-scenes frameworks
— CRM: warm leads and past clients
— Archive: before-after samples

Tools are only useful when they serve a decision. Can someone understand you? Can they trust you? Can they buy? Can they return?

——

Exercise: Write your current stack on one page. Circle anything that does not help someone understand, trust, buy, or return.`,
  },
  {
    num: "09", tier: "soft",
    title: "The Difference Between Content And Reputation",
    content: `Content fills a feed.

Reputation makes people remember what you are good at.

This is where a lot of ghostwriting goes wrong. A client asks for posts. The writer delivers posts. The feed moves. Nothing accumulates.

Good ghostwriting builds memory.

It repeats the right ideas without sounding repetitive. It gives the client a recognizable point of view. It creates a trail someone can follow from first impression to trust.

Before you write for anyone, ask:
— What should this person be known for?
— What do they know that their audience needs?
— What do they believe that their competitors avoid saying?
— What proof do they have?
— What stories can they tell without turning their life into performance?

That last question matters.

Not every personal detail belongs online. You can write with depth without handing over the private room. You can be memorable without being exposed.

Reputation is built by precision, not confession.

——

Exercise: Choose one client or public figure. Write five phrases you want people to associate with them after reading their work for 90 days.`,
  },
  {
    num: "10", tier: "marked",
    title: "How To Turn One Conversation Into Four Paid Posts",
    content: `This is the simplest ghostwriting workflow I know.

Input: One 30-minute conversation.
Output: Four posts.

Step 1: Ask for stories, not topics.

Topics produce generic advice. Stories produce texture.

Ask:
— What happened recently that annoyed you?
— What did a client misunderstand?
— What did you change your mind about?
— What do you keep repeating in meetings?

Step 2: Pull the strongest lines.

Do not summarize too early. Look for the exact phrases that sound like the person.

Step 3: Sort the material.

Most calls contain four post types:
— belief post
— lesson post
— story post
— practical framework

Step 4: Draft in their natural order.

Some people explain through conflict. Some through examples. Some through principles. Do not force everyone into the same structure.

Step 5: Send with notes.

Tell the client why each post exists. That builds trust and trains them to give better input next time.

——

Exercise: Record a voice memo about something you learned this week. Pull four post ideas from it before you edit a single sentence.`,
  },
  {
    num: "11", tier: "soft",
    title: "The First $1,000 From Writing",
    content: `The first $1,000 from writing does not need to come from a giant launch.

It can come from five small, useful sales.

Offer: LinkedIn Profile Fix

Deliverable:
— headline rewrite
— about section rewrite
— featured section recommendations
— three post ideas based on their positioning

Price: $200
Sales needed: Five.

Who to pitch:
— people changing jobs
— consultants
— founders
— coaches
— creatives with unclear bios
— operators who are better in conversation than online

Simple pitch: "I am doing a small batch of LinkedIn profile fixes this month. I rewrite the headline and about section so the profile actually reflects what you do now. I also send three post ideas so the new positioning has somewhere to go. Want me to take a look at yours?"

The pitch works because it is specific. It does not ask someone to imagine a huge transformation. It points at a visible problem and offers a clean fix.

——

Exercise: Make a list of 20 people whose LinkedIn profile undersells them. Send five careful messages. Keep the tone human.`,
  },
  {
    num: "12", tier: "marked",
    title: "How To Build A Tiny Portfolio With No Clients",
    content: `No clients does not mean no proof.

It means you need demonstration work.

A tiny writing portfolio can be built from three kinds of samples:

1. Rewrites
Take a public homepage, LinkedIn bio, or offer page and rewrite one section. Do not insult the original. Show what you would clarify and why.

2. Mock projects
Invent a realistic client. A career coach. A SaaS founder. A local studio. Write the homepage hero, about section, and one email.

3. Personal positioning
Use yourself as the case study. Rewrite your own bio, offer, services page, and pinned post. Explain the decisions.

Your portfolio does not need 40 pieces. It needs enough proof that someone can trust your taste.

Use this structure for each sample:
— The problem
— The original or prompt
— The rewrite
— Why it works
— What I would test next

That last line matters because it shows strategic thinking.

——

Exercise: Choose one sample to create this week. Keep it small enough to finish in two hours.`,
  },
  {
    num: "13", tier: "marked",
    title: "Coding Project: Build Your Own Services Page",
    content: `A services page is one of the best beginner coding projects because it forces clarity.

You cannot hide behind clever design when the page has to answer simple questions:
— What do you do?
— Who is it for?
— What problem does it solve?
— What does the client get?
— What happens next?

Build a one-page services site with these sections:

Hero: Name, one-line positioning, and one call to action.

Services: Three offers with short descriptions, starting prices, and best-fit buyers.

Proof: Three bullets showing experience, results, or relevant background.

Process: Three steps from inquiry to delivery.

Contact: Email link or booking link.

Code focus:
— semantic HTML
— readable CSS
— mobile-friendly layout
— one clear button style
— no decorative clutter

Writing focus: Every section should help someone decide whether to work with you.

The page does not need to be beautiful. It needs to be honest.

——

Exercise: Build the page in plain HTML and CSS first. Add JavaScript only after the page can stand on its own.`,
  },
  {
    num: "14", tier: "soft",
    title: "The Money Is In The Rewrite",
    content: `People love the idea of a first draft because it feels like creation.

The money is usually in the rewrite.

That is true in writing, positioning, websites, and offers.

The first draft says, "Here is everything I might mean."

The rewrite says, "Here is the part that matters."

Clients pay for the second one.

A rough draft is allowed to be messy. A public page is not. A founder bio, website headline, LinkedIn about section, sales page, or pitch email has a job. It has to make someone understand faster and care enough to keep going.

That is where editing becomes strategy.

When you sell writing services, stop positioning yourself as someone who can "make it sound better." That is too small.

Position yourself as someone who can find the argument.

The sharper offer: "I help you turn messy expertise into clear public language."

That is more valuable than polish.

——

Exercise: Take one paragraph from your own website, bio, or offer. Cut 30 percent of the words. Then write one sentence explaining what the paragraph is really trying to prove.`,
  },
  {
    num: "15", tier: "marked",
    title: "What To Post On LinkedIn If You Want Ghostwriting Clients",
    content: `If you want ghostwriting clients, your own content should prove three things:

1. You can hear a point of view.
2. You can turn ideas into structure.
3. You understand reputation, not just posting.

Post categories:

Voice: Break down what makes someone sound like themselves.
Example: "The strongest founder voices usually have one sentence they keep trying to say in different ways."

Before-after: Show a generic line and a sharper version.
Before: "I help businesses grow."
After: "I help service businesses turn unclear offers into pages people can actually buy from."

Process: Explain how you turn interviews into posts.

Market notes: Write about what you are noticing in founder content, LinkedIn, websites, and audience trust.

Proof: Share small wins, even if self-directed. "I rewrote this headline three ways. Here is why the third one works."

The mistake is posting like a motivational creator when you want to be hired as a strategic writer.

Show the work.

——

Exercise: Write one post in each category this week. Keep them useful enough that a smart client would think, "She sees the problem."`,
  },
  {
    num: "16", tier: "soft",
    title: "Learning To Code Makes You A Better Editor",
    content: `Editing and coding have more in common than people think.

Both ask:
— What is this doing?
— Is it necessary?
— Is it in the right place?
— What breaks if I remove it?
— Can this be simpler?

That is why learning basic code can make you a sharper writer.

HTML teaches hierarchy. A page needs one main heading. Sections need order. Links need purpose. That is also true in copy.

CSS teaches consistency. Spacing, type, color, and layout all create trust before the words are read closely.

JavaScript teaches cause and effect. When someone clicks, something happens. Good copy should work the same way. It should create movement.

If you are writing websites, code helps you understand that copy does not live alone. It lives inside structure.

A sentence can be good and still fail if it is placed in the wrong section, hidden below the fold, or attached to a weak button.

——

Exercise: Look at your own homepage and label each section by job: orient, prove, explain, sell, invite. If a section has no job, rewrite or remove it.`,
  },
  {
    num: "17", tier: "marked",
    title: "How To Sell A Content Strategy Sprint",
    content: `A content strategy sprint is useful when a client has too many ideas and no system.

Offer: The 30-Day Content Sprint

Best for: Founders, consultants, agencies, coaches, and service providers who need a clear publishing direction.

Deliverables:
— positioning notes
— audience map
— 4 core content pillars
— 20 post ideas
— 4 drafted posts
— simple publishing rhythm

Price: $750 to $2,500

Pitch: "You do not need to post more. You need a clearer reason for every post to exist. I will turn your scattered ideas into a 30-day content plan that supports your actual offer."

Why it sells: It connects content to money without pretending every post will become a lead. It gives the client direction, language, and momentum.

Upgrade path: After the sprint, offer monthly ghostwriting or a quarterly editorial plan.

——

Exercise: Create your own 30-day sprint template. Include intake questions, content pillars, post formats, and the handoff document.`,
  },
  {
    num: "18", tier: "soft",
    title: "The Personal Website Is Not A Digital Resume",
    content: `A personal website should not read like a storage unit for credentials.

It should make a case.

The question is not, "What have I done?"

The better question is, "What should a stranger understand after five minutes here?"

For a writer, marketer, consultant, or founder, the site has a job:
— make the work legible
— make the value specific
— show proof
— explain the offers
— give people a clean next step

That is not the same as listing every project.

Most personal websites fail because they are organized around the person's anxiety instead of the reader's decision.

The reader wants to know:
— Are you relevant to my problem?
— Do I trust your taste?
— Can I understand what you sell?
— Is there a clear way to start?

If the site does not answer that, it is not done.

——

Exercise: Read your homepage like a stranger. After 60 seconds, write down the one thing someone would think you do. If that answer is wrong or vague, the page needs a rewrite.`,
  },
  {
    num: "19", tier: "marked",
    title: "How To Turn Patreon Into A Service Funnel Without Making It Weird",
    content: `Patreon does not have to be separate from services.

It can be the room where people learn how you think before they hire you.

The key is to avoid turning every post into a sales page.

Use this rhythm:

Teach: Give people a useful framework.

Show: Share a before-after, teardown, or decision note.

Invite: Mention the relevant service only when the post naturally points there.

Example: A post about unclear LinkedIn bios can end with: "If your own profile is doing this, The Edit is the small fix."

That is enough.

The goal is not to pressure members. The goal is to make the next step obvious for the person who already wants help.

Patreon supports the service ladder:
— free posts build trust
— Soft Cover builds relationship
— Marked Up proves method
— First Edition offers direct feedback
— services solve the larger problem

——

Exercise: Choose five old or planned posts. For each one, write the natural service tie-in. If there is no natural tie-in, let it be a pure value post.`,
  },
  {
    num: "20", tier: "marked",
    title: "The Ghostwriter's Intake Questions",
    content: `A good ghostwriting intake saves hours later.

Voice:
— What phrases do you say often?
— What words do you hate?
— Who do you sound like when you are not trying to sound professional?
— What should your writing never sound like?

Point of view:
— What do you believe about your work that your industry gets wrong?
— What do your best clients learn after working with you?
— What advice do you give that people resist at first?
— What are you tired of seeing online?

Audience:
— Who are we trying to reach?
— What do they already understand?
— What are they missing?
— What decision do we want to help them make?

Proof:
— What results can we mention?
— What stories can we use?
— What details need to stay private?
— What claims need evidence?

Process:
— How often do you want to publish?
— How much review time do you realistically have?
— What topics are off limits?
— What does approval look like?

——

Exercise: Use this on yourself. Answer every question before writing your next public post.`,
  },
  {
    num: "21", tier: "soft",
    title: "How To Build A Paid Guide From What You Already Know",
    content: `A paid guide does not have to be enormous.

It has to solve a problem someone is already trying to solve.

Good guide topics:
— rewrite your LinkedIn about section
— build a one-page website
— create your first ghostwriting offer
— audit your homepage copy
— turn a voice memo into four posts
— write a founder bio
— create a 30-day content plan

The structure:
1. The problem
2. The mistake people make
3. The framework
4. The steps
5. The examples
6. The checklist
7. The next move

Keep it tight. A useful 20-page guide beats a bloated 100-page guide nobody finishes.

The best paid guides are usually hiding inside work you already explain for free.

Look for:
— repeated advice
— client questions
— notes you keep rewriting
— processes you use without naming them
— before-after examples

——

Exercise: Write a table of contents for one paid guide. If every section solves a real problem, you have a product.`,
  },
  {
    num: "22", tier: "soft",
    title: "The AI Question For Writers",
    content: `AI can produce words.

That does not mean it can produce judgment.

For writers, the question is not, "Can a tool draft faster than me?"

Of course it can.

The better question is, "What part of the work am I actually being paid for?"

If you are paid for generic content, you are in danger.

If you are paid for taste, positioning, voice, narrative judgment, editing, interviewing, structure, and knowing what not to say, you have a stronger position.

Use AI for:
— sorting notes
— creating outlines
— finding gaps
— generating alternate angles
— stress-testing clarity
— turning messy transcripts into rough structure

Do not outsource:
— taste
— ethics
— client voice
— final judgment
— sensitive context
— claims that need proof

The writer's advantage is not typing speed. It is discernment.

——

Exercise: Take one AI-generated post and edit it until it sounds like a real person with a real point of view. Track every decision you make. That decision log is your value.`,
  },
  {
    num: "23", tier: "marked",
    title: "The Offer Page Checklist",
    content: `An offer page should answer the questions a buyer is already asking.

Checklist:
— Who is this for?
— What problem does it solve?
— What changes after the work?
— What is included?
— What is not included?
— What does it cost, or how does pricing work?
— How long does it take?
— What does the process look like?
— What proof supports the offer?
— What should someone do next?

Common weak spots:

The headline is too clever.
The offer is described by activity instead of outcome.
The process is vague.
The CTA is timid.
The page tries to sell every service at once.

The best offer pages reduce uncertainty. They do not answer every possible objection, but they answer enough for the right person to move.

Rewrite prompt: "I help [person] solve [problem] by [method], so they can [result]."

Example: "I help founders turn scattered expertise into website copy, LinkedIn posts, and essays that make their value easier to understand."

——

Exercise: Run this checklist on one offer page. Mark every missing answer. Those gaps are the rewrite.`,
  },
  {
    num: "24", tier: "first",
    title: "A 90-Day Plan For Becoming A Paid Ghostwriter",
    content: `Days 1 to 15: Choose your lane.

Pick one buyer and one writing surface. Do not try to write for everyone.

Examples:
— LinkedIn for consultants
— newsletters for founders
— website copy for coaches
— bios for executives

Days 16 to 30: Build proof.

Create three samples. One rewrite, one mock client piece, one piece for yourself. Add notes explaining your decisions.

Days 31 to 45: Publish your thinking.

Post twice a week about voice, positioning, writing, editing, and the business problem your service solves.

Days 46 to 60: Sell a starter offer.

Pitch a small audit, profile fix, or one-call-to-four-posts package. Keep the deliverable clear.

Days 61 to 75: Turn delivery into a case study.

Document the before, after, and strategic choices. Ask for a testimonial if appropriate.

Days 76 to 90: Offer the next step.

Move from one-off work into a monthly package, content sprint, or deeper rewrite.

——

Exercise: Write your 90-day plan in one page. Name the buyer, the offer, the proof pieces, and the first 20 people you will contact.

——

First Edition note: Bring your plan to the next Q&A and I will give you direct feedback on the offer language and first pitch.`,
  },
  {
    num: "25", tier: "soft",
    title: "The Money Is In Becoming Legible",
    content: `A lot of online advice makes money sound like a trick.

Use this platform. Post this often. Pick this niche. Build this funnel.

Some of that is useful.

But the deeper work is becoming legible.

Can people understand what you do?
Can they see why it matters?
Can they tell who it is for?
Can they trust your taste?
Can they find a way to pay you?

Ghostwriting, coding, websites, digital products, Patreon, LinkedIn, services, audits, strategy. These are not random lanes. They are all ways of making value easier to see.

That is the actual work.

A writer who can clarify value can make money.
A writer who can build a simple page can make money.
A writer who can turn expertise into language can make money.
A writer who can help someone become understood can make money.

Not because words are magic.

Because decisions are made through language.

That is why everything here — every framework, every exercise, every post — points at the same thing: the gap between what you are actually worth and how clearly you communicate it.

Close that gap.

The rest follows.`,
  },
];

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("  MK Parrish — Patreon Automation");
  console.log(`  Mode: ${DRY_RUN ? "DRY RUN (no real API calls)" : "LIVE"}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  const campaign = await getCampaign();
  const tiers    = await getTiers(campaign.id);

  const tierMap = {
    public: [],
    soft:   [tiers.soft],
    marked: [tiers.soft, tiers.marked],
    first:  tiers.all,
  };

  // Post welcome first
  console.log("\n📌  Posting welcome post (will pin manually after)...");
  const welcome = await createPost(campaign.id, tierMap.public, WELCOME);
  console.log(`✓   Welcome post created → ${DRY_RUN ? "dry-00" : welcome?.id}`);
  console.log("    ⚠️   Pin this post manually in Patreon → Posts → ⋯ → Pin");

  await sleep(2500);

  // Post all 25
  console.log(`\n📝  Posting 25 essays...\n`);
  const results = [];
  for (const post of POSTS) {
    const tierIds = tierMap[post.tier] || tierMap.soft;
    process.stdout.write(`  [${post.num}/25] ${post.title.slice(0, 55)}...`);
    try {
      const result = await createPost(campaign.id, tierIds, post);
      const id = DRY_RUN ? `dry-${post.num}` : result?.id;
      process.stdout.write(` ✓ (${id})\n`);
      results.push({ num: post.num, title: post.title, id, tier: post.tier, ok: true });
    } catch (err) {
      process.stdout.write(` ✗ ERROR: ${err.message}\n`);
      results.push({ num: post.num, title: post.title, err: err.message, ok: false });
    }
    await sleep(2000); // stay well within rate limits
  }

  // Summary
  const ok      = results.filter((r) => r.ok).length;
  const failed  = results.filter((r) => !r.ok);

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`  Done. ${ok}/25 posts created.`);
  if (failed.length) {
    console.log(`\n  ❌  Failed (${failed.length}):`);
    failed.forEach((f) => console.log(`       [${f.num}] ${f.title}\n          ${f.err}`));
  }
  console.log("\n  Next manual steps:");
  console.log("  1. Pin the Welcome post in Patreon → Posts");
  console.log("  2. Create 7 collections and assign posts (see patreon-content-kit.html)");
  console.log("  3. Upload cover image: public/patreon-banner.png");
  console.log("  4. Set profile photo matching mkparrish.com");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}

main().catch((err) => {
  console.error("\n💥  Fatal error:", err.message);
  process.exit(1);
});
