import useGetSingleTrip from "@/hooks/trip/useGetSingleTrip";
import useUpdateTrip from "@/hooks/trip/useUpdateTrip";

import LoadingComponent from "@/shared/LoadingComponent";

import type { UpdateTripSchemaType } from "@/validations/tripValidation";

import DatePickerField from "@/ui/date-picker";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";

import SubmitButton from "@/buttons/SubmitButtons";

type Props = {
  closeModal: () => void;
};

const UpdateTripForm = ({ closeModal }: Props) => {
  const { form, handleUpdateTrip, isLoading } = useUpdateTrip();
  const { status, trip } = useGetSingleTrip();

  if (isLoading || status === "pending") {
    return (
      <div className="flex h-32 items-center justify-center">
        <LoadingComponent />
      </div>
    );
  }

  if (status === "error") {
    return <p className="text-center text-red-400">Something went wrong</p>;
  }

  const onSubmit = (data: UpdateTripSchemaType) => {
    handleUpdateTrip(data);
    closeModal();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex max-h-[70vh] flex-col gap-4 overflow-y-auto px-2 sm:px-0"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <Label>Trip Title</Label>
              <FormControl>
                <Input
                  type="text"
                  placeholder={trip?.title ?? "Trip Title"}
                  {...field}
                  className="w-full text-gray-200 placeholder:text-gray-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <Label>Description</Label>
              <FormControl>
                <Textarea
                  placeholder={trip?.description ?? "Trip Description"}
                  className="w-full resize-none text-sm font-medium text-gray-200 placeholder:text-sm placeholder:text-gray-400"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <DatePickerField
              field={field}
              label="Start Date"
              description="When will your trip begin?"
            />
          )}
        />

        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <DatePickerField
              field={field}
              label="End Date"
              description="When will your trip end?"
            />
          )}
        />

        <SubmitButton
          title="Update Trip"
          loading={isLoading}
        />
      </form>
    </Form>
  );
};

export default UpdateTripForm;
