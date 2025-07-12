import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import { useUserStore } from "@/stores/userStore";

import { userLogoutApi } from "@/api/userApi";

import type { ApiResponse } from "@/types/response";

const useUserLogout = () => {
  const { clearUser } = useUserStore();

  const mutate = useMutation({
    mutationFn: async () => userLogoutApi(),
    onError: (error: AxiosError<ApiResponse<{ message: string }>>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
    onSuccess: (data) => {
      clearUser();
      toast.success(data.message);
    },
  });

  const handleLogout = () => {
    mutate.mutate();
  };

  return {
    handleLogout,
    isLoading: mutate.isPending,
  };
};

export default useUserLogout;
