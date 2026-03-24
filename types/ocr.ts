export interface OcrState {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface DocumentoOCR {
  id: number;
  tipo_documento: string;
  id_relacionado: number;
  ruta_imagen: string;
  intentos_procesamiento: number;
  nombre_extraido: string;
  apellido_paterno_extraido: string;
  apellido_materno_extraido: string;
  curp_extraida: string;
  clave_electoral_extraida: string;
  cic_extraido: string;
  ocr_id_cr_extraido: string;
  fecha_nacimiento_extraida: string;
  sexo_extraido: string;
  direccion_extraida: string;
  vigencia_extraida: string;
  confianza_ocr: string;
  datos_validados: boolean;
  fecha_validacion: string;
  notas_validacion: string;
  respuesta_ocr_completa: string;
  usuario_nombre: string;
  estado: OcrState;
  validado_por_nombre: string;
  id_usuario: number;
  id_estado: number;
  validado_por: number;
  fecha_subida: string;
  fecha_procesamiento: string;
}

export interface DocumentoOCRListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: DocumentoOCR[];
}

export interface CreateDocumentoOCR {
  tipo_documento: string;
  id_relacionado: number;
  ruta_imagen: string;
  id_usuario: number;
  id_estado: number;
}

export type ReplaceDocumentoOCR = CreateDocumentoOCR;
export type UpdateDocumentoOCR = Partial<CreateDocumentoOCR>;

export interface UploadDocumentoOCR {
  tipo_documento: string;
  id_relacionado: number;
  archivo: File;
}

export interface DocumentoOCRProcessResponse {
  id: number;
  mensaje: string;
  estado: string;
}

export interface LogOCR {
  id: number;
  id_documento_ocr: number;
  estado_anterior_nombre: string;
  estado_nuevo_nombre: string;
  mensaje: string;
  error_detalle: string;
  tiempo_procesamiento_ms: number;
  fecha_evento: string;
}

export interface LogOCRListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: LogOCR[];
}
