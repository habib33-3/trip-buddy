import axios, { type AxiosError } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

import { env } from "@/config/env.config";

import { useAuthStore } from "@/stores/useAuthStore";

import { userLogoutApi, userRefreshTokenApi } from "@/api/authApi";

export const axiosPrivate = axios.create({
  baseURL: `${env.VITE_BACKEND_API_URL}/api/v1`,
  withCredentials: true,
});

let isRedirecting = false;

const safeRedirectToLogin = () => {
  if (!isRedirecting) {
    isRedirecting = true;
    useAuthStore.getState().clearUser();
    window.location.href = "/login";
  }
};

const handleRefreshToken = async () => {
  try {
    await userRefreshTokenApi();
  } catch (error) {
    console.error("Error refreshing token:", error);
    safeRedirectToLogin();
    throw error;
  }
};

createAuthRefreshInterceptor(
  axiosPrivate,
  async () => {
    await handleRefreshToken();
    return Promise.resolve();
  },
  {
    statusCodes: [401],
  }
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 403) {
      try {
        await userLogoutApi();
      } catch (logoutError) {
        console.error("Logout failed:", logoutError);
      } finally {
        safeRedirectToLogin();
      }
    }
    return Promise.reject(error);
  }
);
