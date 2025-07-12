import { useMemo } from "react";

import { useParams } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateTripApi } from "@/api/tripApi";

import type { ApiResponse } from "@/types/response";

import type { UpdateTripSchemaType } from "@/validations/tripValidation";
import { updateTripSchema } from "@/validations/tripValidation";

import useGetSingleTrip from "./useGetSingleTrip";

const useUpdateTrip = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const { trip, status } = useGetSingleTrip();

  const defaultValues = useMemo(
    () => ({
      title: trip?.title || "",
      description: trip?.description || "",
      startDate: trip?.startDate ? new Date(trip.startDate) : new Date(),
      endDate: trip?.endDate ? new Date(trip.endDate) : new Date(),
    }),
    [trip]
  );

  const form = useForm<UpdateTripSchemaType>({
    defaultValues,
    resolver: zodResolver(updateTripSchema),
  });

  const query = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: UpdateTripSchemaType) =>
      updateTripApi(tripId as string, data),
    onSuccess: (data) => {
      void query.invalidateQueries({
        queryKey: ["trip", tripId],
      });

      toast.success(data.message);
    },
    onError: (error: AxiosError<ApiResponse<{ message: string }>>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });

  const handleUpdateTrip = (data: UpdateTripSchemaType) => {
    mutation.mutate(data);
  };

  const isLoading =
    status === "pending" || mutation.isPending || form.formState.isSubmitting;

  return {
    form,
    isLoading,
    handleUpdateTrip,
  };
};

export default useUpdateTrip;
