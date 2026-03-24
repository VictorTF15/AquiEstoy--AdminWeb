import { useQuery } from "@tanstack/react-query";
import { superAction } from "../../lib/superAction";

export interface ListDonacionesQuery {
  page?: number;
}

export function useGetDonaciones(
  query?: ListDonacionesQuery,
  enabled: boolean = true,
) {
  return useQuery({
    queryKey: ["donations", "list", query],
    enabled,
    retry: false,
    queryFn: () =>
      superAction.get({
        url: "getDonations",
        query,
      }),
  });
}