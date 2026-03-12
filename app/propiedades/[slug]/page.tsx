import Image from "next/image";
import Link from "next/link";
import { properties, getPropertyBySlug, formatPrice } from "@/lib/properties";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PropertyPage({ params }: PageProps) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

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
            href="/#propiedades"
            className="hover:text-[#3A3833] transition-colors relative group py-2"
          >
            Propiedades
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#3A3833] transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link
            href="/sobre-nosotros"
            className="hover:text-[#3A3833] transition-colors relative group py-2"
          >
            Sobre Nosotros
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#3A3833] transition-all duration-300 group-hover:w-full" />
          </Link>
          <Link
            href="/#contacto"
            className="hover:text-[#3A3833] transition-colors relative group py-2"
          >
            Contacto
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#3A3833] transition-all duration-300 group-hover:w-full" />
          </Link>
        </nav>
      </header>

      {/* Back link */}
      <div className="px-6 md:px-12 pt-8 pb-2 max-w-[1400px] mx-auto">
        <Link
          href="/#propiedades"
          className="inline-flex items-center gap-2 font-sans text-xs tracking-widest uppercase text-[#8B9485] hover:text-[#3A3833] transition-colors font-bold group"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M19 12H5m6-7-7 7 7 7"
            />
          </svg>
          Volver a Propiedades
        </Link>
      </div>

      {/* Hero Image Gallery */}
      <section className="px-6 md:px-12 pt-6 pb-16 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[70vh] min-h-[480px]">
          {/* Main large image */}
          <div className="md:col-span-2 relative rounded-3xl overflow-hidden bg-[#F0EBE1]">
            <Image
              src={property.images[0]}
              fill
              alt={`${property.title} - Vista principal`}
              className="object-cover hover:scale-[1.02] transition-transform duration-[1.5s]"
              priority
              unoptimized
            />
            {/* Type Badge */}
            <div className="absolute top-6 left-6">
              <span
                className={`font-sans text-[10px] tracking-[0.2em] uppercase font-bold px-4 py-2 rounded-full backdrop-blur-sm ${
                  property.type === "venta"
                    ? "bg-[#3A3833] text-[#FAFAF7]"
                    : "bg-[#8B9485] text-white"
                }`}
              >
                {property.type === "venta" ? "En Venta" : "En Alquiler"}
              </span>
            </div>
          </div>

          {/* Side small images */}
          <div className="hidden md:flex flex-col gap-4">
            {property.images.slice(1, 3).map((img, i) => (
              <div
                key={i}
                className="relative flex-1 rounded-3xl overflow-hidden bg-[#F0EBE1]"
              >
                <Image
                  src={img}
                  fill
                  alt={`${property.title} - Vista ${i + 2}`}
                  className="object-cover hover:scale-[1.02] transition-transform duration-[1.5s]"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Detail */}
      <section className="px-6 md:px-12 pb-32 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
          {/* Left: Main info */}
          <div className="lg:col-span-2">
            {/* Category tag */}
            <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#8B9485] font-bold">
              {property.category.charAt(0).toUpperCase() +
                property.category.slice(1)}{" "}
              · {property.neighborhood}
            </span>

            {/* Title */}
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mt-4 mb-6 text-[#3A3833]">
              {property.title}
            </h1>

            {/* Location */}
            <div className="flex items-center gap-2 text-[#8B9485] mb-10">
              <svg
                className="w-4 h-4 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="font-sans text-sm font-semibold tracking-wide">
                {property.location}
              </span>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-8 mb-12 pb-12 border-b border-[#D2D6CB]/50">
              <div className="flex flex-col gap-1">
                <span className="font-sans text-[10px] tracking-widest uppercase text-[#8B9485] font-bold">
                  Dormitorios
                </span>
                <span className="font-serif text-4xl text-[#3A3833]">
                  {property.bedrooms}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-sans text-[10px] tracking-widest uppercase text-[#8B9485] font-bold">
                  Baños
                </span>
                <span className="font-serif text-4xl text-[#3A3833]">
                  {property.bathrooms}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-sans text-[10px] tracking-widest uppercase text-[#8B9485] font-bold">
                  Superficie
                </span>
                <span className="font-serif text-4xl text-[#3A3833]">
                  {property.area}
                  <span className="text-xl text-[#8B9485]">m²</span>
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-12">
              <h2 className="font-serif text-2xl md:text-3xl text-[#3A3833] mb-5">
                Sobre esta propiedad
              </h2>
              <p className="font-sans text-sm md:text-base leading-relaxed text-[#66615C]">
                {property.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h2 className="font-serif text-2xl md:text-3xl text-[#3A3833] mb-6">
                Características
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.features.map((feat) => (
                  <div
                    key={feat}
                    className="flex items-center gap-3 bg-white rounded-2xl px-5 py-4 border border-[#D2D6CB]/50"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#8B9485] shrink-0" />
                    <span className="font-sans text-sm text-[#3A3833]">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Price & Contact Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <div className="bg-white rounded-3xl p-8 border border-[#D2D6CB]/50 shadow-sm">
                {/* Price */}
                <div className="mb-8 pb-8 border-b border-[#D2D6CB]/50">
                  <span className="font-sans text-[10px] tracking-widest uppercase text-[#8B9485] font-bold block mb-3">
                    Precio
                  </span>
                  <div className="font-serif text-4xl text-[#3A3833]">
                    {formatPrice(property)}
                  </div>
                  {property.type === "alquiler" && (
                    <span className="font-sans text-xs text-[#8B9485] mt-1 block">
                      por mes
                    </span>
                  )}
                </div>

                {/* CTA */}
                <div className="flex flex-col gap-4">
                  <a
                    href={`https://wa.me/5491100000000?text=Hola! Me interesa la propiedad: ${property.title} en ${property.location}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#3A3833] text-white text-center rounded-full font-sans text-xs tracking-widest uppercase font-bold py-4 px-8 hover:bg-[#1A1917] transition-colors"
                  >
                    Consultar por WhatsApp
                  </a>
                  <a
                    href={`mailto:info@chaperinmobiliaria.com?subject=Consulta sobre ${property.title}&body=Hola, me interesa conocer más sobre la propiedad ${property.title} ubicada en ${property.location}.`}
                    className="w-full border border-[#3A3833] text-[#3A3833] text-center rounded-full font-sans text-xs tracking-widest uppercase font-bold py-4 px-8 hover:bg-[#3A3833] hover:text-white transition-colors"
                  >
                    Enviar Email
                  </a>
                </div>

                {/* Agent note */}
                <p className="font-sans text-xs text-[#8B9485] text-center mt-6 leading-relaxed">
                  Nuestro equipo te responde en menos de 24 horas hábiles.
                </p>
              </div>

              {/* Mini details card */}
              <div className="mt-4 bg-[#F0EBE1] rounded-3xl p-6">
                <span className="font-sans text-[10px] tracking-widest uppercase text-[#8B9485] font-bold block mb-4">
                  Referencia
                </span>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-xs text-[#66615C]">
                      ID de propiedad
                    </span>
                    <span className="font-sans text-xs font-bold text-[#3A3833] uppercase tracking-wider">
                      CHP-{property.id.padStart(4, "0")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-xs text-[#66615C]">
                      Operación
                    </span>
                    <span className="font-sans text-xs font-bold text-[#3A3833] uppercase tracking-wider">
                      {property.type}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-xs text-[#66615C]">
                      Tipo
                    </span>
                    <span className="font-sans text-xs font-bold text-[#3A3833] uppercase tracking-wider">
                      {property.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 pt-16 pb-8 bg-[#F0EBE1] border-t border-[#D2D6CB]/50">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <Link
            href="/"
            className="font-serif text-2xl tracking-widest uppercase text-[#3A3833]"
          >
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
