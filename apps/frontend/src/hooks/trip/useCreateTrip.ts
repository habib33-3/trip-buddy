import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useUserStore } from "@/stores/userStore";

import { createTripApi } from "@/api/tripApi";

import type { ApiResponse } from "@/types/response";

import type { CreateTripSchemaType } from "@/validations/tripValidation";
import { createTripSchema } from "@/validations/tripValidation";

const useCreateTrip = () => {
  const { user } = useUserStore();
  const query = useQueryClient();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);

  const form = useForm<CreateTripSchemaType>({
    defaultValues: {
      title: "",
      description: "",
      startDate: tomorrow,
      endDate: nextWeek,
    },
    resolver: zodResolver(createTripSchema),
  });

  const mutation = useMutation({
    mutationFn: createTripApi,
    onSuccess: (data) => {
      form.reset();
      if (user?.id) {
        void query.invalidateQueries({
          queryKey: ["trips", user.id],
        });
      }
      toast.success(data.message);
    },
    onError: (error: AxiosError<ApiResponse<{ message: string }>>) => {
      toast.error(error.response?.data.message || "Failed to create trip");
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
