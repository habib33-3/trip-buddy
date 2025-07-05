import type { AxiosError } from "axios";
import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

import { useUserStore } from "@/stores/userStore";

import { userLogoutApi, userRefreshTokenApi } from "@/api/userApi";

// Create axios instance
export const axiosPrivate = axios.create({ withCredentials: true });

// Setup refresh logic with axios-auth-refresh

createAuthRefreshInterceptor(
  axiosPrivate,
  async () => {
    await userRefreshTokenApi();
    return Promise.resolve();
  },
  {
    statusCodes: [401],
  }
);

// Additional interceptor for handling 403 errors
axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 403) {
      try {
        await userLogoutApi();
        useUserStore.getState().clearUser();
        window.location.href = "/login"; // Consider a router-based redirect if using React Router
      } catch (logoutError) {
        console.error("Logout failed:", logoutError);
        useUserStore.getState().clearUser();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
