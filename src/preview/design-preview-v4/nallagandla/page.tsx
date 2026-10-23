import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Photo } from "../../design-preview/_ui";
import { FLOORS_UNCONFIRMED, FOOD, LOCATIONS, NALLAGANDLA_TILES, STORY } from "../_data";
import { CafeFilm } from "../_drone";
import { V4Nav } from "../_nav";
import { ROUTES } from "../_routes";
import { ExpandableTiles } from "../_tiles";
import { QuickActions, Reviews, V4Footer, V4Section, V4Strip } from "../_ui";

export const metadata: Metadata = {
  title: "Alley Pally, Nallagandla — books, board games and a backyard",
  description:
    "The main café in Nallagandla, Hyderabad. A room for reading, a room for board games, a quiet studio and a planted backyard with live music on Sunday evenings.",
  robots: { index: false, follow: false },
};

const L = LOCATIONS.nallagandla;

/**
 * The main café — the richer of the two location pages.
 *
 * Order follows the brief: the film, the three actions someone needs if they have already
 * decided to come, then the rooms, the food, Sunday music, what else there is, the reviews,
 * and the practical details.
 *
 * The opening line is about the place, not the amenities. Sockets and Wi-Fi moved into the
 * Quiet Studio card and the visiting block, because leading with them made the café read
 * like a workspace advertisement.
 *
 * Deliberately absent: seat counts, table breakdowns, room layouts, and any mention of the
 * printer or stationery. All stripped at the data layer and asserted by scripts/check-v4.mjs.
 */
export default function Nallagandla() {
  return (
    <>
      <V4Strip />
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

      <V4Section className="pb-5 pt-8 md:pt-11">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-pally-accent">
          {L.area} · Hyderabad
        </p>
        <h1 className="mt-2 font-heading text-[clamp(2rem,8vw,3.4rem)] leading-[1.05] tracking-[-0.015em] text-pally-brown-dark">
          Alley Pally, Nallagandla
        </h1>
        <p className="mt-3 max-w-[54ch] text-[15px] leading-relaxed text-pally-brown-light">
          Books you can borrow, board games with all their pieces, a planted backyard, and a
          wood-fired oven that takes over after five.
        </p>
        <p className="mt-2 text-[13px] font-semibold text-pally-brown-dark">{L.hours}</p>

        <QuickActions className="mt-5 max-w-xl" />
      </V4Section>

      <V4Section className="pb-8">
        <CafeFilm />
      </V4Section>

      <V4Section className="bg-pally-warm/40 py-8 md:py-10">
        <h2 className="font-heading text-[clamp(1.4rem,5vw,2rem)] text-pally-brown-dark">
          What this place is
        </h2>
        <p className="mt-2.5 max-w-[62ch] text-[14.5px] leading-relaxed text-pally-brown-light">
          {STORY.welcome}
        </p>
      </V4Section>

      {/* The rooms, so someone can pick their corner before they arrive. */}
      <V4Section id="corners" className="py-9 scroll-mt-20 md:py-12">
        <h2 className="font-heading text-[clamp(1.5rem,5vw,2.2rem)] text-pally-brown-dark">
          Find your corner
        </h2>
        <p className="mt-1.5 max-w-[58ch] text-[13.5px] text-pally-brown-light">
          Four rooms, each for a different kind of afternoon. Open any one for more.
        </p>
        <div className="mt-5">
          <ExpandableTiles tiles={NALLAGANDLA_TILES} />
        </div>
        <p className="mt-4 max-w-[64ch] rounded-xl bg-pally-gold/15 px-3.5 py-2.5 text-[12px] leading-relaxed text-pally-brown-dark">
          <span className="font-semibold">Needs confirming:</span> {FLOORS_UNCONFIRMED}
        </p>
      </V4Section>

      {/* Food: modest words, good pictures. */}
      <V4Section className="bg-pally-warm/40 py-9 md:py-12">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center">
          <div>
            <h2 className="font-heading text-[clamp(1.5rem,5vw,2.2rem)] leading-tight text-pally-brown-dark">
              {FOOD.headline}
            </h2>
            <p className="mt-3 max-w-[52ch] text-[14.5px] leading-relaxed text-pally-brown-light">
              {FOOD.body}
            </p>
            <a
              href={ROUTES.menu}
              className="mt-4 inline-flex min-h-12 items-center justify-center rounded-full bg-pally-green px-6 text-[14px] font-semibold text-white transition-colors hover:bg-pally-green-dark"
            >
              See the menu
            </a>
          </div>
          <figure>
            <Photo src={FOOD.lead.src} alt={FOOD.lead.alt} ratio="4/3" />
          </figure>
        </div>

        <ul className="mt-5 grid grid-cols-4 gap-2 sm:gap-3">
          {FOOD.dishes.map((d) => (
            <li key={d.src}>
              <div className="relative aspect-square overflow-hidden rounded-xl bg-pally-white ring-1 ring-pally-sand/70">
                <Image src={d.src} alt={d.alt} fill sizes="(max-width: 640px) 25vw, 160px" className="object-cover" />
              </div>
            </li>
          ))}
        </ul>
      </V4Section>

      {/* Sunday music gets its own highlight: it is the one recurring thing. */}
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

        <section className="mt-3 rounded-2xl bg-pally-white p-5 ring-1 ring-pally-sand/70">
          <h2 className="font-heading text-[1.25rem] leading-tight text-pally-brown-dark">
            There&rsquo;s more to do here
          </h2>
          <p className="mt-1.5 max-w-[62ch] text-[13.5px] leading-relaxed text-pally-brown-light">
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
      </V4Section>

      {/* A few real reviews, kept quiet. */}
      <V4Section className="bg-pally-warm/40 py-9 md:py-11">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 className="font-heading text-[clamp(1.4rem,5vw,2rem)] text-pally-brown-dark">
            What people say
          </h2>
          <p className="text-[12px] text-pally-brown-light">From Google reviews.</p>
        </div>
        <div className="mt-4">
          <Reviews />
        </div>
      </V4Section>

      <V4Section id="visiting" className="py-9 scroll-mt-20 md:py-11">
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
                Open in Google Maps ↗︎
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
              A power socket at every table and free Wi-Fi. Pets are welcome in the backyard. No
              smoking anywhere.
            </dd>
          </div>
        </dl>
      </V4Section>

      <V4Footer />
    </>
  );
}
