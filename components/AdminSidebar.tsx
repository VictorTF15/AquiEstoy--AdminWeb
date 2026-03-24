"use client";

import {
  LayoutDashboard,
  FileText,
  Tags,
  Users,
  HandCoins,
  Map,
  LogOut,
  House,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const MENU_ITEMS = [
  { href: "/home", label: "Dashboard", icon: LayoutDashboard },
  { href: "/casos", label: "Casos", icon: FileText },
  { href: "/categorias", label: "Categorías", icon: Tags },
  { href: "/usuarios", label: "Usuarios", icon: Users },
  { href: "/donaciones", label: "Donaciones", icon: HandCoins },
  { href: "/map", label: "Mapa", icon: Map },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    router.replace("/login");
  };

  return (
    <aside className="w-full bg-gradient-to-b from-[#0b1f4a] via-[#0f2f73] to-[#103a8a] px-4 py-5 text-white md:min-h-screen md:w-72 md:px-6 md:py-8">
      {/* Logo Section */}
      <div className="mb-8 flex items-center gap-3 border-b border-white/15 pb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 to-sky-500 shadow-lg shadow-blue-900/40">
          <House size={20} className="text-white" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-sky-200">Aquí Estoy</p>
          <h1 className="text-lg font-black bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">Admin</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex gap-2 overflow-x-auto pb-2 md:flex-col md:overflow-visible md:space-y-2">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex min-w-max items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-200 md:min-w-0 ${
                active
                  ? "bg-gradient-to-r from-blue-500 to-sky-500 text-white shadow-lg shadow-blue-900/40"
                  : "text-blue-100 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={18} className="flex-shrink-0" />
              <span className="hidden md:inline">{item.label}</span>
              {active && (
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-xl" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="my-6 h-px bg-gradient-to-r from-blue-300/10 via-blue-100/30 to-blue-300/10" />

      {/* Logout Button */}
      <button
        type="button"
        onClick={handleLogout}
        className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-blue-700 to-sky-600 px-4 py-3 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:shadow-blue-900/30 active:scale-95"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        <div className="relative flex items-center justify-center gap-2">
          <LogOut size={16} />
          <span>Cerrar sesión</span>
        </div>
      </button>
    </aside>
  );
}
