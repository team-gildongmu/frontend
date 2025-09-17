import { getLogDetail } from "@/api/travel";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useGetLogDetailQuery(travel_log_id: number) {

  return useQuery({
    queryKey: ["logDetail", travel_log_id],
    queryFn: () => getLogDetail(travel_log_id),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });
}
