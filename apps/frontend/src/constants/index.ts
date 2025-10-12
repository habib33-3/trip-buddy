import type { ItineraryStatus, TripStatus } from "../types";

export const navLinks = [
  {
    name: "Trips",
    path: "/trips",
  },
  {
    name: "Globes",
    path: "/globe",
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
  ACTIVE: "bg-green-300 text-green-900",
  CANCELLED: "bg-red-300 text-red-900",
  COMPLETED: "bg-teal-200 text-teal-900",
  PLANNED: "bg-amber-200 text-amber-900",
};

export const itineraryStatusColorMap: Record<ItineraryStatus, string> = {
  CANCELLED: "bg-red-300 text-red-900",
  COMPLETED: "bg-teal-200 text-teal-900",
  UPCOMING: "bg-orange-200 text-orange-900",
};
