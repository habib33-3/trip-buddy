import { axiosPrivate } from "@/lib/axios/axios-private";

import type { ApiResponse } from "@/types/response";

import type { ChangePasswordSchemaType } from "@/validations/userValidations";

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
