import type { Itinerary } from "@/types/index";

import { itineraryStatusColorMap } from "@/constants/index";

import { Badge } from "@/ui/badge";

import ChangeItineraryStatus from "./ChangeItineraryStatus";

type Props = {
  itinerary: Itinerary;
};

const ItineraryCard = ({ itinerary }: Props) => {
  const { notes, place, status, title } = itinerary;

  const formattedAddress = place?.formattedAddress ?? "No place selected";

  return (
    <div className="relative flex items-start gap-4 pl-6">
      <div className="absolute top-2 left-0 h-3 w-3 rounded-full bg-blue-500 shadow-md ring-2 ring-white" />

      <div className="absolute top-5 left-[5.5px] h-full w-px bg-gray-300" />

      <div className="flex-1 rounded-xl border border-gray-200 bg-gray-700 p-4 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-start justify-between">
          <h4 className="text-base font-semibold text-gray-200">{title}</h4>
          <Badge
            variant="secondary"
            className={`rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${
              // eslint-disable-next-line security/detect-object-injection
              itineraryStatusColorMap[status]
            }`}
          >
            {status}
          </Badge>
        </div>

        {notes ? <p className="mt-1 text-sm text-gray-200">{notes}</p> : null}
        <p className="mt-1 text-sm text-gray-300 italic">{formattedAddress}</p>

        <div className="mt-3">
          <ChangeItineraryStatus itinerary={itinerary} />
        </div>
      </div>
    </div>
  );
};

export default ItineraryCard;
