import { Link } from "react-router";

import { CalendarIcon } from "lucide-react";

import { formatDate } from "@/utils/date";

import type { Trip } from "@/types/index";

import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";

type Props = {
  trip: Trip;
};

const TripCard = ({ trip }: Props) => {
  return (
    <Link to={`/trip/${trip.id}`}>
      <Card className="group relative overflow-hidden border border-gray-200 bg-white shadow-sm transition-all hover:shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-100 px-6 py-4">
          <CardTitle className="text-lg font-semibold text-gray-800">
            {trip.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-2 px-6 py-5 text-sm text-gray-700">
          <CalendarIcon className="h-4 w-4 text-blue-500" />
          <p>
            <span className="font-medium">Dates:</span>
            {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TripCard;
