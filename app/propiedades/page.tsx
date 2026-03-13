"use client";

import { useState } from "react";
import { properties } from "@/lib/properties";
import Nav from "../components/nav";
import PropertyCard from "../components/PropertyCard";

export default function PropiedadesPage() {
  const [filter, setFilter] = useState<"todos" | "venta" | "alquiler">("todos");

  const filteredProperties = properties.filter((prop) => {
    if (filter === "todos") return true;
    return prop.type === filter;
  });

  return (
    <main className="bg-[#FAFAF7] min-h-screen">
      <Nav />
      {/* Page Header */}
      <section className="section-container pt-20 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <h1 className="title-serif text-5xl md:text-7xl">
              Propiedades
            </h1>
          </div>
          <p className="text-sans-sm max-w-xs md:text-right">
            Descubrí nuestra selección de propiedades únicas, tanto para venta como para alquiler.
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mt-12">
          <button 
            onClick={() => setFilter("todos")}
            className={`label-caps px-5 py-2.5 rounded-full transition-all ${
              filter === "todos" ? "bg-[#3A3833] text-white" : "border border-[#D2D6CB] text-[#66615C] hover:border-[#3A3833]"
            }`}
          >
            Todas
          </button>
          <button 
            onClick={() => setFilter("venta")}
            className={`label-caps px-5 py-2.5 rounded-full transition-all ${
              filter === "venta" ? "bg-[#3A3833] text-white" : "border border-[#D2D6CB] text-[#66615C] hover:border-[#3A3833]"
            }`}
          >
            Venta
          </button>
          <button 
            onClick={() => setFilter("alquiler")}
            className={`label-caps px-5 py-2.5 rounded-full transition-all ${
              filter === "alquiler" ? "bg-[#3A3833] text-white" : "border border-[#D2D6CB] text-[#66615C] hover:border-[#3A3833]"
            }`}
          >
            Alquiler
          </button>
        </div>
      </section>

      {/* Thin divider */}
      <div className="section-container">
        <div className="border-t border-[#D2D6CB]/50" />
      </div>

      {/* Properties Grid */}
      <section className="section-container py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
    </main>
  );
}
