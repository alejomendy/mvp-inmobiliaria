"use client";

import { useEffect, useRef } from "react";

const FALLBACK_LAT  = -33.63532400212576;
const FALLBACK_LNG  = -64.02385563579561;
const FALLBACK_ZOOM = 17;

export interface MapaUbicacionProps {
  lat?: number;
  lng?: number;
  zoom?: number;
  direccion?: string;
  localidad?: string;
}

const POPUP_STYLES = `
  .leaflet-container { background: #e8e4dc !important; }
  .leaflet-tile { border-right: 1px solid transparent !important; border-bottom: 1px solid transparent !important; }
  .leaflet-tile-container { will-change: transform; }
  .rya-popup .leaflet-popup-content-wrapper {
    background: #FFFFFF;
    border: 1px solid rgba(201,169,110,0.5);
    border-radius: 14px;
    box-shadow: 0 8px 32px rgba(201,169,110,0.15), 0 2px 8px rgba(0,0,0,0.08);
    padding: 0;
  }
  .rya-popup .leaflet-popup-content { margin: 0; padding: 14px 18px; }
  .rya-popup .leaflet-popup-tip-container { display: none; }
`;

const PIN_SVG = [
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 74" width="56" height="74">',
  '<defs>',
  '<radialGradient id="pinGrad" cx="50%" cy="35%" r="60%">',
  '<stop offset="0%" stop-color="#D4B483"/><stop offset="100%" stop-color="#C9A96E"/>',
  '</radialGradient>',
  '<filter id="pinShadow" x="-40%" y="-20%" width="180%" height="180%">',
  '<feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#A8834A" flood-opacity="0.4"/>',
  '</filter>',
  '<filter id="glowRing" x="-60%" y="-60%" width="220%" height="220%">',
  '<feGaussianBlur stdDeviation="3" result="blur"/>',
  '<feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>',
  '</filter></defs>',
  '<circle cx="28" cy="24" r="22" fill="rgba(201,169,110,0.15)" filter="url(#glowRing)"/>',
  '<circle cx="28" cy="24" r="16" fill="rgba(201,169,110,0.2)"/>',
  '<path d="M28 2C16.954 2 8 10.954 8 22c0 16 20 48 20 48S48 38 48 22C48 10.954 39.046 2 28 2z" fill="url(#pinGrad)" filter="url(#pinShadow)"/>',
  '<path d="M28 2C16.954 2 8 10.954 8 22c0 16 20 48 20 48S48 38 48 22C48 10.954 39.046 2 28 2z" fill="none" stroke="#A8834A" stroke-width="1.5" opacity="0.6"/>',
  '<circle cx="28" cy="22" r="11" fill="#FFFFFF"/>',
  '<circle cx="28" cy="22" r="4.5" fill="#C9A96E"/>',
  '</svg>',
].join("");

function escHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
  );
}

export default function MapaUbicacion({
  lat,
  lng,
  zoom,
  direccion = "Alfonsina Storni 105",
  localidad = "Adelia María, Córdoba (5843)",
}: MapaUbicacionProps) {
  const containerRef      = useRef<HTMLDivElement>(null);
  const mapRef            = useRef<any>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const iniciandoRef      = useRef(false);

  const mapLat  = Number.isFinite(lat)  ? (lat  as number) : FALLBACK_LAT;
  const mapLng  = Number.isFinite(lng)  ? (lng  as number) : FALLBACK_LNG;
  const mapZoom = Number.isFinite(zoom) ? (zoom as number) : FALLBACK_ZOOM;
  const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapLat},${mapLng}`;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    if (!document.getElementById("rya-popup-styles")) {
      const styleEl = document.createElement("style");
      styleEl.id = "rya-popup-styles";
      styleEl.textContent = POPUP_STYLES;
      document.head.appendChild(styleEl);
    }

    if (!document.querySelector('link[href*="leaflet"]')) {
      const linkEl = document.createElement("link");
      linkEl.rel  = "stylesheet";
      linkEl.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(linkEl);
    }

    const iniciarMapa = () => {
      if (mapRef.current || iniciandoRef.current) return;
      const el = containerRef.current;
      if (!el || el.clientWidth === 0 || el.clientHeight === 0) return;
      iniciandoRef.current = true;

      import("leaflet")
        .then((L) => {
          if (!containerRef.current || mapRef.current) return;

          const leafletMap = L.map(containerRef.current, {
            center: [mapLat, mapLng],
            zoom: mapZoom,
            zoomControl: false,
            scrollWheelZoom: false,
            dragging: false,
            doubleClickZoom: false,
            attributionControl: false,
          });

          mapRef.current = leafletMap;

          L.tileLayer(
            "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
            { maxZoom: 19, subdomains: "abcd" }
          ).addTo(leafletMap);

          const customIcon = L.divIcon({
            html: PIN_SVG,
            className: "",
            iconSize: [56, 74],
            iconAnchor: [28, 74],
            popupAnchor: [0, -80],
          });

          requestAnimationFrame(() => leafletMap.invalidateSize());

          const marker = L.marker([mapLat, mapLng], { icon: customIcon }).addTo(leafletMap);

          const popup =
            '<div style="font-family:sans-serif;line-height:1.6;color:#3A3833;min-width:190px;">' +
            '<span style="font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#C9A96E;font-weight:700;display:block;margin-bottom:6px;">Ritta &amp; Asociados</span>' +
            '<span style="font-size:13px;font-weight:600;color:#1C1814;display:block;margin-bottom:2px;">' + escHtml(direccion) + '</span>' +
            '<span style="font-size:12px;color:#8B9485;">' + escHtml(localidad) + '</span>' +
            '</div>';

          marker.bindPopup(popup, {
            offset: [0, -6],
            closeButton: false,
            className: "rya-popup",
            maxWidth: 260,
          }).openPopup();
        })
        .catch(() => {
          iniciandoRef.current = false;
          if (containerRef.current) {
            containerRef.current.innerHTML =
              '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#8B9485;font-size:13px;font-family:sans-serif;">Mapa no disponible</div>';
          }
        });
    };

    iniciarMapa();

    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      const ro = new ResizeObserver(() => {
        if (mapRef.current) {
          mapRef.current.invalidateSize();
        } else {
          iniciarMapa();
        }
      });
      ro.observe(containerRef.current);
      resizeObserverRef.current = ro;
    }

    const timers = [120, 350, 700, 1200].map((ms) => setTimeout(iniciarMapa, ms));

    return () => {
      timers.forEach(clearTimeout);
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }
      iniciandoRef.current = false;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapLat, mapLng, mapZoom, direccion, localidad]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />
      <a
        href={gmapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-5 right-5 z-[1000] inline-flex items-center gap-2 bg-gold text-ink font-bold tracking-widest uppercase text-[10px] px-4 py-2.5 rounded-full shadow-lg hover:bg-gold-dark transition-colors"
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
