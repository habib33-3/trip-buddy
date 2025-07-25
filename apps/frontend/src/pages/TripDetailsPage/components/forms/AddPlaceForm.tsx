import { useState } from "react";

import useAddPlace from "@/hooks/place/useAddPlace";
import useGetPlaces from "@/hooks/place/useGetPlaces";

import { usePlaceStore } from "@/stores/usePlaceStore";

import type { Place } from "@/types/index";

import { Button } from "@/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";

import SubmitButton from "@/buttons/SubmitButtons";

const AddPlaceForm = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { places, status } = useGetPlaces(searchQuery);
  const { addPlace, form, isLoading } = useAddPlace();
  const { setPlace } = usePlaceStore();

  const handlePlaceClick = (place: Place) => {
    setPlace(place);
    setSearchQuery("");
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(addPlace)}
          className="flex flex-col gap-4 sm:flex-row sm:items-end"
        >
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  {...field}
                  placeholder="e.g. 221B Baker Street, London"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={isLoading}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton
            className="w-full px-6 py-2 sm:w-auto"
            loading={isLoading}
            title="Add Place"
          />
        </form>
      </Form>

      <div className="mt-4">
        <h3 className="font-medium">Search Results</h3>
        <div className="mt-2 max-h-60 space-y-2 overflow-y-auto pr-2">
          {status === "pending" ? (
            <p className="text-sm text-muted-foreground">Loading...</p>
          ) : searchQuery.length < 3 ? (
            <p className="text-sm text-muted-foreground">
              Enter at least 3 characters to search.
            </p>
          ) : places?.length ? (
            places.map((place) => (
              <Button
                key={place.id}
                type="button"
                variant="ghost"
                onClick={() => handlePlaceClick(place)}
                className="w-full justify-start text-left text-sm"
              >
                {place.formattedAddress}
              </Button>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPlaceForm;
