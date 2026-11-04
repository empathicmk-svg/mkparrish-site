"use client";

import { useEffect } from "react";

// Auto-triggers the file downloads on arrival (after Stripe checkout), staggered
// so the browser does not block the second one. Manual buttons remain as a
// fallback in case the browser blocks programmatic downloads.
export default function AutoDownload({ hrefs }: { hrefs: string[] }) {
  useEffect(() => {
    hrefs.forEach((href, i) => {
      setTimeout(() => {
        const a = document.createElement("a");
        a.href = href;
        a.download = "";
        document.body.appendChild(a);
        a.click();
        a.remove();
      }, i * 1500);
    });
  }, [hrefs]);

  return null;
}
