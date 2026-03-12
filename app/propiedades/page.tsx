import Image from "next/image";
import Link from "next/link";
import { properties, formatPrice } from "@/lib/properties";

export default function PropiedadesPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF7] text-[#3A3833] selection:bg-[#3A3833] selection:text-[#FAFAF7]">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-[#FAFAF7]/80 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.03)] px-6 md:px-12 py-5 flex justify-between items-center w-full border-b border-black/5">
        <Link
          href="/"
          className="font-serif text-3xl tracking-widest uppercase text-[#3A3833] drop-shadow-sm"
        >
          CHAPERO
        </Link>
        <nav className="hidden md:flex gap-12 text-xs tracking-[0.2em] uppercase font-semibold text-[#66615C]">
          <Link
            href="/propiedades"
            className="text-[#3A3833] relative group py-2"
          >
            Propiedades
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#3A3833]" />
          </Link>
          <Link
            href="/"
            className="hover:text-[#3A3833] transition-colors relative group py-2"
          >
            Sobre Nosotros
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#3A3833] transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link
            href="/"
            className="hover:text-[#3A3833] transition-colors relative group py-2"
          >
            Contacto
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#3A3833] transition-all duration-300 group-hover:w-full" />
          </Link>
        </nav>
      </header>

      {/* Page Header */}
      <section className="px-6 md:px-12 pt-20 pb-16 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
            <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#8B9485] block mb-4 font-bold">
              Portafolio
            </span>
            <h1 className="font-serif text-5xl md:text-7xl leading-none text-[#3A3833]">
              Propiedades
            </h1>
          </div>
          <p className="font-sans text-sm md:text-base text-[#66615C] max-w-xs leading-relaxed md:text-right">
            Descubrí nuestra selección de propiedades únicas, tanto para venta como para alquiler.
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mt-12">
          <button className="font-sans text-[10px] tracking-widest uppercase font-bold px-5 py-2.5 rounded-full bg-[#3A3833] text-white text-xs transition-all">
            Todas
          </button>
          <button className="font-sans text-[10px] tracking-widest uppercase font-bold px-5 py-2.5 rounded-full border border-[#D2D6CB] text-[#66615C] text-xs hover:border-[#3A3833] hover:text-[#3A3833] transition-all">
            Venta
          </button>
          <button className="font-sans text-[10px] tracking-widest uppercase font-bold px-5 py-2.5 rounded-full border border-[#D2D6CB] text-[#66615C] text-xs hover:border-[#3A3833] hover:text-[#3A3833] transition-all">
            Alquiler
          </button>
        </div>
      </section>

      {/* Thin divider */}
      <div className="px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="border-t border-[#D2D6CB]/50" />
      </div>

      {/* Properties Grid */}
      <section className="px-6 md:px-12 py-16 md:py-24 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Link
              key={property.id}
              href={`/propiedades/${property.slug}`}
              className="group bg-white rounded-[2rem] overflow-hidden border border-[#D2D6CB]/40 hover:border-[#D2D6CB] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col"
            >
              {/* Property Image */}
              <div className="relative w-full aspect-[4/3] bg-[#F0EBE1] overflow-hidden">
                <Image
                  src={property.coverImage}
                  fill
                  alt={property.title}
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-[1.04]"
                  unoptimized
                />
                {/* Type badge */}
                <div className="absolute top-5 left-5">
                  <span
                    className={`font-sans text-[9px] tracking-[0.2em] uppercase font-bold px-3.5 py-1.5 rounded-full ${
                      property.type === "venta"
                        ? "bg-[#3A3833] text-[#FAFAF7]"
                        : "bg-[#8B9485] text-white"
                    }`}
                  >
                    {property.type === "venta" ? "Venta" : "Alquiler"}
                  </span>
                </div>
              </div>

              {/* Property Info */}
              <div className="flex flex-col flex-1 p-7">
                <span className="font-sans text-[10px] tracking-widest uppercase text-[#8B9485] font-bold mb-2">
                  {property.neighborhood} · {property.city}
                </span>
                <h2 className="font-serif text-2xl text-[#3A3833] mb-3 group-hover:opacity-80 transition-opacity leading-tight">
                  {property.title}
                </h2>
                <p className="font-sans text-sm text-[#66615C] leading-relaxed mb-6 line-clamp-2 flex-1">
                  {property.description}
                </p>

                {/* Stats row */}
                <div className="flex gap-5 pb-6 border-b border-[#D2D6CB]/50 mb-6">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#8B9485] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="font-sans text-xs text-[#66615C]">{property.bedrooms} dorm.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#8B9485] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-sans text-xs text-[#66615C]">{property.bathrooms} baños</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#8B9485] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    <span className="font-sans text-xs text-[#66615C]">{property.area} m²</span>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-sans text-[9px] tracking-widest uppercase text-[#8B9485] font-bold block mb-0.5">Precio</span>
                    <span className="font-serif text-xl text-[#3A3833]">{formatPrice(property)}</span>
                    {property.type === "alquiler" && (
                      <span className="font-sans text-[10px] text-[#8B9485] ml-1">/mes</span>
                    )}
                  </div>
                  <span className="font-sans text-[9px] tracking-widest uppercase font-bold text-[#3A3833] flex items-center gap-2 group-hover:gap-3 transition-all">
                    Ver más
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 pt-16 pb-8 bg-[#F0EBE1] border-t border-[#D2D6CB]/50 -mt-4">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-serif text-2xl tracking-widest uppercase text-[#3A3833]">
            CHAPERO
          </Link>
          <span className="font-sans text-[10px] tracking-widest uppercase text-[#8B9485] font-bold">
            © 2026 INMOBILIARIA CHAPERO. TODOS LOS DERECHOS RESERVADOS.
          </span>
        </div>
      </footer>
    </main>
  );
}
