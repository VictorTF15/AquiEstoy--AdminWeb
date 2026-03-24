import { useQuery } from "@tanstack/react-query";
import { superAction } from "../../lib/superAction";

export function useGetMisDonaciones() {
  return useQuery({
    queryKey: ["donations", "mine"],
    queryFn: () =>
      superAction.get({
        url: "getMyDonations",
      }),
  });
}