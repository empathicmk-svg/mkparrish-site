import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instagram Posts — MK Parrish Brand Assets",
  description: "Branded Instagram quote posts for MK Parrish.",
};

// ─── Post data ───────────────────────────────────────────────────────────────

const posts = [
  {
    id: 1,
    layout: "bold",
    lines: ["He never", "hit you."],
    sub: "But he made you small enough\nthat you stopped taking up space.\n\nThat counts.\nThat is abuse.",
    tag: "Emotional Abuse",
  },
  {
    id: 2,
    layout: "quote",
    quote: "The most dangerous kind of abuse is the kind that makes you the expert on your own wrongness.",
    tag: "The Rewrite",
  },
  {
    id: 3,
    layout: "list",
    intro: "Emotional abuse sounds like:",
    items: [
      '"You\'re too sensitive."',
      '"That\'s not what I said."',
      '"You\'re crazy."',
      '"Nobody else would put up with you."',
      '"I never did that."',
    ],
    outro: "It doesn't leave marks you can show anyone.\nThat's the point.",
    tag: "Gaslighting Awareness",
  },
  {
    id: 4,
    layout: "split",
    top: "Control with soft lighting",
    bottom: "is still control.",
    tag: "MK Parrish",
  },
  {
    id: 5,
    layout: "quote",
    quote: "She was not dramatic.\n\nShe was documenting.",
    tag: "The Rewrite",
  },
  {
    id: 6,
    layout: "bold",
    lines: ["Suffering", "in silence"],
    sub: "is not dignity.\n\nIt is what they trained you to do\nso they could keep doing\nwhat they were doing.",
    tag: "Surviving in Silence",
  },
  {
    id: 7,
    layout: "list",
    intro: "The bruises you can't see:",
    items: [
      "Your confidence.",
      "Your memory.",
      "Your trust in your own mind.",
      "Your belief that you were allowed to want more.",
    ],
    outro: "",
    tag: "Invisible Wounds",
  },
  {
    id: 8,
    layout: "quote",
    quote: "She didn't stay because she was weak.\n\nShe stayed because he spent three years convincing her that the problem was her perception.",
    tag: "The Rewrite",
  },
  {
    id: 9,
    layout: "split",
    top: "You kept asking\nwhat you did wrong.",
    bottom: "You never asked\nwhat he kept doing to you.",
    tag: "MK Parrish",
  },
  {
    id: 10,
    layout: "bold",
    lines: ["The", "rewrite"],
    sub: "doesn't start with leaving.\n\nIt starts with the moment you stop lying to yourself\nabout what is happening to you.",
    tag: "The Rewrite",
  },
  {
    id: 11,
    layout: "quote",
    quote: "She kept the peace.\nShe kept his secrets.\nShe kept everyone comfortable.\n\nThe only thing she didn't keep\nwas herself.",
    tag: "MK Parrish",
  },
  {
    id: 12,
    layout: "minimal",
    quote: "Nobody believed me.\n\nNot even me.\n\nThat was the point.",
    tag: "Suffering in Silence",
  },
];

// ─── Individual post layouts ──────────────────────────────────────────────────

function PostWrapper({ children, id }: { children: React.ReactNode; id: number }) {
  return (
    <div className="group relative">
      <p className="mb-3 font-mono text-xs tracking-[0.2em] text-iron">POST {String(id).padStart(2, "0")}</p>
      <div
        style={{
          width: "540px",
          height: "540px",
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {children}
      </div>
      <p className="mt-2 font-mono text-[0.6rem] tracking-[0.15em] text-graphite">
        Screenshot at 2× for 1080×1080
      </p>
    </div>
  );
}

function BrandMark() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "32px",
        left: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
      }}
    >
      <span
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "22px",
          letterSpacing: "0.08em",
          color: "#F2AFC6",
          opacity: 0.9,
        }}
      >
        MK PARRISH
      </span>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "11px",
          letterSpacing: "0.25em",
          color: "#6B6B6B",
          textTransform: "uppercase",
        }}
      >
        @mkparrish
      </span>
    </div>
  );
}

