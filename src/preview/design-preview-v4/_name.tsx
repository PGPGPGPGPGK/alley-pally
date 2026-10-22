"use client";

import { useEffect, useRef, useState } from "react";
import { STORY } from "../design-preview-v3/_data";
import { usePrefersReducedMotion } from "./_motion";

/**
 * The interactive explanation of the name, in three arrangements.
 *
 * The V4 problem this solves: on desktop the meaning changes on hover, which works, but a
 * phone has no hover and nothing told a visitor the words could be tapped. The meaning was
 * effectively hidden on the device most people arrive on.
 *
 * The fix is to show rather than wait to be asked. On load the three parts advance once —
 * Alley, then Pally, then Together — and stop there, on the line that ties them together.
 * It is one pass, not a loop, so nothing keeps moving while you read. The words stay
 * tappable throughout and a visible caption says so, and the first deliberate interaction
 * (tap, hover, focus or arrow key) cancels the progression for good, so the page never
 * fights someone who has taken control.
 *
 * Accessibility:
 *   - a tablist underneath, so arrow keys move between parts and the definition is a live
 *     region announced on change
 *   - every tap target clears 44px
 *   - `prefers-reduced-motion` turns the progression off entirely and lands on Together,
 *     the part that explains the whole name, with the caption still inviting a tap
 *   - with JavaScript disabled the settle never runs and a <noscript> block prints all
 *     three meanings in full, so the explanation is never lost
 *
 * Arrangements: `rule` (Broadsheet), `equation` (Hearth), `trail` (Pathway).
 */

type PartId = "alley" | "pally" | "together";

const PARTS: { id: PartId; word: string; def: string }[] = [
  { id: "alley", word: "Alley", def: STORY.name.alley },
  { id: "pally", word: "Pally", def: STORY.name.pally },
  { id: "together", word: "Together", def: STORY.name.together },
];

export type NameVariant = "rule" | "equation" | "trail";

/** How long each part holds before the next one arrives. */
const STEP_MS = 2600;

