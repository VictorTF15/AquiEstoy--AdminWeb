import { useMutation, useQueryClient } from "@tanstack/react-query";
import { superAction } from "../../lib/superAction";

export function useDeleteDonacion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      superAction.delete({
        url: "deleteDonation",
        params: { id },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["donations"] });
    },
  });
}