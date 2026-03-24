import { apiFetch, type FetchOptions } from "@/lib/api_root";
import type { Caso, CreateCaso, UpdateCaso } from "@/types/casos";
import type { Categoria, CreateCategoria, UpdateCategoria } from "@/types/categorias";
import type { Donacion, CreateDonacion, UpdateDonacion } from "@/types/donaciones";
import type { CreateUser, UpdateUser, User } from "@/types/users";
import type { CasoMapa } from "@/types/casos";
import type { Evidencia, CreateEvidencia, UpdateEvidencia } from "@/types/evidencias";
import type { Conversacion, CreateConversacion, UpdateConversacion } from "@/types/conversaciones";
import type { Mensaje, CreateMensaje, UpdateMensaje } from "@/types/mensajes";
import type { Reporte, CreateReporte, UpdateReporte, Sancion, CreateSancion, UpdateSancion } from "@/types/moderacion";
import type { DocumentoOCR, CreateDocumentoOCR, UpdateDocumentoOCR, LogOCR, DocumentoOCRProcessResponse } from "@/types/ocr";
import type {
  EstadoCasoCatalog,
  EstadoOCRCatalog,
  EstadoReporteCatalog,
  TipoMensajeCatalog,
  TipoSancionCatalog,
  TipoUsuarioCatalog,
} from "@/types/catalogos";

interface PaginatedLike<T> {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: T[];
}

function toSearchParams(query?: Record<string, unknown>) {
  const params = new URLSearchParams();
  if (!query) return params.toString();

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    params.set(key, String(value));
  });

  return params.toString();
}

function buildPath(path: string, query?: Record<string, unknown>) {
  const queryString = toSearchParams(query);
  return queryString ? `${path}?${queryString}` : path;
}

function extractList<T>(payload: unknown): { results: T[]; count: number; next?: string | null } {
  if (Array.isArray(payload)) {
    return { results: payload as T[], count: payload.length, next: null };
  }

  if (payload && typeof payload === "object") {
    const data = payload as PaginatedLike<T>;
    if (Array.isArray(data.results)) {
      return {
        results: data.results,
        count: typeof data.count === "number" ? data.count : data.results.length,
        next: data.next ?? null,
      };
    }
  }

  return { results: [], count: 0, next: null };
}

async function requestOrThrow<T>(path: string, options?: FetchOptions) {
  const response = await apiFetch<T>(path, options);
  if (!response.success || response.data === null) {
    throw new Error(response.message || "No fue posible completar la operacion.");
  }
  return response.data;
}

async function fetchAllPages<T>(path: string) {
  const firstPage = await requestOrThrow<unknown>(path, { method: "GET" });
  const first = extractList<T>(firstPage);

  const all = [...first.results];
  let next = first.next;
  let maxHops = 20;

  while (next && maxHops > 0) {
    const nextPage = await requestOrThrow<unknown>(next, { method: "GET" });
    const parsed = extractList<T>(nextPage);
    all.push(...parsed.results);
    next = parsed.next;
    maxHops -= 1;
  }

  return all;
}

export function normalizeCaseOpenState(caso: Partial<Caso>) {
  const source = (caso as Record<string, unknown>).esta_abierto ?? (caso as Record<string, unknown>).estaAbierto;

  if (typeof source === "boolean") return source;
  if (typeof source === "number") return source === 1;
  if (typeof source === "string") {
    const value = source.trim().toLowerCase();
    if (["true", "1", "si", "sí"].includes(value)) return true;
    if (["false", "0", "no"].includes(value)) return false;
  }

  const idEstado = Number((caso as Record<string, unknown>).idEstado ?? (caso as Record<string, unknown>).id_estado ?? caso.estado?.id);
  if (Number.isFinite(idEstado)) {
    return ![2, 4, 7].includes(idEstado);
  }

  const estadoNombre = caso.estado?.nombre?.toLowerCase() || "";
  if (estadoNombre.includes("cerr")) return false;
  if (estadoNombre.includes("abier")) return true;

  return true;
}

export async function loginRequest(correo: string, password: string) {
  const data = await requestOrThrow<{
    access: string;
    refresh: string;
    user: Record<string, unknown>;
  }>("/api/auth/login/", {
    method: "POST",
    body: JSON.stringify({ correo, password }),
  });

  return data;
}

export async function getCases(query?: Record<string, unknown>) {
  const payload = await requestOrThrow<unknown>(buildPath("/api/api/casos/", query), {
    method: "GET",
  });
  return extractList<Caso>(payload);
}

