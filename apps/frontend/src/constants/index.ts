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
  ACTIVE: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
  COMPLETED: "bg-gray-200 text-gray-800",
  PLANNED: "bg-blue-100 text-blue-700",
};

export const itineraryStatusColorMap: Record<ItineraryStatus, string> = {
  CANCELLED: "bg-red-100 text-red-700",
  COMPLETED: "bg-gray-200 text-gray-800",
  UPCOMING: "bg-blue-100 text-blue-700",
};
