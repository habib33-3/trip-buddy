import { useNavigate } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { userRegisterApi } from "@/api/userApi";

import type { ApiResponse } from "@/types/response";

import {
  type RegisterUserSchemaType,
  registerUserSchema,
} from "@/validations/userValidation";

const useUserRegister = () => {
  const navigate = useNavigate();

  const form = useForm<RegisterUserSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registerUserSchema),
  });

  const mutate = useMutation({
    mutationFn: (data: RegisterUserSchemaType) => userRegisterApi(data),
    onSuccess: (data) => {
      toast.success(data.message);
      form.reset();
      void navigate("/");
    },
    onError: (error: AxiosError<ApiResponse<{ message: string }>>) => {
      toast.error(error.response?.data.message);
    },
  });

  const handleRegisterUser = (data: RegisterUserSchemaType) => {
    mutate.mutate(data);
  };

  return {
    form,

    handleRegisterUser,
    isLoading: mutate.isPending || form.formState.isSubmitting,
  };
};

export default useUserRegister;
