import { axiosPrivate } from "@/lib/axios/axios-private";

import type { ApiResponse } from "@/types/response";

import type { AddItinerarySchemaType } from "@/validations/itineraryValidation";

import type { Itinerary } from "../types";

export const addItineraryApi = async (
  data: AddItinerarySchemaType & { tripId: string; placeId: string }
) => {
  const res = await axiosPrivate.post<ApiResponse<Itinerary>>(`/itinerary`, {
    notes: data.notes,
    placeId: data.placeId,
    title: data.title,
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
