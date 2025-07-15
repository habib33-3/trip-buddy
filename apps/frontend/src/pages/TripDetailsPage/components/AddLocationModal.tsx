import { LocationEditIcon } from "lucide-react";

import useAddLocation from "@/hooks/locations/useAddLocation";

import { Button } from "@/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";

import SubmitButton from "@/buttons/SubmitButtons";

const AddLocationModal = () => {
  const { form, handleAddLocation, isLoading, isModalOpen, setIsModalOpen } =
    useAddLocation();

  return (
    <Dialog
      onOpenChange={setIsModalOpen}
      open={isModalOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="flex items-center gap-2 rounded-xl px-4 py-2 shadow-md"
        >
          <LocationEditIcon className="h-4 w-4" />
          Add Location
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            Add a New Location
          </DialogTitle>
          <DialogDescription className="sr-only">
            Add a new location to your trip
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAddLocation)}
            className="mt-4 space-y-6"
          >
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-sm font-medium text-gray-700">
                    Location Address
                  </Label>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter the location address..."
                      className="mt-1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <SubmitButton
                loading={isLoading}
                className="w-full"
              >
                Save Location
              </SubmitButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLocationModal;
