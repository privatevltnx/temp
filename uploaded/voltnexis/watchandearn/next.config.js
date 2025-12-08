/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // enables static export (no SSR)
  basePath: "/watchandearn", // repo name
  images: {
    unoptimized: true, // GitHub Pages doesn’t support next/image optimization
    domains: ['localhost', 'cloudflare.com'],
  },
};

module.exports = nextConfig;
