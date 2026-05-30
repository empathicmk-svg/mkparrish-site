import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quotes — MK Parrish",
  description: "Words from theologians, philosophers, and writers that refuse to stay quiet.",
};

// ─── Quote data ───────────────────────────────────────────────────────────────

const quotes = [
  {
    id: 1,
    quote: "You are not accidental. The world could not have happened without you.",
    author: "Rainer Maria Rilke",
    work: "Letters to a Young Poet",
    category: "Identity",
    layout: "bold",
  },
  {
    id: 2,
    quote: "If you ask me what I came to do in this world, I, an artist, will answer you: I am here to live out loud.",
    author: "Émile Zola",
    work: "",
    category: "Voice",
    layout: "pullquote",
  },
  {
    id: 3,
    quote: "You have to decide what your highest priorities are and have the courage — pleasantly, smilingly, non-apologetically — to say no to other things. And the way you do that is by having a bigger yes burning inside.",
    author: "Stephen Covey",
    work: "The 7 Habits of Highly Effective People",
    category: "Boundaries",
    layout: "standard",
  },
  {
    id: 4,
    quote: "The only way out of the labyrinth of suffering is to forgive.",
    author: "John Green",
    work: "Looking for Alaska",
    category: "Healing",
    layout: "minimal",
  },
  {
    id: 5,
    quote: "I am not afraid of storms, for I am learning how to sail my ship.",
    author: "Louisa May Alcott",
    work: "Little Women",
    category: "Courage",
    layout: "split",
    top: "I am not afraid of storms,",
    bottom: "for I am learning how to sail my ship.",
  },
  {
    id: 6,
    quote: "Darkness cannot drive out darkness; only light can do that. Hate cannot drive out hate; only love can do that.",
    author: "Martin Luther King Jr.",
    work: "Strength to Love",
    category: "Faith",
    layout: "pullquote",
  },
  {
    id: 7,
    quote: "One is not born, but rather becomes, a woman.",
    author: "Simone de Beauvoir",
    work: "The Second Sex",
    category: "Identity",
    layout: "bold-line",
  },
  {
    id: 8,
    quote: "The most common form of despair is not being who you are.",
    author: "Søren Kierkegaard",
    work: "",
    category: "Authenticity",
    layout: "minimal",
  },
  {
    id: 10,
    quote: "You were made for a world within a world within a world — and none of them require your apology.",
    author: "Howard Thurman",
    work: "Jesus and the Disinherited",
    category: "Liberation",
    layout: "pullquote",
  },
  {
    id: 11,
    quote: "You are allowed to be both a masterpiece and a work in progress simultaneously.",
    author: "Sophia Bush",
    work: "",
    category: "Growth",
    layout: "minimal",
  },
  {
    id: 12,
    quote: "We are called to be architects of the future, not its victims.",
    author: "Buckminster Fuller",
    work: "",
    category: "Reinvention",
    layout: "standard",
  },
  {
    id: 13,
    quote: "Until the lion learns to write, every story will glorify the hunter.",
    author: "African Proverb",
    work: "",
    category: "Voice",
    layout: "bold-line",
  },
  {
    id: 14,
    quote: "Silence is the language of God. All else is poor translation.",
    author: "Rumi",
    work: "",
    category: "Spirituality",
    layout: "minimal",
  },
  {
    id: 15,
    quote: "Not everything that is faced can be changed, but nothing can be changed until it is faced.",
    author: "James Baldwin",
    work: "",
    category: "Truth",
    layout: "split",
    top: "Not everything that is faced can be changed,",
    bottom: "but nothing can be changed until it is faced.",
  },
  {
    id: 16,
    quote: "To love at all is to be vulnerable. Love anything and your heart will be wrung and possibly broken. If you want to make sure of keeping it intact you must give it to no one, not even an animal.",
    author: "C.S. Lewis",
    work: "The Four Loves",
    category: "Love",
    layout: "standard",
  },
  {
    id: 17,
    quote: "She was a girl who knew how to be happy even when she was sad. And that's important.",
    author: "Marilyn Monroe",
    work: "",
    category: "Resilience",
    layout: "minimal",
  },
  {
    id: 18,
    quote: "The function of freedom is to free someone else.",
    author: "Toni Morrison",
    work: "",
    category: "Liberation",
    layout: "bold-line",
  },
  {
    id: 20,
    quote: "The cave you fear to enter holds the treasure you seek.",
    author: "Joseph Campbell",
    work: "",
    category: "Courage",
    layout: "pullquote",
  },
  {
    id: 21,
    quote: "The most important kind of freedom is to be what you really are. You trade in your reality for a role.",
    author: "Jim Morrison",
    work: "",
    category: "Authenticity",
    layout: "standard",
  },
  {
    id: 22,
    quote: "I am no longer accepting the things I cannot change. I am changing the things I cannot accept.",
    author: "Angela Davis",
    work: "",
    category: "Reinvention",
    layout: "bold-line",
  },
  {
    id: 24,
    quote: "Grace is the gift of feeling sure that our future, even our dying, is more presence, not less.",
    author: "Simone Weil",
    work: "",
    category: "Faith",
    layout: "minimal",
  },
  {
    id: 25,
    quote: "There is no greater agony than bearing an untold story inside you.",
    author: "Zora Neale Hurston",
    work: "Dust Tracks on a Road",
    category: "Voice",
    layout: "bold-line",
  },
  {
    id: 26,
    quote: "It is never too late to be what you might have been.",
    author: "George Eliot",
    work: "",
    category: "Reinvention",
    layout: "minimal",
  },
  {
    id: 27,
    quote: "The wound is the place where the Light enters you.",
    author: "Rumi",
    work: "",
    category: "Healing",
    layout: "pullquote",
  },
  {
    id: 28,
    quote: "I am no bird; and no net ensnares me: I am a free human being with an independent will.",
    author: "Charlotte Brontë",
    work: "Jane Eyre",
    category: "Liberation",
    layout: "standard",
  },
  {
    id: 30,
    quote: "The privilege of a lifetime is to become who you truly are.",
    author: "Carl Jung",
    work: "",
    category: "Identity",
    layout: "pullquote",
  },
  {
    id: 32,
    quote: "I took a deep breath and listened to the old brag of my heart: I am, I am, I am.",
    author: "Sylvia Plath",
    work: "The Bell Jar",
    category: "Identity",
    layout: "split",
    top: "I took a deep breath and listened to the old brag of my heart:",
    bottom: "I am, I am, I am.",
  },
  {
    id: 33,
    quote: "No one can make you feel inferior without your consent.",
    author: "Eleanor Roosevelt",
    work: "",
    category: "Liberation",
    layout: "bold-line",
  },
  {
    id: 34,
    quote: "It is better to be hated for what you are than to be loved for what you are not.",
    author: "André Gide",
    work: "",
    category: "Authenticity",
    layout: "pullquote",
  },
  {
    id: 35,
    quote: "Your pain is the breaking of the shell that encloses your understanding.",
    author: "Khalil Gibran",
    work: "The Prophet",
    category: "Healing",
    layout: "standard",
  },
  {
    id: 36,
    quote: "The longest journey is the journey inward.",
    author: "Dag Hammarskjöld",
    work: "Markings",
    category: "Spirituality",
    layout: "minimal",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const categoryColors: Record<string, string> = {
  Identity:     "#F2AFC6",
  Voice:        "#E0869F",
  Courage:      "#C75B78",
  Faith:        "#F2AFC6",
  Healing:      "#D4A0B5",
  Reinvention:  "#E0869F",
  Liberation:   "#C75B78",
  Authenticity: "#F2AFC6",
  Spirituality: "#F2AFC6",
  Boundaries:   "#B09090",
  Growth:       "#E0869F",
  Truth:        "#C75B78",
  Love:         "#F2AFC6",
  Resilience:   "#D4A0B5",
};

function getCategoryColor(cat: string) {
  return categoryColors[cat] ?? "#F2AFC6";
}

// ─── Card Components ──────────────────────────────────────────────────────────

function Attribution({ author, work, category }: { author: string; work: string; category: string }) {
  return (
    <div
      style={{
        marginTop: "auto",
        paddingTop: "20px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: "12px",
      }}
    >
      <div>
        <p
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "14px",
            letterSpacing: "0.08em",
            color: "#F0F0EE",
            lineHeight: 1,
          }}
        >
          {author}
        </p>
        {work && (
          <p
            style={{
              marginTop: "4px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              letterSpacing: "0.12em",
              color: "#4A4A4A",
              fontStyle: "italic",
            }}
          >
            {work}
          </p>
        )}
      </div>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "9px",
          fontWeight: 700,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: getCategoryColor(category),
          whiteSpace: "nowrap",
          opacity: 0.8,
        }}
      >
        {category}
      </span>
    </div>
  );
}

