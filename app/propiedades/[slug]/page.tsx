import Image from "next/image";
import Link from "next/link";
import { properties, getPropertyBySlug, formatPrice } from "@/lib/properties";
import { notFound } from "next/navigation";
import Nav from "../../components/nav";

import Badge from "../../components/Badge";

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
      <Nav />

      {/* Back link */}
      <div className="section-container pt-8 pb-2">
        <Link
          href="/propiedades"
          className="inline-flex items-center gap-2 label-caps !text-[#8B9485] hover:!text-[#3A3833] transition-colors group"
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
      <section className="section-container pt-6 pb-16">
        {/* Mobile Carousel (Horizontal Scroll Snap) */}
        <div className="flex md:hidden scroll-snap-x gap-4 pb-4">
          {property.images.map((img, i) => (
            <div
              key={i}
              className="relative w-[85vw] aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-[#F0EBE1] snap-center"
            >
              <Image
                src={img}
                fill
                alt={`${property.title} - Vista ${i + 1}`}
                className="object-cover"
                priority={i === 0}
                unoptimized
              />
              {/* Counter Pill */}
              <div className="absolute bottom-6 right-6">
                <span className="label-caps !text-[9px] bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-white">
                  {i + 1} / {property.images.length}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden md:grid grid-cols-3 gap-4 h-[70vh] min-h-[480px]">
          {/* Main large image */}
          <div className="md:col-span-2 relative rounded-[3rem] overflow-hidden bg-[#F0EBE1]">
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
              <Badge type={property.type} />
            </div>
          </div>

          {/* Side small images */}
          <div className="flex flex-col gap-4">
            {property.images.slice(1, 3).map((img, i) => (
              <div
                key={i}
                className="relative flex-1 rounded-[2.5rem] overflow-hidden bg-[#F0EBE1]"
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
      <section className="section-container pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
          {/* Left: Main info */}
          <div className="lg:col-span-2">
            {/* Category tag */}
            <span className="label-caps !text-[#8B9485]">
              {property.category.charAt(0).toUpperCase() +
                property.category.slice(1)}{" "}
              · {property.neighborhood}
            </span>

            {/* Title */}
            <h1 className="title-serif text-5xl md:text-7xl mt-4 mb-6">
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
              <span className="font-sans text-sm font-semibold tracking-wide uppercase text-[#3A3833]">
                {property.location}
              </span>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-12 mb-12 pb-12 border-b border-[#D2D6CB]/50">
              <div className="flex flex-col gap-1">
                <span className="label-caps">
                  Dormitorios
                </span>
                <span className="title-serif text-4xl">
                  {property.bedrooms}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="label-caps">
                  Baños
                </span>
                <span className="title-serif text-4xl">
                  {property.bathrooms}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="label-caps">
                  Superficie
                </span>
                <span className="title-serif text-4xl">
                  {property.area}
                  <span className="text-xl text-[#8B9485] ml-1">m²</span>
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-12">
              <h2 className="title-serif text-3xl mb-5">
                Sobre esta propiedad
              </h2>
              <p className="text-sans-sm leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h2 className="title-serif text-3xl mb-8">
                Características
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.features.map((feat) => (
                  <div
                    key={feat}
                    className="flex items-center gap-4 bg-white rounded-2xl px-6 py-4 border border-[#D2D6CB]/30 shadow-sm"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#8B9485] shrink-0" />
                    <span className="text-sans-sm !text-[#3A3833]">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Price & Contact Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="bg-white rounded-[3rem] p-8 md:p-10 border border-[#D2D6CB]/30 shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
                {/* Price */}
                <div className="mb-8 pb-8 border-b border-[#D2D6CB]/50">
                  <span className="label-caps block mb-3">
                    Precio
                  </span>
                  <div className="title-serif text-4xl">
                    {formatPrice(property)}
                  </div>
                  {property.type === "alquiler" && (
                    <span className="label-caps !text-[#8B9485] mt-2 block">
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
                    className="btn-primary w-full text-center py-5"
                  >
                    Consultar por WhatsApp
                  </a>
                  <a
                    href={`mailto:hola@ritayasociados.com?subject=Consulta sobre ${property.title}&body=Hola, me interesa conocer más sobre la propiedad ${property.title} ubicada en ${property.location}.`}
                    className="btn-outline w-full text-center py-5"
                  >
                    Enviar Email
                  </a>
                </div>

                {/* Agent note */}
                <p className="label-caps !text-[#8B9485] !text-[9px] text-center mt-8 leading-relaxed normal-case font-medium">
                  Nuestro equipo de asesores le responderá en menos de 24 horas hábiles.
                </p>
              </div>

              {/* Mini details card */}
              <div className="mt-6 bg-[#F0EBE1] rounded-[2.5rem] p-8">
                <span className="label-caps block mb-6">
                  Referencia Técnica
                </span>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sans-sm !text-[12px]">
                      ID Propiedad
                    </span>
                    <span className="label-caps !text-[#3A3833]">
                      RYA-{property.id.padStart(4, "0")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-t border-[#D2D6CB]/50 pt-4">
                    <span className="text-sans-sm !text-[12px]">
                      Operación
                    </span>
                    <span className="label-caps !text-[#3A3833]">
                      {property.type}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-t border-[#D2D6CB]/50 pt-4">
                    <span className="text-sans-sm !text-[12px]">
                      Tipo
                    </span>
                    <span className="label-caps !text-[#3A3833]">
                      {property.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
