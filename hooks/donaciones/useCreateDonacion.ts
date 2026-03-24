import { useMutation, useQueryClient } from "@tanstack/react-query";
import { superAction } from "../../lib/superAction";
import type { CreateDonacion } from "../../types/donaciones";

export function useCreateDonacion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDonacion) =>
      superAction.post({
        url: "createDonation",
        data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["donations"] });
    },
  });
}