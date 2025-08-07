import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "@/stores/useAuthStore";

import { getRecentTripsApi } from "@/api/tripApi";

const useGetRecentTrip = () => {
  const { user } = useAuthStore();

  const { data, status } = useQuery({
    enabled: Boolean(user?.id),
    queryFn: async () => getRecentTripsApi(),
    queryKey: ["recent-trip", user?.id],
    retry: 3,
  });

  return {
    recentTrip: data?.data,
    status,
  };
};

export default useGetRecentTrip;
