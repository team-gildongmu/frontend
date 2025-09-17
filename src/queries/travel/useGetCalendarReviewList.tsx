import { getCalendarReviewList } from "@/api/travel";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useGetCalendarReviewListQuery() {
  return useQuery({
    queryKey: ["calendarReviewList"],
    queryFn: () => getCalendarReviewList(),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });
}
