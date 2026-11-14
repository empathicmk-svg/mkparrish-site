import { ButtonLink, Container } from "./components/ui";

export default function NotFound() {
  return (
    <Container className="py-28 text-center">
      <h1 className="font-display text-4xl font-semibold text-forest">Page not found</h1>
      <p className="mt-4 text-stone">The page you&apos;re looking for has moved or doesn&apos;t exist.</p>
      <div className="mt-8">
        <ButtonLink href="/">Back to home</ButtonLink>
      </div>
    </Container>
  );
}
