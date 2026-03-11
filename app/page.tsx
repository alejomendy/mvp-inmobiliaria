import Image from "next/image";

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
          <a href="#" className="hover:text-[#3A3833] transition-colors relative group py-2">
            Propiedades
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#3A3833] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#" className="hover:text-[#3A3833] transition-colors relative group py-2">
            Estilo de Vida
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#3A3833] transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#" className="hover:text-[#3A3833] transition-colors relative group py-2">
            Contacto
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#3A3833] transition-all duration-300 group-hover:w-full"></span>
          </a>
        </nav>

        {/* Mobile Navigation Dropdown */}
        <nav className="absolute top-full left-0 w-full bg-[#FAFAF7]/80 backdrop-blur-md border-b border-black/5 flex flex-col items-center py-8 gap-8 opacity-0 pointer-events-none peer-checked/menu:opacity-100 peer-checked/menu:pointer-events-auto transition-all duration-300 md:hidden z-40 shadow-lg origin-top scale-y-95 peer-checked/menu:scale-y-100">
          <a href="#" className="font-serif tracking-widest text-2xl uppercase text-[#3A3833] hover:opacity-60 transition-opacity">
            Propiedades
          </a>
          <a href="#" className="font-serif tracking-widest text-2xl uppercase text-[#3A3833] hover:opacity-60 transition-opacity">
            Estilo de Vida
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

            {/* Search Pill - Inline on all devices */}
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
              Nuestra Filosofía
            </span>
            <h2 className="font-serif text-5xl md:text-6xl leading-[1.1] mb-6 text-[#3A3833]">
              Hogares que respiran contigo.
            </h2>
            <p className="font-sans text-sm md:text-base leading-relaxed text-[#66615C] mb-10">
              Creemos que una propiedad es más que un simple refugio. Es un santuario diseñado para capturar la luz natural, promover la calidez e inspirar momentos únicos. Cada espacio que seleccionamos es elegido por su alma, individualidad y conexión con su entorno.
            </p>
            <a
              href="#"
              className="font-sans text-[10px] md:text-xs uppercase tracking-widest border-b border-[#3A3833] pb-1 hover:text-[#8B9485] hover:border-[#8B9485] transition-colors self-start font-bold text-[#3A3833]"
            >
              Conoce nuestra exclusiva selección
            </a>
          </div>
        </div>
      </section>

      {/* 5. Living Spaces Section */}
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

          {/* Asymmetrical Masonry Grid - Expanded to 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

            {/* Left Column */}
            <div className="flex flex-col gap-6 md:gap-8">
              {/* Row 1 / Left -> Landscape 3:2 */}
              <div className="relative w-full aspect-[3/2] rounded-[2rem] overflow-hidden bg-[#F0EBE1] group">
                <Image
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85"
                  fill
                  alt="Living Space 1 - Landscape"
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]"
                  unoptimized
                />
              </div>
              {/* Row 2 / Left -> Square (matching width of top) */}
              <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden bg-[#F0EBE1] group">
                <Image
                  src="https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?auto=format&fit=crop&w=1000&q=85"
                  fill
                  alt="Living Space 2 - Square"
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]"
                  unoptimized
                />
              </div>
            </div>

            {/* Middle Column */}
            <div className="flex flex-col gap-6 md:gap-8">
              {/* Row 1 / Middle -> Portrait 4:5 (taller than landscape) */}
              <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#F0EBE1] group mt-0 lg:mt-12">
                <Image
                  src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=85"
                  fill
                  alt="Living Space 3 - Portrait 4:5"
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]"
                  unoptimized
                />
              </div>
              {/* Row 2 / Middle -> Taller Portrait 3:4 */}
              <div className="relative w-full aspect-[3/4] rounded-[2rem] overflow-hidden bg-[#F0EBE1] group">
                <Image
                  src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85"
                  fill
                  alt="Living Space 4 - Taller Portrait"
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]"
                  unoptimized
                />
              </div>
            </div>

            {/* Right Column (NEW) */}
            <div className="flex flex-col gap-6 md:gap-8">
              {/* Row 1 / Right -> Square */}
              <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden bg-[#F0EBE1] group mt-0 lg:mt-24">
                <Image
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85"
                  fill
                  alt="Living Space 5 - Dining Square"
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]"
                  unoptimized
                />
              </div>
              {/* Row 2 / Right -> Portrait 4:5 */}
              <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#F0EBE1] group">
                <Image
                  src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=85"
                  fill
                  alt="Living Space 6 - Spa Portrait"
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-[1.03]"
                  unoptimized
                />
              </div>
            </div>

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

              {/* Email Pill - Mobile stacked, Desktop inline */}
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
