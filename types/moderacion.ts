export interface ReportState {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface Reporte {
  id: number;
  titulo: string;
  descripcion: string;
  usuario_reportado_nombre: string;
  usuario_reporte_nombre: string;
  estado: ReportState;
  id_usuario_reportado: number;
  id_usuario_reporte: number;
  id_estado: number;
  id_caso: number;
  evidencia1: string;
  evidencia2: string;
  evidencia3: string;
  fecha_creacion: string;
  fecha_resolucion: string;
  resolucion: string;
}

export interface ReporteListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Reporte[];
}

export interface CreateReporte {
  titulo: string;
  descripcion: string;
  id_usuario_reportado: number;
  id_usuario_reporte: number;
  id_estado: number;
  id_caso: number;
  evidencia1?: string;
  evidencia2?: string;
  evidencia3?: string;
  resolucion?: string;
}

export type ReplaceReporte = CreateReporte;
export type UpdateReporte = Partial<CreateReporte>;

export interface TipoSancion {
  id: number;
  nombre: string;
  descripcion: string;
  duracion_dias: number;
  es_activo: boolean;
}

export interface Sancion {
  id: number;
  motivo: string;
  es_activa: boolean;
  usuario_nombre: string;
  tipo: TipoSancion;
  id_usuario: number;
  id_tipo_sancion: number;
  id_reporte: number;
  fecha_inicio: string;
  fecha_fin: string;
}

export interface SancionListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Sancion[];
}

export interface CreateSancion {
  motivo: string;
  es_activa: boolean;
  id_usuario: number;
  id_tipo_sancion: number;
  id_reporte: number;
  fecha_inicio: string;
  fecha_fin: string;
}

export type ReplaceSancion = CreateSancion;
export type UpdateSancion = Partial<CreateSancion>;
