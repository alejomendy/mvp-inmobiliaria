"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, PlusCircle, Home, LogOut, Loader2 } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // La página de login no necesita auth check
    if (pathname === "/admin/login") {
      setChecking(false);
      return;
    }
    const auth = sessionStorage.getItem("admin_auth");
    if (!auth) {
      setChecking(false);
      router.replace("/admin/login");
    } else {
      setChecking(false);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[#F5F4F0] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#3A3833]" size={40} strokeWidth={1.5} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F5F4F0]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#3A3833] text-white flex flex-col shrink-0">
        <div className="p-8 border-b border-white/10">
          <h2 className="title-serif text-2xl text-white">Admin Panel</h2>
          <p className="text-[10px] text-white/40 uppercase tracking-wider mt-1">Ritta &amp; Asociados</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <SidebarLink href="/admin" icon={<LayoutDashboard size={18} />} label="Propiedades" exact />
          <SidebarLink href="/admin/propiedades/nueva" icon={<PlusCircle size={18} />} label="Nueva Propiedad" />
          <div className="pt-8 pb-2">
            <div className="px-4 text-[9px] uppercase tracking-widest text-white/30 mb-2">Atajos</div>
            <SidebarLink href="/" icon={<Home size={18} />} label="Ver Sitio" />
          </div>
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-red-500/10 text-red-400 transition-colors"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="h-16 bg-white border-b border-[#D2D6CB] flex items-center justify-between px-8 shrink-0">
          <h1 className="title-serif text-lg text-[#3A3833]">Gestión Inmobiliaria</h1>
          <span className="label-caps text-[#8B9485] hidden md:block">Panel Administrativo</span>
        </header>
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

function SidebarLink({
  href,
  icon,
  label,
  exact = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  exact?: boolean;
}) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium ${
        isActive ? "bg-white/15 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
