import { useQuery } from "@tanstack/react-query";
import { superAction } from "../../lib/superAction";

export function useGetMyProfile() {
  return useQuery({
    queryKey: ["users", "me"],
    queryFn: () =>
      superAction.get({
        url: "getMyProfile",
      }),
  });
}
