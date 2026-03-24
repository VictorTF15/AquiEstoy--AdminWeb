import { useMutation, useQueryClient } from "@tanstack/react-query";
import { superAction } from "../../lib/superAction";
import type { ReplaceUser } from "../../types/users";

interface ReplaceUserInput {
  id: number;
  data: ReplaceUser;
}

export function usePutUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: ReplaceUserInput) =>
      superAction.put({
        url: "replaceUser",
        params: { id },
        data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
