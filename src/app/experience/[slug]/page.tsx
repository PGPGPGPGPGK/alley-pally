import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Carousel, Photo } from "@/preview/design-preview/_ui";
import { EXPERIENCES, SPACES, experienceBySlug } from "@/preview/design-preview-v4/_data";
import { V4Nav } from "@/preview/design-preview-v4/_nav";
import { ACTIVE_JOURNEYS, ROUTES } from "@/preview/design-preview-v4/_routes";
import {
  JourneyIcon,
  LocationBadge,
  V4Footer,
  V4Section,
  V4Strip,
} from "@/preview/design-preview-v4/_ui";

const ICON_FOR = { read: "book", play: "dice", stay: "chair", "eat-drink": "cup" } as const;

/**
 * The shared journey data carries production-relative CTA targets. In this preview those
 * two destinations live elsewhere: events is a page of its own here, and the menu stays on
 * the live site, so both are remapped rather than rendered as local paths that do not exist.
 */
const CTA_HREF: Record<string, string> = {
  "/events": ROUTES.events,
  "/menu": ROUTES.menu,
};

/** Only the three active journeys are published. Stay was retired. */
export function generateStaticParams() {
  return ACTIVE_JOURNEYS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exp = experienceBySlug(slug);
  return {
    title: exp ? `${exp.name} at Nallagandla — Alley Pally design preview` : "Design preview",
    description: exp?.blurb,
    robots: { index: false, follow: false },
  };
}

/**
 * One journey in depth, always anchored to the café it happens at.
 *
 * Adapted for static hosting in exactly one place: the Read page. In the working app it
 * embeds the real library catalogue — `fetchBooks()` against D1, the same query behind the
 * live /library page — which cannot run without a server. Rather than fake a shelf, the
 * section says what it is and links to the real catalogue. No book record appears here.
 */
