import useAddItinerary from "@/hooks/itinerary/useAddItinerary";

import { usePlaceStore } from "@/stores/usePlaceStore";

import type { AddItinerarySchemaType } from "@/validations/itineraryValidation";

import { Form, FormField, FormItem, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";

import SubmitButton from "@/buttons/SubmitButtons";

const AddItineraryForm = () => {
  const { place } = usePlaceStore();

  const { form, handleAddLocation, isLoading } = useAddItinerary();

  const handleSubmit = (data: AddItinerarySchemaType) => {
    if (!place) return;

    handleAddLocation({ ...data, placeId: place.id });
  };

  return (
    <div className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
      <h3 className="mb-2 text-sm font-medium text-muted-foreground">
        {place?.formattedAddress ?? "No place selected"}
      </h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  {...field}
                  placeholder="e.g. Museum Visit"
                  disabled={isLoading}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  {...field}
                  placeholder="Any specific details or reminders"
                  disabled={isLoading}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton
            loading={isLoading}
            disabled={isLoading || !place}
            title="Add Itinerary"
          />
        </form>
      </Form>
    </div>
  );
};

export default AddItineraryForm;
