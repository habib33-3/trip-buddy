import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useAuthStore } from "@/stores/useAuthStore";

import { createTripApi } from "@/api/tripApi";

import type { ApiResponse } from "@/types/response";

import type { CreateTripSchemaType } from "@/validations/tripValidation";
import { createTripSchema } from "@/validations/tripValidation";

const useCreateTrip = () => {
  const { user } = useAuthStore();
  const query = useQueryClient();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);

  const form = useForm<CreateTripSchemaType>({
    defaultValues: {
      description: "",
      endDate: nextWeek,
      startDate: tomorrow,
      title: "",
    },
    resolver: zodResolver(createTripSchema),
  });

  const mutation = useMutation({
    mutationFn: createTripApi,
    onError: (error: AxiosError<ApiResponse<{ message: string }>>) => {
      toast.error(error.response?.data.message ?? "Failed to create trip");
    },
    onSuccess: (data) => {
      form.reset();

      if (user?.id) {
        query
          .invalidateQueries({
            queryKey: ["trips", user.id],
          })
          .catch(console.error);
      }

      toast.success(data.message);
    },
  });

  const handleCreateTrip = (data: CreateTripSchemaType) => {
    mutation.mutate(data);
  };

  return {
    form,
    handleCreateTrip,
    isLoading: mutation.isPending || form.formState.isSubmitting,
  };
};

export default useCreateTrip;
