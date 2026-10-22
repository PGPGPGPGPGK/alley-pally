"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MEDIA_BASE } from "@/lib/media";
import { DRONE } from "./_data";
import { usePrefersReducedMotion } from "./_motion";
import { BASE_PATH } from "./_routes";

/**
 * The existing production drone shot of Nallagandla, reused rather than replaced.
 *
 * The footage is the original 1280×720, 44-second aerial already on the media host
 * (3.3 MB webm / 4.3 MB mp4). Nothing about it is regenerated.
 *
 * Why it goes through `MEDIA_BASE`: production's Hero.tsx interpolates
 * `process.env.NEXT_PUBLIC_R2_PUBLIC_URL` straight into the source URL, and that variable
 * is not set in this shell, so the request becomes `/undefined/videos/hero-bg.webm` and
 * 404s. `MEDIA_BASE` falls back to the real host, so the preview plays the genuine file
 * without touching Cloudflare, R2 or any environment.
 *
 * Loading: `preload="none"` and the fetch is deferred to idle, so 3.3 MB never blocks the
 * page becoming usable. The poster paints first and is a frame taken from this same
 * footage — the production poster is a portrait interior photograph, which is the wrong
 * image for a wide aerial.
 *
 * Framing: 16/9 on desktop keeps the cinematic composition intact. On a phone the
 * container goes to 4/3 rather than anything taller — the logo sign sits about a quarter
 * of the way across the frame, and a narrower crop would cut it off, which is exactly the
 * "café no longer identifiable" case to avoid. Nothing is stretched: the video is always
 * `object-cover`.
 *
 * Reduced motion: nothing autoplays. The poster stands alone with a play control, so the
 * choice to start moving pictures is the visitor's.
 *
 * Failure: if the video cannot load, the poster simply stays. The section still reads.
 */
export function DroneVideo({ className = "" }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [started, setStarted] = useState(false);

  // Autoplay only when motion is welcome, and only once the page has settled.
  useEffect(() => {
    if (reduced || started) return;
    const idle =
      window.requestIdleCallback?.(() => setStarted(true)) ??
      window.setTimeout(() => setStarted(true), 600);
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number);
      else clearTimeout(idle as number);
    };
  }, [reduced, started]);

  useEffect(() => {
    if (!started) return;
    const v = videoRef.current;
    if (!v) return;
    v.load();
    // A rejected play() is not a failure worth surfacing — the poster is already correct.
    v.play().catch(() => {});
  }, [started]);

  return (
    <figure className={`relative ${className}`}>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-pally-warm sm:aspect-[16/9]">
        <Image
          src={DRONE.poster}
          alt={DRONE.alt}
          fill
          sizes="(max-width: 768px) 100vw, 1100px"
          className="object-cover"
          priority
        />

        {!failed && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            poster={`${BASE_PATH}${DRONE.poster}`}
            aria-label={DRONE.alt}
            onCanPlay={() => setReady(true)}
            onError={() => setFailed(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 motion-reduce:transition-none ${
              ready && started ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={`${MEDIA_BASE}${DRONE.webm}`} type="video/webm" />
            <source src={`${MEDIA_BASE}${DRONE.mp4}`} type="video/mp4" />
          </video>
        )}

        {/* Reduced motion: the visitor starts it, or does not. */}
        {reduced && !started && !failed && (
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="absolute bottom-3 left-3 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-pally-charcoal/85 px-4 text-[13px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-pally-charcoal"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
            Play the flyover
          </button>
        )}
      </div>

      <figcaption className="mt-2 text-[11.5px] text-pally-brown-light/85">
        The café from above, Nallagandla.{" "}
        {failed && <span>Video unavailable right now — the still is from the same flyover.</span>}
      </figcaption>
    </figure>
  );
}
