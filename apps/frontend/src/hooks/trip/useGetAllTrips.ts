import { useQuery } from "@tanstack/react-query";

import { useUserStore } from "@/stores/userStore";

import { getAllTripsApi } from "@/api/tripApi";

const useGetAllTrips = () => {
  const { user } = useUserStore();

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
