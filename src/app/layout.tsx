import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import { themeById, themeStyle } from "@/preview/design-preview-v2/_themes";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Every page of this preview is noindex, nofollow. It is a design mock-up on a public URL,
 * not the Alley Pally website, and must never be indexed alongside the real one.
 */
export const metadata: Metadata = {
  title: "Alley Pally — design preview",
  description:
    "A temporary design preview of a proposed Alley Pally website. Not the live site.",
  robots: { index: false, follow: false, nocache: true },
};

/** Warm Clay, the approved palette, read from the same token file the design uses. */
const PALETTE = themeById("warm-clay")!;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${dmSerif.variable} ${inter.variable} bg-pally-cream antialiased`}
        data-palette={PALETTE.id}
        style={themeStyle(PALETTE)}
      >
        {/* Scoped here rather than in globals.css, exactly as the preview routes do it. */}
        <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          [data-palette] :where(a, button):focus-visible {
            outline: 3px solid var(--pally-accent);
            outline-offset: 2px;
          }
          .v4-fade { animation: v4-fade .3s ease both; }
          @keyframes v4-fade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
          @media (prefers-reduced-motion: reduce) { .v4-fade { animation: none; } }
        `}</style>
        {/* The settle starts the name words transparent, so without JavaScript they would
            never arrive. This is the no-JS floor: everything visible, nothing animated. */}
        <noscript>
          <style>{`.v4-settle { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
