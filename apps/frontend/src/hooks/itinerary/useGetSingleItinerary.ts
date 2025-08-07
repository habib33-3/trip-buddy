import { useQuery } from "@tanstack/react-query";

import { getSingleItineraryApi } from "@/api/itineraryApi";

const useGetSingleItinerary = (id: string) => {
  const { data, status } = useQuery({
    enabled: Boolean(id.trim()),
    queryFn: async () => getSingleItineraryApi(id),
    queryKey: ["itinerary", id],
    retry: (failureCount) => failureCount < 2,
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    itinerary: data?.data,
    status,
  };
};

export default useGetSingleItinerary;
