import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { User } from "../types";

type UseAuthStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useAuthStore = create<UseAuthStore>()(
  persist(
    (set) => {
      return {
        clearUser: () => {
          set({ user: null });
        },
        setUser: (user: User) => {
          set({ user });
        },
        user: null,
      };
    },
    { name: "user-store" }
  )
);
