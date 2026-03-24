import { useQuery } from "@tanstack/react-query";
import { superAction } from "../../lib/superAction";

export interface ListCasesQuery {
  ordering?: string;
  page?: number;
  search?: string;
}

export function useGetCasos(query?: ListCasesQuery, enabled: boolean = true) {
  return useQuery({
    queryKey: ["cases", "list", query],
    enabled,
    retry: false,
    queryFn: async () => {
      const response = await superAction.get({
        url: "getCases",
        query,
      });
      return response.data;
    },
  });
}
