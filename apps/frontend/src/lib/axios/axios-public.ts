import axios from "axios";

import { env } from "@/config/env.config";

export const axiosPublic = axios.create({
  baseURL: `${env.VITE_BACKEND_API_URL}/api/v1`,
  withCredentials: true,
});
