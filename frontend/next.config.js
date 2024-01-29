/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ["hanroro-fanpage.s3.ap-northeast-2.amazonaws.com"],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: process.env.NEXT_PUBLIC_BASE_URL + "/:path*",
  //     },
  //   ];
  // },
  output: "export",
  reactStrictMode: false,
};
module.exports = nextConfig;
