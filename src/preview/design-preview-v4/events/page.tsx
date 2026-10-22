import type { Metadata } from "next";
import Link from "next/link";
import { V4Nav } from "../_nav";
import { LIVE_SITE, ROUTES } from "../_routes";
import { InstagramLink, LocationBadge, V4Footer, V4Section, V4Strip } from "../_ui";

export const metadata: Metadata = {
  title: "Events — Alley Pally design preview",
  description:
    "Board game nights, live music and workshops at Alley Pally, Nallagandla. Design preview.",
  robots: { index: false, follow: false },
};

/**
 * Events, adapted for static hosting.
 *
 * In the working app this page runs the real queries — `fetchEvents()` against D1, with the
 * same lifecycle helpers the live site uses — so "upcoming" and "past" mean exactly what
 * they mean in production. A static export has no database and no server, so those queries
 * cannot run here.
 *
 * What that must not become is invented content. No event record appears on this page.
 * Instead each section says plainly what it is: the layout and behaviour are the proposal,
 * the listings come from the live database when the design is actually built, and the real
 * history is one link away on the current website.
 *
 * The "nothing on the calendar" state is not a placeholder — at the time of publishing,
 * the live site genuinely shows no upcoming events, so this is the accurate state, not a
 * stand-in for one.
 */
export default function V4Events() {
  return (
    <>
      <V4Strip name="Events" />
      <V4Nav />

      <V4Section className="pb-6 pt-8 md:pt-11">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-pally-accent">
          Board games · Live music · Workshops
        </p>
        <h1 className="mt-2 font-heading text-[clamp(2rem,8vw,3.4rem)] leading-[1.05] tracking-[-0.015em] text-pally-brown-dark">
          What&rsquo;s on
        </h1>
        <div className="mt-3">
          <LocationBadge />
        </div>
      </V4Section>

      <V4Section className="pb-8">
        <h2 className="font-heading text-[clamp(1.4rem,5vw,2rem)] text-pally-brown-dark">
          Upcoming
        </h2>

        <div className="mt-4 rounded-2xl border border-dashed border-pally-sand bg-pally-white/60 p-6">
          <p className="font-heading text-[1.2rem] text-pally-brown-dark">
            Nothing on the calendar right now.
          </p>
          <p className="mt-1.5 max-w-[56ch] text-[13.5px] leading-relaxed text-pally-brown-light">
            New evenings are usually announced a week or two ahead. The backyard still has live
            music every Sunday evening, with no cover — that one needs no ticket.
          </p>
          <p className="mt-3 flex flex-wrap items-center gap-2.5">
            <Link
              href={ROUTES.nallagandla}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-pally-green px-5 text-[13px] font-semibold text-white transition-colors hover:bg-pally-green-dark"
            >
              Visit the café
            </Link>
            <span className="inline-flex items-center gap-1 text-[13px] text-pally-brown-light">
              Announcements on
              <InstagramLink className="text-pally-brown-light hover:bg-pally-accent-bg hover:text-pally-brown-dark" />
            </span>
          </p>
        </div>
      </V4Section>

      <V4Section className="bg-pally-warm/40 py-8 md:py-10">
        <h2 className="font-heading text-[clamp(1.4rem,5vw,2rem)] text-pally-brown-dark">
          Already happened
        </h2>
        <p className="mt-3 max-w-[62ch] text-[13.5px] leading-relaxed text-pally-brown-light">
          <span className="font-semibold text-pally-brown-dark">
            Past events are not listed in this preview.
          </span>{" "}
          In the built site this section fills itself from the same event records the current
          website already uses — each one with its real date, poster and detail page. A static
          preview has no database behind it, and no event has been made up to fill the gap.
        </p>
        <p className="mt-4">
          <a
            href={`${LIVE_SITE}/events`}
            className="inline-flex min-h-11 items-center gap-1 rounded-full border-2 border-pally-brown px-5 text-[13px] font-semibold text-pally-brown transition-colors hover:gap-2 hover:bg-pally-brown hover:text-white"
          >
            See the real event history <span aria-hidden>↗</span>
          </a>
        </p>
      </V4Section>

      <V4Footer />
    </>
  );
}
