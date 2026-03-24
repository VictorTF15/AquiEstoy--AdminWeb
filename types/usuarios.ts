export interface TipoUsuario {
  id: number;
  nombre: string;
  descripcion: string;
  fecha_creacion: string;
}

export interface Usuario {
  id: number;
  nombres: string;
  apellido_paterno: string | null;
  apellido_materno: string | null;
  correo: string;
  telefono: string | null;
  tipo_usuario: TipoUsuario | null;
  ciudad: string | null;
  estado: string | null;
  colonia: string | null;
  direccion: string | null;
  codigo_postal: string | null;
  imagen_perfil: string | null;
  esta_activo: boolean;
  verificado: boolean;
  fecha_registro: string;
  imagen_ine_frontal_url: string | null;
  imagen_ine_trasera_url: string | null;
  ultimo_acceso: string | null;
}

export interface UsuariosResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Usuario[];
}

export const getUsuariosAction = async (): Promise<UsuariosResponse> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
  const baseUrl = API_URL.endsWith('/api') ? API_URL.replace(/\/api$/, '') : API_URL;
  const endpoint = `${baseUrl}/api/api/usuarios/`;

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
      throw new Error('Error al buscar usuarios.');
    }

    const data: UsuariosResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching usuarios:', error);
    throw error;
  }
};

export const getUsuarioByIdAction = async (id: number | string): Promise<Usuario> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
  const baseUrl = API_URL.endsWith('/api') ? API_URL.replace(/\/api$/, '') : API_URL;
  const endpoint = `${baseUrl}/api/api/usuarios/${id}/`;

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
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || 'Error al obtener el perfil del usuario.');
    }

    const data: Usuario = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching usuario ${id}:`, error);
    throw error;
  }
};
