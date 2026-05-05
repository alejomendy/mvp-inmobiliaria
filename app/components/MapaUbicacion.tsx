"use client";

import { useEffect, useRef } from "react";

// Coordenadas: Alfonsina Storni 105, Río Cuarto, Córdoba, Argentina
const LAT = -33.1255;
const LNG = -64.3508;
const ZOOM = 16;

export default function MapaUbicacion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Carga Leaflet y su CSS solo en el cliente
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    import("leaflet").then((L) => {
      if (!containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        center: [LAT, LNG],
        zoom: ZOOM,
        zoomControl: false,
        scrollWheelZoom: false,
        dragging: false,
        doubleClickZoom: false,
        attributionControl: false,
      });

      mapRef.current = map;

      // Tiles CartoDB Positron — limpios, mínimos, sin ruido visual
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
        subdomains: "abcd",
      }).addTo(map);

      // Marcador SVG personalizado — círculo dorado con pulso
      const iconSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 62" width="48" height="62">
          <defs>
            <filter id="shadow" x="-30%" y="-20%" width="160%" height="160%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#00000030"/>
            </filter>
          </defs>
          <!-- Pin body -->
          <path d="M24 2C14.059 2 6 10.059 6 20c0 13.5 18 38 18 38s18-24.5 18-38C42 10.059 33.941 2 24 2z"
            fill="#3A3833" filter="url(#shadow)"/>
          <!-- Inner circle gold -->
          <circle cx="24" cy="20" r="9" fill="#C9A96E"/>
          <!-- Center dot -->
          <circle cx="24" cy="20" r="4" fill="#FAFAF7"/>
        </svg>
      `;

      const customIcon = L.divIcon({
        html: iconSvg,
        className: "",
        iconSize: [48, 62],
        iconAnchor: [24, 62],
        popupAnchor: [0, -64],
      });

      const marker = L.marker([LAT, LNG], { icon: customIcon }).addTo(map);

      marker.bindPopup(
        `<div style="font-family:sans-serif;font-size:13px;line-height:1.5;color:#3A3833;padding:4px 2px">
          <strong style="font-size:14px">Ritta &amp; Asociados</strong><br/>
          Alfonsina Storni 105<br/>
          Río Cuarto, Córdoba
        </div>`,
        { offset: [0, -8], closeButton: false }
      );
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{
        // Filtro cálido para que encaje con la paleta beige/crema del sitio
        filter: "sepia(25%) saturate(0.75) brightness(1.06) contrast(0.95)",
      }}
    />
  );
}
