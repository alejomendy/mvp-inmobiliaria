import { Property, PropertyType, PropertyCategory } from "./properties";

export type TipoOperacion = "venta" | "alquiler" | "alquiler_temporal";
export type TipoPropiedad = "casa" | "depto" | "departamento" | "terreno" | "local" | "oficina";
export type EstadoPropiedad = "disponible" | "reservado" | "vendido" | "alquilado";

export interface Caracteristica {
  id: number;
  nombre: string;
}

export interface Propiedad {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  tipo_operacion: TipoOperacion;
  tipo_propiedad: TipoPropiedad;
  direccion: string;
  ciudad: string;
  metros_cuadrados: number;
  habitaciones: number;
  banos: number;
  estado: EstadoPropiedad;
  destacada?: boolean;
  orden_destacado?: number | null;
  created_at: string;
  updated_at: string;
  imagenes?: string[];
  caracteristicas?: Caracteristica[];
}

export interface ConfiguracionSite {
  id: number;
  hero_imagen: string | null;
  hero_titulo: string;
  hero_subtitulo: string;
  filosofia_titulo: string;
  filosofia_texto: string | null;
  filosofia_imagen: string | null;
  whatsapp_numero: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://inmobiliaria-backend-wi6o.onrender.com/api";

// Cache client-side — solo activo en el browser, nunca en build time
const _cache = new Map<string, { data: unknown; exp: number }>();

async function getCached<T>(
  key: string,
  ttlMs: number,
  fetcher: () => Promise<T>
): Promise<T> {
  if (typeof window !== "undefined") {
    const hit = _cache.get(key);
    if (hit && Date.now() < hit.exp) return hit.data as T;
  }
  const data = await fetcher();
  if (typeof window !== "undefined") {
    _cache.set(key, { data, exp: Date.now() + ttlMs });
  }
  return data;
}

function clearPropiedadesCache() {
  for (const key of _cache.keys()) {
    if (key.startsWith("prop:")) _cache.delete(key);
  }
}

// Las imágenes que llegan del backend ya son URLs completas (https://...).
// Esta función solo es fallback para casos donde llegue una ruta relativa.
function getImageUrl(url?: string): string {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  // Ruta relativa → convertir a URL completa usando la base del backend
  const backendBase = API_URL.replace("/api", "");
  if (url.startsWith("/")) return `${backendBase}${url}`;
  return `${backendBase}/storage/${url}`;
}

const PLACEHOLDER = "https://placehold.co/600x400/F0EBE1/3A3833?text=Sin+Imagen";

export function mapPropiedadToProperty(p: Propiedad): Property {
  // El backend ya procesa las imagenes y devuelve URLs completas
  const imagenesUrls: string[] =
    p.imagenes && p.imagenes.length > 0
      ? p.imagenes.map((img) => getImageUrl(typeof img === "string" ? img : ""))
      : [PLACEHOLDER];

  return {
    id: p.id.toString(),
    slug: p.id.toString(),
    title: p.titulo,
    subtitle: `${p.direccion} · ${p.ciudad}`,
    description: p.descripcion,
    type: (p.tipo_operacion || "venta") as PropertyType,
    category: (
      p.tipo_propiedad === "depto" || p.tipo_propiedad === "departamento"
        ? "departamento"
        : p.tipo_propiedad || "propiedad"
    ) as PropertyCategory,
    price: p.precio,
    currency: "USD",
    location: p.direccion,
    neighborhood: p.ciudad,
    city: p.ciudad,
    bedrooms: p.habitaciones,
    bathrooms: p.banos,
    area: p.metros_cuadrados,
    features: p.caracteristicas?.map((c) => c.nombre) || [],
    images: imagenesUrls,
    coverImage: imagenesUrls[0],
    featured: p.destacada ?? false,
    createdAt: p.created_at,
    // Campos extra pasados directamente
    estado: p.estado,
  } as Property & { estado: EstadoPropiedad };
}

export async function getPropiedades(filters?: {
  tipo?: TipoOperacion;
  ciudad?: string;
}): Promise<Property[]> {
  const queryParams = new URLSearchParams();
  if (filters?.tipo) queryParams.append("tipo", filters.tipo);
  if (filters?.ciudad) queryParams.append("ciudad", filters.ciudad);

  const url = `${API_URL}/propiedades${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
  const cacheKey = `prop:list:${queryParams.toString()}`;

  return getCached(cacheKey, 30_000, async () => {
    try {
      const response = await fetch(url, { next: { revalidate: 60 } });
      if (!response.ok) return [];
      const data: Propiedad[] = await response.json();
      return data.map(mapPropiedadToProperty);
    } catch (error) {
      console.error("Error al obtener propiedades:", error);
      return [];
    }
  });
}

export async function getPropiedadesDestacadas(): Promise<Property[]> {
  return getCached("prop:destacadas", 30_000, async () => {
    try {
      const response = await fetch(`${API_URL}/propiedades?destacadas=true`, {
        next: { revalidate: 60 },
      });
      if (!response.ok) return [];
      const data: Propiedad[] = await response.json();
      return data.map(mapPropiedadToProperty);
    } catch {
      return [];
    }
  });
}

export async function getCountDestacadas(): Promise<number> {
  try {
    const response = await fetch(`${API_URL}/propiedades?destacadas=true`, {
      cache: "no-store",
    });
    if (!response.ok) return 0;
    const data: Propiedad[] = await response.json();
    return data.length;
  } catch {
    return 0;
  }
}

export async function getPropiedadById(id: string | number): Promise<Property | null> {
  return getCached(`prop:${id}`, 60_000, async () => {
    try {
      const response = await fetch(`${API_URL}/propiedades/${id}`, {
        next: { revalidate: 60 },
      });
      if (!response.ok) return null;
      const data: Propiedad = await response.json();
      return mapPropiedadToProperty(data);
    } catch (error) {
      console.error(`Error al obtener propiedad ${id}:`, error);
      return null;
    }
  });
}

export async function createPropiedad(data: Partial<Propiedad>): Promise<Property | null> {
  try {
    const response = await fetch(`${API_URL}/propiedades`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) return null;
    const result: Propiedad = await response.json();
    clearPropiedadesCache();
    return mapPropiedadToProperty(result);
  } catch (error) {
    console.error("Error al crear propiedad:", error);
    return null;
  }
}

export async function updatePropiedad(
  id: string | number,
  data: Partial<Propiedad>
): Promise<Property | null> {
  try {
    const response = await fetch(`${API_URL}/propiedades/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) return null;
    const result: Propiedad = await response.json();
    clearPropiedadesCache();
    return mapPropiedadToProperty(result);
  } catch (error) {
    console.error(`Error al actualizar propiedad ${id}:`, error);
    return null;
  }
}

