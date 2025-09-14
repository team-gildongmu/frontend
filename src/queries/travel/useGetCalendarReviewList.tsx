import { getCalendarReviewList } from "@/api/travel";
import useAuth from "@/hooks/useAuth";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useGetCalendarReviewListQuery() {
  const { getUserToken } = useAuth();

  return useQuery({
    queryKey: ["calendarReviewList"],
    queryFn: () => getCalendarReviewList(),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
    enabled: !!getUserToken(),
  });
}
