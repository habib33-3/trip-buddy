import { useState } from "react";

import { useParams } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { addItineraryApi } from "@/api/itineraryApi";

import type { ApiResponse } from "@/types/response";

import type { AddItinerarySchemaType } from "@/validations/itineraryValidation";
import { addItinerarySchema } from "@/validations/itineraryValidation";

const useAddItinerary = () => {
  const { tripId } = useParams<{ tripId: string }>();

  if (!tripId) {
    throw new Error("tripId is required");
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<AddItinerarySchemaType>({
    defaultValues: {
      address: "",
    },
    resolver: zodResolver(addItinerarySchema),
  });

  const query = useQueryClient();

  const mutate = useMutation({
    mutationFn: async (data: AddItinerarySchemaType) =>
      addItineraryApi({
        address: data.address,
        tripId,
      }),
    onError: (error: AxiosError<ApiResponse<{ message: string }>>) => {
      toast.error(error.response?.data.message ?? "Something went wrong");
    },
    onSuccess: (data) => {
      void query.invalidateQueries({ queryKey: ["itineraries", tripId] });
      void query.invalidateQueries({ queryKey: ["trip", tripId] });

      form.reset();

      setIsModalOpen(false);
      toast.success(data.message);
    },
  });

  const handleAddLocation = (data: AddItinerarySchemaType) => {
    mutate.mutate(data);
  };

  return {
    form,
    handleAddLocation,
    isLoading: mutate.isPending,
    isModalOpen,
    setIsModalOpen,
  };
};

export default useAddItinerary;
