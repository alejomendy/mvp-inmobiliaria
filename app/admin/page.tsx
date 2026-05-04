"use client";

import { useEffect, useState } from "react";
import { Property } from "@/lib/properties";
import { getPropiedades, deletePropiedad } from "@/lib/api";
import { Building2, Search, Edit3, Trash2, ExternalLink, PlusCircle, Loader2 } from "lucide-react";
import Link from "next/link";

type Estado = "disponible" | "reservado" | "vendido" | "alquilado";

const ESTADO_CONFIG: Record<Estado, { label: string; classes: string }> = {
  disponible: { label: "Disponible", classes: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
  reservado: { label: "Reservado", classes: "bg-amber-50 text-amber-700 border border-amber-200" },
  vendido: { label: "Vendido", classes: "bg-rose-50 text-rose-700 border border-rose-200" },
  alquilado: { label: "Alquilado", classes: "bg-blue-50 text-blue-700 border border-blue-200" },
};

function EstadoBadge({ estado }: { estado?: string }) {
  const config = ESTADO_CONFIG[(estado as Estado) || "disponible"] ?? ESTADO_CONFIG.disponible;
  return (
    <span className={`px-3 py-1 text-[10px] label-caps rounded-full ${config.classes}`}>
      {config.label}
    </span>
  );
}

export default function AdminDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState<string | number | null>(null);

  const loadProperties = async () => {
    setIsLoading(true);
    const data = await getPropiedades();
    setProperties(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const handleDelete = async (id: string | number, title: string) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar "${title}"? Esta acción no se puede deshacer.`)) return;
    setDeletingId(id);
    const success = await deletePropiedad(id);
    setDeletingId(null);
    if (success) {
      setProperties((prev) => prev.filter((p) => p.id !== id.toString()));
    } else {
      alert("No se pudo eliminar la propiedad. Intentá de nuevo.");
    }
  };

  const filteredProperties = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="title-serif text-4xl mb-2">Propiedades</h2>
          <p className="text-[#66615C] text-sm">Administrá y supervisá todo tu catálogo inmobiliario.</p>
        </div>
        <Link
          href="/admin/propiedades/nueva"
          className="bg-[#3A3833] text-white px-6 py-3 rounded-full label-caps text-sm hover:bg-[#727A6C] transition-colors inline-flex items-center gap-2 shrink-0"
        >
          <PlusCircle size={16} />
          Nueva Propiedad
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total", value: properties.length, color: "bg-[#3A3833]" },
          { label: "Disponibles", value: properties.filter((p) => !p.featured).length, color: "bg-emerald-600" },
          { label: "En Venta", value: properties.filter((p) => p.type === "venta").length, color: "bg-[#C9A96E]" },
          { label: "En Alquiler", value: properties.filter((p) => p.type === "alquiler" || p.type === "alquiler_temporal").length, color: "bg-[#8B9485]" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 border border-[#D2D6CB]/40 shadow-sm">
            <div className={`w-2 h-2 rounded-full ${color} mb-3`} />
            <p className="label-caps text-[#8B9485] mb-1">{label}</p>
            <p className="title-serif text-3xl text-[#3A3833]">{value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#D2D6CB] overflow-hidden shadow-sm">
        <div className="p-5 border-b border-[#D2D6CB] flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B9485]" size={16} />
            <input
              type="text"
              placeholder="Buscar por título o ubicación..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D2D6CB] focus:outline-none focus:ring-1 focus:ring-[#3A3833] text-[#3A3833] text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <span className="text-sm text-[#8B9485] shrink-0">
            {filteredProperties.length} de {properties.length} propiedades
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F5F4F0] text-[#3A3833] label-caps text-[9px] tracking-widest border-b border-[#D2D6CB]">
                <th className="px-6 py-3">Propiedad</th>
                <th className="px-6 py-3">Tipo</th>
                <th className="px-6 py-3">Precio</th>
                <th className="px-6 py-3">Estado</th>
                <th className="px-6 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D2D6CB]/30">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <Loader2 className="animate-spin text-[#3A3833] mx-auto mb-3" size={32} strokeWidth={1.5} />
                    <p className="text-[#8B9485] text-sm">Cargando propiedades...</p>
                  </td>
                </tr>
              ) : filteredProperties.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <Building2 className="text-[#D2D6CB] mx-auto mb-3" size={40} strokeWidth={1} />
                    <p className="text-[#8B9485] text-sm">No se encontraron propiedades.</p>
                  </td>
                </tr>
              ) : (
                filteredProperties.map((p) => (
                  <tr key={p.id} className="hover:bg-[#F5F4F0]/60 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#F0EBE1] shrink-0">
                          {p.coverImage && !p.coverImage.includes("placehold") ? (
                            <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#8B9485]">
                              <Building2 size={20} />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-[#3A3833] text-sm leading-tight truncate max-w-[200px]">{p.title}</p>
                          <p className="text-xs text-[#8B9485] mt-0.5 truncate max-w-[200px]">{p.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#66615C] capitalize whitespace-nowrap">
                      {p.category} · {p.type === "alquiler_temporal" ? "alq. temporal" : p.type}
                    </td>
                    <td className="px-6 py-4 font-medium text-[#3A3833] text-sm whitespace-nowrap">
                      USD {p.price.toLocaleString("es-AR")}
                    </td>
                    <td className="px-6 py-4">
                      <EstadoBadge estado={(p as any).estado} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/propiedades/${p.id}`}
                          target="_blank"
                          className="p-2 text-[#8B9485] hover:text-[#3A3833] hover:bg-[#F0EBE1] rounded-lg transition-colors"
                          title="Ver en sitio"
                        >
                          <ExternalLink size={16} />
                        </Link>
                        <Link
                          href={`/admin/propiedades/editar/${p.id}`}
                          className="p-2 text-[#8B9485] hover:text-[#3A3833] hover:bg-[#F0EBE1] rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit3 size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id, p.title)}
                          disabled={deletingId === p.id}
                          className="p-2 text-[#8B9485] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                          title="Eliminar"
                        >
                          {deletingId === p.id ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
