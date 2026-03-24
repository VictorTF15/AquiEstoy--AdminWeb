import { useMutation, useQueryClient } from "@tanstack/react-query";
import { superAction } from "../../lib/superAction";
import type { ReplaceCaso } from "../../types/casos";

interface ReplaceCasoInput {
  id: number;
  data: ReplaceCaso;
}

export function usePutCaso() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: ReplaceCasoInput) =>
      superAction.put({
        url: "replaceCase",
        params: { id },
        data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cases"] });
    },
  });
}
