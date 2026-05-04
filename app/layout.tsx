import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import "./styles/main.css";
import Footer from "./components/Footer";
import Nav from "./components/nav";

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

export const metadata: Metadata = {
  title: {
    default: "Ritta & Asociados | Estudio Jurídico Inmobiliario",
    template: "%s | Ritta & Asociados",
  },
  description:
    "Ritta & Asociados: estudio jurídico integral con amplio catálogo de propiedades en alquiler y venta en Río Cuarto. Asesoramiento personalizado.",
  keywords: ["inmobiliaria", "alquiler", "venta", "propiedades", "Río Cuarto", "Ritta & Asociados", "estudio jurídico"],
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Ritta & Asociados",
    title: "Ritta & Asociados | Estudio Jurídico Inmobiliario",
    description:
      "Amplio catálogo de propiedades en alquiler y venta en Río Cuarto. Asesoramiento jurídico integral.",
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
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
