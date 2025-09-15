import { getLogList } from "@/api/travel";
import useAuth from "@/hooks/useAuth";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useGetLogListQuery(theme?: string) {
  const { getUserToken } = useAuth();

  return useQuery({
    queryKey: ["logList", theme],
    queryFn: () => getLogList(theme),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
    enabled: !!getUserToken(),
  });
}
