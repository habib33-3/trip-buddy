import axios from "axios";

import { env } from "@/config/env.config";

export const axiosPrivate = axios.create({
  baseURL: `${env.VITE_BACKEND_API_URL}/api`,
  withCredentials: true,
});
