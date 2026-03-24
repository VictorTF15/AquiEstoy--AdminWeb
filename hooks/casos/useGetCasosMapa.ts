import { useQuery } from "@tanstack/react-query";
import { superAction } from "../../lib/superAction";

export function useGetCasosMapa() {
  return useQuery({
    queryKey: ["cases", "map"],
    queryFn: () =>
      superAction.get({
        url: "getCaseMap",
      }),
  });
}
