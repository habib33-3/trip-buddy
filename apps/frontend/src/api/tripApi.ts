import { axiosPrivate } from "@/lib/axios/axios-private";

import type { ApiResponse } from "@/types/response";

import type {
  CreateTripSchemaType,
  UpdateTripSchemaType,
} from "@/validations/tripValidation";

import type { Trip, TripStatus } from "../types";

export const createTripApi = async (payload: CreateTripSchemaType) => {
  const res = await axiosPrivate.post<ApiResponse<Trip>>("/trip", payload);

  return res.data;
};

export const getAllTripsApi = async () => {
  const res = await axiosPrivate.get<ApiResponse<Trip[]>>("/trip");

  return res.data;
};

export const getSingleTripsApi = async (id: string) => {
  const res = await axiosPrivate.get<ApiResponse<Trip>>(`/trip/${id}`);

  return res.data;
};

export const updateTripApi = async (
  id: string,
  payload: UpdateTripSchemaType
) => {
  const res = await axiosPrivate.put<ApiResponse<Trip>>(`/trip/${id}`, payload);

  return res.data;
};

export const deleteTripApi = async (id: string) => {
  const res = await axiosPrivate.delete<ApiResponse<{ message: string }>>(
    `/trip/${id}`
  );

  return res.data;
};

export const changeTripStatusApi = async (id: string, status: TripStatus) => {
  const res = await axiosPrivate.put<ApiResponse<Trip>>(
    `/trip/${id}/change-status`,
    { status }
  );

  return res.data;
};
