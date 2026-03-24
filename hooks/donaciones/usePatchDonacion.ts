import { useMutation, useQueryClient } from "@tanstack/react-query";
import { superAction } from "../../lib/superAction";
import type { UpdateDonacion } from "../../types/donaciones";

interface UpdateDonacionInput {
  id: number;
  data: UpdateDonacion;
}

export function usePatchDonacion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateDonacionInput) =>
      superAction.patch({
        url: "updateDonation",
        params: { id },
        data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["donations"] });
    },
  });
}