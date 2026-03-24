'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCrearCaso } from '@/hooks/casos/useCrearCaso';
import { useCategorias } from '@/hooks/categorias/useCategorias';
import { useUsuarios } from '@/hooks/Usuarios/useBuscarUsuarios';
import { Usuario } from '../../types/usuarios';
import { CrearCasoPayload } from '../../types/casos';
import { Map, MapMarker, MarkerContent, MapControls } from '@/components/ui/map';

export default function CrearCasoPage() {
  const router = useRouter();
  const { crearCaso, isLoading, error, success } = useCrearCaso();
  const { categorias, isLoading: isLoadingCategorias } = useCategorias();
  const { usuariosDisp, isLoading: isCargandoUsuarios } = useUsuarios();
  
  const [selectedCategorias, setSelectedCategorias] = useState<number[]>([]);
  const [busquedaUsuario, setBusquedaUsuario] = useState('');
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);
  
  const [isBuscandoUbicacion, setIsBuscandoUbicacion] = useState(false);
  const [errorUbicacion, setErrorUbicacion] = useState<string | null>(null);

  // Filtrado local
  const usuarios = React.useMemo(() => {
    if (!busquedaUsuario || busquedaUsuario.length < 2 || usuarioSeleccionado) return [];
    const term = busquedaUsuario.toLowerCase();
    return usuariosDisp.filter((u: Usuario) => 
      u.tipo_usuario?.nombre === 'Beneficiario' && (
        u.nombres.toLowerCase().includes(term) || 
        (u.apellido_paterno && u.apellido_paterno.toLowerCase().includes(term)) ||
        u.correo.toLowerCase().includes(term)
      )
    );
  }, [busquedaUsuario, usuariosDisp, usuarioSeleccionado]);

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    calle: "",
    numero: "",
    colonia: "",
    entidad: "",
    latitud: "",
    longitud: "",
    prioridad: 1,
    id_beneficiario: 0,
    id_estado: 0,
    imagen1: null as File | null,
    imagen2: null as File | null,
    imagen3: null as File | null,
    imagen4: null as File | null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleDragEnd = (lngLat: { lng: number; lat: number }) => {
    setFormData(prev => ({
      ...prev,
      latitud: lngLat.lat.toFixed(7),
      longitud: lngLat.lng.toFixed(7)
    }));
  };

  const procesarDireccion = async () => {
    if (!formData.entidad && !formData.colonia) return;
    setIsBuscandoUbicacion(true);
    setErrorUbicacion(null);
    try {
      // Concatenar campos disponibles para mayor precesión del geocoder
      const componentes = [];
      if (formData.calle) componentes.push(formData.calle);
      if (formData.numero) componentes.push(formData.numero);
      if (formData.colonia) componentes.push(formData.colonia);
      if (formData.entidad) componentes.push(formData.entidad);
      componentes.push("Mexico");
      
      const query = encodeURIComponent(componentes.join(', '));
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`);
      const data = await res.json();
      
      if (data && data.length > 0) {
         setFormData(prev => ({
           ...prev,
           latitud: data[0].lat,
           longitud: data[0].lon
         }));
      } else {
         setErrorUbicacion("No pudimos encontrar esta ubicación, por favor mueve el pin manualmente.");
      }
    } catch (e) {
      setErrorUbicacion("Error de red al buscar ubicación.");
    } finally {
      setIsBuscandoUbicacion(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parseo de los datos obligatorios para el payload
    const payload: CrearCasoPayload = {
      ...formData,
      latitud: formData.latitud || "-",
      longitud: formData.longitud || "-",
      prioridad: Number(formData.prioridad),
      id_beneficiario: Number(formData.id_beneficiario),
      id_estado: Number(formData.id_estado),
      categorias_ids: selectedCategorias.length > 0 ? selectedCategorias : [0]
    };

    const result = await crearCaso(payload);
    
    if (result) {
      setTimeout(() => {
        router.push('/home'); // o router.push(`/caso/${result.id}`)
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Cabecera de Página */}
        <div className="text-center mb-10">
          <h1 className="text-4xl tracking-tight font-extrabold text-[#0A1930] mb-2">Crear Nuevo Caso</h1>
          <p className="text-lg text-gray-500">Publica una necesidad o situación de ayuda para conectarla con donadores.</p>
        </div>

        {/* Alertas */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
             <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
             </div>
             <div>
                <h3 className="text-sm font-bold text-red-800">Error al publicar</h3>
                <p className="text-sm text-red-600">{error}</p>
             </div>
          </div>
        )}

        {success && (
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
             </div>
             <div>
                <h3 className="text-sm font-bold text-green-800">¡Caso creado exitosamente!</h3>
                <p className="text-sm text-green-600">Redirigiendo a tu nuevo caso...</p>
             </div>
          </div>
        )}

        {/* Contenedor del Formulario */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="divide-y divide-gray-100">
            
            {/* SECCIÓN 1: Información General */}
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-8 h-8 rounded-lg bg-[#306FDB]/10 flex items-center justify-center text-[#306FDB]">
                    1
                 </div>
                 <h2 className="text-xl font-bold text-[#0A1930]">Información General</h2>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="titulo" className="block text-sm font-semibold text-gray-700 mb-2">Título del Caso</label>
                  <input type="text" name="titulo" id="titulo" required value={formData.titulo} onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#306FDB]/20 focus:border-[#306FDB] bg-white text-gray-900 transition-colors shadow-sm outline-none" placeholder="Ej: Familia necesita despensa..." />
                </div>
                <div>
                  <label htmlFor="descripcion" className="block text-sm font-semibold text-gray-700 mb-2">Descripción Detallada</label>
                  <textarea name="descripcion" id="descripcion" rows={4} required value={formData.descripcion} onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#306FDB]/20 focus:border-[#306FDB] bg-white text-gray-900 transition-colors shadow-sm outline-none" placeholder="Describe a profundidad la necesidad de este caso..."></textarea>
                </div>
              </div>
            </div>

            {/* SECCIÓN 2: Ubicación Geográfica */}
            <div className="bg-gray-50/50 p-8 md:p-10">
              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-lg bg-[#306FDB]/10 flex items-center justify-center text-[#306FDB]">
                        2
                     </div>
                     <h2 className="text-xl font-bold text-[#0A1930]">Ubicación Geográfica</h2>
                 </div>
                 <span className="text-xs font-semibold text-[#306FDB] bg-[#306FDB]/10 px-3 py-1 rounded-full border border-[#306FDB]/20">Mueve el pin en el mapa</span>
              </div>
              
              {errorUbicacion && (
                 <div className="mb-4 text-sm text-amber-700 bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    {errorUbicacion}
                 </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label htmlFor="calle" className="block text-sm font-semibold text-gray-700 mb-2">Calle</label>
                  <input type="text" name="calle" id="calle" value={formData.calle} onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#306FDB]/20 focus:border-[#306FDB] bg-white text-gray-900 shadow-sm outline-none transition-colors" placeholder="Ej: Av. Reforma" />
                </div>
                <div>
                  <label htmlFor="numero" className="block text-sm font-semibold text-gray-700 mb-2">Número Ext/Int</label>
                  <input type="text" name="numero" id="numero" value={formData.numero} onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#306FDB]/20 focus:border-[#306FDB] bg-white text-gray-900 shadow-sm outline-none transition-colors" placeholder="Ej: 123-A" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-[1fr,1fr,auto] gap-6 mb-8 items-end">
                <div>
                  <label htmlFor="colonia" className="block text-sm font-semibold text-gray-700 mb-2">Colonia / Localidad</label>
                  <input type="text" name="colonia" id="colonia" required value={formData.colonia} onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#306FDB]/20 focus:border-[#306FDB] bg-white text-gray-900 shadow-sm outline-none transition-colors" placeholder="Ej: Santa Margarita" />
                </div>
                <div>
                  <label htmlFor="entidad" className="block text-sm font-semibold text-gray-700 mb-2">Entidad / Estado</label>
                  <input type="text" name="entidad" id="entidad" required value={formData.entidad} onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#306FDB]/20 focus:border-[#306FDB] bg-white text-gray-900 shadow-sm outline-none transition-colors" placeholder="Ej: Puebla" />
                </div>
                <div className="pb-0 w-full">
                  <button 
                     type="button" 
                     onClick={procesarDireccion}
                     disabled={isBuscandoUbicacion || (!formData.entidad && !formData.colonia)}
                     className="h-[50px] w-full px-6 rounded-xl bg-[#0A1930] hover:bg-[#306FDB] hover:-translate-y-0.5 text-white font-bold transition-all shadow-lg flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none"
                  >
                     {isBuscandoUbicacion ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                     ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                     )}
                     Localizar
                  </button>
                </div>
              </div>

              {/* Mapa de Selección */}
              <div className="w-full h-[400px] bg-gray-100 rounded-2xl overflow-hidden shadow-sm border border-gray-200 mb-4 relative z-10">
                  <Map
                    key={formData.latitud + "-" + formData.longitud}
                    viewport={{
                        center: [
                            formData.longitud ? parseFloat(formData.longitud as string) : -99.1332,
                            formData.latitud ? parseFloat(formData.latitud as string) : 19.4326
                        ],
                        zoom: formData.latitud ? 14 : 5
                    }}
                    theme="light"
                  >
                      <MapMarker
                          longitude={formData.longitud ? parseFloat(formData.longitud as string) : -99.1332}
                          latitude={formData.latitud ? parseFloat(formData.latitud as string) : 19.4326}
                          draggable={true}
                          onDragEnd={handleDragEnd}
                      >
                          <MarkerContent>
                              <div className="flex flex-col items-center select-none cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
                                  <div className="w-10 h-10 bg-gradient-to-br from-[#306FDB] to-blue-400 rounded-full border-2 border-white flex items-center justify-center shadow-xl z-10 relative">
                                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                      </svg>
                                  </div>
                                  <div className="w-4 h-1 bg-black/20 blur-[2px] rounded-full -mt-1"></div>
                              </div>
                          </MarkerContent>
                      </MapMarker>
                      <MapControls position="bottom-right" showZoom showLocate showCompass />
                  </Map>
              </div>
            </div>

            {/* SECCIÓN 3: Detalles Técnicos e Identificadores */}
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-8 h-8 rounded-lg bg-[#306FDB]/10 flex items-center justify-center text-[#306FDB]">
                    3
                 </div>
                 <h2 className="text-xl font-bold text-[#0A1930]">Metadatos & Prioridad</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="prioridad" className="block text-sm font-semibold text-gray-700 mb-2">Nivel de Prioridad (1 a 5)</label>
                  <select name="prioridad" id="prioridad" value={formData.prioridad} onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#306FDB]/20 focus:border-[#306FDB] bg-white text-gray-900 shadow-sm outline-none">
                     <option value={1}>1 - Baja</option>
                     <option value={2}>2 - Media Baja</option>
                     <option value={3}>3 - Media</option>
                     <option value={4}>4 - Alta</option>
                     <option value={5}>5 - Crítica / Urgente</option>
                  </select>
                </div>
                
                {/* Selector Múltiple de Categorías */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Clasificación de Necesidad (Categorías) <span className="text-gray-400 font-normal ml-1">Selecciona una o más</span>
                  </label>
                  
                  {isLoadingCategorias ? (
                    <div className="flex gap-2 flex-wrap animate-pulse">
                        {[1, 2, 3, 4].map(i => <div key={i} className="w-24 h-10 bg-gray-200 rounded-xl"></div>)}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-3">
                      {categorias.filter(c => c.es_activo).map(cat => {
                         const isSelected = selectedCategorias.includes(cat.id);
                         return (
                           <button
                             type="button"
                             key={`cat-${cat.id}`}
                             onClick={() => {
                                 setSelectedCategorias(prev => 
                                    prev.includes(cat.id) 
                                      ? prev.filter(id => id !== cat.id)
                                      : [...prev, cat.id]
                                 );
                             }}
                             className={`px-4 py-2.5 rounded-xl border font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#306FDB]/50 ${
                                isSelected 
                                  ? 'bg-[#306FDB] text-white border-[#306FDB] shadow-md shadow-[#306FDB]/20 scale-105'
                                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#306FDB]/30 hover:bg-gray-50'
                             }`}
                           >
                             {cat.nombre}
                           </button>
                         )
                      })}
                      {categorias.length === 0 && !isLoadingCategorias && (
                          <span className="text-sm text-gray-500 italic">No hay categorías disponibles.</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Buscador de Usuarios Inteligente (Beneficiario) */}
                <div className="relative">
                  <label htmlFor="busquedaUsuario" className="block text-sm font-semibold text-gray-700 mb-2">Asignar al Beneficiario (Buscar por Nombre/Correo)</label>
                  <div className="relative">
                      {usuarioSeleccionado && (
                        <button 
                          type="button" 
                          onClick={() => {
                              setUsuarioSeleccionado(null);
                              setBusquedaUsuario('');
                              setFormData(prev => ({...prev, id_beneficiario: 0}));
                          }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors z-10"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                      
                      <input 
                        type="text" 
                        id="busquedaUsuario" 
                        autoComplete="off"
                        value={usuarioSeleccionado ? `${usuarioSeleccionado.nombres} ${usuarioSeleccionado.apellido_paterno || ''}` : busquedaUsuario}
                        onChange={(e) => {
                            if (!usuarioSeleccionado) {
                                setBusquedaUsuario(e.target.value);
                            }
                        }}
                        readOnly={!!usuarioSeleccionado}
                        className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 shadow-sm transition-all
                          ${usuarioSeleccionado 
                             ? 'bg-[#306FDB]/5 border-[#306FDB]/30 text-[#0A1930] font-bold focus:ring-[#306FDB] ring-inset ring-2 ring-[#306FDB]/10' 
                             : 'border-gray-200 focus:ring-[#306FDB]/20 focus:border-[#306FDB] bg-white text-gray-900'}`
                        }
                        placeholder={usuarioSeleccionado ? "" : "Escribe para buscar un usuario..."} 
                      />
                      
                      {isCargandoUsuarios && !usuarioSeleccionado && (
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                              <div className="w-4 h-4 border-2 border-gray-300 border-t-[#306FDB] rounded-full animate-spin"></div>
                          </div>
                      )}
                  </div>
                  
                  {/* Dropdown de Resultados */}
                  {usuarios.length > 0 && !usuarioSeleccionado && (
                      <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-100 max-h-64 overflow-y-auto animate-in fade-in slide-in-from-top-2">
                          {usuarios.map((usr: Usuario) => (
                              <button
                                key={`user-search-${usr.id}`}
                                type="button"
                                onClick={() => {
                                    setUsuarioSeleccionado(usr);
                                    setBusquedaUsuario(usr.nombres);
                                    setFormData(prev => ({...prev, id_beneficiario: usr.id}));
                                }}
                                className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 flex items-center gap-3 transition-colors"
                              >
                                  <div className="w-8 h-8 rounded-full bg-[#0A1930] text-white flex items-center justify-center text-xs font-bold uppercase overflow-hidden shrink-0">
                                      {usr.nombres.charAt(0)}{usr.apellido_paterno ? usr.apellido_paterno.charAt(0) : ''}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                      <p className="text-sm font-bold text-gray-900 truncate">{usr.nombres} {usr.apellido_paterno} {usr.apellido_materno}</p>
                                      <p className="text-xs text-gray-500 truncate">{usr.correo}</p>
                                  </div>
                                  <div className="shrink-0 text-xs font-semibold text-[#306FDB] bg-[#306FDB]/10 px-2 py-1 rounded-md">
                                      ID: {usr.id}
                                  </div>
                              </button>
                          ))}
                      </div>
                  )}
                  {busquedaUsuario.length > 2 && usuarios.length === 0 && !isCargandoUsuarios && !usuarioSeleccionado && (
                      <div className="absolute z-50 mt-2 w-full bg-white p-4 rounded-xl shadow-xl border border-gray-100 text-sm text-gray-500 text-center">
                          No se encontraron usuarios coincidentes.
                      </div>
                  )}
                </div>

                <div>
                  <label htmlFor="id_estado" className="block text-sm font-semibold text-gray-700 mb-2">ID del Estado (Status)</label>
                  <input type="number" name="id_estado" id="id_estado" required value={formData.id_estado} onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#306FDB]/20 focus:border-[#306FDB] bg-white text-gray-900 shadow-sm outline-none" placeholder="0" />
                </div>
              </div>
            </div>

            {/* SECCIÓN 4: Media */}
            <div className="bg-gray-50/50 p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-8 h-8 rounded-lg bg-[#306FDB]/10 flex items-center justify-center text-[#306FDB]">
                    4
                 </div>
                 <h2 className="text-xl font-bold text-[#0A1930]">Evidencia Fotográfica</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((num) => {
                  const imageValue = formData[`imagen${num}` as keyof typeof formData];
                  return (
                    <div key={`img-input-${num}`}>
                      <label htmlFor={`imagen${num}`} className="block text-sm font-semibold text-gray-700 mb-2">
                        Subir Imagen {num} {num === 1 ? '(Principal)' : ''}
                      </label>
                      <input 
                        type="file" 
                        name={`imagen${num}`} 
                        id={`imagen${num}`} 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#306FDB]/20 focus:border-[#306FDB] bg-white text-gray-900 shadow-sm outline-none file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#306FDB]/10 file:text-[#306FDB] hover:file:bg-[#306FDB]/20 file:cursor-pointer transition-all" 
                      />
                      {imageValue instanceof File && (
                        <p className="text-xs text-green-600 mt-2 font-medium flex items-center gap-1">
                           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                           </svg>
                           Archivo listo: {imageValue.name}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Acciones */}
            <div className="p-8 md:p-10 bg-white flex items-center justify-end gap-4">
               <button type="button" onClick={() => router.back()} className="px-6 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors">
                 Cancelar
               </button>
               <button 
                 type="submit" 
                 disabled={isLoading || success}
                 className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white transition-all shadow-lg ${isLoading || success ? 'bg-gray-400 cursor-not-allowed shadow-none' : 'bg-gradient-to-r from-[#306FDB] to-blue-500 hover:shadow-[#306FDB]/30 hover:-translate-y-0.5'}`}
               >
                 {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creando...
                    </>
                 ) : success ? (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      ¡Publicado!
                    </>
                 ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                      </svg>
                      Publicar Caso
                    </>
                 )}
               </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
