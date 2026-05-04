"use client";

import Image from "next/image";
import { useState } from "react";
import WhatsAppButton from "../components/WhatsAppButton";
import { enviarContacto } from "@/lib/api";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const ASUNTOS = [
  "Consulta sobre propiedad en alquiler",
  "Consulta sobre propiedad en venta",
  "Quiero publicar mi propiedad",
  "Asesoramiento jurídico",
  "Otro",
];

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactoPage() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    asunto: ASUNTOS[0],
    mensaje: "",
  });
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!form.nombre.trim()) errors.nombre = "El nombre es requerido.";
    if (!form.email.trim()) errors.email = "El email es requerido.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Email inválido.";
    if (!form.mensaje.trim()) errors.mensaje = "El mensaje es requerido.";
    else if (form.mensaje.trim().length < 10) errors.mensaje = "El mensaje debe tener al menos 10 caracteres.";
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFormState("submitting");
    setErrorMsg("");

    const result = await enviarContacto(form);

    if (result.success) {
      setFormState("success");
      setForm({ nombre: "", email: "", asunto: ASUNTOS[0], mensaje: "" });
    } else {
      setFormState("error");
      if (result.errors) {
        const mapped: Record<string, string> = {};
        Object.entries(result.errors).forEach(([key, msgs]) => {
          mapped[key] = msgs[0];
        });
        setFieldErrors(mapped);
      }
      setErrorMsg(result.message || "Hubo un error. Por favor intentá de nuevo.");
    }
  };

  const resetForm = () => {
    setFormState("idle");
    setErrorMsg("");
    setFieldErrors({});
  };

  return (
    <main className="bg-[#FAFAF7] min-h-screen">

      <section className="section-container pt-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Content & Info */}
          <div className="lg:sticky lg:top-32">
            <span className="label-caps block mb-6">Contacto</span>
            <h1 className="title-serif text-5xl md:text-7xl mb-8 leading-tight">
              Escribinos,<br />
              <span className="italic">estamos para ayudarte.</span>
            </h1>
            <p className="text-sans-sm max-w-md leading-relaxed mb-4">
              Escribinos y agendá una consulta para que podamos asesorarte de manera personalizada.
            </p>
            <p className="text-sans-sm max-w-md leading-relaxed mb-12">
              Ya sea que busques tu próxima propiedad, quieras alquilar o vender, o necesités asesoramiento jurídico, nuestro equipo está disponible para vos.
            </p>

            <WhatsAppButton
              message="Quiero agendar una consulta por una propiedad."
              label="Escribinos por WhatsApp"
              variant="full"
              className="!w-auto max-w-sm mb-4"
            />
            <a
              href="mailto:estudiorittayasociados@gmail.com"
              className="flex items-center justify-center gap-2 btn-outline max-w-sm text-center"
            >
              Enviar Email
            </a>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
              <div>
                <span className="label-caps !text-[#3A3833] block mb-3">Oficina</span>
                <p className="text-sans-sm italic">
                  Alfonsina Storni 105
                </p>
              </div>
              <div>
                <span className="label-caps !text-[#3A3833] block mb-3">Datos de contacto</span>
                <p className="text-sans-sm">
                  WP: 3584 153649<br />
                  estudiorittayasociados@gmail.com
                </p>
                <a
                  href="https://www.instagram.com/rittayasociados"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sans-sm text-[#66615C] hover:text-[#3A3833] transition-colors mt-2 inline-block"
                >
                  @rittayasociados
                </a>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-[0_30px_80px_rgba(0,0,0,0.03)] border border-[#D2D6CB]/20">

            {formState === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-6">
                <CheckCircle className="text-[#8B9485]" size={56} strokeWidth={1.5} />
                <div>
                  <h3 className="title-serif text-3xl mb-3">¡Mensaje enviado!</h3>
                  <p className="text-sans-sm text-[#66615C] max-w-sm">
                    Recibimos tu consulta. Te responderemos dentro de las próximas 24 horas hábiles.
                  </p>
                </div>
                <button onClick={resetForm} className="btn-outline mt-2">
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <>
                <h3 className="title-serif text-2xl mb-8">Mandanos un mensaje</h3>

                {formState === "error" && errorMsg && (
                  <div className="flex items-start gap-3 mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl">
                    <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
                    <p className="text-sm text-red-700">{errorMsg}</p>
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                  <FormField
                    label="Nombre Completo"
                    name="nombre"
                    type="text"
                    placeholder="Tu nombre completo"
                    value={form.nombre}
                    onChange={handleChange}
                    error={fieldErrors.nombre}
                  />
                  <FormField
                    label="Email de contacto"
                    name="email"
                    type="email"
                    placeholder="ejemplo@email.com"
                    value={form.email}
                    onChange={handleChange}
                    error={fieldErrors.email}
                  />
                  <div className="space-y-1.5">
                    <label className="label-caps !text-[#3A3833] !text-[10px]">Asunto</label>
                    <select
                      name="asunto"
                      value={form.asunto}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-[#D2D6CB]/60 py-3 outline-none focus:border-[#3A3833] transition-colors font-sans text-sm appearance-none cursor-pointer"
                    >
                      {ASUNTOS.map((a) => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="label-caps !text-[#3A3833] !text-[10px]">Mensaje</label>
                    <textarea
                      name="mensaje"
                      rows={4}
                      value={form.mensaje}
                      onChange={handleChange}
                      className={`w-full bg-transparent border-b py-3 outline-none transition-colors font-sans text-sm resize-none ${
                        fieldErrors.mensaje ? "border-red-400" : "border-[#D2D6CB]/60 focus:border-[#3A3833]"
                      }`}
                      placeholder="Contanos en qué podemos ayudarte..."
                    />
                    {fieldErrors.mensaje && (
                      <p className="text-xs text-red-500">{fieldErrors.mensaje}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="btn-primary w-full py-5 !text-[11px] mt-4 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {formState === "submitting" ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        Enviando...
                      </>
                    ) : (
                      "Enviar Mensaje"
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Office Photo */}
      <section className="section-container pb-24">
        <div className="relative h-[450px] rounded-[3rem] overflow-hidden shadow-sm">
          <Image
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=80"
            alt="Ritta & Asociados Oficina"
            fill
            className="object-cover hover:scale-[1.03] transition-transform duration-[3s]"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3A3833]/20 to-transparent" />
        </div>
      </section>
    </main>
  );
}

function FormField({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="label-caps !text-[#3A3833] !text-[10px]">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full bg-transparent border-b py-3 outline-none transition-colors font-sans text-sm ${
          error ? "border-red-400" : "border-[#D2D6CB]/60 focus:border-[#3A3833]"
        }`}
        placeholder={placeholder}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
