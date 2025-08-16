import { Suspense, lazy } from "react";

import { Calendar1Icon, MapPin } from "lucide-react";

import useGetSingleTrip from "@/hooks/trip/useGetSingleTrip";

import ErrorComponent from "@/shared/ErrorComponent";
import Loader from "@/shared/Loader";

import { formatDateRange } from "@/utils/date";

import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";

const Map = lazy(async () => import("@/shared/Map"));

const Overview = () => {
  const { destinationCount, status, trip } = useGetSingleTrip();

  if (status === "pending") return <Loader />;
  if (status === "error" || !trip)
    return (
      <ErrorComponent message="Something went wrong while fetching trip" />
    );

  const dateRange = formatDateRange(trip.startDate, trip.endDate);

  return (
    <div className="grid grid-cols-1 gap-6 p-2 sm:grid-cols-2 sm:p-4 md:p-6">
      {/* Trip Summary */}
      <Card className="rounded-2xl border border-gray-200 bg-slate-700 shadow-md transition-shadow hover:shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white sm:text-2xl">
            Trip Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-200">
          <div className="flex items-center gap-3">
            <Calendar1Icon
              className="h-5 w-5 text-gray-300"
              aria-label="Trip dates"
            />
            <span className="text-base font-medium">{dateRange}</span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin
              className="h-5 w-5 text-gray-300"
              aria-label="Number of itineraries"
            />
            <span className="text-base font-medium">
              Itineraries: {destinationCount}
            </span>
          </div>

          {trip.description ? (
            <p className="text-sm leading-relaxed text-gray-300">
              {trip.description}
            </p>
          ) : null}
        </CardContent>
      </Card>

      {/* Map Card */}
      <Card className="relative h-64 overflow-hidden rounded-2xl border border-gray-200 bg-slate-700 shadow-md transition-shadow hover:shadow-lg sm:h-80 md:h-[300px]">
        <CardContent className="flex h-full items-center justify-center p-0">
          <div className="absolute inset-0">
            <Suspense fallback={<Loader />}>
              <Map zoom={6} />
            </Suspense>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
