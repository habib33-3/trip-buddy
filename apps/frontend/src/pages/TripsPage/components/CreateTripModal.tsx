import useCreateTrip from "@/hooks/trip/useCreateTrip";

import { Button } from "@/ui/button";
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
  const { isModalOpen, setIsModalOpen } = useCreateTrip();

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
    >
      <DialogTrigger className="">
        <Button asChild>Create Trip</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Your Trip</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <CreateTripForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTripModal;
