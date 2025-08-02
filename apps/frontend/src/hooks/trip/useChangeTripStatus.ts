import { useParams } from "react-router";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import { changeTripStatusApi } from "@/api/tripApi";

import type { TripStatus } from "@/types/index";
import type { ApiResponse } from "@/types/response";

const useChangeTripStatus = () => {
  const { tripId } = useParams<{ tripId: string }>();

  if (!tripId) {
    return {
      error: "Trip ID is required",
      handleChangeTripStatus: () => {
        toast.error("Trip ID is required");
      },
      isLoading: false,
    };
  }

  const query = useQueryClient();

  const mutate = useMutation({
    mutationFn: async (status: TripStatus) =>
      changeTripStatusApi(tripId, status),
    onError: (error: AxiosError<ApiResponse<{ message: string }>>) => {
      toast.error(error.response?.data.message ?? "Something went wrong");
    },
    onSuccess: async (data) => {
      void query.invalidateQueries({ queryKey: ["trip", data.data?.id] });
      toast.success(data.message);
    },
  });

  const handleChangeTripStatus = (status: TripStatus) => {
    mutate.mutate(status);
  };

  return {
    handleChangeTripStatus,
    isLoading: mutate.isPending,
  };
};

export default useChangeTripStatus;
