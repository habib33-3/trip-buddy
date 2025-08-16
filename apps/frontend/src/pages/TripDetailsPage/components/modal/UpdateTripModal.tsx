import { useState } from "react";

import { PenIcon } from "lucide-react";

import { Button } from "@/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";

import UpdateTripForm from "../forms/UpdateTripForm";

const UpdateTripModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          title="Edit"
          className="rounded-full p-2"
        >
          <PenIcon className="h-5 w-5" />
          <span className="sr-only">Edit</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="z-99999 w-full px-4 py-6 sm:max-w-[425px] sm:px-6 sm:py-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-200 sm:text-2xl">
            Edit Trip Details
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <UpdateTripForm closeModal={() => setIsModalOpen(false)} />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTripModal;
