'use client';
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDonacion } from '@/hooks/donaciones/useDonacion';
import { useConversaciones } from '@/hooks/Mensajes/useConversaciones';
import { usePerfil } from '@/hooks/Usuarios/usePerfil';
import Link from 'next/link';
import EvidenciaModal from '@/components/EvidenciaModal';

export default function DonacionDetallePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { donacion, isLoading, error } = useDonacion(id);
  const { obtenerOCrearChatParaCaso } = useConversaciones();
  const { perfil } = usePerfil();
  const [isEvidenciaModalOpen, setIsEvidenciaModalOpen] = useState(false);

  const handleEnviarMensaje = async () => {
     if (!donacion || !perfil) return;
     try {
        // Obtenemos o creamos con el id del donador/emisor y un receptor (por ser temporal usamos placeholder `1` si no existe la prop)
        const receptorId = (donacion as any).caso?.creador_id || 1; 
        
        await obtenerOCrearChatParaCaso(donacion.id_caso, perfil.id, receptorId);
        
        // Redireccionamos a la pantalla de la bandeja de mensajes:
        router.push('/mensajes');
     } catch (err) {
        console.error("No se pudo abrir la conversación", err);
        alert("Ocurrió un error al intentar crear el chat de la donación.");
     }
  };

  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) return 'Fecha desconocida';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatCantidad = (value: string | number | null | undefined) => {
    if (value === null || value === undefined || value === '') return '';
    const parsed = Number.parseFloat(String(value));
    if (Number.isNaN(parsed)) return String(value);
    return String(Math.trunc(parsed));
  };

  const getStatusColor = (status: string | undefined) => {
    const s = status?.toLowerCase();
    if (s === 'completado') return 'bg-green-100 text-green-700 border-green-200';
    if (s === 'cancelado') return 'bg-red-100 text-red-700 border-red-200';
    return 'bg-yellow-100 text-yellow-700 border-yellow-200';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex flex-col items-center justify-center">
        <div className="flex flex-col items-center animate-pulse">
           <div className="w-16 h-16 border-4 border-gray-200 border-t-[#306FDB] rounded-full animate-spin mb-4"></div>
           <p className="text-gray-500 font-semibold">Cargando detalles de tu donación...</p>
        </div>
      </div>
    );
  }

  if (error || !donacion) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 shadow-red-500/20 shadow-xl">
           <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
           </svg>
        </div>
        <h1 className="text-2xl font-black text-[#0A1930] mb-2">Error al cargar donación</h1>
        <p className="text-gray-500 max-w-md mb-8">{error || 'No pudimos encontrar la información de esta donación.'}</p>
        <button onClick={() => router.push('/mis-donaciones')} className="px-8 py-3 bg-[#306FDB] text-white rounded-xl font-bold shadow-lg hover:shadow-[#306FDB]/30 hover:-translate-y-1 transition-all">
           Volver a mis donaciones
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F5F5F7] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation / Header */}
        <div className="flex items-center justify-between">
           <button 
             onClick={() => router.push('/mis-donaciones')}
             className="flex items-center gap-2 text-gray-500 hover:text-[#306FDB] font-semibold transition-colors"
           >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver Atrás
           </button>
        </div>

        {/* Main Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden relative">
           {/* Color Banner */}
           <div className={`h-28 w-full absolute top-0 left-0 z-0 bg-gradient-to-r from-[#0A1930] to-[#306FDB]`}></div>
           
           <div className="px-8 pb-10 pt-16 relative z-10">
               {/* Icon & Status */}
               <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                   <div className="flex items-center gap-5">
                       <div className="shrink-0">
                           {donacion.categoria?.icono ? (
                               <div className="w-20 h-20 rounded-[1.2rem] border-4 border-white shadow-lg bg-white p-2">
                                  <img src={donacion.categoria.icono} alt={donacion.categoria.nombre} className="w-full h-full object-contain" />
                               </div>
                           ) : (
                               <div className="w-20 h-20 rounded-[1.2rem] border-4 border-white shadow-lg bg-indigo-50 flex items-center justify-center text-indigo-400">
                                   <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                   </svg>
                               </div>
                           )}
                       </div>
                       <div>
                            <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-1">
                                Donación #{donacion.id} • {donacion.categoria?.nombre || 'General'}
                            </p>
                            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight line-clamp-2">
                                {donacion.caso_titulo || 'Caso Desconocido'}
                            </h1>
                       </div>
                   </div>

                   <div className={`px-4 py-2 border rounded-xl font-bold text-sm tracking-wide self-start md:self-auto uppercase flex items-center gap-2 ${getStatusColor(donacion.estado_donacion)}`}>
                       <span className="w-2 h-2 rounded-full bg-current"></span>
                       {donacion.estado_donacion || 'PENDIENTE'}
                   </div>
               </div>

               <div className="h-px w-full bg-gray-100 mb-8"></div>

               {/* Key Details Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                   <div className="bg-[#F5F5F7] rounded-2xl p-5 border border-gray-100">
                       <div className="flex items-center gap-3 mb-2">
                           <div className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                           </div>
                           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Monto de donación</p>
                       </div>
                       <p className="text-2xl font-black text-[#306FDB]">
                         {formatCantidad(donacion.cantidad_donacion)} {donacion.descripcion_donacion ? `- ${donacion.descripcion_donacion}` : ''}
                       </p>
                   </div>

                   <div className="bg-[#F5F5F7] rounded-2xl p-5 border border-gray-100">
                       <div className="flex items-center gap-3 mb-2">
                           <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                           </div>
                           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Fecha Compromiso</p>
                       </div>
                       <p className="text-sm font-bold text-[#0A1930]">{formatDate(donacion.fecha_compromiso)}</p>
                   </div>

                   <div className="bg-[#F5F5F7] rounded-2xl p-5 border border-gray-100 lg:col-span-1 md:col-span-2">
                       <div className="flex items-center gap-3 mb-2">
                           <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                           </div>
                           <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Fecha Donación</p>
                       </div>
                       <p className="text-sm font-bold text-[#0A1930]">{formatDate(donacion.fecha_donacion)}</p>
                   </div>
               </div>

               {/* Messages & Description */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                   <div className="bg-white border rounded-[1.5rem] p-6 shadow-sm">
                       <h3 className="text-sm font-bold text-[#0A1930] uppercase tracking-wide mb-3 flex items-center gap-2">
                           <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                           Tu Mensaje de Donador
                       </h3>
                       <p className="text-gray-600 leading-relaxed text-sm">
                           {donacion.mensaje_donador || donacion.descripcion_donacion || 'No proporcionaste un mensaje o descripción para esta donación.'}
                       </p>
                   </div>
                   
                   <div className="bg-white border rounded-[1.5rem] p-6 shadow-sm">
                       <h3 className="text-sm font-bold text-[#0A1930] uppercase tracking-wide mb-3 flex items-center gap-2">
                           <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                           Información de Contacto Adicional
                       </h3>
                       <p className="text-gray-600 text-sm mb-2"><strong>ID del Caso:</strong> {donacion.id_caso}</p>
                       <p className="text-gray-600 text-sm"><strong>ID Tipo Donación:</strong> {donacion.id_tipo_donacion || 'N/D'}</p>
                       <div className="mt-4 pt-4 border-t border-gray-100">
                          <Link href={`/map?caso=${donacion.id_caso}`} className="text-[#306FDB] font-bold text-sm hover:underline flex items-center gap-1">
                              Ver publicación del caso
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                          </Link>
                       </div>
                   </div>
               </div>

               <div className="flex flex-wrap gap-4 mb-8">
                   <button 
                     onClick={handleEnviarMensaje}
                     className="flex-1 md:flex-none flex justify-center items-center gap-2 px-6 py-4 bg-[#0A1930] text-white rounded-xl font-bold hover:bg-[#1a365d] hover:-translate-y-1 transition-all shadow-lg shadow-[#0A1930]/20"
                   >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      Enviar Mensaje
                   </button>
                   
                   <button
                       onClick={() => setIsEvidenciaModalOpen(true)}
                       className="flex-1 md:flex-none flex justify-center items-center gap-2 px-6 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:border-[#306FDB] hover:text-[#306FDB] transition-all"
                    >
                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                       </svg>
                       Adjuntar Evidencia
                    </button>
               </div>

               {/* Donador info (Propio perfil que aparece en el JSON de mis donaciones) */}
               {donacion.donador && (
                 <div className="bg-gray-50 border rounded-[1.5rem] p-6">
                    <h3 className="text-sm font-bold text-[#0A1930] uppercase tracking-wide mb-4">Registro en la plataforma</h3>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#306FDB] text-white flex items-center justify-center font-bold text-lg">
                           {donacion.donador.nombres.charAt(0)}{donacion.donador.apellido_paterno.charAt(0)}
                        </div>
                        <div>
                           <p className="font-bold text-[#0A1930]">{donacion.donador.nombres} {donacion.donador.apellido_paterno}</p>
                           <p className="text-xs text-gray-500">{donacion.donador.correo}</p>
                        </div>
                    </div>
                 </div>
               )}

           </div>
        </div>
      </div>

      {/* Modal Evidencia */}
      {donacion && perfil && (
        <EvidenciaModal
          isOpen={isEvidenciaModalOpen}
          onClose={() => setIsEvidenciaModalOpen(false)}
          idCaso={donacion.id_caso}
          idUsuario={perfil.id}
          nombreUsuario={`${perfil.nombres} ${perfil.apellido_paterno}`}
          tituloCase={donacion.caso_titulo || 'Caso'}
        />
      )}
    </div>
  );
}
