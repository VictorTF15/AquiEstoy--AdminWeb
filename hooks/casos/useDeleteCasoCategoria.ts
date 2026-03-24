import { useMutation } from "@tanstack/react-query";
import { superAction } from "../../lib/superAction";

export function useDeleteCasoCategoria() {
  return useMutation({
    mutationFn: (id: number) =>
      superAction.delete({
        url: "deleteCaseCategoryRelation",
        params: { id },
      }),
  });
}
