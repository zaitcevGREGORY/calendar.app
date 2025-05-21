/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  distDir: ".next",
  experimental: {
    turbo: true,
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
