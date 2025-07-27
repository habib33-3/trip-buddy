import useGetItineraries from "@/hooks/itinerary/useGetItineraries";

import ErrorComponent from "@/shared/ErrorComponent";
import Loader from "@/shared/Loader";
import Map from "@/shared/Map";

import type { Place } from "@/types/index";

const MapTab = () => {
  const { locations, status } = useGetItineraries();

  if (status === "pending") return <Loader />;

  if (status === "error" || !locations || locations.length === 0)
    return (
      <ErrorComponent message="Something went wrong while fetching itineraries" />
    );

  const places = locations
    .map((itinerary) => itinerary.place)
    .filter((place): place is Place => place !== undefined);

  if (places.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center text-center text-lg font-medium text-gray-500">
        No itineraries found.
      </div>
    );
  }

  return (
    <div className="h-[500px] w-full rounded-lg shadow-inner">
      <Map
        locations={places}
        zoom={6}
      />
    </div>
  );
};

export default MapTab;
