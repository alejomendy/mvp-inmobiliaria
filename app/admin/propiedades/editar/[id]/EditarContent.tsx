"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPropiedadById, updatePropiedad } from "@/lib/api";
import PropertyForm from "@/app/components/admin/PropertyForm";
import { Loader2 } from "lucide-react";

export default function EditarContent({ id }: { id: string }) {
  const router = useRouter();
  const [property, setProperty] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadProperty() {
      const data = await getPropiedadById(id);
      if (data) setProperty(data);
      setIsLoading(false);
    }
    loadProperty();
  }, [id]);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    const result = await updatePropiedad(id, data);
    setIsSubmitting(false);
    if (result) {
      router.push("/admin");
    } else {
      alert("Hubo un error al actualizar la propiedad. Revisá los datos e intentá de nuevo.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="animate-spin text-[#3A3833] mb-4" size={48} strokeWidth={1.5} />
        <p className="text-[#8B9485] label-caps">Cargando propiedad...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="text-center py-20">
        <p className="title-serif text-2xl text-[#3A3833] mb-3">Propiedad no encontrada</p>
        <p className="text-[#66615C] text-sm">No se encontró la propiedad especificada.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="title-serif text-4xl mb-2">Editar Propiedad</h2>
        <p className="text-[#66615C] text-sm">
          Modificando: <strong>{property.title}</strong>
        </p>
      </div>
      <PropertyForm initialData={property} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
