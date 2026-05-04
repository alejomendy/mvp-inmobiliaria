"use client";

import { useState, useEffect, useRef } from "react";
import { Caracteristica, getCaracteristicas } from "@/lib/api";
import { X, Save, ArrowLeft, Loader2, Plus, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

interface PropertyFormProps {
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
  isSubmitting: boolean;
}

export default function PropertyForm({ initialData, onSubmit, isSubmitting }: PropertyFormProps) {
  const [allCharacteristics, setAllCharacteristics] = useState<Caracteristica[]>([]);
  const [formData, setFormData] = useState({
    titulo: initialData?.title || "",
    descripcion: initialData?.description || "",
    precio: initialData?.price || "",
    tipo_operacion: initialData?.type || "venta",
    tipo_propiedad:
      initialData?.category === "departamento" ? "depto" : initialData?.category || "casa",
    direccion: initialData?.location || "",
    ciudad: initialData?.city || initialData?.neighborhood || "",
    metros_cuadrados: initialData?.area || "",
    habitaciones: initialData?.bedrooms || "",
    banos: initialData?.bathrooms || "",
    estado: initialData?.estado || "disponible",
  });

  const [selectedChars, setSelectedChars] = useState<number[]>([]);
  const [images, setImages] = useState<string[]>(
    initialData?.images?.filter((img: string) => !img.includes("placehold")) || []
  );
  const [urlInput, setUrlInput] = useState("");
  const urlInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchChars() {
      const chars = await getCaracteristicas();
      setAllCharacteristics(chars);
      if (initialData?.features) {
        const ids = chars
          .filter((c) => initialData.features.includes(c.nombre))
          .map((c) => c.id);
        setSelectedChars(ids);
      }
    }
    fetchChars();
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCharToggle = (id: number) => {
    setSelectedChars((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const addImageUrl = () => {
    const url = urlInput.trim();
    if (!url) return;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      alert("Por favor ingresá una URL válida (debe comenzar con http:// o https://)");
      return;
    }
    if (images.includes(url)) {
      alert("Esta imagen ya fue agregada.");
      return;
    }
    setImages((prev) => [...prev, url]);
    setUrlInput("");
    urlInputRef.current?.focus();
  };

  const handleUrlKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addImageUrl();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      precio: Number(formData.precio),
      metros_cuadrados: Number(formData.metros_cuadrados) || null,
      habitaciones: Number(formData.habitaciones) || null,
      banos: Number(formData.banos) || null,
      caracteristicas: selectedChars,
      imagenes: images,
    });
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-[#D2D6CB] focus:ring-1 focus:ring-[#3A3833] outline-none text-sm transition-all";
  const selectClass =
    "w-full px-4 py-3 rounded-xl border border-[#D2D6CB] bg-white outline-none text-sm focus:ring-1 focus:ring-[#3A3833]";

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto pb-12">
      {/* Sticky Action Bar */}
      <div className="flex justify-between items-center mb-8 sticky top-0 bg-[#F5F4F0] py-4 z-10 -mx-8 px-8 border-b border-[#D2D6CB]/30">
        <Link
          href="/admin"
          className="text-[#8B9485] hover:text-[#3A3833] transition-colors flex items-center gap-2 text-sm"
        >
          <ArrowLeft size={18} />
          Volver al panel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#3A3833] text-white px-8 py-3 rounded-full label-caps text-sm hover:bg-[#727A6C] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md"
        >
          {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
          {initialData ? "Guardar Cambios" : "Publicar Propiedad"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Info — 2/3 */}
        <div className="md:col-span-2 space-y-6">
          {/* Información Principal */}
          <section className="bg-white p-8 rounded-2xl border border-[#D2D6CB] shadow-sm space-y-5">
            <h3 className="title-serif text-2xl border-b border-[#D2D6CB]/30 pb-4">
              Información Principal
            </h3>

            <div>
              <label className="block label-caps text-[#8B9485] mb-1.5">Título de la propiedad *</label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="Ej: Casa en esquina con jardín y pileta"
              />
            </div>

            <div>
              <label className="block label-caps text-[#8B9485] mb-1.5">Descripción *</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
                rows={5}
                className={`${inputClass} resize-none`}
                placeholder="Describe los detalles y características de la propiedad..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block label-caps text-[#8B9485] mb-1.5">Tipo de operación *</label>
                <select
                  name="tipo_operacion"
                  value={formData.tipo_operacion}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="venta">Venta</option>
                  <option value="alquiler">Alquiler</option>
                  <option value="alquiler_temporal">Alquiler Temporal</option>
                </select>
              </div>
              <div>
                <label className="block label-caps text-[#8B9485] mb-1.5">Tipo de propiedad *</label>
                <select
                  name="tipo_propiedad"
                  value={formData.tipo_propiedad}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="casa">Casa</option>
                  <option value="depto">Departamento</option>
                  <option value="terreno">Terreno</option>
                  <option value="local">Local Comercial</option>
                  <option value="oficina">Oficina</option>
                </select>
              </div>
            </div>
          </section>

          {/* Ubicación y Precio */}
          <section className="bg-white p-8 rounded-2xl border border-[#D2D6CB] shadow-sm space-y-5">
            <h3 className="title-serif text-2xl border-b border-[#D2D6CB]/30 pb-4">
              Ubicación y Precio
            </h3>
            <div>
              <label className="block label-caps text-[#8B9485] mb-1.5">Dirección *</label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                required
                className={inputClass}
                placeholder="Ej: Av. San Martín 1234"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block label-caps text-[#8B9485] mb-1.5">Ciudad *</label>
                <input
                  type="text"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder="Ej: Río Cuarto"
                />
              </div>
              <div>
                <label className="block label-caps text-[#8B9485] mb-1.5">Precio (USD) *</label>
                <input
                  type="number"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  required
                  min={0}
                  className={`${inputClass} font-medium`}
                  placeholder="0"
                />
              </div>
            </div>
          </section>

          {/* Imágenes */}
          <section className="bg-white p-8 rounded-2xl border border-[#D2D6CB] shadow-sm space-y-5">
            <h3 className="title-serif text-2xl border-b border-[#D2D6CB]/30 pb-4">Imágenes</h3>

            <div>
              <label className="block label-caps text-[#8B9485] mb-1.5">
                Agregar imagen por URL
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <LinkIcon
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B9485]"
                    size={16}
                  />
                  <input
                    ref={urlInputRef}
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyDown={handleUrlKeyDown}
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-[#D2D6CB] outline-none text-sm focus:ring-1 focus:ring-[#3A3833] transition-all"
                    placeholder="https://..."
                  />
                </div>
                <button
                  type="button"
                  onClick={addImageUrl}
                  disabled={!urlInput.trim()}
                  className="bg-[#3A3833] text-white px-4 py-3 rounded-xl hover:bg-[#727A6C] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 shrink-0"
                >
                  <Plus size={18} />
                </button>
              </div>
              <p className="text-[10px] text-[#8B9485] mt-1.5">
                Pegá la URL de la imagen y presioná Enter o el botón +
              </p>
            </div>

            {images.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative group aspect-video rounded-xl overflow-hidden bg-[#F5F4F0] border border-[#D2D6CB]/50"
                  >
                    <img src={img} className="w-full h-full object-cover" alt={`Imagen ${idx + 1}`} />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                    <button
                      type="button"
                      onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
                      className="absolute top-2 right-2 p-1.5 bg-white text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-50"
                    >
                      <X size={14} />
                    </button>
                    {idx === 0 && (
                      <span className="absolute bottom-2 left-2 label-caps text-[9px] bg-black/50 text-white px-2 py-1 rounded-full">
                        Principal
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-2 border-dashed border-[#D2D6CB] rounded-xl py-10 text-center text-[#8B9485]">
                <LinkIcon className="mx-auto mb-2 opacity-40" size={24} />
                <p className="text-sm">Agregá imágenes usando URLs</p>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar — 1/3 */}
        <div className="space-y-6">
          {/* Dimensiones */}
          <section className="bg-white p-6 rounded-2xl border border-[#D2D6CB] shadow-sm space-y-4">
            <h3 className="title-serif text-xl border-b border-[#D2D6CB]/30 pb-3">Dimensiones</h3>
            <div>
              <label className="block label-caps text-[#8B9485] mb-1.5">Metros Cuadrados</label>
              <input
                type="number"
                name="metros_cuadrados"
                value={formData.metros_cuadrados}
                onChange={handleChange}
                min={0}
                className={inputClass}
                placeholder="0"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block label-caps text-[#8B9485] mb-1.5">Habitaciones</label>
                <input
                  type="number"
                  name="habitaciones"
                  value={formData.habitaciones}
                  onChange={handleChange}
                  min={0}
                  className={inputClass}
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block label-caps text-[#8B9485] mb-1.5">Baños</label>
                <input
                  type="number"
                  name="banos"
                  value={formData.banos}
                  onChange={handleChange}
                  min={0}
                  className={inputClass}
                  placeholder="0"
                />
              </div>
            </div>
          </section>

          {/* Características */}
          <section className="bg-white p-6 rounded-2xl border border-[#D2D6CB] shadow-sm">
            <h3 className="title-serif text-xl border-b border-[#D2D6CB]/30 pb-3 mb-4">
              Características
            </h3>
            <div className="flex flex-wrap gap-2">
              {allCharacteristics.map((char) => (
                <button
                  key={char.id}
                  type="button"
                  onClick={() => handleCharToggle(char.id)}
                  className={`px-3 py-1.5 rounded-full border transition-all label-caps text-[9px] ${
                    selectedChars.includes(char.id)
                      ? "bg-[#3A3833] text-white border-[#3A3833]"
                      : "border-[#D2D6CB] text-[#8B9485] hover:border-[#3A3833] hover:text-[#3A3833]"
                  }`}
                >
                  {char.nombre}
                </button>
              ))}
              {allCharacteristics.length === 0 && (
                <p className="text-sm text-[#8B9485]">Cargando...</p>
              )}
            </div>
          </section>

          {/* Estado */}
          <section className="bg-white p-6 rounded-2xl border border-[#D2D6CB] shadow-sm space-y-3">
            <h3 className="title-serif text-xl border-b border-[#D2D6CB]/30 pb-3">
              Estado
            </h3>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className={selectClass}
            >
              <option value="disponible">Disponible</option>
              <option value="reservado">Reservado</option>
              <option value="vendido">Vendido</option>
              <option value="alquilado">Alquilado</option>
            </select>
            <p className="text-[10px] text-[#8B9485]">
              Las propiedades no disponibles muestran un badge visual en el catálogo.
            </p>
          </section>
        </div>
      </div>
    </form>
  );
}
