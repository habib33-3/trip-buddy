import { useState } from "react";

import { PlusIcon } from "lucide-react";

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
  const [openModal, setModalOpen] = useState(false);

  return (
    <Dialog
      open={openModal}
      onOpenChange={setModalOpen}
    >
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 rounded-xl px-4 py-2 shadow-md">
          <PlusIcon className="h-5 w-5" />
          Add Itinerary
        </Button>
      </DialogTrigger>

      <DialogContent className="z-999999 w-full max-w-full p-4 sm:max-w-3xl sm:p-6 lg:max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold text-gray-300 sm:text-2xl">
            Add a New Location
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-gray-400">
            Search for a place and add itinerary details
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable content */}
        <div className="mt-6 flex max-h-[80vh] flex-col gap-6 overflow-y-auto lg:flex-row">
          <div className="w-full flex-shrink-0 lg:w-1/2">
            <AddPlaceForm />
          </div>

          <Separator
            orientation="vertical"
            className="hidden lg:block"
          />

          <div className="w-full flex-shrink-0 lg:w-1/2">
            <AddItineraryForm closeModal={() => setModalOpen(false)} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddItineraryModal;
