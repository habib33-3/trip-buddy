import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "@/stores/useAuthStore";

import { getStatsApi } from "@/api/statsApi";

const useGetStats = () => {
  const { user } = useAuthStore();

  const { data, status } = useQuery({
    queryFn: getStatsApi,

    queryKey: ["stats", user?.id],
  });

  return {
    stats: data?.data,
    status,
  };
};

export default useGetStats;
