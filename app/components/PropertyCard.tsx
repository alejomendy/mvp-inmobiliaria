import Link from "next/link";
import Badge from "./Badge";
import PropertyImageFill from "./PropertyImageFill";
import { Property, formatPrice } from "@/lib/properties";

interface PropertyCardProps {
  property: Property & { estado?: string };
}

function EstadoOverlay({ estado }: { estado?: string }) {
  if (!estado || estado === "disponible") return null;
  const config: Record<string, { label: string; bg: string; text: string }> = {
    reservado: { label: "Reservado", bg: "bg-amber-500", text: "text-white" },
    vendido:   { label: "Vendido",   bg: "bg-rose-600",  text: "text-white" },
    alquilado: { label: "Alquilado", bg: "bg-blue-600",  text: "text-white" },
  };
  const c = config[estado];
  if (!c) return null;
  return (
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
      <span className={`${c.bg} ${c.text} label-caps px-5 py-2 rounded-full text-[11px] shadow-lg`}>
        {c.label}
      </span>
    </div>
  );
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const isUnavailable = property.estado && property.estado !== "disponible";

  return (
    <Link
      href={`/propiedades/${property.slug}`}
      className={`group bg-white rounded-card overflow-hidden border transition-all duration-500 flex flex-col h-full ${
        isUnavailable
          ? "border-line/40 opacity-80 hover:opacity-100"
          : "border-line/40 hover:border-gold/50 hover:shadow-[0_24px_64px_rgba(201,169,110,0.14)]"
      }`}
    >
      <div className="relative w-full aspect-[4/3] bg-surface-warm overflow-hidden shrink-0">
        <PropertyImageFill
          src={property.coverImage}
          alt={property.title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover object-center transition-transform duration-[1.5s]${
            !isUnavailable ? " group-hover:scale-[1.04]" : ""
          }`}
        />
        <EstadoOverlay estado={property.estado} />
        <div className="absolute top-5 left-5 z-20">
          <Badge type={property.type} />
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-7">
        <span className="label-caps text-muted mb-2">
          {property.neighborhood} · {property.city || property.location}
        </span>
        <h2 className="title-serif text-2xl text-ink mb-3 group-hover:text-charcoal transition-colors leading-tight">
          {property.title}
        </h2>
        <p className="text-sans-sm mb-6 line-clamp-2 flex-1">
          {property.description}
        </p>

        <div className="flex gap-5 pb-6 border-b border-line/50 mb-6 font-sans text-xs text-warm">
          {property.bedrooms > 0 && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>{property.bedrooms} dorm.</span>
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{property.bathrooms} baños</span>
            </div>
          )}
          {property.area > 0 && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              <span>{property.area} m²</span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div>
            {property.price > 0 ? (
              <>
                <span className="label-caps !text-gold block mb-0.5">Precio</span>
                <span className="title-serif text-xl text-gold">
                  {formatPrice(property)}
                </span>
                {property.type.toLowerCase().includes("alquiler") && (
                  <span className="font-sans text-[10px] text-muted ml-1">/mes</span>
                )}
              </>
            ) : (
              <span className="label-caps !text-gold">Consultar precio</span>
            )}
          </div>
          <span className="label-caps text-gold flex items-center gap-2 group-hover:gap-3 transition-all">
            Ver más
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
