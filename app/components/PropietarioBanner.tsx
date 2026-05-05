import WhatsAppButton from "./WhatsAppButton";

interface PropietarioBannerProps {
  /** "dark" = fondo oscuro (en home), "light" = fondo crema (en propiedades) */
  variant?: "dark" | "light";
}

export default function PropietarioBanner({ variant = "dark" }: PropietarioBannerProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={`rounded-[2.5rem] px-8 py-14 md:py-16 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden ${
        isDark ? "bg-[#1C1814]" : "bg-[#F0EBE1]"
      }`}
    >
      {/* Decorative gold accent line */}
      <div className={`absolute top-0 left-0 right-0 h-px ${isDark ? "bg-gradient-to-r from-transparent via-[#C9A96E]/50 to-transparent" : "bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent"}`} />

      <div className="max-w-xl text-center md:text-left">
        <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
          <div className="w-6 h-px bg-[#C9A96E]" />
          <span className={`label-caps !text-[#C9A96E]`}>Para propietarios</span>
        </div>
        <h3 className={`title-serif text-3xl md:text-5xl mb-4 ${isDark ? "text-[#FAFAF7]" : ""}`}>
          Publicá tu propiedad
        </h3>
        <p className={`font-sans text-sm leading-relaxed ${isDark ? "text-[#8B9485]" : "text-[#4A4744]"}`}>
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