function useNameTabs() {
  const reduced = usePrefersReducedMotion();
  // How far the one-pass progression has got, and what the visitor picked instead.
  const [step, setStep] = useState(0);
  const [chosen, setChosen] = useState<PartId | null>(null);
  const [settled, setSettled] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const taken = chosen !== null;

  useEffect(() => {
    const id = requestAnimationFrame(() => setSettled(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (taken || reduced) return;
    // One pass, then stop: two timers, not an interval, so nothing loops.
    const timers = [
      window.setTimeout(() => setStep(1), STEP_MS),
      window.setTimeout(() => setStep(2), STEP_MS * 2),
    ];
    return () => timers.forEach(clearTimeout);
  }, [taken, reduced]);

  /**
   * With reduced motion nothing advances, so the part that explains the whole name is
   * shown from the start. Otherwise the progression drives it until someone takes over.
   */
  const active: PartId = chosen ?? (reduced ? "together" : PARTS[step].id);
  const caption = taken
    ? "Alley, Pally, or what they mean together"
    : "Tap a word to read its meaning";

  /** Any deliberate interaction hands control over permanently. */
  const take = (id: PartId) => setChosen(id);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const stepBy =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? 1
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? -1
          : 0;
    if (!stepBy) return;
    e.preventDefault();
    const j = (i + stepBy + PARTS.length) % PARTS.length;
    take(PARTS[j].id);
    tabs.current[j]?.focus();
  };

  const tabProps = (p: (typeof PARTS)[number], i: number) => ({
    ref: (el: HTMLButtonElement | null) => {
      tabs.current[i] = el;
    },
    role: "tab" as const,
    id: `v4-name-tab-${p.id}`,
    "aria-selected": p.id === active,
    "aria-controls": "v4-name-definition",
    tabIndex: p.id === active ? 0 : -1,
    onClick: () => take(p.id),
    onMouseEnter: () => take(p.id),
    onFocus: () => take(p.id),
    onKeyDown: (e: React.KeyboardEvent) => onKeyDown(e, i),
  });

  return { active, settled, tabProps, caption, current: PARTS.find((p) => p.id === active)! };
}

const SETTLE =
  "v4-settle transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none " +
  "motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-reduce:translate-y-0";

/** Every meaning, for a browser with JavaScript turned off. */
function NoScriptMeanings({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <noscript>
      <dl className={`mt-4 space-y-2 text-[14px] ${tone === "dark" ? "text-white/75" : "text-pally-brown-light"}`}>
        {PARTS.map((p) => (
          <div key={p.id}>
            <dt className={`font-semibold ${tone === "dark" ? "text-white" : "text-pally-brown-dark"}`}>
              {p.word}
            </dt>
            <dd>{p.def}</dd>
          </div>
        ))}
      </dl>
    </noscript>
  );
}

function Caption({ text, tone = "light" }: { text: string; tone?: "light" | "dark" }) {
  return (
    <p
      className={`mt-2.5 flex items-center gap-1.5 text-[11px] ${
        tone === "dark" ? "text-white/50" : "text-pally-brown-light/75"
      }`}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M9 11V6.5a1.5 1.5 0 0 1 3 0V11" />
        <path d="M12 11V9.5a1.5 1.5 0 0 1 3 0V11M15 11v-1a1.5 1.5 0 0 1 3 0v4a6 6 0 0 1-6 6h-1a5 5 0 0 1-4.3-2.5L5 14.5a1.5 1.5 0 0 1 2.6-1.5L9 15" />
      </svg>
      {text}
    </p>
  );
}

export function V4Name({ variant }: { variant: NameVariant }) {
  const { active, settled, tabProps, caption, current } = useNameTabs();

  /* --------------------------------------------------------- Broadsheet: rule --- */
  if (variant === "rule") {
    return (
      <div className="grid gap-x-10 gap-y-5 md:grid-cols-[minmax(0,1fr)_minmax(0,19rem)] md:items-end">
        <div>
          <div role="tablist" aria-label="What the name means" aria-orientation="vertical">
            {PARTS.map((p, i) => (
              <button
                key={p.id}
                {...tabProps(p, i)}
                style={{ transitionDelay: settled ? "0ms" : `${i * 70}ms` }}
                className={`block w-full cursor-pointer border-b pb-1.5 mt-1.5 text-left font-heading leading-[0.95]
                  tracking-[-0.015em] text-[clamp(2.1rem,9vw,3.9rem)] first:mt-0
                  ${SETTLE} ${settled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
                  ${
                    p.id === active
                      ? "text-pally-brown-dark border-pally-accent"
                      : "text-pally-brown-light/55 border-pally-brown-dark/15 hover:text-pally-brown"
                  }`}
              >
                <span className="mr-2 align-super font-sans text-[0.26em] font-semibold tracking-[0.2em] text-pally-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {p.word}
              </button>
            ))}
          </div>
          <Caption text={caption} />
        </div>
        <div>
          <p
            role="tabpanel"
            id="v4-name-definition"
            aria-live="polite"
            aria-labelledby={`v4-name-tab-${current.id}`}
            key={current.id}
            className="v4-fade border-l-2 border-pally-accent/45 pl-4 text-[14px] leading-relaxed text-pally-brown-light md:mb-2"
          >
            {current.def}
          </p>
          <NoScriptMeanings />
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------ Hearth: equation --- */
  if (variant === "equation") {
    return (
      <div className="text-center">
        <div
          role="tablist"
          aria-label="What the name means"
          className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1"
        >
          {PARTS.map((p, i) => (
            <span key={p.id} className="contents">
              {i > 0 && (
                <span
                  aria-hidden
                  className={`v4-settle font-heading text-[clamp(1rem,4vw,1.8rem)] text-pally-accent-light transition-opacity duration-500 delay-200 motion-reduce:transition-none motion-reduce:opacity-100 ${
                    settled ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {i === 1 ? "+" : "="}
                </span>
              )}
              <button
                {...tabProps(p, i)}
                className={`cursor-pointer border-b-[3px] pb-0.5 font-heading leading-[1.05] tracking-[-0.01em]
                  text-[clamp(1.9rem,9vw,3.6rem)] ${SETTLE}
                  ${
                    settled
                      ? "opacity-100 translate-x-0 translate-y-0"
                      : i === 0
                        ? "opacity-0 -translate-x-3"
                        : i === 1
                          ? "opacity-0 translate-x-3"
                          : "opacity-0 translate-y-2"
                  }
                  ${
                    p.id === active
                      ? "text-white border-pally-accent-light"
                      : "text-white/55 border-transparent hover:text-white/80"
                  }`}
              >
                {p.word}
              </button>
            </span>
          ))}
        </div>
        <p
          role="tabpanel"
          id="v4-name-definition"
          aria-live="polite"
          aria-labelledby={`v4-name-tab-${current.id}`}
          key={current.id}
          className="v4-fade mx-auto mt-4 max-w-[46ch] text-[14.5px] leading-relaxed text-white/75"
        >
          {current.def}
        </p>
        <div className="flex justify-center">
          <Caption text={caption} tone="dark" />
        </div>
        <div className="mx-auto max-w-[46ch] text-left">
          <NoScriptMeanings tone="dark" />
        </div>
      </div>
    );
  }

  /* ------------------------------------------------------------- Pathway: trail --- */
  return (
    <div className="relative pl-7">
      {/* The line the waypoints hang from. Decorative, so it stays out of the tree. */}
      <span
        aria-hidden
        className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-pally-accent/15 via-pally-accent/55 to-pally-accent/15"
      />
      <div role="tablist" aria-label="What the name means" aria-orientation="vertical">
        {PARTS.map((p, i) => (
          <button
            key={p.id}
            {...tabProps(p, i)}
            style={{ transitionDelay: settled ? "0ms" : `${i * 90}ms` }}
            className={`group relative mt-3 block w-full cursor-pointer text-left first:mt-0 ${SETTLE} ${
              settled ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
            }`}
          >
            <span
              aria-hidden
              className={`absolute -left-7 top-[0.55em] h-3 w-3 rounded-full border-2 transition-colors ${
                p.id === active
                  ? "bg-pally-accent border-pally-accent"
                  : "bg-pally-cream border-pally-accent/40 group-hover:border-pally-accent"
              }`}
            />
            <span
              className={`font-heading text-[clamp(1.6rem,7vw,2.6rem)] leading-tight transition-colors ${
                p.id === active
                  ? "text-pally-brown-dark"
                  : "text-pally-brown-light/55 group-hover:text-pally-brown"
              }`}
            >
              {p.word}
            </span>
          </button>
        ))}
      </div>
      <p
        role="tabpanel"
        id="v4-name-definition"
        aria-live="polite"
        aria-labelledby={`v4-name-tab-${current.id}`}
        key={current.id}
        className="v4-fade mt-4 max-w-[44ch] text-[14.5px] leading-relaxed text-pally-brown-light"
      >
        {current.def}
      </p>
      <Caption text={caption} />
      <NoScriptMeanings />
    </div>
  );
}
