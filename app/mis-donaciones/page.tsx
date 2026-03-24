'use client';

import React from 'react';
import { useMisDonaciones } from '@/hooks/donaciones/useMisDonaciones';
import { useConversaciones } from '@/hooks/Mensajes/useConversaciones';
import { usePerfil } from '@/hooks/Usuarios/usePerfil';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function MisDonacionesPage() {
  const { donaciones, isLoading, error } = useMisDonaciones();
  const { obtenerOCrearChatParaCaso } = useConversaciones();
  const { perfil } = usePerfil();
  const router = useRouter();

  const handleEnviarMensaje = async (donacion: any) => {
    if (!perfil) return;
    
    if (!donacion.beneficiario_id) {
      alert("Usuario no disponible para mensajes");
      return;
    }

    try {
      const receptorId = donacion.beneficiario_id;
      await obtenerOCrearChatParaCaso(donacion.id_caso, perfil.id, receptorId);
      router.push('/mensajes');
    } catch(err) {
      console.error(err);
      alert("Error al abrir el chat.");
    }
  };

  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) return 'Fecha desconocida';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

   const formatCantidad = (value: string | number | null | undefined) => {
      if (value === null || value === undefined || value === '') return '';
      const parsed = Number.parseFloat(String(value));
      if (Number.isNaN(parsed)) return String(value);
      return String(Math.trunc(parsed));
   };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center">
        <div className="flex flex-col items-center animate-pulse">
           <div className="w-16 h-16 border-4 border-gray-200 border-t-[#306FDB] rounded-full animate-spin mb-4"></div>
           <p className="text-gray-500 font-semibold">Cargando tus donaciones...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 shadow-red-500/20 shadow-xl">
           <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
           </svg>
        </div>
        <h1 className="text-2xl font-black text-[#0A1930] mb-2">Error al cargar donaciones</h1>
        <p className="text-gray-500 max-w-md mb-8">{error}</p>
        <Link href="/" className="px-8 py-3 bg-[#306FDB] text-white rounded-xl font-bold shadow-lg hover:shadow-[#306FDB]/30 hover:-translate-y-1 transition-all">
           Ir a Inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F5F5F7] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Cabecera */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden relative">
           <div className="h-32 bg-gradient-to-r from-[#0A1930] via-[#1a365d] to-[#306FDB] w-full absolute top-0 left-0 z-0"></div>
           
           <div className="px-8 pb-8 pt-20 relative z-10 flex flex-col items-center md:items-start md:flex-row gap-8">
               <div className="shrink-0 relative">
                   <div className="w-24 h-24 rounded-[1.5rem] border-4 border-white shadow-xl bg-gradient-to-br from-[#306FDB] to-blue-400 flex items-center justify-center text-white">
                       <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                       </svg>
                   </div>
               </div>

               <div className="flex-1 text-center md:text-left pt-2">
                   <h1 className="text-3xl font-black text-white tracking-tight">Mis Donaciones</h1>
                   <p className="text-white/70 font-medium mt-1">Gracias por ser parte del cambio. Aquí puedes ver tu historial de ayuda.</p>
                   
                   <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
                       <div className="bg-[#F5F5F7] px-4 py-2 rounded-xl border border-gray-200 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                              {donaciones.length}
                          </div>
                          <div className="text-left">
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total</p>
                              <p className="text-sm font-bold text-[#0A1930]">Donaciones</p>
                          </div>
                       </div>
                   </div>
               </div>
           </div>
        </div>

        {/* Lista de Donaciones */}
        {donaciones.length === 0 ? (
          <div className="bg-white rounded-[2rem] p-12 text-center shadow-sm border border-gray-100">
             <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4M8 16l-4-4 4-4" />
             </svg>
             <h3 className="text-xl font-bold text-[#0A1930] mb-2">Aún no has realizado donaciones</h3>
             <p className="text-gray-500 mb-6 max-w-md mx-auto">Explora los casos disponibles y apoya a quienes más lo necesitan.</p>
             <Link href="/home" className="inline-block px-8 py-3 bg-[#306FDB] text-white rounded-xl font-bold hover:shadow-lg transition-all">
                Ver casos disponibles
             </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {donaciones.map((donacion) => (
               <div key={donacion.id} className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
                  
                  <div className="flex items-start justify-between mb-4">
                     <div className="flex items-center gap-3">
                        {donacion.categoria?.icono ? (
                           <img src={donacion.categoria.icono} alt={donacion.categoria.nombre} className="w-10 h-10 object-contain" />
                        ) : (
                           <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-500">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                           </div>
                        )}
                        <div>
                           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                              {donacion.categoria?.nombre || 'General'}
                           </span>
                           <h3 className="text-lg font-bold text-[#0A1930] leading-tight line-clamp-2">
                              {donacion.caso_titulo || 'Caso Eliminado/Desconocido'}
                           </h3>
                        </div>
                     </div>
                     <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        donacion.estado_donacion === 'completado' || donacion.estado_donacion === 'COMPLETADO' 
                          ? 'bg-green-100 text-green-700' 
                          : donacion.estado_donacion === 'cancelado' || donacion.estado_donacion === 'CANCELADO'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                     }`}>
                        {donacion.estado_donacion?.toUpperCase() || 'PENDIENTE'}
                     </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-6 flex-1 line-clamp-3">
                     {donacion.mensaje_donador || 'Sin mensaje de donador.'}
                  </p>

                  <div className="mt-auto grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                     <div className="col-span-2 md:col-span-1">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Monto de donación</p>
                        <p className="text-sm font-black text-[#306FDB]">
                           {formatCantidad(donacion.cantidad_donacion)} {donacion.descripcion_donacion ? `- ${donacion.descripcion_donacion}` : ''}
                        </p>
                     </div>
                     <div className="col-span-2 md:col-span-1">
                        <p className="text-sm font-semibold text-gray-700">{formatDate(donacion.fecha_donacion || donacion.fecha_compromiso)}</p>
                     </div>
                  </div>

                  {/* Acciones Rápidas */}
                  <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap justify-end items-center">
                     <div className="flex gap-2">
                       <button 
                          onClick={(e) => {
                             e.preventDefault();
                             handleEnviarMensaje(donacion);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F5F5F7] hover:bg-[#E8E8EB] text-[#0A1930] rounded-lg text-xs font-bold transition-colors"
                       >
                         <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                         </svg>
                         Enviar mensaje
                       </button>
                     </div>

                     <Link 
                       href={`/mis-donaciones/${donacion.id}`}
                       className="group flex items-center gap-2 text-sm font-bold text-[#306FDB] hover:text-[#1a4b9c] transition-colors ml-auto"
                     >
                        Detalles
                        <span className="w-6 h-6 rounded-full bg-blue-50 group-hover:bg-[#306FDB] group-hover:text-white flex items-center justify-center transition-all">
                           <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                           </svg>
                        </span>
                     </Link>
                  </div>
               </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
}
