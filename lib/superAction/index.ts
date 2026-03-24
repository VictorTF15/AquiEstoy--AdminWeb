import { apiFetch } from "../api_root";
import { ENDPOINTS, type EndpointName } from "./endpoints";
import type { RequestPayloadMap } from "./payloads";
import type { ResponseTypeMap } from "./responseTypes";

export interface SuperActionResponse<TData = unknown> {
    data: TData;
    message: string;
    success: boolean;
    statusCode: number;
    timestamp: string;
}

interface BaseRequestOptions {
    params?: Record<string, string | number>;
    query?: Record<string, any>;
}

interface GetRequestOptions<T extends EndpointName> extends BaseRequestOptions {
    url: T;
}

// Interfaz para los archivos en React Native
export interface RNFile {
    uri: string;
    name: string;
    type: string;
}

interface MutationRequestOptions<T extends EndpointName> extends BaseRequestOptions {
    url: T;
    data: typeof ENDPOINTS[T]["payloadType"] extends keyof RequestPayloadMap
    ? RequestPayloadMap[typeof ENDPOINTS[T]["payloadType"]]
    : Record<string, any>;
    // Cambiamos File por nuestra interfaz RNFile
    files?: Record<string, RNFile | RNFile[]>;
}

function replaceParams(path: string, params?: Record<string, string | number>): string {
    if (!params) return path;

    let result = path;
    Object.entries(params).forEach(([key, value]) => {
        result = result.replace(`:${key}`, String(value));
    });

    return result;
}

function addQueryParams(path: string, query?: Record<string, any>): string {
    if (!query || Object.keys(query).length === 0) return path;

    const searchParams = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            searchParams.append(key, String(value));
        }
    });

    const queryString = searchParams.toString();
    return queryString ? `${path}?${queryString}` : path;
}

// Funcion auxiliar para detectar si es un archivo de React Native
function isRNFile(value: any): value is RNFile {
    return value && typeof value === 'object' && 'uri' in value && 'name' in value && 'type' in value;
}

function toFormData(data: any, files?: Record<string, RNFile | RNFile[]>): FormData {
    const formData = new FormData();

    if (data) {
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                // 🔄 Adaptado para React Native
                if (typeof value === "object" && !isRNFile(value)) {
                    formData.append(key, JSON.stringify(value));
                } else {
                    formData.append(key, value as any);
                }
            }
        });
    }

    if (files) {
        Object.entries(files).forEach(([key, file]) => {
            if (Array.isArray(file)) {
                file.forEach((f) => formData.append(key, f as any));
            } else {
                formData.append(key, file as any);
            }
        });
    }

    return formData;
}

function createStandardResponse<TData>(
    data: TData,
    message: string,
    success: boolean = true,
    statusCode: number = 200
): SuperActionResponse<TData> {
    return {
        data,
        message,
        success,
        statusCode,
        timestamp: new Date().toISOString(),
    };
}

class SuperAction {
    async get<T extends EndpointName>(
        options: GetRequestOptions<T>
    ): Promise<SuperActionResponse<ResponseTypeMap[typeof ENDPOINTS[T]["responseType"]]>> {
        const endpoint = ENDPOINTS[options.url];

        if (endpoint.method !== "GET") {
            throw new Error(`Endpoint "${options.url}" no es un GET request`);
        }

        let path = replaceParams(endpoint.path, options.params);
        path = addQueryParams(path, options.query);

        const result = await apiFetch(path, { method: "GET" });

        if (!result.success || result.data === null) {
            throw new Error(result.message || `Error en ${options.url}`);
        }

        return createStandardResponse(
            result.data as any,
            result.message || "Datos obtenidos exitosamente"
        );
    }

    async post<T extends EndpointName>(
        options: MutationRequestOptions<T>
    ): Promise<SuperActionResponse<ResponseTypeMap[typeof ENDPOINTS[T]["responseType"]]>> {
        const endpoint = ENDPOINTS[options.url];

        if (endpoint.method !== "POST") {
            throw new Error(`Endpoint "${options.url}" no es un POST request`);
        }

        let path = replaceParams(endpoint.path, options.params);
        path = addQueryParams(path, options.query);

        let body: any;
        let isFormData = false;

        if (endpoint.requestType === "formData") {
            body = toFormData(options.data, options.files);
            isFormData = true;
        } else if (endpoint.requestType === "json") {
            body = JSON.stringify(options.data);
        } else {
            if (options.files && Object.keys(options.files).length > 0) {
                body = toFormData(options.data, options.files);
                isFormData = true;
            } else {
                body = JSON.stringify(options.data);
            }
        }

        if (process.env.NODE_ENV !== "production") {
            let preview: unknown = body;
            if (!isFormData && typeof body === 'string') {
                try {
                    preview = JSON.parse(body);
                } catch (e) {
                    preview = body;
                }
            }
            // En React Native, iterar sobre el FormData con .entries() suele fallar o no mostrar nada útil.
            // Es mejor simplemente indicar que es un FormData para no romper la app en desarrollo.
            else if (isFormData) {
                preview = "FormData Object (contenido oculto en logs de RN)";
            }

            console.log('[SuperAction] POST', { path, isFormData, bodyPreview: preview });
        }

        const result = await apiFetch(path, {
            method: "POST",
            body,
            isFormData,
        });

        if (!result.success) {
            throw new Error(result.message || `Error en ${options.url}`);
        }

        return createStandardResponse(
            result.data as any,
            result.message || "Recurso creado exitosamente",
            true,
            201
        );
    }

