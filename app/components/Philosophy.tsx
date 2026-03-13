import Image from "next/image";
import Link from "next/link";

export default function Philosophy() {
  return (
    <section className="luxury-section -mt-8">
      <div className="section-container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Left: Image */}
          <div className="relative w-full aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden bg-[#F0EBE1]">
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
            <span className="label-caps mb-6">
              Sobre Nosotros
            </span>
            <h2 className="title-serif text-5xl md:text-6xl mb-6">
              Hogares que respiran contigo.
            </h2>
            <p className="text-sans-sm mb-10">
              En Rita & Asociados seleccionamos propiedades con alma, priorizando la luz natural, la calidad constructiva y la armonía con el entorno. Somos una firma dedicada a quienes entienden que el lujo reside en la simplicidad y en el confort de un hogar bien elegido.
            </p>
            <Link
              href="/sobre-nosotros"
              className="link-underline self-start"
            >
              Conoce mas de nosotros
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