function TagBadge({ tag }: { tag: string }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "32px",
        left: "40px",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color: "#444444",
      }}
    >
      {tag}
    </div>
  );
}

function PetalLine({ pos = "bottom" }: { pos?: "bottom" | "top" | "left" }) {
  if (pos === "left") {
    return (
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "3px",
          background: "linear-gradient(to bottom, transparent, #F2AFC6, transparent)",
          opacity: 0.6,
        }}
      />
    );
  }
  return (
    <div
      style={{
        position: "absolute",
        bottom: "72px",
        left: "40px",
        right: "40px",
        height: "1px",
        background: "linear-gradient(to right, #F2AFC6, transparent)",
        opacity: 0.3,
      }}
    />
  );
}

// Layout: BOLD — large Bebas headline + body text
function BoldPost({ lines, sub, tag }: { lines: string[]; sub: string; tag: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#080808",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "120%",
          height: "80%",
          background: "radial-gradient(ellipse at top, rgba(242,175,198,0.08) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <TagBadge tag={tag} />
      <div style={{ marginTop: "20px" }}>
        {lines.map((line, i) => (
          <div
            key={i}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(72px, 13vw, 100px)",
              lineHeight: 0.88,
              letterSpacing: "0.01em",
              color: i === lines.length - 1 ? "#F2AFC6" : "#FFFFFF",
            }}
          >
            {line}
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: "28px",
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontSize: "15px",
          lineHeight: 1.8,
          color: "#9A9A9A",
          whiteSpace: "pre-line",
          maxWidth: "380px",
        }}
      >
        {sub}
      </div>
      <PetalLine />
      <BrandMark />
    </div>
  );
}

// Layout: QUOTE — full italic serif quote, centered
function QuotePost({ quote, tag }: { quote: string; tag: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#111111",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <TagBadge tag={tag} />
      {/* Large decorative quote mark */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "28px",
          fontFamily: "'Playfair Display', serif",
          fontSize: "160px",
          lineHeight: 1,
          color: "#F2AFC6",
          opacity: 0.07,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        &ldquo;
      </div>
      <PetalLine pos="left" />
      <div style={{ paddingLeft: "24px" }}>
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: "22px",
            lineHeight: 1.75,
            color: "#E8E0D5",
            whiteSpace: "pre-line",
          }}
        >
          {quote}
        </p>
      </div>
      <PetalLine />
      <BrandMark />
    </div>
  );
}

// Layout: LIST — intro + bullet items + outro
function ListPost({ intro, items, outro, tag }: { intro: string; items: string[]; outro: string; tag: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#1A1A1A",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          background: "radial-gradient(ellipse at right, rgba(242,175,198,0.04) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <TagBadge tag={tag} />
      <p
        style={{
          marginTop: "24px",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#6B6B6B",
          marginBottom: "20px",
        }}
      >
        {intro}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
            <span
              style={{
                marginTop: "9px",
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "#F2AFC6",
                flexShrink: 0,
              }}
            />
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "18px",
                lineHeight: 1.6,
                color: "#E8E0D5",
              }}
            >
              {item}
            </p>
          </div>
        ))}
      </div>
      {outro && (
        <p
          style={{
            marginTop: "24px",
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "15px",
            lineHeight: 1.7,
            color: "#9A9A9A",
            whiteSpace: "pre-line",
          }}
        >
          {outro}
        </p>
      )}
      <PetalLine />
      <BrandMark />
    </div>
  );
}

