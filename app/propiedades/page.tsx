import { Suspense } from "react";
import type { Metadata } from "next";
import PropiedadesContent from "./PropiedadesContent";

export const metadata: Metadata = {
  title: "Propiedades en Alquiler y Venta en Adelia María",
  description:
    "Encontrá casas, departamentos, terrenos y locales en alquiler y venta en Adelia María, Córdoba. Catálogo actualizado con asesoramiento jurídico incluido.",
  keywords: [
    "propiedades en alquiler Adelia María",
    "casas en venta Adelia María",
    "departamentos Adelia María",
    "terrenos en venta Adelia María",
    "locales comerciales Adelia María",
    "alquiler temporario Córdoba",
    "inmuebles Córdoba sur",
  ],
  alternates: { canonical: "/propiedades" },
};

export default function PropiedadesPage() {
  return (
    <Suspense fallback={<PropiedadesLoadingFallback />}>
      <PropiedadesContent />
    </Suspense>
  );
}

function PropiedadesLoadingFallback() {
  return (
    <main className="bg-surface min-h-screen">
      <section className="section-container pt-20 pb-16">
        <div className="h-16 bg-surface-warm rounded-2xl animate-pulse w-1/2 mb-12" />
        <div className="h-12 bg-surface-warm rounded-2xl animate-pulse w-full" />
      </section>
    </main>
  );
}
