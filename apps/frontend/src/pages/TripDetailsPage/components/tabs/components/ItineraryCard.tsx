import type { Itinerary } from "@/types/index";

type Props = {
  itinerary: Itinerary;
};

const ItineraryCard = ({ itinerary }: Props) => {
  return (
    <div className="flex cursor-grab items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md active:cursor-grabbing">
      <div className="flex flex-col">
        <h4 className="text-base font-semibold text-gray-800">
          {itinerary.place?.formattedAddress || "Address not available"}
        </h4>
        <p className="text-sm text-gray-600">
          Lon: {itinerary.place?.lng.toFixed(4) || "N/A"}, Lat:{" "}
          {itinerary.place?.lat.toFixed(4) || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default ItineraryCard;
