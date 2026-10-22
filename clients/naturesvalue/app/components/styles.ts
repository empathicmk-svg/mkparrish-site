export type ButtonVariant = "primary" | "accent" | "ghost" | "light" | "outline-light";

export function btn(variant: ButtonVariant = "primary") {
  const styles = {
    primary: "bg-forest text-white hover:bg-moss",
    accent: "bg-lime text-forest hover:bg-white shadow-lg shadow-lime/20",
    ghost: "border border-forest/25 text-forest hover:border-forest hover:bg-forest/5",
    light: "bg-white text-forest hover:bg-lime",
    "outline-light": "border border-white/40 text-white hover:bg-white/10",
  }[variant];
  return `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 active:translate-y-0 ${styles}`;
}
