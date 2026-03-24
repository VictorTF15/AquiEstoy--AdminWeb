import { superAction } from "@/lib/superAction";
import type { CreateCategoria } from "@/types/categorias";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCategoria) => {
      const response = await superAction.post({
        url: "createCategory",
        data,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
    },
  });
}
