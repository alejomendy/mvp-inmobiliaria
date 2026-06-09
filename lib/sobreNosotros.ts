import type { CSSProperties } from "react";

/**
 * Traducción de los tokens que guarda el admin (fuente / tamaño de la sección
 * "Sobre Nosotros") a estilos CSS concretos. Vive en un solo lugar para que el
 * backend solo persista tokens estables y el frontend controle la apariencia.
 */

// Familias tipográficas curadas. Reutilizan las fuentes ya cargadas por
// next/font (Playfair, Inter) y caen en web-safe para no romper el diseño.
const FUENTES: Record<string, string> = {
  "serif-elegante": "var(--font-playfair), Georgia, serif",
  "serif-clasica": "Georgia, 'Times New Roman', serif",
  "sans-moderna": "var(--font-inter), system-ui, sans-serif",
  "sans-neutra": "'Segoe UI', system-ui, -apple-system, sans-serif",
};

// Tamaños del título. "normal" replica el text-5xl→6xl original (responsive via clamp).
const TAMANOS_TITULO: Record<string, string> = {
  pequeno: "clamp(2.25rem, 4.5vw, 2.75rem)",
  normal: "clamp(3rem, 6vw, 3.75rem)",
  grande: "clamp(3.5rem, 7vw, 4.5rem)",
  "muy-grande": "clamp(4rem, 8vw, 5.5rem)",
};

// Tamaños del texto. "normal" replica el text-sans-sm original (0.875→1rem).
const TAMANOS_TEXTO: Record<string, string> = {
  pequeno: "0.8125rem",
  normal: "1rem",
  grande: "1.125rem",
  "muy-grande": "1.25rem",
};

function familia(token?: string | null, fallback = "sans-moderna"): string {
  return FUENTES[token ?? ""] ?? FUENTES[fallback];
}

export function estiloTituloSobreNosotros(
  fuente?: string | null,
  tamano?: string | null
): CSSProperties {
  return {
    fontFamily: familia(fuente, "serif-elegante"),
    fontSize: TAMANOS_TITULO[tamano ?? ""] ?? TAMANOS_TITULO.normal,
  };
}

export function estiloTextoSobreNosotros(
  fuente?: string | null,
  tamano?: string | null
): CSSProperties {
  return {
    fontFamily: familia(fuente, "sans-moderna"),
    fontSize: TAMANOS_TEXTO[tamano ?? ""] ?? TAMANOS_TEXTO.normal,
  };
}
