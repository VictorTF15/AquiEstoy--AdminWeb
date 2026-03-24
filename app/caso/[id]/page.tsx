'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCasoDetail } from '@/hooks/casos/useCasoDetail';
import { useDonar } from '@/hooks/donaciones/useDonar';
import { useCategorias } from '@/hooks/categorias/useCategorias';
import Link from 'next/link';

export default function CasoDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { caso, isLoading, error } = useCasoDetail(params?.id as string);
  const { registrarDonacion, isLoading: isDonando, error: errorDonacion, success: successDonacion } = useDonar();
  const { categorias } = useCategorias();

  // Estado del modal de donación
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donacionData, setDonacionData] = useState({
    mensaje_donador: '',
    cantidad_donacion: '',
    descripcion_donacion: '',
    id_categoria: 0
  });

  // Selector para galería simple
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    if (caso?.imagen1) setActiveImage(caso.imagen1);
  }, [caso]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex flex-col pt-20 px-4 items-center">
        <div className="w-full max-w-5xl animate-pulse">
            <div className="h-10 w-32 bg-gray-200 rounded-lg mb-8"></div>
            <div className="w-full h-[400px] bg-gray-200 rounded-3xl mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    <div className="h-12 w-3/4 bg-gray-200 rounded-xl"></div>
                    <div className="h-6 w-1/4 bg-gray-200 rounded-lg mb-6"></div>
                    <div className="space-y-3">
                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <div className="h-64 w-full bg-gray-200 rounded-3xl"></div>
                </div>
            </div>
        </div>
      </div>
    );
  }

  if (error || !caso) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-sm text-center max-w-md w-full">
            <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No se encontró el caso</h2>
            <p className="text-gray-500 mb-6">{error || 'El caso solicitado no existe o fue eliminado.'}</p>
            <button onClick={() => router.back()} className="px-6 py-3 bg-[#306FDB] text-white rounded-xl font-bold shadow-md shadow-[#306FDB]/20 hover:bg-[#2051a5] transition-colors w-full">
                Volver atrás
            </button>
        </div>
      </div>
    );
  }

  // Colección de imágenes disponibles
  const allImages = [caso.imagen1, caso.imagen2, caso.imagen3, caso.imagen4].filter(Boolean) as string[];

  const handleDonacionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDonacionData(prev => ({
      ...prev,
      [name]: name === 'id_categoria' ? parseInt(value) : value,
    }));
  };

  const handleConfirmarDonacion = async () => {
    let id_donador = 0;
    const userRaw = localStorage.getItem('user');
    if (userRaw) {
      const user = JSON.parse(userRaw);
      id_donador = user.id;
    }

    if (!id_donador) {
       alert("Debes iniciar sesión para poder apoyar este caso.");
       return;
    }

    const payload = {
      estado_donacion: "Pendiente",
      id_donador,
      id_caso: caso.id,
      fecha_compromiso: new Date().toISOString(),
      fecha_donacion: new Date().toISOString(),
      mensaje_donador: donacionData.mensaje_donador,
      id_tipo_donacion: null,
      cantidad_donacion: donacionData.cantidad_donacion || "0",
      descripcion_donacion: donacionData.descripcion_donacion,
      id_categoria: donacionData.id_categoria || (categorias.length > 0 ? categorias[0].id : 1),
    };

    const exito = await registrarDonacion(payload);
    if (exito) {
       setTimeout(() => setIsModalOpen(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-gray-900 pb-24 font-sans selection:bg-[#306FDB] selection:text-white">
      
      {/* Navbar Superior Sticky */}
      <nav className="w-full bg-[#F5F5F7]/80 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-200/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <button 
              onClick={() => router.back()} 
              className="flex items-center gap-2 text-gray-600 hover:text-[#306FDB] font-semibold transition-colors bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md border border-gray-100"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Volver
            </button>

            {/* Acciones Rápidas Opcionales para el navbar */}
            <div className="flex gap-3">
                <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-red-500 hover:border-red-200 transition-all shadow-sm">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#306FDB] hover:border-[#306FDB]/30 transition-all shadow-sm">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                </button>
            </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Sección de Imagen Hero y Galería */}
        <div className="bg-white p-2 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8 flex flex-col md:flex-row gap-2 border border-gray-100">
            {/* Imagen Principal */}
            <div className="w-full md:w-3/4 h-[300px] sm:h-[400px] lg:h-[500px] rounded-[1.5rem] overflow-hidden relative bg-gray-100 group">
                {activeImage ? (
                    <img src={activeImage} alt={caso.titulo} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-[#306FDB]/10 to-[#0A1930]/5 flex items-center justify-center">
                        <svg className="w-20 h-20 text-[#306FDB]/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
                
                {/* Status Overlay */}
                <div className="absolute top-6 right-6 z-10 flex flex-col gap-2 items-end">
                    <div className="bg-[#0A1930]/90 backdrop-blur-md text-white font-bold px-4 py-1.5 rounded-full text-sm shadow-xl border border-white/10">
                        {caso.estado?.nombre || 'Abierto'}
                    </div>
                    {caso.prioridad > 0 && (
                        <div className="bg-red-500/90 backdrop-blur-md text-white font-bold px-4 py-1.5 rounded-full text-sm shadow-xl flex items-center gap-2 border border-white/10">
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                            Prioridad: {caso.prioridad}
                        </div>
                    )}
                </div>
            </div>

            {/* Miniaturas de la Galería */}
            {allImages.length > 1 && (
                <div className="w-full md:w-1/4 flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto max-h-[500px] p-1 snap-x scrollbar-hide">
                    {allImages.map((img, idx) => (
                        <button 
                            key={idx} 
                            onClick={() => setActiveImage(img)}
                            className={`flex-shrink-0 w-24 md:w-full h-24 md:h-[calc(33.33%-0.33rem)] rounded-[1rem] overflow-hidden relative cursor-pointer snap-start transition-all duration-300 ${activeImage === img ? 'ring-4 ring-[#306FDB] ring-offset-2 scale-[0.98]' : 'hover:opacity-80'}`}
                        >
                            <img src={img} className="w-full h-full object-cover" alt={`Miniatura ${idx + 1}`} />
                        </button>
                    ))}
                </div>
            )}
        </div>

        {/* Cuerpos de Información: 2 Columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
            
            {/* Columna Izquierda (Principal) */}
            <div className="lg:col-span-2 space-y-8">
                
                {/* Título y Metadata */}
                <section className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden">
                    {/* Elemento de diseño de fondo */}
                    <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-[#306FDB] opacity-[0.03] blur-[60px] rounded-full pointer-events-none"></div>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {Array.isArray(caso.categorias) ? (
                            caso.categorias.map((cat, idx) => (
                                <span key={idx} className="bg-gray-100 text-gray-700 font-bold px-3 py-1 rounded-lg text-sm">{cat}</span>
                            ))
                        ) : (
                            <span className="bg-gray-100 text-gray-700 font-bold px-3 py-1 rounded-lg text-sm">{caso.categorias || 'General'}</span>
                        )}
                        <span className="bg-blue-50 text-[#306FDB] font-bold px-3 py-1 rounded-lg text-sm flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {caso.vistas} Vistas
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-extrabold text-[#0A1930] leading-tight mb-6 tracking-tight">
                        {caso.titulo}
                    </h1>

                    <div className="flex items-center gap-2 text-gray-500 bg-gray-50 p-4 rounded-xl font-medium inline-flex mb-8">
                        <svg className="w-5 h-5 text-[#306FDB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{caso.colonia}, {caso.entidad}</span>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <svg className="w-6 h-6 text-[#306FDB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                            Descripción del Caso
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">
                            {caso.descripcion}
                        </p>
                    </div>

                    <div className="mt-10 pt-8 border-t border-gray-100 flex gap-4 text-sm text-gray-400">
                        <span>Creado: {new Date(caso.fecha_creacion).toLocaleDateString()}</span>
                        {caso.fecha_publicacion && <span>• Publicado: {new Date(caso.fecha_publicacion).toLocaleDateString()}</span>}
                    </div>
                </section>
                
                {/* Aquí podrías agregar en el futuro más información, ej: actualizaciones del caso, lista de voluntarios, etc. */}
            </div>

            {/* Columna Derecha (Sidebar: Beneficiario y Acciones) */}
            <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                    
                    {/* Botón de Acción Call To Action (Donar/Postularse) */}
                    <div className="bg-gradient-to-br from-[#0A1930] to-[#122b54] p-8 rounded-3xl shadow-xl border border-blue-900/30 text-center relative overflow-hidden">
                        {/* Glow circular abstracto */}
                        <div className="absolute top-[-20%] right-[-20%] w-32 h-32 bg-[#306FDB] rounded-full blur-[40px] opacity-60"></div>

                        <h3 className="text-white font-bold text-2xl mb-2 relative z-10">¿Deseas ayudar?</h3>
                        <p className="text-blue-200 text-sm mb-6 relative z-10 leading-relaxed">Únete y brinda tu apoyo. Las personas te necesitan ahora.</p>
                        
                        <button 
                           onClick={() => setIsModalOpen(true)}
                           className="relative z-10 w-full bg-[#306FDB] hover:bg-[#2051a5] hover:shadow-[0_0_20px_rgba(48,111,219,0.5)] transition-all duration-300 transform active:scale-95 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            Apoyar este caso
                        </button>
                    </div>

                    {/* Ficha Beneficiario */}
                    {caso.beneficiario && (
                        <div className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Información de contacto</h4>
                            
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-2xl bg-[#F5F5F7] overflow-hidden flex items-center justify-center border-2 border-white shadow-md rounded-full">
                                    {caso.beneficiario.imagen_perfil ? (
                                        <img src={caso.beneficiario.imagen_perfil} alt={caso.beneficiario.nombres} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-xl font-black text-[#0A1930]">{caso.beneficiario.nombres.charAt(0)}{caso.beneficiario.apellido_paterno.charAt(0)}</span>
                                    )}
                                </div>
                                <div>
                                    <p className="font-extrabold text-xl text-gray-900">{caso.beneficiario.nombres} {caso.beneficiario.apellido_paterno}</p>
                                    <p className="text-sm text-[#306FDB] font-semibold">{caso.beneficiario.tipo_usuario?.nombre || 'Beneficiario'}</p>
                                </div>
                            </div>
                            
                            {/* Insignia de cuenta verificada */}
                            {caso.beneficiario.verificado && (
                                <div className="bg-green-50 rounded-xl p-3 flex items-center gap-3 mb-6 border border-green-100">
                                    <div className="bg-green-500 text-white rounded-full p-1">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-bold text-green-700">Identidad Verificada</span>
                                </div>
                            )}

                            <div className="space-y-4">
                                {caso.beneficiario.telefono && (
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#306FDB]">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <a href={`tel:${caso.beneficiario.telefono}`} className="font-semibold hover:text-[#306FDB] transition-colors">{caso.beneficiario.telefono}</a>
                                    </div>
                                )}
                                
                                {caso.beneficiario.correo && (
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#306FDB]">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <a href={`mailto:${caso.beneficiario.correo}`} className="font-semibold text-sm hover:text-[#306FDB] transition-colors line-clamp-1">{caso.beneficiario.correo}</a>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>

      </main>

      {/* MODAL DE DONACIÓN OVERLAY */}
      {isModalOpen && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A1930]/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-[2rem] p-8 max-w-xl w-full shadow-2xl relative border border-white max-h-[90vh] overflow-y-auto">
               <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
               >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
               </button>

               {successDonacion ? (
                  <div className="text-center py-10">
                     <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                     </div>
                     <h3 className="text-2xl font-black text-[#0A1930] mb-2">¡Gracias por tu apoyo!</h3>
                     <p className="text-gray-500 font-medium">Hemos registrado tu compromiso. El beneficiario ha sido notificado.</p>
                  </div>
               ) : (
                  <>
                     <h2 className="text-2xl font-black text-[#0A1930] mb-2 pr-8 leading-tight">Registra tu Apoyo</h2>
                     <p className="text-sm font-medium text-gray-500 mb-8 border-b border-gray-100 pb-4">Por favor completa esta información para notificar al beneficiario.</p>

                     {errorDonacion && (
                        <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 text-sm font-semibold border border-red-100">
                           {errorDonacion}
                        </div>
                     )}

                     {/* Banner Ilustrativo */}
                     <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-blue-100/50 flex flex-col md:flex-row items-center gap-6">
                        <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center shrink-0 border border-blue-100">
                           <span className="text-4xl text-center">📦</span>
                        </div>
                        <div>
                           <h3 className="text-[#0A1930] font-black text-lg mb-1">Tu ayuda en especie hace la diferencia</h3>
                           <p className="text-sm text-gray-500 font-medium leading-relaxed">
                              Todo suma: ropa en buen estado, alimentos no perecederos, medicinas selladas o artículos de higiene. Gracias por compartir lo tienes.
                           </p>
                        </div>
                     </div>

                     <div className="space-y-6 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">¿En qué categoría clasifica tu ayuda?</label>
                              <select 
                                 name="id_categoria" 
                                 value={donacionData.id_categoria} 
                                 onChange={handleDonacionChange}
                                 className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#306FDB]/20 bg-gray-50 outline-none transition-all"
                              >
                                 <option value={0}>Selecciona una categoría...</option>
                                 {categorias.map((cat: any) => (
                                    <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                                 ))}
                              </select>
                           </div>
                           <div>
                              <label className="block text-sm font-bold text-gray-700 mb-2">Monto de donación</label>
                              <input 
                                type="text" 
                                name="cantidad_donacion" 
                                value={donacionData.cantidad_donacion} 
                                onChange={handleDonacionChange} 
                                placeholder="Ej: $100, $500..." 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#306FDB]/20 bg-gray-50 outline-none transition-all" 
                              />
                           </div>
                        </div>

                        <div>
                           <label className="block text-sm font-bold text-gray-700 mb-2">Descripción Detallada de los Artículos</label>
                           <textarea 
                             name="descripcion_donacion" 
                             value={donacionData.descripcion_donacion} 
                             onChange={handleDonacionChange} 
                             rows={2} 
                             placeholder="Ej: Zapatos talla 4 y 5 para niño, 5 latas de atún, ropa de invierno..." 
                             className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#306FDB]/20 bg-gray-50 outline-none transition-all resize-none"
                           ></textarea>
                        </div>
                        
                        <div>
                           <label className="block text-sm font-bold text-gray-700 mb-2">Mensaje Privado para el Beneficiario (Opcional)</label>
                           <textarea 
                             name="mensaje_donador" 
                             value={donacionData.mensaje_donador} 
                             onChange={handleDonacionChange} 
                             rows={3} 
                             placeholder="Escribe unas palabras de apoyo y cariño..." 
                             className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#306FDB]/20 bg-gray-50 outline-none transition-all resize-none"
                           ></textarea>
                        </div>

                        <div className="pt-2">
                           <button 
                              onClick={handleConfirmarDonacion}
                              disabled={isDonando || !donacionData.descripcion_donacion || donacionData.id_categoria === 0}
                              className="w-full bg-gradient-to-r from-[#0A1930] to-[#122b54] hover:from-[#306FDB] hover:to-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]"
                           >
                              {isDonando ? (
                                 <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              ) : (
                                 <>
                                   <span>Confirmar Entrega de Ayuda</span>
                                   <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                 </>
                              )}
                           </button>
                        </div>
                     </div>
                  </>
               )}
            </div>
         </div>
      )}

    </div>
  );
}
