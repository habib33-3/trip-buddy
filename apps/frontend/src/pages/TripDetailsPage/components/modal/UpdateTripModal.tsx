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
          <PenIcon className="size-5" />
          <div className="sr-only">Edit</div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-200">
            Edit Trip Details
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <UpdateTripForm
          closeModal={() => {
            setIsModalOpen(false);
          }}
        />

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
