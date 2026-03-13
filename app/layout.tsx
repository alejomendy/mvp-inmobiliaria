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
  title: "Rita & Asociados",
  description: "Exclusividad y transparencia en el mercado inmobiliario de alta gama. Encuentra tu próximo hogar con Rita & Asociados.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${playfair.variable}`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
