import { useMutation, useQueryClient } from "@tanstack/react-query";
import { superAction } from "../../lib/superAction";
import type { UpdateCaso } from "../../types/casos";

interface UpdateCasoInput {
  id: number;
  data: UpdateCaso;
}

export function usePatchCaso() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: UpdateCasoInput) => {
      const response = await superAction.patch({
        url: "updateCase",
        params: { id },
        data,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cases"] });
      queryClient.invalidateQueries({ queryKey: ["metricas", "casos-all"] });
    },
  });
}
