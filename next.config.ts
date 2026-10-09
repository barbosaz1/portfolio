import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 keeps banners and screenshots visually lossless; 75 is the default.
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
    // Up to 4800px so 2x banners stay sharp on 4K/5K displays.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840, 4800],
  },
  async redirects() {
    return [
      {
        source: "/projects/:slug*",
        destination: "/work/:slug*",
        permanent: true,
      },
      // About, contact and the work index are sections of the home page now.
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/work", destination: "/#work", permanent: true },
    ];
  },
};

export default nextConfig;
