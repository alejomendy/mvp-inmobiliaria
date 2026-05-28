import type { Metadata } from "next";
import Image from "next/image";
import WhatsAppButton from "../components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Quiénes Somos | Estudio Jurídico Inmobiliario en Adelia María",
  description:
    "Conocé Ritta & Asociados: estudio jurídico integral en Adelia María, Córdoba. Más de años de experiencia en derecho civil, alquiler y venta de propiedades.",
  keywords: [
    "estudio jurídico Adelia María",
    "abogado inmobiliario Adelia María",
    "asesoramiento legal propiedades Córdoba",
    "Ritta y Asociados Adelia María",
    "derecho civil Córdoba",
  ],
  alternates: { canonical: "/sobre-nosotros" },
};

export default function SobreNosotrosPage() {
  return (
    <main className="bg-surface min-h-screen">

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80"
          alt="Ritta & Asociados Estudio Jurídico"
          fill
          className="object-cover brightness-50"
          priority
          unoptimized
        />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="title-serif text-6xl md:text-8xl mb-4 italic" style={{ color: "white" }}>
            Ritta &amp; Asociados
          </h1>
          <p className="label-caps !text-white/80 tracking-[0.3em]">
            Estudio Jurídico Integral
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="luxury-section -mt-16">
        <div className="section-container section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="label-caps">Nosotros</span>
              <h2 className="title-serif text-5xl md:text-6xl">
                Ritta &amp; Asociados
              </h2>
              <p className="text-sans-sm leading-relaxed">
                Estudio Jurídico Integral dedicado a una amplia variedad de ramas principalmente del derecho civil.
              </p>
              <p className="text-sans-sm leading-relaxed">
                En esta página vas a poder ver las propiedades disponibles para alquiler o compra. Nuestro equipo te acompaña en cada paso del proceso, desde la búsqueda hasta la firma, con total transparencia y dedicación.
              </p>
              <WhatsAppButton
                message="Quiero agendar una consulta por una propiedad."
                label="Escribinos para agendar una cita"
                variant="pill"
                className="!px-7 !py-4 shadow-md"
              />
            </div>
            <div className="relative aspect-square rounded-card-lg overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80"
                alt="Ritta & Asociados"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-white py-24 md:py-32">
        <div className="section-container">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <span className="label-caps block mb-4">Nuestros Valores</span>
            <h2 className="title-serif text-4xl md:text-5xl">Los pilares que nos definen.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <ValueCard
              title="Integridad"
              description="Transparencia absoluta en cada transacción y consejo."
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
            />
            <ValueCard
              title="Propiedades"
              description="Alquiler y venta de inmuebles con asesoramiento jurídico integral."
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />}
            />
            <ValueCard
              title="Cercanía"
              description="Un trato humano y dedicado que trasciende lo comercial."
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function ValueCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 bg-surface-warm rounded-full flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {icon}
        </svg>
      </div>
      <h3 className="font-serif text-2xl mb-4">{title}</h3>
      <p className="text-sans-sm">{description}</p>
    </div>
  );
}
