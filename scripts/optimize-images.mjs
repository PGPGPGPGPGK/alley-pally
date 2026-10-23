/**
 * Downscale the preview's images to the sizes it actually displays.
 *
 * GitHub Pages has no image optimizer, so `next/image` here serves the original file
 * (see image-loader.ts). The source photographs are full-resolution camera files — the
 * café exterior is 840 KB rendered into a 270px-wide card — and the Mini concept
 * illustration is a 2.65 MB PNG. Load *time* on the published site is fine once the CDN is
 * warm, but the bytes are wasteful for anyone reviewing on a phone on mobile data.
 *
 * Nothing about the design changes. The widest any image is ever rendered here is the
 * 1152px content column, so 1600px on the long edge still leaves headroom on a high-DPI
 * screen. Run once, commit the result.
 *
 * Logos keep their alpha channel and stay PNG. The one photographic PNG is re-encoded as
 * JPEG, which is where most of the saving is.
 *
 *   node scripts/optimize-images.mjs            report only
 *   node scripts/optimize-images.mjs --write    rewrite the files
 */
import sharp from "sharp";
import { readdir, stat, writeFile, rename, unlink } from "node:fs/promises";
import { join, extname, basename } from "node:path";

const WRITE = process.argv.includes("--write");
const ROOTS = ["public/images", "public/preview-concepts"];
const MAX_EDGE = 1600;
/** Line art, used tiny in the header and footer; nothing needs it larger. */
const LOGO_WIDTH = 240;

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let before = 0;
let after = 0;
const rows = [];

for (const root of ROOTS) {
  for await (const file of walk(root)) {
    const ext = extname(file).toLowerCase();
    if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

    const size0 = (await stat(file)).size;
    const img = sharp(file);
    const meta = await img.metadata();
    const isLogo = /logo/i.test(basename(file));
    const photographicPng = ext === ".png" && !isLogo;

    let pipeline = sharp(file);
    let outPath = file;

    if (isLogo) {
      if ((meta.width ?? 0) > LOGO_WIDTH) pipeline = pipeline.resize({ width: LOGO_WIDTH });
      pipeline = pipeline.png({ compressionLevel: 9, palette: true });
    } else {
      const long = Math.max(meta.width ?? 0, meta.height ?? 0);
      if (long > MAX_EDGE) {
        pipeline = pipeline.resize({
          width: (meta.width ?? 0) >= (meta.height ?? 0) ? MAX_EDGE : undefined,
          height: (meta.height ?? 0) > (meta.width ?? 0) ? MAX_EDGE : undefined,
        });
      }
      // A photographic PNG becomes a JPEG; that is where most of the weight is.
      pipeline = pipeline.jpeg({ quality: 78, mozjpeg: true });
      if (photographicPng) outPath = file.replace(/\.png$/i, ".jpg");
    }

    const buf = await pipeline.toBuffer();
    before += size0;
    after += buf.length;
    if (size0 - buf.length > 1024) {
      rows.push(
        `${(size0 / 1024).toFixed(0).padStart(6)} KB → ${(buf.length / 1024)
          .toFixed(0)
          .padStart(6)} KB  ${file}${outPath !== file ? ` → ${basename(outPath)}` : ""}`,
      );
      if (WRITE) {
        if (outPath !== file) {
          await writeFile(outPath, buf);
          await unlink(file);
        } else {
          const tmp = `${file}.tmp`;
          await writeFile(tmp, buf);
          await rename(tmp, file);
        }
      }
    }
  }
}

console.log(rows.join("\n"));
console.log(
  `\n${WRITE ? "rewrote" : "would rewrite"} ${rows.length} file(s): ` +
    `${(before / 1024 / 1024).toFixed(2)} MB → ${(after / 1024 / 1024).toFixed(2)} MB ` +
    `(${Math.round((1 - after / before) * 100)}% smaller)`,
);
if (!WRITE) console.log("re-run with --write to apply");
