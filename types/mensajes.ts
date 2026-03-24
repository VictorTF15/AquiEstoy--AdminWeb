export interface TipoMensaje {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface MensajeBackend {
  id: number;
  contenido: string;
  es_leido: boolean;
  emisor_nombre: string;
  tipo: TipoMensaje;
  id_conversacion: number;
  id_emisor: number;
  id_tipo: number;
  fecha_envio: string;
  fecha_leido: string | null;
  adjunto: string | null;
}

export type Mensaje = MensajeBackend;

export interface MensajesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: MensajeBackend[];
}

export type MensajeListResponse = MensajesResponse;

export const getMensajesAction = async (idConversacion: number): Promise<MensajesResponse> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
  const baseUrl = API_URL.endsWith('/api') ? API_URL.replace(/\/api$/, '') : API_URL;
  // Añadiendo el id_conversacion como parámetro de consulta
  const endpoint = `${baseUrl}/api/api/mensajes/?id_conversacion=${idConversacion}`;

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
      throw new Error('Error al obtener los mensajes de la conversación.');
    }

    const data: MensajesResponse = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching mensajes para conversacion ${idConversacion}:`, error);
    throw error;
  }
};

export interface NuevoMensajePayload {
  contenido: string;
  es_leido: boolean;
  id_conversacion: number;
  id_emisor: number;
  id_tipo: number;
  fecha_leido: string | null;
  adjunto: string | null;
}

export type CreateMensaje = NuevoMensajePayload;
export type ReplaceMensaje = NuevoMensajePayload;
export type UpdateMensaje = Partial<NuevoMensajePayload>;

export const enviarMensajeAction = async (payload: NuevoMensajePayload): Promise<MensajeBackend> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
  const baseUrl = API_URL.endsWith('/api') ? API_URL.replace(/\/api$/, '') : API_URL;
  const endpoint = `${baseUrl}/api/api/mensajes/`;

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
      throw new Error(errorData?.detail || 'Error al enviar el mensaje.');
    }

    const data: MensajeBackend = await response.json();
    return data;
  } catch (error) {
    console.error(`Error enviando mensaje:`, error);
    throw error;
  }
};
