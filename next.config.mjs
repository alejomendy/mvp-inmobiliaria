/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/mvp-inmobiliaria',
  assetPrefix: '/mvp-inmobiliaria',
  trailingSlash: true,
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "inmobiliaria-backend-wi6o.onrender.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "inmobiliaria-backend.test",
      },
    ],
  },
};

export default nextConfig;
