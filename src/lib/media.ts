/**
 * Public media host (Cloudflare R2, `ap-media`). The Nallagandla drone footage is the only
 * thing this preview loads from it.
 *
 * Trimmed for the preview: the production module also rewrites legacy storage URLs for
 * database-backed rows, which this static site has none of.
 */
export const MEDIA_BASE =
  process.env.NEXT_PUBLIC_R2_PUBLIC_URL ?? "https://media.alleypallycafe.com";
