import { useQuery } from "@tanstack/react-query";
import { superAction } from "../../lib/superAction";

export interface ListCaseCategoryRelationsQuery {
  page?: number;
}

export function useGetCasoCategorias(query?: ListCaseCategoryRelationsQuery) {
  return useQuery({
    queryKey: ["case-categories", "list", query],
    queryFn: () =>
      superAction.get({
        url: "getCaseCategoryRelations",
        query,
      }),
  });
}
