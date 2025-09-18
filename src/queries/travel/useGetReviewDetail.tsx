import { getReviewDetail } from "@/api/travel";
import useAuth from "@/hooks/useAuth";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useGetReviewDetailQuery(review_detail_id : number) {
  const { getUserToken } = useAuth();

  return useQuery({
    queryKey: ["reviewDetail", review_detail_id],
    queryFn: () => getReviewDetail(review_detail_id),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
    enabled: !!getUserToken(),
  });
}
