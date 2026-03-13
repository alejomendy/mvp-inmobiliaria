import Image from "next/image";
import Link from "next/link";
import Badge from "./Badge";
import { formatPrice } from "@/lib/properties";

interface PropertyCardProps {
  property: any;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link
      href={`/propiedades/${property.slug}`}
      className="group bg-white rounded-[2rem] overflow-hidden border border-[#D2D6CB]/40 hover:border-[#D2D6CB] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col h-full"
    >
      {/* Property Image */}
      <div className="relative w-full aspect-[4/3] bg-[#F0EBE1] overflow-hidden">
        <Image
          src={property.coverImage || property.image} // Supporting both models during transition
          fill
          alt={property.title}
          className="object-cover transition-transform duration-[1.5s] group-hover:scale-[1.04]"
          unoptimized
        />
        {/* Type badge */}
        <div className="absolute top-5 left-5">
          <Badge type={property.type} />
        </div>
      </div>

      {/* Property Info */}
      <div className="flex flex-col flex-1 p-7">
        <span className="label-caps text-[#8B9485] mb-2">
          {property.neighborhood} · {property.city || property.location}
        </span>
        <h2 className="title-serif text-2xl text-[#3A3833] mb-3 group-hover:opacity-80 transition-opacity leading-tight">
          {property.title}
        </h2>
        <p className="text-sans-sm mb-6 line-clamp-2 flex-1">
          {property.description}
        </p>

        {/* Stats row */}
        <div className="flex gap-5 pb-6 border-b border-[#D2D6CB]/50 mb-6 font-sans text-xs text-[#66615C]">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#8B9485] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>{property.bedrooms || 0} dorm.</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#8B9485] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{property.bathrooms || 0} baños</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#8B9485] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span>{property.area} m²</span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex justify-between items-center">
          <div>
            <span className="label-caps text-[#8B9485] block mb-0.5">Precio</span>
            <span className="title-serif text-xl text-[#3A3833]">
              {typeof property.price === "string" ? property.price : formatPrice(property)}
            </span>
            {property.type.toLowerCase().includes("alquiler") && (
              <span className="font-sans text-[10px] text-[#8B9485] ml-1">/mes</span>
            )}
          </div>
          <span className="label-caps text-[#3A3833] flex items-center gap-2 group-hover:gap-3 transition-all">
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