function QuoteCardStandard({ quote, author, work, category }: { quote: string; author: string; work: string; category: string }) {
  return (
    <div
      style={{
        background: "#111111",
        border: "1px solid #1E1E1E",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        minHeight: "260px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-10px",
          left: "20px",
          fontFamily: "'Playfair Display', serif",
          fontSize: "120px",
          lineHeight: 1,
          color: getCategoryColor(category),
          opacity: 0.05,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        &ldquo;
      </div>
      <p
        style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontSize: "15px",
          lineHeight: 1.85,
          color: "#D0C8C0",
          fontWeight: 400,
          position: "relative",
        }}
      >
        &ldquo;{quote}&rdquo;
      </p>
      <Attribution author={author} work={work} category={category} />
    </div>
  );
}

function QuoteCardPullquote({ quote, author, work, category }: { quote: string; author: string; work: string; category: string }) {
  return (
    <div
      style={{
        background: "#080808",
        borderLeft: `3px solid ${getCategoryColor(category)}`,
        padding: "32px 32px 32px 28px",
        display: "flex",
        flexDirection: "column",
        minHeight: "260px",
        position: "relative",
      }}
    >
      <p
        style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontWeight: 600,
          fontSize: "18px",
          lineHeight: 1.75,
          color: "#F0F0EE",
        }}
      >
        {quote}
      </p>
      <Attribution author={author} work={work} category={category} />
    </div>
  );
}

