import { axiosPrivate } from "@/lib/axios/axios-private";

import type { ApiResponse } from "@/types/response";

import type {
  AddItinerarySchemaType,
  UpdateItinerarySchemaType,
} from "@/validations/itineraryValidation";

import type { Itinerary, ItineraryStatus } from "../types";

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

export const getSingleItineraryApi = async (id: string) => {
  const res = await axiosPrivate.get<ApiResponse<Itinerary>>(
    `/itinerary/${id}`
  );

  return res.data;
};

export const deleteItineraryApi = async (id: string) => {
  const res = await axiosPrivate.delete<ApiResponse<{ message: string }>>(
    `/itinerary/${id}`
  );

  return res.data;
};

export const updateItineraryApi = async (
  id: string,
  data: UpdateItinerarySchemaType
) => {
  const res = await axiosPrivate.put<ApiResponse<Itinerary>>(
    `/itinerary/${id}`,
    data
  );

  return res.data;
};

export const changeItineraryStatusApi = async (
  id: string,
  status: ItineraryStatus
) => {
  const res = await axiosPrivate.put<ApiResponse<Itinerary>>(
    `/itinerary/${id}/change-status`,
    { status }
  );

  return res.data;
};
