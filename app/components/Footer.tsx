export default function Footer() {
  return (
    <footer className="bg-[#F0EBE1] rounded-t-[3rem] relative z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.02)] -mt-12">
      <div className="section-container pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-12 mb-24">
          <div className="max-w-md">
            <h2 className="title-serif text-5xl md:text-6xl mb-6">
              Encontremos tu refugio.
            </h2>
            <p className="text-sans-sm mb-10">
              Regístrate para recibir novedades sobre propiedades excepcionales e historias sobre cómo vivir maravillosamente.
            </p>

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

          <div className="grid grid-cols-3 gap-8 md:gap-12 lg:pl-12">
            <FooterColumn title="Oficinas" links={["Buenos Aires", "Córdoba", "Mendoza"]} />
            <FooterColumn title="Legal" links={["Privacidad", "Términos", "Cookies"]} />
            <FooterColumn title="Redes" links={["Instagram", "Facebook", "Twitter"]} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#D2D6CB]/50 gap-6 text-center md:text-left">
          <span className="label-caps">
            © 2026 Estudio Juridico Rita & Asociados. TODOS LOS DERECHOS RESERVADOS.
          </span>
          <span className="label-caps">
            DISEÑADO PARA LA LUZ Y EL CONFORT
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="flex flex-col space-y-5">
      <span className="label-caps mb-2">{title}</span>
      {links.map((link) => (
        <a key={link} href="#" className="font-sans text-sm md:text-base text-[#66615C] hover:text-[#3A3833] capitalize transition-colors">
          {link}
        </a>
      ))}
    </div>
  );
}
