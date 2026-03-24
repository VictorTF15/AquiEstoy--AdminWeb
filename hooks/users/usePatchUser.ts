import { useMutation, useQueryClient } from "@tanstack/react-query";
import { superAction } from "../../lib/superAction";
import type { UpdateUser } from "../../types/users";

interface UpdateUserInput {
  id: number;
  data: UpdateUser;
}

export function usePatchUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateUserInput) =>
      superAction.patch({
        url: "updateUser",
        params: { id },
        data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
