import Link from "next/link";
import WhatsAppButton from "./WhatsAppButton";

export default function Footer() {
  return (
    <footer className="bg-[#F0EBE1] relative z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
      <div className="section-container py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">

          {/* Brand + Info */}
          <div>
            <span className="font-serif text-xl text-[#3A3833] tracking-wide">Ritta &amp; Asociados</span>
            <p className="text-sans-sm !text-[#66615C] text-sm mt-1">
              Alfonsina Storni 105 · 3584 153649 · estudiorittayasociados@gmail.com
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/propiedades?tipo=venta" className="font-sans text-sm text-[#66615C] hover:text-[#3A3833] transition-colors">En Venta</Link>
            <Link href="/propiedades?tipo=alquiler" className="font-sans text-sm text-[#66615C] hover:text-[#3A3833] transition-colors">En Alquiler</Link>
            <Link href="/sobre-nosotros" className="font-sans text-sm text-[#66615C] hover:text-[#3A3833] transition-colors">Nosotros</Link>
            <a href="https://www.instagram.com/rittayasociados" target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-[#66615C] hover:text-[#3A3833] transition-colors">Instagram</a>
            <WhatsAppButton
              message="Quiero agendar una consulta por una propiedad."
              label="WhatsApp"
              variant="pill"
              className="!px-5 !py-2.5 !text-[10px]"
            />
          </div>
        </div>

        <div className="border-t border-[#D2D6CB]/50 mt-6 pt-5">
          <span className="label-caps !text-[#8B9485]">
            © 2026 Ritta &amp; Asociados · Todos los derechos reservados
          </span>
        </div>
      </div>
    </footer>
  );
}
