import { superAction } from "@/lib/superAction";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await superAction.delete({
        url: "deleteCategory",
        params: { id },
      });
      return response.data;
    },
    onSuccess: (data, id) => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
    },
  });
}
