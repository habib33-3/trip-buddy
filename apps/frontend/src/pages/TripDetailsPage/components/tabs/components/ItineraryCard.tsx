import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { Itinerary } from "@/types/index";

type Props = {
  itinerary: Itinerary;
};

const ItineraryCard = ({ itinerary }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: itinerary.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      role="button"
      tabIndex={0}
      aria-label={`Reorder ${itinerary.formattedAddress}, currently day ${itinerary.order + 1}`}
      className="flex cursor-grab items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md active:cursor-grabbing"
    >
      <div className="flex flex-col">
        <h4 className="text-base font-semibold text-gray-800">
          {itinerary.formattedAddress || "Address not available"}
        </h4>
        <p className="text-sm text-gray-600">
          Lon: {itinerary.longitude.toFixed(4) || "N/A"}, Lat:{" "}
          {itinerary.latitude.toFixed(4) || "N/A"}
        </p>
      </div>

      <div className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 shadow-inner">
        Day {itinerary.order + 1}
      </div>
    </div>
  );
};

export default ItineraryCard;
