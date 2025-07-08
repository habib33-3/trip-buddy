import useGetAllTrips from "@/hooks/trip/useGetAllTrips";

import TripCard from "./TripCard";

const RecentTrip = () => {
  const { isError, isLoading, trips } = useGetAllTrips();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="mt-10 flex items-center justify-center gap-4 rounded-2xl px-6 py-10 shadow-lg">
      {trips?.slice(0, 4).map((trip) => (
        <TripCard
          trip={trip}
          key={trip.id}
        />
      ))}
    </div>
  );
};

export default RecentTrip;
