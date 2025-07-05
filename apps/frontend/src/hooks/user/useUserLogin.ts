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
    mutationFn: (data: UserLoginSchemaType) => userLoginApi(data),
    onSuccess: (data) => {
      setUser(data.data as User);

      toast.success(data.message);
      form.reset();
      void navigate("/");
    },
    onError: (error: AxiosError<ApiResponse<{ message: string }>>) => {
      toast.error(error.response?.data.message);
    },
  });

  const handleLoginUser = (data: UserLoginSchemaType) => {
    mutate.mutate(data);
  };

  return {
    form,
    isLoading: mutate.isPending || form.formState.isSubmitting,
    handleLoginUser,
  };
};

export default useUserLogin;
