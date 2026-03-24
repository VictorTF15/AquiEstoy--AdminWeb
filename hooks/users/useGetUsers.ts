import { useQuery } from "@tanstack/react-query";
import { superAction } from "../../lib/superAction";

export interface ListUsersQuery {
  ordering?: string;
  page?: number;
  search?: string;
}

export function useGetUsers(query?: ListUsersQuery, enabled: boolean = true) {
  return useQuery({
    queryKey: ["users", "list", query],
    enabled,
    retry: false,
    queryFn: () =>
      superAction.get({
        url: "getUsers",
        query,
      }),
  });
}
