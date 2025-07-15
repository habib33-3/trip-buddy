import { axiosPrivate } from "@/lib/axios/axios-private";
import { axiosPublic } from "@/lib/axios/axios-public";

import type { ApiResponse } from "@/types/response";

import type {
  RegisterUserSchemaType,
  UserLoginSchemaType,
} from "@/validations/authValidation";

import type { User } from "../types";

export const userRegisterApi = async (data: RegisterUserSchemaType) => {
  const res = await axiosPublic.post<ApiResponse<User>>("/auth/register", {
    email: data.email,
    name: data.name,
    password: data.password,
  });

  return res.data;
};

export const userLoginApi = async (data: UserLoginSchemaType) => {
  const res = await axiosPublic.post<ApiResponse<User>>("/auth/login", {
    email: data.email,
    password: data.password,
  });

  return res.data;
};

export const userRefreshTokenApi = async () => {
  const res = await axiosPrivate.post<ApiResponse<User>>("/auth/refresh-token");

  return res.data;
};

export const userLogoutApi = async () => {
  const res =
    await axiosPrivate.post<ApiResponse<{ message: string }>>("/auth/logout");

  return res.data;
};
