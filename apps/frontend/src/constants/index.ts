import type { ItineraryStatus, TripStatus } from "../types";

export const navLinks = [
  {
    name: "Trips",
    path: "/trips",
  },
  {
    name: "Globes",
    path: "/trips/globe",
  },
];

export const tripStatus = [
  "ACTIVE",
  "CANCELLED",
  "COMPLETED",
  "PLANNED",
] as const;

export const itineraryStatus = ["CANCELLED", "COMPLETED", "UPCOMING"] as const;

export const tripStatusColorMap: Record<TripStatus, string> = {
  ACTIVE: "bg-green-200 text-green-800",
  CANCELLED: "bg-red-200 text-red-800",
  COMPLETED: "bg-gray-200 text-gray-800",
  PLANNED: "bg-blue-200 text-blue-800",
};

export const itineraryStatusColorMap: Record<ItineraryStatus, string> = {
  CANCELLED: "bg-pink-100 text-pink-700",
  COMPLETED: "bg-neutral-100 text-neutral-700",
  UPCOMING: "bg-cyan-100 text-cyan-700",
};
