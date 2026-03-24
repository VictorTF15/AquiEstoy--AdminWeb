type RegistroPayload = {
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
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
};

/**
 * Mock hook - useRegistro
 * For legacy registro page
 */
export function useRegistro(): {
  registrarUsuario: (payload: RegistroPayload) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  success: boolean;
} {
  const registrarUsuario = async (_payload: RegistroPayload) => {};
  return { registrarUsuario, isLoading: false, error: null, success: false };
}
