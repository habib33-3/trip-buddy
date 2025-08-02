import { useState } from "react";

import { Link } from "react-router";

import useGetAllTrips from "@/hooks/trip/useGetAllTrips";

import ErrorComponent from "@/shared/ErrorComponent";
import Loader from "@/shared/Loader";
import TripCard from "@/shared/TripCard";

import { Button } from "@/ui/button";

const RecentTrip = () => {
  const { isError, isLoading, trips } = useGetAllTrips();

  const [showCancelled, setShowCancelled] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  if (isLoading)
    return (
      <div className="my-3">
        <Loader />
      </div>
    );

  if (isError) return <ErrorComponent message="Error while fetching trips" />;

  const filteredTrips = trips?.filter((trip) => {
    if (!showCancelled && trip.status === "CANCELLED") return false;
    return !(!showCompleted && trip.status === "COMPLETED");
  });

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          <Button
            variant={showCancelled ? "default" : "outline"}
            onClick={() => setShowCancelled((prev) => !prev)}
          >
            {showCancelled ? "Hide" : "Show"} Cancelled
          </Button>
          <Button
            variant={showCompleted ? "default" : "outline"}
            onClick={() => setShowCompleted((prev) => !prev)}
          >
            {showCompleted ? "Hide" : "Show"} Completed
          </Button>
        </div>

        <Button
          asChild
          variant="outline"
        >
          <Link to="/trips/history">View all</Link>
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredTrips?.slice(0, 4).map((trip) => (
          <TripCard
            key={trip.id}
            trip={trip}
          />
        ))}
      </div>

      {filteredTrips?.length === 0 && (
        <p className="mt-6 text-center text-gray-500">No trips found.</p>
      )}
    </section>
  );
};

export default RecentTrip;
