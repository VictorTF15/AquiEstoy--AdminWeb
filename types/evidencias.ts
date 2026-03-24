export interface EvidenciaPayload {
  titulo: string;
  descripcion: string;
  usuario: string;
  caso: string;
  id_usuario: number;
  id_caso: number;
  fecha_creacion: string;
  es_publico: boolean;
  imagen1?: string;
  imagen2?: string;
}

export type CreateEvidencia = EvidenciaPayload;
export type ReplaceEvidencia = EvidenciaPayload;
export type UpdateEvidencia = Partial<EvidenciaPayload>;

export interface EvidenciaResponse {
  id: number;
  titulo: string;
  descripcion: string;
  usuario: string;
  caso: string;
  id_usuario: number;
  id_caso: number;
  fecha_creacion: string;
  es_publico: boolean;
  imagen1?: string;
  imagen2?: string;
}

export type Evidencia = EvidenciaResponse;

export interface EvidenciaListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Evidencia[];
}

export const crearEvidenciaAction = async (payload: EvidenciaPayload): Promise<EvidenciaResponse> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
  const baseUrl = API_URL.endsWith('/api') ? API_URL.replace(/\/api$/, '') : API_URL;
  const endpoint = `${baseUrl}/api/api/evidencias/`;

  const access = localStorage.getItem('access');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (access) {
    headers['Authorization'] = `Bearer ${access}`;
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || errorData.error || 'No se pudo subir la evidencia.');
  }

  return await response.json();
};
