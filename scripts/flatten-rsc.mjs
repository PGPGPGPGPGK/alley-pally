/**
 * Emit the flattened RSC payload names the client router asks for.
 *
 * Next's static export writes its per-segment prefetch payloads as nested directories:
 *
 *   events/__next.events/__PAGE__.txt
 *
 * but the client router requests them dot-joined:
 *
 *   events/__next.events.__PAGE__.txt
 *
 * On a server that mismatch never shows, because nothing is reading files off disk by
 * name. On GitHub Pages it is a 404 on every link hover — harmless to navigation, since
 * the router falls back to a full page load, but it fills the console with errors.
 *
 * This copies each nested payload to the flat name beside it. The originals are left in
 * place: they cost a few KB and removing them would be a guess about which form some
 * future Next version asks for.
 */
import { readdir, copyFile, stat } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const OUT = new URL("../out/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let copied = 0;
for await (const file of walk(OUT)) {
  if (!file.endsWith(".txt")) continue;
  const parts = relative(OUT, file).split(sep);
  const i = parts.findIndex((p) => p.startsWith("__next."));
  // Only payloads that actually sit inside a __next.* directory need flattening.
  if (i === -1 || i === parts.length - 1) continue;
  const flat = [...parts.slice(0, i), parts.slice(i).join(".")].join(sep);
  const dest = join(OUT, flat);
  if (await stat(dest).catch(() => null)) continue;
  await copyFile(file, dest);
  copied++;
}

console.log(`flatten-rsc: wrote ${copied} flattened payload file(s)`);
