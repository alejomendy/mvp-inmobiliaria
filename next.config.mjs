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
      }
    ],
  },
};

export default nextConfig;
