export interface EstadoCasoCatalog {
  id: number;
  nombre: string;
  descripcion: string;
  es_activo: boolean;
}

export interface EstadoOCRCatalog {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface EstadoReporteCatalog {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface TipoMensajeCatalog {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface TipoSancionCatalog {
  id: number;
  nombre: string;
  descripcion: string;
  duracion_dias: number;
  es_activo: boolean;
}

export interface TipoUsuarioCatalog {
  id: number;
  nombre: string;
  descripcion: string;
  fecha_creacion: string;
}

export interface PaginatedCatalogResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export type EstadoCasoListResponse = PaginatedCatalogResponse<EstadoCasoCatalog>;
export type EstadoOCRListResponse = PaginatedCatalogResponse<EstadoOCRCatalog>;
export type EstadoReporteListResponse = PaginatedCatalogResponse<EstadoReporteCatalog>;
export type TipoMensajeListResponse = PaginatedCatalogResponse<TipoMensajeCatalog>;
export type TipoSancionListResponse = PaginatedCatalogResponse<TipoSancionCatalog>;
export type TipoUsuarioListResponse = PaginatedCatalogResponse<TipoUsuarioCatalog>;
