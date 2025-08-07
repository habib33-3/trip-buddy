import { Loader } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useChangeTripStatus from "@/hooks/trip/useChangeTripStatus";

import { cn } from "@/lib/utils";

import type { Trip, TripStatus } from "@/types/index";

import { tripStatus } from "@/constants/index";

type Props = {
  trip: Trip;
};

const ChangeTripStatusSelect = ({ trip }: Props) => {
  const { handleChangeTripStatus, isLoading } = useChangeTripStatus();

  const handleStatusChange = (status: TripStatus) => {
    if (status !== trip.status && !isLoading) {
      handleChangeTripStatus(status);
    }
  };

  return (
    <div className="w-[180px] bg-gray-600/70 text-white">
      <Select
        onValueChange={handleStatusChange}
        value={trip.status}
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
              <span className="flex items-center gap-2 text-gray-300">
                Select status
              </span>
            }
          />
        </SelectTrigger>

        <SelectContent className="rounded-md border bg-gray-700 p-1 shadow-lg">
          {tripStatus.map((status) => {
            const isSelected = status === trip.status;

            return (
              <SelectItem
                key={status}
                value={status}
                className={cn(
                  "flex items-center justify-between rounded px-3 py-2 text-sm text-gray-200 capitalize transition-colors hover:bg-muted focus:bg-muted",
                  isSelected && "bg-slate-400 font-semibold text-white"
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
          <Loader className="size-4 animate-spin" />
          Updating status...
        </p>
      ) : null}
    </div>
  );
};

export default ChangeTripStatusSelect;
