import { useQuery } from "@tanstack/react-query";
import { superAction } from "../../lib/superAction";

export function useGetCasosStats() {
  return useQuery({
    queryKey: ["cases", "stats"],
    queryFn: () =>
      superAction.get({
        url: "getCaseStats",
      }),
  });
}
