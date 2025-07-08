import useCreateTrip from "@/hooks/trip/useCreateTrip";

import { DatePickerField } from "@/ui/date-picker";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";

import SubmitButton from "@/buttons/SubmitButtons";

const CreateTripForm = () => {
  const { form, isLoading, handleCreateTrip } = useCreateTrip();

  return (
    <Form {...form}>
      <form
        action=""
        onSubmit={form.handleSubmit(handleCreateTrip)}
        className="space-y-4 overflow-y-auto p-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <Label>Email</Label>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Trip Title"
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
              <Label>Email</Label>
              <FormControl>
                <Textarea
                  placeholder="Trip Title"
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
          title="Create Trip"
          loading={isLoading}
        />
      </form>
    </Form>
  );
};

export default CreateTripForm;
