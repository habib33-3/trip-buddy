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
      <TripSearchInput />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
          >
            <Funnel className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-52"
          side="top"
          align="start"
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
                  onCheckedChange={(checked) => {
                    setFilteredStatus((prev) => ({
                      ...prev,
                      [status]: checked,
                    }));
                  }}
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

      <div className="mt-8">
        <TripsList statusArray={filteredStatusArray} />
      </div>
    </section>
  );
};

export default TripsHistory;
