"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPropiedad } from "@/lib/api";
import PropertyForm from "@/app/components/admin/PropertyForm";

export default function NuevaPropiedadPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    const result = await createPropiedad(data);
    setIsSubmitting(false);
    
    if (result) {
      router.push("/admin");
    } else {
      alert("Hubo un error al crear la propiedad. Por favor, revisa que todos los campos sean correctos.");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="title-serif text-4xl mb-2">Nueva Propiedad</h2>
        <p className="text-[#66615C]">Completa los detalles para publicar una nueva propiedad en el catálogo.</p>
      </div>

      <PropertyForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
