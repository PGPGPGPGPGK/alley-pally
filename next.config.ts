import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages.
 *
 * `output: "export"` emits plain HTML/CSS/JS with no server, which is all Pages can host —
 * the production app needs Cloudflare Workers and D1 and is deliberately not forced into
 * this shape. `basePath` matches the repository name, so every Next-generated link and
 * asset URL resolves under /alley-pally/. `trailingSlash` writes each route as its own
 * index.html, which is what makes a direct hit or a refresh on a nested page work on Pages
 * instead of 404ing. Images are unoptimized because the optimizer is a server feature.
 */
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/alley-pally",
  trailingSlash: true,
  // A custom loader rather than `unoptimized`: see image-loader.ts. It returns the file
  // itself, prefixed with the base path, so no optimizer is involved.
  images: { loader: "custom", loaderFile: "./image-loader.ts" },
};

export default nextConfig;
