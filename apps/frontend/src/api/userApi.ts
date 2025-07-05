import { axiosPrivate } from "@/lib/axios/axios-private";
import { axiosPublic } from "@/lib/axios/axios-public";

import type { ApiResponse } from "@/types/response";

import type {
  RegisterUserSchemaType,
  UserLoginSchemaType,
} from "@/validations/userValidation";

import type { User } from "../types";

export const userRegisterApi = async (data: RegisterUserSchemaType) => {
  const res = await axiosPublic.post<ApiResponse<User>>("/user/register", {
    email: data.email,
    name: data.name,
    password: data.password,
  });

  return res.data;
};

export const userLoginApi = async (data: UserLoginSchemaType) => {
  const res = await axiosPublic.post<ApiResponse<User>>("/user/login", {
    email: data.email,
    password: data.password,
  });

  return res.data;
};

export const userRefreshTokenApi = async () => {
  const res = await axiosPrivate.post<ApiResponse<User>>("/user/refresh-token");

  return res.data;
};

export const userLogoutApi = async () => {
  const res =
    await axiosPrivate.post<ApiResponse<{ message: string }>>("/user/logout");

  return res.data;
};
