import Image from "next/image";
import Link from "next/link";
import { BRAND } from "../design-preview/_data";
import { Photo } from "../design-preview/_ui";
import { LEGAL, type Teaser, type V3Location } from "./_data";

export const V3 = "/design-preview-v3";

/* ------------------------------------------------------------------ chrome --- */

export const NAV = [
  { label: "Home", href: `${V3}/home` },
  { label: "Locations", href: `${V3}/home#locations` },
  { label: "Read", href: `${V3}/experience/read` },
  { label: "Play", href: `${V3}/experience/play` },
  { label: "Stay", href: `${V3}/experience/stay` },
  { label: "Eat + Drink", href: `${V3}/experience/eat-drink` },
  { label: "Menu", href: "/menu" },
  { label: "Events", href: "/events" },
];

/**
 * Public navigation only — no palette switcher, no version links. The preview notice is a
 * separate strip above it (PreviewStrip), so what is on screen is what a visitor would see.
 *
 * The link row scrolls horizontally on a phone rather than hiding behind a hamburger: eight
 * short labels stay visible and one-tap, and it needs no JavaScript to open.
 */
export function V3Nav({ current }: { current?: string }) {
  return (
    <header className="sticky top-0 z-40 bg-pally-cream/95 backdrop-blur-sm border-b border-pally-sand/60">
      <nav
        aria-label="Main"
        className="mx-auto max-w-6xl px-3 sm:px-6 h-14 flex items-center gap-2 sm:gap-3"
      >
        <Link href={`${V3}/home`} className="shrink-0 flex items-center gap-2">
          <Image src={BRAND.logo} alt={BRAND.name} width={120} height={103} className="w-8 sm:w-9 h-auto" />
          <span className="sr-only">{BRAND.name} — home</span>
        </Link>
        <div className="flex-1 min-w-0 overflow-x-auto no-scrollbar">
          <ul className="flex items-center gap-1 whitespace-nowrap">
            {NAV.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  aria-current={current === l.label ? "page" : undefined}
                  className={`inline-flex items-center px-3 min-h-[36px] rounded-full text-[13px] transition-colors ${
                    current === l.label
                      ? "bg-pally-brown-dark text-white font-semibold"
                      : "text-pally-brown-light hover:text-pally-brown-dark hover:bg-pally-sand/50"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

/** Kept out of the navigation on purpose, so the nav is the real one. */
export function PreviewStrip({ children }: { children: React.ReactNode }) {
  return (
    <p className="bg-pally-brown-dark text-white/80 text-[11px] text-center px-3 py-1.5 leading-snug">
      {children}
    </p>
  );
}

export function V3Footer() {
  const loc = [
    { slug: "nallagandla", name: "Alley Pally", area: "Nallagandla" },
    { slug: "mini", name: "Mini Alley Pally", area: "Parvathapur" },
  ];
  return (
    <footer className="bg-pally-brown-dark text-white/80 mt-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="inline-flex rounded-xl bg-white p-1.5">
            <Image src={BRAND.logo} alt={BRAND.name} width={120} height={103} className="w-11 h-auto" />
          </span>
          <p className="text-[13px] leading-relaxed mt-2.5">Not a cafe. A place to be.</p>
        </div>

        <div>
          <h2 className="text-white text-[11px] font-semibold uppercase tracking-[0.16em]">Cafes</h2>
          <ul className="mt-2 space-y-1.5 text-[13px]">
            {loc.map((l) => (
              <li key={l.slug}>
                <Link href={`${V3}/${l.slug}`} className="hover:underline">
                  {l.name} · {l.area}
                </Link>
              </li>
            ))}
            <li>
              <a href="/menu" className="hover:underline">
                Menu
              </a>
            </li>
            <li>
              <Link href="/events" className="hover:underline">
                Events
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-white text-[11px] font-semibold uppercase tracking-[0.16em]">Reach us</h2>
          <ul className="mt-2 space-y-1.5 text-[13px]">
            <li>
              <a href={`mailto:${BRAND.email}`} className="hover:underline">
                {BRAND.email}
              </a>
            </li>
            <li>
              <a href="tel:+919032694008" className="hover:underline">
                +91 90326 94008
              </a>
            </li>
            <li>
              <a href={BRAND.instagram} className="hover:underline" rel="noreferrer">
                Instagram
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-white text-[11px] font-semibold uppercase tracking-[0.16em]">Operated by</h2>
          <ul className="mt-2 space-y-1.5 text-[12px] text-white/65">
            {LEGAL.map((l) => (
              <li key={l.gstin}>
                {l.legalName} · {l.area}
                <br />
                GSTIN {l.gstin}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 sm:px-6 py-3.5 text-[11px] text-white/55">
          © {new Date().getFullYear()} Alley Pally. All prices exclusive of taxes.
        </p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ pieces --- */

export const ICONS: Record<Teaser["icon"], React.ReactNode> = {
  book: (
    <>
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5z" />
      <path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5z" />
    </>
  ),
  dice: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3.5" />
      <circle cx="9" cy="9" r="1.15" fill="currentColor" stroke="none" />
      <circle cx="15" cy="15" r="1.15" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.15" fill="currentColor" stroke="none" />
    </>
  ),
  chair: (
    <>
      <path d="M6 11V6.5A2.5 2.5 0 0 1 8.5 4h7A2.5 2.5 0 0 1 18 6.5V11" />
      <path d="M4.5 11h15l-1 5.5h-13z" />
      <path d="M7 16.5V20M17 16.5V20" />
    </>
  ),
  cup: (
    <>
      <path d="M5 8h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z" />
      <path d="M16 9.5h1.8a2.2 2.2 0 1 1 0 4.4H16" />
      <path d="M8 3.5v2M12 3.5v2" />
    </>
  ),
};

/**
 * A journey as a compact row: small line icon, name, one line, and the cafe it is at.
 * Not a photographic card — four large photos on the homepage was the thing V3 set out to
 * remove, and the photographs do their work on the location and experience pages.
 */
export function TeaserCard({ teaser }: { teaser: Teaser }) {
  return (
    <Link
      href={`${V3}/experience/${teaser.slug}`}
      className="group flex items-start gap-3 rounded-2xl bg-pally-white p-3.5 sm:p-4 ring-1 ring-pally-sand/70 transition-colors hover:ring-pally-accent/60"
    >
      <span className="shrink-0 rounded-xl bg-pally-accent-bg p-2 text-pally-brown-dark">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          {ICONS[teaser.icon]}
        </svg>
      </span>
      <span className="min-w-0">
        <span className="flex items-baseline gap-2 flex-wrap">
          <span className="font-heading text-lg text-pally-brown-dark leading-tight">{teaser.name}</span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-pally-brown-light">
            at {teaser.where}
          </span>
        </span>
        <span className="block text-[13px] text-pally-brown-light leading-snug mt-0.5">{teaser.line}</span>
        <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-pally-green mt-1.5 group-hover:gap-2 transition-all">
          Explore <span aria-hidden>→</span>
        </span>
      </span>
    </Link>
  );
}

/**
 * A location as a compact card. Its image is the thing that identifies it — the cafe
 * frontage for Nallagandla, the kiosk sign for Mini — and the menu link only appears for a
 * cafe that has a confirmed menu.
 */
export function LocationCard({ location }: { location: V3Location }) {
  const href = `${V3}/${location.slug}`;
  return (
    <div className="rounded-2xl overflow-hidden bg-pally-white ring-1 ring-pally-sand/70 flex flex-col">
      <Link href={href} className="block" tabIndex={-1} aria-hidden>
        <Photo
          src={location.heroImage as string}
          alt=""
          ratio="16/9"
          rounded="rounded-none"
        />
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-pally-accent">
          {location.area}
        </p>
        <h3 className="font-heading text-xl text-pally-brown-dark mt-0.5 leading-tight">
          <Link href={href} className="hover:underline underline-offset-4">
            {location.name}
          </Link>
        </h3>
        <p className="text-[13px] text-pally-brown-light mt-1 leading-snug">{location.tagline}</p>
        <p className="text-[12px] text-pally-brown-dark mt-2 flex flex-wrap items-center gap-1.5">
          {location.hours}
          {!location.hoursVerified && (
            <span className="rounded-full bg-pally-gold/25 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
              Unconfirmed
            </span>
          )}
        </p>

        <div className="mt-auto pt-3.5 flex flex-wrap gap-2">
          <Link
            href={href}
            className="inline-flex items-center justify-center rounded-full bg-pally-green text-white px-4 text-[13px] font-semibold hover:bg-pally-green-dark transition-colors min-h-[44px]"
          >
            Explore
          </Link>
          <a
            href={location.mapsUrl}
            className="inline-flex items-center justify-center rounded-full border-2 border-pally-brown text-pally-brown px-4 text-[13px] font-semibold hover:bg-pally-brown hover:text-white transition-colors min-h-[44px]"
          >
            Directions
          </a>
          {location.menuHref && (
            <a
              href={location.menuHref}
              className="inline-flex items-center justify-center rounded-full border-2 border-pally-accent text-pally-accent px-4 text-[13px] font-semibold hover:bg-pally-accent hover:text-white transition-colors min-h-[44px]"
            >
              Menu
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/** Concept artwork, always labelled as artwork. */
export function ConceptImage({
  src,
  alt,
  ratio = "16/9",
}: {
  src: string;
  alt: string;
  ratio?: string;
}) {
  return (
    <figure className="relative">
      <div
        className="relative w-full overflow-hidden rounded-2xl bg-pally-warm ring-1 ring-pally-sand/70"
        style={{ aspectRatio: ratio }}
      >
        <Image src={src} alt={alt} fill sizes="(max-width: 640px) 100vw, 50vw" />
      </div>
      <figcaption className="absolute left-2 top-2 rounded-full bg-pally-charcoal/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
        Illustration · not a photograph
      </figcaption>
    </figure>
  );
}
