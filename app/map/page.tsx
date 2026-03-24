'use client';

import React, { useState } from 'react';
import { useCasosMapa } from '@/hooks/casos/useCasosMapa';
import { CasoMapa } from '../../types/casos';
import { Map, MapMarker, MarkerContent, MarkerPopup, MapControls } from '@/components/ui/map';
import Link from 'next/link';

export default function MapPage() {
  const { casosMapa, isLoading, error } = useCasosMapa();
  const [activeId, setActiveId] = useState<number | null>(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Usamos el centro de México por defecto
  const defaultCenter = [-99.1332, 19.4326];

  return (
    <div className="relative w-full h-[calc(100vh-5rem)] bg-[#F5F5F7]">
            <button
                type="button"
                onClick={() => setIsPanelOpen((prev) => !prev)}
                className="absolute top-24 left-6 z-30 hidden lg:flex items-center gap-2 rounded-2xl bg-white/95 px-4 py-2.5 shadow-lg border border-gray-200 text-[#0A1930] font-semibold"
            >
                {isPanelOpen ? 'Ocultar casos' : 'Ver casos'}
            </button>

            <div className={`absolute top-40 left-6 z-20 w-80 max-h-[calc(100vh-10rem)] hidden lg:flex flex-col bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/50 overflow-hidden transition-all duration-200 ${isPanelOpen ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
        <div className="p-6 bg-gradient-to-b from-white to-transparent pb-4 border-b border-gray-100">
                        <h1 className="text-2xl font-extrabold text-[#0A1930] leading-tight">Casos</h1>
                        <p className="text-sm text-gray-400 mt-1">{casosMapa.length} casos activos.</p>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-hide">
            {isLoading ? (
               <div className="flex flex-col gap-3">
                   {[1,2,3].map(i => (
                       <div key={i} className="h-24 bg-gray-100/50 rounded-2xl animate-pulse"></div>
                   ))}
               </div> 
            ) : error ? (
                <div className="text-sm text-red-500 text-center p-4 bg-red-50 rounded-xl">{error}</div>
            ) : (
                casosMapa.map((caso) => (
                    <button 
                        key={`sidebar-item-${caso.id}`}
                        onClick={() => setActiveId(caso.id)}
                        className={`w-full text-left p-4 rounded-2xl transition-all duration-300 border ${activeId === caso.id ? 'bg-[#306FDB] border-[#306FDB] shadow-lg shadow-[#306FDB]/20 translate-x-1' : 'bg-white hover:bg-gray-50 border-gray-100 hover:border-[#306FDB]/30'}`}
                    >
                        <h4 className={`font-bold text-sm line-clamp-2 ${activeId === caso.id ? 'text-white' : 'text-gray-900'}`}>{caso.titulo}</h4>
                        <div className={`mt-2 flex items-center justify-between text-xs font-semibold ${activeId === caso.id ? 'text-blue-200' : 'text-gray-500'}`}>
                            <span>Prioridad: {caso.prioridad}</span>
                            <span className="flex items-center gap-1">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Mapa
                            </span>
                        </div>
                    </button>
                ))
            )}
        </div>
      </div>

      {/* Área del Mapa Full Screen */}
      <div className="absolute inset-0 w-full h-full z-10">
        <Map
            persistKey="admin-map-main"
            viewport={{
                center: casosMapa.length > 0 && !isNaN(casosMapa[0].longitud) ? [casosMapa[0].longitud, casosMapa[0].latitud] : defaultCenter as [number, number],
                zoom: 5,
                pitch: 45
            }}
            theme="light"
            className="w-full h-full"
        >
            {!isLoading && !error && casosMapa.map((caso: CasoMapa) => {
                const lat = parseFloat(caso.latitud.toString());
                const lng = parseFloat(caso.longitud.toString());
                if (isNaN(lat) || isNaN(lng)) return null;

                const isHighestPriority = caso.prioridad >= 5;

                return (
                    <MapMarker
                        key={`map-pin-${caso.id}`}
                        longitude={lng}
                        latitude={lat}
                        onClick={() => setActiveId(caso.id)}
                    >
                        <MarkerContent>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-[3px] shadow-xl hover:scale-125 transition-transform cursor-pointer relative ${isHighestPriority ? 'bg-gradient-to-br from-red-500 to-red-600 border-white shadow-red-500/40 z-50' : 'bg-gradient-to-br from-[#306FDB] to-blue-400 border-white shadow-[#306FDB]/40'} ${activeId === caso.id ? 'scale-125 ring-4 ring-white ring-offset-2' : ''}`}>
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {isHighestPriority && (
                                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 border-2 border-white rounded-full animate-ping"></span>
                                )}
                            </div>
                        </MarkerContent>
                        <MarkerPopup className="w-72 p-1 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl bg-white border border-gray-100" closeButton>
                            <div className="p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    {isHighestPriority && (
                                        <span className="bg-red-50 text-red-600 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider border border-red-100">
                                            Urgente
                                        </span>
                                    )}
                                    <span className="bg-blue-50 text-[#306FDB] text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider border border-blue-100">
                                        Prioridad {caso.prioridad}
                                    </span>
                                </div>
                                <h4 className="font-black text-[#0A1930] text-lg leading-tight mb-4">{caso.titulo}</h4>
                                <Link href={`/caso/${caso.id}`} className="flex items-center justify-center gap-2 w-full bg-[#0A1930] hover:bg-[#306FDB] text-white text-sm py-3 rounded-2xl font-bold transition-all hover:shadow-[0_4px_15px_rgba(48,111,219,0.3)] hover:-translate-y-0.5">
                                    Conocer Caso
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </div>
                        </MarkerPopup>
                    </MapMarker>
                );
            })}
            <MapControls position="bottom-right" showZoom showCompass showFullscreen className="mb-24 lg:mb-4 mr-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border-white/50" />
        </Map>
      </div>
      
      {/* Indicador de carga central en formato Premium */}
      {isLoading && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#F5F5F7]/80 backdrop-blur-sm">
             <div className="bg-white p-6 rounded-3xl shadow-xl flex flex-col items-center">
                 <div className="w-12 h-12 border-4 border-gray-100 border-t-[#306FDB] rounded-full animate-spin mb-4"></div>
                 <p className="font-bold text-[#0A1930]">Cargando el mapa global...</p>
                 <p className="text-xs text-gray-400 mt-1">Ubicando casos para ayudar</p>
             </div>
          </div>
      )}
        </div>
    );
}