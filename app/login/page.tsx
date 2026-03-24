"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Zap, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { loginRequest } from "@/lib/adminApi";
import { useAlerts } from "@/components/AlertProvider";

export default function LoginPage() {
  const router = useRouter();
  const { showError, showSuccess } = useAlerts();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const data = await loginRequest(correo, password);
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));
      showSuccess("¡Sesión iniciada correctamente!");
      router.replace("/home");
    } catch (error) {
      showError(error instanceof Error ? error.message : "No se pudo iniciar sesión.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4 py-8">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-80 w-80 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-20" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 bg-gradient-to-br from-blue-700 to-indigo-600 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Section - Branding */}
        <div className="hidden lg:block text-white space-y-8">
          <div>
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/40 group-hover:shadow-xl group-hover:shadow-blue-500/60 transition-all">
                <Zap size={24} className="text-white" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent group-hover:to-sky-300 transition-all">
                Aquí Estoy
              </span>
            </div>
            <h1 className="text-5xl font-black leading-tight max-w-lg">
              Panel de Control Social
            </h1>
          </div>
          <p className="max-w-md text-sm text-blue-100">
            Gestiona casos, categorías, usuarios y donaciones desde una interfaz intuitiva y poderosa.
          </p>

          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
              Análisis en tiempo real
            </li>
            <li className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
              Gestión de datos centralizada
            </li>
            <li className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
              Seguridad con autenticación JWT
            </li>
          </ul>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full">
          <form
            onSubmit={onSubmit}
            className="relative rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-8 shadow-2xl hover:shadow-blue-500/10 transition-shadow"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-t-2xl" />

            <div className="space-y-2 mb-8">
              <h2 className="text-3xl font-black text-white">Iniciar sesión</h2>
              <p className="text-slate-400">Accede a tu panel administrativo</p>
            </div>

            <div className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-300">Correo electrónico</label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity" />
                  <div className="relative flex items-center gap-3 rounded-lg border border-slate-600 bg-slate-700/50 hover:bg-slate-700/70 px-4 py-3.5 transition-colors">
                    <Mail size={18} className="text-slate-400" />
                    <input
                      className="flex-1 border-none bg-transparent text-white placeholder-slate-500 outline-none text-sm font-medium"
                      type="email"
                      required
                      value={correo}
                      onChange={(event) => setCorreo(event.target.value)}
                      placeholder="admin@correo.com"
                    />
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-300">Contraseña</label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity" />
                  <div className="relative flex items-center gap-3 rounded-lg border border-slate-600 bg-slate-700/50 hover:bg-slate-700/70 px-4 py-3.5 transition-colors">
                    <Lock size={18} className="text-slate-400" />
                    <input
                      className="flex-1 border-none bg-transparent text-white placeholder-slate-500 outline-none text-sm font-medium"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      className="text-slate-500 hover:text-slate-300 transition-colors"
                      onClick={() => setShowPassword((value) => !value)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative mt-8 w-full overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <span>Ingresando...</span>
                  ) : (
                    <>
                      <span>Entrar al panel</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>
              </button>
            </div>

            <p className="mt-6 text-center text-xs text-slate-400">
              Versión 1.0 | Panel de Control © 2024
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
