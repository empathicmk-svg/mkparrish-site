import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coming Back Soon — MK Parrish",
  description: "MK Parrish — coming back soon.",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <main
      style={{
        minHeight: "100svh",
        background: "#080808",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "'DM Sans', sans-serif",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(0.6rem, 1.2vw, 0.75rem)",
          letterSpacing: "0.3em",
          color: "#7A7A7A",
          textTransform: "uppercase",
          marginBottom: "2rem",
        }}
      >
        MK Parrish
      </p>

      <h1
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(3rem, 10vw, 8rem)",
          lineHeight: 0.9,
          letterSpacing: "0.02em",
          color: "#F0F0EE",
          textTransform: "uppercase",
          margin: 0,
        }}
      >
        Coming Back
        <br />
        <span style={{ color: "#F2AFC6" }}>Soon.</span>
      </h1>

      <p
        style={{
          marginTop: "2.5rem",
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1rem, 2vw, 1.2rem)",
          fontStyle: "italic",
          fontWeight: 500,
          color: "rgba(242,175,198,0.75)",
          maxWidth: "40ch",
          lineHeight: 1.7,
        }}
      >
        Something better is on its way.
      </p>

      <p
        style={{
          marginTop: "3rem",
          fontSize: "0.75rem",
          letterSpacing: "0.15em",
          color: "#4A4A4A",
          textTransform: "uppercase",
        }}
      >
        <a
          href="mailto:mkp414@icloud.com"
          style={{ color: "#7A7A7A", textDecoration: "none" }}
        >
          mkp414@icloud.com
        </a>
      </p>
    </main>
  );
}
