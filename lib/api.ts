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
  caracteristicas?: (Caracteristica | string)[];
}

export interface ConfiguracionSite {
  id: number;
  hero_imagen: string | null;
  hero_titulo: string;
  hero_subtitulo: string;
  filosofia_titulo: string;
  filosofia_texto: string | null;
  filosofia_imagen: string | null;
  filosofia_titulo_fuente: string | null;
  filosofia_titulo_tamano: string | null;
  filosofia_texto_fuente: string | null;
  filosofia_texto_tamano: string | null;
  whatsapp_numero: string | null;
  mapa_lat: number | string | null;
  mapa_lng: number | string | null;
  mapa_zoom: number | null;
  mapa_direccion: string | null;
  mapa_localidad: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://inmobiliaria-backend-wi6o.onrender.com/api";

// Clave para las operaciones de escritura (crear/editar/borrar propiedades).
// Debe coincidir con ADMIN_API_KEY del backend. El backend la espera en X-Api-Key.
const ADMIN_API_KEY = process.env.NEXT_PUBLIC_ADMIN_API_KEY || "";

// Headers para requests de escritura: incluye la clave de API si está configurada.
function writeHeaders(withJson = true): Record<string, string> {
  const headers: Record<string, string> = {};
  if (withJson) headers["Content-Type"] = "application/json";
  if (ADMIN_API_KEY) headers["X-Api-Key"] = ADMIN_API_KEY;
  return headers;
}

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

const PLACEHOLDER = "https://placehold.co/600x400/F0EBE1/3A3833?text=Sin+Imagen";

// Las imágenes que llegan del backend ya son URLs completas (https://...).
// Esta función solo es fallback para casos donde llegue una ruta relativa.
function getImageUrl(url?: string): string {
  if (!url) return PLACEHOLDER;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  // Ruta relativa → convertir a URL completa usando la base del backend
  const backendBase = API_URL.replace("/api", "");
  if (url.startsWith("/")) return `${backendBase}${url}`;
  return `${backendBase}/storage/${url}`;
}

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
    features: (p.caracteristicas || []).map((c: any) =>
      typeof c === "string" ? c : (c?.nombre || "")
    ).filter(Boolean),
    images: imagenesUrls,
    coverImage: imagenesUrls[0],
    featured: p.destacada ?? false,
    createdAt: p.created_at,
    estado: p.estado,
  };
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

  return getCached(cacheKey, 10_000, async () => {
    try {
      const response = await fetch(url, { next: { revalidate: 10 } });
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
  return getCached("prop:destacadas", 10_000, async () => {
    try {
      const response = await fetch(`${API_URL}/propiedades?destacadas=true`, {
        next: { revalidate: 10 },
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
  return getCached(`prop:${id}`, 30_000, async () => {
    try {
      const response = await fetch(`${API_URL}/propiedades/${id}`, {
        next: { revalidate: 30 },
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
      headers: writeHeaders(),
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
      headers: writeHeaders(),
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
      headers: writeHeaders(false),
    });
    if (response.ok) clearPropiedadesCache();
    return response.ok;
  } catch (error) {
    console.error(`Error al eliminar propiedad ${id}:`, error);
    return false;
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
    filosofia_titulo: "Estudio jurídico integral especializado en derecho civil e inmobiliario.",
    filosofia_texto:
      "Ritta & Asoc. es un estudio jurídico integral dedicado a una amplia variedad de ramas principalmente del derecho civil. En esta web vas a encontrar las propiedades en venta y alquiler disponibles. También vas a poder consultarnos para publicar tu propiedad.",
    filosofia_imagen: null,
    filosofia_titulo_fuente: "serif-elegante",
    filosofia_titulo_tamano: "normal",
    filosofia_texto_fuente: "sans-moderna",
    filosofia_texto_tamano: "normal",
    whatsapp_numero: null,
    mapa_lat: -33.6353240,
    mapa_lng: -64.0238556,
    mapa_zoom: 17,
    mapa_direccion: "Alfonsina Storni 105",
    mapa_localidad: "Adelia María, Córdoba (5843)",
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
