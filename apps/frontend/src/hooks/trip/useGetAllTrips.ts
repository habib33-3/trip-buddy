import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "@/stores/useAuthStore";

import { getAllTripsApi } from "@/api/tripApi";

const useGetAllTrips = () => {
  const { user } = useAuthStore();

  const { data, isError, isLoading } = useQuery({
    enabled: Boolean(user?.id),
    queryFn: getAllTripsApi,
    queryKey: ["trips", user?.id],
    refetchOnWindowFocus: false,
  });

  return {
    isError,
    isLoading,
    trips: data?.data,
  };
};

export default useGetAllTrips;
