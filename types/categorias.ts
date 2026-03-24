export interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
  icono: string | null;
  es_activo: boolean;
}

export interface CategoriasResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Categoria[];
}

export const getCategoriasAction = async (): Promise<CategoriasResponse> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
  const baseUrl = API_URL.endsWith('/api') ? API_URL.replace(/\/api$/, '') : API_URL;
  const endpoint = `${baseUrl}/api/api/categorias/`;

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
      throw new Error('Error al obtener las categorías.');
    }

    const data: CategoriasResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categorias:', error);
    throw error;
  }
};

export type CategoriaListResponse = CategoriasResponse;

export interface CreateCategoria {
  nombre: string;
  descripcion: string;
  icono?: string | null;
  es_activo?: boolean;
}

export type UpdateCategoria = Partial<CreateCategoria>;
