import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HABIT, HERO, LOCATION_LIST, STORY } from "../_data";
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
  title: "Alley Pally — not a cafe, a place to be",
  description:
    "A book you have been meaning to finish, a game with friends, or a little time to yourself. Alley Pally in Nallagandla and Parvathapur, Hyderabad.",
  robots: { index: false, follow: false },
};

/**
 * The homepage.
 *
 * Arun's note was that the structure is clean but the old site feels warmer, so the hero
 * now opens on a real photograph of the backyard on an evening, with people in it, instead
 * of on type alone. The brown is still there — it is the scrim over the photograph, which
 * both keeps the Hearth identity and guarantees the headline's contrast without hunting
 * for a dark patch in the image.
 *
 * The first impression is deliberately about the place, not the amenities: no laptops, no
 * sockets, no Wi-Fi above the fold. Those live on the Nallagandla page where someone who
 * has decided to come looks for them.
 *
 * "Nobody is counting the minutes" is said once on this site, on the Nallagandla page. It
 * is not repeated here.
 */
export default function Hearth() {
  return (
    <>
      <V4Strip />
      <V4Nav />

      {/* 1 — The place, then the promise. */}
      <section className="relative isolate flex min-h-[540px] items-center overflow-hidden bg-pally-brown-dark md:min-h-[620px]">
        <Image
          src={HERO.src}
          alt={HERO.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_58%]"
        />
        {/*
          Two scrim layers rather than one. A flat brown tint carries the brand and holds
          the photograph back a little; the gradient then darkens only the top, where the
          eyebrow and headline sit, and the very bottom, so the section blends into the
          brown band below. The middle stays light enough that you can actually see the
          garden and the people in it — a single heavy gradient hid them completely.
        */}
        <div aria-hidden className="absolute inset-0 bg-pally-brown-dark/45" />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-pally-brown-dark/80 via-pally-brown-dark/30 to-pally-brown-dark/90"
        />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-14 text-center sm:px-6 md:py-16">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.26em] text-pally-gold-light">
            {STORY.promise}
          </p>
          <Philosophy className="mt-3 font-heading text-[clamp(2.1rem,9vw,4.2rem)] leading-[1.05] tracking-[-0.015em] text-white drop-shadow-sm" />
          <p className="mx-auto mt-5 max-w-[52ch] text-[15px] leading-relaxed text-white">
            {HABIT.support}
          </p>
          <p className="mt-3 font-heading text-[clamp(1.1rem,4vw,1.5rem)] text-pally-gold-light">
            {HABIT.invitation}
          </p>
          <Link
            href="#locations"
            className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-pally-cream px-6 text-[13px] font-semibold text-pally-brown-dark transition-colors hover:bg-white"
          >
            Choose a cafe <span aria-hidden>↓</span>
          </Link>
        </div>
      </section>

      {/* 2 — Where the name comes from, and why the place exists. */}
      <section className="bg-pally-brown-dark">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-10 text-center sm:px-6 md:pb-14">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white/55">
            Where the name comes from
          </p>
          <div className="mt-3">
            <V4Name variant="equation" />
          </div>
          <p className="mx-auto mt-8 max-w-[56ch] border-t border-white/15 pt-6 text-[14.5px] leading-relaxed text-white/75">
            {STORY.why}
          </p>
        </div>
      </section>

      {/* 3 — Four ways to spend the time. */}
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

      {/* 4 — Two cafes, two different things. */}
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
