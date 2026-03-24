"use client";

import React, { useState } from "react";
import {
  Navbar,
  NavBody,
  NavbarLogo,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  NavbarButton,
} from "./ui/resizable-navbar";
import { usePathname, useRouter } from "next/navigation";

// Definimos las rutas del sistema
const navLinks = [
  { name: "Inicio", link: "/home" },
  { name: "Crear Caso", link: "/crear-caso" },
  { name: "Casos Disponibles", link: "/map" },
  { name: "Mis Donaciones", link: "/mis-donaciones" },
  { name: "Mensajes", link: "/mensajes" },
];

export function AppNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
    router.replace('/login');
  };

  // No mostramos el navbar global en la página de login para mantener el diseño limpio
  if (pathname === "/login") {
    return null;
  }

  return (
    <div className="relative w-full z-50">
      <Navbar>
        {/* Desktop View */}
        <NavBody>
          <div className="flex items-center">
            {/* Logo o Marca */}
            <div className="flex items-center gap-2 mr-6 text-[#0A1930] font-black tracking-tighter">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#306FDB] to-blue-400 flex items-center justify-center shadow-lg shadow-[#306FDB]/20">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 22V12h6v10" />
                </svg>
              </div>
              AQUÍ<span className="text-[#306FDB]">ESTOY</span>
            </div>

            <NavItems items={navLinks} />
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="font-semibold text-gray-600 text-sm px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Cerrar Sesión
            </button>
            <NavbarButton href="/perfil" variant="primary" className="bg-[#306FDB] hover:bg-[#2051a5] text-white">
              Mi Perfil
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile View */}
        <MobileNav>
          <MobileNavHeader>
            <div className="flex items-center gap-2 text-[#0A1930] font-black tracking-tighter">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#306FDB] to-blue-400 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 22V12h6v10" />
                </svg>
              </div>
              AQUÍ<span className="text-[#306FDB]">ESTOY</span>
            </div>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            <div className="flex flex-col gap-4 w-full">
              {navLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  className="text-lg font-medium text-gray-700 hover:text-[#306FDB] px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}

              <div className="w-full h-px bg-gray-100 my-2"></div>

              <NavbarButton href="/perfil" variant="primary" className="w-full bg-[#306FDB] text-white py-3">
                Mi Perfil
              </NavbarButton>
              <button
                onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }}
                className="w-full py-3 text-sm font-semibold text-gray-600 bg-gray-50 border border-gray-100 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
