"use client";

import { useState } from "react";
import Image from "next/image";

const PLACEHOLDER = "https://placehold.co/800x600/F0EBE1/3A3833?text=Sin+Imagen";

interface Props {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export default function PropertyImageNatural({ src, alt, className, priority }: Props) {
  const [imgSrc, setImgSrc] = useState(src || PLACEHOLDER);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={0}
      height={0}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={`w-full h-auto block${className ? ` ${className}` : ""}`}
      priority={priority}
      unoptimized
      onError={() => setImgSrc(PLACEHOLDER)}
    />
  );
}
