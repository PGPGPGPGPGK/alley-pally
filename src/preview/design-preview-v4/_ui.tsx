import Image from "next/image";
import Link from "next/link";
import { Photo } from "../design-preview/_ui";
import { ICONS } from "../design-preview-v3/_ui";
import { DESTINATIONS, LOCATIONS, STORY, type V4Location } from "./_data";
import { HOME, ROUTES, V4 } from "./_routes";

export { HOME, V4 };

/* ------------------------------------------------------------------ layout --- */

/**
 * V4's section wrapper. V1's `Section` centres its contents in `max-w-7xl` while the nav
 * is `max-w-6xl`, so on a wide screen the content overhangs the navigation — visible in V3
 * and left alone there. V4 aligns the two.
 */
export function V4Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={className}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

/**
 * The headline, broken on its own sentence boundary.
 *
 * "Not a cafe. A place to be." reads badly wherever the browser happens to break it —
 * "…A place to / be." Tuning a `ch` max-width cannot fix that reliably, because the break
 * point depends on glyph metrics at every step of the clamp. Giving each sentence its own
 * line is deterministic at every width.
 */
export function Philosophy({ className = "" }: { className?: string }) {
  return (
    <h1 className={className}>
      {STORY.philosophy.split(/(?<=\.)\s+/).map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
    </h1>
  );
}

/**
 * The preview marker.
 *
 * Visible on every page and deliberately plain: this is a public URL, so a reader who
 * arrives at it needs to know within a second that it is a proposal and not the live
 * Alley Pally website. It carries no link — there is nowhere else in this preview to go.
 */
export function V4Strip({ name }: { name?: string }) {
  return (
    <p className="bg-pally-charcoal px-3 py-1.5 text-center text-[11px] leading-snug text-white/80">
      <span className="font-semibold text-white">Design preview</span> · a proposed redesign,
      not the live Alley Pally website{name ? ` · ${name}` : ""}
    </p>
  );
}

/* ------------------------------------------------------------------- icons --- */

/** V3's four line icons, reused rather than redrawn. No icon font, no dependency. */
export function JourneyIcon({ icon, size = 22 }: { icon: keyof typeof ICONS; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {ICONS[icon]}
    </svg>
  );
}

const CALENDAR = (
  <>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M8 3.5v3M16 3.5v3M3.5 10h17" />
    <circle cx="8.5" cy="14" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="14" r="1.1" fill="currentColor" stroke="none" />
  </>
);

/** The four homepage destinations share one icon set: three of V3's, plus a calendar. */
const DEST_ICONS = { ...ICONS, calendar: CALENDAR };

/**
 * The homepage experience strip.
 *
 * Four equal columns, one row, nothing but an icon and a word. Deliberately not cards:
 * no panel, no border, no shadow, no paragraph and no button — the previous version read
 * as four separate white boxes competing with the location cards below it. Here the only
 * thing with visual weight is the circular icon, identical in all four, so the row reads
 * as one piece of navigation.
 *
 * The whole icon-and-label region is the link, which also gives a tap target well over
 * 44px. Hover and press are carried by the circle, which is also the focus anchor.
 *
 * At 320px the circle and the type step down rather than the row breaking — four columns
 * is the point of the design, and "Eat + Drink" wraps to two lines, which is why every
 * label sits in a fixed two-line box so the four baselines stay level.
 */
export function DestinationStrip() {
  return (
    <ul className="grid grid-cols-4 gap-1 sm:gap-2">
      {DESTINATIONS.map((d) => (
        <li key={d.label}>
          <Link
            href={d.href}
            className="group flex flex-col items-center gap-2 rounded-2xl px-1 py-3 text-center transition-colors hover:bg-pally-accent-bg/55 focus-visible:bg-pally-accent-bg/55 active:bg-pally-accent-bg sm:gap-2.5 sm:px-2 sm:py-4"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-pally-accent-bg text-pally-brown-dark transition-colors group-hover:bg-pally-accent group-hover:text-white group-active:bg-pally-green group-active:text-white sm:h-16 sm:w-16">
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
                className="sm:h-8 sm:w-8"
              >
                {DEST_ICONS[d.icon]}
              </svg>
            </span>
            <span className="flex min-h-[2.4em] items-start justify-center font-heading text-[clamp(0.8rem,3.3vw,1.2rem)] leading-tight text-pally-brown-dark">
              {d.label}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

const AMENITY = {
  plug: (
    <>
      <path d="M9 3v5M15 3v5" />
      <path d="M6 8h12v3a6 6 0 0 1-6 6 6 6 0 0 1-6-6z" />
      <path d="M12 17v4" />
    </>
  ),
  wifi: (
    <>
      <path d="M3.5 9a13 13 0 0 1 17 0" />
      <path d="M6.5 12.5a8.5 8.5 0 0 1 11 0" />
      <path d="M9.5 16a4 4 0 0 1 5 0" />
      <circle cx="12" cy="19.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  printer: (
    <>
      <path d="M7 9V4h10v5" />
      <path d="M5 9h14a2 2 0 0 1 2 2v5h-4" />
      <path d="M7 16H3v-5a2 2 0 0 1 2-2" />
      <path d="M7 13h10v7H7z" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
};

export function AmenityIcon({ icon, size = 20 }: { icon: keyof typeof AMENITY; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {AMENITY[icon]}
    </svg>
  );
}

/* -------------------------------------------------------------- homepage bits --- */

/**
 * A journey as a small tile: icon and title, nothing else.
 *
 * The brief removed the explanatory paragraph that used to sit here — it repeated what the
 * experience page says — so the whole tile is one link and one tap target.
 */
export function JourneyTile({
  slug,
  name,
  icon,
  variant = "soft",
}: {
  slug: string;
  name: string;
  icon: keyof typeof ICONS;
  variant?: "soft" | "rule" | "quiet";
}) {
  const shell =
    variant === "soft"
      ? "rounded-2xl bg-pally-white p-4 ring-1 ring-pally-sand/70 hover:ring-pally-accent/60 hover:-translate-y-0.5 active:translate-y-0"
      : variant === "rule"
        ? "border-t-2 border-pally-brown-dark pt-3 pb-1 hover:border-pally-accent"
        : "py-2 hover:bg-pally-accent-bg/50 rounded-2xl";

  const mark =
    variant === "soft"
      ? "h-11 w-11 rounded-full bg-pally-accent-bg text-pally-brown-dark group-hover:bg-pally-accent group-hover:text-white"
      : variant === "rule"
        ? "h-9 w-9 text-pally-accent"
        : "h-12 w-12 rounded-full border border-pally-accent/35 text-pally-accent group-hover:bg-pally-accent group-hover:text-white group-hover:border-pally-accent";

  return (
    <Link
      href={ROUTES.experience(slug)}
      className={`group flex min-h-20 flex-col items-center justify-center gap-2 text-center transition-all motion-reduce:transform-none ${shell}`}
    >
      <span className={`inline-flex items-center justify-center transition-colors ${mark}`}>
        <JourneyIcon icon={icon} size={variant === "quiet" ? 20 : 21} />
      </span>
      <span className="font-heading text-[clamp(0.95rem,3.4vw,1.25rem)] leading-tight text-pally-brown-dark">
        {name}
      </span>
    </Link>
  );
}

/**
 * Where the four journeys happen. Shown with the tiles so nobody plans a reading
 * afternoon at a kiosk that has none of these rooms.
 */
export function ExperiencesAt({ className = "" }: { className?: string }) {
  return (
    <p className={`text-[12px] text-pally-brown-light ${className}`}>
      At{" "}
      <Link
        href={ROUTES.nallagandla}
        className="font-semibold text-pally-accent underline underline-offset-2 hover:text-pally-brown-dark"
      >
        Alley Pally · Nallagandla
      </Link>
    </p>
  );
}

/**
 * A location as a compact card: a small landscape photograph, the name, one line.
 *
 * The card's primary area navigates to the location page via a stretched link — the title
 * anchor is the only one covering the card — and Directions sits above it on its own. That
 * keeps two separate destinations without ever nesting one anchor inside another.
 */
export function V4LocationCard({
  location,
  variant = "soft",
}: {
  location: V4Location & { blurb: string };
  variant?: "soft" | "rule";
}) {
  const href = location.slug === "mini" ? ROUTES.mini : ROUTES.nallagandla;

  return (
    <article
      className={`group relative flex flex-col ${
        variant === "soft"
          ? "overflow-hidden rounded-2xl bg-pally-white ring-1 ring-pally-sand/70 transition-shadow hover:ring-pally-accent/60"
          : "border-t-2 border-pally-brown-dark pt-3"
      }`}
    >
      <div className={variant === "soft" ? "" : "overflow-hidden rounded-lg"}>
        <Photo
          src={location.heroImage as string}
          alt={`${location.name}, ${location.area}`}
          ratio="5/3"
          rounded={variant === "soft" ? "rounded-none" : "rounded-lg"}
          className="transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transform-none"
        />
      </div>

      <div className={`flex flex-1 flex-col ${variant === "soft" ? "p-3.5" : "pt-3"}`}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-pally-accent">
          {location.area}
        </p>
        <h3 className="mt-0.5 font-heading text-[1.15rem] leading-tight text-pally-brown-dark">
          {/* The stretched link: this anchor is the card's primary target. */}
          <Link href={href} className="after:absolute after:inset-0 hover:underline underline-offset-4">
            {location.name}
          </Link>
        </h3>
        <p className="mt-1 text-[12.5px] leading-snug text-pally-brown-light">{location.blurb}</p>

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-2.5">
          <a
            href={location.mapsUrl}
            className="relative z-10 inline-flex min-h-11 items-center gap-1 text-[12.5px] font-semibold text-pally-green underline underline-offset-4 hover:text-pally-green-dark"
          >
            Directions
            <span aria-hidden>↗</span>
            <span className="sr-only">to {location.name} on Google Maps</span>
          </a>
          {!location.hoursVerified && (
            <span className="rounded-full bg-pally-gold/25 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-pally-brown-dark">
              Hours unconfirmed
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------- page bits --- */

/**
 * The location indicator carried near the title of every experience page, so a visitor
 * knows which café the page is about before planning a trip to the wrong one.
 */
export function LocationBadge({ className = "" }: { className?: string }) {
  return (
    <Link
      href={ROUTES.nallagandla}
      className={`inline-flex min-h-9 items-center gap-1.5 rounded-full bg-pally-accent-bg px-3 text-[12px] font-semibold text-pally-brown-dark transition-colors hover:bg-pally-accent hover:text-white ${className}`}
    >
      <span
        aria-hidden
        className="inline-block h-1.5 w-1.5 rounded-full bg-pally-accent group-hover:bg-white"
      />
      Alley Pally · Nallagandla
    </Link>
  );
}

export function InstagramLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={ROUTES.instagram}
      rel="noreferrer"
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-white/15 ${className}`}
    >
      <span className="sr-only">Alley Pally on Instagram</span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    </a>
  );
}

/* ------------------------------------------------------------------ footer --- */

/**
 * The simplified footer.
 *
 * "Operated by" and the two operator blocks are gone from the visible footer. Those
 * disclosures are not lost: the legal entities and both GSTINs are already stated on
 * /about, /terms and /privacy, which are linked here.
 */
export function V4Footer() {
  return (
    <footer className="bg-pally-brown-dark text-white/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-7 px-4 py-9 sm:px-6 md:flex-row md:justify-between">
        <div>
          <span className="inline-flex rounded-xl bg-white p-2">
            <Image src="/images/logo-nav.png" alt="Alley Pally" width={240} height={206} className="h-auto w-14" />
          </span>
          <p className="mt-3 text-[13px] leading-relaxed">Not a cafe. A place to be.</p>
          <InstagramLink className="-ml-3 mt-1 text-white/70 hover:text-white" />
        </div>

        <div className="grid gap-7 sm:grid-cols-2 md:gap-12">
          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white">Visit</h2>
            <ul className="mt-2.5 space-y-2 text-[13px]">
              <li>
                <Link href={ROUTES.nallagandla} className="hover:underline">
                  {LOCATIONS.nallagandla.name} · {LOCATIONS.nallagandla.area}
                </Link>
              </li>
              <li>
                <Link href={ROUTES.mini} className="hover:underline">
                  {LOCATIONS.mini.name} · {LOCATIONS.mini.area}
                </Link>
              </li>
              <li>
                <Link href={ROUTES.events} className="hover:underline">
                  Events
                </Link>
              </li>
              <li>
                <a href={ROUTES.menu} className="hover:underline">
                  Menu
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white">Reach us</h2>
            <ul className="mt-2.5 space-y-2 text-[13px]">
              <li>
                <a href="mailto:hi@alleypallycafe.com" className="hover:underline">
                  hi@alleypallycafe.com
                </a>
              </li>
              <li>
                <a href="tel:+919032694008" className="hover:underline">
                  +91 90326 94008
                </a>
              </li>
            </ul>
            <ul className="mt-4 space-y-2 text-[12px] text-white/60">
              <li>
                <a href={ROUTES.about} className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href={ROUTES.privacy} className="hover:underline">
                  Privacy
                </a>
              </li>
              <li>
                <a href={ROUTES.terms} className="hover:underline">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-3.5 text-[11px] text-white/55 sm:px-6">
          © {new Date().getFullYear()} Alley Pally. All prices exclusive of taxes. Business and tax
          details are on{" "}
          <a href={ROUTES.about} className="underline underline-offset-2">
            About
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
