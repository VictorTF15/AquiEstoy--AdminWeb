import { useQuery } from "@tanstack/react-query";
import { getCaseById } from "@/lib/adminApi";
import type { Caso } from "@/types/casos";

export function useCasoDetail(id?: string): {
  caso: Caso | null;
  data: Caso | null;
  isLoading: boolean;
  error: string | null;
} {
  const parsedId = Number(id);
  const enabled = Number.isFinite(parsedId) && parsedId > 0;

  const query = useQuery({
    queryKey: ["cases", "detail", parsedId],
    enabled,
    queryFn: () => getCaseById(parsedId),
  });

  return {
    caso: query.data ?? null,
    data: query.data ?? null,
    isLoading: query.isLoading,
    error: query.isError
      ? query.error instanceof Error
        ? query.error.message
        : "No se pudo cargar el detalle del caso."
      : null,
  };
}
