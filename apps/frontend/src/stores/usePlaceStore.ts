import { create } from "zustand";

import type { Place } from "../types";

type PlaceStoreType = {
  place: Place | null;
  setPlace: (place: Place | null) => void;
  clearPlace: () => void;
};

export const usePlaceStore = create<PlaceStoreType>((set) => ({
  clearPlace: () => set({ place: null }),
  place: null,
  setPlace: (place: Place | null) => set({ place }),
}));
