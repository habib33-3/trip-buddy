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
          <PlusIcon className="size-5" />
          Add Itinerary
        </Button>
      </DialogTrigger>

      <DialogContent className="z-5000 w-full max-w-5xl p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-semibold text-gray-300">
            Add a New Location
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-gray-400">
            Search for a place and add itinerary details
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row">
          <div className="h-full w-full lg:w-1/2">
            <AddPlaceForm />
          </div>
          <Separator
            orientation="vertical"
            className="hidden lg:block"
          />
          <div className="w-full lg:w-1/2">
            <AddItineraryForm closeModal={() => setModalOpen(false)} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddItineraryModal;
