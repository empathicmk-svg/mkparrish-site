"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CornerDownLeft, Search } from "lucide-react";
import Modal from "./Modal";
import { PAGES } from "../content/site";

// Site search popup. Opens with Ctrl/Cmd+K or "/", and from the header button.
export default function SearchPalette({
  open,
  onClose,
  onOpen,
}: {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const typing = e.target instanceof HTMLElement && e.target.closest("input, textarea, select");
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        onOpen();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onOpen]);

  const q = query.trim().toLowerCase();
  const results = PAGES.filter((p) => `${p.label} ${p.group}`.toLowerCase().includes(q));

  function go(href: string) {
    onClose();
    router.push(href);
  }

  return (
    <Modal open={open} onClose={onClose} labelledBy="search-title">
      <h2 id="search-title" className="sr-only">
        Search the site
      </h2>
      <div className="flex items-center gap-3 border-b border-line px-5 py-4 pr-16">
        <Search size={20} className="text-leaf" aria-hidden="true" />
        <input
          data-autofocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, results.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, 0));
            } else if (e.key === "Enter" && results[active]) {
              e.preventDefault();
              go(results[active].href);
            }
          }}
          placeholder="Search capsules, private label, quality…"
          aria-label="Search pages"
          aria-controls="search-results"
          aria-activedescendant={results[active] ? `search-${active}` : undefined}
          className="w-full bg-transparent text-lg text-ink placeholder:text-stone/60 focus:outline-none"
        />
      </div>
      <ul id="search-results" role="listbox" className="max-h-[50vh] overflow-y-auto p-2">
        {results.length === 0 && <li className="px-4 py-8 text-center text-stone">No pages match &ldquo;{query}&rdquo;.</li>}
        {results.map((p, i) => (
          <li
            key={p.href}
            id={`search-${i}`}
            role="option"
            aria-selected={i === active}
            onMouseEnter={() => setActive(i)}
            onClick={() => go(p.href)}
            className="flex cursor-pointer items-center justify-between rounded-xl px-4 py-3 aria-selected:bg-sage"
          >
            <span>
              <span className="font-medium text-forest">{p.label}</span>
              <span className="ml-2 text-xs text-stone">{p.group}</span>
            </span>
            {i === active && <CornerDownLeft size={16} className="text-leaf" aria-hidden="true" />}
          </li>
        ))}
      </ul>
      <p className="border-t border-line px-5 py-3 text-xs text-stone">
        <kbd className="rounded border border-line px-1.5">↑</kbd> <kbd className="rounded border border-line px-1.5">↓</kbd> to
        move, <kbd className="rounded border border-line px-1.5">Enter</kbd> to open,{" "}
        <kbd className="rounded border border-line px-1.5">Esc</kbd> to close
      </p>
    </Modal>
  );
}
