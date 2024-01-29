/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ["hanroro-fanpage.s3.ap-northeast-2.amazonaws.com"],
  },
  output: process.env.NODE_ENV === "development" ? undefined : "export",
  reactStrictMode: false,
};
if (process.env.NODE_ENV === "development") {
  nextConfig.rewrites = async () => {
    return [
      {
        source: "/api/:path*",
        destination: process.env.NEXT_PUBLIC_BASE_URL + "/:path*",
      },
    ];
  };
}

module.exports = nextConfig;
