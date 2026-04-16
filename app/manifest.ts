import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MK Parrish — Writer & Marketing Growth Strategist",
    short_name: "MK Parrish",
    description:
      "MK Parrish: writer & marketing growth strategist. Words, strategy, and reinvention for people ready to stop being misread.",
    start_url: "/",
    display: "standalone",
    background_color: "#080808",
    theme_color: "#080808",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
