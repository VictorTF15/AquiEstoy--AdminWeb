import { useQuery } from "@tanstack/react-query";
import { superAction } from "../../lib/superAction";

export function useGetUserById(id?: number) {
  return useQuery({
    queryKey: ["users", "detail", id],
    enabled: typeof id === "number",
    queryFn: () =>
      superAction.get({
        url: "getUserById",
        params: { id: id as number },
      }),
  });
}
