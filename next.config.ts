import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async redirects() {
    return [
      {
        source: "/shop/:path*",
        destination: "/shelf/:path*",
        permanent: true,
      },
      {
        source: "/theshelf/:path*",
        destination: "/shelf/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
