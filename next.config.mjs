/** @type {import('next').NextConfig} */
const nextConfig = {
  // Sin output: 'export' — Vercel hostea Next.js nativamente con ISR.
  // El export estático causaba problemas cuando el backend estaba dormido durante el build.
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
