"use client";

import dynamic from "next/dynamic";

const MapaUbicacion = dynamic(() => import("./MapaUbicacion"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#1C1814] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#C9A96E]/30 border-t-[#C9A96E] animate-spin" />
        <span className="label-caps !text-[#C9A96E]/60">Cargando mapa</span>
      </div>
    </div>
  ),
});

export default function MapaWrapper() {
  return <MapaUbicacion />;
}
