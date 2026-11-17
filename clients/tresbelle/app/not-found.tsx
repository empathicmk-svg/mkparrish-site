import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col items-start justify-center pt-24">
      <p className="eyebrow mb-4">404</p>
      <h1 className="display text-[clamp(4rem,14vw,10rem)]">Not here</h1>
      <p className="serif-italic mt-4 text-2xl text-[var(--color-smoke)]">This page doesn&apos;t exist, but the menu does.</p>
      <Link href="/" className="btn btn-primary mt-10">
        Back home
      </Link>
    </section>
  );
}
