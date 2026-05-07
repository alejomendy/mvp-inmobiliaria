/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // output: export solo en build de producción — en dev no aplica para evitar
  // el error de generateStaticParams con rutas dinámicas
  ...(isProd ? { output: 'export' } : {}),
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
        protocol: "https",
        // Supabase Storage: *.supabase.co
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        // ImgBB CDN
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "ibb.co",
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
