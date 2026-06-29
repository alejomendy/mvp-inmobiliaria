import Image from "next/image";
import Link from "next/link";
import WhatsAppButton from "./WhatsAppButton";
import HeroImage from "./HeroImage";
import { getConfiguracionSite } from "@/lib/api";

const HERO_FALLBACK = "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=2000&q=90";

export default async function Hero() {
  const config = await getConfiguracionSite();

  const heroImagen = config.hero_imagen || HERO_FALLBACK;
  const whatsapp = config.whatsapp_numero || "";

  return (
    <section className="px-4 md:px-12 pb-16 pt-8 bg-surface">
      <div className="hero-container group">
        <HeroImage src={heroImagen} />
        <div className="hero-overlay" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <Image
            src="/logo.png"
            alt="Logo Ritta & Asociados"
            width={200}
            height={80}
            className="w-auto h-24 md:h-32 object-contain mb-6 drop-shadow-md"
            priority
          />
          <h1 className="title-serif text-white-force text-5xl md:text-8xl mb-2 hero-title-fadeIn drop-shadow-md">
            {config.hero_titulo}
          </h1>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-gold/70" />
            <p className="text-white/90 font-serif text-lg md:text-2xl tracking-wide drop-shadow-sm italic whitespace-nowrap">
              {config.hero_subtitulo}
            </p>
            <div className="w-12 h-px bg-gold/70" />
          </div>
          <div className="mb-6" />

          <div className="flex flex-col sm:flex-row gap-3 mb-10 w-full max-w-sm sm:max-w-none justify-center">
            <Link
              href="/propiedades?tipo=venta"
              className="bg-gold text-ink font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-full hover:bg-gold-dark transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Propiedades en Venta
            </Link>
            <Link
              href="/propiedades?tipo=alquiler"
              className="bg-white/15 backdrop-blur-sm text-white border border-white/40 font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-full hover:bg-white/25 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Propiedades en Alquiler
            </Link>
          </div>

          <WhatsAppButton
            message="Quiero agendar una consulta por una propiedad."
            label="Escribinos para agendar una cita"
            variant="ghost"
            className="drop-shadow-sm"
            phoneNumber={whatsapp}
          />
        </div>
      </div>
    </section>
  );
}
