// ── Client testimonials ──────────────────────────────────────────────────────
// Rendered on /testimonials and available for reuse (home, service pages).
// NOTE: Named quotes (esp. Elaview / EVU) should be confirmed with each client
// before they go live. Swap `pending: true` → remove it once approved.

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  service: string;   // which engagement this came from
  featured?: boolean;
  pending?: boolean;  // awaiting written sign-off from the client
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "MK rewrote how we talk about ourselves before she touched a single page of the site. The redesign was fast and genuinely beautiful, but the real unlock was the messaging — for the first time our homepage sounds like the company we actually are. Our team stopped explaining what we do and started sending people the link.",
    name: "Michael Anderson",
    role: "CEO",
    company: "Elaview",
    service: "Website redesign + positioning",
    featured: true,
    pending: true,
  },
  {
    quote:
      "We came in with a clear product and a muddy story. MK found the sentence we'd been circling for a year and built the whole site around it. She's rare — equal parts strategist and writer — and she moves quickly without ever making it feel rushed. The new positioning is already changing the conversations we're having with partners.",
    name: "Abrar",
    role: "Founder",
    company: "EVU",
    service: "Positioning + messaging",
    featured: true,
    pending: true,
  },
  {
    quote:
      "The $97 audit paid for itself the same week. Three rewritten headlines and a ranked list of fixes — no fluff, no upsell theater. I implemented two of them that afternoon and the difference in reply rate was immediate.",
    name: "Dana R.",
    role: "Founder",
    company: "B2B SaaS",
    service: "The 48-Hour Positioning Audit",
  },
  {
    quote:
      "I've hired ghostwriters before and always ended up rewriting everything because it didn't sound like me. MK actually captured my voice. People message me now saying my LinkedIn finally sounds like how I talk.",
    name: "Priya M.",
    role: "Fractional COO",
    company: "Operations consultancy",
    service: "The Byline",
  },
  {
    quote:
      "Our old site was slow, dated, and quietly embarrassing. MK rebuilt it mobile-first in weeks and wrote copy that does the selling for us. It finally looks like it belongs to a company you'd trust with real money.",
    name: "Marcus T.",
    role: "Managing Partner",
    company: "Boutique agency",
    service: "The Build",
  },
  {
    quote:
      "What surprised me was how much of the work was thinking, not just writing. MK asked the questions our leadership team had been avoiding. The messaging that came out of it is the clearest we've ever had.",
    name: "Elena V.",
    role: "VP Marketing",
    company: "Growth-stage startup",
    service: "The Rewrite",
  },
  {
    quote:
      "I bought The Vault expecting a stack of PDFs. What I got was basically a senior operator in a folder. I've run three of the frameworks on my own business and they hold up.",
    name: "Sam K.",
    role: "Solo founder",
    company: "Creator business",
    service: "The Vault",
  },
];

export const featuredTestimonials = () => TESTIMONIALS.filter((t) => t.featured);
