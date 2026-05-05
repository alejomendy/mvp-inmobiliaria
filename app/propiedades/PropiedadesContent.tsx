"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Property } from "@/lib/properties";
import { getPropiedades, TipoOperacion } from "@/lib/api";
import PropertyCard from "../components/PropertyCard";
import PropietarioBanner from "../components/PropietarioBanner";

type FilterType = "todos" | "venta" | "alquiler" | "alquiler_temporal";

const FILTERS: { value: FilterType; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "venta", label: "En Venta" },
  { value: "alquiler", label: "En Alquiler" },
  { value: "alquiler_temporal", label: "Alquiler Temporal" },
];

export default function PropiedadesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialFilter = (searchParams.get("tipo") as FilterType) || "todos";
  const [filter, setFilter] = useState<FilterType>(initialFilter);
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadProperties = useCallback(async (tipo: FilterType) => {
    setIsLoading(true);
    setError(false);
    try {
      const tipoParam = tipo === "todos" ? undefined : (tipo as TipoOperacion);
      const data = await getPropiedades({ tipo: tipoParam });
      setProperties(data);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProperties(filter);
  }, [filter, loadProperties]);

  const handleFilter = (tipo: FilterType) => {
    setFilter(tipo);
    const params = new URLSearchParams();
    if (tipo !== "todos") params.set("tipo", tipo);
    router.replace(`/propiedades${params.toString() ? `?${params.toString()}` : ""}`, { scroll: false });
  };

  return (
    <main className="bg-[#FAFAF7] min-h-screen">

      {/* Page Header */}
      <section className="section-container pt-20 pb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-px bg-[#C9A96E]" />
          <span className="label-caps !text-[#C9A96E]">Catálogo</span>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <h1 className="title-serif text-5xl md:text-7xl">Propiedades</h1>
          <p className="text-sans-sm max-w-xs md:text-right">
            Encontremos un inmueble que se adapte a vos.
          </p>
        </div>

        {/* Filter pills — activo en dorado */}
        <div className="mt-12 flex flex-wrap items-center gap-3">
          <span className="label-caps !text-[#8B9485]">Filtrar por:</span>
          {FILTERS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => handleFilter(value)}
              className={`label-caps px-5 py-2.5 rounded-full transition-all ${
                filter === value
                  ? "bg-[#C9A96E] text-[#1A1714] border border-[#C9A96E] shadow-sm"
                  : "border border-[#D2D6CB] text-[#66615C] hover:border-[#C9A96E] hover:text-[#C9A96E]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* Thin divider */}
      <div className="section-container">
        <div className="border-t border-[#D2D6CB]/50" />
      </div>

      {/* Properties Grid */}
      <section className="section-container py-16 md:py-24">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-[2rem] overflow-hidden border border-[#D2D6CB]/40 animate-pulse">
                <div className="w-full aspect-[4/3] bg-[#F0EBE1]" />
                <div className="p-7 space-y-3">
                  <div className="h-3 bg-[#F0EBE1] rounded w-1/3" />
                  <div className="h-6 bg-[#F0EBE1] rounded w-2/3" />
                  <div className="h-4 bg-[#F0EBE1] rounded w-full" />
                  <div className="h-4 bg-[#F0EBE1] rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 space-y-4">
            <p className="title-serif text-2xl">No se pudo cargar el catálogo</p>
            <p className="text-sans-sm text-[#66615C]">Hubo un error de conexión. Por favor, intentá de nuevo.</p>
            <button onClick={() => loadProperties(filter)} className="btn-outline mt-4">
              Reintentar
            </button>
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 space-y-3">
            <p className="title-serif text-2xl">Sin propiedades disponibles</p>
            <p className="text-sans-sm text-[#66615C]">
              {filter !== "todos"
                ? "No hay propiedades con este filtro en este momento."
                : "No hay propiedades cargadas en el catálogo."}
            </p>
            {filter !== "todos" && (
              <button onClick={() => handleFilter("todos")} className="btn-outline mt-4">
                Ver todas las propiedades
              </button>
            )}
          </div>
        )}
      </section>

      {/* Publicá tu propiedad */}
      <section className="section-container pb-24">
        <PropietarioBanner variant="light" />
      </section>
    </main>
  );
}
