import { useParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getSingleTripsApi } from "@/api/tripApi";

const useGetSingleTrip = () => {
  const { tripId } = useParams();

  const { data, status } = useQuery({
    queryKey: ["trip", tripId],
    queryFn: async () => getSingleTripsApi(tripId!),
  });

  return {
    trip: data?.data,
    status,
  };
};

export default useGetSingleTrip;
