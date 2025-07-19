import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { Itinerary } from "@/types/index";

type Props = {
  itinerary: Itinerary;
};

const ItineraryCard = ({ itinerary }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: itinerary.id });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="items-center justify-between rounded-md border p-4 transition-shadow hover:shadow"
    >
      <div className="">
        <h4 className="font-medium text-gray-800">
          {itinerary.formattedAddress}
        </h4>
        <p className="max-w-xs truncate text-sm text-gray-600">
          {`Longitude: ${itinerary.longitude}, Latitude: ${itinerary.latitude}`}
        </p>
      </div>
      <div className="text-sm text-gray-600">Day {itinerary.order}</div>
    </div>
  );
};

export default ItineraryCard;