function QuoteCardBoldLine({ quote, author, work, category }: { quote: string; author: string; work: string; category: string }) {
  return (
    <div
      style={{
        background: "#080808",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        minHeight: "260px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at top left, ${getCategoryColor(category)}18 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />
      <p
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(2.2rem, 4vw, 3rem)",
          lineHeight: 0.92,
          letterSpacing: "0.015em",
          color: "#FFFFFF",
          textTransform: "uppercase",
          position: "relative",
        }}
      >
        {quote.split(" ").map((word, i, arr) =>
          i === arr.length - 1 ? (
            <span key={i} style={{ color: getCategoryColor(category) }}>{word} </span>
          ) : (
            <span key={i}>{word} </span>
          )
        )}
      </p>
      <Attribution author={author} work={work} category={category} />
    </div>
  );
}

function QuoteCardMinimal({ quote, author, work, category }: { quote: string; author: string; work: string; category: string }) {
  return (
    <div
      style={{
        background: "#1A1A1A",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        minHeight: "220px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "24px",
          right: "24px",
          width: "18px",
          height: "18px",
          borderTop: `1px solid ${getCategoryColor(category)}40`,
          borderRight: `1px solid ${getCategoryColor(category)}40`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "24px",
          left: "24px",
          width: "18px",
          height: "18px",
          borderBottom: `1px solid ${getCategoryColor(category)}40`,
          borderLeft: `1px solid ${getCategoryColor(category)}40`,
        }}
      />
      <p
        style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontSize: "15px",
          lineHeight: 1.9,
          color: "#C0B8B0",
          fontWeight: 500,
        }}
      >
        {quote}
      </p>
      <Attribution author={author} work={work} category={category} />
    </div>
  );
}

