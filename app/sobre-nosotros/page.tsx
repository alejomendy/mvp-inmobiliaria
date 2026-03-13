import Image from "next/image";
import Nav from "../components/nav";

export default function SobreNosotrosPage() {
  return (
    <main className="bg-[#FAFAF7] min-h-screen">
      <Nav />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80"
          alt="Rita & Asociados Office"
          fill
          className="object-cover brightness-50"
          priority
          unoptimized
        />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="title-serif text-6xl md:text-8xl mb-4 italic" style={{ color: 'white' }}>
            Nuestra Historia
          </h1>
          <p className="label-caps !text-white/80 tracking-[0.3em]">
            Tradición, Excelencia y Visión
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="luxury-section -mt-16">
        <div className="section-container section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="label-caps">Desde 1995</span>
              <h2 className="title-serif text-5xl md:text-6xl">
                Redefiniendo el concepto de hogar.
              </h2>
              <p className="text-sans-sm leading-relaxed">
                Rita & Asociados nació con la convicción de que una propiedad es mucho más que cuatro paredes; es el escenario de una vida. Fundada por Rita Valenzuela, nuestra firma se ha consolidado como un referente en el mercado inmobiliario de alta gama, destacándose por su trato personalizado y su ojo clínico para detectar oportunidades únicas.
              </p>
              <p className="text-sans-sm leading-relaxed">
                Nuestra misión es simple pero profunda: conectar personas con espacios que resuenen con su estilo de vida y aspiraciones. Trabajamos con una selección curada de propiedades que cumplen con los más altos estándares de diseño, ubicación y potencial.
              </p>
            </div>
            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80"
                alt="Portrait of Rita Valenzuela"
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
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#F0EBE1] rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#3A3833]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl mb-4">Integridad</h3>
              <p className="text-sans-sm">Transparencia absoluta en cada transacción y consejo.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#F0EBE1] rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#3A3833]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl mb-4">Curaduría</h3>
              <p className="text-sans-sm">Solo propiedades que cumplen con nuestra visión de excelencia.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#F0EBE1] rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#3A3833]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl mb-4">Cercanía</h3>
              <p className="text-sans-sm">Un trato humano y dedicado que trasciende lo comercial.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-container section-padding">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <h2 className="title-serif text-5xl md:text-7xl">
            Nuestros Asociados
          </h2>
          <p className="text-sans-sm max-w-xs text-right">
            Expertos comprometidos con brindarte una experiencia inigualable.
          </p>
        </div>
        
        {/* Mobile: horizontal scroll. Desktop: 3-col grid */}
        <div className="flex md:grid md:grid-cols-3 gap-8 md:gap-12 -mx-6 px-6 md:mx-0 md:px-0 overflow-x-auto md:overflow-visible pb-6 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" style={{ scrollSnapType: 'x mandatory' }}>
          <TeamMember 
            name="Rita Valenzuela" 
            role="Fundadora & CEO" 
            image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
          />
          <TeamMember 
            name="Andrés Méndy" 
            role="Director Comercial" 
            image="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"
          />
          <TeamMember 
            name="Sofía Martínez" 
            role="Consultora Senior" 
            image="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80"
          />
        </div>
      </section>

    </main>
  );
}

function TeamMember({ name, role, image }: { name: string; role: string; image: string }) {
  return (
    <div
      className="group flex flex-col gap-5 flex-shrink-0 md:flex-shrink"
      style={{ width: 'calc(80vw)', maxWidth: '340px', scrollSnapAlign: 'center' }}
    >
      <div className="relative bg-[#F0EBE1] rounded-[2.5rem] overflow-hidden shadow-sm" style={{ aspectRatio: '3/4' }}>
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-all duration-700 md:grayscale md:group-hover:grayscale-0 md:group-hover:scale-105"
          unoptimized
        />
      </div>
      <div>
        <h3 className="font-serif text-2xl mb-1 text-[#3A3833]">{name}</h3>
        <span className="label-caps !text-[#8B9485] !text-[11px]">{role}</span>
      </div>
    </div>
  );
}
