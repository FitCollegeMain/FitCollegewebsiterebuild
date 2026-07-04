import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // STATIC_EXPORT=1 npm run build → static HTML in ./out (for demos / static hosting).
  // Normal builds stay server-based so the site can later add API routes/forms.
  output: process.env.STATIC_EXPORT ? "export" : undefined,
};

export default nextConfig;
