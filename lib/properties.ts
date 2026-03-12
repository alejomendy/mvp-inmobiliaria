export type PropertyType = "venta" | "alquiler";
export type PropertyCategory = "casa" | "departamento" | "oficina" | "terreno";

export interface Property {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  type: PropertyType;
  category: PropertyCategory;
  price: number;
  currency: "ARS" | "USD";
  location: string;
  neighborhood: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  area: number; // m²
  features: string[];
  images: string[];
  coverImage: string;
  featured: boolean;
  createdAt: string;
}

export const properties: Property[] = [
  {
    id: "1",
    slug: "penthouse-luminoso-palermo",
    title: "Penthouse Luminoso",
    subtitle: "Palermo · Buenos Aires",
    description:
      "Un penthouse diseñado para quienes entienden que el lujo reside en la simplicidad. Amplios ventanales de piso a techo inundan cada ambiente de luz natural, creando una atmósfera única de calidez y elegancia. La terraza privada con vista panorámica completa una propuesta habitacional excepcional.",
    type: "venta",
    category: "departamento",
    price: 420000,
    currency: "USD",
    location: "Palermo, Buenos Aires",
    neighborhood: "Palermo",
    city: "Buenos Aires",
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    features: [
      "Terraza privada",
      "Vista panorámica",
      "Amenities completos",
      "Cochera doble",
      "Baulera",
      "Seguridad 24hs",
    ],
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=90",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=90",
    featured: true,
    createdAt: "2026-03-01",
  },
  {
    id: "2",
    slug: "casa-minimalista-nordelta",
    title: "Casa Minimalista",
    subtitle: "Nordelta · Tigre",
    description:
      "Residencia de autor en Nordelta, diseñada bajo una filosofía minimalista que privilegia los espacios abiertos, la luz natural y los materiales nobles. Jardín privado con piscina, acceso al lago y vistas al verde en cada rincón.",
    type: "venta",
    category: "casa",
    price: 780000,
    currency: "USD",
    location: "Nordelta, Tigre",
    neighborhood: "Nordelta",
    city: "Tigre",
    bedrooms: 4,
    bathrooms: 3,
    area: 320,
    features: [
      "Piscina privada",
      "Jardín con acceso al lago",
      "Home office",
      "Cochera triple",
      "Seguridad perimetral",
      "Pileta climatizada",
    ],
    images: [
      "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=90",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&w=1200&q=90",
    featured: true,
    createdAt: "2026-03-03",
  },
  {
    id: "3",
    slug: "loft-industrial-san-telmo",
    title: "Loft Industrial",
    subtitle: "San Telmo · Buenos Aires",
    description:
      "Loft único en el corazón histórico de San Telmo. Techos originales de 4 metros, vigas vistas, ventanales industriales y pisos de madera recuperada. Un espacio que celebra la historia con un diseño contemporáneo y sofisticado.",
    type: "alquiler",
    category: "departamento",
    price: 1800,
    currency: "USD",
    location: "San Telmo, Buenos Aires",
    neighborhood: "San Telmo",
    city: "Buenos Aires",
    bedrooms: 1,
    bathrooms: 1,
    area: 95,
    features: [
      "Techos de 4m",
      "Mezzanine",
      "Cocina gourmet",
      "Patio privado",
      "Lavadero",
    ],
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=90",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=90",
    featured: true,
    createdAt: "2026-03-05",
  },
  {
    id: "4",
    slug: "suite-premium-recoleta",
    title: "Suite Premium",
    subtitle: "Recoleta · Buenos Aires",
    description:
      "Departamento de alta gama en el corazón de Recoleta. Materiales importados, terminaciones de lujo y un diseño interior de autor crean un ambiente de sofisticación incomparable. A metros del Cementerio de Recoleta y los mejores restaurantes de la ciudad.",
    type: "alquiler",
    category: "departamento",
    price: 2400,
    currency: "USD",
    location: "Recoleta, Buenos Aires",
    neighborhood: "Recoleta",
    city: "Buenos Aires",
    bedrooms: 2,
    bathrooms: 2,
    area: 130,
    features: [
      "Amenities de hotel",
      "Concierge",
      "Gym exclusivo",
      "SPA",
      "Cochera cubierta",
      "Servicio de portería",
    ],
    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=90",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=90",
    featured: true,
    createdAt: "2026-03-06",
  },
  {
    id: "5",
    slug: "residencia-belgrano-r",
    title: "Residencia Belgrano R",
    subtitle: "Belgrano R · Buenos Aires",
    description:
      "Casa familiar en la zona más exclusiva de Belgrano. Amplio jardín parquizado, piscina y quincho completo. La distribución inteligente maximiza los espacios de estar y la privacidad de cada habitación.",
    type: "venta",
    category: "casa",
    price: 650000,
    currency: "USD",
    location: "Belgrano R, Buenos Aires",
    neighborhood: "Belgrano R",
    city: "Buenos Aires",
    bedrooms: 5,
    bathrooms: 4,
    area: 450,
    features: [
      "Piscina",
      "Quincho",
      "Jardín parquizado",
      "Cochera para 4 autos",
      "Salón de juegos",
      "Bodega",
    ],
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=90",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=90",
    featured: true,
    createdAt: "2026-03-08",
  },
  {
    id: "6",
    slug: "wellness-suite-puerto-madero",
    title: "Wellness Suite",
    subtitle: "Puerto Madero · Buenos Aires",
    description:
      "Departamento con orientación wellness en Puerto Madero, con acceso directo a dique y amenities de primer nivel. Diseñado para quienes buscan equilibrio entre la vida urbana y el bienestar. Spa privado, gym y terraza con vistas al río.",
    type: "venta",
    category: "departamento",
    price: 520000,
    currency: "USD",
    location: "Puerto Madero, Buenos Aires",
    neighborhood: "Puerto Madero",
    city: "Buenos Aires",
    bedrooms: 2,
    bathrooms: 2,
    area: 145,
    features: [
      "Spa privado",
      "Terraza con vista al río",
      "Gym en el edificio",
      "Dique privado",
      "Seguridad 24hs",
      "Salón de eventos",
    ],
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&w=1600&q=90",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=90",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=90",
    featured: true,
    createdAt: "2026-03-10",
  },
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getFeaturedProperties(): Property[] {
  return properties.filter((p) => p.featured);
}

export function formatPrice(property: Property): string {
  const formatted = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: property.currency,
    maximumFractionDigits: 0,
  }).format(property.price);
  return formatted;
}
