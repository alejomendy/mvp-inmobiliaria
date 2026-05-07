"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "ritta2024admin";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    await new Promise((r) => setTimeout(r, 400));

    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "1");
      router.push("/admin");
    } else {
      setError("Contraseña incorrecta. Intentá de nuevo.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F4F0] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Image
            src="/logo.png"
            alt="Ritta & Asociados"
            width={160}
            height={56}
            className="mx-auto mb-8 w-auto h-14 object-contain"
          />
          <div className="w-14 h-14 bg-[#3A3833] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="text-white" size={24} strokeWidth={1.5} />
          </div>
          <h1 className="title-serif text-3xl mb-2">Panel Admin</h1>
          <p className="text-sans-sm text-[#8B9485]">Ingresá la contraseña para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-[2rem] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-[#D2D6CB]/30">
          <div className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Contraseña"
                className={`w-full pr-12 pl-4 py-4 rounded-xl border outline-none transition-all font-sans text-sm ${
                  error
                    ? "border-red-300 bg-red-50 focus:border-red-400"
                    : "border-[#D2D6CB] focus:border-[#3A3833]"
                }`}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B9485] hover:text-[#3A3833] transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && (
              <p className="text-xs text-red-500 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading || !password}
              className="btn-primary w-full py-4 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="animate-spin" size={18} /> : null}
              {isLoading ? "Verificando..." : "Ingresar"}
            </button>
          </div>
        </form>

        <p className="text-center label-caps !text-[#8B9485] mt-6">
          Ritta &amp; Asociados · Panel Administrativo
        </p>
      </div>
    </div>
  );
}
