"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SUBSTACK_URL } from "@/app/lib/config";

const paths = [
  {
    label: "Hire MK",
    title: "You want the result handled.",
    desc: "Messaging, websites, outbound, and full-funnel growth with one senior operator owning the work.",
    href: "/services#offerings",
    cta: "See services",
  },
  {
    label: "DIY",
    title: "You want the framework.",
    desc: "Buy the exact guides, workbooks, and templates behind the client process, starting at $18.",
    href: "/shelf",
    cta: "Browse The Shelf",
  },
  {
    label: "Read",
    title: "You want the thinking first.",
    desc: "Join The Margins for essays, strategy notes, and the work before it gets polished into a pitch deck.",
    href: SUBSTACK_URL,
    cta: "Enter The Margins",
    external: true,
  },
] as const;

export default function MonetizationDrawer() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setHidden(sessionStorage.getItem("mkp_start_hidden") === "1");
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (pathname === "/" || pathname === "/start" || hidden) return null;

  function dismiss() {
    setOpen(false);
    setHidden(true);
    sessionStorage.setItem("mkp_start_hidden", "1");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed right-0 top-[38%] z-[70] border border-r-0 border-petal/30 bg-carbon/95 px-2 py-4 font-body text-[0.6rem] font-bold uppercase tracking-[0.22em] text-petal shadow-[-8px_0_24px_rgba(0,0,0,0.25)] backdrop-blur-md transition hover:bg-petal hover:text-void"
        style={{ writingMode: "vertical-rl" }}
        aria-label="Open Start Here menu"
      >
        Start Here
      </button>

      {open && (
        <div className="fixed inset-0 z-[8000]" role="dialog" aria-modal="true" aria-label="Start here">
          <button
            type="button"
            className="absolute inset-0 bg-void/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-label="Close Start Here menu"
          />

          <aside className="absolute right-0 top-0 flex h-full w-full max-w-[430px] flex-col overflow-y-auto border-l border-graphite bg-void p-7 shadow-2xl md:p-9">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">Start here</p>
                <h2 className="mt-3 font-display text-4xl uppercase leading-[0.95] tracking-[0.02em] text-pearl">
                  Pick the level of help you need.
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="font-body text-lg text-ash transition hover:text-pearl"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <p className="mt-5 font-body text-sm font-light leading-7 text-smoke">
              No maze. No twelve-tab funnel. Choose the door that matches your budget, urgency, and appetite for doing it yourself.
            </p>

            <div className="mt-7 space-y-3">
              {paths.map((path) => {
                const content = (
                  <>
                    <p className="font-body text-[0.6rem] font-bold uppercase tracking-[0.24em] text-petal">{path.label}</p>
                    <h3 className="mt-2 font-display text-xl uppercase tracking-[0.02em] text-pearl">{path.title}</h3>
                    <p className="mt-2 font-body text-xs font-light leading-6 text-smoke">{path.desc}</p>
                    <p className="mt-4 font-body text-[0.65rem] font-bold uppercase tracking-[0.18em] text-petal">{path.cta} →</p>
                  </>
                );

                return "external" in path && path.external ? (
                  <a
                    key={path.label}
                    href={path.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group block border border-graphite bg-obsidian p-5 transition hover:border-petal/50 hover:bg-carbon"
                  >
                    {content}
                  </a>
                ) : (
                  <Link
                    key={path.label}
                    href={path.href}
                    className="group block border border-graphite bg-obsidian p-5 transition hover:border-petal/50 hover:bg-carbon"
                  >
                    {content}
                  </Link>
                );
              })}
            </div>

            <div className="mt-7 border-t border-graphite pt-6">
              <Link
                href="/"
                className="btn-primary inline-flex w-full justify-center px-5 py-4 font-body text-[0.72rem] font-bold uppercase tracking-[0.18em] text-void"
              >
                Compare Every Path →
              </Link>
              <Link
                href="/resources"
                className="mt-3 inline-flex w-full justify-center border border-graphite px-5 py-3 font-body text-[0.65rem] font-bold uppercase tracking-[0.18em] text-ash transition hover:border-petal hover:text-petal"
              >
                Tools I Actually Use
              </Link>
              <button
                type="button"
                onClick={dismiss}
                className="mt-5 w-full font-body text-[0.62rem] uppercase tracking-[0.16em] text-iron transition hover:text-smoke"
              >
                Hide for this visit
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
