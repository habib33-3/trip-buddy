import { useParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import { getSingleTripsApi } from "@/api/tripApi";

const useGetSingleTrip = () => {
  const { tripId } = useParams();

  const { data, status } = useQuery({
    queryFn: async () => getSingleTripsApi(tripId as string),
    queryKey: ["trip", tripId],
  });

  return {
    status,
    trip: data?.data,
  };
};

export default useGetSingleTrip;
