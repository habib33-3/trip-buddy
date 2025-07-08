import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createTripApi } from "@/api/tripApi";

import type { ApiResponse } from "@/types/response";

import {
  type CreateTripSchemaType,
  createTripSchema,
} from "@/validations/tripValidation";

const useCreateTrip = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const form = useForm<CreateTripSchemaType>({
    defaultValues: {
      title: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
    },
    resolver: zodResolver(createTripSchema),
  });

  const mutate = useMutation({
    mutationFn: (data: CreateTripSchemaType) => createTripApi(data),
    onSuccess: (data) => {
      setIsModalOpen(false);
      form.reset();
      toast.success(data.message);
    },
    onError: (error: AxiosError<ApiResponse<{ message: string }>>) => {
      toast.error(error.response?.data.message || "Failed to create trip");
    },
  });

  const handleCreateTrip = (data: CreateTripSchemaType) => {
    mutate.mutate(data);
  };

  return {
    form,
    handleCreateTrip,
    isLoading: mutate.isPending || form.formState.isSubmitting,
    isModalOpen,
    setIsModalOpen,
  };
};

export default useCreateTrip;
