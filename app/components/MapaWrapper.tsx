"use client";

import dynamic from "next/dynamic";

const MapaUbicacion = dynamic(() => import("./MapaUbicacion"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[#F0EBE1] animate-pulse flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#C9A96E]/40 border-t-[#C9A96E] animate-spin" />
    </div>
  ),
});

export default function MapaWrapper() {
  return <MapaUbicacion />;
}
