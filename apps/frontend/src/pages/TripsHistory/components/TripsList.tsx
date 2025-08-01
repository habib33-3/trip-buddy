import useGetAllTrips from "@/hooks/trip/useGetAllTrips";

import ErrorComponent from "@/shared/ErrorComponent";
import Loader from "@/shared/Loader";
import TripCard from "@/shared/TripCard";

import type { TripStatus } from "@/types/index";

type Props = {
  statusArray: TripStatus[];
};

const TripsList = ({ statusArray }: Props) => {
  const { isError, isLoading, trips } = useGetAllTrips(statusArray);

  if (isLoading)
    return (
      <div className="my-3">
        <Loader />
      </div>
    );

  if (isError) return <ErrorComponent message="Error while fetching trips" />;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {trips?.map((trip) => (
        <TripCard
          key={trip.id}
          trip={trip}
        />
      ))}
    </div>
  );
};

export default TripsList;
