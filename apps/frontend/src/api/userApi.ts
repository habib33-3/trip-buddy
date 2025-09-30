import { axiosPrivate } from "@/lib/axios/axios-private";

import type { ApiResponse } from "@/types/response";

import type { ChangePasswordSchemaType } from "@/validations/userValidations";

import type { User } from "../types";

export const changePasswordApi = async ({
  currentPassword,
  newPassword,
}: ChangePasswordSchemaType) => {
  const res = await axiosPrivate.put<ApiResponse<{ message: string }>>(
    "/user/change-password",
    {
      currentPassword,
      newPassword,
    }
  );

  return res.data;
};

export const changeAvatarApi = async (file: File) => {
  const formData = new FormData();

  formData.append("avatar", file);

  const res = await axiosPrivate.put<ApiResponse<User>>(
    "/user/change-avatar",
    formData
  );

  return res.data;
};
