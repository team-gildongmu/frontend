import { getReviewList } from "@/api/travel";
import useAuth from "@/hooks/useAuth";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useGetReviewListQuery() {
  const { getUserToken } = useAuth();

  return useQuery({
    queryKey: ["reviewList"],
    queryFn: () => getReviewList(),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
    enabled: !!getUserToken(),
  });
}
