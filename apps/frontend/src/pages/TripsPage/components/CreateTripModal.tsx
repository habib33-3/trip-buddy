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
      <DialogTrigger className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-black px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-gray-900 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none">
        <PlusIcon className="h-4 w-4" />
        Create Trip
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Your Trip</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <CreateTripForm
          closeModal={() => {
            setIsModalOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTripModal;
