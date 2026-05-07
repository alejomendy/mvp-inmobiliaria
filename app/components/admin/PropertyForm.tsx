"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Caracteristica, getCaracteristicas, getCountDestacadas } from "@/lib/api";
import {
  X, Save, ArrowLeft, Loader2, Plus, Link as LinkIcon,
  Upload, Star, GripVertical, ArrowUp,
} from "lucide-react";
import Link from "next/link";

interface PropertyFormProps {
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
  isSubmitting: boolean;
}

const IMGBB_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

async function uploadToImgBB(file: File): Promise<string> {
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const form = new FormData();
  form.append("key", IMGBB_KEY!);
  form.append("image", base64);
  form.append("name", file.name.replace(/\.[^.]+$/, ""));

  const res = await fetch("https://api.imgbb.com/1/upload", { method: "POST", body: form });
  const json = await res.json();
  if (!json.success) throw new Error(json.error?.message || "Error al subir imagen");
  return json.data.url as string;
}

export default function PropertyForm({ initialData, onSubmit, isSubmitting }: PropertyFormProps) {
  const [allCharacteristics, setAllCharacteristics] = useState<Caracteristica[]>([]);
  const [formData, setFormData] = useState({
    titulo: initialData?.title || "",
    descripcion: initialData?.description || "",
    precio: initialData?.price || "",
    tipo_operacion: initialData?.type || "venta",
    tipo_propiedad: initialData?.category || "casa",
    direccion: initialData?.location || "",
    ciudad: initialData?.city || initialData?.neighborhood || "",
    metros_cuadrados: initialData?.area || "",
    habitaciones: initialData?.bedrooms || "",
    banos: initialData?.bathrooms || "",
    estado: initialData?.estado || "disponible",
    destacada: initialData?.featured ?? false,
  });

  const [selectedChars, setSelectedChars] = useState<number[]>([]);
  const [images, setImages] = useState<string[]>(
    initialData?.images?.filter((img: string) => !img.includes("placehold")) || []
  );
  const [urlInput, setUrlInput] = useState("");
  const [uploading, setUploading] = useState<string[]>([]); // filenames uploading
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [countDestacadas, setCountDestacadas] = useState(0);

  const urlInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function load() {
      const [chars, count] = await Promise.all([
        getCaracteristicas(),
        getCountDestacadas(),
      ]);
      setAllCharacteristics(chars);
      setCountDestacadas(count);
      if (initialData?.features) {
        const ids = chars
          .filter((c) => initialData.features.includes(c.nombre))
          .map((c) => c.id);
        setSelectedChars(ids);
      }
    }
    load();
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
      alert("La URL debe comenzar con http:// o https://");
      return;
    }
    if (images.includes(url)) return;
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

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    if (!IMGBB_KEY) return;
    setUploadError(null);
    const arr = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!arr.length) return;

    setUploading((prev) => [...prev, ...arr.map((f) => f.name)]);
    const results: string[] = [];

    for (const file of arr) {
      try {
        const url = await uploadToImgBB(file);
        results.push(url);
      } catch (err: any) {
        setUploadError(`Error subiendo "${file.name}": ${err.message}`);
      }
      setUploading((prev) => prev.filter((n) => n !== file.name));
    }

    if (results.length) {
      setImages((prev) => [...prev, ...results]);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDraggingFile(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const moveToFirst = (idx: number) => {
    setImages((prev) => {
      const next = [...prev];
      const [item] = next.splice(idx, 1);
      next.unshift(item);
      return next;
    });
  };

  const removeImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  // Determinar si el toggle de destacada está disponible
  const isAlreadyDestacada = initialData?.featured ?? false;
  const slotsLibres = 7 - countDestacadas;
  const puedeDestacar = isAlreadyDestacada || slotsLibres > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      precio: Number(formData.precio),
      metros_cuadrados: formData.metros_cuadrados !== "" ? Number(formData.metros_cuadrados) : null,
      habitaciones: formData.habitaciones !== "" ? Number(formData.habitaciones) : null,
      banos: formData.banos !== "" ? Number(formData.banos) : null,
      destacada: formData.destacada,
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
                <select name="tipo_operacion" value={formData.tipo_operacion} onChange={handleChange} className={selectClass}>
                  <option value="venta">Venta</option>
                  <option value="alquiler">Alquiler</option>
                  <option value="alquiler_temporal">Alquiler Temporal</option>
                </select>
              </div>
              <div>
                <label className="block label-caps text-[#8B9485] mb-1.5">Tipo de propiedad *</label>
                <select name="tipo_propiedad" value={formData.tipo_propiedad} onChange={handleChange} className={selectClass}>
                  <option value="casa">Casa</option>
                  <option value="departamento">Departamento</option>
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
            <div className="flex items-center justify-between border-b border-[#D2D6CB]/30 pb-4">
              <h3 className="title-serif text-2xl">Imágenes</h3>
              <span className="label-caps text-[#8B9485] text-[10px]">
                {images.length} {images.length === 1 ? "imagen" : "imágenes"}
              </span>
            </div>

            {/* Upload zone */}
            {IMGBB_KEY ? (
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDraggingFile(true); }}
                onDragLeave={() => setIsDraggingFile(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-xl py-8 text-center cursor-pointer transition-all ${
                  isDraggingFile
                    ? "border-[#C9A96E] bg-[#FDF8F0]"
                    : "border-[#D2D6CB] hover:border-[#C9A96E]/50 hover:bg-[#FAFAF7]"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => e.target.files && handleFiles(e.target.files)}
                />
                <Upload className="mx-auto mb-2 text-[#C9A96E]" size={28} />
                <p className="text-sm text-[#3A3833] font-medium">
                  {isDraggingFile ? "Soltá para subir" : "Arrastrá fotos aquí o hacé click para seleccionarlas"}
                </p>
                <p className="text-[10px] text-[#8B9485] mt-1">
                  JPG, PNG, WEBP — se suben automáticamente
                </p>
                {uploading.length > 0 && (
                  <div className="mt-3 flex flex-wrap justify-center gap-2">
                    {uploading.map((name) => (
                      <span key={name} className="flex items-center gap-1.5 bg-[#F0EBE1] px-3 py-1 rounded-full text-[10px] text-[#66615C]">
                        <Loader2 size={10} className="animate-spin" />
                        {name.length > 20 ? name.slice(0, 20) + "…" : name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-sm text-amber-800">
                <p className="font-medium mb-1">Carga directa de archivos no configurada</p>
                <p className="text-xs text-amber-700">
                  Configurá <code className="bg-amber-100 px-1 rounded">NEXT_PUBLIC_IMGBB_API_KEY</code> en tus variables de entorno para habilitar la subida de fotos. Mientras tanto, usá URLs externas.
                </p>
              </div>
            )}

            {uploadError && (
              <p className="text-xs text-red-500 flex items-center gap-1.5">
                <X size={12} /> {uploadError}
              </p>
            )}

            {/* URL manual */}
            <div>
              <label className="block label-caps text-[#8B9485] mb-1.5">
                O agregá imagen por URL
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B9485]" size={16} />
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
            </div>

            {/* Image grid */}
            {images.length > 0 ? (
              <>
                <p className="text-[10px] text-[#8B9485]">
                  La primera imagen es la portada. Hacé click en <ArrowUp size={10} className="inline" /> para moverla al inicio.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative group aspect-[4/3] rounded-xl overflow-hidden bg-[#F5F4F0] border border-[#D2D6CB]/50"
                    >
                      <img
                        src={img}
                        className="w-full h-full object-cover object-center"
                        alt={`Imagen ${idx + 1}`}
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://placehold.co/400x300/F0EBE1/3A3833?text=Error";
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />

                      {/* Controls */}
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {idx !== 0 && (
                          <button
                            type="button"
                            onClick={() => moveToFirst(idx)}
                            title="Hacer portada"
                            className="p-1.5 bg-white text-[#C9A96E] rounded-full shadow-md hover:bg-[#FDF8F0]"
                          >
                            <ArrowUp size={13} />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="p-1.5 bg-white text-red-500 rounded-full shadow-md hover:bg-red-50"
                        >
                          <X size={13} />
                        </button>
                      </div>

                      {/* Badges */}
                      {idx === 0 && (
                        <span className="absolute bottom-2 left-2 label-caps text-[9px] bg-[#C9A96E] text-white px-2 py-1 rounded-full">
                          Portada
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="border-2 border-dashed border-[#D2D6CB] rounded-xl py-8 text-center text-[#8B9485]">
                <LinkIcon className="mx-auto mb-2 opacity-40" size={24} />
                <p className="text-sm">Sin imágenes todavía</p>
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
            <h3 className="title-serif text-xl border-b border-[#D2D6CB]/30 pb-3">Estado</h3>
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

          {/* Destacar propiedad */}
          <section className="bg-white p-6 rounded-2xl border border-[#D2D6CB] shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-[#D2D6CB]/30 pb-3">
              <Star size={16} className="text-[#C9A96E]" />
              <h3 className="title-serif text-xl">Destacar</h3>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#3A3833] font-medium">Propiedad destacada</p>
                <p className="text-[10px] text-[#8B9485] mt-0.5">
                  Aparece en la portada del sitio
                </p>
              </div>
              <button
                type="button"
                disabled={!puedeDestacar && !formData.destacada}
                onClick={() => {
                  if (!puedeDestacar && !formData.destacada) return;
                  setFormData((prev) => ({ ...prev, destacada: !prev.destacada }));
                }}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  formData.destacada ? "bg-[#C9A96E]" : "bg-[#D2D6CB]"
                } ${!puedeDestacar && !formData.destacada ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    formData.destacada ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>

            {/* Slots counter */}
            <div className="bg-[#F5F4F0] rounded-xl px-4 py-3">
              <div className="flex justify-between items-center mb-2">
                <span className="label-caps text-[#8B9485] text-[9px]">Slots destacados</span>
                <span className="label-caps text-[9px] text-[#3A3833]">
                  {isAlreadyDestacada ? countDestacadas : Math.min(countDestacadas + (formData.destacada ? 1 : 0), 7)} / 7
                </span>
              </div>
              <div className="flex gap-1">
                {Array(7).fill(0).map((_, i) => {
                  const usados = isAlreadyDestacada
                    ? countDestacadas
                    : Math.min(countDestacadas + (formData.destacada ? 1 : 0), 7);
                  return (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full ${
                        i < usados ? "bg-[#C9A96E]" : "bg-[#D2D6CB]"
                      }`}
                    />
                  );
                })}
              </div>
              {!puedeDestacar && !formData.destacada && (
                <p className="text-[10px] text-amber-600 mt-2">
                  Límite alcanzado. Quitá el destacado de otra propiedad primero.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}
