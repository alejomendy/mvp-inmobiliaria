import { Suspense } from "react";
import type { Metadata } from "next";
import PropiedadesContent from "./PropiedadesContent";

export const metadata: Metadata = {
  title: "Propiedades",
  description:
    "Explorá nuestro catálogo de propiedades en alquiler y venta en Adelia María. Casas, departamentos, terrenos y más con asesoramiento jurídico.",
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
    <main className="bg-[#FAFAF7] min-h-screen">
      <section className="section-container pt-20 pb-16">
        <div className="h-16 bg-[#F0EBE1] rounded-2xl animate-pulse w-1/2 mb-12" />
        <div className="h-12 bg-[#F0EBE1] rounded-2xl animate-pulse w-full" />
      </section>
    </main>
  );
}
