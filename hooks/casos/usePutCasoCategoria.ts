import { useMutation } from "@tanstack/react-query";
import { superAction } from "../../lib/superAction";
import type { ReplaceCasoCategoriaRelation } from "../../types/casos";

interface ReplaceCasoCategoriaInput {
  id: number;
  data: ReplaceCasoCategoriaRelation;
}

export function usePutCasoCategoria() {
  return useMutation({
    mutationFn: ({ id, data }: ReplaceCasoCategoriaInput) =>
      superAction.put({
        url: "replaceCaseCategoryRelation",
        params: { id },
        data,
      }),
  });
}
