"use client";

import { useEffect, useRef } from "react";

// Coordenadas exactas: Alfonsina Storni 105, Adelia María, Córdoba, Argentina
const LAT  = -33.63532400212576;
const LNG  = -64.02385563579561;
const ZOOM = 17;

const GMAPS_URL = `https://www.google.com/maps/search/?api=1&query=${LAT},${LNG}`;

// CSS del popup — se inyecta una sola vez en el documento
const POPUP_STYLES = `
  .rya-popup .leaflet-popup-content-wrapper {
    background: #1C1814;
    border: 1px solid rgba(201,169,110,0.35);
    border-radius: 14px;
    box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,169,110,0.1);
    padding: 0;
  }
  .rya-popup .leaflet-popup-content {
    margin: 0;
    padding: 14px 18px;
  }
  .rya-popup .leaflet-popup-tip-container {
    display: none;
  }
`;

export default function MapaUbicacion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef       = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Inyectar CSS del popup una sola vez
    if (!document.getElementById("rya-popup-styles")) {
      const style = document.createElement("style");
      style.id = "rya-popup-styles";
      style.textContent = POPUP_STYLES;
      document.head.appendChild(style);
    }

    // Leaflet CSS
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement("link");
      link.rel  = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

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

      // Tiles oscuros CartoDB Dark Matter — premium, combina con la paleta oscura de la marca
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
        subdomains: "abcd",
      }).addTo(map);

      // Pin SVG personalizado — carbón + anillo dorado + resplandor
      const iconSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 74" width="56" height="74">
          <defs>
            <radialGradient id="pinGrad" cx="50%" cy="35%" r="60%">
              <stop offset="0%" stop-color="#2E2822"/>
              <stop offset="100%" stop-color="#1C1814"/>
            </radialGradient>
            <filter id="pinShadow" x="-40%" y="-20%" width="180%" height="180%">
              <feDropShadow dx="0" dy="5" stdDeviation="6" flood-color="#C9A96E" flood-opacity="0.35"/>
            </filter>
            <filter id="glowRing" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="4" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          <!-- Anillo de pulso exterior -->
          <circle cx="28" cy="24" r="22" fill="rgba(201,169,110,0.08)" filter="url(#glowRing)"/>
          <circle cx="28" cy="24" r="16" fill="rgba(201,169,110,0.12)"/>

          <!-- Cuerpo del pin -->
          <path d="M28 2C16.954 2 8 10.954 8 22c0 16 20 48 20 48S48 38 48 22C48 10.954 39.046 2 28 2z"
            fill="url(#pinGrad)" filter="url(#pinShadow)"/>

          <!-- Borde dorado del pin -->
          <path d="M28 2C16.954 2 8 10.954 8 22c0 16 20 48 20 48S48 38 48 22C48 10.954 39.046 2 28 2z"
            fill="none" stroke="#C9A96E" stroke-width="1.5" opacity="0.7"/>

          <!-- Círculo dorado interior -->
          <circle cx="28" cy="22" r="11" fill="#C9A96E"/>

          <!-- Punto blanco central -->
          <circle cx="28" cy="22" r="4.5" fill="#FAFAF7"/>
        </svg>
      `;

      const customIcon = L.divIcon({
        html: iconSvg,
        className: "",
        iconSize: [56, 74],
        iconAnchor: [28, 74],
        popupAnchor: [0, -80],
      });

      const marker = L.marker([LAT, LNG], { icon: customIcon }).addTo(map);

      // Popup con identidad de marca
      const popupContent = `
        <div style="font-family:sans-serif;line-height:1.6;color:#D2D6CB;min-width:190px;">
          <span style="font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#C9A96E;font-weight:700;display:block;margin-bottom:6px;">
            Ritta &amp; Asociados
          </span>
          <span style="font-size:13px;font-weight:600;color:#FAFAF7;display:block;margin-bottom:2px;">
            Alfonsina Storni 105
          </span>
          <span style="font-size:12px;color:#8B9485;">
            Adelia María, Córdoba (5843)
          </span>
        </div>
      `;

      marker.bindPopup(popupContent, {
        offset: [0, -6],
        closeButton: false,
        className: "rya-popup",
        maxWidth: 260,
      }).openPopup();
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Mapa Leaflet */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Botón "Cómo llegar" */}
      <a
        href={GMAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-5 right-5 z-[1000] inline-flex items-center gap-2 bg-[#C9A96E] text-[#1A1714] font-bold tracking-widest uppercase text-[10px] px-4 py-2.5 rounded-full shadow-lg hover:bg-[#A8834A] transition-colors"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
        Cómo llegar
      </a>
    </div>
  );
}
