import type { Metadata } from "next";
import { Menu } from "@/components/sections/Menu";
import { miniMenu } from "@/lib/menu-config";
import { V4Nav } from "@/preview/design-preview-v4/_nav";
import { V4Footer, V4Strip } from "@/preview/design-preview-v4/_ui";

export const metadata: Metadata = {
  title: "Mini Alley Pally — the menu",
  description:
    "The express menu at Mini Alley Pally, inside Pickleball Central. Design preview, not the live site.",
  robots: { index: false, follow: false },
};

/**
 * Mini's digital menu, inside the preview.
 *
 * It is here because it exists nowhere else yet — unlike Nallagandla's menu, which is
 * already live and which this preview links out to rather than copying. Same component and
 * same interaction as the real menu; only the content is Mini's.
 *
 * The preview's own header and footer are used rather than the production chrome, so the
 * page sits inside the design being reviewed instead of looking like a different site.
 */
export default function MiniMenuPage() {
  return (
    <>
      <V4Strip name="Mini Alley Pally · menu" />
      <V4Nav />
      <main>
        <Menu content={miniMenu} />
      </main>
      <V4Footer />
    </>
  );
}
