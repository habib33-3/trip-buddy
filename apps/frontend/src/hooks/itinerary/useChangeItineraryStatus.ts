import { useParams } from "react-router";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import { changeItineraryStatusApi } from "@/api/itineraryApi";

import type { ItineraryStatus } from "@/types/index";
import type { ApiResponse } from "@/types/response";

const useChangeItineraryStatus = (id: string) => {
  const { tripId } = useParams<{ tripId: string }>();

  if (!tripId) {
    return {
      error: "tripId is required",
      handleChangeItineraryStatus: () => {
        toast.error("tripId is required");
      },
      isLoading: false,
    };
  }

  const query = useQueryClient();

  const mutate = useMutation({
    mutationFn: async (status: ItineraryStatus) =>
      changeItineraryStatusApi(id, status),
    onError: (error: AxiosError<ApiResponse<{ message: string }>>) => {
      toast.error(error.response?.data.message ?? "Something went wrong");
    },
    onSuccess: async (data) => {
      void query.invalidateQueries({ queryKey: ["itineraries", tripId] });
      toast.success(data.message);
    },
  });

  const handleChangeItineraryStatus = (status: ItineraryStatus) => {
    mutate.mutate(status);
  };

  return {
    handleChangeItineraryStatus,
    isLoading: mutate.isPending,
  };
};

export default useChangeItineraryStatus;
