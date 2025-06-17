/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
      },
      {
        protocol: "https",
        hostname: "people.pic1.co",
      },
      {
        protocol: "https",
        hostname: "app-uploads-cdn.fera.ai",
      },
      {
        protocol: "https",
        hostname: "img-wixmp-8be454c954980f083caba37c.wixmp.com",
      },
    ],
  },
};

export default nextConfig;
