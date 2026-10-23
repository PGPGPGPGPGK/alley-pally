/**
 * Re-derive this static preview from the design source.
 *
 * The real design lives in the main Alley Pally project under
 * `src/app/design-preview-v4/`, where it runs against Cloudflare and D1. This repository
 * is a cut-down static copy of it for GitHub Pages. Rather than hand-copying files each
 * time the design moves, this script copies the shared modules and then re-applies the
 * handful of changes that are specific to being published statically.
 *
 * What is NOT copied, because this copy owns it:
 *   _routes.ts            routes live at the site root here, and the menu, library and
 *                         legal links point at the live website
 *   layout.tsx, page.tsx  this site's own shell and homepage wiring
 *   events/, experience/  rewritten without the database
 *
 *   node scripts/sync-from-source.mjs [--source <path>]
 */
import { copyFile, readFile, writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";

const argv = process.argv;
const SRC =
  argv.includes("--source") ? argv[argv.indexOf("--source") + 1] : "C:/Users/pg/alley pally website";
const DST = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

/** [from (relative to the source repo), to (relative to here)] */
const FILES = [
  ["src/app/design-preview/_ui.tsx", "src/preview/design-preview/_ui.tsx"],
  ["src/app/design-preview/_data.ts", "src/preview/design-preview/_data.ts"],
  ["src/app/design-preview-v2/_themes.ts", "src/preview/design-preview-v2/_themes.ts"],
  ["src/app/design-preview-v2/_data.ts", "src/preview/design-preview-v2/_data.ts"],
  ["src/app/design-preview-v2/[theme]/_data.ts", "src/preview/design-preview-v2/[theme]/_data.ts"],
  ["src/app/design-preview-v3/_data.ts", "src/preview/design-preview-v3/_data.ts"],
  ["src/app/design-preview-v3/_ui.tsx", "src/preview/design-preview-v3/_ui.tsx"],
  ["src/app/design-preview-v4/_data.ts", "src/preview/design-preview-v4/_data.ts"],
  ["src/app/design-preview-v4/_drone.tsx", "src/preview/design-preview-v4/_drone.tsx"],
  ["src/app/design-preview-v4/_motion.ts", "src/preview/design-preview-v4/_motion.ts"],
  ["src/app/design-preview-v4/_name.tsx", "src/preview/design-preview-v4/_name.tsx"],
  ["src/app/design-preview-v4/_tiles.tsx", "src/preview/design-preview-v4/_tiles.tsx"],
  ["src/app/design-preview-v4/_ui.tsx", "src/preview/design-preview-v4/_ui.tsx"],
  ["src/app/design-preview-v4/hearth/page.tsx", "src/preview/design-preview-v4/hearth/page.tsx"],
  ["src/app/design-preview-v4/nallagandla/page.tsx", "src/preview/design-preview-v4/nallagandla/page.tsx"],
  ["src/app/design-preview-v4/mini/page.tsx", "src/preview/design-preview-v4/mini/page.tsx"],
];

for (const [from, to] of FILES) {
  const dest = join(DST, to);
  await mkdir(dirname(dest), { recursive: true });
  await copyFile(join(SRC, from), dest);
}
console.log(`copied ${FILES.length} files from ${SRC}`);

/** Apply one replacement and fail loudly if the anchor has moved. */
async function patch(rel, edits) {
  const p = join(DST, rel);
  let s = await readFile(p, "utf8");
  for (const [find, replace, optional] of edits) {
    if (!s.includes(find)) {
      if (optional) continue;
      throw new Error(`sync: anchor not found in ${rel}:\n  ${find.slice(0, 90)}`);
    }
    s = s.split(find).join(replace);
  }
  await writeFile(p, s, "utf8");
}

// 1. The preview marker. The source links to its own index, which does not exist here,
//    and the published page needs to say plainly that it is not the live website.
const STRIP_START = "export function V4Strip(";
const uiPath = join(DST, "src/preview/design-preview-v4/_ui.tsx");
let ui = await readFile(uiPath, "utf8");
const from = ui.indexOf(STRIP_START);
const after = ui.indexOf("\n}", ui.indexOf("return (", from)) + 2;
ui =
  ui.slice(0, from) +
  `export function V4Strip({ name }: { name?: string }) {
  return (
    <p className="bg-pally-charcoal px-3 py-1.5 text-center text-[11px] leading-snug text-white/80">
      <span className="font-semibold text-white">Design preview</span> \u00b7 a proposed redesign,
      not the live Alley Pally website{name ? \` \u00b7 \${name}\` : ""}
    </p>
  );
}` +
  ui.slice(after);
await writeFile(uiPath, ui, "utf8");

// 2. Legal and library pages already exist on the live site; link out, never duplicate.
await patch("src/preview/design-preview-v4/_ui.tsx", [
  ['import { HOME, ROUTES, V4 } from "./_routes";', 'import { HOME, ROUTES, V4 } from "./_routes";'],
  ['<a href="/about" className="hover:underline">', "<a href={ROUTES.about} className=\"hover:underline\">", true],
  ['<a href="/privacy" className="hover:underline">', "<a href={ROUTES.privacy} className=\"hover:underline\">", true],
  ['<a href="/terms" className="hover:underline">', "<a href={ROUTES.terms} className=\"hover:underline\">", true],
  ['<a href="/about" className="underline underline-offset-2">', "<a href={ROUTES.about} className=\"underline underline-offset-2\">", true],
]);

// 3. The <video poster> is a raw attribute, so Next never prefixes it with the base path.
await patch("src/preview/design-preview-v4/_drone.tsx", [
  ['import { usePrefersReducedMotion } from "./_motion";',
   'import { usePrefersReducedMotion } from "./_motion";\nimport { BASE_PATH } from "./_routes";'],
  ["poster={FILM.poster}", "poster={`${BASE_PATH}${FILM.poster}`}"],
]);

// 4. The Mini illustration is a JPEG here; the source keeps the original PNG.
await patch("src/preview/design-preview-v4/_data.ts", [
  ["mini-kiosk-golden-hour.png", "mini-kiosk-golden-hour.jpg"],
]);

// 5. U+2197 renders as a blue emoji glyph on some platforms; U+FE0E forces the text form.
for (const [, to] of FILES) {
  if (!to.endsWith(".tsx")) continue;
  const p = join(DST, to);
  const s = await readFile(p, "utf8");
  const fixed = s.replace(/\u2197\uFE0E?/g, "\u2197\uFE0E");
  if (fixed !== s) await writeFile(p, fixed, "utf8");
}

console.log("preview-specific patches re-applied");
