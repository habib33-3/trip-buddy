import useGetRecentTrip from "@/hooks/trip/useGetRecentTrip";

import ErrorComponent from "@/shared/ErrorComponent";
import LoadingComponent from "@/shared/LoadingComponent";
import TripCard from "@/shared/TripCard";

const RecentTrip = () => {
  const { recentTrip, status } = useGetRecentTrip();

  if (status === "pending") return <LoadingComponent />;

  if (status === "error")
    return (
      <div className="my-6 flex justify-center">
        <ErrorComponent message="Error while fetching trips" />
      </div>
    );

  return (
    <section className="px-2 py-6 sm:px-4 lg:px-8">
      {recentTrip?.length === 0 ? (
        <p className="mt-6 text-center text-gray-200">No trips found.</p>
      ) : (
        <div className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recentTrip?.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentTrip;
