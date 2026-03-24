'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useConversaciones } from '@/hooks/Mensajes/useConversaciones';
import { useMensajes } from '@/hooks/Mensajes/useMensajes';
import { usePerfil } from '@/hooks/Usuarios/usePerfil';
import { ConversacionBackend } from '../../types/conversaciones';

export default function MensajesPage() {
  const { conversaciones, isLoading, error } = useConversaciones();
  const { perfil, isLoading: isPerfilLoading } = usePerfil();

  const [conversacionActiva, setConversacionActiva] = useState<ConversacionBackend | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mensajeTexto, setMensajeTexto] = useState('');

  // Cargar mensajes de la conversación activa
  const { mensajes, isLoading: isMensajesLoading, isEnviando, enviarMensaje } = useMensajes(conversacionActiva?.id);

  const misConversaciones = useMemo(() => {
    if (!perfil?.id) return [];
    return conversaciones.filter(
      (c) => c.id_usuario1 === perfil.id || c.id_usuario2 === perfil.id
    );
  }, [conversaciones, perfil?.id]);

  // Seleccionar la primera conversación al cargar si hay datos
  useEffect(() => {
    if (misConversaciones.length > 0 && !conversacionActiva) {
      setConversacionActiva(misConversaciones[0]);
    }
  }, [misConversaciones, conversacionActiva]);

  const handleEnviarMensaje = async () => {
    if (!mensajeTexto.trim() || !conversacionActiva || !perfil?.id) return;
    
    try {
      await enviarMensaje({
        contenido: mensajeTexto.trim(),
        es_leido: true,
            id_conversacion: conversacionActiva.id,
        id_emisor: perfil.id,
        id_tipo: 6, // 6 es Consulta basado en el JSON de ejemplo
        fecha_leido: new Date().toISOString(),
        adjunto: null
      });
      setMensajeTexto('');
    } catch (error) {
       console.error("Error al enviar el mensaje", error);
    }
  };

  // Averiguar nombre de la persona con la que hablo
  const getPeerName = (conv: ConversacionBackend) => {
    if (perfil?.id === conv.id_usuario1) return conv.usuario2_nombre;
    if (perfil?.id === conv.id_usuario2) return conv.usuario1_nombre;
    return conv.usuario2_nombre || conv.usuario1_nombre || 'Usuario';
  };

  const formatShortDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('es-MX', { month: 'short', day: 'numeric' }).format(date);
  };

  const formatMessageTime = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('es-MX', { hour: 'numeric', minute: 'numeric', hour12: true }).format(date);
  };

  if (isLoading || isPerfilLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex flex-col items-center justify-center">
         <div className="flex flex-col items-center animate-pulse">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-[#306FDB] rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-semibold">Cargando tus mensajes...</p>
         </div>
      </div>
    );
  }

  if (error) {
     return (
       <div className="min-h-[calc(100vh-80px)] bg-[#F5F5F7] flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 shadow-red-500/20 shadow-xl">
             <svg className="w-10 h-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
             </svg>
          </div>
          <h2 className="text-2xl font-black text-[#0A1930] mb-2">Ops! Hubo un problema</h2>
          <p className="text-gray-500 max-w-md">{error}</p>
       </div>
     );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F5F5F7] p-0 md:p-6 lg:p-8 font-sans flex">
      {/* Contenedor Principal */}
      <div className="w-full max-w-7xl mx-auto bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:rounded-[2.5rem] border border-gray-100 overflow-hidden flex flex-col md:flex-row h-[calc(100vh-80px)] md:h-[80vh]">
        
        {/* Panel Izquierdo: Lista de Conversaciones */}
        <div className={`md:w-1/3 lg:w-1/4 bg-gray-50 border-r border-gray-100 flex flex-col transition-all ${!isSidebarOpen && conversacionActiva ? 'hidden md:flex' : 'flex w-full'}`}>
          
          {/* Cabecera del Sidebar */}
          <div className="p-6 bg-white border-b border-gray-100 flex justify-between items-center z-10 shadow-sm">
             <h2 className="text-xl font-black text-[#0A1930] tracking-tight">Mensajes</h2>
             <div className="w-8 h-8 rounded-full bg-[#F5F5F7] flex items-center justify-center text-gray-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
             </div>
          </div>

          {/* Lista de Chats */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2 relative">
            {misConversaciones.length === 0 ? (
               <div className="p-6 text-center text-gray-400 text-sm font-semibold mt-4">
                  No tienes conversaciones activas aún.
               </div>
            ) : (
              misConversaciones.map((conv) => {
                 const peerName = getPeerName(conv);
                 const avatarInitial = peerName.charAt(0).toUpperCase();

                 return (
                  <div 
                    key={conv.id} 
                    onClick={() => {
                       setConversacionActiva(conv);
                       setIsSidebarOpen(false); // En móviles ocultará el sidebar para ver el chat
                    }}
                    className={`p-4 rounded-2xl cursor-pointer transition-all border flex items-center gap-4 ${conversacionActiva?.id === conv.id ? 'bg-white border-[#306FDB]/20 shadow-sm' : 'bg-transparent border-transparent hover:bg-gray-100/50'}`}
                  >
                     {/* Avatar */}
                     <div className="shrink-0 relative">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#306FDB] to-blue-400 flex items-center justify-center text-white font-bold text-lg">
                           {avatarInitial}
                        </div>
                     </div>

                     {/* Info */}
                     <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                           <h3 className={`text-sm font-bold truncate ${conversacionActiva?.id === conv.id ? 'text-[#306FDB]' : 'text-[#0A1930]'}`}>
                              {peerName}
                           </h3>
                           <span className="text-[10px] font-semibold text-gray-400 whitespace-nowrap ml-2">
                             {formatShortDate(conv.fecha_creacion)}
                           </span>
                        </div>
                        <p className="text-[10px] text-gray-500 truncate mt-1">Caso: <span className="font-semibold text-gray-700">{conv.caso}</span></p>
                     </div>
                  </div>
                 );
              })
            )}
          </div>
        </div>

        {/* Panel Derecho: Área de Chat */}
        <div className={`flex-1 flex flex-col bg-white ${isSidebarOpen && conversacionActiva ? 'hidden md:flex' : 'flex'}`}>
          {conversacionActiva ? (
            <>
              {/* Cabecera del Chat Activo */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white shadow-sm z-10 relative">
                 <div className="flex items-center gap-4">
                    <button 
                       onClick={() => setIsSidebarOpen(true)}
                       className="md:hidden w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
                    >
                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                       </svg>
                    </button>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#306FDB] to-blue-400 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                       {getPeerName(conversacionActiva).charAt(0).toUpperCase()}
                    </div>
                    <div>
                       <h3 className="text-lg font-black text-[#0A1930]">{getPeerName(conversacionActiva)}</h3>
                       <p className="text-xs font-semibold text-[#306FDB]">Donación: {conversacionActiva.caso}</p>
                    </div>
                 </div>

                 <div className="flex items-center gap-2">
                    <button className="w-10 h-10 rounded-full hover:bg-gray-50 text-gray-400 flex items-center justify-center transition-colors">
                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
                    </button>
                 </div>
              </div>

              {/* Área de Mensajes */}
              <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
                 {isMensajesLoading ? (
                    <div className="h-full flex items-center justify-center">
                       <div className="w-10 h-10 border-4 border-gray-200 border-t-[#306FDB] rounded-full animate-spin"></div>
                    </div>
                 ) : mensajes.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                       <div className="w-16 h-16 rounded-full bg-blue-50 text-[#306FDB] flex items-center justify-center mb-4">
                          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                       </div>
                       <h3 className="text-lg font-bold text-[#0A1930]">Conversación Iniciada</h3>
                       <p className="text-sm text-gray-500 max-w-sm mt-1">Acuerda los detalles de la donación para el caso: <strong>{conversacionActiva.caso}</strong></p>
                    </div>
                 ) : (
                    <div className="space-y-6">
                       {/* TODO: Agrupar por fechas si fuera necesario */}
                       <div className="flex justify-center">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-3 py-1 rounded-full">
                             Mensajes Recientes
                          </span>
                       </div>

                       {mensajes.map((msg) => {
                          const esMio = Number(msg.id_emisor) === Number(perfil?.id);
                          
                          return (
                             <div key={msg.id} className={`flex flex-col ${esMio ? 'items-end' : 'items-start'}`}>
                                 <div className={`max-w-[80%] md:max-w-[70%] p-3 md:p-4 rounded-2xl shadow-sm ${
                                    esMio 
                                       ? 'bg-[#306FDB] text-white rounded-tr-sm' 
                                       : 'bg-white text-gray-800 border border-gray-100 rounded-tl-sm'
                                 }`}>
                                    <p className="text-sm">{msg.contenido}</p>
                                 </div>
                                 <span className="text-[10px] font-semibold text-gray-400 mt-1.5 px-1">{formatMessageTime(msg.fecha_envio)}</span>
                             </div>
                          );
                       })}
                    </div>
                 )}
              </div>

              {/* Input Area */}
              <div className="p-4 bg-white border-t border-gray-100">
                 <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-full pr-2 pl-4 py-2 focus-within:border-[#306FDB] focus-within:ring-2 ring-[#306FDB]/20 transition-all">
                    <button className="text-gray-400 hover:text-[#306FDB] transition-colors">
                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                       </svg>
                    </button>
                    <input 
                      type="text" 
                      value={mensajeTexto}
                      onChange={(e) => setMensajeTexto(e.target.value)}
                      onKeyDown={(e) => {
                         if (e.key === 'Enter') handleEnviarMensaje();
                      }}
                      placeholder="Escribe un mensaje..."
                      className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
                      disabled={isEnviando}
                    />
                    <button 
                       onClick={handleEnviarMensaje}
                       disabled={isEnviando || !mensajeTexto.trim()}
                       className="w-10 h-10 rounded-full bg-[#306FDB] text-white flex items-center justify-center hover:bg-[#1a4b9c] transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                       {isEnviando ? (
                           <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                           </svg>
                       ) : (
                           <svg className="w-4 h-4 translate-x-[-1px] translate-y-[1px]" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                           </svg>
                       )}
                    </button>
                 </div>
              </div>
            </>
          ) : (
            /* Estado Vacio: Ningún chat seleccionado (Ocurre poco a menos que no haya chats en absoluto) */
            <div className="h-full flex flex-col items-center justify-center bg-gray-50 text-center p-6">
               <div className="w-24 h-24 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-6 text-gray-300">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
               </div>
               <h2 className="text-2xl font-black text-[#0A1930] mb-2">Tus Conversaciones</h2>
               <p className="text-gray-500 max-w-sm">Selecciona una conversación del listado izquierdo para coordinar tus apoyos en especie.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
