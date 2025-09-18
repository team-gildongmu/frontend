import { postReview } from "@/api/travel";
import { TravelReviewPost } from "@/types/travel";
import { useMutation } from "@tanstack/react-query";

export const usePostReviewMutation = () => {
  return useMutation({
    mutationKey: ["postReview"],
    mutationFn: (reviewData: TravelReviewPost ) =>
      postReview(reviewData)
  });
};