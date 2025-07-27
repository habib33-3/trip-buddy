import type { Itinerary } from "@/types/index";

type Props = {
  itinerary: Itinerary;
};

const ItineraryCard = ({ itinerary }: Props) => {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex flex-col">
        <h4 className="text-base font-semibold text-gray-800">
          {itinerary.title}
        </h4>
        {itinerary.notes ? (
          <p className="text-sm text-gray-600">{itinerary.notes}</p>
        ) : null}
      </div>
    </div>
  );
};

export default ItineraryCard;
