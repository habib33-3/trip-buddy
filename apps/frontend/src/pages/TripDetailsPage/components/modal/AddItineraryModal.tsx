import { LocationEditIcon } from "lucide-react";

import { Button } from "@/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { Separator } from "@/ui/separator";

import AddItineraryForm from "../forms/AddItineraryForm";
import AddPlaceForm from "../forms/AddPlaceForm";

const AddItineraryModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 rounded-xl px-4 py-2 shadow-md">
          <LocationEditIcon className="h-4 w-4" />
          Add Location
        </Button>
      </DialogTrigger>

      <DialogContent className="!w-full !max-w-4xl p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            Add a New Location
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Search for a place and add itinerary details
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <AddPlaceForm />
          </div>
          <Separator
            orientation="vertical"
            className="hidden lg:block"
          />
          <div className="w-full lg:w-1/2">
            <AddItineraryForm />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddItineraryModal;
