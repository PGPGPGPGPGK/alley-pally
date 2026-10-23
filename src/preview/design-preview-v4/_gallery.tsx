"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./_motion";

export type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
  /**
   * A reserved slot for a photograph that does not exist yet. The gallery draws an empty
   * frame instead of an image, so the gap is visible to whoever can fill it rather than
   * quietly absent. Drop the file at `src` and delete this field — nothing else changes.
   */
  pending?: string;
};

/**
 * One large photograph with selectable thumbnails.
 *
 * It replaces a flat row of equally sized food pictures, which showed everything at once
 * and read as a contact sheet rather than an invitation. Here one image is the subject and
 * the rest are a way to move between them.
 *
 * Behaviour the brief asked for, and why each is done this way:
 *
 *   - the whole thumbnail strip is a single `radiogroup`, so a screen reader announces
 *     "3 of 7" rather than seven unrelated buttons, and Left/Right move the selection the
 *     way they do in any native radio group.
 *   - the large image is a fixed-ratio box, so changing picture never changes the page
 *     height. That is what stops the view jumping under the reader's thumb — not a scroll
 *     correction after the fact, which always lands a frame late.
 *   - the selected thumbnail is scrolled into view horizontally only, with `block: nearest`,
 *     so following the carousel on a phone never drags the page vertically.
 *   - the crossfade is opacity on a stacked copy; under `prefers-reduced-motion` the new
 *     image simply replaces the old one.
 */
export function ImageGallery({
  images,
  label,
  className = "",
}: {
  images: GalleryImage[];
  /** Names the group for assistive technology, e.g. "Food and coffee". */
  label: string;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();
  const stripRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const count = images.length;
  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  // Keep the chosen thumbnail visible without ever moving the page vertically.
  useEffect(() => {
    thumbRefs.current[index]?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      inline: "nearest",
      block: "nearest",
    });
  }, [index, reduced]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = ((index + step) % count + count) % count;
    go(next);
    thumbRefs.current[next]?.focus();
  };

  const current = images[index];

  return (
    // min-w-0 matters: as a grid/flex child the figure would otherwise be sized by the
    // thumbnail strip's full content width, and the whole page would scroll sideways
    // instead of the strip scrolling inside it.
    <figure className={`min-w-0 ${className}`}>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-pally-warm ring-1 ring-pally-sand/70 sm:aspect-[16/10]">
        {images.map((img, i) =>
          img.pending ? (
            <div
              key={img.src}
              aria-hidden={i !== index}
              role={i === index ? "img" : undefined}
              aria-label={i === index ? img.alt : undefined}
              className={`absolute inset-0 flex flex-col items-center justify-center gap-2 bg-pally-warm px-6 text-center transition-opacity duration-300 motion-reduce:transition-none ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className="text-pally-accent"
              >
                <path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2.2l1.2-2h8.2l1.2 2h2.2A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z" />
                <circle cx="12" cy="13" r="3.4" />
              </svg>
              <p className="font-heading text-[1.05rem] leading-tight text-pally-brown-dark">
                {img.pending}
              </p>
              <p className="text-[11.5px] leading-snug text-pally-brown-light">
                Photograph still to come — this slot is reserved for it.
              </p>
            </div>
          ) : (
            <Image
              key={img.src}
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, 640px"
              priority={i === 0}
              aria-hidden={i !== index}
              className={`object-cover transition-opacity duration-300 motion-reduce:transition-none ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ),
        )}

        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous photograph"
          className="absolute left-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-pally-charcoal/70 text-white backdrop-blur-sm transition-colors hover:bg-pally-charcoal"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next photograph"
          className="absolute right-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-pally-charcoal/70 text-white backdrop-blur-sm transition-colors hover:bg-pally-charcoal"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <p className="absolute bottom-2 right-2 rounded-full bg-pally-charcoal/70 px-2.5 py-0.5 text-[11px] font-semibold text-white tabular-nums backdrop-blur-sm">
          {index + 1} / {count}
        </p>
      </div>

      {/* Scrolls sideways on a phone; the whole strip is one keyboard stop. */}
      <div
        ref={stripRef}
        role="radiogroup"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="no-scrollbar mt-2.5 flex w-full gap-2 overflow-x-auto pb-1"
      >
        {images.map((img, i) => (
          <button
            key={img.src}
            ref={(el) => {
              thumbRefs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={i === index}
            aria-label={img.alt}
            tabIndex={i === index ? 0 : -1}
            onClick={() => go(i)}
            className={`relative h-14 w-20 shrink-0 cursor-pointer overflow-hidden rounded-lg transition-all sm:h-16 sm:w-24 ${
              i === index
                ? "ring-2 ring-pally-accent ring-offset-2 ring-offset-pally-warm"
                : "opacity-65 ring-1 ring-pally-sand hover:opacity-100"
            }`}
          >
            {img.pending ? (
              <span className="flex h-full w-full items-center justify-center border border-dashed border-pally-accent/60 bg-pally-warm text-[9px] font-semibold uppercase tracking-wide text-pally-accent">
                To come
              </span>
            ) : (
              <Image src={img.src} alt="" fill sizes="96px" className="object-cover" />
            )}
          </button>
        ))}
      </div>

      {current.caption && (
        <figcaption className="mt-2 text-[11.5px] text-pally-brown-light/85">
          {current.caption}
        </figcaption>
      )}
    </figure>
  );
}
