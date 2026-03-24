export interface ConversacionBackend {
  id: number;
  usuario1_nombre: string;
  usuario2_nombre: string;
  caso: string;
  id_usuario1: number;
  id_usuario2: number;
  id_caso: number;
  fecha_creacion: string;
  esta_activa: boolean;
}

export type Conversacion = ConversacionBackend;

export interface ConversacionesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ConversacionBackend[];
}

export type ConversacionListResponse = ConversacionesResponse;

export const getConversacionesAction = async (urlOverride?: string | null): Promise<ConversacionesResponse> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
  const baseUrl = API_URL.endsWith('/api') ? API_URL.replace(/\/api$/, '') : API_URL;
  const endpoint = urlOverride ? urlOverride : `${baseUrl}/api/api/conversaciones/`;

  try {
    const access = localStorage.getItem('access');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (access) {
      headers['Authorization'] = `Bearer ${access}`;
    }

    const response = await fetch(endpoint, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error('Error al obtener la lista de conversaciones.');
    }

    const data: ConversacionesResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching conversaciones:', error);
    throw error;
  }
};

export interface CrearConversacionPayload {
  id_usuario1: number; // Receptor
  id_usuario2: number; // Emisor
  id_caso: number;
  esta_activa: boolean;
}

export type CreateConversacion = CrearConversacionPayload;
export type ReplaceConversacion = CrearConversacionPayload;
export type UpdateConversacion = Partial<CrearConversacionPayload>;

export const crearConversacionAction = async (payload: CrearConversacionPayload): Promise<ConversacionBackend> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
  const baseUrl = API_URL.endsWith('/api') ? API_URL.replace(/\/api$/, '') : API_URL;
  const endpoint = `${baseUrl}/api/api/conversaciones/`;

  try {
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
      const errorData = await response.json().catch(() => null);
      console.error("Backend error response:", errorData);
      const errorStr = errorData ? JSON.stringify(errorData) : 'Error al crear o recuperar la conversación.';
      throw new Error(errorData?.detail || errorStr);
    }

    const data: ConversacionBackend = await response.json();
    return data;
  } catch (error) {
    console.error('Error creando conversación:', error);
    throw error;
  }
};
