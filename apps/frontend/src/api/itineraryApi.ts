import { axiosPrivate } from "@/lib/axios/axios-private";

import type { ApiResponse } from "@/types/response";

import type { Itinerary } from "../types";

export const addItineraryApi = async (data: {
  address: string;
  tripId: string;
}) => {
  const res = await axiosPrivate.post<ApiResponse<Itinerary>>(`/itinerary`, {
    address: data.address,
    tripId: data.tripId,
  });

  return res.data;
};

export const getItinerariesApi = async (tripId: string) => {
  const res = await axiosPrivate.get<ApiResponse<Itinerary[]>>(
    `/itinerary/trip/${tripId}`
  );

  return res.data;
};
