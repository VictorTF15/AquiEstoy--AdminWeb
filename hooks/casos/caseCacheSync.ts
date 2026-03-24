import type { QueryClient } from "@tanstack/react-query";

type AnyCase = Record<string, any>;

function upsertArrayById(items: AnyCase[], nextItem: AnyCase): AnyCase[] {
  const nextId = Number(nextItem?.id);
  if (!Number.isFinite(nextId)) return items;

  const idx = items.findIndex((item) => Number(item?.id) === nextId);
  if (idx === -1) return [nextItem, ...items];

  const clone = [...items];
  clone[idx] = { ...clone[idx], ...nextItem };
  return clone;
}

function updateArrayById(
  items: AnyCase[],
  id: number,
  patch: Partial<AnyCase>
): AnyCase[] {
  return items.map((item) =>
    Number(item?.id) === id ? { ...item, ...patch } : item
  );
}

function removeArrayById(items: AnyCase[], id: number): AnyCase[] {
  return items.filter((item) => Number(item?.id) !== id);
}

function setNestedCaseCollection(
  oldData: any,
  transform: (items: AnyCase[]) => AnyCase[]
) {
  if (Array.isArray(oldData)) {
    return transform(oldData);
  }

  if (Array.isArray(oldData?.data)) {
    return {
      ...oldData,
      data: transform(oldData.data),
    };
  }

  if (Array.isArray(oldData?.data?.results)) {
    return {
      ...oldData,
      data: {
        ...oldData.data,
        results: transform(oldData.data.results),
      },
    };
  }

  return oldData;
}

function toBool(value: unknown): boolean | undefined {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (["1", "true", "t", "yes", "si", "sí"].includes(normalized)) return true;
    if (["0", "false", "f", "no"].includes(normalized)) return false;
  }
  return undefined;
}

export function buildLocalCase(data: AnyCase, idOverride?: number): AnyCase {
  const idFromPayload = Number(data?.id);
  const id = Number.isFinite(idFromPayload)
    ? idFromPayload
    : idOverride ?? -Date.now();

  const abierto = toBool(data?.esta_abierto ?? data?.estaAbierto);

  const idEstadoRaw = Number(data?.idEstado ?? data?.id_estado ?? data?.estado?.id);
  const idBeneficiarioRaw = Number(
    data?.idBeneficiario ?? data?.id_beneficiario ?? data?.beneficiario?.id
  );

  return {
    id,
    titulo: data?.titulo ?? "",
    descripcion: data?.descripcion ?? "",
    colonia: data?.colonia ?? "",
    entidad: data?.entidad ?? "",
    latitud: data?.latitud ?? "",
    longitud: data?.longitud ?? "",
    prioridad: Number(data?.prioridad ?? 1),
    esta_abierto: abierto ?? true,
    estaAbierto: abierto,
    idEstado: Number.isFinite(idEstadoRaw) ? idEstadoRaw : undefined,
    id_estado: Number.isFinite(idEstadoRaw) ? idEstadoRaw : undefined,
    idBeneficiario: Number.isFinite(idBeneficiarioRaw) ? idBeneficiarioRaw : undefined,
    id_beneficiario: Number.isFinite(idBeneficiarioRaw)
      ? idBeneficiarioRaw
      : undefined,
  };
}

export function syncCreateCaseInCache(queryClient: QueryClient, rawCase: AnyCase) {
  const nextCase = buildLocalCase(rawCase);

  queryClient.setQueryData(["metricas", "casos-all"], (old: any) => {
    if (!Array.isArray(old)) return [nextCase];
    return upsertArrayById(old, nextCase);
  });

  queryClient.setQueriesData({ queryKey: ["cases", "list"] }, (old: any) =>
    setNestedCaseCollection(old, (items) => upsertArrayById(items, nextCase))
  );
}

export function syncUpdateCaseInCache(
  queryClient: QueryClient,
  id: number,
  patch: AnyCase
) {
  const nextPatch = buildLocalCase({ ...patch, id }, id);

  queryClient.setQueryData(["metricas", "casos-all"], (old: any) => {
    if (!Array.isArray(old)) return old;
    return updateArrayById(old, id, nextPatch);
  });

  queryClient.setQueriesData({ queryKey: ["cases", "list"] }, (old: any) =>
    setNestedCaseCollection(old, (items) => updateArrayById(items, id, nextPatch))
  );
}

export function syncDeleteCaseInCache(queryClient: QueryClient, id: number) {
  queryClient.setQueryData(["metricas", "casos-all"], (old: any) => {
    if (!Array.isArray(old)) return old;
    return removeArrayById(old, id);
  });

  queryClient.setQueriesData({ queryKey: ["cases", "list"] }, (old: any) =>
    setNestedCaseCollection(old, (items) => removeArrayById(items, id))
  );
}
