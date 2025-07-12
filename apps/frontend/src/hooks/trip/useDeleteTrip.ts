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
    mutationFn: () => deleteTripApi(tripId as string),
    onSuccess: (data) => {
      void navigate("/trips");
      toast.success(data.message);
    },
    onError: (error: AxiosError<ApiResponse<{ message: string }>>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });

  return {
    deleteTrip: mutate.mutate,
    isLoading: mutate.isPending,
  };
};

export default useDeleteTrip;
