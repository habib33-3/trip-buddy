import { useQuery } from "@tanstack/react-query";

import { useUserStore } from "@/stores/userStore";

import { getAllTripsApi } from "@/api/tripApi";

const useGetAllTrips = () => {
  const { user } = useUserStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["trips", user?.id],
    queryFn: getAllTripsApi,
    enabled: Boolean(user?.id),
    refetchOnWindowFocus: false,
  });

  return {
    trips: data?.data,
    isLoading,
    isError,
  };
};

export default useGetAllTrips;