export async function createCase(input: CreateCaso) {
  return requestOrThrow<Caso>("/api/api/casos/", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateCase(id: number, input: UpdateCaso) {
  return requestOrThrow<Caso>(`/api/api/casos/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export async function deleteCase(id: number) {
  const response = await apiFetch(`/api/api/casos/${id}/`, { method: "DELETE" });
  if (!response.success) throw new Error(response.message);
}

export async function getCategories(query?: Record<string, unknown>) {
  const payload = await requestOrThrow<unknown>(buildPath("/api/api/categorias/", query), {
    method: "GET",
  });
  return extractList<Categoria>(payload);
}

export async function createCategory(input: CreateCategoria) {
  return requestOrThrow<Categoria>("/api/api/categorias/", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateCategory(id: number, input: UpdateCategoria) {
  return requestOrThrow<Categoria>(`/api/api/categorias/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export async function deleteCategory(id: number) {
  const response = await apiFetch(`/api/api/categorias/${id}/`, { method: "DELETE" });
  if (!response.success) throw new Error(response.message);
}

export async function getUsers(query?: Record<string, unknown>) {
  const payload = await requestOrThrow<unknown>(buildPath("/api/api/usuarios/", query), {
    method: "GET",
  });
  return extractList<User>(payload);
}

export async function getUserTypes() {
  const payload = await requestOrThrow<unknown>("/api/api/tipos-usuario/", { method: "GET" });
  return extractList<{ id: number; nombre: string; descripcion: string }>(payload);
}

export async function createUser(input: CreateUser) {
  return requestOrThrow<User>("/api/api/usuarios/", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateUser(id: number, input: UpdateUser) {
  return requestOrThrow<User>(`/api/api/usuarios/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export async function deleteUser(id: number) {
  const response = await apiFetch(`/api/api/usuarios/${id}/`, { method: "DELETE" });
  if (!response.success) throw new Error(response.message);
}

export async function getDonations(query?: Record<string, unknown>) {
  const payload = await requestOrThrow<unknown>(buildPath("/api/api/donaciones/", query), {
    method: "GET",
  });
  return extractList<Donacion>(payload);
}

export async function createDonation(input: CreateDonacion) {
  return requestOrThrow<Donacion>("/api/api/donaciones/", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateDonation(id: number, input: UpdateDonacion) {
  return requestOrThrow<Donacion>(`/api/api/donaciones/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
}

export async function deleteDonation(id: number) {
  const response = await apiFetch(`/api/api/donaciones/${id}/`, { method: "DELETE" });
  if (!response.success) throw new Error(response.message);
}

export async function getCaseMap() {
  return requestOrThrow<CasoMapa[]>("/api/api/casos/mapa/", { method: "GET" });
}

export async function getEvidences(query?: Record<string, unknown>) {
  const payload = await requestOrThrow<unknown>(buildPath("/api/api/evidencias/", query), { method: "GET" });
  return extractList<Evidencia>(payload);
}

export async function createEvidence(input: CreateEvidencia) {
  return requestOrThrow<Evidencia>("/api/api/evidencias/", { method: "POST", body: JSON.stringify(input) });
}

export async function updateEvidence(id: number, input: UpdateEvidencia) {
  return requestOrThrow<Evidencia>(`/api/api/evidencias/${id}/`, { method: "PATCH", body: JSON.stringify(input) });
}

export async function deleteEvidence(id: number) {
  const response = await apiFetch(`/api/api/evidencias/${id}/`, { method: "DELETE" });
  if (!response.success) throw new Error(response.message);
}

export async function getConversations(query?: Record<string, unknown>) {
  const payload = await requestOrThrow<unknown>(buildPath("/api/api/conversaciones/", query), { method: "GET" });
  return extractList<Conversacion>(payload);
}

export async function createConversation(input: CreateConversacion) {
  return requestOrThrow<Conversacion>("/api/api/conversaciones/", { method: "POST", body: JSON.stringify(input) });
}

export async function updateConversation(id: number, input: UpdateConversacion) {
  return requestOrThrow<Conversacion>(`/api/api/conversaciones/${id}/`, { method: "PATCH", body: JSON.stringify(input) });
}

export async function deleteConversation(id: number) {
  const response = await apiFetch(`/api/api/conversaciones/${id}/`, { method: "DELETE" });
  if (!response.success) throw new Error(response.message);
}

export async function getMessages(query?: Record<string, unknown>) {
  const payload = await requestOrThrow<unknown>(buildPath("/api/api/mensajes/", query), { method: "GET" });
  return extractList<Mensaje>(payload);
}

export async function createMessage(input: CreateMensaje) {
  return requestOrThrow<Mensaje>("/api/api/mensajes/", { method: "POST", body: JSON.stringify(input) });
}

export async function updateMessage(id: number, input: UpdateMensaje) {
  return requestOrThrow<Mensaje>(`/api/api/mensajes/${id}/`, { method: "PATCH", body: JSON.stringify(input) });
}

export async function deleteMessage(id: number) {
  const response = await apiFetch(`/api/api/mensajes/${id}/`, { method: "DELETE" });
  if (!response.success) throw new Error(response.message);
}

export async function getReports(query?: Record<string, unknown>) {
  const payload = await requestOrThrow<unknown>(buildPath("/api/api/reportes/", query), { method: "GET" });
  return extractList<Reporte>(payload);
}

export async function createReport(input: CreateReporte) {
  return requestOrThrow<Reporte>("/api/api/reportes/", { method: "POST", body: JSON.stringify(input) });
}

export async function updateReport(id: number, input: UpdateReporte) {
  return requestOrThrow<Reporte>(`/api/api/reportes/${id}/`, { method: "PATCH", body: JSON.stringify(input) });
}

export async function deleteReport(id: number) {
  const response = await apiFetch(`/api/api/reportes/${id}/`, { method: "DELETE" });
  if (!response.success) throw new Error(response.message);
}

export async function getSanctions(query?: Record<string, unknown>) {
  const payload = await requestOrThrow<unknown>(buildPath("/api/api/sanciones/", query), { method: "GET" });
  return extractList<Sancion>(payload);
}

export async function createSanction(input: CreateSancion) {
  return requestOrThrow<Sancion>("/api/api/sanciones/", { method: "POST", body: JSON.stringify(input) });
}

export async function updateSanction(id: number, input: UpdateSancion) {
  return requestOrThrow<Sancion>(`/api/api/sanciones/${id}/`, { method: "PATCH", body: JSON.stringify(input) });
}

export async function deleteSanction(id: number) {
  const response = await apiFetch(`/api/api/sanciones/${id}/`, { method: "DELETE" });
  if (!response.success) throw new Error(response.message);
}

export async function getOcrDocuments(query?: Record<string, unknown>) {
  const payload = await requestOrThrow<unknown>(buildPath("/api/api/documentos-ocr/", query), { method: "GET" });
  return extractList<DocumentoOCR>(payload);
}

export async function createOcrDocument(input: CreateDocumentoOCR) {
  return requestOrThrow<DocumentoOCR>("/api/api/documentos-ocr/", { method: "POST", body: JSON.stringify(input) });
}

export async function updateOcrDocument(id: number, input: UpdateDocumentoOCR) {
  return requestOrThrow<DocumentoOCR>(`/api/api/documentos-ocr/${id}/`, { method: "PATCH", body: JSON.stringify(input) });
}

export async function deleteOcrDocument(id: number) {
  const response = await apiFetch(`/api/api/documentos-ocr/${id}/`, { method: "DELETE" });
  if (!response.success) throw new Error(response.message);
}

export async function uploadAndProcessOcrDocument(input: FormData) {
  return requestOrThrow<DocumentoOCRProcessResponse>("/api/api/documentos-ocr/subir-y-procesar/", {
    method: "POST",
    body: input,
    isFormData: true,
  });
}

export async function getOcrLogs(query?: Record<string, unknown>) {
  const payload = await requestOrThrow<unknown>(buildPath("/api/api/logs-ocr/", query), { method: "GET" });
  return extractList<LogOCR>(payload);
}

export async function getCaseStates(query?: Record<string, unknown>) {
  const payload = await requestOrThrow<unknown>(buildPath("/api/api/estados-caso/", query), { method: "GET" });
  return extractList<EstadoCasoCatalog>(payload);
}

export async function getOcrStates(query?: Record<string, unknown>) {
  const payload = await requestOrThrow<unknown>(buildPath("/api/api/estados-ocr/", query), { method: "GET" });
  return extractList<EstadoOCRCatalog>(payload);
}

export async function getReportStates(query?: Record<string, unknown>) {
  const payload = await requestOrThrow<unknown>(buildPath("/api/api/estados-reporte/", query), { method: "GET" });
  return extractList<EstadoReporteCatalog>(payload);
}

export async function getMessageTypes(query?: Record<string, unknown>) {
  const payload = await requestOrThrow<unknown>(buildPath("/api/api/tipos-mensaje/", query), { method: "GET" });
  return extractList<TipoMensajeCatalog>(payload);
}

export async function getSanctionTypes(query?: Record<string, unknown>) {
  const payload = await requestOrThrow<unknown>(buildPath("/api/api/tipos-sancion/", query), { method: "GET" });
  return extractList<TipoSancionCatalog>(payload);
}

export async function getCatalogUserTypes(query?: Record<string, unknown>) {
  const payload = await requestOrThrow<unknown>(buildPath("/api/api/tipos-usuario/", query), { method: "GET" });
  return extractList<TipoUsuarioCatalog>(payload);
}

export async function getDashboardMetrics() {
  const [cases, users, categories] = await Promise.all([
    fetchAllPages<Caso>("/api/api/casos/"),
    fetchAllPages<User>("/api/api/usuarios/"),
    fetchAllPages<Categoria>("/api/api/categorias/"),
  ]);

  const casesOpen = cases.filter((caso) => normalizeCaseOpenState(caso)).length;
  const casesClosed = Math.max(cases.length - casesOpen, 0);

  return {
    casosTotales: cases.length,
    casosAbiertos: casesOpen,
    casosCerrados: casesClosed,
    usuariosTotales: users.length,
    categoriasTotales: categories.length,
  };
}
