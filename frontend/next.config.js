/** @type {import('next').NextConfig} */
const withVideos = require("next-videos");
const nextConfig = {
  ...withVideos(),
  images: {
    domains: ["hanroro-fanpage.s3.ap-northeast-2.amazonaws.com"],
  },
};
module.exports = nextConfig;