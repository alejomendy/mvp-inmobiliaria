import Image from "next/image";
import Nav from "../components/nav";

export default function ContactoPage() {
  return (
    <main className="bg-[#FAFAF7] min-h-screen">
      <Nav />

      <section className="section-container pt-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Content & Info */}
          <div className="lg:sticky lg:top-32">
            <span className="label-caps block mb-6">Contacto</span>
            <h1 className="title-serif text-5xl md:text-7xl mb-8 leading-tight">
              Diseñamos el camino <br />
              <span className="italic">hacia tu hogar.</span>
            </h1>
            <p className="text-sans-sm max-w-md leading-relaxed mb-12">
              Ya sea que busques tu próxima propiedad o quieras confiar la venta de tu hogar, estamos aquí para asesorarte con transparencia y exclusividad.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
              <div>
                <span className="label-caps !text-[#3A3833] block mb-3">Oficina</span>
                <p className="text-sans-sm italic">
                  Av. Libertador 1234, 10º<br />
                  Recoleta, CABA
                </p>
              </div>
              <div>
                <span className="label-caps !text-[#3A3833] block mb-3">Contacto</span>
                <p className="text-sans-sm">
                  +54 (11) 4567-8900<br />
                  hola@ritayasociados.com
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a href="https://wa.me/5491100000000" target="_blank" rel="noopener noreferrer" className="btn-primary">
                WhatsApp Directo
              </a>
              <a href="mailto:hola@ritayasociados.com" className="btn-outline">
                Enviar Email
              </a>
            </div>
          </div>

          {/* Right: Premium Form */}
          <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-[0_30px_80px_rgba(0,0,0,0.03)] border border-[#D2D6CB]/20">
            <h3 className="title-serif text-2xl mb-8">Envíanos un mensaje</h3>
            <form className="space-y-6">
              <div className="space-y-1.5">
                <label className="label-caps !text-[#3A3833] !text-[10px]">Nombre Completo</label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-b border-[#D2D6CB]/60 py-3 outline-none focus:border-[#3A3833] transition-colors font-sans text-sm"
                  placeholder="Tu nombre completo"
                />
              </div>
              <div className="space-y-1.5">
                <label className="label-caps !text-[#3A3833] !text-[10px]">Email de contacto</label>
                <input 
                  type="email" 
                  className="w-full bg-transparent border-b border-[#D2D6CB]/60 py-3 outline-none focus:border-[#3A3833] transition-colors font-sans text-sm"
                  placeholder="ejemplo@email.com"
                />
              </div>
              <div className="space-y-1.5">
                <label className="label-caps !text-[#3A3833] !text-[10px]">Asunto</label>
                <select className="w-full bg-transparent border-b border-[#D2D6CB]/60 py-3 outline-none focus:border-[#3A3833] transition-colors font-sans text-sm appearance-none cursor-pointer">
                  <option>Consulta General</option>
                  <option>Quiero Vender</option>
                  <option>Quiero Alquilar</option>
                  <option>Inversiones</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="label-caps !text-[#3A3833] !text-[10px]">Mensaje</label>
                <textarea 
                  rows={4}
                  className="w-full bg-transparent border-b border-[#D2D6CB]/60 py-3 outline-none focus:border-[#3A3833] transition-colors font-sans text-sm resize-none"
                  placeholder="Cuéntanos en qué podemos ayudarte..."
                />
              </div>
              <button type="submit" className="btn-primary w-full py-5 !text-[11px] mt-4">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section or Office Photo */}
      <section className="section-container pb-24">
        <div className="relative h-[450px] rounded-[3rem] overflow-hidden shadow-sm">
          <Image
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=80"
            alt="Buenos Aires Office"
            fill
            className="object-cover hover:scale-[1.03] transition-transform duration-[3s]"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3A3833]/20 to-transparent" />
        </div>
      </section>
    </main>
  );
}
