import { useMutation } from "@tanstack/react-query";
import { superAction } from "../../lib/superAction";
import type { CreateCasoCategoriaRelation } from "../../types/casos";

export function useCreateCasoCategoria() {
  return useMutation({
    mutationFn: (data: CreateCasoCategoriaRelation) =>
      superAction.post({
        url: "createCaseCategoryRelation",
        data,
      }),
  });
}
