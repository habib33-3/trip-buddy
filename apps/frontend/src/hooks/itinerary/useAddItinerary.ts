import { useState } from "react";

import { useParams } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useAuthStore } from "@/stores/useAuthStore";

import { addItineraryApi } from "@/api/itineraryApi";

import type { ApiResponse } from "@/types/response";

import {
  type AddItinerarySchemaType,
  addItinerarySchema,
} from "@/validations/itineraryValidation";

const useAddItinerary = () => {
  const { tripId } = useParams<{ tripId: string }>();

  if (!tripId) {
    throw new Error("tripId is required");
  }

  const form = useForm<AddItinerarySchemaType>({
    defaultValues: {
      notes: "",
      title: "",
    },
    resolver: zodResolver(addItinerarySchema),
  });

  const { user } = useAuthStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const query = useQueryClient();

  const mutate = useMutation({
    mutationFn: async (data: AddItinerarySchemaType & { placeId: string }) =>
      addItineraryApi({
        notes: data.notes,
        placeId: data.placeId,
        title: data.title,
        tripId,
      }),
    onError: (error: AxiosError<ApiResponse<{ message: string }>>) => {
      form.reset();
      toast.error(error.response?.data.message ?? "Something went wrong");
    },
    onSuccess: (data) => {
      void query.invalidateQueries({ queryKey: ["itineraries", tripId] });
      void query.invalidateQueries({ queryKey: ["trip", tripId] });
      void query.invalidateQueries({ queryKey: ["stats", user?.id] });

      setIsModalOpen(false);
      toast.success(data.message);
    },
  });

  const handleAddLocation = (
    data: AddItinerarySchemaType & { placeId: string }
  ) => {
    mutate.mutate(data);
  };

  return {
    form,
    handleAddLocation,
    isLoading: mutate.isPending || form.formState.isSubmitting,
    isModalOpen,
    mutate,
    setIsModalOpen,
  };
};

export default useAddItinerary;
