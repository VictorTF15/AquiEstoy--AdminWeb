import { useMutation, useQueryClient } from "@tanstack/react-query";
import { superAction } from "../../lib/superAction";

export function useDeleteCaso() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await superAction.delete({
        url: "deleteCase",
        params: { id },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cases"] });
      queryClient.invalidateQueries({ queryKey: ["metricas", "casos-all"] });
    },
  });
}
