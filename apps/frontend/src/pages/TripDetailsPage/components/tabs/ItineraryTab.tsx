import useGetItineraries from "@/hooks/itinerary/useGetItineraries";

import ErrorComponent from "@/shared/ErrorComponent";
import Loader from "@/shared/Loader";

import ItineraryCard from "./components/ItineraryCard";

const ItineraryTab = () => {
  const { locations, status } = useGetItineraries();

  if (status === "pending") {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (status === "error") {
    return (
      <ErrorComponent message="Something went wrong while fetching itineraries" />
    );
  }

  if (!locations || locations.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center text-center text-lg font-medium text-gray-500">
        No itineraries found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      {locations.map((itinerary) => (
        <ItineraryCard
          key={itinerary.id}
          itinerary={itinerary}
        />
      ))}
    </div>
  );
};

export default ItineraryTab;
