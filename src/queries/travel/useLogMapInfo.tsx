import { getLogMapInfo } from "@/api/travel";
import useAuth from "@/hooks/useAuth";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useGetLogMapInfoQuery(travel_log_id: number) {
  const { getUserToken } = useAuth();

  return useQuery({
    queryKey: ["logMapInfo", travel_log_id],
    queryFn: () => getLogMapInfo(travel_log_id),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
    enabled: !!getUserToken(),
  });
}
