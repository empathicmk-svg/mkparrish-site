// Simple illustrations for each dosage form, drawn in brand colors.
export function FormIcon({ slug, large = false }: { slug: string; large?: boolean }) {
  const size = large ? 120 : 72;
  const common = { width: size, height: size, viewBox: "0 0 80 80", "aria-hidden": true } as const;
  switch (slug) {
    case "capsules":
      return (
        <svg {...common}>
          <g transform="rotate(-35 40 40)">
            <rect x="14" y="28" width="52" height="24" rx="12" className="fill-white stroke-forest" strokeWidth="2.5" />
            <path d="M40 28h14a12 12 0 0 1 0 24H40Z" className="fill-leaf" />
          </g>
          <circle cx="62" cy="18" r="4" className="fill-citrus" />
        </svg>
      );
    case "tablets":
      return (
        <svg {...common}>
          <ellipse cx="34" cy="44" rx="20" ry="20" className="fill-white stroke-forest" strokeWidth="2.5" />
          <path d="M20 44h28" className="stroke-forest" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="56" cy="30" rx="13" ry="13" className="fill-lime stroke-forest" strokeWidth="2.5" />
        </svg>
      );
    case "liquid-caps":
      return (
        <svg {...common}>
          <ellipse cx="40" cy="40" rx="18" ry="26" transform="rotate(30 40 40)" className="fill-citrus/80 stroke-forest" strokeWidth="2.5" />
          <ellipse cx="34" cy="32" rx="4" ry="8" transform="rotate(30 34 32)" className="fill-white/70" />
          <circle cx="62" cy="58" r="5" className="fill-leaf" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M22 30h36l-4 36H26Z" className="fill-white stroke-forest" strokeWidth="2.5" strokeLinejoin="round" />
          <rect x="18" y="22" width="44" height="10" rx="3" className="fill-leaf" />
          <circle cx="34" cy="50" r="3" className="fill-lime" />
          <circle cx="44" cy="56" r="2.5" className="fill-citrus" />
          <circle cx="46" cy="44" r="2" className="fill-lime" />
        </svg>
      );
  }
}
