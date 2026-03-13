import Link from "next/link";
import { properties } from "@/lib/properties";
import PropertyCard from "./PropertyCard";
import Image from "next/image";

function GalleryCard({ property, className }: { property: any, className: string }) {
  return (
    <Link 
      href={`/propiedades/${property.slug}`}
      className={`property-card-container group ${className}`}
    >
      <Image
        src={property.coverImage || property.image}
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

export default function PropertyGrid() {
  // Taking a slice of properties for the home page grid
  const homeProperties = properties.slice(0, 6);

  return (
    <section className="luxury-section -mt-12">
      <div className="section-container pt-24 pb-32 md:pt-32 md:pb-40">
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="label-caps block mb-4">
                Colecciones
              </span>
              <h2 className="title-serif text-5xl md:text-7xl leading-none">
                Espacios de Vida
              </h2>
            </div>
            <p className="text-sans-sm max-w-xs text-left md:text-right">
              Explora nuestra cuidada colección de propiedades que redefinen los espacios hechos para vivir.
            </p>
          </div>

          {/* Artistic Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {/* Column 1 */}
            <div className="flex flex-col gap-8 md:gap-10">
              <GalleryCard property={homeProperties[0]} className="aspect-[4/3]" />
              <GalleryCard property={homeProperties[3]} className="aspect-square" />
            </div>
            
            {/* Column 2 */}
            <div className="flex flex-col gap-8 md:gap-10 md:mt-12">
              <GalleryCard property={homeProperties[1]} className="aspect-[4/5]" />
              <GalleryCard property={homeProperties[4]} className="aspect-[4/5]" />
            </div>
            
            {/* Column 3 */}
            <div className="flex flex-col gap-8 md:gap-10 lg:mt-24">
              <GalleryCard property={homeProperties[2]} className="aspect-[3/4]" />
              <GalleryCard property={homeProperties[5]} className="aspect-[3/4]" />
            </div>
          </div>

          {/* CTA to all properties */}
          <div className="mt-16 flex justify-center">
            <Link
              href="/propiedades"
              className="btn-outline"
            >
              Ver todas las propiedades
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
