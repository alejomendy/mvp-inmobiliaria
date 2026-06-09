import WhatsAppButton from "./WhatsAppButton";
import MapaWrapper from "./MapaWrapper";
import { getConfiguracionSite } from "@/lib/api";

export default async function Philosophy() {
  const config = await getConfiguracionSite();
  const whatsapp = config.whatsapp_numero || "543584153649";

  const lat = config.mapa_lat != null ? Number(config.mapa_lat) : undefined;
  const lng = config.mapa_lng != null ? Number(config.mapa_lng) : undefined;
  const zoom = config.mapa_zoom != null ? Number(config.mapa_zoom) : undefined;
  const direccion = config.mapa_direccion || "Alfonsina Storni 105";
  const localidad = config.mapa_localidad || "Adelia María, Córdoba (5843)";
  const etiquetaDireccion = [direccion, localidad].filter(Boolean).join(", ");

  return (
    <section className="luxury-section -mt-8">
      <div className="section-container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">

          {/* Izquierda: Mapa de ubicación */}
          <div className="relative w-full aspect-square md:aspect-[4/5] rounded-card overflow-hidden bg-surface-warm shadow-sm">
            <MapaWrapper lat={lat} lng={lng} zoom={zoom} direccion={direccion} localidad={localidad} />

            {/* Etiqueta de dirección flotante */}
            <div className="absolute bottom-5 left-5 right-5 z-[1000] pointer-events-none">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-md inline-flex items-center gap-3 border border-gold/20">
                <svg className="w-4 h-4 text-gold shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-sans text-sm font-semibold text-ink">
                  {etiquetaDireccion}
                </span>
              </div>
            </div>
          </div>

          {/* Derecha: Contenido */}
          <div className="flex flex-col w-full max-w-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-gold" />
              <span className="label-caps !text-gold">Quiénes somos</span>
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
