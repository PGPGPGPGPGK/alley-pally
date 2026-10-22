import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Photo } from "../../design-preview/_ui";
import { LOCATIONS, MINI_ARTWORK, MINI_PHOTO } from "../_data";
import { V4Nav } from "../_nav";
import { ROUTES } from "../_routes";
import { V4Footer, V4Section, V4Strip } from "../_ui";

export const metadata: Metadata = {
  title: "V4 · Mini Alley Pally, Parvathapur",
  description:
    "Mini Alley Pally is a small café kiosk inside Pickleball Central in Parvathapur, Hyderabad — a drink and a seat between games.",
  robots: { index: false, follow: false },
};

const L = LOCATIONS.mini;

/**
 * Mini: short on purpose.
 *
 * It is a kiosk inside someone else's venue, not a second café, and it has none of the
 * four rooms. Its hours and menu are still unconfirmed, so both are shown as unconfirmed
 * rather than guessed, and no menu link is offered. The host venue's own listings
 * contradict each other, which is why.
 *
 * Two images, and the order matters. The **photograph** of the kiosk frontage is the
 * recognisable one and leads the page — it is what a visitor will actually look for. The
 * golden-hour **illustration** is atmosphere, placed after the facts, carrying a visible
 * label and a caption that says plainly what it is not. It is more built-out and lusher
 * than the real kiosk and contains invented signage, so it must never be read as a record
 * of the place. Full provenance: public/preview-concepts/mini/manifest.json.
 */
export default function Mini() {
  return (
    <>
      <V4Strip name="Mini Alley Pally" />
      <V4Nav />

      <V4Section className="pb-6 pt-8 md:pt-11">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-pally-accent">
          {L.area} · Hyderabad
        </p>
        <h1 className="mt-2 font-heading text-[clamp(2rem,8vw,3.4rem)] leading-[1.05] tracking-[-0.015em] text-pally-brown-dark">
          Mini Alley Pally
        </h1>
        <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-pally-brown-light">
          {L.tagline}
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-start">
          <figure>
            <Photo src={MINI_PHOTO.sign.src} alt={MINI_PHOTO.sign.alt} ratio="5/3" />
            <figcaption className="mt-2 text-[11.5px] text-pally-brown-light/85">
              The kiosk frontage at Pickleball Central. Photograph.
            </figcaption>
          </figure>

          <dl className="text-[13.5px]">
            <div className="flex gap-3 border-t border-pally-sand pt-3">
              <dt className="w-20 shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-pally-brown-light/85">
                Where
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
            <div className="mt-3 flex gap-3 border-t border-pally-sand pt-3">
              <dt className="w-20 shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-pally-brown-light/85">
                Hours
              </dt>
              <dd className="text-pally-brown-dark">
                <span className="flex flex-wrap items-center gap-1.5">
                  {L.hours}
                  <span className="rounded-full bg-pally-gold/25 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                    Unconfirmed
                  </span>
                </span>
                {L.hoursNote && (
                  <span className="mt-1 block text-[12px] leading-snug text-pally-brown-light">
                    {L.hoursNote}
                  </span>
                )}
              </dd>
            </div>
            <div className="mt-3 flex gap-3 border-t border-pally-sand pt-3">
              <dt className="w-20 shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-pally-brown-light/85">
                Menu
              </dt>
              <dd className="text-pally-brown-light">
                Not yet confirmed. Mini&rsquo;s offering is its own, so the Nallagandla menu is not
                shown here.
              </dd>
            </div>
            <div className="mt-3 flex gap-3 border-t border-pally-sand pt-3">
              <dt className="w-20 shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-pally-brown-light/85">
                Phone
              </dt>
              <dd>
                <a href={`tel:${L.phone}`} className="text-pally-brown-dark hover:underline">
                  {L.phoneDisplay}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </V4Section>

      <V4Section className="bg-pally-warm/40 py-8 md:py-10">
        <h2 className="font-heading text-[clamp(1.4rem,5vw,2rem)] text-pally-brown-dark">
          What Mini is
        </h2>
        <p className="mt-2 max-w-[62ch] text-[14.5px] leading-relaxed text-pally-brown-light">
          A compact café kiosk inside the Pickleball Central premises, with a few tables and
          chairs nearby. It is not a second full-sized café: the Reader&rsquo;s Room, the Game
          Room, the Quiet Studio and the Backyard are all at{" "}
          <Link
            href={ROUTES.nallagandla}
            className="font-semibold text-pally-accent underline underline-offset-2 hover:text-pally-brown-dark"
          >
            Nallagandla
          </Link>
          .
        </p>

        {/* Atmosphere, clearly labelled, after the facts. */}
        <figure className="relative mt-6">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-pally-warm ring-1 ring-pally-sand/70">
            <Image
              src={MINI_ARTWORK.src}
              alt={MINI_ARTWORK.alt}
              fill
              sizes="(max-width: 768px) 100vw, 1100px"
              className="object-cover"
            />
          </div>
          <figcaption className="absolute left-3 top-3 rounded-full bg-pally-charcoal/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
            {MINI_ARTWORK.label}
          </figcaption>
        </figure>
        <p className="mt-2.5 max-w-[66ch] text-[12px] leading-relaxed text-pally-brown-light/90">
          Concept artwork, not a photograph of the premises. It imagines how the kiosk could
          feel at the end of the day; it is lusher and more built-out than the real thing, and
          the signage, menu board and goods shown in it are invented. Nothing in this image
          should be read as what Mini serves or offers.
        </p>
      </V4Section>

      <V4Section className="py-8">
        <h2 className="font-heading text-[clamp(1.3rem,4.5vw,1.8rem)] text-pally-brown-dark">
          Finding your way
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <section className="rounded-2xl bg-pally-white p-4 ring-1 ring-pally-sand/70">
            <h3 className="font-heading text-lg text-pally-brown-dark">Pickleball Central</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-pally-brown-light">
              The venue Mini sits inside. Court bookings, timings and facilities are theirs, not
              ours — please check with them directly.
            </p>
          </section>
          <section className="rounded-2xl bg-pally-white p-4 ring-1 ring-pally-sand/70">
            <h3 className="font-heading text-lg text-pally-brown-dark">Nail Studio by Sahithi</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-pally-brown-light">
              Nearby, and a separate business. Mentioned only to help you find your way — we
              cannot speak for its services or hours.
            </p>
          </section>
        </div>

        <p className="mt-6 flex flex-wrap gap-2.5">
          <a
            href={L.mapsUrl}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-pally-green px-5 text-[13px] font-semibold text-white transition-colors hover:bg-pally-green-dark"
          >
            Directions to Mini ↗
          </a>
          <Link
            href={ROUTES.nallagandla}
            className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-pally-brown px-5 text-[13px] font-semibold text-pally-brown transition-colors hover:bg-pally-brown hover:text-white"
          >
            The main café
          </Link>
        </p>
      </V4Section>

      <V4Footer />
    </>
  );
}
