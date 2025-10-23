import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "@/api/travel";

export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviewList"] });
    },
  });
}