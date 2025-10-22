import { getLogList } from "@/api/travel";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useGetLogListQuery(theme?: string) {
  return useQuery({
    queryKey: ["logList", theme],
    queryFn: () => getLogList(theme),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });
}
