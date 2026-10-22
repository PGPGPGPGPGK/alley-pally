/**
 * Prefix local image paths with the GitHub Pages base path.
 *
 * `next/image` applies `basePath` to the optimizer URL, but with `unoptimized: true` it
 * emits the raw `src` untouched — so every /images/... would 404 under /alley-pally/.
 * A custom loader is the supported way to fix that for a static export: it runs for every
 * image, leaves absolute URLs alone, and never calls an optimizer that does not exist here.
 */
export default function basePathLoader({ src }: { src: string; width: number; quality?: number }) {
  if (/^https?:\/\//.test(src)) return src;
  return `/alley-pally${src.startsWith("/") ? src : `/${src}`}`;
}
