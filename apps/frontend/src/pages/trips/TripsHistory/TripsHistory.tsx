import { useState } from "react";

import { Funnel } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import type { TripStatus } from "@/types/index";

import { tripStatus } from "@/constants/index";

import { Button } from "@/ui/button";
import { Checkbox } from "@/ui/checkbox";
import { Label } from "@/ui/label";

import TripSearchInput from "./components/TripSearchInput";
import TripsList from "./components/TripsList";

const TripsHistory = () => {
  const [filteredStatus, setFilteredStatus] = useState<
    Record<TripStatus, boolean>
  >({
    ACTIVE: true,
    CANCELLED: false,
    COMPLETED: false,
    PLANNED: true,
  });

  const filteredStatusArray: TripStatus[] = Object.entries(filteredStatus)
    .filter(([, isChecked]) => isChecked)
    .map(([status]) => status as TripStatus);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Search & Filter */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <TripSearchInput />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="ml-auto rounded-full bg-gray-700 p-2"
            >
              <Funnel className="size-4 text-gray-300" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-52 bg-slate-500"
            side="bottom"
            align="end"
            sideOffset={8}
          >
            <div className="space-y-2">
              {tripStatus.map((status) => (
                <div
                  key={status}
                  className="flex items-center gap-2"
                >
                  <Checkbox
                    id={status}
                    // eslint-disable-next-line security/detect-object-injection
                    checked={filteredStatus[status]}
                    onCheckedChange={(checked) =>
                      setFilteredStatus((prev) => ({
                        ...prev,
                        [status]: checked,
                      }))
                    }
                  />
                  <Label
                    htmlFor={status}
                    className="capitalize"
                  >
                    {status.toLowerCase()}
                  </Label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Trips List */}
      <div className="mt-8">
        <TripsList statusArray={filteredStatusArray} />
      </div>
    </section>
  );
};

export default TripsHistory;
