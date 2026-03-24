'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRegistro } from '@/hooks/Auth/useRegistro';

export default function RegistroPage() {
  const { registrarUsuario, isLoading, error, success } = useRegistro();

  const [formData, setFormData] = useState({
    nombres: '',
    apellido_paterno: '',
    apellido_materno: '',
    correo: '',
    telefono: '',
    id_tipo_usuario: 12, // Por defecto Beneficiario
    ciudad: '',
    estado: '',
    colonia: '',
    direccion: '',
    codigo_postal: '',
    contrasena: '',
    confirmar_contrasena: '',
    imagen_perfil: null as File | null,
    imagen_ine_frontal_url: null as File | null,
    imagen_ine_trasera_url: null as File | null,
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'id_tipo_usuario' ? parseInt(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (formData.contrasena !== formData.confirmar_contrasena) {
      setValidationError('Las contraseñas no coinciden. Verifícalas y vuelve a intentar.');
      return;
    }

    if (formData.contrasena.length < 8) {
       setValidationError('La contraseña debe tener al menos 8 caracteres.');
       return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Obviamos confirmar_contrasena en el payload
    const payload = {
      nombres: formData.nombres,
      apellido_paterno: formData.apellido_paterno,
      apellido_materno: formData.apellido_materno,
      correo: formData.correo,
      telefono: formData.telefono,
      id_tipo_usuario: formData.id_tipo_usuario,
      ciudad: formData.ciudad,
      estado: formData.estado,
      colonia: formData.colonia,
      direccion: formData.direccion,
      codigo_postal: formData.codigo_postal,
      contrasena: formData.contrasena,
      imagen_perfil: formData.imagen_perfil,
      imagen_ine_frontal_url: formData.imagen_ine_frontal_url,
      imagen_ine_trasera_url: formData.imagen_ine_trasera_url,
    };

    await registrarUsuario(payload);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#F5F5F7]">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#1a365d] mix-blend-multiply filter blur-[100px] opacity-40 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#306FDB] mix-blend-multiply filter blur-[100px] opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] rounded-full bg-[#3b82f6] mix-blend-multiply filter blur-[100px] opacity-40 animate-blob animation-delay-4000"></div>

      <div className="max-w-4xl w-full relative z-10 flex flex-col bg-white/70 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_40px_rgb(0,0,0,0.08)] border border-white">
        
        <div className="text-center mb-10">
          <div className="mb-6 mx-auto w-16 h-16 bg-gradient-to-tr from-[#0A1930] to-[#306FDB] rounded-2xl flex items-center justify-center transform rotate-3 shadow-xl">
             <span className="text-white font-black text-3xl">AE</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#0A1930] tracking-tight mb-3">Únete a la Causa</h2>
          <p className="text-gray-500 max-w-lg mx-auto font-medium">Crea tu cuenta ahora para aportar o solicitar ayuda y comenzar a conectar con personas que marcan la diferencia.</p>
        </div>

        {(error || validationError) && (
          <div className="mb-8 p-4 bg-red-50/80 backdrop-blur-md rounded-2xl border border-red-100 flex items-start gap-4 animate-in fade-in slide-in-from-top-2">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
               <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
               </svg>
            </div>
            <div className="pt-2">
              <h3 className="text-red-800 font-bold text-sm">Error en el registro</h3>
              <span className="text-red-600 text-sm font-medium mt-1 inline-block">{error || validationError}</span>
            </div>
          </div>
        )}

        {success ? (
          <div className="text-center py-12 animate-in fade-in zoom-in-95 duration-500">
             <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/20">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
             </div>
             <h3 className="text-3xl font-black text-[#0A1930] mb-4">¡Registro Exitoso!</h3>
             <p className="text-gray-600 font-medium mb-8 text-lg">Tu cuenta ha sido creada. Preparando todo para redirigirte al inicio de sesión...</p>
             <div className="w-8 h-8 border-4 border-gray-200 border-t-[#306FDB] rounded-full mx-auto animate-spin"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* SECCIÓN 1: Roles e Identidad */}
            <div className="space-y-6">
               <h3 className="text-lg font-bold text-[#0A1930] border-b pb-2 flex items-center gap-2">
                  <span className="text-[#306FDB]">1.</span> Rol y Datos Personales
               </h3>
               
               <div className="bg-white/50 p-6 rounded-2xl border border-blue-50">
                   <label htmlFor="id_tipo_usuario" className="block text-sm font-bold text-gray-700 mb-3">¿Cómo deseas participar en la plataforma?</label>
                   <select
                     id="id_tipo_usuario"
                     name="id_tipo_usuario"
                     value={formData.id_tipo_usuario}
                     onChange={handleChange}
                     className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#306FDB]/30 focus:border-[#306FDB] bg-white text-[#0A1930] font-semibold text-lg hover:border-blue-400 outline-none transition-all shadow-sm cursor-pointer"
                   >
                     <option value={10}>Quiero ser Donador (Ofrecer Ayuda)</option>
                     <option value={12}>Soy un Beneficiario (Necesito Ayuda)</option>
                     <option value={11}>Soy un Intermediario (Organización)</option>
                   </select>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                 <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre(s) *</label>
                   <input required type="text" name="nombres" value={formData.nombres} onChange={handleChange} 
                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#306FDB]/20 focus:border-[#306FDB] bg-white text-gray-900 outline-none transition-all" placeholder="Ej: Juan" />
                 </div>
                 <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Apellido Paterno *</label>
                   <input required type="text" name="apellido_paterno" value={formData.apellido_paterno} onChange={handleChange} 
                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#306FDB]/20 focus:border-[#306FDB] bg-white text-gray-900 outline-none transition-all" placeholder="Ej: Pérez" />
                 </div>
                 <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Apellido Materno</label>
                   <input type="text" name="apellido_materno" value={formData.apellido_materno} onChange={handleChange} 
                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#306FDB]/20 focus:border-[#306FDB] bg-white text-gray-900 outline-none transition-all" placeholder="Opcional" />
                 </div>
               </div>
            </div>

            {/* SECCIÓN 2: Contacto y Ubicación */}
            <div className="space-y-6">
               <h3 className="text-lg font-bold text-[#0A1930] border-b pb-2 flex items-center gap-2">
                  <span className="text-[#306FDB]">2.</span> Contacto y Dirección
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                 <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Correo Electrónico *</label>
                   <input required type="email" name="correo" value={formData.correo} onChange={handleChange} 
                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#306FDB]/20 focus:border-[#306FDB] bg-white text-gray-900 outline-none transition-all" placeholder="correo@ejemplo.com" />
                 </div>
                 <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono a 10 dígitos *</label>
                   <input required type="tel" name="telefono" value={formData.telefono} onChange={handleChange} 
                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#306FDB]/20 focus:border-[#306FDB] bg-white text-gray-900 outline-none transition-all" placeholder="5551234567" />
                 </div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                 <div className="lg:col-span-2">
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Dirección Física (Calle y Número) *</label>
                   <input required type="text" name="direccion" value={formData.direccion} onChange={handleChange} 
                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#306FDB]/20 focus:border-[#306FDB] bg-white text-gray-900 outline-none transition-all" placeholder="Ej: Calle Principal 123" />
                 </div>
                 <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Colonia *</label>
                   <input required type="text" name="colonia" value={formData.colonia} onChange={handleChange} 
                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#306FDB]/20 focus:border-[#306FDB] bg-white text-gray-900 outline-none transition-all" placeholder="Ej: Centro" />
                 </div>
                 <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Código Postal *</label>
                   <input required type="text" name="codigo_postal" value={formData.codigo_postal} onChange={handleChange} 
                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#306FDB]/20 focus:border-[#306FDB] bg-white text-gray-900 outline-none transition-all" placeholder="00000" />
                 </div>
                 <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Ciudad / Municipio *</label>
                   <input required type="text" name="ciudad" value={formData.ciudad} onChange={handleChange} 
                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#306FDB]/20 focus:border-[#306FDB] bg-white text-gray-900 outline-none transition-all" placeholder="Ej: Puebla" />
                 </div>
                 <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Estado / Provinica *</label>
                   <input required type="text" name="estado" value={formData.estado} onChange={handleChange} 
                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#306FDB]/20 focus:border-[#306FDB] bg-white text-gray-900 outline-none transition-all" placeholder="Ej: Puebla" />
                 </div>
               </div>
            </div>

            {/* SECCIÓN 3: Seguridad de la Cuenta */}
            <div className="space-y-6">
               <h3 className="text-lg font-bold text-[#0A1930] border-b pb-2 flex items-center gap-2">
                  <span className="text-[#306FDB]">3.</span> Seguridad y Verificación
               </h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                 <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Contraseña *</label>
                   <input required type="password" name="contrasena" value={formData.contrasena} onChange={handleChange} 
                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#306FDB]/20 focus:border-[#306FDB] bg-white text-gray-900 outline-none transition-all" placeholder="Mínimo 8 caracteres" />
                 </div>
                 <div>
                   <label className="block text-sm font-semibold text-gray-700 mb-2">Confirmar Contraseña *</label>
                   <input required type="password" name="confirmar_contrasena" value={formData.confirmar_contrasena} onChange={handleChange} 
                     className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#306FDB]/20 focus:border-[#306FDB] bg-white text-gray-900 outline-none transition-all" placeholder="Repite tu contraseña" />
                 </div>
               </div>

               {/* Verificación opcional con Ines */}
               <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                  <p className="text-sm text-blue-800 font-semibold mb-6 flex items-center gap-2">
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                     Los documentos oficiales acelerarán tu verificación (Opcionales por ahora).
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Foto de Perfil</label>
                        <input type="file" name="imagen_perfil" accept="image/*" onChange={handleFileChange} 
                          className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#306FDB]/10 file:text-[#306FDB] hover:file:bg-[#306FDB]/20 cursor-pointer" />
                         {formData.imagen_perfil && <span className="text-[10px] text-green-600 font-bold block mt-1">✓ {formData.imagen_perfil.name}</span>}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">INE Frontal</label>
                        <input type="file" name="imagen_ine_frontal_url" accept="image/*" onChange={handleFileChange} 
                          className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#306FDB]/10 file:text-[#306FDB] hover:file:bg-[#306FDB]/20 cursor-pointer" />
                         {formData.imagen_ine_frontal_url && <span className="text-[10px] text-green-600 font-bold block mt-1">✓ {formData.imagen_ine_frontal_url.name}</span>}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">INE Reverso</label>
                        <input type="file" name="imagen_ine_trasera_url" accept="image/*" onChange={handleFileChange} 
                          className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#306FDB]/10 file:text-[#306FDB] hover:file:bg-[#306FDB]/20 cursor-pointer" />
                        {formData.imagen_ine_trasera_url && <span className="text-[10px] text-green-600 font-bold block mt-1">✓ {formData.imagen_ine_trasera_url.name}</span>}
                      </div>
                  </div>
               </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center h-16 rounded-2xl border border-transparent bg-gradient-to-r from-[#0A1930] to-[#1a365d] text-base font-black text-white hover:from-[#1a365d] hover:to-[#306FDB] focus:outline-none focus:ring-4 focus:ring-blue-500/20 shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-1"
              >
                {isLoading ? (
                   <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                   'Crear Mi Cuenta'
                )}
              </button>
            </div>
          </form>
        )}

        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
             <p className="text-gray-500 font-medium">
               ¿Ya tienes una cuenta registrada?{' '}
               <Link href="/login" className="font-bold text-[#306FDB] hover:text-[#0A1930] transition-colors underline decoration-2 underline-offset-4">
                 Inicia Sesión Aquí
               </Link>
             </p>
        </div>
      </div>
    </div>
  );
}
