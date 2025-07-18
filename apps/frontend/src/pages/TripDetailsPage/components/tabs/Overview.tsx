import { Calendar1Icon, MapPin } from "lucide-react";

import useGetSingleTrip from "@/hooks/trip/useGetSingleTrip";

import Loader from "@/shared/Loader";

import { formatDateRange } from "@/utils/date";

import type { Location } from "@/types/index";

import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";

import ErrorPage from "@/pages/ErrorPage/ErrorPage";

import Map from "../tabs/Map";

const Overview = () => {
  const { destinationCount, status, trip } = useGetSingleTrip();

  if (status === "pending") return <Loader />;
  if (status === "error") return <ErrorPage />;
  if (!trip) return null;

  const dateRange = formatDateRange(trip.startDate, trip.endDate);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Trip Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 text-gray-700">
            <Calendar1Icon className="h-5 w-5 text-muted-foreground" />
            <span>{dateRange}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <span>Destinations: {destinationCount}</span>
          </div>

          <p className="text-sm text-muted-foreground">{trip.description}</p>
        </CardContent>
      </Card>

      <div className="h-[300px] overflow-hidden rounded-2xl border shadow-sm">
        <Map locations={trip.Location as Location[]} />
      </div>
    </div>
  );
};

export default Overview;
