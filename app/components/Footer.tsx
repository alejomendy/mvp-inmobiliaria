import Link from "next/link";
import WhatsAppButton from "./WhatsAppButton";

export default function Footer() {
  return (
    <footer className="bg-[#F0EBE1] rounded-t-[3rem] relative z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.02)] -mt-12">
      <div className="section-container pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-12 mb-24">
          <div className="max-w-md">
            <span className="label-caps block mb-4">Contacto</span>
            <h2 className="title-serif text-5xl md:text-6xl mb-6">Hablemos.</h2>
            <p className="text-sans-sm mb-8">
              Escribinos y agendá una consulta para que podamos asesorarte de manera personalizada.
            </p>

            <div className="space-y-2 mb-10">
              <p className="font-sans text-sm text-[#3A3833]">
                <span className="font-bold">Dirección:</span> Alfonsina Storni 105
              </p>
              <p className="font-sans text-sm text-[#3A3833]">
                <span className="font-bold">WhatsApp:</span> 3584 153649
              </p>
              <p className="font-sans text-sm text-[#3A3833]">
                <span className="font-bold">Email:</span> estudiorittayasociados@gmail.com
              </p>
            </div>

            <WhatsAppButton
              message="Quiero agendar una consulta por una propiedad."
              label="Escribinos por WhatsApp"
              variant="pill"
              className="!px-8 !py-4 shadow-md"
            />
          </div>

          <div className="grid grid-cols-3 gap-8 md:gap-12 lg:pl-12">
            <div className="flex flex-col space-y-5">
              <span className="label-caps mb-2">Propiedades</span>
              <Link href="/propiedades?tipo=alquiler" className="font-sans text-sm md:text-base text-[#66615C] hover:text-[#3A3833] transition-colors">En Alquiler</Link>
              <Link href="/propiedades?tipo=venta" className="font-sans text-sm md:text-base text-[#66615C] hover:text-[#3A3833] transition-colors">En Venta</Link>
              <Link href="/propiedades" className="font-sans text-sm md:text-base text-[#66615C] hover:text-[#3A3833] transition-colors">Ver Todas</Link>
            </div>
            <div className="flex flex-col space-y-5">
              <span className="label-caps mb-2">Legal</span>
              <a href="#" className="font-sans text-sm md:text-base text-[#66615C] hover:text-[#3A3833] transition-colors">Privacidad</a>
              <a href="#" className="font-sans text-sm md:text-base text-[#66615C] hover:text-[#3A3833] transition-colors">Términos</a>
            </div>
            <div className="flex flex-col space-y-5">
              <span className="label-caps mb-2">Redes</span>
              <a href="https://www.instagram.com/rittayasociados" target="_blank" rel="noopener noreferrer" className="font-sans text-sm md:text-base text-[#66615C] hover:text-[#3A3833] transition-colors">Instagram</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#D2D6CB]/50 gap-6 text-center md:text-left">
          <span className="label-caps">
            © 2026 Ritta &amp; Asociados · Estudio Jurídico Integral. TODOS LOS DERECHOS RESERVADOS.
          </span>
          <span className="label-caps">ALQUILER · VENTA · ASESORAMIENTO</span>
        </div>
      </div>
    </footer>
  );
}
