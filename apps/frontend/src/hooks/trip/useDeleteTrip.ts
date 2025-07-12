import { useNavigate, useParams } from "react-router";

import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import { deleteTripApi } from "@/api/tripApi";

import type { ApiResponse } from "@/types/response";

const useDeleteTrip = () => {
  const { tripId } = useParams();

  const navigate = useNavigate();

  const mutate = useMutation({
    mutationFn: async () => deleteTripApi(tripId as string),
    onError: (error: AxiosError<ApiResponse<{ message: string }>>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
    onSuccess: async (data) => {
      await navigate("/trips");

      toast.success(data.message);
    },
  });

  return {
    deleteTrip: mutate.mutate,
    isLoading: mutate.isPending,
  };
};

export default useDeleteTrip;
