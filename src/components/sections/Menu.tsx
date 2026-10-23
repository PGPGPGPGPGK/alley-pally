"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { CoffeeCup, PizzaSlice, LeafThree, Sparkle } from "@/components/ui/Decorations";
import { type DietaryMarker, type MenuItem } from "@/lib/menu-data";
import { nallagandlaMenu, type MenuContent } from "@/lib/menu-config";

/**
 * View-only menu. Two navigation systems over one copy of the data:
 *
 *  - desktop (lg and up): a hierarchical sidebar — department → PDF subsection — with the
 *    selected section in the right column.
 *  - mobile (below lg): one sticky, single-row, horizontally scrollable bar. Every entry,
 *    Simple Pairings included, is a selectable view; only the selected one is on screen.
 *
 * Each group is rendered once and shown or hidden per breakpoint with `lg:hidden` /
 * `max-lg:hidden`, so nothing is duplicated per layout and the whole menu stays in the
 * server-rendered HTML for search engines and in-page find.
 *
 * The legend, the kitchen's dietary policy and the barista's sourcing note live behind one
 * small "How to read this" control rather than in a panel above every section — they are
 * reference material, not dishes.
 *
 * Nothing here orders, totals or reserves.
 */

/**
 * Both booklets are served from the site's own static assets rather than the R2 media host:
 * the deploy credentials have no R2 scope, so the object there cannot be replaced. Keeping
 * the PDFs in the repository means they ship with the Worker and version with the code.
 * Each menu's path, button wording and accessible label come from its config.
 */

/** The printed menus mark these with a coloured dot, so the page does too. */
const dietary: Record<DietaryMarker, { label: string; color: string }> = {
  veg: { label: "Vegetarian", color: "#3E7D2E" },
  egg: { label: "Contains egg", color: "#D98E04" },
  spicy: { label: "Spicy", color: "#C0392B" },
  // Mini only. Its booklet prints chicken dishes with a red dot.
  nonveg: { label: "Non-vegetarian · chicken", color: "#C0392B" },
};

/** A level-1 selection: a category id, a highlight filter, or the offers view. */
type MobileView = string;



const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** ease-out cubic: moves off quickly, settles gently */
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/** one duration for the pill scroll and the content slide, so they move as one */
const TRANSITION_MS = 300;
/** a nudge, not a full-screen slide */
const SLIDE_PX = 20;
/** a pill this close to the edge sits under the fade overlay, so treat it as not readable */
const EDGE_PAD = 8;

/**
 * Brings the active pill of one row into view.
 *
 * Writes `scrollLeft` frame by frame rather than calling `scrollIntoView`, which buys three
 * things the native call cannot: a known duration, an ease-out curve, and absolute certainty
 * that the page's vertical scroll is never touched. A new selection cancels the frame loop
 * still in flight instead of fighting it, which is what causes jitter when tabs are tapped
 * quickly in sequence.
 */
function revealActivePill(
  scroller: HTMLDivElement | null,
  duration: number,
  frame: React.MutableRefObject<number | null>
) {
  const pill = scroller?.querySelector<HTMLElement>('[aria-current="true"]');
  if (!scroller || !pill) return;

  const row = scroller.getBoundingClientRect();
  const box = pill.getBoundingClientRect();
  // already fully readable: moving would be motion for its own sake
  if (box.left >= row.left + EDGE_PAD && box.right <= row.right - EDGE_PAD) return;

  const centred = scroller.scrollLeft + (box.left - row.left) - (row.width - box.width) / 2;
  const target = Math.max(0, Math.min(scroller.scrollWidth - scroller.clientWidth, centred));
  const from = scroller.scrollLeft;
  const delta = target - from;
  if (Math.abs(delta) < 1) return;

  if (frame.current !== null) cancelAnimationFrame(frame.current);
  if (prefersReducedMotion()) {
    scroller.scrollLeft = target;
    frame.current = null;
    return;
  }

  const started = performance.now();
  const step = (now: number) => {
    const t = Math.min(1, (now - started) / duration);
    scroller.scrollLeft = from + delta * easeOutCubic(t);
    frame.current = t < 1 ? requestAnimationFrame(step) : null;
  };
  frame.current = requestAnimationFrame(step);
}

