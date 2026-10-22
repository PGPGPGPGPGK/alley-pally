import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { LOCATIONS, NALLAGANDLA_TILES, STORY, WORK_FRIENDLY } from "../_data";
import { DroneVideo } from "../_drone";
import { V4Nav } from "../_nav";
import { ROUTES } from "../_routes";
import { ExpandableTiles } from "../_tiles";
import { V4Footer, V4Section, V4Strip } from "../_ui";

export const metadata: Metadata = {
  title: "V4 · Alley Pally, Nallagandla",
  description:
    "A laptop-friendly café in Nallagandla, Hyderabad, with power sockets at every table and free Wi-Fi. Books, board games, a backyard and a wood-fired oven. Open daily, 8 AM – 11 PM.",
  robots: { index: false, follow: false },
};

const L = LOCATIONS.nallagandla;

/**
 * The main café.
 *
 * Structure, after the second round of feedback: the drone shot and the essentials, a
 * short overview, food and events as two compact prompts, visiting, and then the four
 * expandable tiles immediately above the footer.
 *
 * What was removed and why: the rooms grid, the "what you can do here" strip and the
 * standalone work-friendly band all described the same four things in three different
 * ways. They are now one section — the expandable tiles — which is also where the
 * work-friendly information lives. The old "Before you come" block stays gone.
 *
 * Deliberately absent everywhere: seat counts, table breakdowns, room layouts, and any
 * mention of the printer or stationery. Both are stripped at the data layer and asserted
 * by scripts/check-v4.mjs.
 */
