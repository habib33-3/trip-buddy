import { Link } from "react-router";

import { ArrowRight, Calendar1Icon } from "lucide-react";

import { formatDateRange } from "@/utils/date";

import type { Trip } from "@/types/index";

import { tripStatusColorMap } from "@/constants/index";

import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";

type Props = {
  trip: Trip;
};

const TripCard = ({ trip }: Props) => {
  return (
    <Card className="group relative flex h-72 flex-col justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md">
      <div
        className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${tripStatusColorMap[trip.status] || "bg-muted text-muted-foreground"}`}
      >
        {trip.status}
      </div>

      <CardHeader className="p-0">
        <CardTitle className="text-2xl font-bold text-gray-900 transition-colors group-hover:text-primary">
          {trip.title}
        </CardTitle>
        <CardDescription className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {trip.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex h-full flex-col justify-between gap-4 p-0 pt-4">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Calendar1Icon className="h-5 w-5 text-gray-600" />
          <span className="font-medium">
            {formatDateRange(trip.startDate, trip.endDate)}
          </span>
        </div>

        <div className="mt-auto">
          <Link to={`/trips/${trip.id}`}>
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-0 text-primary transition-transform group-hover:opacity-100 hover:translate-x-1"
            >
              <span className="font-medium">View Trip</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:scale-110" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default TripCard;
