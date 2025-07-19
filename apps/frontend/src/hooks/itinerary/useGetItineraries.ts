import { useParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getItinerariesApi } from "@/api/itineraryApi";

const useGetItineraries = () => {
  const { tripId } = useParams<{ tripId: string }>();

  if (!tripId) {
    throw new Error("tripId is required");
  }

  const { data, status } = useQuery({
    queryFn: async () => getItinerariesApi(tripId),
    queryKey: ["itineraries", tripId],
  });

  return {
    locations: data?.data,
    status,
  };
};

export default useGetItineraries;
