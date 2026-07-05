import type { NextConfig } from "next";

// When deploying to GitHub Pages the site is served from a repo subpath
// (e.g. /FitCollegewebsiterebuild). The deploy workflow sets PAGES_BASE_PATH
// to that subpath so asset URLs and internal links resolve correctly.
// Locally it's unset, so `npm run dev` stays at the root (/).
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  // STATIC_EXPORT=1 npm run build → static HTML in ./out (for demos / static hosting).
  // Normal builds stay server-based so the site can later add API routes/forms.
  output: process.env.STATIC_EXPORT ? "export" : undefined,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  // Static export can't use the Next image optimiser (no server at runtime).
  images: { unoptimized: true },
};

export default nextConfig;
