import { useState } from "react";

import { PlusIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";

import CreateTripForm from "./form/CreateTripForm";

const CreateTripModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
    >
      <DialogTrigger className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-amber-600/90 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-amber-200 hover:text-black hover:shadow-lg focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none">
        <PlusIcon className="h-4 w-4" />
        Create Trip
      </DialogTrigger>

      <DialogContent className="w-full px-4 py-6 sm:max-w-md sm:px-6 sm:py-8">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-300 sm:text-xl">
            Create Your Trip
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <CreateTripForm closeModal={() => setIsModalOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTripModal;
