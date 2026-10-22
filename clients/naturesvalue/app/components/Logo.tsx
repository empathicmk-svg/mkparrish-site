// Placeholder wordmark until the client supplies their logo files.
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="16" className="fill-lime" />
        <path
          d="M10 22c0-7 5-12 13-13-1 8-6 13-13 13Zm0 0 7-7"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          className="stroke-forest"
        />
      </svg>
      <span className={`font-display text-xl font-semibold tracking-tight ${light ? "text-white" : "text-forest"}`}>
        Nature&apos;s Value
      </span>
    </span>
  );
}
