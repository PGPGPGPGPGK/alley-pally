"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import type { NallagandlaTile } from "./_data";

/**
 * The four ways to spend the day at Nallagandla, as expandable cards.
 *
 * Pattern: a disclosure, not a tab set or a custom widget. Each card's whole preview state
 * — photograph, title, teaser and chevron — is one `<button>` carrying `aria-expanded` and
 * `aria-controls`, so a tap anywhere on the card opens it, Enter and Space work for free,
 * and a screen reader announces the state. The expanded body sits outside that button,
 * which is what lets it hold a real link without nesting one interactive element inside
 * another.
 *
 * Opening is independent per card: reading about the Backyard should not close the Quiet
 * Studio. Nothing is open on first paint, so the section stays compact.
 *
 * Motion: the panel animates with a `grid-template-rows` 0fr → 1fr transition, which
 * animates to the content's real height without measuring it in JavaScript. Under
 * `prefers-reduced-motion` the transition is dropped and the panel simply appears.
 */
export function ExpandableTiles({ tiles }: { tiles: NallagandlaTile[] }) {
  return (
    <ul className="grid gap-3 sm:gap-4 md:grid-cols-2">
      {tiles.map((tile) => (
        <li key={tile.id}>
          <ExpandableTile tile={tile} />
        </li>
      ))}
    </ul>
  );
}

function ExpandableTile({ tile }: { tile: NallagandlaTile }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <article
      className={`group h-full overflow-hidden rounded-2xl bg-pally-white ring-1 transition-shadow ${
        open ? "ring-pally-accent/60 shadow-sm" : "ring-pally-sand/70 hover:ring-pally-accent/50"
      }`}
    >
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="block w-full cursor-pointer text-left focus-visible:outline-none"
        >
          <span className="relative block aspect-[5/3] w-full overflow-hidden bg-pally-warm">
            <Image
              src={tile.image.src}
              alt={tile.image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 520px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
            />
          </span>

          <span className="flex items-start gap-3 p-4">
            <span className="min-w-0 flex-1">
              <span className="block font-heading text-[1.2rem] leading-tight text-pally-brown-dark">
                {tile.title}
              </span>
              <span className="mt-1 block text-[13px] leading-snug text-pally-brown-light">
                {tile.teaser}
              </span>
            </span>

            {/* The affordance. Decorative: the button already announces its state. */}
            <span
              aria-hidden
              className={`mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                open
                  ? "bg-pally-accent text-white"
                  : "bg-pally-accent-bg text-pally-brown-dark group-hover:bg-pally-accent group-hover:text-white"
              }`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-300 motion-reduce:transition-none ${
                  open ? "rotate-180" : ""
                }`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </span>
        </button>
      </h3>

      {/* 0fr → 1fr animates to the real content height without measuring it. */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div id={panelId} role="region" aria-label={tile.title} className="px-4 pb-4">
            <div className="border-t border-pally-sand pt-3">
              {/* Who the room is for, so someone can pick a corner before they arrive. */}
              {tile.suitedFor && (
                <p className="mb-2.5 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-pally-accent">
                  {tile.suitedFor}
                </p>
              )}
              {tile.body.map((p) => (
                <p key={p} className="mt-2 text-[13.5px] leading-relaxed text-pally-brown-light first:mt-0">
                  {p}
                </p>
              ))}
              {tile.link && (
                <Link
                  href={tile.link.href}
                  tabIndex={open ? undefined : -1}
                  className="mt-3 inline-flex min-h-11 items-center gap-1 text-[13px] font-semibold text-pally-green hover:gap-2 motion-reduce:hover:gap-1"
                >
                  {tile.link.label} <span aria-hidden>→</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
