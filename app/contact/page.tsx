import type { Metadata } from "next";
import { H1, BtnPrimary } from "@/app/components/ui";
import CustomBooking from "@/app/components/CustomBooking";
import { CONTACT } from "@/app/lib/config";

export const metadata: Metadata = {
  title: "Contact — MK Parrish",
  description: "Book a call or send an email to discuss positioning, messaging, websites, and growth work.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative flex min-h-[60vh] flex-col justify-end bg-void pb-16 pt-28 md:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[55vh] w-[80vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(242,175,198,0.12),transparent_65%)]" />
        </div>
        <div className="relative mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">Contact</p>
          <div className="mt-6">
            <H1>
              Tell me what{" "}
              <span className="text-petal" style={{ textShadow: "0 0 40px rgba(242,175,198,0.35)" }}>
                needs fixing.
              </span>
            </H1>
          </div>
          <p className="mt-6 max-w-2xl font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "56ch" }}>
            Share the business problem, the current bottleneck, and what you want the work to change.
          </p>
        </div>
      </section>

      <section id="book" className="bg-void" style={{ padding: "clamp(4rem, 8vw, 7rem) 0" }}>
        <div className="mx-auto w-full max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <div className="mb-10">
            <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">30 minute intro call</p>
            <h2 className="mt-4 font-display text-5xl uppercase tracking-[0.02em] text-pearl md:text-6xl">Book a Call</h2>
            <p className="mt-4 font-body text-base font-light leading-8 text-smoke" style={{ maxWidth: "52ch" }}>
              We will clarify the need, fit, and best starting point.
            </p>
          </div>
          <CustomBooking />
        </div>
      </section>

      <section className="bg-obsidian" style={{ padding: "clamp(4rem, 8vw, 7rem) 0" }}>
        <div className="mx-auto max-w-[1400px]" style={{ padding: "0 clamp(1.25rem, 5vw, 3rem)" }}>
          <div className="grid gap-px bg-graphite md:grid-cols-2">
            <a href={`mailto:${CONTACT.email}`} className="group bg-obsidian p-10 transition-colors hover:bg-carbon">
              <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-iron">Email</p>
              <h3 className="mt-4 font-display text-3xl uppercase tracking-[0.02em] text-pearl transition-colors group-hover:text-white">Send a Note</h3>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">Include the project, timeline, and goal.</p>
              <span className="mt-6 inline-block font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-petal transition-colors group-hover:text-blush">
                {CONTACT.email}
              </span>
            </a>

            <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="group bg-obsidian p-10 transition-colors hover:bg-carbon">
              <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-iron">LinkedIn</p>
              <h3 className="mt-4 font-display text-3xl uppercase tracking-[0.02em] text-pearl transition-colors group-hover:text-white">Connect</h3>
              <p className="mt-4 font-body text-sm font-light leading-7 text-smoke">Use LinkedIn for a quick introduction or project inquiry.</p>
              <span className="mt-6 inline-flex items-center gap-2 font-body text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-petal transition-colors group-hover:text-blush">
                /in/mkparrish
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </span>
            </a>
          </div>
          <div className="mt-10">
            <BtnPrimary href={`mailto:${CONTACT.email}`}>Email MK</BtnPrimary>
          </div>
        </div>
      </section>
    </>
  );
}
