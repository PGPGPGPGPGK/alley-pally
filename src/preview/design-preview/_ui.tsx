// Shared preview chrome. One file on purpose — these pieces only exist to make
// the four preview pages reviewable, and splitting them across files would make
// deleting the preview harder than keeping it.

import Image from "next/image";
import Link from "next/link";
import { BRAND, LOCATIONS, type PreviewLocation } from "./_data";

/** Deliberately unmissable. Every pink block is an unconfirmed Mini asset. */
const PINK = "#FF2D8F";

export type Ctx = "brand" | "nallagandla" | "mini";

/**
 * A missing-asset slot. Holds the real aspect ratio so layout, card proportions
 * and page length can be judged before the photo exists.
 */
export function Placeholder({
  label,
  ratio = "16/9",
  className = "",
  rounded = "rounded-2xl",
  fill = false,
}: {
  label: string;
  ratio?: string;
  className?: string;
  rounded?: string;
  /** Fill the parent (mosaic cells) instead of holding an aspect ratio. */
  fill?: boolean;
}) {
  return (
    <div
      className={`relative w-full flex items-center justify-center overflow-hidden ${rounded} ${
        fill ? "h-full" : ""
      } ${className}`}
      style={fill ? { backgroundColor: PINK } : { aspectRatio: ratio, backgroundColor: PINK }}
    >
      <span className="px-3 text-center text-white">
        <span className="block text-[10px] md:text-sm font-bold uppercase tracking-wider leading-tight">
          {label}
        </span>
        {ratio !== "auto" && !fill && (
          <span className="block text-[10px] md:text-xs font-medium opacity-75 mt-1">
            {ratio.replace("/", ":")}
          </span>
        )}
      </span>
    </div>
  );
}

/** Real repo photo, in a ratio box so it sits beside placeholders honestly. */
export function Photo({
  src,
  alt,
  ratio = "16/9",
  className = "",
  rounded = "rounded-2xl",
  priority = false,
}: {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
  rounded?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-pally-warm ${rounded} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
    </div>
  );
}

/**
 * Context-aware nav. The same shell everywhere; only the destinations change,
 * so someone already inside a location never picks that location again.
 */