export async function deletePropiedad(id: string | number): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/propiedades/${id}`, {
      method: "DELETE",
    });
    if (response.ok) clearPropiedadesCache();
    return response.ok;
  } catch (error) {
    console.error(`Error al eliminar propiedad ${id}:`, error);
    return false;
  }
}

export interface ContactoPayload {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

export async function enviarContacto(data: ContactoPayload): Promise<{ success: boolean; message?: string; errors?: Record<string, string[]> }> {
  try {
    const response = await fetch(`${API_URL}/contacto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      return { success: false, errors: result.errors };
    }
    return { success: true, message: result.message };
  } catch (error) {
    console.error("Error al enviar contacto:", error);
    return { success: false, message: "No se pudo enviar el mensaje. Intentá de nuevo." };
  }
}

export async function getCaracteristicas(): Promise<Caracteristica[]> {
  return getCached("caracteristicas", 86_400_000, async () => {
    try {
      const response = await fetch(`${API_URL}/caracteristicas`);
      if (!response.ok) return [];
      return await response.json();
    } catch (error) {
      console.error("Error al obtener características:", error);
      return [];
    }
  });
}

export async function getConfiguracionSite(): Promise<ConfiguracionSite> {
  const defaults: ConfiguracionSite = {
    id: 0,
    hero_imagen: null,
    hero_titulo: "Ritta & Asociados",
    hero_subtitulo: "Estudio Jurídico Integral",
    filosofia_titulo: "Encontremos un inmueble que se adapte a vos.",
    filosofia_texto:
      "Ritta & Asoc. es un estudio jurídico integral dedicado a una amplia variedad de ramas principalmente del derecho civil. En esta web vas a encontrar las propiedades en venta y alquiler disponibles. También vas a poder consultarnos para publicar tu propiedad.",
    filosofia_imagen: null,
    whatsapp_numero: "543584153649",
  };

  try {
    const response = await fetch(`${API_URL}/configuracion-site`, {
      next: { revalidate: 300 },
    });
    if (!response.ok) return defaults;
    const data = await response.json();
    return { ...defaults, ...data };
  } catch (error) {
    console.error("Error al obtener configuración del sitio:", error);
    return defaults;
  }
}
