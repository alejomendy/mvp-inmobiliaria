export type PropertyType = "venta" | "alquiler" | "alquiler_temporal";
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
  estado?: "disponible" | "reservado" | "vendido" | "alquilado";
}

export function formatPrice(property: Property): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: property.currency,
    maximumFractionDigits: 0,
  }).format(property.price);
}
