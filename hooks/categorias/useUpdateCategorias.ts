import { superAction } from "@/lib/superAction";
import type { UpdateCategoria } from "@/types/categorias";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateCategoryVariables {
  id: number;
  data: UpdateCategoria;
}

export function usePatchCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: UpdateCategoryVariables) => {
      const response = await superAction.patch({
        url: "updateCategory",
        params: { id },
        data,
      });
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
    },
  });
}
