import Link from "next/link";
import { getPropiedades } from "@/lib/api";
import Image from "next/image";
import PropietarioBanner from "./PropietarioBanner";

function GalleryCard({ property, className }: { property: any, className: string }) {
  return (
    <Link 
      href={`/propiedades/${property.slug}`}
      className={`property-card-container group ${className}`}
    >
      <Image
        src={property.coverImage}
        alt={property.title}
        fill
        className="property-card-image"
        unoptimized
      />
      <div className="property-card-overlay" />
      <div className="property-card-content">
        <span className="label-caps !text-white !opacity-90 mb-2 drop-shadow-sm">
          {property.neighborhood} · {property.type}
        </span>
        <h3 className="title-serif text-2xl text-white-force mb-4">
          {property.title}
        </h3>
        <span className="link-underline !text-white !border-white !text-[10px] drop-shadow-sm">
          Ver detalles
        </span>
      </div>
    </Link>
  );
}

export default async function PropertyGrid() {
  const allProperties = await getPropiedades();
  const homeProperties = allProperties.slice(0, 6);

  // Pad the array with nulls if we don't have exactly 6
  // so the layout doesn't crash on undefined indexes
  const items = Array(6).fill(null).map((_, i) => homeProperties[i]);

  return (
    <section className="luxury-section -mt-12">
      <div className="section-container pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-[#C9A96E]" />
              <span className="label-caps !text-[#C9A96E]">Propiedades Disponibles</span>
            </div>
            <h2 className="title-serif text-5xl md:text-7xl leading-none">
              Alquiler y Venta
            </h2>
          </div>
          <p className="text-sans-sm max-w-xs text-left md:text-right">
            Explorá nuestra selección de propiedades disponibles para alquiler y venta.
          </p>
        </div>

        {/* Artistic Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          <div className="flex flex-col gap-8 md:gap-10">
            {items[0] && <GalleryCard property={items[0]} className="aspect-[4/3]" />}
            {items[3] && <GalleryCard property={items[3]} className="aspect-square" />}
          </div>
          <div className="flex flex-col gap-8 md:gap-10 md:mt-12">
            {items[1] && <GalleryCard property={items[1]} className="aspect-[4/5]" />}
            {items[4] && <GalleryCard property={items[4]} className="aspect-[4/5]" />}
          </div>
          <div className="flex flex-col gap-8 md:gap-10 lg:mt-24">
            {items[2] && <GalleryCard property={items[2]} className="aspect-[3/4]" />}
            {items[5] && <GalleryCard property={items[5]} className="aspect-[3/4]" />}
          </div>
        </div>

        {/* CTA to all properties */}
        <div className="mt-16 flex justify-center">
          <Link href="/propiedades" className="btn-outline">
            Ver todas las propiedades
          </Link>
        </div>
      </div>

      {/* Publicá tu propiedad banner */}
      <div className="px-4 md:px-12 pb-16">
        <PropietarioBanner variant="dark" />
      </div>
    </section>
  );
}
