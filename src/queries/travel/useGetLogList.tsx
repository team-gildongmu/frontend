import { getLogList } from "@/api/travel";
import useAuth from "@/hooks/useAuth";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useGetLogListQuery() {
  const { getUserToken } = useAuth();

  return useQuery({
    queryKey: ["logList"],
    queryFn: () => getLogList(),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
    enabled: !!getUserToken(),
  });
}
