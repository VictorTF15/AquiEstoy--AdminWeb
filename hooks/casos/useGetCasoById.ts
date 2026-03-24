import { useQuery } from "@tanstack/react-query";
import { superAction } from "../../lib/superAction";

export function useGetCasoById(id?: number) {
  return useQuery({
    queryKey: ["cases", "detail", id],
    enabled: typeof id === "number",
    queryFn: () =>
      superAction.get({
        url: "getCaseById",
        params: { id: id as number },
      }),
  });
}
