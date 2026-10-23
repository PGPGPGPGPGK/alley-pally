import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Photo } from "../../design-preview/_ui";
import { LOCATIONS, MINI, MINI_ARTWORK, MINI_PHOTO } from "../_data";
import { V4Nav } from "../_nav";
import { ROUTES } from "../_routes";
import { V4Footer, V4Section, V4Strip } from "../_ui";

export const metadata: Metadata = {
  title: "V4 · Mini Alley Pally, Pickleball Central",
  description:
    "Mini Alley Pally is an express café inside Pickleball Central — coffee, loaded bites and wood-fired pizza, court-side. Open 7 AM – 11 PM.",
  robots: { index: false, follow: false },
};

const L = LOCATIONS.mini;

/**
 * Mini: short on purpose.
 *
 * It is an express café inside someone else's venue, not a second Alley Pally. The October
 * 2026 booklet settled two things that used to be unknown here: the hours (7 AM – 11 PM,
 * confirmed) and the menu (Mini has its own, at /mini/menu, and it is not Nallagandla's).
 *
 * The hero no longer carries an "illustration, not a photograph" overlay. The provenance
 * has not gone anywhere — it is recorded in public/preview-concepts/mini/manifest.json and
 * the alt text still describes the image as a concept illustration, so nothing here
 * presents generated artwork as a photograph of the premises. The genuine frontage
 * photograph still leads the page; the artwork is atmosphere underneath it.
 */
export default function Mini() {
  return (
    <>
      <V4Strip name="Mini Alley Pally" />
      <V4Nav />

      <V4Section className="pb-6 pt-8 md:pt-11">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-pally-accent">
          {MINI.rhythm}
        </p>
        <h1 className="mt-2 font-heading text-[clamp(2rem,8vw,3.4rem)] leading-[1.05] tracking-[-0.015em] text-pally-brown-dark">
          Mini Alley Pally
        </h1>
        <p className="mt-3 max-w-[48ch] font-heading text-[clamp(1.1rem,4vw,1.5rem)] leading-tight text-pally-accent">
          {MINI.tagline}
        </p>
        <p className="mt-3 max-w-[54ch] text-[14.5px] leading-relaxed text-pally-brown-light">
          An express café inside Pickleball Central, {L.area}. Stop between games for a proper
          coffee, something hot off the counter, and two minutes to catch your breath.
        </p>

        <div className="mt-5 grid gap-5 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:items-start">
          <figure>
            <Photo src={MINI_PHOTO.sign.src} alt={MINI_PHOTO.sign.alt} ratio="5/3" />
            <figcaption className="mt-2 text-[11.5px] text-pally-brown-light/85">
              The kiosk frontage at Pickleball Central.
            </figcaption>
          </figure>

          <div>
            <dl className="text-[13.5px]">
              {MINI.hours.map((h) => (
                <div key={h.label} className="flex gap-3 border-t border-pally-sand pt-2.5 first:border-t-0 first:pt-0">
                  <dt className="w-32 shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-pally-brown-light/85">
                    {h.label}
                  </dt>
                  <dd className="text-pally-brown-dark">{h.value}</dd>
                </div>
              ))}
              <div className="mt-2.5 flex gap-3 border-t border-pally-sand pt-2.5">
                <dt className="w-32 shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-pally-brown-light/85">
                  Where
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
              <div className="mt-2.5 flex gap-3 border-t border-pally-sand pt-2.5">
                <dt className="w-32 shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-pally-brown-light/85">
                  Phone
                </dt>
                <dd>
                  <a href={`tel:${L.phone}`} className="text-pally-brown-dark hover:underline">
                    {L.phoneDisplay}
                  </a>
                </dd>
              </div>
            </dl>

            <a
              href={ROUTES.miniMenu}
              className="mt-4 inline-flex min-h-12 items-center justify-center rounded-full bg-pally-green px-6 text-[14px] font-semibold text-white transition-colors hover:bg-pally-green-dark"
            >
              See Mini&rsquo;s menu
            </a>
          </div>
        </div>
      </V4Section>

      <V4Section className="bg-pally-warm/40 py-8 md:py-10">
        <h2 className="font-heading text-[clamp(1.4rem,5vw,2rem)] text-pally-brown-dark">
          Small on purpose
        </h2>
        <p className="mt-2 max-w-[62ch] text-[14.5px] leading-relaxed text-pally-brown-light">
          {MINI.what}
        </p>
        <p className="mt-2.5 max-w-[62ch] text-[14px] leading-relaxed text-pally-brown-light">
          It is not a second full-sized café: the Reader&rsquo;s Room, the Game Room, the Quiet
          Studio and the Backyard are all at{" "}
          <Link
            href={ROUTES.nallagandla}
            className="font-semibold text-pally-accent underline underline-offset-2 hover:text-pally-brown-dark"
          >
            Nallagandla
          </Link>
          .
        </p>

        <figure className="mt-6">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-pally-warm ring-1 ring-pally-sand/70">
            <Image
              src={MINI_ARTWORK.src}
              alt={MINI_ARTWORK.alt}
              fill
              sizes="(max-width: 768px) 100vw, 1100px"
              className="object-cover"
            />
          </div>
        </figure>
      </V4Section>

      <V4Section className="py-8">
        <h2 className="font-heading text-[clamp(1.3rem,4.5vw,1.8rem)] text-pally-brown-dark">
          Behind the same gate
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {MINI.neighbours.map((n) => (
            <section key={n.name} className="rounded-2xl bg-pally-white p-4 ring-1 ring-pally-sand/70">
              <h3 className="font-heading text-lg text-pally-brown-dark">
                {n.href ? (
                  <a
                    href={n.href}
                    rel="noreferrer"
                    className="underline underline-offset-4 hover:text-pally-accent"
                  >
                    {n.name} ↗︎
                  </a>
                ) : (
                  n.name
                )}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-pally-brown-light">{n.note}</p>
            </section>
          ))}
        </div>

        <p className="mt-6 flex flex-wrap gap-2.5">
          <a
            href={L.mapsUrl}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-pally-green px-5 text-[13px] font-semibold text-white transition-colors hover:bg-pally-green-dark"
          >
            Directions to Mini ↗︎
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
