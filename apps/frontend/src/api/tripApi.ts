import { axiosPrivate } from "@/lib/axios/axios-private";

import type { ApiResponse } from "@/types/response";

import type { CreateTripSchemaType } from "@/validations/tripValidation";

import type { Trip } from "../types";

export const createTripApi = async (payload: CreateTripSchemaType) => {
  const res = await axiosPrivate.post<ApiResponse<Trip>>("/trip", payload);

  return res.data;
};
