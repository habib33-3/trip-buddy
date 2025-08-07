import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import { deleteItineraryApi } from "@/api/itineraryApi";

import type { ApiResponse } from "@/types/response";

const useDeleteItinerary = (id: string) => {
  const query = useQueryClient();

  const mutate = useMutation({
    mutationFn: async () => deleteItineraryApi(id),
    onError: (error: AxiosError<ApiResponse<{ message: string }>>) => {
      toast.error(error.response?.data.message ?? "Something went wrong");
    },
    onSuccess: async (data) => {
      void query.invalidateQueries({ queryKey: ["itineraries", id] });

      toast.success(data.message);
    },
  });

  const handleDeleteItinerary = () => {
    mutate.mutate();
  };

  return {
    handleDeleteItinerary,
    isLoading: mutate.isPending,
  };
};

export default useDeleteItinerary;
