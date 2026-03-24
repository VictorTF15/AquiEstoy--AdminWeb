'use client';

import React from 'react';
import { usePerfil } from '@/hooks/Usuarios/usePerfil';
import Link from 'next/link';

export default function PerfilPage() {
  const { perfil, isLoading, error } = usePerfil();

  // Helper para agrupar campos vacíos y evitar "null" en la UI
  const formatText = (text: string | null | undefined) => text || 'No especificado';

  // Helper para fechas
  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) return 'Desconocida';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center">
        <div className="flex flex-col items-center animate-pulse">
           <div className="w-16 h-16 border-4 border-gray-200 border-t-[#306FDB] rounded-full animate-spin mb-4"></div>
           <p className="text-gray-500 font-semibold">Cargando tu perfil...</p>
        </div>
      </div>
    );
  }

  if (error || !perfil) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 shadow-red-500/20 shadow-xl">
           <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
           </svg>
        </div>
        <h1 className="text-2xl font-black text-[#0A1930] mb-2">Error de Sesión</h1>
        <p className="text-gray-500 max-w-md mb-8">{error || 'No pudimos encontrar tus datos.'}</p>
        <Link href="/login" className="px-8 py-3 bg-[#306FDB] text-white rounded-xl font-bold shadow-lg hover:shadow-[#306FDB]/30 hover:-translate-y-1 transition-all">
           Volver a Iniciar Sesión
        </Link>
      </div>
    );
  }

  // Generamos avatar con iniciales si no hay foto
  const iniciales = `${perfil.nombres.charAt(0)}${perfil.apellido_paterno ? perfil.apellido_paterno.charAt(0) : ''}`;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F5F5F7] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Cabecera Principal del Perfil */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden relative">
           {/* Banner de Fondo */}
           <div className="h-32 bg-gradient-to-r from-[#0A1930] via-[#1a365d] to-[#306FDB] w-full absolute top-0 left-0 z-0"></div>
           
           <div className="px-8 pb-8 pt-20 relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
               {/* Avatar */}
               <div className="shrink-0 relative">
                  {perfil.imagen_perfil ? (
                      <img src={perfil.imagen_perfil} alt="Avatar" className="w-32 h-32 rounded-[1.5rem] border-4 border-white shadow-xl object-cover bg-white" />
                  ) : (
                      <div className="w-32 h-32 rounded-[1.5rem] border-4 border-white shadow-xl bg-gradient-to-br from-[#306FDB] to-blue-400 flex items-center justify-center text-4xl font-black text-white tracking-widest">
                         {iniciales.toUpperCase()}
                      </div>
                  )}
                  {perfil.esta_activo && (
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-white bg-green-500 shadow-md"></div>
                  )}
               </div>

               {/* Información Rápida */}
               <div className="flex-1 text-center md:text-left pt-2">
                   <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
                       <h1 className="text-3xl font-black text-white tracking-tight">{perfil.nombres} {perfil.apellido_paterno} {perfil.apellido_materno}</h1>
                       {perfil.verificado && (
                           <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#306FDB] text-xs font-bold uppercase tracking-wider border border-blue-100 mx-auto md:mx-0">
                               <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                               </svg>
                               Verificado
                           </span>
                       )}
                   </div>
                   <p className="text-white/70 font-medium">{perfil.correo} • ID {perfil.id}</p>
                   
                   <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
                       <div className="bg-[#F5F5F7] px-4 py-2 rounded-xl border border-gray-200 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                          </div>
                          <div className="text-left">
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Rol</p>
                              <p className="text-sm font-bold text-[#0A1930]">{perfil.tipo_usuario?.nombre || 'No asignado'}</p>
                          </div>
                       </div>
                       <div className="bg-[#F5F5F7] px-4 py-2 rounded-xl border border-gray-200 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                          </div>
                          <div className="text-left">
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Miembro Desde</p>
                              <p className="text-sm font-bold text-[#0A1930]">{formatDate(perfil.fecha_registro)}</p>
                          </div>
                       </div>
                   </div>
               </div>
           </div>
        </div>

        {/* Cuadrícula de Detalles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* Columna Izquierda: Detalles de Contacto */}
           <div className="lg:col-span-1 space-y-8">
               <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                   <h3 className="text-lg font-bold text-[#0A1930] mb-6 flex items-center gap-2">
                       <svg className="w-5 h-5 text-[#306FDB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                       </svg>
                       Contacto
                   </h3>
                   <div className="space-y-4">
                       <div>
                           <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Correo Electrónico</p>
                           <p className="text-sm font-semibold text-gray-900">{perfil.correo}</p>
                       </div>
                       <div className="h-px bg-gray-100 w-full my-2"></div>
                       <div>
                           <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Teléfono</p>
                           <p className="text-sm font-semibold text-gray-900">{formatText(perfil.telefono)}</p>
                       </div>
                   </div>
               </div>

               <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
                   <h3 className="text-lg font-bold text-[#0A1930] mb-6 flex items-center gap-2">
                       <svg className="w-5 h-5 text-[#306FDB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                       </svg>
                       Dirección
                   </h3>
                   <div className="space-y-4">
                       <div>
                           <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Estado</p>
                           <p className="text-sm font-semibold text-gray-900">{formatText(perfil.estado)}</p>
                       </div>
                       <div>
                           <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Ciudad / Colonia</p>
                           <p className="text-sm font-semibold text-gray-900">{formatText(perfil.ciudad)} - {formatText(perfil.colonia)}</p>
                       </div>
                       <div>
                           <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Calle y C.P.</p>
                           <p className="text-sm font-semibold text-gray-900">{formatText(perfil.direccion)} (CP. {formatText(perfil.codigo_postal)})</p>
                       </div>
                   </div>
               </div>
           </div>

           {/* Columna Central/Derecha: Documentos */}
           <div className="lg:col-span-2 space-y-8">
               <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-100 h-full">
                   <h3 className="text-xl font-bold text-[#0A1930] mb-2 flex items-center gap-2">
                       <svg className="w-6 h-6 text-[#306FDB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                       </svg>
                       Documentos de Identidad (INE)
                   </h3>
                   <p className="text-sm text-gray-500 mb-8">Esta información oficial es resguardada y vital para tu verificación dentro de la plataforma.</p>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {/* INE Frontal */}
                       <div className="group rounded-2xl border-2 border-dashed border-gray-200 p-2 hover:border-[#306FDB]/50 transition-colors bg-gray-50 flex flex-col items-center justify-center min-h-[200px] relative overflow-hidden">
                           {perfil.imagen_ine_frontal_url ? (
                               // En caso de que sea un ID "8" o "10" como en la muestra JSON o una URL real, mostrar como etiqueta o imagen si existe
                               typeof perfil.imagen_ine_frontal_url === 'string' && perfil.imagen_ine_frontal_url.length < 5 ? (
                                 <div className="flex flex-col items-center text-[#306FDB]">
                                    <svg className="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                    <span className="font-bold">INE Frontal Subida (ID: {perfil.imagen_ine_frontal_url})</span>
                                 </div>
                               ) : (
                                  <img src={perfil.imagen_ine_frontal_url} alt="INE Frontal" className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                               )
                           ) : (
                               <div className="text-center text-gray-400">
                                   <svg className="w-10 h-10 mx-auto mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                   </svg>
                                   <p className="text-sm font-medium">Frontal no registrada</p>
                               </div>
                           )}
                           {perfil.imagen_ine_frontal_url && (
                               <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-bold tracking-widest uppercase">Frontal</div>
                           )}
                       </div>

                       {/* INE Trasera */}
                       <div className="group rounded-2xl border-2 border-dashed border-gray-200 p-2 hover:border-[#306FDB]/50 transition-colors bg-gray-50 flex flex-col items-center justify-center min-h-[200px] relative overflow-hidden">
                           {perfil.imagen_ine_trasera_url ? (
                               typeof perfil.imagen_ine_trasera_url === 'string' && perfil.imagen_ine_trasera_url.length < 5 ? (
                                  <div className="flex flex-col items-center text-[#306FDB]">
                                    <svg className="w-12 h-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                    <span className="font-bold">INE Reverso Subida (ID: {perfil.imagen_ine_trasera_url})</span>
                                 </div>
                               ) : (
                                  <img src={perfil.imagen_ine_trasera_url} alt="INE Trasera" className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                               )
                           ) : (
                               <div className="text-center text-gray-400">
                                   <svg className="w-10 h-10 mx-auto mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                   </svg>
                                   <p className="text-sm font-medium">Reverso no registrado</p>
                               </div>
                           )}
                           {perfil.imagen_ine_trasera_url && (
                               <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-lg text-xs font-bold tracking-widest uppercase">Reverso</div>
                           )}
                       </div>
                   </div>
               </div>
           </div>

        </div>
      </div>
    </div>
  );
}
