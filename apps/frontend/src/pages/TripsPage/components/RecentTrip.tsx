import useGetAllTrips from "@/hooks/trip/useGetAllTrips";

import TripCard from "./TripCard";

const RecentTrip = () => {
  const { isError, isLoading, trips } = useGetAllTrips();

  if (isLoading) return <p className="text-center text-gray-600">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load trips.</p>;

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {trips?.slice(0, 4).map((trip) => (
        <TripCard
          key={trip.id}
          trip={trip}
        />
      ))}
    </div>
  );
};

export default RecentTrip;
