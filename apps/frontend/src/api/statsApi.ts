import { axiosPrivate } from "@/lib/axios/axios-private";

import type { ApiResponse } from "@/types/response";

import type { Stats } from "../types";

export const getStatsApi = async (): Promise<ApiResponse<Stats>> => {
  const res = await axiosPrivate.get<ApiResponse<Stats>>("/stats");

  return res.data;
};
