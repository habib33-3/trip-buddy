import { useNavigate } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useUserStore } from "@/stores/userStore";

import { userRegisterApi } from "@/api/userApi";

import type { User } from "@/types/index";
import type { ApiResponse } from "@/types/response";

import {
  type RegisterUserSchemaType,
  registerUserSchema,
} from "@/validations/userValidation";

const useUserRegister = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const form = useForm<RegisterUserSchemaType>({
    defaultValues: {
      confirmPassword: "",
      email: "",
      name: "",
      password: "",
    },
    resolver: zodResolver(registerUserSchema),
  });

  const mutate = useMutation({
    mutationFn: async (data: RegisterUserSchemaType) => userRegisterApi(data),
    onError: (error: AxiosError<ApiResponse<{ message: string }>>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
    onSuccess: async (data) => {
      setUser(data.data as User);

      form.reset();
      await navigate("/trips");

      toast.success(data.message);
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
