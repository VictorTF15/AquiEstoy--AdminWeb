module.exports = [
"[project]/lib/api_root.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiFetch",
    ()=>apiFetch,
    "buildApiPath",
    ()=>buildApiPath
]);
const DEFAULT_API_BASE_URL = "https://aqui-estoy-python-ewxoj80kf-victortoxfl-8778s-projects.vercel.app";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.trim() || DEFAULT_API_BASE_URL;
const IS_DEV = ("TURBOPACK compile-time value", "development") !== "production";
function getAccessToken() {
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
}
function clearSession() {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function isObject(value) {
    return typeof value === "object" && value !== null;
}
function readErrorMessage(payload) {
    if (!isObject(payload)) return "";
    const directKeys = [
        "detail",
        "message",
        "error"
    ];
    for (const key of directKeys){
        const value = payload[key];
        if (typeof value === "string" && value.trim()) return value;
    }
    if (isObject(payload.errors)) {
        const values = Object.values(payload.errors).flatMap((item)=>Array.isArray(item) ? item : [
                item
            ]).filter((item)=>typeof item === "string" && item.trim().length > 0);
        if (values.length > 0) return values.join("; ");
    }
    return "";
}
function getHttpStatusMessage(status) {
    switch(status){
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
function withQuery(path, query) {
    if (!query || Object.keys(query).length === 0) return path;
    const url = new URL(path, API_BASE_URL);
    Object.entries(query).forEach(([key, value])=>{
        if (value === undefined || value === null || value === "") return;
        url.searchParams.set(key, String(value));
    });
    return `${url.pathname}${url.search}`;
}
async function apiFetch(endpoint, options = {}) {
    try {
        const token = getAccessToken();
        const headers = {
            ...options.headers || {}
        };
        if (!options.isFormData) {
            headers["Content-Type"] = headers["Content-Type"] || "application/json";
        } else {
            delete headers["Content-Type"];
        }
        headers.Accept = headers.Accept || "application/json";
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        const finalUrl = endpoint.startsWith("http") ? endpoint : `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
        const response = await fetch(finalUrl, {
            ...options,
            headers
        });
        if (response.status === 204 || options.method === "DELETE") {
            return {
                success: response.ok,
                data: null,
                message: response.ok ? "Operacion completada exitosamente." : getHttpStatusMessage(response.status)
            };
        }
        const contentType = response.headers.get("content-type") || "";
        const parsedBody = contentType.includes("application/json") ? await response.json() : await response.text();
        if (!response.ok) {
            const fallback = getHttpStatusMessage(response.status);
            const message = readErrorMessage(parsedBody) || fallback;
            if (response.status === 401) {
                clearSession();
            }
            if (IS_DEV && !(response.status === 401 && !token)) {
                const safeBody = typeof parsedBody === "string" ? parsedBody.slice(0, 300) : JSON.stringify(parsedBody).slice(0, 300);
                console.error(`[API ${response.status}] ${message}`, {
                    endpoint,
                    body: safeBody
                });
            }
            return {
                success: false,
                data: null,
                message
            };
        }
        return {
            success: true,
            data: parsedBody,
            message: "Operacion exitosa."
        };
    } catch (error) {
        if ("TURBOPACK compile-time truthy", 1) {
            console.error("Error de red al consumir API", {
                endpoint,
                error: error instanceof Error ? error.message : String(error)
            });
        }
        return {
            success: false,
            data: null,
            message: "No se pudo conectar con el servidor. Verifica tu conexion."
        };
    }
}
function buildApiPath(path, query) {
    return withQuery(path, query);
}
}),
"[project]/lib/adminApi.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createCase",
    ()=>createCase,
    "createCategory",
    ()=>createCategory,
    "createConversation",
    ()=>createConversation,
    "createDonation",
    ()=>createDonation,
    "createEvidence",
    ()=>createEvidence,
    "createMessage",
    ()=>createMessage,
    "createOcrDocument",
    ()=>createOcrDocument,
    "createReport",
    ()=>createReport,
    "createSanction",
    ()=>createSanction,
    "createUser",
    ()=>createUser,
    "deleteCase",
    ()=>deleteCase,
    "deleteCategory",
    ()=>deleteCategory,
    "deleteConversation",
    ()=>deleteConversation,
    "deleteDonation",
    ()=>deleteDonation,
    "deleteEvidence",
    ()=>deleteEvidence,
    "deleteMessage",
    ()=>deleteMessage,
    "deleteOcrDocument",
    ()=>deleteOcrDocument,
    "deleteReport",
    ()=>deleteReport,
    "deleteSanction",
    ()=>deleteSanction,
    "deleteUser",
    ()=>deleteUser,
    "getCaseById",
    ()=>getCaseById,
    "getCaseMap",
    ()=>getCaseMap,
    "getCaseStates",
    ()=>getCaseStates,
    "getCases",
    ()=>getCases,
    "getCatalogUserTypes",
    ()=>getCatalogUserTypes,
    "getCategories",
    ()=>getCategories,
    "getConversations",
    ()=>getConversations,
    "getDashboardMetrics",
    ()=>getDashboardMetrics,
    "getDonations",
    ()=>getDonations,
    "getEvidences",
    ()=>getEvidences,
    "getMessageTypes",
    ()=>getMessageTypes,
    "getMessages",
    ()=>getMessages,
    "getOcrDocuments",
    ()=>getOcrDocuments,
    "getOcrLogs",
    ()=>getOcrLogs,
    "getOcrStates",
    ()=>getOcrStates,
    "getReportStates",
    ()=>getReportStates,
    "getReports",
    ()=>getReports,
    "getSanctionTypes",
    ()=>getSanctionTypes,
    "getSanctions",
    ()=>getSanctions,
    "getUserTypes",
    ()=>getUserTypes,
    "getUsers",
    ()=>getUsers,
    "loginRequest",
    ()=>loginRequest,
    "normalizeCaseOpenState",
    ()=>normalizeCaseOpenState,
    "updateCase",
    ()=>updateCase,
    "updateCategory",
    ()=>updateCategory,
    "updateConversation",
    ()=>updateConversation,
    "updateDonation",
    ()=>updateDonation,
    "updateEvidence",
    ()=>updateEvidence,
    "updateMessage",
    ()=>updateMessage,
    "updateOcrDocument",
    ()=>updateOcrDocument,
    "updateReport",
    ()=>updateReport,
    "updateSanction",
    ()=>updateSanction,
    "updateUser",
    ()=>updateUser,
    "uploadAndProcessOcrDocument",
    ()=>uploadAndProcessOcrDocument
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api_root$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api_root.ts [app-ssr] (ecmascript)");
;
function toSearchParams(query) {
    const params = new URLSearchParams();
    if (!query) return params.toString();
    Object.entries(query).forEach(([key, value])=>{
        if (value === undefined || value === null || value === "") return;
        params.set(key, String(value));
    });
    return params.toString();
}
function buildPath(path, query) {
    const queryString = toSearchParams(query);
    return queryString ? `${path}?${queryString}` : path;
}
function extractList(payload) {
    if (Array.isArray(payload)) {
        return {
            results: payload,
            count: payload.length,
            next: null
        };
    }
    if (payload && typeof payload === "object") {
        const data = payload;
        if (Array.isArray(data.results)) {
            return {
                results: data.results,
                count: typeof data.count === "number" ? data.count : data.results.length,
                next: data.next ?? null
            };
        }
    }
    return {
        results: [],
        count: 0,
        next: null
    };
}
async function requestOrThrow(path, options) {
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api_root$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])(path, options);
    if (!response.success || response.data === null) {
        throw new Error(response.message || "No fue posible completar la operacion.");
    }
    return response.data;
}
async function fetchAllPages(path) {
    const firstPage = await requestOrThrow(path, {
        method: "GET"
    });
    const first = extractList(firstPage);
    const all = [
        ...first.results
    ];
    let next = first.next;
    let maxHops = 20;
    while(next && maxHops > 0){
        const nextPage = await requestOrThrow(next, {
            method: "GET"
        });
        const parsed = extractList(nextPage);
        all.push(...parsed.results);
        next = parsed.next;
        maxHops -= 1;
    }
    return all;
}
function normalizeCaseOpenState(caso) {
    const source = caso.esta_abierto ?? caso.estaAbierto;
    if (typeof source === "boolean") return source;
    if (typeof source === "number") return source === 1;
    if (typeof source === "string") {
        const value = source.trim().toLowerCase();
        if ([
            "true",
            "1",
            "si",
            "sí"
        ].includes(value)) return true;
        if ([
            "false",
            "0",
            "no"
        ].includes(value)) return false;
    }
    const idEstado = Number(caso.idEstado ?? caso.id_estado ?? caso.estado?.id);
    if (Number.isFinite(idEstado)) {
        return ![
            2,
            4,
            7
        ].includes(idEstado);
    }
    const estadoNombre = caso.estado?.nombre?.toLowerCase() || "";
    if (estadoNombre.includes("cerr")) return false;
    if (estadoNombre.includes("abier")) return true;
    return true;
}
async function loginRequest(correo, password) {
    const data = await requestOrThrow("/api/auth/login/", {
        method: "POST",
        body: JSON.stringify({
            correo,
            password
        })
    });
    return data;
}
async function getCases(query) {
    const payload = await requestOrThrow(buildPath("/api/api/casos/", query), {
        method: "GET"
    });
    return extractList(payload);
}
async function getCaseById(id) {
    return requestOrThrow(`/api/api/casos/${id}/`, {
        method: "GET"
    });
}
async function createCase(input) {
    return requestOrThrow("/api/api/casos/", {
        method: "POST",
        body: JSON.stringify(input)
    });
}
async function updateCase(id, input) {
    return requestOrThrow(`/api/api/casos/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(input)
    });
}
async function deleteCase(id) {
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api_root$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])(`/api/api/casos/${id}/`, {
        method: "DELETE"
    });
    if (!response.success) throw new Error(response.message);
}
async function getCategories(query) {
    const payload = await requestOrThrow(buildPath("/api/api/categorias/", query), {
        method: "GET"
    });
    return extractList(payload);
}
async function createCategory(input) {
    return requestOrThrow("/api/api/categorias/", {
        method: "POST",
        body: JSON.stringify(input)
    });
}
async function updateCategory(id, input) {
    return requestOrThrow(`/api/api/categorias/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(input)
    });
}
async function deleteCategory(id) {
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api_root$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])(`/api/api/categorias/${id}/`, {
        method: "DELETE"
    });
    if (!response.success) throw new Error(response.message);
}
async function getUsers(query) {
    const payload = await requestOrThrow(buildPath("/api/api/usuarios/", query), {
        method: "GET"
    });
    return extractList(payload);
}
async function getUserTypes() {
    const payload = await requestOrThrow("/api/api/tipos-usuario/", {
        method: "GET"
    });
    return extractList(payload);
}
async function createUser(input) {
    return requestOrThrow("/api/api/usuarios/", {
        method: "POST",
        body: JSON.stringify(input)
    });
}
async function updateUser(id, input) {
    return requestOrThrow(`/api/api/usuarios/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(input)
    });
}
async function deleteUser(id) {
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api_root$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])(`/api/api/usuarios/${id}/`, {
        method: "DELETE"
    });
    if (!response.success) throw new Error(response.message);
}
async function getDonations(query) {
    const payload = await requestOrThrow(buildPath("/api/api/donaciones/", query), {
        method: "GET"
    });
    return extractList(payload);
}
async function createDonation(input) {
    return requestOrThrow("/api/api/donaciones/", {
        method: "POST",
        body: JSON.stringify(input)
    });
}
async function updateDonation(id, input) {
    return requestOrThrow(`/api/api/donaciones/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(input)
    });
}
async function deleteDonation(id) {
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api_root$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])(`/api/api/donaciones/${id}/`, {
        method: "DELETE"
    });
    if (!response.success) throw new Error(response.message);
}
async function getCaseMap() {
    return requestOrThrow("/api/api/casos/mapa/", {
        method: "GET"
    });
}
async function getEvidences(query) {
    const payload = await requestOrThrow(buildPath("/api/api/evidencias/", query), {
        method: "GET"
    });
    return extractList(payload);
}
async function createEvidence(input) {
    return requestOrThrow("/api/api/evidencias/", {
        method: "POST",
        body: JSON.stringify(input)
    });
}
async function updateEvidence(id, input) {
    return requestOrThrow(`/api/api/evidencias/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(input)
    });
}
async function deleteEvidence(id) {
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api_root$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])(`/api/api/evidencias/${id}/`, {
        method: "DELETE"
    });
    if (!response.success) throw new Error(response.message);
}
async function getConversations(query) {
    const payload = await requestOrThrow(buildPath("/api/api/conversaciones/", query), {
        method: "GET"
    });
    return extractList(payload);
}
async function createConversation(input) {
    return requestOrThrow("/api/api/conversaciones/", {
        method: "POST",
        body: JSON.stringify(input)
    });
}
async function updateConversation(id, input) {
    return requestOrThrow(`/api/api/conversaciones/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(input)
    });
}
async function deleteConversation(id) {
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api_root$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])(`/api/api/conversaciones/${id}/`, {
        method: "DELETE"
    });
    if (!response.success) throw new Error(response.message);
}
async function getMessages(query) {
    const payload = await requestOrThrow(buildPath("/api/api/mensajes/", query), {
        method: "GET"
    });
    return extractList(payload);
}
async function createMessage(input) {
    return requestOrThrow("/api/api/mensajes/", {
        method: "POST",
        body: JSON.stringify(input)
    });
}
async function updateMessage(id, input) {
    return requestOrThrow(`/api/api/mensajes/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(input)
    });
}
async function deleteMessage(id) {
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api_root$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])(`/api/api/mensajes/${id}/`, {
        method: "DELETE"
    });
    if (!response.success) throw new Error(response.message);
}
async function getReports(query) {
    const payload = await requestOrThrow(buildPath("/api/api/reportes/", query), {
        method: "GET"
    });
    return extractList(payload);
}
async function createReport(input) {
    return requestOrThrow("/api/api/reportes/", {
        method: "POST",
        body: JSON.stringify(input)
    });
}
async function updateReport(id, input) {
    return requestOrThrow(`/api/api/reportes/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(input)
    });
}
async function deleteReport(id) {
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api_root$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])(`/api/api/reportes/${id}/`, {
        method: "DELETE"
    });
    if (!response.success) throw new Error(response.message);
}
async function getSanctions(query) {
    const payload = await requestOrThrow(buildPath("/api/api/sanciones/", query), {
        method: "GET"
    });
    return extractList(payload);
}
async function createSanction(input) {
    return requestOrThrow("/api/api/sanciones/", {
        method: "POST",
        body: JSON.stringify(input)
    });
}
async function updateSanction(id, input) {
    return requestOrThrow(`/api/api/sanciones/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(input)
    });
}
async function deleteSanction(id) {
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api_root$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])(`/api/api/sanciones/${id}/`, {
        method: "DELETE"
    });
    if (!response.success) throw new Error(response.message);
}
async function getOcrDocuments(query) {
    const payload = await requestOrThrow(buildPath("/api/api/documentos-ocr/", query), {
        method: "GET"
    });
    return extractList(payload);
}
async function createOcrDocument(input) {
    return requestOrThrow("/api/api/documentos-ocr/", {
        method: "POST",
        body: JSON.stringify(input)
    });
}
async function updateOcrDocument(id, input) {
    return requestOrThrow(`/api/api/documentos-ocr/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(input)
    });
}
async function deleteOcrDocument(id) {
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api_root$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["apiFetch"])(`/api/api/documentos-ocr/${id}/`, {
        method: "DELETE"
    });
    if (!response.success) throw new Error(response.message);
}
async function uploadAndProcessOcrDocument(input) {
    return requestOrThrow("/api/api/documentos-ocr/subir-y-procesar/", {
        method: "POST",
        body: input,
        isFormData: true
    });
}
async function getOcrLogs(query) {
    const payload = await requestOrThrow(buildPath("/api/api/logs-ocr/", query), {
        method: "GET"
    });
    return extractList(payload);
}
async function getCaseStates(query) {
    const payload = await requestOrThrow(buildPath("/api/api/estados-caso/", query), {
        method: "GET"
    });
    return extractList(payload);
}
async function getOcrStates(query) {
    const payload = await requestOrThrow(buildPath("/api/api/estados-ocr/", query), {
        method: "GET"
    });
    return extractList(payload);
}
async function getReportStates(query) {
    const payload = await requestOrThrow(buildPath("/api/api/estados-reporte/", query), {
        method: "GET"
    });
    return extractList(payload);
}
async function getMessageTypes(query) {
    const payload = await requestOrThrow(buildPath("/api/api/tipos-mensaje/", query), {
        method: "GET"
    });
    return extractList(payload);
}
async function getSanctionTypes(query) {
    const payload = await requestOrThrow(buildPath("/api/api/tipos-sancion/", query), {
        method: "GET"
    });
    return extractList(payload);
}
async function getCatalogUserTypes(query) {
    const payload = await requestOrThrow(buildPath("/api/api/tipos-usuario/", query), {
        method: "GET"
    });
    return extractList(payload);
}
async function getDashboardMetrics() {
    const [cases, users, categories] = await Promise.all([
        fetchAllPages("/api/api/casos/"),
        fetchAllPages("/api/api/usuarios/"),
        fetchAllPages("/api/api/categorias/")
    ]);
    const casesOpen = cases.filter((caso)=>normalizeCaseOpenState(caso)).length;
    const casesClosed = Math.max(cases.length - casesOpen, 0);
    return {
        casosTotales: cases.length,
        casosAbiertos: casesOpen,
        casosCerrados: casesClosed,
        usuariosTotales: users.length,
        categoriasTotales: categories.length
    };
}
}),
"[project]/hooks/casos/useCasosMapa.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCasosMapa",
    ()=>useCasosMapa
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/adminApi.ts [app-ssr] (ecmascript)");
;
;
function useCasosMapa() {
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "cases",
            "map"
        ],
        queryFn: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminApi$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCaseMap"]
    });
    return {
        casosMapa: query.data || [],
        data: query.data || [],
        isLoading: query.isLoading,
        error: query.isError ? query.error instanceof Error ? query.error.message : "No fue posible cargar el mapa." : null
    };
}
}),
"[project]/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Utility functions for classname merging
 * This is a placeholder for UI component utilities
 */ __turbopack_context__.s([
    "cn",
    ()=>cn
]);
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
}),
"[project]/components/ui/map.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Map",
    ()=>Map,
    "MapClusterLayer",
    ()=>MapClusterLayer,
    "MapControls",
    ()=>MapControls,
    "MapMarker",
    ()=>MapMarker,
    "MapPopup",
    ()=>MapPopup,
    "MapRoute",
    ()=>MapRoute,
    "MarkerContent",
    ()=>MarkerContent,
    "MarkerLabel",
    ()=>MarkerLabel,
    "MarkerPopup",
    ()=>MarkerPopup,
    "MarkerTooltip",
    ()=>MarkerTooltip,
    "useMap",
    ()=>useMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$maplibre$2d$gl$2f$dist$2f$maplibre$2d$gl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/maplibre-gl/dist/maplibre-gl.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-ssr] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-ssr] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$locate$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Locate$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/locate.js [app-ssr] (ecmascript) <export default as Locate>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/maximize.js [app-ssr] (ecmascript) <export default as Maximize>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
const defaultStyles = {
    dark: {
        version: 8,
        projection: {
            type: "mercator"
        },
        sources: {
            cartoDark: {
                type: "raster",
                tiles: [
                    "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
                    "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
                    "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
                    "https://d.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
                ],
                tileSize: 256,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            }
        },
        layers: [
            {
                id: "carto-dark-layer",
                type: "raster",
                source: "cartoDark"
            }
        ]
    },
    light: {
        version: 8,
        projection: {
            type: "mercator"
        },
        sources: {
            cartoLight: {
                type: "raster",
                tiles: [
                    "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
                    "https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
                    "https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
                    "https://d.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
                ],
                tileSize: 256,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            }
        },
        layers: [
            {
                id: "carto-light-layer",
                type: "raster",
                source: "cartoLight"
            }
        ]
    }
};
function getDocumentTheme() {
    if (typeof document === "undefined") return null;
    if (document.documentElement.classList.contains("dark")) return "dark";
    if (document.documentElement.classList.contains("light")) return "light";
    return null;
}
// Get system preference
function getSystemTheme() {
    if ("TURBOPACK compile-time truthy", 1) return "light";
    //TURBOPACK unreachable
    ;
}
function useResolvedTheme(themeProp) {
    const [detectedTheme, setDetectedTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>getDocumentTheme() ?? getSystemTheme());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (themeProp) return; // Skip detection if theme is provided via prop
        // Watch for document class changes (e.g., next-themes toggling dark class)
        const observer = new MutationObserver(()=>{
            const docTheme = getDocumentTheme();
            if (docTheme) {
                setDetectedTheme(docTheme);
            }
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: [
                "class"
            ]
        });
        // Also watch for system preference changes
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleSystemChange = (e)=>{
            // Only use system preference if no document class is set
            if (!getDocumentTheme()) {
                setDetectedTheme(e.matches ? "dark" : "light");
            }
        };
        mediaQuery.addEventListener("change", handleSystemChange);
        return ()=>{
            observer.disconnect();
            mediaQuery.removeEventListener("change", handleSystemChange);
        };
    }, [
        themeProp
    ]);
    return themeProp ?? detectedTheme;
}
const MapContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function useMap() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(MapContext);
    if (!context) {
        throw new Error("useMap must be used within a Map component");
    }
    return context;
}
function DefaultLoader() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-xs",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-1",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "size-1.5 rounded-full bg-muted-foreground/60 animate-pulse"
                }, void 0, false, {
                    fileName: "[project]/components/ui/map.tsx",
                    lineNumber: 199,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "size-1.5 rounded-full bg-muted-foreground/60 animate-pulse [animation-delay:150ms]"
                }, void 0, false, {
                    fileName: "[project]/components/ui/map.tsx",
                    lineNumber: 200,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "size-1.5 rounded-full bg-muted-foreground/60 animate-pulse [animation-delay:300ms]"
                }, void 0, false, {
                    fileName: "[project]/components/ui/map.tsx",
                    lineNumber: 201,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/map.tsx",
            lineNumber: 198,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/map.tsx",
        lineNumber: 197,
        columnNumber: 5
    }, this);
}
function getViewport(map) {
    const center = map.getCenter();
    return {
        center: [
            center.lng,
            center.lat
        ],
        zoom: map.getZoom(),
        bearing: map.getBearing(),
        pitch: map.getPitch()
    };
}
const Map = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"])(function Map({ children, className, theme: themeProp, styles, projection, viewport, onViewportChange, loading = false, persistKey, ...props }, ref) {
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [mapInstance, setMapInstance] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoaded, setIsLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isStyleLoaded, setIsStyleLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const currentStyleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const styleTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const internalUpdateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const resolvedTheme = useResolvedTheme(themeProp);
    const isControlled = viewport !== undefined && onViewportChange !== undefined;
    const onViewportChangeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(onViewportChange);
    onViewportChangeRef.current = onViewportChange;
    const mapStyles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            dark: styles?.dark ?? defaultStyles.dark,
            light: styles?.light ?? defaultStyles.light
        }), [
        styles
    ]);
    // Expose the map instance to the parent component
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useImperativeHandle"])(ref, ()=>mapInstance, [
        mapInstance
    ]);
    const clearStyleTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (styleTimeoutRef.current) {
            clearTimeout(styleTimeoutRef.current);
            styleTimeoutRef.current = null;
        }
    }, []);
    // Initialize the map
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!containerRef.current) return;
        const initialStyle = resolvedTheme === "dark" ? mapStyles.dark : mapStyles.light;
        currentStyleRef.current = initialStyle;
        const readPersistedViewport = ()=>{
            if ("TURBOPACK compile-time truthy", 1) return null;
            //TURBOPACK unreachable
            ;
        };
        const persistedViewport = readPersistedViewport();
        const map = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$maplibre$2d$gl$2f$dist$2f$maplibre$2d$gl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Map({
            container: containerRef.current,
            style: initialStyle,
            renderWorldCopies: false,
            attributionControl: {
                compact: true
            },
            center: persistedViewport?.center ?? viewport?.center,
            zoom: persistedViewport?.zoom ?? viewport?.zoom ?? 5,
            bearing: persistedViewport?.bearing ?? viewport?.bearing ?? 0,
            pitch: persistedViewport?.pitch ?? viewport?.pitch ?? 0,
            ...props
        });
        const styleDataHandler = ()=>{
            clearStyleTimeout();
            // Delay to ensure style is fully processed before allowing layer operations
            // This is a workaround to avoid race conditions with the style loading
            // else we have to force update every layer on setStyle change
            styleTimeoutRef.current = setTimeout(()=>{
                setIsStyleLoaded(true);
            }, 100);
        };
        const loadHandler = ()=>setIsLoaded(true);
        // Viewport change handler - skip if triggered by internal update
        const handleMove = ()=>{
            if (internalUpdateRef.current) return;
            onViewportChangeRef.current?.(getViewport(map));
        };
        const handleMoveEnd = ()=>{
            if ("TURBOPACK compile-time truthy", 1) return;
            //TURBOPACK unreachable
            ;
        };
        map.on("load", loadHandler);
        map.on("styledata", styleDataHandler);
        map.on("move", handleMove);
        map.on("moveend", handleMoveEnd);
        setMapInstance(map);
        return ()=>{
            clearStyleTimeout();
            map.off("load", loadHandler);
            map.off("styledata", styleDataHandler);
            map.off("move", handleMove);
            map.off("moveend", handleMoveEnd);
            map.remove();
            setIsLoaded(false);
            setIsStyleLoaded(false);
            setMapInstance(null);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Sync controlled viewport to map
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!mapInstance || !isControlled || !viewport) return;
        if (mapInstance.isMoving()) return;
        const current = getViewport(mapInstance);
        const next = {
            center: viewport.center ?? current.center,
            zoom: viewport.zoom ?? current.zoom,
            bearing: viewport.bearing ?? current.bearing,
            pitch: viewport.pitch ?? current.pitch
        };
        if (next.center[0] === current.center[0] && next.center[1] === current.center[1] && next.zoom === current.zoom && next.bearing === current.bearing && next.pitch === current.pitch) {
            return;
        }
        internalUpdateRef.current = true;
        mapInstance.jumpTo(next);
        internalUpdateRef.current = false;
    }, [
        mapInstance,
        isControlled,
        viewport
    ]);
    // Handle style change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!mapInstance || !resolvedTheme) return;
        const newStyle = resolvedTheme === "dark" ? mapStyles.dark : mapStyles.light;
        if (currentStyleRef.current === newStyle) return;
        clearStyleTimeout();
        currentStyleRef.current = newStyle;
        setIsStyleLoaded(false);
        mapInstance.setStyle(newStyle, {
            diff: false
        });
    }, [
        mapInstance,
        resolvedTheme,
        mapStyles,
        clearStyleTimeout
    ]);
    const contextValue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            map: mapInstance,
            isLoaded: isLoaded && isStyleLoaded
        }), [
        mapInstance,
        isLoaded,
        isStyleLoaded
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MapContext.Provider, {
        value: contextValue,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: containerRef,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative w-full h-full", className),
            children: [
                (!isLoaded || loading) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DefaultLoader, {}, void 0, false, {
                    fileName: "[project]/components/ui/map.tsx",
                    lineNumber: 407,
                    columnNumber: 36
                }, this),
                mapInstance && children
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/map.tsx",
            lineNumber: 403,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/map.tsx",
        lineNumber: 402,
        columnNumber: 5
    }, this);
});
const MarkerContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function useMarkerContext() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(MarkerContext);
    if (!context) {
        throw new Error("Marker components must be used within MapMarker");
    }
    return context;
}
function MapMarker({ longitude, latitude, children, onClick, onMouseEnter, onMouseLeave, onDragStart, onDrag, onDragEnd, draggable = false, ...markerOptions }) {
    const { map } = useMap();
    const callbacksRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        onClick,
        onMouseEnter,
        onMouseLeave,
        onDragStart,
        onDrag,
        onDragEnd
    });
    callbacksRef.current = {
        onClick,
        onMouseEnter,
        onMouseLeave,
        onDragStart,
        onDrag,
        onDragEnd
    };
    const marker = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const markerInstance = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$maplibre$2d$gl$2f$dist$2f$maplibre$2d$gl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Marker({
            ...markerOptions,
            element: document.createElement("div"),
            draggable
        }).setLngLat([
            longitude,
            latitude
        ]);
        const handleClick = (e)=>callbacksRef.current.onClick?.(e);
        const handleMouseEnter = (e)=>callbacksRef.current.onMouseEnter?.(e);
        const handleMouseLeave = (e)=>callbacksRef.current.onMouseLeave?.(e);
        markerInstance.getElement()?.addEventListener("click", handleClick);
        markerInstance.getElement()?.addEventListener("mouseenter", handleMouseEnter);
        markerInstance.getElement()?.addEventListener("mouseleave", handleMouseLeave);
        const handleDragStart = ()=>{
            const lngLat = markerInstance.getLngLat();
            callbacksRef.current.onDragStart?.({
                lng: lngLat.lng,
                lat: lngLat.lat
            });
        };
        const handleDrag = ()=>{
            const lngLat = markerInstance.getLngLat();
            callbacksRef.current.onDrag?.({
                lng: lngLat.lng,
                lat: lngLat.lat
            });
        };
        const handleDragEnd = ()=>{
            const lngLat = markerInstance.getLngLat();
            callbacksRef.current.onDragEnd?.({
                lng: lngLat.lng,
                lat: lngLat.lat
            });
        };
        markerInstance.on("dragstart", handleDragStart);
        markerInstance.on("drag", handleDrag);
        markerInstance.on("dragend", handleDragEnd);
        return markerInstance;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!map) return;
        marker.addTo(map);
        return ()=>{
            marker.remove();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        map
    ]);
    if (marker.getLngLat().lng !== longitude || marker.getLngLat().lat !== latitude) {
        marker.setLngLat([
            longitude,
            latitude
        ]);
    }
    if (marker.isDraggable() !== draggable) {
        marker.setDraggable(draggable);
    }
    const currentOffset = marker.getOffset();
    const newOffset = markerOptions.offset ?? [
        0,
        0
    ];
    const [newOffsetX, newOffsetY] = Array.isArray(newOffset) ? newOffset : [
        newOffset.x,
        newOffset.y
    ];
    if (currentOffset.x !== newOffsetX || currentOffset.y !== newOffsetY) {
        marker.setOffset(newOffset);
    }
    if (marker.getRotation() !== markerOptions.rotation) {
        marker.setRotation(markerOptions.rotation ?? 0);
    }
    if (marker.getRotationAlignment() !== markerOptions.rotationAlignment) {
        marker.setRotationAlignment(markerOptions.rotationAlignment ?? "auto");
    }
    if (marker.getPitchAlignment() !== markerOptions.pitchAlignment) {
        marker.setPitchAlignment(markerOptions.pitchAlignment ?? "auto");
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MarkerContext.Provider, {
        value: {
            marker,
            map
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/components/ui/map.tsx",
        lineNumber: 568,
        columnNumber: 5
    }, this);
}
function MarkerContent({ children, className }) {
    const { marker } = useMarkerContext();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative cursor-pointer", className),
        children: children || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DefaultMarkerIcon, {}, void 0, false, {
            fileName: "[project]/components/ui/map.tsx",
            lineNumber: 586,
            columnNumber: 20
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/map.tsx",
        lineNumber: 585,
        columnNumber: 5
    }, this), marker.getElement());
}
function DefaultMarkerIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-lg"
    }, void 0, false, {
        fileName: "[project]/components/ui/map.tsx",
        lineNumber: 594,
        columnNumber: 5
    }, this);
}
function MarkerPopup({ children, className, closeButton = false, ...popupOptions }) {
    const { marker, map } = useMarkerContext();
    const container = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>document.createElement("div"), []);
    const prevPopupOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(popupOptions);
    const popup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const popupInstance = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$maplibre$2d$gl$2f$dist$2f$maplibre$2d$gl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Popup({
            offset: 16,
            ...popupOptions,
            closeButton: false
        }).setMaxWidth("none").setDOMContent(container);
        return popupInstance;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!map) return;
        popup.setDOMContent(container);
        marker.setPopup(popup);
        return ()=>{
            marker.setPopup(null);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        map
    ]);
    if (popup.isOpen()) {
        const prev = prevPopupOptions.current;
        if (prev.offset !== popupOptions.offset) {
            popup.setOffset(popupOptions.offset ?? 16);
        }
        if (prev.maxWidth !== popupOptions.maxWidth && popupOptions.maxWidth) {
            popup.setMaxWidth(popupOptions.maxWidth ?? "none");
        }
        prevPopupOptions.current = popupOptions;
    }
    const handleClose = ()=>popup.remove();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative rounded-md border bg-popover p-3 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95", className),
        children: [
            closeButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: handleClose,
                className: "absolute top-1 right-1 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                "aria-label": "Close popup",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/map.tsx",
                        lineNumber: 671,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "sr-only",
                        children: "Close"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/map.tsx",
                        lineNumber: 672,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/map.tsx",
                lineNumber: 665,
                columnNumber: 9
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/map.tsx",
        lineNumber: 658,
        columnNumber: 5
    }, this), container);
}
function MarkerTooltip({ children, className, ...popupOptions }) {
    const { marker, map } = useMarkerContext();
    const container = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>document.createElement("div"), []);
    const prevTooltipOptions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(popupOptions);
    const tooltip = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const tooltipInstance = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$maplibre$2d$gl$2f$dist$2f$maplibre$2d$gl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Popup({
            offset: 16,
            ...popupOptions,
            closeOnClick: true,
            closeButton: false
        }).setMaxWidth("none");
        return tooltipInstance;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!map) return;
        tooltip.setDOMContent(container);
        const handleMouseEnter = ()=>{
            tooltip.setLngLat(marker.getLngLat()).addTo(map);
        };
        const handleMouseLeave = ()=>tooltip.remove();
        marker.getElement()?.addEventListener("mouseenter", handleMouseEnter);
        marker.getElement()?.addEventListener("mouseleave", handleMouseLeave);
        return ()=>{
            marker.getElement()?.removeEventListener("mouseenter", handleMouseEnter);
            marker.getElement()?.removeEventListener("mouseleave", handleMouseLeave);
            tooltip.remove();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        map
    ]);
    if (tooltip.isOpen()) {
        const prev = prevTooltipOptions.current;
        if (prev.offset !== popupOptions.offset) {
            tooltip.setOffset(popupOptions.offset ?? 16);
        }
        if (prev.maxWidth !== popupOptions.maxWidth && popupOptions.maxWidth) {
            tooltip.setMaxWidth(popupOptions.maxWidth ?? "none");
        }
        prevTooltipOptions.current = popupOptions;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("rounded-md bg-foreground px-2 py-1 text-xs text-background shadow-md animate-in fade-in-0 zoom-in-95", className),
        children: children
    }, void 0, false, {
        fileName: "[project]/components/ui/map.tsx",
        lineNumber: 744,
        columnNumber: 5
    }, this), container);
}
function MarkerLabel({ children, className, position = "top" }) {
    const positionClasses = {
        top: "bottom-full mb-1",
        bottom: "top-full mt-1"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("absolute left-1/2 -translate-x-1/2 whitespace-nowrap", "text-[10px] font-medium text-foreground", positionClasses[position], className),
        children: children
    }, void 0, false, {
        fileName: "[project]/components/ui/map.tsx",
        lineNumber: 776,
        columnNumber: 5
    }, this);
}
const positionClasses = {
    "top-left": "top-2 left-2",
    "top-right": "top-2 right-2",
    "bottom-left": "bottom-2 left-2",
    "bottom-right": "bottom-10 right-2"
};
function ControlGroup({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col rounded-md border border-border bg-background shadow-sm overflow-hidden [&>button:not(:last-child)]:border-b [&>button:not(:last-child)]:border-border",
        children: children
    }, void 0, false, {
        fileName: "[project]/components/ui/map.tsx",
        lineNumber: 815,
        columnNumber: 5
    }, this);
}
function ControlButton({ onClick, label, children, disabled = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        "aria-label": label,
        type: "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center justify-center size-8 hover:bg-accent dark:hover:bg-accent/40 transition-colors", disabled && "opacity-50 pointer-events-none cursor-not-allowed"),
        disabled: disabled,
        children: children
    }, void 0, false, {
        fileName: "[project]/components/ui/map.tsx",
        lineNumber: 833,
        columnNumber: 5
    }, this);
}
function MapControls({ position = "bottom-right", showZoom = true, showCompass = false, showLocate = false, showFullscreen = false, className, onLocate }) {
    const { map } = useMap();
    const [waitingForLocation, setWaitingForLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleZoomIn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        map?.zoomTo(map.getZoom() + 1, {
            duration: 300
        });
    }, [
        map
    ]);
    const handleZoomOut = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        map?.zoomTo(map.getZoom() - 1, {
            duration: 300
        });
    }, [
        map
    ]);
    const handleResetBearing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        map?.resetNorthPitch({
            duration: 300
        });
    }, [
        map
    ]);
    const handleLocate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setWaitingForLocation(true);
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((pos)=>{
                const coords = {
                    longitude: pos.coords.longitude,
                    latitude: pos.coords.latitude
                };
                map?.flyTo({
                    center: [
                        coords.longitude,
                        coords.latitude
                    ],
                    zoom: 14,
                    duration: 1500
                });
                onLocate?.(coords);
                setWaitingForLocation(false);
            }, (error)=>{
                console.error("Error getting location:", error);
                setWaitingForLocation(false);
            });
        }
    }, [
        map,
        onLocate
    ]);
    const handleFullscreen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        const container = map?.getContainer();
        if (!container) return;
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            container.requestFullscreen();
        }
    }, [
        map
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("absolute z-10 flex flex-col gap-1.5", positionClasses[position], className),
        children: [
            showZoom && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlGroup, {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlButton, {
                        onClick: handleZoomIn,
                        label: "Zoom in",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                            className: "size-4"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/map.tsx",
                            lineNumber: 918,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ui/map.tsx",
                        lineNumber: 917,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlButton, {
                        onClick: handleZoomOut,
                        label: "Zoom out",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                            className: "size-4"
                        }, void 0, false, {
                            fileName: "[project]/components/ui/map.tsx",
                            lineNumber: 921,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/ui/map.tsx",
                        lineNumber: 920,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/map.tsx",
                lineNumber: 916,
                columnNumber: 9
            }, this),
            showCompass && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlGroup, {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CompassButton, {
                    onClick: handleResetBearing
                }, void 0, false, {
                    fileName: "[project]/components/ui/map.tsx",
                    lineNumber: 927,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/map.tsx",
                lineNumber: 926,
                columnNumber: 9
            }, this),
            showLocate && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlGroup, {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlButton, {
                    onClick: handleLocate,
                    label: "Find my location",
                    disabled: waitingForLocation,
                    children: waitingForLocation ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                        className: "size-4 animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/map.tsx",
                        lineNumber: 938,
                        columnNumber: 15
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$locate$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Locate$3e$__["Locate"], {
                        className: "size-4"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/map.tsx",
                        lineNumber: 940,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ui/map.tsx",
                    lineNumber: 932,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/map.tsx",
                lineNumber: 931,
                columnNumber: 9
            }, this),
            showFullscreen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlGroup, {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlButton, {
                    onClick: handleFullscreen,
                    label: "Toggle fullscreen",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize$3e$__["Maximize"], {
                        className: "size-4"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/map.tsx",
                        lineNumber: 948,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ui/map.tsx",
                    lineNumber: 947,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/map.tsx",
                lineNumber: 946,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/map.tsx",
        lineNumber: 908,
        columnNumber: 5
    }, this);
}
function CompassButton({ onClick }) {
    const { map } = useMap();
    const compassRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!map || !compassRef.current) return;
        const compass = compassRef.current;
        const updateRotation = ()=>{
            const bearing = map.getBearing();
            const pitch = map.getPitch();
            compass.style.transform = `rotateX(${pitch}deg) rotateZ(${-bearing}deg)`;
        };
        map.on("rotate", updateRotation);
        map.on("pitch", updateRotation);
        updateRotation();
        return ()=>{
            map.off("rotate", updateRotation);
            map.off("pitch", updateRotation);
        };
    }, [
        map
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ControlButton, {
        onClick: onClick,
        label: "Reset bearing to north",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ref: compassRef,
            viewBox: "0 0 24 24",
            className: "size-5 transition-transform duration-200",
            style: {
                transformStyle: "preserve-3d"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M12 2L16 12H12V2Z",
                    className: "fill-red-500"
                }, void 0, false, {
                    fileName: "[project]/components/ui/map.tsx",
                    lineNumber: 989,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M12 2L8 12H12V2Z",
                    className: "fill-red-300"
                }, void 0, false, {
                    fileName: "[project]/components/ui/map.tsx",
                    lineNumber: 990,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M12 22L16 12H12V22Z",
                    className: "fill-muted-foreground/60"
                }, void 0, false, {
                    fileName: "[project]/components/ui/map.tsx",
                    lineNumber: 991,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M12 22L8 12H12V22Z",
                    className: "fill-muted-foreground/30"
                }, void 0, false, {
                    fileName: "[project]/components/ui/map.tsx",
                    lineNumber: 992,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/map.tsx",
            lineNumber: 983,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/map.tsx",
        lineNumber: 982,
        columnNumber: 5
    }, this);
}
function MapPopup({ longitude, latitude, onClose, children, className, closeButton = false, ...popupOptions }) {
    const { map } = useMap();
    const popupOptionsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(popupOptions);
    const onCloseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(onClose);
    onCloseRef.current = onClose;
    const container = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>document.createElement("div"), []);
    const popup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const popupInstance = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$maplibre$2d$gl$2f$dist$2f$maplibre$2d$gl$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Popup({
            offset: 16,
            ...popupOptions,
            closeButton: false
        }).setMaxWidth("none").setLngLat([
            longitude,
            latitude
        ]);
        return popupInstance;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!map) return;
        const onCloseProp = ()=>onCloseRef.current?.();
        popup.on("close", onCloseProp);
        popup.setDOMContent(container);
        popup.addTo(map);
        return ()=>{
            popup.off("close", onCloseProp);
            if (popup.isOpen()) {
                popup.remove();
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        map
    ]);
    if (popup.isOpen()) {
        const prev = popupOptionsRef.current;
        if (popup.getLngLat().lng !== longitude || popup.getLngLat().lat !== latitude) {
            popup.setLngLat([
                longitude,
                latitude
            ]);
        }
        if (prev.offset !== popupOptions.offset) {
            popup.setOffset(popupOptions.offset ?? 16);
        }
        if (prev.maxWidth !== popupOptions.maxWidth && popupOptions.maxWidth) {
            popup.setMaxWidth(popupOptions.maxWidth ?? "none");
        }
        popupOptionsRef.current = popupOptions;
    }
    const handleClose = ()=>{
        popup.remove();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("relative rounded-md border bg-popover p-3 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95", className),
        children: [
            closeButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: handleClose,
                className: "absolute top-1 right-1 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                "aria-label": "Close popup",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/map.tsx",
                        lineNumber: 1097,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "sr-only",
                        children: "Close"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/map.tsx",
                        lineNumber: 1098,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ui/map.tsx",
                lineNumber: 1091,
                columnNumber: 9
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/map.tsx",
        lineNumber: 1084,
        columnNumber: 5
    }, this), container);
}
function MapRoute({ id: propId, coordinates, color = "#4285F4", width = 3, opacity = 0.8, dashArray, onClick, onMouseEnter, onMouseLeave, interactive = true }) {
    const { map, isLoaded } = useMap();
    const autoId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    const id = propId ?? autoId;
    const sourceId = `route-source-${id}`;
    const layerId = `route-layer-${id}`;
    // Add source and layer on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isLoaded || !map) return;
        map.addSource(sourceId, {
            type: "geojson",
            data: {
                type: "Feature",
                properties: {},
                geometry: {
                    type: "LineString",
                    coordinates: []
                }
            }
        });
        map.addLayer({
            id: layerId,
            type: "line",
            source: sourceId,
            layout: {
                "line-join": "round",
                "line-cap": "round"
            },
            paint: {
                "line-color": color,
                "line-width": width,
                "line-opacity": opacity,
                ...dashArray && {
                    "line-dasharray": dashArray
                }
            }
        });
        return ()=>{
            try {
                if (map.getLayer(layerId)) map.removeLayer(layerId);
                if (map.getSource(sourceId)) map.removeSource(sourceId);
            } catch  {
            // ignore
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        isLoaded,
        map
    ]);
    // When coordinates change, update the source data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isLoaded || !map || coordinates.length < 2) return;
        const source = map.getSource(sourceId);
        if (source) {
            source.setData({
                type: "Feature",
                properties: {},
                geometry: {
                    type: "LineString",
                    coordinates
                }
            });
        }
    }, [
        isLoaded,
        map,
        coordinates,
        sourceId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isLoaded || !map || !map.getLayer(layerId)) return;
        map.setPaintProperty(layerId, "line-color", color);
        map.setPaintProperty(layerId, "line-width", width);
        map.setPaintProperty(layerId, "line-opacity", opacity);
        if (dashArray) {
            map.setPaintProperty(layerId, "line-dasharray", dashArray);
        }
    }, [
        isLoaded,
        map,
        layerId,
        color,
        width,
        opacity,
        dashArray
    ]);
    // Handle click and hover events
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isLoaded || !map || !interactive) return;
        const handleClick = ()=>{
            onClick?.();
        };
        const handleMouseEnter = ()=>{
            map.getCanvas().style.cursor = "pointer";
            onMouseEnter?.();
        };
        const handleMouseLeave = ()=>{
            map.getCanvas().style.cursor = "";
            onMouseLeave?.();
        };
        map.on("click", layerId, handleClick);
        map.on("mouseenter", layerId, handleMouseEnter);
        map.on("mouseleave", layerId, handleMouseLeave);
        return ()=>{
            map.off("click", layerId, handleClick);
            map.off("mouseenter", layerId, handleMouseEnter);
            map.off("mouseleave", layerId, handleMouseLeave);
        };
    }, [
        isLoaded,
        map,
        layerId,
        onClick,
        onMouseEnter,
        onMouseLeave,
        interactive
    ]);
    return null;
}
function MapClusterLayer({ data, clusterMaxZoom = 14, clusterRadius = 50, clusterColors = [
    "#22c55e",
    "#eab308",
    "#ef4444"
], clusterThresholds = [
    100,
    750
], pointColor = "#3b82f6", onPointClick, onClusterClick }) {
    const { map, isLoaded } = useMap();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useId"])();
    const sourceId = `cluster-source-${id}`;
    const clusterLayerId = `clusters-${id}`;
    const clusterCountLayerId = `cluster-count-${id}`;
    const unclusteredLayerId = `unclustered-point-${id}`;
    const stylePropsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        clusterColors,
        clusterThresholds,
        pointColor
    });
    // Add source and layers on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isLoaded || !map) return;
        // Add clustered GeoJSON source
        map.addSource(sourceId, {
            type: "geojson",
            data,
            cluster: true,
            clusterMaxZoom,
            clusterRadius
        });
        // Add cluster circles layer
        map.addLayer({
            id: clusterLayerId,
            type: "circle",
            source: sourceId,
            filter: [
                "has",
                "point_count"
            ],
            paint: {
                "circle-color": [
                    "step",
                    [
                        "get",
                        "point_count"
                    ],
                    clusterColors[0],
                    clusterThresholds[0],
                    clusterColors[1],
                    clusterThresholds[1],
                    clusterColors[2]
                ],
                "circle-radius": [
                    "step",
                    [
                        "get",
                        "point_count"
                    ],
                    20,
                    clusterThresholds[0],
                    30,
                    clusterThresholds[1],
                    40
                ],
                "circle-stroke-width": 1,
                "circle-stroke-color": "#fff",
                "circle-opacity": 0.85
            }
        });
        // Add cluster count text layer
        map.addLayer({
            id: clusterCountLayerId,
            type: "symbol",
            source: sourceId,
            filter: [
                "has",
                "point_count"
            ],
            layout: {
                "text-field": "{point_count_abbreviated}",
                "text-font": [
                    "Open Sans"
                ],
                "text-size": 12
            },
            paint: {
                "text-color": "#fff"
            }
        });
        // Add unclustered point layer
        map.addLayer({
            id: unclusteredLayerId,
            type: "circle",
            source: sourceId,
            filter: [
                "!",
                [
                    "has",
                    "point_count"
                ]
            ],
            paint: {
                "circle-color": pointColor,
                "circle-radius": 5,
                "circle-stroke-width": 2,
                "circle-stroke-color": "#fff"
            }
        });
        return ()=>{
            try {
                if (map.getLayer(clusterCountLayerId)) map.removeLayer(clusterCountLayerId);
                if (map.getLayer(unclusteredLayerId)) map.removeLayer(unclusteredLayerId);
                if (map.getLayer(clusterLayerId)) map.removeLayer(clusterLayerId);
                if (map.getSource(sourceId)) map.removeSource(sourceId);
            } catch  {
            // ignore
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        isLoaded,
        map,
        sourceId
    ]);
    // Update source data when data prop changes (only for non-URL data)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isLoaded || !map || typeof data === "string") return;
        const source = map.getSource(sourceId);
        if (source) {
            source.setData(data);
        }
    }, [
        isLoaded,
        map,
        data,
        sourceId
    ]);
    // Update layer styles when props change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isLoaded || !map) return;
        const prev = stylePropsRef.current;
        const colorsChanged = prev.clusterColors !== clusterColors || prev.clusterThresholds !== clusterThresholds;
        // Update cluster layer colors and sizes
        if (map.getLayer(clusterLayerId) && colorsChanged) {
            map.setPaintProperty(clusterLayerId, "circle-color", [
                "step",
                [
                    "get",
                    "point_count"
                ],
                clusterColors[0],
                clusterThresholds[0],
                clusterColors[1],
                clusterThresholds[1],
                clusterColors[2]
            ]);
            map.setPaintProperty(clusterLayerId, "circle-radius", [
                "step",
                [
                    "get",
                    "point_count"
                ],
                20,
                clusterThresholds[0],
                30,
                clusterThresholds[1],
                40
            ]);
        }
        // Update unclustered point layer color
        if (map.getLayer(unclusteredLayerId) && prev.pointColor !== pointColor) {
            map.setPaintProperty(unclusteredLayerId, "circle-color", pointColor);
        }
        stylePropsRef.current = {
            clusterColors,
            clusterThresholds,
            pointColor
        };
    }, [
        isLoaded,
        map,
        clusterLayerId,
        unclusteredLayerId,
        clusterColors,
        clusterThresholds,
        pointColor
    ]);
    // Handle click events
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isLoaded || !map) return;
        // Cluster click handler - zoom into cluster
        const handleClusterClick = async (e)=>{
            const features = map.queryRenderedFeatures(e.point, {
                layers: [
                    clusterLayerId
                ]
            });
            if (!features.length) return;
            const feature = features[0];
            const clusterId = feature.properties?.cluster_id;
            const pointCount = feature.properties?.point_count;
            const coordinates = feature.geometry.coordinates;
            if (onClusterClick) {
                onClusterClick(clusterId, coordinates, pointCount);
            } else {
                // Default behavior: zoom to cluster expansion zoom
                const source = map.getSource(sourceId);
                const zoom = await source.getClusterExpansionZoom(clusterId);
                map.easeTo({
                    center: coordinates,
                    zoom
                });
            }
        };
        // Unclustered point click handler
        const handlePointClick = (e)=>{
            if (!onPointClick || !e.features?.length) return;
            const feature = e.features[0];
            const coordinates = feature.geometry.coordinates.slice();
            // Handle world copies
            while(Math.abs(e.lngLat.lng - coordinates[0]) > 180){
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            onPointClick(feature, coordinates);
        };
        // Cursor style handlers
        const handleMouseEnterCluster = ()=>{
            map.getCanvas().style.cursor = "pointer";
        };
        const handleMouseLeaveCluster = ()=>{
            map.getCanvas().style.cursor = "";
        };
        const handleMouseEnterPoint = ()=>{
            if (onPointClick) {
                map.getCanvas().style.cursor = "pointer";
            }
        };
        const handleMouseLeavePoint = ()=>{
            map.getCanvas().style.cursor = "";
        };
        map.on("click", clusterLayerId, handleClusterClick);
        map.on("click", unclusteredLayerId, handlePointClick);
        map.on("mouseenter", clusterLayerId, handleMouseEnterCluster);
        map.on("mouseleave", clusterLayerId, handleMouseLeaveCluster);
        map.on("mouseenter", unclusteredLayerId, handleMouseEnterPoint);
        map.on("mouseleave", unclusteredLayerId, handleMouseLeavePoint);
        return ()=>{
            map.off("click", clusterLayerId, handleClusterClick);
            map.off("click", unclusteredLayerId, handlePointClick);
            map.off("mouseenter", clusterLayerId, handleMouseEnterCluster);
            map.off("mouseleave", clusterLayerId, handleMouseLeaveCluster);
            map.off("mouseenter", unclusteredLayerId, handleMouseEnterPoint);
            map.off("mouseleave", unclusteredLayerId, handleMouseLeavePoint);
        };
    }, [
        isLoaded,
        map,
        clusterLayerId,
        unclusteredLayerId,
        sourceId,
        onClusterClick,
        onPointClick
    ]);
    return null;
}
;
}),
"[project]/app/map/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MapPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$casos$2f$useCasosMapa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/casos/useCasosMapa.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$map$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/map.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function MapPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { casosMapa, isLoading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$casos$2f$useCasosMapa$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCasosMapa"])();
    const [activeId, setActiveId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isPanelOpen, setIsPanelOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Usamos el centro de México por defecto
    const defaultCenter = [
        -99.1332,
        19.4326
    ];
    const selectedCase = casosMapa.find((caso)=>caso.id === activeId) || null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full h-[calc(100vh-5rem)] bg-[#F5F5F7]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setIsPanelOpen((prev)=>!prev),
                className: "absolute top-24 left-6 z-30 hidden lg:flex items-center gap-2 rounded-2xl bg-white/95 px-4 py-2.5 shadow-lg border border-gray-200 text-[#0A1930] font-semibold",
                children: isPanelOpen ? 'Ocultar casos' : 'Ver casos'
            }, void 0, false, {
                fileName: "[project]/app/map/page.tsx",
                lineNumber: 22,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `absolute top-40 left-6 z-20 w-80 max-h-[calc(100vh-10rem)] hidden lg:flex flex-col bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/50 overflow-hidden transition-all duration-200 ${isPanelOpen ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-4 pointer-events-none'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 bg-gradient-to-b from-white to-transparent pb-4 border-b border-gray-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-extrabold text-[#0A1930] leading-tight",
                                children: "Casos"
                            }, void 0, false, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 32,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-400 mt-1",
                                children: [
                                    casosMapa.length,
                                    " casos activos."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 33,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/map/page.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-hide",
                        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-3",
                            children: [
                                1,
                                2,
                                3
                            ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-24 bg-gray-100/50 rounded-2xl animate-pulse"
                                }, i, false, {
                                    fileName: "[project]/app/map/page.tsx",
                                    lineNumber: 40,
                                    columnNumber: 24
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/map/page.tsx",
                            lineNumber: 38,
                            columnNumber: 16
                        }, this) : error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm text-red-500 text-center p-4 bg-red-50 rounded-xl",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/app/map/page.tsx",
                            lineNumber: 44,
                            columnNumber: 17
                        }, this) : casosMapa.map((caso)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveId(caso.id),
                                className: `w-full text-left p-4 rounded-2xl transition-all duration-300 border ${activeId === caso.id ? 'bg-[#306FDB] border-[#306FDB] shadow-lg shadow-[#306FDB]/20 translate-x-1' : 'bg-white hover:bg-gray-50 border-gray-100 hover:border-[#306FDB]/30'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: `font-bold text-sm line-clamp-2 ${activeId === caso.id ? 'text-white' : 'text-gray-900'}`,
                                        children: caso.titulo
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 52,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `mt-2 flex items-center justify-between text-xs font-semibold ${activeId === caso.id ? 'text-blue-200' : 'text-gray-500'}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Prioridad: ",
                                                    caso.prioridad
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 54,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "w-3 h-3",
                                                        fill: "none",
                                                        viewBox: "0 0 24 24",
                                                        stroke: "currentColor",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/map/page.tsx",
                                                                lineNumber: 57,
                                                                columnNumber: 37
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/map/page.tsx",
                                                                lineNumber: 58,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/map/page.tsx",
                                                        lineNumber: 56,
                                                        columnNumber: 33
                                                    }, this),
                                                    "Mapa"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/map/page.tsx",
                                                lineNumber: 55,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 53,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, `sidebar-item-${caso.id}`, true, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 47,
                                columnNumber: 21
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/map/page.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/map/page.tsx",
                lineNumber: 30,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 w-full h-full z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$map$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Map"], {
                    persistKey: "admin-map-main",
                    viewport: {
                        center: casosMapa.length > 0 && !isNaN(casosMapa[0].longitud) ? [
                            casosMapa[0].longitud,
                            casosMapa[0].latitud
                        ] : defaultCenter,
                        zoom: 5,
                        pitch: 45
                    },
                    theme: "light",
                    className: "w-full h-full",
                    children: [
                        !isLoading && !error && casosMapa.map((caso)=>{
                            const lat = parseFloat(caso.latitud.toString());
                            const lng = parseFloat(caso.longitud.toString());
                            if (isNaN(lat) || isNaN(lng)) return null;
                            const isHighestPriority = caso.prioridad >= 5;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$map$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MapMarker"], {
                                longitude: lng,
                                latitude: lat,
                                onClick: ()=>setActiveId(caso.id),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$map$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MarkerContent"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `w-12 h-12 rounded-full flex items-center justify-center border-[3px] shadow-xl hover:scale-125 transition-transform cursor-pointer relative ${isHighestPriority ? 'bg-gradient-to-br from-red-500 to-red-600 border-white shadow-red-500/40 z-50' : 'bg-gradient-to-br from-[#306FDB] to-blue-400 border-white shadow-[#306FDB]/40'} ${activeId === caso.id ? 'scale-125 ring-4 ring-white ring-offset-2' : ''}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-5 h-5 text-white",
                                                    fill: "none",
                                                    viewBox: "0 0 24 24",
                                                    stroke: "currentColor",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 3,
                                                            d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/map/page.tsx",
                                                            lineNumber: 98,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 3,
                                                            d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/map/page.tsx",
                                                            lineNumber: 99,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 97,
                                                    columnNumber: 33
                                                }, this),
                                                isHighestPriority && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "absolute -top-1 -right-1 w-3 h-3 bg-red-400 border-2 border-white rounded-full animate-ping"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 102,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 96,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 95,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$map$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MarkerPopup"], {
                                        className: "w-72 p-1 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl bg-white border border-gray-100",
                                        closeButton: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 mb-3",
                                                    children: [
                                                        isHighestPriority && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "bg-red-50 text-red-600 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider border border-red-100",
                                                            children: "Urgente"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/map/page.tsx",
                                                            lineNumber: 110,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "bg-blue-50 text-[#306FDB] text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider border border-blue-100",
                                                            children: [
                                                                "Prioridad ",
                                                                caso.prioridad
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/map/page.tsx",
                                                            lineNumber: 114,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 108,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "font-black text-[#0A1930] text-lg leading-tight mb-4",
                                                    children: caso.titulo
                                                }, void 0, false, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 118,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    href: `/caso/${caso.id}`,
                                                    className: "flex items-center justify-center gap-2 w-full bg-[#0A1930] hover:bg-[#306FDB] text-white text-sm py-3 rounded-2xl font-bold transition-all hover:shadow-[0_4px_15px_rgba(48,111,219,0.3)] hover:-translate-y-0.5",
                                                    children: [
                                                        "Conocer Caso",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-4 h-4",
                                                            fill: "none",
                                                            viewBox: "0 0 24 24",
                                                            stroke: "currentColor",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2.5,
                                                                d: "M14 5l7 7m0 0l-7 7m7-7H3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/map/page.tsx",
                                                                lineNumber: 122,
                                                                columnNumber: 41
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/map/page.tsx",
                                                            lineNumber: 121,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/map/page.tsx",
                                                    lineNumber: 119,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/map/page.tsx",
                                            lineNumber: 107,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/map/page.tsx",
                                        lineNumber: 106,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, `map-pin-${caso.id}`, true, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 89,
                                columnNumber: 21
                            }, this);
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$map$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MapControls"], {
                            position: "bottom-right",
                            showZoom: true,
                            showCompass: true,
                            showFullscreen: true,
                            className: "mb-24 lg:mb-4 mr-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border-white/50"
                        }, void 0, false, {
                            fileName: "[project]/app/map/page.tsx",
                            lineNumber: 130,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/map/page.tsx",
                    lineNumber: 71,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/map/page.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-30 flex items-center justify-center bg-[#F5F5F7]/80 backdrop-blur-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white p-6 rounded-3xl shadow-xl flex flex-col items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-12 h-12 border-4 border-gray-100 border-t-[#306FDB] rounded-full animate-spin mb-4"
                        }, void 0, false, {
                            fileName: "[project]/app/map/page.tsx",
                            lineNumber: 138,
                            columnNumber: 18
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-bold text-[#0A1930]",
                            children: "Cargando el mapa global..."
                        }, void 0, false, {
                            fileName: "[project]/app/map/page.tsx",
                            lineNumber: 139,
                            columnNumber: 18
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-gray-400 mt-1",
                            children: "Ubicando casos para ayudar"
                        }, void 0, false, {
                            fileName: "[project]/app/map/page.tsx",
                            lineNumber: 140,
                            columnNumber: 18
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/map/page.tsx",
                    lineNumber: 137,
                    columnNumber: 14
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/map/page.tsx",
                lineNumber: 136,
                columnNumber: 11
            }, this),
            selectedCase && !isLoading && !error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-6 left-1/2 z-30 w-[92%] max-w-xl -translate-x-1/2 rounded-3xl border border-white/50 bg-white/95 p-5 shadow-2xl backdrop-blur-xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-2 flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "line-clamp-1 text-base font-black text-[#0A1930]",
                                children: selectedCase.titulo
                            }, void 0, false, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 148,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setActiveId(null),
                                className: "rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-bold text-gray-600 hover:bg-gray-50",
                                children: "Cerrar"
                            }, void 0, false, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 149,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/map/page.tsx",
                        lineNumber: 147,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-full border border-blue-100 bg-blue-50 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#306FDB]",
                                children: [
                                    "Prioridad ",
                                    selectedCase.prioridad
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 159,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-full border border-gray-200 bg-gray-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500",
                                children: [
                                    "Caso #",
                                    selectedCase.id
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/map/page.tsx",
                                lineNumber: 162,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/map/page.tsx",
                        lineNumber: 158,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-end gap-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>router.push(`/caso/${selectedCase.id}`),
                            className: "rounded-2xl bg-[#0A1930] px-4 py-2 text-sm font-bold text-white hover:bg-[#306FDB]",
                            children: "Previsualizar caso"
                        }, void 0, false, {
                            fileName: "[project]/app/map/page.tsx",
                            lineNumber: 168,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/map/page.tsx",
                        lineNumber: 167,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/map/page.tsx",
                lineNumber: 146,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/map/page.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_cb3793d0._.js.map