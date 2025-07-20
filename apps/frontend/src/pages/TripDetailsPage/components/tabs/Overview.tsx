import { lazy } from "react";

import { Calendar1Icon, MapPin } from "lucide-react";

import useGetSingleTrip from "@/hooks/trip/useGetSingleTrip";

import Loader from "@/shared/Loader";

import { formatDateRange } from "@/utils/date";

import type { Itinerary } from "@/types/index";

import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";

import ErrorPage from "@/pages/ErrorPage/ErrorPage";

const Map = lazy(async () => import("../tabs/Map"));

const Overview = () => {
  const { destinationCount, status, trip } = useGetSingleTrip();

  if (status === "pending") return <Loader />;
  if (status === "error") return <ErrorPage />;
  if (!trip) return null;

  const dateRange = formatDateRange(trip.startDate, trip.endDate);

  return (
    <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 md:p-6">
      {/* Trip Summary */}
      <Card className="rounded-2xl border border-gray-200 bg-white shadow-md transition-shadow hover:shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Trip Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <div className="flex items-center gap-3">
            <Calendar1Icon className="h-5 w-5 text-muted-foreground" />
            <span className="text-base font-medium">{dateRange}</span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <span className="text-base font-medium">
              Destinations: {destinationCount}
            </span>
          </div>

          {trip.description ? (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {trip.description}
            </p>
          ) : null}
        </CardContent>
      </Card>

      {/* Map View */}
      <Card className="relative h-[300px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition-shadow hover:shadow-lg">
        <CardContent className="h-full p-0">
          {destinationCount === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-gray-500">
              No locations available
            </div>
          ) : (
            <Map locations={trip.itineraries as Itinerary[]} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
