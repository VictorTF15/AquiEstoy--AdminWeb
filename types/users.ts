export interface UserType {
	id: number;
	nombre: string;
	descripcion: string;
	fecha_creacion: string;
}

export interface User {
	id: number;
	nombres: string;
	apellido_paterno: string;
	apellido_materno: string;
	correo: string;
	telefono: string;
	tipo_usuario: UserType;
	ciudad: string;
	estado: string;
	colonia: string;
	direccion: string;
	codigo_postal: string;
	imagen_perfil: string | null;
	esta_activo: boolean;
	verificado: boolean;
	fecha_registro: string;
	imagen_ine_frontal_url: string | null;
	imagen_ine_trasera_url: string | null;
	ultimo_acceso: string | null;
}

export interface PaginatedResponse<T> {
	count: number;
	next: string | null;
	previous: string | null;
	results: T[];
}

export interface CreateUser {
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
	imagen_perfil?: string | null;
	imagen_ine_frontal_url?: string | null;
	imagen_ine_trasera_url?: string | null;
}

export type UpdateUser = Partial<CreateUser>;

export type ReplaceUser = CreateUser;

export interface ChangeUserPassword {
	contrasena_actual?: string;
	nueva_contrasena?: string;
	confirmar_contrasena?: string;
}

export interface UserWriteResponse {
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
	imagen_perfil: string | null;
	imagen_ine_frontal_url: string | null;
	imagen_ine_trasera_url: string | null;
}
