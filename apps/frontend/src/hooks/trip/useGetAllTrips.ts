import { useSearchParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "@/stores/useAuthStore";

import { getAllTripsApi } from "@/api/tripApi";

const useGetAllTrips = () => {
  const { user } = useAuthStore();

  const [searchParams] = useSearchParams();

  const searchTerm = searchParams.get("search") ?? "";

  const { data, isError, isLoading } = useQuery({
    enabled: Boolean(user?.id),
    queryFn: async () =>
      getAllTripsApi({
        searchTerm,
        status: ["PLANNED", "ACTIVE"],
      }),
    queryKey: ["trips", user?.id, searchTerm],
    refetchOnWindowFocus: false,
  });

  return {
    isError,
    isLoading,
    trips: data?.data,
  };
};

export default useGetAllTrips;
