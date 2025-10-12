import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

import { useAuthStore } from "@/stores/useAuthStore";

import { changeAvatarApi } from "@/api/userApi";

import type { ApiResponse } from "@/types/response";

const useChangeAvatar = () => {
  const { setUser } = useAuthStore();

  const mutate = useMutation({
    mutationFn: async (file: File) => changeAvatarApi(file),
    onError: (error: AxiosError<ApiResponse<{ message: string }>>) => {
      toast.error(error.response?.data.message ?? "Something went wrong");
    },
    onSuccess: (data) => {
      toast.success(data.message);

      if (data.data?.image) {
        setUser({
          ...data.data,
          image: data.data.image,
        });
      }
    },
  });

  return {
    changeAvatar: mutate.mutate,
    isLoading: mutate.isPending,
  };
};

export default useChangeAvatar;
