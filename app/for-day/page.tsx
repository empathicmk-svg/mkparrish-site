import type { Metadata } from "next";

const venmoHandle = "James-Cos";
const venmoNote = encodeURIComponent("For Jay, Theresa, and family");
const venmoUrl = `https://venmo.com/?txn=pay&recipients=${venmoHandle}&note=${venmoNote}`;
const obituaryUrl =
  "https://www.darienzofuneralhome.com/obituaries/Theresa-Cosentino?obId=48234281";
const pageUrl = "https://jaydonation.vercel.app";

export const metadata: Metadata = {
  title: "For Jay and the Cosentino Family | MK Parrish",
  description:
    "A heartfelt request from MK Parrish to support Jay and his family in memory of Theresa Cosentino.",
  openGraph: {
    title: "For Jay and the Cosentino Family",
    description:
      "Please support Jay and his family during this time of grief. Any amount helps.",
    url: pageUrl,
    siteName: "MK Parrish",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "For Jay and the Cosentino Family",
    description:
      "Please support Jay and his family during this time of grief. Any amount helps.",
  },
};

export default function ForDayPage() {
  return (
    <main className="day-page min-h-screen bg-[#fbf6f1] text-[#261f1d]">
      <style>{`
        .day-page {
          background: #fbf6f1;
          color: #261f1d;
        }

        .day-page p {
          color: #55413d;
          max-width: none;
        }

        .day-page section:first-of-type > div:nth-child(2) {
          width: 100%;
          max-width: 1280px;
          min-height: auto;
          margin: 0 auto;
          padding: clamp(4.5rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem);
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(320px, 0.82fr);
          gap: clamp(2rem, 5vw, 5rem);
          align-items: center;
        }

        .day-page h1 {
          font-size: clamp(3.4rem, 8vw, 7rem);
          line-height: 0.94;
          letter-spacing: 0;
          padding-left: 0.04em;
        }

        .day-page h2 {
          font-size: clamp(2.6rem, 6.5vw, 5.8rem);
          line-height: 0.98;
          letter-spacing: 0;
          padding-left: 0.04em;
        }

        .day-page aside {
          color: #261f1d;
        }

        .day-page aside p,
        .day-page .day-note {
          color: #55413d;
        }

        .day-page .day-muted {
          color: #8c5b61;
        }

        .day-page .day-dark p {
          color: #eadfd6;
        }

        .day-page .day-dark {
          padding: clamp(4rem, 7vw, 5.5rem) clamp(1.75rem, 5vw, 4rem);
          overflow: hidden;
        }

        .day-page .day-dark > div {
          max-width: 1280px;
          margin: 0 auto;
        }

        .day-page .day-dark .day-callout {
          color: #ffffff;
        }

        .day-page a[href*="venmo.com"] {
          color: #ffffff;
        }

        .day-page a[href*="darienzofuneralhome.com"] {
          color: #b76e79;
        }

        .day-page .day-dark a[href*="venmo.com"] {
          color: #261f1d;
        }

        @media (max-width: 860px) {
          .day-page section:first-of-type > div:nth-child(2) {
            grid-template-columns: 1fr;
            padding-top: 3.5rem;
            padding-bottom: 3.5rem;
          }

          .day-page h1 {
            font-size: clamp(3rem, 16vw, 4.6rem);
          }

          .day-page h2 {
            font-size: clamp(2.4rem, 13vw, 4rem);
          }

          .day-page aside {
            margin-top: 1rem;
          }

          .day-page .day-dark {
            padding: 3.5rem 1.75rem;
          }
        }

        @media (max-width: 640px) {
          .day-page a {
            width: 100%;
          }
        }
      `}</style>
      <section className="relative overflow-hidden border-b border-[#eadfd6] bg-[#fbf6f1]">
        <div className="absolute inset-x-0 top-0 h-2 bg-[#b76e79]" />
        <div className="mx-auto grid min-h-[92vh] max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-[1.05fr_0.95fr] md:px-10 lg:px-14">
          <div>
            <p className="day-muted mb-5 font-mono text-xs font-semibold uppercase tracking-[0.28em]">
              In memory of Theresa Cosentino
            </p>
            <h1 className="max-w-4xl font-serif text-[clamp(3.2rem,9vw,8.5rem)] font-black italic leading-[0.88] tracking-normal text-[#261f1d]">
              For Jay, with love.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 md:text-xl">
              My best friend Jay has lost his mother, Theresa. There are no
              perfect words for grief this big, but there is one thing we can do
              right now: help carry a little of the weight around him.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={venmoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center border-2 border-[#261f1d] bg-[#261f1d] px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:border-[#b76e79] hover:bg-[#b76e79]"
              >
                Donate on Venmo
              </a>
              <a
                href={obituaryUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center border border-[#cdbcb4] px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#261f1d] transition hover:border-[#b76e79] hover:text-[#8c3d49]"
              >
                Funeral Arrangements
              </a>
            </div>
            <p className="day-note mt-4 max-w-xl text-sm leading-6">
              If Venmo does not open directly, search this handle in Venmo:
              {" "}
              <span className="font-bold text-[#261f1d]">@{venmoHandle}</span>.
            </p>
          </div>

          <aside className="border border-[#e2d2c8] bg-white/70 p-6 shadow-[0_30px_80px_rgba(69,47,40,0.14)] md:p-8">
            <div className="border-b border-[#eadfd6] pb-6">
              <p className="day-muted font-mono text-xs font-semibold uppercase tracking-[0.24em]">
                Theresa Cosentino
              </p>
              <p className="mt-3 font-serif text-3xl font-bold italic text-[#261f1d]">
                March 25, 1963 to April 26, 2026
              </p>
            </div>
            <p className="mt-6 text-lg leading-8">
              Jay is the kind of person who shows up for the people he loves.
              Now his family is moving through the unbearable first days after
              losing Theresa, while also facing the real costs that come with
              illness, arrangements, and life after a loss.
            </p>
            <p className="mt-5 text-lg leading-8">
              Donations will help with Behcet&apos;s help aid and support the
              family as they grieve. Nothing is too small. Five dollars, ten
              dollars, a note, a share, all of it matters when a family is in
              this much pain.
            </p>
          </aside>
        </div>
      </section>

      <section className="day-dark bg-[#261f1d] px-6 py-16 text-white md:px-10 lg:px-14">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-[#e8b6be]">
              From MK Parrish
            </p>
            <h2 className="mt-4 font-serif text-4xl font-black italic leading-tight md:text-6xl">
              My sincere condolences.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-[#eadfd6]">
            <p>
              Jay, I love you. I am so sorry. I wish there were words that
              could make any of this less cruel or less heavy. There are not.
              But I hope you feel, in every message and every donation, that
              you are not alone in this.
            </p>
            <p>
              To anyone who has this link: please give whatever you can. The
              family is in a very difficult time, carrying grief and financial
              pressure at once. Your donation does not have to be large to be
              meaningful. It just has to be given with care.
            </p>
            <p className="day-callout font-serif text-2xl font-bold italic leading-9">
              If you can help, please do it now. Send what you can, share this
              page, and keep Jay and his family close in your heart.
            </p>
            <div className="pt-2">
              <a
                href={venmoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center border-2 border-[#e8b6be] bg-[#e8b6be] px-7 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#261f1d] transition hover:border-white hover:bg-white"
              >
                Send Support to Jay
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
