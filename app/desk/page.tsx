import type { Metadata } from "next";
import DeskApp from "./DeskApp";

export const metadata: Metadata = {
  title: "Deal Desk",
  // Private working tool, not part of the public site.
  robots: { index: false, follow: false, nocache: true },
};

export default function DeskPage() {
  return <DeskApp />;
}