/**
 * After a selection, bring the top of the newly shown block to just under the sticky
 * navigation, so the visitor lands on its heading rather than wherever the previous, longer
 * section left them.
 *
 * Offsets are measured, never hardcoded: the bar's own resting `top` is where it meets the
 * site header, and its height changes with whether a level 2 row is showing. Runs only
 * where that bar is displayed, so the desktop sidebar layout is untouched.
 */
function scrollSelectionIntoView(bar: HTMLDivElement | null, content: HTMLDivElement | null) {
  if (!bar || !content || bar.offsetParent === null) return;
  const blocks = [...content.querySelectorAll<HTMLElement>("[data-menu-block]")];
  const first = blocks.find((b) => b.getBoundingClientRect().height > 0);
  if (!first) return;
  const restingTop = parseFloat(getComputedStyle(bar).top) || 0;
  const below = restingTop + bar.getBoundingClientRect().height + 8;
  const target = Math.max(0, window.scrollY + first.getBoundingClientRect().top - below);
  if (Math.abs(window.scrollY - target) < 4) return; // already in place
  // a later selection just calls this again; the browser supersedes the running scroll
  window.scrollTo({ top: target, behavior: prefersReducedMotion() ? "auto" : "smooth" });
}



/* ------------------------------------------------------------- fragments --- */

function Dot({ mark }: { mark: DietaryMarker }) {
  // Veg and egg are the PDF's coloured dots; heat reads better as a chilli than as a third
  // dot the eye has to decode. The category icons in this menu are emoji already.
  if (mark === "spicy") {
    return (
      <span className="inline-block text-[12px] leading-none shrink-0" title={dietary[mark].label}>
        <span aria-hidden="true">&#127798;</span>
        <span className="sr-only">{dietary[mark].label}</span>
      </span>
    );
  }
  return (
    <span
      className="inline-block w-2 h-2 rounded-full shrink-0 ring-1 ring-black/5"
      style={{ backgroundColor: dietary[mark].color }}
      title={dietary[mark].label}
    >
      <span className="sr-only">{dietary[mark].label}</span>
    </span>
  );
}

function TrailingMarks({ item }: { item: MenuItem }) {
  const h = item.highlights ?? [];
  return (
    <span className="inline-flex items-center gap-1 shrink-0">
      {item.dietary?.includes("spicy") && <Dot mark="spicy" />}
      {h.includes("favourite") && (
        <span className="text-pally-accent text-[11px] leading-none" title="Favourite">
          ◆<span className="sr-only">Guest favourite</span>
        </span>
      )}
      {h.includes("recommended") && (
        <span className="text-pally-green text-[11px] leading-none" title="Recommended">
          ★<span className="sr-only">Recommended by us</span>
        </span>
      )}
      {h.includes("new") && (
        <span className="text-[8px] font-bold uppercase tracking-[0.08em] text-pally-brown-dark/70 bg-pally-gold/20 rounded px-1 py-px leading-[1.4]">
          New
        </span>
      )}
      {/*
        A featured-product mark, deliberately distinct from NEW, ◆ and ★: it says what the
        drink is made with, not how good it is. Mini's booklet prints it on Cold Milo;
        nothing on the Nallagandla menu carries one.
      */}
      {item.badge === "milo" && (
        <span className="text-[8px] font-bold uppercase tracking-[0.08em] text-white bg-[#1F8A3B] rounded px-1 py-px leading-[1.4]">
          Milo
          <span className="sr-only"> — made with Milo</span>
        </span>
      )}
    </span>
  );
}