function QuoteCardSplit({ top, bottom, author, work, category }: { top: string; bottom: string; author: string; work: string; category: string }) {
  return (
    <div
      style={{
        background: "#080808",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        minHeight: "260px",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, rgba(242,175,198,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <p
        style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontSize: "17px",
          lineHeight: 1.7,
          color: "#7A7A7A",
          marginBottom: "16px",
        }}
      >
        {top}
      </p>
      <div
        style={{
          width: "40px",
          height: "1px",
          background: getCategoryColor(category),
          opacity: 0.6,
          marginBottom: "16px",
        }}
      />
      <p
        style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: "19px",
          lineHeight: 1.6,
          color: getCategoryColor(category),
          marginBottom: "24px",
        }}
      >
        {bottom}
      </p>
      <Attribution author={author} work={work} category={category} />
    </div>
  );
}

function QuoteCardVerse({ quote, author, work, category }: { quote: string; author: string; work: string; category: string }) {
  return (
    <div
      style={{
        background: "#0D0D0D",
        border: `1px solid ${getCategoryColor(category)}22`,
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        minHeight: "220px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${getCategoryColor(category)}, transparent)`,
          opacity: 0.4,
        }}
      />
      <p
        style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontSize: "16px",
          lineHeight: 1.85,
          color: "#E8E0D5",
          fontWeight: 400,
        }}
      >
        {quote}
      </p>
      <Attribution author={author} work={work} category={category} />
    </div>
  );
}

function renderCard(q: (typeof quotes)[number]) {
  switch (q.layout) {
    case "pullquote":
      return <QuoteCardPullquote quote={q.quote} author={q.author} work={q.work} category={q.category} />;
    case "bold-line":
      return <QuoteCardBoldLine quote={q.quote} author={q.author} work={q.work} category={q.category} />;
    case "minimal":
      return <QuoteCardMinimal quote={q.quote} author={q.author} work={q.work} category={q.category} />;
    case "split":
      return <QuoteCardSplit top={(q as any).top} bottom={(q as any).bottom} author={q.author} work={q.work} category={q.category} />;
    case "verse":
      return <QuoteCardVerse quote={q.quote} author={q.author} work={q.work} category={q.category} />;
    default:
      return <QuoteCardStandard quote={q.quote} author={q.author} work={q.work} category={q.category} />;
  }
}

const categories = Array.from(new Set(quotes.map((q) => q.category))).sort();

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function QuotesPage() {
  return (
    <div className="min-h-screen bg-void px-6 py-28 md:px-12">
      <div className="mx-auto max-w-[1400px]">

        {/* Header */}
        <p className="font-body text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-ash">Words Worth Keeping</p>
        <h1
          className="mt-4 font-display uppercase tracking-[0.02em] text-white"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.88 }}
        >
          Quotes That
          <br />
          <span className="text-petal">Refuse to Be Quiet</span>
        </h1>
        <p className="mt-6 font-body text-sm font-light leading-7 text-smoke" style={{ maxWidth: "56ch" }}>
          Theologians, philosophers, writers, and prophets — people who put language around things most of us only feel. Collected here because good words deserve to outlast the moment they were written in.
        </p>

        {/* Category filter row */}
        <div className="mt-8 flex flex-wrap gap-2 border-t border-graphite pt-6">
          {categories.map((cat) => (
            <span
              key={cat}
              style={{ borderColor: `${getCategoryColor(cat)}30` }}
              className="border px-3 py-1 font-body text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-ash"
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="mt-3 border-t border-graphite pt-4">
          <p className="font-mono text-[0.65rem] tracking-[0.2em] text-iron">
            {quotes.length} QUOTES &middot; THEOLOGIANS, PHILOSOPHERS &amp; WRITERS
          </p>
        </div>

        {/* Masonry-style grid */}
        <div
          className="mt-14"
          style={{
            columns: "360px",
            columnGap: "20px",
          }}
        >
          {quotes.map((q) => (
            <div
              key={q.id}
              style={{
                breakInside: "avoid",
                marginBottom: "20px",
              }}
            >
              {renderCard(q)}
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 border-t border-graphite pt-8">
          <p className="font-body text-xs font-light leading-7 text-iron" style={{ maxWidth: "60ch" }}>
            <span className="font-semibold text-ash">A living collection.</span> These words are returned to often — in client work, in essays, in the thinking that happens before the writing. If something here stays with you, that's the point.
          </p>
        </div>

      </div>
    </div>
  );
}
