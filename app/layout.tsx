import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

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
  title: "CHAPERO | Bienes Raíces de Lujo",
  description: "Encuentra tu refugio con CHAPERO. Espacios seleccionados y diseñados para la luz y el confort.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-[#F5F4F0] text-[#33312E]`}>
        {children}
      </body>
    </html>
  );
}
