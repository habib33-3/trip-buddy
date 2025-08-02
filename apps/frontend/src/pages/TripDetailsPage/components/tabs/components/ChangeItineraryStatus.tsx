import { Loader } from "lucide-react";

import useChangeItineraryStatus from "@/hooks/itinerary/useChangeItineraryStatus";

import { cn } from "@/lib/utils";

import type { Itinerary, ItineraryStatus } from "@/types/index";

import { itineraryStatus } from "@/constants/index";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";

type Props = {
  itinerary: Itinerary;
};

const ChangeItineraryStatus = ({ itinerary }: Props) => {
  const { handleChangeItineraryStatus, isLoading } = useChangeItineraryStatus(
    itinerary.id
  );

  const handleStatusChange = (status: ItineraryStatus) => {
    if (status !== itinerary.status && !isLoading) {
      handleChangeItineraryStatus(status);
    }
  };

  return (
    <div className="w-[180px]">
      <Select
        onValueChange={handleStatusChange}
        value={itinerary.status}
        disabled={isLoading}
        aria-label="Change trip status"
      >
        <SelectTrigger
          className={cn(
            "h-9 w-full rounded-md border px-3 py-1.5 text-sm font-medium shadow-sm focus:ring-2 focus:ring-ring focus:ring-offset-2",
            isLoading && "cursor-not-allowed opacity-70"
          )}
          aria-live="polite"
          aria-busy={isLoading}
        >
          <SelectValue
            placeholder={
              <span className="flex items-center gap-2 text-muted-foreground">
                Select status
              </span>
            }
          />
        </SelectTrigger>

        <SelectContent className="rounded-md border bg-white p-1 shadow-lg">
          {itineraryStatus.map((status) => {
            const isSelected = status === itinerary.status;

            return (
              <SelectItem
                key={status}
                value={status}
                className={cn(
                  "flex items-center justify-between rounded px-3 py-2 text-sm capitalize transition-colors hover:bg-muted focus:bg-muted",
                  isSelected && "bg-muted font-semibold text-primary"
                )}
              >
                <span>{status}</span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      {isLoading ? (
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <Loader className="h-4 w-4 animate-spin" />
          Updating status...
        </p>
      ) : null}
    </div>
  );
};

export default ChangeItineraryStatus;