export default function Nallagandla() {
  return (
    <>
      <V4Strip name="Nallagandla" />
      <V4Nav />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CafeOrCoffeeShop",
          name: "Alley Pally",
          address: {
            "@type": "PostalAddress",
            streetAddress: "F893+3J, HUDA Layout, Nallagandla",
            addressLocality: "Hyderabad",
            addressRegion: "Telangana",
            postalCode: "500019",
            addressCountry: "IN",
          },
          telephone: "+919032694008",
          openingHours: "Mo-Su 08:00-23:00",
          // Only what is verified: the PDF for sockets, the live site's own listing for Wi-Fi.
          amenityFeature: [
            { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
            {
              "@type": "LocationFeatureSpecification",
              name: "Power outlets at every table",
              value: true,
            },
          ],
        }}
      />

      <V4Section className="pb-6 pt-8 md:pt-11">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-pally-accent">
          {L.area} · Hyderabad
        </p>
        <h1 className="mt-2 font-heading text-[clamp(2rem,8vw,3.4rem)] leading-[1.05] tracking-[-0.015em] text-pally-brown-dark">
          Alley Pally, Nallagandla
        </h1>
        <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-pally-brown-light">
          {WORK_FRIENDLY.line}
        </p>
        <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-pally-brown-dark">
          <span className="font-semibold">{L.hours}</span>
          <a
            href={L.mapsUrl}
            className="inline-flex min-h-11 items-center gap-1 font-semibold text-pally-green underline underline-offset-4 hover:text-pally-green-dark"
          >
            Directions <span aria-hidden>↗</span>
          </a>
          <a
            href={ROUTES.menu}
            className="inline-flex min-h-11 items-center font-semibold text-pally-accent underline underline-offset-4 hover:text-pally-brown-dark"
          >
            Menu
          </a>
        </p>
      </V4Section>

      {/* The original drone footage from the production site. */}
      <V4Section className="pb-8">
        <DroneVideo />
      </V4Section>

      {/* A short overview, in the PDF's own words. */}
      <V4Section className="bg-pally-warm/40 py-8 md:py-10">
        <h2 className="font-heading text-[clamp(1.4rem,5vw,2rem)] text-pally-brown-dark">
          What this place is
        </h2>
        <p className="mt-2.5 max-w-[62ch] text-[14.5px] leading-relaxed text-pally-brown-light">
          {STORY.welcome}
        </p>
        <p className="mt-3 max-w-[62ch] border-l-2 border-pally-accent/45 pl-4 text-[14px] leading-relaxed text-pally-brown-light">
          {STORY.modesty}
        </p>
      </V4Section>

      {/* Sunday music gets its own highlight: it is the one recurring thing, and folding it
          in with workshops implied everything happened every Sunday. */}
      <V4Section className="py-8 md:py-10">
        <section className="overflow-hidden rounded-2xl bg-pally-brown-dark sm:flex sm:items-stretch">
          <div className="relative aspect-[16/9] w-full shrink-0 sm:aspect-auto sm:w-60 md:w-72">
            <Image
              src="/images/gallery/10.jpg"
              alt="A guitarist, a singer and a cajon player performing in the backyard at Alley Pally, under festoon lights"
              fill
              sizes="(max-width: 640px) 100vw, 288px"
              className="object-cover object-[center_70%]"
            />
          </div>
          <div className="p-5 sm:p-6">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-pally-gold-light">
              Every week
            </p>
            <h2 className="mt-1.5 font-heading text-[clamp(1.3rem,4.5vw,1.9rem)] leading-tight text-white">
              Sunday evenings, live in the backyard
            </h2>
            <p className="mt-2 max-w-[52ch] text-[14px] leading-relaxed text-white/80">
              Every Sunday evening, settle into the garden and enjoy live music. No tickets, no
              entry fee, no cover charge. Just come, listen and unwind.
            </p>
            <p className="mt-3.5">
              <span className="inline-flex items-center rounded-full bg-pally-gold-light px-3 py-1 text-[12px] font-semibold text-pally-brown-dark">
                Every Sunday evening · Free entry
              </span>
            </p>
          </div>
        </section>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <section className="rounded-2xl bg-pally-white p-5 ring-1 ring-pally-sand/70">
            <h2 className="font-heading text-[1.25rem] leading-tight text-pally-brown-dark">
              Eat and drink
            </h2>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-pally-brown-light">
              A vegetarian kitchen with eggs, coffee poured on A2 milk, and a wood-fired oven we
              built ourselves — the fire takes over after 5 PM.
            </p>
            <p className="mt-3 flex flex-wrap gap-2">
              <a
                href={ROUTES.menu}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-pally-green px-5 text-[13px] font-semibold text-white transition-colors hover:bg-pally-green-dark"
              >
                See the menu
              </a>
              <Link
                href={ROUTES.experience("eat-drink")}
                className="inline-flex min-h-11 items-center gap-1 text-[13px] font-semibold text-pally-accent underline underline-offset-4 hover:text-pally-brown-dark"
              >
                Why wood-fired <span aria-hidden>→</span>
              </Link>
            </p>
          </section>

          <section className="rounded-2xl bg-pally-white p-5 ring-1 ring-pally-sand/70">
            <h2 className="font-heading text-[1.25rem] leading-tight text-pally-brown-dark">
              There&rsquo;s more to do here
            </h2>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-pally-brown-light">
              Board games are there to enjoy whenever you visit. Workshops, meetups and other
              special activities take place on scheduled dates.
            </p>
            <p className="mt-3">
              <Link
                href={ROUTES.events}
                className="inline-flex min-h-11 items-center gap-1 rounded-full border-2 border-pally-brown px-5 text-[13px] font-semibold text-pally-brown transition-colors hover:gap-2 hover:bg-pally-brown hover:text-white"
              >
                Explore activities <span aria-hidden>→</span>
              </Link>
            </p>
          </section>
        </div>
      </V4Section>

      {/* Visiting. */}
      <V4Section id="visiting" className="bg-pally-warm/40 py-8 scroll-mt-20 md:py-10">
        <h2 className="font-heading text-[clamp(1.4rem,5vw,2rem)] text-pally-brown-dark">Visiting</h2>
        <dl className="mt-4 grid gap-x-10 gap-y-3 text-[13.5px] sm:grid-cols-2">
          <div className="flex gap-3 border-t border-pally-sand pt-3">
            <dt className="w-24 shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-pally-brown-light/85">
              Address
            </dt>
            <dd className="text-pally-brown-dark">
              {L.address}
              <a
                href={L.mapsUrl}
                className="mt-1 block font-semibold text-pally-green underline underline-offset-4 hover:text-pally-green-dark"
              >
                Open in Google Maps ↗
              </a>
            </dd>
          </div>
          <div className="flex gap-3 border-t border-pally-sand pt-3">
            <dt className="w-24 shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-pally-brown-light/85">
              Hours
            </dt>
            <dd className="text-pally-brown-dark">{L.hours}</dd>
          </div>
          <div className="flex gap-3 border-t border-pally-sand pt-3">
            <dt className="w-24 shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-pally-brown-light/85">
              Phone
            </dt>
            <dd>
              <a href={`tel:${L.phone}`} className="text-pally-brown-dark hover:underline">
                {L.phoneDisplay}
              </a>
            </dd>
          </div>
          <div className="flex gap-3 border-t border-pally-sand pt-3">
            <dt className="w-24 shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-pally-brown-light/85">
              Good to know
            </dt>
            <dd className="text-pally-brown-dark">
              Pets are welcome in the backyard. No smoking anywhere.
            </dd>
          </div>
        </dl>
      </V4Section>

      {/* The four tiles, immediately above the footer. */}
      <V4Section id="ways" className="py-9 scroll-mt-20 md:py-12">
        <h2 className="font-heading text-[clamp(1.5rem,5vw,2.2rem)] text-pally-brown-dark">
          Four ways to make the day yours
        </h2>
        <p className="mt-1.5 max-w-[56ch] text-[13.5px] text-pally-brown-light">
          Open any one for more.
        </p>
        <div className="mt-5">
          <ExpandableTiles tiles={NALLAGANDLA_TILES} />
        </div>
      </V4Section>

      <V4Footer />
    </>
  );
}
