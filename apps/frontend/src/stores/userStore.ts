import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { User } from "../types";

type UseUserStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useUserStore = create<UseUserStore>()(
  persist(
    (set) => {
      return {
        user: null,
        setUser: (user: User) => {
          set({ user });
        },
        clearUser: () => {
          set({ user: null });
        },
      };
    },
    { name: "user-store" }
  )
);
