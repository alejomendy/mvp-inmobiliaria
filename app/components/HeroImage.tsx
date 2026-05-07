"use client";

import { useState } from "react";
import Image from "next/image";

const FALLBACK = "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=2000&q=90";

export default function HeroImage({ src }: { src: string }) {
  const [imgSrc, setImgSrc] = useState(src || FALLBACK);

  return (
    <Image
      src={imgSrc}
      fill
      alt=""
      className="hero-image"
      priority
      unoptimized
      onError={() => setImgSrc(FALLBACK)}
    />
  );
}