export default async function Experience({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exp = experienceBySlug(slug);
  if (!exp) notFound();

  const rooms = SPACES.filter((s) => s.journey === exp.slug);
  const others = EXPERIENCES.filter(
    (e) =>
      e.slug !== exp.slug &&
      ACTIVE_JOURNEYS.includes(e.slug as (typeof ACTIVE_JOURNEYS)[number]),
  );

  return (
    <>
      <V4Strip name={exp.name} />
      <V4Nav />

      <V4Section className="pb-6 pt-8 md:pt-11">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-pally-accent">
          {exp.kicker}
        </p>
        <h1 className="mt-2 font-heading text-[clamp(2rem,8vw,3.4rem)] leading-[1.05] tracking-[-0.015em] text-pally-brown-dark">
          {exp.name}
        </h1>
        <div className="mt-3">
          <LocationBadge />
        </div>
        <p className="mt-4 max-w-[56ch] text-[15px] leading-relaxed text-pally-brown-light">
          {exp.blurb}
        </p>
      </V4Section>

      <V4Section className="pb-8">
        <Photo src={exp.hero.src} alt={exp.hero.alt} ratio="16/9" priority />
      </V4Section>

      <V4Section className="pb-8 md:pb-10">
        <div className="grid gap-4 sm:grid-cols-3">
          {exp.corners.map((c) => (
            <section
              key={c.title}
              className="rounded-2xl bg-pally-white p-4 ring-1 ring-pally-sand/70"
            >
              <h2 className="font-heading text-[1.15rem] leading-tight text-pally-brown-dark">
                {c.title}
              </h2>
              <p className="mt-1.5 text-[13px] leading-relaxed text-pally-brown-light">{c.body}</p>
            </section>
          ))}
        </div>

        {rooms.length > 0 && (
          <p className="mt-4 text-[12.5px] text-pally-brown-light">
            {rooms.length === 1 ? "The room for this:" : "The rooms for this:"}{" "}
            {rooms.map((r, i) => (
              <span key={r.name}>
                {i > 0 && " · "}
                <Link
                  href={`${ROUTES.nallagandla}#ways`}
                  className="font-semibold text-pally-brown-dark underline underline-offset-2 hover:text-pally-accent"
                >
                  {r.name}
                </Link>
              </span>
            ))}
          </p>
        )}
      </V4Section>

      {/* Read: the catalogue is live data, so it is pointed at rather than imitated. */}
      {exp.slug === "read" && (
        <V4Section id="collection" className="bg-pally-warm/40 py-8 scroll-mt-20 md:py-10">
          <h2 className="font-heading text-[clamp(1.4rem,5vw,2rem)] text-pally-brown-dark">
            What&rsquo;s on the shelf
          </h2>
          <p className="mt-2 max-w-[60ch] text-[14.5px] leading-relaxed text-pally-brown-light">
            In the built site this is the real catalogue, searchable and filterable by genre and
            shelf — the same shelf the current website already publishes. A static preview has no
            database behind it, so no books are listed here and none have been invented. Books are
            borrowed inside the café and stay in their cabin.
          </p>
          <p className="mt-4">
            <a
              href={ROUTES.library}
              className="inline-flex min-h-11 items-center gap-1 rounded-full bg-pally-green px-5 text-[13px] font-semibold text-white transition-colors hover:gap-2 hover:bg-pally-green-dark"
            >
              Browse the real catalogue <span aria-hidden>↗</span>
            </a>
          </p>
        </V4Section>
      )}

      {/* Eat + Drink: one link to the existing menu, never a second menu. */}
      {exp.slug === "eat-drink" && (
        <V4Section className="bg-pally-warm/40 py-8 md:py-10">
          <h2 className="font-heading text-[clamp(1.4rem,5vw,2rem)] text-pally-brown-dark">
            The full menu
          </h2>
          <p className="mt-2 max-w-[58ch] text-[14.5px] leading-relaxed text-pally-brown-light">
            Everything we serve, with prices, lives on one page — the same page the printed QR
            codes on the tables point to.
          </p>
          <a
            href={ROUTES.menu}
            className="mt-4 inline-flex min-h-12 items-center justify-center gap-1 rounded-full bg-pally-green px-6 text-[14px] font-semibold text-white transition-colors hover:bg-pally-green-dark"
          >
            See the menu <span aria-hidden>↗</span>
          </a>
        </V4Section>
      )}

      {exp.gallery.length > 0 && (
        <V4Section className="py-8">
          <Carousel>
            {exp.gallery.map((g) => (
              <div key={g.src} className="w-[76vw] shrink-0 snap-start sm:w-[320px]">
                <Photo src={g.src} alt={g.alt} ratio="4/3" />
              </div>
            ))}
          </Carousel>
        </V4Section>
      )}

      {exp.notes && (
        <V4Section className="pb-8">
          <h2 className="font-heading text-[1.3rem] text-pally-brown-dark">Good to know</h2>
          <ul className="mt-2.5 space-y-1.5">
            {exp.notes.map((n) => (
              <li key={n} className="flex gap-2.5 text-[13.5px] text-pally-brown-light">
                <span aria-hidden className="text-pally-accent">
                  ·
                </span>
                {n}
              </li>
            ))}
          </ul>
        </V4Section>
      )}

      {exp.cta && (
        <V4Section className="pb-8">
          <Link
            href={CTA_HREF[exp.cta.href] ?? exp.cta.href}
            className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-pally-accent px-6 text-[14px] font-semibold text-pally-accent transition-colors hover:bg-pally-accent hover:text-white"
          >
            {exp.cta.label}
          </Link>
        </V4Section>
      )}

      <V4Section className="border-t border-pally-sand py-8">
        <h2 className="font-heading text-[1.3rem] text-pally-brown-dark">
          {others.length === 1 ? "The other one" : "The others"}
        </h2>
        <ul className={`mt-3 grid gap-2.5 ${others.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
          {others.map((o) => (
            <li key={o.slug}>
              <Link
                href={ROUTES.experience(o.slug)}
                className="group flex min-h-20 flex-col items-center justify-center gap-2 rounded-2xl bg-pally-white p-3.5 text-center ring-1 ring-pally-sand/70 transition-all hover:-translate-y-0.5 hover:ring-pally-accent/60 motion-reduce:transform-none"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-pally-accent-bg text-pally-brown-dark transition-colors group-hover:bg-pally-accent group-hover:text-white">
                  <JourneyIcon icon={ICON_FOR[o.slug]} size={19} />
                </span>
                <span className="font-heading text-[clamp(0.9rem,3vw,1.1rem)] leading-tight text-pally-brown-dark">
                  {o.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </V4Section>

      <V4Footer />
    </>
  );
}
