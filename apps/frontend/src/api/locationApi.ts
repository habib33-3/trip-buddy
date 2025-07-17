import { axiosPrivate } from "@/lib/axios/axios-private";

import type { ApiResponse } from "@/types/response";

import type { Location } from "../types";

export const addLocationApi = async (data: {
  address: string;
  tripId: string;
}) => {
  const res = await axiosPrivate.post<ApiResponse<Location>>(`/location`, {
    address: data.address,
    tripId: data.tripId,
  });

  return res.data;
};

export const getLocationsApi = async (tripId: string) => {
  const res = await axiosPrivate.get<ApiResponse<Location[]>>(
    `/location/trip/${tripId}`
  );

  return res.data;
};
