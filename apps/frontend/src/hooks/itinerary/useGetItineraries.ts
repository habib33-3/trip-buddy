import { useParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getItinerariesApi } from "@/api/itineraryApi";

const useGetItineraries = () => {
  const { tripId } = useParams<{ tripId: string }>();

  if (!tripId) {
    throw new Error("tripId is required");
  }

  const { data, status } = useQuery({
    enabled: Boolean(tripId),
    queryFn: async () => getItinerariesApi(tripId),
    queryKey: ["itineraries", tripId],
    retry: 3,
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    staleTime: 5 * 60 * 1000,
  });

  return {
    locations: data?.data,
    status,
  };
};

export default useGetItineraries;
