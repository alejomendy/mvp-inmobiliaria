import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen text-[#3A3833] selection:bg-[#3A3833] selection:text-[#FAFAF7] bg-[#FAFAF7]">
      {/* 2. Navbar (Encabezado) */}
      <header className="sticky top-0 z-50 bg-[#FAFAF7]/80 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.03)] px-6 md:px-12 py-5 flex justify-between items-center w-full border-b border-black/5 transition-all duration-300">
        {/* Left: Logo */}
        <div className="font-serif text-3xl tracking-widest uppercase text-[#3A3833] drop-shadow-sm relative z-50">
          CHAPERO
        </div>

        {/* CSS-only Mobile Menu Toggle (Server Component Safe) */}
        <input type="checkbox" id="mobile-menu" className="hidden peer/menu" />

        {/* Hamburger Icon (Visible on Mobile) */}
        <label htmlFor="mobile-menu" className="md:hidden cursor-pointer relative z-[60] p-2 text-[#3A3833]">
          {/* Menu Icon */}
          <svg className="w-6 h-6 block peer-checked/menu:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
          {/* Close Icon (X) */}
          <svg className="w-6 h-6 hidden peer-checked/menu:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </label>

        {/* Right: Desktop Navigation */}
        <nav className="hidden md:flex gap-12 text-xs tracking-[0.2em] uppercase font-semibold text-[#66615C]">
          <Link href="/propiedades" className="hover:text-[#3A3833] transition-colors relative group py-2">
            Propiedades
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#3A3833] transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <a href="#" className="hover:text-[#3A3833] transition-colors relative group py-2">
            Sobre Nosotros
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#3A3833] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#" className="hover:text-[#3A3833] transition-colors relative group py-2">
            Contacto
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#3A3833] transition-all duration-300 group-hover:w-full"></span>
          </a>
        </nav>

        {/* Mobile Navigation Dropdown */}
        <nav className="absolute top-full left-0 w-full bg-[#FAFAF7]/80 backdrop-blur-md border-b border-black/5 flex flex-col items-center py-8 gap-8 opacity-0 pointer-events-none peer-checked/menu:opacity-100 peer-checked/menu:pointer-events-auto transition-all duration-300 md:hidden z-40 shadow-lg origin-top scale-y-95 peer-checked/menu:scale-y-100">
          <Link href="/propiedades" className="font-serif tracking-widest text-2xl uppercase text-[#3A3833] hover:opacity-60 transition-opacity">
            Propiedades
          </Link>
          <a href="#" className="font-serif tracking-widest text-2xl uppercase text-[#3A3833] hover:opacity-60 transition-opacity">
            Sobre Nosotros
          </a>
          <a href="#" className="font-serif tracking-widest text-2xl uppercase text-[#3A3833] hover:opacity-60 transition-opacity">
            Contacto
          </a>
        </nav>
      </header>

      {/* 3. Hero Section */}
      <section className="px-6 md:px-12 pb-16 pt-8 bg-[#FAFAF7]">
        <div className="relative w-full h-[80vh] min-h-[600px] overflow-hidden rounded-3xl group shadow-sm">
          <Image
            src="https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=2000&q=90"
            fill
            alt="Hero Background - Luminous Interior"
            className="object-cover transition-transform duration-[2s] group-hover:scale-105"
            priority
            unoptimized
          />
          {/* Subtle overlay for text readability */}
          <div className="absolute inset-0 bg-[#3A3833]/20" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="font-serif text-white text-5xl md:text-8xl leading-[1.05] mb-10 hero-title-fadeIn drop-shadow-sm">
              Encuentra la luz en<br />cada rincón.
            </h1>

            {/* Search Pill */}
            <div className="bg-white/95 backdrop-blur-sm rounded-full flex flex-row items-center p-1.5 md:p-2 w-full max-w-[90%] md:max-w-xl shadow-lg md:shadow-xl overflow-hidden transition-all mx-auto">
              <input
                type="text"
                placeholder="Ubicación, barrio..."
                className="flex-1 min-w-0 bg-transparent border-none outline-none text-xs md:text-sm px-4 md:px-6 text-[#3A3833] placeholder:text-[#8B9485] font-sans"
              />
              <button className="bg-[#8B9485] text-white rounded-full uppercase text-[10px] md:text-xs tracking-widest px-6 md:px-8 py-3 md:py-3.5 font-bold hover:bg-[#727A6C] shadow-sm transition-colors whitespace-nowrap">
                Buscar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Philosophy Section */}
      <section className="px-6 md:px-12 py-20 md:py-32 bg-white rounded-t-[3rem] relative z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.02)] -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center max-w-[1400px] mx-auto">
          {/* Left: Aspect 4:5 Image */}
          <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#F0EBE1]">
            <Image
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85"
              fill
              alt="Our Philosophy - Architectural detail"
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Right: Content */}
          <div className="flex flex-col w-full max-w-md">
            <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#8B9485] mb-6 font-bold">
              Sobre Nosotros
            </span>
            <h2 className="font-serif text-5xl md:text-6xl leading-[1.1] mb-6 text-[#3A3833]">
              Hogares que respiran contigo.
            </h2>
            <p className="font-sans text-sm md:text-base leading-relaxed text-[#66615C] mb-10">
              En Chapero Inmobiliaria seleccionamos propiedades con alma, priorizando la luz natural, la calidad constructiva y la armonía con el entorno. Somos una firma dedicada a quienes entienden que el lujo reside en la simplicidad y en el confort de un hogar bien elegido.
            </p>
            <a
              href="/sobre-nosotros"
              className="font-sans text-[10px] md:text-xs uppercase tracking-widest border-b border-[#3A3833] pb-1 hover:text-[#8B9485] hover:border-[#8B9485] transition-colors self-start font-bold text-[#3A3833]"
            >
              Conoce mas de nosotros
            </a>
          </div>
        </div>
      </section>

      {/* 5. Living Spaces (Espacios de Vida) — imágenes clickeables */}
      <section className="px-6 md:px-12 pt-24 pb-32 md:pt-32 md:pb-40 bg-white relative z-15 rounded-t-[3rem] -mt-12 shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#8B9485] block mb-4 font-bold">
                Colecciones
              </span>
              <h2 className="font-serif text-5xl md:text-7xl leading-none text-[#3A3833]">
                Espacios de Vida
              </h2>
            </div>
            <p className="font-sans text-sm md:text-base text-[#66615C] max-w-xs text-left md:text-right leading-relaxed">
              Explora nuestra cuidada colección de propiedades que redefinen los espacios hechos para vivir.
            </p>
          </div>

          {/* Asymmetrical Masonry Grid — cada imagen es clickeable */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

            {/* Left Column */}
            <div className="flex flex-col gap-6 md:gap-8">
              {/* Card 1 → penthouse-luminoso-palermo */}
              <Link href="/propiedades/penthouse-luminoso-palermo" className="relative w-full aspect-[3/2] rounded-[2rem] overflow-hidden bg-[#F0EBE1] group block">
                <Image
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85"
                  fill
                  alt="Penthouse Luminoso - Palermo"
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]"
                  unoptimized
                />
                <div className="absolute inset-0 bg-[#3A3833]/0 group-hover:bg-[#3A3833]/50 transition-all duration-500" />
                <div className="absolute inset-0 flex flex-col justify-end p-7 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/70 font-bold mb-1">En Venta · Palermo</span>
                  <span className="font-serif text-white text-2xl leading-tight">Penthouse Luminoso</span>
                  <span className="font-sans text-white/80 text-xs mt-1 tracking-wider">USD 420.000 · 180 m²</span>
                </div>
              </Link>
              {/* Card 2 → casa-minimalista-nordelta */}
              <Link href="/propiedades/casa-minimalista-nordelta" className="relative w-full aspect-square rounded-[2rem] overflow-hidden bg-[#F0EBE1] group block">
                <Image
                  src="https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&w=1000&q=85"
                  fill
                  alt="Casa Minimalista - Nordelta"
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]"
                  unoptimized
                />
                <div className="absolute inset-0 bg-[#3A3833]/0 group-hover:bg-[#3A3833]/50 transition-all duration-500" />
                <div className="absolute inset-0 flex flex-col justify-end p-7 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/70 font-bold mb-1">En Venta · Nordelta</span>
                  <span className="font-serif text-white text-2xl leading-tight">Casa Minimalista</span>
                  <span className="font-sans text-white/80 text-xs mt-1 tracking-wider">USD 780.000 · 320 m²</span>
                </div>
              </Link>
            </div>

            {/* Middle Column */}
            <div className="flex flex-col gap-6 md:gap-8">
              {/* Card 3 → loft-industrial-san-telmo */}
              <Link href="/propiedades/loft-industrial-san-telmo" className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#F0EBE1] group block mt-0 lg:mt-12">
                <Image
                  src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=85"
                  fill
                  alt="Loft Industrial - San Telmo"
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]"
                  unoptimized
                />
                <div className="absolute inset-0 bg-[#3A3833]/0 group-hover:bg-[#3A3833]/50 transition-all duration-500" />
                <div className="absolute inset-0 flex flex-col justify-end p-7 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/70 font-bold mb-1">Alquiler · San Telmo</span>
                  <span className="font-serif text-white text-2xl leading-tight">Loft Industrial</span>
                  <span className="font-sans text-white/80 text-xs mt-1 tracking-wider">USD 1.800/mes · 95 m²</span>
                </div>
              </Link>
              {/* Card 4 → suite-premium-recoleta */}
              <Link href="/propiedades/suite-premium-recoleta" className="relative w-full aspect-[3/4] rounded-[2rem] overflow-hidden bg-[#F0EBE1] group block">
                <Image
                  src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85"
                  fill
                  alt="Suite Premium - Recoleta"
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]"
                  unoptimized
                />
                <div className="absolute inset-0 bg-[#3A3833]/0 group-hover:bg-[#3A3833]/50 transition-all duration-500" />
                <div className="absolute inset-0 flex flex-col justify-end p-7 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/70 font-bold mb-1">Alquiler · Recoleta</span>
                  <span className="font-serif text-white text-2xl leading-tight">Suite Premium</span>
                  <span className="font-sans text-white/80 text-xs mt-1 tracking-wider">USD 2.400/mes · 130 m²</span>
                </div>
              </Link>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6 md:gap-8">
              {/* Card 5 → residencia-belgrano-r */}
              <Link href="/propiedades/residencia-belgrano-r" className="relative w-full aspect-square rounded-[2rem] overflow-hidden bg-[#F0EBE1] group block mt-0 lg:mt-24">
                <Image
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85"
                  fill
                  alt="Residencia Belgrano R"
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]"
                  unoptimized
                />
                <div className="absolute inset-0 bg-[#3A3833]/0 group-hover:bg-[#3A3833]/50 transition-all duration-500" />
                <div className="absolute inset-0 flex flex-col justify-end p-7 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/70 font-bold mb-1">En Venta · Belgrano R</span>
                  <span className="font-serif text-white text-2xl leading-tight">Residencia Belgrano R</span>
                  <span className="font-sans text-white/80 text-xs mt-1 tracking-wider">USD 650.000 · 450 m²</span>
                </div>
              </Link>
              {/* Card 6 → wellness-suite-puerto-madero */}
              <Link href="/propiedades/wellness-suite-puerto-madero" className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#F0EBE1] group block">
                <Image
                  src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=85"
                  fill
                  alt="Wellness Suite - Puerto Madero"
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]"
                  unoptimized
                />
                <div className="absolute inset-0 bg-[#3A3833]/0 group-hover:bg-[#3A3833]/50 transition-all duration-500" />
                <div className="absolute inset-0 flex flex-col justify-end p-7 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/70 font-bold mb-1">En Venta · Puerto Madero</span>
                  <span className="font-serif text-white text-2xl leading-tight">Wellness Suite</span>
                  <span className="font-sans text-white/80 text-xs mt-1 tracking-wider">USD 520.000 · 145 m²</span>
                </div>
              </Link>
            </div>

          </div>

          {/* CTA to all properties */}
          <div className="mt-16 flex justify-center">
            <Link
              href="/propiedades"
              className="font-sans text-[10px] md:text-xs uppercase tracking-widest border border-[#3A3833] text-[#3A3833] rounded-full px-10 py-4 hover:bg-[#3A3833] hover:text-white transition-colors font-bold"
            >
              Ver todas las propiedades
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="px-6 md:px-12 pt-24 pb-12 bg-[#F0EBE1] rounded-t-[3rem] relative z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.02)] -mt-12">
        {/* Main 50/50 Footer Grid */}
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-12 mb-24">

            {/* Left: Let's find your sanctuary */}
            <div className="max-w-md">
              <h2 className="font-serif text-5xl md:text-6xl leading-[1.1] mb-6 text-[#3A3833]">
                Encontremos tu refugio.
              </h2>
              <p className="font-sans text-sm md:text-base text-[#66615C] mb-10 leading-relaxed">
                Regístrate para recibir novedades sobre propiedades excepcionales e historias sobre cómo vivir maravillosamente.
              </p>

              {/* Email Pill */}
              <div className="bg-white rounded-[2rem] md:rounded-full flex flex-col md:flex-row items-center p-2 w-full max-w-sm md:max-w-md border border-[#D2D6CB] shadow-sm gap-2 md:gap-0 transition-all">
                <input
                  type="email"
                  placeholder="Correo Electrónico"
                  className="w-full flex-1 bg-transparent border-none outline-none text-sm px-6 py-3 md:py-0 text-[#3A3833] placeholder:text-[#8B9485] font-sans text-center md:text-left"
                />
                <button className="bg-[#3A3833] text-white rounded-full uppercase text-[10px] md:text-xs tracking-widest px-8 w-full md:w-auto py-4 md:py-3.5 font-bold hover:bg-[#1A1917] transition-colors">
                  Suscribirse
                </button>
              </div>
            </div>

            {/* Right: 3 Navbar Columns */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:pl-12">
              <div className="flex flex-col space-y-5">
                <span className="font-sans text-[10px] text-xs tracking-widest uppercase text-[#8B9485] mb-2 font-bold">Oficinas</span>
                <a href="#" className="font-sans text-sm md:text-base text-[#66615C] hover:text-[#3A3833] capitalize transition-colors">Buenos Aires</a>
                <a href="#" className="font-sans text-sm md:text-base text-[#66615C] hover:text-[#3A3833] capitalize transition-colors">Córdoba</a>
                <a href="#" className="font-sans text-sm md:text-base text-[#66615C] hover:text-[#3A3833] capitalize transition-colors">Mendoza</a>
              </div>
              <div className="flex flex-col space-y-5">
                <span className="font-sans text-[10px] text-xs tracking-widest uppercase text-[#8B9485] mb-2 font-bold">Legal</span>
                <a href="#" className="font-sans text-sm md:text-base text-[#66615C] hover:text-[#3A3833] capitalize transition-colors">Privacidad</a>
                <a href="#" className="font-sans text-sm md:text-base text-[#66615C] hover:text-[#3A3833] capitalize transition-colors">Términos</a>
                <a href="#" className="font-sans text-sm md:text-base text-[#66615C] hover:text-[#3A3833] capitalize transition-colors">Cookies</a>
              </div>
              <div className="flex flex-col space-y-5">
                <span className="font-sans text-[10px] text-xs tracking-widest uppercase text-[#8B9485] mb-2 font-bold">Redes</span>
                <a href="#" className="font-sans text-sm md:text-base text-[#66615C] hover:text-[#3A3833] capitalize transition-colors">Instagram</a>
                <a href="#" className="font-sans text-sm md:text-base text-[#66615C] hover:text-[#3A3833] capitalize transition-colors">Facebook</a>
                <a href="#" className="font-sans text-sm md:text-base text-[#66615C] hover:text-[#3A3833] capitalize transition-colors">Twitter</a>
              </div>
            </div>
          </div>

          {/* Bottom Bar Separator */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#D2D6CB]/50 gap-6 text-center md:text-left">
            <span className="font-sans text-[10px] md:text-xs tracking-widest uppercase text-[#8B9485] font-bold">
              © 2026 INMOBILIARIA CHAPERO. TODOS LOS DERECHOS RESERVADOS.
            </span>
            <span className="font-sans text-[10px] md:text-xs tracking-widest uppercase text-[#8B9485] font-bold">
              DISEÑADO PARA LA LUZ Y EL CONFORT
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