    async patch<T extends EndpointName>(
        options: MutationRequestOptions<T>
    ): Promise<SuperActionResponse<ResponseTypeMap[typeof ENDPOINTS[T]["responseType"]]>> {
        const endpoint = ENDPOINTS[options.url];

        if (endpoint.method !== "PATCH") {
            throw new Error(`Endpoint "${options.url}" no es un PATCH request`);
        }

        let path = replaceParams(endpoint.path, options.params);
        path = addQueryParams(path, options.query);

        let body: any;
        let isFormData = false;

        if (endpoint.requestType === "formData") {
            body = toFormData(options.data, options.files);
            isFormData = true;
        } else if (endpoint.requestType === "json") {
            body = JSON.stringify(options.data);
        } else {
            if (options.files && Object.keys(options.files).length > 0) {
                body = toFormData(options.data, options.files);
                isFormData = true;
            } else {
                body = JSON.stringify(options.data);
            }
        }

        if (process.env.NODE_ENV !== "production") {
            let preview: unknown = body;
            if (!isFormData && typeof body === 'string') {
                try {
                    preview = JSON.parse(body);
                } catch (e) {
                    preview = body;
                }
            } else if (isFormData) {
                preview = "FormData Object (contenido oculto en logs de RN)";
            }

            console.log('[SuperAction] PATCH', { path, isFormData, bodyPreview: preview });
        }

        const result = await apiFetch(path, {
            method: "PATCH",
            body,
            isFormData,
        });

        if (!result.success) {
            throw new Error(result.message || `Error en ${options.url}`);
        }

        return createStandardResponse(
            result.data as any,
            result.message || "Recurso actualizado exitosamente"
        );
    }

    async put<T extends EndpointName>(
        options: MutationRequestOptions<T>
    ): Promise<SuperActionResponse<ResponseTypeMap[typeof ENDPOINTS[T]["responseType"]]>> {
        const endpoint = ENDPOINTS[options.url];

        if (endpoint.method !== "PUT") {
            throw new Error(`Endpoint "${options.url}" no es un PUT request`);
        }

        let path = replaceParams(endpoint.path, options.params);
        path = addQueryParams(path, options.query);

        let body: any;
        let isFormData = false;

        if (endpoint.requestType === "formData") {
            body = toFormData(options.data, options.files);
            isFormData = true;
        } else if (endpoint.requestType === "json") {
            body = JSON.stringify(options.data);
        } else {
            if (options.files && Object.keys(options.files).length > 0) {
                body = toFormData(options.data, options.files);
                isFormData = true;
            } else {
                body = JSON.stringify(options.data);
            }
        }

        if (process.env.NODE_ENV !== "production") {
            let preview: unknown = body;
            if (!isFormData && typeof body === "string") {
                try {
                    preview = JSON.parse(body);
                } catch (e) {
                    preview = body;
                }
            } else if (isFormData) {
                preview = "FormData Object (contenido oculto en logs de RN)";
            }

            console.log("[SuperAction] PUT", { path, isFormData, bodyPreview: preview });
        }

        const result = await apiFetch(path, {
            method: "PUT",
            body,
            isFormData,
        });

        if (!result.success) {
            throw new Error(result.message || `Error en ${options.url}`);
        }

        return createStandardResponse(
            result.data as any,
            result.message || "Recurso reemplazado exitosamente"
        );
    }

    async delete<T extends EndpointName>(
        options: GetRequestOptions<T>
    ): Promise<SuperActionResponse<ResponseTypeMap[typeof ENDPOINTS[T]["responseType"]]>> {
        const endpoint = ENDPOINTS[options.url];

        if (endpoint.method !== "DELETE") {
            throw new Error(`Endpoint "${options.url}" no es un DELETE request`);
        }

        let path = replaceParams(endpoint.path, options.params);
        path = addQueryParams(path, options.query);

        const result = await apiFetch(path, { method: "DELETE" });

        if (!result.success) {
            throw new Error(result.message || `Error en ${options.url}`);
        }

        return createStandardResponse(
            result.data as any,
            result.message || "Recurso eliminado exitosamente"
        );
    }
}

export const superAction = new SuperAction();