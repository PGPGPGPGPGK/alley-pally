"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { HOME, NAV, type NavGroup } from "./_routes";

/**
 * The V4 header — one implementation, one appearance, on every page.
 *
 * It is always the signature brown (`--pally-brown-dark`, #4A2218) with cream type, and it
 * is always sticky. There is no light variant any more: pages used to switch between a
 * cream bar and a brown one depending on what was underneath, which made the site feel
 * like two sites. On Hearth the bar now sits directly above the brown opening band and the
 * two read as one surface.
 *
 * Contrast on that brown: cream #F7F1EA is 11.9:1, and the muted state (cream at 75%)
 * still clears 7:1 — comfortably past AA for the small sizes used here.
 *
 * Structure: no Home item — the logo is the way back — and no top-level Menu item, because
 * the menu is reached through Eat + Drink. Groups are disclosures rather than hover-only
 * menus, so the same markup works on touch; pointer users get hover as an enhancement.
 * Escape closes, clicking outside closes, and navigating closes.
 */

const LOGO = "/images/logo-nav.png";

/**
 * Logo size.
 *
 * The asset is 400×343 with real transparent padding — the drawn mark occupies only
 * 325×313 of it, so 19% of the rendered width and 9% of the height are empty. The box is
 * therefore always visually smaller than its number suggests, which is why the previous
 * 48/56px read as cramped.
 *
 * These are ~27% up from 48/56px, the increase asked for. The box is not pushed further
 * than that to compensate for the padding: the white plate behind it is kept tight
 * instead, so the mark gains presence without the asset being scaled past its resolution.
 * At 71px the 400px-wide source is still downscaling, so it stays crisp.
 */
const LOGO_W = { base: 61, sm: 71 };

export function V4Nav({ homeHref = HOME }: { homeHref?: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const panelId = useId();

  // Navigating closes whatever is open. Adjusted during render rather than in an effect —
  // React's own pattern for reacting to a changed input — so there is no second render.
  const [shownFor, setShownFor] = useState(pathname);
  if (shownFor !== pathname) {
    setShownFor(pathname);
    setOpen(null);
    setMobile(false);
  }

  useEffect(() => {
    if (!open && !mobile) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!(e.target as Element)?.closest?.("[data-v4-header]")) {
        setOpen(null);
        setMobile(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, mobile]);

  const isCurrent = (href: string) => pathname === href;
  const groupCurrent = (g: NavGroup) =>
    g.href ? isCurrent(g.href) : !!g.items?.some((i) => isCurrent(i.href));

  const idle = "text-pally-cream/75 hover:text-pally-cream hover:bg-white/10";
  const active = "text-pally-cream bg-white/15 font-semibold";

  return (
    <header
      data-v4-header
      className="sticky top-0 z-50 border-b border-white/10 bg-pally-brown-dark"
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center gap-3 px-4 sm:h-[88px] sm:px-6">
        {/* Black line art, so it sits on a white plate — never recoloured. */}
        <Link href={homeHref} className="flex shrink-0 items-center" aria-label="Alley Pally — home">
          {/* p-1, not p-1.5: the asset already carries ~9.5% transparent margin on each
              side, so the plate only needs a hairline of its own or the mark reads inset. */}
          <span className="inline-flex rounded-xl bg-white p-1">
            <Image
              src={LOGO}
              alt="Alley Pally"
              width={400}
              height={343}
              priority
              className="h-auto w-[61px] sm:w-[71px]"
              style={{ maxWidth: `${LOGO_W.sm}px` }}
            />
          </span>
        </Link>

        <div className="flex-1" />

        {/* Desktop navigation. */}
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV.map((g) => {
              const on = groupCurrent(g);
              if (g.href) {
                return (
                  <li key={g.label}>
                    <Link
                      href={g.href}
                      aria-current={on ? "page" : undefined}
                      className={`inline-flex min-h-11 items-center rounded-full px-4 text-[14px] transition-colors ${on ? active : idle}`}
                    >
                      {g.label}
                    </Link>
                  </li>
                );
              }
              const isOpen = open === g.label;
              return (
                <li
                  key={g.label}
                  className="relative"
                  onMouseEnter={() => setOpen(g.label)}
                  onMouseLeave={() => setOpen((cur) => (cur === g.label ? null : cur))}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={() => setOpen(isOpen ? null : g.label)}
                    className={`inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full px-4 text-[14px] transition-colors ${
                      on || isOpen ? active : idle
                    }`}
                  >
                    {g.label}
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                      className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>

                  {isOpen && (
                    <ul className="absolute right-0 top-full z-50 min-w-60 rounded-2xl bg-pally-charcoal p-1.5 shadow-lg ring-1 ring-white/15">
                      {g.items!.map((i) => (
                        <li key={i.href}>
                          <Link
                            href={i.href}
                            aria-current={isCurrent(i.href) ? "page" : undefined}
                            className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-white/10"
                          >
                            <span className="block text-[14px] font-semibold text-pally-cream">
                              {i.label}
                            </span>
                            {i.note && (
                              <span className="block text-[12px] text-pally-cream/60">{i.note}</span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile trigger: a compact control, no labels crowding the bar. */}
        <button
          type="button"
          onClick={() => setMobile((v) => !v)}
          aria-expanded={mobile}
          aria-controls={panelId}
          className={`inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-colors md:hidden ${
            mobile ? active : idle
          }`}
        >
          <span className="sr-only">{mobile ? "Close menu" : "Open menu"}</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            {mobile ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile panel: in flow, so nothing can clip it, and the same brown as the bar. */}
      {mobile && (
        <nav
          id={panelId}
          aria-label="Main"
          className="border-t border-white/10 bg-pally-brown-dark md:hidden"
        >
          <ul className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
            {NAV.map((g) => (
              <li key={g.label} className="py-1.5">
                {g.href ? (
                  <Link
                    href={g.href}
                    aria-current={isCurrent(g.href) ? "page" : undefined}
                    className={`flex min-h-12 items-center rounded-xl px-3 text-[15px] font-semibold ${
                      isCurrent(g.href) ? active : idle
                    }`}
                  >
                    {g.label}
                  </Link>
                ) : (
                  <>
                    <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-pally-cream/50">
                      {g.label}
                    </p>
                    <ul>
                      {g.items!.map((i) => (
                        <li key={i.href}>
                          <Link
                            href={i.href}
                            aria-current={isCurrent(i.href) ? "page" : undefined}
                            className={`flex min-h-12 items-center rounded-xl px-3 text-[15px] ${
                              isCurrent(i.href) ? active : idle
                            }`}
                          >
                            {i.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
