import Link from "next/link";
import { getPropiedades, getPropiedadesDestacadas } from "@/lib/api";
import PropietarioBanner from "./PropietarioBanner";
import PropertyImageFill from "./PropertyImageFill";
import { Property } from "@/lib/properties";

const ESTADO_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
  reservado: { label: "Reservado", bg: "bg-amber-500", text: "text-white" },
  vendido:   { label: "Vendido",   bg: "bg-rose-600",  text: "text-white" },
  alquilado: { label: "Alquilado", bg: "bg-blue-600",  text: "text-white" },
};

function GalleryCard({ property, className }: { property: Property; className: string }) {
  const estado = property.estado;
  const isUnavailable = !!estado && estado !== "disponible";
  const c = isUnavailable ? ESTADO_CONFIG[estado] : undefined;

  return (
    <Link
      href={`/propiedades/${property.slug}`}
      className={`property-card-container group ${className}`}
    >
      <PropertyImageFill
        src={property.coverImage}
        alt={property.title}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="property-card-image object-cover object-center"
        style={{ objectPosition: "center top" }}
      />
      <div className="property-card-overlay" />
      {c && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
          <span className={`${c.bg} ${c.text} label-caps px-5 py-2 rounded-full text-[11px] shadow-lg`}>
            {c.label}
          </span>
        </div>
      )}
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
  const destacadas = await getPropiedadesDestacadas();
  const source = destacadas.length > 0 ? destacadas : await getPropiedades();
  const homeProperties = source.slice(0, 6);
  const items = Array(6).fill(null).map((_, i) => homeProperties[i]);

  return (
    <section className="luxury-section -mt-12">
      <div className="section-container pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-gold" />
              <span className="label-caps !text-gold">
                {destacadas.length > 0 ? "Propiedades Destacadas" : "Propiedades Disponibles"}
              </span>
            </div>
            <h2 className="title-serif text-5xl md:text-7xl leading-none">
              Alquiler y Venta
            </h2>
          </div>
          <p className="text-sans-sm max-w-xs text-left md:text-right">
            Explorá nuestra selección de propiedades disponibles para alquiler y venta.
          </p>
        </div>

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

        <div className="mt-16 flex justify-center">
          <Link href="/propiedades" className="btn-outline">
            Ver todas las propiedades
          </Link>
        </div>
      </div>

      <div className="px-4 md:px-12 pb-16">
        <PropietarioBanner variant="dark" />
      </div>
    </section>
  );
}
