import Image from "next/image";
import WhatsAppButton from "../components/WhatsAppButton";
import { getConfiguracionSite } from "@/lib/api";

export default async function ContactoPage() {
  const config = await getConfiguracionSite();
  const whatsapp = config.whatsapp_numero || "543584153649";

  return (
    <main className="bg-surface min-h-screen">

      <section className="section-container pt-20 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <span className="label-caps block mb-6">Contacto</span>
          <h1 className="title-serif text-5xl md:text-7xl mb-8 leading-tight">
            Escribinos,<br />
            <span className="italic">estamos para ayudarte.</span>
          </h1>
          <p className="text-sans-sm max-w-xl mx-auto leading-relaxed mb-10">
            Ya sea que busques tu próxima propiedad, quieras alquilar o vender, o
            necesités asesoramiento jurídico, escribinos por WhatsApp y te
            respondemos a la brevedad.
          </p>

          <div className="flex flex-col items-center gap-4">
            <WhatsAppButton
              message="Hola! Quiero hacer una consulta."
              label="Escribinos por WhatsApp"
              variant="full"
              phoneNumber={whatsapp}
              className="!w-auto"
            />
            <a
              href="mailto:estudiorittayasociados@gmail.com"
              className="btn-outline"
            >
              Enviar Email
            </a>
          </div>
        </div>

        {/* Datos de contacto */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto mt-20 text-center md:text-left">
          <div>
            <span className="label-caps !text-charcoal block mb-3">Oficina</span>
            <p className="text-sans-sm italic">
              Alfonsina Storni 105<br />Adelia María, Córdoba (5843)
            </p>
          </div>
          <div>
            <span className="label-caps !text-charcoal block mb-3">WhatsApp</span>
            <p className="text-sans-sm">3584 153649</p>
          </div>
          <div>
            <span className="label-caps !text-charcoal block mb-3">Redes</span>
            <a
              href="https://www.instagram.com/rittayasociados"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sans-sm text-warm hover:text-charcoal transition-colors"
            >
              @rittayasociados
            </a>
          </div>
        </div>
      </section>

      {/* Foto de la oficina */}
      <section className="section-container pb-24">
        <div className="relative h-[450px] rounded-card-lg overflow-hidden shadow-sm">
          <Image
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=80"
            alt="Ritta & Asociados Oficina"
            fill
            className="object-cover hover:scale-[1.03] transition-transform duration-[3s]"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
        </div>
      </section>
    </main>
  );
}
