import Image from "next/image";
import Link from "next/link";
import logoHero from "@/lib/assets/logo-Rita_Asociados.png";

export default function Nav() {
  return (
    <>
      <header className="glass-header">
        {/* CSS-only Mobile Menu Toggle - Must be before elements that respond to peer-checked */}
        <input type="checkbox" id="mobile-menu" className="hidden peer/menu" />
        
        <div className="nav-container">
          <Link href="/" className="font-serif text-3xl tracking-widest uppercase text-[#3A3833] drop-shadow-sm relative z-50 flex items-center hover:opacity-80 transition-opacity">
            <Image
              src={logoHero}
              alt="Logo Rita & Asociados"
              width={180}
              height={60}
              className="w-auto h-10 md:h-12 object-contain"
            />
          </Link>

          {/* Hamburger Icon */}
          <label htmlFor="mobile-menu" className="md:hidden cursor-pointer relative z-[60] p-2 text-[#3A3833]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
            <svg className="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </label>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-12">
            <NavLink href="/propiedades">Propiedades</NavLink>
            <NavLink href="/sobre-nosotros">Sobre Nosotros</NavLink>
            <NavLink href="/contacto">Contacto</NavLink>
          </nav>
        </div>

        {/* Mobile Navigation Dropdown */}
        <nav className="mobile-nav">
          <MobileNavLink href="/propiedades">Propiedades</MobileNavLink>
          <MobileNavLink href="/sobre-nosotros">Sobre Nosotros</MobileNavLink>
          <MobileNavLink href="/contacto">Contacto</MobileNavLink>
        </nav>
      </header>
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="nav-link">
      {children}
      <span className="nav-link-underline"></span>
    </Link>
  );
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="font-serif tracking-widest text-2xl uppercase text-[#3A3833] hover:opacity-60 transition-opacity">
      {children}
    </Link>
  );
}
