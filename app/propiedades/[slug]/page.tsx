import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { getPropiedades, getPropiedadById, getConfiguracionSite } from "@/lib/api";
import { formatPrice } from "@/lib/properties";
import { notFound } from "next/navigation";
import PropertyGallery from "../../components/PropertyGallery";
import Badge from "../../components/Badge";
import WhatsAppButton from "../../components/WhatsAppButton";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.rittaasociados.com.ar";

const ESTADO_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
  reservado: { label: "Reservado", bg: "bg-amber-500", text: "text-white" },
  vendido:   { label: "Vendido",   bg: "bg-rose-600",  text: "text-white" },
  alquilado: { label: "Alquilado", bg: "bg-blue-600",  text: "text-white" },
};

// Rutas no incluidas en generateStaticParams se renderizan on-demand en Vercel
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropiedadById(slug);
  if (!property) return { title: "Propiedad no encontrada" };

  const title = `${property.title} — Ritta & Asociados`;
  const description = property.description
    ? property.description.slice(0, 160)
    : `${property.category} en ${property.neighborhood}. Consultá disponibilidad.`;
  const image = property.coverImage;
  const url = `${SITE_URL}/propiedades/${slug}`;

  const typeLabel =
    property.type === "venta" ? "venta" :
    property.type === "alquiler_temporal" ? "alquiler temporario" : "alquiler";

  return {
    title,
    description,
    keywords: [
      `${property.category} en ${typeLabel} Adelia María`,
      `${property.category} ${typeLabel} Córdoba`,
      property.neighborhood ? `${property.category} ${property.neighborhood}` : "",
      `inmobiliaria Adelia María`,
      `Ritta y Asociados`,
    ].filter(Boolean),
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [{ url: image, width: 1200, height: 800, alt: property.title }],
      siteName: "Ritta & Asociados",
      locale: "es_AR",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    alternates: { canonical: url },
  };
}

export async function generateStaticParams() {
  try {
    const properties = await getPropiedades();
    if (properties.length === 0) return [{ slug: "placeholder" }];
    return properties.map((p) => ({ slug: p.slug }));
  } catch {
    return [{ slug: "placeholder" }];
  }
}

