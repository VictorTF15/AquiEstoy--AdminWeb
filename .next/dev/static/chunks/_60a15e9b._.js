(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/api_root.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiFetch",
    ()=>apiFetch,
    "buildApiPath",
    ()=>buildApiPath
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const DEFAULT_API_BASE_URL = "https://aqui-estoy-python-ewxoj80kf-victortoxfl-8778s-projects.vercel.app";
const API_BASE_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL?.trim() || DEFAULT_API_BASE_URL;
const IS_DEV = ("TURBOPACK compile-time value", "development") !== "production";
function getAccessToken() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return localStorage.getItem("access");
}
function clearSession() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/adminApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api_root$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api_root.ts [app-client] (ecmascript)");
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
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api_root$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])(path, options);
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
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api_root$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])(`/api/api/casos/${id}/`, {
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
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api_root$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])(`/api/api/categorias/${id}/`, {
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
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api_root$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])(`/api/api/usuarios/${id}/`, {
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
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api_root$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])(`/api/api/donaciones/${id}/`, {
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
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api_root$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])(`/api/api/evidencias/${id}/`, {
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
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api_root$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])(`/api/api/conversaciones/${id}/`, {
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
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api_root$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])(`/api/api/mensajes/${id}/`, {
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
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api_root$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])(`/api/api/reportes/${id}/`, {
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
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api_root$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])(`/api/api/sanciones/${id}/`, {
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
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api_root$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiFetch"])(`/api/api/documentos-ocr/${id}/`, {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/casos/useCasoDetail.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCasoDetail",
    ()=>useCasoDetail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/adminApi.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useCasoDetail(id) {
    _s();
    const parsedId = Number(id);
    const enabled = Number.isFinite(parsedId) && parsedId > 0;
    const query = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            "cases",
            "detail",
            parsedId
        ],
        enabled,
        queryFn: {
            "useCasoDetail.useQuery[query]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$adminApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCaseById"])(parsedId)
        }["useCasoDetail.useQuery[query]"]
    });
    return {
        caso: query.data ?? null,
        data: query.data ?? null,
        isLoading: query.isLoading,
        error: query.isError ? query.error instanceof Error ? query.error.message : "No se pudo cargar el detalle del caso." : null
    };
}
_s(useCasoDetail, "c7fxJWDO4uMGjIdKMJSj1aiS9wg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/donaciones/useDonar.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Mock hook - useDonar
 * For legacy caso/[id] page
 */ __turbopack_context__.s([
    "useDonar",
    ()=>useDonar
]);
function useDonar() {
    const noop = ()=>{};
    const registrarDonacion = async (_payload)=>true;
    return {
        mutate: noop,
        registrarDonacion,
        isLoading: false,
        error: null,
        success: false
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/hooks/categorias/useCategorias.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Mock hook - useCategorias
 * For legacy pages
 */ __turbopack_context__.s([
    "useCategorias",
    ()=>useCategorias
]);
function useCategorias() {
    return {
        categorias: [],
        data: [],
        isLoading: false,
        error: null
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/caso/[id]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CasoDetailPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$casos$2f$useCasoDetail$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/casos/useCasoDetail.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$donaciones$2f$useDonar$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/donaciones/useDonar.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$categorias$2f$useCategorias$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/categorias/useCategorias.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function CasoDetailPage() {
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { caso, isLoading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$casos$2f$useCasoDetail$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCasoDetail"])(params?.id);
    const { registrarDonacion, isLoading: isDonando, error: errorDonacion, success: successDonacion } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$donaciones$2f$useDonar$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDonar"])();
    const { categorias } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$categorias$2f$useCategorias$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCategorias"])();
    // Estado del modal de donación
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [donacionData, setDonacionData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        mensaje_donador: '',
        cantidad_donacion: '',
        descripcion_donacion: '',
        id_categoria: 0
    });
    // Selector para galería simple
    const [activeImage, setActiveImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CasoDetailPage.useEffect": ()=>{
            if (caso?.imagen1) setActiveImage(caso.imagen1);
        }
    }["CasoDetailPage.useEffect"], [
        caso
    ]);
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-[#F5F5F7] flex flex-col pt-20 px-4 items-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-5xl animate-pulse",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-10 w-32 bg-gray-200 rounded-lg mb-8"
                    }, void 0, false, {
                        fileName: "[project]/app/caso/[id]/page.tsx",
                        lineNumber: 36,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full h-[400px] bg-gray-200 rounded-3xl mb-8"
                    }, void 0, false, {
                        fileName: "[project]/app/caso/[id]/page.tsx",
                        lineNumber: 37,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-2 space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-12 w-3/4 bg-gray-200 rounded-xl"
                                    }, void 0, false, {
                                        fileName: "[project]/app/caso/[id]/page.tsx",
                                        lineNumber: 40,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-6 w-1/4 bg-gray-200 rounded-lg mb-6"
                                    }, void 0, false, {
                                        fileName: "[project]/app/caso/[id]/page.tsx",
                                        lineNumber: 41,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-4 w-full bg-gray-200 rounded"
                                            }, void 0, false, {
                                                fileName: "[project]/app/caso/[id]/page.tsx",
                                                lineNumber: 43,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-4 w-full bg-gray-200 rounded"
                                            }, void 0, false, {
                                                fileName: "[project]/app/caso/[id]/page.tsx",
                                                lineNumber: 44,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-4 w-5/6 bg-gray-200 rounded"
                                            }, void 0, false, {
                                                fileName: "[project]/app/caso/[id]/page.tsx",
                                                lineNumber: 45,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/caso/[id]/page.tsx",
                                        lineNumber: 42,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/caso/[id]/page.tsx",
                                lineNumber: 39,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-64 w-full bg-gray-200 rounded-3xl"
                                }, void 0, false, {
                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                    lineNumber: 49,
                                    columnNumber: 21
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/caso/[id]/page.tsx",
                                lineNumber: 48,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/caso/[id]/page.tsx",
                        lineNumber: 38,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/caso/[id]/page.tsx",
                lineNumber: 35,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/caso/[id]/page.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, this);
    }
    if (error || !caso) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-[#F5F5F7] flex items-center justify-center p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-8 rounded-3xl shadow-sm text-center max-w-md w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "w-16 h-16 text-red-500 mx-auto mb-4",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        }, void 0, false, {
                            fileName: "[project]/app/caso/[id]/page.tsx",
                            lineNumber: 62,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/caso/[id]/page.tsx",
                        lineNumber: 61,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-2xl font-bold text-gray-900 mb-2",
                        children: "No se encontró el caso"
                    }, void 0, false, {
                        fileName: "[project]/app/caso/[id]/page.tsx",
                        lineNumber: 64,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-500 mb-6",
                        children: error || 'El caso solicitado no existe o fue eliminado.'
                    }, void 0, false, {
                        fileName: "[project]/app/caso/[id]/page.tsx",
                        lineNumber: 65,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>router.back(),
                        className: "px-6 py-3 bg-[#306FDB] text-white rounded-xl font-bold shadow-md shadow-[#306FDB]/20 hover:bg-[#2051a5] transition-colors w-full",
                        children: "Volver atrás"
                    }, void 0, false, {
                        fileName: "[project]/app/caso/[id]/page.tsx",
                        lineNumber: 66,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/caso/[id]/page.tsx",
                lineNumber: 60,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/caso/[id]/page.tsx",
            lineNumber: 59,
            columnNumber: 7
        }, this);
    }
    // Colección de imágenes disponibles
    const allImages = [
        caso.imagen1,
        caso.imagen2,
        caso.imagen3,
        caso.imagen4
    ].filter(Boolean);
    const handleDonacionChange = (e)=>{
        const { name, value } = e.target;
        setDonacionData((prev)=>({
                ...prev,
                [name]: name === 'id_categoria' ? parseInt(value) : value
            }));
    };
    const handleConfirmarDonacion = async ()=>{
        let id_donador = 0;
        const userRaw = localStorage.getItem('user');
        if (userRaw) {
            const user = JSON.parse(userRaw);
            id_donador = user.id;
        }
        if (!id_donador) {
            alert("Debes iniciar sesión para poder apoyar este caso.");
            return;
        }
        const payload = {
            estado_donacion: "Pendiente",
            id_donador,
            id_caso: caso.id,
            fecha_compromiso: new Date().toISOString(),
            fecha_donacion: new Date().toISOString(),
            mensaje_donador: donacionData.mensaje_donador,
            id_tipo_donacion: null,
            cantidad_donacion: donacionData.cantidad_donacion || "0",
            descripcion_donacion: donacionData.descripcion_donacion,
            id_categoria: donacionData.id_categoria || (categorias.length > 0 ? categorias[0].id : 1)
        };
        const exito = await registrarDonacion(payload);
        if (exito) {
            setTimeout(()=>setIsModalOpen(false), 3000);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#F5F5F7] text-gray-900 pb-24 font-sans selection:bg-[#306FDB] selection:text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "w-full bg-[#F5F5F7]/80 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-200/50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>router.back(),
                            className: "flex items-center gap-2 text-gray-600 hover:text-[#306FDB] font-semibold transition-colors bg-white px-4 py-2 rounded-full shadow-sm hover:shadow-md border border-gray-100",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "w-5 h-5",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    stroke: "currentColor",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2.5,
                                        d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                                    }, void 0, false, {
                                        fileName: "[project]/app/caso/[id]/page.tsx",
                                        lineNumber: 128,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                    lineNumber: 127,
                                    columnNumber: 17
                                }, this),
                                "Volver"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/caso/[id]/page.tsx",
                            lineNumber: 123,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-red-500 hover:border-red-200 transition-all shadow-sm",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-5 h-5",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                        }, void 0, false, {
                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                            lineNumber: 137,
                                            columnNumber: 25
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/caso/[id]/page.tsx",
                                        lineNumber: 136,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                    lineNumber: 135,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#306FDB] hover:border-[#306FDB]/30 transition-all shadow-sm",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-5 h-5",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                        }, void 0, false, {
                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                            lineNumber: 142,
                                            columnNumber: 25
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/caso/[id]/page.tsx",
                                        lineNumber: 141,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                    lineNumber: 140,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/caso/[id]/page.tsx",
                            lineNumber: 134,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/caso/[id]/page.tsx",
                    lineNumber: 122,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/caso/[id]/page.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white p-2 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8 flex flex-col md:flex-row gap-2 border border-gray-100",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full md:w-3/4 h-[300px] sm:h-[400px] lg:h-[500px] rounded-[1.5rem] overflow-hidden relative bg-gray-100 group",
                                children: [
                                    activeImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: activeImage,
                                        alt: caso.titulo,
                                        className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    }, void 0, false, {
                                        fileName: "[project]/app/caso/[id]/page.tsx",
                                        lineNumber: 156,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-full h-full bg-gradient-to-tr from-[#306FDB]/10 to-[#0A1930]/5 flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-20 h-20 text-[#306FDB]/20",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            stroke: "currentColor",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 1,
                                                d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            }, void 0, false, {
                                                fileName: "[project]/app/caso/[id]/page.tsx",
                                                lineNumber: 160,
                                                columnNumber: 29
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                            lineNumber: 159,
                                            columnNumber: 25
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/caso/[id]/page.tsx",
                                        lineNumber: 158,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-6 right-6 z-10 flex flex-col gap-2 items-end",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-[#0A1930]/90 backdrop-blur-md text-white font-bold px-4 py-1.5 rounded-full text-sm shadow-xl border border-white/10",
                                                children: caso.estado?.nombre || 'Abierto'
                                            }, void 0, false, {
                                                fileName: "[project]/app/caso/[id]/page.tsx",
                                                lineNumber: 167,
                                                columnNumber: 21
                                            }, this),
                                            caso.prioridad > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-red-500/90 backdrop-blur-md text-white font-bold px-4 py-1.5 rounded-full text-sm shadow-xl flex items-center gap-2 border border-white/10",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "w-2 h-2 bg-white rounded-full animate-pulse"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/caso/[id]/page.tsx",
                                                        lineNumber: 172,
                                                        columnNumber: 29
                                                    }, this),
                                                    "Prioridad: ",
                                                    caso.prioridad
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/caso/[id]/page.tsx",
                                                lineNumber: 171,
                                                columnNumber: 25
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/caso/[id]/page.tsx",
                                        lineNumber: 166,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/caso/[id]/page.tsx",
                                lineNumber: 154,
                                columnNumber: 13
                            }, this),
                            allImages.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full md:w-1/4 flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto max-h-[500px] p-1 snap-x scrollbar-hide",
                                children: allImages.map((img, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setActiveImage(img),
                                        className: `flex-shrink-0 w-24 md:w-full h-24 md:h-[calc(33.33%-0.33rem)] rounded-[1rem] overflow-hidden relative cursor-pointer snap-start transition-all duration-300 ${activeImage === img ? 'ring-4 ring-[#306FDB] ring-offset-2 scale-[0.98]' : 'hover:opacity-80'}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: img,
                                            className: "w-full h-full object-cover",
                                            alt: `Miniatura ${idx + 1}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                            lineNumber: 188,
                                            columnNumber: 29
                                        }, this)
                                    }, idx, false, {
                                        fileName: "[project]/app/caso/[id]/page.tsx",
                                        lineNumber: 183,
                                        columnNumber: 25
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/caso/[id]/page.tsx",
                                lineNumber: 181,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/caso/[id]/page.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 lg:grid-cols-3 gap-8 relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-2 space-y-8",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative overflow-hidden",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute top-[-50%] right-[-10%] w-64 h-64 bg-[#306FDB] opacity-[0.03] blur-[60px] rounded-full pointer-events-none"
                                        }, void 0, false, {
                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                            lineNumber: 204,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-2 mb-4",
                                            children: [
                                                Array.isArray(caso.categorias) ? caso.categorias.map((cat, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "bg-gray-100 text-gray-700 font-bold px-3 py-1 rounded-lg text-sm",
                                                        children: cat
                                                    }, idx, false, {
                                                        fileName: "[project]/app/caso/[id]/page.tsx",
                                                        lineNumber: 209,
                                                        columnNumber: 33
                                                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "bg-gray-100 text-gray-700 font-bold px-3 py-1 rounded-lg text-sm",
                                                    children: caso.categorias || 'General'
                                                }, void 0, false, {
                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                    lineNumber: 212,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "bg-blue-50 text-[#306FDB] font-bold px-3 py-1 rounded-lg text-sm flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-4 h-4",
                                                            fill: "none",
                                                            viewBox: "0 0 24 24",
                                                            stroke: "currentColor",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    strokeWidth: 2,
                                                                    d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                                    lineNumber: 216,
                                                                    columnNumber: 33
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    strokeWidth: 2,
                                                                    d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                                    lineNumber: 217,
                                                                    columnNumber: 33
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                                            lineNumber: 215,
                                                            columnNumber: 29
                                                        }, this),
                                                        caso.vistas,
                                                        " Vistas"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                    lineNumber: 214,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                            lineNumber: 206,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-3xl md:text-5xl font-extrabold text-[#0A1930] leading-tight mb-6 tracking-tight",
                                            children: caso.titulo
                                        }, void 0, false, {
                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                            lineNumber: 223,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 text-gray-500 bg-gray-50 p-4 rounded-xl font-medium inline-flex mb-8",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "w-5 h-5 text-[#306FDB]",
                                                    fill: "none",
                                                    viewBox: "0 0 24 24",
                                                    stroke: "currentColor",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2.5,
                                                            d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                                            lineNumber: 229,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            strokeWidth: 2.5,
                                                            d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                                            lineNumber: 230,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                    lineNumber: 228,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        caso.colonia,
                                                        ", ",
                                                        caso.entidad
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                    lineNumber: 232,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                            lineNumber: 227,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-bold text-gray-900 mb-4 flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-6 h-6 text-[#306FDB]",
                                                            fill: "none",
                                                            viewBox: "0 0 24 24",
                                                            stroke: "currentColor",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M4 6h16M4 12h16M4 18h7"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/caso/[id]/page.tsx",
                                                                lineNumber: 238,
                                                                columnNumber: 33
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                                            lineNumber: 237,
                                                            columnNumber: 29
                                                        }, this),
                                                        "Descripción del Caso"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                    lineNumber: 236,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-600 leading-relaxed text-lg whitespace-pre-wrap",
                                                    children: caso.descripcion
                                                }, void 0, false, {
                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                    lineNumber: 242,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                            lineNumber: 235,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-10 pt-8 border-t border-gray-100 flex gap-4 text-sm text-gray-400",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "Creado: ",
                                                        new Date(caso.fecha_creacion).toLocaleDateString()
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                    lineNumber: 248,
                                                    columnNumber: 25
                                                }, this),
                                                caso.fecha_publicacion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "• Publicado: ",
                                                        new Date(caso.fecha_publicacion).toLocaleDateString()
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                    lineNumber: 249,
                                                    columnNumber: 52
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                            lineNumber: 247,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                    lineNumber: 202,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/caso/[id]/page.tsx",
                                lineNumber: 199,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "sticky top-24 space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gradient-to-br from-[#0A1930] to-[#122b54] p-8 rounded-3xl shadow-xl border border-blue-900/30 text-center relative overflow-hidden",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute top-[-20%] right-[-20%] w-32 h-32 bg-[#306FDB] rounded-full blur-[40px] opacity-60"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                    lineNumber: 263,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-white font-bold text-2xl mb-2 relative z-10",
                                                    children: "¿Deseas ayudar?"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                    lineNumber: 265,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-blue-200 text-sm mb-6 relative z-10 leading-relaxed",
                                                    children: "Únete y brinda tu apoyo. Las personas te necesitan ahora."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                    lineNumber: 266,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setIsModalOpen(true),
                                                    className: "relative z-10 w-full bg-[#306FDB] hover:bg-[#2051a5] hover:shadow-[0_0_20px_rgba(48,111,219,0.5)] transition-all duration-300 transform active:scale-95 text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-5 h-5",
                                                            fill: "none",
                                                            viewBox: "0 0 24 24",
                                                            stroke: "currentColor",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2.5,
                                                                d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/caso/[id]/page.tsx",
                                                                lineNumber: 273,
                                                                columnNumber: 33
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                                            lineNumber: 272,
                                                            columnNumber: 29
                                                        }, this),
                                                        "Apoyar este caso"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                    lineNumber: 268,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                            lineNumber: 261,
                                            columnNumber: 21
                                        }, this),
                                        caso.beneficiario && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "text-sm font-bold text-gray-400 uppercase tracking-widest mb-6",
                                                    children: "Información de contacto"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                    lineNumber: 282,
                                                    columnNumber: 29
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-4 mb-6",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-16 h-16 rounded-2xl bg-[#F5F5F7] overflow-hidden flex items-center justify-center border-2 border-white shadow-md rounded-full",
                                                            children: caso.beneficiario.imagen_perfil ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: caso.beneficiario.imagen_perfil,
                                                                alt: caso.beneficiario.nombres,
                                                                className: "w-full h-full object-cover"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/caso/[id]/page.tsx",
                                                                lineNumber: 287,
                                                                columnNumber: 41
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xl font-black text-[#0A1930]",
                                                                children: [
                                                                    caso.beneficiario.nombres.charAt(0),
                                                                    caso.beneficiario.apellido_paterno.charAt(0)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/caso/[id]/page.tsx",
                                                                lineNumber: 289,
                                                                columnNumber: 41
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                                            lineNumber: 285,
                                                            columnNumber: 33
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "font-extrabold text-xl text-gray-900",
                                                                    children: [
                                                                        caso.beneficiario.nombres,
                                                                        " ",
                                                                        caso.beneficiario.apellido_paterno
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                                    lineNumber: 293,
                                                                    columnNumber: 37
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-[#306FDB] font-semibold",
                                                                    children: caso.beneficiario.tipo_usuario?.nombre || 'Beneficiario'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                                    lineNumber: 294,
                                                                    columnNumber: 37
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                                            lineNumber: 292,
                                                            columnNumber: 33
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                    lineNumber: 284,
                                                    columnNumber: 29
                                                }, this),
                                                caso.beneficiario.verificado && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "bg-green-50 rounded-xl p-3 flex items-center gap-3 mb-6 border border-green-100",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-green-500 text-white rounded-full p-1",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "w-4 h-4",
                                                                fill: "none",
                                                                viewBox: "0 0 24 24",
                                                                stroke: "currentColor",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    strokeWidth: 3,
                                                                    d: "M5 13l4 4L19 7"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                                    lineNumber: 303,
                                                                    columnNumber: 45
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/caso/[id]/page.tsx",
                                                                lineNumber: 302,
                                                                columnNumber: 41
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                                            lineNumber: 301,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm font-bold text-green-700",
                                                            children: "Identidad Verificada"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                                            lineNumber: 306,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                    lineNumber: 300,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-4",
                                                    children: [
                                                        caso.beneficiario.telefono && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3 text-gray-600",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#306FDB]",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                        className: "w-5 h-5",
                                                                        fill: "none",
                                                                        viewBox: "0 0 24 24",
                                                                        stroke: "currentColor",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                            strokeLinecap: "round",
                                                                            strokeLinejoin: "round",
                                                                            strokeWidth: 2,
                                                                            d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                                                            lineNumber: 315,
                                                                            columnNumber: 49
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/caso/[id]/page.tsx",
                                                                        lineNumber: 314,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                                    lineNumber: 313,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                    href: `tel:${caso.beneficiario.telefono}`,
                                                                    className: "font-semibold hover:text-[#306FDB] transition-colors",
                                                                    children: caso.beneficiario.telefono
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                                    lineNumber: 318,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                                            lineNumber: 312,
                                                            columnNumber: 37
                                                        }, this),
                                                        caso.beneficiario.correo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3 text-gray-600",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#306FDB]",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                        className: "w-5 h-5",
                                                                        fill: "none",
                                                                        viewBox: "0 0 24 24",
                                                                        stroke: "currentColor",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                            strokeLinecap: "round",
                                                                            strokeLinejoin: "round",
                                                                            strokeWidth: 2,
                                                                            d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                                                            lineNumber: 326,
                                                                            columnNumber: 49
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/caso/[id]/page.tsx",
                                                                        lineNumber: 325,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                                    lineNumber: 324,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                    href: `mailto:${caso.beneficiario.correo}`,
                                                                    className: "font-semibold text-sm hover:text-[#306FDB] transition-colors line-clamp-1",
                                                                    children: caso.beneficiario.correo
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                                    lineNumber: 329,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                                            lineNumber: 323,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                    lineNumber: 310,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                            lineNumber: 281,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                    lineNumber: 258,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/caso/[id]/page.tsx",
                                lineNumber: 257,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/caso/[id]/page.tsx",
                        lineNumber: 196,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/caso/[id]/page.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this),
            isModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[100] flex items-center justify-center bg-[#0A1930]/40 backdrop-blur-sm p-4 animate-in fade-in duration-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-[2rem] p-8 max-w-xl w-full shadow-2xl relative border border-white max-h-[90vh] overflow-y-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setIsModalOpen(false),
                            className: "absolute top-6 right-6 w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                className: "w-5 h-5",
                                fill: "none",
                                viewBox: "0 0 24 24",
                                stroke: "currentColor",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M6 18L18 6M6 6l12 12"
                                }, void 0, false, {
                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                    lineNumber: 350,
                                    columnNumber: 98
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/caso/[id]/page.tsx",
                                lineNumber: 350,
                                columnNumber: 19
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/caso/[id]/page.tsx",
                            lineNumber: 346,
                            columnNumber: 16
                        }, this),
                        successDonacion ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "w-10 h-10",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 3,
                                            d: "M5 13l4 4L19 7"
                                        }, void 0, false, {
                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                            lineNumber: 356,
                                            columnNumber: 106
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/caso/[id]/page.tsx",
                                        lineNumber: 356,
                                        columnNumber: 25
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                    lineNumber: 355,
                                    columnNumber: 22
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-2xl font-black text-[#0A1930] mb-2",
                                    children: "¡Gracias por tu apoyo!"
                                }, void 0, false, {
                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                    lineNumber: 358,
                                    columnNumber: 22
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 font-medium",
                                    children: "Hemos registrado tu compromiso. El beneficiario ha sido notificado."
                                }, void 0, false, {
                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                    lineNumber: 359,
                                    columnNumber: 22
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/caso/[id]/page.tsx",
                            lineNumber: 354,
                            columnNumber: 19
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl font-black text-[#0A1930] mb-2 pr-8 leading-tight",
                                    children: "Registra tu Apoyo"
                                }, void 0, false, {
                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                    lineNumber: 363,
                                    columnNumber: 22
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-medium text-gray-500 mb-8 border-b border-gray-100 pb-4",
                                    children: "Por favor completa esta información para notificar al beneficiario."
                                }, void 0, false, {
                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                    lineNumber: 364,
                                    columnNumber: 22
                                }, this),
                                errorDonacion && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-red-50 text-red-700 p-4 rounded-xl mb-6 text-sm font-semibold border border-red-100",
                                    children: errorDonacion
                                }, void 0, false, {
                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                    lineNumber: 367,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border border-blue-100/50 flex flex-col md:flex-row items-center gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center shrink-0 border border-blue-100",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-4xl text-center",
                                                children: "📦"
                                            }, void 0, false, {
                                                fileName: "[project]/app/caso/[id]/page.tsx",
                                                lineNumber: 375,
                                                columnNumber: 28
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                            lineNumber: 374,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-[#0A1930] font-black text-lg mb-1",
                                                    children: "Tu ayuda en especie hace la diferencia"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                    lineNumber: 378,
                                                    columnNumber: 28
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-500 font-medium leading-relaxed",
                                                    children: "Todo suma: ropa en buen estado, alimentos no perecederos, medicinas selladas o artículos de higiene. Gracias por compartir lo tienes."
                                                }, void 0, false, {
                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                    lineNumber: 379,
                                                    columnNumber: 28
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                            lineNumber: 377,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                    lineNumber: 373,
                                    columnNumber: 22
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-6 relative z-10",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-bold text-gray-700 mb-2",
                                                            children: "¿En qué categoría clasifica tu ayuda?"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                                            lineNumber: 388,
                                                            columnNumber: 31
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            name: "id_categoria",
                                                            value: donacionData.id_categoria,
                                                            onChange: handleDonacionChange,
                                                            className: "w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#306FDB]/20 bg-gray-50 outline-none transition-all",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: 0,
                                                                    children: "Selecciona una categoría..."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                                    lineNumber: 395,
                                                                    columnNumber: 34
                                                                }, this),
                                                                categorias.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: cat.id,
                                                                        children: cat.nombre
                                                                    }, cat.id, false, {
                                                                        fileName: "[project]/app/caso/[id]/page.tsx",
                                                                        lineNumber: 397,
                                                                        columnNumber: 37
                                                                    }, this))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                                            lineNumber: 389,
                                                            columnNumber: 31
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                    lineNumber: 387,
                                                    columnNumber: 28
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-sm font-bold text-gray-700 mb-2",
                                                            children: "Monto de donación"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                                            lineNumber: 402,
                                                            columnNumber: 31
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            name: "cantidad_donacion",
                                                            value: donacionData.cantidad_donacion,
                                                            onChange: handleDonacionChange,
                                                            placeholder: "Ej: $100, $500...",
                                                            className: "w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#306FDB]/20 bg-gray-50 outline-none transition-all"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                                            lineNumber: 403,
                                                            columnNumber: 31
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                    lineNumber: 401,
                                                    columnNumber: 28
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                            lineNumber: 386,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-bold text-gray-700 mb-2",
                                                    children: "Descripción Detallada de los Artículos"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                    lineNumber: 415,
                                                    columnNumber: 28
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                    name: "descripcion_donacion",
                                                    value: donacionData.descripcion_donacion,
                                                    onChange: handleDonacionChange,
                                                    rows: 2,
                                                    placeholder: "Ej: Zapatos talla 4 y 5 para niño, 5 latas de atún, ropa de invierno...",
                                                    className: "w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#306FDB]/20 bg-gray-50 outline-none transition-all resize-none"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                    lineNumber: 416,
                                                    columnNumber: 28
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                            lineNumber: 414,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "block text-sm font-bold text-gray-700 mb-2",
                                                    children: "Mensaje Privado para el Beneficiario (Opcional)"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                    lineNumber: 427,
                                                    columnNumber: 28
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                    name: "mensaje_donador",
                                                    value: donacionData.mensaje_donador,
                                                    onChange: handleDonacionChange,
                                                    rows: 3,
                                                    placeholder: "Escribe unas palabras de apoyo y cariño...",
                                                    className: "w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#306FDB]/20 bg-gray-50 outline-none transition-all resize-none"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                    lineNumber: 428,
                                                    columnNumber: 28
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                            lineNumber: 426,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pt-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleConfirmarDonacion,
                                                disabled: isDonando || !donacionData.descripcion_donacion || donacionData.id_categoria === 0,
                                                className: "w-full bg-gradient-to-r from-[#0A1930] to-[#122b54] hover:from-[#306FDB] hover:to-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]",
                                                children: isDonando ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                                    lineNumber: 445,
                                                    columnNumber: 34
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "Confirmar Entrega de Ayuda"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                                            lineNumber: 448,
                                                            columnNumber: 36
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "w-5 h-5 ml-1",
                                                            fill: "none",
                                                            viewBox: "0 0 24 24",
                                                            stroke: "currentColor",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2.5,
                                                                d: "M14 5l7 7m0 0l-7 7m7-7H3"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/caso/[id]/page.tsx",
                                                                lineNumber: 449,
                                                                columnNumber: 120
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                                            lineNumber: 449,
                                                            columnNumber: 36
                                                        }, this)
                                                    ]
                                                }, void 0, true)
                                            }, void 0, false, {
                                                fileName: "[project]/app/caso/[id]/page.tsx",
                                                lineNumber: 439,
                                                columnNumber: 28
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/caso/[id]/page.tsx",
                                            lineNumber: 438,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/caso/[id]/page.tsx",
                                    lineNumber: 385,
                                    columnNumber: 22
                                }, this)
                            ]
                        }, void 0, true)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/caso/[id]/page.tsx",
                    lineNumber: 345,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/caso/[id]/page.tsx",
                lineNumber: 344,
                columnNumber: 10
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/caso/[id]/page.tsx",
        lineNumber: 118,
        columnNumber: 5
    }, this);
}
_s(CasoDetailPage, "cTbERqu6BuHJQA5WMQ2+V8nrEH8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$casos$2f$useCasoDetail$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCasoDetail"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$donaciones$2f$useDonar$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDonar"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$categorias$2f$useCategorias$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCategorias"]
    ];
});
_c = CasoDetailPage;
var _c;
__turbopack_context__.k.register(_c, "CasoDetailPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_60a15e9b._.js.map