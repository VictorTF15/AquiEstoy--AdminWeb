import { useMutation } from "@tanstack/react-query";
import { superAction } from "../../lib/superAction";
import type { UpdateCasoCategoriaRelation } from "../../types/casos";

interface UpdateCasoCategoriaInput {
  id: number;
  data: UpdateCasoCategoriaRelation;
}

export function usePatchCasoCategoria() {
  return useMutation({
    mutationFn: ({ id, data }: UpdateCasoCategoriaInput) =>
      superAction.patch({
        url: "updateCaseCategoryRelation",
        params: { id },
        data,
      }),
  });
}
