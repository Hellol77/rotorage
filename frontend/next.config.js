/** @type {import('next').NextConfig} */
const withVideos = require("next-videos");
const nextConfig = {
  ...withVideos(),
  images: {
    domains: ["hanroro-fanpage.s3.ap-northeast-2.amazonaws.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.NEXT_PUBLIC_BASE_URL + "/:path*",
      },
    ];
  },
};
module.exports = nextConfig;
