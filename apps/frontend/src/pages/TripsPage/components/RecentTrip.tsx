import useGetAllTrips from "@/hooks/trip/useGetAllTrips";

import Loader from "@/shared/Loader";

import ErrorPage from "@/pages/ErrorPage/ErrorPage";

import TripCard from "./TripCard";

const RecentTrip = () => {
  const { isError, isLoading, trips } = useGetAllTrips();

  if (isLoading) return <Loader />;

  if (isError) return <ErrorPage />;

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
