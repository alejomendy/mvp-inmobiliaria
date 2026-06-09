import { Fragment, type ReactNode } from "react";

/**
 * Renderiza un texto envolviendo cada "&" en un span más chico, para que el
 * ampersand (que en las serif ornamentadas se dibuja grande) no se vea tan
 * dominante frente a las letras. El tamaño se controla con la clase
 * `.ampersand-sm` en styles/main.css.
 */
export function conAmpersand(texto: string): ReactNode {
  if (!texto.includes("&")) return texto;

  return texto.split("&").map((parte, i) => (
    <Fragment key={i}>
      {i > 0 && <span className="ampersand-sm">&amp;</span>}
      {parte}
    </Fragment>
  ));
}