// Layout: SPLIT — two-part contrast quote
function SplitPost({ top, bottom, tag }: { top: string; bottom: string; tag: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#080808",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        textAlign: "center",
      }}
    >
      {/* Glow center */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, rgba(242,175,198,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <TagBadge tag={tag} />
      <p
        style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontWeight: 600,
          fontSize: "24px",
          lineHeight: 1.6,
          color: "#9A9A9A",
          whiteSpace: "pre-line",
          marginBottom: "20px",
        }}
      >
        {top}
      </p>
      {/* Divider */}
      <div
        style={{
          width: "60px",
          height: "1px",
          background: "#F2AFC6",
          opacity: 0.5,
          marginBottom: "20px",
        }}
      />
      <p
        style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: "26px",
          lineHeight: 1.5,
          color: "#F2AFC6",
          whiteSpace: "pre-line",
        }}
      >
        {bottom}
      </p>
      <PetalLine />
      <BrandMark />
    </div>
  );
}

// Layout: MINIMAL — sparse, luxury whitespace
function MinimalPost({ quote, tag }: { quote: string; tag: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#080808",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px",
        textAlign: "center",
      }}
    >
      <TagBadge tag={tag} />
      {/* Corner accents */}
      <div style={{ position: "absolute", top: "24px", right: "24px", width: "20px", height: "20px", borderTop: "1px solid rgba(242,175,198,0.3)", borderRight: "1px solid rgba(242,175,198,0.3)" }} />
      <div style={{ position: "absolute", bottom: "24px", left: "24px", width: "20px", height: "20px", borderBottom: "1px solid rgba(242,175,198,0.3)", borderLeft: "1px solid rgba(242,175,198,0.3)" }} />
      <p
        style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontWeight: 600,
          fontSize: "26px",
          lineHeight: 1.8,
          color: "#E8E0D5",
          whiteSpace: "pre-line",
        }}
      >
        {quote}
      </p>
      <BrandMark />
    </div>
  );
}

function renderPost(post: (typeof posts)[number]) {
  switch (post.layout) {
    case "bold":
      return <BoldPost lines={(post as any).lines} sub={(post as any).sub} tag={post.tag} />;
    case "quote":
      return <QuotePost quote={(post as any).quote} tag={post.tag} />;
    case "list":
      return <ListPost intro={(post as any).intro} items={(post as any).items} outro={(post as any).outro} tag={post.tag} />;
    case "split":
      return <SplitPost top={(post as any).top} bottom={(post as any).bottom} tag={post.tag} />;
    case "minimal":
      return <MinimalPost quote={(post as any).quote} tag={post.tag} />;
    default:
      return null;
  }
}

export default function PostsPage() {
  return (
    <div className="min-h-screen bg-void px-6 py-28 md:px-12">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">Brand Assets</p>
        <h1
          className="mt-4 font-display uppercase tracking-[0.02em] text-white"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.88 }}
        >
          Instagram
          <br />
          <span className="text-petal">Posts</span>
        </h1>
        <p className="mt-6 font-body text-sm font-light leading-7 text-smoke" style={{ maxWidth: "52ch" }}>
          Each card is rendered at display size. To export at 1080×1080: right-click → Inspect → set device width to 1080px, then screenshot. Or use browser zoom at 200% and screenshot the 540px card.
        </p>

        <div className="mt-4 border-t border-graphite pt-4">
          <p className="font-mono text-[0.65rem] tracking-[0.2em] text-iron">
            {posts.length} POSTS &middot; 5 LAYOUTS &middot; BRAND COLORS
          </p>
        </div>

        {/* Posts grid */}
        <div
          className="mt-16"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, 540px)",
            gap: "48px",
          }}
        >
          {posts.map((post) => (
            <PostWrapper key={post.id} id={post.id}>
              {renderPost(post)}
            </PostWrapper>
          ))}
        </div>

        {/* Export note */}
        <div className="mt-20 border-t border-graphite pt-8">
          <p className="font-body text-xs font-light leading-7 text-iron" style={{ maxWidth: "60ch" }}>
            <span className="font-semibold text-ash">To export for Instagram:</span> Open browser DevTools → toggle device toolbar → set width to 1080px → screenshot each card individually. For best results use a browser extension like GoFullPage or Nimbus Screenshot.
          </p>
        </div>
      </div>
    </div>
  );
}
