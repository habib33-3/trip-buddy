/* eslint-disable @typescript-eslint/no-magic-numbers */
import { useQuery } from "@tanstack/react-query";

import { getPlacesApi } from "@/api/placeApi";

const useGetPlaces = (searchQuery?: string) => {
  const { data, status } = useQuery({
    queryFn: async () => getPlacesApi(searchQuery),
    queryKey: ["places", searchQuery],
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    places: data?.data,
    status,
  };
};

export default useGetPlaces;
