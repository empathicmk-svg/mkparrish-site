"use client";

import { useState } from "react";
import {
  DEFAULT_LEAD_MAGNET,
  LEAD_MAGNETS,
  type LeadMagnet,
} from "@/app/lib/lead-magnets";

type InlineLeadCaptureProps = {
  initialSlug?: LeadMagnet["slug"];
  source?: string;
};

function findLeadMagnet(slug: LeadMagnet["slug"]) {
  return LEAD_MAGNETS.find((magnet) => magnet.slug === slug) ?? DEFAULT_LEAD_MAGNET;
}

export default function InlineLeadCapture({
  initialSlug = DEFAULT_LEAD_MAGNET.slug,
  source = "inline-lead-capture",
}: InlineLeadCaptureProps = {}) {
  const [selectedSlug] = useState<LeadMagnet["slug"]>(initialSlug);
  const selected = findLeadMagnet(selectedSlug);
  const isDefaultPositioning = selected.slug === DEFAULT_LEAD_MAGNET.slug && source === "inline-lead-capture";
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(selected.download);
  const [emailed, setEmailed] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || loading) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          offer: selected.slug,
          resource: selected.slug,
          source,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Subscription failed");

      if (data.download || data.checklist) setDownloadUrl(data.download || data.checklist);
      setEmailed(Boolean(data.emailed));
      setSubmitted(true);
    } catch {
      setError("That did not go through. Try again, or join The Margins directly.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="border border-petal/30 bg-carbon p-7 md:p-9" aria-live="polite">
        <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">You&apos;re in</p>
        <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.02em] text-pearl">
          {selected.shortTitle} is ready.
        </h3>
        <p className="mt-4 max-w-xl font-body text-sm font-light leading-7 text-smoke">
          {emailed
            ? "It is also headed to your inbox. Start with the question that makes you slightly uncomfortable. That is usually the expensive one."
            : "Grab it now. You are also on the free list for The Margins."}
        </p>
        <a
          href={downloadUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-primary mt-6 inline-flex px-6 py-4 font-body text-[0.75rem] font-bold uppercase tracking-[0.18em] text-void"
        >
          Download the PDF →
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-graphite bg-obsidian p-7 md:p-9">
      <p className="font-body text-[0.65rem] font-bold uppercase tracking-[0.3em] text-petal">
        {isDefaultPositioning ? "Free positioning audit" : selected.label}
      </p>
      <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.02em] text-pearl md:text-4xl">
        {isDefaultPositioning ? "See what your copy is not saying." : selected.title}
      </h3>
      <p className="mt-4 max-w-2xl font-body text-sm font-light leading-7 text-smoke">
        {isDefaultPositioning
          ? "Get the 12-point checklist I use before client work. It shows where your positioning is vague, dated, or quietly losing the right buyer."
          : selected.promise}
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="start-email">Email address</label>
        <input
          id="start-email"
          type="email"
          required
          autoComplete="email"
          placeholder="your@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="min-w-0 flex-1 border border-graphite bg-carbon px-5 py-4 font-body text-sm text-pearl placeholder:text-iron transition-colors focus:border-petal focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="btn-primary px-6 py-4 font-body text-[0.75rem] font-bold uppercase tracking-[0.18em] text-void disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Sending…" : isDefaultPositioning ? "Get the Checklist →" : "Send the PDF →"}
        </button>
      </div>

      {error && <p className="mt-3 font-body text-xs leading-5 text-petal" aria-live="polite">{error}</p>}
      <p className="mt-4 font-body text-[0.65rem] leading-5 text-iron">
        You will also receive free posts from The Margins. No spam, no hostage situation, unsubscribe whenever you like.
      </p>
    </form>
  );
}
