import { useQuery } from "@tanstack/react-query";
import { getCaseMap } from "@/lib/adminApi";

export function useCasosMapa() {
  const query = useQuery({
    queryKey: ["cases", "map"],
    queryFn: getCaseMap,
  });

  return {
    casosMapa: query.data || [],
    data: query.data || [],
    isLoading: query.isLoading,
    error: query.isError
      ? query.error instanceof Error
        ? query.error.message
        : "No fue posible cargar el mapa."
      : null,
  };
}
