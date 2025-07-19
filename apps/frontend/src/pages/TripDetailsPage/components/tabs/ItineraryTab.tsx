import useGetItineraries from "@/hooks/itinerary/useGetItineraries";

import Loader from "@/shared/Loader";

import ErrorPage from "@/pages/ErrorPage/ErrorPage";

import ItineraryCard from "./components/ItineraryCard";

const ItineraryTab = () => {
  const { locations, status } = useGetItineraries();

  if (status === "pending") {
    return <Loader />;
  }

  if (status === "error") {
    return <ErrorPage />;
  }

  if (!locations || locations.length === 0) {
    return <div>No itineraries found.</div>;
  }

  return (
    <div className="flex flex-wrap gap-4 p-4">
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
