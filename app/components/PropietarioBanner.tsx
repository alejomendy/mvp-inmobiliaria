import WhatsAppButton from "./WhatsAppButton";

interface PropietarioBannerProps {
  /** "dark" = fondo oscuro (en home), "light" = fondo crema (en propiedades) */
  variant?: "dark" | "light";
}

export default function PropietarioBanner({ variant = "dark" }: PropietarioBannerProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={`rounded-card-md px-8 py-14 md:py-16 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden ${
        isDark ? "bg-ink" : "bg-surface-warm"
      }`}
    >
      {/* Decorative gold accent line */}
      <div className={`absolute top-0 left-0 right-0 h-px ${
        isDark
          ? "bg-gradient-to-r from-transparent via-gold/50 to-transparent"
          : "bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      }`} />

      <div className="max-w-xl text-center md:text-left">
        <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
          <div className="w-6 h-px bg-gold" />
          <span className="label-caps !text-gold">Para propietarios</span>
        </div>
        <h3
          className={`title-serif text-3xl md:text-5xl mb-4 ${isDark ? "!text-gold" : ""}`}
        >
          Publicá tu propiedad
        </h3>
        <p className={`font-sans text-sm leading-relaxed ${isDark ? "text-muted" : "text-warm"}`}>
          Escribinos o acércate a nuestras oficinas para que te ayudemos a publicitar y conseguir tu próximo inquilino o comprador.
        </p>
      </div>
      <WhatsAppButton
        message="Hola! Quiero publicar mi propiedad con Ritta & Asociados."
        label="Escribinos"
        variant="pill"
        className="!px-8 !py-5 whitespace-nowrap flex-shrink-0 shadow-lg"
      />
    </div>
  );
}