function ItemRow({ item, hiddenOnMobile }: { item: MenuItem; hiddenOnMobile: boolean }) {
  // veg or egg — the dot the PDF prints in the margin, to the left of the name
  const base = item.dietary?.find((d) => d === "veg" || d === "egg");
  return (
    <li
      className={`flex items-start gap-2 px-3 sm:px-4 py-2 border-b border-pally-warm/25 last:border-b-0 ${hiddenOnMobile ? "max-lg:hidden" : ""}`}
    >
      {/* a fixed box the height of the name's first line, so the dot sits on that line */}
      <span className="flex items-center justify-center w-2.5 h-[18px] shrink-0">
        {base && <Dot mark={base} />}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <h5 className="text-[13px] font-semibold text-pally-brown-dark leading-snug">
            {item.name}
          </h5>
          <TrailingMarks item={item} />
        </div>
        {item.desc && (
          <p className="text-[11px] text-pally-brown-light leading-snug mt-0.5">{item.desc}</p>
        )}
      </div>
      <span className="text-[13px] font-bold text-pally-brown-dark tabular-nums shrink-0 min-w-[3rem] text-right leading-[18px]">
        ₹{item.price}
      </span>
    </li>
  );
}

/**
 * A single-row horizontal pill scroller with a subtle fade at whichever edge still has
 * content beyond it, so an overflowing row reads as scrollable rather than as a clipped one.
 */
