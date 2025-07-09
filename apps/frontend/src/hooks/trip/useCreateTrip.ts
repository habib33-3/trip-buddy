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

  const form = useForm<CreateTripSchemaType>({
    defaultValues: {
      title: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
    },
    resolver: zodResolver(createTripSchema),
  });

  const query = useQueryClient();

  const mutate = useMutation({
    mutationFn: (data: CreateTripSchemaType) => createTripApi(data),
    onSuccess: (data) => {
      form.reset();
      void query.invalidateQueries({
        queryKey: ["trips", user?.id],
      });
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
  };
};

export default useCreateTrip;
