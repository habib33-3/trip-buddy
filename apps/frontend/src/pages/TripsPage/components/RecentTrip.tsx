import useGetRecentTrip from "@/hooks/trip/useGetRecentTrip";

import ErrorComponent from "@/shared/ErrorComponent";
import Loader from "@/shared/Loader";
import TripCard from "@/shared/TripCard";

const RecentTrip = () => {
  const { recentTrip, status } = useGetRecentTrip();

  if (status === "pending")
    return (
      <div className="my-3">
        <Loader />
      </div>
    );

  if (status === "error")
    return <ErrorComponent message="Error while fetching trips" />;

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {recentTrip?.map((trip) => (
          <TripCard
            key={trip.id}
            trip={trip}
          />
        ))}
      </div>

      {recentTrip?.length === 0 && (
        <p className="mt-6 text-center text-gray-500">No trips found.</p>
      )}
    </section>
  );
};

export default RecentTrip;
