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
      <Card className="group h-full overflow-hidden border border-gray-200 bg-white shadow-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-4">
          <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-blue-700">
            {trip.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-2 px-6 py-5 text-sm">
          <CalendarIcon className="size-4 text-blue-500" />
          <p className="text-gray-600">
            {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TripCard;
