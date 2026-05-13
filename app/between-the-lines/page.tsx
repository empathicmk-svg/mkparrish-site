export const metadata = {
  title: 'Between the Lines — MK Parrish',
  description: 'Free 10-page brand voice audit. Written. Not generated.',
};

export default function Page() {
  return (
    <main className="mx-auto max-w-[900px] px-6 py-16 text-pearl">
      <h1 className="font-display text-4xl uppercase tracking-[0.12em]">Between the Lines</h1>
      <p className="mt-4 text-ash text-sm uppercase tracking-[0.12em]">Free 10-page brand voice audit. Written. Not generated.</p>

      <p className="mt-8 text-lg text-pearl">
        Send your homepage and what you’re trying to sell, and I’ll tell you what’s leaking.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        <a
          className="inline-flex items-center justify-center rounded-sm bg-pearl px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-void hover:bg-graphite"
          href="mailto:mkp414@icloud.com?subject=Between%20the%20Lines%20Audit&body=Homepage%20URL:%20%0AFocus%20area:%20">
          Request the audit
        </a>
        <a
          className="inline-flex items-center justify-center rounded-sm border border-pearl px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-pearl hover:border-graphite"
          href="https://mkparrish.substack.com/embed"
          target="_blank"
          rel="noreferrer"
        >
          Join the newsletter
        </a>
      </div>

      <div className="mt-10 border-t border-graphite pt-8 text-sm text-ash">
        <p>
          Optional: swap the embed URL once you have the real newsletter embed, or hook this button up to a form (Tally/Typeform).
        </p>
      </div>
    </main>
  );
}
