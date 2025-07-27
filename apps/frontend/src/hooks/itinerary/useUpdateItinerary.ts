import { useCallback, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateItineraryApi } from "@/api/itineraryApi";

import type { ApiResponse } from "@/types/response";

import {
  type UpdateItinerarySchemaType,
  updateItinerarySchema,
} from "@/validations/itineraryValidation";

import useGetSingleItinerary from "./useGetSingleItinerary";

const useUpdateItinerary = (id: string) => {
  const { itinerary, status } = useGetSingleItinerary(id);

  const form = useForm<UpdateItinerarySchemaType>({
    resolver: zodResolver(updateItinerarySchema),
  });

  useEffect(() => {
    if (itinerary) {
      form.reset({
        notes: itinerary.notes || "",
        title: itinerary.title || "",
      });
    }
  }, [itinerary, form]);

  const query = useQueryClient();

  const mutate = useMutation({
    mutationFn: async (data: UpdateItinerarySchemaType) =>
      updateItineraryApi(id, data),
    onError: (error: AxiosError<ApiResponse<{ message: string }>>) => {
      toast.error(error.response?.data.message ?? "Something went wrong");
    },
    onSuccess: async (data) => {
      void query.invalidateQueries({ queryKey: ["itineraries", id] });
      void query.invalidateQueries({ queryKey: ["trip", data.data?.tripId] });
      toast.success(data.message);
    },
  });

  const handleUpdateItinerary = useCallback(
    (data: UpdateItinerarySchemaType) => {
      mutate.mutate(data);
    },
    [mutate]
  );

  return {
    form,
    handleUpdateItinerary,
    isLoading:
      mutate.isPending || status === "pending" || form.formState.isSubmitting,
  };
};

export default useUpdateItinerary;
