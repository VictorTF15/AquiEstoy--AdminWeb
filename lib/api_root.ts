const DEFAULT_API_BASE_URL =
  "https://aqui-estoy-python-ewxoj80kf-victortoxfl-8778s-projects.vercel.app";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.trim() || DEFAULT_API_BASE_URL;

const IS_DEV = process.env.NODE_ENV !== "production";

export interface FetchOptions extends RequestInit {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  isFormData?: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
}

function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access");
}

function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("user");
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readErrorMessage(payload: unknown): string {
  if (!isObject(payload)) return "";

  const directKeys = ["detail", "message", "error"];
  for (const key of directKeys) {
    const value = payload[key];
    if (typeof value === "string" && value.trim()) return value;
  }

  if (isObject(payload.errors)) {
    const values = Object.values(payload.errors)
      .flatMap((item) => (Array.isArray(item) ? item : [item]))
      .filter((item): item is string => typeof item === "string" && item.trim().length > 0);

    if (values.length > 0) return values.join("; ");
  }

  return "";
}

function getHttpStatusMessage(status: number): string {
  switch (status) {
    case 400:
      return "Solicitud invalida. Revisa los datos enviados.";
    case 401:
      return "Sesion expirada o no autorizada. Inicia sesion nuevamente.";
    case 403:
      return "No tienes permisos para realizar esta accion.";
    case 404:
      return "No se encontro el recurso solicitado.";
    case 409:
      return "Existe un conflicto con los datos enviados.";
    default:
      if (status >= 500) {
        return "Error interno del servidor. Intenta de nuevo mas tarde.";
      }
      return "No fue posible completar la operacion.";
  }
}

function withQuery(path: string, query?: Record<string, unknown>): string {
  if (!query || Object.keys(query).length === 0) return path;
  const url = new URL(path, API_BASE_URL);

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    url.searchParams.set(key, String(value));
  });

  return `${url.pathname}${url.search}`;
}

export async function apiFetch<T = unknown>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<ApiResponse<T>> {
  try {
    const token = getAccessToken();
    const headers: Record<string, string> = { ...(options.headers || {}) };

    if (!options.isFormData) {
      headers["Content-Type"] = headers["Content-Type"] || "application/json";
    } else {
      delete headers["Content-Type"];
    }

    headers.Accept = headers.Accept || "application/json";

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const finalUrl = endpoint.startsWith("http")
      ? endpoint
      : `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

    const response = await fetch(finalUrl, {
      ...options,
      headers,
    });

    if (response.status === 204 || options.method === "DELETE") {
      return {
        success: response.ok,
        data: null,
        message: response.ok
          ? "Operacion completada exitosamente."
          : getHttpStatusMessage(response.status),
      };
    }

    const contentType = response.headers.get("content-type") || "";
    const parsedBody: unknown = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      const fallback = getHttpStatusMessage(response.status);
      const message = readErrorMessage(parsedBody) || fallback;

      if (response.status === 401) {
        clearSession();
      }

      if (IS_DEV && !(response.status === 401 && !token)) {
        const safeBody =
          typeof parsedBody === "string"
            ? parsedBody.slice(0, 300)
            : JSON.stringify(parsedBody).slice(0, 300);
        console.error(`[API ${response.status}] ${message}`, { endpoint, body: safeBody });
      }

      return {
        success: false,
        data: null,
        message,
      };
    }

    return {
      success: true,
      data: parsedBody as T,
      message: "Operacion exitosa.",
    };
  } catch (error) {
    if (IS_DEV) {
      console.error("Error de red al consumir API", {
        endpoint,
        error: error instanceof Error ? error.message : String(error),
      });
    }

    return {
      success: false,
      data: null,
      message: "No se pudo conectar con el servidor. Verifica tu conexion.",
    };
  }
}

export function buildApiPath(path: string, query?: Record<string, unknown>) {
  return withQuery(path, query);
}
