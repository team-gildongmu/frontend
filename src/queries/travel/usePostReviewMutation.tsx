import { postReview } from "@/api/travel";
import { useMutation } from "@tanstack/react-query";

interface ReviewMutationParams {
    id: number;
    reviewData: { 
        travel_log_id: number;
        title: string;
        ai_rating: number;
        started_at: string;
        finished_at: string;
        weather: string;
        mood: number;
        tag: [];
        note: string;
        song: string;
        picture: [];
   }
}

export const usePostReviewMutation = () => {
  return useMutation({
    mutationKey: ["postReview"],
    mutationFn: ({ id, reviewData }: ReviewMutationParams) =>
      postReview(id, reviewData)
  });
};