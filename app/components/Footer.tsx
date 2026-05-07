"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram, MapPin, Phone } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { waLink } from "./WhatsAppButton";

const WHATSAPP = "543584153649";

export default function Footer() {
  const pathname = usePathname();
  if (pathname && pathname.startsWith("/admin")) return null;
  return (
    <footer className="bg-charcoal text-line relative z-20">

      {/* Main content */}
      <div className="section-container pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* Col 1 — Brand */}
          <div className="md:col-span-1">
            <span className="font-serif text-2xl text-surface tracking-wide">
              Ritta &amp; Asociados
            </span>
            <p className="text-sm text-muted mt-3 leading-relaxed max-w-xs">
              Estudio jurídico integral especializado en derecho civil e inmobiliario. Adelia María, Córdoba.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://www.instagram.com/rittayasociados"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-gold flex items-center justify-center transition-colors group"
              >
                <Instagram className="w-4 h-4 text-muted group-hover:text-white transition-colors" />
              </a>
              <a
                href={waLink("Hola! Quiero consultar sobre una propiedad.", WHATSAPP)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-wa flex items-center justify-center transition-colors group"
              >
                <WhatsAppIcon className="w-4 h-4 text-muted group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Col 2 — Links */}
          <div>
            <span className="label-caps !text-gold block mb-5">
              Propiedades
            </span>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/propiedades?tipo=venta"
                  className="text-sm text-muted hover:text-surface transition-colors"
                >
                  En Venta
                </Link>
              </li>
              <li>
                <Link
                  href="/propiedades?tipo=alquiler"
                  className="text-sm text-muted hover:text-surface transition-colors"
                >
                  En Alquiler
                </Link>
              </li>
              <li>
                <Link
                  href="/propiedades?tipo=alquiler_temporal"
                  className="text-sm text-muted hover:text-surface transition-colors"
                >
                  Alquiler Temporal
                </Link>
              </li>
              <li>
                <Link
                  href="/propiedades"
                  className="text-sm text-muted hover:text-surface transition-colors"
                >
                  Todas las Propiedades
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <span className="label-caps !text-gold block mb-5">
              Contacto
            </span>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span className="text-sm text-muted leading-snug">
                  Alfonsina Storni 105<br />Adelia María, Córdoba (5843)
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a
                  href="tel:+543584153649"
                  className="text-sm text-muted hover:text-surface transition-colors"
                >
                  +54 358 415 3649
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="section-container py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="label-caps !text-warm">
            © 2026 Ritta &amp; Asociados · Todos los derechos reservados
          </span>
          <span className="label-caps !text-warm">
            Adelia María · Córdoba · Argentina (5843)
          </span>
        </div>
      </div>

    </footer>
  );
}
