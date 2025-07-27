import { useQuery } from "@tanstack/react-query";

import { getSingleItineraryApi } from "@/api/itineraryApi";

const useGetSingleItinerary = (id: string) => {
  const { data, status } = useQuery({
    queryFn: async () => getSingleItineraryApi(id),
    queryKey: ["itinerary", id],
  });

  return {
    itinerary: data?.data,
    status,
  };
};

export default useGetSingleItinerary;
