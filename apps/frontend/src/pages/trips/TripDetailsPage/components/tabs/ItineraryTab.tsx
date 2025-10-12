import useGetItineraries from "@/hooks/itinerary/useGetItineraries";

import ErrorComponent from "@/shared/ErrorComponent";
import LoadingComponent from "@/shared/LoadingComponent";

import ItineraryCard from "./components/ItineraryCard";

const ItineraryTab = () => {
  const { locations, status } = useGetItineraries();

  if (status === "pending") {
    return <LoadingComponent />;
  }

  if (status === "error") {
    return (
      <ErrorComponent message="Something went wrong while fetching itineraries" />
    );
  }

  if (!locations || locations.length === 0) {
    return (
      <div className="flex h-64 w-full items-center justify-center text-center text-lg font-medium text-gray-500">
        No itineraries found.
      </div>
    );
  }

  return (
    <div className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto p-4 sm:p-6 md:gap-6">
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
