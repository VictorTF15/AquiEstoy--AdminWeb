import { useQuery } from "@tanstack/react-query";
import { superAction } from "../../lib/superAction";

export function useGetDonacionById(id?: number) {
  return useQuery({
    queryKey: ["donations", "detail", id],
    enabled: typeof id === "number",
    queryFn: () =>
      superAction.get({
        url: "getDonationById",
        params: { id: id as number },
      }),
  });
}