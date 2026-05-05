import WhatsAppButton from "./WhatsAppButton";
import MapaWrapper from "./MapaWrapper";
import { getConfiguracionSite } from "@/lib/api";

export default async function Philosophy() {
  const config = await getConfiguracionSite();
  const whatsapp = config.whatsapp_numero || "543584153649";

  return (
    <section className="luxury-section -mt-8">
      <div className="section-container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

          {/* Izquierda: Mapa de ubicación */}
          <div className="relative w-full aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#F0EBE1] shadow-sm">
            <MapaWrapper />

            {/* Etiqueta de dirección flotante */}
            <div className="absolute bottom-5 left-5 right-5 z-[1000] pointer-events-none">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-md inline-flex items-center gap-3 border border-[#C9A96E]/20">
                <svg className="w-4 h-4 text-[#C9A96E] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-sans text-sm font-semibold text-[#1C1814]">
                  Alfonsina Storni 105, Río Cuarto
                </span>
              </div>
            </div>
          </div>

          {/* Derecha: Contenido */}
          <div className="flex flex-col w-full max-w-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-[#C9A96E]" />
              <span className="label-caps !text-[#C9A96E]">Quiénes somos</span>
            </div>
            <h2 className="title-serif text-5xl md:text-6xl mb-6">
              {config.filosofia_titulo}
            </h2>
            {config.filosofia_texto && (
              <p className="text-sans-sm mb-10">
                {config.filosofia_texto}
              </p>
            )}
            <WhatsAppButton
              message="Quiero agendar una consulta por una propiedad."
              label="Escribinos para agendar una cita"
              variant="pill"
              className="self-start"
              phoneNumber={whatsapp}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
