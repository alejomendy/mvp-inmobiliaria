import WhatsAppButton from "./WhatsAppButton";

interface PropietarioBannerProps {
  /** "dark" = fondo oscuro (en home), "light" = fondo crema (en propiedades) */
  variant?: "dark" | "light";
}

export default function PropietarioBanner({ variant = "dark" }: PropietarioBannerProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={`rounded-[2.5rem] px-8 py-14 md:py-16 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8 ${
        isDark ? "bg-[#3A3833]" : "bg-[#F0EBE1]"
      }`}
    >
      <div className="max-w-xl text-center md:text-left">
        <span className={`label-caps block mb-4 ${isDark ? "!text-white/60" : ""}`}>
          Para propietarios
        </span>
        <h3 className={`title-serif text-3xl md:text-5xl mb-4 ${isDark ? "text-white" : ""}`}>
          Publicá tu propiedad
        </h3>
        <p className={`font-sans text-sm leading-relaxed ${isDark ? "text-white/70" : "text-[#4A4744]"}`}>
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
