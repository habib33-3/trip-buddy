import useGetSingleTrip from "@/hooks/trip/useGetSingleTrip";
import useUpdateTrip from "@/hooks/trip/useUpdateTrip";

import type { UpdateTripSchemaType } from "@/validations/tripValidation";

import { DatePickerField } from "@/ui/date-picker";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";

import SubmitButton from "@/buttons/SubmitButtons";

type Props = {
  closeModal: () => void;
};

const UpdateTripForm = ({ closeModal }: Props) => {
  const { form, isLoading, handleUpdateTrip } = useUpdateTrip();
  const { trip, status } = useGetSingleTrip();

  if (isLoading || status === "pending") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return <p>Something went wrong</p>;
  }

  const onSubmit = (data: UpdateTripSchemaType) => {
    handleUpdateTrip(data);

    closeModal();
  };

  return (
    <Form {...form}>
      <form
        action=""
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-3"
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
                  placeholder={trip?.title}
                  {...field}
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
                  placeholder={trip?.description}
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
