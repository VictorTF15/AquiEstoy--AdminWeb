import { useQuery } from "@tanstack/react-query";
import { superAction } from "../../lib/superAction";

export function useGetCasoCategoriaById(id?: number) {
  return useQuery({
    queryKey: ["case-categories", "detail", id],
    enabled: typeof id === "number",
    queryFn: () =>
      superAction.get({
        url: "getCaseCategoryRelationById",
        params: { id: id as number },
      }),
  });
}
