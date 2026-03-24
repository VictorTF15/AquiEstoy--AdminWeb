export interface DonacionPayload {
  estado_donacion: string;
  id_donador: number;
  id_caso: number;
  fecha_compromiso: string;
  fecha_donacion: string;
  mensaje_donador: string;
  id_tipo_donacion: number | null;
  cantidad_donacion: string;
  descripcion_donacion: string;
  id_categoria: number;
}

export const crearDonacionAction = async (payload: DonacionPayload): Promise<any> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
  const baseUrl = API_URL.endsWith('/api') ? API_URL.replace(/\/api$/, '') : API_URL;
  const endpoint = `${baseUrl}/api/api/donaciones/`;

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
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || errorData.error || 'No se pudo procesar la donación. Revisa los datos.');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al registrar donación:', error);
    throw error;
  }
};

export interface TipoUsuarioDonacion {
  id: number;
  nombre: string;
  descripcion: string;
  fecha_creacion: string;
}

export interface Donador {
  id: number;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  correo: string;
  telefono: string;
  tipo_usuario: TipoUsuarioDonacion;
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

export interface CategoriaDonacion {
  id: number;
  nombre: string;
  descripcion: string;
  icono: string;
  es_activo: boolean;
}

export interface MiDonacion {
  id: number;
  estado_donacion: string;
  donador: Donador;
  caso_titulo: string;
  id_donador: number;
  id_caso: number;
  fecha_compromiso: string;
  fecha_donacion: string;
  mensaje_donador: string;
  id_tipo_donacion: number | null;
  cantidad_donacion: string;
  descripcion_donacion: string;
  id_categoria: number;
  categoria: CategoriaDonacion;
}

export type Donacion = MiDonacion;

export const getMisDonacionesAction = async (): Promise<MiDonacion[]> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
  const baseUrl = API_URL.endsWith('/api') ? API_URL.replace(/\/api$/, '') : API_URL;
  const endpoint = `${baseUrl}/api/api/donaciones/mis_donaciones/`;

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
      throw new Error('Error al obtener mis donaciones.');
    }

    const data = await response.json();
    // Support either paginated array inside `results` or raw array
    return Array.isArray(data) ? data : (data.results || []);
  } catch (error) {
    console.error('Error fetching mis donaciones:', error);
    throw error;
  }
};

export const getDonacionByIdAction = async (id: number | string): Promise<MiDonacion> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
  const baseUrl = API_URL.endsWith('/api') ? API_URL.replace(/\/api$/, '') : API_URL;
  const endpoint = `${baseUrl}/api/api/donaciones/${id}/`;

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
      throw new Error(`Error al obtener la donación con id ${id}.`);
    }

    const data: MiDonacion = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching donacion ${id}:`, error);
    throw error;
  }
};
