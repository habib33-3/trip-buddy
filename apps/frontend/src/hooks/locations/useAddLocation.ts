import { useState } from "react";

import { useParams } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { addLocationApi } from "@/api/locationApi";

import type { ApiResponse } from "@/types/response";

import {
  type AddLocationSchemaType,
  addLocationSchema,
} from "@/validations/locationsValidation";

const useAddLocation = () => {
  const { tripId } = useParams<{ tripId: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<AddLocationSchemaType>({
    defaultValues: {
      address: "",
    },
    resolver: zodResolver(addLocationSchema),
  });

  if (!tripId) {
    throw new Error("tripId is required");
  }

  const mutate = useMutation({
    mutationFn: async (data: AddLocationSchemaType) =>
      addLocationApi({
        address: data.address,
        tripId,
      }),
    onError: (error: AxiosError<ApiResponse<{ message: string }>>) => {
      toast.error(error.response?.data.message ?? "Something went wrong");
    },
    onSuccess: (data) => {
      form.reset();
      setIsModalOpen(false);
      toast.success(data.message);
    },
  });

  const handleAddLocation = (data: AddLocationSchemaType) => {
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

export default useAddLocation;
