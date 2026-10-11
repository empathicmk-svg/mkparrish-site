"use client";

import { useEffect } from "react";

export default function LegacyOfferingsRedirect() {
  useEffect(() => {
    function redirectLegacyHash() {
      if (window.location.hash === "#offerings") {
        window.location.replace("/services#offerings");
      }
    }

    redirectLegacyHash();
    window.addEventListener("hashchange", redirectLegacyHash);
    return () => window.removeEventListener("hashchange", redirectLegacyHash);
  }, []);

  return null;
}
