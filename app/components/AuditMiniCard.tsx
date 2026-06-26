import Link from "next/link";
import { getAuditCheckoutUrl } from "@/lib/audit";

export function AuditMiniCard() {
  const checkoutUrl = getAuditCheckoutUrl();
  const actionLabel = checkoutUrl.startsWith("http") ? "Buy the audit" : "Request the audit";

  return (
    <aside className="border border-graphite bg-obsidian p-6 text-pearl shadow-sm">
      <p className="font-body text-[0.62rem] font-bold uppercase tracking-[0.24em] text-petal">
        48-hour audit
      </p>

      <h3 className="mt-3 font-display text-3xl uppercase leading-tight tracking-[0.02em] text-pearl">
        The 48-Hour Positioning Audit
      </h3>

      <p className="mt-3 font-body text-sm font-light leading-7 text-smoke">
        A $97 async audit for your LinkedIn, website, offer, or sales page, with practical fixes instead of vague branding theater.
      </p>

      <div className="mt-5 flex flex-col gap-2">
        <a
          href={checkoutUrl}
          className="btn-primary justify-center px-5 py-3 text-center font-body text-[0.68rem] font-bold uppercase tracking-[0.18em] text-void"
        >
          {actionLabel}
        </a>

        <Link
          href="/audit"
          className="border border-graphite px-5 py-3 text-center font-body text-[0.68rem] font-bold uppercase tracking-[0.18em] text-ash transition hover:border-petal hover:text-petal"
        >
          Details
        </Link>
      </div>
    </aside>
  );
}
