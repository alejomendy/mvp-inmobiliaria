import Image from "next/image";
import logoHero from "@/lib/assets/logo-Rita_Asociados.png";

export default function Hero() {
  return (
    <section className="px-4 md:px-12 pb-16 pt-8 bg-[#FAFAF7]">
      <div className="hero-container group">
        <Image
          src="https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=2000&q=90"
          fill
          alt="Hero Background - Luminous Interior"
          className="hero-image"
          priority
          unoptimized
        />
        <div className="hero-overlay" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <Image
            src={logoHero}
            alt="Logo Ritta & Asociados"
            className="w-auto h-24 md:h-32 object-contain mb-6 drop-shadow-md"
            priority
          />
          <h1 className="title-serif text-white text-5xl md:text-8xl mb-10 hero-title-fadeIn drop-shadow-sm">
            Ritta & Asociados
          </h1>

          <div className="search-pill mx-auto w-full max-w-[90%] md:max-w-none">
            <input
              type="text"
              placeholder="Ubicación, barrio..."
              className="flex-1 min-w-0 bg-transparent border-none outline-none text-[10px] md:text-sm px-3 md:px-6 text-[#3A3833] placeholder:text-[#8B9485] font-sans"
            />
            <button className="btn-primary py-2.5 px-4 md:py-3.5 md:px-8 text-[10px] md:text-xs">
              Buscar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
