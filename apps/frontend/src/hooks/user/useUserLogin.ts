import { useNavigate } from "react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useUserStore } from "@/stores/userStore";

import { userLoginApi } from "@/api/userApi";

import type { User } from "@/types/index";
import type { ApiResponse } from "@/types/response";

import type { UserLoginSchemaType } from "@/validations/userValidation";
import { userLoginSchema } from "@/validations/userValidation";

const useUserLogin = () => {
  const navigate = useNavigate();

  const { setUser } = useUserStore();

  const form = useForm<UserLoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },

    resolver: zodResolver(userLoginSchema),
  });

  const mutate = useMutation({
    mutationFn: async (data: UserLoginSchemaType) => userLoginApi(data),
    onError: (error: AxiosError<ApiResponse<{ message: string }>>) => {
      toast.error(error.response?.data.message);
    },
    onSuccess: async (data) => {
      setUser(data.data as User);

      form.reset();

      await navigate("/trips");

      toast.success(data.message);
    },
  });

  const handleLoginUser = (data: UserLoginSchemaType) => {
    mutate.mutate(data);
  };

  return {
    form,
    handleLoginUser,
    isLoading: mutate.isPending || form.formState.isSubmitting,
  };
};

export default useUserLogin;
