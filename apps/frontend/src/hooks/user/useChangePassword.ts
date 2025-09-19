import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { changePasswordApi } from "@/api/userApi";

import type { ApiResponse } from "@/types/response";

import type { ChangePasswordSchemaType } from "@/validations/userValidations";

const useChangePassword = () => {
  const form = useForm<ChangePasswordSchemaType>({
    defaultValues: {
      confirmNewPassword: "",
      currentPassword: "",
      newPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ChangePasswordSchemaType) =>
      changePasswordApi(data),
    onError: (error: AxiosError<ApiResponse<{ message: string }>>) => {
      toast.error(
        error.response?.data.message ??
          "An error occurred while changing the password"
      );
    },
    onSuccess: () => {
      form.reset();
      toast.success("Password changed successfully");
    },
  });

  const handleChangePassword = (data: ChangePasswordSchemaType) => {
    mutation.mutate(data);
  };

  return {
    form,
    handleChangePassword,
    isLoading: mutation.isPending || form.formState.isSubmitting,
  };
};

export default useChangePassword;