function ScrollRow({
  scrollerRef,
  className = "",
  children,
}: {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
  children: React.ReactNode;
}) {
  const [edges, setEdges] = useState({ left: false, right: false });

  const measure = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const left = el.scrollLeft > 4;
    const right = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
    // keep the same object when nothing changed: a scrolling row fires this every frame
    setEdges((prev) => (prev.left === left && prev.right === right ? prev : { left, right }));
  }, [scrollerRef]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    // deferred so the first measurement happens after paint rather than during the effect
    const id = requestAnimationFrame(measure);
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(id);
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure, scrollerRef, children]);

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className={`flex overflow-x-auto scrollbar-hide scroll-px-4 -mx-1 px-1 ${className}`}
      >
        {children}
      </div>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-pally-cream to-transparent transition-opacity duration-200 ${edges.left ? "opacity-100" : "opacity-0"}`}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-pally-cream to-transparent transition-opacity duration-200 ${edges.right ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

function InfoButton({
  open,
  onToggle,
  className = "",
  labelClassName = "",
}: {
  open: boolean;
  onToggle: () => void;
  className?: string;
  /** lets the mobile bar collapse the control to its icon */
  labelClassName?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="how-to-read-this"
      aria-label="How to read this"
      className={`inline-flex items-center gap-1.5 rounded-full border border-pally-warm/70 bg-pally-white px-2.5 py-1 text-[11px] font-medium text-pally-brown-light hover:text-pally-brown-dark hover:border-pally-brown-light/40 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pally-accent ${className}`}
    >
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 11-2 0 1 1 0 012 0zm-1 3a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      <span className={labelClassName}>How to read this</span>
    </button>
  );
}

/* ------------------------------------------------------------------ menu --- */

export function Menu({ content = nallagandlaMenu }: { content?: MenuContent } = {}) {
  // Everything below reads from the chosen menu rather than from the Nallagandla data
  // module, so one component serves both cafés. The default keeps /menu byte-for-byte
  // the same as before this became configurable.
  const {
    categories: menuCategories,
    mobileTabs: MOBILE_TABS,
    departments: DEPARTMENTS,
    filterViews: FILTER_VIEWS,
    sectionHeading: SECTION_HEADING,
    dietaryLegend,
    highlightLegend,
    kitchenStatement,
    baristaNote,
    addOns,
    addOnsLabel,
    strapline,
    taxNote,
    offers,
    offersLabel,
    offersTagline,
    offersArePriced,
    pdf,
  } = content;

  const byId = useCallback((id: string) => menuCategories.find((c) => c.id === id), [menuCategories]);
  const firstSub = (id: string) => byId(id)?.subcategories[0]?.name ?? "";
  const heading = (name: string) => SECTION_HEADING[name] ?? name;
  /** The first department is the landing view on both layouts. */
  const firstDept = DEPARTMENTS[0] ?? menuCategories[0]?.id ?? "";

  const [deskOpen, setDeskOpen] = useState<string[]>([firstDept]);
  const [deskCat, setDeskCat] = useState<string>(firstDept);
  const [deskSub, setDeskSub] = useState<string | null>(firstSub(firstDept));

  const [mobView, setMobView] = useState<MobileView>(firstDept);
  const [mobSub, setMobSub] = useState<Record<string, string>>(() =>
    Object.fromEntries(DEPARTMENTS.map((id) => [id, firstSub(id)])),
  );

  const [infoOpen, setInfoOpen] = useState(false);

  const [browseOpen, setBrowseOpen] = useState(false);
  const browseRef = useRef<HTMLElement>(null);
  const browseTriggerRef = useRef<HTMLButtonElement>(null);
  const browsePanelRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const subTabsRef = useRef<HTMLDivElement>(null);
  const subTabsFrame = useRef<number | null>(null);

  const activeViewLabel = MOBILE_TABS.find((t) => t.id === mobView)?.label ?? "";

  const chooseView = (id: MobileView) => {
    setMobView(id);
    setBrowseOpen(false);
    browseTriggerRef.current?.focus();
  };

  // Escape closes and hands focus back; a tap or click outside just closes.
  useEffect(() => {
    if (!browseOpen) return;
    browsePanelRef.current?.querySelector<HTMLElement>('[aria-current="true"]')?.focus();
    const onPointerDown = (e: PointerEvent) => {
      if (!browseRef.current?.contains(e.target as Node)) setBrowseOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setBrowseOpen(false);
      browseTriggerRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [browseOpen]);
  const contentRef = useRef<HTMLDivElement>(null);
  /** ordinal of the current selection; its delta tells new content which way to enter */
  const prevPos = useRef<number | null>(null);

  // The content is already on screen by the time these run: selection updates the markup
  // synchronously, and the scrolling and fading happen afterwards, never gating it.
  useEffect(() => {
    revealActivePill(subTabsRef.current, TRANSITION_MS, subTabsFrame);
  }, [mobView, mobSub]);

  // The selected content slides in from the side it was chosen from, starting in the same
  // commit as the pill scroll so the two read as one movement. Transform and opacity only:
  // no reflow, no layout shift. Cancelling on cleanup means a rapid second tap wipes the
  // first animation and its styles immediately, so content is never left part-way.
  useEffect(() => {
    const pos =
      MOBILE_TABS.findIndex((t) => t.id === mobView) * 100 +
      (byId(mobView)?.subcategories.findIndex((x) => x.name === mobSub[mobView]) ?? 0);
    const previous = prevPos.current;
    prevPos.current = pos;
    if (previous === null) return; // first paint: nothing to slide from

    scrollSelectionIntoView(stickyRef.current, contentRef.current);

    const el = contentRef.current;
    if (!el || prefersReducedMotion() || typeof el.animate !== "function") return;
    // forward enters from the right, backward from the left; 0 when the change came from
    // the desktop sidebar, which has no left-to-right order to honour
    const dx = pos === previous ? 0 : pos > previous ? SLIDE_PX : -SLIDE_PX;
    const animation = el.animate(
      [
        { opacity: 0.72, transform: `translateX(${dx}px)` },
        { opacity: 1, transform: "translateX(0)" },
      ],
      { duration: TRANSITION_MS, easing: "ease-out" }
    );
    return () => animation.cancel();
  }, [mobView, mobSub, deskCat, deskSub, MOBILE_TABS, byId]);

  useEffect(
    () => () => {
      if (subTabsFrame.current !== null) cancelAnimationFrame(subTabsFrame.current);
    },
    []
  );

  const toggleDept = (id: string) =>
    setDeskOpen((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));

  const selectDesk = (catId: string, sub: string | null) => {
    setDeskCat(catId);
    setDeskSub(sub);
    if (sub && !deskOpen.includes(catId)) setDeskOpen((o) => [...o, catId]);
  };

  const filterMarker = FILTER_VIEWS[mobView];
  const showSubNav = DEPARTMENTS.includes(mobView);

  const mobileShowsGroup = (catId: string, subName: string, items: MenuItem[]) => {
    if (filterMarker) return items.some((i) => i.highlights?.includes(filterMarker));
    if (mobView === "pairings") return false;
    return catId === mobView && mobSub[catId] === subName;
  };

  const pairingsOnDesktop = deskCat === "pairings";
  const pairingsOnMobile = mobView === "pairings";

  return (
    <section
      id="menu"
      className="pt-3 pb-8 md:py-14 lg:py-20 relative"
      style={{
        background:
          "linear-gradient(180deg, var(--pally-cream) 0%, var(--pally-warm) 50%, var(--pally-cream) 100%)",
      }}
    >
      {/*
        The decorations are clipped by their own wrapper rather than by the section: an
        `overflow-hidden` ancestor silently disables `position: sticky` for everything
        inside it, which would break both the desktop sidebar and the mobile quick-nav.
      */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        <CoffeeCup className="absolute top-20 left-[3%] w-14 text-pally-brown-light/10 rotate-[-15deg] hidden xl:block" />
        <PizzaSlice className="absolute top-[45%] right-[2%] w-12 text-pally-brown-light/10 rotate-[20deg] hidden xl:block" />
        <LeafThree className="absolute bottom-28 left-[4%] w-16 text-pally-brown-light/8 rotate-[15deg] hidden xl:block" />
        <Sparkle className="absolute top-[22%] right-[7%] w-5 text-pally-gold/15 hidden xl:block" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-2 md:mb-4">
            <p className="text-pally-accent text-[10px] md:text-[11px] font-semibold tracking-[0.2em] uppercase mb-0.5 md:mb-1.5">
              Eat · Drink · Read · Play · Stay
            </p>
            <h2 className="font-heading text-xl md:text-4xl lg:text-5xl text-pally-brown-dark mb-0.5 md:mb-1.5 leading-tight">
              Our Menu
            </h2>
            <p className="text-pally-brown-light text-[11px] md:text-sm max-w-xl mx-auto leading-snug md:leading-relaxed">
              {strapline} {taxNote}
            </p>
          </div>
        </ScrollReveal>

        {/* Mobile navigation: a Browse Menu selector, with the subsection row beneath it */}
        <div ref={stickyRef} className="lg:hidden sticky top-16 z-30 -mx-4 px-4 py-2 bg-pally-cream/95 backdrop-blur-sm border-b border-pally-warm/50 shadow-[0_1px_0_rgba(61,46,28,0.04)]">
          <div className="flex items-center gap-2">
            <nav aria-label="Menu sections" ref={browseRef} className="relative min-w-0 flex-1">
              <button
                type="button"
                ref={browseTriggerRef}
                onClick={() => setBrowseOpen((v) => !v)}
                aria-expanded={browseOpen}
                aria-controls="browse-menu"
                className="w-full inline-flex items-center gap-2 min-h-11 px-3.5 py-2.5 rounded-full bg-pally-brown-dark text-white text-[14px] font-semibold shadow-[var(--shadow-button)] transition-colors duration-[180ms] ease-out cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pally-accent"
              >
                <span aria-hidden="true" className="text-base leading-none">☰</span>
                <span className="truncate flex-1 text-left">
                  Browse Menu <span className="opacity-60">·</span> {activeViewLabel}
                </span>
                <svg
                  className={`w-4 h-4 shrink-0 transition-transform duration-150 ease-out ${browseOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/*
                `inert` (rather than `hidden`) keeps the panel out of the tab order and the
                accessibility tree while closed, and still lets opacity and transform
                animate in both directions — `hidden` and `visibility` are discrete and
                would swallow the close animation.
              */}
              <div
                id="browse-menu"
                ref={browsePanelRef}
                inert={!browseOpen}
                className={`absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-[60vh] overflow-y-auto rounded-2xl border border-pally-warm/70 bg-pally-white p-1.5 shadow-[var(--shadow-card)] origin-top transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none ${
                  browseOpen ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-1"
                }`}
              >
                <ul>
                  {MOBILE_TABS.map((t) => {
                    const active = mobView === t.id;
                    return (
                      <li key={t.id}>
                        <button
                          type="button"
                          onClick={() => chooseView(t.id)}
                          aria-current={active ? "true" : undefined}
                          className={`w-full flex items-center gap-2 min-h-11 px-3 py-2.5 rounded-xl text-[14px] text-left transition-colors duration-[180ms] ease-out cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-pally-accent ${
                            active
                              ? "bg-pally-accent/12 text-pally-accent font-semibold"
                              : "text-pally-brown-light hover:text-pally-brown-dark hover:bg-pally-warm/30"
                          }`}
                        >
                          <span className="flex-1">{t.label}</span>
                          {active && (
                            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </nav>
            <InfoButton
              open={infoOpen}
              onToggle={() => setInfoOpen((v) => !v)}
              className="shrink-0 min-h-11 w-11 justify-center !px-0"
              labelClassName="sr-only"
            />
          </div>

          {/* Subsection navigation, only for the department that is open */}
          {showSubNav && (
            <nav aria-label={`${mobView} sections`} className="mt-2">
              <ScrollRow scrollerRef={subTabsRef} className="gap-1.5">
                {byId(mobView)?.subcategories.map((s) => {
                  const active = mobSub[mobView] === s.name;
                  return (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => setMobSub((m) => ({ ...m, [mobView]: s.name }))}
                      aria-current={active ? "true" : undefined}
                      className={`shrink-0 inline-flex items-center min-h-9 px-3.5 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors duration-[180ms] ease-out cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pally-accent ${
                        active
                          ? "bg-pally-accent text-white font-semibold"
                          : "bg-pally-white text-pally-brown-light border border-pally-warm/60 hover:text-pally-brown-dark"
                      }`}
                    >
                      {heading(s.name)}
                    </button>
                  );
                })}
                <span aria-hidden="true" className="shrink-0 w-3" />
              </ScrollRow>
            </nav>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 mt-2.5 lg:mt-3">
          {/* Desktop hierarchical sidebar */}
          <aside className="hidden lg:block lg:col-span-3 self-start sticky top-28">
            <nav
              aria-label="Menu sections"
              className="bg-pally-white rounded-2xl border border-pally-warm/60 p-3 shadow-[var(--shadow-card)] max-h-[calc(100vh-9rem)] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => selectDesk("pairings", null)}
                aria-current={pairingsOnDesktop ? "true" : undefined}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-pally-accent ${
                  pairingsOnDesktop
                    ? "bg-pally-accent/10 text-pally-accent font-semibold"
                    : "text-pally-brown-light hover:text-pally-brown-dark hover:bg-pally-warm/30"
                }`}
              >
                {offersLabel}
              </button>

              {menuCategories.map((cat) => {
                const open = deskOpen.includes(cat.id);
                return (
                  <div key={cat.id} className="mt-1">
                    <button
                      type="button"
                      onClick={() => toggleDept(cat.id)}
                      aria-expanded={open}
                      aria-controls={`sidebar-${cat.id}`}
                      className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-pally-brown-dark hover:bg-pally-warm/30 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-pally-accent"
                    >
                      <span aria-hidden="true" className="text-lg leading-none">
                        {cat.icon}
                      </span>
                      <span className="flex-1 text-left">{cat.name}</span>
                      <svg
                        className={`w-4 h-4 text-pally-brown-light transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <ul id={`sidebar-${cat.id}`} hidden={!open} className="pl-3 py-0.5 space-y-0.5">
                      {cat.subcategories.map((sub) => {
                        const active = deskCat === cat.id && deskSub === sub.name;
                        return (
                          <li key={sub.name}>
                            <button
                              type="button"
                              onClick={() => selectDesk(cat.id, sub.name)}
                              aria-current={active ? "true" : undefined}
                              className={`w-full text-left px-3 py-2 rounded-lg text-[13px] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-pally-accent ${
                                active
                                  ? "bg-pally-warm/60 text-pally-brown-dark font-semibold"
                                  : "text-pally-brown-light hover:text-pally-brown-dark hover:bg-pally-warm/25"
                              }`}
                            >
                              {heading(sub.name)}
                              <span className="ml-1.5 text-[10px] text-pally-brown-light tabular-nums">
                                {sub.items.length}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <div ref={contentRef} className="lg:col-span-9 space-y-3">
            {/* Desktop trigger for the same legend panel */}
            <div className="hidden lg:flex justify-end">
              <InfoButton open={infoOpen} onToggle={() => setInfoOpen((v) => !v)} />
            </div>

            {/* Reference material — closed by default, so it never pushes the dishes down */}
            <div
              id="how-to-read-this"
              hidden={!infoOpen}
              className="bg-pally-white rounded-2xl border border-pally-warm/60 p-4 sm:p-5"
            >
              <h3 className="font-heading text-base text-pally-brown-dark mb-3">How to read this</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                <ul className="space-y-1.5">
                  {dietaryLegend.map((d) => (
                    <li key={d.marker} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[11px]">
                      <span className="inline-flex items-baseline gap-1.5 shrink-0">
                        <Dot mark={d.marker} />
                        <span className="font-semibold text-pally-brown">{d.label}</span>
                      </span>
                      <span className="text-pally-brown-light flex-1 basis-[11rem] min-w-0">
                        {d.meaning}
                      </span>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-1.5">
                  {highlightLegend.map((h) => (
                    <li key={h.marker} className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[11px]">
                      <span className="inline-flex items-baseline gap-1.5 shrink-0">
                        <span
                          className={
                            h.marker === "favourite"
                              ? "text-pally-accent"
                              : h.marker === "recommended"
                                ? "text-pally-green"
                                : "text-[8px] font-bold uppercase tracking-[0.08em] text-pally-brown-dark/70 bg-pally-gold/20 rounded px-1 py-px"
                          }
                        >
                          {h.marker === "new" ? "New" : h.symbol}
                        </span>
                        <span className="font-semibold text-pally-brown">{h.label}</span>
                      </span>
                      <span className="text-pally-brown-light flex-1 basis-[11rem] min-w-0">
                        {h.meaning}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-[11px] text-pally-brown-light leading-relaxed mt-3 pt-3 border-t border-pally-warm/40">
                {kitchenStatement}
              </p>
              <p className="text-[11px] text-pally-brown-light leading-relaxed mt-2">{baristaNote}</p>
              <div className="mt-3 pt-3 border-t border-pally-warm/40">
                <h4 className="text-xs font-semibold text-pally-brown-dark mb-1">{addOnsLabel}</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                  {addOns.map((a) => (
                    <li
                      key={a.name}
                      className="flex items-baseline justify-between gap-3 py-0.5 text-[11px] text-pally-brown-light"
                    >
                      <span>{a.name}</span>
                      <span className="font-semibold text-pally-brown-dark tabular-nums">+₹{a.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-[11px] text-pally-brown-light leading-relaxed mt-3 pt-3 border-t border-pally-warm/40">
                {taxNote} Allergies — please tell us before you order; the kitchen is a shared space.
                Don&rsquo;t love a dish? We&rsquo;ll replace it, free, on us.
              </p>
            </div>

            {/* Simple pairings — a selectable view on both layouts */}
            <div
              data-menu-block
              className={`bg-gradient-to-br from-pally-accent/10 to-pally-gold/10 border border-pally-accent/25 rounded-2xl px-3 py-3 sm:px-5 sm:py-4 ${pairingsOnDesktop ? "" : "lg:hidden"} ${pairingsOnMobile ? "" : "max-lg:hidden"}`}
            >
              <div className="mb-2.5">
                <h3 className="font-heading text-lg md:text-xl text-pally-brown-dark">
                  {offersLabel}
                </h3>
                <p className="text-[11px] text-pally-brown-light italic">{offersTagline}</p>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {offers.map((p) => (
                  <li
                    key={p.name}
                    className="bg-pally-white rounded-xl border border-pally-accent/20 px-3 py-2 flex items-start justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <h4 className="text-[13px] font-semibold text-pally-brown-dark leading-snug">
                        {p.name}
                      </h4>
                      {p.detail && (
                        <p className="text-[11px] text-pally-brown-light leading-snug mt-0.5">
                          {p.detail}
                        </p>
                      )}
                    </div>
                    <span className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-pally-accent bg-pally-accent/10 px-2 py-0.5 rounded-full tabular-nums">
                      {offersArePriced ? `₹${p.savings}` : `Save ₹${p.savings}`}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-[10px] text-pally-brown-light text-center mt-2.5">
                {offersArePriced
                  ? "One price for the whole combo, already less than the parts."
                  : "Order the two together and the saving comes off your bill."}
              </p>
            </div>

            {/* Sections */}
            {menuCategories.map((cat) =>
              cat.subcategories.map((sub) => {
                const onDesktop = deskCat === cat.id && deskSub === sub.name;
                const onMobile = mobileShowsGroup(cat.id, sub.name, sub.items);
                return (
                  <section
                    key={`${cat.id}-${sub.name}`}
                    data-menu-block
                    aria-label={`${cat.name} — ${heading(sub.name)}`}
                    className={`bg-pally-white rounded-2xl border border-pally-warm/60 overflow-hidden ${onDesktop ? "" : "lg:hidden"} ${onMobile ? "" : "max-lg:hidden"}`}
                  >
                    <div className="px-3 sm:px-4 pt-3 pb-2">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-pally-accent">
                        {cat.name}
                      </p>
                      <h3 className="font-heading text-lg md:text-xl text-pally-brown-dark leading-tight">
                        {heading(sub.name)}
                      </h3>
                      {sub.tagline && (
                        <p className="text-[11px] text-pally-brown-light italic mt-0.5">
                          {sub.tagline}
                        </p>
                      )}
                      {/* kept inline: it tells you when the oven changes, which changes the dish */}
                      {sub.note && (
                        <p className="text-[11px] text-pally-brown-light leading-snug mt-1.5">
                          {sub.note}
                        </p>
                      )}
                    </div>
                    <ul>
                      {sub.items.map((item) => (
                        <ItemRow
                          key={item.name}
                          item={item}
                          hiddenOnMobile={!!filterMarker && !item.highlights?.includes(filterMarker)}
                        />
                      ))}
                    </ul>
                  </section>
                );
              })
            )}

            {/* Full menu */}
            <div className="flex flex-col items-center gap-2 pt-1">
              <a
                href={pdf.url}
                download
                aria-label={pdf.aria}
                className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pally-accent"
              >
                <Button variant="secondary" size="sm">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  {pdf.label}
                </Button>
              </a>
              <p className="text-[10px] text-pally-brown-light">{taxNote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
