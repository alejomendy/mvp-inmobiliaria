"use client";

import dynamic from "next/dynamic";

const MapaUbicacion = dynamic(() => import("./MapaUbicacion"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-ink flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-gold/30 border-t-gold animate-spin" />
        <span className="label-caps !text-gold/60">Cargando mapa</span>
      </div>
    </div>
  ),
});

export default function MapaWrapper() {
  return <MapaUbicacion />;
}
