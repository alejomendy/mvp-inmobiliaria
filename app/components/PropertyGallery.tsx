"use client";

import { useState } from "react";
import PropertyImageFill from "./PropertyImageFill";

interface Props {
  images: string[];
  title: string;
}

export default function PropertyGallery({ images, title }: Props) {
  const [selected, setSelected] = useState(0);
  const list = images.length > 0 ? images : [""];

  return (
    <div className="flex flex-col gap-4">
      {/* Imagen principal — tamaño fijo, imagen se adapta al contenedor */}
      <div className="relative w-full rounded-[2.5rem] overflow-hidden bg-[#F0EBE1] aspect-[4/3]">
        {/* key={selected} fuerza remount al cambiar imagen */}
        <PropertyImageFill
          key={selected}
          src={list[selected]}
          alt={`${title} - Vista ${selected + 1}`}
          className="object-cover object-center"
          priority
        />

        {list.length > 1 && (
          <>
            <button
              onClick={() => setSelected((s) => (s - 1 + list.length) % list.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
              aria-label="Anterior"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setSelected((s) => (s + 1) % list.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
              aria-label="Siguiente"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <span className="absolute bottom-4 right-4 label-caps !text-[9px] bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-white">
              {selected + 1} / {list.length}
            </span>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {list.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {list.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`relative shrink-0 w-20 h-14 rounded-xl overflow-hidden bg-[#F0EBE1] transition-all ${
                selected === i
                  ? "ring-2 ring-[#C9A96E] opacity-100"
                  : "opacity-50 hover:opacity-80"
              }`}
              aria-label={`Ver imagen ${i + 1}`}
            >
              <PropertyImageFill
                src={img}
                alt={`${title} miniatura ${i + 1}`}
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