export default async function PropertyPage({ params }: PageProps) {
  const { slug } = await params;
  const [property, config] = await Promise.all([
    getPropiedadById(slug),
    getConfiguracionSite(),
  ]);
  if (!property) notFound();

  const whatsapp = config.whatsapp_numero || undefined;
  const url = `${SITE_URL}/propiedades/${property.slug}`;
  const estado = property.estado;
  const isUnavailable = !!estado && estado !== "disponible";
  const estadoInfo = isUnavailable ? ESTADO_CONFIG[estado] : undefined;

  const propertyJsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description || `${property.category} en ${property.neighborhood}`,
    url,
    image: property.images,
    ...(property.price > 0 && {
      offers: {
        "@type": "Offer",
        price: property.price,
        priceCurrency: "ARS",
        availability: "https://schema.org/InStock",
      },
    }),
    address: {
      "@type": "PostalAddress",
      streetAddress: property.location,
      addressLocality: "Adelia María",
      addressRegion: "Córdoba",
      addressCountry: "AR",
    },
    floorSize: property.area > 0
      ? { "@type": "QuantitativeValue", value: property.area, unitCode: "MTK" }
      : undefined,
    numberOfRooms: property.bedrooms > 0 ? property.bedrooms : undefined,
  };

  return (
    <main className="min-h-screen bg-surface text-ink selection:bg-gold selection:text-ink">
      <Script
        id={`json-ld-property-${property.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(propertyJsonLd) }}
      />

      {/* Back link */}
      <div className="section-container pt-8 pb-2">
        <Link
          href="/propiedades"
          className="inline-flex items-center gap-2 label-caps !text-muted hover:!text-gold transition-colors group"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 12H5m6-7-7 7 7 7" />
          </svg>
          Volver a Propiedades
        </Link>
      </div>

      {/* Image Gallery */}
      <section className="section-container pt-6 pb-12">
        <div className="flex items-center gap-3 mb-4">
          <Badge type={property.type} />
          {estadoInfo && (
            <span className={`${estadoInfo.bg} ${estadoInfo.text} label-caps px-4 py-1.5 rounded-full text-[11px] shadow-sm`}>
              {estadoInfo.label}
            </span>
          )}
        </div>
        <PropertyGallery images={property.images} title={property.title} />
      </section>

      {/* Property Detail */}
      <section className="section-container pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">

          {/* Left: Main info */}
          <div className="lg:col-span-2">
            {/* Category tag */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-gold" />
              <span className="label-caps !text-gold">
                {property.category.charAt(0).toUpperCase() + property.category.slice(1)}{" "}
                · {property.neighborhood}
              </span>
            </div>

            {/* Title */}
            <h1 className="title-serif text-5xl md:text-7xl mt-2 mb-6">
              {property.title}
            </h1>

            {/* Location */}
            <div className="flex items-center gap-2 text-muted mb-10">
              <svg className="w-4 h-4 shrink-0 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-sans text-sm font-semibold tracking-wide uppercase text-warm">
                {property.location}
              </span>
            </div>

            {/* Stats Row */}
            {(property.bedrooms > 0 || property.bathrooms > 0 || property.area > 0) && (
              <div className="flex flex-wrap gap-12 mb-12 pb-12 border-b border-line/50">
                {property.bedrooms > 0 && (
                  <div className="flex flex-col gap-1">
                    <span className="label-caps !text-gold">Dormitorios</span>
                    <span className="title-serif text-4xl">{property.bedrooms}</span>
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div className="flex flex-col gap-1">
                    <span className="label-caps !text-gold">Baños</span>
                    <span className="title-serif text-4xl">{property.bathrooms}</span>
                  </div>
                )}
                {property.area > 0 && (
                  <div className="flex flex-col gap-1">
                    <span className="label-caps !text-gold">Superficie</span>
                    <span className="title-serif text-4xl">
                      {property.area}
                      <span className="text-xl text-muted ml-1">m²</span>
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            {property.description && (
              <div className="mb-12">
                <h2 className="title-serif text-3xl mb-5">Sobre esta propiedad</h2>
                <p className="text-sans-sm leading-relaxed">{property.description}</p>
              </div>
            )}

            {/* Features */}
            {property.features.length > 0 && (
              <div>
                <h2 className="title-serif text-3xl mb-8">Características</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.features.map((feat) => (
                    <div
                      key={feat}
                      className="flex items-center gap-4 bg-white rounded-2xl px-6 py-4 border border-line/30 shadow-sm hover:border-gold/30 transition-colors"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                      <span className="text-sans-sm !text-charcoal">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Price & Contact Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="bg-white rounded-card-lg p-8 md:p-10 border border-line/30 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
                {/* Estado no disponible */}
                {estadoInfo && (
                  <div className="mb-8 pb-8 border-b border-line/50">
                    <span className={`${estadoInfo.bg} ${estadoInfo.text} label-caps inline-block px-4 py-1.5 rounded-full text-[11px] mb-4`}>
                      {estadoInfo.label}
                    </span>
                    <p className="text-sans-sm !text-muted">
                      Esta propiedad ya no se encuentra disponible. Consultanos por otras opciones similares.
                    </p>
                  </div>
                )}

                {/* Price */}
                {property.price > 0 ? (
                  <div className="mb-8 pb-8 border-b border-line/50">
                    <span className="label-caps !text-gold block mb-3">Precio</span>
                    <div className="title-serif text-4xl text-gold">
                      {formatPrice(property)}
                    </div>
                    {(property.type === "alquiler" || property.type === "alquiler_temporal") && (
                      <span className="label-caps !text-muted mt-2 block">
                        {property.type === "alquiler_temporal" ? "por estadía" : "por mes"}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="mb-8 pb-8 border-b border-line/50">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-px bg-gold" />
                      <span className="label-caps !text-gold">¿Te interesa?</span>
                    </div>
                    <p className="title-serif text-3xl text-ink leading-snug mb-3">
                      Consultanos por el precio
                    </p>
                    <p className="text-sans-sm !text-muted">
                      Nuestros asesores están disponibles para brindarte toda la información que necesitás.
                    </p>
                  </div>
                )}

                {/* CTA */}
                <div className="flex flex-col gap-4">
                  <WhatsAppButton
                    message={`Hola! Me interesa la propiedad: ${url}`}
                    label="Consultar por WhatsApp"
                    variant="full"
                    phoneNumber={whatsapp}
                    className="!bg-gold hover:!bg-gold-dark !text-ink shadow-[0_2px_8px_rgba(201,169,110,0.25)]"
                  />
                </div>

                <p className="label-caps !text-muted !text-[9px] text-center mt-8 leading-relaxed normal-case font-medium">
                  Nuestro equipo de asesores le responderá en menos de 24 horas hábiles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
