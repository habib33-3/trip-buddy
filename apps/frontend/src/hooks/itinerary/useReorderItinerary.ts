import { useParams } from "react-router";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { reorderItinerariesApi } from "@/api/itineraryApi";

const useReorderItinerary = () => {
  const { tripId } = useParams<{ tripId: string }>();

  if (!tripId) {
    throw new Error("tripId is required");
  }

  const query = useQueryClient();

  const mutate = useMutation({
    mutationFn: async (data: string[]) => reorderItinerariesApi(data, tripId),

    onError: (error) => {
      console.error("Error reordering itineraries:", error);
    },
    onSuccess: () => {
      void query.invalidateQueries({
        queryKey: ["itineraries", tripId],
      });
    },
  });

  const handleReorderItineraries = async (itineraryIds: string[]) => {
    mutate.mutate(itineraryIds);
  };

  return { handleReorderItineraries, isLoading: mutate.isPending };
};

export default useReorderItinerary;
