export interface LoginPayload {
    correo: string;
    contrasena: string;
    password: string;
}

export interface LoginResponse {
    refresh: string;
    access: string;
    user: {
        id: number;
        correo: string;
        nombres: string;
        apellido_paterno: string;
        tipo_usuario: string;
        imagen_perfil: string | null;
    };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const loginAction = async (payload: LoginPayload): Promise<LoginResponse> => {
    // Nota: Asegúrate de que este sea el endpoint correcto (ej: "/login/" o "/token/")
    const response = await fetch(`${API_URL}/auth/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error('Ha ocurrido un error al iniciar sesión. Verifica tus credenciales.');
    }

    const data: LoginResponse = await response.json();
    return data;
};

export interface RegistroPayload {
  nombres: string;
  apellido_paterno: string;
  apellido_materno?: string;
  correo: string;
  telefono: string;
  id_tipo_usuario: number;
  ciudad: string;
  estado: string;
  colonia: string;
  direccion: string;
  codigo_postal: string;
  contrasena: string;
  imagen_perfil?: File | null;
  imagen_ine_frontal_url?: File | null;
  imagen_ine_trasera_url?: File | null;
}

export const registroAction = async (payload: RegistroPayload): Promise<any> => {
    const baseUrl = API_URL.endsWith('/api') ? API_URL.replace(/\/api$/, '') : API_URL;
    const endpoint = `${baseUrl}/api/api/usuarios/`;
    
    // Al usar FormData, el Content-Type viaja con boundary.
    const formData = new FormData();
    
    Object.keys(payload).forEach(key => {
        const typedKey = key as keyof RegistroPayload;
        const value = payload[typedKey];
        
        if (value !== undefined && value !== null && value !== '') {
            if (value instanceof File) {
               formData.append(typedKey, value);
            } else {
               formData.append(typedKey, String(value));
            }
        }
    });

    const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || errorData.error || 'Ocurrió un error inesperado al intentar registrarte.');
    }

    const data = await response.json();
    return data;
};
