import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async redirects() {
    return [
      // The store lives at /shop. /shelf and /shelf/[slug] redirect to /shop in
      // the route handlers; keep the old /theshelf path working too.
      {
        source: "/theshelf/:path*",
        destination: "/shop/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
