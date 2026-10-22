import type { Metadata } from "next";
import Link from "next/link";
import { LOCATION_LIST, STORY } from "../_data";
import { V4Name } from "../_name";
import { V4Nav } from "../_nav";
import {
  DestinationStrip,
  Philosophy,
  V4Footer,
  V4LocationCard,
  V4Section,
  V4Strip,
} from "../_ui";

export const metadata: Metadata = {
  title: "Alley Pally — a place to be",
  description: "Not a cafe. A place to be. Alley Pally in Nallagandla and Parvathapur, Hyderabad.",
  robots: { index: false, follow: false },
};

/**
 * Hearth — the chosen homepage.
 *
 * It opens on the signature brown itself rather than on cream: the palette's anchor fills
 * the first screen and the name sits inside it. No photograph does that work — the colour
 * does, which is the point of having sampled it from the café's own woodwork.
 *
 * The header is rendered above the band rather than inside it. It is the same brown, so
 * the two read as one surface, but being a sibling of the band is what lets it stay stuck
 * to the top of the viewport for the whole page instead of scrolling away with the band.
 *
 * Contrast note: on the brown, small text is cream or gold-light. Terracotta
 * (accent-light) is only 3.1:1 there, so it is used for decorative marks, never for text.
 */
export default function Hearth() {
  return (
    <>
      <V4Strip />
      <V4Nav />

      {/* 1 — The name and the philosophy, inside the brown. */}
      <div className="bg-pally-brown-dark">
        <div className="mx-auto max-w-6xl px-4 pb-11 pt-9 text-center sm:px-6 md:pb-14 md:pt-12">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.26em] text-pally-gold-light">
            {STORY.promise}
          </p>
          <Philosophy className="mt-3 font-heading text-[clamp(2.1rem,9vw,4rem)] leading-[1.05] tracking-[-0.015em] text-white" />
          <p className="mx-auto mt-4 max-w-[54ch] text-[14.5px] leading-relaxed text-white/75">
            {STORY.why}
          </p>

          <div className="mt-8 md:mt-11">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white/55">
              Where the name comes from
            </p>
            <div className="mt-3">
              <V4Name variant="equation" />
            </div>
          </div>

          <Link
            href="#locations"
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-pally-cream px-5 text-[13px] font-semibold text-pally-brown-dark transition-colors hover:bg-white"
          >
            Choose a cafe <span aria-hidden>↓</span>
          </Link>
        </div>
      </div>

      {/* 2 — Four destinations, one row, icon and word only. */}
      <V4Section className="py-8 md:py-11">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 className="font-heading text-[clamp(1.5rem,5vw,2.1rem)] text-pally-brown-dark">
            Find your kind of day.
          </h2>
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-pally-accent">
            At Nallagandla
          </p>
        </div>
        <div className="mt-4 sm:mt-5">
          <DestinationStrip />
        </div>
      </V4Section>

      {/* 3 — Choose your cafe. */}
      <V4Section id="locations" className="bg-pally-warm/40 py-8 scroll-mt-24 md:py-11">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 className="font-heading text-[clamp(1.5rem,5vw,2.1rem)] text-pally-brown-dark">
            Choose your cafe
          </h2>
          <p className="text-[12px] text-pally-brown-light">A cafe, and a kiosk.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {LOCATION_LIST.map((l) => (
            <V4LocationCard key={l.slug} location={l} variant="soft" />
          ))}
        </div>
      </V4Section>

      {/* flow-root stops the footer's margin collapsing out of the coloured wrapper. */}
      <div className="flow-root bg-pally-warm/40">
        <V4Footer />
      </div>
    </>
  );
}
