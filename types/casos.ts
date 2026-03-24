export interface TipoUsuario {
  id: number;
  nombre: string;
  descripcion: string;
  fecha_creacion: string;
}

export interface Beneficiario {
  id: number;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  correo: string;
  telefono: string;
  tipo_usuario: TipoUsuario;
  ciudad: string;
  estado: string;
  colonia: string;
  direccion: string;
  codigo_postal: string;
  imagen_perfil: string;
  esta_activo: boolean;
  verificado: boolean;
  fecha_registro: string;
  imagen_ine_frontal_url: string;
  imagen_ine_trasera_url: string;
  ultimo_acceso: string;
}

export interface EstadoCaso {
  id: number;
  nombre: string;
  descripcion: string;
  es_activo: boolean;
}

export interface Caso {
  id: number;
  titulo: string;
  descripcion: string;
  colonia: string;
  entidad: string;
  latitud: string;
  longitud: string;
  esta_abierto: boolean;
  prioridad: number;
  idBeneficiario?: number;
  id_beneficiario?: number;
  idEstado?: number;
  id_estado?: number;
  vistas: number;
  beneficiario: Beneficiario;
  estado: EstadoCaso;
  categorias: string[] | string;
  fecha_creacion: string;
  fecha_publicacion: string;
  fecha_conclusion: string;
  imagen1: string;
  imagen2: string;
  imagen3: string;
  imagen4: string;
}

export interface CasosResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Caso[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const getCasosAction = async (urlOverride?: string | null): Promise<CasosResponse> => {
  // Si tenemos un urlOverride (por ejemplo, 'next' o 'previous' paginados), lo usamos.
  // De lo contrario, usamos el base con '/api/api/casos/' como solicitaste
  // Nota: asegúrate de que el baseURL y el prefijo no choquen y armen un path incorrecto.
  // Basado en tu instrucción, construimos el endpoint base a continuación:
  const baseUrl = API_URL.endsWith('/api') ? API_URL.replace(/\/api$/, '') : API_URL;
  const endpoint = urlOverride ? urlOverride : `${baseUrl}/api/api/casos/`;

  try {
    const access = typeof window !== 'undefined' ? localStorage.getItem('access') : null;
    
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
      throw new Error('Error al obtener los casos disponibles.');
    }

    const data: CasosResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching casos:', error);
    throw error;
  }
}

export interface CasoMapa {
  id: number;
  titulo: string;
  latitud: number;
  longitud: number;
  prioridad: number;
}

export async function getCasosMapaAction(): Promise<CasoMapa[]> {
  const token = localStorage.getItem('access');
  const baseUrl = API_URL.endsWith('/api') ? API_URL.replace(/\/api$/, '') : API_URL;

  try {
    const response = await fetch(`${baseUrl}/api/api/casos/mapa/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('No autorizado. Por favor inicie sesión.');
      }
      throw new Error(`Error en el servidor: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error('Error fetching casos para mapa:', error);
    throw new Error(error.message || 'Error de conexión al servidor al cargar el mapa.');
  }
}

export const getCasoByIdAction = async (id: string | number): Promise<Caso> => {
  const baseUrl = API_URL.endsWith('/api') ? API_URL.replace(/\/api$/, '') : API_URL;
  const endpoint = `${baseUrl}/api/api/casos/${id}/`;

  try {
    const access = typeof window !== 'undefined' ? localStorage.getItem('access') : null;
    
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
      throw new Error(`Error al obtener los detalles del caso ${id}.`);
    }

    const data: Caso = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching caso ${id}:`, error);
    throw error;
  }
};

export interface CrearCasoPayload {
  titulo: string;
  descripcion: string;
  colonia: string;
  entidad: string;
  latitud: string | number;
  longitud: string | number;
  prioridad: number;
  id_beneficiario: number;
  id_estado: number;
  categorias_ids: number[];
  imagen1?: File | null;
  imagen2?: File | null;
  imagen3?: File | null;
  imagen4?: File | null;
}

export const crearCasoAction = async (payload: CrearCasoPayload): Promise<Caso> => {
  const baseUrl = API_URL.endsWith('/api') ? API_URL.replace(/\/api$/, '') : API_URL;
  const endpoint = `${baseUrl}/api/api/casos/`;

  try {
    const access = localStorage.getItem('access');
    
    // Al usar FormData, el navegador se encarga del Content-Type y boundaries automáticamente
    const headers: HeadersInit = {};

    if (access) {
      headers['Authorization'] = `Bearer ${access}`;
    }

    const formData = new FormData();
    
    // Mapeo seguro para FormData
    Object.keys(payload).forEach(key => {
      const typedKey = key as keyof CrearCasoPayload;
      const value = payload[typedKey];
      
      if (value !== undefined && value !== null && value !== '') {
         // Las categorías se deben subir como entradas múltiples 'categorias_ids'
         if (typedKey === 'categorias_ids' && Array.isArray(value)) {
           value.forEach(id => formData.append('categorias_ids', String(id)));
         } else if (value instanceof File) {
           formData.append(typedKey, value);
         } else {
           formData.append(typedKey, String(value));
         }
      }
    });

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.detail || 'Error al crear el caso.');
    }

    const data: Caso = await response.json();
    return data;
  } catch (error: any) {
    console.error(`Error creando caso:`, error);
    throw new Error(error.message || 'Error de conexión al intentar crear el caso.');
  }
};

export type CasoListResponse = CasosResponse;
export type CasoWriteResponse = Caso;

export type CreateCaso = CrearCasoPayload;
export type ReplaceCaso = CrearCasoPayload;
export type UpdateCaso = Partial<CrearCasoPayload>;

export interface CasoCategoriaRelation {
  id: number;
  id_caso: number;
  id_categoria: number;
  fecha_creacion?: string;
}

export interface CasoCategoriaRelationListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CasoCategoriaRelation[];
}

export type CreateCasoCategoriaRelation = Omit<CasoCategoriaRelation, 'id' | 'fecha_creacion'>;
export type ReplaceCasoCategoriaRelation = CreateCasoCategoriaRelation;
export type UpdateCasoCategoriaRelation = Partial<CreateCasoCategoriaRelation>;

export interface CasoStats {
  [key: string]: number;
}
