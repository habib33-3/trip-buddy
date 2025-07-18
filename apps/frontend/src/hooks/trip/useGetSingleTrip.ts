import { useParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getSingleTripsApi } from "@/api/tripApi";

const useGetSingleTrip = () => {
  const { tripId } = useParams();

  if (!tripId) {
    throw new Error("tripId is required");
  }

  const { data, status } = useQuery({
    queryFn: async () => getSingleTripsApi(tripId),
    queryKey: ["trip", tripId],
  });

  const destinationCount = data?.data?.Location?.length ?? 0;

  return {
    destinationCount,
    status,
    trip: data?.data ?? null,
  };
};

export default useGetSingleTrip;
