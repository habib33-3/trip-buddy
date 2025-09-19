import { Trash2 } from "lucide-react";

import useDeleteTrip from "@/hooks/trip/useDeleteTrip";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/ui/alert-dialog";
import { Button } from "@/ui/button";

const DeleteTripModal = () => {
  const { deleteTrip, isLoading } = useDeleteTrip();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          title="Delete"
          size="icon"
          className="rounded-full p-2"
        >
          <Trash2 className="size-5" />
          <div className="sr-only">Delete</div>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="z-9999 bg-slate-800">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300">
            This will permanently delete this trip and all associated
            itineraries.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              disabled={isLoading}
              variant="destructive"
              className="bg-red-800 hover:bg-red-900"
              onClick={() => {
                deleteTrip();
              }}
            >
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTripModal;
