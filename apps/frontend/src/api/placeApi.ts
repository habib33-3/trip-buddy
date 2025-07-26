import { axiosPrivate } from "@/lib/axios/axios-private";

import type { ApiResponse } from "@/types/response";

import type { Place } from "../types";

export const addPlaceApi = async (address: string) => {
  if (!address.trim()) {
    throw new Error("Address is required");
  }

  const res = await axiosPrivate.post<ApiResponse<Place>>(`/place`, {
    address: address.trim(),
  });

  return res.data;
};

export const getPlacesApi = async (searchQuery?: string) => {
  const queryParam = searchQuery?.trim()
    ? `?searchQuery=${encodeURIComponent(searchQuery.trim())}`
    : "";

  const res = await axiosPrivate.get<ApiResponse<Place[]>>(
    `/place${queryParam}`
  );

  return res.data;
};

export const getSinglePlaceApi = async (id: string) => {
  const res = await axiosPrivate.get<ApiResponse<Place>>(`/place/${id}`);

  return res.data;
};