export function PreviewNav({ ctx }: { ctx: Ctx }) {
  const loc = ctx === "brand" ? null : `/design-preview/${ctx}`;
  const links = [
    { label: "About", href: loc ? `${loc}#about` : "/design-preview/home#about" },
    { label: "Menu", href: loc ? `${loc}#menu` : "/design-preview/category" },
    { label: "Events", href: loc ? `${loc}#events` : "/design-preview/category" },
    { label: "Spaces", href: loc ? `${loc}#spaces` : "/design-preview/category" },
    { label: "Locations", href: "/design-preview/home#locations" },
    { label: "Contact", href: loc ? `${loc}#contact` : "/design-preview/home#contact" },
  ];

  const ctxLabel =
    ctx === "nallagandla" ? "Nallagandla" : ctx === "mini" ? "Parvathapur" : null;

  return (
    <header className="sticky top-0 z-50 bg-pally-cream/95 backdrop-blur border-b border-pally-sand/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3">
        <Link href="/design-preview/home" className="flex items-center gap-2 shrink-0">
          <Image src={BRAND.logo} alt="Alley Pally" width={36} height={31} />
          {ctxLabel && (
            <span className="hidden sm:inline text-xs font-semibold px-2 py-0.5 rounded-full bg-pally-accent/10 text-pally-accent">
              {ctxLabel}
            </span>
          )}
        </Link>

        <nav className="ml-auto hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm text-pally-brown hover:text-pally-accent transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Mobile: the same links, scrolled horizontally rather than hidden
            behind a hamburger, so nav depth is visible in the preview. */}
        <nav className="ml-auto md:hidden flex items-center gap-4 overflow-x-auto no-scrollbar">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-xs whitespace-nowrap text-pally-brown"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function PreviewFooter({ ctx }: { ctx: Ctx }) {
  const entities =
    ctx === "brand"
      ? [LOCATIONS.nallagandla, LOCATIONS.mini]
      : [LOCATIONS[ctx]];

  return (
    <footer className="bg-pally-brown-dark text-white/70 mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Image src={BRAND.logo} alt="Alley Pally" width={52} height={45} />
            <p className="text-sm mt-3 max-w-xs">
              A habit cafe for books, board games &amp; community.
            </p>
          </div>
          {entities.map((l) => (
            <div key={l.slug}>
              <h3 className="text-white font-heading text-base mb-2">
                {l.name} · {l.area}
              </h3>
              <p className="text-xs leading-relaxed">{l.address}</p>
              <p className="text-xs mt-1">{l.hours}</p>
              <a href={`tel:${l.phone}`} className="text-xs block mt-1 hover:text-white">
                {l.phoneDisplay}
              </a>
            </div>
          ))}
        </div>

        {/* Two operators, two GSTINs — the correction that drove the data model. */}
        <div className="mt-8 pt-5 border-t border-white/10 space-y-1">
          {entities.map((l) => (
            <p key={l.slug} className="text-[11px] text-white/40 leading-relaxed">
              {l.name} is operated by {l.operator.legalName} (GSTIN{" "}
              {l.operator.gstin}).
            </p>
          ))}
          {/* Discreet staff entry point. Points at the existing /admin route —
              no new login, no duplicated dashboard. The public site has never
              linked to it, which is why it was hard to find. */}
          <div className="flex items-center gap-3 pt-2">
            <p className="text-[11px] text-white/25">
              Local design preview — not the production site.
            </p>
            <span className="text-white/15 text-[11px]" aria-hidden>
              ·
            </span>
            <a
              href="/admin"
              className="text-[11px] text-white/35 underline underline-offset-2 hover:text-white/70 transition-colors"
            >
              Admin login
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Section({
  id,
  children,
  className = "",
  tight = false,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  tight?: boolean;
}) {
  return (
    <section
      id={id}
      className={`${tight ? "py-8 md:py-12" : "py-12 md:py-20"} ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function Heading({
  label,
  children,
  subtitle,
}: {
  label?: string;
  children: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="mb-6 md:mb-10">
      {label && (
        <p className="text-pally-accent text-[11px] font-semibold tracking-[0.2em] uppercase mb-1.5">
          {label}
        </p>
      )}
      <h2 className="font-heading text-2xl md:text-4xl text-pally-brown-dark leading-tight">
        {children}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm md:text-base text-pally-brown-light max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/** CTA that works as a link. Mirrors Button.tsx styling without importing it. */
export function Cta({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "accent";
  className?: string;
}) {
  const styles = {
    primary: "bg-pally-green text-white hover:bg-pally-green-dark",
    secondary:
      "border-2 border-pally-brown text-pally-brown hover:bg-pally-brown hover:text-white",
    accent: "bg-pally-accent text-white hover:opacity-90",
  }[variant];

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 px-6 py-3 text-sm min-h-[48px] ${styles} ${className}`}
    >
      {children}
    </a>
  );
}

/**
 * Horizontal carousel on CSS scroll-snap. No JS, no library — the native
 * behaviour is what a phone user expects and it costs nothing.
 */
export function Carousel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex gap-3 md:gap-4 overflow-x-auto snap-x snap-mandatory pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Six images tiled into a perfect square: a 4x4 grid where the spans add up to
 * exactly 16 cells, so there are no gaps and nothing is left hanging. Each cell
 * is filled with object-cover, so the source photo's own ratio doesn't matter.
 */
const MOSAIC_CELLS = [
  "col-span-2 row-span-2", // large, top-left
  "col-span-2 row-span-1", // wide, top-right
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-2", // large, bottom-left
  "col-span-2 row-span-2", // large, bottom-right
];

export function Mosaic({
  items,
}: {
  items: { src?: string; label?: string; alt?: string }[];
}) {
  return (
    <div className="grid grid-cols-4 grid-rows-4 gap-2 md:gap-3 aspect-square w-full max-w-[640px]">
      {items.slice(0, 6).map((item, i) => (
        <div
          key={i}
          className={`${MOSAIC_CELLS[i]} relative overflow-hidden rounded-lg md:rounded-xl bg-pally-warm`}
        >
          {item.src ? (
            <Image
              src={item.src}
              alt={item.alt ?? ""}
              fill
              sizes="(max-width: 768px) 50vw, 320px"
              className="object-cover"
            />
          ) : (
            <Placeholder
              label={item.label ?? "Gallery placeholder"}
              fill
              rounded="rounded-none"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export function LocationTile({ location }: { location: PreviewLocation }) {
  const href = `/design-preview/${location.slug}`;
  return (
    <Link
      href={href}
      className="group block rounded-2xl overflow-hidden bg-pally-white shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 hover:-translate-y-1"
    >
      {location.heroImage ? (
        <Photo
          src={location.heroImage}
          alt={`${location.name}, ${location.area}`}
          ratio="4/3"
          rounded="rounded-none"
        />
      ) : (
        <Placeholder
          label="Mini exterior placeholder"
          ratio="4/3"
          rounded="rounded-none"
        />
      )}
      {/* Sized to survive half a 390px screen: the two tiles sit side by side
          on mobile, so everything here steps down rather than wrapping. */}
      <div className="p-3 md:p-5">
        <p className="text-[9px] md:text-[11px] font-semibold tracking-[0.14em] md:tracking-[0.18em] uppercase text-pally-accent">
          {location.area}
        </p>
        <h3 className="font-heading text-base md:text-2xl text-pally-brown-dark mt-0.5 md:mt-1 leading-tight">
          {location.name}
        </h3>
        <p className="text-[11px] md:text-sm text-pally-brown-light mt-1 md:mt-1.5 leading-snug md:leading-relaxed line-clamp-3 md:line-clamp-none">
          {location.tagline}
        </p>
        <p className="text-[10px] md:text-xs text-pally-brown-light mt-2 md:mt-3">
          {location.hours}
        </p>
        <span className="inline-flex items-center gap-1 md:gap-1.5 mt-2.5 md:mt-4 text-[11px] md:text-sm font-semibold text-pally-green group-hover:gap-2.5 transition-all">
          Visit <span className="hidden md:inline">this cafe</span>{" "}
          <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}

export function ReviewCard({
  review,
}: {
  review: { quote: string; name: string; meta: string; avatar: string };
}) {
  return (
    <div className="bg-pally-white rounded-xl p-4 shadow-[var(--shadow-card)] h-full flex flex-col">
      <div className="text-pally-gold text-xs mb-1.5" aria-label="5 out of 5">
        ★★★★★
      </div>
      {/* Clamped so one long review can't set the height of the whole row. */}
      <p className="text-[13px] text-pally-charcoal leading-relaxed line-clamp-5 flex-1">
        &ldquo;{review.quote}&rdquo;
      </p>
      <div className="flex items-center gap-2 mt-3">
        <div className="w-7 h-7 rounded-full bg-pally-green-light/40 flex items-center justify-center text-[10px] font-bold text-pally-brown-dark shrink-0">
          {review.avatar}
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-pally-brown-dark truncate">
            {review.name}
          </p>
          <p className="text-[10px] text-pally-brown-light truncate">{review.meta}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Swipeable reviews plus a way through to the full set. Used on the brand
 * homepage and on each location page, so the behaviour stays identical
 * wherever reviews appear.
 */
export function ReviewRail({
  reviews,
  seeAllUrl,
}: {
  reviews: { quote: string; name: string; meta: string; avatar: string }[];
  seeAllUrl: string;
}) {
  return (
    <>
      <Carousel>
        {reviews.map((r) => (
          <div key={r.name} className="snap-start shrink-0 w-[260px] md:w-[300px]">
            <ReviewCard review={r} />
          </div>
        ))}
      </Carousel>
      <a
        href={seeAllUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-pally-green hover:gap-2.5 transition-all"
      >
        See all reviews on Google <span aria-hidden>→</span>
      </a>
    </>
  );
}

/** Address / hours / phone / directions, identical shape for both locations. */
export function VisitBlock({ location }: { location: PreviewLocation }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <InfoCard title="Address">{location.address}</InfoCard>
      <InfoCard title="Hours">{location.hours}</InfoCard>
      <InfoCard title="Phone">
        <a href={`tel:${location.phone}`} className="hover:text-pally-accent">
          {location.phoneDisplay}
        </a>
      </InfoCard>
      <div className="flex flex-col gap-2.5 justify-center">
        <Cta href={location.mapsUrl} variant="primary" className="w-full">
          Get directions
        </Cta>
        <Cta href={location.whatsapp} variant="secondary" className="w-full">
          WhatsApp us
        </Cta>
      </div>
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-pally-white rounded-2xl p-4 border border-pally-sand/60">
      <p className="text-[11px] font-semibold tracking-wider uppercase text-pally-brown-light mb-1.5">
        {title}
      </p>
      <p className="text-sm text-pally-brown-dark leading-relaxed">{children}</p>
    </div>
  );
}
