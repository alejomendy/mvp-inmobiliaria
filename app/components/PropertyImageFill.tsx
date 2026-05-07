"use client";

import { useState } from "react";
import Image from "next/image";

const PLACEHOLDER = "https://placehold.co/600x450/F0EBE1/3A3833?text=Sin+Imagen";

interface Props {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  style?: React.CSSProperties;
  sizes?: string;
}

export default function PropertyImageFill({ src, alt, className, priority, style, sizes }: Props) {
  const [imgSrc, setImgSrc] = useState(src || PLACEHOLDER);

  return (
    <Image
      src={imgSrc}
      fill
      alt={alt}
      className={className}
      priority={priority}
      unoptimized
      style={style}
      sizes={sizes}
      onError={() => setImgSrc(PLACEHOLDER)}
    />
  );
}
