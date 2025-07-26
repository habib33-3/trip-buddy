import { useState } from "react";

import useAddPlace from "@/hooks/place/useAddPlace";
import useGetPlaces from "@/hooks/place/useGetPlaces";

import { usePlaceStore } from "@/stores/usePlaceStore";

import type { Place } from "@/types/index";

import { Button } from "@/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/ui/form";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";

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
    <div className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(addPlace)}
          className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_auto]"
        >
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  {...field}
                  value={field.value}
                  placeholder="e.g. 221B Baker Street, London"
                  onChange={(e) => {
                    setSearchQuery(e.target.value);

                    form.setValue("address", e.target.value);
                  }}
                  disabled={isLoading}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="self-end">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              Add
            </Button>
          </div>
        </form>
      </Form>

      <div className="mt-6 min-h-[100px]">
        <h3 className="text-sm font-semibold text-gray-700">Search Results</h3>
        <div className="mt-2 max-h-60 space-y-1 overflow-y-auto pr-2">
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
                className="w-full justify-start text-left text-sm hover:bg-gray-100"
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
