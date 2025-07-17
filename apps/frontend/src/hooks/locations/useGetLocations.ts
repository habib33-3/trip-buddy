import { useParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getLocationsApi } from "@/api/locationApi";

const useGetLocations = () => {
  const { tripId } = useParams<{ tripId: string }>();

  if (!tripId) {
    throw new Error("tripId is required");
  }

  const { data, status } = useQuery({
    queryFn: async () => getLocationsApi(tripId),
    queryKey: ["locations", tripId],
  });

  return {
    locations: data?.data,
    status,
  };
};

export default useGetLocations;
