import { superAction } from "@/lib/superAction";
import { useQuery } from "@tanstack/react-query";

export function useGetCategorias() {
  return useQuery({
    queryKey: ["categorias"],
    queryFn: async () => {
      const response = await superAction.get({ url: "getCategories" });
      return response.data;
    },
  });
}
