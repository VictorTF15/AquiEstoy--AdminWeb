import { useMutation, useQueryClient } from "@tanstack/react-query";
import { superAction } from "../../lib/superAction";
import type { ReplaceDonacion } from "../../types/donaciones";

interface ReplaceDonacionInput {
  id: number;
  data: ReplaceDonacion;
}

export function usePutDonacion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: ReplaceDonacionInput) =>
      superAction.put({
        url: "replaceDonation",
        params: { id },
        data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["donations"] });
    },
  });
}