import { useMutation } from "@tanstack/react-query";
import { superAction } from "../../lib/superAction";
import type { ChangeUserPassword } from "../../types/users";

interface ChangeUserPasswordInput {
  id: number;
  data: ChangeUserPassword;
}

export function useChangeUserPassword() {
  return useMutation({
    mutationFn: ({ id, data }: ChangeUserPasswordInput) =>
      superAction.post({
        url: "changeUserPassword",
        params: { id },
        data,
      }),
  });
}
