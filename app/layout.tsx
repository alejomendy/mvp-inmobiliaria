import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import "./styles/main.css";
import Footer from "./components/Footer";
import Nav from "./components/nav";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.rittaasociados.com.ar";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ritta & Asociados | Inmobiliaria y Estudio Jurídico en Adelia María",
    template: "%s | Ritta & Asociados",
  },
  description:
    "Ritta & Asociados — inmobiliaria y estudio jurídico en Adelia María, Córdoba. Alquiler y venta de casas, departamentos y terrenos. Asesoramiento legal personalizado.",
  keywords: [
    "inmobiliaria Adelia María",
    "alquiler Adelia María",
    "casas en venta Adelia María",
    "departamentos en alquiler Adelia María",
    "terrenos Adelia María",
    "estudio jurídico Adelia María",
    "abogado inmobiliario Córdoba",
    "Ritta y Asociados",
    "propiedades Córdoba",
    "alquiler temporario Adelia María",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    locale: "es_AR",
    siteName: "Ritta & Asociados",
    title: "Ritta & Asociados | Inmobiliaria y Estudio Jurídico en Adelia María",
    description:
      "Alquiler y venta de propiedades en Adelia María, Córdoba. Asesoramiento jurídico integral.",
    images: [{ url: "/logo.png", width: 635, height: 393, alt: "Ritta & Asociados" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["RealEstateAgent", "LegalService"],
  name: "Ritta & Asociados",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/logo.png`,
  description:
    "Inmobiliaria y estudio jurídico integral en Adelia María, Córdoba. Alquiler y venta de propiedades con asesoramiento legal personalizado.",
  telephone: "+5493584153649",
  email: "estudiorittayasociados@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Alfonsina Storni 105",
    addressLocality: "Adelia María",
    addressRegion: "Córdoba",
    postalCode: "5843",
    addressCountry: "AR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -33.6333,
    longitude: -64.0333,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  sameAs: ["https://www.instagram.com/rittayasociados"],
  areaServed: {
    "@type": "City",
    name: "Adelia María",
    containedInPlace: {
      "@type": "State",
      name: "Córdoba",
      containedInPlace: { "@type": "Country", name: "Argentina" },
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <Script
          id="json-ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
