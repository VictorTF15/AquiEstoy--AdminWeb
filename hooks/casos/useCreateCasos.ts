import { useMutation, useQueryClient } from "@tanstack/react-query";
import { superAction } from "../../lib/superAction";
import type { CreateCaso } from "../../types/casos";

export function useCreateCasos() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCaso) => {
      const response = await superAction.post({
        url: "createCase",
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
