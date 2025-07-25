import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { addPlaceApi } from "@/api/placeApi";

import type { ApiResponse } from "@/types/response";

import type { AddPlaceSchemaType } from "@/validations/placeValidation";
import { addPlaceSchema } from "@/validations/placeValidation";

const useAddPlace = () => {
  const queryClient = useQueryClient();

  const form = useForm<AddPlaceSchemaType>({
    defaultValues: {
      address: "",
    },
    resolver: zodResolver(addPlaceSchema),
  });

  const mutate = useMutation({
    mutationFn: async (data: AddPlaceSchemaType) => addPlaceApi(data.address),
    onError: (error: AxiosError<ApiResponse<{ message: string }>>) => {
      toast.error(error.response?.data.message ?? "Something went wrong");
    },
    onSuccess: () => {
      form.reset();
      void queryClient.invalidateQueries({ queryKey: ["places"] });
    },
  });

  const addPlace = (data: AddPlaceSchemaType) => mutate.mutate(data);

  return {
    addPlace,
    form,
    isLoading: mutate.isPending || form.formState.isSubmitting,
  };
};

export default useAddPlace;
